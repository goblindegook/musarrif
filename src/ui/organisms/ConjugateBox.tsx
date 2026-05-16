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
import { LetterPicker } from '../molecules/LetterPicker'

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

  return (
    <Container>
      <RootPicker dir="rtl">
        {([c1, c2, c3] as const).map((selected, index) => {
          const pos = index as 0 | 1 | 2

          return (
            <LetterPicker
              key={pos}
              defaultValue={selected}
              labelText={t('build.rootSlotLabel', { index: String(pos + 1) })}
              dir={dir}
              onChange={[setC1, setC2, setC3][pos]}
            />
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
