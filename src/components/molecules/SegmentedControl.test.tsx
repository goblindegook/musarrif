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

  expect(screen.getByText('Easy', { selector: 'button' })).toHaveAttribute('aria-pressed', 'false')
  expect(screen.getByText('Medium', { selector: 'button' })).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByText('Hard', { selector: 'button' })).toHaveAttribute('aria-pressed', 'false')

  fireEvent.click(screen.getByText('Hard', { selector: 'button' }))

  expect(onChange).toHaveBeenCalledWith('hard', 2)
})
