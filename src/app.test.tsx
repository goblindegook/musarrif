/** biome-ignore-all lint/style/noNonNullAssertion: tests can tolerate it */
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, test, vi } from 'vitest'

import { App } from './app'
import { I18nProvider } from './hooks/i18n'
import { RoutingProvider } from './hooks/routing'

const normalizeButtonText = (text: string | null) => text?.replace(/\s+/g, ' ').trim()

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

const navigateTo = (path: string) => {
  act(() => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  })
}

beforeEach(() => {
  vi.unstubAllEnvs()
  window.localStorage.clear()
})

afterEach(() => {
  cleanup()
  vi.unstubAllEnvs()
  window.localStorage.clear()
  vi.restoreAllMocks()
})

test('Show the title', () => {
  renderApp()

  expect(screen.getByText('Muṣarrif')).toBeInTheDocument()
})

test.each([
  ['klm-2', 'كَلَّمَ'],
  ['sfr-1', 'سَفَرَ'],
  ['sfr-2', 'سَفَّرَ'],
  ["bd'-1", 'بَدَأَ'],
])('renders %s as %s', (id, expectedPast) => {
  renderApp(`/#/en/verbs/${id}`)

  expect(screen.getAllByText(expectedPast).length).toBeGreaterThan(0)
})

test('Show up to five random quick pick suggestions by default', () => {
  renderApp('/#/en/verbs')
  expect(screen.getByText('Quick picks').nextElementSibling!.children.length).toBeLessThanOrEqual(5)
})

test('Shows the main page at the verbs base route', () => {
  renderApp('/#/en/verbs')

  expect(screen.getByText('Quick picks')).toBeInTheDocument()
})

test('Shows verbs grouped by form at the verbs base route', () => {
  renderApp('/#/en/verbs')

  expect(document.querySelectorAll('[role="tablist"][aria-label="Select form"] [role="tab"]')).toHaveLength(10)

  const formOneTab = document.querySelector(
    '[role="tablist"][aria-label="Select form"] [role="tab"][aria-selected="true"]',
  )
  const formTwoTab = document.querySelector(
    '[role="tablist"][aria-label="Select form"] [role="tab"][aria-selected="false"]',
  )

  expect(formOneTab?.textContent).toBe('I')
  expect(formTwoTab?.textContent).toBe('II')
})

