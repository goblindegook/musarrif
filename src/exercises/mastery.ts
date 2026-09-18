import { memoize } from '@pacote/memoize'
import type { PronounId } from '../paradigms/pronouns'
import type { VerbTense } from '../paradigms/tense'
import { FORMS, type TriliteralForm } from '../paradigms/verbs'
import { utcToday } from '../primitives/dates'
import { average, clamp } from '../primitives/numbers'
import { type DimensionProfile, formPool, MAX_LEVELS, pronounPool, rootTypesPool, tensePool } from './dimensions'
import {
  cardSpace,
  getSrsCards,
  isMasdarCard,
  isParticipleCard,
  type SrsCardIdentity,
  type SrsRootType,
  type SrsStore,
  utcAddDays,
} from './srs'
import { getAccuracyPercent, getStatsWindow, type TrackedExercises } from './stats'

const ROOT_TYPES_ORDER: readonly SrsRootType[] = ['sound', 'doubled', 'hamzated', 'assimilated', 'hollow', 'defective']
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
  forms: TriliteralForm
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
  const { groupCounts, cardGroups } = masteryGroups()
  const strongest = new Map<string, number[]>()
  for (const key of Object.keys(srsStore)) {
    const strength = cardStrength(srsStore, key, today)
    for (const { itemId, group } of cardGroups.get(key) ?? []) {
      const groups = strongest.get(itemId) ?? Array<number>(groupCounts.get(itemId) ?? 0).fill(0)
      groups[group] = Math.max(groups[group], strength)
      strongest.set(itemId, groups)
    }
  }

  const category = <K extends MasteryCategoryId>(
    id: K,
    values: readonly MasteryItemIdByCategory[K][],
    unlocked: readonly MasteryItemIdByCategory[K][],
  ): MasteryCategory<K> => {
    const items = values.map((value) => {
      const itemId = `${id}.${value}` as MasteryItem<K>['id']
      const locked = !unlocked.includes(value)
      return { id: itemId, categoryId: id, value, score: locked ? 0 : average(strongest.get(itemId) ?? []), locked }
    })
    return { id, items, score: average(items.map((item) => item.score)), locked: items.every((item) => item.locked) }
  }

  return [
    category('rootTypes', ROOT_TYPES_ORDER, rootTypesPool(profile.rootTypes)),
    category('forms', FORMS, formPool(profile.forms)),
    category('tenses', tensePool(MAX_LEVELS.tenses), tensePool(profile.tenses)),
    category('pronouns', PRONOUN_TABLE_ORDER, pronounPool(profile.pronouns)),
    category('nominals', NOMINAL_ORDER, NOMINAL_ORDER.slice(0, profile.nominals)),
  ]
}

const MASTERY_ITEMS: readonly (readonly [MasteryItemId, (card: SrsCardIdentity) => boolean])[] = [
  ...ROOT_TYPES_ORDER.map(
    (value) => [`rootTypes.${value}`, (card: SrsCardIdentity) => card.rootType === value] as const,
  ),
  ...FORMS.map((value) => [`forms.${value}`, (card: SrsCardIdentity) => card.form === value] as const),
  ...tensePool(MAX_LEVELS.tenses).map(
    (value) => [`tenses.${value}`, (card: SrsCardIdentity) => card.tense === value] as const,
  ),
  ...PRONOUN_TABLE_ORDER.map(
    (value) => [`pronouns.${value}`, (card: SrsCardIdentity) => card.pronoun === value] as const,
  ),
  ['nominals.participles', isParticipleCard],
  ['nominals.masdar', isMasdarCard],
]

const masteryGroups = memoize(
  () => 'constant',
  () => {
    const groupCounts = new Map<MasteryItemId, number>()
    const cardGroups = new Map<string, { itemId: MasteryItemId; group: number }[]>()
    for (const [itemId, matches] of MASTERY_ITEMS) {
      const groups = new Map<string, number>()
      for (const card of cardSpace()) {
        if (!matches(card)) continue
        const groupKey = combinationGroupKey(card)
        const group = groups.get(groupKey) ?? groups.size
        groups.set(groupKey, group)
        const memberships = cardGroups.get(card.key) ?? []
        memberships.push({ itemId, group })
        cardGroups.set(card.key, memberships)
      }
      groupCounts.set(itemId, groups.size)
    }
    return { groupCounts, cardGroups }
  },
)

