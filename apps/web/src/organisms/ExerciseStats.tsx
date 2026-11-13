import { styled } from 'goober'
import { useMemo, useState } from 'preact/hooks'
import 'uplot/dist/uPlot.min.css'
import { DEFAULT_DIMENSION_PROFILE, type DimensionProfile } from '../../../../src/exercises/dimensions'
import {
  computeInsights,
  computeMastery,
  type InsightData,
  type MasteryCategoryId,
  type MasteryCategory as MasteryCategoryType,
} from '../../../../src/exercises/mastery'
import type { SrsStore } from '../../../../src/exercises/srs'
import type { DailyActivity } from '../../../../src/exercises/stats'
import {
  localizedChartTrend,
  localizedDimension,
  localizedMasteryItem,
  localizedStreakHint,
  localizedStreakRecord,
  localizedStreakUnit,
  type StreakHint,
} from '../../../../src/localization'
import { sum } from '../../../../src/primitives/numbers'
import { Button } from '../atoms/Button'
import { DisclosureChevron } from '../atoms/DisclosureChevron'
import { Heading } from '../atoms/Heading'
import { ProgressBar } from '../atoms/ProgressBar'
import { useI18n } from '../hooks/useI18n'
import { type Streak, useStats } from '../hooks/useStats'
import { useTheme } from '../hooks/useTheme'
import { LockIcon } from '../icons/LockIcon'
import { Chart } from '../molecules/Chart'
import { Detail } from '../molecules/Detail'
import { Modal } from '../molecules/Modal'
import { Panel } from '../molecules/Panel'
import { LearningInsights } from './LearningInsights'

const CHART_COLORS = {
  light: { correct: '#3d5c2e', incorrect: '#8c1d18', passed: '#8a8076' },
  dark: { correct: '#a3c48a', incorrect: '#f0a08e', passed: '#968c7e' },
}

interface Props {
  dimensionProfile?: DimensionProfile
  srsStore?: SrsStore
}

const MASTERY_DISPLAY_EXPONENT = 0.4

export function ExerciseStats({ dimensionProfile = DEFAULT_DIMENSION_PROFILE, srsStore = {} }: Props) {
  const { theme } = useTheme()
  const { t, lang } = useI18n()
  const { stats, streak, findDate: findStats, getDailyWindow: days } = useStats()
  const dateFormatter = useMemo(() => new Intl.DateTimeFormat(lang, { month: 'long', day: 'numeric' }), [lang])
  const mastery = useMemo(() => computeMastery(dimensionProfile, srsStore), [dimensionProfile, srsStore])
  const insights = useMemo(
    () => computeInsights(dimensionProfile, srsStore, stats),
    [dimensionProfile, srsStore, stats],
  )
  const week = useMemo(() => days(7), [days])
  const [insightsOpen, setInsightsOpen] = useState(false)

  const streakHint = useMemo(() => {
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)
    return buildStreakHint(streak, findStats(today), findStats(yesterday), insights)
  }, [streak, findStats, insights])

  if (stats.length === 0) return null

  return (
    <>
      <Panel title={t('exercise.stats.title')} collapsible defaultCollapsed hint={localizedStreakHint(t, streakHint)}>
        <Chart
          ariaLabel={buildChartAriaLabel(week, t)}
          series={[
            {
              show: false,
              label: t('exercise.stats.date.label'),
              value: (_, value) => (value == null ? '—' : dateFormatter.format(new Date(value * 1000))),
            },
            {
              label: t('exercise.stats.correct'),
              stroke: CHART_COLORS[theme].correct,
              width: 2,
              value: (_, rawValue) => rawValue ?? '—',
            },
            {
              label: t('exercise.stats.incorrect'),
              stroke: CHART_COLORS[theme].incorrect,
              width: 2,
              value: (_, rawValue) => rawValue ?? '—',
            },
            {
              label: t('exercise.stats.skipped'),
              stroke: CHART_COLORS[theme].passed,
              width: 2,
              value: (_, rawValue) => rawValue ?? '—',
            },
          ]}
          data={[
            week.map((d) => d.date.getTime() / 1000),
            week.map((d) => d.correct),
            week.map((d) => d.incorrect),
            week.map((d) => d.passed),
          ]}
        />
        <StatsDetailsPanel mastery={mastery} onOpenInsights={() => setInsightsOpen(true)} />
      </Panel>
      {insightsOpen && (
        <Modal isOpen={insightsOpen} title={t('exercise.insights.title')} onClose={() => setInsightsOpen(false)}>
          <LearningInsights />
        </Modal>
      )}
    </>
  )
}

