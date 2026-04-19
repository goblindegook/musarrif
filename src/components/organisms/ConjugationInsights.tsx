import { styled } from 'goober'
import { useState } from 'preact/hooks'
import { useI18n } from '../../hooks/i18n'
import {
  annotate,
  type DerivationStep,
  type DerivationStepKind,
  type Morpheme,
  type MorphemeRole,
} from '../../paradigms/annotation'
import { renderExplanation, resolveVerbExplanationLayers } from '../../paradigms/explanation'
import { formIPastVowel, formIPresentVowel } from '../../paradigms/form-i-vowels'
import type { PronounId } from '../../paradigms/pronouns'
import type { VerbTense } from '../../paradigms/tense'
import { type DisplayVerb, formatFormLabel } from '../../paradigms/verbs'
import { IconButton } from '../atoms/IconButton'
import { Text } from '../atoms/Text'
import { LightBulbIcon } from '../icons/LightBulbIcon'
import { Detail } from '../molecules/Detail'
import { Modal } from '../molecules/Modal'

const MORPHEME_COLOURS: Record<MorphemeRole, string> = {
  root: '#92400e',
  form: '#0369a1',
  tense: '#15803d',
  suffix: '#7e22ce',
  dropped: '#ef4444',
}

const formIVowelPattern = (verb: DisplayVerb) => {
  if (verb.form !== 1) return null
  const past = formIPastVowel(verb)
  const present = formIPresentVowel(verb)
  return past === present ? `\u25cc${past}` : `\u25cc${past} / \u25cc${present}`
}

interface ConjugationInsightsProps {
  verb: DisplayVerb
  verbTense: VerbTense
  pronoun: PronounId
  arabic: string
}

function AnnotatedArabic({ morphemes }: { morphemes: Morpheme[] }) {
  return (
    <>
      {morphemes.flatMap((m, i) => {
        const morpheme =
          m.role === 'dropped' ? (
            <DroppedMorpheme key={`m-${i}`}>{m.text}</DroppedMorpheme>
          ) : (
            <span key={`m-${i}`} style={{ color: MORPHEME_COLOURS[m.role] }}>
              {m.text}
            </span>
          )
        const next = morphemes[i + 1]
        if (!next || next.text.match(/^\p{M}+$/u)) return [morpheme]
        return morpheme
      })}
    </>
  )
}

function stepLabel(kind: DerivationStepKind, verb: DisplayVerb, t: ReturnType<typeof useI18n>['t']): string {
  switch (kind.type) {
    case 'root':
      return t('meta.root')
    case 'form':
      return t('meta.form.withNumber', { form: formatFormLabel(kind.form, verb.root) })
    case 'pronoun':
      return t(`pronoun.${kind.pronounId}`)
    case 'tense':
      return t(`tense.${kind.verbTense}`)
  }
}

function DerivationSteps({
  steps,
  verb,
  t,
}: {
  steps: DerivationStep[]
  verb: DisplayVerb
  t: ReturnType<typeof useI18n>['t']
}) {
  return (
    <StepsTable>
      {steps.map((step, i) => (
        <StepRow key={i} isFinal={i === steps.length - 1}>
          <StepLabel>{stepLabel(step.kind, verb, t)}</StepLabel>
          <StepArabic dir="rtl" lang="ar">
            <AnnotatedArabic morphemes={step.morphemes} />
          </StepArabic>
        </StepRow>
      ))}
    </StepsTable>
  )
}

export function ConjugationInsights({ verb, verbTense, pronoun, arabic }: ConjugationInsightsProps) {
  const { t, dir } = useI18n()
  const [open, setOpen] = useState(false)
  const formLabel = formatFormLabel(verb.form, verb.root)
  const annotation = annotate(verb, verbTense, pronoun)
  const finalStep = annotation?.steps[annotation.steps.length - 1]

  return (
    <>
      <IconButton aria-label={t('aria.explanation', { word: arabic })} onClick={() => setOpen(true)}>
        <LightBulbIcon />
      </IconButton>
      {open && (
        <Modal dir={dir} isOpen={open} onClose={() => setOpen(false)} title={t('conjugationInfo.title')}>
          <VerbDisplayArea>
            <ConjugationDisplay dir="rtl" lang="ar">
              <ConjugationText>
                {finalStep ? (
                  <AnnotatedArabic morphemes={finalStep.morphemes.filter((m) => m.role !== 'dropped')} />
                ) : (
                  arabic
                )}
              </ConjugationText>
            </ConjugationDisplay>
            {annotation ? (
              <DerivationSteps steps={annotation.steps} verb={verb} t={t} />
            ) : (
              <VerbContextSection>
                <Detail label={t('meta.root')} valueDir="rtl" valueLang="ar">
                  <RootLetters dir="rtl" lang="ar">
                    {Array.from(verb.root).map((letter, i) => (
                      <span key={i}>{letter}</span>
                    ))}
                  </RootLetters>
                </Detail>
                <Detail label={t('meta.form')} valueLang="en" valueDir="rtl">
                  <FormValue>
                    <FormNumeral>{formLabel}</FormNumeral>
                    {formIVowelPattern(verb) && <FormPattern>{formIVowelPattern(verb)}</FormPattern>}
                  </FormValue>
                </Detail>
                <Detail label={t('meta.verb')} value={verb.label} valueLang="ar" valueDir="rtl" />
              </VerbContextSection>
            )}
          </VerbDisplayArea>
          {renderExplanation(resolveVerbExplanationLayers(verb, verbTense, pronoun, arabic), t).map(
            (paragraph, index) => (
              <Text key={`${index}-${paragraph}`}>{paragraph}</Text>
            ),
          )}
        </Modal>
      )}
    </>
  )
}

const StepsTable = styled('div')`
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  overflow: hidden;
`

const StepRow = styled('div')<{ isFinal: boolean }>`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 0.875rem;
  background: ${(p) => (p.isFinal ? '#ffffff' : 'transparent')};
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
`

const StepLabel = styled('span')`
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #475569;
`

const StepArabic = styled('span')`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: right;
`

const VerbContextSection = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
`

const FormValue = styled('div')`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: baseline;
  gap: 0.5rem;
`

const FormNumeral = styled('span')`
  font-weight: 600;
`

const FormPattern = styled('span')`
  font-size: 1.2rem;
  font-weight: 400;
`

const RootLetters = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
`

const VerbDisplayArea = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
`

const ConjugationDisplay = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
`

const ConjugationText = styled('span')`
  font-size: 2rem;
  font-weight: 600;
  color: #0f172a;
  text-align: center;
  word-break: break-word;
`

const DroppedMorpheme = styled('del')`
  color: ${MORPHEME_COLOURS.dropped};
  text-decoration-thickness: 0.09em;
`
