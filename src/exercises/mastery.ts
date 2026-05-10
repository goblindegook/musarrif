import type { PronounId } from '../paradigms/pronouns'
import type { VerbTense } from '../paradigms/tense'
import { FORMS, getAvailableParadigms, type VerbForm, verbs } from '../paradigms/verbs'
import { utcToday } from '../primitives/dates'
import { average, clamp } from '../primitives/numbers'
import { type DimensionProfile, formPool, pronounPool, rootTypesPool, tensePool } from './dimensions'
import type { ExerciseKind } from './exercises'
import { buildCardKey, getSrsRootType, type SrsCardIdentity, type SrsRootType, type SrsStore } from './srs'

const ROOT_TYPES_ORDER: readonly SrsRootType[] = ['sound', 'doubled', 'hamzated', 'assimilated', 'hollow', 'defective']
const TENSE_ORDER: readonly VerbTense[] = [
  'active.past',
  'active.present.indicative',
  'active.present.subjunctive',
  'active.present.jussive',
  'active.imperative',
  'passive.past',
  'passive.present.indicative',
  'passive.present.subjunctive',
  'passive.present.jussive',
]
const PRONOUN_TABLE_ORDER: readonly PronounId[] = [
  '1s',
  '2ms',
  '2fs',
  '3ms',
  '3fs',
  '2d',
  '3md',
  '3fd',
  '1p',
  '2mp',
  '2fp',
  '3mp',
  '3fp',
]
const NOMINAL_ORDER = ['participles', 'masdar'] as const

const VERB_EXERCISES = new Set<ExerciseKind>(['conjugation', 'verbForm', 'verbPronoun', 'verbRoot', 'verbTense'])
const PARTICIPLE_EXERCISES = new Set<ExerciseKind>([
  'participleForm',
  'participleRoot',
  'participleVerb',
  'verbParticiple',
])
const MASDAR_EXERCISES = new Set<ExerciseKind>(['masdarForm', 'masdarRoot', 'masdarVerb', 'verbMasdar'])
const ALL_EXERCISES = new Set([...VERB_EXERCISES, ...PARTICIPLE_EXERCISES, ...MASDAR_EXERCISES])

const MASTERY_THRESHOLD_DAYS = 365
const STRENGTH_DENOMINATOR = Math.log2(MASTERY_THRESHOLD_DAYS + 1)

export type MasteryCategoryId = 'rootTypes' | 'forms' | 'tenses' | 'pronouns' | 'nominals'

export type MasteryItemId =
  | ['rootTypes', SrsRootType]
  | ['forms', VerbForm]
  | ['tenses', VerbTense]
  | ['pronouns', PronounId]
  | ['nominals', 'participles' | 'masdar']

export interface MasteryItem {
  id: MasteryItemId
  score: number
  locked: boolean
}

export interface MasteryCategory {
  id: MasteryCategoryId
  score: number
  locked: boolean
  items: readonly MasteryItem[]
}

export interface MasterySnapshot {
  categories: readonly MasteryCategory[]
}

export function isVerbExercise(kind: ExerciseKind): boolean {
  return VERB_EXERCISES.has(kind)
}

export function isNominalExercise(kind: ExerciseKind): boolean {
  return MASDAR_EXERCISES.has(kind) || PARTICIPLE_EXERCISES.has(kind)
}

export function computeMastery(profile: DimensionProfile, srsStore: SrsStore, today = utcToday()): MasterySnapshot {
  const cards = cardSpace()
  const unlockedRootTypes = new Set(rootTypesPool(profile.rootTypes))
  const unlockedForms = new Set(formPool(profile.forms))
  const unlockedTenses = new Set(tensePool(profile.tenses))
  const unlockedPronouns = new Set(pronounPool(profile.pronouns))
  const unlockedNominals = new Set<string>()
  if (profile.nominals >= 1) unlockedNominals.add('participles')
  if (profile.nominals >= 2) unlockedNominals.add('masdar')

  return {
    categories: [
      buildCategory(
        'rootTypes',
        ROOT_TYPES_ORDER.map((rootType) => {
          const locked = !unlockedRootTypes.has(rootType)
          return {
            id: ['rootTypes', rootType],
            score: computeScore(
              cards.filter((card) => card.rootType === rootType),
              srsStore,
              today,
              locked,
            ),
            locked,
          }
        }),
      ),
      buildCategory(
        'forms',
        FORMS.map((form) => {
          const locked = !unlockedForms.has(form)
          return {
            id: ['forms', form],
            score: computeScore(
              cards.filter((card) => card.form === form),
              srsStore,
              today,
              locked,
            ),
            locked,
          }
        }),
      ),
      buildCategory(
        'tenses',
        TENSE_ORDER.map((tense) => {
          const locked = !unlockedTenses.has(tense)
          return {
            id: ['tenses', tense],
            score: computeScore(
              cards.filter((card) => card.tense === tense && isVerbExercise(card.kind)),
              srsStore,
              today,
              locked,
            ),
            locked,
          }
        }),
      ),
      buildCategory(
        'pronouns',
        PRONOUN_TABLE_ORDER.map((pronoun) => {
          const locked = !unlockedPronouns.has(pronoun)
          return {
            id: ['pronouns', pronoun],
            score: computeScore(
              cards.filter((card) => card.pronoun === pronoun && isVerbExercise(card.kind)),
              srsStore,
              today,
              locked,
            ),
            locked,
          }
        }),
      ),
      buildCategory(
        'nominals',
        NOMINAL_ORDER.map((nominal) => {
          const locked = !unlockedNominals.has(nominal)
          return {
            id: ['nominals', nominal],
            score: computeScore(
              cards.filter((card) => isNominalExercise(card.kind)),
              srsStore,
              today,
              locked,
            ),
            locked,
          }
        }),
      ),
    ],
  }
}

