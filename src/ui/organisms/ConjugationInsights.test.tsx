import { cleanup, fireEvent, screen } from '@testing-library/preact'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { getVerbById } from '../../paradigms/verbs'
import { renderWithProviders } from '../../test/fixtures'
import { ConjugationInsights } from './ConjugationInsights'

beforeEach(() => cleanup())
afterEach(() => cleanup())

function renderComponent(pronoun = '3ms', arabic = 'كَتَبَ') {
  renderWithProviders(
    <ConjugationInsights verb={getVerbById('ktb-1')!} verbTense="active.past" pronoun={pronoun} arabic={arabic} />,
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
      renderWithProviders(
        <ConjugationInsights verb={getVerbById('brhn-1')!} verbTense="active.past" pronoun="3ms" arabic="بَرهَنَ" />,
      )
      fireEvent.click(screen.getByLabelText('Show explanation for بَرهَنَ'))
      expect(screen.getByText('Form Iq')).toBeInTheDocument()
    })
  })

  test('dropped morphemes are rendered with strikethrough', () => {
    renderWithProviders(
      <ConjugationInsights verb={getVerbById('xrj-10')!} verbTense="active.future" pronoun="3ms" arabic="سَيَسْتَخْرِجُ" />,
    )
    fireEvent.click(screen.getByLabelText('Show explanation for سَيَسْتَخْرِجُ'))
    const dropped = screen.getAllByText('اِ')
    expect(dropped[0].tagName).toBe('DEL')
  })
})
