import { cleanup, render, screen } from '@testing-library/preact'
import type { ComponentChildren } from 'preact'
import { afterEach, describe, expect, test } from 'vitest'
import { I18nProvider } from '../../hooks/useI18n'
import { RoutingProvider } from '../../hooks/useRouting'
import { getVerbById, synthesizeVerb } from '../../paradigms/verbs'
import { VerbPill } from '../molecules/VerbPill'

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

describe('VerbPill', () => {
  describe('translation', () => {
    test('shows translation when corpus verb has one', () => {
      const verb = getVerbById('ktb-1')!
      render(<VerbPill verb={verb} />, { wrapper: Wrapper })
      expect(screen.getByText('to write')).toBeInTheDocument()
    })

    test('shows dash for synthetic verb even when translation key exists', () => {
      const verb = synthesizeVerb('فعل', 1, 'a-u')
      render(<VerbPill verb={verb} />, { wrapper: Wrapper })
      expect(screen.getByText('—')).toBeInTheDocument()
    })
  })

  describe('synthetic marker', () => {
    test('does not show asterisk for corpus verb', () => {
      const verb = getVerbById('ktb-1')!
      render(<VerbPill verb={verb} />, { wrapper: Wrapper })
      expect(screen.queryByText('*')).not.toBeInTheDocument()
    })

    test('shows asterisk for synthetic verb', () => {
      const verb = synthesizeVerb('فعل', 1, 'a-u')
      render(<VerbPill verb={verb} />, { wrapper: Wrapper })
      expect(screen.getByText('*')).toBeInTheDocument()
    })
  })

  test('shows q suffix for quadriliteral forms', () => {
    const verb = getVerbById('brhn-1')!
    render(<VerbPill verb={verb} />, { wrapper: Wrapper })
    expect(screen.getByText('Iq')).toBeInTheDocument()
  })
})
