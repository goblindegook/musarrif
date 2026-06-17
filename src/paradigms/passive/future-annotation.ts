import { type AnnotatedForm, buildMorphemes, PRESENT_INDICATIVE_SUFFIX_COUNTS, tagFutureChars } from '../annotation'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugatePassiveFuture } from './future'
import { annotatePassivePresentMood } from './present-annotation'

export function annotatePassiveFuture(verb: Verb, pronounId: PronounId): AnnotatedForm {
  const presentAnnotation = annotatePassivePresentMood(verb, 'indicative', pronounId)

  const future = conjugatePassiveFuture(verb)
  const suffixCount = pronounId === '3ms' ? 0 : PRESENT_INDICATIVE_SUFFIX_COUNTS[pronounId]
  const morphemes = buildMorphemes(tagFutureChars([...future[pronounId]], suffixCount))

  return {
    steps: [
      ...presentAnnotation.steps,
      {
        kind: { type: 'tense', verbTense: 'passive.future' },
        arabic: future[pronounId],
        morphemes,
      },
    ],
  }
}
