import { css, styled } from 'goober'
import { forwardRef } from 'preact/compat'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks'
import { IconButton } from '../atoms/IconButton'
import { SelectableButton } from '../atoms/SelectableButton'
import { Subheading } from '../atoms/Subheading'

export type OptionItem<T> = {
  label: string
  value: T
  ariaLabel?: string
  glyph?: string
}

export type OptionGroup<T> = {
  key: string
  label: string
  options: readonly OptionItem<T>[]
  pickerTitle: string
  glyph?: string
  ariaLabel?: string
  hint?: string
}

export type OptionValue<T> = {
  groupKey: string
  value: T
}

type Props<T> = {
  groups: readonly OptionGroup<T>[]
  value: OptionValue<T> | null
  onChange: (value: OptionValue<T> | null) => void
  onOpenChange?: (open: boolean) => void
  icon: string
  label: string
  clearLabel: string
  backLabel: string
  pickerTitle: string
  hint: string
}

function isValueEqual<T>(left: T, right: T) {
  return JSON.stringify(left) === JSON.stringify(right)
}

export function OptionChip<T>({
  groups,
  value,
  onChange,
  onOpenChange,
  icon,
  label,
  clearLabel,
  backLabel,
  pickerTitle,
  hint,
}: Props<T>) {
  const [open, setOpen] = useState(false)
  const [selectedGroupKey, setSelectedGroupKey] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const resizeFromRef = useRef<{ w: number; h: number } | null>(null)

  const totalOptions = groups.reduce((sum, g) => sum + g.options.length, 0)
  const multiGroup = groups.length > 1

  const closePanel = useCallback(() => {
    setOpen(false)
    setSelectedGroupKey(null)
  }, [])

  const handleSelect = useCallback(
    (groupKey: string, v: T) => {
      onChange({ groupKey, value: v })
      closePanel()
    },
    [onChange, closePanel],
  )

  const handleClear = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      onChange(null)
    },
    [onChange],
  )

  const handleChipClick = useCallback(() => {
    setOpen((o) => {
      if (o) setSelectedGroupKey(null)
      return !o
    })
  }, [])

  const captureSize = useCallback(() => {
    const panel = panelRef.current
    if (panel) resizeFromRef.current = { w: panel.offsetWidth, h: panel.offsetHeight }
  }, [])

  const handleGroupSelect = useCallback(
    (key: string) => {
      captureSize()
      setSelectedGroupKey(key)
    },
    [captureSize],
  )

  const handleBack = useCallback(() => {
    captureSize()
    setSelectedGroupKey(null)
  }, [captureSize])

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    try {
      if (open) panel.showPopover?.()
      else panel.hidePopover?.()
    } catch {}
  }, [open])

  useLayoutEffect(() => {
    const panel = panelRef.current
    const from = resizeFromRef.current
    resizeFromRef.current = null
    if (!panel || from === null) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const toH = panel.offsetHeight
    if (from.h === toH) return

    panel.style.height = `${from.h}px`
    panel.style.overflow = 'hidden'
    panel.dataset.transitioning = 'true'

    const restore = () => {
      panel.style.height = ''
      panel.style.overflow = ''
      panel.style.transition = ''
      delete panel.dataset.transitioning
    }

    const raf = requestAnimationFrame(() => {
      panel.style.transition = 'height 250ms cubic-bezier(0.22, 1, 0.36, 1)'
      panel.style.height = `${toH}px`
      panel.addEventListener('transitionend', restore, { once: true })
    })

    return () => {
      cancelAnimationFrame(raf)
      panel.removeEventListener('transitionend', restore)
      restore()
    }
  }, [selectedGroupKey])

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    const onToggle = (e: Event) => {
      if ((e as Event & { newState?: string }).newState === 'closed') {
        setOpen(false)
        setSelectedGroupKey(null)
      }
    }
    panel.addEventListener('toggle', onToggle)
    return () => panel.removeEventListener('toggle', onToggle)
  }, [])

  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    if (!panel) return
    const firstButton = panel.querySelector<HTMLElement>('button, [tabindex="0"]')
    firstButton?.focus()
  }, [open])

  useEffect(() => {
    onOpenChange?.(open)
  }, [open, onOpenChange])

  if (totalOptions <= 1) return null

  const activeGroup = value != null ? groups.find((g) => g.key === value.groupKey) : null
  const activeOption =
    activeGroup != null ? activeGroup.options.find((o) => value != null && isValueEqual(o.value, value.value)) : null

  const currentGroup = selectedGroupKey != null ? groups.find((g) => g.key === selectedGroupKey) : null
  const showGroupPicker = multiGroup && currentGroup == null
  const pickerGroup = currentGroup ?? (!multiGroup ? groups[0] : null)

  return (
    <div class={containerClass}>
      <ChipRow>
        {activeOption != null ? (
          <ActiveRow>
            <ActiveChip type="button" aria-expanded={open} onClick={handleChipClick}>
              <ChipIcon aria-hidden="true">{icon}</ChipIcon>
              <ChipLabel>{activeOption.label}</ChipLabel>
            </ActiveChip>
            <ClearButton type="button" aria-label={clearLabel} onClick={handleClear}>
              ×
            </ClearButton>
          </ActiveRow>
        ) : (
          <InactiveChip type="button" aria-expanded={open} onClick={handleChipClick}>
            <ChipIcon aria-hidden="true">{icon}</ChipIcon>
            <ChipLabel>{label}</ChipLabel>
          </InactiveChip>
        )}
      </ChipRow>
      <Popover ref={panelRef} popover="auto">
        {open && showGroupPicker ? (
          <>
            <Subheading>{pickerTitle}</Subheading>
            <FormGrid class="form-grid">
              {groups.map((g) => (
                <SelectableButton
                  key={g.key}
                  type="button"
                  aria-label={g.ariaLabel}
                  active={false}
                  size="compact"
                  onClick={() => handleGroupSelect(g.key)}
                >
                  {g.label}
                  {g.glyph != null && <OptionGlyph aria-hidden="true">{g.glyph}</OptionGlyph>}
                </SelectableButton>
              ))}
            </FormGrid>
            <PanelHint>{hint}</PanelHint>
          </>
        ) : open && pickerGroup != null ? (
          <>
            <TitleRow>
              {multiGroup && (
                <IconButton size="sm" type="button" aria-label={backLabel} onClick={handleBack}>
                  <BackGlyph>‹</BackGlyph>
                </IconButton>
              )}
              <Subheading>{pickerGroup.pickerTitle}</Subheading>
            </TitleRow>
            <FormGrid class="form-grid">
              {pickerGroup.options.map((opt) => (
                <SelectableButton
                  key={opt.value}
                  type="button"
                  aria-label={opt.ariaLabel}
                  active={value?.groupKey === pickerGroup.key && value != null && isValueEqual(opt.value, value.value)}
                  size="compact"
                  onClick={() => handleSelect(pickerGroup.key, opt.value)}
                >
                  {opt.label}
                  {opt.glyph != null && <OptionGlyph aria-hidden="true">{opt.glyph}</OptionGlyph>}
                </SelectableButton>
              ))}
            </FormGrid>
            <PanelHint>{pickerGroup.hint ?? hint}</PanelHint>
          </>
        ) : null}
      </Popover>
    </div>
  )
}

