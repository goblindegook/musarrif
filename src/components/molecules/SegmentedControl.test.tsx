import { cleanup, fireEvent, render, screen } from '@testing-library/preact'
import { afterEach, expect, it, vi } from 'vitest'
import { SegmentedControl } from './SegmentedControl'

afterEach(() => {
  cleanup()
})

it('builds buttons from options and reports selection changes', () => {
  const onChange = vi.fn()

  render(
    <SegmentedControl
      aria-label="Difficulty"
      options={[
        { value: 'easy', label: 'Easy' },
        { value: 'medium', label: 'Medium' },
        { value: 'hard', label: 'Hard' },
      ]}
      value="medium"
      onChange={onChange}
    />,
  )

  expect(screen.getByRole('button', { name: 'Easy' })).toHaveAttribute('aria-pressed', 'false')
  expect(screen.getByRole('button', { name: 'Medium' })).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByRole('button', { name: 'Hard' })).toHaveAttribute('aria-pressed', 'false')

  fireEvent.click(screen.getByRole('button', { name: 'Hard' }))

  expect(onChange).toHaveBeenCalledWith('hard', 2)
})
