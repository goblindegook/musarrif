import { cleanup, screen } from '@testing-library/preact'
import { afterEach, describe, expect, test } from 'vitest'
import { renderWithProviders } from '../../test/fixtures'
import { RootInsights } from './RootInsights'

afterEach(() => {
  cleanup()
})

describe('RootInsights', () => {
  test('biliteral quadriliteral root shows the repetition description', () => {
    renderWithProviders(<RootInsights root="زلزل" rootId="root.zlzl" />)
    expect(
      screen.getByText(/first two radicals repeat as the third and fourth/i, { selector: 'p' }),
    ).toBeInTheDocument()
  })

  test('sound triliteral root shows the generic strong-root description', () => {
    renderWithProviders(<RootInsights root="كتب" rootId="root.ktb" />)
    expect(screen.getByText(/strong root with all radicals being consonants/i, { selector: 'p' })).toBeInTheDocument()
  })

  test('biliteral quadriliteral root with weak radicals shows both the weak-radical and the repetition description', () => {
    renderWithProviders(<RootInsights root="وسوس" rootId="root.wsws" />)
    expect(screen.getByText(/doubly weak root/i, { selector: 'p' })).toBeInTheDocument()
    expect(
      screen.getByText(/first two radicals repeat as the third and fourth/i, { selector: 'p' }),
    ).toBeInTheDocument()
  })
})
