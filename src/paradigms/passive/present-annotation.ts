import {
  type AnnotatedForm,
  buildMorphemes,
  type DerivationStep,
  type MorphemeRole,
  type TaggedChar,
} from '../annotation'
import type { PronounId } from '../pronouns'
import type { Mood } from '../tense'
import type { Verb } from '../verbs'
import { annotatePassivePast } from './past-annotation'
import { conjugatePassivePresentMood } from './present'

const PASSIVE_PRESENT_TENSE_PREFIX_CHARS = 2

const PASSIVE_INDICATIVE_SUFFIX_COUNTS: Record<PronounId, number> = {
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

const PASSIVE_SUBJUNCTIVE_SUFFIX_COUNTS: Record<PronounId, number> = {
  '1s': 1,
  '2ms': 1,
  '2fs': 2,
  '3ms': 1,
  '3fs': 1,
  '2d': 2,
  '3md': 2,
  '3fd': 2,
  '1p': 1,
  '2mp': 4,
  '2fp': 3,
  '3mp': 4,
  '3fp': 3,
}

const PASSIVE_PRESENT_MOOD_SUFFIX_COUNTS: Record<Mood, Record<PronounId, number>> = {
  indicative: PASSIVE_INDICATIVE_SUFFIX_COUNTS,
  subjunctive: PASSIVE_SUBJUNCTIVE_SUFFIX_COUNTS,
  jussive: PASSIVE_SUBJUNCTIVE_SUFFIX_COUNTS,
}

function tagPassivePresentStemChars(chars: string[]): TaggedChar[] {
  return chars.map((char, i) => ({
    char,
    role: i < PASSIVE_PRESENT_TENSE_PREFIX_CHARS ? ('tense' as MorphemeRole) : ('root' as MorphemeRole),
  }))
}

function tagPassivePresentChars(chars: string[], suffixCount: number): TaggedChar[] {
  const stemCount = chars.length - suffixCount
  const stemTagged = tagPassivePresentStemChars(chars.slice(0, stemCount))
  const suffixTagged: TaggedChar[] = chars.slice(stemCount).map((char) => ({ char, role: 'suffix' as MorphemeRole }))
  return [...stemTagged, ...suffixTagged]
}

export function annotatePassivePresentMood(verb: Verb, mood: Mood, pronounId: PronounId): AnnotatedForm {
  const passivePresentMood = conjugatePassivePresentMood(verb, mood)

  if (mood !== 'indicative') {
    const indicativeAnnotation = annotatePassivePresentMood(verb, 'indicative', pronounId)
    const suffixCount = PASSIVE_PRESENT_MOOD_SUFFIX_COUNTS[mood][pronounId]
    const moodMorphemes = buildMorphemes(tagPassivePresentChars([...passivePresentMood[pronounId]], suffixCount))
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
    tagPassivePresentChars([...passivePresentMood[pronounId]], PASSIVE_INDICATIVE_SUFFIX_COUNTS[pronounId]),
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
