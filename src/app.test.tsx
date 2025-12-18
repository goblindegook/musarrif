/** biome-ignore-all lint/style/noNonNullAssertion: tests can tolerate it */
import { cleanup, render, screen, waitFor, within } from '@testing-library/preact'
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

test('Show up to five random quick pick suggestions by default', () => {
  renderApp('/#/en')
  expect(screen.getByText('Quick picks').nextElementSibling!.children.length).toBeLessThanOrEqual(5)
})

describe('Conjugation table', () => {
  it('switches to the present-tense table via tabs', async () => {
    renderApp('/#/en/ktb-1')
    const user = userEvent.setup()

    await user.click(screen.getByText('Present'))

    expect(screen.getByText('يَكتُبُ')).toBeInTheDocument()
  })

  it('reflects tense and mood changes in the URL', async () => {
    renderApp('/#/en/ktb-1')
    const user = userEvent.setup()
    const pushSpy = vi.spyOn(window.history, 'pushState')

    await user.click(screen.getByText('Present'))

    expect(pushSpy).toHaveBeenLastCalledWith({}, '', '/#/en/ktb-1/active/present')
  })

  it('shows imperative as a separate tense option', async () => {
    renderApp('/#/en/ktb-1')
    const user = userEvent.setup()

    await user.click(screen.getByText('Imperative'))

    expect(screen.getByRole('columnheader', { name: 'Imperative' })).toBeInTheDocument()
    const imperativeCells = screen.getAllByRole('cell')
    const hasImperativeContent = imperativeCells.some((cell) => /ك.*ت.*ب/.test(cell.textContent ?? ''))
    expect(hasImperativeContent).toBe(true)
  })

  it('reflects imperative tense changes in the URL', async () => {
    renderApp('/#/en/ktb-1')
    const user = userEvent.setup()
    const pushSpy = vi.spyOn(window.history, 'pushState')

    await user.click(screen.getByText('Imperative'))

    expect(pushSpy).toHaveBeenLastCalledWith({}, '', '/#/en/ktb-1/active/imperative')
  })

  it('does not show imperative in present tense mood tabs', async () => {
    renderApp('/#/en/ktb-1')
    const user = userEvent.setup()

    await user.click(screen.getByText('Present'))

    const moodTabs = screen.getByRole('tablist', { name: /select mood/i })
    expect(within(moodTabs).getByText('Indicative')).toBeInTheDocument()
    expect(within(moodTabs).getByText('Subjunctive')).toBeInTheDocument()
    expect(within(moodTabs).getByText('Jussive')).toBeInTheDocument()
  })
})

describe('Search', () => {
  it('matches verbs when a derived form is typed', async () => {
    renderApp()
    const user = userEvent.setup()

    await user.type(screen.getByLabelText('Verb'), 'يكتبون')

    expect(screen.getAllByText('كَتَبَ')).not.toHaveLength(0)
  })

  it('shows dropdown suggestions for partial matches', async () => {
    renderApp()
    const user = userEvent.setup()

    await user.type(screen.getByLabelText('Verb'), 'كت')

    const listbox = screen.getByRole('listbox', { name: 'Verb' })
    expect(within(listbox).getByLabelText(/ك.*ت.*ب.*Form IV/)).toBeInTheDocument()
    expect(within(listbox).getAllByText('IV').length).toBeGreaterThan(0)
  })

  it('hides dropdown suggestions when the input loses focus', async () => {
    renderApp()
    const user = userEvent.setup()
    await user.type(screen.getByLabelText('Verb'), 'كت')

    await user.click(document.body)

    expect(screen.queryByRole('listbox', { name: 'Verb' })).not.toBeInTheDocument()
  })

  it('shows dropdown again when refocusing after a blur', async () => {
    renderApp()
    const user = userEvent.setup()
    const input = screen.getByLabelText('Verb')
    await user.clear(input)
    await user.type(input, 'ك')
    await user.click(document.body)

    await user.click(input)

    expect(screen.getByRole('listbox', { name: 'Verb' })).toBeInTheDocument()
  })

  it('populates the query and shows paradigms when selecting a suggestion', async () => {
    renderApp()
    const user = userEvent.setup()

    const input = screen.getByLabelText('Verb')
    await user.type(input, 'كت')

    const suggestion = within(screen.getByRole('listbox', { name: 'Verb' })).getByLabelText(/ك.*ت.*ب.*Form IV/)

    await user.click(suggestion)

    expect((input as HTMLInputElement).value).toBe('أَكتَبَ')
    expect(screen.getAllByText('أَكتَبَ')).not.toHaveLength(0)
    expect(screen.queryByRole('listbox', { name: 'Verb' })).not.toBeInTheDocument()
  })

  it('updates the URL with the selected verb', async () => {
    renderApp('/#/en')
    const user = userEvent.setup()
    const pushSpy = vi.spyOn(window.history, 'pushState')

    await user.type(screen.getByLabelText('Verb'), 'كتب{enter}')

    expect(pushSpy).toHaveBeenCalledWith({}, '', '/#/en/ktb-2')
  })
})

