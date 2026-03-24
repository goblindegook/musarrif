import { ALIF, ALIF_MAQSURA, isDiacritic, stripDiacritics, WAW, YEH } from '../../paradigms/letters'
import { verbs } from '../../paradigms/verbs'
import { random } from '../dimensions'
import type { DistractorGenerator } from './distractors'

const RANDOM_LETTERS = [
  ...Array.from(new Set(verbs.flatMap((verb) => Array.from(verb.root)))),
  WAW,
  YEH,
  ALIF,
  ALIF_MAQSURA,
]

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
