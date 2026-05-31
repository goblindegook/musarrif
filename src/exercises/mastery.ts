import type { PronounId } from '../paradigms/pronouns'
import type { VerbTense } from '../paradigms/tense'
import { FORMS, type VerbForm } from '../paradigms/verbs'
import { utcToday } from '../primitives/dates'
import { average, clamp } from '../primitives/numbers'
import { type DimensionProfile, formPool, MAX_LEVELS, pronounPool, rootTypesPool, tensePool } from './dimensions'
import {
  cardSpace,
  getSrsCards,
  isMasdarCard,
  isNominalCard,
  isParticipleCard,
  isVerbCard,
  type SrsCardIdentity,
  type SrsRootType,
  type SrsStore,
} from './srs'
import { getAccuracyPercent, getRecentAccuracyPercent, getStatsWindow, type TrackedExercises } from './stats'

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

const MASTERY_THRESHOLD_DAYS = 90
const STRENGTH_DENOMINATOR = Math.log2(MASTERY_THRESHOLD_DAYS + 1)

export type MasteryCategoryId = 'rootTypes' | 'forms' | 'tenses' | 'pronouns' | 'nominals'

export type MasteryItemIdByCategory = {
  rootTypes: SrsRootType
  forms: VerbForm
  tenses: VerbTense
  pronouns: PronounId
  nominals: 'participles' | 'masdar'
}

export type MasteryItemId = {
  [K in MasteryCategoryId]: `${K}.${MasteryItemIdByCategory[K]}`
}[MasteryCategoryId]

export interface MasteryItem<K extends MasteryCategoryId> {
  id: `${K}.${MasteryItemIdByCategory[K]}`
  categoryId: K
  value: MasteryItemIdByCategory[K]
  score: number
  locked: boolean
}

export interface MasteryCategory<K extends MasteryCategoryId> {
  id: K
  score: number
  locked: boolean
  items: readonly MasteryItem<K>[]
}

