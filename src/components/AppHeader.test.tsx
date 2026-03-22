import { cleanup, fireEvent, render, screen } from '@testing-library/preact'
import { afterEach, expect, it, vi } from 'vitest'
import { I18nProvider } from '../hooks/i18n'
import { RoutingProvider } from '../hooks/routing'
import { AppHeader } from './AppHeader'

const renderHeader = (path = '/#/verbs') => {
  window.history.replaceState({}, '', path)
  render(
    <RoutingProvider>
      <I18nProvider>
        <AppHeader />
      </I18nProvider>
    </RoutingProvider>,
  )
}

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

it('Conjugate segment has aria-pressed="true" by default (conjugation mode)', () => {
  renderHeader('/#/verbs')
  expect(screen.getByText('Conjugate').closest('button')).toHaveAttribute('aria-pressed', 'true')
})

it('clicking the Exercise segment pushes /#/test to history', () => {
  renderHeader('/#/verbs')
  const pushSpy = vi.spyOn(window.history, 'pushState')
  fireEvent.click(screen.getByText('Exercise').closest('button')!)
  expect(pushSpy).toHaveBeenCalledWith({}, '', '/#/test')
})

it('clicking the Conjugate segment when in exercise mode pushes /#/verbs to history', () => {
  renderHeader('/#/test')
  const pushSpy = vi.spyOn(window.history, 'pushState')
  fireEvent.click(screen.getByText('Conjugate').closest('button')!)
  expect(pushSpy).toHaveBeenCalledWith({}, '', '/#/verbs')
})

it('clicking the settings button opens the settings popover', () => {
  renderHeader('/#/verbs')
  const settingsButton = screen.getByTitle('Toggle settings')

  fireEvent.click(settingsButton)

  expect(settingsButton).toHaveAttribute('aria-expanded', 'true')
})

it('clicking outside the settings panel dismisses it', () => {
  renderHeader('/#/verbs')
  const settingsButton = screen.getByTitle('Toggle settings')
  fireEvent.click(settingsButton)

  fireEvent.mouseDown(document.body)

  expect(settingsButton).toHaveAttribute('aria-expanded', 'false')
})
