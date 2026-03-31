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
const ZAY = '\u0632'
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

const LONG_VOWEL_TARGETS: Record<string, ReadonlySet<string>> = {
  [FATHA]: new Set([ALIF, ALIF_MAQSURA, TEH_MARBUTA]),
  [KASRA]: new Set([YEH, HAMZA_ON_YEH]),
  [DAMMA]: new Set([WAW, HAMZA_ON_WAW]),
}

export function stripDiacritics(input: string): string {
  return input.replace(/[\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e8\u06ea-\u06ed]/g, '')
}

function stripObviousDiacritics(input: string): string {
  return Array.from(input)
    .reduce<string[]>((result, current, index, chars) => {
      if (current === SUKOON) return result
      const nextBase = chars.slice(index + 1).find((char) => char !== TATWEEL)
      if (nextBase && LONG_VOWEL_TARGETS[current]?.has(nextBase)) return result
      result.push(current)
      return result
    }, [])
    .join('')
}

export function applyDiacriticsPreference(input: string, preference: DiacriticsPreference): string {
  if (preference === 'all') return input
  if (preference === 'some') return stripObviousDiacritics(input)
  return stripDiacritics(input)
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

export function geminateDoubleLetters(word: readonly string[]): readonly string[] {
  return Array.from(word.join('').replace(new RegExp(`(.)(?:${SUKOON}\\1|\\1)`), `$1${SHADDA}`))
}

export function seatHamza(letter: string, vowel?: Vowel): string {
  if (!isHamzatedLetter(letter)) return letter
  if (vowel === FATHA) return ALIF_HAMZA
  if (vowel === KASRA) return HAMZA_ON_YEH
  if (vowel === DAMMA) return HAMZA_ON_WAW
  return HAMZA
}

export function longVowel(vowel: Vowel): [Vowel, string] {
  if (vowel === FATHA) return [FATHA, ALIF]
  if (vowel === KASRA) return [KASRA, YEH]
  return [DAMMA, WAW]
}

export function findWeakLetterIndex(word: readonly string[], index: number = 0): number {
  return word.findIndex((char, i) => i > index && isWeakLetter(char))
}

export function findLetterIndex(word: readonly string[], index: number = 0): number {
  return word.findIndex((char, i) => i > index && !isDiacritic(char))
}

export function normalizeAlifMadda(word: readonly string[]): readonly string[] {
  return word
    .join('')
    .replace(new RegExp(`${ALIF_HAMZA}${FATHA}[${ALIF_HAMZA}${ALIF}]${SUKOON}?`), ALIF_MADDA)
    .split('')
}

export function resolveFormVIIIInfixConsonant(c1: string): string {
  if (c1 === ZAY) return DAL
  if ([SAD, DAD].includes(c1)) return TAH
  if ([DAL, THEH, THAL, TAH, ZAH].includes(c1)) return c1
  return TEH
}
