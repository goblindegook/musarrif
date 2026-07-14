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
  SHADDA,
  SUKOON,
  type Token,
  tokenize,
  WAW,
  YEH,
} from './tokens'

export function seatHamzas(word: readonly Token[]): readonly Token[] {
  return tokenize(
    word.map((token, index) => {
      if (!token.equals(HAMZA)) return token

      const vowel = findVowel(word, index)

      // When at the start, seat hamza on alif:
      if (index === 0) return vowel?.equals(KASRA) ? ALIF_HAMZA_BELOW : ALIF_HAMZA

      const before = word[index - 1]
      const after = word[index + 1]
      const longVowelBefore = longVowelAt(word, index - 2)

      // Word-final hamza
      if (!word.at(index + 2)) {
        if (index < word.length - 1 && longVowelBefore === 'i' && !after.isVowel) return HAMZA_ON_YEH

        // case vowel doesn't govern the seat, only the preceding vowel does:
        if (before.equals(KASRA)) return HAMZA_ON_YEH
        if (before.equals(DAMMA)) return HAMZA_ON_WAW
        if (before.equals(FATHA)) return ALIF_HAMZA
        return HAMZA
      }

      // Hamza directly after alif, followed by another waw, avoids waw-on-waw; seat on yeh instead:
      if (before.equals(ALIF) && vowel?.equals(DAMMA) && word[index + 2]?.equals(WAW)) return HAMZA_ON_YEH

      // Seat on the line to avoid alif + alif hamza:
      if (before.equals(ALIF) && vowel?.equals(FATHA)) return HAMZA

      if (before.equals(SUKOON)) {
        if (word[index - 2].equals(YEH)) {
          if (longVowelAt(word, index + 1) === 'u') return HAMZA_ON_WAW // FIXME: for y's-1 passive participle
          return HAMZA_ON_YEH
        }
        if (word[index - 2].equals(WAW)) {
          if (longVowelAt(word, index + 1) === 'i') return HAMZA_ON_YEH // FIXME: for w'y-1 passive participle
          return HAMZA
        }
      }

      if (longVowelBefore === 'i') return HAMZA_ON_YEH

      if (longVowelBefore === 'u') {
        if (vowel?.equals(KASRA)) return HAMZA_ON_YEH // FIXME: for l'm-3 passive past 3ms / bw'-1 active jussive 3fs:

        // Hamza directly after waw, followed by another waw + the masculine-plural alif, avoids waw-on-waw; seat on yeh instead:
        if (vowel?.equals(DAMMA) && word[index + 2]?.equals(WAW) && word[index + 3]?.equals(ALIF)) return HAMZA_ON_YEH

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

function vowelStrength(token?: Token): number {
  if (KASRA.equals(token)) return 3
  if (DAMMA.equals(token)) return 2
  if (FATHA.equals(token)) return 1
  return 0
}

function longVowelAt(tokens: readonly Token[], index: number): 'a' | 'i' | 'u' | undefined {
  const curr = tokens.at(index)
  const next = tokens.at(index + 1)

  if (curr?.equals(KASRA) && next?.equals(YEH)) return 'i'
  if (curr?.equals(FATHA) && next?.equals(ALIF)) return 'a'
  if (curr?.equals(DAMMA) && next?.equals(WAW)) return 'u'
}

function findVowel(tokens: readonly Token[], index: number): Token | undefined {
  const candidate = tokens.at(index + 1)
  // When geminated, the effective vowel is after the shadda:
  if (SHADDA.equals(candidate)) return findVowel(tokens, index + 1)
  return [KASRA, FATHA, DAMMA].some((t) => t.equals(candidate)) ? candidate : undefined
}
