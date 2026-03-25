import { cleanup, fireEvent, render, screen } from '@testing-library/preact'
import type { ComponentChildren } from 'preact'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { I18nProvider } from '../hooks/i18n'
import { RoutingProvider } from '../hooks/routing'
import { getVerb } from '../paradigms/verbs'
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

function renderComponent() {
  render(<ConjugationInsights verb={getVerb('كتب', 1)} verbTense={['active', 'past']} pronoun="3ms" arabic={'كَتَبَ'} />, {
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
    expect(screen.getByText('كَتَبَ')).toBeInTheDocument()
  })
})
