import type { DimensionUnlock } from './exercises/dimensions'
import type { Exercise } from './exercises/exercises'
import type {
  AnyMasteryItem,
  InsightCandidate,
  InsightData,
  InsightDimension,
  InsightStage,
  MasteryCategoryId,
  MasteryItemIdByCategory,
  PronounClassId,
  Recommendation,
} from './exercises/mastery'
import { localizedPronoun, localizedRootShape, localizedTense, type Translate } from './localization'
import type { VerbTense } from './paradigms/tense'
import { toRoman } from './primitives/numbers'

function localizedNominal(t: Translate, nominal: MasteryItemIdByCategory['nominals']): string {
  switch (nominal) {
    case 'participles':
      return t('exercise.stats.mastery.nominal.participles')
    case 'masdar':
      return t('exercise.stats.mastery.nominal.masdar')
  }
}

export function localizedDimension(t: Translate, dimension: MasteryCategoryId): string {
  switch (dimension) {
    case 'rootTypes':
      return t('exercise.unlock.dimension.rootTypes')
    case 'forms':
      return t('exercise.unlock.dimension.forms')
    case 'tenses':
      return t('exercise.unlock.dimension.tenses')
    case 'pronouns':
      return t('exercise.unlock.dimension.pronouns')
    case 'nominals':
      return t('exercise.unlock.dimension.nominals')
  }
}

function localizedPronounClass(t: Translate, pronounClass: PronounClassId): string {
  switch (pronounClass) {
    case 'singular':
      return t('exercise.insights.pronounClass.singular')
    case 'dual':
      return t('exercise.insights.pronounClass.dual')
    case '1stPlural':
      return t('exercise.insights.pronounClass.1stPlural')
    case '2ndPlural':
      return t('exercise.insights.pronounClass.2ndPlural')
    case '3rdPlural':
      return t('exercise.insights.pronounClass.3rdPlural')
  }
}

export function localizedMasteryItem(t: Translate, item: AnyMasteryItem): string {
  switch (item.categoryId) {
    case 'rootTypes':
      return localizedRootShape(t, item.value)
    case 'forms':
      return t('exercise.stats.mastery.form', { form: toRoman(item.value) })
    case 'tenses':
      return localizedTense(t, item.value)
    case 'pronouns':
      return localizedPronoun(t, item.value)
    case 'nominals':
      return localizedNominal(t, item.value)
  }
}

export function localizedChartTrend(t: Translate, values: readonly number[]): string {
  const first = values[0] ?? 0
  const last = values[values.length - 1] ?? 0
  if (last > first) return t('exercise.stats.chart.trend.up')
  if (last < first) return t('exercise.stats.chart.trend.down')
  return t('exercise.stats.chart.trend.steady')
}

export function localizedStreakUnit(t: Translate, days: number): string {
  return days === 1 ? t('exercise.stats.streak.unit.singular') : t('exercise.stats.streak.unit.plural')
}

export function localizedStreakRecord(t: Translate, days: number): string {
  return days === 1
    ? t('exercise.stats.streak.record.singular', { days: String(days) })
    : t('exercise.stats.streak.record.plural', { days: String(days) })
}

export interface LocalizedInsights {
  journey: string
  momentum: string
  backlog: string | null
  strengths: string | null
  challenge: string | null
  stage: string
  recommendation: string
}

export function localizedInsights(t: Translate, insights: InsightData): LocalizedInsights {
  return {
    journey: localizedJourney(t, insights.journey),
    momentum: localizedMomentum(t, insights.volume.trend),
    backlog: localizedBacklog(t, insights.backlog),
    strengths: localizedStrengths(t, insights.strengths),
    challenge: localizedChallenge(t, insights),
    stage: localizedStage(t, insights.stage),
    recommendation: insights.recommendation.map((item) => localizedRecommendation(t, item)).join(' '),
  }
}

function localizedJourney(t: Translate, journey: InsightData['journey']): string {
  if (journey.days === 0) return t('exercise.insights.journey.new')
  const summary = t('exercise.insights.journey', {
    days: String(journey.days),
    answers: String(journey.answers),
    accuracy: String(journey.accuracy),
  })
  return `${summary} ${localizedJourneyTrend(t, journey.trend)}`
}

