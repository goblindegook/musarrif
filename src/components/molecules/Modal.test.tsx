import { cleanup, fireEvent, render, screen } from '@testing-library/preact'
import type { ComponentChildren } from 'preact'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { I18nProvider } from '../../hooks/useI18n'
import { Modal } from './Modal'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

function Wrapper({ children }: { children: ComponentChildren }) {
  return <I18nProvider>{children}</I18nProvider>
}

const DIALOG_DIMENSIONS = {
  x: 10,
  y: 10,
  width: 300,
  height: 200,
  top: 10,
  right: 310,
  bottom: 210,
  left: 10,
  toJSON: () => ({}),
}

describe('Modal', () => {
  test('does not close when clicking inside the dialog surface', () => {
    const onClose = vi.fn()
    render(
      <Modal isOpen title="Settings" onClose={onClose}>
        <p>Body</p>
      </Modal>,
      { wrapper: Wrapper },
    )

    const dialog = screen.getByText('Settings').closest('dialog') as HTMLDialogElement
    vi.spyOn(dialog, 'getBoundingClientRect').mockReturnValue(DIALOG_DIMENSIONS)

    fireEvent.click(dialog, { clientX: 150, clientY: 100 })
    expect(onClose).not.toHaveBeenCalled()
  })

  test('closes when clicking outside the dialog bounds (backdrop)', () => {
    const onClose = vi.fn()
    render(
      <Modal isOpen title="Settings" onClose={onClose}>
        <p>Body</p>
      </Modal>,
      { wrapper: Wrapper },
    )

    const dialog = screen.getByText('Settings').closest('dialog') as HTMLDialogElement
    vi.spyOn(dialog, 'getBoundingClientRect').mockReturnValue(DIALOG_DIMENSIONS)

    fireEvent.click(dialog, { clientX: 5, clientY: 100 })
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
