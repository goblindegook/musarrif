import type { PronounId } from '../paradigms/pronouns'
import type { VerbTense } from '../paradigms/tense'
import { getAvailableParadigms, verbs } from '../paradigms/verbs'
import { type DimensionProfile, formPool, pronounPool, rootTypesPool, tensePool } from './dimensions'
import type { ExerciseKind } from './exercises'
import { buildCardKey, getSrsRootType, type SrsRootType, type SrsStore } from './srs'

const ROOT_TYPES_ORDER: readonly SrsRootType[] = ['sound', 'doubled', 'hamzated', 'assimilated', 'hollow', 'defective']
const FORM_ORDER: readonly string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
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

const TENSED_KINDS = new Set<ExerciseKind>(['conjugation', 'verbForm', 'verbPronoun', 'verbRoot', 'verbTense'])
const PARTICIPLE_KINDS = new Set<ExerciseKind>(['participleForm', 'participleRoot', 'participleVerb', 'verbParticiple'])
const MASDAR_KINDS = new Set<ExerciseKind>(['masdarForm', 'masdarRoot', 'masdarVerb', 'verbMasdar'])
const ROOT_TYPE_SCORE_KINDS = new Set<ExerciseKind>([
  'conjugation',
  'verbForm',
  'verbPronoun',
  'verbRoot',
  'verbTense',
  'rootFormVerb',
])
const FORM_SCORE_KINDS = new Set<ExerciseKind>([
  'conjugation',
  'verbForm',
  'verbPronoun',
  'verbRoot',
  'verbTense',
  'rootFormVerb',
])
const TENSE_SCORE_KINDS = new Set<ExerciseKind>(['conjugation', 'verbTense'])
const PRONOUN_SCORE_KINDS = new Set<ExerciseKind>(['conjugation', 'verbPronoun'])
const EXERCISE_KINDS: readonly ExerciseKind[] = [
  'conjugation',
  'masdarForm',
  'masdarRoot',
  'masdarVerb',
  'participleForm',
  'rootFormVerb',
  'participleRoot',
  'participleVerb',
  'verbForm',
  'verbMasdar',
  'verbParticiple',
  'verbPronoun',
  'verbRoot',
  'verbTense',
]

const MAX_INTERVAL_DAYS = 365
const STRENGTH_DENOMINATOR = Math.log2(MAX_INTERVAL_DAYS + 1)

export type MasteryCategoryId = 'rootTypes' | 'forms' | 'tenses' | 'pronouns' | 'nominals'

export interface MasteryItem {
  id: string
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

interface PossibleCard {
  key: string
  kind: ExerciseKind
  rootType: SrsRootType
  form: string
  tense: VerbTense | undefined
  pronoun: PronounId | undefined
}

export function buildMasterySnapshot(
  profile: DimensionProfile,
  srsStore: SrsStore,
  today = utcToday(),
): MasterySnapshot {
  const cards = buildPossibleCards()
  const unlockedRootTypes = new Set(rootTypesPool(profile.rootTypes))
  const unlockedForms = new Set(formPool(profile.forms).map((form) => String(form)))
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
          const score = locked
            ? 0
            : computeUnlockedScore(
                cards.filter((card) => card.rootType === rootType && ROOT_TYPE_SCORE_KINDS.has(card.kind)),
                srsStore,
                today,
              )
          return { id: rootType, score, locked }
        }),
      ),
      buildCategory(
        'forms',
        FORM_ORDER.map((form) => {
          const locked = !unlockedForms.has(form)
          const score = locked
            ? 0
            : computeUnlockedScore(
                cards.filter((card) => card.form === form && FORM_SCORE_KINDS.has(card.kind)),
                srsStore,
                today,
              )
          return { id: form, score, locked }
        }),
      ),
      buildCategory(
        'tenses',
        TENSE_ORDER.map((tense) => {
          const locked = !unlockedTenses.has(tense)
          const score = locked
            ? 0
            : computeUnlockedScore(
                cards.filter((card) => card.tense != null && card.tense === tense && TENSE_SCORE_KINDS.has(card.kind)),
                srsStore,
                today,
              )
          return { id: tense, score, locked }
        }),
      ),
      buildCategory(
        'pronouns',
        PRONOUN_TABLE_ORDER.map((pronoun) => {
          const locked = !unlockedPronouns.has(pronoun)
          const score = locked
            ? 0
            : computeUnlockedScore(
                cards.filter(
                  (card) => card.pronoun != null && card.pronoun === pronoun && PRONOUN_SCORE_KINDS.has(card.kind),
                ),
                srsStore,
                today,
              )
          return { id: pronoun, score, locked }
        }),
      ),
      buildCategory(
        'nominals',
        NOMINAL_ORDER.map((nominal) => {
          const locked = !unlockedNominals.has(nominal)
          const score = locked
            ? 0
            : computeUnlockedScore(
                cards.filter((card) =>
                  nominal === 'participles' ? PARTICIPLE_KINDS.has(card.kind) : MASDAR_KINDS.has(card.kind),
                ),
                srsStore,
                today,
              )
          return { id: nominal, score, locked }
        }),
      ),
    ],
  }
}

