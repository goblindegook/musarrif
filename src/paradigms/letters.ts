import { memoize } from '@pacote/memoize'
import { seatHamzas } from './hamza'

export type DiacriticsPreference = 'all' | 'some' | 'none'

export type Vowel = typeof FATHA | typeof KASRA | typeof DAMMA

export class LetterToken {
  readonly letter: string
  readonly isHamza: boolean
  readonly isWeak: boolean
  readonly isVowel: boolean

  constructor(letter: string) {
    this.letter = letter
    this.isHamza = isHamzatedLetter(letter)
    this.isWeak = isWeakLetter(letter)
    this.isVowel = ['\u064E', '\u064F', '\u0650'].includes(letter)
  }

  equals(other: string | LetterToken): boolean {
    return other instanceof LetterToken ? this.letter === other.letter : this.letter === other
  }
}

const createToken = memoize(
  (char) => char,
  (char: string) => new LetterToken(char),
)

export const HAMZA = createToken('\u0621')
export const ALIF_MADDA = createToken('\u0622')
export const ALIF_HAMZA = createToken('\u0623')
export const HAMZA_ON_WAW = createToken('\u0624')
export const ALIF_HAMZA_BELOW = createToken('\u0625')
export const HAMZA_ON_YEH = createToken('\u0626')
export const ALIF = '\u0627'
export const TEH_MARBUTA = '\u0629'
export const TEH = createToken('\u062A')
const THEH = createToken('\u062B')
export const DAL = createToken('\u062F')
const THAL = createToken('\u0630')
export const ZAY = createToken('\u0632')
const SAD = createToken('\u0635')
const DAD = createToken('\u0636')
export const TAH = createToken('\u0637')
const ZAH = createToken('\u0638')
export const SEEN = '\u0633'
const TATWEEL = createToken('\u0640')
export const MEEM = '\u0645'
export const NOON = '\u0646'
export const WAW = '\u0648'
export const ALIF_MAQSURA = '\u0649'
export const LAM = createToken('\u0644')
export const YEH = '\u064A'
export const YEH_TOKEN = createToken(YEH)

export const TANWEEN_FATHA = createToken('\u064B')
export const TANWEEN_KASRA = createToken('\u064D')
export const FATHA = '\u064E'
export const DAMMA = '\u064F'
export const KASRA = '\u0650'
export const SHADDA = '\u0651'
export const SUKOON = '\u0652'

const COMBINING_MARK = /\p{Mn}/u

export function tokenize(text: string | readonly Token[]): readonly LetterToken[] {
  return [...text].map((token) => (token instanceof LetterToken ? token : createToken(token)))
}

export function detokenize(tokens: readonly LetterToken[]): string {
  return tokens.map((token) => (token instanceof LetterToken ? token.letter : token)).join('')
}

export type Token = string | Vowel | LetterToken

const LONG_VOWEL_TARGETS: Record<Vowel, ReadonlySet<Token>> = {
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
      const nextBase = chars.slice(index + 1).find((char) => !TATWEEL.equals(char))
      if (LONG_VOWEL_TARGETS[current as Vowel]?.has(nextBase ?? '')) return result
      result.push(current)
      return result
    }, [])
    .join('')
}

export function isWeakLetter(value = ''): boolean {
  return ['\u0627', '\u0648', '\u0649', '\u064A'].includes(value)
}

function isHamzatedLetter(token = ''): boolean {
  return ['\u0621', '\u0623', '\u0624', '\u0625', '\u0626'].includes(token)
}

export const normalizeHamza = (value: string): string => value.replace(/[آأإؤئ]/g, HAMZA.letter)

export function normalizeForComparison(text: string): string {
  return normalizeHamza(applyDiacriticsPreference(text.trim(), 'none'))
}

export function isDiacritic(token: Token = ''): boolean {
  return !(token instanceof LetterToken) && COMBINING_MARK.test(token)
}

// ḥurūf al-madd
export function longVowel(vowel: Vowel): [Vowel, string] {
  if (vowel === FATHA) return [FATHA, ALIF]
  if (vowel === KASRA) return [KASRA, YEH]
  return [DAMMA, WAW]
}

export function resolveFormVIIIInfixConsonant(c1: LetterToken): LetterToken {
  if (c1.equals(ZAY)) return DAL
  if ([SAD, DAD].some((t) => c1.equals(t))) return TAH
  if ([DAL, THEH, THAL, TAH, ZAH].some((t) => c1.equals(t))) return c1
  return TEH
}

export function finalize(letters: readonly Token[]): string {
  return detokenize(seatHamzas(tokenize(letters)))
    .replace(new RegExp(`${ALIF_HAMZA.letter}${FATHA}[${ALIF_HAMZA.letter}${ALIF}]${SUKOON}?`), ALIF_MADDA.letter)
    .replace(new RegExp(`(.)(?:${SUKOON}\\1)`, 'g'), `$1${SHADDA}`)
    .normalize('NFC')
}

const ARABIC_LETTER_NAMES = {
  ء: 'همزة',
  ب: 'باء',
  ت: 'تاء',
  ث: 'ثاء',
  ج: 'جيم',
  ح: 'حاء',
  خ: 'خاء',
  د: 'دال',
  ذ: 'ذال',
  ر: 'راء',
  ز: 'زاي',
  س: 'سين',
  ش: 'شين',
  ص: 'صاد',
  ض: 'ضاد',
  ط: 'طاء',
  ظ: 'ظاء',
  ع: 'عين',
  غ: 'غين',
  ف: 'فاء',
  ق: 'قاف',
  ك: 'كاف',
  ل: 'لام',
  م: 'ميم',
  ن: 'نون',
  ه: 'هاء',
  و: 'واو',
  ي: 'ياء',
}

export const spell = (word: string): readonly string[] =>
  Array.from(word)
    .map((letter) => ARABIC_LETTER_NAMES[letter as keyof typeof ARABIC_LETTER_NAMES])
    .filter((name): name is string => name != null)
