import { styled } from 'goober'
import { useMemo } from 'preact/hooks'
import {
  type BacklogETA,
  type BacklogState,
  computeInsights,
  type InsightCandidate,
  type InsightCandidateType,
  type InsightData,
  type MasteryCategoryId,
  type Recommendation,
} from '../../exercises/mastery'
import { parseInteger, toRoman } from '../../primitives/numbers'
import { useDimensionStore } from '../hooks/useDimensionStore'
import { type Translate, useI18n } from '../hooks/useI18n'
import { useSrsStore } from '../hooks/useSrsStore'
import { useStats } from '../hooks/useStats'

const TYPE_ORDER: readonly InsightCandidateType[] = ['rootType', 'tense', 'form', 'pronounClass']

export function LearningInsights() {
  const [srsStore] = useSrsStore()
  const [profile] = useDimensionStore()
  const { stats } = useStats()
  const { t } = useI18n()

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
  const backlogText = buildBacklogText(t, insights.backlog.state, insights.backlog.eta)

  return (
    <Container>
      <Section>
        <SectionText>
          <SectionLabel>{t('exercise.insights.heading.journey')}:</SectionLabel> {journeyLine}
        </SectionText>
      </Section>
      <Section>
        <SectionText>
          <SectionLabel>{t('exercise.insights.heading.momentum')}:</SectionLabel>{' '}
          {t(`exercise.insights.momentum.${insights.volume.trend}`)}
        </SectionText>
      </Section>
      {backlogText != null && (
        <Section>
          <SectionText>
            <SectionLabel>{t('exercise.insights.heading.backlog')}:</SectionLabel> {backlogText}
          </SectionText>
        </Section>
      )}
      <Section>
        <SectionText>
          <SectionLabel>{t('exercise.insights.heading.strengths')}:</SectionLabel>{' '}
          {buildSectionText(t, insights.strengths, 'strengths', 'exercise.insights.strengths.none')}
        </SectionText>
      </Section>
      <Section>
        <SectionText>
          <SectionLabel>{t('exercise.insights.heading.challenge')}:</SectionLabel>{' '}
          {insights.stuck.topDimensions.length > 0
            ? insights.stuck.topDimensions.length === 1
              ? t('exercise.insights.difficult.single', {
                  value: t(candidateKey(insights.stuck.topDimensions[0])),
                })
              : t('exercise.insights.difficult.pair', {
                  value1: t(candidateKey(insights.stuck.topDimensions[0])),
                  value2: t(candidateKey(insights.stuck.topDimensions[1])),
                })
            : buildSectionText(t, insights.challenge, 'challenge', 'exercise.insights.challenge.none')}
        </SectionText>
      </Section>
      <Section>
        <SectionText>
          <SectionLabel>{t('exercise.insights.heading.stage')}:</SectionLabel> {stageLine}
        </SectionText>
      </Section>
      <Section>
        <SectionText>
          <SectionLabel>{t('exercise.insights.heading.recommendation')}:</SectionLabel>{' '}
          {insights.recommendation.map((item) => buildRecommendationText(t, item)).join(' ')}
        </SectionText>
      </Section>
    </Container>
  )
}

function buildBacklogText(t: Translate, state: BacklogState, eta?: BacklogETA): string | null {
  if (state === 'none') return null
  if (eta == null) return t(`exercise.insights.backlog.${state}.noEta`)
  return t(`exercise.insights.backlog.${state}`, { eta: t(`exercise.insights.backlog.eta.${eta}`) })
}

function resolveNextValueLabel(t: Translate, dim: MasteryCategoryId, value: string): string {
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

function buildRecommendationText(t: Translate, recommendation: Recommendation): string {
  switch (recommendation.kind) {
    case 'habit':
      return t(`exercise.insights.recommendation.habit.${recommendation.action}`)
    case 'focus':
      return recommendation.action === 'focusCandidate'
        ? t('exercise.insights.recommendation.focus.focusCandidate', {
            value: t(candidateKey({ ...recommendation.candidate, score: 0 })),
          })
        : t('exercise.insights.recommendation.focus.keepUnlocking')
  }
}

function buildSectionText(
  t: Translate,
  candidates: InsightData['strengths'],
  section: 'strengths' | 'challenge',
  noneKey: string,
): string {
  if (candidates.length === 0) return t(noneKey)

  if (candidates.length === 1) {
    const [a] = candidates
    return t(`exercise.insights.${section}.single.${a.type}`, {
      value: t(candidateKey(a)),
    })
  }

  const [a, b] = candidates
  const [first, second] = sortPairOrder(a, b)
  return t(`exercise.insights.${section}.pair.${first.type}.${second.type}`, {
    value1: t(candidateKey(first)),
    value2: t(candidateKey(second)),
  })
}

function sortPairOrder(a: InsightCandidate, b: InsightCandidate): [InsightCandidate, InsightCandidate] {
  return TYPE_ORDER.indexOf(a.type) <= TYPE_ORDER.indexOf(b.type) ? [a, b] : [b, a]
}

function candidateKey(candidate: InsightCandidate): string {
  switch (candidate.type) {
    case 'rootType':
      return `exercise.unlock.rootType.${candidate.value}`
    case 'tense':
      return `exercise.conjugation.tense.${candidate.value}`
    case 'form':
      return `exercise.unlock.form.${candidate.value}`
    case 'pronounClass':
      return `exercise.insights.pronounClass.${candidate.value}`
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
