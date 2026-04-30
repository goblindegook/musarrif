import { cleanup, fireEvent, render, screen, within } from '@testing-library/preact'
import { afterEach, describe, expect, it, test, vi } from 'vitest'

import { I18nProvider } from '../../hooks/useI18n'
import { RoutingProvider } from '../../hooks/useRouting'
import type { Mood, Tense, Voice } from '../../paradigms/tense'
import { ConjugationMode } from './ConjugationMode'

const normalizeButtonText = (text: string | null) => text?.replace(/\s+/g, ' ').trim()

interface ConjugationModeRenderProps {
  verbId: string
  voice?: Voice
  tense?: Tense
  mood?: Mood
}

const renderConjugationMode = ({ verbId, voice, tense, mood }: ConjugationModeRenderProps) => {
  cleanup()
  window.history.replaceState({}, '', '/')
  render(
    <RoutingProvider>
      <I18nProvider>
        <ConjugationMode verbId={verbId} voice={voice} tense={tense} mood={mood} />
      </I18nProvider>
    </RoutingProvider>,
  )
}

afterEach(() => {
  document.title = ''
  window.localStorage.clear()
  cleanup()
  vi.restoreAllMocks()
})

test.each([
  ['klm-2', 'كَلَّمَ'],
  ['sfr-1', 'سَفَرَ'],
  ['sfr-2', 'سَفَّرَ'],
  ["bd'-1", 'بَدَأَ'],
])('renders %s as %s', (id, expectedPast) => {
  renderConjugationMode({ verbId: id })

  expect(screen.getAllByText(expectedPast).length).toBeGreaterThan(0)
})

test('shows translation subtitle for corpus verb with known translation', () => {
  renderConjugationMode({ verbId: 'ktb-1' })
  const heading = screen.getAllByRole('heading', { level: 2 })[0]
  const titleGroup = heading.parentElement!
  expect(within(titleGroup).getByText('to write')).toBeInTheDocument()
})

test('shows multiple masdars with a mimi label', () => {
  window.localStorage.setItem('conjugator:diacriticsPreference', 'all')
  renderConjugationMode({ verbId: 'wEd-1' })

  const detail = screen.getByText('Verbal nouns').parentElement!
  expect(within(detail).getByText('وَعْد')).toBeInTheDocument()
  expect(within(detail).getByText('مَوْعِد')).toBeInTheDocument()
  expect(within(detail).getByText('(mimi)')).toBeInTheDocument()
})

test('loads لَيْسَ without deriving unavailable nominals', () => {
  expect(() => renderConjugationMode({ verbId: 'lys-1' })).not.toThrow()

  const masdarDetail = screen.getByText('Verbal noun').parentElement!
  const activeDetail = screen.getByText('Active participle').parentElement!
  const passiveDetail = screen.getByText('Passive participle').parentElement!

  expect(within(masdarDetail).getByText('—')).toBeInTheDocument()
  expect(within(activeDetail).getByText('—')).toBeInTheDocument()
  expect(within(passiveDetail).getByText('—')).toBeInTheDocument()
})

describe('Conjugation table', () => {
  it('shows full tense label in header for active past', () => {
    renderConjugationMode({ verbId: 'ktb-1', voice: 'active', tense: 'past' })

    expect(screen.getByText('Active Past')).toBeInTheDocument()
  })

  it('shows active and passive voice tabs', () => {
    renderConjugationMode({ verbId: 'ktb-1' })

    const voiceTabs = document.querySelector('[role="tablist"][aria-label="Select voice"]')!
    const tabs = Array.from(voiceTabs.querySelectorAll('[role="tab"]'))
    const activeTab = tabs.find((tab) => tab.textContent === 'Active')
    const passiveTab = tabs.find((tab) => tab.textContent === 'Passive')
    expect(activeTab?.getAttribute('aria-selected')).toBe('true')
    expect(passiveTab?.getAttribute('aria-selected')).toBe('false')
  })

  it('shows mood tabs for passive present tense', () => {
    renderConjugationMode({ verbId: 'ktb-1', voice: 'passive', tense: 'present', mood: 'indicative' })

    const moodTabs = document.querySelector<HTMLElement>('[role="tablist"][aria-label="Select mood"]')!
    expect(within(moodTabs).getByText('Indicative')).toBeInTheDocument()
    expect(within(moodTabs).getByText('Subjunctive')).toBeInTheDocument()
    expect(within(moodTabs).getByText('Jussive')).toBeInTheDocument()
  })

  it('shows only the active voice tab when passive is unavailable', () => {
    renderConjugationMode({ verbId: 'Zll-1' })

    const voiceTabs = document.querySelector('[role="tablist"][aria-label="Select voice"]')!
    const tabs = Array.from(voiceTabs.querySelectorAll('[role="tab"]'))
    const activeTab = tabs.find((tab) => tab.textContent === 'Active')
    const passiveTab = tabs.find((tab) => tab.textContent === 'Passive')
    expect(activeTab?.getAttribute('aria-selected')).toBe('true')
    expect(passiveTab).toBeUndefined()
  })
})

