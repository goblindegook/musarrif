import { memoize } from '@pacote/memoize'
import { seatHamzas } from './hamza'

export type DiacriticsPreference = 'all' | 'some' | 'none'

export class Token {
  readonly raw: string
  readonly isHamza: boolean
  readonly isWeak: boolean
  readonly isVowel: boolean
  readonly isCombiningMark: boolean

  constructor(raw: string) {
    this.raw = raw
    this.isCombiningMark = /\p{Mn}/u.test(raw)
    this.isHamza = ['\u0621', '\u0623', '\u0624', '\u0625', '\u0626'].includes(raw)
    this.isVowel = ['\u064E', '\u064F', '\u0650'].includes(raw)
    this.isWeak = isWeakLetter(raw)
  }

  equals(other?: string | Token): boolean {
    return other instanceof Token ? this.raw === other.raw : this.raw === other
  }
}

const createToken = memoize(
  (raw) => raw,
  (raw: string) => new Token(raw),
)

export const HAMZA = createToken('\u0621')
export const ALIF_MADDA = createToken('\u0622')
export const ALIF_HAMZA = createToken('\u0623')
export const HAMZA_ON_WAW = createToken('\u0624')
export const ALIF_HAMZA_BELOW = createToken('\u0625')
export const HAMZA_ON_YEH = createToken('\u0626')
export const ALIF = createToken('\u0627')
export const TEH_MARBUTA = createToken('\u0629')
export const TEH = createToken('\u062A')
const THEH = createToken('\u062B')
export const DAL = createToken('\u062F')
const THAL = createToken('\u0630')
export const ZAY = createToken('\u0632')
const SAD = createToken('\u0635')
const DAD = createToken('\u0636')
export const TAH = createToken('\u0637')
const ZAH = createToken('\u0638')
export const SEEN = createToken('\u0633')
const TATWEEL = createToken('\u0640')
export const MEEM = createToken('\u0645')
export const NOON = createToken('\u0646')
export const WAW = createToken('\u0648')
export const ALIF_MAQSURA = createToken('\u0649')
export const LAM = createToken('\u0644')
export const YEH = createToken('\u064A')

export const TANWEEN_FATHA = createToken('\u064B')
export const TANWEEN_KASRA = createToken('\u064D')
export const FATHA = createToken('\u064E')
export const DAMMA = createToken('\u064F')
export const KASRA = createToken('\u0650')
export const SHADDA = createToken('\u0651')
export const SUKOON = createToken('\u0652')

export function tokenize(text: string | readonly Token[]): readonly Token[] {
  return [...text].map((token) => (token instanceof Token ? token : createToken(token)))
}

export function detokenize(tokens: readonly Token[]): string {
  return tokens.map((token) => (token instanceof Token ? token.raw : token)).join('')
}

const LONG_VOWEL_TARGETS: Record<string, ReadonlySet<string>> = {
  [FATHA.raw]: new Set([ALIF.raw, ALIF_MAQSURA.raw, TEH_MARBUTA.raw]),
  [KASRA.raw]: new Set([YEH.raw, HAMZA_ON_YEH.raw]),
  [DAMMA.raw]: new Set([WAW.raw, HAMZA_ON_WAW.raw]),
}

export function applyDiacriticsPreference(input: string, preference: DiacriticsPreference): string {
  if (preference === 'all') return input
  if (preference === 'some')
    return detokenize(
      tokenize(input).reduce<Token[]>((result, current, index, chars) => {
        if (current.equals(SUKOON)) return result
        const nextBase = chars.slice(index + 1).find((char) => !char.equals(TATWEEL))
        if (LONG_VOWEL_TARGETS[current.raw]?.has(nextBase?.raw ?? '')) return result
        result.push(current)
        return result
      }, []),
    )
  return input.replace(/[\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e8\u06ea-\u06ed]/g, '')
}

export function isWeakLetter(value = ''): boolean {
  return ['\u0627', '\u0648', '\u0649', '\u064A'].includes(value)
}

export const normalizeHamza = (value: string): string => value.replace(/[آأإؤئ]/g, HAMZA.raw)

export function normalizeForComparison(text: string): string {
  return normalizeHamza(applyDiacriticsPreference(text, 'none')).trim().normalize('NFD')
}

export function normalizedCompare(a: string, b: string): boolean {
  return normalizeForComparison(a) === normalizeForComparison(b)
}

// ḥurūf al-madd
export function longVowel(vowel: Token): [Token, Token] {
  if (vowel.equals(FATHA)) return [FATHA, ALIF]
  if (vowel.equals(KASRA)) return [KASRA, YEH]
  return [DAMMA, WAW]
}

export function resolveFormVIIIInfixConsonant(c1: Token): Token {
  if (c1.equals(ZAY)) return DAL
  if ([SAD, DAD].some((t) => c1.equals(t))) return TAH
  if ([DAL, THEH, THAL, TAH, ZAH].some((t) => c1.equals(t))) return c1
  return TEH
}

export function finalize(letters: readonly Token[]): string {
  return detokenize(seatHamzas(letters))
    .replace(new RegExp(`${ALIF_HAMZA.raw}${FATHA.raw}[${ALIF_HAMZA.raw}${ALIF.raw}]${SUKOON.raw}?`), ALIF_MADDA.raw)
    .replace(new RegExp(`(.)(?:${SUKOON.raw}\\1)`, 'g'), `$1${SHADDA.raw}`)
    .replace(/([^\p{Mn}])\1$/u, `$1${SHADDA.raw}`)
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
