import { resolveNominalExplanationLayers } from '../../paradigms/explanation'
import { deriveMasdar } from '../../paradigms/nominal/masdar.ts'
import type { DisplayVerb } from '../../paradigms/verbs.ts'
import {
  type DimensionProfile,
  exerciseDiacritics,
  random,
  randomGeneratedVerb,
  randomNominalVerb,
} from '../dimensions.ts'
import { randomizeOptions, singleLetterWordDistractor, weakAlternativeRootDistractor } from '../distractors.ts'
import { defineExercise } from '../exercises.ts'
import { buildCardKey, getSrsRootType } from '../srs.ts'

export const masdarVerbExercise = defineExercise(
  'masdarVerb',
  (profile, constraints) => {
    const verb = randomNominalVerb(profile, constraints)
    const masdar = random(deriveMasdar(verb))
    const word = exerciseDiacritics(String(masdar), profile.diacritics)
    const options = buildOptions(verb, profile)
    const answerLabel = exerciseDiacritics(verb.lemma, profile.diacritics)
    const answer = options.indexOf(answerLabel)
    const explanation = resolveNominalExplanationLayers(verb, 'masdar', word)

    return {
      dimensions: ['nominals', 'forms', 'rootTypes', 'diacritics'],
      promptTranslationKey: 'exercise.prompt.masdarVerb',
      word,
      spokenWord: String(masdar),
      options,
      answer,
      cardKey: buildCardKey('masdarVerb', getSrsRootType(verb.root), verb.form),
      explanation,
      inputModes: ['multiple-choice', 'keyboard', 'speech'],
    }
  },
  {
    minNominals: 2,
  },
)

function buildOptions(verb: DisplayVerb, profile: DimensionProfile): readonly string[] {
  const answer = exerciseDiacritics(verb.lemma, profile.diacritics)

  const generators = [
    sameRootDifferentFormDistractor(verb, profile),
    singleLetterDistractor(verb, profile),
    verb.rootTokens.some((t) => t.isWeak) ? weakAlternativeDistractor(verb, profile) : null,
    profile.diacritics >= 1 ? mediumDifferentFormSingleLetterDistractor(verb, profile) : null,
  ].filter((generator) => generator != null)

  return randomizeOptions(answer, generators, profile)
}

function sameRootDifferentFormDistractor(verb: DisplayVerb, profile: DimensionProfile): () => string {
  return () => {
    const candidate = randomGeneratedVerb(verb.root)
    return exerciseDiacritics(candidate.lemma, profile.diacritics)
  }
}

function weakAlternativeDistractor(verb: DisplayVerb, profile: DimensionProfile): () => string {
  const rootGenerator = weakAlternativeRootDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator(), verb.form)
    return exerciseDiacritics(candidate.lemma, profile.diacritics)
  }
}

function singleLetterDistractor(verb: DisplayVerb, profile: DimensionProfile): () => string {
  const rootGenerator = singleLetterWordDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator(), verb.form)
    return exerciseDiacritics(candidate.lemma, profile.diacritics)
  }
}

function mediumDifferentFormSingleLetterDistractor(verb: DisplayVerb, profile: DimensionProfile): () => string {
  const rootGenerator = singleLetterWordDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator())
    return exerciseDiacritics(candidate.lemma, profile.diacritics)
  }
}
