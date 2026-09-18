import { cleanup, fireEvent, screen, within } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { currentUrl, renderApp } from '../test/fixtures'

beforeEach(() => {
  cleanup()
  localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Builder navigation', () => {
  it('navigates when building a known verb', () => {
    renderApp('/#/verbs')

    fireEvent.click(screen.getByText('Build'))
    setBuildLetter(1, 'ب')
    setBuildLetter(2, 'ن')
    setBuildLetter(3, 'ر')
    fireEvent.click(getBuildButton('I'))
    fireEvent.click(getBuildButton('فَعَلَ / يَفعُلُ'))

    expect(currentUrl()).toBe('/verbs/bnr-1-a-u/')
  })

  it('navigates when building an unknown verb', () => {
    renderApp('/#/verbs')

    fireEvent.click(screen.getByText('Build'))
    setBuildLetter(1, 'ث')
    setBuildLetter(2, 'ن')
    setBuildLetter(3, 'ي')
    fireEvent.click(getBuildButton('I'))
    fireEvent.click(getBuildButton('فَعَلَ / يَفعُلُ'))

    expect(currentUrl()).toBe('/verbs/vny-1-a-u/')
  })

  it('navigates when selecting a form-insights example while in Build tab', () => {
    renderApp('/#/verbs/qqq-2')
    fireEvent.click(screen.getByText('Build'))
    fireEvent.click(screen.getByText('I'))
    fireEvent.click(screen.getByLabelText(/View form insights/i))

    const dialog = screen.getByText('Form I insights').closest<HTMLElement>('[role="dialog"]')!
    const exampleLink = dialog.querySelector<HTMLAnchorElement>('a[href]')!
    const expectedPath = exampleLink.getAttribute('href')

    fireEvent.click(exampleLink)

    expect(currentUrl()).toBe(expectedPath)
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

    expect(currentUrl()).toBe('/verbs/qqq-1-a-u/active/present/')
  })

  it('keeps Build tab selected when choosing an existing verb from builder controls', () => {
    renderApp('/#/verbs/qqq-2')

    expect(screen.getByText('Build')).toHaveAttribute('aria-pressed', 'true')

    setBuildLetter(1, 'ك')
    setBuildLetter(2, 'ت')
    setBuildLetter(3, 'ب')
    fireEvent.click(getBuildButton('I'))
    fireEvent.click(getBuildButton('فَعَلَ / يَفعُلُ'))

    expect(screen.getByText('Build')).toHaveAttribute('aria-pressed', 'true')
  })
})

function getBuildPanel(): HTMLElement {
  return screen.getByText('Build', { selector: 'button' }).closest('section')!
}

function getBuildButton(label: string): HTMLElement {
  return within(getBuildPanel()).getByText(label)
}

function setBuildLetter(pos: number, letter: string) {
  const slotInput = within(getBuildPanel()).getByLabelText(`Root ${pos}`, { selector: 'input' })
  fireEvent.click(slotInput)
  fireEvent.click(within(slotInput.closest(`[role="group"]`)!).getByText(letter, { selector: '[role="option"]' }))
}
