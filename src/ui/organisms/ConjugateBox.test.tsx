import { fireEvent, render, screen, within } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import type { ComponentChildren } from 'preact'
import { describe, expect, test } from 'vitest'
import { tokenize } from '../../paradigms/tokens'
import { I18nProvider } from '../hooks/useI18n'
import { RoutingProvider } from '../routes'
import { ConjugateBox } from './ConjugateBox'

function Wrapper({ children }: { children: ComponentChildren }) {
  return (
    <RoutingProvider>
      <I18nProvider>{children}</I18nProvider>
    </RoutingProvider>
  )
}

const noop = () => {}

describe('ConjugateBox', () => {
  test('pattern selector is not shown before Form I is selected', () => {
    render(<ConjugateBox onSelect={noop} />, { wrapper: Wrapper })

    expect(screen.queryByText('فَعَلَ / يَفعُلُ')).not.toBeInTheDocument()
  })

  test('pattern selector appears when Form I is selected', async () => {
    render(<ConjugateBox onSelect={noop} />, { wrapper: Wrapper })

    fireEvent.click(screen.getByText('I', { selector: 'button' }))

    expect(screen.getByText('فَعَلَ / يَفعُلُ')).toBeInTheDocument()
  })

  test('pattern selector is hidden when Form II is selected after Form I', async () => {
    const user = userEvent.setup()
    render(<ConjugateBox onSelect={noop} />, { wrapper: Wrapper })

    await user.click(screen.getByText('I', { selector: 'button' }))
    await user.click(screen.getByText('II', { selector: 'button' }))

    expect(screen.queryByText('فَعَلَ / يَفعُلُ')).not.toBeInTheDocument()
  })

  test('each letter slot has a text input', () => {
    render(<ConjugateBox onSelect={noop} />, { wrapper: Wrapper })

    expect(screen.getByLabelText('1', { selector: 'input' })).toBeInTheDocument()
    expect(screen.getByLabelText('2', { selector: 'input' })).toBeInTheDocument()
    expect(screen.getByLabelText('3', { selector: 'input' })).toBeInTheDocument()
  })

  test('slot header labels the slot input', () => {
    render(<ConjugateBox onSelect={noop} />, { wrapper: Wrapper })

    expect(screen.getByLabelText('1', { selector: 'input' })).toBeInTheDocument()
    expect(screen.getByLabelText('2', { selector: 'input' })).toBeInTheDocument()
    expect(screen.getByLabelText('3', { selector: 'input' })).toBeInTheDocument()
  })

  test('focusing a slot input shows popup with valid letters for that slot', async () => {
    const user = userEvent.setup()
    render(<ConjugateBox onSelect={noop} />, { wrapper: Wrapper })

    const c1Input = screen.getByLabelText('1', { selector: 'input' })
    const c1Group = c1Input.closest('[role="group"]') as HTMLElement
    await user.click(c1Input)

    const popup = c1Group.querySelector<HTMLElement>('[role="listbox"]')!
    const options = within(popup).getAllByText(/./)
    expect(options.length).toBeGreaterThan(0)
    expect(within(popup).getByText('ك')).toBeInTheDocument()
  })

  test('clicking input again after picking a letter re-opens the popup', async () => {
    const user = userEvent.setup()
    render(<ConjugateBox onSelect={noop} />, { wrapper: Wrapper })

    const c1Input = screen.getByLabelText('1', { selector: 'input' })
    const c1Group = c1Input.closest<HTMLElement>('[role="group"]')!

    await user.click(c1Input)
    await user.click(within(c1Group).getByText('ك'))

    expect(c1Group.querySelector('[role="listbox"]')).toBeNull()

    await user.click(c1Input)

    expect(c1Group.querySelector('[role="listbox"]')).toBeInTheDocument()
  })

  test('pre-populates letters and form from selectedVerb', () => {
    render(
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
      { wrapper: Wrapper },
    )

    expect(screen.getByLabelText('1', { selector: 'input' })).toHaveValue('ك')
    expect(screen.getByLabelText('2', { selector: 'input' })).toHaveValue('ت')
    expect(screen.getByLabelText('3', { selector: 'input' })).toHaveValue('ب')
    expect(screen.getByText('II', { selector: 'button' })).toHaveAttribute('aria-pressed', 'true')
  })
})
