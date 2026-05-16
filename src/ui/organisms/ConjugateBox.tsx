import { styled } from 'goober'
import { useEffect, useRef, useState } from 'preact/hooks'
import { conjugate } from '../../paradigms/conjugation'
import { FORM_I_PATTERNS, type FormIPattern } from '../../paradigms/form-i-vowels'
import { applyDiacriticsPreference } from '../../paradigms/tokens'
import type { DisplayVerb, VerbForm } from '../../paradigms/verbs'
import { FORMS, synthesizeVerb, verbsByRoot } from '../../paradigms/verbs'
import { toRoman } from '../../primitives/numbers'
import { SelectableButton } from '../atoms/SelectableButton'
import { Subheading } from '../atoms/Subheading'
import { useI18n } from '../hooks/useI18n'

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

interface ConjugateBoxProps {
  onSelect: (verb: DisplayVerb) => void
  selectedVerb?: DisplayVerb | null
}

const FORM_I_PATTERN_OPTIONS = FORM_I_PATTERNS.map((pattern) => [
  pattern,
  [
    conjugate(synthesizeVerb('فعل', 1, pattern), 'active.past')['3ms'],
    conjugate(synthesizeVerb('فعل', 1, pattern), 'active.present.indicative')['3ms'],
  ].join(' / '),
])

