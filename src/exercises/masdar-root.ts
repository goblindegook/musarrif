import { shuffle } from '@pacote/shuffle'
import { ALIF, ALIF_MAQSURA, isWeakLetter, stripDiacritics, WAW, YEH } from '../paradigms/letters'
import { deriveMasdar } from '../paradigms/nominal/masdar'
import { verbs } from '../paradigms/verbs'
import { type Difficulty, diacriticsDifficulty, random, randomVerb } from './difficulty'
import type { Exercise } from './types'

const RANDOM_ROOT_LETTERS = Array.from(new Set(verbs.flatMap((verb) => Array.from(verb.root))))
const WEAK_LETTER_REPLACEMENTS = [WAW, YEH, ALIF, ALIF_MAQSURA] as const
const DISTRACTOR_LETTERS = Array.from(new Set([...RANDOM_ROOT_LETTERS, ...WEAK_LETTER_REPLACEMENTS]))

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
  const wordLetters = Array.from(stripDiacritics(word))

  const generators = [
    singleLetterDistractor(root),
    sourceSliceDistractor(wordLetters, root.length),
    mixedDistractor(wordLetters, root.length),
    Array.from(root).some(isWeakLetter) ? weakAlternativeDistractor(root) : null,
  ].filter((generator) => generator != null)

  const options = new Set<string>([root])

  while (options.size < 4) options.add(diacriticsDifficulty(random(generators)(), difficulty))

  return shuffle(Array.from(options))
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

function singleLetterDistractor(root: string): () => string {
  const letters = Array.from(root)

  return () => {
    const index = Math.floor(Math.random() * letters.length)
    const replacements = DISTRACTOR_LETTERS.filter((letter) => letter !== letters[index])
    const candidate = [...letters]
    candidate[index] = random(replacements)
    return candidate.join('')
  }
}

function sourceSliceDistractor(sourceLetters: readonly string[], size: number): () => string {
  let offset = 1
  return () => cyclicSlice(sourceLetters, size, offset++)
}

function mixedDistractor(wordLetters: readonly string[], size: number): () => string {
  return () => {
    const sourceOffset = Math.floor(Math.random() * wordLetters.length)
    if (wordLetters.length >= size || size <= 1) return cyclicSlice(wordLetters, size, sourceOffset)

    const fromWordLength = 1 + Math.floor(Math.random() * (size - 1))
    const randomOffset = Math.floor(Math.random() * RANDOM_ROOT_LETTERS.length)
    return (
      cyclicSlice(wordLetters, fromWordLength, sourceOffset) +
      cyclicSlice(RANDOM_ROOT_LETTERS, size - fromWordLength, randomOffset)
    )
  }
}

function cyclicSlice(pool: readonly string[], length: number, offset: number): string {
  return Array.from({ length }, (_, index) => pool[(index + offset) % pool.length]).join('')
}
