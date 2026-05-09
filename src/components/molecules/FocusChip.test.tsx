import { cleanup, fireEvent, render, screen } from '@testing-library/preact'
import { afterEach, expect, test, vi } from 'vitest'
import { FocusChip } from './FocusChip'

afterEach(cleanup)

const defaultProps = {
  label: 'Focus',
  clearLabel: 'Clear focus',
  pickerTitle: 'Select form',
  hint: 'Some review cards will be mixed in',
}

const threeOptions = [
  { label: 'I', value: 1 },
  { label: 'II', value: 2 },
  { label: 'III', value: 3 },
]

test('renders nothing when only one option is available', () => {
  const { container } = render(
    <FocusChip options={[{ label: 'I', value: 1 }]} value={null} onChange={() => {}} {...defaultProps} />,
  )
  expect(container.firstChild).toBeNull()
})

test('shows inactive chip when multiple options available and none selected', () => {
  render(<FocusChip options={threeOptions} value={null} onChange={() => {}} {...defaultProps} />)
  expect(screen.getByText(/focus/i).closest('button')).toBeInTheDocument()
})

test('opens picker on chip click showing only the provided options', () => {
  render(<FocusChip options={threeOptions} value={null} onChange={() => {}} {...defaultProps} />)
  fireEvent.click(screen.getByText(/focus/i).closest('button') as HTMLButtonElement)
  expect(screen.getByText('I', { selector: 'button' })).toBeInTheDocument()
  expect(screen.getByText('II', { selector: 'button' })).toBeInTheDocument()
  expect(screen.getByText('III', { selector: 'button' })).toBeInTheDocument()
  expect(screen.queryByText('IV', { selector: 'button' })).not.toBeInTheDocument()
})

test('shows hint text when picker is open', () => {
  render(<FocusChip options={threeOptions} value={null} onChange={() => {}} {...defaultProps} />)
  fireEvent.click(screen.getByText(/focus/i).closest('button') as HTMLButtonElement)
  expect(screen.getByText(/review cards will be mixed in/i)).toBeInTheDocument()
})

test('calls onChange with selected value and closes picker', () => {
  const onChange = vi.fn()
  render(<FocusChip options={threeOptions} value={null} onChange={onChange} {...defaultProps} />)
  fireEvent.click(screen.getByText(/focus/i).closest('button') as HTMLButtonElement)
  fireEvent.click(screen.getByText('III', { selector: 'button' }))
  expect(onChange).toHaveBeenCalledWith(3)
  expect(screen.queryByText('I', { selector: 'button' })).not.toBeInTheDocument()
})

test('shows active chip with option label when a value is selected', () => {
  render(<FocusChip options={threeOptions} value={3} onChange={() => {}} {...defaultProps} />)
  expect(screen.getByText(/III/)).toBeInTheDocument()
})

test('calls onChange(null) when clear button is clicked', () => {
  const onChange = vi.fn()
  render(<FocusChip options={threeOptions} value={3} onChange={onChange} {...defaultProps} />)
  fireEvent.click(screen.getByLabelText(/clear focus/i))
  expect(onChange).toHaveBeenCalledWith(null)
})

test('reopens picker when active chip is clicked', () => {
  render(<FocusChip options={threeOptions} value={3} onChange={() => {}} {...defaultProps} />)
  fireEvent.click(screen.getByText(/III/))
  expect(screen.getByText('I', { selector: 'button' })).toBeInTheDocument()
})
