import { cleanup, screen } from '@testing-library/preact'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { getVerbById } from '../../paradigms/verbs'
import { renderWithProviders } from '../../test/fixtures'
import { NominalInsights } from './NominalInsights'

beforeEach(() => cleanup())
afterEach(() => cleanup())

describe('NominalInsights', () => {
  describe('active participle', () => {
    function renderComponent() {
      renderWithProviders(<NominalInsights verb={getVerbById('ktb-1')!} nominal="activeParticiple" arabic="كَاتِب" />)
    }

    test('displays the Arabic form', () => {
      renderComponent()
      expect(document.body).toHaveTextContent('كَاتِب')
    })

    test('displays root letters', () => {
      renderComponent()
      expect(screen.getAllByText('ك').length).toBeGreaterThan(0)
      expect(screen.getAllByText('ت').length).toBeGreaterThan(0)
      expect(screen.getAllByText('ب').length).toBeGreaterThan(0)
    })

    test('displays form number', () => {
      renderComponent()
      expect(screen.getByText('I')).toBeInTheDocument()
    })

    test('displays base verb', () => {
      renderComponent()
      expect(screen.getAllByText('كَتَبَ').length).toBeGreaterThan(0)
    })
  })

  describe('passive participle', () => {
    test('displays the Arabic form', () => {
      renderWithProviders(<NominalInsights verb={getVerbById('ktb-1')!} nominal="passiveParticiple" arabic="مَكْتُوب" />)
      expect(document.body).toHaveTextContent('مَكْتُوب')
    })
  })

  describe('masdar', () => {
    test('displays the Arabic form', () => {
      renderWithProviders(<NominalInsights verb={getVerbById('ktb-1')!} nominal="masdar" arabic="كِتَابَة" />)
      expect(document.body).toHaveTextContent('كِتَابَة')
    })

    test('displays all masdars comma-separated', () => {
      renderWithProviders(<NominalInsights verb={getVerbById('wEd-1')!} nominal="masdar" arabic={['وَعْد', 'مَوْعِد']} />)
      expect(document.body).toHaveTextContent('وَعْد')
      expect(document.body).toHaveTextContent('مَوْعِد')
    })

    test('adds mimi-masdar explanation when one masdar is mimi', () => {
      renderWithProviders(<NominalInsights verb={getVerbById('wEd-1')!} nominal="masdar" arabic={['وَعْد', 'مَوْعِد']} />)
      expect(document.body).toHaveTextContent(/pattern مَفْعِل/)
    })

    test('shows lexicalized masdar label', () => {
      renderWithProviders(<NominalInsights verb={getVerbById('tmm-2')!} nominal="masdar" arabic={['تَتْمِيم', 'تَتِمَّة']} />)
      expect(screen.getByText('(lexicalized)')).toBeInTheDocument()
    })
  })

  test('displays q suffix for quadriliteral form numbers', () => {
    renderWithProviders(<NominalInsights verb={getVerbById('brhn-1')!} nominal="masdar" arabic="بَرهَنَة" />)
    expect(screen.getByText('Iq')).toBeInTheDocument()
  })
})