describe('Form', () => {
  it.each([
    ['ktb-1', '◌َ / ◌ُ'],
    ['qwl-1', '◌َ / ◌ُ'],
    ['bdl-1', '◌َ / ◌ِ'],
  ])('detail for verb %s indicates vowels %s', (id, expected) => {
    renderConjugationMode({ verbId: id })

    const formLabel = screen.getByText('Form')
    const formDetail = formLabel.parentElement as HTMLElement
    const vowels = within(formDetail).getByText(expected)

    expect(vowels.textContent).toBe(expected)
  })

  it('has insights with linked examples', async () => {
    renderConjugationMode({ verbId: 'Elm-5' })
    fireEvent.click(screen.getByLabelText(/View form insights/i))

    const dialog = screen.getByText('Form V insights').closest('[role="dialog"]') as HTMLElement
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
    renderConjugationMode({ verbId: 'bdl-1' })
    fireEvent.click(screen.getByLabelText('View form insights for Form I'))
    const dialog = screen.getByText('Form I insights').closest('[role="dialog"]') as HTMLElement
    expect(within(dialog).getByText('فَعَلَ / يَفعِلُ')).toBeInTheDocument()
  })

  it('shows both past and present patterns in non-Form-I insights', () => {
    renderConjugationMode({ verbId: 'Elm-5' })
    fireEvent.click(screen.getByLabelText('View form insights for Form V'))
    const dialog = screen.getByText('Form V insights').closest('[role="dialog"]') as HTMLElement
    expect(within(dialog).getByText('تَفَعَّلَ / يَتَفَعَّلُ')).toBeInTheDocument()
  })

  it('appends q to form labels for quadriliteral verbs', () => {
    renderConjugationMode({ verbId: 'jlEb-4' })

    const formLabel = screen.getByText('Form')
    const formDetail = formLabel.parentElement as HTMLElement
    expect(within(formDetail).getByText('IVq')).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('View form insights for Form IVq'))
    expect(screen.getByText('Form IVq insights')).toBeInTheDocument()
  })

  it('shows only quadriliteral examples for quadriliteral forms', () => {
    renderConjugationMode({ verbId: 'jlEb-4' })

    fireEvent.click(screen.getByLabelText('View form insights for Form IVq'))
    const dialog = screen.getByText('Form IVq insights').closest('[role="dialog"]') as HTMLElement
    const links = Array.from(dialog.querySelectorAll<HTMLAnchorElement>('a[aria-label]'))

    expect(links.length).toBeGreaterThan(0)
    expect(links.every((link) => link.getAttribute('aria-label')?.includes(' - IVq - Form - '))).toBe(true)
  })

  it('shows only triliteral examples for triliteral forms', () => {
    renderConjugationMode({ verbId: 'ktb-4' })

    fireEvent.click(screen.getByLabelText('View form insights for Form IV'))
    const dialog = screen.getByText('Form IV insights').closest('[role="dialog"]') as HTMLElement
    const links = Array.from(dialog.querySelectorAll<HTMLAnchorElement>('a[aria-label]'))

    expect(links.length).toBeGreaterThan(0)
    expect(links.every((link) => link.getAttribute('aria-label')?.includes(' - IV - Form - '))).toBe(true)
  })
})

test('Show a feedback panel with an issues link', () => {
  renderConjugationMode({ verbId: 'ktb-1' })
  const link = screen.getByText('Report a problem')
  expect(link).toHaveAttribute('href', 'https://github.com/goblindegook/musarrif/issues')
})

test('Show quick picks related to the selected verb', () => {
  renderConjugationMode({ verbId: 'krh-1' })
  const quickPicksHeading = screen.getByText('Quick picks')
  const buttons = Array.from(quickPicksHeading.nextElementSibling!.children)
  expect(buttons.map((button) => normalizeButtonText(button.textContent))).toEqual([
    'بَرهَنَIqto prove',
    'تَأَوَّهَVto moan',
    'بَرِحَIto leave',
    'تَبَرَّعَVto donate',
    'بارىIIIto compete',
  ])
})

test('Order derived form options by form number', () => {
  renderConjugationMode({ verbId: 'bdl-1' })
  const derivedFormHeading = screen.getByText('Derived forms')
  const formLabels = Array.from(derivedFormHeading.nextElementSibling!.children)
    .map((button) => button.getAttribute('aria-label')!)
    .map((label) => label.match(/-\s([IVX]+)\s-\sForm/i)?.[1])
  expect(formLabels).toEqual(['I', 'II', 'IV', 'VI', 'X'])
})

describe('Root insights', () => {
  it('displays root semantics when available', async () => {
    renderConjugationMode({ verbId: 'ktb-1' })

    fireEvent.click(screen.getByLabelText(/View root insights/i))

    const dialog = screen.getByText('Root insights').closest<HTMLElement>('[role="dialog"]')!
    expect(within(dialog).getByText('writing')).toBeInTheDocument()
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

  it('pre-populates root and form when switching to Build tab with a selected verb', async () => {
    renderConjugationMode({ verbId: 'ktb-2' })

    fireEvent.click(screen.getByText('Build'))

    expect(getLetter(1)).toHaveValue('ك')
    expect(getLetter(2)).toHaveValue('ت')
    expect(getLetter(3)).toHaveValue('ب')
    expect(within(getBuildPanel()).getByText('II')).toHaveAttribute('aria-pressed', 'true')
  })

  it('opens Build tab and pre-populates the requested root for unknown verbs in the URL', () => {
    renderConjugationMode({ verbId: 'qqq-2' })

    expect(screen.getByText('Build')).toHaveAttribute('aria-selected', 'true')
    expect(getLetter(1)).toHaveValue('ق')
    expect(getLetter(2)).toHaveValue('ق')
    expect(getLetter(3)).toHaveValue('ق')
  })
})
