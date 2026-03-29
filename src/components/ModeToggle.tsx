import { styled } from 'goober'
import type { ComponentChild } from 'preact'
import { SegmentedControl } from './molecules/SegmentedControl'

type Props = {
  activeMode: number
  labels: readonly string[]
  icons: readonly ComponentChild[]
  onClick: (index: number) => void
  ariaLabel?: string
}

export function ModeToggle({ activeMode, labels, icons, onClick, ariaLabel }: Props) {
  const options = labels.map((label, index) => ({
    value: `${index}`,
    label,
    content: (
      <SegmentContent>
        {icons[index]}
        <SegmentLabel>{label}</SegmentLabel>
      </SegmentContent>
    ),
  }))

  return (
    <Control>
      <SegmentedControl
        options={options}
        value={`${activeMode}`}
        onChange={(_value: string, index: number) => onClick(index)}
        compact
        aria-label={ariaLabel}
      />
    </Control>
  )
}

const Control = styled('div')`
  height: 36px;
`

const SegmentContent = styled('span')`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;

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