function localizedJourneyTrend(t: Translate, trend: InsightData['journey']['trend']): string {
  switch (trend) {
    case 'improving':
      return t('exercise.insights.journey.trend.improving')
    case 'steady':
      return t('exercise.insights.journey.trend.steady')
    case 'declining':
      return t('exercise.insights.journey.trend.declining')
    case 'insufficient':
      return t('exercise.insights.journey.trend.insufficient')
  }
}

function localizedMomentum(t: Translate, trend: InsightData['volume']['trend']): string {
  switch (trend) {
    case 'ramping':
      return t('exercise.insights.momentum.ramping')
    case 'steady':
      return t('exercise.insights.momentum.steady')
    case 'dropping':
      return t('exercise.insights.momentum.dropping')
    case 'inactive':
      return t('exercise.insights.momentum.inactive')
    case 'insufficient':
      return t('exercise.insights.momentum.insufficient')
  }
}

function localizedBacklog(t: Translate, backlog: InsightData['backlog']): string | null {
  switch (backlog.state) {
    case 'none':
      return null
    case 'few':
      return backlog.eta == null
        ? t('exercise.insights.backlog.few.noEta')
        : t('exercise.insights.backlog.few', { eta: localizedBacklogEta(t, backlog.eta) })
    case 'many':
      return backlog.eta == null
        ? t('exercise.insights.backlog.many.noEta')
        : t('exercise.insights.backlog.many', { eta: localizedBacklogEta(t, backlog.eta) })
  }
}

function localizedBacklogEta(t: Translate, eta: NonNullable<InsightData['backlog']['eta']>): string {
  switch (eta) {
    case 'fewDays':
      return t('exercise.insights.backlog.eta.fewDays')
    case 'oneWeek':
      return t('exercise.insights.backlog.eta.oneWeek')
    case 'twoWeeks':
      return t('exercise.insights.backlog.eta.twoWeeks')
    case 'threeWeeks':
      return t('exercise.insights.backlog.eta.threeWeeks')
    case 'fourWeeks':
      return t('exercise.insights.backlog.eta.fourWeeks')
    case 'oneMonthOrMore':
      return t('exercise.insights.backlog.eta.oneMonthOrMore')
  }
}

function localizedStage(t: Translate, stage: InsightStage): string {
  if (stage.nextValue == null) return t('exercise.insights.stage.next.complete')
  switch (stage.nextDimension) {
    case null:
      return t('exercise.insights.stage.next.complete')
    case 'rootTypes':
      return t('exercise.insights.stage.next.rootTypes', { value: localizedRootShape(t, stage.nextValue) })
    case 'tenses':
      return t('exercise.insights.stage.next.tenses', { value: localizedTense(t, stage.nextValue) })
    case 'forms':
      return t('exercise.insights.stage.next.forms', { value: toRoman(Number(stage.nextValue)) })
    case 'pronouns':
      return t('exercise.insights.stage.next.pronouns', { value: localizedPronoun(t, stage.nextValue) })
    case 'nominals':
      return t('exercise.insights.stage.next.nominals', { value: localizedNominal(t, stage.nextValue) })
  }
}

function localizedRecommendation(t: Translate, recommendation: Recommendation): string {
  switch (recommendation.action) {
    case 'keepSteady':
      return t('exercise.insights.recommendation.habit.keepSteady')
    case 'rebuildDailyHabit':
      return t('exercise.insights.recommendation.habit.rebuildDailyHabit')
    case 'protectAccuracy':
      return t('exercise.insights.recommendation.habit.protectAccuracy')
    case 'catchUp':
      return t('exercise.insights.recommendation.habit.catchUp', { count: String(recommendation.dailyTarget) })
    case 'focusCandidate':
      return t('exercise.insights.recommendation.focus.focusCandidate', {
        value: localizedInsightDimension(t, recommendation.candidate),
      })
    case 'keepUnlocking':
      return t('exercise.insights.recommendation.focus.keepUnlocking')
  }
}

function localizedChallenge(t: Translate, insights: InsightData): string | null {
  const [first, second] = insights.stuck.topDimensions
  if (first == null) return localizedChallengeCandidates(t, insights.challenge)
  return second == null
    ? t('exercise.insights.difficult.single', { value: localizedInsightDimension(t, first) })
    : t('exercise.insights.difficult.pair', {
        value1: localizedInsightDimension(t, first),
        value2: localizedInsightDimension(t, second),
      })
}

