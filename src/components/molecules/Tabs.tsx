import { styled } from 'goober'

export const TabBar = styled('div')<{ wrap?: boolean }>`
  display: flex;
  gap: 0.5rem;
  padding: 0;
  flex-wrap: ${({ wrap }) => (wrap ? 'wrap' : 'nowrap')};

  @media (min-width: 720px) {
    flex-wrap: nowrap;
  }
`

export const TabButton = styled('button')<{
  active?: boolean
  size?: 'sm' | 'lg'
  fluid?: boolean
  hasChildren?: boolean
}>`
  align-items: center;
  background: ${({ active }) => (active ? 'var(--color-bg-accent)' : 'var(--color-bg-surface)')};
  border-radius: 0.75rem;
  border: 1px solid ${({ active }) => (active ? 'var(--color-accent)' : 'var(--color-border)')};
  box-shadow: ${({ active }) => (active ? '0 2px 10px var(--color-shadow-lg)' : 'none')};
  color: ${({ active }) => (active ? 'var(--color-text-accent)' : 'var(--color-text-secondary)')};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex: 1;
  font-family: inherit;
  font-size: ${({ size }) => (size === 'sm' ? '0.8rem' : '0.9rem')};
  gap: 0.1rem;
  justify-content: center;
  letter-spacing: 0.08em;
  min-width: ${({ fluid }) => (fluid ? 'calc(50% - 0.25rem)' : '0')};
  padding: 0.4rem 0.6rem;
  position: relative;
  text-transform: uppercase;
  transition:
    background 180ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 180ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 180ms cubic-bezier(0.22, 1, 0.36, 1),
    color 180ms cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    background: ${({ active }) => (active ? 'var(--color-bg-accent)' : 'var(--color-bg-accent-hover)')};
    border-color: var(--color-accent);
    color: ${({ active }) => (active ? 'var(--color-text-accent)' : 'var(--color-text-primary)')};
    box-shadow: ${({ active }) => (active ? '0' : '0 6px 14px var(--color-shadow-md)')};
  }

  &:focus-visible {
    outline: 3px solid var(--color-focus-outline);
    outline-offset: 2px;
    border-color: var(--color-accent);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (min-width: 720px) {
    min-width: 0;

    ${({ active, hasChildren }) =>
      active &&
      hasChildren &&
      `
      border-radius: 0.75rem 0.75rem 0 0;
      border-bottom: none;
      z-index: 1;

      &::after {
        content: '';
        position: absolute;
        bottom: calc(-0.5rem - 1px);
        left: -1px;
        right: -1px;
        height: calc(0.5rem + 1px);
        background: var(--color-bg-accent);
        z-index: 10;
        border-left: 1px solid var(--color-accent);
        border-right: 1px solid var(--color-accent);
      }
    `}
  }
`

export const TabPanel = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  outline: none;
  padding-top: 0.5rem;
`
