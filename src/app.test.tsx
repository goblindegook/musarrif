import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { App } from './app'
import { I18nProvider } from './hooks/useI18n'
import { RoutingProvider } from './hooks/useRouting'

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
  localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Diacritics control', () => {
  it('shows some diacritics Some by default', async () => {
    renderApp('/#/verbs/ktb-1')
    fireEvent.click(screen.getByLabelText('Settings'))

    expect(screen.getAllByText('كَتَبَ').length).toBeGreaterThan(0)
    expect(screen.getByText('Some')).toHaveAttribute('aria-pressed', 'true')
  })

  it('can be set to None', () => {
    renderApp('/#/verbs/ktb-1')
    fireEvent.click(screen.getByLabelText('Settings'))
    fireEvent.click(screen.getByText('None'))

    expect(screen.getAllByText('كتب').length).toBeGreaterThan(0)
    expect(screen.getByText('None')).toHaveAttribute('aria-pressed', 'true')
  })

  it('can be set to All', () => {
    renderApp('/#/verbs/ktb-1')
    fireEvent.click(screen.getByLabelText('Settings'))
    fireEvent.click(screen.getByText('All'))

    expect(screen.getAllByText('كَتَبَ').length).toBeGreaterThan(0)
    expect(screen.getByText('All')).toHaveAttribute('aria-pressed', 'true')
  })

  it('remembers the user preference', () => {
    renderApp('/#/verbs/ktb-1')
    fireEvent.click(screen.getByLabelText('Settings'))
    fireEvent.click(screen.getByText('None'))

    renderApp('/#/verbs/ktb-1')
    fireEvent.click(screen.getByLabelText('Settings'))
    expect(screen.getByText('None')).toHaveAttribute('aria-pressed', 'true')
  })
})

