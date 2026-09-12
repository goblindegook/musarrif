import { resolveNominalExplanationLayers } from '../../paradigms/explanation'
import { deriveMasdar } from '../../paradigms/nominal/masdar.ts'
import { normalizeHamza } from '../../paradigms/tokens.ts'
import type { Verb } from '../../paradigms/verbs.ts'
import { exerciseDiacritics, random, randomNominalVerb } from '../dimensions.ts'
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
    const word = exerciseDiacritics(masdar)
    const options = buildOptions(verb, word)
    const answer = options.indexOf(verb.root)
    const explanation = resolveNominalExplanationLayers(verb, 'masdar', word)

    return {
      dimensions: ['nominals', 'forms', 'rootTypes'],
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

function buildOptions(verb: Verb, word: string): readonly string[] {
  const generators = [
    singleLetterWordDistractor(verb.root),
    wordSliceDistractor(word, verb.root.length),
    mixedWordDistractor(word, verb.root.length),
    Array.from(verb.rootTokens).some((t) => t.isWeak) ? weakAlternativeRootDistractor(verb.root) : null,
  ].filter((generator) => generator != null)

  return randomizeOptions(verb.root, generators, 4, [normalizeHamza])
}
