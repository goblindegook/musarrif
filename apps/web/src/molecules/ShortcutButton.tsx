import { styled } from 'goober'
import type { ButtonHTMLAttributes, ComponentChildren } from 'preact'
import { useEffect } from 'preact/hooks'
import { Button, type ButtonSize, type ButtonVariant } from '../atoms/Button'

const SHORTCUT_LABELS: Record<string, string> = {
  enter: '↵',
}

interface ShortcutButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onClick'> {
  children: ComponentChildren
  onClick?: () => void
  shortcutKey: string
  showShortcut?: boolean
  badgeLabel?: string
  statusGlyph?: 'correct' | 'wrong'
  variant?: ButtonVariant
  size?: ButtonSize
}

export function ShortcutButton({
  children,
  shortcutKey,
  showShortcut = true,
  badgeLabel,
  statusGlyph,
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

        const target = event.target as Element
        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return

        event.preventDefault()
        onClick()
      },
      { signal: abortController.signal },
    )

    return () => abortController.abort()
  }, [disabled, normalizedShortcut, onClick])

  return (
    <Button {...props} onClick={onClick} disabled={disabled}>
      {showShortcut && (
        <ShortcutBadge aria-hidden="true">
          {SHORTCUT_LABELS[shortcutKey.toLowerCase()] ?? shortcutKey.toUpperCase()}
        </ShortcutBadge>
      )}
      {statusGlyph && (
        <StatusBadge aria-hidden="true" data-status={statusGlyph}>
          {statusGlyph === 'correct' ? '✓' : '✗'}
        </StatusBadge>
      )}
      {children}
      {badgeLabel && <InfoBadge>{badgeLabel}</InfoBadge>}
    </Button>
  )
}

const ShortcutBadge = styled('span')`
  position: absolute;
  inset-block-start: 50%;
  left: 0.85rem;
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
  border-radius: var(--radius);
  padding: 0.2rem 0.35rem;
  pointer-events: none;
  font-family: ui-monospace, monospace;
`

const StatusBadge = styled('span')`
  position: absolute;
  inset-block-start: 50%;
  left: 0.85rem;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1;
  pointer-events: none;

  &[data-status='correct'] {
    color: var(--color-success-text);
  }

  &[data-status='wrong'] {
    color: var(--color-error-text);
  }
`

const InfoBadge = styled('span')`
  position: absolute;
  inset-block-start: 50%;
  right: 0.85rem;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-warning-text);
  background: var(--color-warning-bg);
  border: 1px solid var(--color-warning-border);
  border-radius: 999px;
  padding: 0.3rem 0.5rem;
  pointer-events: none;
`