test('Shows alphabetized verbs for the selected form', async () => {
  renderApp('/#/en/verbs')
  const user = userEvent.setup({ pointerEventsCheck: 0 })

  await user.click(
    [...document.querySelectorAll('[role="tablist"][aria-label="Select form"] [role="tab"]')].find(
      (tab) => tab.textContent === 'II',
    )!,
  )

  const formTwoPanel = document.querySelector('[role="tabpanel"][aria-label="Form II"]') as HTMLElement
  const safarra = within(formTwoPanel).getByText('سَفَّرَ')
  const kallama = within(formTwoPanel).getByText('كَلَّمَ')

  expect(safarra.compareDocumentPosition(kallama) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
})

test('shows multiple masdars with a mimi label', () => {
  window.localStorage.setItem('conjugator:diacriticsPreference', 'all')
  renderApp('/#/en/verbs/wEd-1')

  const detail = screen.getByText('Verbal noun').parentElement!
  expect(within(detail).getByText('وَعْد')).toBeInTheDocument()
  expect(within(detail).getByText('مَوْعِد')).toBeInTheDocument()
  expect(within(detail).getByText('(mimi)')).toBeInTheDocument()
})

test('shows a dash when the masdar is missing', () => {
  renderApp('/#/en/verbs/lmm-1')

  const detail = screen.getByText('Verbal noun').parentElement!
  expect(within(detail).getByText('—')).toBeInTheDocument()
  expect(detail.textContent?.trim()).toBe('Verbal noun—')
})

describe('Conjugation table', () => {
  it('shows active and passive voice tabs', () => {
    renderApp('/#/en/verbs/ktb-1')

    const voiceTabs = document.querySelector('[role="tablist"][aria-label="Select voice"]') as HTMLElement
    const tabs = Array.from(voiceTabs.querySelectorAll('[role="tab"]'))
    const activeTab = tabs.find((tab) => tab.textContent === 'Active')
    const passiveTab = tabs.find((tab) => tab.textContent === 'Passive')
    expect(activeTab?.getAttribute('aria-selected')).toBe('true')
    expect(passiveTab?.getAttribute('aria-selected')).toBe('false')
  })

  it('shows only the active voice tab when passive is unavailable', () => {
    renderApp('/#/en/verbs/Zll-1')

    const voiceTabs = document.querySelector('[role="tablist"][aria-label="Select voice"]') as HTMLElement
    const tabs = Array.from(voiceTabs.querySelectorAll('[role="tab"]'))
    const activeTab = tabs.find((tab) => tab.textContent === 'Active')
    const passiveTab = tabs.find((tab) => tab.textContent === 'Passive')
    expect(activeTab?.getAttribute('aria-selected')).toBe('true')
    expect(passiveTab).toBeUndefined()
  })

  it('switches to the present-tense table via tabs', async () => {
    renderApp('/#/en/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.click(screen.getByText('Present'))

    expect(screen.getByText('يَكتُبُ')).toBeInTheDocument()
  })

  it('reflects tense and mood changes in the URL', async () => {
    renderApp('/#/en/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    const pushSpy = vi.spyOn(window.history, 'pushState')

    await user.click(screen.getByText('Present'))

    expect(pushSpy).toHaveBeenLastCalledWith({}, '', '/#/en/verbs/ktb-1/active/present')
  })

  it('switches to passive tense options and updates the URL', async () => {
    renderApp('/#/en/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    const pushSpy = vi.spyOn(window.history, 'pushState')

    const voiceTabs = document.querySelector('[role="tablist"][aria-label="Select voice"]') as HTMLElement
    const passiveTab = Array.from(voiceTabs.querySelectorAll('[role="tab"]')).find(
      (tab) => tab.textContent === 'Passive',
    ) as HTMLElement
    await user.click(passiveTab)

    expect(pushSpy).toHaveBeenLastCalledWith({}, '', '/#/en/verbs/ktb-1/passive/past')
    const tenseTabs = document.querySelector('[role="tablist"][aria-label="Select tense"]') as HTMLElement
    expect(within(tenseTabs).getByText('Past')).toBeInTheDocument()
    expect(within(tenseTabs).getByText('Present')).toBeInTheDocument()
    expect(within(tenseTabs).getByText('Future')).toBeInTheDocument()
    expect(within(tenseTabs).queryByText('Imperative')).not.toBeInTheDocument()
  })

  it('shows mood tabs for passive present tense', async () => {
    renderApp('/#/en/verbs/ktb-1')

    const voiceTabs = document.querySelector('[role="tablist"][aria-label="Select voice"]') as HTMLElement
    const passiveTab = Array.from(voiceTabs.querySelectorAll('[role="tab"]')).find(
      (tab) => tab.textContent === 'Passive',
    ) as HTMLElement
    fireEvent.click(passiveTab)
    fireEvent.click(screen.getByText('Present'))

    const moodTabs = document.querySelector('[role="tablist"][aria-label="Select mood"]') as HTMLElement
    expect(within(moodTabs).getByText('Indicative')).toBeInTheDocument()
    expect(within(moodTabs).getByText('Subjunctive')).toBeInTheDocument()
    expect(within(moodTabs).getByText('Jussive')).toBeInTheDocument()
  })

  it('shows imperative as a separate tense option', async () => {
    renderApp('/#/en/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.click(screen.getByText('Imperative'))

    const imperativeHeader = Array.from(document.querySelectorAll('th')).find(
      (cell) => cell.textContent === 'Imperative',
    )
    expect(imperativeHeader).toBeTruthy()
    const imperativeCells = Array.from(document.querySelectorAll('td'))
    const hasImperativeContent = imperativeCells.some((cell) => /ك.*ت.*ب/.test(cell.textContent ?? ''))
    expect(hasImperativeContent).toBe(true)
  })

  it('reflects imperative tense changes in the URL', async () => {
    renderApp('/#/en/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    const pushSpy = vi.spyOn(window.history, 'pushState')

    await user.click(screen.getByText('Imperative'))

    expect(pushSpy).toHaveBeenLastCalledWith({}, '', '/#/en/verbs/ktb-1/active/imperative')
  })

  it('does not show imperative in present tense mood tabs', async () => {
    renderApp('/#/en/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.click(screen.getByText('Present'))

    const moodTabs = document.querySelector('[role="tablist"][aria-label="Select mood"]') as HTMLElement
    expect(within(moodTabs).getByText('Indicative')).toBeInTheDocument()
    expect(within(moodTabs).getByText('Subjunctive')).toBeInTheDocument()
    expect(within(moodTabs).getByText('Jussive')).toBeInTheDocument()
  })
})

describe('Search', () => {
  it('matches verbs when a derived form is typed', async () => {
    renderApp()
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.type(screen.getByLabelText('Verb'), 'يكتبون')

    expect(screen.getAllByText('كَتَبَ')).not.toHaveLength(0)
  })

  it('shows dropdown suggestions for partial matches', async () => {
    renderApp()
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.type(screen.getByLabelText('Verb'), 'كت')

    const listbox = document.querySelector('[role="listbox"][aria-label="Verb"]') as HTMLElement
    expect(within(listbox).getByLabelText(/ك.*ت.*ب.*Form IV/)).toBeInTheDocument()
    expect(within(listbox).getAllByText('IV').length).toBeGreaterThan(0)
  })

  it('hides dropdown suggestions when the input loses focus', async () => {
    renderApp()
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    await user.type(screen.getByLabelText('Verb'), 'كت')
    await user.click(document.body)

    expect(document.querySelector('[role="listbox"][aria-label="Verb"]')).toBeNull()
  })

  it('shows dropdown again when refocusing after a blur', async () => {
    renderApp()
    const input = screen.getByLabelText('Verb') as HTMLInputElement
    fireEvent.input(input, { target: { value: '' } })
    fireEvent.focus(input)
    fireEvent.input(input, { target: { value: 'ك' } })
    fireEvent.blur(input)
    fireEvent.focus(input)

    expect(document.querySelector('[role="listbox"][aria-label="Verb"]')).toBeTruthy()
  })

  it('populates the query and shows paradigms when selecting a suggestion', async () => {
    renderApp()
    const input = screen.getByLabelText('Verb') as HTMLInputElement
    fireEvent.focus(input)
    fireEvent.input(input, { target: { value: 'كت' } })

    const listbox = document.querySelector('[role="listbox"][aria-label="Verb"]') as HTMLElement
    const suggestion = within(listbox).getByLabelText(/ك.*ت.*ب.*Form IV/)

    fireEvent.click(suggestion)

    expect((input as HTMLInputElement).value).toBe('أَكتَبَ')
    expect(screen.getAllByText('أَكتَبَ')).not.toHaveLength(0)
    expect(document.querySelector('[role="listbox"][aria-label="Verb"]')).toBeNull()
  })

  it('updates the URL with the selected verb', async () => {
    renderApp('/#/en/verbs')
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    const pushSpy = vi.spyOn(window.history, 'pushState')

    await user.type(screen.getByLabelText('Verb'), 'كتب{enter}')

    expect(pushSpy).toHaveBeenCalledWith({}, '', '/#/en/verbs/ktb-2')
  })
})

describe('Diacritics control', () => {
  it('shows some diacritics Some by default', async () => {
    renderApp('/#/en/verbs/ktb-1')

    expect(screen.getAllByText('كَتَبَ').length).toBeGreaterThan(0)
    expect(screen.getByText('Some')).toHaveAttribute('aria-pressed', 'true')
  })

  it('can be set to None', async () => {
    renderApp('/#/en/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.click(screen.getByText('None'))

    expect(screen.getAllByText('كتب').length).toBeGreaterThan(0)
    expect(screen.getByText('None')).toHaveAttribute('aria-pressed', 'true')
  })

  it('can be set to All', async () => {
    renderApp('/#/en/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.click(screen.getByText('All'))

    expect(screen.getAllByText('كَتَبَ').length).toBeGreaterThan(0)
    expect(screen.getByText('All')).toHaveAttribute('aria-pressed', 'true')
  })

  it('remembers the user preference', async () => {
    renderApp('/#/en/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.click(screen.getByText('None'))

    renderApp('/#/en/verbs/ktb-1')
    expect(screen.getByText('None')).toHaveAttribute('aria-pressed', 'true')
  })
})

test('Allow picking among multiple forms of the same verb', async () => {
  renderApp('/#/en/verbs/rkz-1')
  const user = userEvent.setup({ pointerEventsCheck: 0 })
  const derivedForms = screen.getByText(/Derived forms/i).nextElementSibling as HTMLElement
  await user.click(within(derivedForms).getByLabelText(/Form II.*to concentrate/i))
  expect(
    await within(screen.getByText('Translation').parentElement!).findByText('to concentrate', { exact: false }),
  ).toBeInTheDocument()
})

describe('Form', () => {
  it.each([
    ['ktb-1', '◌َ / ◌ُ'],
    ['qwl-1', '◌َ / ◌ُ'],
    ['bdl-1', '◌َ / ◌ِ'],
  ])('detail for verb %s indicates vowels %s', (id, expected) => {
    renderApp(`/#/en/verbs/${id}`)

    const formLabel = screen.getByText('Form')
    const formDetail = formLabel.parentElement as HTMLElement
    const vowels = within(formDetail).getByText(expected)

    expect(vowels.textContent).toBe(expected)
  })

  it('has insights with linked examples', async () => {
    renderApp('/#/en/verbs/Elm-5')
    const formDetail = screen.getByText('Form')

    fireEvent.click(formDetail)

    const dialogTitle = screen.getByText('Form insights')
    const dialog = dialogTitle.closest('[role="dialog"]') as HTMLElement
    expect(dialog).toBeTruthy()
    expect(within(dialog).getByText(/reflexive or passive counterpart to Form II/i)).toBeInTheDocument()
    const links = Array.from(dialog.querySelectorAll('a[href]'))
    expect(links.length).toBeGreaterThan(0)
    expect(links.length).toBeLessThanOrEqual(5)
    links.forEach((link) => {
      expect(link.getAttribute('href')).toMatch(/#\/en\/verbs\/.+-5$/)
    })

    fireEvent.click(within(dialog).getByLabelText('Close'))
    expect(document.querySelector('[role="dialog"]')).toBeNull()
  })
})

test('Show a feedback panel with an issues link', () => {
  renderApp('/#/en/verbs/ktb-1')
  const link = screen.getByText('Report a problem')
  expect(link).toHaveAttribute('href', 'https://github.com/goblindegook/musarrif/issues')
})

test('Show quick picks related to the selected verb', () => {
  renderApp('/#/en/verbs/krh-1')
  const quickPicksHeading = screen.getByText('Quick picks')
  const buttons = Array.from(quickPicksHeading.nextElementSibling!.children)
  expect(buttons.map((button) => normalizeButtonText(button.textContent))).toEqual([
    'اَرَتَIto rise',
    'تَأَوَّهَVto moan',
    'تَبَرَّعَVto donate',
    'بارىIIIto compete',
    'تَرَكَIto leave',
  ])
})

test('Order derived form options by form number', () => {
  renderApp('/#/en/verbs/bdl-1')
  const derivedFormHeading = screen.getByText('Derived forms')
  const buttons = Array.from(derivedFormHeading.nextElementSibling!.children)
  const formLabels = buttons
    .map((button) => button.getAttribute('aria-label')!)
    .map((label) => label.match(/Form\s([IVX]+)/)?.[1])
  expect(formLabels).toEqual(['I', 'II', 'VI', 'X'])
})

describe('Recently viewed verbs', () => {
  test('shows recently viewed verb pills in deduplicated most-recent-first order', () => {
    renderApp('/#/en/verbs/ktb-1')
    navigateTo('/#/en/verbs/bdl-1')
    navigateTo('/#/en/verbs/ktb-1')
    navigateTo('/#/en/verbs')

    const heading = screen.getByText('Recently viewed')
    const links = within(heading.nextElementSibling as HTMLElement).getAllByRole('link')

    expect(links.map((link) => link.getAttribute('href'))).toEqual(['/#/en/verbs/ktb-1', '/#/en/verbs/bdl-1'])
  })

  test('excludes currently viewed verb pill', () => {
    renderApp('/#/en/verbs/bdl-1')
    navigateTo('/#/en/verbs/ktb-1')

    const heading = screen.getByText('Recently viewed')
    const links = within(heading.nextElementSibling as HTMLElement).getAllByRole('link')

    expect(links.map((link) => link.getAttribute('href'))).toEqual(['/#/en/verbs/bdl-1'])
  })

  test('does not crash when localStorage contains stale verb IDs', () => {
    window.localStorage.setItem('conjugator:recentVerbs', JSON.stringify(['nonexistent-99', 'sfr-1']))
    expect(() => renderApp('/#/en/verbs/ktb-1')).not.toThrow()
  })

  test('limits recently viewed verbs to ten entries', () => {
    renderApp('/#/en/verbs/ktb-1')
    for (const id of ['sfr-1', 'sfr-2', 'klm-2', 'wEd-1', 'lmm-1', 'rkz-1', 'bdl-1', 'krh-1', 'qwl-1', 'Elm-5']) {
      navigateTo(`/#/en/verbs/${id}`)
    }

    const heading = screen.getByText('Recently viewed')
    const links = within(heading.nextElementSibling as HTMLElement).getAllByRole('link')

    expect(links).toHaveLength(10)
  })
})

describe('Root insights', () => {
  it('displays root semantics when available', async () => {
    renderApp('/#/en/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.click(screen.getByText('Root').parentElement!)

    const dialogTitle = screen.getByText('Root insights')
    const dialog = dialogTitle.closest('[role="dialog"]') as HTMLElement
    expect(within(dialog).getByText('writing')).toBeInTheDocument()
  })
})

describe('Language', () => {
  const getLanguageSelect = () =>
    document.querySelector('select[aria-labelledby="language-label"]') as HTMLSelectElement

  it('is English by default', () => {
    renderApp('/')

    expect(window.location.hash).toBe('#/en/verbs')
  })

  it('remembers the user preference', async () => {
    renderApp('/#/it/verbs')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    const languageSelect = getLanguageSelect()
    await user.selectOptions(languageSelect, 'pt')

    await waitFor(() => expect(document.documentElement.lang).toBe('pt'))
    renderApp('/')
    expect(window.location.hash).toBe('#/pt/verbs')
    expect(getLanguageSelect().value).toBe('pt')
  })

  it('switching updates the URL', async () => {
    renderApp('/#/en/verbs')
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    const pushSpy = vi.spyOn(window.history, 'pushState')
    const languageSelect = getLanguageSelect()

    await user.selectOptions(languageSelect, 'pt')

    expect(pushSpy).toHaveBeenCalledWith({}, '', '/#/pt/verbs')
  })

  it('switching preserves the selected verb', async () => {
    renderApp('/#/en/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    const pushSpy = vi.spyOn(window.history, 'pushState')

    await user.selectOptions(getLanguageSelect(), 'pt')

    expect(pushSpy).toHaveBeenLastCalledWith({}, '', '/#/pt/verbs/ktb-1')
  })
})