function utcToday(): string {
  return new Date().toISOString().slice(0, 10)
}

function possiblePronouns(
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

function buildPossibleCards(): readonly PossibleCard[] {
  const allForms = new Set(formPool(9).map((form) => String(form)))
  const allRootTypes = new Set(rootTypesPool(5))
  const allTenses = tensePool(4)
  const allPronouns = pronounPool(3)
  const unique = new Map<string, PossibleCard>()

  for (const verb of verbs) {
    if (verb.root.length !== 3) continue
    const form = String(verb.form)
    const rootType = getSrsRootType(verb.root)
    if (!allForms.has(form) || !allRootTypes.has(rootType)) continue
    const paradigms = new Set(getAvailableParadigms(verb))
    const availableVerbTenses = allTenses.filter((tense) => paradigms.has(tense))

    for (const kind of EXERCISE_KINDS) {
      if (!TENSED_KINDS.has(kind)) {
        const key = buildCardKey(kind, rootType, verb.form)
        unique.set(key, { key, kind, rootType, form, tense: undefined, pronoun: undefined })
        continue
      }

      for (const tense of availableVerbTenses) {
        for (const pronoun of possiblePronouns(tense, allPronouns, verb.passiveVoice === 'impersonal')) {
          const key = buildCardKey(kind, rootType, verb.form, tense, pronoun)
          unique.set(key, { key, kind, rootType, form, tense, pronoun })
        }
      }
    }
  }

  return [...unique.values()]
}

function cardStrength(store: SrsStore, key: string, today: string): number {
  const state = store[key]
  if (state == null || state.dueDate <= today) return 0
  const interval = Math.min(Math.max(1, Math.round(state.interval)), MAX_INTERVAL_DAYS)
  return Math.min(1, Math.max(0, Math.log2(interval + 1) / STRENGTH_DENOMINATOR))
}

function average(values: readonly number[]): number {
  if (values.length === 0) return 0
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

function computeUnlockedScore(cards: readonly PossibleCard[], store: SrsStore, today: string): number {
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

function combinationGroupKey(card: PossibleCard): string {
  if (card.tense != null && card.pronoun != null) return `${card.rootType}:${card.form}:${card.tense}:${card.pronoun}`
  if (PARTICIPLE_KINDS.has(card.kind)) return `${card.rootType}:${card.form}:participles`
  if (MASDAR_KINDS.has(card.kind)) return `${card.rootType}:${card.form}:masdar`
  return `${card.rootType}:${card.form}:${card.kind}`
}

function buildCategory(id: MasteryCategoryId, items: readonly MasteryItem[]): MasteryCategory {
  return { id, items, score: average(items.map((item) => item.score)), locked: items.every((item) => item.locked) }
}
