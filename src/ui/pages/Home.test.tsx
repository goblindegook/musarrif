import { cleanup, fireEvent, screen, within } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, test, vi } from 'vitest'
import { renderWithProviders } from '../../test/fixtures'
import { Home } from './Home'

const renderHome = (url = '/#/verbs') => {
  cleanup()
  window.history.replaceState({}, '', url)
  renderWithProviders(<Home />)
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

test('search and build tabs are correctly linked to their tabpanels', () => {
  renderHome()

  const searchTab = screen.getByText('Search', { selector: 'button' })
  const buildTab = screen.getByText('Build', { selector: 'button' })
  const searchPanel = document.getElementById('panel-content-search')

  expect(searchTab).toHaveAttribute('id', 'panel-tab-search')
  expect(buildTab).toHaveAttribute('id', 'panel-tab-build')
  expect(searchTab).toHaveAttribute('aria-controls', 'panel-content-search')
  expect(buildTab).toHaveAttribute('aria-controls', 'panel-content-build')
  expect(searchPanel).toHaveAttribute('aria-labelledby', 'panel-tab-search')

  fireEvent.click(buildTab)

  const buildPanel = document.getElementById('panel-content-build')
  expect(buildPanel).toHaveAttribute('aria-labelledby', 'panel-tab-build')
})

test('Shows verbs grouped by form at the verbs base route, including quadriliteral forms', () => {
  renderHome()

  const buttons = [...document.querySelectorAll('[role="group"][aria-label="Select form"] button')]
  expect(buttons.map((button) => button.textContent)).toEqual([
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX',
    'X',
    'Iq',
    'IIq',
    'IIIq',
    'IVq',
  ])

  expect(
    document.querySelectorAll('[role="group"][aria-label="Select form"] button[aria-selected="true"]'),
  ).toHaveLength(0)
})

describe('quadriliteral form filter', () => {
  test('filters to only quadriliteral verbs of the selected form', async () => {
    renderHome()
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.click(screen.getByText('Iq', { selector: 'button' }))

    const includedVerbsPanel = screen.getByText('Included verbs').closest('section')
    expect(includedVerbsPanel?.querySelectorAll('a[href^="#/verbs/"]')).toHaveLength(13)
    expect(includedVerbsPanel?.querySelector('a[href="#/verbs/brhn-1"]')).toBeTruthy()
    expect(includedVerbsPanel?.querySelector('a[href="#/verbs/ktb-1"]')).toBeNull()
  })

  test('selecting a quadriliteral form clears an active triliteral form filter, and vice versa', async () => {
    renderHome()
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.click(screen.getByText('I', { selector: 'button' }))
    await user.click(screen.getByText('Iq', { selector: 'button' }))
    expect(document.querySelector('#form-tab-1')).toHaveAttribute('aria-selected', 'false')
    expect(document.querySelector('#form-tab-1q')).toHaveAttribute('aria-selected', 'true')

    await user.click(screen.getByText('I', { selector: 'button' }))
    expect(document.querySelector('#form-tab-1')).toHaveAttribute('aria-selected', 'true')
    expect(document.querySelector('#form-tab-1q')).toHaveAttribute('aria-selected', 'false')
  })

  test('restores the quadriliteral form filter from hash query params', () => {
    renderHome('/#/verbs?form=1q')

    expect(document.querySelector('#form-tab-1q')).toHaveAttribute('aria-selected', 'true')
  })

  test('syncs the quadriliteral form filter to hash query params', async () => {
    renderHome('/#/verbs')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.click(screen.getByText('Iq', { selector: 'button' }))
    expect(window.location.hash).toBe('#/verbs?form=1q')
  })
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

test('applies other filters exclusively', async () => {
  localStorage.setItem('conjugator:favouriteVerbs', JSON.stringify(['ktb-1']))
  renderHome()
  const user = userEvent.setup({ pointerEventsCheck: 0 })
  const otherFilters = screen.getByLabelText('Other filters')

  const kana = within(otherFilters).getByText('Kāna and her sisters', { selector: 'button' })
  const zanna = within(otherFilters).getByText('Ẓanna and her sisters', { selector: 'button' })
  const favourites = within(otherFilters).getByText('Favourites', { selector: 'button' })

  await user.click(kana)
  expect(kana).toHaveAttribute('aria-pressed', 'true')
  expect(zanna).toHaveAttribute('aria-pressed', 'false')

  await user.click(zanna)
  expect(kana).toHaveAttribute('aria-pressed', 'false')
  expect(zanna).toHaveAttribute('aria-pressed', 'true')
  expect(favourites).toHaveAttribute('aria-pressed', 'false')

  await user.click(favourites)
  expect(kana).toHaveAttribute('aria-pressed', 'false')
  expect(zanna).toHaveAttribute('aria-pressed', 'false')
  expect(favourites).toHaveAttribute('aria-pressed', 'true')
})

test('disables other-filter options that would yield zero results', async () => {
  renderHome()
  const otherFilters = screen.getByLabelText('Other filters')

  expect(within(otherFilters).getByText('Favourites', { selector: 'button' })).toBeDisabled()
})

test('disables form options that would yield zero results', async () => {
  renderHome()
  const user = userEvent.setup({ pointerEventsCheck: 0 })
  const otherFilters = screen.getByLabelText('Other filters')

  await user.click(within(otherFilters).getByText('Kāna and her sisters', { selector: 'button' }))

  expect(screen.getByText('IX', { selector: 'button' })).toBeDisabled()
})

test('shows a Doubled root type filter button', () => {
  renderHome()
  expect(screen.getByText('Doubled', { selector: 'button' })).toBeInTheDocument()
})

test('filters included verbs to doubled roots', async () => {
  renderHome()
  const user = userEvent.setup({ pointerEventsCheck: 0 })

  await user.click(screen.getByText('Doubled', { selector: 'button' }))

  const includedVerbsPanel = screen.getByText('Included verbs').closest('section')
  expect(includedVerbsPanel?.querySelector('a[href="#/verbs/Edd-4"]')).toBeTruthy()
  expect(includedVerbsPanel?.querySelector('a[href="#/verbs/ktb-1"]')).toBeNull()
})

test('shows a Biliteral root type filter button', () => {
  renderHome()
  expect(screen.getByText('Biliteral', { selector: 'button' })).toBeInTheDocument()
})

test('filters included verbs to biliteral quadriliteral roots (c1=c3, c2=c4)', async () => {
  renderHome()
  const user = userEvent.setup({ pointerEventsCheck: 0 })

  await user.click(screen.getByText('Biliteral', { selector: 'button' }))

  const includedVerbsPanel = screen.getByText('Included verbs').closest('section')
  const links = includedVerbsPanel?.querySelectorAll('a[href^="#/verbs/"]')
  expect(links).toHaveLength(7)
  expect(includedVerbsPanel?.querySelector('a[href="#/verbs/zlzl-1"]')).toBeTruthy()
  expect(includedVerbsPanel?.querySelector('a[href="#/verbs/brhn-1"]')).toBeNull()
  expect(includedVerbsPanel?.querySelector('a[href="#/verbs/ktb-1"]')).toBeNull()
})

test('keeps sound filter enabled when kāna + form I includes sound roots', async () => {
  renderHome()
  const user = userEvent.setup({ pointerEventsCheck: 0 })
  const otherFilters = screen.getByLabelText('Other filters')

  await user.click(within(otherFilters).getByText('Kāna and her sisters', { selector: 'button' }))
  await user.click(screen.getByText('I', { selector: 'button' }))

  expect(screen.getByText('Sound', { selector: 'button' })).toBeEnabled()
})

test('doubled filter shows Zll-1 for kāna form I combination', async () => {
  renderHome()
  const user = userEvent.setup({ pointerEventsCheck: 0 })
  const otherFilters = screen.getByLabelText('Other filters')

  await user.click(within(otherFilters).getByText('Kāna and her sisters', { selector: 'button' }))
  await user.click(screen.getByText('I', { selector: 'button' }))
  await user.click(screen.getByText('Doubled', { selector: 'button' }))

  const includedVerbsPanel = screen.getByText('Included verbs').closest('section')
  expect(includedVerbsPanel?.querySelector('a[href="#/verbs/Zll-1"]')).toBeTruthy()
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

  expect(document.querySelector('#form-tab-1')).toHaveAttribute('aria-selected', 'true')
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
  expect(window.location.hash).toBe('#/verbs?group=favourites')

  await user.click(within(otherFilters).getByText('Favourites', { selector: 'button' }))
  expect(window.location.hash).toBe('#/verbs')
})

test('syncs other filters exclusively to hash query params', async () => {
  localStorage.setItem('conjugator:favouriteVerbs', JSON.stringify(['ktb-1']))
  renderHome('/#/verbs')
  const user = userEvent.setup({ pointerEventsCheck: 0 })
  const otherFilters = screen.getByLabelText('Other filters')

  await user.click(within(otherFilters).getByText('Kāna and her sisters', { selector: 'button' }))
  expect(window.location.hash).toBe('#/verbs?group=kana')

  await user.click(within(otherFilters).getByText('Ẓanna and her sisters', { selector: 'button' }))
  expect(window.location.hash).toBe('#/verbs?group=zanna')

  await user.click(within(otherFilters).getByText('Favourites', { selector: 'button' }))
  expect(window.location.hash).toBe('#/verbs?group=favourites')
})

test('restores group filter from hash query params', () => {
  renderHome('/#/verbs?group=zanna')
  const otherFilters = screen.getByLabelText('Other filters')

  expect(within(otherFilters).getByText('Ẓanna and her sisters', { selector: 'button' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  expect(within(otherFilters).getByText('Kāna and her sisters', { selector: 'button' })).toHaveAttribute(
    'aria-pressed',
    'false',
  )
  expect(window.location.hash).toBe('#/verbs?group=zanna')
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
