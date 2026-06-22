import type { AnnotatedForm } from '../annotation'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugateImperative } from './imperative'
import { annotateActivePresentMood } from './present-annotation'

export function annotateActiveImperative(verb: Verb, pronounId: PronounId): AnnotatedForm {
  const word = conjugateImperative(verb)[pronounId]
  const jussive = annotateActivePresentMood(verb, 'jussive', pronounId)
  const jussiveStep = jussive.steps[jussive.steps.length - 1]

  return {
    steps: [
      ...jussive.steps,
      {
        kind: { type: 'tense', verbTense: 'active.imperative' },
        arabic: String(word),
        morphemes: [jussiveStep.morphemes[0].toElided(), ...word.morphemes],
      },
    ],
  }
}
