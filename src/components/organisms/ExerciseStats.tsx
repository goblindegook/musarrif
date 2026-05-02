import { styled } from 'goober'
import { useEffect, useMemo, useRef, useState } from 'preact/hooks'
import uPlot from 'uplot'
import 'uplot/dist/uPlot.min.css'
import type { DimensionProfile } from '../../exercises/dimensions'
import { buildMasterySnapshot, type MasterySnapshot } from '../../exercises/mastery'
import type { SrsStore } from '../../exercises/srs'
import type { DayStats } from '../../exercises/stats'
import {
  getAccuracyPercent,
  getRecentAccuracyPercent,
  getStreakGoalProgress,
  getStreakRecord,
  STREAK_DAILY_GOAL,
} from '../../exercises/stats'
import { useI18n } from '../../hooks/useI18n'
import { useTheme } from '../../hooks/useTheme'
import { Heading } from '../atoms/Heading'
import { ProgressBar } from '../atoms/ProgressBar'
import { LockIcon } from '../icons/LockIcon'
import { Detail } from '../molecules/Detail'
import { Panel } from '../molecules/Panel'

const CHART_COLORS = {
  light: { correct: '#16a34a', incorrect: '#dc2626', passed: '#94a3b8', grid: '#e2e8f0', text: '#3a342a' },
  dark: { correct: '#4ade80', incorrect: '#f87171', passed: '#7a7060', grid: '#3a342a', text: '#d6dce3' },
}

type Props = {
  stats: DayStats[]
  streak: number
  dimensionProfile?: DimensionProfile
  srsStore?: SrsStore
}

const CHART_H = 240
const MASTERY_DISPLAY_EXPONENT = 0.6
const DEFAULT_DIMENSION_PROFILE: DimensionProfile = {
  tenses: 0,
  pronouns: 0,
  diacritics: 0,
  forms: 0,
  rootTypes: 0,
  nominals: 0,
}
const FORM_LABELS: Record<string, string> = {
  '1': 'I',
  '2': 'II',
  '3': 'III',
  '4': 'IV',
  '5': 'V',
  '6': 'VI',
  '7': 'VII',
  '8': 'VIII',
  '9': 'IX',
  '10': 'X',
}
const ROOT_TYPE_LABEL_KEYS = {
  sound: 'exercise.stats.mastery.rootType.sound',
  doubled: 'exercise.stats.mastery.rootType.doubled',
  hamzated: 'exercise.stats.mastery.rootType.hamzated',
  assimilated: 'exercise.stats.mastery.rootType.assimilated',
  hollow: 'exercise.stats.mastery.rootType.hollow',
  defective: 'exercise.stats.mastery.rootType.defective',
} as const

function StatsDetailsPanel({
  stats,
  streak,
  mastery,
}: {
  stats: DayStats[]
  streak: number
  mastery: MasterySnapshot
}) {
  const { t, lang } = useI18n()
  const recentAccuracy = getRecentAccuracyPercent(stats, 15)
  const allTimeAccuracy = getAccuracyPercent(stats)
  const record = getStreakRecord(stats)
  const streakGoal = getStreakGoalProgress(stats)
  const streakGoalNow = Math.min(streakGoal.correct, STREAK_DAILY_GOAL)

  return (
    <StatsSummary>
      <DetailsRow>
        <Detail label={t('exercise.stats.accuracy.label')} valueLang={lang} valueDir="ltr">
          <ValueStack>
            <span>{recentAccuracy}%</span>
            <SubNote>{t('exercise.stats.accuracy.alltime', { value: String(allTimeAccuracy) })}</SubNote>
          </ValueStack>
        </Detail>
        <Detail label={t('exercise.stats.streak.label')} valueLang={lang} valueDir="ltr">
          <ValueStack>
            <span>
              {streak} {t(streak === 1 ? 'exercise.stats.streak.unit.singular' : 'exercise.stats.streak.unit.plural')}
            </span>
            <SubNote>
              {t(record === 1 ? 'exercise.stats.streak.record.singular' : 'exercise.stats.streak.record.plural', {
                days: String(record),
              })}
            </SubNote>
          </ValueStack>
        </Detail>
      </DetailsRow>
      {streakGoal.remaining > 0 && (
        <StreakGoalSection>
          <StreakGoalHint>
            {t('exercise.stats.streak.extendHint', { remaining: String(streakGoal.remaining) })}
          </StreakGoalHint>
          <ProgressBar
            value={streakGoalNow}
            max={STREAK_DAILY_GOAL}
            style={{ height: '0.6rem' }}
            aria-label={t('exercise.stats.streak.progress.label')}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={STREAK_DAILY_GOAL}
            aria-valuenow={streakGoalNow}
          />
        </StreakGoalSection>
      )}
      <MasterySection mastery={mastery} />
    </StatsSummary>
  )
}

