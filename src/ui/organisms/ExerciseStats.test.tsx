import { cleanup, fireEvent, render, screen, within } from '@testing-library/preact'
import type { ComponentChildren } from 'preact'
import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import { cardSpace, isNominalCard, isVerbCard, type SrsCardIdentity, type SrsStore } from '../../exercises/srs'
import type { DailyActivity } from '../../exercises/stats'
import { I18nProvider } from '../hooks/useI18n'
import { RoutingProvider } from '../routes'
import { ExerciseStats } from './ExerciseStats'

const NOW = new Date()
const TODAY = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate())
const SAMPLE_STATS: DailyActivity[] = [{ date: TODAY, correct: 4, incorrect: 1, passed: 0 }]
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

function createSrsStore(intervalForCard: (card: SrsCardIdentity) => number, dueDate = '2999-01-01'): SrsStore {
  const store: SrsStore = {}
  for (const card of cardSpace()) {
    store[card.key] = {
      interval: intervalForCard(card),
      ef: 2.5,
      repetitions: 3,
      dueDate,
    }
  }
  return store
}

describe('ExerciseStats', () => {
  test('renders nothing when stats is empty', () => {
    render(<ExerciseStats stats={[]} streak={0} />, { wrapper: Wrapper })
    expect(screen.queryByText('Progress')).not.toBeInTheDocument()
  })

  test('is collapsed by default', () => {
    render(<ExerciseStats stats={SAMPLE_STATS} streak={1} />, { wrapper: Wrapper })
    expect(screen.getByText('Progress').parentElement!.getAttribute('aria-expanded')).toBe('false')
  })

  test('has a toggle button labelled Progress', () => {
    render(<ExerciseStats stats={SAMPLE_STATS} streak={1} />, { wrapper: Wrapper })
    expect(screen.getByText('Progress')).toBeInTheDocument()
  })

  test('shows streak hint in the collapsed Progress header', () => {
    render(<ExerciseStats stats={SAMPLE_STATS} streak={1} />, { wrapper: Wrapper })
    expect(within(screen.getByText('Progress').parentElement!).getByText('6 to extend your streak')).toBeInTheDocument()
  })

  test('expands when toggle is clicked', () => {
    render(<ExerciseStats stats={SAMPLE_STATS} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByLabelText(/Last 7 days:/)).toBeVisible()
  })

  test('collapses again when toggle is clicked twice', () => {
    render(<ExerciseStats stats={SAMPLE_STATS} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Progress'))
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText('Progress').parentElement!.getAttribute('aria-expanded')).toBe('false')
  })

  test('accuracy pill shows Accuracy label when expanded', () => {
    render(<ExerciseStats stats={SAMPLE_STATS} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText('Accuracy')).toBeInTheDocument()
  })

  test('accuracy pill shows 0% when all answers are incorrect', () => {
    render(<ExerciseStats stats={[{ date: TODAY, correct: 0, incorrect: 1, passed: 0 }]} streak={0} />, {
      wrapper: Wrapper,
    })
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  test('accuracy pill shows correct percentage', () => {
    const recentDate = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    recentDate.setUTCHours(0, 0, 0, 0)
    const stats: DailyActivity[] = [{ date: recentDate, correct: 3, incorrect: 1, passed: 0 }]
    render(<ExerciseStats stats={stats} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  test('accuracy pill shows 15-day percentage, not all-time, when they differ', () => {
    const oldDate = new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
    oldDate.setUTCHours(0, 0, 0, 0)
    const recentDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    recentDate.setUTCHours(0, 0, 0, 0)
    const stats: DailyActivity[] = [
      { date: oldDate, correct: 0, incorrect: 10, passed: 0 },
      { date: recentDate, correct: 4, incorrect: 0, passed: 0 },
    ]
    render(<ExerciseStats stats={stats} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  test('accuracy pill shows All time sub-note', () => {
    const recentDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    recentDate.setUTCHours(0, 0, 0, 0)
    const stats: DailyActivity[] = [{ date: recentDate, correct: 3, incorrect: 1, passed: 0 }]
    render(<ExerciseStats stats={stats} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText(/All time:/)).toBeInTheDocument()
  })

  test('streak pill shows Record sub-note', () => {
    const stats: DailyActivity[] = [
      { date: new Date('2026-03-18'), correct: 2, incorrect: 0, passed: 0 },
      { date: new Date('2026-03-19'), correct: 1, incorrect: 0, passed: 0 },
    ]
    render(<ExerciseStats stats={stats} streak={2} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText(/Record:/)).toBeInTheDocument()
  })

  test('streak pill shows Streak label when expanded', () => {
    render(<ExerciseStats stats={SAMPLE_STATS} streak={5} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText('Streak')).toBeInTheDocument()
  })

  test('streak pill shows count and unit when expanded', () => {
    render(<ExerciseStats stats={SAMPLE_STATS} streak={5} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText('5 days')).toBeInTheDocument()
  })

  test('streak pill shows 0 days when streak is zero', () => {
    render(<ExerciseStats stats={SAMPLE_STATS} streak={0} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText('0 days')).toBeInTheDocument()
  })

  test('uPlot legend shows Date label when expanded', () => {
    const stats: DailyActivity[] = [{ date: new Date('2026-03-19'), correct: 3, incorrect: 1, passed: 0 }]
    render(<ExerciseStats stats={stats} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getAllByText(/date/i).length).toBeGreaterThan(0)
  })

  test('uPlot legend shows Correct and Incorrect labels when expanded', () => {
    const stats: DailyActivity[] = [{ date: new Date('2026-03-19'), correct: 3, incorrect: 1, passed: 0 }]
    render(<ExerciseStats stats={stats} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getAllByText(/correct/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/incorrect/i).length).toBeGreaterThan(0)
  })

  test('chart is accessible with aria-label and rendered by uPlot', () => {
    const stats: DailyActivity[] = [{ date: new Date('2026-03-19'), correct: 2, incorrect: 1, passed: 0 }]
    const { container } = render(<ExerciseStats stats={stats} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(container.querySelector('.uplot')).toBeInTheDocument()
  })

  test('chart aria-label describes series trends and totals', () => {
    const sixDaysAgo = new Date(TODAY.getTime() - 6 * 24 * 60 * 60 * 1000)
    const stats: DailyActivity[] = [
      { date: sixDaysAgo, correct: 1, incorrect: 3, passed: 0 },
      { date: TODAY, correct: 4, incorrect: 1, passed: 2 },
    ]
    render(<ExerciseStats stats={stats} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Progress'))

    const ariaLabel = screen.getByRole('img').getAttribute('aria-label')
    expect(ariaLabel).toContain('Last 7 days')
    expect(ariaLabel).toContain('Correct 5 (up)')
    expect(ariaLabel).toContain('Incorrect 4 (down)')
    expect(ariaLabel).toContain('Skipped 2 (up)')
  })

  test('chart renders Skipped series label when expanded', () => {
    const stats: DailyActivity[] = [{ date: new Date('2026-03-19'), correct: 2, incorrect: 1, passed: 3 }]
    render(<ExerciseStats stats={stats} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getAllByText(/skipped/i).length).toBeGreaterThan(0)
  })

  test('shows streak-extension progress when daily goal is not met', () => {
    const stats: DailyActivity[] = [{ date: TODAY, correct: 4, incorrect: 1, passed: 0 }]
    render(<ExerciseStats stats={stats} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByLabelText('Streak extension progress')).toBeInTheDocument()
  })

  test('shows Almost there in the collapsed header when one correct answer is left', () => {
    const stats: DailyActivity[] = [{ date: TODAY, correct: 9, incorrect: 1, passed: 0 }]
    render(<ExerciseStats stats={stats} streak={2} />, { wrapper: Wrapper })
    expect(within(screen.getByText('Progress').parentElement!).getByText('Almost there...')).toBeInTheDocument()
  })

  test('shows Well done in the collapsed header when streak is newly extended today', () => {
    const stats: DailyActivity[] = [{ date: TODAY, correct: 10, incorrect: 0, passed: 0 }]
    render(<ExerciseStats stats={stats} streak={2} />, { wrapper: Wrapper })
    expect(within(screen.getByText('Progress').parentElement!).getByText('Well done!')).toBeInTheDocument()
  })

  test('shows encouragement in the collapsed header when more than half of attempts are incorrect', () => {
    const stats: DailyActivity[] = [{ date: TODAY, correct: 12, incorrect: 13, passed: 0 }]
    render(<ExerciseStats stats={stats} streak={2} />, { wrapper: Wrapper })
    expect(
      within(screen.getByText('Progress').parentElement!).getByText('You can do this, stay focused'),
    ).toBeInTheDocument()
  })

  test('shows skipping notice in the collapsed header when pass count is high', () => {
    const stats: DailyActivity[] = [{ date: TODAY, correct: 12, incorrect: 1, passed: 15 }]
    render(<ExerciseStats stats={stats} streak={2} />, { wrapper: Wrapper })
    expect(
      within(screen.getByText('Progress').parentElement!).getByText('You are skipping many cards'),
    ).toBeInTheDocument()
  })

  test('shows strong-accuracy congratulations in the collapsed header', () => {
    const stats: DailyActivity[] = [{ date: TODAY, correct: 15, incorrect: 1, passed: 0 }]
    render(<ExerciseStats stats={stats} streak={2} />, { wrapper: Wrapper })
    expect(
      within(screen.getByText('Progress').parentElement!).getByText('Excellent accuracy today'),
    ).toBeInTheDocument()
  })

  test('shows strongest-dimension hint in the collapsed header with real SRS data', () => {
    const stats: DailyActivity[] = [{ date: TODAY, correct: 13, incorrect: 2, passed: 1 }]
    const srsStore = createSrsStore((card) => (isVerbCard(card) ? 120 : 1))
    render(
      <Wrapper>
        <ExerciseStats
          stats={stats}
          streak={2}
          dimensionProfile={{
            tenses: 4,
            pronouns: 3,
            diacritics: 0,
            forms: 9,
            rootTypes: 5,
            nominals: 2,
          }}
          srsStore={srsStore}
        />
      </Wrapper>,
    )
    expect(within(screen.getByText('Progress').parentElement!).getByText(/Strong in /)).toBeInTheDocument()
  })

  test('shows weakest-dimension hint in the collapsed header with real SRS data', () => {
    const stats: DailyActivity[] = [{ date: TODAY, correct: 13, incorrect: 2, passed: 1 }]
    const srsStore = createSrsStore((card) => (isNominalCard(card) ? 1 : 10))
    render(
      <Wrapper>
        <ExerciseStats
          stats={stats}
          streak={2}
          dimensionProfile={{
            tenses: 4,
            pronouns: 3,
            diacritics: 0,
            forms: 9,
            rootTypes: 5,
            nominals: 2,
          }}
          srsStore={srsStore}
        />
      </Wrapper>,
    )
    expect(within(screen.getByText('Progress').parentElement!).getByText(/Focus a bit more on /)).toBeInTheDocument()
  })

  test("shows yesterday challenge when today's correct total is below yesterday", () => {
    const yesterday = new Date(TODAY)
    yesterday.setDate(yesterday.getDate() - 1)
    const stats: DailyActivity[] = [
      { date: yesterday, correct: 18, incorrect: 2, passed: 0 },
      { date: TODAY, correct: 12, incorrect: 4, passed: 0 },
    ]
    render(<ExerciseStats stats={stats} streak={2} />, { wrapper: Wrapper })
    expect(
      within(screen.getByText('Progress').parentElement!).getByText("Can you beat yesterday's total of 18?"),
    ).toBeInTheDocument()
  })

  test("shows remaining-to-yesterday hint when today's correct total is within 5", () => {
    const yesterday = new Date(TODAY)
    yesterday.setDate(yesterday.getDate() - 1)
    const stats: DailyActivity[] = [
      { date: yesterday, correct: 16, incorrect: 2, passed: 0 },
      { date: TODAY, correct: 13, incorrect: 4, passed: 0 },
    ]
    render(<ExerciseStats stats={stats} streak={2} />, { wrapper: Wrapper })
    expect(within(screen.getByText('Progress').parentElement!).getByText('Only 3 more to go...')).toBeInTheDocument()
  })

  test("congratulates when today's correct total reaches yesterday", () => {
    const yesterday = new Date(TODAY)
    yesterday.setDate(yesterday.getDate() - 1)
    const stats: DailyActivity[] = [
      { date: yesterday, correct: 14, incorrect: 2, passed: 0 },
      { date: TODAY, correct: 14, incorrect: 4, passed: 0 },
    ]
    render(<ExerciseStats stats={stats} streak={2} />, { wrapper: Wrapper })
    expect(
      within(screen.getByText('Progress').parentElement!).getByText('Great job, you matched yesterday!'),
    ).toBeInTheDocument()
  })

  test("congratulates more when today's correct total exceeds yesterday by up to 5", () => {
    const yesterday = new Date(TODAY)
    yesterday.setDate(yesterday.getDate() - 1)
    const stats: DailyActivity[] = [
      { date: yesterday, correct: 14, incorrect: 2, passed: 0 },
      { date: TODAY, correct: 17, incorrect: 4, passed: 0 },
    ]
    render(<ExerciseStats stats={stats} streak={2} />, { wrapper: Wrapper })
    expect(
      within(screen.getByText('Progress').parentElement!).getByText('Excellent, you are ahead of yesterday!'),
    ).toBeInTheDocument()
  })

  test('shows Mastery section when expanded', () => {
    render(<ExerciseStats stats={SAMPLE_STATS} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText('Mastery')).toBeInTheDocument()
  })

  test('shows locked indicator in the category label', () => {
    render(<ExerciseStats stats={SAMPLE_STATS} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Progress'))
    const nominalsButton = screen.getByText('Nominals').closest('summary') as HTMLButtonElement
    expect(within(nominalsButton).getAllByText('Locked')).toHaveLength(1)
  })

  test('shows item breakdown', () => {
    render(<ExerciseStats stats={SAMPLE_STATS} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText('Sound')).toBeInTheDocument()
  })

  test('exposes accessible semantics for mastery category progress bars', () => {
    const { container } = render(<ExerciseStats stats={SAMPLE_STATS} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Progress'))

    const categoryProgressbar = container.querySelector('[aria-label="Tenses"]')
    expect(categoryProgressbar?.getAttribute('role')).toBe('progressbar')
    expect(categoryProgressbar?.getAttribute('aria-valuemin')).toBe('0')
    expect(categoryProgressbar?.getAttribute('aria-valuemax')).toBe('1')
    expect(categoryProgressbar?.getAttribute('aria-valuenow')).not.toBeNull()
  })

  test('exposes accessible semantics for mastery item progress bars', () => {
    const { container } = render(<ExerciseStats stats={SAMPLE_STATS} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Progress'))

    const itemProgressbar = container.querySelector('[aria-label="Sound"]')
    expect(itemProgressbar?.getAttribute('role')).toBe('progressbar')
    expect(itemProgressbar?.getAttribute('aria-valuemin')).toBe('0')
    expect(itemProgressbar?.getAttribute('aria-valuemax')).toBe('1')
    expect(itemProgressbar?.getAttribute('aria-valuenow')).not.toBeNull()
  })

  test('keeps today values in the last chart slot when local day differs from UTC', () => {
    vi.useFakeTimers()
    vi.stubEnv('TZ', 'America/Los_Angeles')
    vi.setSystemTime(new Date('2026-03-19T23:30:00-07:00'))
    const stats: DailyActivity[] = [{ date: new Date(2026, 2, 19), correct: 4, incorrect: 1, passed: 0 }]

    render(<ExerciseStats stats={stats} streak={1} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Progress'))

    expect(lastPlotData?.[1]).toEqual([0, 0, 0, 0, 0, 0, 4])
  })
})
