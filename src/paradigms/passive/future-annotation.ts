import { type AnnotatedForm, buildMorphemes, type MorphemeRole, type TaggedChar } from '../annotation'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugatePassiveFuture } from './future'
import { annotatePassivePresentMood } from './present-annotation'

const PASSIVE_FUTURE_SUFFIX_COUNTS: Record<PronounId, number> = {
  '1s': 1,
  '2ms': 1,
  '2fs': 5,
  '3ms': 1,
  '3fs': 1,
  '2d': 4,
  '3md': 4,
  '3fd': 4,
  '1p': 1,
  '2mp': 4,
  '2fp': 3,
  '3mp': 4,
  '3fp': 3,
}

const PASSIVE_FUTURE_SEEN_CHARS = 2
const PASSIVE_FUTURE_PERSON_PREFIX_CHARS = 2

function tagPassiveFutureChars(chars: string[], suffixCount: number): TaggedChar[] {
  const stemCount = chars.length - suffixCount
  const personPrefixEnd = PASSIVE_FUTURE_SEEN_CHARS + PASSIVE_FUTURE_PERSON_PREFIX_CHARS
  return chars.map((char, i) => ({
    char,
    role:
      i < PASSIVE_FUTURE_SEEN_CHARS
        ? ('tense' as MorphemeRole)
        : i < personPrefixEnd
          ? ('suffix' as MorphemeRole)
          : i < stemCount
            ? ('root' as MorphemeRole)
            : ('suffix' as MorphemeRole),
  }))
}

export function annotatePassiveFuture(verb: Verb, pronounId: PronounId): AnnotatedForm {
  const presentAnnotation = annotatePassivePresentMood(verb, 'indicative', pronounId)

  const future = conjugatePassiveFuture(verb)
  const suffixCount = pronounId === '3ms' ? 0 : PASSIVE_FUTURE_SUFFIX_COUNTS[pronounId]
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