function pronounSpace(
  tense: VerbTense,
  pronouns: readonly PronounId[],
  impersonalPassive: boolean,
): readonly PronounId[] {
  if (tense === 'active.imperative') {
    const imperativePool = pronouns.filter((pronoun) => pronoun.startsWith('2'))
    return imperativePool.length > 0 ? imperativePool : ['2ms']
  }
  if (impersonalPassive && tense.startsWith('passive')) return ['3ms']
  return pronouns
}

function cardSpace(): readonly SrsCardIdentity[] {
  const allForms = new Set(formPool(9))
  const allRootTypes = new Set(rootTypesPool(5))
  const allTenses = tensePool(4)
  const allPronouns = pronounPool(3)
  const unique = new Map<string, SrsCardIdentity>()

  for (const verb of verbs) {
    if (verb.root.length !== 3) continue
    const rootType = getSrsRootType(verb.root)
    if (!allForms.has(verb.form) || !allRootTypes.has(rootType)) continue
    const paradigms = new Set(getAvailableParadigms(verb))
    const availableVerbTenses = allTenses.filter((tense) => paradigms.has(tense))

    for (const kind of ALL_EXERCISES) {
      if (!VERB_EXERCISES.has(kind)) {
        const key = buildCardKey(kind, rootType, verb.form)
        unique.set(key, { key, kind, rootType, form: verb.form, tense: undefined, pronoun: undefined })
        continue
      }

      for (const tense of availableVerbTenses) {
        for (const pronoun of pronounSpace(tense, allPronouns, verb.passiveVoice === 'impersonal')) {
          const key = buildCardKey(kind, rootType, verb.form, tense, pronoun)
          unique.set(key, { key, kind, rootType, form: verb.form, tense, pronoun })
        }
      }
    }
  }

  return [...unique.values()]
}

function cardStrength(store: SrsStore, key: string, today: string): number {
  const state = store[key]
  if (state == null || state.dueDate <= today) return 0
  const interval = clamp(Math.round(state.interval), 1, MASTERY_THRESHOLD_DAYS)
  return clamp(Math.log2(interval + 1) / STRENGTH_DENOMINATOR, 0, 1)
}

function computeScore(cards: readonly SrsCardIdentity[], store: SrsStore, today: string, isLocked: boolean): number {
  if (isLocked) return 0
  if (cards.length === 0) return 0
  const grouped = new Map<string, number>()
  for (const card of cards) {
    const combinationKey = combinationGroupKey(card)
    const strength = cardStrength(store, card.key, today)
    const current = grouped.get(combinationKey)
    if (current == null || strength > current) grouped.set(combinationKey, strength)
  }

  return average([...grouped.values()])
}

function combinationGroupKey(card: SrsCardIdentity): string {
  if (card.tense != null && card.pronoun != null) return `${card.rootType}:${card.form}:${card.tense}:${card.pronoun}`
  if (PARTICIPLE_EXERCISES.has(card.kind)) return `${card.rootType}:${card.form}:participles`
  if (MASDAR_EXERCISES.has(card.kind)) return `${card.rootType}:${card.form}:masdar`
  return `${card.rootType}:${card.form}:${card.kind}`
}

function buildCategory(id: MasteryCategoryId, items: readonly MasteryItem[]): MasteryCategory {
  return { id, items, score: average(items.map((item) => item.score)), locked: items.every((item) => item.locked) }
}

// FIXME: filter categories before calling
export function findLowestMastery(categories: readonly MasteryCategory[], limit = 5): readonly MasteryItemId[] {
  const unlocked = categories
    .filter((cat) => ['rootTypes', 'forms', 'tenses', 'pronouns'].includes(cat.id))
    .flatMap((cat) => cat.items.filter((item) => !item.locked))

  if (unlocked.length === 0) return []

  const sorted = unlocked.toSorted((a, b) => a.score - b.score)
  const threshold = sorted[Math.min(2, sorted.length - 1)].score

  return sorted
    .slice(0, limit)
    .filter((item) => item.score <= threshold)
    .map((item) => item.id)
}
