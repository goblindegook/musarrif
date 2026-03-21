import { styled } from 'goober'
import type { ComponentChild } from 'preact'
import { SegmentedControl, SegmentedControlButton } from './atoms/SegmentedControl'

type Props = {
  activeMode: number
  labels: readonly string[]
  icons: readonly ComponentChild[]
  onClick: (index: number) => void
  ariaLabel?: string
}

export function ModeToggle({ activeMode, labels, icons, onClick, ariaLabel }: Props) {
  return (
    <Control role="group" aria-label={ariaLabel}>
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
    </Control>
  )
}

const Control = styled(SegmentedControl)`
  height: 36px;
`

const Segment = styled(SegmentedControlButton)`
  position: relative;
  display: flex;
  align-items: center;
  align-self: stretch;
  flex: none;
  gap: 0.5rem;
  padding: 0 0.75rem;
  min-width: unset;

  svg {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }

  @media (min-width: 720px) {
    min-width: unset;
    padding: 0 0.75rem;
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
