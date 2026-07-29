import { memoize } from '@pacote/memoize'
import type { Word } from './word'

export type DiacriticsPreference = 'all' | 'some' | 'none'

export class Token {
  private readonly raw: string
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

  oneOf(...others: readonly (string | Token)[]) {
    const normalized = others.map((o) => (o instanceof Token ? o.raw : o))
    return normalized.includes(this.raw)
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
const THEH = createToken('\u062B')
export const HAH = createToken('\u062D')
export const DAL = createToken('\u062F')
const THAL = createToken('\u0630')
const ZAY = createToken('\u0632')
export const SEEN = createToken('\u0633')
const SAD = createToken('\u0635')
const DAD = createToken('\u0636')
export const TAH = createToken('\u0637')
const ZAH = createToken('\u0638')
const TATWEEL = createToken('\u0640')
export const LAM = createToken('\u0644')
export const MEEM = createToken('\u0645')
export const NOON = createToken('\u0646')
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

export function tokenize(text: string): readonly Token[] {
  return [...text].map((token) => createToken(token))
}

export function detokenize(tokens: readonly Token[]): string {
  return tokens.map(String).join('')
}

const LONG_VOWEL_TARGETS: Record<string, ReadonlySet<string>> = {
  [String(FATHA)]: new Set([String(ALIF), String(ALIF_MAQSURA), String(TEH_MARBUTA)]),
  [String(KASRA)]: new Set([String(YEH), String(HAMZA_ON_YEH)]),
  [String(DAMMA)]: new Set([String(WAW), String(HAMZA_ON_WAW)]),
}

export function applyDiacriticsPreference(text: string | Word, preference: DiacriticsPreference): string {
  if (preference === 'all') return String(text)
  if (preference === 'none')
    return String(text).replace(/[\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e8\u06ea-\u06ed]/g, '')
  return detokenize(
    tokenize(String(text)).reduce<Token[]>((output, token, index, chars) => {
      if (token.equals(SUKOON)) return output
      const next = chars.slice(index + 1).find((char) => !char.equals(TATWEEL))
      if (LONG_VOWEL_TARGETS[String(token)]?.has(String(next))) return output
      output.push(token)
      return output
    }, []),
  )
}

export const normalizeHamza = (value: string): string => value.replace(/[آأإؤئ]/g, String(HAMZA))

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

export const longVowelI = [KASRA, YEH] as const
export const longVowelA = [FATHA, ALIF] as const
export const longVowelU = [DAMMA, WAW] as const

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
