import { memoize } from '@pacote/memoize'

export const HAMZA = '\u0621'
const ALIF_MADDA = '\u0622'
export const ALIF_HAMZA = '\u0623'
export const HAMZA_ON_WAW = '\u0624'
export const ALIF_HAMZA_BELOW = '\u0625'
export const HAMZA_ON_YEH = '\u0626'
export const ALIF = '\u0627'
export const TEH_MARBUTA = '\u0629'
export const TEH = '\u062A'
const THEH = '\u062B'
export const DAL = '\u062F'
const THAL = '\u0630'
export const ZAY = '\u0632'
const SAD = '\u0635'
const DAD = '\u0636'
export const TAH = '\u0637'
const ZAH = '\u0638'
export const SEEN = '\u0633'
const TATWEEL = '\u0640'
export const MEEM = '\u0645'
export const NOON = '\u0646'
export const WAW = '\u0648'
export const ALIF_MAQSURA = '\u0649'
export const LAM = '\u0644'
export const YEH = '\u064A'
export const TANWEEN_FATHA = '\u064B'
export const TANWEEN_KASRA = '\u064D'
export const FATHA = '\u064E'
export const DAMMA = '\u064F'
export const KASRA = '\u0650'
export const SHADDA = '\u0651'
export const SUKOON = '\u0652'

const COMBINING_MARK = /\p{Mn}/u

export type DiacriticsPreference = 'all' | 'some' | 'none'

export type Vowel = typeof FATHA | typeof KASRA | typeof DAMMA

type WeakLetter = typeof ALIF | typeof ALIF_MAQSURA | typeof WAW | typeof YEH

export class LetterToken {
  readonly letter: string
  readonly isHamza: boolean
  readonly isWeak: boolean

  constructor(letter: string) {
    this.letter = letter
    this.isHamza = isHamzatedLetter(letter)
    this.isWeak = isWeakLetter(letter)
  }

  equals(other: string | LetterToken): boolean {
    return other instanceof LetterToken ? this.letter === other.letter : this.letter === other
  }
}

const createToken = memoize(
  (char) => char,
  (char: string) => new LetterToken(char),
)

export function tokenize(text: string | readonly Token[]): readonly LetterToken[] {
  return [...text].map((token) => (token instanceof LetterToken ? token : createToken(token)))
}

export type Token = string | Vowel | LetterToken

const LONG_VOWEL_TARGETS: Record<Vowel, ReadonlySet<string>> = {
  [FATHA]: new Set([ALIF, ALIF_MAQSURA, TEH_MARBUTA]),
  [KASRA]: new Set([YEH, HAMZA_ON_YEH]),
  [DAMMA]: new Set([WAW, HAMZA_ON_WAW]),
}

export function applyDiacriticsPreference(input: string, preference: DiacriticsPreference): string {
  if (preference === 'all') return input
  if (preference === 'some') return stripObviousDiacritics(input)
  return input.replace(/[\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e8\u06ea-\u06ed]/g, '')
}

function stripObviousDiacritics(input: string): string {
  return Array.from(input)
    .reduce<string[]>((result, current, index, chars) => {
      if (current === SUKOON) return result
      const nextBase = chars.slice(index + 1).find((char) => char !== TATWEEL)
      if (LONG_VOWEL_TARGETS[current as Vowel]?.has(nextBase ?? '')) return result
      result.push(current)
      return result
    }, [])
    .join('')
}

export function isWeakLetter(value = ''): value is WeakLetter {
  return [ALIF, ALIF_MAQSURA, WAW, YEH].includes(value)
}

export function isHamzatedLetter(token: Token = ''): boolean {
  if (token instanceof LetterToken) return token.isHamza
  return [HAMZA, ALIF_HAMZA, ALIF_HAMZA_BELOW, HAMZA_ON_WAW, HAMZA_ON_YEH].includes(token)
}

export const normalizeHamza = (value: string): string => value.replace(/[آأإؤئ]/g, HAMZA)

export function isDiacritic(token: Token = ''): boolean {
  return !(token instanceof LetterToken) && COMBINING_MARK.test(token)
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

  // FIXME: Need to clean up sukoons appearing after long vowels in the conjugations:
  if (curr === SUKOON) return longVowelAt(tokens, index - 1)

  if (curr === KASRA && next === YEH) return 'i'
  if (curr === FATHA && next === ALIF) return 'a'
  if (curr === DAMMA && next === WAW) return 'u'
}

