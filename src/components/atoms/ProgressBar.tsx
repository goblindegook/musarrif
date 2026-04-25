import { styled } from 'goober'
import type { HTMLAttributes } from 'preact'
import { clamp } from '../../primitives/numbers'

interface ProgressBarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  value: number
  max: number
}

export function ProgressBar({ value, max, style, ...props }: ProgressBarProps) {
  const effectiveMax = max > 0 ? max : 1
  const clampedValue = clamp(value, 0, effectiveMax)
  const clampedValuePercent = (clampedValue / effectiveMax) * 100

  return (
    <Track {...props} style={style}>
      <Fill style={{ width: `${clampedValuePercent}%` }} />
    </Track>
  )
}

const Track = styled('span')`
  display: block;
  width: 100%;
  height: 0.5rem;
  border-radius: 999px;
  overflow: hidden;
  background: var(--color-border);
`

const Fill = styled('span')`
  display: block;
  height: 100%;
  background: var(--color-success-border);
  border-radius: 999px;
  transition: width 220ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`