const CANDIDATE_RANK = {
  rootType: 0,
  tense: 1,
  form: 2,
  pronounClass: 3,
  nominal: 4,
} satisfies Record<InsightCandidate['type'], number>

function localizedStrengthsSingle(t: Translate, candidate: InsightCandidate): string {
  const value = localizedInsightDimension(t, candidate)
  switch (candidate.type) {
    case 'rootType':
      return t('exercise.insights.strengths.single.rootType', { value })
    case 'tense':
      return t('exercise.insights.strengths.single.tense', { value })
    case 'form':
      return t('exercise.insights.strengths.single.form', { value })
    case 'pronounClass':
      return t('exercise.insights.strengths.single.pronounClass', { value })
    case 'nominal':
      return t('exercise.insights.strengths.single.nominal', { value })
  }
}

function localizedStrengths(t: Translate, candidates: readonly InsightCandidate[]): string | null {
  const [a, b] = candidates
  if (a == null) return null
  if (b == null) return localizedStrengthsSingle(t, a)
  const values = { [a.type]: localizedInsightDimension(t, a), [b.type]: localizedInsightDimension(t, b) }
  const [first, second] = CANDIDATE_RANK[a.type] <= CANDIDATE_RANK[b.type] ? [a, b] : [b, a]
  switch (`${first.type}.${second.type}` as const) {
    case 'rootType.tense':
      return t('exercise.insights.strengths.pair.rootType.tense', values)
    case 'rootType.form':
      return t('exercise.insights.strengths.pair.rootType.form', values)
    case 'rootType.pronounClass':
      return t('exercise.insights.strengths.pair.rootType.pronounClass', values)
    case 'rootType.nominal':
      return t('exercise.insights.strengths.pair.rootType.nominal', values)
    case 'tense.form':
      return t('exercise.insights.strengths.pair.tense.form', values)
    case 'tense.pronounClass':
      return t('exercise.insights.strengths.pair.tense.pronounClass', values)
    case 'tense.nominal':
      return t('exercise.insights.strengths.pair.tense.nominal', values)
    case 'form.pronounClass':
      return t('exercise.insights.strengths.pair.form.pronounClass', values)
    case 'form.nominal':
      return t('exercise.insights.strengths.pair.form.nominal', values)
    case 'pronounClass.nominal':
      return t('exercise.insights.strengths.pair.pronounClass.nominal', values)
    // Ranked order leaves only same-type pairs here, and those read as a single candidate.
    default:
      return localizedStrengthsSingle(t, a)
  }
}

function localizedChallengeSingle(t: Translate, candidate: InsightCandidate): string {
  const value = localizedInsightDimension(t, candidate)
  switch (candidate.type) {
    case 'rootType':
      return t('exercise.insights.challenge.single.rootType', { value })
    case 'tense':
      return t('exercise.insights.challenge.single.tense', { value })
    case 'form':
      return t('exercise.insights.challenge.single.form', { value })
    case 'pronounClass':
      return t('exercise.insights.challenge.single.pronounClass', { value })
    case 'nominal':
      return t('exercise.insights.challenge.single.nominal', { value })
  }
}

function localizedChallengeCandidates(t: Translate, candidates: readonly InsightCandidate[]): string | null {
  const [a, b] = candidates
  if (a == null) return null
  if (b == null) return localizedChallengeSingle(t, a)
  const values = { [a.type]: localizedInsightDimension(t, a), [b.type]: localizedInsightDimension(t, b) }
  const [first, second] = CANDIDATE_RANK[a.type] <= CANDIDATE_RANK[b.type] ? [a, b] : [b, a]
  switch (`${first.type}.${second.type}` as const) {
    case 'rootType.tense':
      return t('exercise.insights.challenge.pair.rootType.tense', values)
    case 'rootType.form':
      return t('exercise.insights.challenge.pair.rootType.form', values)
    case 'rootType.pronounClass':
      return t('exercise.insights.challenge.pair.rootType.pronounClass', values)
    case 'rootType.nominal':
      return t('exercise.insights.challenge.pair.rootType.nominal', values)
    case 'tense.form':
      return t('exercise.insights.challenge.pair.tense.form', values)
    case 'tense.pronounClass':
      return t('exercise.insights.challenge.pair.tense.pronounClass', values)
    case 'tense.nominal':
      return t('exercise.insights.challenge.pair.tense.nominal', values)
    case 'form.pronounClass':
      return t('exercise.insights.challenge.pair.form.pronounClass', values)
    case 'form.nominal':
      return t('exercise.insights.challenge.pair.form.nominal', values)
    case 'pronounClass.nominal':
      return t('exercise.insights.challenge.pair.pronounClass.nominal', values)
    // Ranked order leaves only same-type pairs here, and those read as a single candidate.
    default:
      return localizedChallengeSingle(t, a)
  }
}

