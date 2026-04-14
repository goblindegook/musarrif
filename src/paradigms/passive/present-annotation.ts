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

function tagPassivePresentStemChars(chars: string[]): TaggedChar[] {
  return chars.map((char, i) => ({
    char,
    role: i < PASSIVE_PRESENT_TENSE_PREFIX_CHARS ? 'tense' : 'root',
  }))
}

export function annotatePassivePresentMood(verb: Verb, mood: Mood, pronounId: PronounId): AnnotatedForm {
  const passivePresentMood = conjugatePassivePresentMood(verb, mood)

  if (mood !== 'indicative') {
    const indicativeAnnotation = annotatePassivePresentMood(verb, 'indicative', pronounId)
    const suffixCount = PRESENT_MOOD_SUFFIX_COUNTS[mood][pronounId]
    const moodMorphemes = buildMorphemes(
      tagChars([...passivePresentMood[pronounId]], suffixCount, tagPassivePresentStemChars),
    )
    return {
      morphemes: moodMorphemes,
      steps: [
        ...indicativeAnnotation.steps,
        {
          kind: { type: 'tense', verbTense: `passive.present.${mood}` as const },
          arabic: passivePresentMood[pronounId],
          morphemes: moodMorphemes,
        },
      ],
    }
  }

  const pastAnnotation = annotatePassivePast(verb, '3ms')
  const rootStep = pastAnnotation.steps[0]
  const formStep = pastAnnotation.steps[1]

  const stemMorphemes = buildMorphemes(tagPassivePresentStemChars([...passivePresentMood['3ms']]))
  const presentIndicativeStep: DerivationStep = {
    kind: { type: 'tense', verbTense: 'passive.present.indicative' },
    arabic: passivePresentMood['3ms'],
    morphemes: stemMorphemes,
  }

  if (pronounId === '3ms') {
    return { morphemes: stemMorphemes, steps: [rootStep, formStep, presentIndicativeStep] }
  }

  const pronounMorphemes = buildMorphemes(
    tagChars(
      [...passivePresentMood[pronounId]],
      PRESENT_INDICATIVE_SUFFIX_COUNTS[pronounId],
      tagPassivePresentStemChars,
    ),
  )
  return {
    morphemes: pronounMorphemes,
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
