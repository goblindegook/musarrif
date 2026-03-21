import { isWeakLetter } from '../paradigms/letters'
import { deriveMasdar } from '../paradigms/nominal/masdar'
import { type Difficulty, diacriticsDifficulty, random, randomVerb } from './difficulty'
import { randomizeOptions } from './distractors/distractors'
import { weakAlternativeRootDistractor } from './distractors/root-distractors'
import { mixedWordDistractor, singleLetterWordDistractor, wordSliceDistractor } from './distractors/word-distractors'
import type { Exercise } from './types'

export function masdarRootExercise(difficulty: Difficulty = 'easy'): Exercise {
  const verb = randomVerb(difficulty)
  const masdar = diacriticsDifficulty(random(deriveMasdar(verb)), difficulty)
  const options = buildOptions(verb.root, masdar, difficulty)

  return {
    kind: 'masdarRoot',
    promptTranslationKey: 'exercise.prompt.masdarRoot',
    word: masdar,
    options: options.map((option) => Array.from(option).join(' ')),
    answer: options.indexOf(verb.root),
  }
}

function buildOptions(root: string, word: string, difficulty: Difficulty): readonly string[] {
  const generators = [
    singleLetterWordDistractor(root),
    wordSliceDistractor(word, root.length),
    mixedWordDistractor(word, root.length),
    Array.from(root).some(isWeakLetter) ? weakAlternativeRootDistractor(root) : null,
  ].filter((generator) => generator != null)

  return randomizeOptions(root, generators, difficulty)
}
