import { Text } from 'react-native'
import type { InsightData } from '../../../../../src/exercises/mastery'
import type { Translate } from '../../../../../src/localization'
import { localizedInsights } from '../../../../../src/localization.exercises'
import { Sheet, SheetButton } from '../../components/Sheet'
import { getCopy, type Language } from '../../i18n/copy'
import { useThemeTokens } from '../../theme/tokens'
import { Section } from '../verb/Insights'

function sections(insights: InsightData, t: Translate): { id: string; title: string; body: string }[] {
  const text = localizedInsights(t, insights)
  return [
    { id: 'journey', title: t('exercise.insights.heading.journey'), body: text.journey },
    { id: 'momentum', title: t('exercise.insights.heading.momentum'), body: text.momentum },
    ...(text.backlog == null
      ? []
      : [{ id: 'backlog', title: t('exercise.insights.heading.backlog'), body: text.backlog }]),
    ...(text.strengths == null
      ? []
      : [{ id: 'strengths', title: t('exercise.insights.heading.strengths'), body: text.strengths }]),
    ...(text.challenge == null
      ? []
      : [{ id: 'challenge', title: t('exercise.insights.heading.challenge'), body: text.challenge }]),
    { id: 'stage', title: t('exercise.insights.heading.stage'), body: text.stage },
    { id: 'recommendation', title: t('exercise.insights.heading.recommendation'), body: text.recommendation },
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
