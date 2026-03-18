import { shuffle } from '@pacote/shuffle'
import {
  ALIF,
  ALIF_MAQSURA,
  applyDiacriticsPreference,
  isWeakLetter,
  stripDiacritics,
  WAW,
  YEH,
} from '../paradigms/letters'
import { getClosestVerbs } from '../paradigms/selection'
import { conjugate } from '../paradigms/tense'
import { verbs } from '../paradigms/verbs'
import { type Difficulty, diacriticsDifficulty, random, randomPronoun, randomTense, randomVerb } from './difficulty'
import type { Exercise } from './types'

const RANDOM_ROOT_LETTERS = Array.from(new Set(verbs.flatMap((verb) => Array.from(verb.root))))
const WEAK_LETTER_REPLACEMENTS = [WAW, YEH, ALIF, ALIF_MAQSURA] as const

export function rootExercise(difficulty: Difficulty = 'easy'): Exercise {
  const verb = randomVerb(difficulty)
  const tense = randomTense(verb, difficulty)
  const pronoun = difficulty === 'easy' ? '3ms' : randomPronoun(verb, tense, difficulty)
  const word = applyDiacriticsPreference(conjugate(verb, tense)[pronoun], diacriticsDifficulty(difficulty))
  const options = buildOptions(verb.root, word)

  return {
    kind: 'root',
    promptTranslationKey: 'exercise.root.prompt',
    word,
    options: options.map((option) => Array.from(option).join(' ')),
    answer: options.indexOf(verb.root),
  }
}

function buildOptions(root: string, word: string): readonly string[] {
  const wordLetters = Array.from(stripDiacritics(word))

  const generators = [
    closestRootDistractor(root),
    sourceSliceDistractor(root, wordLetters),
    mixedDistractor(root, wordLetters),
    Array.from(root).some(isWeakLetter) ? weakAlternativeDistractor(root) : null,
  ].filter((generator) => generator != null)

  const options = new Set<string>([root])

  while (options.size < 4) options.add(random(generators)())

  return shuffle(Array.from(options))
}

function closestRootDistractor(correct: string): () => string {
  let offset = 1

  const closestRoots = Array.from(
    new Set(
      getClosestVerbs(correct, 20)
        .map((verb) => verb.root)
        .filter((root) => root !== correct),
    ),
  )

  return () => closestRoots[offset++]
}

function weakAlternativeDistractor(correct: string): () => string {
  const letters = Array.from(correct)
  const weakAlternatives = letters.flatMap((letter, index) => {
    if (!isWeakLetter(letter)) return []
    return WEAK_LETTER_REPLACEMENTS.filter((replacement) => replacement !== letter).map((replacement) => {
      const next = [...letters]
      next[index] = replacement
      return next.join('')
    })
  })

  return () => random(weakAlternatives)
}

function sourceSliceDistractor(correct: string, sourceLetters: readonly string[]): () => string {
  let offset = 1
  return () => cyclicSlice(sourceLetters, correct.length, offset++)
}

function mixedDistractor(correct: string, wordLetters: readonly string[]): () => string {
  const sourceLetters = wordLetters.length > 0 ? wordLetters : RANDOM_ROOT_LETTERS
  let offset = 0

  return () => {
    offset += 1
    if (correct.length < 2) return cyclicSlice(sourceLetters, correct.length, offset)
    const fromWordLength = 1 + (offset % (correct.length - 1))
    return (
      cyclicSlice(sourceLetters, fromWordLength, offset) +
      cyclicSlice(RANDOM_ROOT_LETTERS, correct.length - fromWordLength, offset + sourceLetters.length + 1)
    )
  }
}

function cyclicSlice(pool: readonly string[], length: number, offset: number): string {
  return Array.from({ length }, (_, index) => pool[(index + offset) % pool.length]).join('')
}
