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

  const progressbar = screen.getByLabelText('Daily progress')
  expect(progressbar).toHaveAttribute('aria-valuenow', '4')
  expect(progressbar).toHaveAttribute('aria-valuemax', '10')
})
