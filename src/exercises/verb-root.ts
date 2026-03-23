import { isWeakLetter } from '../paradigms/letters'
import { getRootType } from '../paradigms/roots'
import { conjugate } from '../paradigms/tense'
import { type Difficulty, diacriticsDifficulty, randomPronoun, randomTense, randomVerb } from './difficulty'
import { randomizeOptions } from './distractors/distractors'
import { weakAlternativeRootDistractor } from './distractors/root-distractors'
import { mixedWordDistractor, singleLetterWordDistractor, wordSliceDistractor } from './distractors/word-distractors'
import type { CardConstraints } from './srs'
import { buildCardKey } from './srs'
import type { Exercise } from './types'

export function verbRootExercise(difficulty: Difficulty = 'easy', constraints?: CardConstraints): Exercise {
  const verb = randomVerb(constraints)
  const tense = constraints?.tense ?? randomTense(verb, difficulty)
  const pronoun = constraints?.pronoun ?? (difficulty === 'easy' ? '3ms' : randomPronoun(verb, tense, difficulty))
  const word = diacriticsDifficulty(conjugate(verb, tense)[pronoun], difficulty)
  const options = buildOptions(verb.root, word, difficulty)

  return {
    kind: 'verbRoot',
    promptTranslationKey: 'exercise.prompt.verbRoot',
    word,
    options: options.map((option) => Array.from(option).join(' ')),
    answer: options.indexOf(verb.root),
    cardKey: buildCardKey('verbRoot', getRootType(verb.root), verb.form, tense, pronoun),
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
