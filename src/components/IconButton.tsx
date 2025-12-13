import { styled } from 'goober'
import type { ComponentChildren } from 'preact'

interface IconButtonProps {
  children: ComponentChildren
  onClick?: () => void
  ariaLabel?: string
  ariaExpanded?: boolean
  title?: string
}

export function IconButton({ children, onClick, ariaLabel, ariaExpanded, title }: IconButtonProps) {
  return (
    <StyledIconButton type="button" onClick={onClick} aria-label={ariaLabel} aria-expanded={ariaExpanded} title={title}>
      {children}
    </StyledIconButton>
  )
}

const StyledIconButton = styled('button')`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #334155;
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1;
  display: grid;
  place-items: center;
  padding: 0;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(15, 23, 42, 0.08);
  transition: background 120ms ease, color 120ms ease, box-shadow 120ms ease, border-color 120ms ease;

  &:hover,
  &:focus-visible {
    background: #fff8e1;
    color: #0f172a;
    border-color: #facc15;
    box-shadow: 0 6px 16px rgba(15, 23, 42, 0.14);
    outline: none;
  }
`
