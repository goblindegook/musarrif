import { styled } from 'goober'
import type { ComponentChild } from 'preact'

type Props = {
  activeMode: number
  labels: readonly string[]
  icons: readonly ComponentChild[]
  onClick: (index: number) => void
  ariaLabel?: string
}

export function ModeToggle({ activeMode, labels, icons, onClick, ariaLabel }: Props) {
  return (
    <SegmentedControl role="group" aria-label={ariaLabel}>
      {labels.map((label, i) => (
        <Segment
          key={label}
          type="button"
          active={i === activeMode}
          aria-pressed={i === activeMode}
          onClick={() => onClick(i)}
        >
          {icons[i]}
          <SegmentLabel>{label}</SegmentLabel>
        </Segment>
      ))}
    </SegmentedControl>
  )
}

const SegmentedControl = styled('div')`
  display: flex;
  flex-direction: row;
  height: 36px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 0.95rem;
  padding: 0.25rem;
  gap: 0.25rem;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
`

const Segment = styled('button')<{ active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 0.35rem;
  padding: 0 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ active }) => (active ? '#facc15' : 'transparent')};
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 300;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: ${({ active }) => (active ? '#fff8e1' : 'transparent')};
  color: ${({ active }) => (active ? '#92400e' : '#475569')};
  box-shadow: ${({ active }) => (active ? '0 4px 14px rgba(15, 23, 42, 0.12)' : 'none')};
  transition: background 120ms ease, border-color 120ms ease, box-shadow 120ms ease, color 120ms ease;

  &:hover {
    background: ${({ active }) => (active ? '#fff8e1' : '#f1f5f9')};
    border-color: ${({ active }) => (active ? '#facc15' : '#cbd5f5')};
    color: ${({ active }) => (active ? '#92400e' : '#334155')};
  }

  svg {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }
`

const SegmentLabel = styled('span')`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;

  @media (min-width: 720px) {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }
`
