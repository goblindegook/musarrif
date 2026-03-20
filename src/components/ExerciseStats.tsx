import { styled } from 'goober'
import { useEffect, useMemo, useRef, useState } from 'preact/hooks'
import uPlot from 'uplot'
import 'uplot/dist/uPlot.min.css'
import type { DayStats } from '../exercises/stats'
import { getScorePercent } from '../exercises/stats'
import { useI18n } from '../hooks/i18n'
import { Detail } from './Detail'
import { Panel } from './Panel'

type Props = {
  stats: DayStats[]
  streak: number
}

const CHART_H = 240

export function ExerciseStats({ stats, streak }: Props) {
  const { t, lang } = useI18n()
  const score = getScorePercent(stats)

  return (
    <Panel title={t('exercise.stats.title')} collapsible defaultCollapsed>
      <DetailsRow>
        <Detail label={t('exercise.stats.score.label')} value={`${score}%`} valueLang={lang} valueDir="ltr" />
        <Detail
          label={t('exercise.stats.streak.label')}
          value={`${streak} ${t('exercise.stats.streak.unit')}`}
          valueLang={lang}
          valueDir="ltr"
        />
      </DetailsRow>
      <StatsChart
        stats={stats}
        dateLabel={t('exercise.stats.date.label')}
        lang={lang}
        correctLabel={t('exercise.stats.correct')}
        incorrectLabel={t('exercise.stats.incorrect')}
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
}: {
  stats: DayStats[]
  dateLabel: string
  lang: string
  correctLabel: string
  incorrectLabel: string
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
        ],
      },
      [days.map((d) => d.date.getTime() / 1000), days.map((d) => d.correct), days.map((d) => d.incorrect)],
      mountRef.current,
    )

    return () => plot.destroy()
  }, [width, days, dateLabel, lang, correctLabel, incorrectLabel])

  return (
    <div ref={containerRef} role="img" aria-label="statistics chart" style={{ width: '100%' }}>
      <div ref={mountRef} />
    </div>
  )
}

const DetailsRow = styled('div')`
  display: flex;
  gap: 0.75rem;
  width: 100%;

  & > * {
    flex: 1;
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
    result.push(map.get(key) ?? { date: new Date(key), correct: 0, incorrect: 0 })
  }
  return result
}
