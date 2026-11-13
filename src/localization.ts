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
import {
  type ExplanationKind,
  type ExplanationLayers,
  type ExplanationSentence,
  type FormIVowel,
  type FormRootInteraction,
  hasAbsorbedDualAlif,
  hasAlifAlWasl,
  hasAssimilatedEndingNun,
  isLaysa,
  isNeutralizedByForm,
  type NominalExplanationLayers,
  type NominalRootInteraction,
  PAST_VOWEL_NAMES,
  type Paragraph,
  type Paragraphs,
  type TenseRootInteraction,
  toArabicText,
  type VerbExplanationLayers,
  type VerbFormDescriptor,
} from './paradigms/explanation'
import type { FormIPattern } from './paradigms/form-i-vowels'
import type { PronounId } from './paradigms/pronouns'
import {
  behaviourShapes,
  type RootAnalysis,
  type RootShape,
  rootTypeLocaleKey,
  type WeakLetter,
} from './paradigms/roots'
import type { Mood, Tense, VerbTense, Voice } from './paradigms/tense'
import type { DiacriticsPreference } from './paradigms/tokens'
import { ALIF, FATHA, NOON } from './paradigms/tokens'
import type { TriliteralForm, Valency } from './paradigms/verb-types'
import { toRoman } from './primitives/numbers'

export type Translate = (key: string, params?: Record<string, string>) => string

export function localizedTense(t: Translate, tense: VerbTense): string {
  switch (tense) {
    case 'active.past':
      return t('tense.active.past')
    case 'active.present.indicative':
      return t('tense.active.present.indicative')
    case 'active.present.subjunctive':
      return t('tense.active.present.subjunctive')
    case 'active.present.jussive':
      return t('tense.active.present.jussive')
    case 'active.future':
      return t('tense.active.future')
    case 'active.imperative':
      return t('tense.active.imperative')
    case 'passive.past':
      return t('tense.passive.past')
    case 'passive.present.indicative':
      return t('tense.passive.present.indicative')
    case 'passive.present.subjunctive':
      return t('tense.passive.present.subjunctive')
    case 'passive.present.jussive':
      return t('tense.passive.present.jussive')
    case 'passive.future':
      return t('tense.passive.future')
  }
}

export function localizedPronoun(t: Translate, pronoun: PronounId, abbreviated = false): string {
  switch (pronoun) {
    case '1s':
      return abbreviated ? t('pronoun.1s.abbreviated') : t('pronoun.1s')
    case '2ms':
      return abbreviated ? t('pronoun.2ms.abbreviated') : t('pronoun.2ms')
    case '2fs':
      return abbreviated ? t('pronoun.2fs.abbreviated') : t('pronoun.2fs')
    case '3ms':
      return abbreviated ? t('pronoun.3ms.abbreviated') : t('pronoun.3ms')
    case '3fs':
      return abbreviated ? t('pronoun.3fs.abbreviated') : t('pronoun.3fs')
    case '2d':
      return abbreviated ? t('pronoun.2d.abbreviated') : t('pronoun.2d')
    case '3md':
      return abbreviated ? t('pronoun.3md.abbreviated') : t('pronoun.3md')
    case '3fd':
      return abbreviated ? t('pronoun.3fd.abbreviated') : t('pronoun.3fd')
    case '1p':
      return abbreviated ? t('pronoun.1p.abbreviated') : t('pronoun.1p')
    case '2mp':
      return abbreviated ? t('pronoun.2mp.abbreviated') : t('pronoun.2mp')
    case '2fp':
      return abbreviated ? t('pronoun.2fp.abbreviated') : t('pronoun.2fp')
    case '3mp':
      return abbreviated ? t('pronoun.3mp.abbreviated') : t('pronoun.3mp')
    case '3fp':
      return abbreviated ? t('pronoun.3fp.abbreviated') : t('pronoun.3fp')
  }
}

export function localizedVoice(t: Translate, voice: Voice): string {
  switch (voice) {
    case 'active':
      return t('voice.active')
    case 'passive':
      return t('voice.passive')
  }
}

export function localizedSimpleTense(t: Translate, tense: Tense): string {
  switch (tense) {
    case 'past':
      return t('tense.past')
    case 'present':
      return t('tense.present')
    case 'future':
      return t('tense.future')
    case 'imperative':
      return t('mood.imperative')
  }
}

export function localizedMood(t: Translate, mood: Mood): string {
  switch (mood) {
    case 'indicative':
      return t('mood.indicative')
    case 'subjunctive':
      return t('mood.subjunctive')
    case 'jussive':
      return t('mood.jussive')
  }
}

