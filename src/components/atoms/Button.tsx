import { styled } from 'goober'
import type { ComponentChildren, JSX } from 'preact'

export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSize = 'normal' | 'large'

interface ButtonProps extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
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
  border: 2px solid ${({ variant }) => (variant === 'primary' ? '#334155' : '#e2e8f0')};
  background: ${({ variant }) => (variant === 'primary' ? '#334155' : '#ffffff')};
  color: ${({ variant }) => (variant === 'primary' ? '#ffffff' : '#334155')};
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
    background: ${({ variant }) => (variant === 'primary' ? '#4a4f38' : '#fefce8')};
    border-color: ${({ variant }) => (variant === 'primary' ? '#4a4f38' : '#facc15')};
    color: ${({ variant }) => (variant === 'primary' ? '#ffffff' : '#0f172a')};
  }

  &:enabled:focus-visible {
    outline: 3px solid #fde68a;
    outline-offset: 2px;
    border-color: #facc15;
  }

  &:disabled {
    cursor: default;
    color: #94a3b8;
    background: #f8fafc;
    border-color: #e2e8f0;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`
