import { cleanup, screen } from '@testing-library/preact'
import { afterEach, describe, expect, test } from 'vitest'
import { getVerbById, synthesizeVerb } from '../../paradigms/verbs'
import { renderWithProviders } from '../../test/fixtures'
import { VerbPill } from '../molecules/VerbPill'

afterEach(() => {
  cleanup()
})

describe('VerbPill', () => {
  describe('translation', () => {
    test('shows translation when corpus verb has one', () => {
      const verb = getVerbById('ktb-1')!
      renderWithProviders(<VerbPill verb={verb} />)
      expect(screen.getByText('to write')).toBeInTheDocument()
    })

    test('shows dash for synthetic verb even when translation key exists', () => {
      const verb = synthesizeVerb('فعل', 1, 'a-u')
      renderWithProviders(<VerbPill verb={verb} />)
      expect(screen.getByText('—')).toBeInTheDocument()
    })
  })

  describe('synthetic marker', () => {
    test('does not show asterisk for corpus verb', () => {
      const verb = getVerbById('ktb-1')!
      renderWithProviders(<VerbPill verb={verb} />)
      expect(screen.queryByText('*')).not.toBeInTheDocument()
    })

    test('shows asterisk for synthetic verb', () => {
      const verb = synthesizeVerb('فعل', 1, 'a-u')
      renderWithProviders(<VerbPill verb={verb} />)
      expect(screen.getByText('*')).toBeInTheDocument()
    })
  })

  test('shows q suffix for quadriliteral forms', () => {
    const verb = getVerbById('brhn-1')!
    renderWithProviders(<VerbPill verb={verb} />)
    expect(screen.getByText('Iq')).toBeInTheDocument()
  })
})
