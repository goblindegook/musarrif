import { resolveNominalExplanationLayers } from '../../paradigms/explanation'
import { deriveMasdar } from '../../paradigms/nominal/masdar.ts'
import { isWeakLetter, normalizeHamza } from '../../paradigms/tokens.ts'
import { type DimensionProfile, exerciseDiacritics, random, randomNominalVerb } from '../dimensions.ts'
import {
  mixedWordDistractor,
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
    const verb = randomNominalVerb(profile, constraints)
    const masdar = random(deriveMasdar(verb))
    const word = exerciseDiacritics(masdar, profile.diacritics)
    const options = buildOptions(verb.root, word, profile)
    const answer = options.indexOf(verb.root)
    const explanation = resolveNominalExplanationLayers(verb, 'masdar', word)

    return {
      dimensions: ['nominals', 'forms', 'rootTypes', 'diacritics'],
      promptTranslationKey: 'exercise.prompt.masdarRoot',
      word,
      spokenWord: String(masdar),
      options: options.map((option) => Array.from(option).join(' ')),
      answer,
      cardKey: buildCardKey('masdarRoot', getSrsRootType(verb.root), verb.form),
      explanation,
      inputModes: ['multiple-choice'],
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

  return randomizeOptions(root, generators, profile, 4, [normalizeHamza])
}
