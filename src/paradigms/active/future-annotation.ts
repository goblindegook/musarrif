import {
  type AnnotatedForm,
  buildMorphemes,
  FUTURE_SUFFIX_COUNTS,
  type MorphemeRole,
  type TaggedChar,
} from '../annotation'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugateFuture } from './future'
import { annotateActivePresentMood } from './present-annotation'

const FUTURE_SEEN_CHARS = 2
const FUTURE_PERSON_PREFIX_CHARS = 2

const FUTURE_FORM_INFIX_CHARS: Partial<Record<number, number>> = { 5: 2, 6: 2, 7: 2, 10: 4 }

const FUTURE_FORM_INFIX_INDEX: Partial<Record<number, number>> = { 3: 6, 6: 8 }

function tagFutureChars(
  chars: string[],
  suffixCount: number,
  formInfixChars = 0,
  nonContiguousFormIndex = -1,
): TaggedChar[] {
  const stemCount = chars.length - suffixCount
  const personPrefixEnd = FUTURE_SEEN_CHARS + FUTURE_PERSON_PREFIX_CHARS
  const formInfixEnd = personPrefixEnd + formInfixChars
  return chars.map((char, i) => ({
    char,
    role:
      i < FUTURE_SEEN_CHARS
        ? ('tense' as MorphemeRole)
        : i < personPrefixEnd
          ? ('suffix' as MorphemeRole)
          : i < formInfixEnd || i === nonContiguousFormIndex
            ? ('form' as MorphemeRole)
            : i < stemCount
              ? ('root' as MorphemeRole)
              : ('suffix' as MorphemeRole),
  }))
}

export function annotateActiveFuture(verb: Verb, pronounId: PronounId): AnnotatedForm {
  const presentIndicativeAnnotation = annotateActivePresentMood(verb, 'indicative', pronounId)
  const formInfixChars = verb.root.length === 3 ? (FUTURE_FORM_INFIX_CHARS[verb.form] ?? 0) : 0
  const nonContiguousFormIndex = verb.root.length === 3 ? (FUTURE_FORM_INFIX_INDEX[verb.form] ?? -1) : -1

  const allFutureForms = conjugateFuture(verb)
  const finalArabic = allFutureForms[pronounId]
  const suffixCount = pronounId === '3ms' ? 0 : FUTURE_SUFFIX_COUNTS[pronounId]
  const tagged = tagFutureChars([...finalArabic], suffixCount, formInfixChars, nonContiguousFormIndex)
  const morphemes = buildMorphemes(tagged)

  return {
    morphemes,
    steps: [
      ...presentIndicativeAnnotation.steps,
      {
        kind: { type: 'tense', verbTense: 'active.future' },
        arabic: finalArabic,
        morphemes,
      },
    ],
  }
}
