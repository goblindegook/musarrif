import { shuffle } from '@pacote/shuffle'
import { resolveVerbExplanationLayers } from '../paradigms/explanation'
import { stripDiacritics } from '../paradigms/letters'
import { ARABIC_PRONOUNS, type PronounId } from '../paradigms/pronouns'
import { conjugate, type VerbTense } from '../paradigms/tense'
import type { DisplayVerb } from '../paradigms/verbs'
import {
  type DimensionProfile,
  exerciseDiacritics,
  type PronounsLevel,
  randomPronoun,
  randomTense,
  randomVerb,
  rawPronounPool,
} from './dimensions'
import { defineExercise } from './exercises'
import { buildCardKey, getSrsRootType } from './srs'

export const verbPronounExercise = defineExercise(
  'verbPronoun',
  (profile, constraints) => {
    const verb = randomVerb(profile, constraints)
    const tense = constraints?.tense ?? randomTense(verb, profile.tenses)
    const pronoun = constraints?.pronoun ?? randomPronoun(verb, tense, profile.pronouns)
    const [word, options, answer] = buildOptions(verb, tense, pronoun, profile)

    return {
      promptTranslationKey: 'exercise.prompt.verbPronoun',
      word,
      options,
      answer,
      cardKey: buildCardKey('verbPronoun', getSrsRootType(verb.root), verb.form, tense, pronoun),
      explanation: resolveVerbExplanationLayers(verb, tense, pronoun, conjugate(verb, tense)[pronoun]),
    }
  },
  { weight: 2 },
)

function buildOptions(
  verb: DisplayVerb,
  tense: VerbTense,
  pronoun: PronounId,
  profile: DimensionProfile,
): [string, readonly string[], number] {
  const conjugated = conjugate(verb, tense)
  const word = exerciseDiacritics(conjugated[pronoun], profile.diacritics)

  // Use at least pronouns level 2 for distractor generation to ensure variety
  const minPronouns = Math.max(profile.pronouns, 2) as PronounsLevel
  const allPronouns = [...rawPronounPool(minPronouns)]

  const isSameConjugation = (p: PronounId): boolean => {
    const form = exerciseDiacritics(conjugated[p], profile.diacritics)
    return profile.diacritics >= 2 ? stripDiacritics(form) === stripDiacritics(word) : form === word
  }

  const eligible = allPronouns.filter(
    (p) => p !== pronoun && !isSameConjugation(p) && ARABIC_PRONOUNS[p] !== ARABIC_PRONOUNS[pronoun],
  )

  const distractors = shuffle(eligible).slice(0, 3)
  const allOptions = shuffle([pronoun, ...distractors])

  return [word, allOptions.map((p) => ARABIC_PRONOUNS[p]), allOptions.indexOf(pronoun)]
}