function cardStrength(store: SrsStore, key: string, today: string): number {
  const state = store[key]
  if (state == null) return 0
  const interval = clamp(Math.round(state.interval), 1, MASTERY_THRESHOLD_DAYS)
  const strength = Math.log2(interval + 1) / STRENGTH_DENOMINATOR
  if (state.dueDate >= today) return strength
  const daysOverdue = (Date.parse(today) - Date.parse(state.dueDate)) / 86_400_000
  return strength * (interval / (interval + daysOverdue))
}

function combinationGroupKey(card: SrsCardIdentity): string {
  if (card.tense != null && card.pronoun != null) return `${card.rootType}:${card.form}:${card.tense}:${card.pronoun}`
  if (isParticipleCard(card)) return `${card.rootType}:${card.form}:participles`
  if (isMasdarCard(card)) return `${card.rootType}:${card.form}:masdar`
  return `${card.rootType}:${card.form}:${card.kind}`
}

export function insightItemIds(
  candidate: Pick<InsightCandidate, 'type' | 'value'>,
  profile: DimensionProfile,
): readonly MasteryItemId[] {
  switch (candidate.type) {
    case 'rootType':
      return [`rootTypes.${candidate.value}` as MasteryItemId]
    case 'tense':
      return [`tenses.${candidate.value}` as MasteryItemId]
    case 'form':
      return [`forms.${candidate.value}` as MasteryItemId]
    case 'nominal':
      return [`nominals.${candidate.value}` as MasteryItemId]
    case 'pronounClass': {
      const unlocked = pronounPool(profile.pronouns)
      return PRONOUN_CLASS_MEMBERS[candidate.value as PronounClassId]
        .filter((pronoun) => unlocked.includes(pronoun))
        .map((pronoun) => `pronouns.${pronoun}` as MasteryItemId)
    }
  }
}

export type InsightCandidateType = 'rootType' | 'tense' | 'form' | 'pronounClass' | 'nominal'
type PronounClassId = 'singular' | 'dual' | '1stPlural' | '2ndPlural' | '3rdPlural'

export interface InsightCandidate {
  type: InsightCandidateType
  value: string
  score: number
}

export type BacklogState = 'none' | 'few' | 'many'
export type BacklogETA = 'fewDays' | 'oneWeek' | 'twoWeeks' | 'threeWeeks' | 'fourWeeks' | 'oneMonthOrMore'

export type Recommendation =
  | { kind: 'habit'; action: 'keepSteady' | 'increaseSlightly' | 'rebuildDailyHabit' | 'protectAccuracy' }
  | { kind: 'focus'; action: 'focusCandidate'; candidate: Pick<InsightCandidate, 'type' | 'value'> }
  | { kind: 'focus'; action: 'keepUnlocking' }

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
    nextDimension?: MasteryCategoryId
    nextValue?: string
  }
  volume: {
    trend: 'ramping' | 'steady' | 'dropping' | 'inactive' | 'insufficient'
  }
  overdue: {
    count: number
  }
  backlog: {
    state: BacklogState
    eta?: BacklogETA
  }
  stuck: {
    topDimensions: readonly InsightCandidate[]
  }
  focus: readonly InsightCandidate[]
  recommendation: readonly Recommendation[]
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

function getPronounClass(pronoun: PronounId): PronounClassId | null {
  for (const classId of PRONOUN_CLASS_ORDER) {
    if (PRONOUN_CLASS_MEMBERS[classId].includes(pronoun)) return classId
  }
  return null
}

