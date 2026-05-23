import { styled } from 'goober'
import { useMemo } from 'preact/hooks'
import {
  computeInsights,
  type InsightCandidate,
  type InsightCandidateType,
  type InsightData,
  type MasteryCategoryId,
} from '../../exercises/mastery'
import { parseInteger, toRoman } from '../../primitives/numbers'
import { useDimensionStore } from '../hooks/useDimensionStore'
import { useI18n } from '../hooks/useI18n'
import { useSrsStore } from '../hooks/useSrsStore'
import { useStats } from '../hooks/useStats'

const TYPE_ORDER: readonly InsightCandidateType[] = ['rootType', 'tense', 'form', 'pronounClass']

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
          {buildSectionText(t, lang, insights.strengths, 'strengths', 'exercise.insights.strengths.none')}
        </SectionText>
      </Section>
      <Section>
        <SectionText>
          <SectionLabel>{t('exercise.insights.heading.challenge')}:</SectionLabel>{' '}
          {buildSectionText(t, lang, insights.challenge, 'challenge', 'exercise.insights.challenge.none')}
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

function buildSectionText(
  t: ReturnType<typeof useI18n>['t'],
  lang: ReturnType<typeof useI18n>['lang'],
  candidates: InsightData['strengths'],
  section: 'strengths' | 'challenge',
  noneKey: string,
): string {
  if (candidates.length === 0) return t(noneKey)

  if (candidates.length === 1) {
    const [a] = candidates
    return t(`exercise.insights.${section}.single.${a.type}`, {
      value: formatCandidateValue(t, lang, a),
    })
  }

  const [a, b] = candidates
  const [first, second] = sortPairOrder(a, b)
  return t(`exercise.insights.${section}.pair.${first.type}.${second.type}`, {
    value1: formatCandidateValue(t, lang, first),
    value2: formatCandidateValue(t, lang, second),
  })
}

function sortPairOrder(a: InsightCandidate, b: InsightCandidate): [InsightCandidate, InsightCandidate] {
  return TYPE_ORDER.indexOf(a.type) <= TYPE_ORDER.indexOf(b.type) ? [a, b] : [b, a]
}

function formatCandidateValue(
  t: ReturnType<typeof useI18n>['t'],
  _lang: ReturnType<typeof useI18n>['lang'],
  candidate: InsightCandidate,
): string {
  switch (candidate.type) {
    case 'rootType':
      return t(`exercise.unlock.rootType.${candidate.value}`)
    case 'tense':
      return t(`exercise.conjugation.tense.${candidate.value}`)
    case 'form':
      return toRoman(parseInteger(candidate.value, 0))
    case 'pronounClass':
      return t(`exercise.insights.pronounClass.${candidate.value}`)
  }
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
