import type { DerivationSteps } from '../annotation'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugateFuture } from './future'
import { activePresentMoodDerivationSteps } from './present-annotation'

export function activeFutureDerivationSteps(verb: Verb, pronounId: PronounId): DerivationSteps {
  const word = conjugateFuture(verb)[pronounId]

  return [
    ...activePresentMoodDerivationSteps(verb, 'indicative', pronounId),
    {
      type: 'tense',
      verbTense: 'active.future',
      morphemes: word.morphemes,
    },
  ]
}
