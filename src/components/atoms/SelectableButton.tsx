import { styled } from 'goober'
import type { ButtonHTMLAttributes, ComponentChildren } from 'preact'

type SelectableButtonSize = 'compact' | 'normal'

interface SelectableButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  active?: boolean
  children: ComponentChildren

  size?: SelectableButtonSize
  badge?: string | number
}

export function SelectableButton({
  active = false,
  children,
  size = 'normal',
  badge,
  ...props
}: SelectableButtonProps) {
  return (
    <StyledSelectableButton {...props} active={active} size={size} type="button">
      {children}
      {badge != null && <Badge>{badge}</Badge>}
    </StyledSelectableButton>
  )
}

const StyledSelectableButton = styled('button')<{
  active: boolean
  size: SelectableButtonSize
}>`
  align-items: center;
  background: ${({ active }) => (active ? 'var(--color-bg-accent)' : 'var(--color-bg-surface)')};
  border-radius: ${({ size }) => (size === 'compact' ? '0.65rem' : '0.75rem')};
  border: 1px solid ${({ active }) => (active ? 'var(--color-accent)' : 'var(--color-border)')};
  box-shadow: ${({ active }) => (active ? 'var(--shadow-interactive-active)' : 'none')};
  color: ${({ active }) => (active ? 'var(--color-text-emphasis)' : 'var(--color-text-secondary)')};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: ${({ size }) => (size === 'compact' ? '0.78rem' : '0.8rem')};
  font-weight: 600;
  justify-content: center;
  letter-spacing: 0.08em;
  min-height: ${({ size }) => (size === 'compact' ? '2.2rem' : '2.4rem')};
  min-width: 0;
  padding: ${({ size }) => (size === 'compact' ? '0.35rem 0.3rem' : '0.4rem 0.75rem')};
  text-align: center;
  text-transform: uppercase;
  gap: 0.5rem;
  transition:
    background 180ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 180ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 180ms cubic-bezier(0.22, 1, 0.36, 1),
    color 180ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 180ms cubic-bezier(0.22, 1, 0.36, 1);

  &:enabled:active {
    transform: scale(0.97);
  }

  &:enabled:hover {
    background: ${({ active }) => (active ? 'var(--color-bg-accent)' : 'var(--color-bg-accent-hover)')};
    border-color: var(--color-accent);
    box-shadow: ${({ active }) => (active ? 'var(--shadow-interactive-active)' : 'none')};
    color: ${({ active }) => (active ? 'var(--color-text-emphasis)' : 'var(--color-text-primary)')};
  }

  &:focus-visible {
    outline: 3px solid var(--color-focus-outline);
    outline-offset: 2px;
    border-color: var(--color-accent);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Badge = styled('span')`
  background: var(--color-accent);
  color: var(--color-streak-bg);
  border-radius: 0.4rem;
  padding: 0 0.25rem;
`
