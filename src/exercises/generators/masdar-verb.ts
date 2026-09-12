import { resolveNominalExplanationLayers } from '../../paradigms/explanation'
import { deriveMasdar } from '../../paradigms/nominal/masdar.ts'
import type { DisplayVerb } from '../../paradigms/verbs.ts'
import { exerciseDiacritics, random, randomGeneratedVerb, randomNominalVerb } from '../dimensions.ts'
import { randomizeOptions, singleLetterWordDistractor, weakAlternativeRootDistractor } from '../distractors.ts'
import { defineExercise } from '../exercises.ts'
import { buildCardKey, getSrsRootType } from '../srs.ts'

export const masdarVerbExercise = defineExercise(
  'masdarVerb',
  (profile, constraints) => {
    const verb = randomNominalVerb(profile, constraints)
    const masdar = random(deriveMasdar(verb))
    const word = exerciseDiacritics(String(masdar))
    const options = buildOptions(verb)
    const answerLabel = exerciseDiacritics(verb.lemma)
    const answer = options.indexOf(answerLabel)
    const explanation = resolveNominalExplanationLayers(verb, 'masdar', word)

    return {
      dimensions: ['nominals', 'forms', 'rootTypes'],
      promptTranslationKey: 'exercise.prompt.masdarVerb',
      word,
      spokenWord: String(masdar),
      options,
      answer,
      answerText: String(verb.lemma),
      cardKey: buildCardKey('masdarVerb', getSrsRootType(verb.root), verb.form),
      explanation,
      inputModes: ['multiple-choice', 'keyboard', 'speech'],
    }
  },
  {
    minNominals: 2,
  },
)

function buildOptions(verb: DisplayVerb): readonly string[] {
  const answer = exerciseDiacritics(verb.lemma)

  const generators = [
    sameRootDifferentFormDistractor(verb),
    singleLetterDistractor(verb),
    verb.rootTokens.some((t) => t.isWeak) ? weakAlternativeDistractor(verb) : null,
    mediumDifferentFormSingleLetterDistractor(verb),
  ].filter((generator) => generator != null)

  return randomizeOptions(answer, generators)
}

function sameRootDifferentFormDistractor(verb: DisplayVerb): () => string {
  return () => {
    const candidate = randomGeneratedVerb(verb.root)
    return exerciseDiacritics(candidate.lemma)
  }
}

function weakAlternativeDistractor(verb: DisplayVerb): () => string {
  const rootGenerator = weakAlternativeRootDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator(), verb.form)
    return exerciseDiacritics(candidate.lemma)
  }
}

function singleLetterDistractor(verb: DisplayVerb): () => string {
  const rootGenerator = singleLetterWordDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator(), verb.form)
    return exerciseDiacritics(candidate.lemma)
  }
}

function mediumDifferentFormSingleLetterDistractor(verb: DisplayVerb): () => string {
  const rootGenerator = singleLetterWordDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator())
    return exerciseDiacritics(candidate.lemma)
  }
}
