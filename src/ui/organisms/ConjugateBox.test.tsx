import { act, fireEvent, screen, within } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { tokenize } from '../../paradigms/tokens'
import { renderWithProviders } from '../../test/fixtures'
import { ConjugateBox } from './ConjugateBox'

const noop = () => {}

describe('ConjugateBox', () => {
  test('pattern selector is not shown before Form I is selected', () => {
    renderWithProviders(<ConjugateBox onSelect={noop} />)

    expect(screen.queryByText('فَعَلَ / يَفعُلُ')).not.toBeInTheDocument()
  })

  test('pattern selector appears when Form I is selected', async () => {
    renderWithProviders(<ConjugateBox onSelect={noop} />)

    fireEvent.click(screen.getByText('I', { selector: 'button' }))

    expect(screen.getByText('فَعَلَ / يَفعُلُ')).toBeInTheDocument()
  })

  test('pattern selector is hidden when Form II is selected after Form I', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ConjugateBox onSelect={noop} />)

    await user.click(screen.getByText('I', { selector: 'button' }))
    await user.click(screen.getByText('II', { selector: 'button' }))

    expect(screen.queryByText('فَعَلَ / يَفعُلُ')).not.toBeInTheDocument()
  })

  test('each letter slot has a text input', () => {
    renderWithProviders(<ConjugateBox onSelect={noop} />)

    expect(screen.getByLabelText('Root 1', { selector: 'input' })).toBeInTheDocument()
    expect(screen.getByLabelText('Root 2', { selector: 'input' })).toBeInTheDocument()
    expect(screen.getByLabelText('Root 3', { selector: 'input' })).toBeInTheDocument()
  })

  test('slot header labels the slot input', () => {
    renderWithProviders(<ConjugateBox onSelect={noop} />)

    expect(screen.getByLabelText('Root 1', { selector: 'input' })).toBeInTheDocument()
    expect(screen.getByLabelText('Root 2', { selector: 'input' })).toBeInTheDocument()
    expect(screen.getByLabelText('Root 3', { selector: 'input' })).toBeInTheDocument()
  })

  test('focusing a slot input shows popup with valid letters for that slot', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ConjugateBox onSelect={noop} />)

    const c1Input = screen.getByLabelText('Root 1', { selector: 'input' })
    const c1Group = c1Input.closest('[role="group"]') as HTMLElement
    await user.click(c1Input)

    const popup = c1Group.querySelector<HTMLElement>('[role="listbox"]')!
    const options = within(popup).getAllByText(/./)
    expect(options.length).toBeGreaterThan(0)
    expect(within(popup).getByText('ك')).toBeInTheDocument()
  })

  test('slot input links combobox metadata to listbox and active option', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ConjugateBox onSelect={noop} />)

    const input = screen.getByLabelText('Root 1', { selector: 'input' })
    await user.click(input)
    await user.keyboard('{ArrowDown}')

    const listbox = within(input.closest('[role="group"]')!).getByRole('listbox')
    const optionIds = within(listbox)
      .getAllByRole('option')
      .map((option) => option.id)
    expect(input).toHaveAttribute('role', 'combobox')
    expect(input).toHaveAttribute('aria-controls', listbox.id)
    expect(listbox).toHaveAttribute('role', 'listbox')
    expect(optionIds).toContain(input.getAttribute('aria-activedescendant'))
  })

  test('keyboard navigation selects the highlighted letter with Enter', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ConjugateBox onSelect={noop} />)

    const input = screen.getByLabelText('Root 1', { selector: 'input' })
    await user.click(input)
    await user.keyboard('{ArrowDown}{Enter}')

    expect(input).toHaveValue('ب')
    expect(input.closest('[role="group"]')!.querySelector('[role="listbox"]')).toBeNull()
  })

  test('escape closes the letter listbox', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ConjugateBox onSelect={noop} />)

    const input = screen.getByLabelText('Root 1', { selector: 'input' })
    await user.click(input)
    expect(input.closest('[role="group"]')!.querySelector('[role="listbox"]')).toBeInTheDocument()

    await user.keyboard('{Escape}')

    expect(input.closest('[role="group"]')!.querySelector('[role="listbox"]')).toBeNull()
  })

  test('refocusing input after picking a letter re-opens the popup', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ConjugateBox onSelect={noop} />)

    const input = screen.getByLabelText('Root 1', { selector: 'input' })
    const group = input.closest<HTMLElement>('[role="group"]')!

    await user.click(input)
    await user.click(within(group).getByText('ك'))

    expect(group.querySelector('[role="listbox"]')).toBeNull()

    input.blur()
    await user.click(input)

    expect(group.querySelector('[role="listbox"]')).toBeInTheDocument()
  })

  test('clicking the overlay dismisses the letter listbox', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ConjugateBox onSelect={noop} />)

    const input = screen.getByLabelText('Root 1', { selector: 'input' })
    const group = input.closest<HTMLElement>('[role="group"]')!
    await user.click(input)
    expect(group.querySelector('[role="listbox"]')).toBeInTheDocument()

    act(() => {
      fireEvent.click(input.parentElement!.firstElementChild!)
    })

    expect(group.querySelector('[role="listbox"]')).toBeNull()
  })

  test('pre-populates letters and form from selectedVerb', () => {
    renderWithProviders(
      <ConjugateBox
        onSelect={noop}
        selectedVerb={{
          id: 'ktb-2',
          root: 'كتب',
          rootTokens: tokenize('كتب'),
          form: 2,
          label: 'كَتَّبَ',
          rootId: 'ktb',
        }}
      />,
    )

    expect(screen.getByLabelText('Root 1', { selector: 'input' })).toHaveValue('ك')
    expect(screen.getByLabelText('Root 2', { selector: 'input' })).toHaveValue('ت')
    expect(screen.getByLabelText('Root 3', { selector: 'input' })).toHaveValue('ب')
    expect(screen.getByText('II', { selector: 'button' })).toHaveAttribute('aria-pressed', 'true')
  })
})
