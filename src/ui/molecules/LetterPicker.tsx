import { styled } from 'goober'
import { useCallback, useId, useState } from 'preact/hooks'
import { Overlay } from '../atoms/Overlay'

export interface LetterPickerProps {
  defaultValue?: string
  labelText?: string
  dir?: 'ltr' | 'rtl'
  onChange?: (value?: string) => void
}

export function LetterPicker({ defaultValue, labelText, dir, onChange }: LetterPickerProps) {
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(-1)
  const [value, setValue] = useState(defaultValue)
  const id = useId()

  const openPicker = useCallback((value?: string, highlightIndex?: number) => {
    setOpen(true)
    setHighlighted(highlightIndex ?? LETTERS.indexOf(value ?? ''))
  }, [])

  const closePicker = useCallback(() => {
    setOpen(false)
    setHighlighted(-1)
  }, [])

  const selectLetter = useCallback(
    (letter?: string) => {
      setValue(letter)
      onChange?.(letter)
      closePicker()
    },
    [onChange, closePicker],
  )

  return (
    <LetterSlot role="group" aria-labelledby={`slot-header-${id}`}>
      <RootSlotLabel id={`slot-header-${id}`} htmlFor={`slot-input-${id}`} dir={dir}>
        {labelText}
      </RootSlotLabel>
      <SlotInputWrapper>
        {open && <Overlay zIndex={199} hideAbove={640} onClick={closePicker} />}
        <LetterInput
          id={`slot-input-${id}`}
          type="button"
          lang="ar"
          dir="rtl"
          value={value ?? '—'}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`slot-listbox-${id}`}
          aria-activedescendant={open && highlighted >= 0 ? `slot-${id}-option-${highlighted}` : undefined}
          onFocus={() => openPicker(value)}
          onClick={(event) => event.currentTarget.focus()}
          onBlur={() => closePicker()}
          onKeyDown={(e) => {
            if (e.key === 'Backspace' || e.key === 'Delete') {
              selectLetter(undefined)
              e.preventDefault()
              return
            }
            if (e.key === 'Escape') {
              closePicker()
              ;(e.target as HTMLInputElement).blur()
              e.preventDefault()
              return
            }
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Home' || e.key === 'End') {
              e.preventDefault()
              const currentIndex = highlighted >= 0 ? highlighted : Math.max(LETTERS.indexOf(value ?? ''), 0)
              const nextIndex =
                e.key === 'ArrowDown'
                  ? (currentIndex + 1) % LETTERS.length
                  : e.key === 'ArrowUp'
                    ? (currentIndex - 1 + LETTERS.length) % LETTERS.length
                    : e.key === 'Home'
                      ? 0
                      : LETTERS.length - 1
              if (!open) {
                openPicker(value, nextIndex)
                return
              }
              setHighlighted(nextIndex)
              return
            }
            if (e.key === 'Enter' && open && highlighted >= 0) {
              e.preventDefault()
              const letter = LETTERS[highlighted]
              if (letter != null) selectLetter(letter)
            }
          }}
        />
        {open && (
          <LetterPopover id={`slot-listbox-${id}`} role="listbox" dir="rtl">
            {LETTERS.map((option, optionIndex) => (
              <LetterOption
                id={`slot-${id}-option-${optionIndex}`}
                key={option}
                type="button"
                role="option"
                lang="ar"
                dir="rtl"
                aria-selected={optionIndex === highlighted}
                data-selected={value === option}
                data-active={optionIndex === highlighted}
                tabIndex={-1}
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setHighlighted(optionIndex)}
                onClick={() => selectLetter(option)}
              >
                {option}
              </LetterOption>
            ))}
          </LetterPopover>
        )}
      </SlotInputWrapper>
    </LetterSlot>
  )
}

const LETTERS: readonly string[] = [
  'ء',
  'ب',
  'ت',
  'ث',
  'ج',
  'ح',
  'خ',
  'د',
  'ذ',
  'ر',
  'ز',
  'س',
  'ش',
  'ص',
  'ض',
  'ط',
  'ظ',
  'ع',
  'غ',
  'ف',
  'ق',
  'ك',
  'ل',
  'م',
  'ن',
  'ه',
  'و',
  'ي',
]

const LetterSlot = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const RootSlotLabel = styled('label')`
  text-align: start;
  color: var(--color-text-muted);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  margin: 0;
  padding-inline-start: 0.25rem;
  text-transform: uppercase;
`

const SlotInputWrapper = styled('div')`
  position: relative;
`

const LetterInput = styled('input')`
  font-size: 1.5rem;
  line-height: 1;
  text-align: center;
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  padding: 0.35rem 0.25rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background: var(--color-bg-surface-secondary);
  color: var(--color-text-primary);
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: var(--color-accent);
    background: var(--color-bg-accent);
  }

  &::placeholder {
    color: var(--color-text-muted);
  }
`

const LetterPopover = styled('div')`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  overflow-y: auto;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  box-shadow: var(--shadow-interactive);
  z-index: 100;
  padding: 0.25rem;
  gap: 2px;

  @media (max-width: 640px) {
    position: fixed;
    top: 50%;
    left: 50%;
    right: auto;
    transform: translate(-50%, -50%);
    width: min(280px, 90vw);
    z-index: 200;
  }
`

const LetterOption = styled('button')`
  font-size: 1rem;
  line-height: 1;
  padding: 0.2rem;
  min-width: 22px;
  min-height: 22px;
  aspect-ratio: 1;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  background: transparent;
  color: var(--color-text-tertiary);
  cursor: pointer;
  text-align: center;

  &[data-selected='true'] {
    border-color: var(--color-accent);
    background: var(--color-bg-accent);
    color: var(--color-text-emphasis);
  }

  &[data-active='true'] {
    background: var(--color-bg-accent-hover);
    border-color: var(--color-accent);
    color: var(--color-text-primary);
  }

  &:hover {
    background: var(--color-bg-accent-hover);
    border-color: var(--color-accent);
    color: var(--color-text-primary);
  }

  @media (max-width: 720px) {
    font-size: 1.2rem;
  }
`
