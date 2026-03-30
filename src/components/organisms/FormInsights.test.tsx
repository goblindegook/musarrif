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
})
