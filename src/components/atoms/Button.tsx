import { styled } from 'goober'
import type { ComponentChildren, JSX } from 'preact'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ComponentChildren
  variant?: ButtonVariant
}

export function Button({ children, variant = 'secondary', ...props }: ButtonProps) {
  return (
    <StyledButton {...props} variant={variant} type="button">
      {children}
    </StyledButton>
  )
}

const StyledButton = styled('button')<{ variant: ButtonVariant }>`
  position: relative;
  width: 100%;
  padding: 0.85rem 1.5rem;
  border-radius: 0.75rem;
  border: 2px solid ${({ variant }) => (variant === 'primary' ? '#334155' : '#e2e8f0')};
  background: ${({ variant }) => (variant === 'primary' ? '#334155' : '#ffffff')};
  color: ${({ variant }) => (variant === 'primary' ? '#ffffff' : '#334155')};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 120ms ease, border-color 120ms ease, color 120ms ease;
  outline: none;

  &:enabled:hover {
    background: ${({ variant }) => (variant === 'primary' ? '#4a4f38' : '#fff8e1')};
    border-color: ${({ variant }) => (variant === 'primary' ? '#4a4f38' : '#facc15')};
    color: ${({ variant }) => (variant === 'primary' ? '#ffffff' : '#0f172a')};
  }

  &:enabled:focus-visible {
    outline: 2px solid #facc15;
    outline-offset: 2px;
  }

  &:disabled {
    cursor: default;
  }
`
