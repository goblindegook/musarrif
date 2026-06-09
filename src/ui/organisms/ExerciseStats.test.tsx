import { cleanup, fireEvent, screen, within } from '@testing-library/preact'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import {
  buildCardKey,
  cardSpace,
  isNominalCard,
  isVerbCard,
  type SrsCardIdentity,
  type SrsStore,
} from '../../exercises/srs'
import type { DailyActivity } from '../../exercises/stats'
import { renderWithProviders } from '../../test/fixtures'
import { serializeDayStats } from '../hooks/useStats'
import { ExerciseStats } from './ExerciseStats'

const TODAY = new Date('2026-04-15')
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

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(TODAY)
})

afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.unstubAllEnvs()
  localStorage.removeItem('conjugator:exercise:daily')
  localStorage.removeItem('conjugator:srs')
  lastPlotData = null
})

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

function renderStats(
  stats: readonly DailyActivity[] = SAMPLE_STATS,
  props?: Pick<Parameters<typeof ExerciseStats>[0], 'dimensionProfile' | 'srsStore'>,
) {
  localStorage.setItem('conjugator:exercise:daily', JSON.stringify(serializeDayStats(stats)))
  return renderWithProviders(<ExerciseStats {...props} />)
}

describe('ExerciseStats', () => {
  test('renders nothing when stats is empty', () => {
    renderStats([])
    expect(screen.queryByText('Progress')).not.toBeInTheDocument()
  })

  test('is collapsed by default', () => {
    renderStats()
    expect(screen.getByText('Progress').parentElement).toHaveAttribute('aria-expanded', 'false')
  })

  test('has a toggle button labelled Progress', () => {
    renderStats()
    expect(screen.getByText('Progress')).toBeInTheDocument()
  })

  test('shows streak hint in the collapsed Progress header', () => {
    renderStats()
    expect(within(screen.getByText('Progress').parentElement!).getByText('6 for streak')).toBeInTheDocument()
  })

  test('expands when toggle is clicked', () => {
    renderStats()
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByLabelText(/Last 7 days:/)).toBeVisible()
  })

  test('collapses again when toggle is clicked twice', () => {
    renderStats()
    fireEvent.click(screen.getByText('Progress'))
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText('Progress').parentElement).toHaveAttribute('aria-expanded', 'false')
  })

  test('accuracy pill shows Accuracy label when expanded', () => {
    renderStats()
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText('Accuracy')).toBeInTheDocument()
  })

  test('accuracy pill shows 0% when all answers are incorrect', () => {
    renderStats([{ date: TODAY, correct: 0, incorrect: 1, passed: 0 }])
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  test('accuracy pill shows correct percentage', () => {
    const stats: DailyActivity[] = [{ date: new Date('2026-04-10'), correct: 3, incorrect: 1, passed: 0 }]
    renderStats(stats)
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  test('accuracy pill shows 15-day percentage, not all-time, when they differ', () => {
    const stats: DailyActivity[] = [
      { date: new Date('2026-03-26'), correct: 0, incorrect: 10, passed: 0 },
      { date: new Date('2026-04-12'), correct: 4, incorrect: 0, passed: 0 },
    ]
    renderStats(stats)
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  test('accuracy pill shows All time sub-note', () => {
    const stats: DailyActivity[] = [{ date: new Date('2026-04-12'), correct: 3, incorrect: 1, passed: 0 }]
    renderStats(stats)
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText(/All time:/)).toBeInTheDocument()
  })

  test('streak pill shows Record sub-note', () => {
    const stats: DailyActivity[] = [
      { date: new Date('2026-03-18'), correct: 2, incorrect: 0, passed: 0 },
      { date: new Date('2026-03-19'), correct: 1, incorrect: 0, passed: 0 },
    ]
    renderStats(stats)
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText(/Record:/)).toBeInTheDocument()
  })

  test('streak pill shows Streak label when expanded', () => {
    renderStats()
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText('Streak')).toBeInTheDocument()
  })

  test('streak pill shows count and unit when expanded', () => {
    const yesterday = new Date(TODAY)
    yesterday.setDate(yesterday.getDate() - 1)
    const twoDaysAgo = new Date(TODAY)
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
    const threeDaysAgo = new Date(TODAY)
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
    const fourDaysAgo = new Date(TODAY)
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 4)
    const fiveDaysAgo = new Date(TODAY)
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5)
    const streakStats: DailyActivity[] = [
      { date: TODAY, correct: 10, incorrect: 0, passed: 0 },
      { date: yesterday, correct: 10, incorrect: 0, passed: 0 },
      { date: twoDaysAgo, correct: 10, incorrect: 0, passed: 0 },
      { date: threeDaysAgo, correct: 10, incorrect: 0, passed: 0 },
      { date: fourDaysAgo, correct: 10, incorrect: 0, passed: 0 },
    ]
    renderStats(streakStats)
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText('5 days')).toBeInTheDocument()
  })

  test('streak pill shows 0 days when streak is zero', () => {
    renderStats()
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText('0 days')).toBeInTheDocument()
  })

  test('uPlot legend shows Date label when expanded', () => {
    const stats: DailyActivity[] = [{ date: new Date('2026-03-19'), correct: 3, incorrect: 1, passed: 0 }]
    renderStats(stats)
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getAllByText(/date/i).length).toBeGreaterThan(0)
  })

  test('uPlot legend shows Correct and Incorrect labels when expanded', () => {
    const stats: DailyActivity[] = [{ date: new Date('2026-03-19'), correct: 3, incorrect: 1, passed: 0 }]
    renderStats(stats)
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getAllByText(/correct/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/incorrect/i).length).toBeGreaterThan(0)
  })

  test('chart is accessible with aria-label and rendered by uPlot', () => {
    const { container } = renderStats()
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
    renderStats(stats)
    fireEvent.click(screen.getByText('Progress'))

    const ariaLabel = screen.getByRole('img').getAttribute('aria-label')
    expect(ariaLabel).toContain('Last 7 days')
    expect(ariaLabel).toContain('Correct 5 (up)')
    expect(ariaLabel).toContain('Incorrect 4 (down)')
    expect(ariaLabel).toContain('Skipped 2 (up)')
  })

  test('chart renders Skipped series label when expanded', () => {
    const stats: DailyActivity[] = [{ date: new Date('2026-03-19'), correct: 2, incorrect: 1, passed: 3 }]
    renderStats(stats)
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getAllByText(/skipped/i).length).toBeGreaterThan(0)
  })

  test('shows streak-extension progress when daily goal is not met', () => {
    const stats: DailyActivity[] = [{ date: TODAY, correct: 4, incorrect: 1, passed: 0 }]
    renderStats(stats)
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByLabelText('Streak extension progress')).toBeInTheDocument()
  })

  describe('progress hint', () => {
    test('shows Almost there in the collapsed header when one correct answer is left', () => {
      const stats: DailyActivity[] = [{ date: TODAY, correct: 9, incorrect: 1, passed: 0 }]
      renderStats(stats)
      expect(within(screen.getByText('Progress').parentElement!).getByText('Almost there...')).toBeInTheDocument()
    })

    test('shows Well done in the collapsed header when streak is newly extended today', () => {
      const stats: DailyActivity[] = [{ date: TODAY, correct: 10, incorrect: 0, passed: 0 }]
      renderStats(stats)
      expect(within(screen.getByText('Progress').parentElement!).getByText('Well done!')).toBeInTheDocument()
    })

    test('shows encouragement in the collapsed header when more than half of attempts are incorrect', () => {
      const stats: DailyActivity[] = [{ date: TODAY, correct: 11, incorrect: 23, passed: 0 }]
      renderStats(stats)
      expect(within(screen.getByText('Progress').parentElement!).getByText('Stay focused')).toBeInTheDocument()
    })

    test('shows skipping notice in the collapsed header when skip count is high', () => {
      const stats: DailyActivity[] = [{ date: TODAY, correct: 11, incorrect: 1, passed: 20 }]
      renderStats(stats)
      expect(within(screen.getByText('Progress').parentElement!).getByText('Some cards skipped')).toBeInTheDocument()
    })

    test('shows strong-accuracy congratulations in the collapsed header', () => {
      const stats: DailyActivity[] = [{ date: TODAY, correct: 15, incorrect: 1, passed: 0 }]
      renderStats(stats)
      expect(within(screen.getByText('Progress').parentElement!).getByText('Great accuracy!')).toBeInTheDocument()
    })

    test('shows strongest-dimension hint in the collapsed header with real SRS data', () => {
      const stats: DailyActivity[] = [{ date: TODAY, correct: 11, incorrect: 2, passed: 1 }]
      const srsStore = createSrsStore((card) => (isVerbCard(card) ? 120 : 1))
      renderStats(stats, {
        dimensionProfile: {
          tenses: 4,
          pronouns: 3,
          diacritics: 0,
          forms: 9,
          rootTypes: 5,
          nominals: 2,
        },
        srsStore,
      })
      expect(within(screen.getByText('Progress').parentElement!).getByText('Strong in Active Past')).toBeInTheDocument()
    })

    test('shows weakest-dimension hint in the collapsed header with real SRS data', () => {
      const stats: DailyActivity[] = [{ date: TODAY, correct: 11, incorrect: 2, passed: 1 }]
      const srsStore = createSrsStore((card) => (isNominalCard(card) ? 1 : 10))
      renderStats(stats, {
        dimensionProfile: {
          tenses: 4,
          pronouns: 3,
          diacritics: 0,
          forms: 9,
          rootTypes: 5,
          nominals: 2,
        },
        srsStore,
      })

      expect(within(screen.getByText('Progress').parentElement!).getByText('Work on Participles')).toBeInTheDocument()
    })

    test("shows yesterday challenge when today's correct total is below yesterday", () => {
      const yesterday = new Date(TODAY)
      yesterday.setDate(yesterday.getDate() - 1)
      const stats: DailyActivity[] = [
        { date: yesterday, correct: 20, incorrect: 2, passed: 0 },
        { date: TODAY, correct: 11, incorrect: 4, passed: 0 },
      ]
      renderStats(stats)
      expect(within(screen.getByText('Progress').parentElement!).getByText("Beat yesterday's 20?")).toBeInTheDocument()
    })

    test("shows remaining-to-yesterday hint when today's correct total is within 5", () => {
      const yesterday = new Date(TODAY)
      yesterday.setDate(yesterday.getDate() - 1)
      const stats: DailyActivity[] = [
        { date: yesterday, correct: 20, incorrect: 2, passed: 0 },
        { date: TODAY, correct: 15, incorrect: 4, passed: 0 },
      ]
      renderStats(stats)
      expect(within(screen.getByText('Progress').parentElement!).getByText('5 more to go...')).toBeInTheDocument()
    })

    test("congratulates when today's correct total reaches yesterday", () => {
      const yesterday = new Date(TODAY)
      yesterday.setDate(yesterday.getDate() - 1)
      const stats: DailyActivity[] = [
        { date: yesterday, correct: 20, incorrect: 2, passed: 0 },
        { date: TODAY, correct: 20, incorrect: 4, passed: 0 },
      ]
      renderStats(stats)
      expect(within(screen.getByText('Progress').parentElement!).getByText('Matched yesterday!')).toBeInTheDocument()
    })

    test("congratulates more when today's correct total exceeds yesterday by up to 5", () => {
      const yesterday = new Date(TODAY)
      yesterday.setDate(yesterday.getDate() - 1)
      const stats: DailyActivity[] = [
        { date: yesterday, correct: 11, incorrect: 2, passed: 0 },
        { date: TODAY, correct: 12, incorrect: 4, passed: 0 },
      ]
      renderStats(stats)
      expect(within(screen.getByText('Progress').parentElement!).getByText('Ahead of yesterday!')).toBeInTheDocument()
    })
  })

  describe('learning insights — new sections', () => {
    test('shows momentum section with insufficient text when stats are minimal', () => {
      renderStats(SAMPLE_STATS)
      fireEvent.click(screen.getByText('Progress'))
      fireEvent.click(screen.getByText('See insights'))
      expect(screen.getByText(/^Your momentum:/)).toBeInTheDocument()
      expect(screen.getByText('Not enough history yet to assess your practice rhythm.')).toBeInTheDocument()
      expect(screen.queryByText(/^Your backlog:/)).not.toBeInTheDocument()
    })

    test('shows a separate backlog section after momentum when many cards are overdue', () => {
      const store: SrsStore = {}
      const stats = Array.from({ length: 14 }, (_, i) => ({
        date: new Date(2026, 3, 2 + i),
        correct: 6,
        incorrect: 1,
        passed: 0,
      }))
      for (let i = 0; i < 25; i++) {
        store[`conjugation:sound:1:active.past:3ms:${i}`] = {
          ef: 2.5,
          repetitions: 3,
          interval: 10,
          dueDate: '2026-04-01',
        }
      }
      localStorage.setItem('conjugator:srs', JSON.stringify(store))
      renderStats(stats)
      fireEvent.click(screen.getByText('Progress'))
      fireEvent.click(screen.getByText('See insights'))
      const momentum = screen.getByText(/^Your momentum:/)
      const backlog = screen.getByText(/^Your backlog:/)
      expect(momentum.parentElement?.textContent).toContain("You're maintaining a consistent practice rhythm.")
      expect(backlog.parentElement?.textContent).toContain('Many reviews are piling up.')
      expect(momentum.compareDocumentPosition(backlog) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0)
    })

    test('shows a recommendation section', () => {
      renderStats(SAMPLE_STATS)
      fireEvent.click(screen.getByText('Progress'))
      fireEvent.click(screen.getByText('See insights'))
      expect(screen.getByText(/^Recommendation:/)).toBeInTheDocument()
    })

    test('shows Difficult section when stuck cards exist', () => {
      const store: SrsStore = {
        [buildCardKey('conjugation', 'sound', 1, 'passive.past', '3ms')]: {
          ef: 1.3,
          repetitions: 5,
          interval: 1,
          dueDate: '2099-01-01',
        },
        [buildCardKey('conjugation', 'sound', 1, 'passive.past', '1s')]: {
          ef: 1.3,
          repetitions: 5,
          interval: 1,
          dueDate: '2099-01-01',
        },
        [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
          ef: 1.3,
          repetitions: 5,
          interval: 1,
          dueDate: '2099-01-01',
        },
      }
      localStorage.setItem('conjugator:srs', JSON.stringify(store))
      renderStats(SAMPLE_STATS)
      fireEvent.click(screen.getByText('Progress'))
      fireEvent.click(screen.getByText('See insights'))
      expect(screen.getByText(/Some paradigms are proving difficult/)).toBeInTheDocument()
    })

    test('shows Challenge section (not Difficult) when no stuck cards exist', () => {
      renderStats(SAMPLE_STATS)
      fireEvent.click(screen.getByText('Progress'))
      fireEvent.click(screen.getByText('See insights'))
      expect(screen.queryByText(/Some paradigms are proving difficult/)).not.toBeInTheDocument()
      expect(screen.getByText(/^Your current challenge:/)).toBeInTheDocument()
    })
  })

  test('shows Mastery section when expanded', () => {
    renderStats()
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText('Mastery')).toBeInTheDocument()
  })

  test('shows insights entry button when expanded', () => {
    renderStats()
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText('See insights')).toBeInTheDocument()
  })

  test('does not render learning insights modal before See insights is clicked', () => {
    renderStats()
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.queryByText(/^Your journey so far:/)).not.toBeInTheDocument()
  })

  test('opens learning insights modal from stats panel', () => {
    renderStats()
    fireEvent.click(screen.getByText('Progress'))
    fireEvent.click(screen.getByText('See insights'))
    expect(screen.getByText('Learning insights')).toBeInTheDocument()
    expect(screen.getByText(/^Your journey so far:/)).toBeInTheDocument()
    expect(screen.getByText(/^Your momentum:/)).toBeInTheDocument()
    expect(screen.queryByText(/^Your backlog:/)).not.toBeInTheDocument()
    expect(screen.getByText(/^Where you shine:/)).toBeInTheDocument()
    expect(screen.getByText(/^Your current challenge:/)).toBeInTheDocument()
    expect(screen.getByText(/^Your stage:/)).toBeInTheDocument()
    expect(screen.getByText(/^Recommendation:/)).toBeInTheDocument()
  })

  test('shows locked indicator in the category label', () => {
    renderStats()
    fireEvent.click(screen.getByText('Progress'))
    const nominalsButton = screen.getByText('Nominals').closest('summary') as HTMLButtonElement
    expect(within(nominalsButton).getAllByText('Locked')).toHaveLength(1)
  })

  test('shows item breakdown', () => {
    renderStats()
    fireEvent.click(screen.getByText('Progress'))
    expect(screen.getByText('Sound')).toBeInTheDocument()
  })

  test('exposes accessible semantics for mastery category progress bars', () => {
    const { container } = renderStats()
    fireEvent.click(screen.getByText('Progress'))

    const categoryProgressbar = container.querySelector('[aria-label="Tenses"]')
    expect(categoryProgressbar).toHaveAttribute('role', 'progressbar')
    expect(categoryProgressbar).toHaveAttribute('aria-valuemin', '0')
    expect(categoryProgressbar).toHaveAttribute('aria-valuemax', '1')
    expect(categoryProgressbar).toHaveAttribute('aria-valuenow')
  })

  test('exposes accessible semantics for mastery item progress bars', () => {
    const { container } = renderStats()
    fireEvent.click(screen.getByText('Progress'))

    const itemProgressbar = container.querySelector('[aria-label="Sound"]')
    expect(itemProgressbar).toHaveAttribute('role', 'progressbar')
    expect(itemProgressbar).toHaveAttribute('aria-valuemin', '0')
    expect(itemProgressbar).toHaveAttribute('aria-valuemax', '1')
    expect(itemProgressbar).toHaveAttribute('aria-valuenow')
  })

  test('keeps today values in the last chart slot when local day differs from UTC', () => {
    vi.useFakeTimers()
    vi.stubEnv('TZ', 'America/Los_Angeles')
    vi.setSystemTime(new Date('2026-03-19T23:30:00-07:00'))
    const stats: DailyActivity[] = [{ date: new Date(2026, 2, 19), correct: 4, incorrect: 1, passed: 0 }]

    renderStats(stats)
    fireEvent.click(screen.getByText('Progress'))

    expect(lastPlotData?.[1]).toEqual([0, 0, 0, 0, 0, 0, 4])
  })
})
