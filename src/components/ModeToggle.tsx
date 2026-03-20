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
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);
`

const Segment = styled('button')<{ active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 0.35rem;
  padding: 0 0.85rem;
  border: none;
  cursor: pointer;
  font-size: 0.78rem;
  font-weight: 600;
  background: ${({ active }) => (active ? '#334155' : 'white')};
  color: ${({ active }) => (active ? 'white' : '#64748b')};
  transition: background 120ms ease, color 120ms ease;

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