function masteryProgressBar(score: number, locked: boolean): { value: number; max: number } {
  if (locked || score <= 0) return { value: 0, max: 1 }
  const displayedScore = score ** MASTERY_DISPLAY_EXPONENT
  return { value: Number(displayedScore.toFixed(6)), max: 1 }
}

function MasterySection({ mastery }: { mastery: readonly MasteryCategoryType<MasteryCategoryId>[] }) {
  const { t } = useI18n()

  return (
    <MasteryContainer>
      <Heading as="h3">{t('exercise.stats.mastery.title')}</Heading>
      <MasteryGrid>
        {mastery.map((category) => {
          const categoryProgress = masteryProgressBar(category.score, category.locked)
          return (
            <MasteryCategory key={category.id} name="mastery">
              <MasterySummary data-testid={`mastery-category-header-${category.id}`}>
                <MasteryLabelGroup data-testid={`mastery-category-label-${category.id}`}>
                  <span>{localizedDimension(t, category.id)}</span>
                  {category.locked && (
                    <InlineLock>
                      <LockIcon aria-hidden="true" />
                      <span>{t('exercise.stats.mastery.locked')}</span>
                    </InlineLock>
                  )}
                </MasteryLabelGroup>
                <MasteryChevron data-testid={`mastery-category-chevron-${category.id}`} />
                <MasteryCategoryRow data-testid={`mastery-category-row-${category.id}`}>
                  <ProgressBar
                    value={categoryProgress.value}
                    max={categoryProgress.max}
                    style={{ height: '0.45rem' }}
                    aria-label={localizedDimension(t, category.id)}
                  />
                </MasteryCategoryRow>
              </MasterySummary>
              {
                <MasteryItems>
                  {category.items.map((item) => {
                    const itemProgress = masteryProgressBar(item.score, item.locked)
                    return (
                      <MasteryItem key={item.id}>
                        <MasteryItemTop>
                          <MasteryLabel>{localizedMasteryItem(t, item)}</MasteryLabel>
                          {item.locked && (
                            <InlineLock>
                              <LockIcon aria-hidden="true" />
                              <span>{t('exercise.stats.mastery.locked')}</span>
                            </InlineLock>
                          )}
                        </MasteryItemTop>
                        <MasteryRow>
                          <ProgressBar
                            value={itemProgress.value}
                            max={itemProgress.max}
                            style={{ height: '0.45rem' }}
                            aria-label={localizedMasteryItem(t, item)}
                          />
                        </MasteryRow>
                      </MasteryItem>
                    )
                  })}
                </MasteryItems>
              }
            </MasteryCategory>
          )
        })}
      </MasteryGrid>
    </MasteryContainer>
  )
}

function buildChartAriaLabel(
  days: readonly DailyActivity[],
  t: (key: string, params?: Record<string, string>) => string,
): string {
  const correctValues = days.map((day) => day.correct)
  const incorrectValues = days.map((day) => day.incorrect)
  const skippedValues = days.map((day) => day.passed)
  return t('exercise.stats.chart.aria.summary', {
    correctLabel: t('exercise.stats.correct'),
    correctTotal: String(sum(correctValues)),
    correctTrend: localizedChartTrend(t, correctValues),
    incorrectLabel: t('exercise.stats.incorrect'),
    incorrectTotal: String(sum(incorrectValues)),
    incorrectTrend: localizedChartTrend(t, incorrectValues),
    skippedLabel: t('exercise.stats.skipped'),
    skippedTotal: String(sum(skippedValues)),
    skippedTrend: localizedChartTrend(t, skippedValues),
  })
}

interface StatsDetailsPanelProps {
  mastery: readonly MasteryCategoryType<MasteryCategoryId>[]
  onOpenInsights: () => void
}

function StatsDetailsPanel({ mastery, onOpenInsights }: StatsDetailsPanelProps) {
  const { streak, accuracy } = useStats()
  const { t, lang } = useI18n()

  return (
    <StatsSummary>
      <DetailsRow>
        <Detail label={t('exercise.stats.accuracy.label')} valueLang={lang} valueDir="ltr">
          <ValueStack>
            <span>{accuracy.recent}%</span>
            <SubNote>{t('exercise.stats.accuracy.alltime', { value: String(accuracy.allTime) })}</SubNote>
          </ValueStack>
        </Detail>
        <Detail label={t('exercise.stats.streak.label')} valueLang={lang} valueDir="ltr">
          <ValueStack>
            <span>
              {streak.current} {localizedStreakUnit(t, streak.current)}
            </span>
            <SubNote>{localizedStreakRecord(t, streak.record)}</SubNote>
          </ValueStack>
        </Detail>
      </DetailsRow>
      {streak.remaining > 0 && (
        <StreakGoalSection>
          <StreakGoalHint>
            {t('exercise.stats.streak.extendHint', { remaining: String(streak.remaining) })}
          </StreakGoalHint>
          <ProgressBar
            value={Math.min(streak.correct, streak.goal)}
            max={streak.goal}
            style={{ height: '0.6rem' }}
            aria-label={t('exercise.stats.streak.progress.label')}
          />
        </StreakGoalSection>
      )}
      <MasterySection mastery={mastery} />
      <Button onClick={onOpenInsights}>{t('exercise.insights.button')}</Button>
    </StatsSummary>
  )
}

