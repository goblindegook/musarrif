import { styled } from 'goober'
import type { ButtonHTMLAttributes, ComponentChildren } from 'preact'

export type IconButtonSize = 'compact' | 'normal'

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ComponentChildren
  active?: boolean
  size?: IconButtonSize
}

export function IconButton({
  children,
  onClick,

  active,
  size = 'normal',
  ...props
}: IconButtonProps) {
  return (
    <StyledIconButton type="button" onClick={onClick} {...props} data-prerender="omit" active={active} size={size}>
      {children}
    </StyledIconButton>
  )
}

const StyledIconButton = styled('button')<{ active?: boolean; size?: IconButtonSize }>`
  width: ${({ size }) => (size === 'compact' ? '28px' : '36px')};
  height: ${({ size }) => (size === 'compact' ? '28px' : '36px')};
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
  transition: color 180ms cubic-bezier(0.22, 1, 0.36, 1);

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
  }

  &:disabled {
    color: var(--color-text-muted);
    cursor: default;
  }

  @media (pointer: coarse) {
    min-width: ${({ size }) => (size === 'compact' ? '28px' : '36px')};
    min-height: ${({ size }) => (size === 'compact' ? '28px' : '36px')};
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
