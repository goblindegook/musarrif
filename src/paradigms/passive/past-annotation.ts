import { annotatePast } from '../active/past-annotation'
import type { DerivationStep } from '../annotation'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugatePassivePast } from './past'

export function annotatePassivePast(verb: Verb, pronounId: PronounId): readonly DerivationStep[] {
  const activePastAnnotation = annotatePast(verb, '3ms')
  const allForms = conjugatePassivePast(verb)

  const steps: readonly DerivationStep[] = [
    activePastAnnotation[0],
    activePastAnnotation[1],
    {
      type: 'tense',
      verbTense: 'passive.past',
      morphemes: allForms['3ms'].morphemes,
    },
  ]

  if (pronounId === '3ms') return steps

  return [
    ...steps,
    {
      type: 'pronoun',
      pronounId,
      morphemes: allForms[pronounId].morphemes,
    },
  ]
}
