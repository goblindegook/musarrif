import { styled } from 'goober'
import type { ButtonHTMLAttributes, ComponentChildren } from 'preact'

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
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
  border: none;
  background: transparent;
  color: ${({ active }) => (active ? 'var(--color-text-emphasis)' : 'var(--color-text-tertiary)')};
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1;
  display: grid;
  place-items: center;
  padding: 0;
  cursor: pointer;
  transition:
    color 180ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 180ms cubic-bezier(0.22, 1, 0.36, 1);

  svg {
    width: 1.5rem;
    height: 1.5rem;
    padding: 0.125rem;
    fill: currentColor;
    transition: fill 180ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:enabled:hover {
    color: var(--color-text-emphasis);
  }

  &:focus-visible {
    outline: 3px solid var(--color-focus-outline);
    outline-offset: 2px;
  }

  &:enabled:active {
    color: var(--color-text-emphasis);
    transform: scale(0.96);
  }

  &:disabled {
    color: var(--color-text-muted);
    cursor: default;
  }

  @media (pointer: coarse) {
    min-width: ${({ size }) => (size === 'sm' ? '28px' : '44px')};
    min-height: ${({ size }) => (size === 'sm' ? '28px' : '44px')};
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
