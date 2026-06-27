import type { DerivationStep } from '../annotation'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugateFuture } from './future'
import { annotateActivePresentMood } from './present-annotation'

export function annotateActiveFuture(verb: Verb, pronounId: PronounId): readonly DerivationStep[] {
  const word = conjugateFuture(verb)[pronounId]

  return [
    ...annotateActivePresentMood(verb, 'indicative', pronounId),
    {
      type: 'tense',
      verbTense: 'active.future',
      morphemes: word.morphemes,
    },
  ]
}
