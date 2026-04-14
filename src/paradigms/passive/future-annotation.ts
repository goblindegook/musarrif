import { type AnnotatedForm, buildMorphemes, FUTURE_SUFFIX_COUNTS, type TaggedChar } from '../annotation'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugatePassiveFuture } from './future'
import { annotatePassivePresentMood } from './present-annotation'

const PASSIVE_FUTURE_SEEN_CHARS = 2
const PASSIVE_FUTURE_PERSON_PREFIX_CHARS = 2

function tagPassiveFutureChars(chars: string[], suffixCount: number): TaggedChar[] {
  const stemCount = chars.length - suffixCount
  const personPrefixEnd = PASSIVE_FUTURE_SEEN_CHARS + PASSIVE_FUTURE_PERSON_PREFIX_CHARS
  return chars.map((char, i) => ({
    char,
    role: i < PASSIVE_FUTURE_SEEN_CHARS ? 'tense' : i < personPrefixEnd ? 'suffix' : i < stemCount ? 'root' : 'suffix',
  }))
}

export function annotatePassiveFuture(verb: Verb, pronounId: PronounId): AnnotatedForm {
  const presentAnnotation = annotatePassivePresentMood(verb, 'indicative', pronounId)

  const future = conjugatePassiveFuture(verb)
  const suffixCount = pronounId === '3ms' ? 0 : FUTURE_SUFFIX_COUNTS[pronounId]
  const morphemes = buildMorphemes(tagPassiveFutureChars([...future[pronounId]], suffixCount))

  return {
    morphemes,
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
