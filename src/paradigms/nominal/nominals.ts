import { isWeakLetter, removeTrailingDiacritics, SHORT_VOWELS } from '../letters'

export function adjustDefective(word: readonly string[], c3: string, vowel: string): readonly string[] {
  if (!isWeakLetter(c3)) return word
  const chars = [...removeTrailingDiacritics(word)]
  const last = chars.pop()
  if (!last) return word

  if (last !== c3) {
    chars.push(last, c3)
    return chars
  }

  chars.push(c3, vowel)
  return chars
}

export const removeTerminalCaseVowel = (letters: readonly string[]): readonly string[] =>
  SHORT_VOWELS.includes(letters.at(-1) ?? '') ? letters.slice(0, -1) : letters
