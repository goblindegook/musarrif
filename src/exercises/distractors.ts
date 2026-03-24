import { shuffle } from '@pacote/shuffle'
import { ALIF, ALIF_MAQSURA, isDiacritic, isWeakLetter, stripDiacritics, WAW, YEH } from '../paradigms/letters'
import { verbs } from '../paradigms/verbs'
import { type DimensionProfile, exerciseDiacritics, random } from './dimensions'

type DistractorGenerator<T> = () => T

const WEAK_LETTER_REPLACEMENTS = [WAW, YEH, ALIF, ALIF_MAQSURA] as const

const RANDOM_LETTERS = [
  ...Array.from(new Set(verbs.flatMap((verb) => Array.from(verb.root)))),
  WAW,
  YEH,
  ALIF,
  ALIF_MAQSURA,
]

export function randomizeOptions<T>(
  answer: T,
  generators: readonly DistractorGenerator<T>[],
  profile: DimensionProfile,
  size = 4,
): T[] {
  const options = new Set<T>([answer])

  while (options.size < size) {
    const candidate = random(generators)()
    options.add(typeof candidate === 'string' ? (exerciseDiacritics(candidate, profile.diacritics) as T) : candidate)
  }

  return shuffle(Array.from(options))
}

export function weakAlternativeRootDistractor(correct: string): DistractorGenerator<string> {
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

export function mixedWordDistractor(word: string, size: number): DistractorGenerator<string> {
  const letters = Array.from(stripDiacritics(word))

  return () => {
    const sourceOffset = Math.floor(Math.random() * letters.length)
    if (letters.length >= size || size <= 1) return cyclicSlice(letters, size, sourceOffset)

    const fromWordLength = 1 + Math.floor(Math.random() * (size - 1))
    const randomOffset = Math.floor(Math.random() * RANDOM_LETTERS.length)
    return (
      cyclicSlice(letters, fromWordLength, sourceOffset) +
      cyclicSlice(RANDOM_LETTERS, size - fromWordLength, randomOffset)
    )
  }
}

export function wordSliceDistractor(word: string, size: number): DistractorGenerator<string> {
  let offset = 1
  const letters = Array.from(stripDiacritics(word))
  return () => cyclicSlice(letters, size, offset++)
}

function cyclicSlice(pool: readonly string[], length: number, offset: number): string {
  return Array.from({ length }, (_, index) => pool[(index + offset) % pool.length]).join('')
}

export function singleLetterWordDistractor(word: string): DistractorGenerator<string> {
  const chars = Array.from(word)
  const letterIndices = chars.map((_c, i) => i).filter((i) => !isDiacritic(chars[i]))

  return () => {
    const index = letterIndices[Math.floor(Math.random() * letterIndices.length)]
    const replacements = RANDOM_LETTERS.filter((letter) => letter !== chars[index])
    const candidate = [...chars]
    candidate[index] = random(replacements)
    return candidate.join('')
  }
}
