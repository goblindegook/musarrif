import type { DerivationStep } from '../annotation'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugatePassiveFuture } from './future'
import { passivePresentMoodDerivationSteps } from './present-annotation'

export function passiveFutureDerivationSteps(verb: Verb, pronounId: PronounId): readonly DerivationStep[] {
  const word = conjugatePassiveFuture(verb)[pronounId]

  return [
    ...passivePresentMoodDerivationSteps(verb, 'indicative', pronounId),
    {
      type: 'tense',
      verbTense: 'passive.future',
      morphemes: word.morphemes,
    },
  ]
}
