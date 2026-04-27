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
      if (index === 0) return vowel === KASRA ? ALIF_HAMZA_BELOW : ALIF_HAMZA

      const before = tokens[index - 1].letter
      const longVowelBefore = longVowelAt(tokens, index - 2)
      const longVowelAfter = longVowelAt(tokens, index + 1)

      // Word-final hamza
      if (!tokens.at(index + 2)) {
        if (index < tokens.length - 1 && !tokens[index + 1].isVowel) {
          if (longVowelBefore === 'i') return HAMZA_ON_YEH
        }

        // case vowel doesn't govern the seat, only the preceding vowel does:
        if (before === KASRA) return HAMZA_ON_YEH
        if (before === DAMMA) return HAMZA_ON_WAW
        if (before === FATHA) return ALIF_HAMZA
        return HAMZA
      }

      // Seat on the line to avoid alif + alif hamza:
      if (before === ALIF && vowel === FATHA) return HAMZA

      if (before === SUKOON) {
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
        if (vowel === KASRA) return HAMZA_ON_YEH // FIXME: for l'm-3 passive past 3ms / bw'-1 active jussive 3fs:
        return HAMZA
      }

      const dominant = vowelStrength(before) > vowelStrength(vowel) ? before : vowel
      if (dominant === KASRA) return HAMZA_ON_YEH
      if (dominant === DAMMA) return HAMZA_ON_WAW
      if (dominant === FATHA) return ALIF_HAMZA
      return HAMZA
    }),
  )
}

function vowelStrength(token?: string): number {
  if (token === KASRA) return 3
  if (token === DAMMA) return 2
  if (token === FATHA) return 1
  return 0
}

function longVowelAt(tokens: readonly LetterToken[], index: number): 'a' | 'i' | 'u' | undefined {
  const curr = tokens.at(index)?.letter
  const next = tokens.at(index + 1)?.letter

  if (curr === KASRA && next === YEH) return 'i'
  if (curr === FATHA && next === ALIF) return 'a'
  if (curr === DAMMA && next === WAW) return 'u'
}

function findVowel(tokens: readonly LetterToken[], index: number): string | undefined {
  const candidate = tokens.at(index + 1)?.letter ?? ''
  // When geminated, the effective vowel is after the shadda:
  if (candidate === SHADDA) return findVowel(tokens, index + 1)
  return [KASRA, FATHA, DAMMA].includes(candidate) ? candidate : undefined
}
