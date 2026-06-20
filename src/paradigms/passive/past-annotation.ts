import { annotatePast } from '../active/past-annotation'
import type { AnnotatedForm, DerivationStep } from '../annotation'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugatePassivePast } from './past'

export function annotatePassivePast(verb: Verb, pronounId: PronounId): AnnotatedForm {
  const activePastAnnotation = annotatePast(verb, '3ms')
  const allForms = conjugatePassivePast(verb)

  const steps: readonly DerivationStep[] = [
    activePastAnnotation.steps[0],
    activePastAnnotation.steps[1],
    {
      kind: { type: 'tense', verbTense: 'passive.past' },
      arabic: String(allForms['3ms']),
      morphemes: allForms['3ms'].morphemes,
    },
  ]

  if (pronounId === '3ms') return { steps }

  return {
    steps: [
      ...steps,
      {
        kind: { type: 'pronoun', pronounId },
        arabic: String(allForms[pronounId]),
        morphemes: allForms[pronounId].morphemes,
      },
    ],
  }
}
