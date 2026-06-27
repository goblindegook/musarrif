import { styled } from 'goober'
import { useState } from 'preact/hooks'
import { annotate, type DerivationStep } from '../../paradigms/annotation'
import type { ExplanationKind } from '../../paradigms/explanation'
import { renderExplanation, resolveVerbExplanationLayers } from '../../paradigms/explanation'
import type { PronounId } from '../../paradigms/pronouns'
import type { VerbTense } from '../../paradigms/tense'
import { type DisplayVerb, formatFormLabel } from '../../paradigms/verbs'
import { AnnotatedArabic } from '../atoms/AnnotatedArabic'
import { ArabicDisplay } from '../atoms/ArabicDisplay'
import { IconButton } from '../atoms/IconButton'
import { Text } from '../atoms/Text'
import { type Translate, useI18n } from '../hooks/useI18n'
import { LightBulbIcon } from '../icons/LightBulbIcon'
import { Modal } from '../molecules/Modal'

const KIND_COLORS: Record<ExplanationKind, string> = {
  radical: 'var(--color-insight-root)',
  measure: 'var(--color-insight-form)',
  agreement: 'var(--color-insight-suffix)',
  particle: 'var(--color-insight-tense)',
  elided: 'var(--color-insight-dropped)',
}

interface ConjugationInsightsProps {
  verb: DisplayVerb
  verbTense: VerbTense
  pronoun: PronounId
  arabic: string
}

function stepLabel(step: DerivationStep, verb: DisplayVerb, t: Translate): string {
  switch (step.type) {
    case 'root':
      return t('meta.root')
    case 'form':
      return t('meta.form.withNumber', { form: formatFormLabel(step.form, verb.root) })
    case 'pronoun':
      return t(`pronoun.${step.pronounId}`)
    case 'tense':
      return t(`tense.${step.verbTense}`)
  }
}

function DerivationSteps({ steps, verb, t }: { steps: readonly DerivationStep[]; verb: DisplayVerb; t: Translate }) {
  return (
    <StepsTable>
      {steps.map((step, i) => (
        <StepRow key={i} isFinal={i === steps.length - 1}>
          <StepLabel>{stepLabel(step, verb, t)}</StepLabel>
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
  const finalStep = annotation.at(-1)

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
            <DerivationSteps steps={annotation} verb={verb} t={t} />
          </VerbDisplayArea>
          {renderExplanation(resolveVerbExplanationLayers(verb, verbTense, pronoun, arabic), t).map((paragraph, pi) => (
            <Text key={pi}>
              {paragraph.map((sentence, si) => (
                <span key={si}>
                  {(si === 0 || paragraph[si - 1]?.kind !== sentence.kind) && (
                    <span style={{ color: KIND_COLORS[sentence.kind] }}>● </span>
                  )}
                  <span dangerouslySetInnerHTML={{ __html: sentence.text }} />{' '}
                </span>
              ))}
            </Text>
          ))}
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