const containerClass = css`
  width: 100%;
  position: relative;
  anchor-name: --option-chip;
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
  font-weight: 500;
  transition:
    background 180ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 180ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 180ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 180ms cubic-bezier(0.22, 1, 0.36, 1);

  &:enabled:hover {
    border-color: var(--color-accent);
  }

  &:enabled:active {
    transform: scale(0.96);
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
  animation: chip-activate 200ms cubic-bezier(0.22, 1, 0.36, 1) both;

  @keyframes chip-activate {
    from {
      opacity: 0;
      transform: scale(0.92);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
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

  @media (pointer: coarse) {
    min-width: 44px;
    min-height: 44px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Popover = styled('div', forwardRef)`
  box-sizing: border-box;
  position: fixed;
  position-anchor: --option-chip;
  top: calc(anchor(bottom) + 7px);
  inset-inline-start: anchor(start);
  margin: 0;
  min-width: min(18rem, calc(100vw - 2rem));
  max-width: anchor-size(width);
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  box-shadow: var(--shadow-elevated);
  padding: 0.8rem;

  &::backdrop {
    background: var(--color-overlay);
  }

  &:popover-open {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    animation: panel-enter 220ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  @keyframes panel-enter {
    from {
      opacity: 0;
      transform: translateY(-6px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  &[data-transitioning] .form-grid > * {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    &:popover-open {
      animation: none;
    }
  }
`

const TitleRow = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const FormGrid = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;

  & > * {
    animation: option-fade-up 180ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  & > *:nth-child(2) { animation-delay: 30ms; }
  & > *:nth-child(3) { animation-delay: 60ms; }
  & > *:nth-child(4) { animation-delay: 90ms; }
  & > *:nth-child(5) { animation-delay: 120ms; }
  & > *:nth-child(6) { animation-delay: 150ms; }
  & > *:nth-child(n+7) { animation-delay: 180ms; }

  @keyframes option-fade-up {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    & > * {
      animation: none;
    }
  }
`

const PanelHint = styled('p')`
  margin: 0;
  font-size: 0.78rem;
  line-height: 1.45;
  color: var(--color-text-secondary);
`

const BackGlyph = styled('span')`
  display: block;
  transform: translateY(-0.1em);
`

const ChipLabel = styled('span')`
  line-height: 1.1;
`

const ChipIcon = styled('span')`
  line-height: 1;
  color: var(--color-text-tertiary);
`

const OptionGlyph = styled('span')`
  margin-inline-start: 0.1rem;
  color: var(--color-error-text);
  font-size: 0.85em;
`