function findVowelBefore(tokens: readonly LetterToken[], fromIndex: number): string | undefined {
  if (longVowelAt(tokens, fromIndex - 1)) return undefined
  const candidate = fromIndex > 0 ? tokens[fromIndex - 1].letter : undefined
  if (candidate && [KASRA, FATHA, DAMMA].includes(candidate)) return candidate
}

function findVowel(tokens: readonly LetterToken[], fromIndex: number): string | undefined {
  const candidate = tokens.at(fromIndex + 1)?.letter ?? ''
  // When geminated, the effective vowel is after the shadda:
  if (candidate === SHADDA) return findVowel(tokens, fromIndex + 1)
  return [KASRA, FATHA, DAMMA].includes(candidate) ? candidate : undefined
}

function seatHamzas(word: readonly LetterToken[]): readonly LetterToken[] {
  return tokenize(
    word.map((token, index, tokens) => {
      if (!token.equals(HAMZA)) return token

      const vowel = findVowel(tokens, index)

      // When at the start, seat hamza on alif:
      if (index === 0) return vowel === KASRA ? ALIF_HAMZA_BELOW : ALIF_HAMZA

      const shaddaOffset = tokens.at(index + 1)?.equals(SHADDA) ? 2 : 1
      const wordFinal = tokens.at(index + shaddaOffset + 1) == null

      // Seat on the line to avoid alif + alif hamza:
      const before = tokens[index - 1]
      if (before.equals(ALIF) && vowel === FATHA) return HAMZA

      // Hamza after long vowel (yeh/waw + sukoon) is standalone at word-end, else seat on yeh/waw:
      if (before.equals(SUKOON)) {
        const beforeSukoon = tokens.at(index - 2)
        if (beforeSukoon?.equals(YEH) || beforeSukoon?.equals(WAW)) {
          if (wordFinal) return HAMZA
          return vowel === DAMMA ? HAMZA_ON_WAW : HAMZA_ON_YEH
        }
      }

      const vowelBefore = findVowelBefore(tokens, index)
      const longVowelBefore = longVowelAt(tokens, index - 2)
      const longVowelAfter = longVowelAt(tokens, index + 1)

      if (longVowelBefore === 'u' && longVowelAfter === 'a') return HAMZA
      if (longVowelAfter === 'i') return HAMZA_ON_YEH

      // Seat on the line between two long equal vowels:
      if (longVowelBefore && longVowelBefore === longVowelAfter) return HAMZA

      // Word-final hamza: case vowel doesn't govern the seat, only the preceding vowel does:
      const dominant = wordFinal || vowelStrength(vowelBefore) > vowelStrength(vowel) ? vowelBefore : vowel
      if (dominant === KASRA) return HAMZA_ON_YEH
      if (dominant === DAMMA) return HAMZA_ON_WAW
      if (dominant === FATHA) return ALIF_HAMZA
      return HAMZA
    }),
  )
}

// ḥurūf al-madd
export function longVowel(vowel: Vowel): [Vowel, string] {
  if (vowel === FATHA) return [FATHA, ALIF]
  if (vowel === KASRA) return [KASRA, YEH]
  return [DAMMA, WAW]
}

export function resolveFormVIIIInfixConsonant(c1: LetterToken): Token {
  if (c1.equals(ZAY)) return DAL
  if ([SAD, DAD].includes(c1.letter)) return TAH
  if ([DAL, THEH, THAL, TAH, ZAH].includes(c1.letter)) return c1
  return TEH
}

export function finalize(letters: readonly Token[]): string {
  return seatHamzas(tokenize(letters))
    .map((token) => (token instanceof LetterToken ? token.letter : token))
    .join('')
    .replace(new RegExp(`${ALIF_HAMZA}${FATHA}[${ALIF_HAMZA}${ALIF}]${SUKOON}?`), ALIF_MADDA)
    .replace(new RegExp(`(.)(?:${SUKOON}\\1)`, 'g'), `$1${SHADDA}`)
    .normalize('NFC')
}
