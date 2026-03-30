import { cleanup, render, screen } from '@testing-library/preact'
import type { ComponentChildren } from 'preact'
import { afterEach, describe, expect, test } from 'vitest'
import { I18nProvider } from '../../hooks/i18n'
import { RoutingProvider } from '../../hooks/routing'
import { buildVerbFromId, getVerbById } from '../../paradigms/verbs'
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
    test('shows translation when verb has one', () => {
      const verb = getVerbById('ktb-1')!
      render(<VerbPill verb={verb} />, { wrapper: Wrapper })
      expect(screen.getByText('to write')).toBeInTheDocument()
    })

    test('shows dash when verb has no translation', () => {
      const verb = buildVerbFromId('xyz-2')!
      render(<VerbPill verb={verb} />, { wrapper: Wrapper })
      expect(screen.getByText('—')).toBeInTheDocument()
    })
  })
})
