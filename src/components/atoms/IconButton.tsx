import { styled } from 'goober'
import type { ComponentChildren, JSX } from 'preact'

interface IconButtonProps extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ComponentChildren
  active?: boolean
  size?: 'sm' | 'md'
}

export function IconButton({
  children,
  onClick,

  active,
  size = 'md',
  ...props
}: IconButtonProps) {
  return (
    <StyledIconButton type="button" onClick={onClick} {...props} active={active} size={size}>
      {children}
    </StyledIconButton>
  )
}

const StyledIconButton = styled('button')<{ active?: boolean; size?: 'sm' | 'md' }>`
  width: ${({ size }) => (size === 'sm' ? '28px' : '36px')};
  height: ${({ size }) => (size === 'sm' ? '28px' : '36px')};
  border-radius: 50%;
  border: 1px solid ${({ active }) => (active ? 'var(--color-accent)' : 'var(--color-border)')};
  background: ${({ active }) => (active ? 'var(--color-bg-accent)' : 'var(--color-bg-surface)')};
  color: ${({ active }) => (active ? 'var(--color-text-accent)' : 'var(--color-text-tertiary)')};
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1;
  display: grid;
  place-items: center;
  padding: 0;
  cursor: pointer;
  box-shadow: ${({ active }) => (active ? `0 4px 14px var(--color-shadow-lg)` : `0 6px 14px var(--color-shadow-sm)`)};
  transition:
    background 180ms cubic-bezier(0.22, 1, 0.36, 1),
    color 180ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 180ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 180ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 180ms cubic-bezier(0.22, 1, 0.36, 1);

  svg {
    width: 1.5rem;
    height: 1.5rem;
    padding: 0.125rem;
    fill: currentColor;
    transition: fill 180ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:enabled:hover {
    background: var(--color-bg-accent-hover);
    color: ${({ active }) => (active ? 'var(--color-text-accent)' : 'var(--color-text-primary)')};
    border-color: var(--color-accent);
    box-shadow: ${({ active }) => (active ? `0 4px 14px var(--color-shadow-lg)` : `0 6px 16px var(--color-shadow-xl)`)};
  }

  &:focus-visible {
    outline: 3px solid var(--color-focus-outline);
    outline-offset: 2px;
    border-color: var(--color-accent);
  }

  &:enabled:active {
    color: var(--color-text-accent);
    background: var(--color-bg-accent);
    border-color: var(--color-accent);
    transform: translateY(1px);
    box-shadow: 0 4px 10px var(--color-shadow-md);
  }

  &:disabled {
    color: var(--color-text-muted);
    background: var(--color-bg-surface-secondary);
    border-color: var(--color-border);
    box-shadow: none;
    cursor: default;
  }

  @media (pointer: coarse) {
    min-width: 44px;
    min-height: 44px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    svg {
      transition: none;
    }
  }

  @media print {
    display: none;
  }
`
