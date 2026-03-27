import { styled } from 'goober'
import { useEffect, useMemo, useRef, useState } from 'preact/hooks'
import uPlot from 'uplot'
import 'uplot/dist/uPlot.min.css'
import type { DayStats } from '../exercises/stats'
import {
  getRecentScorePercent,
  getScorePercent,
  getStreakGoalProgress,
  getStreakRecord,
  STREAK_DAILY_GOAL,
} from '../exercises/stats'
import { useI18n } from '../hooks/i18n'
import { Detail } from './Detail'
import { Panel } from './Panel'

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
        passedLabel={t('exercise.stats.passed')}
      />
    </Panel>
  )
}

function StatsChart({
  stats,
  dateLabel,
  lang,
  correctLabel,
  incorrectLabel,
  passedLabel,
}: {
  stats: DayStats[]
  dateLabel: string
  lang: string
  correctLabel: string
  incorrectLabel: string
  passedLabel: string
}) {
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
            grid: { stroke: '#e2e8f0' },
            stroke: 'transparent',
          },
        ],
        series: [
          {
            show: false,
            label: dateLabel,
            value: (_, value) => (value == null ? '—' : dateFormatter.format(new Date(value * 1000))),
          },
          { label: correctLabel, stroke: '#16a34a', width: 2, value: (_, rawValue) => rawValue ?? '—' },
          { label: incorrectLabel, stroke: '#dc2626', width: 2, value: (_, rawValue) => rawValue ?? '—' },
          { label: passedLabel, stroke: '#94a3b8', width: 2, value: (_, rawValue) => rawValue ?? '—' },
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
  }, [width, days, dateLabel, lang, correctLabel, incorrectLabel, passedLabel])

  return (
    <ChartContainer>
      <div ref={containerRef} role="img" aria-label="statistics chart" style={{ width: '100%' }}>
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
  color: #475569;
  font-size: 0.9rem;
`

const StreakGoalBar = styled('div')`
  width: 100%;
  height: 0.6rem;
  border-radius: 999px;
  overflow: hidden;
  background: #e2e8f0;
`

const StreakGoalFill = styled('div')`
  height: 100%;
  background: #16a34a;
  border-radius: 999px;
  transition: width 220ms ease;
`

const SubNote = styled('span')`
  display: block;
  font-size: 0.75rem;
  font-weight: 400;
  color: #94a3b8;
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
  const map = new Map(stats.map((d) => [d.date.toISOString().slice(0, 10), d]))
  const result: DayStats[] = []
  const today = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setUTCDate(today.getUTCDate() - i)
    const key = d.toISOString().slice(0, 10)
    result.push(map.get(key) ?? { date: new Date(key), correct: 0, incorrect: 0, passed: 0 })
  }
  return result
}
