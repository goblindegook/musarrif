import { shuffle } from '@pacote/shuffle'
import { conjugate } from '../../paradigms/conjugation'
import { resolveVerbExplanationLayers } from '../../paradigms/explanation'
import { ARABIC_PRONOUNS, type PronounId } from '../../paradigms/pronouns.ts'
import type { VerbTense } from '../../paradigms/tense.ts'
import type { DisplayVerb } from '../../paradigms/verbs.ts'
import {
  type DimensionProfile,
  exerciseDiacritics,
  normalizeExercisePronoun,
  type PronounsLevel,
  pronounPool,
  randomPronoun,
  randomTense,
  randomVerb,
} from '../dimensions.ts'
import { defineExercise } from '../exercises.ts'
import { buildCardKey, getSrsRootType } from '../srs.ts'

export const verbPronounExercise = defineExercise(
  'verbPronoun',
  (profile, constraints) => {
    const verb = randomVerb(profile, constraints)
    const tense = constraints?.tense ?? randomTense(verb, profile.tenses)
    const pronoun = normalizeExercisePronoun(
      verb,
      tense,
      constraints?.pronoun ?? randomPronoun(verb, tense, profile.pronouns),
    )
    const conjugatedWord = conjugate(verb, tense)[pronoun]
    const explanation = resolveVerbExplanationLayers(verb, tense, pronoun, conjugatedWord)
    const [word, options] = buildOptions(verb, tense, pronoun, profile)
    const answer = options.indexOf(pronoun)

    return {
      word,
      promptTranslationKey: 'exercise.prompt.verbPronoun',
      options: options.map((p) => ARABIC_PRONOUNS[p]),
      answer,
      cardKey: buildCardKey('verbPronoun', getSrsRootType(verb.root), verb.form, tense, pronoun),
      dimensions: ['pronouns', 'forms', 'rootTypes', 'diacritics'],
      explanations: options.map((_, index) => (index === answer ? null : explanation)),
    }
  },
  { weight: 2 },
)

function buildOptions(
  verb: DisplayVerb,
  tense: VerbTense,
  pronoun: PronounId,
  profile: DimensionProfile,
): [string, readonly string[]] {
  const conjugated = conjugate(verb, tense)
  const word = exerciseDiacritics(conjugated[pronoun], profile.diacritics)

  // Exclude dual pronouns unless the user has reached that level
  const pronouns = pronounPool(Math.max(profile.pronouns, 2) as PronounsLevel)

  const eligible = pronouns.filter(
    (p) =>
      word !== exerciseDiacritics(conjugated[p], profile.diacritics) && ARABIC_PRONOUNS[p] !== ARABIC_PRONOUNS[pronoun],
  )

  const distractors = shuffle(eligible).slice(0, 3)
  const options = shuffle([pronoun, ...distractors])

  return [word, options]
}
