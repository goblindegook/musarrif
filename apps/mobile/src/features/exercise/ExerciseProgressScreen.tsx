import { Host, Image, ProgressView } from '@expo/ui/swift-ui'
import { tint } from '@expo/ui/swift-ui/modifiers'
import { useMemo, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated'
import {
  computeInsights,
  computeMastery,
  type MasteryCategoryId,
  type MasteryItem,
} from '../../../../../src/exercises/mastery'
import {
  findStatsForDate,
  getAccuracyPercent,
  getRecentAccuracyPercent,
  getStatsWindow,
  getStreak,
  getStreakRecord,
  STREAK_DAILY_GOAL,
} from '../../../../../src/exercises/stats'
import { toRoman } from '../../../../../src/primitives/numbers'
import { CAPS_TRACKING, Heading } from '../../components/Heading'
import { PrimaryButton } from '../../components/PrimaryButton'
import { getCopy, useSystemLanguage } from '../../i18n/copy'
import { useUserData } from '../../storage/UserDataProvider'
import { useDailyActivity, useDimensionStore, useSrsStore } from '../../storage/user-data-hooks'
import { useMotionDuration } from '../../theme/motion'
import { type ThemeTokens, useThemeTokens } from '../../theme/tokens'
import { ExerciseLearningInsightsSheet } from './ExerciseLearningInsightsSheet'
import { ExerciseProgressChart } from './ExerciseProgressChart'

function masteryLabel(
  item: MasteryItem<MasteryCategoryId>,
  t: (key: string, values?: Record<string, string>) => string,
) {
  switch (item.categoryId) {
    case 'rootTypes':
      return t(`exercise.stats.mastery.rootType.${item.value}`)
    case 'forms':
      return t('exercise.stats.mastery.form', { form: toRoman(Number(item.value)) })
    case 'tenses':
      return t(`tense.${item.value}`)
    case 'pronouns':
      return t(`pronoun.${item.value}`)
    case 'nominals':
      return t(`exercise.stats.mastery.nominal.${item.value}`)
  }
}

function masteryProgress(score: number, locked: boolean): number {
  return locked || score <= 0 ? 0 : score ** 0.4
}

function MasteryBar({ score, locked, theme }: { score: number; locked: boolean; theme: ThemeTokens }) {
  return (
    <Host style={{ width: '100%', height: 8 }}>
      <ProgressView value={masteryProgress(score, locked)} modifiers={[tint(theme.accent)]} />
    </Host>
  )
}

const MIN_TOUCH_TARGET = 44

export function ExerciseProgressScreen() {
  const { ready } = useUserData()
  const theme = useThemeTokens()
  const motion = useMotionDuration(240)
  const language = useSystemLanguage()
  const { t } = getCopy(language)
  const [expanded, setExpanded] = useState<MasteryCategoryId | null>(null)
  const toggle = (id: MasteryCategoryId) => setExpanded((current) => (current === id ? null : id))
  const [insightsOpen, setInsightsOpen] = useState(false)
  const activity = useDailyActivity()
  const srsStore = useSrsStore()
  const { profile } = useDimensionStore()
  const mastery = useMemo(() => computeMastery(profile, srsStore), [profile, srsStore])
  const insights = useMemo(() => computeInsights(profile, srsStore, activity), [profile, srsStore, activity])
  const accuracy = getRecentAccuracyPercent(activity, 15)
  const allTimeAccuracy = getAccuracyPercent(activity)
  const streak = getStreak(activity)
  const record = getStreakRecord(activity)
  const todayCorrect = findStatsForDate(activity, new Date())?.correct ?? 0
  const remaining = Math.max(0, STREAK_DAILY_GOAL - todayCorrect)
  const week = getStatsWindow(activity, 7)
  const weekly = week.reduce(
    (totals, day) => ({
      correct: totals.correct + day.correct,
      incorrect: totals.incorrect + day.incorrect,
      passed: totals.passed + day.passed,
    }),
    { correct: 0, incorrect: 0, passed: 0 },
  )
  const chartLabels = {
    correct: t('exercise.stats.correct'),
    incorrect: t('exercise.stats.incorrect'),
    passed: t('exercise.stats.skipped'),
  }
  const trend = (key: 'correct' | 'incorrect' | 'passed') => {
    const first = week[0]?.[key] ?? 0
    const last = week[week.length - 1]?.[key] ?? 0
    return t(`exercise.stats.chart.trend.${last > first ? 'up' : last < first ? 'down' : 'steady'}`)
  }
  const chartSummary = t('exercise.stats.chart.aria.summary', {
    correctLabel: chartLabels.correct,
    correctTotal: String(weekly.correct),
    correctTrend: trend('correct'),
    incorrectLabel: chartLabels.incorrect,
    incorrectTotal: String(weekly.incorrect),
    incorrectTrend: trend('incorrect'),
    skippedLabel: chartLabels.passed,
    skippedTotal: String(weekly.passed),
    skippedTrend: trend('passed'),
  })

  if (!ready) return <View style={{ flex: 1, backgroundColor: theme.background }} />

  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.content}
        style={{ flex: 1, backgroundColor: theme.background }}
        testID="exercise-progress-screen"
      >
        <ExerciseProgressChart accessibilityLabel={chartSummary} days={week} labels={chartLabels} language={language} />
        <View style={[styles.summary, { borderColor: theme.border }]}>
          <View style={styles.summaryColumn}>
            <Text style={[styles.label, { color: theme.inkMuted }]}>{t('exercise.stats.accuracy.label')}</Text>
            <Text style={[styles.value, { color: theme.ink }]}>{accuracy}%</Text>
            <Text style={{ color: theme.inkMuted }}>
              {t('exercise.stats.accuracy.alltime', { value: String(allTimeAccuracy) })}
            </Text>
          </View>
          <View style={styles.summaryColumn}>
            <Text style={[styles.label, { color: theme.inkMuted }]}>{t('exercise.stats.streak.label')}</Text>
            <Text style={[styles.value, { color: theme.ink }]}>
              {streak} {t(streak === 1 ? 'exercise.stats.streak.unit.singular' : 'exercise.stats.streak.unit.plural')}
            </Text>
            <Text style={{ color: theme.inkMuted }}>
              {t(record === 1 ? 'exercise.stats.streak.record.singular' : 'exercise.stats.streak.record.plural', {
                days: String(record),
              })}
            </Text>
          </View>
        </View>

        {remaining > 0 ? (
          <View style={styles.streakGoal}>
            <Text style={{ color: theme.inkSecondary }}>
              {t('exercise.stats.streak.extendHint', { remaining: String(remaining) })}
            </Text>
            <Host style={{ width: '100%', height: 12 }}>
              <ProgressView
                value={Math.min(todayCorrect, STREAK_DAILY_GOAL) / STREAK_DAILY_GOAL}
                modifiers={[tint(theme.accent)]}
              />
            </Host>
          </View>
        ) : null}

        <View>
          <Heading>{t('exercise.stats.mastery.title')}</Heading>
          <View>
            {mastery.map((category, index) => {
              const isExpanded = expanded === category.id
              const label = t(`exercise.unlock.dimension.${category.id}`)
              return (
                <Animated.View
                  key={category.id}
                  layout={LinearTransition.duration(motion)}
                  style={[
                    styles.masteryRow,
                    {
                      borderBottomWidth: index === mastery.length - 1 ? 0 : StyleSheet.hairlineWidth,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <Pressable
                    accessibilityLabel={label}
                    accessibilityRole="button"
                    accessibilityState={{ expanded: isExpanded }}
                    onPress={() => toggle(category.id)}
                    style={styles.masteryToggle}
                  >
                    <View style={styles.masteryLabel}>
                      <Text style={{ color: theme.ink, fontSize: 16 }}>{label}</Text>
                      {category.locked ? (
                        <Text style={{ color: theme.inkMuted }}>{t('exercise.stats.mastery.locked')}</Text>
                      ) : null}
                    </View>
                    <Host style={{ width: 20, height: 20 }}>
                      <Image systemName={isExpanded ? 'chevron.up' : 'chevron.down'} size={14} color={theme.inkMuted} />
                    </Host>
                  </Pressable>
                  <MasteryBar score={category.score} locked={category.locked} theme={theme} />
                  {isExpanded ? (
                    <Animated.View
                      entering={FadeIn.duration(motion)}
                      exiting={FadeOut.duration(motion)}
                      style={styles.masteryItems}
                    >
                      {category.items.map((item) => (
                        <View key={item.id} style={styles.masteryItem}>
                          <View style={styles.masteryLabel}>
                            <Text style={{ color: theme.inkSecondary }}>{masteryLabel(item, t)}</Text>
                            {item.locked ? (
                              <Text style={{ color: theme.inkMuted }}>{t('exercise.stats.mastery.locked')}</Text>
                            ) : null}
                          </View>
                          <View testID={`mastery-${item.id.replace('.', '-')}-progress`}>
                            <MasteryBar score={item.score} locked={item.locked} theme={theme} />
                          </View>
                        </View>
                      ))}
                    </Animated.View>
                  ) : null}
                </Animated.View>
              )
            })}
          </View>
        </View>
        <PrimaryButton
          accessibilityLabel={t('exercise.insights.button')}
          onPress={() => setInsightsOpen(true)}
          testID="see-insights"
        >
          {t('exercise.insights.button')}
        </PrimaryButton>
      </ScrollView>
      <ExerciseLearningInsightsSheet
        insights={insights}
        isPresented={insightsOpen}
        language={language}
        onDismiss={() => setInsightsOpen(false)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  content: { gap: 20, paddingBottom: 24, paddingHorizontal: 16, paddingTop: 24 },
  label: { fontSize: 13, letterSpacing: CAPS_TRACKING, textTransform: 'uppercase' },
  masteryItem: { gap: 8 },
  masteryItems: { gap: 14, paddingLeft: 16, paddingTop: 14 },
  masteryLabel: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 12 },
  // The toggle leaves ~12pt under its label, so an equal 12pt below the bar centres it between label and divider.
  masteryRow: { borderBottomWidth: StyleSheet.hairlineWidth, paddingBottom: 12, paddingTop: 6 },
  masteryToggle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: MIN_TOUCH_TARGET,
  },
  streakGoal: { gap: 8 },
  summary: { borderTopWidth: StyleSheet.hairlineWidth, flexDirection: 'row', gap: 20, paddingTop: 20 },
  summaryColumn: { flex: 1, gap: 4 },
  value: { fontSize: 27, fontWeight: '600' },
})
