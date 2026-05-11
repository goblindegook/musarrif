import type { PronounId } from '../paradigms/pronouns'
import type { VerbTense } from '../paradigms/tense'
import { FORMS, type VerbForm } from '../paradigms/verbs'
import { utcToday } from '../primitives/dates'
import { average, clamp } from '../primitives/numbers'
import { type DimensionProfile, formPool, pronounPool, rootTypesPool, tensePool } from './dimensions'
import {
  cardSpace,
  isMasdarCard,
  isNominalCard,
  isParticipleCard,
  isVerbCard,
  type SrsCardIdentity,
  type SrsRootType,
  type SrsStore,
} from './srs'

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

const MASTERY_THRESHOLD_DAYS = 365
const STRENGTH_DENOMINATOR = Math.log2(MASTERY_THRESHOLD_DAYS + 1)

export type MasteryCategoryId = 'rootTypes' | 'forms' | 'tenses' | 'pronouns' | 'nominals'

type MasteryItemValueByCategory = {
  rootTypes: SrsRootType
  forms: VerbForm
  tenses: VerbTense
  pronouns: PronounId
  nominals: 'participles' | 'masdar'
}

export type MasteryItemId = {
  [K in MasteryCategoryId]: `${K}.${MasteryItemValueByCategory[K]}`
}[MasteryCategoryId]

export interface MasteryItem {
  id: MasteryItemId
  categoryId: MasteryCategoryId
  value: MasteryItemValueByCategory[MasteryCategoryId]
  score: number
  locked: boolean
}

export interface MasteryCategory {
  id: MasteryCategoryId
  score: number
  locked: boolean
  items: readonly MasteryItem[]
}

export function computeMastery(
  profile: DimensionProfile,
  srsStore: SrsStore,
  today = utcToday(),
): readonly MasteryCategory[] {
  const unlockedRootTypes = new Set(rootTypesPool(profile.rootTypes))
  const unlockedForms = new Set(formPool(profile.forms))
  const unlockedTenses = new Set(tensePool(profile.tenses))
  const unlockedPronouns = new Set(pronounPool(profile.pronouns))
  const unlockedNominals = new Set<string>()
  if (profile.nominals >= 1) unlockedNominals.add('participles')
  if (profile.nominals >= 2) unlockedNominals.add('masdar')

  return [
    buildCategory(
      'rootTypes',
      ROOT_TYPES_ORDER.map((rootType) => {
        const locked = !unlockedRootTypes.has(rootType)
        return {
          id: `rootTypes.${rootType}`,
          categoryId: 'rootTypes',
          value: rootType,
          score: computeScore(
            cardSpace().filter((card) => card.rootType === rootType),
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
          id: `forms.${form}`,
          categoryId: 'forms',
          value: form,
          score: computeScore(
            cardSpace().filter((card) => card.form === form),
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
          id: `tenses.${tense}`,
          categoryId: 'tenses',
          value: tense,
          score: computeScore(
            cardSpace().filter((card) => card.tense === tense && isVerbCard(card)),
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
          id: `pronouns.${pronoun}`,
          categoryId: 'pronouns',
          value: pronoun,
          score: computeScore(
            cardSpace().filter((card) => card.pronoun === pronoun && isVerbCard(card)),
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
          id: `nominals.${nominal}`,
          categoryId: 'nominals',
          value: nominal,
          score: computeScore(
            cardSpace().filter((card) => isNominalCard(card)),
            srsStore,
            today,
            locked,
          ),
          locked,
        }
      }),
    ),
  ]
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
  if (isParticipleCard(card)) return `${card.rootType}:${card.form}:participles`
  if (isMasdarCard(card)) return `${card.rootType}:${card.form}:masdar`
  return `${card.rootType}:${card.form}:${card.kind}`
}

function buildCategory(id: MasteryCategoryId, items: readonly MasteryItem[]): MasteryCategory {
  return { id, items, score: average(items.map((item) => item.score)), locked: items.every((item) => item.locked) }
}

export function findLowestMastery(categories: readonly MasteryCategory[], limit = 5): readonly MasteryItem[] {
  const unlocked = categories.flatMap((cat) => cat.items.filter((item) => !item.locked))
  if (unlocked.length === 0) return []
  const sorted = unlocked.toSorted((a, b) => a.score - b.score)
  const threshold = sorted[Math.min(2, sorted.length - 1)].score
  return sorted.slice(0, limit).filter((item) => item.score <= threshold)
}
