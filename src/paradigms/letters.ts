export const HAMZA = '\u0621'
export const ALIF_MADDA = '\u0622'
export const ALIF_HAMZA = '\u0623'
export const HAMZA_ON_WAW = '\u0624'
export const ALIF_HAMZA_BELOW = '\u0625'
export const HAMZA_ON_YEH = '\u0626'
export const ALIF = '\u0627'
export const TEH_MARBUTA = '\u0629'
export const TEH = '\u062A'
export const SEEN = '\u0633'
export const MEEM = '\u0645'
export const NOON = '\u0646'
export const WAW = '\u0648'
export const ALIF_MAQSURA = '\u0649'
export const YEH = '\u064A'
export const KASRA = '\u0650'
export const TANWEEN_FATHA = '\u064B'
export const TANWEEN_DAMMA = '\u064C'
export const TANWEEN_KASRA = '\u064D'
export const FATHA = '\u064E'
export const DAMMA = '\u064F'
export const SHADDA = '\u0651'
export const SUKOON = '\u0652'
export const TATWEEL = '\u0640'

export const COMBINING_MARK = /\p{Mn}/u

export type DiacriticsPreference = 'all' | 'some' | 'none'

export type ShortVowel = 'a' | 'i' | 'u'

export type Vowel = typeof FATHA | typeof KASRA | typeof DAMMA

export type Sukoon = typeof SUKOON

type Hamza = typeof HAMZA | typeof ALIF_HAMZA | typeof HAMZA_ON_WAW | typeof HAMZA_ON_YEH

type WeakLetter = typeof ALIF | typeof ALIF_MAQSURA | typeof WAW | typeof YEH

const SHORT_VOWEL_MAP: Record<'a' | 'i' | 'u', string> = {
  a: FATHA,
  i: KASRA,
  u: DAMMA,
} as const

const LONG_VOWEL_MAP: Record<'a' | 'i' | 'u', string> = {
  a: ALIF,
  i: YEH,
  u: WAW,
} as const

const LONG_VOWEL_TARGETS: Record<string, ReadonlySet<string>> = {
  [FATHA]: new Set([ALIF, ALIF_MAQSURA, TEH_MARBUTA]),
  [KASRA]: new Set([YEH]),
  [DAMMA]: new Set([WAW]),
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

export function removeLeadingDiacritics(chars: readonly string[]): readonly string[] {
  const result = [...chars]
  while (isDiacritic(result.at(0))) result.shift()
  return result
}

export function removeFinalDiacritic(word: readonly string[]): readonly string[] {
  const lastIndex = findLastLetterIndex(word)
  const base = word.slice(0, lastIndex + 1)
  return word.slice(lastIndex + 1).includes(SHADDA) ? [...base, SHADDA] : base
}

export function geminateDoubleLetters(word: readonly string[]): readonly string[] {
  return Array.from(word.join('').replace(new RegExp(`(.)(?:${SUKOON}\\1|\\1)`), `$1${SHADDA}`))
}

export function seatHamza(letter: string, vowel: string): string {
  if (!isHamzatedLetter(letter)) return letter
  if (vowel === FATHA) return ALIF_HAMZA
  if (vowel === DAMMA) return HAMZA_ON_WAW
  return HAMZA_ON_YEH
}

export function shortVowelFromPattern(vowel: 'a' | 'i' | 'u'): string {
  return SHORT_VOWEL_MAP[vowel]
}

export function longVowelFromPattern(vowel: 'a' | 'i' | 'u'): string[] {
  return [SHORT_VOWEL_MAP[vowel], LONG_VOWEL_MAP[vowel]]
}

export function findWeakLetterIndex(word: readonly string[], index: number = 0): number {
  return word.findIndex((char, i) => i > index && isWeakLetter(char))
}

export function findLetterIndex(word: readonly string[], index: number = 0): number {
  return word.findIndex((char, i) => i > index && !isDiacritic(char))
}

export function findLastLetterIndex(word: readonly string[], beforeIndex?: number): number {
  const index = beforeIndex ?? word.length
  return word.findLastIndex((char, i) => i < index && !isDiacritic(char))
}

export function last(word: readonly string[]): string | undefined {
  return word.at(-1)
}

export function normalizeAlifMadda(word: readonly string[]): readonly string[] {
  return word
    .join('')
    .replace(new RegExp(`${ALIF_HAMZA}${FATHA}[${ALIF_HAMZA}${ALIF}]${SUKOON}?`), ALIF_MADDA)
    .split('')
}

interface RootAnalysis {
  type:
    | 'strong'
    | 'hollow'
    | 'defective'
    | 'doubly-weak'
    | 'assimilated'
    | 'hamzated'
    | 'hamzated-hollow'
    | 'hamzated-defective'
    | 'hamzated-hollow-defective'
  weakPositions: number[]
  hamzaPositions: number[]
}

export function analyzeRoot(root: string): RootAnalysis {
  const letters = Array.from(root)
  const weakPositions: number[] = []
  const hamzaPositions: number[] = []

  letters.forEach((letter, index) => {
    if (isWeakLetter(letter)) weakPositions.push(index)
    if (isHamzatedLetter(letter)) hamzaPositions.push(index)
  })

  const [c1, c2, c3] = Array.from(letters)
  const isInitialWeak = isWeakLetter(c1)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const hasHamza = hamzaPositions.length > 0

  if (!hasHamza && weakPositions.length >= 2) return { type: 'doubly-weak', weakPositions, hamzaPositions }
  if (isInitialWeak) return { type: 'assimilated', weakPositions, hamzaPositions }
  if (hasHamza && isMiddleWeak && isFinalWeak)
    return { type: 'hamzated-hollow-defective', weakPositions, hamzaPositions }
  if (hasHamza && isMiddleWeak) return { type: 'hamzated-hollow', weakPositions, hamzaPositions }
  if (hasHamza && isFinalWeak) return { type: 'hamzated-defective', weakPositions, hamzaPositions }
  if (hasHamza) return { type: 'hamzated', weakPositions, hamzaPositions }
  if (isMiddleWeak) return { type: 'hollow', weakPositions, hamzaPositions }
  if (isFinalWeak) return { type: 'defective', weakPositions, hamzaPositions }
  return { type: 'strong', weakPositions, hamzaPositions }
}
