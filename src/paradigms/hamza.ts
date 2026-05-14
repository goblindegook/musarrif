import {
  ALIF,
  ALIF_HAMZA,
  ALIF_HAMZA_BELOW,
  DAMMA,
  FATHA,
  HAMZA,
  HAMZA_ON_WAW,
  HAMZA_ON_YEH,
  KASRA,
  type LetterToken,
  SHADDA,
  SUKOON,
  tokenize,
  WAW,
  YEH,
} from './letters'

export function seatHamzas(word: readonly LetterToken[]): readonly LetterToken[] {
  return tokenize(
    word.map((token, index, tokens) => {
      if (!token.equals(HAMZA)) return token

      const vowel = findVowel(tokens, index)

      // When at the start, seat hamza on alif:
      if (index === 0) return vowel?.equals(KASRA) ? ALIF_HAMZA_BELOW : ALIF_HAMZA

      const before = tokens[index - 1]
      const after = tokens[index + 1]
      const longVowelBefore = longVowelAt(tokens, index - 2)

      // Word-final hamza
      if (!tokens.at(index + 2)) {
        if (index < tokens.length - 1 && !after.isVowel) {
          if (longVowelBefore === 'i') return HAMZA_ON_YEH
        }

        // case vowel doesn't govern the seat, only the preceding vowel does:
        if (before.equals(KASRA)) return HAMZA_ON_YEH
        if (before.equals(DAMMA)) return HAMZA_ON_WAW
        if (before.equals(FATHA)) return ALIF_HAMZA
        return HAMZA
      }

      // Seat on the line to avoid alif + alif hamza:
      if (before.equals(ALIF) && vowel?.equals(FATHA)) return HAMZA

      if (before.equals(SUKOON)) {
        const longVowelAfter = longVowelAt(tokens, index + 1)
        if (tokens[index - 2].equals(YEH)) {
          if (longVowelAfter === 'u') return HAMZA_ON_WAW // FIXME: for y's-1 passive participle
          return HAMZA_ON_YEH
        }
        if (tokens[index - 2].equals(WAW)) {
          if (longVowelAfter === 'i') return HAMZA_ON_YEH // FIXME: for w'y-1 passive participle
          return HAMZA
        }
      }

      if (longVowelBefore === 'i') return HAMZA_ON_YEH

      if (longVowelBefore === 'u') {
        if (vowel?.equals(KASRA)) return HAMZA_ON_YEH // FIXME: for l'm-3 passive past 3ms / bw'-1 active jussive 3fs:
        return HAMZA
      }

      const dominant = vowelStrength(before) > vowelStrength(vowel) ? before : vowel
      if (dominant?.equals(KASRA)) return HAMZA_ON_YEH
      if (dominant?.equals(DAMMA)) return HAMZA_ON_WAW
      if (dominant?.equals(FATHA)) return ALIF_HAMZA
      return HAMZA
    }),
  )
}

function vowelStrength(token?: LetterToken): number {
  if (KASRA.equals(token)) return 3
  if (DAMMA.equals(token)) return 2
  if (FATHA.equals(token)) return 1
  return 0
}

function longVowelAt(tokens: readonly LetterToken[], index: number): 'a' | 'i' | 'u' | undefined {
  const curr = tokens.at(index)
  const next = tokens.at(index + 1)

  if (KASRA.equals(curr) && YEH.equals(next)) return 'i'
  if (FATHA.equals(curr) && ALIF.equals(next)) return 'a'
  if (DAMMA.equals(curr) && WAW.equals(next)) return 'u'
}

function findVowel(tokens: readonly LetterToken[], index: number): LetterToken | undefined {
  const candidate = tokens.at(index + 1)
  // When geminated, the effective vowel is after the shadda:
  if (SHADDA.equals(candidate)) return findVowel(tokens, index + 1)
  return [KASRA, FATHA, DAMMA].some((t) => t.equals(candidate)) ? candidate : undefined
}
