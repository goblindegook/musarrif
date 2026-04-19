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
  border: 1px solid ${({ active }) => (active ? '#facc15' : '#e2e8f0')};
  background: ${({ active }) => (active ? '#fff8e1' : '#ffffff')};
  color: ${({ active }) => (active ? '#92400e' : '#334155')};
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1;
  display: grid;
  place-items: center;
  padding: 0;
  cursor: pointer;
  box-shadow: ${({ active }) => (active ? '0 4px 14px rgba(15, 23, 42, 0.12)' : '0 6px 14px rgba(15, 23, 42, 0.08)')};
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
    background: #fefce8;
    color: ${({ active }) => (active ? '#92400e' : '#0f172a')};
    border-color: #facc15;
    box-shadow: ${({ active }) => (active ? '0 4px 14px rgba(15, 23, 42, 0.12)' : '0 6px 16px rgba(15, 23, 42, 0.14)')};
  }

  &:focus-visible {
    outline: 3px solid #fde68a;
    outline-offset: 2px;
    border-color: #facc15;
  }

  &:enabled:active {
    color: #92400e;
    background: #ffe58f;
    border-color: #eab308;
    transform: translateY(1px);
    box-shadow: 0 4px 10px rgba(15, 23, 42, 0.1);
  }

  &:disabled {
    color: #94a3b8;
    background: #f8fafc;
    border-color: #e2e8f0;
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
