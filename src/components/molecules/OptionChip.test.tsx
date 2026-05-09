import { cleanup, fireEvent, render, screen } from '@testing-library/preact'
import { afterEach, expect, test, vi } from 'vitest'
import { OptionChip } from './OptionChip'

afterEach(cleanup)

const groupA = {
  key: 'form',
  label: 'Form',
  options: [
    { label: 'I', value: 1 },
    { label: 'II', value: 2 },
    { label: 'III', value: 3 },
  ],
  pickerTitle: 'Select form',
}

const groupB = {
  key: 'tense',
  label: 'Tense',
  options: [
    { label: 'Active Past', value: 'active.past' },
    { label: 'Active Present', value: 'active.present.indicative' },
  ],
  pickerTitle: 'Select tense',
}

const defaultProps = {
  icon: '◎',
  label: 'Focus',
  clearLabel: 'Clear focus',
  backLabel: 'Back',
  pickerTitle: 'Drill by',
  hint: 'Some review cards will be mixed in',
}

test('renders nothing when total options across all groups is <= 1', () => {
  const { container } = render(
    <OptionChip
      groups={[{ key: 'form', label: 'Form', options: [{ label: 'I', value: 1 }], pickerTitle: 'Select form' }]}
      value={null}
      onChange={() => {}}
      {...defaultProps}
    />,
  )
  expect(container.firstChild).toBeNull()
})

test('renders nothing when no groups provided', () => {
  const { container } = render(<OptionChip groups={[]} value={null} onChange={() => {}} {...defaultProps} />)
  expect(container.firstChild).toBeNull()
})

test('shows inactive chip when options available and none selected', () => {
  render(<OptionChip groups={[groupA]} value={null} onChange={() => {}} {...defaultProps} />)
  expect(screen.getByText(/focus/i).closest('button')).toBeInTheDocument()
})

test('skips group step and opens value picker directly when only one group has options', () => {
  render(<OptionChip groups={[groupA]} value={null} onChange={() => {}} {...defaultProps} />)
  fireEvent.click(screen.getByText(/focus/i).closest('button') as HTMLButtonElement)
  expect(screen.getByText('I', { selector: 'button' })).toBeInTheDocument()
  expect(screen.getByText('II', { selector: 'button' })).toBeInTheDocument()
  expect(screen.queryByText('Form', { selector: 'button' })).not.toBeInTheDocument()
})

test('shows group picker as step 1 when multiple groups are available', () => {
  render(<OptionChip groups={[groupA, groupB]} value={null} onChange={() => {}} {...defaultProps} />)
  fireEvent.click(screen.getByText(/focus/i).closest('button') as HTMLButtonElement)
  expect(screen.getByText('Form', { selector: 'button' })).toBeInTheDocument()
  expect(screen.getByText('Tense', { selector: 'button' })).toBeInTheDocument()
  expect(screen.queryByText('I', { selector: 'button' })).not.toBeInTheDocument()
})

test('advances to value picker after selecting a group', () => {
  render(<OptionChip groups={[groupA, groupB]} value={null} onChange={() => {}} {...defaultProps} />)
  fireEvent.click(screen.getByText(/focus/i).closest('button') as HTMLButtonElement)
  fireEvent.click(screen.getByText('Tense', { selector: 'button' }))
  expect(screen.getByText('Active Past', { selector: 'button' })).toBeInTheDocument()
  expect(screen.queryByText('Form', { selector: 'button' })).not.toBeInTheDocument()
})

test('shows back button in value picker step when multiple groups', () => {
  render(<OptionChip groups={[groupA, groupB]} value={null} onChange={() => {}} {...defaultProps} />)
  fireEvent.click(screen.getByText(/focus/i).closest('button') as HTMLButtonElement)
  fireEvent.click(screen.getByText('Tense', { selector: 'button' }))
  expect(screen.getByLabelText(/back/i)).toBeInTheDocument()
})

test('back button returns to group picker', () => {
  render(<OptionChip groups={[groupA, groupB]} value={null} onChange={() => {}} {...defaultProps} />)
  fireEvent.click(screen.getByText(/focus/i).closest('button') as HTMLButtonElement)
  fireEvent.click(screen.getByText('Tense', { selector: 'button' }))
  fireEvent.click(screen.getByLabelText(/back/i))
  expect(screen.getByText('Form', { selector: 'button' })).toBeInTheDocument()
})

test('calls onChange with groupKey and value, then closes picker', () => {
  const onChange = vi.fn()
  render(<OptionChip groups={[groupA, groupB]} value={null} onChange={onChange} {...defaultProps} />)
  fireEvent.click(screen.getByText(/focus/i).closest('button') as HTMLButtonElement)
  fireEvent.click(screen.getByText('Tense', { selector: 'button' }))
  fireEvent.click(screen.getByText('Active Past', { selector: 'button' }))
  expect(onChange).toHaveBeenCalledWith({ groupKey: 'tense', value: 'active.past' })
  expect(screen.queryByText('Active Past', { selector: 'button' })).not.toBeInTheDocument()
})

test('calls onChange with groupKey and value for single-group case', () => {
  const onChange = vi.fn()
  render(<OptionChip groups={[groupA]} value={null} onChange={onChange} {...defaultProps} />)
  fireEvent.click(screen.getByText(/focus/i).closest('button') as HTMLButtonElement)
  fireEvent.click(screen.getByText('III', { selector: 'button' }))
  expect(onChange).toHaveBeenCalledWith({ groupKey: 'form', value: 3 })
})

test('shows active chip with selected option label only', () => {
  render(
    <OptionChip
      groups={[groupA, groupB]}
      value={{ groupKey: 'tense', value: 'active.past' }}
      onChange={() => {}}
      {...defaultProps}
    />,
  )
  expect(screen.getByText('Active Past')).toBeInTheDocument()
})

test('calls onChange(null) when clear button is clicked', () => {
  const onChange = vi.fn()
  render(<OptionChip groups={[groupA]} value={{ groupKey: 'form', value: 3 }} onChange={onChange} {...defaultProps} />)
  fireEvent.click(screen.getByLabelText(/clear focus/i))
  expect(onChange).toHaveBeenCalledWith(null)
})

test('reopens picker when active chip is clicked', () => {
  render(<OptionChip groups={[groupA]} value={{ groupKey: 'form', value: 3 }} onChange={() => {}} {...defaultProps} />)
  fireEvent.click(screen.getByText('III'))
  expect(screen.getByText('I', { selector: 'button' })).toBeInTheDocument()
})

test('shows hint text when picker is open', () => {
  render(<OptionChip groups={[groupA]} value={null} onChange={() => {}} {...defaultProps} />)
  fireEvent.click(screen.getByText(/focus/i).closest('button') as HTMLButtonElement)
  expect(screen.getByText(/review cards will be mixed in/i)).toBeInTheDocument()
})

test('icon is rendered from prop', () => {
  render(<OptionChip groups={[groupA]} value={null} onChange={() => {}} {...defaultProps} icon="★" />)
  expect(screen.getByText('★')).toBeInTheDocument()
})