function buildStreakHint(
  streak: Streak,
  today?: DailyActivity,
  yesterday?: DailyActivity,
  insights?: InsightData,
): StreakHint {
  if (streak.remaining > 1) return { kind: 'streak', remaining: streak.remaining }
  if (streak.remaining === 1) return { kind: 'streakAlmostThere' }
  if (streak.correct === streak.goal) return { kind: 'streakWellDone' }

  const correct = today?.correct ?? 0
  const incorrect = today?.incorrect ?? 0
  const passed = today?.passed ?? 0
  const attempted = correct + incorrect

  if (attempted > 0 && incorrect / attempted > 0.5) return { kind: 'encourage' }
  if (passed >= Math.max(attempted, 4)) return { kind: 'skipping' }
  if (attempted >= 12 && correct / attempted >= 0.9) return { kind: 'excellent' }

  const strongest = insights?.strengths[0]
  if (strongest != null && strongest.score >= 0.75) return { kind: 'strongDimension', candidate: strongest }

  const stuck = insights?.stuck.topDimensions[0]
  if (stuck != null) return { kind: 'weakDimension', candidate: stuck }

  const yesterdayCorrect = yesterday?.correct ?? 0

  if (correct < yesterdayCorrect && yesterdayCorrect - correct <= 5)
    return { kind: 'vsYesterdayAlmostThere', target: yesterdayCorrect - correct }
  if (correct < yesterdayCorrect) return { kind: 'vsYesterdayBelow', target: yesterdayCorrect }
  if (correct === yesterdayCorrect) return { kind: 'vsYesterdayEqual' }
  if (correct > yesterdayCorrect && correct - yesterdayCorrect <= 5) return { kind: 'vsYesterdayExceeded' }

  return { kind: 'none' }
}

const DetailsRow = styled('div')`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  width: 100%;
`

const StatsSummary = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const StreakGoalSection = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.75rem 0rem;
`

const StreakGoalHint = styled('p')`
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
`

const SubNote = styled('span')`
  display: block;
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--color-text-muted);
  margin-top: 0.15rem;
`

const ValueStack = styled('span')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-variant-numeric: tabular-nums;
`

const MasteryContainer = styled('section')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-block-end: 1rem;
`

const MasteryGrid = styled('div')`
  display: flex;
  flex-direction: column;
  border-block-start: 1px solid var(--color-border);
`

const MasteryCategory = styled('details')`
  border-block-end: 1px solid var(--color-border);
  transition: border-color 180ms cubic-bezier(0.22, 1, 0.36, 1);
`

const MasterySummary = styled('summary')`
  border: 0;
  width: 100%;
  background: transparent;
  text-align: start;
  padding: 0.6rem;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 1.4rem;
  grid-template-rows: auto auto;
  column-gap: 0.5rem;
  gap: 0.4rem;
  cursor: pointer;
  transition: background 150ms ease;

  &:hover {
    background: var(--color-bg-hover);
  }

  &:focus-visible {
    outline: 3px solid var(--color-focus-outline);
    outline-offset: -3px;
  }
`

const MasteryLabelGroup = styled('span')`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  grid-column: 1;
  grid-row: 1;
`

const MasteryChevron = styled(DisclosureChevron)`
  color: var(--color-text-muted);
  grid-column: 2;
  grid-row: 1 / span 2;
`

const MasteryCategoryRow = styled('span')`
  grid-column: 1;
  grid-row: 2;
`

const MasteryItems = styled('div')`
  border-top: 1px solid var(--color-border);
  padding: 1.2rem 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`

const MasteryItem = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const MasteryItemTop = styled('span')`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
`

const MasteryLabel = styled('span')`
  font-size: 0.8rem;
  color: var(--color-text-secondary);
`

const MasteryRow = styled('span')`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.45rem;
  align-items: center;
`

const InlineLock = styled('span')`
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  font-size: 0.7rem;
  color: var(--color-text-muted);
`
