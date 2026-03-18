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
import { conjugate } from '../paradigms/tense'
import { verbs } from '../paradigms/verbs'
import { type Difficulty, diacriticsDifficulty, randomPronoun, randomTense, randomVerb } from './difficulty'
import type { Exercise } from './types'

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
  const distractors = new Set<string>()
  const weakAlternatives = weakLetterAlternatives(correct)
  const sourceLetters = wordLetters.length > 0 ? wordLetters : RANDOM_ROOT_LETTERS

  if (weakAlternatives.length > 0) distractors.add(random(weakAlternatives))

  for (let attempt = 0; distractors.size < 3 && attempt < 200; attempt += 1) {
    const strategy = Math.floor(Math.random() * 4)
    const base = cyclicSlice(sourceLetters, correct.length, attempt + 1)
    const candidate =
      strategy === 0 && weakAlternatives.length > 0
        ? random(weakAlternatives)
        : strategy === 1
          ? base
          : strategy === 2
            ? varyCandidate(base, attempt + 1)
            : mixedCandidate(correct.length, sourceLetters, attempt)

    if (candidate !== correct) distractors.add(candidate)
  }

  for (let attempt = 0; distractors.size < 3; attempt += 1) {
    const candidate = varyCandidate(cyclicSlice(sourceLetters, correct.length, attempt), attempt + sourceLetters.length)
    if (candidate !== correct) distractors.add(candidate)
  }

  return Array.from(distractors).slice(0, 3)
}

function random<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function mixedCandidate(length: number, sourceLetters: readonly string[], attempt: number): string {
  if (length < 2) return varyCandidate(cyclicSlice(sourceLetters, length, attempt), attempt + 1)

  const fromWordLength = 1 + (attempt % (length - 1))
  const fromWord = cyclicSlice(sourceLetters, fromWordLength, attempt)
  const fromRandom = cyclicSlice(RANDOM_ROOT_LETTERS, length - fromWordLength, attempt + sourceLetters.length)
  return `${fromWord}${fromRandom}`
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
