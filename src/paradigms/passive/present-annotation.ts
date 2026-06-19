import {
  type AnnotatedForm,
  buildMorphemes,
  type DerivationStep,
  PRESENT_INDICATIVE_SUFFIX_COUNTS,
  PRESENT_MOOD_SUFFIX_COUNTS,
  type TaggedChar,
  tagChars,
} from '../annotation'
import type { PronounId } from '../pronouns'
import type { Mood } from '../tense'
import type { Verb } from '../verbs'
import { annotatePassivePast } from './past-annotation'
import { conjugatePassivePresentMood } from './present'

const PASSIVE_PRESENT_TENSE_PREFIX_CHARS = 2
const PASSIVE_PRESENT_FORM_INFIX_CHARS: Partial<Record<number, number>> = { 5: 2, 6: 2, 7: 2, 10: 4 }
const PASSIVE_PRESENT_FORM_INFIX_INDEX: Partial<Record<number, number>> = { 3: 4, 6: 6 }

function tagPassivePresentStemChars(chars: string[], verb: Verb): TaggedChar[] {
  const formInfixChars = verb.root.length === 3 ? (PASSIVE_PRESENT_FORM_INFIX_CHARS[verb.form] ?? 0) : 0
  const formInfixEnd = PASSIVE_PRESENT_TENSE_PREFIX_CHARS + formInfixChars
  const nonContiguousFormIndex = verb.root.length === 3 ? (PASSIVE_PRESENT_FORM_INFIX_INDEX[verb.form] ?? -1) : -1
  return chars.map((char, i) => ({
    char,
    role:
      i < PASSIVE_PRESENT_TENSE_PREFIX_CHARS
        ? 'agreement'
        : i < formInfixEnd || i === nonContiguousFormIndex
          ? 'measure'
          : 'radical',
  }))
}

export function annotatePassivePresentMood(verb: Verb, mood: Mood, pronounId: PronounId): AnnotatedForm {
  const passivePresentMood = conjugatePassivePresentMood(verb, mood)

  if (mood !== 'indicative') {
    const indicativeAnnotation = annotatePassivePresentMood(verb, 'indicative', pronounId)
    const suffixCount = PRESENT_MOOD_SUFFIX_COUNTS[mood][pronounId]
    const moodMorphemes = buildMorphemes(
      tagChars([...passivePresentMood[pronounId]], suffixCount, (stem) => tagPassivePresentStemChars(stem, verb)),
    )
    return {
      steps: [
        ...indicativeAnnotation.steps,
        {
          kind: { type: 'tense', verbTense: `passive.present.${mood}` },
          arabic: passivePresentMood[pronounId],
          morphemes: moodMorphemes,
        },
      ],
    }
  }

  const pastAnnotation = annotatePassivePast(verb, '3ms')
  const rootStep = pastAnnotation.steps[0]
  const formStep = pastAnnotation.steps[1]

  const stemMorphemes = buildMorphemes(tagPassivePresentStemChars([...passivePresentMood['3ms']], verb))
  const presentIndicativeStep: DerivationStep = {
    kind: { type: 'tense', verbTense: 'passive.present.indicative' },
    arabic: passivePresentMood['3ms'],
    morphemes: stemMorphemes,
  }

  if (pronounId === '3ms') {
    return { steps: [rootStep, formStep, presentIndicativeStep] }
  }

  const pronounMorphemes = buildMorphemes(
    tagChars([...passivePresentMood[pronounId]], PRESENT_INDICATIVE_SUFFIX_COUNTS[pronounId], (stem) =>
      tagPassivePresentStemChars(stem, verb),
    ),
  )
  return {
    steps: [
      rootStep,
      formStep,
      presentIndicativeStep,
      {
        kind: { type: 'pronoun', pronounId },
        arabic: passivePresentMood[pronounId],
        morphemes: pronounMorphemes,
      },
    ],
  }
}
