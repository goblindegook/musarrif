import { cleanup, render, screen } from '@testing-library/preact'
import type { ComponentChildren } from 'preact'
import { afterEach, describe, expect, test } from 'vitest'
import { buildVerbFromId } from '../../paradigms/verbs'
import { I18nProvider } from '../hooks/useI18n'
import { RoutingProvider } from '../routes'
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
    test('Form I shows "Base meaning"', () => {
      const verb = buildVerbFromId('ktb-1')!
      render(<FormInsights verb={verb} />, { wrapper: Wrapper })
      expect(screen.getByText('Base meaning')).toBeInTheDocument()
    })

    test('Form II shows "Causative · Intensive"', () => {
      const verb = buildVerbFromId('ktb-2')!
      render(<FormInsights verb={verb} />, { wrapper: Wrapper })
      expect(screen.getByText('Causative · Intensive')).toBeInTheDocument()
    })
  })

  describe('quadriliteral vowel pattern', () => {
    test('Form Iq shows quadriliteral فَعلَلَ / يُفَعلِلُ pattern, not triliteral', () => {
      const verb = buildVerbFromId('brhn-1')!
      render(<FormInsights verb={verb} />, { wrapper: Wrapper })
      expect(screen.getByText('فَعلَلَ / يُفَعلِلُ')).toBeInTheDocument()
      expect(screen.queryByText('فَعَلَ / يَفعِلُ')).not.toBeInTheDocument()
    })
  })

  describe('BQI biliteral doubling', () => {
    test('BQI verb shows "Biliteral doubling · Repetition" anchor', () => {
      const verb = buildVerbFromId('zlzl-1')!
      render(<FormInsights verb={verb} />, { wrapper: Wrapper })
      expect(screen.getByText('Biliteral doubling · Repetition')).toBeInTheDocument()
    })

    test('BQI verb does not show generic "Base meaning" anchor', () => {
      const verb = buildVerbFromId('zlzl-1')!
      render(<FormInsights verb={verb} />, { wrapper: Wrapper })
      expect(screen.queryByText('Base meaning')).not.toBeInTheDocument()
    })

    test('generic Iq verb still shows "Base meaning" anchor', () => {
      const verb = buildVerbFromId('brhn-1')!
      render(<FormInsights verb={verb} />, { wrapper: Wrapper })
      expect(screen.getByText('Base meaning')).toBeInTheDocument()
    })

    test('BQI verb shows biliteral doubling explanation sentence', () => {
      const verb = buildVerbFromId('zlzl-1')!
      render(<FormInsights verb={verb} />, { wrapper: Wrapper })
      expect(screen.getByText(/Form Iq biliteral doubling/, { selector: 'p' })).toBeInTheDocument()
    })

    test('generic Iq verb shows base four-consonant explanation sentence', () => {
      const verb = buildVerbFromId('brhn-1')!
      render(<FormInsights verb={verb} />, { wrapper: Wrapper })
      expect(screen.getByText(/four-consonant/i, { selector: 'p' })).toBeInTheDocument()
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
