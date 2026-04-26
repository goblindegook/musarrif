import { cleanup, fireEvent, render, screen } from '@testing-library/preact'
import type { ComponentChildren } from 'preact'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { I18nProvider } from '../../hooks/i18n'
import { RoutingProvider } from '../../hooks/routing'
import { getVerbById } from '../../paradigms/verbs'
import { ConjugationInsights } from './ConjugationInsights'

beforeEach(() => cleanup())
afterEach(() => cleanup())

function Wrapper({ children }: { children: ComponentChildren }) {
  return (
    <RoutingProvider>
      <I18nProvider>{children}</I18nProvider>
    </RoutingProvider>
  )
}

function renderComponent(pronoun = '3ms', arabic = 'كَتَبَ') {
  render(
    <ConjugationInsights verb={getVerbById('ktb-1')!} verbTense="active.past" pronoun={pronoun} arabic={arabic} />,
    {
      wrapper: Wrapper,
    },
  )
}

describe('ConjugationInsights', () => {
  test('clicking the trigger opens the modal', () => {
    renderComponent()
    fireEvent.click(screen.getByLabelText(`Show explanation for كَتَبَ`))
    expect(screen.getByText('Conjugation insights')).toBeInTheDocument()
  })

  test('modal displays the Arabic form', () => {
    renderComponent()
    fireEvent.click(screen.getByLabelText(`Show explanation for كَتَبَ`))
    expect(screen.getAllByText('كَتَبَ').length).toBeGreaterThan(0)
  })

  describe('derivation steps (active past)', () => {
    test('shows Root step with root consonants', () => {
      renderComponent('1s', 'كَتَبْتُ')
      fireEvent.click(screen.getByLabelText('Show explanation for كَتَبْتُ'))
      expect(screen.getByText('Root')).toBeInTheDocument()
      expect(screen.getByText('ك')).toBeInTheDocument()
      expect(screen.getByText('ت')).toBeInTheDocument()
      expect(screen.getByText('ب')).toBeInTheDocument()
    })

    test('shows Form step with form label', () => {
      renderComponent('1s', 'كَتَبْتُ')
      fireEvent.click(screen.getByLabelText('Show explanation for كَتَبْتُ'))
      expect(screen.getByText('Form I')).toBeInTheDocument()
    })

    test('shows pronoun step label for non-3ms', () => {
      renderComponent('1s', 'كَتَبْتُ')
      fireEvent.click(screen.getByLabelText('Show explanation for كَتَبْتُ'))
      expect(screen.getByText('1st person singular')).toBeInTheDocument()
    })

    test('3ms has only two steps (no pronoun row)', () => {
      renderComponent('3ms', 'كَتَبَ')
      fireEvent.click(screen.getByLabelText('Show explanation for كَتَبَ'))
      expect(screen.queryByText('3rd person masculine singular')).not.toBeInTheDocument()
    })

    test('quadriliteral form label includes q suffix', () => {
      render(
        <ConjugationInsights verb={getVerbById('brhn-1')!} verbTense="active.past" pronoun="3ms" arabic="بَرهَنَ" />,
        { wrapper: Wrapper },
      )
      fireEvent.click(screen.getByLabelText('Show explanation for بَرهَنَ'))
      expect(screen.getByText('Form Iq')).toBeInTheDocument()
    })
  })

  test('dropped morphemes are rendered with strikethrough', () => {
    render(
      <ConjugationInsights verb={getVerbById('xrj-10')!} verbTense="active.future" pronoun="3ms" arabic="سَيَسْتَخْرِجُ" />,
      {
        wrapper: Wrapper,
      },
    )
    fireEvent.click(screen.getByLabelText('Show explanation for سَيَسْتَخْرِجُ'))
    const dropped = screen.getAllByText('اِ')
    expect(dropped[0].tagName).toBe('DEL')
  })
})
