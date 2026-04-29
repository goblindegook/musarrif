import { resolveNominalExplanationLayers } from '../../paradigms/explanation'
import { isWeakLetter } from '../../paradigms/letters.ts'
import { deriveMasdar } from '../../paradigms/nominal/masdar.ts'
import type { DisplayVerb } from '../../paradigms/verbs.ts'
import { type DimensionProfile, exerciseDiacritics, random, randomGeneratedVerb, randomVerb } from '../dimensions.ts'
import { randomizeOptions, singleLetterWordDistractor, weakAlternativeRootDistractor } from '../distractors.ts'
import { defineExercise } from '../exercises.ts'
import { buildCardKey, getSrsRootType } from '../srs.ts'

export const masdarVerbExercise = defineExercise(
  'masdarVerb',
  (profile, constraints) => {
    const verb = randomVerb(profile, constraints)
    const word = exerciseDiacritics(random(deriveMasdar(verb)), profile.diacritics)
    const options = buildOptions(verb, profile)
    const answerLabel = exerciseDiacritics(verb.label, profile.diacritics)
    const answer = options.indexOf(answerLabel)
    const explanation = resolveNominalExplanationLayers(verb, 'masdar', word)

    return {
      dimensions: ['nominals', 'forms', 'rootTypes', 'diacritics'],
      promptTranslationKey: 'exercise.prompt.masdarVerb',
      word,
      options,
      answer,
      cardKey: buildCardKey('masdarVerb', getSrsRootType(verb.root), verb.form),
      explanations: options.map((_, index) => (index === answer ? null : explanation)),
    }
  },
  {
    minNominals: 2,
  },
)

function buildOptions(verb: DisplayVerb, profile: DimensionProfile): readonly string[] {
  const answer = exerciseDiacritics(verb.label, profile.diacritics)

  const generators = [
    sameRootDifferentFormDistractor(verb, profile),
    singleLetterDistractor(verb, profile),
    Array.from(verb.root).some(isWeakLetter) ? weakAlternativeDistractor(verb, profile) : null,
    profile.diacritics >= 1 ? mediumDifferentFormSingleLetterDistractor(verb, profile) : null,
  ].filter((generator) => generator != null)

  return randomizeOptions(answer, generators, profile)
}

function sameRootDifferentFormDistractor(verb: DisplayVerb, profile: DimensionProfile): () => string {
  return () => {
    const candidate = randomGeneratedVerb(verb.root)
    return exerciseDiacritics(candidate.label, profile.diacritics)
  }
}

function weakAlternativeDistractor(verb: DisplayVerb, profile: DimensionProfile): () => string {
  const rootGenerator = weakAlternativeRootDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator(), verb.form)
    return exerciseDiacritics(candidate.label, profile.diacritics)
  }
}

function singleLetterDistractor(verb: DisplayVerb, profile: DimensionProfile): () => string {
  const rootGenerator = singleLetterWordDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator(), verb.form)
    return exerciseDiacritics(candidate.label, profile.diacritics)
  }
}

function mediumDifferentFormSingleLetterDistractor(verb: DisplayVerb, profile: DimensionProfile): () => string {
  const rootGenerator = singleLetterWordDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator())
    return exerciseDiacritics(candidate.label, profile.diacritics)
  }
}
