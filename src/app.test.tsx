import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { App } from './app'
import { I18nProvider } from './hooks/i18n'
import { RoutingProvider } from './hooks/routing'

const renderApp = (path = '') => {
  cleanup()
  window.history.replaceState({}, '', path)
  render(
    <RoutingProvider>
      <I18nProvider>
        <App />
      </I18nProvider>
    </RoutingProvider>,
  )
}

beforeEach(() => {
  cleanup()
  window.localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Diacritics control', () => {
  it('shows some diacritics Some by default', async () => {
    renderApp('/#/verbs/ktb-1')
    fireEvent.click(screen.getByLabelText('Settings'))

    expect(screen.getAllByText('كَتَبَ').length).toBeGreaterThan(0)
    expect(screen.getByText('Some')).toHaveAttribute('aria-pressed', 'true')
  })

  it('can be set to None', () => {
    renderApp('/#/verbs/ktb-1')
    fireEvent.click(screen.getByLabelText('Settings'))
    fireEvent.click(screen.getByText('None'))

    expect(screen.getAllByText('كتب').length).toBeGreaterThan(0)
    expect(screen.getByText('None')).toHaveAttribute('aria-pressed', 'true')
  })

  it('can be set to All', () => {
    renderApp('/#/verbs/ktb-1')
    fireEvent.click(screen.getByLabelText('Settings'))
    fireEvent.click(screen.getByText('All'))

    expect(screen.getAllByText('كَتَبَ').length).toBeGreaterThan(0)
    expect(screen.getByText('All')).toHaveAttribute('aria-pressed', 'true')
  })

  it('remembers the user preference', () => {
    renderApp('/#/verbs/ktb-1')
    fireEvent.click(screen.getByLabelText('Settings'))
    fireEvent.click(screen.getByText('None'))

    renderApp('/#/verbs/ktb-1')
    fireEvent.click(screen.getByLabelText('Settings'))
    expect(screen.getByText('None')).toHaveAttribute('aria-pressed', 'true')
  })
})

describe('Language', () => {
  it('is English by default', () => {
    renderApp('/')

    expect(window.location.hash).toBe('#/verbs')
  })

  it('remembers user preference', async () => {
    renderApp('/#/verbs')
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    fireEvent.click(screen.getByLabelText('Settings'))
    await user.selectOptions(screen.getByLabelText('Language'), 'pt')

    await waitFor(() => expect(document.documentElement.lang).toBe('pt'))
    renderApp('/')
    await waitFor(() => expect(document.documentElement.lang).toBe('pt'))
  })

  it('switching does not change the URL', async () => {
    renderApp('/#/verbs')
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    const pushSpy = vi.spyOn(window.history, 'pushState')
    fireEvent.click(screen.getByLabelText('Settings'))

    await user.selectOptions(screen.getByLabelText('Language'), 'pt')

    expect(pushSpy).not.toHaveBeenCalled()
  })

  it('switching preserves the selected verb', async () => {
    renderApp('/#/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    fireEvent.click(screen.getByLabelText('Settings'))
    await user.selectOptions(screen.getByLabelText('Language'), 'pt')

    expect(screen.getAllByText('كَتَبَ').length).toBeGreaterThan(0)
  })
})
