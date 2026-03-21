import { ALIF, ALIF_MAQSURA, stripDiacritics, WAW, YEH } from '../../paradigms/letters'
import { verbs } from '../../paradigms/verbs'
import { random } from '../difficulty'
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

export function singleLetterWordDistractor(root: string): DistractorGenerator<string> {
  const letters = Array.from(root)

  return () => {
    const index = Math.floor(Math.random() * letters.length)
    const replacements = RANDOM_LETTERS.filter((letter) => letter !== letters[index])
    const candidate = [...letters]
    candidate[index] = random(replacements)
    return candidate.join('')
  }
}