function computeStuck(srsStore: SrsStore): InsightData['stuck'] {
  const stuck = getSrsCards(srsStore).filter((c) => c.ef <= 1.5 && c.repetitions < 3)

  if (stuck.length === 0) return { topDimensions: [] }

  const counts = new Map<string, { type: InsightCandidateType; value: string; count: number }>()

  const bump = (type: InsightCandidateType, value: string) => {
    const mapKey = `${type}:${value}`
    const entry = counts.get(mapKey)
    if (entry != null) entry.count++
    else counts.set(mapKey, { type, value, count: 1 })
  }

  for (const card of stuck) {
    bump('rootType', card.rootType)
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
  if (avgRecent === 0 && stats.length > 0) return { trend: 'inactive' }
  if (avgPrior === 0) return { trend: 'insufficient' }
  if (avgRecent > avgPrior * 1.25) return { trend: 'ramping' }
  if (avgRecent < avgPrior * 0.75) return { trend: 'dropping' }
  return { trend: 'steady' }
}

function computeBacklogState(overdueCount: number, eta?: BacklogETA): BacklogState {
  if (overdueCount === 0) return 'none'
  if (eta == null) return overdueCount <= 20 ? 'few' : 'many'
  return eta === 'fewDays' || eta === 'oneWeek' ? 'few' : 'many'
}

function estimateBacklogETA(srsStore: SrsStore, stats: TrackedExercises, today: string): BacklogETA | undefined {
  const todayDate = new Date(`${today}T00:00:00`)
  const recentWindow = getStatsWindow(stats, 14, todayDate)
  const dailyPace = average(recentWindow.map((d) => d.correct + d.incorrect + d.passed))
  if (dailyPace < 1) return

  const overdueCount = Object.values(srsStore).filter((state) => state.dueDate < today).length
  if (overdueCount === 0) return

  const futureDue = new Map<string, number>()
  for (const state of Object.values(srsStore)) {
    if (state.dueDate < today) continue
    futureDue.set(state.dueDate, (futureDue.get(state.dueDate) ?? 0) + 1)
  }

  let newlyDue = 0
  for (let day = 0; day <= 60; day++) {
    const date = utcAddDays(today, day)
    newlyDue += futureDue.get(date) ?? 0
    if (dailyPace * day >= overdueCount + newlyDue) return backlogEtaBucket(day)
  }

  return 'oneMonthOrMore'
}

function backlogEtaBucket(days: number): BacklogETA {
  if (days <= 3) return 'fewDays'
  if (days <= 7) return 'oneWeek'
  if (days <= 14) return 'twoWeeks'
  if (days <= 21) return 'threeWeeks'
  if (days <= 28) return 'fourWeeks'
  return 'oneMonthOrMore'
}

function buildRecommendations(
  journeyTrend: InsightData['journey']['trend'],
  volumeTrend: InsightData['volume']['trend'],
  backlogState: BacklogState,
  stuck: InsightData['stuck'],
  challenge: readonly InsightCandidate[],
): readonly Recommendation[] {
  const candidate = stuck.topDimensions[0] ?? challenge[0]

  return [
    {
      kind: 'habit',
      action:
        journeyTrend === 'declining'
          ? 'protectAccuracy'
          : volumeTrend === 'inactive'
            ? 'rebuildDailyHabit'
            : backlogState === 'many'
              ? 'increaseSlightly'
              : 'keepSteady',
    },
    candidate ? { kind: 'focus', action: 'focusCandidate', candidate } : { kind: 'focus', action: 'keepUnlocking' },
  ]
}

export function computeInsights(
  profile: DimensionProfile,
  srsStore: SrsStore,
  stats: TrackedExercises,
  today = utcToday(),
): InsightData {
  const todayDate = new Date(`${today}T00:00:00`)
  const accuracy = getAccuracyPercent(stats)
  const trend = computeInsightTrend(stats, accuracy, getStatsWindow(stats, 15, todayDate))

  const practised = getSrsCards(srsStore)
  const unlockedPronouns = pronounPool(profile.pronouns)
  const candidate = (type: InsightCandidateType, value: string, matches: (card: SrsCardIdentity) => boolean) =>
    practisedCandidate(type, value, practised.filter(matches), srsStore, today)

  const sorted = [
    ...rootTypesPool(profile.rootTypes).map((value) => candidate('rootType', value, (c) => c.rootType === value)),
    ...tensePool(profile.tenses).map((value) => candidate('tense', value, (c) => c.tense === value)),
    ...formPool(profile.forms).map((value) => candidate('form', String(value), (c) => c.form === value)),
    ...PRONOUN_CLASS_ORDER.map((classId) =>
      candidate(
        'pronounClass',
        classId,
        (c) =>
          c.pronoun != null &&
          PRONOUN_CLASS_MEMBERS[classId].includes(c.pronoun) &&
          unlockedPronouns.includes(c.pronoun),
      ),
    ),
    ...NOMINAL_ORDER.slice(0, profile.nominals).map((value) =>
      candidate('nominal', value, value === 'participles' ? isParticipleCard : isMasdarCard),
    ),
  ]
    .filter((c): c is InsightCandidate => c != null)
    .sort((a, b) => a.score - b.score)

  const nextDimension =
    MASTERY_DIMENSION_KEYS.filter((dim) => profile[dim] < MAX_LEVELS[dim]).sort(
      (a, b) => profile[a] / MAX_LEVELS[a] - profile[b] / MAX_LEVELS[b],
    )[0] ?? null
  const overdueCount = Object.values(srsStore).filter((s) => s.dueDate < today).length
  const eta = estimateBacklogETA(srsStore, stats, today)
  const backlog = { state: computeBacklogState(overdueCount, eta), eta }
  const volume = computeVolumeTrend(stats, todayDate)
  const stuck = computeStuck(srsStore)
  const challenge = sorted.filter((c) => c.score < STRENGTH_THRESHOLD).slice(0, 2)

  return {
    journey: {
      days: stats.length,
      answers: stats.reduce((s, d) => s + d.correct + d.incorrect, 0),
      accuracy,
      trend,
    },
    strengths: sorted
      .filter((c) => c.score >= STRENGTH_THRESHOLD)
      .slice(-2)
      .reverse(),
    challenge,
    stage: {
      nextDimension,
      nextValue: nextDimension != null ? insightNextValue(profile, nextDimension) : undefined,
    },
    volume,
    overdue: { count: overdueCount },
    backlog,
    stuck,
    focus: stuck.topDimensions.length > 0 ? stuck.topDimensions : challenge,
    recommendation: buildRecommendations(trend, volume.trend, backlog.state, stuck, challenge),
  }
}

const MIN_PRACTISED_CARDS = 3
const STRENGTH_THRESHOLD = 0.5

function practisedCandidate(
  type: InsightCandidateType,
  value: string,
  cards: readonly SrsCardIdentity[],
  store: SrsStore,
  today: string,
): InsightCandidate | null {
  if (cards.length < MIN_PRACTISED_CARDS) return null
  const grouped = new Map<string, number>()
  for (const card of cards) {
    const combinationKey = combinationGroupKey(card)
    const strength = cardStrength(store, card.key, today)
    const current = grouped.get(combinationKey)
    if (current == null || strength > current) grouped.set(combinationKey, strength)
  }
  return { type, value, score: average([...grouped.values()]) }
}

function computeInsightTrend(
  stats: TrackedExercises,
  allTimeAccuracy: number,
  recentWindow: TrackedExercises,
): InsightData['journey']['trend'] {
  if (stats.length < 15 || recentWindow.every((d) => d.correct + d.incorrect === 0)) return 'insufficient'
  const recentAccuracy = getAccuracyPercent(recentWindow)
  if (recentAccuracy > allTimeAccuracy + 5) return 'improving'
  if (recentAccuracy < allTimeAccuracy - 5) return 'declining'
  return 'steady'
}

function insightNextValue(profile: DimensionProfile, dim: MasteryCategoryId): string | undefined {
  switch (dim) {
    case 'rootTypes': {
      const next = (profile.rootTypes + 1) as typeof profile.rootTypes
      return rootTypesPool(next).find((v) => !rootTypesPool(profile.rootTypes).includes(v))
    }
    case 'tenses': {
      const next = (profile.tenses + 1) as typeof profile.tenses
      return tensePool(next).find((v) => !tensePool(profile.tenses).includes(v))
    }
    case 'forms': {
      const next = (profile.forms + 1) as typeof profile.forms
      const added = formPool(next).find((v) => !formPool(profile.forms).includes(v))
      return added != null ? String(added) : undefined
    }
    case 'pronouns': {
      const next = (profile.pronouns + 1) as typeof profile.pronouns
      return pronounPool(next).find((v) => !pronounPool(profile.pronouns).includes(v))
    }
    case 'nominals':
      return NOMINAL_ORDER.at(profile.nominals)
  }
}
