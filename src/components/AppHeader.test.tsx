import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
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

const getSettingsButton = () => document.querySelector('[data-settings-toggle] button') as HTMLButtonElement

afterEach(() => {
  cleanup()
  window.localStorage.clear()
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
  const settingsButton = getSettingsButton()

  fireEvent.click(settingsButton)

  expect(settingsButton).toHaveAttribute('aria-expanded', 'true')
})

it('clicking outside the settings panel dismisses it', () => {
  renderHeader('/#/verbs')
  const settingsButton = getSettingsButton()
  fireEvent.click(settingsButton)

  fireEvent.mouseDown(document.body)

  expect(settingsButton).toHaveAttribute('aria-expanded', 'false')
})

it('shows export and import buttons in the settings panel', () => {
  renderHeader('/#/verbs')
  fireEvent.click(getSettingsButton())

  expect(screen.getByText('Export data')).toBeInTheDocument()
  expect(screen.getByText('Import data')).toBeInTheDocument()
})

it('shows and persists exercise difficulty controls in settings', () => {
  renderHeader('/#/verbs')
  fireEvent.click(getSettingsButton())

  expect(screen.getByText('Exercise difficulty')).toBeInTheDocument()
  expect(screen.getByText('Easy')).toBeInTheDocument()
  expect(screen.getByText('Medium')).toBeInTheDocument()
  expect(screen.getByText('Hard')).toBeInTheDocument()

  fireEvent.click(screen.getByText('Hard'))
  expect(window.localStorage.getItem('conjugator:exerciseDifficulty')).toBe(JSON.stringify('hard'))
})

it('exports user data in JSON format', () => {
  window.localStorage.setItem('conjugator:diacriticsPreference', JSON.stringify('none'))
  window.localStorage.setItem('conjugator:exerciseDifficulty', JSON.stringify('hard'))
  window.localStorage.setItem('conjugator:favouriteVerbs', JSON.stringify(['ktb-1', 'sfr-1']))
  window.localStorage.setItem(
    'conjugator:exercise:daily',
    JSON.stringify([{ date: '2026-03-21', correct: 4, incorrect: 1 }]),
  )

  renderHeader('/#/verbs')
  fireEvent.click(getSettingsButton())

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
    settings: {
      language: 'pt',
      diacriticsPreference: 'none',
      exerciseDifficulty: 'hard',
    },
    favouriteVerbs: ['ktb-1', 'sfr-1'],
    trackedExercises: [{ date: '2026-03-21', correct: 4, incorrect: 1 }],
    srs: {},
  })
})

it('imports user data from JSON and updates local storage', async () => {
  renderHeader('/#/verbs')
  fireEvent.click(getSettingsButton())
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
  expect(window.localStorage.getItem('conjugator:exerciseDifficulty')).toBe(JSON.stringify('medium'))
  expect(window.localStorage.getItem('conjugator:favouriteVerbs')).toBe(JSON.stringify(['bdl-1']))
  expect(window.localStorage.getItem('conjugator:exercise:daily')).toBe(
    JSON.stringify([{ date: '2026-03-20', correct: 2, incorrect: 3 }]),
  )
  expect(reloadSpy).toHaveBeenCalledTimes(1)
})
