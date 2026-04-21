import { cleanup, fireEvent, render, screen, within } from '@testing-library/preact'
import type { ComponentChildren } from 'preact'
import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import type { DayStats } from '../../exercises/stats'
import { I18nProvider } from '../../hooks/i18n'
import { RoutingProvider } from '../../hooks/routing'
import { ExerciseStats } from './ExerciseStats'

const NOW = new Date()
const TODAY = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate())
const SAMPLE_STATS: DayStats[] = [{ date: TODAY, correct: 4, incorrect: 1, passed: 0 }]
let lastPlotData: unknown[] | null = null

vi.mock('uplot', () => {
  return {
    default: class UPlotMock {
      constructor(opts: { series?: Array<{ label?: string }> }, data: unknown, mount: HTMLElement) {
        lastPlotData = data as unknown[]
        const root = document.createElement('div')
        root.className = 'uplot'
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
  vi.useRealTimers()
  vi.unstubAllEnvs()
  lastPlotData = null
})

function Wrapper({ children }: { children: ComponentChildren }) {
  return (
    <RoutingProvider>
      <I18nProvider>{children}</I18nProvider>
    </RoutingProvider>
  )
}

describe('ExerciseStats', () => {
  test('renders nothing when stats is empty', () => {
    render(<ExerciseStats stats={[]} streak={0} />, { wrapper: Wrapper })
    expect(screen.queryByRole('button', { name: /progress/i })).not.toBeInTheDocument()
  })

  test('is collapsed by default', () => {
    render(<ExerciseStats stats={SAMPLE_STATS} streak={1} />, { wrapper: Wrapper })
    expect(screen.queryByRole('img', { name: /statistics chart/i })).not.toBeInTheDocument()
  })

  test('has a toggle button labelled Progress', () => {
    render(<ExerciseStats stats={SAMPLE_STATS} streak={1} />, { wrapper: Wrapper })
    expect(screen.getByRole('button', { name: /progress/i })).toBeInTheDocument()
  })

  test('expands when toggle is clicked', () => {
    render(<ExerciseStats stats={SAMPLE_STATS} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /progress/i }))
    expect(screen.getByRole('img', { name: /statistics chart/i })).toBeInTheDocument()
  })

  test('collapses again when toggle is clicked twice', () => {
    render(<ExerciseStats stats={SAMPLE_STATS} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /progress/i }))
    fireEvent.click(screen.getByRole('button', { name: /progress/i }))
    expect(screen.queryByRole('img', { name: /statistics chart/i })).not.toBeInTheDocument()
  })

  test('score pill shows Score label when expanded', () => {
    render(<ExerciseStats stats={SAMPLE_STATS} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /progress/i }))
    expect(screen.getByText('Score')).toBeInTheDocument()
  })

  test('score pill shows 0% when all answers are incorrect', () => {
    render(<ExerciseStats stats={[{ date: TODAY, correct: 0, incorrect: 1, passed: 0 }]} streak={0} />, {
      wrapper: Wrapper,
    })
    fireEvent.click(screen.getByRole('button', { name: /progress/i }))
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  test('score pill shows correct percentage', () => {
    const recentDate = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    recentDate.setUTCHours(0, 0, 0, 0)
    const stats: DayStats[] = [{ date: recentDate, correct: 3, incorrect: 1, passed: 0 }]
    render(<ExerciseStats stats={stats} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /progress/i }))
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  test('score pill shows 15-day percentage, not all-time, when they differ', () => {
    const oldDate = new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
    oldDate.setUTCHours(0, 0, 0, 0)
    const recentDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    recentDate.setUTCHours(0, 0, 0, 0)
    const stats: DayStats[] = [
      { date: oldDate, correct: 0, incorrect: 10, passed: 0 },
      { date: recentDate, correct: 4, incorrect: 0, passed: 0 },
    ]
    render(<ExerciseStats stats={stats} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /progress/i }))
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  test('score pill shows All time sub-note', () => {
    const recentDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    recentDate.setUTCHours(0, 0, 0, 0)
    const stats: DayStats[] = [{ date: recentDate, correct: 3, incorrect: 1, passed: 0 }]
    render(<ExerciseStats stats={stats} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /progress/i }))
    expect(screen.getByText(/All time:/)).toBeInTheDocument()
  })

  test('streak pill shows Record sub-note', () => {
    const stats: DayStats[] = [
      { date: new Date('2026-03-18'), correct: 2, incorrect: 0, passed: 0 },
      { date: new Date('2026-03-19'), correct: 1, incorrect: 0, passed: 0 },
    ]
    render(<ExerciseStats stats={stats} streak={2} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /progress/i }))
    expect(screen.getByText(/Record:/)).toBeInTheDocument()
  })

  test('streak pill shows Streak label when expanded', () => {
    render(<ExerciseStats stats={SAMPLE_STATS} streak={5} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /progress/i }))
    expect(screen.getByText('Streak')).toBeInTheDocument()
  })

  test('streak pill shows count and unit when expanded', () => {
    render(<ExerciseStats stats={SAMPLE_STATS} streak={5} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /progress/i }))
    expect(screen.getByText('5 days')).toBeInTheDocument()
  })

  test('streak pill shows 0 days when streak is zero', () => {
    render(<ExerciseStats stats={SAMPLE_STATS} streak={0} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /progress/i }))
    expect(screen.getByText('0 days')).toBeInTheDocument()
  })

  test('uPlot legend shows Date label when expanded', () => {
    const stats: DayStats[] = [{ date: new Date('2026-03-19'), correct: 3, incorrect: 1, passed: 0 }]
    render(<ExerciseStats stats={stats} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /progress/i }))
    expect(screen.getAllByText(/date/i).length).toBeGreaterThan(0)
  })

  test('uPlot legend shows Correct and Incorrect labels when expanded', () => {
    const stats: DayStats[] = [{ date: new Date('2026-03-19'), correct: 3, incorrect: 1, passed: 0 }]
    render(<ExerciseStats stats={stats} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /progress/i }))
    expect(screen.getAllByText(/correct/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/incorrect/i).length).toBeGreaterThan(0)
  })

  test('chart is accessible with aria-label and rendered by uPlot', () => {
    const stats: DayStats[] = [{ date: new Date('2026-03-19'), correct: 2, incorrect: 1, passed: 0 }]
    const { container } = render(<ExerciseStats stats={stats} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /progress/i }))
    expect(screen.getByRole('img', { name: /statistics chart/i })).toBeInTheDocument()
    expect(container.querySelector('.uplot')).toBeInTheDocument()
  })

  test('chart renders Skipped series label when expanded', () => {
    const stats: DayStats[] = [{ date: new Date('2026-03-19'), correct: 2, incorrect: 1, passed: 3 }]
    render(<ExerciseStats stats={stats} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /progress/i }))
    expect(screen.getAllByText(/skipped/i).length).toBeGreaterThan(0)
  })

  test('shows streak-extension progress and hint when daily goal is not met', () => {
    const stats: DayStats[] = [{ date: TODAY, correct: 4, incorrect: 1, passed: 0 }]
    render(<ExerciseStats stats={stats} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /progress/i }))
    expect(screen.getByText('Answer 6 correctly to extend your streak.')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  test('hides streak-extension progress when daily goal is met', () => {
    const stats: DayStats[] = [{ date: TODAY, correct: 10, incorrect: 0, passed: 0 }]
    render(<ExerciseStats stats={stats} streak={2} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /progress/i }))
    expect(screen.queryByText(/to extend your streak/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  })

  test('shows Mastery section when expanded', () => {
    render(<ExerciseStats stats={SAMPLE_STATS} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /progress/i }))
    expect(screen.getByText('Mastery')).toBeInTheDocument()
  })

  test('shows locked indicator in the category label', () => {
    render(<ExerciseStats stats={SAMPLE_STATS} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /progress/i }))
    expect(within(screen.getByTestId('mastery-category-label-nominals')).getByText('Locked')).toBeInTheDocument()
    expect(within(screen.getByTestId('mastery-category-row-nominals')).queryByText('Locked')).not.toBeInTheDocument()
  })

  test('expands and collapses a mastery category to show item breakdown', () => {
    render(<ExerciseStats stats={SAMPLE_STATS} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /progress/i }))
    const rootTypesCategory = screen.getByRole('button', { name: /root types/i })

    fireEvent.click(rootTypesCategory)
    expect(screen.getByText('Sound')).toBeInTheDocument()

    fireEvent.click(rootTypesCategory)
    expect(screen.queryByText('Sound')).not.toBeInTheDocument()
  })

  test('keeps today values in the last chart slot when local day differs from UTC', () => {
    vi.useFakeTimers()
    vi.stubEnv('TZ', 'America/Los_Angeles')
    vi.setSystemTime(new Date('2026-03-19T23:30:00-07:00'))
    const stats: DayStats[] = [{ date: new Date(2026, 2, 19), correct: 4, incorrect: 1, passed: 0 }]

    render(<ExerciseStats stats={stats} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Progress'))

    expect(lastPlotData?.[1]).toEqual([0, 0, 0, 0, 0, 0, 4])
  })
})
