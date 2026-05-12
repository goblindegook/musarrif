import { cleanup, fireEvent, render, screen } from '@testing-library/preact'
import { afterEach, expect, test, vi } from 'vitest'
import { ShortcutButton } from '../molecules/ShortcutButton'

afterEach(() => {
  cleanup()
})

test('renders shortcut badge', () => {
  render(
    <ShortcutButton shortcutKey="1" onClick={() => {}}>
      Option I
    </ShortcutButton>,
  )

  expect(screen.getByText('1')).toBeInTheDocument()
})

test('activates on keyboard shortcut', () => {
  const onClick = vi.fn()

  render(
    <ShortcutButton shortcutKey="1" onClick={onClick}>
      Option I
    </ShortcutButton>,
  )

  fireEvent.keyDown(document.body, { key: '1' })

  expect(onClick).toHaveBeenCalledOnce()
})

test('handles case-insensitive shortcuts', () => {
  const onClick = vi.fn()

  render(
    <ShortcutButton shortcutKey="s" onClick={onClick}>
      Skip
    </ShortcutButton>,
  )

  fireEvent.keyDown(document.body, { key: 'S' })

  expect(onClick).toHaveBeenCalledOnce()
})

test('ignores modifier combinations', () => {
  const onClick = vi.fn()

  render(
    <ShortcutButton shortcutKey="1" onClick={onClick}>
      Option I
    </ShortcutButton>,
  )

  fireEvent.keyDown(document.body, { key: '1', ctrlKey: true })

  expect(onClick).not.toHaveBeenCalled()
})

test('does not activate when disabled', () => {
  const onClick = vi.fn()

  render(
    <ShortcutButton shortcutKey="1" onClick={onClick} disabled>
      Option I
    </ShortcutButton>,
  )

  fireEvent.keyDown(document.body, { key: '1' })

  expect(onClick).not.toHaveBeenCalled()
})
