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
  WAW,
  YEH,
} from './tokens'

export function seatHamzas(word: readonly Token[]): readonly Token[] {
  return word.map((token, index) => {
    if (!token.equals(HAMZA)) return token

    const vowel = findVowel(word, index)

    // When at the start, seat hamza on alif:
    if (index === 0) return vowel?.equals(KASRA) ? ALIF_HAMZA_BELOW : ALIF_HAMZA

    const before = word[index - 1]
    const longVowelBefore = longVowelAt(word, index - 2)

    // Word-final hamza: a mood ending (-u, -a) never governs the seat, only the preceding vowel does.
    // A kasra is never a mood ending, so here it is the stem vowel of a dropped final radical (يَرْتَئِ),
    // which leaves the hamza effectively medial, and kasra dominates:
    if (!word.at(index + 2)) return vowel?.equals(KASRA) ? HAMZA_ON_YEH : seatStrongest(before)

    // Seat on the line to avoid alif + alif hamza:
    if (before.equals(ALIF) && vowel?.equals(FATHA)) return HAMZA

    // After ay, a following long u still wins, for the y's-1 passive participle:
    if (before.equals(SUKOON) && word[index - 2].equals(YEH))
      return longVowelAt(word, index + 1) === 'u' ? HAMZA_ON_WAW : HAMZA_ON_YEH

    if (longVowelBefore === 'i') return HAMZA_ON_YEH

    // Long u outranks a following u or a, but kasra still wins (l'm-3 passive past 3ms, bw'-1 active jussive 3fs):
    if (longVowelBefore === 'u') return vowel?.equals(KASRA) ? HAMZA_ON_YEH : HAMZA

    return seatStrongest(before, vowel)
  })
}

// The strongest vowel around the hamza picks the seat: kasra, then damma, then fatha.
function seatStrongest(...vowels: readonly (Token | undefined)[]): Token {
  if (vowels.some((v) => v?.equals(KASRA))) return HAMZA_ON_YEH
  if (vowels.some((v) => v?.equals(DAMMA))) return HAMZA_ON_WAW
  if (vowels.some((v) => v?.equals(FATHA))) return ALIF_HAMZA
  return HAMZA
}

function longVowelAt(tokens: readonly Token[], index: number): 'i' | 'u' | undefined {
  const curr = tokens.at(index)
  const next = tokens.at(index + 1)

  if (curr?.equals(KASRA) && next?.equals(YEH)) return 'i'
  if (curr?.equals(DAMMA) && next?.equals(WAW)) return 'u'
}

function findVowel(tokens: readonly Token[], index: number): Token | undefined {
  const candidate = tokens.at(index + 1)
  // When geminated, the effective vowel is after the shadda:
  if (SHADDA.equals(candidate)) return findVowel(tokens, index + 1)
  return candidate?.oneOf(KASRA, FATHA, DAMMA) ? candidate : undefined
}
