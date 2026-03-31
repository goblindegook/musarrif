import { cleanup, render, screen } from '@testing-library/preact'
import type { ComponentChildren } from 'preact'
import { afterEach, describe, expect, test } from 'vitest'
import { I18nProvider } from '../../hooks/i18n'
import { RoutingProvider } from '../../hooks/routing'
import { buildVerbFromId } from '../../paradigms/verbs'
import { FormInsights } from './FormInsights'

afterEach(() => {
  cleanup()
})

function Wrapper({ children }: { children: ComponentChildren }) {
  return (
    <RoutingProvider>
      <I18nProvider>{children}</I18nProvider>
    </RoutingProvider>
  )
}

describe('FormInsights', () => {
  test('shows the form explanation sentence', () => {
    const verb = buildVerbFromId('ktb-2')!
    render(<FormInsights verb={verb} />, { wrapper: Wrapper })
    expect(
      screen.getByText('Form II geminates the middle radical and often intensifies or causativizes the base action.'),
    ).toBeInTheDocument()
  })

  describe('semantic anchor', () => {
    test('Form II shows "Causative · Intensive" before the pattern', () => {
      const verb = buildVerbFromId('ktb-2')!
      render(<FormInsights verb={verb} />, { wrapper: Wrapper })
      const anchor = screen.getByTestId('form-semantic-anchor')
      const pattern = screen.getByTestId('form-pattern')
      expect(anchor).toBeInTheDocument()
      expect(anchor.textContent).toBe('Causative · Intensive')
      expect(anchor.compareDocumentPosition(pattern)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    })

    test('Form I shows "Base meaning"', () => {
      const verb = buildVerbFromId('ktb-1')!
      render(<FormInsights verb={verb} />, { wrapper: Wrapper })
      expect(screen.getByTestId('form-semantic-anchor').textContent).toBe('Base meaning')
    })

    test('Form X shows "Estimative · Requestive"', () => {
      const verb = buildVerbFromId('ktb-10')!
      render(<FormInsights verb={verb} />, { wrapper: Wrapper })
      expect(screen.getByTestId('form-semantic-anchor').textContent).toBe('Estimative · Requestive')
    })
  })

  describe('Form VIII assimilation sentence', () => {
    test('shows voicing assimilation for ز-initial Form VIII verb', () => {
      const verb = buildVerbFromId('zwj-8')!
      render(<FormInsights verb={verb} />, { wrapper: Wrapper })
      expect(
        screen.getByText(
          'Form VIII voicing assimilation: with first radical ز, the default infix تَ changes to voiced دَ (e.g., اِزْدَوَجَ).',
          { selector: 'p', exact: false },
        ),
      ).toBeInTheDocument()
    })

    test('shows complete assimilation for د-initial Form VIII verb', () => {
      const verb = buildVerbFromId('dxl-8')!
      render(<FormInsights verb={verb} />, { wrapper: Wrapper })
      expect(
        screen.getByText(
          'Form VIII complete assimilation: when the first radical is د، ذ، ث، ط, or ظ, the default infix تَ assimilates to that same consonant, producing a doubled consonant.',
          { selector: 'p', exact: false },
        ),
      ).toBeInTheDocument()
    })

    test('shows emphasis assimilation for ص-initial Form VIII verb', () => {
      const verb = buildVerbFromId('Sbr-8')!
      render(<FormInsights verb={verb} />, { wrapper: Wrapper })
      expect(
        screen.getByText(
          'Form VIII emphasis assimilation: with first radical ص or ض, the default infix تَ shifts to emphatic طَ.',
          { selector: 'p', exact: false },
        ),
      ).toBeInTheDocument()
    })
  })
})
