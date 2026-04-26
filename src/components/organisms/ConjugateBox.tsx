import { styled } from 'goober'
import { useEffect, useRef, useState } from 'preact/hooks'
import { useI18n } from '../../hooks/useI18n'
import { conjugate } from '../../paradigms/conjugation'
import { FORM_I_PATTERNS, type FormIPattern } from '../../paradigms/form-i-vowels'
import { applyDiacriticsPreference } from '../../paradigms/letters'
import type { DisplayVerb, VerbForm } from '../../paradigms/verbs'
import { FORM_LABELS, FORMS, synthesizeVerb, verbsByRoot } from '../../paradigms/verbs'

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

const SLOT_HEADERS = ['1', '2', '3'] as const

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
  const { t, diacriticsPreference } = useI18n()

  const initialLetters = selectedVerb ? Array.from(selectedVerb.root) : ([undefined, undefined, undefined] as const)

  const [c1, setC1] = useState<string | undefined>(initialLetters[0])
  const [c2, setC2] = useState<string | undefined>(initialLetters[1])
  const [c3, setC3] = useState<string | undefined>(initialLetters[2])
  const [form, setForm] = useState<VerbForm | undefined>(selectedVerb?.form)
  const [formPattern, setFormPattern] = useState<FormIPattern>(
    selectedVerb?.form === 1 ? selectedVerb.formPattern : 'fa3ala-yaf3alu',
  )
  const [openSlot, setOpenSlot] = useState<0 | 1 | 2 | null>(null)
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
    if (form === 1 && !formPattern) return
    const root = [c1, c2, c3].join('')
    const existing = verbsByRoot.get(root)?.find((v) => v.form === form)
    const nextVerb =
      existing?.form === 1 && existing.formPattern === formPattern && (existing.masdarPatterns?.length ?? 0) > 0
        ? existing
        : form === 1
          ? synthesizeVerb(root, form, formPattern)
          : (existing ?? synthesizeVerb(root, form))

    const currentSelectedVerb = selectedVerbRef.current
    if (currentSelectedVerb?.id === nextVerb.id) {
      if (currentSelectedVerb.form !== 1 || nextVerb.form !== 1) return
      if (currentSelectedVerb.formPattern !== nextVerb.formPattern) {
        onSelectRef.current(nextVerb)
        return
      }
      const noCurrentMasdar = currentSelectedVerb.masdarPatterns?.length === 0
      const noNextMasdar = nextVerb.masdarPatterns?.length === 0
      if (noCurrentMasdar === noNextMasdar) return
    }

    onSelectRef.current(nextVerb)
  }, [c1, c2, c3, form, formPattern])

  return (
    <Container>
      <RootPicker dir="rtl">
        {([c1, c2, c3] as const).map((selected, index) => {
          const pos = index as 0 | 1 | 2
          const setter = [setC1, setC2, setC3][pos]
          const isOpen = openSlot === pos
          const slotInputId = `slot-input-${pos}`

          return (
            <LetterSlot key={pos} role="group" aria-labelledby={`slot-header-${pos}`}>
              <SlotHeader id={`slot-header-${pos}`} htmlFor={slotInputId}>
                {SLOT_HEADERS[pos]}
              </SlotHeader>
              <SlotInputWrapper>
                <SlotInput
                  id={slotInputId}
                  type="text"
                  lang="ar"
                  dir="rtl"
                  value={selected ?? ''}
                  placeholder="—"
                  aria-haspopup="listbox"
                  aria-expanded={isOpen}
                  onFocus={() => setOpenSlot(pos)}
                  onClick={() => setOpenSlot(pos)}
                  onBlur={() => setOpenSlot(null)}
                  onInput={(e) => {
                    const char = (e as InputEvent).data ?? ''
                    ;(e.target as HTMLInputElement).value = selected ?? ''
                    if (LETTERS.includes(char)) {
                      setter(char)
                      setOpenSlot(null)
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' || e.key === 'Delete') {
                      setter(undefined)
                      e.preventDefault()
                    } else if (e.key === 'Escape') {
                      setOpenSlot(null)
                      ;(e.target as HTMLInputElement).blur()
                    }
                  }}
                />
                {isOpen && (
                  <LetterDropdown role="listbox" dir="rtl">
                    {LETTERS.map((letter) => (
                      <LetterChoice
                        key={letter}
                        type="button"
                        role="option"
                        lang="ar"
                        dir="rtl"
                        aria-selected={selected === letter}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          setter(letter)
                          setOpenSlot(null)
                        }}
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
        <SectionLabel>{t('build.formLabel')}</SectionLabel>
        <FormGrid>
          {FORMS.map((f, i) => (
            <OptionButton
              key={f}
              type="button"
              active={form === f}
              aria-pressed={form === f}
              onClick={() => setForm(f)}
            >
              {FORM_LABELS[i]}
            </OptionButton>
          ))}
        </FormGrid>
      </Section>

      {form === 1 && (
        <Section>
          <SectionLabel>{t('build.patternLabel')}</SectionLabel>
          <PatternGrid>
            {FORM_I_PATTERN_OPTIONS.map(([p, l]) => (
              <OptionButton
                key={p}
                type="button"
                active={formPattern === p}
                aria-pressed={formPattern === p}
                lang="ar"
                dir="rtl"
                onClick={() => setFormPattern(p as FormIPattern)}
              >
                {applyDiacriticsPreference(l, diacriticsPreference)}
              </OptionButton>
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

const SlotHeader = styled('label')`
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text-secondary);
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

const LetterChoice = styled('button')<{ 'aria-selected'?: boolean }>`
  font-family: inherit;
  font-size: 1rem;
  padding: 0.2rem;
  min-width: 22px;
  min-height: 22px;
  aspect-ratio: 1;
  border: 1px solid ${({ 'aria-selected': sel }) => (sel ? 'var(--color-accent)' : 'transparent')};
  border-radius: 0.25rem;
  background: ${({ 'aria-selected': sel }) => (sel ? 'var(--color-bg-accent)' : 'transparent')};
  color: ${({ 'aria-selected': sel }) => (sel ? 'var(--color-text-emphasis)' : 'var(--color-text-tertiary)')};
  cursor: pointer;
  text-align: center;

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

const SectionLabel = styled('div')`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-secondary);
`

const FormGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 0.35rem;

  @media (max-width: 480px) {
    grid-template-columns: repeat(5, 1fr);
  }
`

const OptionButton = styled('button')<{ active?: boolean }>`
  font-family: inherit;
  font-size: 0.85rem;
  min-width: 0;
  padding: 0.3rem 0;
  border: 1px solid ${({ active }) => (active ? 'var(--color-accent)' : 'var(--color-border)')};
  border-radius: 0.5rem;
  background: ${({ active }) => (active ? 'var(--color-bg-accent)' : 'var(--color-bg-surface)')};
  color: ${({ active }) => (active ? 'var(--color-text-emphasis)' : 'var(--color-text-secondary)')};
  cursor: pointer;
  transition: background 80ms ease, border-color 80ms ease;

  &:hover {
    background: ${({ active }) => (active ? 'var(--color-bg-accent)' : 'var(--color-bg-accent-hover)')};
    border-color: var(--color-accent);
    color: ${({ active }) => (active ? 'var(--color-text-emphasis)' : 'var(--color-text-primary)')};
  }
`

const PatternGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
`