describe('Language', () => {
  it('is English by default', () => {
    renderApp('/')

    expect(window.location.hash).toBe('#/verbs')
  })

  it('remembers user preference', async () => {
    renderApp('/#/verbs')
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    fireEvent.click(screen.getByLabelText('Settings'))
    await user.selectOptions(screen.getByLabelText('Language'), 'pt')

    await waitFor(() => expect(document.documentElement.lang).toBe('pt'))
    renderApp('/')
    await waitFor(() => expect(document.documentElement.lang).toBe('pt'))
  })

  it('switching does not change the URL', async () => {
    renderApp('/#/verbs')
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    const pushSpy = vi.spyOn(window.history, 'pushState')
    fireEvent.click(screen.getByLabelText('Settings'))

    await user.selectOptions(screen.getByLabelText('Language'), 'pt')

    expect(pushSpy).not.toHaveBeenCalled()
  })

  it('switching preserves the selected verb', async () => {
    renderApp('/#/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    fireEvent.click(screen.getByLabelText('Settings'))
    await user.selectOptions(screen.getByLabelText('Language'), 'pt')

    expect(screen.getAllByText('كَتَبَ').length).toBeGreaterThan(0)
  })
})

describe('Conjugation', () => {
  it('navigates when selecting a verb from search', async () => {
    renderApp('/#/verbs')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.type(screen.getByLabelText('Verb'), 'كتب{enter}')

    expect(window.location.hash).toBe('#/verbs/ktb-2')
  })

  it('navigates when building a known verb', () => {
    renderApp('/#/verbs')

    fireEvent.click(screen.getByText('Build'))
    setBuildLetter(1, 'ب')
    setBuildLetter(2, 'ن')
    setBuildLetter(3, 'ر')
    fireEvent.click(getBuildButton('I'))
    fireEvent.click(getBuildButton('فَعَلَ / يَفعُلُ'))

    expect(window.location.hash).toBe('#/verbs/bnr-1')
  })

  it('navigates when building an unknown verb', () => {
    renderApp('/#/verbs')

    fireEvent.click(screen.getByText('Build'))
    setBuildLetter(1, 'ث')
    setBuildLetter(2, 'ن')
    setBuildLetter(3, 'ي')
    fireEvent.click(getBuildButton('I'))
    fireEvent.click(getBuildButton('فَعَلَ / يَفعُلُ'))

    expect(window.location.hash).toBe('#/verbs/vny-1')
  })

  it('reflects tense changes in the URL', async () => {
    renderApp('/#/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.click(screen.getByText('Present'))

    expect(window.location.hash).toBe('#/verbs/ktb-1/active/present')
  })

  it('switches to the present-tense table via tabs', async () => {
    renderApp('/#/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.click(screen.getByText('Present'))

    expect(screen.getByText('يَكتُبُ')).toBeInTheDocument()
  })

  it('updates the URL when switching to passive voice', async () => {
    renderApp('/#/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    const voiceTabs = document.querySelector('[role="tablist"][aria-label="Select voice"]')!
    const passiveTab = Array.from(voiceTabs.querySelectorAll('[role="tab"]')).find(
      (tab) => tab.textContent === 'Passive',
    ) as HTMLElement
    await user.click(passiveTab)

    expect(window.location.hash).toBe('#/verbs/ktb-1/passive/past')
    const tenseTabs = document.querySelector<HTMLElement>('[role="tablist"][aria-label="Select tense"]')!
    expect(within(tenseTabs).queryByText('Imperative')).not.toBeInTheDocument()
  })

  it('reflects imperative tense changes in the URL', async () => {
    renderApp('/#/verbs/ktb-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    await user.click(screen.getByText('Imperative'))

    expect(window.location.hash).toBe('#/verbs/ktb-1/active/imperative')
  })

  it('preserves requested conjugation when loading a built verb URL', () => {
    renderApp('/#/verbs/%24zb-1/active/present/subjunctive')

    expect(window.location.hash).toBe('#/verbs/%24zb-1/active/present/subjunctive')
  })

  it('allows picking among multiple forms of the same verb', async () => {
    renderApp('/#/verbs/rkz-1')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    const derivedForms = screen.getByText(/Derived forms/i).nextElementSibling as HTMLElement
    await user.click(within(derivedForms).getByLabelText(/II.*Form.*to concentrate/i))

    expect(await screen.findByText('to concentrate', { exact: false, selector: 'p' })).toBeInTheDocument()
  })
})

describe('Builder navigation', () => {
  it('navigates when selecting a form-insights example while in Build tab', () => {
    renderApp('/#/verbs/qqq-2')
    fireEvent.click(screen.getByText('Build'))
    fireEvent.click(screen.getByText('I'))
    fireEvent.click(screen.getByLabelText(/View form insights/i))

    const dialog = screen.getByText('Form I insights').closest<HTMLElement>('[role="dialog"]')!
    const exampleLink = dialog.querySelector<HTMLAnchorElement>('a[href]')!
    const expectedPath = exampleLink.getAttribute('href')

    fireEvent.click(exampleLink)

    expect(window.location.hash).toBe(expectedPath)
  })

  it('updates the conjugation when the vowel pattern changes for a built Form I verb', () => {
    renderApp('/#/verbs/qqq-2')

    setBuildLetter(1, 'ب')
    setBuildLetter(2, 'ن')
    setBuildLetter(3, 'ر')
    fireEvent.click(getBuildButton('I'))
    fireEvent.click(getBuildButton('فَعَلَ / يَفعُلُ'))

    expect(screen.getAllByText('بَنَرَ').length).toBeGreaterThan(0)

    fireEvent.click(getBuildButton('فَعِلَ / يَفعَلُ'))

    expect(screen.getAllByText('بَنِرَ').length).toBeGreaterThan(0)
  })

  it('uses default masdar derivation when building an unknown Form I verb', () => {
    renderApp('/#/verbs/qqq-2')

    setBuildLetter(1, 'ث')
    setBuildLetter(2, 'ن')
    setBuildLetter(3, 'ي')
    fireEvent.click(getBuildButton('I'))
    fireEvent.click(getBuildButton('فَعَلَ / يَفعُلُ'))

    const detail = screen.getByText('Verbal noun').parentElement!
    expect(within(detail).getByText('مَثنَي')).toBeInTheDocument()
  })

  it('keeps selected tense when switching conjugation for a built Form I verb', async () => {
    renderApp('/#/verbs/qqq-2')
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    fireEvent.click(getBuildButton('I'))
    fireEvent.click(getBuildButton('فَعَلَ / يَفعُلُ'))
    await user.click(screen.getByText('Present'))

    expect(window.location.hash).toBe('#/verbs/qqq-1/active/present')
  })

  it('keeps Build tab selected when choosing an existing verb from builder controls', () => {
    renderApp('/#/verbs/qqq-2')

    expect(screen.getByText('Build')).toHaveAttribute('aria-selected', 'true')

    setBuildLetter(1, 'ك')
    setBuildLetter(2, 'ت')
    setBuildLetter(3, 'ب')
    fireEvent.click(getBuildButton('I'))
    fireEvent.click(getBuildButton('فَعَلَ / يَفعُلُ'))

    expect(screen.getByText('Build')).toHaveAttribute('aria-selected', 'true')
  })
})

describe('Recently viewed', () => {
  it('shows recently viewed verb pills in deduplicated most-recent-first order', () => {
    renderApp('/#/verbs/ktb-1')
    navigateTo('/#/verbs/bdl-1')
    navigateTo('/#/verbs/ktb-1')
    navigateTo('/#/verbs')

    const links = screen.getByText('Recently viewed').closest('section')!.querySelectorAll('a')

    expect(Array.from(links).map((link) => link.getAttribute('href'))).toEqual(['#/verbs/ktb-1', '#/verbs/bdl-1'])
  })

  it('excludes currently viewed verb pill', () => {
    renderApp('/#/verbs/bdl-1')
    navigateTo('/#/verbs/ktb-1')

    const links = screen.getByText('Recently viewed').closest('section')!.querySelectorAll('a')

    expect(Array.from(links).map((link) => link.getAttribute('href'))).toEqual(['#/verbs/bdl-1'])
  })

  it('does not crash when localStorage contains stale verb IDs', () => {
    localStorage.setItem('conjugator:recentVerbs', JSON.stringify(['nonexistent-99', 'sfr-1']))
    expect(() => renderApp('/#/verbs/ktb-1')).not.toThrow()
  })

  it('limits recently viewed verbs to ten entries', () => {
    renderApp('/#/verbs/ktb-1')
    for (const id of ['sfr-1', 'sfr-2', 'klm-2', 'wEd-1', 'lmm-1', 'rkz-1', 'bdl-1', 'krh-1', 'qwl-1', 'Elm-5']) {
      navigateTo(`/#/verbs/${id}`)
    }

    const links = screen.getByText('Recently viewed').closest('section')!.querySelectorAll('a')

    expect(links).toHaveLength(10)
  })
})

describe('routing', () => {
  it('defaults to conjugation mode on unknown routes', () => {
    renderApp('/#/unknown')

    expect(window.location.hash).toBe('#/verbs')
  })

  it('defaults to conjugation mode on invalid verb IDs', () => {
    renderApp('/#/verbs/invalid')

    expect(window.location.hash).toBe('#/verbs')
  })

  it('accepts verb IDs with non-alphanumeric characters', () => {
    renderApp('/#/verbs/nf*-1')

    expect(window.location.hash).toBe('#/verbs/nf*-1')
  })
})

function getBuildPanel(): HTMLElement {
  return document.getElementById('panel-content-build')!
}

function getBuildLetter(slotHeader: number): HTMLInputElement {
  return getBuildPanel().querySelector(
    `[role="group"][aria-labelledby="slot-header-${slotHeader - 1}"] input[type="text"]`,
  )!
}

function setBuildLetter(slotHeader: number, letter: string) {
  fireEvent.input(getBuildLetter(slotHeader), { data: letter, target: { value: letter } })
}

function getBuildButton(label: string): HTMLElement {
  return within(getBuildPanel()).getByText(label)
}
