import { isWeakLetter } from '../paradigms/letters'
import { deriveMasdar } from '../paradigms/nominal/masdar'
import { type DimensionProfile, exerciseDiacritics, random, randomVerb } from './dimensions'
import {
  mixedWordDistractor,
  normalizeRootDistractorHamza,
  randomizeOptions,
  singleLetterWordDistractor,
  weakAlternativeRootDistractor,
  wordSliceDistractor,
} from './distractors'
import { defineExercise } from './exercises'
import { buildCardKey, getSrsRootType } from './srs'

export const masdarRootExercise = defineExercise(
  'masdarRoot',
  (profile, constraints) => {
    const verb = randomVerb(profile, constraints)
    const masdar = exerciseDiacritics(random(deriveMasdar(verb)), profile.diacritics)
    const options = buildOptions(verb.root, masdar, profile)

    return {
      dimensions: ['nominals', 'forms', 'rootTypes', 'diacritics'],
      promptTranslationKey: 'exercise.prompt.masdarRoot',
      word: masdar,
      options: options.map((option) => Array.from(option).join(' ')),
      answer: options.indexOf(verb.root),
      cardKey: buildCardKey('masdarRoot', getSrsRootType(verb.root), verb.form),
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
