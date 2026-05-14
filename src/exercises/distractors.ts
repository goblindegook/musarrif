import { shuffle } from '@pacote/shuffle'
import {
  ALIF,
  ALIF_MAQSURA,
  applyDiacriticsPreference,
  detokenize,
  isDiacritic,
  type LetterToken,
  tokenize,
  WAW,
  YEH,
} from '../paradigms/letters'
import { verbs } from '../paradigms/verbs'
import { type DimensionProfile, exerciseDiacritics, random } from './dimensions'

type DistractorGenerator<T> = () => T
type DistractorNormaliser<T> = (distractor: T) => T

const WEAK_LETTER_REPLACEMENTS = tokenize([WAW, YEH, ALIF, ALIF_MAQSURA])

const RANDOM_LETTERS = tokenize([
  ...Array.from(new Set(verbs.flatMap((verb) => Array.from(verb.root)))),
  WAW,
  YEH,
  ALIF,
  ALIF_MAQSURA,
])

export function randomizeOptions<T>(
  answer: T,
  generators: readonly DistractorGenerator<T>[],
  profile: DimensionProfile,
  size = 4,
  normalizers: DistractorNormaliser<T>[] = [],
): T[] {
  const options = new Set<T>([answer])

  const allNormalizers = [
    ...normalizers,
    (c: T) => (typeof c === 'string' ? (exerciseDiacritics(c, profile.diacritics) as T) : c),
  ]

  while (options.size < size) {
    const candidate = random(generators)()
    options.add(allNormalizers.reduce((candidate, normalizer) => normalizer(candidate), candidate))
  }

  return shuffle(Array.from(options))
}

export function weakAlternativeRootDistractor(correct: string): DistractorGenerator<string> {
  const letters = tokenize(correct)
  const weakAlternatives = letters.flatMap((letter, index) => {
    if (!letter.isWeak) return []
    return WEAK_LETTER_REPLACEMENTS.filter((replacement) => !letter.equals(replacement)).map((replacement) => {
      const next = [...letters]
      next[index] = replacement
      return detokenize(next)
    })
  })

  return () => random(weakAlternatives)
}

export function mixedWordDistractor(word: string, size: number): DistractorGenerator<string> {
  const letters = tokenize(applyDiacriticsPreference(word, 'none'))

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
  const letters = tokenize(applyDiacriticsPreference(word, 'none'))
  return () => cyclicSlice(letters, size, offset++)
}

function cyclicSlice(pool: readonly LetterToken[], length: number, offset: number): string {
  return detokenize(Array.from({ length }, (_, index) => pool[(index + offset) % pool.length]))
}

export function singleLetterWordDistractor(word: string): DistractorGenerator<string> {
  const chars = tokenize(word)
  const letterIndices = chars.map((_c, i) => i).filter((i) => !isDiacritic(chars[i]))

  return () => {
    const index = letterIndices[Math.floor(Math.random() * letterIndices.length)]
    const replacements = RANDOM_LETTERS.filter((letter) => !letter.equals(chars[index]))
    const candidate = [...chars]
    candidate[index] = random(replacements)
    return detokenize(candidate)
  }
}
