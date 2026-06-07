import { conjugate } from '../../paradigms/conjugation'
import { resolveVerbExplanationLayers } from '../../paradigms/explanation'
import { normalizeHamza, tokenize } from '../../paradigms/tokens.ts'
import {
  type DimensionProfile,
  exerciseDiacritics,
  normalizeExercisePronoun,
  randomPronoun,
  randomTense,
  randomVerb,
} from '../dimensions.ts'
import {
  mixedWordDistractor,
  randomizeOptions,
  singleLetterWordDistractor,
  weakAlternativeRootDistractor,
  wordSliceDistractor,
} from '../distractors.ts'
import { defineExercise } from '../exercises.ts'
import { buildCardKey, getSrsRootType } from '../srs.ts'

export const verbRootExercise = defineExercise('verbRoot', (profile, constraints) => {
  const verb = randomVerb(profile, constraints)
  const tense = constraints?.tense ?? randomTense(verb, profile.tenses)
  const pronoun = normalizeExercisePronoun(
    verb,
    tense,
    constraints?.pronoun ?? randomPronoun(verb, tense, profile.pronouns),
  )
  const conjugatedVerb = conjugate(verb, tense)[pronoun]
  const explanation = resolveVerbExplanationLayers(verb, tense, pronoun, conjugatedVerb)

  const word = exerciseDiacritics(conjugatedVerb, profile.diacritics)
  const options = buildOptions(verb.root, word, profile)

  return {
    dimensions: ['forms', 'rootTypes', 'diacritics'],
    promptTranslationKey: 'exercise.prompt.verbRoot',
    word,
    spokenWord: conjugatedVerb,
    options: options.map((option) => Array.from(option).join(' ')),
    answer: options.indexOf(verb.root),
    cardKey: buildCardKey('verbRoot', getSrsRootType(verb.root), verb.form, tense, pronoun),
    explanation,
    inputModes: ['multiple-choice'],
  }
})

function buildOptions(answer: string, word: string, profile: DimensionProfile): readonly string[] {
  const generators = [
    singleLetterWordDistractor(answer),
    wordSliceDistractor(word, answer.length),
    mixedWordDistractor(word, answer.length),
    tokenize(answer).some((t) => t.isWeak) ? weakAlternativeRootDistractor(answer) : null,
  ].filter((generator) => generator != null)

  return randomizeOptions(answer, generators, profile, 4, [normalizeHamza])
}