export function ExerciseStats({ stats, streak, dimensionProfile = DEFAULT_DIMENSION_PROFILE, srsStore = {} }: Props) {
  const { t, lang } = useI18n()
  const mastery = useMemo(() => buildMasterySnapshot(dimensionProfile, srsStore), [dimensionProfile, srsStore])

  if (stats.length === 0) return null

  return (
    <Panel title={t('exercise.stats.title')} collapsible defaultCollapsed>
      <StatsChart
        stats={stats}
        dateLabel={t('exercise.stats.date.label')}
        lang={lang}
        correctLabel={t('exercise.stats.correct')}
        incorrectLabel={t('exercise.stats.incorrect')}
        skippedLabel={t('exercise.stats.skipped')}
      />
      <StatsDetailsPanel stats={stats} streak={streak} mastery={mastery} />
    </Panel>
  )
}

function masteryItemLabel(
  categoryId: 'rootTypes' | 'forms' | 'tenses' | 'pronouns' | 'nominals',
  itemId: string,
  t: ReturnType<typeof useI18n>['t'],
): string {
  if (categoryId === 'rootTypes') return t(ROOT_TYPE_LABEL_KEYS[itemId as keyof typeof ROOT_TYPE_LABEL_KEYS])
  if (categoryId === 'forms') return t('exercise.stats.mastery.form', { form: FORM_LABELS[itemId] ?? itemId })
  if (categoryId === 'tenses') return t(`tense.${itemId}`)
  if (categoryId === 'pronouns') return t(`pronoun.${itemId}`)
  if (categoryId === 'nominals' && itemId === 'participles') return t('exercise.stats.mastery.nominal.participles')
  if (categoryId === 'nominals' && itemId === 'masdar') return t('exercise.stats.mastery.nominal.masdar')
  return itemId
}

function masteryProgressBar(score: number, locked: boolean): { value: number; max: number } {
  if (locked || score <= 0) return { value: 0, max: 1 }
  const displayedScore = score ** MASTERY_DISPLAY_EXPONENT
  return { value: Number(displayedScore.toFixed(6)), max: 1 }
}

function MasterySection({ mastery }: { mastery: MasterySnapshot }) {
  const { t } = useI18n()
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <MasteryContainer>
      <Heading as="h3">{t('exercise.stats.mastery.title')}</Heading>
      <MasteryGrid>
        {mastery.categories.map((category) => {
          const isExpanded = expanded === category.id
          const categoryProgress = masteryProgressBar(category.score, category.locked)
          return (
            <MasteryCategory key={category.id}>
              <MasteryHeader
                data-testid={`mastery-category-header-${category.id}`}
                type="button"
                onClick={() => setExpanded((current) => (current === category.id ? null : category.id))}
              >
                <MasteryLabelGroup data-testid={`mastery-category-label-${category.id}`}>
                  <span>{t(`exercise.unlock.dimension.${category.id}`)}</span>
                  {category.locked && (
                    <InlineLock>
                      <LockIcon />
                      <span>{t('exercise.stats.mastery.locked')}</span>
                    </InlineLock>
                  )}
                </MasteryLabelGroup>
                <Chevron data-testid={`mastery-category-chevron-${category.id}`} collapsed={!isExpanded}>
                  ›
                </Chevron>
                <MasteryCategoryRow data-testid={`mastery-category-row-${category.id}`}>
                  <ProgressBar
                    value={categoryProgress.value}
                    max={categoryProgress.max}
                    style={{ height: '0.45rem' }}
                  />
                </MasteryCategoryRow>
              </MasteryHeader>
              {isExpanded && (
                <MasteryItems>
                  {category.items.map((item) => {
                    const itemProgress = masteryProgressBar(item.score, item.locked)
                    return (
                      <MasteryItem key={`${category.id}-${item.id}`}>
                        <MasteryItemTop>
                          <MasteryLabel>{masteryItemLabel(category.id, item.id, t)}</MasteryLabel>
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
                          />
                        </MasteryRow>
                      </MasteryItem>
                    )
                  })}
                </MasteryItems>
              )}
            </MasteryCategory>
          )
        })}
      </MasteryGrid>
    </MasteryContainer>
  )
}