function localizedInsightDimension(t: Translate, dimension: InsightDimension): string {
  switch (dimension.type) {
    case 'rootType':
    case 'form':
    case 'nominal':
      return localizedUnlock(t, dimension.value)
    case 'tense':
      return localizedTense(t, dimension.value).toLowerCase()
    case 'pronounClass':
      return localizedPronounClass(t, dimension.value)
  }
}

export type StreakHint =
  | { kind: 'streak'; remaining: number }
  | { kind: 'streakAlmostThere' }
  | { kind: 'streakWellDone' }
  | { kind: 'encourage' }
  | { kind: 'skipping' }
  | { kind: 'excellent' }
  | { kind: 'strongDimension'; candidate: InsightCandidate }
  | { kind: 'weakDimension'; candidate: InsightCandidate }
  | { kind: 'vsYesterdayAlmostThere'; target: number }
  | { kind: 'vsYesterdayBelow'; target: number }
  | { kind: 'vsYesterdayEqual' }
  | { kind: 'vsYesterdayExceeded' }
  | { kind: 'none' }

export function localizedStreakHint(t: Translate, hint: StreakHint): string {
  switch (hint.kind) {
    case 'streak':
      return t('exercise.stats.progressHint.streak', { remaining: String(hint.remaining) })
    case 'streakAlmostThere':
      return t('exercise.stats.progressHint.streak.almostThere')
    case 'streakWellDone':
      return t('exercise.stats.progressHint.streak.wellDone')
    case 'encourage':
      return t('exercise.stats.progressHint.encourage')
    case 'skipping':
      return t('exercise.stats.progressHint.skipping')
    case 'excellent':
      return t('exercise.stats.progressHint.excellent')
    case 'strongDimension':
      return t('exercise.stats.progressHint.strongDimension', {
        dimension: localizedStreakDimension(t, hint.candidate),
      })
    case 'weakDimension':
      return t('exercise.stats.progressHint.weakDimension', { dimension: localizedStreakDimension(t, hint.candidate) })
    case 'vsYesterdayAlmostThere':
      return t('exercise.stats.progressHint.vsYesterday.almostThere', { target: String(hint.target) })
    case 'vsYesterdayBelow':
      return t('exercise.stats.progressHint.vsYesterday.below', { target: String(hint.target) })
    case 'vsYesterdayEqual':
      return t('exercise.stats.progressHint.vsYesterday.equal')
    case 'vsYesterdayExceeded':
      return t('exercise.stats.progressHint.vsYesterday.exceeded')
    case 'none':
      return ''
  }
}

function localizedStreakDimension(t: Translate, candidate: InsightCandidate): string {
  switch (candidate.type) {
    case 'rootType':
      return localizedRootShape(t, candidate.value)
    case 'form':
      return t('exercise.stats.mastery.form', { form: toRoman(Number(candidate.value)) })
    case 'tense':
      return localizedTense(t, candidate.value)
    case 'pronounClass':
      return localizedPronounClass(t, candidate.value)
    case 'nominal':
      return localizedNominal(t, candidate.value)
  }
}

