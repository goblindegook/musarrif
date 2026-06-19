import { styled } from 'goober'
import { useState } from 'preact/hooks'
import { annotate, type DerivationStep, type DerivationStepKind } from '../../paradigms/annotation'
import { renderExplanation, resolveVerbExplanationLayers } from '../../paradigms/explanation'
import type { PronounId } from '../../paradigms/pronouns'
import type { VerbTense } from '../../paradigms/tense'
import { type DisplayVerb, formatFormLabel } from '../../paradigms/verbs'
import type { Morpheme, MorphemeRole } from '../../paradigms/word'
import { ArabicDisplay } from '../atoms/ArabicDisplay'
import { IconButton } from '../atoms/IconButton'
import { Text } from '../atoms/Text'
import { type Translate, useI18n } from '../hooks/useI18n'
import { LightBulbIcon } from '../icons/LightBulbIcon'
import { Modal } from '../molecules/Modal'

const MORPHEME_COLOURS: Record<MorphemeRole, string> = {
  radical: 'var(--color-insight-root)',
  measure: 'var(--color-insight-form)',
  particle: 'var(--color-insight-tense)',
  agreement: 'var(--color-insight-suffix)',
  elided: 'var(--color-insight-dropped)',
}

interface ConjugationInsightsProps {
  verb: DisplayVerb
  verbTense: VerbTense
  pronoun: PronounId
  arabic: string
}

function AnnotatedArabic({ morphemes }: { morphemes: readonly Morpheme[] }) {
  return (
    <>
      {morphemes.flatMap((m, i) => {
        const morpheme =
          m.role === 'elided' ? (
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

function stepLabel(kind: DerivationStepKind, verb: DisplayVerb, t: Translate): string {
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

function DerivationSteps({ steps, verb, t }: { steps: readonly DerivationStep[]; verb: DisplayVerb; t: Translate }) {
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
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const annotation = annotate(verb, verbTense, pronoun)
  const finalStep = annotation?.steps[annotation.steps.length - 1]

  return (
    <>
      <IconButton aria-label={t('aria.explanation', { word: arabic })} onClick={() => setOpen(true)}>
        <LightBulbIcon />
      </IconButton>
      {open && (
        <Modal isOpen={open} onClose={() => setOpen(false)} title={t('conjugationInfo.title')}>
          <VerbDisplayArea>
            <ArabicDisplay>
              {finalStep ? (
                <AnnotatedArabic morphemes={finalStep.morphemes.filter((m) => m.role !== 'elided')} />
              ) : (
                arabic
              )}
            </ArabicDisplay>
            {annotation && <DerivationSteps steps={annotation.steps} verb={verb} t={t} />}
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
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  overflow: hidden;
`

const StepRow = styled('div')<{ isFinal: boolean }>`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 0.875rem;
  background: ${(p) => (p.isFinal ? 'var(--color-bg-surface)' : 'transparent')};
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }
`

const StepLabel = styled('span')`
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
`

const StepArabic = styled('span')`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: right;
`

const VerbDisplayArea = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
`

const DroppedMorpheme = styled('del')`
  color: ${MORPHEME_COLOURS.elided};
  text-decoration-thickness: 0.09em;
`