interface StatsChartProps {
  stats: DayStats[]
  dateLabel: string
  lang: string
  correctLabel: string
  incorrectLabel: string
  skippedLabel: string
}

function StatsChart({ stats, dateLabel, lang, correctLabel, incorrectLabel, skippedLabel }: StatsChartProps) {
  const { t } = useI18n()
  const { themePreference } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const mountRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const days = useMemo(() => buildDayWindow(stats, 7), [stats])
  const dateFormatter = useMemo(() => new Intl.DateTimeFormat(lang, { month: 'long', day: 'numeric' }), [lang])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const w = Math.floor(entries[0].contentRect.width)
      if (w > 0) setWidth(w)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (width === 0 || !mountRef.current) return

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
    const colors = isDark ? CHART_COLORS.dark : CHART_COLORS.light
    const spline = uPlot.paths?.spline?.()

    const plot = new uPlot(
      {
        width,
        height: CHART_H,
        padding: [8, 4, 8, 4],
        cursor: { x: false, y: false },
        scales: {
          x: { time: true },
          y: { auto: true },
        },
        axes: [
          {
            grid: { stroke: colors.grid },
            stroke: colors.text,
          },
          {
            show: false,
          },
        ],
        series: [
          {
            show: false,
            label: dateLabel,
            value: (_, value) => (value == null ? '—' : dateFormatter.format(new Date(value * 1000))),
          },
          {
            label: correctLabel,
            stroke: colors.correct,
            width: 2,
            paths: spline,
            value: (_, rawValue) => rawValue ?? '—',
          },
          {
            label: incorrectLabel,
            stroke: colors.incorrect,
            width: 2,
            paths: spline,
            value: (_, rawValue) => rawValue ?? '—',
          },
          {
            label: skippedLabel,
            stroke: colors.passed,
            width: 2,
            paths: spline,
            value: (_, rawValue) => rawValue ?? '—',
          },
        ],
      },
      [
        days.map((d) => d.date.getTime() / 1000),
        days.map((d) => d.correct),
        days.map((d) => d.incorrect),
        days.map((d) => d.passed),
      ],
      mountRef.current,
    )

    return () => plot.destroy()
  }, [width, days, dateLabel, lang, correctLabel, incorrectLabel, skippedLabel, themePreference])

  return (
    <ChartContainer>
      <div ref={containerRef} role="img" aria-label={t('exercise.stats.chart.aria')} style={{ width: '100%' }}>
        <div ref={mountRef} />
      </div>
    </ChartContainer>
  )
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

const ChartContainer = styled('div')`
  width: 100%;

  .u-legend {
    font-size: 0.75rem;
  }

  .u-legend tr:first-child {
    display: none;
  }
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

const MasteryCategory = styled('div')`
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  background: color-mix(in srgb, var(--color-bg-surface) 92%, var(--color-bg-base) 8%);
  overflow: hidden;
  transition: border-color 180ms cubic-bezier(0.22, 1, 0.36, 1);

  &:has(> button:hover) {
    border-color: var(--color-accent);
  }
`

const MasteryHeader = styled('button')`
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

const Chevron = styled('span')<{ collapsed: boolean }>`
  color: var(--color-text-muted);
  font-size: 1.2rem;
  line-height: 1;
  transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1);
  transform: ${({ collapsed }) => (collapsed ? 'rotate(90deg)' : 'rotate(-90deg)')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  grid-column: 2;
  grid-row: 1 / span 2;
  user-select: none;
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

function buildDayWindow(stats: DayStats[], days: number): DayStats[] {
  const map = new Map(stats.map((d) => [localDateKey(d.date), d]))
  const result: DayStats[] = []
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const key = localDateKey(d)
    result.push(map.get(key) ?? { date: d, correct: 0, incorrect: 0, passed: 0 })
  }
  return result
}

function localDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}
