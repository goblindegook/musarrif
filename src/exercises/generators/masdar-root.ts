import { resolveNominalExplanationLayers } from '../../paradigms/explanation'
import { isWeakLetter } from '../../paradigms/letters.ts'
import { deriveMasdar } from '../../paradigms/nominal/masdar.ts'
import { type DimensionProfile, exerciseDiacritics, random, randomVerb } from '../dimensions.ts'
import {
  mixedWordDistractor,
  normalizeRootDistractorHamza,
  randomizeOptions,
  singleLetterWordDistractor,
  weakAlternativeRootDistractor,
  wordSliceDistractor,
} from '../distractors.ts'
import { defineExercise } from '../exercises.ts'
import { buildCardKey, getSrsRootType } from '../srs.ts'

export const masdarRootExercise = defineExercise(
  'masdarRoot',
  (profile, constraints) => {
    const verb = randomVerb(profile, constraints)
    const masdar = exerciseDiacritics(random(deriveMasdar(verb)), profile.diacritics)
    const options = buildOptions(verb.root, masdar, profile)
    const answer = options.indexOf(verb.root)
    const explanation = resolveNominalExplanationLayers(verb, 'masdar', masdar)

    return {
      dimensions: ['nominals', 'forms', 'rootTypes', 'diacritics'],
      promptTranslationKey: 'exercise.prompt.masdarRoot',
      word: masdar,
      options: options.map((option) => Array.from(option).join(' ')),
      answer,
      cardKey: buildCardKey('masdarRoot', getSrsRootType(verb.root), verb.form),
      explanations: options.map((_, index) => (index === answer ? null : explanation)),
    }
  },
  {
    minNominals: 2,
  },
)

function buildOptions(root: string, word: string, profile: DimensionProfile): readonly string[] {
  const generators = [
    singleLetterWordDistractor(root),
    wordSliceDistractor(word, root.length),
    mixedWordDistractor(word, root.length),
    Array.from(root).some(isWeakLetter) ? weakAlternativeRootDistractor(root) : null,
  ].filter((generator) => generator != null)

  return randomizeOptions(root, generators, profile, 4, [normalizeRootDistractorHamza])
}
