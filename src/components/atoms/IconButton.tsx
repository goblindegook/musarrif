import { styled } from 'goober'
import type { ComponentChildren } from 'preact'

interface IconButtonProps {
  children: ComponentChildren
  onClick?: () => void
  ariaLabel?: string
  ariaHasPopup?: 'dialog'
  ariaExpanded?: boolean
  title?: string
  active?: boolean
  size?: 'sm' | 'md'
}

export function IconButton({
  children,
  onClick,
  ariaLabel,
  ariaHasPopup,
  ariaExpanded,
  title,
  active,
  size = 'md',
}: IconButtonProps) {
  return (
    <StyledIconButton
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-haspopup={ariaHasPopup}
      aria-expanded={ariaExpanded}
      title={title}
      active={active}
      size={size}
    >
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
  transition: background 120ms ease, color 120ms ease, box-shadow 120ms ease, border-color 120ms ease;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    padding: 0.125rem;
    fill: currentColor;
    transition: fill 120ms ease;
  }

  &:hover,
  &:focus-visible {
    background: ${({ active }) => (active ? '#fff8e1' : '#fff8e1')};
    color: ${({ active }) => (active ? '#92400e' : '#0f172a')};
    border-color: ${({ active }) => (active ? '#facc15' : '#facc15')};
    box-shadow: ${({ active }) => (active ? '0 4px 14px rgba(15, 23, 42, 0.12)' : '0 6px 16px rgba(15, 23, 42, 0.14)')};
    outline: none;
  }

  &:active {
    color: #92400e;
    background: #ffe58f;
    border-color: #eab308;
  }

  @media print {
    display: none;
  }
`
