import type { DerivationStep } from '../annotation'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugatePassiveFuture } from './future'
import { passivePresentMoodDerivationSteps } from './present-annotation'

export function passiveFutureDerivationSteps(verb: Verb, pronounId: PronounId): readonly DerivationStep[] {
  return [
    ...passivePresentMoodDerivationSteps(verb, 'indicative', pronounId),
    {
      type: 'tense',
      tense: 'passive.future',
      morphemes: conjugatePassiveFuture(verb)[pronounId].morphemes,
    },
  ]
}
