import { cleanup, render, screen } from '@testing-library/preact'
import type { ComponentChildren } from 'preact'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { I18nProvider } from '../../hooks/useI18n'
import { RoutingProvider } from '../../hooks/useRouting'
import { getVerbById } from '../../paradigms/verbs'
import { NominalInsights } from './NominalInsights'

beforeEach(() => cleanup())
afterEach(() => cleanup())

function Wrapper({ children }: { children: ComponentChildren }) {
  return (
    <RoutingProvider>
      <I18nProvider>{children}</I18nProvider>
    </RoutingProvider>
  )
}

describe('NominalInsights', () => {
  describe('active participle', () => {
    function renderComponent() {
      render(<NominalInsights verb={getVerbById('ktb-1')!} nominal="activeParticiple" arabic="كَاتِب" />, {
        wrapper: Wrapper,
      })
    }

    test('displays the Arabic form', () => {
      renderComponent()
      expect(screen.getAllByText('كَاتِب').length).toBeGreaterThan(0)
    })

    test('displays root letters', () => {
      renderComponent()
      expect(screen.getByText('ك')).toBeInTheDocument()
      expect(screen.getByText('ت')).toBeInTheDocument()
      expect(screen.getByText('ب')).toBeInTheDocument()
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
      render(<NominalInsights verb={getVerbById('ktb-1')!} nominal="passiveParticiple" arabic="مَكْتُوب" />, {
        wrapper: Wrapper,
      })
      expect(screen.getAllByText('مَكْتُوب').length).toBeGreaterThan(0)
    })
  })

  describe('masdar', () => {
    test('displays the Arabic form', () => {
      render(<NominalInsights verb={getVerbById('ktb-1')!} nominal="masdar" arabic="كِتَابَة" />, {
        wrapper: Wrapper,
      })
      expect(screen.getAllByText('كِتَابَة').length).toBeGreaterThan(0)
    })

    test('displays all masdars comma-separated', () => {
      render(<NominalInsights verb={getVerbById('wEd-1')!} nominal="masdar" arabic={['وَعْد', 'مَوْعِد']} />, {
        wrapper: Wrapper,
      })
      expect(screen.getByText('وَعْد')).toBeInTheDocument()
      expect(screen.getByText('مَوْعِد')).toBeInTheDocument()
    })

    test('adds mimi-masdar explanation when one masdar is mimi', () => {
      render(<NominalInsights verb={getVerbById('wEd-1')!} nominal="masdar" arabic={['وَعْد', 'مَوْعِد']} />, {
        wrapper: Wrapper,
      })
      expect(screen.getByText(/المصدر الميمي/)).toBeInTheDocument()
    })
  })

  test('displays q suffix for quadriliteral form numbers', () => {
    render(<NominalInsights verb={getVerbById('brhn-1')!} nominal="masdar" arabic="بَرهَنَة" />, {
      wrapper: Wrapper,
    })
    expect(screen.getByText('Iq')).toBeInTheDocument()
  })
})