export function localizedRootShape(t: Translate, shape: RootShape): string {
  switch (shape) {
    case 'sound':
      return t('rootType.sound')
    case 'assimilated':
      return t('rootType.assimilated')
    case 'hollow':
      return t('rootType.hollow')
    case 'defective':
      return t('rootType.defective')
    case 'doubled':
      return t('rootType.doubled')
    case 'hamzated':
      return t('rootType.hamzated')
    case 'biliteral':
      return t('rootType.biliteral')
  }
}

export function localizedRootDescription(t: Translate, analysis: Pick<RootAnalysis, 'type' | 'weakLetter'>): string {
  switch (rootTypeLocaleKey(analysis.type, analysis.weakLetter)) {
    case 'assimilated':
      return t('rootInfo.assimilated.description')
    case 'assimilated-defective-waw':
      return t('rootInfo.assimilated-defective-waw.description')
    case 'assimilated-defective-yaa':
      return t('rootInfo.assimilated-defective-yaa.description')
    case 'assimilated-doubled':
      return t('rootInfo.assimilated-doubled.description')
    case 'assimilated-hollow-waw':
      return t('rootInfo.assimilated-hollow-waw.description')
    case 'assimilated-hollow-yaa':
      return t('rootInfo.assimilated-hollow-yaa.description')
    case 'defective':
      return t('rootInfo.defective.description')
    case 'defective-waw':
      return t('rootInfo.defective-waw.description')
    case 'defective-yaa':
      return t('rootInfo.defective-yaa.description')
    case 'doubled':
      return t('rootInfo.doubled.description')
    case 'hamzated':
      return t('rootInfo.hamzated.description')
    case 'hamzated-assimilated':
      return t('rootInfo.hamzated-assimilated.description')
    case 'hamzated-assimilated-defective-yaa':
      return t('rootInfo.hamzated-assimilated-defective-yaa.description')
    case 'hamzated-defective':
      return t('rootInfo.hamzated-defective.description')
    case 'hamzated-defective-waw':
      return t('rootInfo.hamzated-defective-waw.description')
    case 'hamzated-defective-yaa':
      return t('rootInfo.hamzated-defective-yaa.description')
    case 'hamzated-doubled':
      return t('rootInfo.hamzated-doubled.description')
    case 'hamzated-hollow':
      return t('rootInfo.hamzated-hollow.description')
    case 'hamzated-hollow-defective':
      return t('rootInfo.hamzated-hollow-defective.description')
    case 'hamzated-hollow-waw':
      return t('rootInfo.hamzated-hollow-waw.description')
    case 'hamzated-hollow-yaa':
      return t('rootInfo.hamzated-hollow-yaa.description')
    case 'hollow':
      return t('rootInfo.hollow.description')
    case 'hollow-defective-waw':
      return t('rootInfo.hollow-defective-waw.description')
    case 'hollow-defective-yaa':
      return t('rootInfo.hollow-defective-yaa.description')
    case 'hollow-waw':
      return t('rootInfo.hollow-waw.description')
    case 'hollow-yaa':
      return t('rootInfo.hollow-yaa.description')
    default:
      return t('rootInfo.sound.description')
  }
}

export function localizedFormMeaning(t: Translate, form: VerbFormDescriptor): string {
  switch (form) {
    case '1-action':
      return t('formInfo.form1-action.semantic')
    case '1-intermediate':
      return t('formInfo.form1-intermediate.semantic')
    case '1-stative':
      return t('formInfo.form1-stative.semantic')
    case '2':
      return t('formInfo.form2.semantic')
    case '3':
      return t('formInfo.form3.semantic')
    case '4':
      return t('formInfo.form4.semantic')
    case '5':
      return t('formInfo.form5.semantic')
    case '6':
      return t('formInfo.form6.semantic')
    case '7':
      return t('formInfo.form7.semantic')
    case '8':
      return t('formInfo.form8.semantic')
    case '9':
      return t('formInfo.form9.semantic')
    case '10':
      return t('formInfo.form10.semantic')
    case '1q':
      return t('formInfo.form1q.semantic')
    case '2q':
      return t('formInfo.form2q.semantic')
    case '3q':
      return t('formInfo.form3q.semantic')
    case '4q':
      return t('formInfo.form4q.semantic')
  }
}

