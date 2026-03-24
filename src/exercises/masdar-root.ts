import { isWeakLetter } from '../paradigms/letters'
import { deriveMasdar } from '../paradigms/nominal/masdar'
import { getRootType } from '../paradigms/roots'
import { type DimensionProfile, exerciseDiacritics, random, randomVerb } from './dimensions'
import { randomizeOptions } from './distractors/distractors'
import { weakAlternativeRootDistractor } from './distractors/root-distractors'
import { mixedWordDistractor, singleLetterWordDistractor, wordSliceDistractor } from './distractors/word-distractors'
import type { CardConstraints } from './srs'
import { buildCardKey } from './srs'
import type { Exercise } from './types'

export function masdarRootExercise(profile: DimensionProfile, constraints?: CardConstraints): Exercise {
  const verb = randomVerb(profile, constraints)
  const masdar = exerciseDiacritics(random(deriveMasdar(verb)), profile.diacritics)
  const options = buildOptions(verb.root, masdar, profile)

  return {
    kind: 'masdarRoot',
    promptTranslationKey: 'exercise.prompt.masdarRoot',
    word: masdar,
    options: options.map((option) => Array.from(option).join(' ')),
    answer: options.indexOf(verb.root),
    cardKey: buildCardKey('masdarRoot', getRootType(verb.root), verb.form),
  }
}

function buildOptions(root: string, word: string, profile: DimensionProfile): readonly string[] {
  const generators = [
    singleLetterWordDistractor(root),
    wordSliceDistractor(word, root.length),
    mixedWordDistractor(word, root.length),
    Array.from(root).some(isWeakLetter) ? weakAlternativeRootDistractor(root) : null,
  ].filter((generator) => generator != null)

  return randomizeOptions(root, generators, profile)
}