export function localizedPrompt(t: Translate, exercise: Exercise): string {
  switch (exercise.kind) {
    case 'conjugation':
      return t('exercise.prompt.conjugation', {
        tense: (exercise.withVoice ? localizedTense : localizedVoicelessTense)(t, exercise.tense).toLowerCase(),
        pronoun: localizedPronoun(t, exercise.pronoun),
      })
    case 'masdarForm':
      return t('exercise.prompt.masdarForm')
    case 'masdarRoot':
      return t('exercise.prompt.masdarRoot')
    case 'masdarVerb':
      return t('exercise.prompt.masdarVerb')
    case 'participleForm':
      return exercise.participle === 'active'
        ? t('exercise.prompt.activeParticipleForm')
        : t('exercise.prompt.passiveParticipleForm')
    case 'participleRoot':
      return exercise.participle === 'active'
        ? t('exercise.prompt.activeParticipleRoot')
        : t('exercise.prompt.passiveParticipleRoot')
    case 'participleVerb':
      return exercise.participle === 'active'
        ? t('exercise.prompt.activeParticipleVerb')
        : t('exercise.prompt.passiveParticipleVerb')
    case 'verbParticiple':
      return exercise.participle === 'active'
        ? t('exercise.prompt.verbActiveParticiple')
        : t('exercise.prompt.verbPassiveParticiple')
    case 'verbForm':
      return t('exercise.prompt.verbForm')
    case 'verbMasdar':
      return t('exercise.prompt.verbMasdar')
    case 'verbPronoun':
      return t('exercise.prompt.verbPronoun')
    case 'verbRoot':
      return t('exercise.prompt.verbRoot')
    case 'rootFormVerb':
      return t('exercise.prompt.rootFormVerb', { form: toRoman(exercise.form) })
    case 'verbTense':
      return t('exercise.prompt.verbTense')
  }
}

export function localizedOptions(t: Translate, exercise: Exercise): readonly string[] {
  if (exercise.kind !== 'verbTense') return exercise.options
  const localized = exercise.withVoice ? localizedTense : localizedVoicelessTense
  return exercise.tenses.map((tense) => localized(t, tense))
}

export function localizedUnlock(t: Translate, unlock: DimensionUnlock): string {
  switch (unlock) {
    case 'presentIndicative':
      return t('exercise.unlock.tenseGroup.presentIndicative')
    case 'subjunctiveJussive':
      return t('exercise.unlock.tenseGroup.subjunctiveJussive')
    case 'imperative':
      return t('exercise.unlock.tenseGroup.imperative')
    case 'passivePast':
      return t('exercise.unlock.tenseGroup.passivePast')
    case 'passivePresent':
      return t('exercise.unlock.tenseGroup.passivePresent')
    case 'singular':
      return t('exercise.unlock.pronounGroup.singular')
    case 'plural':
      return t('exercise.unlock.pronounGroup.plural')
    case 'dual':
      return t('exercise.unlock.pronounGroup.dual')
    case 1:
      return t('exercise.unlock.form.1')
    case 2:
      return t('exercise.unlock.form.2')
    case 3:
      return t('exercise.unlock.form.3')
    case 4:
      return t('exercise.unlock.form.4')
    case 5:
      return t('exercise.unlock.form.5')
    case 6:
      return t('exercise.unlock.form.6')
    case 7:
      return t('exercise.unlock.form.7')
    case 8:
      return t('exercise.unlock.form.8')
    case 9:
      return t('exercise.unlock.form.9')
    case 10:
      return t('exercise.unlock.form.10')
    case 'sound':
      return t('exercise.unlock.rootType.sound')
    case 'doubled':
      return t('exercise.unlock.rootType.doubled')
    case 'assimilated':
      return t('exercise.unlock.rootType.assimilated')
    case 'hollow':
      return t('exercise.unlock.rootType.hollow')
    case 'defective':
      return t('exercise.unlock.rootType.defective')
    case 'hamzated':
      return t('exercise.unlock.rootType.hamzated')
    case 'participles':
      return t('exercise.unlock.nominal.participles')
    case 'masdar':
      return t('exercise.unlock.nominal.masdar')
  }
}

function localizedVoicelessTense(t: Translate, tense: VerbTense): string {
  switch (tense) {
    case 'active.past':
    case 'passive.past':
      return t('tense.past')
    case 'active.present.indicative':
    case 'passive.present.indicative':
      return t('tense.present.indicative')
    case 'active.present.subjunctive':
    case 'passive.present.subjunctive':
      return t('tense.present.subjunctive')
    case 'active.present.jussive':
    case 'passive.present.jussive':
      return t('tense.present.jussive')
    case 'active.future':
    case 'passive.future':
      return t('tense.future')
    case 'active.imperative':
      return t('tense.imperative')
  }
}
