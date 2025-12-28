import { ALIF_MAQSURA, FATHA, isWeakLetter, removeTrailingDiacritics, SHORT_VOWELS, YEH } from '../letters'

export function adjustDefective(word: readonly string[], c3: string, vowel: string): readonly string[] {
  if (!isWeakLetter(c3)) return word
  const chars = [...removeTrailingDiacritics(word)]
  const last = chars.pop()
  if (!last) return word

  const tail = c3 === YEH && vowel === FATHA ? ALIF_MAQSURA : c3

  if (last !== c3) {
    chars.push(last, tail)
    return chars
  }

  chars.push(tail, vowel)
  return chars
}

export const removeTerminalCaseVowel = (letters: readonly string[]): readonly string[] =>
  SHORT_VOWELS.includes(letters.at(-1) ?? '') ? letters.slice(0, -1) : letters
