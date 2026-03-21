import { isWeakLetter } from '../paradigms/letters'
import { conjugate } from '../paradigms/tense'
import { type Difficulty, diacriticsDifficulty, randomPronoun, randomTense, randomVerb } from './difficulty'
import { randomizeOptions } from './distractors/distractors'
import { weakAlternativeRootDistractor } from './distractors/root-distractors'
import { mixedWordDistractor, singleLetterWordDistractor, wordSliceDistractor } from './distractors/word-distractors'
import type { Exercise } from './types'

export function verbRootExercise(difficulty: Difficulty = 'easy'): Exercise {
  const verb = randomVerb(difficulty)
  const tense = randomTense(verb, difficulty)
  const pronoun = difficulty === 'easy' ? '3ms' : randomPronoun(verb, tense, difficulty)
  const word = diacriticsDifficulty(conjugate(verb, tense)[pronoun], difficulty)
  const options = buildOptions(verb.root, word, difficulty)

  return {
    kind: 'verbRoot',
    promptTranslationKey: 'exercise.prompt.verbRoot',
    word,
    options: options.map((option) => Array.from(option).join(' ')),
    answer: options.indexOf(verb.root),
  }
}

function buildOptions(answer: string, word: string, difficulty: Difficulty): readonly string[] {
  const generators = [
    singleLetterWordDistractor(answer),
    wordSliceDistractor(word, answer.length),
    mixedWordDistractor(word, answer.length),
    Array.from(answer).some(isWeakLetter) ? weakAlternativeRootDistractor(answer) : null,
  ].filter((generator) => generator != null)

  return randomizeOptions(answer, generators, difficulty)
}
