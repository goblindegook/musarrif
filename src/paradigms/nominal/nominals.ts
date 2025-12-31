import { isWeakLetter, removeTrailingDiacritics } from '../letters'

export function adjustDefective(word: readonly string[], c3: string, vowel: string): readonly string[] {
  if (!isWeakLetter(c3)) return word
  const chars = removeTrailingDiacritics(word)
  if (chars.at(-1) !== c3) return chars.concat(c3)
  return chars.slice(0, -1).concat(c3, vowel)
}
