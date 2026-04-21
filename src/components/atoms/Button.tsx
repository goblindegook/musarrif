import { styled } from 'goober'
import type { ButtonHTMLAttributes, ComponentChildren } from 'preact'

export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSize = 'normal' | 'large'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ComponentChildren
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({ children, variant = 'secondary', size = 'normal', ...props }: ButtonProps) {
  return (
    <StyledButton {...props} variant={variant} size={size} type="button">
      {children}
    </StyledButton>
  )
}

const StyledButton = styled('button')<{ size: ButtonSize; variant: ButtonVariant }>`
  position: relative;
  width: 100%;
  padding: 0.85rem 1.5rem;
  border-radius: 0.75rem;
  border: 2px solid ${({ variant }) => (variant === 'primary' ? 'var(--color-text-tertiary)' : 'var(--color-border)')};
  background: ${({ variant }) => (variant === 'primary' ? 'var(--color-text-tertiary)' : 'var(--color-bg-surface)')};
  color: ${({ variant }) => (variant === 'primary' ? 'var(--color-bg-surface)' : 'var(--color-text-tertiary)')};
  font-size: ${({ size }) => (size === 'normal' ? '1rem' : '1.2rem')};
  font-weight: 600;
  cursor: pointer;
  transition:
    background 180ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 180ms cubic-bezier(0.22, 1, 0.36, 1),
    color 180ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 180ms cubic-bezier(0.22, 1, 0.36, 1);
  outline: none;

  &:enabled:hover {
    background: ${({ variant }) => (variant === 'primary' ? 'var(--color-bg-button-primary-hover)' : 'var(--color-bg-accent-hover)')};
    border-color: ${({ variant }) => (variant === 'primary' ? 'var(--color-bg-button-primary-hover)' : 'var(--color-accent)')};
    color: ${({ variant }) => (variant === 'primary' ? 'var(--color-bg-surface)' : 'var(--color-text-primary)')};
  }

  &:enabled:focus-visible {
    outline: 3px solid var(--color-focus-outline);
    outline-offset: 2px;
    border-color: var(--color-accent);
  }

  &:disabled {
    cursor: default;
    color: var(--color-text-muted);
    background: var(--color-bg-surface-secondary);
    border-color: var(--color-border);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`
