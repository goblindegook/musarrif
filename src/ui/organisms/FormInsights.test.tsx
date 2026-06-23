import { cleanup, screen } from '@testing-library/preact'
import { afterEach, describe, expect, test } from 'vitest'
import { buildVerbFromId } from '../../paradigms/verbs'
import { renderWithProviders } from '../../test/fixtures'
import { FormInsights } from './FormInsights'

afterEach(() => {
  cleanup()
})

describe('FormInsights', () => {
  test('shows the form explanation sentence', () => {
    const verb = buildVerbFromId('ktb-2')!
    renderWithProviders(<FormInsights verb={verb} />)
    expect(
      screen.getByText(
        'Notice the doubled middle consonant — that gemination is the Form II marker, typically adding intensity or a causative sense.',
      ),
    ).toBeInTheDocument()
  })

  describe('semantic anchor', () => {
    test('Form II shows "Causative · Intensive"', () => {
      const verb = buildVerbFromId('ktb-2')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(screen.getByText('Causative · Intensive')).toBeInTheDocument()
    })

    test('fa\'ala Form I shows "Base meaning · Action"', () => {
      const verb = buildVerbFromId('ktb-1')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(screen.getByText('Base meaning · Action')).toBeInTheDocument()
    })

    test('fa\'ila Form I shows "Base meaning · Intermediate"', () => {
      const verb = buildVerbFromId('Elm-1')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(screen.getByText('Base meaning · Intermediate')).toBeInTheDocument()
    })

    test('fa\'ula Form I shows "Base meaning · State · Quality"', () => {
      const verb = buildVerbFromId('Hsn-1')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(screen.getByText('Base meaning · State · Quality')).toBeInTheDocument()
    })
  })

  describe('quadriliteral vowel pattern', () => {
    test('Form Iq shows quadriliteral فَعلَلَ / يُفَعلِلُ pattern, not triliteral', () => {
      const verb = buildVerbFromId('brhn-1')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(screen.getByText('فَعلَلَ / يُفَعلِلُ')).toBeInTheDocument()
      expect(screen.queryByText('فَعَلَ / يَفعِلُ')).not.toBeInTheDocument()
    })
  })

  describe('BQI biliteral doubling', () => {
    test('BQI verb shows "Repetitive · Intensive" anchor', () => {
      const verb = buildVerbFromId('zlzl-1')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(screen.getByText('Repetitive · Intensive')).toBeInTheDocument()
    })

    test('BQI verb does not show generic "Base meaning" anchor', () => {
      const verb = buildVerbFromId('zlzl-1')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(screen.queryByText('Base meaning')).not.toBeInTheDocument()
    })

    test('generic Iq verb still shows "Base meaning" anchor', () => {
      const verb = buildVerbFromId('brhn-1')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(screen.getByText('Base meaning')).toBeInTheDocument()
    })

    test('BQI verb shows biliteral doubling explanation sentence', () => {
      const verb = buildVerbFromId('zlzl-1')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(screen.getByText(/biliteral root repeated twice/i, { selector: 'p' })).toBeInTheDocument()
    })

    test('generic Iq verb shows base four-consonant explanation sentence', () => {
      const verb = buildVerbFromId('brhn-1')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(screen.getByText(/four-consonant/i, { selector: 'p' })).toBeInTheDocument()
    })
  })

  describe('Form VIII assimilation sentence', () => {
    test('shows voicing assimilation for ز-initial Form VIII verb', () => {
      const verb = buildVerbFromId('zwj-8')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(
        screen.getByText('first radical is ز, expect the تَ infix to change to voiced دَ', {
          selector: 'p',
          exact: false,
        }),
      ).toBeInTheDocument()
    })

    test('shows complete assimilation for د-initial Form VIII verb', () => {
      const verb = buildVerbFromId('dxl-8')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(
        screen.getByText('first radical is د، ذ، ث، ط, or ظ, expect the تَ infix to assimilate completely', {
          selector: 'p',
          exact: false,
        }),
      ).toBeInTheDocument()
    })

    test('shows emphasis assimilation for ص-initial Form VIII verb', () => {
      const verb = buildVerbFromId('Sbr-8')!
      renderWithProviders(<FormInsights verb={verb} />)
      expect(
        screen.getByText('first radical is ص or ض, expect the تَ infix to shift to emphatic طَ', {
          selector: 'p',
          exact: false,
        }),
      ).toBeInTheDocument()
    })
  })
})
