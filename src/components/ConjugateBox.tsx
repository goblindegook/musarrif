import { styled } from 'goober'
import { useEffect, useRef, useState } from 'preact/hooks'
import { useI18n } from '../hooks/i18n'
import type { FormIPattern } from '../paradigms/form-i-vowels'
import type { Verb, VerbForm } from '../paradigms/verbs'
import { buildVerb, getVerbById, transliterate } from '../paradigms/verbs'

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'] as const
const FORM_NUMBERS: VerbForm[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const PATTERN_LABELS: Record<FormIPattern, string> = {
  'fa3ala-yaf3alu': 'فَعَلَ / يَفْعَلُ',
  'fa3ala-yaf3ilu': 'فَعَلَ / يَفْعِلُ',
  'fa3ala-yaf3ulu': 'فَعَلَ / يَفْعُلُ',
  'fa3ila-yaf3alu': 'فَعِلَ / يَفْعَلُ',
  'fa3ila-yaf3ilu': 'فَعِلَ / يَفْعِلُ',
  'fa3ila-yaf3ulu': 'فَعِلَ / يَفْعُلُ',
  'fa3ula-yaf3alu': 'فَعُلَ / يَفْعَلُ',
  'fa3ula-yaf3ilu': 'فَعُلَ / يَفْعِلُ',
  'fa3ula-yaf3ulu': 'فَعُلَ / يَفْعُلُ',
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

const SLOT_HEADERS = ['1', '2', '3'] as const

interface ConjugateBoxProps {
  onSelect: (verb: Verb) => void
  selectedVerb?: Verb | null
}

export function ConjugateBox({ onSelect, selectedVerb }: ConjugateBoxProps) {
  const { t } = useI18n()

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
    const existing = getVerbById(`${transliterate(root)}-${form}`)
    const nextVerb =
      existing?.form === 1 && existing.formPattern === formPattern && (existing.masdarPatterns?.length ?? 0) > 0
        ? existing
        : form === 1
          ? buildVerb(root, form, formPattern)
          : (existing ?? buildVerb(root, form))

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
          {FORM_NUMBERS.map((f, i) => (
            <FormButton key={f} type="button" active={form === f} aria-pressed={form === f} onClick={() => setForm(f)}>
              {ROMAN_NUMERALS[i]}
            </FormButton>
          ))}
        </FormGrid>
      </Section>

      {form === 1 && (
        <Section>
          <SectionLabel>{t('build.patternLabel')}</SectionLabel>
          <PatternGrid>
            {Object.entries(PATTERN_LABELS).map(([p, l]) => (
              <OptionButton
                key={p}
                type="button"
                active={formPattern === p}
                aria-pressed={formPattern === p}
                lang="ar"
                dir="rtl"
                onClick={() => setFormPattern(p as FormIPattern)}
              >
                {l}
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
  color: #64748b;
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
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background: #f8fafc;
  color: #1e293b;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: #facc15;
    background: #fff8e1;
  }

  &::placeholder {
    color: #94a3b8;
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
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding: 0.25rem;
  gap: 2px;
`

const LetterChoice = styled('button')<{ 'aria-selected'?: boolean }>`
  font-family: inherit;
  font-size: 1rem;
  padding: 0.2rem;
  border: 1px solid ${({ 'aria-selected': sel }) => (sel ? '#facc15' : 'transparent')};
  border-radius: 0.25rem;
  background: ${({ 'aria-selected': sel }) => (sel ? '#fff8e1' : 'transparent')};
  color: ${({ 'aria-selected': sel }) => (sel ? '#92400e' : '#334155')};
  cursor: pointer;
  text-align: center;

  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
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
  color: #64748b;
`

const FormGrid = styled('div')`
  display: flex;
  gap: 0.35rem;
`

const FormButton = styled('button')<{ active?: boolean }>`
  font-family: inherit;
  font-size: 0.85rem;
  padding: 0.3rem 0;
  flex: 1;
  min-width: 0;
  border: 1px solid ${({ active }) => (active ? '#facc15' : '#e2e8f0')};
  border-radius: 0.5rem;
  background: ${({ active }) => (active ? '#fff8e1' : '#fff')};
  color: ${({ active }) => (active ? '#92400e' : '#475569')};
  cursor: pointer;
  transition: background 80ms ease, border-color 80ms ease;

  &:hover {
    background: ${({ active }) => (active ? '#fff8e1' : '#f1f5f9')};
    border-color: ${({ active }) => (active ? '#facc15' : '#cbd5e1')};
  }
`

const PatternGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
`

const OptionButton = styled('button')<{ active?: boolean }>`
  font-family: inherit;
  font-size: 0.85rem;
  padding: 0.3rem 0.6rem;
  border: 1px solid ${({ active }) => (active ? '#facc15' : '#e2e8f0')};
  border-radius: 0.5rem;
  background: ${({ active }) => (active ? '#fff8e1' : '#fff')};
  color: ${({ active }) => (active ? '#92400e' : '#475569')};
  cursor: pointer;
  transition: background 80ms ease, border-color 80ms ease;

  &:hover {
    background: ${({ active }) => (active ? '#fff8e1' : '#f1f5f9')};
    border-color: ${({ active }) => (active ? '#facc15' : '#cbd5e1')};
  }
`