export function computeMastery(
  profile: DimensionProfile,
  srsStore: SrsStore,
  today = utcToday(),
): readonly MasteryCategory<MasteryCategoryId>[] {
  const cards = cardSpace()
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
      ROOT_TYPES_ORDER.map((value) => {
        const locked = !unlockedRootTypes.has(value)
        return {
          id: `rootTypes.${value}`,
          categoryId: 'rootTypes',
          value,
          score: computeScore(
            cards.filter((card) => card.rootType === value),
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
      FORMS.map((value) => {
        const locked = !unlockedForms.has(value)
        return {
          id: `forms.${value}`,
          categoryId: 'forms',
          value,
          score: computeScore(
            cards.filter((card) => card.form === value),
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
      TENSE_ORDER.map((value) => {
        const locked = !unlockedTenses.has(value)
        return {
          id: `tenses.${value}`,
          categoryId: 'tenses',
          value,
          score: computeScore(
            cards.filter((card) => card.tense === value && isVerbCard(card)),
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
      PRONOUN_TABLE_ORDER.map((value) => {
        const locked = !unlockedPronouns.has(value)
        return {
          id: `pronouns.${value}`,
          categoryId: 'pronouns',
          value,
          score: computeScore(
            cards.filter((card) => card.pronoun === value && isVerbCard(card)),
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
      NOMINAL_ORDER.map((value) => {
        const locked = !unlockedNominals.has(value)
        return {
          id: `nominals.${value}`,
          categoryId: 'nominals',
          value,
          score: computeScore(
            cards.filter((card) => isNominalCard(card)),
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

function buildCategory<K extends MasteryCategoryId>(id: K, items: readonly MasteryItem<K>[]): MasteryCategory<K> {
  return { id, items, score: average(items.map((item) => item.score)), locked: items.every((item) => item.locked) }
}

export function findLowestMastery<K extends MasteryCategoryId>(
  mastery: readonly MasteryCategory<K>[],
  limit = 5,
): readonly MasteryItem<K>[] {
  const unlocked = mastery.flatMap((cat) => cat.items.filter((item) => !item.locked))
  if (unlocked.length === 0) return []
  const sorted = unlocked.toSorted((a, b) => a.score - b.score)
  const threshold = sorted[Math.min(2, sorted.length - 1)].score
  return sorted.slice(0, limit).filter((item) => item.score <= threshold)
}

export type InsightCandidateType = 'rootType' | 'tense' | 'form' | 'pronounClass'
export type PronounClassId = 'singular' | 'dual' | '1stPlural' | '2ndPlural' | '3rdPlural'

export interface InsightCandidate {
  type: InsightCandidateType
  value: string
  score: number
}

export interface InsightData {
  journey: {
    days: number
    answers: number
    accuracy: number
    trend: 'improving' | 'steady' | 'declining' | 'insufficient'
  }
  strengths: readonly InsightCandidate[]
  challenge: readonly InsightCandidate[]
  stage: {
    unlockedRootTypes: number
    totalRootTypes: number
    nextDimension: MasteryCategoryId | null
    nextValue: string | null
  }
  volume: {
    trend: 'ramping' | 'steady' | 'dropping' | 'inactive' | 'insufficient'
  }
  overdue: {
    count: number
  }
  stuck: {
    topDimensions: readonly InsightCandidate[]
  }
}

const MASTERY_DIMENSION_KEYS: readonly MasteryCategoryId[] = ['rootTypes', 'forms', 'tenses', 'pronouns', 'nominals']

const PRONOUN_CLASS_MEMBERS: Record<PronounClassId, readonly PronounId[]> = {
  singular: ['1s', '2ms', '2fs', '3ms', '3fs'],
  dual: ['2d', '3md', '3fd'],
  '1stPlural': ['1p'],
  '2ndPlural': ['2mp', '2fp'],
  '3rdPlural': ['3mp', '3fp'],
}

const PRONOUN_CLASS_ORDER: readonly PronounClassId[] = ['singular', 'dual', '1stPlural', '2ndPlural', '3rdPlural']

const STUCK_EF_THRESHOLD = 1.5
const STUCK_MIN_REPETITIONS = 3

function getPronounClass(pronoun: PronounId): PronounClassId | null {
  for (const classId of PRONOUN_CLASS_ORDER) {
    if (PRONOUN_CLASS_MEMBERS[classId].includes(pronoun)) return classId
  }
  return null
}

function computeStuck(srsStore: SrsStore): InsightData['stuck'] {
  const stuck = getSrsCards(srsStore).filter(
    (c) => c.ef <= STUCK_EF_THRESHOLD && c.repetitions >= STUCK_MIN_REPETITIONS,
  )

  if (stuck.length === 0) return { topDimensions: [] }

  const counts = new Map<string, { type: InsightCandidateType; value: string; count: number }>()

  const bump = (type: InsightCandidateType, value: string) => {
    const mapKey = `${type}:${value}`
    const entry = counts.get(mapKey)
    if (entry != null) entry.count++
    else counts.set(mapKey, { type, value, count: 1 })
  }

  for (const card of stuck) {
    bump('form', String(card.form))
    if (card.tense != null) bump('tense', card.tense)
    if (card.pronoun != null) {
      const pronounClass = getPronounClass(card.pronoun)
      if (pronounClass != null) bump('pronounClass', pronounClass)
    }
  }

  const total = stuck.length
  const sorted = [...counts.values()].filter(({ count }) => count < total).sort((a, b) => b.count - a.count)

  return {
    topDimensions: sorted.slice(0, 2).map(({ type, value, count }) => ({
      type,
      value,
      score: count / total,
    })),
  }
}

function computeVolumeTrend(stats: TrackedExercises, today: Date): InsightData['volume'] {
  const window = getStatsWindow(stats, 14, today)
  const prior = window.slice(0, 7)
  const recent = window.slice(7, 14)
  const avgPrior = average(prior.map((d) => d.correct + d.incorrect))
  const avgRecent = average(recent.map((d) => d.correct + d.incorrect))
  if (avgPrior === 0) return { trend: 'insufficient' }
  if (avgRecent === 0) return { trend: 'inactive' }
  if (avgRecent > avgPrior * 1.25) return { trend: 'ramping' }
  if (avgRecent < avgPrior * 0.75) return { trend: 'dropping' }
  return { trend: 'steady' }
}

export function computeInsights(
  profile: DimensionProfile,
  srsStore: SrsStore,
  stats: TrackedExercises,
  today = utcToday(),
): InsightData {
  const mastery = computeMastery(profile, srsStore, today)

  const todayDate = new Date(`${today}T00:00:00`)
  const accuracy = getAccuracyPercent(stats)
  const recentAccuracy = getRecentAccuracyPercent(stats, 15, todayDate)
  const trend = computeInsightTrend(stats, accuracy, recentAccuracy)

  const candidates: InsightCandidate[] = []

  for (const item of (mastery.find((c) => c.id === 'rootTypes')?.items ?? []).filter((i) => !i.locked))
    candidates.push({ type: 'rootType', value: String(item.value), score: item.score })

  for (const item of (mastery.find((c) => c.id === 'tenses')?.items ?? []).filter((i) => !i.locked))
    candidates.push({ type: 'tense', value: String(item.value), score: item.score })

  for (const item of (mastery.find((c) => c.id === 'forms')?.items ?? []).filter((i) => !i.locked))
    candidates.push({ type: 'form', value: String(item.value), score: item.score })

  const pronounItems = mastery.find((c) => c.id === 'pronouns')?.items ?? []
  for (const classId of PRONOUN_CLASS_ORDER) {
    const unlockedMembers = pronounItems.filter(
      (item) => PRONOUN_CLASS_MEMBERS[classId].includes(item.value as PronounId) && !item.locked,
    )
    if (unlockedMembers.length > 0)
      candidates.push({ type: 'pronounClass', value: classId, score: average(unlockedMembers.map((i) => i.score)) })
  }

  const sorted = candidates.sort((a, b) => a.score - b.score)

  const nextDimension =
    MASTERY_DIMENSION_KEYS.filter((dim) => profile[dim] < MAX_LEVELS[dim]).sort(
      (a, b) => profile[a] / MAX_LEVELS[a] - profile[b] / MAX_LEVELS[b],
    )[0] ?? null

  return {
    journey: {
      days: stats.length,
      answers: stats.reduce((s, d) => s + d.correct + d.incorrect, 0),
      accuracy,
      trend,
    },
    strengths: sorted.slice(-2).reverse(),
    challenge: sorted.slice(0, 2),
    stage: {
      unlockedRootTypes: rootTypesPool(profile.rootTypes).length,
      totalRootTypes: 6,
      nextDimension,
      nextValue: nextDimension != null ? insightNextValue(profile, nextDimension) : null,
    },
    volume: computeVolumeTrend(stats, todayDate),
    overdue: { count: Object.values(srsStore).filter((s) => s.dueDate <= today).length },
    stuck: computeStuck(srsStore),
  }
}

function computeInsightTrend(
  stats: TrackedExercises,
  allTimeAccuracy: number,
  recentAccuracy: number,
): InsightData['journey']['trend'] {
  if (stats.length < 15) return 'insufficient'
  if (recentAccuracy > allTimeAccuracy + 5) return 'improving'
  if (recentAccuracy < allTimeAccuracy - 5) return 'declining'
  return 'steady'
}

function insightNextValue(profile: DimensionProfile, dim: MasteryCategoryId): string | null {
  switch (dim) {
    case 'rootTypes': {
      const next = (profile.rootTypes + 1) as typeof profile.rootTypes
      return rootTypesPool(next).find((v) => !rootTypesPool(profile.rootTypes).includes(v)) ?? null
    }
    case 'tenses': {
      const next = (profile.tenses + 1) as typeof profile.tenses
      return tensePool(next).find((v) => !tensePool(profile.tenses).includes(v)) ?? null
    }
    case 'forms': {
      const next = (profile.forms + 1) as typeof profile.forms
      const added = formPool(next).find((v) => !formPool(profile.forms).includes(v))
      return added != null ? String(added) : null
    }
    case 'pronouns': {
      const next = (profile.pronouns + 1) as typeof profile.pronouns
      return pronounPool(next).find((v) => !pronounPool(profile.pronouns).includes(v)) ?? null
    }
    case 'nominals': {
      const next = profile.nominals + 1
      return next === 1 ? 'participles' : next === 2 ? 'masdar' : null
    }
  }
}
