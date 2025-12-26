import type { ShortVowel } from '../letters'
import { ALIF, ALIF_MAQSURA, DAMMA, FATHA, isWeakLetter, KASRA, removeTrailingDiacritics, WAW, YEH } from '../letters'

export function adjustDefective(word: readonly string[], c3: string, vowel: string): readonly string[] {
  if (!isWeakLetter(c3)) return word
  const chars = [...removeTrailingDiacritics(word)]
  const last = chars.pop()
  if (!last) return word

  const tail = c3 === YEH ? (vowel === FATHA ? ALIF_MAQSURA : YEH) : c3 === ALIF ? ALIF : c3 === WAW ? WAW : c3

  if (last !== c3) {
    chars.push(last, tail)
    return chars
  }

  chars.push(tail, vowel)
  return chars
}

export const removeTerminalCaseVowel = (letters: readonly string[]): readonly string[] =>
  [DAMMA, FATHA, KASRA].includes(letters.at(-1) ?? '') ? letters.slice(0, -1) : letters

const VOWEL_FROM_RADICAL: Record<ShortVowel, string> = { u: DAMMA, i: KASRA, a: FATHA }

export const vowelFromRadical = (radical: ShortVowel) => VOWEL_FROM_RADICAL[radical]
