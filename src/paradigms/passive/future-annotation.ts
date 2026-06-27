import type { DerivationStep } from '../annotation'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugatePassiveFuture } from './future'
import { annotatePassivePresentMood } from './present-annotation'

export function annotatePassiveFuture(verb: Verb, pronounId: PronounId): readonly DerivationStep[] {
  const word = conjugatePassiveFuture(verb)[pronounId]

  return [
    ...annotatePassivePresentMood(verb, 'indicative', pronounId),
    {
      type: 'tense',
      verbTense: 'passive.future',
      morphemes: word.morphemes,
    },
  ]
}
