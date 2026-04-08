import { cleanup, fireEvent, render, screen } from '@testing-library/preact'
import type { ComponentChildren } from 'preact'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { I18nProvider } from '../../hooks/i18n'
import { RoutingProvider } from '../../hooks/routing'
import { getVerb, getVerbById } from '../../paradigms/verbs'
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
  render(<ConjugationInsights verb={getVerb('كتب', 1)} verbTense="active.past" pronoun={pronoun} arabic={arabic} />, {
    wrapper: Wrapper,
  })
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

  describe('verb context details', () => {
    test('modal displays root letters', () => {
      renderComponent('1s', 'كَتَبْتُ')
      fireEvent.click(screen.getByLabelText('Show explanation for كَتَبْتُ'))
      expect(screen.getByText('ك')).toBeInTheDocument()
      expect(screen.getByText('ت')).toBeInTheDocument()
      expect(screen.getByText('ب')).toBeInTheDocument()
    })

    test('modal displays form number', () => {
      renderComponent('1s', 'كَتَبْتُ')
      fireEvent.click(screen.getByLabelText('Show explanation for كَتَبْتُ'))
      expect(screen.getByText('I')).toBeInTheDocument()
    })

    test('modal displays Form I vowel pattern', () => {
      renderComponent('1s', 'كَتَبْتُ')
      fireEvent.click(screen.getByLabelText('Show explanation for كَتَبْتُ'))
      expect(screen.getByText('◌َ / ◌ُ')).toBeInTheDocument()
    })

    test('modal displays base verb', () => {
      renderComponent('1s', 'كَتَبْتُ')
      fireEvent.click(screen.getByLabelText('Show explanation for كَتَبْتُ'))
      expect(screen.getByText('كَتَبَ')).toBeInTheDocument()
    })

    test('modal appends q to quadriliteral form number', () => {
      render(
        <ConjugationInsights verb={getVerbById('brhn-1')!} verbTense="active.past" pronoun="3ms" arabic="بَرهَنَ" />,
        { wrapper: Wrapper },
      )
      fireEvent.click(screen.getByLabelText('Show explanation for بَرهَنَ'))
      expect(screen.getByText('Iq')).toBeInTheDocument()
    })
  })
})
