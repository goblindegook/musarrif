import { cleanup, fireEvent, render, screen } from '@testing-library/preact'
import type { ComponentChildren } from 'preact'
import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import type { DayStats } from '../exercises/stats'
import { I18nProvider } from '../hooks/i18n'
import { RoutingProvider } from '../hooks/routing'
import { ExerciseStats } from './ExerciseStats'

vi.mock('uplot', () => {
  return {
    default: class UPlotMock {
      constructor(opts: { series?: Array<{ label?: string }> }, _data: unknown, mount: HTMLElement) {
        const root = document.createElement('div')
        root.className = 'uplot'
        // Simulate uPlot's built-in legend: render label text for each data series
        for (const s of opts.series ?? []) {
          if (s.label) {
            const cell = document.createElement('th')
            cell.textContent = s.label
            root.append(cell)
          }
        }
        mount.append(root)
      }
      destroy() {}
    },
  }
})

beforeAll(() => {
  vi.stubGlobal(
    'ResizeObserver',
    class ResizeObserver {
      private callback: ResizeObserverCallback
      constructor(callback: ResizeObserverCallback) {
        this.callback = callback
      }
      observe(_el: Element) {
        this.callback([{ contentRect: { width: 400 } } as ResizeObserverEntry], this as unknown as ResizeObserver)
      }
      unobserve() {}
      disconnect() {}
    },
  )
})

afterAll(() => {
  vi.unstubAllGlobals()
})

afterEach(() => {
  cleanup()
})

function Wrapper({ children }: { children: ComponentChildren }) {
  return (
    <RoutingProvider>
      <I18nProvider>{children}</I18nProvider>
    </RoutingProvider>
  )
}

describe('ExerciseStats', () => {
  test('is collapsed by default', () => {
    render(<ExerciseStats stats={[]} streak={0} />, { wrapper: Wrapper })
    expect(screen.queryByRole('img', { name: /statistics chart/i })).not.toBeInTheDocument()
  })

  test('has a toggle button labelled Statistics', () => {
    render(<ExerciseStats stats={[]} streak={0} />, { wrapper: Wrapper })
    expect(screen.getByRole('button', { name: /statistics/i })).toBeInTheDocument()
  })

  test('expands when toggle is clicked', () => {
    render(<ExerciseStats stats={[]} streak={0} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /statistics/i }))
    expect(screen.getByRole('img', { name: /statistics chart/i })).toBeInTheDocument()
  })

  test('collapses again when toggle is clicked twice', () => {
    render(<ExerciseStats stats={[]} streak={0} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /statistics/i }))
    fireEvent.click(screen.getByRole('button', { name: /statistics/i }))
    expect(screen.queryByRole('img', { name: /statistics chart/i })).not.toBeInTheDocument()
  })

  test('score pill shows Score label when expanded', () => {
    render(<ExerciseStats stats={[]} streak={0} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /statistics/i }))
    expect(screen.getByText('Score')).toBeInTheDocument()
  })

  test('score pill shows 0% when no data', () => {
    render(<ExerciseStats stats={[]} streak={0} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /statistics/i }))
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  test('score pill shows correct percentage', () => {
    const stats: DayStats[] = [{ date: new Date('2026-03-19'), correct: 3, incorrect: 1 }]
    render(<ExerciseStats stats={stats} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /statistics/i }))
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  test('streak pill shows Streak label when expanded', () => {
    render(<ExerciseStats stats={[]} streak={5} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /statistics/i }))
    expect(screen.getByText('Streak')).toBeInTheDocument()
  })

  test('streak pill shows count and unit when expanded', () => {
    render(<ExerciseStats stats={[]} streak={5} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /statistics/i }))
    expect(screen.getByText('5 days')).toBeInTheDocument()
  })

  test('streak pill shows 0 days when expanded with no data', () => {
    render(<ExerciseStats stats={[]} streak={0} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /statistics/i }))
    expect(screen.getByText('0 days')).toBeInTheDocument()
  })

  test('uPlot legend shows Date label when expanded', () => {
    const stats: DayStats[] = [{ date: new Date('2026-03-19'), correct: 3, incorrect: 1 }]
    render(<ExerciseStats stats={stats} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /statistics/i }))
    expect(screen.getAllByText(/date/i).length).toBeGreaterThan(0)
  })

  test('uPlot legend shows Correct and Incorrect labels when expanded', () => {
    const stats: DayStats[] = [{ date: new Date('2026-03-19'), correct: 3, incorrect: 1 }]
    render(<ExerciseStats stats={stats} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /statistics/i }))
    expect(screen.getAllByText(/correct/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/incorrect/i).length).toBeGreaterThan(0)
  })

  test('chart is accessible with aria-label and rendered by uPlot', () => {
    const stats: DayStats[] = [{ date: new Date('2026-03-19'), correct: 2, incorrect: 1 }]
    const { container } = render(<ExerciseStats stats={stats} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /statistics/i }))
    expect(screen.getByRole('img', { name: /statistics chart/i })).toBeInTheDocument()
    expect(container.querySelector('.uplot')).toBeInTheDocument()
  })

  test('chart container spans full width', () => {
    render(<ExerciseStats stats={[]} streak={0} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /statistics/i }))
    const chart = screen.getByRole('img', { name: /statistics chart/i })
    expect(chart.style.width).toBe('100%')
  })
})
