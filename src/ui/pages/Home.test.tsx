import { cleanup, fireEvent, render, screen, within } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, test, vi } from 'vitest'
import { I18nProvider } from '../hooks/useI18n'
import { RoutingProvider } from '../routes'
import { Home } from './Home'

const renderHome = (url = '/#/verbs') => {
  cleanup()
  window.history.replaceState({}, '', url)
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

test('Shows verbs grouped by form at the verbs base route', () => {
  renderHome()

  expect(document.querySelectorAll('[role="group"][aria-label="Select form"] button')).toHaveLength(10)

  expect(
    document.querySelectorAll('[role="group"][aria-label="Select form"] button[aria-selected="true"]'),
  ).toHaveLength(0)
})

test('Shows alphabetized verbs for the selected form', async () => {
  renderHome()
  const user = userEvent.setup({ pointerEventsCheck: 0 })

  await user.click(
    [...document.querySelectorAll('[role="group"][aria-label="Select form"] button')].find(
      (tab) => tab.textContent === 'II',
    )!,
  )

  const athara = screen.getByText('أَثَّرَ')
  const ajaja = screen.getByText('أَجَّجَ')

  expect(athara.compareDocumentPosition(ajaja) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
})

test('filters included verbs to ẓanna and her sisters', async () => {
  renderHome()
  const user = userEvent.setup({ pointerEventsCheck: 0 })

  await user.click(screen.getByText('Ẓanna and her sisters'))

  const includedVerbsPanel = screen.getByText('Included verbs').closest('section')
  expect(includedVerbsPanel).toBeTruthy()
  const scoped = within(includedVerbsPanel as HTMLElement)

  expect(includedVerbsPanel?.querySelectorAll('a[href^="#/verbs/"]')).toHaveLength(13)
  expect(scoped.getByText('اِتَّخَذَ')).toBeInTheDocument()
  expect(scoped.getByText('عَدَّ')).toBeInTheDocument()
  expect(scoped.getByText('عَلِمَ')).toBeInTheDocument()
  expect(scoped.getByText('حَسِبَ')).toBeInTheDocument()
  expect(scoped.getByText('صَيَّرَ')).toBeInTheDocument()
  expect(scoped.getByText('ظَنَّ')).toBeInTheDocument()
  expect(scoped.getByText('دَرى')).toBeInTheDocument()
  expect(scoped.getByText('جَعَلَ')).toBeInTheDocument()
  expect(scoped.getByText('أَلفى')).toBeInTheDocument()
  expect(scoped.getByText('رَأى')).toBeInTheDocument()
  expect(scoped.getByText('تَرَكَ')).toBeInTheDocument()
  expect(scoped.getByText('وَجَدَ')).toBeInTheDocument()
  expect(scoped.getByText('خالَ')).toBeInTheDocument()

  const alfa = scoped.getByText('أَلفى')
  const taraka = scoped.getByText('تَرَكَ')
  const jaala = scoped.getByText('جَعَلَ')
  expect(alfa.compareDocumentPosition(taraka) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  expect(taraka.compareDocumentPosition(jaala) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
})

test('filters included verbs to kāna and her sisters in alphabetical order', async () => {
  renderHome()
  const user = userEvent.setup({ pointerEventsCheck: 0 })

  await user.click(screen.getByText('Kāna and her sisters'))

  const includedVerbsPanel = screen.getByText('Included verbs').closest('section')
  expect(includedVerbsPanel).toBeTruthy()
  const scoped = within(includedVerbsPanel as HTMLElement)

  const asbaha = scoped.getByText('أَصبَحَ')
  const adha = scoped.getByText('أَضحى')
  const amsa = scoped.getByText('أَمسى')
  expect(asbaha.compareDocumentPosition(adha) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  expect(adha.compareDocumentPosition(amsa) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
})

test('allows deselecting a form filter back to unfiltered verbs', async () => {
  renderHome()
  const user = userEvent.setup({ pointerEventsCheck: 0 })

  await user.click(screen.getByText('II', { selector: 'button' }))
  expect(screen.queryByText('آلَ')).not.toBeInTheDocument()

  await user.click(screen.getByText('II', { selector: 'button' }))
  expect(screen.getByText('آلَ')).toBeInTheDocument()
  expect(
    document.querySelectorAll('[role="group"][aria-label="Select form"] button[aria-selected="true"]'),
  ).toHaveLength(0)
})

test('allows deselecting kāna filter back to unfiltered verbs', async () => {
  renderHome()
  const user = userEvent.setup({ pointerEventsCheck: 0 })

  await user.click(screen.getByText('Kāna and her sisters'))
  expect(screen.queryByText('اِتَّخَذَ')).toBeNull()

  await user.click(screen.getByText('Kāna and her sisters'))
  expect(screen.getByText('اِتَّخَذَ')).toBeInTheDocument()
  expect(screen.getByText('Kāna and her sisters', { selector: 'button' })).toHaveAttribute('aria-pressed', 'false')
})

test('allows combining form and kāna filters', async () => {
  renderHome()
  const user = userEvent.setup({ pointerEventsCheck: 0 })

  await user.click(screen.getByText('IV', { selector: 'button' }))
  await user.click(screen.getByText('Kāna and her sisters'))

  const includedVerbsPanel = screen.getByText('Included verbs').closest('section')
  expect(includedVerbsPanel).toBeTruthy()
  const scoped = within(includedVerbsPanel as HTMLElement)

  expect(includedVerbsPanel?.querySelectorAll('a[href^="#/verbs/"]')).toHaveLength(3)
  expect(scoped.getByText('أَصبَحَ')).toBeInTheDocument()
  expect(scoped.getByText('أَضحى')).toBeInTheDocument()
  expect(scoped.getByText('أَمسى')).toBeInTheDocument()
  expect(scoped.queryByText('كانَ')).toBeNull()
  expect(scoped.queryByText('آلَ')).toBeNull()
})

test('applies kāna and ẓanna filters with intersection semantics', async () => {
  renderHome()
  const user = userEvent.setup({ pointerEventsCheck: 0 })

  await user.click(screen.getByText('Kāna and her sisters'))
  const kanaCount = screen
    .getByText('Included verbs')
    .closest('section')
    ?.querySelectorAll('a[href^="#/verbs/"]').length

  await user.click(screen.getByText('Ẓanna and her sisters'))
  const intersectedCount = screen
    .getByText('Included verbs')
    .closest('section')
    ?.querySelectorAll('a[href^="#/verbs/"]').length

  expect(kanaCount).toBeGreaterThan(0)
  expect(intersectedCount).toBeLessThanOrEqual(kanaCount ?? 0)
})

test('filters included verbs to favourites only', async () => {
  localStorage.setItem('conjugator:favouriteVerbs', JSON.stringify(['ktb-1', 'sfr-1']))
  renderHome()
  const user = userEvent.setup({ pointerEventsCheck: 0 })
  const otherFilters = screen.getByLabelText('Other filters')

  await user.click(within(otherFilters).getByText('Favourites', { selector: 'button' }))

  const includedVerbsPanel = screen.getByText('Included verbs').closest('section')
  expect(includedVerbsPanel).toBeTruthy()
  const links = includedVerbsPanel?.querySelectorAll('a[href^="#/verbs/"]')

  expect(links).toHaveLength(2)
  expect(includedVerbsPanel?.querySelector('a[href="#/verbs/ktb-1"]')).toBeTruthy()
  expect(includedVerbsPanel?.querySelector('a[href="#/verbs/sfr-1"]')).toBeTruthy()
})

test('applies favourites filter together with form filters', async () => {
  localStorage.setItem('conjugator:favouriteVerbs', JSON.stringify(['wjd-1', 'SbH-4']))
  renderHome()
  const user = userEvent.setup({ pointerEventsCheck: 0 })
  const otherFilters = screen.getByLabelText('Other filters')

  await user.click(within(otherFilters).getByText('Favourites', { selector: 'button' }))
  await user.click(screen.getByText('I', { selector: 'button' }))

  const includedVerbsPanel = screen.getByText('Included verbs').closest('section')
  expect(includedVerbsPanel).toBeTruthy()
  const links = includedVerbsPanel?.querySelectorAll('a[href^="#/verbs/"]')

  expect(links).toHaveLength(1)
  expect(includedVerbsPanel?.querySelector('a[href="#/verbs/wjd-1"]')).toBeTruthy()
  expect(includedVerbsPanel?.querySelector('a[href="#/verbs/SbH-4"]')).toBeNull()
})

test('restores verb list filters and pagination from hash query params', () => {
  renderHome('/#/verbs?form=1&page=2')

  expect(document.querySelector('#form-tab-1')?.getAttribute('aria-selected')).toBe('true')
  expect(screen.getByText(/Page 2 of \d+/)).toBeInTheDocument()
  expect(window.location.hash).toBe('#/verbs?form=1&page=2')
})

test('syncs verb list filters and pagination to hash query params', async () => {
  renderHome('/#/verbs')
  const user = userEvent.setup({ pointerEventsCheck: 0 })

  await user.click(screen.getByText('Next'))
  expect(window.location.hash).toBe('#/verbs?page=2')

  await user.click(document.querySelector('#form-tab-2') as HTMLButtonElement)
  expect(window.location.hash).toBe('#/verbs?form=2')
})

test('syncs favourites filter to hash query params', async () => {
  localStorage.setItem('conjugator:favouriteVerbs', JSON.stringify(['ktb-1']))
  renderHome('/#/verbs')
  const user = userEvent.setup({ pointerEventsCheck: 0 })
  const otherFilters = screen.getByLabelText('Other filters')

  await user.click(within(otherFilters).getByText('Favourites', { selector: 'button' }))
  expect(window.location.hash).toBe('#/verbs?favourites=1')

  await user.click(within(otherFilters).getByText('Favourites', { selector: 'button' }))
  expect(window.location.hash).toBe('#/verbs')
})

test('allows selecting multiple root type filters with intersection semantics', async () => {
  renderHome()
  const user = userEvent.setup({ pointerEventsCheck: 0 })

  await user.click(screen.getByText('Hamzated', { selector: 'button' }))

  const initialCount = screen.getByText('Included verbs').closest('section')?.querySelectorAll('a').length

  await user.click(screen.getByText('Defective', { selector: 'button' }))

  const intersectedCount = screen.getByText('Included verbs').closest('section')?.querySelectorAll('a').length

  expect(initialCount).toBeGreaterThan(0)
  expect(intersectedCount).toBeGreaterThan(0)
  expect(intersectedCount).toBeLessThanOrEqual(initialCount ?? 0)
})

test('applies root type filters together with form filters', async () => {
  renderHome()
  const user = userEvent.setup({ pointerEventsCheck: 0 })

  await user.click(screen.getByText('Assimilated', { selector: 'button' }))
  const rootTypeCount = screen.getByText('Included verbs').closest('section')?.querySelectorAll('a').length

  await user.click(screen.getByText('I', { selector: 'button' }))
  const intersectedCount = screen.getByText('Included verbs').closest('section')?.querySelectorAll('a').length

  expect(rootTypeCount).toBeGreaterThan(0)
  expect(intersectedCount).toBeGreaterThan(0)
  expect(intersectedCount).toBeLessThanOrEqual(rootTypeCount ?? 0)
})

test('treats sound as exclusive with other root type filters', async () => {
  renderHome()
  const user = userEvent.setup({ pointerEventsCheck: 0 })

  const sound = screen.getByText('Sound', { selector: 'button' })
  const hamzated = screen.getByText('Hamzated', { selector: 'button' })

  await user.click(sound)
  expect(sound).toHaveAttribute('aria-pressed', 'true')

  await user.click(hamzated)
  expect(sound).toHaveAttribute('aria-pressed', 'false')
  expect(hamzated).toHaveAttribute('aria-pressed', 'true')

  await user.click(sound)
  expect(sound).toHaveAttribute('aria-pressed', 'true')
  expect(hamzated).toHaveAttribute('aria-pressed', 'false')
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
