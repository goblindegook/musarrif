import { styled } from 'goober'
import { useEffect, useMemo, useRef, useState } from 'preact/hooks'
import uPlot from 'uplot'
import 'uplot/dist/uPlot.min.css'
import type { DayStats } from '../../exercises/stats'
import {
  getRecentScorePercent,
  getScorePercent,
  getStreakGoalProgress,
  getStreakRecord,
  STREAK_DAILY_GOAL,
} from '../../exercises/stats'
import { useI18n } from '../../hooks/i18n'
import { useTheme } from '../../hooks/theme'
import { Detail } from '../molecules/Detail'
import { Panel } from '../molecules/Panel'

const CHART_COLORS = {
  light: { correct: '#16a34a', incorrect: '#dc2626', passed: '#94a3b8', grid: '#e2e8f0' },
  dark: { correct: '#4ade80', incorrect: '#f87171', passed: '#7a7060', grid: '#3a342a' },
}

type Props = {
  stats: DayStats[]
  streak: number
}

const CHART_H = 240

function StatsDetailsPanel({ stats, streak }: { stats: DayStats[]; streak: number }) {
  const { t, lang } = useI18n()
  const recentScore = getRecentScorePercent(stats, 15)
  const allTimeScore = getScorePercent(stats)
  const record = getStreakRecord(stats)
  const streakGoal = getStreakGoalProgress(stats)
  const streakGoalNow = Math.min(streakGoal.correct, STREAK_DAILY_GOAL)
  const streakGoalPercent = Math.round((streakGoalNow / STREAK_DAILY_GOAL) * 100)

  return (
    <StatsSummary>
      <DetailsRow>
        <Detail label={t('exercise.stats.score.label')} valueLang={lang} valueDir="ltr">
          <ValueStack>
            <span>{recentScore}%</span>
            <SubNote>{t('exercise.stats.score.alltime', { score: String(allTimeScore) })}</SubNote>
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
          <StreakGoalBar
            aria-label={t('exercise.stats.streak.progress.label')}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={STREAK_DAILY_GOAL}
            aria-valuenow={streakGoalNow}
          >
            <StreakGoalFill style={{ width: `${streakGoalPercent}%` }} />
          </StreakGoalBar>
        </StreakGoalSection>
      )}
    </StatsSummary>
  )
}

export function ExerciseStats({ stats, streak }: Props) {
  const { t, lang } = useI18n()

  if (stats.length === 0) return null

  return (
    <Panel title={t('exercise.stats.title')} collapsible defaultCollapsed>
      <StatsDetailsPanel stats={stats} streak={streak} />
      <StatsChart
        stats={stats}
        dateLabel={t('exercise.stats.date.label')}
        lang={lang}
        correctLabel={t('exercise.stats.correct')}
        incorrectLabel={t('exercise.stats.incorrect')}
        skippedLabel={t('exercise.stats.skipped')}
      />
    </Panel>
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
          {},
          {
            size: 0,
            gap: 0,
            ticks: { show: false },
            values: () => [],
            grid: { stroke: colors.grid },
            stroke: 'transparent',
          },
        ],
        series: [
          {
            show: false,
            label: dateLabel,
            value: (_, value) => (value == null ? '—' : dateFormatter.format(new Date(value * 1000))),
          },
          { label: correctLabel, stroke: colors.correct, width: 2, value: (_, rawValue) => rawValue ?? '—' },
          { label: incorrectLabel, stroke: colors.incorrect, width: 2, value: (_, rawValue) => rawValue ?? '—' },
          { label: skippedLabel, stroke: colors.passed, width: 2, value: (_, rawValue) => rawValue ?? '—' },
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

const StreakGoalBar = styled('div')`
  width: 100%;
  height: 0.6rem;
  border-radius: 999px;
  overflow: hidden;
  background: var(--color-border);
`

const StreakGoalFill = styled('div')`
  height: 100%;
  background: var(--color-success-border);
  border-radius: 999px;
  transition: width 220ms ease;
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