describe('Diacritics control', () => {
  it('shows some diacritics Some by default', async () => {
    renderApp('/#/en/ktb-1')

    expect(screen.getAllByText('كَتَبَ').length).toBeGreaterThan(0)
    expect(screen.getByText('Some')).toHaveAttribute('aria-pressed', 'true')
  })

  it('can be set to None', async () => {
    renderApp('/#/en/ktb-1')
    const user = userEvent.setup()

    await user.click(screen.getByText('None'))

    expect(screen.getAllByText('كتب').length).toBeGreaterThan(0)
    expect(screen.getByText('None')).toHaveAttribute('aria-pressed', 'true')
  })

  it('can be set to All', async () => {
    renderApp('/#/en/ktb-1')
    const user = userEvent.setup()

    await user.click(screen.getByText('All'))

    expect(screen.getAllByText('كَتَبَ').length).toBeGreaterThan(0)
    expect(screen.getByText('All')).toHaveAttribute('aria-pressed', 'true')
  })

  it('remembers the user preference', async () => {
    renderApp('/#/en/ktb-1')
    const user = userEvent.setup()

    await user.click(screen.getByText('None'))

    renderApp('/#/en/ktb-1')
    expect(screen.getByText('None')).toHaveAttribute('aria-pressed', 'true')
  })
})

test('Allow picking among multiple forms of the same verb', async () => {
  renderApp('/#/en/rkz-1')
  const user = userEvent.setup()
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
    renderApp(`/#/en/${id}`)

    const formLabel = screen.getByText('Form')
    const formDetail = formLabel.parentElement as HTMLElement
    const vowels = within(formDetail).getByText(expected)

    expect(vowels.textContent).toBe(expected)
  })

  it('has insights with linked examples', async () => {
    renderApp('/#/en/3lm-5')
    const user = userEvent.setup()
    const formDetail = screen.getByText('Form')

    await user.click(formDetail)

    const dialog = screen.getByRole('dialog', { name: 'Form insights' })
    expect(dialog).toBeInTheDocument()
    expect(within(dialog).getByText(/reflexive or passive counterpart to Form II/i)).toBeInTheDocument()
    const links = within(dialog).getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
    expect(links.length).toBeLessThanOrEqual(5)
    links.forEach((link) => {
      expect(link.getAttribute('href')).toMatch(/#\/en\/.+-5$/)
    })

    await user.click(within(dialog).getByLabelText('Close'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})

test('Show a feedback panel with an issues link', () => {
  renderApp('/#/en/ktb-1')
  const link = screen.getByText('Report a problem')
  expect(link).toHaveAttribute('href', 'https://github.com/goblindegook/musarrif/issues')
})

test('Show quick picks related to the selected verb', () => {
  renderApp('/#/en/krh-1')
  const quickPicksHeading = screen.getByText('Quick picks')
  const buttons = Array.from(quickPicksHeading.nextElementSibling!.children)
  expect(buttons.map((button) => normalizeButtonText(button.textContent))).toEqual([
    'اَرَتَIto rise',
    'تَبَرَّعَVto donate',
    'تَرَكَIto leave',
    'جَرَبَIto try',
    'جَرَحَIto wound',
  ])
})

test('Order derived form options by form number', () => {
  renderApp('/#/en/bdl-1')
  const derivedFormHeading = screen.getByText('Derived forms')
  const buttons = Array.from(derivedFormHeading.nextElementSibling!.children)
  const formLabels = buttons
    .map((button) => button.getAttribute('aria-label')!)
    .map((label) => label.match(/Form\s([IVX]+)/)?.[1])
  expect(formLabels).toEqual(['I', 'II', 'VI', 'X'])
})

describe('Root insights', () => {
  it('displays root semantics when available', async () => {
    renderApp('/#/en/ktb-1')
    const user = userEvent.setup()
    const rootDetail = screen.getByText('Root').parentElement!

    await user.click(rootDetail)

    const dialog = screen.getByRole('dialog', { name: 'Root insights' })
    expect(within(dialog).getByText('writing')).toBeInTheDocument()
  })
})

describe('Language', () => {
  const getLanguageSelect = () => screen.getAllByRole<HTMLSelectElement>('combobox')[0]

  it('is English by default', () => {
    renderApp('/')

    expect(window.location.hash).toBe('#/en')
  })

  it('remembers the user preference', async () => {
    renderApp('/#/it')
    const user = userEvent.setup()

    const languageSelect = getLanguageSelect()
    await user.selectOptions(languageSelect, 'pt')

    await waitFor(() => expect(document.documentElement.lang).toBe('pt'))
    renderApp('/')
    expect(window.location.hash).toBe('#/pt')
    expect(getLanguageSelect().value).toBe('pt')
  })

  it('switching updates the URL', async () => {
    renderApp('/#/en')
    const user = userEvent.setup()
    const pushSpy = vi.spyOn(window.history, 'pushState')
    const languageSelect = getLanguageSelect()

    await user.selectOptions(languageSelect, 'pt')

    expect(pushSpy).toHaveBeenCalledWith({}, '', '/#/pt')
  })

  it('switching preserves the selected verb', async () => {
    renderApp('/#/en/ktb-1')
    const user = userEvent.setup()
    const pushSpy = vi.spyOn(window.history, 'pushState')

    await user.selectOptions(getLanguageSelect(), 'pt')

    expect(pushSpy).toHaveBeenLastCalledWith({}, '', '/#/pt/ktb-1')
  })
})