export function localizedFormRelationship(t: Translate, form: TriliteralForm): string {
  switch (form) {
    case 1:
      return t('formInfo.form1.relationship')
    case 2:
      return t('formInfo.form2.relationship')
    case 3:
      return t('formInfo.form3.relationship')
    case 4:
      return t('formInfo.form4.relationship')
    case 5:
      return t('formInfo.form5.relationship')
    case 6:
      return t('formInfo.form6.relationship')
    case 7:
      return t('formInfo.form7.relationship')
    case 8:
      return t('formInfo.form8.relationship')
    case 9:
      return t('formInfo.form9.relationship')
    case 10:
      return t('formInfo.form10.relationship')
  }
}

export function localizedNominal(t: Translate, nominal: MasteryItemIdByCategory['nominals']): string {
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

export function localizedPronounClass(t: Translate, pronounClass: PronounClassId): string {
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

export function localizedValency(t: Translate, valency: Valency): string {
  switch (valency) {
    case 1:
      return t('valency.1')
    case 2:
      return t('valency.2')
    case 3:
      return t('valency.3')
  }
}

export function localizedSortOrder(t: Translate, order: 'frequency' | 'alphabetical'): string {
  switch (order) {
    case 'frequency':
      return t('verbsList.sort.frequency.label')
    case 'alphabetical':
      return t('verbsList.sort.alphabetical.label')
  }
}

export function localizedDiacritics(t: Translate, option: DiacriticsPreference): string {
  switch (option) {
    case 'all':
      return t('diacritics.all')
    case 'some':
      return t('diacritics.some')
    case 'none':
      return t('diacritics.none')
  }
}

export function localizedTheme(t: Translate, option: 'light' | 'dark' | 'system'): string {
  switch (option) {
    case 'light':
      return t('theme.light')
    case 'dark':
      return t('theme.dark')
    case 'system':
      return t('theme.system')
  }
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
  switch (`${a.type}.${b.type}` as const) {
    case 'rootType.rootType':
    case 'tense.tense':
    case 'form.form':
    case 'pronounClass.pronounClass':
    case 'nominal.nominal':
      return localizedStrengthsSingle(t, a)
    case 'rootType.tense':
    case 'tense.rootType':
      return t('exercise.insights.strengths.pair.rootType.tense', values)
    case 'rootType.form':
    case 'form.rootType':
      return t('exercise.insights.strengths.pair.rootType.form', values)
    case 'rootType.pronounClass':
    case 'pronounClass.rootType':
      return t('exercise.insights.strengths.pair.rootType.pronounClass', values)
    case 'rootType.nominal':
    case 'nominal.rootType':
      return t('exercise.insights.strengths.pair.rootType.nominal', values)
    case 'tense.form':
    case 'form.tense':
      return t('exercise.insights.strengths.pair.tense.form', values)
    case 'tense.pronounClass':
    case 'pronounClass.tense':
      return t('exercise.insights.strengths.pair.tense.pronounClass', values)
    case 'tense.nominal':
    case 'nominal.tense':
      return t('exercise.insights.strengths.pair.tense.nominal', values)
    case 'form.pronounClass':
    case 'pronounClass.form':
      return t('exercise.insights.strengths.pair.form.pronounClass', values)
    case 'form.nominal':
    case 'nominal.form':
      return t('exercise.insights.strengths.pair.form.nominal', values)
    case 'pronounClass.nominal':
    case 'nominal.pronounClass':
      return t('exercise.insights.strengths.pair.pronounClass.nominal', values)
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
  switch (`${a.type}.${b.type}` as const) {
    case 'rootType.rootType':
    case 'tense.tense':
    case 'form.form':
    case 'pronounClass.pronounClass':
    case 'nominal.nominal':
      return localizedChallengeSingle(t, a)
    case 'rootType.tense':
    case 'tense.rootType':
      return t('exercise.insights.challenge.pair.rootType.tense', values)
    case 'rootType.form':
    case 'form.rootType':
      return t('exercise.insights.challenge.pair.rootType.form', values)
    case 'rootType.pronounClass':
    case 'pronounClass.rootType':
      return t('exercise.insights.challenge.pair.rootType.pronounClass', values)
    case 'rootType.nominal':
    case 'nominal.rootType':
      return t('exercise.insights.challenge.pair.rootType.nominal', values)
    case 'tense.form':
    case 'form.tense':
      return t('exercise.insights.challenge.pair.tense.form', values)
    case 'tense.pronounClass':
    case 'pronounClass.tense':
      return t('exercise.insights.challenge.pair.tense.pronounClass', values)
    case 'tense.nominal':
    case 'nominal.tense':
      return t('exercise.insights.challenge.pair.tense.nominal', values)
    case 'form.pronounClass':
    case 'pronounClass.form':
      return t('exercise.insights.challenge.pair.form.pronounClass', values)
    case 'form.nominal':
    case 'nominal.form':
      return t('exercise.insights.challenge.pair.form.nominal', values)
    case 'pronounClass.nominal':
    case 'nominal.pronounClass':
      return t('exercise.insights.challenge.pair.pronounClass.nominal', values)
  }
}

function localizedInsightDimension(t: Translate, dimension: InsightDimension): string {
  switch (dimension.type) {
    case 'rootType':
      return localizedUnlock(t, dimension.value)
    case 'tense':
      return localizedTense(t, dimension.value).toLowerCase()
    case 'form':
      return localizedUnlock(t, dimension.value)
    case 'pronounClass':
      return localizedPronounClass(t, dimension.value)
    case 'nominal':
      switch (dimension.value) {
        case 'participles':
          return t('exercise.insights.nominal.participles')
        case 'masdar':
          return t('exercise.insights.nominal.masdar')
      }
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
        tense: localizedPromptTense(t, exercise.tense, exercise.withVoice),
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
  return exercise.tenses.map((tense) =>
    exercise.withVoice ? localizedTense(t, tense) : localizedVoicelessTense(t, tense),
  )
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

function localizedPromptTense(t: Translate, tense: VerbTense, voice: boolean): string {
  switch (tense) {
    case 'active.past':
      return voice ? t('exercise.conjugation.tense.active.past') : t('exercise.conjugation.tense.past')
    case 'active.present.indicative':
      return voice ? t('exercise.conjugation.tense.active.present') : t('exercise.conjugation.tense.present')
    case 'active.present.subjunctive':
      return voice ? t('exercise.conjugation.tense.active.subjunctive') : t('exercise.conjugation.tense.subjunctive')
    case 'active.present.jussive':
      return voice ? t('exercise.conjugation.tense.active.jussive') : t('exercise.conjugation.tense.jussive')
    case 'active.future':
      return voice ? t('exercise.conjugation.tense.active.future') : t('exercise.conjugation.tense.future')
    case 'active.imperative':
      return t('exercise.conjugation.tense.imperative')
    case 'passive.past':
      return voice ? t('exercise.conjugation.tense.passive.past') : t('exercise.conjugation.tense.past')
    case 'passive.present.indicative':
      return voice ? t('exercise.conjugation.tense.passive.present') : t('exercise.conjugation.tense.present')
    case 'passive.present.subjunctive':
      return voice ? t('exercise.conjugation.tense.passive.subjunctive') : t('exercise.conjugation.tense.subjunctive')
    case 'passive.present.jussive':
      return voice ? t('exercise.conjugation.tense.passive.jussive') : t('exercise.conjugation.tense.jussive')
    case 'passive.future':
      return voice ? t('exercise.conjugation.tense.passive.future') : t('exercise.conjugation.tense.future')
  }
}

type Params = Record<string, string>

type DraftParagraph = readonly (ExplanationSentence | undefined)[]

export function localizedExplanation(t: Translate, layers: ExplanationLayers): Paragraphs {
  const arabic = toArabicText(layers.arabic)

  // A paradigm the verb does not have leaves the cell empty, and an empty cell has nothing to explain.
  if (!arabic) return []

  const nominalLayers = layers.category === 'nominal' ? layers : undefined
  const verbLayers = layers.category === 'verb' ? layers : undefined
  const tense = verbLayers?.tense

  const params: Params = {
    ...(layers.vowels && PAST_VOWEL_NAMES[layers.vowels[0] as FormIVowel]),
    arabic,
    root: layers.paradigmRoots.join('-'),
    initialRadical: layers.paradigmRoots[0] ?? '',
    form: toRoman(layers.paradigmForm),
    pattern: (nominalLayers?.nominal === 'masdar' ? nominalLayers.masdarPattern : undefined) ?? '',
    pastForm: layers.pastForm ?? '',
    presentForm: layers.presentForm ?? '',
  }

  if (verbLayers && isLaysa(layers.paradigmRoots.join('')))
    return toParagraphs(
      [
        sentence('measure', t('explanation.laysa.frozen', params)),
        sentence('radical', t('explanation.laysa.radical', params)),
      ],
      [sentence('measure', t('explanation.laysa.meaning', params))],
      renderPronounSentences(verbLayers, t),
    )

  return toParagraphs(
    [
      sentence('measure', layers.vowels && formIPatternNote(t, layers.vowels, params)),
      sentence('measure', layers.form && formNote(t, layers.form, params)),
      sentence('measure', layers.form === '8' && hasAlifAlWasl(arabic) && t('explanation.form.8-wasl', params)),
      sentence('radical', rootNote(layers, t, params)),
      sentence('radical', layers.rootType?.includes('biliteral') && t('explanation.root.biliteral', params)),
      sentence('radical', layers.formRoot && formRootNote(t, layers.formRoot, params)),
    ],
    [
      sentence('measure', nominalLayers && nominalNote(nominalLayers, t, params)),
      sentence('radical', nominalLayers?.nominalRoot && nominalRootNote(t, nominalLayers.nominalRoot, params)),
    ],
    [
      sentence('measure', tense && voiceNote(t, tense, params)),
      sentence('elided', tense === 'active.imperative' && t('explanation.tense.active.imperative.elision', params)),
      sentence(
        'measure',
        tense === 'active.imperative' &&
          hasAlifAlWasl(arabic) &&
          t('explanation.tense.active.imperative.support', params),
      ),
      tense && sentence(tenseKind(tense), tenseNote(t, tense, params)),
      sentence(
        'measure',
        layers.paradigmForm === 1 &&
          tense === 'active.past' &&
          verbLayers?.pronoun === '3ms' &&
          t('explanation.tense.active.past.form-i', params),
      ),
      sentence('radical', verbLayers?.tenseRoot && tenseRootNote(t, verbLayers.tenseRoot, params)),
    ],
    renderPronounSentences(verbLayers, t),
  )
}

function tenseKind(tense: VerbTense): ExplanationKind {
  if (tense === 'active.future') return 'particle'
  if (tense === 'active.past' || tense.startsWith('passive')) return 'measure'
  return 'agreement'
}

function formIPatternNote(t: Translate, vowels: FormIPattern, params: Params): string {
  switch (vowels) {
    case 'a-a':
      return t('explanation.form-i-pattern.a-a', params)
    case 'a-i':
      return t('explanation.form-i-pattern.a-i', params)
    case 'a-u':
      return t('explanation.form-i-pattern.a-u', params)
    case 'i-a':
      return t('explanation.form-i-pattern.i-a', params)
    case 'i-i':
      return t('explanation.form-i-pattern.i-i', params)
    case 'i-u':
      return t('explanation.form-i-pattern.i-u', params)
    case 'u-a':
      return t('explanation.form-i-pattern.u-a', params)
    case 'u-i':
      return t('explanation.form-i-pattern.u-i', params)
    case 'u-u':
      return t('explanation.form-i-pattern.u-u', params)
  }
}

function formNote(t: Translate, form: VerbFormDescriptor, params: Params): string {
  switch (form) {
    case '1-action':
      return t('explanation.form.1-action', params)
    case '1-intermediate':
      return t('explanation.form.1-intermediate', params)
    case '1-stative':
      return t('explanation.form.1-stative', params)
    case '2':
      return t('explanation.form.2', params)
    case '3':
      return t('explanation.form.3', params)
    case '4':
      return t('explanation.form.4', params)
    case '5':
      return t('explanation.form.5', params)
    case '6':
      return t('explanation.form.6', params)
    case '7':
      return t('explanation.form.7', params)
    case '8':
      return t('explanation.form.8', params)
    case '9':
      return t('explanation.form.9', params)
    case '10':
      return t('explanation.form.10', params)
    case '1q':
      return t('explanation.form.1q', params)
    case '2q':
      return t('explanation.form.2q', params)
    case '3q':
      return t('explanation.form.3q', params)
    case '4q':
      return t('explanation.form.4q', params)
  }
}

function formRootNote(t: Translate, formRoot: FormRootInteraction, params: Params): string {
  switch (formRoot) {
    case 'assimilation-complete':
      return t('explanation.form-root.assimilation-complete', params)
    case 'assimilation-voicing':
      return t('explanation.form-root.assimilation-voicing', params)
    case 'assimilation-emphasis':
      return t('explanation.form-root.assimilation-emphasis', params)
    case 'assimilation-weak-initial':
      return t('explanation.form-root.assimilation-weak-initial', params)
    case 'assimilation-hamza-initial':
      return t('explanation.form-root.assimilation-hamza-initial', params)
  }
}

function rootNote(layers: ExplanationLayers, t: Translate, params: Params): string | undefined {
  const { rootType, weakLetter, paradigmForm: form } = layers
  if (rootType == null) return undefined

  const live = behaviourShapes(rootType).filter((shape) => !isNeutralizedByForm(shape, form))

  if (live.length === 0 && rootType.includes('hollow')) return t('explanation.root.hollow-sound-form', params)
  if (live.length === 0 && rootType.includes('doubled')) return t('explanation.root.doubled-sound-form', params)
  if (live.length === 0 && weakLetter) return uncontractedHollowNote(t, weakLetter, params)
  if (live.length === 1 && live[0] === 'assimilated' && form === 8) return undefined
  if (live.length === 1 && live[0] === 'assimilated' && form !== 1)
    return t('explanation.root.assimilated-sound-form', params)

  // A neutralized shape only ever drops out above Form I, where a final weak radical is always yāʾ.
  const liveWeakLetter = live.includes('hollow')
    ? weakLetter
    : live.includes('defective')
      ? form === 1
        ? weakLetter
        : 'yaa'
      : undefined
  return rootShapeNote(t, rootTypeLocaleKey(live, liveWeakLetter), params)
}

function uncontractedHollowNote(t: Translate, weakLetter: WeakLetter, params: Params): string {
  switch (weakLetter) {
    case 'waw':
      return t('explanation.root.hollow-uncontracted-waw', params)
    case 'yaa':
      return t('explanation.root.hollow-uncontracted-yaa', params)
  }
}

// rootTypeLocaleKey joins the live shapes into a plain string, so no union can prove this switch
// exhaustive; every combination a dataset verb reaches has a case.
function rootShapeNote(t: Translate, rootTypeKey: string, params: Params): string | undefined {
  switch (rootTypeKey) {
    case 'sound':
      return t('explanation.root.sound', params)
    case 'assimilated':
      return t('explanation.root.assimilated', params)
    case 'assimilated-defective-waw':
      return t('explanation.root.assimilated-defective-waw', params)
    case 'assimilated-defective-yaa':
      return t('explanation.root.assimilated-defective-yaa', params)
    case 'assimilated-doubled':
      return t('explanation.root.assimilated-doubled', params)
    case 'assimilated-hollow-waw':
      return t('explanation.root.assimilated-hollow-waw', params)
    case 'assimilated-hollow-yaa':
      return t('explanation.root.assimilated-hollow-yaa', params)
    case 'defective-waw':
      return t('explanation.root.defective-waw', params)
    case 'defective-yaa':
      return t('explanation.root.defective-yaa', params)
    case 'doubled':
      return t('explanation.root.doubled', params)
    case 'hamzated':
      return t('explanation.root.hamzated', params)
    case 'hamzated-assimilated':
      return t('explanation.root.hamzated-assimilated', params)
    case 'hamzated-assimilated-defective-yaa':
      return t('explanation.root.hamzated-assimilated-defective-yaa', params)
    case 'hamzated-defective-waw':
      return t('explanation.root.hamzated-defective-waw', params)
    case 'hamzated-defective-yaa':
      return t('explanation.root.hamzated-defective-yaa', params)
    case 'hamzated-doubled':
      return t('explanation.root.hamzated-doubled', params)
    case 'hamzated-hollow-defective':
      return t('explanation.root.hamzated-hollow-defective', params)
    case 'hamzated-hollow-waw':
      return t('explanation.root.hamzated-hollow-waw', params)
    case 'hamzated-hollow-yaa':
      return t('explanation.root.hamzated-hollow-yaa', params)
    case 'hollow-defective-waw':
      return t('explanation.root.hollow-defective-waw', params)
    case 'hollow-defective-yaa':
      return t('explanation.root.hollow-defective-yaa', params)
    case 'hollow-waw':
      return t('explanation.root.hollow-waw', params)
    case 'hollow-yaa':
      return t('explanation.root.hollow-yaa', params)
    default:
      return undefined
  }
}

function nominalNote(layers: NominalExplanationLayers, t: Translate, params: Params): string | undefined {
  if (layers.nominal == null) return undefined

  const isQuadriliteral = layers.paradigmRoots.length > 3

  if (layers.nominal === 'masdar') {
    if (isQuadriliteral) return layers.form && quadriliteralMasdarNote(t, layers.form, params)
    if (layers.paradigmForm !== 1)
      return layers.masdarPattern ? t('explanation.nominal.masdar.non-form-i', params) : undefined
    return layers.isMasdarMimi
      ? t('explanation.nominal.masdar.form-i-mimi', params)
      : t('explanation.nominal.masdar.form-i', params)
  }

  if (layers.nominal === 'activeParticiple') {
    switch (layers.activeParticipleKind) {
      case 'lexical':
        return t('explanation.nominal.activeParticiple.form-i-lexical', params)
      case 'fa3iil':
        return t('explanation.nominal.activeParticiple.form-i-fa3iil', params)
      case 'faa3il':
        return isQuadriliteral
          ? t('explanation.nominal.activeParticiple.quad', params)
          : t('explanation.nominal.activeParticiple', params)
    }
  }

  return isQuadriliteral
    ? t('explanation.nominal.passiveParticiple.quad', params)
    : t('explanation.nominal.passiveParticiple', params)
}

function quadriliteralMasdarNote(t: Translate, form: VerbFormDescriptor, params: Params): string | undefined {
  switch (form) {
    case '1q':
      return t('explanation.nominal.masdar.1q', params)
    case '2q':
      return t('explanation.nominal.masdar.2q', params)
    case '3q':
      return t('explanation.nominal.masdar.3q', params)
    case '4q':
      return t('explanation.nominal.masdar.4q', params)
    case '1-action':
    case '1-intermediate':
    case '1-stative':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '10':
      return undefined
  }
}

function nominalRootNote(t: Translate, nominalRoot: NominalRootInteraction, params: Params): string {
  switch (nominalRoot) {
    case 'geminate-contracts':
      return t('explanation.nominal-root.geminate-contracts', params)
    case 'geminate-separates':
      return t('explanation.nominal-root.geminate-separates', params)
    case 'hollow-hamza':
      return t('explanation.nominal-root.hollow-hamza', params)
    case 'hollow-long-vowel':
      return t('explanation.nominal-root.hollow-long-vowel', params)
    case 'hollow-voice-selects':
      return t('explanation.nominal-root.hollow-voice-selects', params)
    case 'hollow-always-alif':
      return t('explanation.nominal-root.hollow-always-alif', params)
    case 'defective-form-i-active':
      return t('explanation.nominal-root.defective-form-i-active', params)
    case 'defective-form-i-passive':
      return t('explanation.nominal-root.defective-form-i-passive', params)
    case 'defective-tanween-active':
      return t('explanation.nominal-root.defective-tanween-active', params)
    case 'defective-tanween-passive':
      return t('explanation.nominal-root.defective-tanween-passive', params)
  }
}

function voiceNote(t: Translate, tense: VerbTense, params: Params): string | undefined {
  switch (tense) {
    case 'passive.past':
      return t('explanation.voice.passive.past', params)
    case 'passive.present.indicative':
      return t('explanation.voice.passive.present.indicative', params)
    case 'passive.present.subjunctive':
      return t('explanation.voice.passive.present.subjunctive', params)
    case 'passive.present.jussive':
      return t('explanation.voice.passive.present.jussive', params)
    case 'passive.future':
      return t('explanation.voice.passive.future', params)
    case 'active.past':
    case 'active.present.indicative':
    case 'active.present.subjunctive':
    case 'active.present.jussive':
    case 'active.future':
    case 'active.imperative':
      return undefined
  }
}

// The imperative is explained by its elision and support sentences, and the passive past by its voice
// sentence, so neither has a tense sentence of its own.
function tenseNote(t: Translate, tense: VerbTense, params: Params): string | undefined {
  switch (tense) {
    case 'active.past':
      return t('explanation.tense.active.past', params)
    case 'active.present.indicative':
      return t('explanation.tense.active.present.indicative', params)
    case 'active.present.subjunctive':
      return t('explanation.tense.active.present.subjunctive', params)
    case 'active.present.jussive':
      return t('explanation.tense.active.present.jussive', params)
    case 'active.future':
      return t('explanation.tense.active.future', params)
    case 'passive.present.indicative':
      return t('explanation.tense.passive.present.indicative', params)
    case 'passive.present.subjunctive':
      return t('explanation.tense.passive.present.subjunctive', params)
    case 'passive.present.jussive':
      return t('explanation.tense.passive.present.jussive', params)
    case 'passive.future':
      return t('explanation.tense.passive.future', params)
    case 'active.imperative':
    case 'passive.past':
      return undefined
  }
}

function tenseRootNote(t: Translate, tenseRoot: TenseRootInteraction, params: Params): string {
  switch (tenseRoot) {
    case 'final-drops':
      return t('explanation.tense-root.final-drops', params)
    case 'final-elides':
      return t('explanation.tense-root.final-elides', params)
    case 'final-isolated':
      return t('explanation.tense-root.final-isolated', params)
    case 'final-lengthens-aa':
      return t('explanation.tense-root.final-lengthens-aa', params)
    case 'final-lengthens-ii':
      return t('explanation.tense-root.final-lengthens-ii', params)
    case 'final-lengthens-uu':
      return t('explanation.tense-root.final-lengthens-uu', params)
    case 'final-passive-aa':
      return t('explanation.tense-root.final-passive-aa', params)
    case 'final-passive-ya':
      return t('explanation.tense-root.final-passive-ya', params)
    case 'final-passive-uu':
      return t('explanation.tense-root.final-passive-uu', params)
    case 'final-resurfaces':
      return t('explanation.tense-root.final-resurfaces', params)
    case 'final-surfaces-consonant':
      return t('explanation.tense-root.final-surfaces-consonant', params)
    case 'geminate-contracts':
      return t('explanation.tense-root.geminate-contracts', params)
    case 'geminate-jussive':
      return t('explanation.tense-root.geminate-jussive', params)
    case 'geminate-separates':
      return t('explanation.tense-root.geminate-separates', params)
    case 'hamza-madda':
      return t('explanation.tense-root.hamza-madda', params)
    case 'hamza-seat':
      return t('explanation.tense-root.hamza-seat', params)
    case 'hamza-elides':
      return t('explanation.tense-root.hamza-elides', params)
    case 'initial-drops':
      return t('explanation.tense-root.initial-drops', params)
    case 'initial-retained':
      return t('explanation.tense-root.initial-retained', params)
    case 'initial-retained-lexical':
      return t('explanation.tense-root.initial-retained-lexical', params)
    case 'middle-lengthens-aa':
      return t('explanation.tense-root.middle-lengthens-aa', params)
    case 'middle-lengthens-ii':
      return t('explanation.tense-root.middle-lengthens-ii', params)
    case 'middle-lengthens-uu':
      return t('explanation.tense-root.middle-lengthens-uu', params)
    case 'middle-lengthens-ii-derived':
      return t('explanation.tense-root.middle-lengthens-ii-derived', params)
    case 'middle-lengthens-aa-present':
      return t('explanation.tense-root.middle-lengthens-aa-present', params)
    case 'middle-passive-aa':
      return t('explanation.tense-root.middle-passive-aa', params)
    case 'middle-passive-ii':
      return t('explanation.tense-root.middle-passive-ii', params)
    case 'middle-shortens':
      return t('explanation.tense-root.middle-shortens', params)
    case 'middle-shortens-consonant':
      return t('explanation.tense-root.middle-shortens-consonant', params)
  }
}

function renderPronounSentences(layers: VerbExplanationLayers | undefined, t: Translate): Paragraph {
  if (layers?.pronoun == null) return []

  const params: Params = { pronounLabel: localizedPronoun(t, layers.pronoun), arabic: toArabicText(layers.arabic) }
  const assimilatedNun = hasAssimilatedEndingNun(layers)

  const prefix = layers.prefix ? `${layers.prefix}ـ` : undefined
  const ending = `${hasAbsorbedDualAlif(layers) ? `${FATHA}${ALIF}` : ''}${assimilatedNun ? String(NOON) : ''}${layers.suffix ?? ''}`
  const suffix = ending ? `ـ${ending}` : undefined

  return toParagraph(
    !prefix && !suffix && layers.paradigmForm === 1 && layers.tense === 'active.past'
      ? undefined
      : sentence('agreement', affixNote(t, prefix, suffix, params)),
    sentence(
      'elided',
      layers.elidedPrefix &&
        layers.tense !== 'active.imperative' &&
        t('explanation.pronoun.dropped-prefix', { ...params, elidedPrefix: `${layers.elidedPrefix}ـ` }),
    ),
    sentence(
      'elided',
      layers.elidedSuffix?.includes(String(NOON)) &&
        t('explanation.pronoun.dropped-suffix', { ...params, elidedSuffix: `ـ${layers.elidedSuffix}` }),
    ),
    sentence('elided', assimilatedNun && t('explanation.pronoun.assimilated-nun', params)),
  )
}

function affixNote(t: Translate, prefix: string | undefined, suffix: string | undefined, params: Params): string {
  if (prefix && suffix) return t('explanation.pronoun.prefix-and-suffix', { ...params, prefix, suffix })
  if (prefix) return t('explanation.pronoun.prefix-only', { ...params, prefix })
  if (suffix) return t('explanation.pronoun.suffix-only', { ...params, suffix })
  return t('explanation.pronoun.base-form', params)
}

function sentence(kind: ExplanationKind, text: string | false | undefined): ExplanationSentence | undefined {
  return text ? { text, kind } : undefined
}

function toParagraph(...sentences: DraftParagraph): Paragraph {
  return sentences.filter((sentence): sentence is ExplanationSentence => sentence != null)
}

function toParagraphs(...paragraphs: readonly DraftParagraph[]): Paragraphs {
  return paragraphs.map((sentences) => toParagraph(...sentences)).filter((paragraph) => paragraph.length > 0)
}
