import { styled } from 'goober'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'
import { SelectableButton } from '../atoms/SelectableButton'
import { Subheading } from '../atoms/Subheading'

export type FocusOption = {
  label: string
  value: number
  ariaLabel?: string
}

type Props = {
  options: readonly FocusOption[]
  value: number | null
  onChange: (value: number | null) => void
  onOpenChange?: (open: boolean) => void
  label: string
  clearLabel: string
  pickerTitle: string
  hint: string
}

export function FocusChip({ options, value, onChange, onOpenChange, label, clearLabel, pickerTitle, hint }: Props) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleSelect = useCallback(
    (v: number) => {
      onChange(v)
      setOpen(false)
    },
    [onChange],
  )

  const handleClear = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      onChange(null)
    },
    [onChange],
  )

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      const ref = containerRef.current
      if (ref && typeof ref.contains === 'function' && !ref.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [open])

  useEffect(() => {
    onOpenChange?.(open)
  }, [open, onOpenChange])

  if (options.length <= 1) return null

  const activeOption = value != null ? options.find((o) => o.value === value) : null

  return (
    <Container ref={containerRef}>
      <ChipRow>
        {activeOption != null ? (
          <ActiveRow>
            <ActiveChip type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
              <FocusIcon aria-hidden="true">◎</FocusIcon>
              <ChipLabel>{activeOption.label}</ChipLabel>
            </ActiveChip>
            <ClearButton type="button" aria-label={clearLabel} onClick={handleClear}>
              ×
            </ClearButton>
          </ActiveRow>
        ) : (
          <InactiveChip type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <FocusIcon aria-hidden="true">◎</FocusIcon>
            <ChipLabel>{label}</ChipLabel>
          </InactiveChip>
        )}
      </ChipRow>
      {open && (
        <FloatPanel>
          <Subheading>{pickerTitle}</Subheading>
          <FormGrid>
            {options.map((opt) => (
              <SelectableButton
                key={opt.value}
                type="button"
                aria-label={opt.ariaLabel}
                active={opt.value === value}
                size="compact"
                onClick={() => handleSelect(opt.value)}
              >
                {opt.label}
              </SelectableButton>
            ))}
          </FormGrid>
          <PanelHint>{hint}</PanelHint>
        </FloatPanel>
      )}
    </Container>
  )
}

const Container = styled('div')`
  width: 100%;
  position: relative;
`

const ChipRow = styled('div')`
  display: flex;
  align-items: center;
`

const chipButton = `
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.45rem;
  min-height: 2.2rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  cursor: pointer;
  font: inherit;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition:
    background 180ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 180ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 180ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 180ms cubic-bezier(0.22, 1, 0.36, 1);

  &:enabled:hover {
    border-color: var(--color-accent);
  }

  &:enabled:active {
    transform: scale(0.985);
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

const InactiveChip = styled('button')`
  ${chipButton}
  border: 1px dashed var(--color-border);
  background: var(--color-bg-surface);
  color: var(--color-text-secondary);

  &:enabled:hover {
    border-style: solid;
    background: var(--color-bg-accent-hover);
    color: var(--color-text-primary);
    box-shadow: var(--shadow-interactive-hover);
  }
`

const ActiveRow = styled('div')`
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--color-accent);
  border-radius: 999px;
  background: var(--color-bg-accent);
  box-shadow: var(--shadow-interactive-active);
`

const ActiveChip = styled('button')`
  ${chipButton}
  border: none;
  background: transparent;
  color: var(--color-text-emphasis);
  min-width: 0;
  padding-inline-end: 0.55rem;

  &:enabled:hover {
    background: color-mix(in srgb, var(--color-bg-accent) 78%, var(--color-bg-surface) 22%);
  }
`

const ClearButton = styled('button')`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.8rem;
  height: 1.8rem;
  margin-inline-end: 0.25rem;
  border-radius: 999px;
  border: none;
  background: color-mix(in srgb, var(--color-bg-surface) 88%, var(--color-bg-accent) 12%);
  color: var(--color-text-secondary);
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 700;
  padding: 0;
  font-family: inherit;
  transition:
    background 180ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 180ms cubic-bezier(0.22, 1, 0.36, 1),
    color 180ms cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    background: var(--color-bg-surface);
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

const FloatPanel = styled('div')`
  position: absolute;
  top: calc(100% + 0.45rem);
  inset-inline-start: 0;
  z-index: 10;
  min-width: min(18rem, calc(100vw - 2rem));
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  box-shadow: var(--shadow-elevated);
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`

const FormGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.45rem;

  @media (max-width: 420px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

const PanelHint = styled('p')`
  margin: 0;
  font-size: 0.78rem;
  line-height: 1.45;
  color: var(--color-text-secondary);
`

const ChipLabel = styled('span')`
  line-height: 1.1;
`

const FocusIcon = styled('span')`
  line-height: 1;
  color: var(--color-text-tertiary);
`
