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
  background: ${({ active }) => (active ? '#fff8e1' : '#fff')};
  border-radius: 0.75rem;
  border: 1px solid ${({ active }) => (active ? '#facc15' : '#e2e8f0')};
  box-shadow: ${({ active }) => (active ? '0 2px 10px rgba(15, 23, 42, 0.12)' : 'none')};
  color: ${({ active }) => (active ? '#92400e' : '#475569')};
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
  transition: background 120ms ease, border-color 120ms ease, box-shadow 120ms ease, color 120ms ease;

  &:hover {
    background: ${({ active }) => (active ? '#fff8e1' : '#f1f5f9')};
    border-color: ${({ active }) => (active ? '#facc15' : '#cbd5f5')};
    color: ${({ active }) => (active ? '#92400e' : '#334155')};
    box-shadow: ${({ active }) => (active ? '0' : '0 6px 14px rgba(15, 23, 42, 0.1)')};
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
        background: #fff8e1;
        z-index: 10;
        border-left: 1px solid #facc15;
        border-right: 1px solid #facc15;
      }
    `}
  }
`

export const TabPanel = styled('div')`
  outline: none;
  padding-top: 0.75rem;
`
