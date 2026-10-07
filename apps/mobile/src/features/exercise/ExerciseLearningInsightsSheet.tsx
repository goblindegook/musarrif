import { Text } from 'react-native'
import type {
  BacklogETA,
  BacklogState,
  InsightCandidate,
  InsightCandidateType,
  InsightData,
  MasteryCategoryId,
  Recommendation,
} from '../../../../../src/exercises/mastery'
import { toRoman } from '../../../../../src/primitives/numbers'
import { Sheet, SheetButton } from '../../components/Sheet'
import { getCopy, type Language } from '../../i18n/copy'
import { useThemeTokens } from '../../theme/tokens'
import { Section } from '../verb/Insights'

type Translate = (key: string, values?: Record<string, string>) => string
const TYPE_ORDER: readonly InsightCandidateType[] = ['rootType', 'tense', 'form', 'pronounClass', 'nominal']

function candidateKey(candidate: Pick<InsightCandidate, 'type' | 'value'>): string {
  switch (candidate.type) {
    case 'rootType':
      return `exercise.unlock.rootType.${candidate.value}`
    case 'tense':
      return `exercise.conjugation.tense.${candidate.value}`
    case 'form':
      return `exercise.unlock.form.${candidate.value}`
    case 'pronounClass':
      return `exercise.insights.pronounClass.${candidate.value}`
    case 'nominal':
      return `exercise.insights.nominal.${candidate.value}`
  }
}

function pairText(t: Translate, candidates: InsightData['strengths'], section: 'strengths' | 'challenge'): string {
  if (candidates.length === 1) {
    const [first] = candidates
    return t(`exercise.insights.${section}.single.${first.type}`, { value: t(candidateKey(first)) })
  }
  const [a, b] = candidates
  const [first, second] = TYPE_ORDER.indexOf(a.type) <= TYPE_ORDER.indexOf(b.type) ? [a, b] : [b, a]
  return t(`exercise.insights.${section}.pair.${first.type}.${second.type}`, {
    value1: t(candidateKey(first)),
    value2: t(candidateKey(second)),
  })
}

function backlogText(t: Translate, state: BacklogState, eta?: BacklogETA): string | null {
  if (state === 'none') return null
  if (eta == null) return t(`exercise.insights.backlog.${state}.noEta`)
  return t(`exercise.insights.backlog.${state}`, { eta: t(`exercise.insights.backlog.eta.${eta}`) })
}

function nextValueLabel(t: Translate, dimension: MasteryCategoryId, value: string): string {
  switch (dimension) {
    case 'rootTypes':
      return t(`exercise.stats.mastery.rootType.${value}`)
    case 'tenses':
      return t(`tense.${value}`)
    case 'forms':
      return toRoman(Number(value))
    case 'pronouns':
      return t(`pronoun.${value}`)
    case 'nominals':
      return t(`exercise.stats.mastery.nominal.${value}`)
  }
}

function recommendationText(t: Translate, recommendation: Recommendation): string {
  switch (recommendation.kind) {
    case 'habit':
      return t(`exercise.insights.recommendation.habit.${recommendation.action}`)
    case 'focus':
      return recommendation.action === 'focusCandidate'
        ? t('exercise.insights.recommendation.focus.focusCandidate', {
            value: t(candidateKey(recommendation.candidate)),
          })
        : t('exercise.insights.recommendation.focus.keepUnlocking')
  }
}

function sections(insights: InsightData, t: Translate): { id: string; title: string; body: string }[] {
  const journey =
    insights.journey.days === 0
      ? t('exercise.insights.journey.new')
      : `${t('exercise.insights.journey', {
          days: String(insights.journey.days),
          answers: String(insights.journey.answers),
          accuracy: String(insights.journey.accuracy),
        })} ${t(`exercise.insights.journey.trend.${insights.journey.trend}`)}`
  const stage =
    insights.stage.nextDimension != null && insights.stage.nextValue != null
      ? t(`exercise.insights.stage.next.${insights.stage.nextDimension}`, {
          value: nextValueLabel(t, insights.stage.nextDimension, insights.stage.nextValue),
        })
      : t('exercise.insights.stage.next.complete')
  const backlog = backlogText(t, insights.backlog.state, insights.backlog.eta)
  const challenge =
    insights.stuck.topDimensions.length > 0
      ? insights.stuck.topDimensions.length === 1
        ? t('exercise.insights.difficult.single', { value: t(candidateKey(insights.stuck.topDimensions[0])) })
        : t('exercise.insights.difficult.pair', {
            value1: t(candidateKey(insights.stuck.topDimensions[0])),
            value2: t(candidateKey(insights.stuck.topDimensions[1])),
          })
      : insights.challenge.length > 0
        ? pairText(t, insights.challenge, 'challenge')
        : ''

  return [
    { id: 'journey', title: t('exercise.insights.heading.journey'), body: journey },
    {
      id: 'momentum',
      title: t('exercise.insights.heading.momentum'),
      body: t(`exercise.insights.momentum.${insights.volume.trend}`),
    },
    ...(backlog == null ? [] : [{ id: 'backlog', title: t('exercise.insights.heading.backlog'), body: backlog }]),
    ...(insights.strengths.length === 0
      ? []
      : [
          {
            id: 'strengths',
            title: t('exercise.insights.heading.strengths'),
            body: pairText(t, insights.strengths, 'strengths'),
          },
        ]),
    ...(insights.focus.length === 0
      ? []
      : [{ id: 'challenge', title: t('exercise.insights.heading.challenge'), body: challenge }]),
    { id: 'stage', title: t('exercise.insights.heading.stage'), body: stage },
    {
      id: 'recommendation',
      title: t('exercise.insights.heading.recommendation'),
      body: insights.recommendation.map((item) => recommendationText(t, item)).join(' '),
    },
  ]
}

export function ExerciseLearningInsightsSheet({
  insights,
  isPresented,
  language,
  onDismiss,
}: {
  insights: InsightData
  isPresented: boolean
  language: Language
  onDismiss: () => void
}) {
  const theme = useThemeTokens()
  const { t } = getCopy(language)

  return (
    <Sheet
      actions={<SheetButton label={t('build.closePicker')} onPress={onDismiss} systemImage="xmark" />}
      isPresented={isPresented}
      onDismiss={onDismiss}
      testID="exercise-learning-insights-sheet"
      title={t('exercise.insights.sheetTitle')}
    >
      {sections(insights, t).map((section) => (
        <Section key={section.id} title={section.title}>
          <Text selectable style={{ color: theme.ink, fontSize: 16, lineHeight: 28 }}>
            {section.body}
          </Text>
        </Section>
      ))}
    </Sheet>
  )
}
