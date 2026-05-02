import { cleanup, fireEvent, render, screen, within } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, test, vi } from 'vitest'
import { I18nProvider } from '../../hooks/useI18n'
import { RoutingProvider } from '../../routes'
import { Home } from './Home'

const renderHome = () => {
  cleanup()
  window.history.replaceState({}, '', '/')
  render(
    <RoutingProvider>
      <I18nProvider>
        <Home />
      </I18nProvider>
    </RoutingProvider>,
  )
}

afterEach(() => {
  document.title = ''
  localStorage.clear()
  cleanup()
  vi.restoreAllMocks()
})

test('sets the page title ', () => {
  renderHome()
  expect(document.title).toBe('Muṣarrif')
})

test('Show up to five random quick pick suggestions by default', () => {
  renderHome()
  expect(screen.getByText('Quick picks').nextElementSibling!.children.length).toBeLessThanOrEqual(5)
})

test('Shows the main page at the verbs base route', () => {
  renderHome()

  expect(screen.getByText('Quick picks')).toBeInTheDocument()
})

test('Shows verbs grouped by form at the verbs base route', () => {
  renderHome()

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
  renderHome()
  const user = userEvent.setup({ pointerEventsCheck: 0 })

  await user.click(
    [...document.querySelectorAll('[role="tablist"][aria-label="Select form"] [role="tab"]')].find(
      (tab) => tab.textContent === 'II',
    )!,
  )

  const formTwoPanel = document.querySelector<HTMLElement>('[role="tabpanel"][aria-label="Form II"]')!
  const safarra = within(formTwoPanel).getByText('سَفَّرَ')
  const kallama = within(formTwoPanel).getByText('كَلَّمَ')

  expect(safarra.compareDocumentPosition(kallama) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
})

describe('Search', () => {
  it('matches verbs when a derived form is typed', async () => {
    renderHome()
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.type(screen.getByLabelText('Verb'), 'يكتبون')

    expect(screen.getAllByText('كَتَبَ')).not.toHaveLength(0)
  })

  it('shows dropdown suggestions for partial matches', async () => {
    renderHome()
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.type(screen.getByLabelText('Verb'), 'كت')

    const listbox = document.querySelector<HTMLElement>('[role="listbox"][aria-label="Verb"]')!
    expect(within(listbox).getByLabelText(/ك.*ت.*ب.*Form IV/)).toBeInTheDocument()
    expect(within(listbox).getAllByText('IV').length).toBeGreaterThan(0)
  })

  it('hides dropdown suggestions when the input loses focus', async () => {
    renderHome()
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    await user.type(screen.getByLabelText('Verb'), 'كت')
    await user.click(document.body)

    expect(document.querySelector('[role="listbox"][aria-label="Verb"]')).toBeNull()
  })

  it('shows dropdown again when refocusing after a blur', async () => {
    renderHome()
    const input = screen.getByLabelText('Verb') as HTMLInputElement
    fireEvent.input(input, { target: { value: '' } })
    fireEvent.focus(input)
    fireEvent.input(input, { target: { value: 'ك' } })
    fireEvent.blur(input)
    fireEvent.focus(input)

    expect(document.querySelector('[role="listbox"][aria-label="Verb"]')).toBeTruthy()
  })

  it('populates the query and closes suggestions when selecting a suggestion', async () => {
    renderHome()
    const input = screen.getByLabelText('Verb') as HTMLInputElement
    fireEvent.focus(input)
    fireEvent.input(input, { target: { value: 'كت' } })

    const listbox = document.querySelector<HTMLElement>('[role="listbox"][aria-label="Verb"]')!
    const suggestion = within(listbox).getByLabelText(/ك.*ت.*ب.*Form IV/)

    fireEvent.click(suggestion)

    expect(input.value).toBe('أَكتَبَ')
    expect(document.querySelector('[role="listbox"][aria-label="Verb"]')).toBeNull()
  })
})
