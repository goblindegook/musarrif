import type { AnnotatedForm } from '../annotation'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugateImperative } from './imperative'
import { annotateActivePresentMood } from './present-annotation'

export function annotateActiveImperative(verb: Verb, pronounId: PronounId): AnnotatedForm {
  const word = conjugateImperative(verb)[pronounId]
  const jussiveAnnotation = annotateActivePresentMood(verb, 'jussive', pronounId)
  const jussiveStep = jussiveAnnotation.steps[jussiveAnnotation.steps.length - 1]
  const elidedPrefix = { text: jussiveStep.morphemes[0].text, role: 'elided' as const }

  return {
    steps: [
      ...jussiveAnnotation.steps,
      {
        kind: { type: 'tense', verbTense: 'active.imperative' },
        arabic: String(word),
        morphemes: [elidedPrefix, ...word.toMorphemes()],
      },
    ],
  }
}