export function ConjugateBox({ onSelect, selectedVerb }: ConjugateBoxProps) {
  const { t, diacriticsPreference, dir } = useI18n()

  const initialLetters = selectedVerb ? Array.from(selectedVerb.root) : ([undefined, undefined, undefined] as const)

  const [c1, setC1] = useState<string | undefined>(initialLetters[0])
  const [c2, setC2] = useState<string | undefined>(initialLetters[1])
  const [c3, setC3] = useState<string | undefined>(initialLetters[2])
  const [form, setForm] = useState<VerbForm | undefined>(selectedVerb?.form)
  const [vowelPattern, setVowelPattern] = useState<FormIPattern>(selectedVerb?.form === 1 ? selectedVerb.vowels : 'a-a')
  const [openSlot, setOpenSlot] = useState<0 | 1 | 2 | null>(null)
  const [highlightedBySlot, setHighlightedBySlot] = useState<number[]>([-1, -1, -1])
  const onSelectRef = useRef(onSelect)
  const selectedVerbRef = useRef(selectedVerb)

  useEffect(() => {
    onSelectRef.current = onSelect
  }, [onSelect])

  useEffect(() => {
    selectedVerbRef.current = selectedVerb
  }, [selectedVerb])

  useEffect(() => {
    if (!c1 || !c2 || !c3 || !form) return
    if (form === 1 && !vowelPattern) return
    const root = [c1, c2, c3].join('')
    const existing = verbsByRoot.get(root)?.find((v) => v.form === form)
    const nextVerb =
      existing?.form === 1 && existing.vowels === vowelPattern && (existing.masdars?.length ?? 0) > 0
        ? existing
        : form === 1
          ? synthesizeVerb(root, form, vowelPattern)
          : (existing ?? synthesizeVerb(root, form))

    const currentSelectedVerb = selectedVerbRef.current
    if (currentSelectedVerb?.id === nextVerb.id) {
      if (currentSelectedVerb.form !== 1 || nextVerb.form !== 1) return
      if (currentSelectedVerb.vowels !== nextVerb.vowels) {
        onSelectRef.current(nextVerb)
        return
      }
      const noCurrentMasdar = currentSelectedVerb.masdars?.length === 0
      const noNextMasdar = nextVerb.masdars?.length === 0
      if (noCurrentMasdar === noNextMasdar) return
    }

    onSelectRef.current(nextVerb)
  }, [c1, c2, c3, form, vowelPattern])

  const openSlotPicker = (slot: 0 | 1 | 2, selected: string | undefined, highlightIndex?: number) => {
    const highlightedIndex = highlightIndex ?? Math.max(LETTERS.indexOf(selected ?? ''), 0)
    setOpenSlot(slot)
    setHighlightedBySlot((current) => {
      const next = [...current]
      next[slot] = highlightedIndex
      return next
    })
  }

  const closeSlotPicker = (slot: 0 | 1 | 2) => {
    setOpenSlot((current) => (current === slot ? null : current))
    setHighlightedBySlot((current) => {
      const next = [...current]
      next[slot] = -1
      return next
    })
  }

  return (
    <Container>
      <RootPicker dir="rtl">
        {([c1, c2, c3] as const).map((selected, index) => {
          const pos = index as 0 | 1 | 2
          const setter = [setC1, setC2, setC3][pos]
          const isOpen = openSlot === pos
          const slotInputId = `slot-input-${pos}`
          const listboxId = `slot-listbox-${pos}`
          const activeIndex = highlightedBySlot[pos] ?? -1
          const activeDescendant = isOpen && activeIndex >= 0 ? `slot-${pos}-option-${activeIndex}` : undefined
          const selectLetter = (letter: string) => {
            setter(letter)
            closeSlotPicker(pos)
          }

          return (
            <LetterSlot key={pos} role="group" aria-labelledby={`slot-header-${pos}`}>
              <RootSlotLabel id={`slot-header-${pos}`} htmlFor={slotInputId} dir={dir}>
                {t('build.rootSlotLabel', { index: String(pos + 1) })}
              </RootSlotLabel>
              <SlotInputWrapper>
                <SlotInput
                  id={slotInputId}
                  type="text"
                  lang="ar"
                  dir="rtl"
                  value={selected ?? ''}
                  placeholder="—"
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-expanded={isOpen}
                  aria-controls={listboxId}
                  aria-activedescendant={activeDescendant}
                  onFocus={() => openSlotPicker(pos, selected)}
                  onClick={() => openSlotPicker(pos, selected)}
                  onBlur={() => closeSlotPicker(pos)}
                  onInput={(e) => {
                    const char = (e as InputEvent).data ?? ''
                    ;(e.target as HTMLInputElement).value = selected ?? ''
                    if (LETTERS.includes(char)) {
                      setter(char)
                      closeSlotPicker(pos)
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' || e.key === 'Delete') {
                      setter(undefined)
                      e.preventDefault()
                      return
                    }
                    if (e.key === 'Escape') {
                      closeSlotPicker(pos)
                      ;(e.target as HTMLInputElement).blur()
                      e.preventDefault()
                      return
                    }
                    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Home' || e.key === 'End') {
                      e.preventDefault()
                      const currentIndex = activeIndex >= 0 ? activeIndex : Math.max(LETTERS.indexOf(selected ?? ''), 0)
                      const nextIndex =
                        e.key === 'ArrowDown'
                          ? (currentIndex + 1) % LETTERS.length
                          : e.key === 'ArrowUp'
                            ? (currentIndex - 1 + LETTERS.length) % LETTERS.length
                            : e.key === 'Home'
                              ? 0
                              : LETTERS.length - 1
                      if (!isOpen) {
                        openSlotPicker(pos, selected, nextIndex)
                        return
                      }
                      setHighlightedBySlot((current) => {
                        const next = [...current]
                        next[pos] = nextIndex
                        return next
                      })
                      return
                    }
                    if (e.key === 'Enter' && isOpen && activeIndex >= 0) {
                      e.preventDefault()
                      const letter = LETTERS[activeIndex]
                      if (letter != null) selectLetter(letter)
                    }
                  }}
                />
                {isOpen && (
                  <LetterDropdown id={listboxId} role="listbox" dir="rtl">
                    {LETTERS.map((letter, optionIndex) => (
                      <LetterChoice
                        id={`slot-${pos}-option-${optionIndex}`}
                        key={letter}
                        type="button"
                        role="option"
                        lang="ar"
                        dir="rtl"
                        aria-selected={optionIndex === activeIndex}
                        data-selected={selected === letter}
                        data-active={optionIndex === activeIndex}
                        tabIndex={-1}
                        onMouseDown={(e) => e.preventDefault()}
                        onMouseEnter={() =>
                          setHighlightedBySlot((current) => {
                            const next = [...current]
                            next[pos] = optionIndex
                            return next
                          })
                        }
                        onClick={() => selectLetter(letter)}
                      >
                        {letter}
                      </LetterChoice>
                    ))}
                  </LetterDropdown>
                )}
              </SlotInputWrapper>
            </LetterSlot>
          )
        })}
      </RootPicker>

      <Section>
        <Subheading>{t('build.formLabel')}</Subheading>
        <FormGrid>
          {FORMS.map((f) => (
            <SelectableButton
              key={f}
              type="button"
              active={form === f}
              size="compact"
              aria-pressed={form === f}
              onClick={() => setForm(f)}
            >
              {toRoman(f)}
            </SelectableButton>
          ))}
        </FormGrid>
      </Section>

      {form === 1 && (
        <Section>
          <Subheading>{t('build.patternLabel')}</Subheading>
          <PatternGrid>
            {FORM_I_PATTERN_OPTIONS.map(([p, l]) => (
              <SelectableButton
                key={p}
                type="button"
                active={vowelPattern === p}
                size="compact"
                aria-pressed={vowelPattern === p}
                lang="ar"
                dir="rtl"
                onClick={() => setVowelPattern(p as FormIPattern)}
              >
                {applyDiacriticsPreference(l, diacriticsPreference)}
              </SelectableButton>
            ))}
          </PatternGrid>
        </Section>
      )}
    </Container>
  )
}

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const RootPicker = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`

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

const SlotInput = styled('input')`
  font-family: inherit;
  font-size: 1.5rem;
  text-align: center;
  width: 100%;
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

const LetterDropdown = styled('div')`
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

const LetterChoice = styled('button')`
  font-family: inherit;
  font-size: 1rem;
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

const Section = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`

const FormGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 0.35rem;

  @media (max-width: 480px) {
    grid-template-columns: repeat(5, 1fr);
  }
`

const PatternGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
`
