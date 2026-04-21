import { styled } from 'goober'
import type { ComponentChild, HTMLAttributes } from 'preact'

export interface SegmentedControlOption<T extends string = string> {
  readonly value: T
  readonly label: string
  readonly content?: ComponentChild
  readonly title?: string
}

interface SegmentedControlProps<T extends string = string>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'value'> {
  readonly options: readonly SegmentedControlOption<T>[]
  readonly value: T
  readonly onChange: (value: T, index: number) => void
  readonly fill?: boolean
  readonly compact?: boolean
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  fill,
  compact,
  ...rest
}: SegmentedControlProps<T>) {
  const activeIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  )

  return (
    <Control fill={fill} activeIndex={activeIndex} optionCount={options.length} {...rest} role="group">
      {options.map((option, index) => {
        const isActive = option.value === value
        return (
          <SegmentedControlButton
            type="button"
            key={option.value}
            active={isActive}
            compact={compact}
            aria-pressed={isActive}
            aria-label={option.label}
            title={option.title}
            onClick={() => onChange(option.value, index)}
          >
            {option.content ?? option.label}
          </SegmentedControlButton>
        )
      })}
    </Control>
  )
}

const Control = styled('div')<{
  fill?: boolean
  activeIndex: number
  optionCount: number
}>`
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
  background: var(--color-bg-surface);
  padding: 0.25rem;
  border-radius: 0.95rem;
  box-shadow: var(--shadow-surface);
  gap: 0;
  position: relative;
  overflow: hidden;
  ${({ fill }) => fill && 'flex: 1; min-width: 0; width: 100%;'}
  --segmented-count: ${({ optionCount = 1 }) => Math.max(optionCount, 1)};
  --segmented-active-index: ${({ activeIndex = 0 }) => Math.max(activeIndex, 0)};
  --segmented-track-width: calc(100% - 0.5rem);
  --segmented-pill-width: calc(var(--segmented-track-width) / var(--segmented-count));
  --segmented-direction: 1;

  &:dir(rtl) {
    --segmented-direction: -1;
  }

  &::before {
    content: '';
    position: absolute;
    inset-block: 0.25rem;
    inset-inline-start: 0.25rem;
    width: var(--segmented-pill-width);
    border-radius: 0.75rem;
    background: var(--color-bg-accent);
    border: 1px solid var(--color-accent);
    box-shadow: var(--shadow-interactive-active);
    transform: translateX(calc(100% * var(--segmented-active-index) * var(--segmented-direction)));
    transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      transition: none;
    }
  }
`

const SegmentedControlButton = styled('button')<{ active: boolean; compact?: boolean }>`
  display: flex;
  align-items: center;
  background: transparent;
  border-radius: 0.75rem;
  border: 1px solid transparent;
  box-shadow: none;
  color: ${({ active }) => (active ? 'var(--color-text-emphasis)' : 'var(--color-text-secondary)')};
  cursor: pointer;
  flex: 1 1 0;
  min-width: 0;
  font-size: 0.75rem;
  font-weight: 400;
  justify-content: center;
  letter-spacing: 0.08em;
  min-inline-size: ${({ compact }) => (compact ? '0' : '64px')};
  padding: ${({ compact }) => (compact ? '0.2rem 0.75rem' : '0.45rem 0.75rem')};
  text-transform: uppercase;
  position: relative;
  z-index: 1;
  transition: color 180ms cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    background: transparent;
    border-color: transparent;
    color: ${({ active }) => (active ? 'var(--color-text-emphasis)' : 'var(--color-text-tertiary)')};
    box-shadow: none;
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
    min-inline-size: ${({ compact }) => (compact ? '0' : '96px')};
    padding: ${({ compact }) => (compact ? '0.2rem 0.75rem' : '0.5rem 0.9rem')};
  }
`
