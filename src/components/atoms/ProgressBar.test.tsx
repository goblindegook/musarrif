import { cleanup, render, screen } from '@testing-library/preact'
import { afterEach, expect, test } from 'vitest'
import { ProgressBar } from './ProgressBar'

afterEach(() => {
  cleanup()
})

test('passes accessibility attributes to progressbar root', () => {
  render(
    <ProgressBar
      value={4}
      max={10}
      role="progressbar"
      aria-label="Daily progress"
      aria-valuemin={0}
      aria-valuemax={10}
      aria-valuenow={4}
    />,
  )

  const progressbar = screen.getByRole('progressbar', { name: 'Daily progress' })
  expect(progressbar.getAttribute('aria-valuenow')).toBe('4')
  expect(progressbar.getAttribute('aria-valuemax')).toBe('10')
})
