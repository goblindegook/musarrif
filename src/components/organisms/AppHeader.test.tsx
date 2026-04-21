import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'
import { I18nProvider } from '../../hooks/i18n'
import { RoutingProvider } from '../../hooks/routing'
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
  window.localStorage.clear()
  vi.restoreAllMocks()
})

it('shows the title', () => {
  renderHeader('/#/verbs')
  expect(screen.getByText('Muṣarrif')).toBeInTheDocument()
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

it('clicking the settings button opens the settings modal', () => {
  renderHeader('/#/verbs')
  const settingsButton = screen.getByLabelText('Settings')

  fireEvent.click(settingsButton)

  expect(settingsButton).toHaveAttribute('aria-expanded', 'true')
  expect(screen.getByText('Settings').closest('[role="dialog"]')).toBeInTheDocument()
})

it('does not render settings controls when settings modal is closed', () => {
  renderHeader('/#/verbs')
  expect(screen.queryByLabelText('All')).not.toBeInTheDocument()
  expect(screen.queryByLabelText('Some')).not.toBeInTheDocument()
  expect(screen.queryByLabelText('None')).not.toBeInTheDocument()
  expect(screen.queryByLabelText('Language')).not.toBeInTheDocument()
})

it('shows export and import buttons in the settings panel', () => {
  renderHeader('/#/verbs')
  fireEvent.click(screen.getByLabelText('Settings'))

  expect(screen.getByText('Export data')).toBeInTheDocument()
  expect(screen.getByText('Import data')).toBeInTheDocument()
})

it('exports user data in JSON format', () => {
  window.localStorage.setItem('conjugator:diacriticsPreference', JSON.stringify('none'))
  window.localStorage.setItem('conjugator:favouriteVerbs', JSON.stringify(['ktb-1', 'sfr-1']))
  window.localStorage.setItem(
    'conjugator:exercise:daily',
    JSON.stringify([{ date: '2026-03-21', correct: 4, incorrect: 1 }]),
  )

  renderHeader('/#/verbs')
  fireEvent.click(screen.getByLabelText('Settings'))

  let exportedDownload: string | null = null
  let exportedHref: string | null = null
  vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
    exportedDownload = this.download
    exportedHref = this.href
  })

  window.localStorage.setItem('conjugator:language', JSON.stringify('pt'))
  fireEvent.click(screen.getByText('Export data'))

  expect(exportedDownload).toBe('musarrif-data.json')

  const encodedJson = (exportedHref ?? '').split(',')[1] ?? ''
  const parsed = JSON.parse(decodeURIComponent(encodedJson ?? ''))
  expect(parsed).toEqual({
    version: 1,
    settings: { language: 'pt', diacriticsPreference: 'none', themePreference: 'system' },
    favouriteVerbs: ['ktb-1', 'sfr-1'],
    trackedExercises: [{ date: '2026-03-21', correct: 4, incorrect: 1 }],
    srs: {},
    dimensions: {
      profile: { tenses: 0, pronouns: 0, diacritics: 0, forms: 0, rootTypes: 0, nominals: 0 },
      windows: { tenses: [], pronouns: [], diacritics: [], forms: [], rootTypes: [], nominals: [] },
    },
  })
})

it('imports user data from JSON and updates local storage', async () => {
  renderHeader('/#/verbs')
  fireEvent.click(screen.getByLabelText('Settings'))
  const user = userEvent.setup({ pointerEventsCheck: 0 })
  const reloadSpy = vi.spyOn(Location.prototype, 'reload').mockImplementation(() => {})

  const input = document.querySelector('input[type="file"]') as HTMLInputElement
  const file = new File(
    [
      JSON.stringify({
        version: 1,
        settings: {
          language: 'it',
          diacriticsPreference: 'all',
          exerciseDifficulty: 'medium',
        },
        favouriteVerbs: ['bdl-1'],
        trackedExercises: [{ date: '2026-03-20', correct: 2, incorrect: 3 }],
      }),
    ],
    'musarrif-data.json',
    { type: 'application/json' },
  )

  await act(async () => {
    await user.upload(input, file)
  })

  await waitFor(() => expect(window.localStorage.getItem('conjugator:language')).toBe(JSON.stringify('it')))
  expect(window.localStorage.getItem('conjugator:diacriticsPreference')).toBe(JSON.stringify('all'))
  expect(window.localStorage.getItem('conjugator:favouriteVerbs')).toBe(JSON.stringify(['bdl-1']))
  expect(window.localStorage.getItem('conjugator:exercise:daily')).toBe(
    JSON.stringify([{ date: '2026-03-20', correct: 2, incorrect: 3 }]),
  )
  expect(reloadSpy).toHaveBeenCalledTimes(1)
})
