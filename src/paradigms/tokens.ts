import { memoize } from '@pacote/memoize'
import type { Word } from './word'

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
    this.isWeak = ['\u0627', '\u0648', '\u0649', '\u064A'].includes(raw)
  }

  equals(other?: string | Token): boolean {
    return other instanceof Token ? this.raw === other.raw : this.raw === other
  }

  toString(): string {
    return this.raw
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
export const BA = createToken('\u0628')
export const TEH_MARBUTA = createToken('\u0629')
export const TEH = createToken('\u062A')
export const THEH = createToken('\u062B')
export const JIM = createToken('\u062C')
export const HAH = createToken('\u062D')
export const KHA = createToken('\u062E')
export const DAL = createToken('\u062F')
export const THAL = createToken('\u0630')
export const RA = createToken('\u0631')
export const ZAY = createToken('\u0632')
export const SEEN = createToken('\u0633')
export const SHEEN = createToken('\u0634')
export const SAD = createToken('\u0635')
export const DAD = createToken('\u0636')
export const TAH = createToken('\u0637')
export const ZAH = createToken('\u0638')
export const AIN = createToken('\u0639')
export const GHAIN = createToken('\u063A')
const TATWEEL = createToken('\u0640')
export const FA = createToken('\u0641')
export const QAF = createToken('\u0642')
export const KAF = createToken('\u0643')
export const LAM = createToken('\u0644')
export const MEEM = createToken('\u0645')
export const NOON = createToken('\u0646')
export const HA = createToken('\u0647')
export const WAW = createToken('\u0648')
export const ALIF_MAQSURA = createToken('\u0649')
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
  return tokens.map(String).join('')
}

const LONG_VOWEL_TARGETS: Record<string, ReadonlySet<string>> = {
  [FATHA.raw]: new Set([ALIF.raw, ALIF_MAQSURA.raw, TEH_MARBUTA.raw]),
  [KASRA.raw]: new Set([YEH.raw, HAMZA_ON_YEH.raw]),
  [DAMMA.raw]: new Set([WAW.raw, HAMZA_ON_WAW.raw]),
}

export function applyDiacriticsPreference(input: string | Word, preference: DiacriticsPreference): string {
  if (preference === 'all') return String(input)
  if (preference === 'some')
    return detokenize(
      tokenize(String(input)).reduce<Token[]>((result, current, index, chars) => {
        if (current.equals(SUKOON)) return result
        const nextBase = chars.slice(index + 1).find((char) => !char.equals(TATWEEL))
        if (LONG_VOWEL_TARGETS[current.raw]?.has(nextBase?.raw ?? '')) return result
        result.push(current)
        return result
      }, []),
    )
  return String(input).replace(/[\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e8\u06ea-\u06ed]/g, '')
}

export const normalizeHamza = (value: string): string => value.replace(/[آأإؤئ]/g, HAMZA.raw)

export function normalizeForComparison(text: string | Word): string {
  return normalizeHamza(applyDiacriticsPreference(String(text), 'none'))
    .trim()
    .normalize('NFD')
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
