import { styled } from 'goober'
import { useEffect, useRef, useState } from 'preact/hooks'
import uPlot from 'uplot'
import { useTheme } from '../hooks/useTheme'

const CHART_COLORS = {
  light: { grid: '#e2e8f0', text: '#3a342a' },
  dark: { grid: '#3a342a', text: '#d6dce3' },
}

export interface StatsChartProps {
  width?: number
  height?: number
  series: readonly uPlot.Series[]
  data: uPlot.AlignedData
  ariaLabel?: string
}

export function Chart({ series, data, ariaLabel, width: defaultWidth, height = 240 }: StatsChartProps) {
  const { theme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const mountRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(defaultWidth ?? 0)

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

  const spline = uPlot.paths?.spline?.()

  useEffect(() => {
    if (width === 0 || !mountRef.current) return

    const plot = new uPlot(
      {
        width,
        height,
        padding: [8, 4, 8, 4],
        cursor: { x: false, y: false },
        scales: {
          x: { time: true },
          y: { auto: true },
        },
        axes: [
          {
            grid: { stroke: CHART_COLORS[theme].grid },
            stroke: CHART_COLORS[theme].text,
          },
          {
            show: false,
          },
        ],
        series: series.map((s) => ({ paths: spline, ...s })),
      },
      data,
      mountRef.current,
    )

    return () => plot.destroy()
  }, [series, data, width, height, theme])

  return (
    <ChartContainer>
      <div ref={containerRef} role="img" aria-label={ariaLabel} style={{ width: '100%' }}>
        <div ref={mountRef} />
      </div>
    </ChartContainer>
  )
}

const ChartContainer = styled('div')`
  width: 100%;

  .u-legend {
    font-size: 0.75rem;
  }

  .u-legend tr:first-child {
    display: none;
  }
`
