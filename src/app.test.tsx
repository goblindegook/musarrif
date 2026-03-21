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
  cleanup()
  window.localStorage.clear()
})

afterEach(() => {
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
  renderApp(`/#/verbs/${id}`)

  expect(screen.getAllByText(expectedPast).length).toBeGreaterThan(0)
})

test('Show up to five random quick pick suggestions by default', () => {
  renderApp('/#/verbs')
  expect(screen.getByText('Quick picks').nextElementSibling!.children.length).toBeLessThanOrEqual(5)
})

test('Shows the main page at the verbs base route', () => {
  renderApp('/#/verbs')

  expect(screen.getByText('Quick picks')).toBeInTheDocument()
})

test('Shows verbs grouped by form at the verbs base route', () => {
  renderApp('/#/verbs')

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
  renderApp('/#/verbs')
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
  renderApp('/#/verbs/wEd-1')

  const detail = screen.getByText('Verbal noun').parentElement!
  expect(within(detail).getByText('وَعْد')).toBeInTheDocument()
  expect(within(detail).getByText('مَوْعِد')).toBeInTheDocument()
  expect(within(detail).getByText('(mimi)')).toBeInTheDocument()
})

describe('Conjugation table', () => {
  it('shows active and passive voice tabs', () => {
    renderApp('/#/verbs/ktb-1')

    const voiceTabs = document.querySelector('[role="tablist"][aria-label="Select voice"]') as HTMLElement
    const tabs = Array.from(voiceTabs.querySelectorAll('[role="tab"]'))
    const activeTab = tabs.find((tab) => tab.textContent === 'Active')
    const passiveTab = tabs.find((tab) => tab.textContent === 'Passive')
    expect(activeTab?.getAttribute('aria-selected')).toBe('true')
    expect(passiveTab?.getAttribute('aria-selected')).toBe('false')
  })

  it('shows only the active voice tab when passive is unavailable', () => {
    renderApp('/#/verbs/Zll-1')

    const voiceTabs = document.querySelector('[role="tablist"][aria-label="Select voice"]') as HTMLElement
    const tabs = Array.from(voiceTabs.querySelectorAll('[role="tab"]'))
    const activeTab = tabs.find((tab) => tab.textContent === 'Active')
    const passiveTab = tabs.find((tab) => tab.textContent === 'Passive')
    expect(activeTab?.getAttribute('aria-selected')).toBe('true')
    expect(passiveTab).toBeUndefined()
  })

  it('switches to the present-tense table via tabs', async () => {
    renderApp('/#/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.click(screen.getByText('Present'))

    expect(screen.getByText('يَكتُبُ')).toBeInTheDocument()
  })

  it('reflects tense and mood changes in the URL', async () => {
    renderApp('/#/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    const pushSpy = vi.spyOn(window.history, 'pushState')

    await user.click(screen.getByText('Present'))

    expect(pushSpy).toHaveBeenLastCalledWith({}, '', '/#/verbs/ktb-1/active/present')
  })

  it('switches to passive tense options and updates the URL', async () => {
    renderApp('/#/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    const pushSpy = vi.spyOn(window.history, 'pushState')

    const voiceTabs = document.querySelector('[role="tablist"][aria-label="Select voice"]') as HTMLElement
    const passiveTab = Array.from(voiceTabs.querySelectorAll('[role="tab"]')).find(
      (tab) => tab.textContent === 'Passive',
    ) as HTMLElement
    await user.click(passiveTab)

    expect(pushSpy).toHaveBeenLastCalledWith({}, '', '/#/verbs/ktb-1/passive/past')
    const tenseTabs = document.querySelector('[role="tablist"][aria-label="Select tense"]') as HTMLElement
    expect(within(tenseTabs).getByText('Past')).toBeInTheDocument()
    expect(within(tenseTabs).getByText('Present')).toBeInTheDocument()
    expect(within(tenseTabs).getByText('Future')).toBeInTheDocument()
    expect(within(tenseTabs).queryByText('Imperative')).not.toBeInTheDocument()
  })

  it('shows mood tabs for passive present tense', async () => {
    renderApp('/#/verbs/ktb-1')

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
    renderApp('/#/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.click(screen.getByText('Imperative'))

    const imperativeHeader = Array.from(document.querySelectorAll('th')).find(
      (cell) => cell.textContent === 'Imperative',
    )
    expect(imperativeHeader).toBeTruthy()
    const imperativeCells = Array.from(document.querySelectorAll('td'))
    const hasImperativeContent = imperativeCells.some((cell) => /ك.*ت.*ب/.test(cell.textContent))
    expect(hasImperativeContent).toBe(true)
  })

  it('reflects imperative tense changes in the URL', async () => {
    renderApp('/#/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    const pushSpy = vi.spyOn(window.history, 'pushState')

    await user.click(screen.getByText('Imperative'))

    expect(pushSpy).toHaveBeenLastCalledWith({}, '', '/#/verbs/ktb-1/active/imperative')
  })

  it('does not show imperative in present tense mood tabs', async () => {
    renderApp('/#/verbs/ktb-1')
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
    renderApp('/#/verbs')
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    const pushSpy = vi.spyOn(window.history, 'pushState')

    await user.type(screen.getByLabelText('Verb'), 'كتب{enter}')

    expect(pushSpy).toHaveBeenCalledWith({}, '', '/#/verbs/ktb-2')
  })
})

describe('Diacritics control', () => {
  it('shows some diacritics Some by default', async () => {
    renderApp('/#/verbs/ktb-1')

    expect(screen.getAllByText('كَتَبَ').length).toBeGreaterThan(0)
    expect(screen.getByText('Some')).toHaveAttribute('aria-pressed', 'true')
  })

  it('can be set to None', async () => {
    renderApp('/#/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.click(screen.getByText('None'))

    expect(screen.getAllByText('كتب').length).toBeGreaterThan(0)
    expect(screen.getByText('None')).toHaveAttribute('aria-pressed', 'true')
  })

  it('can be set to All', async () => {
    renderApp('/#/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.click(screen.getByText('All'))

    expect(screen.getAllByText('كَتَبَ').length).toBeGreaterThan(0)
    expect(screen.getByText('All')).toHaveAttribute('aria-pressed', 'true')
  })

  it('remembers the user preference', async () => {
    renderApp('/#/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.click(screen.getByText('None'))

    renderApp('/#/verbs/ktb-1')
    expect(screen.getByText('None')).toHaveAttribute('aria-pressed', 'true')
  })
})

test('Allow picking among multiple forms of the same verb', async () => {
  renderApp('/#/verbs/rkz-1')
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
    renderApp(`/#/verbs/${id}`)

    const formLabel = screen.getByText('Form')
    const formDetail = formLabel.parentElement as HTMLElement
    const vowels = within(formDetail).getByText(expected)

    expect(vowels.textContent).toBe(expected)
  })

  it('has insights with linked examples', async () => {
    renderApp('/#/verbs/Elm-5')
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
      expect(link.getAttribute('href')).toMatch(/#\/verbs\/.+-5$/)
    })

    fireEvent.click(within(dialog).getByLabelText('Close'))
    expect(document.querySelector('[role="dialog"]')).toBeNull()
  })

  it('shows the selected Form I past/present pattern in form insights', () => {
    renderApp('/#/verbs/bdl-1')
    const formDetail = screen.getByText('Form')

    fireEvent.click(formDetail)

    const dialog = screen.getByText('Form insights').closest('[role="dialog"]') as HTMLElement
    expect(within(dialog).getByText('فَعَلَ / يَفعِلُ')).toBeInTheDocument()
  })

  it('shows both past and present patterns in non-Form-I insights', () => {
    renderApp('/#/verbs/Elm-5')
    const formDetail = screen.getByText('Form')

    fireEvent.click(formDetail)

    const dialogTitle = screen.getByText('Form insights')
    const dialog = dialogTitle.closest('[role="dialog"]') as HTMLElement
    expect(within(dialog).getByText('تَفَعَّلَ / يَتَفَعَّلُ')).toBeInTheDocument()
  })
})

test('Show a feedback panel with an issues link', () => {
  renderApp('/#/verbs/ktb-1')
  const link = screen.getByText('Report a problem')
  expect(link).toHaveAttribute('href', 'https://github.com/goblindegook/musarrif/issues')
})

test('Show quick picks related to the selected verb', () => {
  renderApp('/#/verbs/krh-1')
  const quickPicksHeading = screen.getByText('Quick picks')
  const buttons = Array.from(quickPicksHeading.nextElementSibling!.children)
  expect(buttons.map((button) => normalizeButtonText(button.textContent))).toEqual([
    'بَرهَنَIto prove',
    'تَأَوَّهَVto moan',
    'تَبَرَّعَVto donate',
    'بارىIIIto compete',
    'تَرَكَIto leave',
  ])
})

test('Order derived form options by form number', () => {
  renderApp('/#/verbs/bdl-1')
  const derivedFormHeading = screen.getByText('Derived forms')
  const buttons = Array.from(derivedFormHeading.nextElementSibling!.children)
  const formLabels = buttons
    .map((button) => button.getAttribute('aria-label')!)
    .map((label) => label.match(/Form\s([IVX]+)/)?.[1])
  expect(formLabels).toEqual(['I', 'II', 'VI', 'X'])
})

describe('Recently viewed verbs', () => {
  test('shows recently viewed verb pills in deduplicated most-recent-first order', () => {
    renderApp('/#/verbs/ktb-1')
    navigateTo('/#/verbs/bdl-1')
    navigateTo('/#/verbs/ktb-1')
    navigateTo('/#/verbs')

    const links = screen.getByText('Recently viewed').closest('section')!.querySelectorAll('a')

    expect(Array.from(links).map((link) => link.getAttribute('href'))).toEqual(['/#/verbs/ktb-1', '/#/verbs/bdl-1'])
  })

  test('excludes currently viewed verb pill', () => {
    renderApp('/#/verbs/bdl-1')
    navigateTo('/#/verbs/ktb-1')

    const links = screen.getByText('Recently viewed').closest('section')!.querySelectorAll('a')

    expect(Array.from(links).map((link) => link.getAttribute('href'))).toEqual(['/#/verbs/bdl-1'])
  })

  test('does not crash when localStorage contains stale verb IDs', () => {
    window.localStorage.setItem('conjugator:recentVerbs', JSON.stringify(['nonexistent-99', 'sfr-1']))
    expect(() => renderApp('/#/verbs/ktb-1')).not.toThrow()
  })

  test('limits recently viewed verbs to ten entries', () => {
    renderApp('/#/verbs/ktb-1')
    for (const id of ['sfr-1', 'sfr-2', 'klm-2', 'wEd-1', 'lmm-1', 'rkz-1', 'bdl-1', 'krh-1', 'qwl-1', 'Elm-5']) {
      navigateTo(`/#/verbs/${id}`)
    }

    const links = screen.getByText('Recently viewed').closest('section')!.querySelectorAll('a')

    expect(links).toHaveLength(10)
  })
})

describe('Root insights', () => {
  it('displays root semantics when available', async () => {
    renderApp('/#/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.click(screen.getByText('Root').parentElement!)

    const dialogTitle = screen.getByText('Root insights')
    const dialog = dialogTitle.closest('[role="dialog"]') as HTMLElement
    expect(within(dialog).getByText('writing')).toBeInTheDocument()
  })
})

describe('Language', () => {
  const getLanguageSelect = () => document.querySelector('select[aria-label]') as HTMLSelectElement

  it('is English by default', () => {
    renderApp('/')

    expect(window.location.hash).toBe('#/verbs')
  })

  it('remembers the user preference', async () => {
    renderApp('/#/verbs')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    const languageSelect = getLanguageSelect()
    await user.selectOptions(languageSelect, 'pt')

    await waitFor(() => expect(document.documentElement.lang).toBe('pt'))
    renderApp('/')
    expect(getLanguageSelect().value).toBe('pt')
  })

  it('switching does not change the URL', async () => {
    renderApp('/#/verbs')
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    const pushSpy = vi.spyOn(window.history, 'pushState')
    const languageSelect = getLanguageSelect()

    await user.selectOptions(languageSelect, 'pt')

    expect(pushSpy).not.toHaveBeenCalled()
  })

  it('switching preserves the selected verb', async () => {
    renderApp('/#/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.selectOptions(getLanguageSelect(), 'pt')

    expect(screen.getAllByText('كَتَبَ').length).toBeGreaterThan(0)
  })
})

describe('Build tab', () => {
  function getBuildPanel(): HTMLElement {
    return document.getElementById('panel-content-build')!
  }

  function getLetter(slotHeader: number): HTMLInputElement {
    return getBuildPanel().querySelector(
      `[role="group"][aria-labelledby="slot-header-${slotHeader - 1}"] input[type="text"]`,
    )!
  }

  function setLetter(slotHeader: number, letter: string) {
    fireEvent.input(getLetter(slotHeader), { data: letter, target: { value: letter } })
  }

  function getBuildButton(label: string): HTMLElement {
    return within(getBuildPanel()).getByText(label)
  }

  it('updates the conjugation when the vowel pattern changes', async () => {
    renderApp('/#/verbs')

    fireEvent.click(screen.getByText('Build'))
    setLetter(1, 'ب')
    setLetter(2, 'ن')
    setLetter(3, 'ر')
    fireEvent.click(getBuildButton('I'))
    fireEvent.click(getBuildButton('فَعَلَ / يَفعُلُ'))

    expect(screen.getAllByText('بَنَرَ').length).toBeGreaterThan(0)

    fireEvent.click(getBuildButton('فَعِلَ / يَفعَلُ'))

    expect(screen.getAllByText('بَنِرَ').length).toBeGreaterThan(0)
  })

  it('uses default masdar derivation when building an unknown Form I verb', async () => {
    renderApp('/#/verbs')

    fireEvent.click(screen.getByText('Build'))
    setLetter(1, 'ث')
    setLetter(2, 'ن')
    setLetter(3, 'ي')
    fireEvent.click(getBuildButton('I'))
    fireEvent.click(getBuildButton('فَعَلَ / يَفعُلُ'))

    const detail = screen.getByText('Verbal noun').parentElement!
    expect(within(detail).getByText('مَثنِى')).toBeInTheDocument()
  })

  it('pre-populates root and form when switching to Build tab with a selected verb', async () => {
    renderApp('/#/verbs/ktb-2')

    fireEvent.click(screen.getByText('Build'))

    expect(getLetter(1)).toHaveValue('ك')
    expect(getLetter(2)).toHaveValue('ت')
    expect(getLetter(3)).toHaveValue('ب')
    expect(within(getBuildPanel()).getByText('II')).toHaveAttribute('aria-pressed', 'true')
  })

  it('opens Build tab and pre-populates the requested root for unknown verbs in the URL', () => {
    renderApp('/#/verbs/qqq-2')

    expect(screen.getByText('Build')).toHaveAttribute('aria-selected', 'true')
    expect(getLetter(1)).toHaveValue('ق')
    expect(getLetter(2)).toHaveValue('ق')
    expect(getLetter(3)).toHaveValue('ق')
  })

  it('keeps selected tense when switching conjugation for a built Form I verb', async () => {
    renderApp('/#/verbs/qqq-2')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    fireEvent.click(getBuildButton('I'))
    fireEvent.click(getBuildButton('فَعَلَ / يَفعُلُ'))
    await user.click(screen.getByText('Present'))

    expect(window.location.hash).toBe('#/verbs/qqq-1/active/present')
  })

  it('keeps Build tab selected when choosing an existing verb from builder controls', async () => {
    renderApp('/#/verbs/qqq-2')

    expect(screen.getByText('Build')).toHaveAttribute('aria-selected', 'true')

    setLetter(1, 'ك')
    setLetter(2, 'ت')
    setLetter(3, 'ب')
    fireEvent.click(getBuildButton('I'))
    fireEvent.click(getBuildButton('فَعَلَ / يَفعُلُ'))

    expect(screen.getByText('Build')).toHaveAttribute('aria-selected', 'true')
  })

  it('does not auto-switch tabs after initial load when the URL changes', () => {
    renderApp('/#/verbs/ktb-1')

    expect(screen.getByText('Search')).toHaveAttribute('aria-selected', 'true')

    navigateTo('/#/verbs/qqq-2')

    expect(screen.getByText('Search')).toHaveAttribute('aria-selected', 'true')
  })

  it('keeps requested conjugation when loading a built verb URL', async () => {
    renderApp('/#/verbs/%24zb-1/active/present/subjunctive')

    expect(window.location.hash).toBe('#/verbs/%24zb-1/active/present/subjunctive')
  })

  it('navigates when selecting a form-insights example while in Build tab', async () => {
    renderApp('/#/verbs/qqq-2')
    fireEvent.click(getBuildButton('I'))
    fireEvent.click(screen.getByLabelText(/View form insights/i))

    const dialog = screen.getByText('Form insights').closest('[role="dialog"]') as HTMLElement
    const exampleLink = dialog.querySelector<HTMLAnchorElement>('a[href]')!

    fireEvent.click(exampleLink)

    expect(`/${window.location.hash}`).toBe(exampleLink.getAttribute('href'))
  })
})
