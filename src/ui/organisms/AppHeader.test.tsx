import { act, cleanup, fireEvent, screen, waitFor } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'
import { mockSpeechSynthesis, renderWithProviders } from '../../test/fixtures'
import { AppHeader } from './AppHeader'

const renderHeader = (path = '/#/verbs') => {
  window.history.replaceState({}, '', path)
  renderWithProviders(<AppHeader />)
}

afterEach(() => {
  cleanup()
  localStorage.clear()
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
  expect(pushSpy).toHaveBeenCalledWith({}, '', '#/test')
})

it('clicking the Conjugate segment when in exercise mode pushes /#/verbs to history', () => {
  renderHeader('/#/test')
  const pushSpy = vi.spyOn(window.history, 'pushState')
  fireEvent.click(screen.getByText('Conjugate').closest('button')!)
  expect(pushSpy).toHaveBeenCalledWith({}, '', '#/verbs')
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
  expect(document.querySelector('input[type="file"]')).toHaveAttribute(
    'accept',
    'application/json,application/vnd.musarrif+json,.json,.musarrif',
  )
})

it('exports user data in JSON format', () => {
  localStorage.setItem('conjugator:diacriticsPreference', JSON.stringify('none'))
  localStorage.setItem('conjugator:favouriteVerbs', JSON.stringify(['ktb-1', 'sfr-1']))
  localStorage.setItem('conjugator:exercise:daily', JSON.stringify([{ date: '2026-03-21', correct: 4, incorrect: 1 }]))

  renderHeader('/#/verbs')
  fireEvent.click(screen.getByLabelText('Settings'))

  let exportedDownload: string | null = null
  let exportedHref: string | null = null
  vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
    exportedDownload = this.download
    exportedHref = this.href
  })

  localStorage.setItem('conjugator:language', JSON.stringify('pt'))
  fireEvent.click(screen.getByText('Export data'))

  expect(exportedDownload).toBe('user-data.musarrif')

  const encodedJson = (exportedHref ?? '').split(',')[1] ?? ''
  const parsed = JSON.parse(decodeURIComponent(encodedJson ?? ''))
  expect(parsed).toEqual({
    version: 1,
    settings: { language: 'pt', diacriticsPreference: 'none', themePreference: 'system' },
    favouriteVerbs: ['ktb-1', 'sfr-1'],
    trackedExercises: [{ date: '2026-03-21', correct: 4, incorrect: 1, passed: 0 }],
    srs: {},
    dimensions: {
      profile: { tenses: 0, pronouns: 0, diacritics: 0, forms: 0, rootTypes: 0, nominals: 0 },
      windows: { tenses: [], pronouns: [], diacritics: [], forms: [], rootTypes: [], nominals: [] },
    },
  })
})

it('shows a warning modal before importing data', () => {
  renderHeader('/#/verbs')
  fireEvent.click(screen.getByLabelText('Settings'))
  fireEvent.click(screen.getByText('Import data'))

  expect(screen.getByText('Import data warning')).toBeInTheDocument()
  expect(
    screen.getByText('Importing will overwrite all your existing data. This action cannot be undone.'),
  ).toBeInTheDocument()
  expect(screen.getByText('Go back')).toBeInTheDocument()
  expect(screen.getByText('Choose import file')).toBeInTheDocument()
})

it('closes the warning modal when Go back is clicked', () => {
  renderHeader('/#/verbs')
  fireEvent.click(screen.getByLabelText('Settings'))
  fireEvent.click(screen.getByText('Import data'))

  fireEvent.click(screen.getByText('Go back'))

  expect(screen.queryByText('Import data warning')).not.toBeInTheDocument()
})

it('opens the file picker when Choose import file is clicked in the warning modal', async () => {
  renderHeader('/#/verbs')
  fireEvent.click(screen.getByLabelText('Settings'))
  fireEvent.click(screen.getByText('Import data'))

  const user = userEvent.setup({ pointerEventsCheck: 0 })
  const input = document.querySelector('input[type="file"]') as HTMLInputElement
  const clickSpy = vi.spyOn(input, 'click').mockImplementation(() => {})

  await act(async () => {
    await user.click(screen.getByText('Choose import file'))
  })

  expect(clickSpy).toHaveBeenCalledTimes(1)
  expect(screen.queryByText('Import data warning')).not.toBeInTheDocument()
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
    'user-data.musarrif',
    { type: 'application/json' },
  )

  await act(async () => {
    await user.upload(input, file)
  })

  await waitFor(() => expect(localStorage.getItem('conjugator:language')).toBe(JSON.stringify('it')))
  expect(localStorage.getItem('conjugator:diacriticsPreference')).toBe(JSON.stringify('all'))
  expect(localStorage.getItem('conjugator:favouriteVerbs')).toBe(JSON.stringify(['bdl-1']))
  expect(localStorage.getItem('conjugator:exercise:daily')).toBe(
    JSON.stringify([{ date: '2026-03-20', correct: 2, incorrect: 3, passed: 0 }]),
  )
  expect(reloadSpy).toHaveBeenCalledTimes(1)
})

it('does not show voice picker when zero Arabic voices available', () => {
  mockSpeechSynthesis([])
  renderHeader('/#/verbs')
  fireEvent.click(screen.getByLabelText('Settings'))
  expect(screen.queryByLabelText('Voice')).not.toBeInTheDocument()
})

it('does not show voice picker when exactly one Arabic voice available', () => {
  mockSpeechSynthesis([{ name: 'Majed', lang: 'ar-SA' }])
  renderHeader('/#/verbs')
  fireEvent.click(screen.getByLabelText('Settings'))
  expect(screen.queryByLabelText('Voice')).not.toBeInTheDocument()
})

it('shows voice picker when two or more Arabic voices available', () => {
  mockSpeechSynthesis([
    { name: 'Majed', lang: 'ar-SA' },
    { name: 'Tarik', lang: 'ar-SA' },
  ])
  renderHeader('/#/verbs')
  fireEvent.click(screen.getByLabelText('Settings'))
  expect(screen.getByLabelText('Voice')).toBeInTheDocument()
})

it('voice picker lists all available Arabic voices', () => {
  mockSpeechSynthesis([
    { name: 'Majed', lang: 'ar-SA' },
    { name: 'Tarik', lang: 'ar-SA' },
  ])
  renderHeader('/#/verbs')
  fireEvent.click(screen.getByLabelText('Settings'))
  expect(screen.getByRole('option', { name: 'Majed' })).toBeInTheDocument()
  expect(screen.getByRole('option', { name: 'Tarik' })).toBeInTheDocument()
})

it('selecting a voice persists to localStorage', async () => {
  mockSpeechSynthesis([
    { name: 'Majed', lang: 'ar-SA' },
    { name: 'Tarik', lang: 'ar-SA' },
  ])
  renderHeader('/#/verbs')
  fireEvent.click(screen.getByLabelText('Settings'))
  const user = userEvent.setup()
  await user.selectOptions(screen.getByLabelText('Voice'), 'Tarik')
  expect(localStorage.getItem('conjugator:arabicVoiceName')).toBe('"Tarik"')
})

it('voice picker appears before the theme control in the settings modal', () => {
  mockSpeechSynthesis([
    { name: 'Majed', lang: 'ar-SA' },
    { name: 'Tarik', lang: 'ar-SA' },
  ])
  renderHeader('/#/verbs')
  fireEvent.click(screen.getByLabelText('Settings'))
  const voiceLabel = screen.getByText('Voice')
  const themeLabel = screen.getByText('Theme')
  expect(voiceLabel.compareDocumentPosition(themeLabel) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
})
