import type { AnnotatedForm } from '../annotation'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugatePassiveFuture } from './future'
import { annotatePassivePresentMood } from './present-annotation'

export function annotatePassiveFuture(verb: Verb, pronounId: PronounId): AnnotatedForm {
  const word = conjugatePassiveFuture(verb)[pronounId]

  return {
    steps: [
      ...annotatePassivePresentMood(verb, 'indicative', pronounId).steps,
      {
        kind: { type: 'tense', verbTense: 'passive.future' },
        arabic: String(word),
        morphemes: word.morphemes,
      },
    ],
  }
}
