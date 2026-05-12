import { styled } from 'goober'
export const LinkButton = styled('a')`
  position: relative;
  width: 100%;
  display: inline-block;
  text-align: center;
  padding: 0.85rem 1.5rem;
  border-radius: 0.75rem;
  border: 2px solid var(--color-border);
  background: var(--color-bg-surface);
  color: var(--color-text-tertiary);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 180ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 180ms cubic-bezier(0.22, 1, 0.36, 1),
    color 180ms cubic-bezier(0.22, 1, 0.36, 1);
  outline: none;
  text-decoration: none;

  &:hover {
    background: var(--color-bg-accent-hover);
    border-color: var(--color-accent);
    color: var(--color-text-primary);
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
