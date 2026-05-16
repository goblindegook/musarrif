import { styled } from 'goober'
import { useMemo } from 'preact/hooks'
import 'uplot/dist/uPlot.min.css'
import { DEFAULT_DIMENSION_PROFILE, type DimensionProfile } from '../../exercises/dimensions'
import {
  computeMastery,
  type MasteryCategoryId,
  type MasteryCategory as MasteryCategoryType,
  type MasteryItem as MasteryItemData,
} from '../../exercises/mastery'
import type { SrsStore } from '../../exercises/srs'
import type { DailyActivity } from '../../exercises/stats'
import { parseInteger, sum, toRoman } from '../../primitives/numbers'
import { Heading } from '../atoms/Heading'
import { ProgressBar } from '../atoms/ProgressBar'
import { useI18n } from '../hooks/useI18n'
import { type Streak, useStats } from '../hooks/useStats'
import { useTheme } from '../hooks/useTheme'
import { LockIcon } from '../icons/LockIcon'
import { Chart } from '../molecules/Chart'
import { Detail } from '../molecules/Detail'
import { Panel } from '../molecules/Panel'

const CHART_COLORS = {
  light: { correct: '#16a34a', incorrect: '#dc2626', passed: '#94a3b8' },
  dark: { correct: '#4ade80', incorrect: '#f87171', passed: '#7a7060' },
}

interface Props {
  dimensionProfile?: DimensionProfile
  srsStore?: SrsStore
}

const MASTERY_DISPLAY_EXPONENT = 0.6

const ROOT_TYPE_LABEL_KEYS = {
  sound: 'exercise.stats.mastery.rootType.sound',
  doubled: 'exercise.stats.mastery.rootType.doubled',
  hamzated: 'exercise.stats.mastery.rootType.hamzated',
  assimilated: 'exercise.stats.mastery.rootType.assimilated',
  hollow: 'exercise.stats.mastery.rootType.hollow',
  defective: 'exercise.stats.mastery.rootType.defective',
} as const

export function ExerciseStats({ dimensionProfile = DEFAULT_DIMENSION_PROFILE, srsStore = {} }: Props) {
  const { theme } = useTheme()
  const { t, lang } = useI18n()
  const { stats, streak, findDate: findStats, getDailyWindow: days } = useStats()
  const dateFormatter = useMemo(() => new Intl.DateTimeFormat(lang, { month: 'long', day: 'numeric' }), [lang])
  const mastery = useMemo(() => computeMastery(dimensionProfile, srsStore), [dimensionProfile, srsStore])
  const week = useMemo(() => days(7), [days])
  const chartAriaLabel = useMemo(() => buildChartAriaLabel(week, t), [week, t])

  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  const [streakHintKey, streakHintParams] = buildStreakHint(streak, findStats(today), findStats(yesterday), mastery)

  if (stats.length === 0) return null

  return (
    <Panel
      title={t('exercise.stats.title')}
      collapsible
      defaultCollapsed
      hint={t(streakHintKey, resolveStreakHintParams(t, streakHintParams))}
    >
      <Chart
        ariaLabel={chartAriaLabel}
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
      <StatsDetailsPanel mastery={mastery} />
    </Panel>
  )
}

