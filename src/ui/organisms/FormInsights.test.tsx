import { cleanup, screen } from '@testing-library/preact'
import { afterEach, describe, expect, test } from 'vitest'
import { getVerbById } from '../../paradigms/verbs'
import { renderWithProviders } from '../../test/fixtures'
import { FormInsights } from './FormInsights'

afterEach(() => {
  cleanup()
})

describe('FormInsights', () => {
  test('shows the form explanation sentence', () => {
    const verb = getVerbById('ktb-2')!
    renderWithProviders(<FormInsights verb={verb} />)
    expect(document.body).toHaveTextContent('Form II')
  })

  describe('semantic anchor', () => {
    test('Form II shows "Causative · Intensive"', () => {
      const verb = getVerbById('ktb-2')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(screen.getByText('Causative · Intensive')).toBeInTheDocument()
    })

    test('fa\'ala Form I shows "Base meaning · Action"', () => {
      const verb = getVerbById('ktb-1')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(screen.getByText('Base meaning · Action')).toBeInTheDocument()
    })

    test('fa\'ila Form I shows "Base meaning · Intermediate"', () => {
      const verb = getVerbById('Elm-1')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(screen.getByText('Base meaning · Intermediate')).toBeInTheDocument()
    })

    test('fa\'ula Form I shows "Base meaning · State · Quality"', () => {
      const verb = getVerbById('Hsn-1')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(screen.getByText('Base meaning · State · Quality')).toBeInTheDocument()
    })
  })

  describe('quadriliteral vowel pattern', () => {
    test('Form Iq shows quadriliteral فَعلَلَ / يُفَعلِلُ pattern, not triliteral', () => {
      const verb = getVerbById('brhn-1')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(screen.getByText('فَعلَلَ / يُفَعلِلُ')).toBeInTheDocument()
      expect(screen.queryByText('فَعَلَ / يَفعِلُ')).not.toBeInTheDocument()
    })
  })

  describe('quadriliteral semantic anchor', () => {
    test('biliteral Iq verb shows the same "Base meaning" anchor as any Iq verb', () => {
      const verb = getVerbById('zlzl-1')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(screen.getByText('Base meaning')).toBeInTheDocument()
    })

    test('generic Iq verb still shows "Base meaning" anchor', () => {
      const verb = getVerbById('brhn-1')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(screen.getByText('Base meaning')).toBeInTheDocument()
    })

    test('BQI verb shows the same base four-consonant explanation sentence as generic Iq', () => {
      const verb = getVerbById('zlzl-1')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(document.body).toHaveTextContent('فَعلَلَ')
    })

    test('generic Iq verb shows base four-consonant explanation sentence', () => {
      const verb = getVerbById('brhn-1')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(document.body).toHaveTextContent('فَعلَلَ')
    })
  })

  describe('Form VIII assimilation sentence', () => {
    test('shows voicing assimilation for ز-initial Form VIII verb', () => {
      const verb = getVerbById('zwj-8')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(document.body).toHaveTextContent('voiced')
    })

    test('shows complete assimilation for د-initial Form VIII verb', () => {
      const verb = getVerbById('dxl-8')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(document.body).toHaveTextContent('د، ذ، ث، ط')
    })

    test('shows emphasis assimilation for ص-initial Form VIII verb', () => {
      const verb = getVerbById('Sbr-8')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(document.body).toHaveTextContent('emphatic')
    })
  })
})
