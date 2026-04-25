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

type Hamza = typeof HAMZA | typeof ALIF_HAMZA | typeof HAMZA_ON_WAW | typeof HAMZA_ON_YEH

type WeakLetter = typeof ALIF | typeof ALIF_MAQSURA | typeof WAW | typeof YEH

// TODO: strictly type Letter
type Letter = string

class RootLetter {
  letter: Letter
  isHamza: boolean
  isWeak: boolean

  constructor(letter: Letter) {
    this.letter = letter
    this.isHamza = letter === HAMZA
    this.isWeak = isWeakLetter(letter)
  }

  is(letter: string): boolean {
    return this.letter === letter
  }

  equals(other: RootLetter): boolean {
    return this.is(other.letter)
  }
}

export function Root(root: string): readonly RootLetter[] {
  return [...root].map((letter) => new RootLetter(letter))
}

export type Token = Letter | Vowel | RootLetter

const LONG_VOWEL_TARGETS: Record<Vowel, ReadonlySet<string>> = {
  [FATHA]: new Set([ALIF, ALIF_MAQSURA, TEH_MARBUTA]),
  [KASRA]: new Set([YEH, HAMZA_ON_YEH]),
  [DAMMA]: new Set([WAW, HAMZA_ON_WAW]),
}

export function applyDiacriticsPreference(input: string, preference: DiacriticsPreference): string {
  if (preference === 'all') return input
  if (preference === 'some') return stripObviousDiacritics(input)
  return stripDiacritics(input)
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

function stripDiacritics(input: string): string {
  return input.replace(/[\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e8\u06ea-\u06ed]/g, '')
}

export function isWeakLetter(value = ''): value is WeakLetter {
  return [ALIF, ALIF_MAQSURA, WAW, YEH].includes(value)
}

export function isHamzatedLetter(value = ''): value is Hamza {
  return [HAMZA, ALIF_HAMZA, HAMZA_ON_WAW, HAMZA_ON_YEH].includes(value)
}

export function isDiacritic(char = ''): boolean {
  return COMBINING_MARK.test(char)
}

export function seatHamza(letter: string, dominantVowel?: string, firstLetter = false): string {
  if (!isHamzatedLetter(letter)) return letter
  if (dominantVowel === FATHA) return ALIF_HAMZA
  if (dominantVowel === KASRA) return firstLetter ? ALIF_HAMZA_BELOW : HAMZA_ON_YEH
  if (dominantVowel === DAMMA) return firstLetter ? ALIF_HAMZA : HAMZA_ON_WAW
  return HAMZA
}

function vowelStrength(token?: Token): number {
  if (token === KASRA) return 3
  if (token === DAMMA) return 2
  if (token === FATHA) return 1
  return 0
}

function seatHamzas(tokens: readonly Token[]): readonly Token[] {
  return tokens.map((token, index) => {
    if (token instanceof RootLetter && token.letter === HAMZA) {
      const isFirst = index === 0
      const before = isFirst ? undefined : tokens.at(index - 1)
      const after = tokens.at(index + 1)
      // Avoid alif + alif hamza, seat on the line:
      if (before === ALIF && after === FATHA) return HAMZA
      const dominant = vowelStrength(before) > vowelStrength(after) ? before : after
      if (dominant === FATHA) return ALIF_HAMZA
      if (dominant === KASRA) return isFirst ? ALIF_HAMZA_BELOW : HAMZA_ON_YEH
      if (dominant === DAMMA) return isFirst ? ALIF_HAMZA : HAMZA_ON_WAW
      return HAMZA
    }
    return token
  })
}

export function longVowel(vowel: Vowel): [Vowel, string] {
  if (vowel === FATHA) return [FATHA, ALIF]
  if (vowel === KASRA) return [KASRA, YEH]
  return [DAMMA, WAW]
}

export function resolveFormVIIIInfixConsonant(c1: string): string {
  if (c1 === ZAY) return DAL
  if ([SAD, DAD].includes(c1)) return TAH
  if ([DAL, THEH, THAL, TAH, ZAH].includes(c1)) return c1
  return TEH
}

export function finalize(letters: readonly Token[]): string {
  return seatHamzas(letters)
    .map((token) => (token instanceof RootLetter ? token.letter : token))
    .join('')
    .replace(new RegExp(`${ALIF_HAMZA}${FATHA}[${ALIF_HAMZA}${ALIF}]${SUKOON}?`), ALIF_MADDA)
    .replace(new RegExp(`(.)(?:${SUKOON}\\1)`, 'g'), `$1${SHADDA}`)
    .normalize('NFC')
}
