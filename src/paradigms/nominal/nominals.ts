import { ALIF, ALIF_MAQSURA, DAMMA, FATHA, KASRA, SHADDA, WAW, YEH } from '../constants'
import { isWeakLetter, join, stripTrailingDiacritics } from '../helpers'

export function adjustDefective(word: readonly string[], c3: string, vowel: string): readonly string[] {
  if (!isWeakLetter(c3)) return word
  const chars = stripTrailingDiacritics(word)
  if (chars.length === 0) return word
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

export const removeTerminalCaseVowel = (letters: readonly string[]): string => {
  const last = letters.at(-1)
  if (last === DAMMA || last === FATHA || last === KASRA) {
    const beforeLast = letters.at(-2)
    return beforeLast === SHADDA ? join(...letters) : join(...letters.slice(0, -1))
  }
  return join(...letters)
}
