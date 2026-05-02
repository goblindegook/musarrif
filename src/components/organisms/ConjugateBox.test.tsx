import { fireEvent, render, screen, within } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import type { ComponentChildren } from 'preact'
import { describe, expect, test } from 'vitest'
import { I18nProvider } from '../../hooks/useI18n'
import { tokenize } from '../../paradigms/letters'
import { RoutingProvider } from '../../routes'
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

    fireEvent.click(screen.getByRole('button', { name: 'I' }))

    expect(screen.getByText('فَعَلَ / يَفعُلُ')).toBeInTheDocument()
  })

  test('pattern selector is hidden when Form II is selected after Form I', async () => {
    const user = userEvent.setup()
    render(<ConjugateBox onSelect={noop} />, { wrapper: Wrapper })

    await user.click(screen.getByRole('button', { name: 'I' }))
    await user.click(screen.getByRole('button', { name: 'II' }))

    expect(screen.queryByText('فَعَلَ / يَفعُلُ')).not.toBeInTheDocument()
  })

  test('each letter slot has a text input', () => {
    render(<ConjugateBox onSelect={noop} />, { wrapper: Wrapper })

    const c1Group = screen.getByRole('group', { name: '1' })
    const c2Group = screen.getByRole('group', { name: '2' })
    const c3Group = screen.getByRole('group', { name: '3' })

    expect(within(c1Group).getByRole('textbox')).toBeInTheDocument()
    expect(within(c2Group).getByRole('textbox')).toBeInTheDocument()
    expect(within(c3Group).getByRole('textbox')).toBeInTheDocument()
  })

  test('slot header labels the slot input', () => {
    render(<ConjugateBox onSelect={noop} />, { wrapper: Wrapper })

    expect(screen.getByRole('textbox', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: '2' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: '3' })).toBeInTheDocument()
  })

  test('focusing a slot input shows popup with valid letters for that slot', async () => {
    const user = userEvent.setup()
    render(<ConjugateBox onSelect={noop} />, { wrapper: Wrapper })

    const c1Group = screen.getByRole('group', { name: '1' })
    const c1Input = within(c1Group).getByRole('textbox')
    await user.click(c1Input)

    const popup = within(c1Group).getByRole('listbox')
    const options = within(popup).getAllByRole('option')
    expect(options.length).toBeGreaterThan(0)
    expect(within(popup).getByRole('option', { name: 'ك' })).toBeInTheDocument()
  })

  test('clicking input again after picking a letter re-opens the popup', async () => {
    const user = userEvent.setup()
    render(<ConjugateBox onSelect={noop} />, { wrapper: Wrapper })

    const c1Group = screen.getByRole('group', { name: '1' })
    const c1Input = within(c1Group).getByRole('textbox')

    await user.click(c1Input)
    await user.click(within(c1Group).getByRole('option', { name: 'ك' }))

    expect(within(c1Group).queryByRole('listbox')).not.toBeInTheDocument()

    await user.click(c1Input)

    expect(within(c1Group).getByRole('listbox')).toBeInTheDocument()
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

    const c1Group = screen.getByRole('group', { name: '1' })
    const c2Group = screen.getByRole('group', { name: '2' })
    const c3Group = screen.getByRole('group', { name: '3' })

    expect(within(c1Group).getByRole('textbox')).toHaveValue('ك')
    expect(within(c2Group).getByRole('textbox')).toHaveValue('ت')
    expect(within(c3Group).getByRole('textbox')).toHaveValue('ب')
    expect(screen.getByRole('button', { name: 'II' })).toHaveAttribute('aria-pressed', 'true')
  })
})
