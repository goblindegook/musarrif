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
import { verbs } from '../paradigms/verbs'
import { conjugate, diacriticsDifficulty, randomPronoun, randomTense, randomVerb } from './selectors'
import type { Difficulty, Exercise } from './types'

const RANDOM_ROOT_LETTERS = Array.from(new Set(verbs.flatMap((verb) => Array.from(verb.root))))
const WEAK_LETTER_REPLACEMENTS = [WAW, YEH, ALIF, ALIF_MAQSURA] as const

export function rootExercise(difficulty: Difficulty = 'easy'): Exercise {
  const verb = randomVerb(difficulty)
  const tense = randomTense(verb, difficulty)
  const pronoun = difficulty === 'easy' ? '3ms' : randomPronoun(verb, tense, difficulty)
  const word = applyDiacriticsPreference(conjugate(verb, tense)[pronoun], diacriticsDifficulty(difficulty))
  const distractors = buildDistractors(verb.root, Array.from(stripDiacritics(word)))
  const options = shuffle([verb.root, ...distractors])

  return {
    kind: 'root',
    promptTranslationKey: 'exercise.root.prompt',
    word,
    options: options.map((option) => Array.from(option).join(' ')),
    answer: options.indexOf(verb.root),
  }
}

function buildDistractors(correct: string, wordLetters: readonly string[]): readonly string[] {
  const options = new Set<string>()
  const weakAlternatives = weakLetterAlternatives(correct)
  if (weakAlternatives.length > 0) options.add(random(weakAlternatives))

  const strategies: readonly DistractorStrategy[] = [
    weakAlternativeStrategy,
    wordSliceStrategy,
    wordMutationStrategy,
    mixedWordAndRandomStrategy,
  ]

  let attempt = 0
  while (options.size < 3 && attempt < 200) {
    const strategy = random(strategies)
    const candidate = strategy(correct, wordLetters, weakAlternatives, attempt)
    if (candidate !== correct) options.add(candidate)
    attempt += 1
  }

  return Array.from(options)
}

type DistractorStrategy = (
  correct: string,
  wordLetters: readonly string[],
  weakAlternatives: readonly string[],
  attempt: number,
) => string

function weakAlternativeStrategy(
  correct: string,
  wordLetters: readonly string[],
  weakAlternatives: readonly string[],
  attempt: number,
): string {
  if (weakAlternatives.length === 0) return wordSliceStrategy(correct, wordLetters, weakAlternatives, attempt)
  return weakAlternatives[attempt % weakAlternatives.length]
}

function wordSliceStrategy(
  correct: string,
  wordLetters: readonly string[],
  _: readonly string[],
  attempt: number,
): string {
  const pool = wordLetters.length > 0 ? wordLetters : RANDOM_ROOT_LETTERS
  const offset = attempt + 1
  const candidate = cyclicSlice(pool, correct.length, offset)
  if (pool.length === 0) return candidate
  return varyCandidate(candidate, Math.floor(offset / pool.length))
}

function wordMutationStrategy(
  correct: string,
  wordLetters: readonly string[],
  _: readonly string[],
  attempt: number,
): string {
  const pool = wordLetters.length > 0 ? wordLetters : RANDOM_ROOT_LETTERS
  return varyCandidate(cyclicSlice(pool, correct.length, attempt), attempt + 1)
}

function mixedWordAndRandomStrategy(
  correct: string,
  wordLetters: readonly string[],
  _: readonly string[],
  attempt: number,
): string {
  if (correct.length < 2) return wordMutationStrategy(correct, wordLetters, [], attempt)

  const source = wordLetters.length > 0 ? wordLetters : RANDOM_ROOT_LETTERS
  const fromWordLength = 1 + (attempt % (correct.length - 1))
  const fromWord = cyclicSlice(source, fromWordLength, attempt)
  const fromRandom = cyclicSlice(RANDOM_ROOT_LETTERS, correct.length - fromWordLength, attempt + source.length)
  return `${fromWord}${fromRandom}`
}

function random<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function cyclicSlice(pool: readonly string[], length: number, offset: number): string {
  return Array.from({ length }, (_, index) => pool[(index + offset) % pool.length]).join('')
}

function varyCandidate(candidate: string, variation: number): string {
  if (variation === 0) return candidate
  const next = [...candidate]
  const index = variation % next.length
  next[index] = RANDOM_ROOT_LETTERS[(variation + index) % RANDOM_ROOT_LETTERS.length]
  return next.join('')
}

function weakLetterAlternatives(root: string): readonly string[] {
  const letters = Array.from(root)
  const alternatives: string[] = []

  letters.forEach((letter, index) => {
    if (!isWeakLetter(letter)) return

    WEAK_LETTER_REPLACEMENTS.forEach((replacement) => {
      if (replacement === letter) return
      const next = [...letters]
      next[index] = replacement
      alternatives.push(next.join(''))
    })
  })

  return alternatives
}
