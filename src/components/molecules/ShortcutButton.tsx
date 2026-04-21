import { styled } from 'goober'
import type { ComponentChildren, JSX } from 'preact'
import { useEffect } from 'preact/hooks'
import { Button, type ButtonSize, type ButtonVariant } from '../atoms/Button'

interface ShortcutButtonProps extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onClick'> {
  children: ComponentChildren
  onClick?: () => void
  shortcutKey: string
  showShortcut?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
}

export function ShortcutButton({
  children,
  shortcutKey,
  showShortcut = true,
  onClick,
  disabled,
  ...props
}: ShortcutButtonProps) {
  const normalizedShortcut = shortcutKey.toLowerCase()

  useEffect(() => {
    if (disabled || normalizedShortcut.length === 0 || onClick == null) return

    const abortController = new AbortController()

    document.addEventListener(
      'keydown',
      (event) => {
        if (event.metaKey || event.ctrlKey || event.altKey) return
        if (event.key.toLowerCase() !== normalizedShortcut) return

        event.preventDefault()
        onClick()
      },
      { signal: abortController.signal },
    )

    return () => abortController.abort()
  }, [disabled, normalizedShortcut, onClick])

  return (
    <Button {...props} onClick={onClick} disabled={disabled}>
      {showShortcut && <ShortcutBadge aria-hidden="true">{shortcutKey.toUpperCase()}</ShortcutBadge>}
      {children}
    </Button>
  )
}

const ShortcutBadge = styled('span')`
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: 0.85rem;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 600;
  line-height: 1;
  color: var(--color-text-muted);
  background: var(--color-bg-surface-secondary);
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  padding: 0.2rem 0.35rem;
  pointer-events: none;
  font-family: ui-monospace, monospace;
`