function masteryItemLabel<T extends MasteryCategoryId>(
  item: MasteryItemData<T>,
  t: (key: string, params?: Record<string, string>) => string,
): string {
  const { categoryId, value } = item
  if (categoryId === 'rootTypes') return t(ROOT_TYPE_LABEL_KEYS[value as keyof typeof ROOT_TYPE_LABEL_KEYS])
  if (categoryId === 'forms') return t('exercise.stats.mastery.form', { form: toRoman(parseInteger(String(value), 0)) })
  if (categoryId === 'tenses') return t(`tense.${value}`)
  if (categoryId === 'pronouns') return t(`pronoun.${value}`)
  if (categoryId === 'nominals' && value === 'participles') return t('exercise.stats.mastery.nominal.participles')
  if (categoryId === 'nominals' && value === 'masdar') return t('exercise.stats.mastery.nominal.masdar')
  return ''
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
                  <span>{t(`exercise.unlock.dimension.${category.id}`)}</span>
                  {category.locked && (
                    <InlineLock>
                      <LockIcon />
                      <span>{t('exercise.stats.mastery.locked')}</span>
                    </InlineLock>
                  )}
                </MasteryLabelGroup>
                <Chevron data-testid={`mastery-category-chevron-${category.id}`}>›</Chevron>
                <MasteryCategoryRow data-testid={`mastery-category-row-${category.id}`}>
                  <ProgressBar
                    value={categoryProgress.value}
                    max={categoryProgress.max}
                    style={{ height: '0.45rem' }}
                    aria-label={t(`exercise.unlock.dimension.${category.id}`)}
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
                          <MasteryLabel>{masteryItemLabel(item, t)}</MasteryLabel>
                          {item.locked && (
                            <InlineLock>
                              <LockIcon />
                              <span>{t('exercise.stats.mastery.locked')}</span>
                            </InlineLock>
                          )}
                        </MasteryItemTop>
                        <MasteryRow>
                          <ProgressBar
                            value={itemProgress.value}
                            max={itemProgress.max}
                            style={{ height: '0.45rem' }}
                            aria-label={masteryItemLabel(item, t)}
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

function trendDirection(values: readonly number[]): 'up' | 'down' | 'steady' {
  const first = values[0] ?? 0
  const last = values[values.length - 1] ?? 0
  if (last > first) return 'up'
  if (last < first) return 'down'
  return 'steady'
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
    correctTrend: t(`exercise.stats.chart.trend.${trendDirection(correctValues)}`),
    incorrectLabel: t('exercise.stats.incorrect'),
    incorrectTotal: String(sum(incorrectValues)),
    incorrectTrend: t(`exercise.stats.chart.trend.${trendDirection(incorrectValues)}`),
    skippedLabel: t('exercise.stats.skipped'),
    skippedTotal: String(sum(skippedValues)),
    skippedTrend: t(`exercise.stats.chart.trend.${trendDirection(skippedValues)}`),
  })
}

interface StatsDetailsPanelProps {
  mastery: readonly MasteryCategoryType<MasteryCategoryId>[]
}

function StatsDetailsPanel({ mastery }: StatsDetailsPanelProps) {
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
              {streak.current}{' '}
              {t(streak.current === 1 ? 'exercise.stats.streak.unit.singular' : 'exercise.stats.streak.unit.plural')}
            </span>
            <SubNote>
              {t(
                streak.record === 1 ? 'exercise.stats.streak.record.singular' : 'exercise.stats.streak.record.plural',
                {
                  days: String(streak.record),
                },
              )}
            </SubNote>
          </ValueStack>
        </Detail>
      </DetailsRow>
      {streak.remaining > 0 && (
        <StreakGoalSection>
          <StreakGoalHint>
            {t('exercise.stats.streak.extendHint', { remaining: String(streak.remaining) })}
          </StreakGoalHint>
          <ProgressBar
            value={streak.progress}
            max={streak.goal}
            style={{ height: '0.6rem' }}
            aria-label={t('exercise.stats.streak.progress.label')}
          />
        </StreakGoalSection>
      )}
      <MasterySection mastery={mastery} />
    </StatsSummary>
  )
}

function strongestMasteryItem(
  mastery: readonly MasteryCategoryType<MasteryCategoryId>[],
): MasteryItemData<MasteryCategoryId> | null {
  const unlockedItems = mastery.flatMap((category) => category.items.filter((item) => !item.locked))
  if (unlockedItems.length === 0) return null
  return unlockedItems.reduce((strongest, item) => (item.score > strongest.score ? item : strongest), unlockedItems[0])
}

function weakestMasteryItem(
  mastery: readonly MasteryCategoryType<MasteryCategoryId>[],
): MasteryItemData<MasteryCategoryId> | null {
  const unlockedItems = mastery.flatMap((category) => category.items.filter((item) => !item.locked))
  if (unlockedItems.length === 0) return null
  return unlockedItems.reduce((weakest, item) => (item.score < weakest.score ? item : weakest), unlockedItems[0])
}

interface StreakHintParams extends Record<string, string | undefined> {
  remaining?: string
  target?: string
  dimension?: string
  dimensionLabelKey?: string
  form?: string
}

function masteryItemLabelDescriptor(item: MasteryItemData<MasteryCategoryId>): [key: string, form: string] {
  const { categoryId, value } = item
  if (categoryId === 'rootTypes') return [ROOT_TYPE_LABEL_KEYS[value as keyof typeof ROOT_TYPE_LABEL_KEYS], '']
  if (categoryId === 'forms') return ['exercise.stats.mastery.form', toRoman(parseInteger(String(value), 0))]
  if (categoryId === 'tenses') return [`tense.${value}`, '']
  if (categoryId === 'pronouns') return [`pronoun.${value}`, '']
  if (categoryId === 'nominals' && value === 'participles') return ['exercise.stats.mastery.nominal.participles', '']
  if (categoryId === 'nominals' && value === 'masdar') return ['exercise.stats.mastery.nominal.masdar', '']
  return ['', '']
}

