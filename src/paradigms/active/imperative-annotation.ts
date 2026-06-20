import type { AnnotatedForm } from '../annotation'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { elidedMorpheme } from '../word'
import { conjugateImperative } from './imperative'
import { annotateActivePresentMood } from './present-annotation'

export function annotateActiveImperative(verb: Verb, pronounId: PronounId): AnnotatedForm {
  const word = conjugateImperative(verb)[pronounId]
  const jussive = annotateActivePresentMood(verb, 'jussive', pronounId)

  return {
    steps: [
      ...jussive.steps,
      {
        kind: { type: 'tense', verbTense: 'active.imperative' },
        arabic: String(word),
        morphemes: [elidedMorpheme(...(jussive.steps.at(-1)?.morphemes[0].tokens ?? [])), ...word.morphemes],
      },
    ],
  }
}
