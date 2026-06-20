import type { AnnotatedForm } from '../annotation'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugateFuture } from './future'
import { annotateActivePresentMood } from './present-annotation'

export function annotateActiveFuture(verb: Verb, pronounId: PronounId): AnnotatedForm {
  const presentIndicativeAnnotation = annotateActivePresentMood(verb, 'indicative', pronounId)
  const word = conjugateFuture(verb)[pronounId]

  return {
    steps: [
      ...presentIndicativeAnnotation.steps,
      {
        kind: { type: 'tense', verbTense: 'active.future' },
        arabic: String(word),
        morphemes: word.morphemes,
      },
    ],
  }
}
