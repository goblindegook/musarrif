import { cleanup, fireEvent, render, screen } from '@testing-library/preact'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { I18nProvider } from '../hooks/useI18n'
import { TourLayer } from './TourLayer'

beforeEach(() => {
  // TODO: Move to test setup
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      disconnect() {}
    },
  )

  if (!HTMLElement.prototype.showPopover) {
    HTMLElement.prototype.showPopover = function showPopover() {
      this.dataset.popoverOpen = 'true'
    }
  }
  if (!HTMLElement.prototype.hidePopover) {
    HTMLElement.prototype.hidePopover = function hidePopover() {
      this.dataset.popoverOpen = 'false'
    }
  }
})

afterEach(() => {
  cleanup()
  localStorage.clear()
  vi.restoreAllMocks()
})

test('renders first tour step and navigates to next', () => {
  render(
    <I18nProvider>
      <div>
        <div data-tour-step="0">search anchor</div>
        <TourLayer isOpen step={0} totalSteps={5} onNext={vi.fn()} onSkip={vi.fn()} />
      </div>
    </I18nProvider>,
  )

  expect(screen.getByText('Find any verb')).toBeInTheDocument()
  fireEvent.click(screen.getByText('Next'))
})

test('calls skip handler when skipping', () => {
  const onSkip = vi.fn()

  render(
    <I18nProvider>
      <div>
        <div data-tour-step="0">search anchor</div>
        <TourLayer isOpen step={0} totalSteps={5} onNext={vi.fn()} onSkip={onSkip} />
      </div>
    </I18nProvider>,
  )

  fireEvent.click(screen.getByText('Skip tour'))
  expect(onSkip).toHaveBeenCalledTimes(1)
})

test('renders closing step with done action', () => {
  render(
    <I18nProvider>
      <TourLayer isOpen step={4} totalSteps={5} onNext={vi.fn()} onSkip={vi.fn()} />
    </I18nProvider>,
  )

  expect(screen.getByText('You’re ready')).toBeInTheDocument()
  expect(screen.getByText('Get started')).toBeInTheDocument()
})

test('step transition from toggle step to help step updates walkthrough content', () => {
  const { rerender } = render(
    <I18nProvider>
      <header>
        <span data-tour-step="3">
          <button type="button">Conjugation</button>
          <button type="button">Exercise</button>
        </span>
        <button type="button" data-tour-step="4">
          Help
        </button>
        <button type="button">Settings</button>
      </header>
      <TourLayer isOpen step={3} totalSteps={5} onNext={vi.fn()} onSkip={vi.fn()} />
    </I18nProvider>,
  )

  expect(screen.getByText('Exercise mode')).toBeInTheDocument()

  rerender(
    <I18nProvider>
      <header>
        <span data-tour-step="3">
          <button type="button">Conjugation</button>
          <button type="button">Exercise</button>
        </span>
        <button type="button" data-tour-step="4">
          Help
        </button>
        <button type="button">Settings</button>
      </header>
      <TourLayer isOpen step={4} totalSteps={5} onNext={vi.fn()} onSkip={vi.fn()} />
    </I18nProvider>,
  )

  expect(screen.getByText('You’re ready')).toBeInTheDocument()
  expect(screen.getByText('Get started')).toBeInTheDocument()
})
