import { isWeakLetter } from '../paradigms/letters'
import { deriveMasdar } from '../paradigms/nominal/masdar'
import { getRootType } from '../paradigms/roots'
import type { DisplayVerb } from '../paradigms/verbs'
import { type DimensionProfile, exerciseDiacritics, random, randomGeneratedVerb, randomVerb } from './dimensions'
import { randomizeOptions, singleLetterWordDistractor, weakAlternativeRootDistractor } from './distractors'
import { defineExercise } from './exercises'
import { buildCardKey } from './srs'

export const masdarVerbExercise = defineExercise(
  'masdarVerb',
  (profile, constraints) => {
    const verb = randomVerb(profile, constraints)
    const word = exerciseDiacritics(random(deriveMasdar(verb)), profile.diacritics)
    const options = buildOptions(verb, profile)
    const answerLabel = exerciseDiacritics(verb.label, profile.diacritics)

    return {
      promptTranslationKey: 'exercise.prompt.masdarVerb',
      word,
      options,
      answer: options.indexOf(answerLabel),
      cardKey: buildCardKey('masdarVerb', getRootType(verb.root), verb.form),
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
