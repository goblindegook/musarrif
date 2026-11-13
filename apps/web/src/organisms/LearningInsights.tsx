import { styled } from 'goober'
import { useMemo } from 'preact/hooks'
import { computeInsights } from '../../../../src/exercises/mastery'
import { localizedInsights } from '../../../../src/localization'
import { useDimensionStore } from '../hooks/useDimensionStore'
import { useI18n } from '../hooks/useI18n'
import { useSrsStore } from '../hooks/useSrsStore'
import { useStats } from '../hooks/useStats'

export function LearningInsights() {
  const [srsStore] = useSrsStore()
  const [profile] = useDimensionStore()
  const { stats } = useStats()
  const { t } = useI18n()

  const text = useMemo(
    () => localizedInsights(t, computeInsights(profile, srsStore, stats)),
    [t, profile, srsStore, stats],
  )

  return (
    <Container>
      <Section>
        <SectionText>
          <SectionLabel>{t('exercise.insights.heading.journey')}:</SectionLabel> {text.journey}
        </SectionText>
      </Section>
      <Section>
        <SectionText>
          <SectionLabel>{t('exercise.insights.heading.momentum')}:</SectionLabel> {text.momentum}
        </SectionText>
      </Section>
      {text.backlog != null && (
        <Section>
          <SectionText>
            <SectionLabel>{t('exercise.insights.heading.backlog')}:</SectionLabel> {text.backlog}
          </SectionText>
        </Section>
      )}
      {text.strengths != null && (
        <Section>
          <SectionText>
            <SectionLabel>{t('exercise.insights.heading.strengths')}:</SectionLabel> {text.strengths}
          </SectionText>
        </Section>
      )}
      {text.challenge != null && (
        <Section>
          <SectionText>
            <SectionLabel>{t('exercise.insights.heading.challenge')}:</SectionLabel> {text.challenge}
          </SectionText>
        </Section>
      )}
      <Section>
        <SectionText>
          <SectionLabel>{t('exercise.insights.heading.stage')}:</SectionLabel> {text.stage}
        </SectionText>
      </Section>
      <Section>
        <SectionText>
          <SectionLabel>{t('exercise.insights.heading.recommendation')}:</SectionLabel> {text.recommendation}
        </SectionText>
      </Section>
    </Container>
  )
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
