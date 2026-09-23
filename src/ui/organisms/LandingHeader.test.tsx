import { cleanup, fireEvent, screen } from '@testing-library/preact'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { renderWithProviders } from '../../test/fixtures'
import { LandingHeader } from './LandingHeader'

beforeEach(() => {
  window.history.replaceState({}, '', '/')
})

afterEach(() => {
  cleanup()
  localStorage.clear()
})

it('stays on the landing page until the reader picks a mode', () => {
  const onLeave = vi.fn()
  renderWithProviders(<LandingHeader onLeave={onLeave} />)
  expect(screen.getByText('Muṣarrif')).toBeInTheDocument()
  expect(onLeave).not.toHaveBeenCalled()
})

it('leaves the landing page when the reader picks Exercise', () => {
  const onLeave = vi.fn()
  renderWithProviders(<LandingHeader onLeave={onLeave} />)
  fireEvent.click(screen.getByText('Exercise').closest('button')!)
  expect(window.location.pathname).toBe('/test/')
  expect(onLeave).toHaveBeenCalledTimes(1)
})

it('opens the tour after leaving the landing page when the reader asks for help', () => {
  localStorage.setItem('conjugator:tourSeen', 'true')
  const onLeave = vi.fn()
  renderWithProviders(<LandingHeader onLeave={onLeave} />)
  fireEvent.click(screen.getByLabelText('Open tour'))
  expect(window.location.pathname).toBe('/verbs/')
  expect(localStorage.getItem('conjugator:tourSeen')).toBe('false')
  expect(onLeave).toHaveBeenCalledTimes(1)
})