function resolveStreakHintParams(t: ReturnType<typeof useI18n>['t'], streakHintParams: StreakHintParams) {
  return streakHintParams.dimensionLabelKey == null
    ? streakHintParams
    : {
        ...streakHintParams,
        dimension:
          streakHintParams.dimensionLabelKey === 'exercise.stats.mastery.form'
            ? t(streakHintParams.dimensionLabelKey, { form: streakHintParams.form })
            : t(streakHintParams.dimensionLabelKey),
      }
}

function buildStreakHint(
  streak: Streak,
  today?: DailyActivity,
  yesterday?: DailyActivity,
  mastery: readonly MasteryCategoryType<MasteryCategoryId>[] = [],
): [string, StreakHintParams] {
  if (streak.remaining > 1) return ['exercise.stats.progressHint.streak', { remaining: String(streak.remaining) }]
  if (streak.remaining === 1) return ['exercise.stats.progressHint.streak.almostThere', {}]
  if (streak.progress === streak.goal) return ['exercise.stats.progressHint.streak.wellDone', {}]

  const correct = today?.correct ?? 0
  const incorrect = today?.incorrect ?? 0
  const passed = today?.passed ?? 0
  const attempted = correct + incorrect

  if (attempted > 0 && incorrect / attempted > 0.5) return ['exercise.stats.progressHint.encourage', {}]
  if (passed >= Math.max(attempted, 4)) return ['exercise.stats.progressHint.skipping', {}]
  if (attempted >= 12 && correct / attempted >= 0.9) return ['exercise.stats.progressHint.excellent', {}]

  const strongest = strongestMasteryItem(mastery)
  const weakest = weakestMasteryItem(mastery)
  const spread = strongest != null && weakest != null ? strongest.score - weakest.score : 0

  if (strongest != null && strongest.score >= 0.75 && spread >= 0.25) {
    const [dimensionLabelKey, form] = masteryItemLabelDescriptor(strongest)
    return ['exercise.stats.progressHint.strongDimension', { dimensionLabelKey, form }]
  }

  if (weakest != null && weakest.score <= 0.25 && spread >= 0.25) {
    const [dimensionLabelKey, form] = masteryItemLabelDescriptor(weakest)
    return ['exercise.stats.progressHint.weakDimension', { dimensionLabelKey, form }]
  }

  const yesterdayCorrect = yesterday?.correct ?? 0

  if (correct < yesterdayCorrect && yesterdayCorrect - correct <= 5)
    return ['exercise.stats.progressHint.vsYesterday.almostThere', { target: String(yesterdayCorrect - correct) }]
  if (correct < yesterdayCorrect)
    return ['exercise.stats.progressHint.vsYesterday.below', { target: String(yesterdayCorrect) }]
  if (correct === yesterdayCorrect) return ['exercise.stats.progressHint.vsYesterday.equal', {}]
  if (correct > yesterdayCorrect && correct - yesterdayCorrect <= 5)
    return ['exercise.stats.progressHint.vsYesterday.exceeded', {}]

  return ['', {}]
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
`

const MasteryGrid = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const MasteryCategory = styled('details')`
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  background: color-mix(in srgb, var(--color-bg-surface) 92%, var(--color-bg-base) 8%);
  overflow: hidden;
  transition: border-color 180ms cubic-bezier(0.22, 1, 0.36, 1);

  &:has(> button:hover) {
    border-color: var(--color-accent);
  }
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
    background: var(--color-bg-accent-hover);
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

const Chevron = styled('span')`
  color: var(--color-text-muted);
  font-size: 1.2rem;
  line-height: 1;
  transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1);
  transform: rotate(90deg);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  grid-column: 2;
  grid-row: 1 / span 2;
  user-select: none;

  details[open] & {
    transform: rotate(-90deg);
  }
`

const MasteryCategoryRow = styled('span')`
  grid-column: 1;
  grid-row: 2;
`

const MasteryItems = styled('div')`
  border-top: 1px solid var(--color-border);
  padding: 0.45rem 0.6rem 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
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
