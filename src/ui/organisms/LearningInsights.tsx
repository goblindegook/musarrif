import { styled } from 'goober'
import { useMemo } from 'preact/hooks'
import { computeInsights, type InsightData, type MasteryCategoryId } from '../../exercises/mastery'
import { parseInteger, toRoman } from '../../primitives/numbers'
import { useDimensionStore } from '../hooks/useDimensionStore'
import { useI18n } from '../hooks/useI18n'
import { useSrsStore } from '../hooks/useSrsStore'
import { useStats } from '../hooks/useStats'

export function LearningInsights() {
  const [srsStore] = useSrsStore()
  const [profile] = useDimensionStore()
  const { stats } = useStats()
  const { t, lang } = useI18n()

  const insights = useMemo(() => computeInsights(profile, srsStore, stats), [profile, srsStore, stats])

  const journeyText =
    insights.journey.days === 0
      ? t('exercise.insights.journey.new')
      : t('exercise.insights.journey', {
          days: String(insights.journey.days),
          answers: String(insights.journey.answers),
          accuracy: String(insights.journey.accuracy),
        })

  const stageText = t('exercise.insights.stage', {
    unlocked: String(insights.stage.unlockedRootTypes),
    total: String(insights.stage.totalRootTypes),
  })

  const stageNextText =
    insights.stage.nextDimension != null && insights.stage.nextValue != null
      ? t(`exercise.insights.stage.next.${insights.stage.nextDimension}`, {
          value: resolveNextValueLabel(t, insights.stage.nextDimension, insights.stage.nextValue),
        })
      : t('exercise.insights.stage.next.complete')
  const journeyLine =
    insights.journey.days > 0
      ? `${journeyText} ${t(`exercise.insights.journey.trend.${insights.journey.trend}`)}`
      : journeyText
  const stageLine = insights.stage.nextDimension == null ? stageNextText : `${stageText} ${stageNextText}`

  return (
    <Container>
      <Section>
        <SectionText>
          <SectionLabel>{t('exercise.insights.heading.journey')}:</SectionLabel> {journeyLine}
        </SectionText>
      </Section>
      <Section>
        <SectionText>
          <SectionLabel>{t('exercise.insights.heading.strengths')}:</SectionLabel>{' '}
          {buildStrengthsText(t, lang, insights.strengths)}
        </SectionText>
      </Section>
      <Section>
        <SectionText>
          <SectionLabel>{t('exercise.insights.heading.challenge')}:</SectionLabel>{' '}
          {buildChallengeText(t, lang, insights.challenge)}
        </SectionText>
      </Section>
      <Section>
        <SectionText>
          <SectionLabel>{t('exercise.insights.heading.stage')}:</SectionLabel> {stageLine}
        </SectionText>
      </Section>
    </Container>
  )
}

function resolveNextValueLabel(t: ReturnType<typeof useI18n>['t'], dim: MasteryCategoryId, value: string): string {
  switch (dim) {
    case 'rootTypes':
      return t(`exercise.stats.mastery.rootType.${value}`)
    case 'tenses':
      return t(`tense.${value}`)
    case 'forms':
      return toRoman(parseInteger(value, 0))
    case 'pronouns':
      return t(`pronoun.${value}`)
    case 'nominals':
      return t(`exercise.stats.mastery.nominal.${value}`)
  }
}

function buildStrengthsText(
  t: ReturnType<typeof useI18n>['t'],
  lang: ReturnType<typeof useI18n>['lang'],
  strengths: InsightData['strengths'],
): string {
  const { topRootType, topTense } = strengths
  if (topRootType != null && topTense != null) {
    return t('exercise.insights.strengths.both', {
      rootType: formatInsightRootTypeLabel(t, lang, topRootType),
      tense: formatInsightTenseLabel(t, lang, topTense),
    })
  }
  if (topRootType != null) {
    return t('exercise.insights.strengths.rootTypeOnly', {
      rootType: formatInsightRootTypeLabel(t, lang, topRootType),
    })
  }
  if (topTense != null) {
    return t('exercise.insights.strengths.tenseOnly', { tense: formatInsightTenseLabel(t, lang, topTense) })
  }
  return t('exercise.insights.strengths.none')
}

function buildChallengeText(
  t: ReturnType<typeof useI18n>['t'],
  lang: ReturnType<typeof useI18n>['lang'],
  challenge: InsightData['challenge'],
): string {
  const { weakRootType, weakTense } = challenge
  if (weakRootType != null && weakTense != null) {
    return t('exercise.insights.challenge.both', {
      rootType: formatInsightRootTypeLabel(t, lang, weakRootType),
      tense: formatInsightTenseLabel(t, lang, weakTense),
    })
  }
  if (weakRootType != null) {
    return t('exercise.insights.challenge.rootTypeOnly', {
      rootType: formatInsightRootTypeLabel(t, lang, weakRootType),
    })
  }
  if (weakTense != null) {
    return t('exercise.insights.challenge.tenseOnly', { tense: formatInsightTenseLabel(t, lang, weakTense) })
  }
  return t('exercise.insights.challenge.none')
}

function formatInsightRootTypeLabel(
  t: ReturnType<typeof useI18n>['t'],
  _lang: ReturnType<typeof useI18n>['lang'],
  rootType: NonNullable<InsightData['strengths']['topRootType']>,
): string {
  return t(`exercise.unlock.rootType.${rootType}`)
}

function formatInsightTenseLabel(
  t: ReturnType<typeof useI18n>['t'],
  _lang: ReturnType<typeof useI18n>['lang'],
  tense: NonNullable<InsightData['strengths']['topTense']>,
): string {
  return t(resolveInsightTenseLabelKey(tense))
}

function resolveInsightTenseLabelKey(tense: NonNullable<InsightData['strengths']['topTense']>): string {
  if (tense === 'active.imperative') return 'exercise.conjugation.tense.imperative'
  if (tense === 'active.present.indicative') return 'exercise.conjugation.tense.active.present'
  if (tense === 'passive.present.indicative') return 'exercise.conjugation.tense.passive.present'
  return `exercise.conjugation.tense.${tense}`
}

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const Section = styled('section')`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const SectionText = styled('p')`
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  line-height: 1.55;
`

const SectionLabel = styled('strong')`
  color: var(--color-text-primary);
`
