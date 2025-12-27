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

export const COMBINING_MARK = /\p{Mn}/u

export type DiacriticsPreference = 'all' | 'some' | 'none'

export type ShortVowel = 'a' | 'i' | 'u'

export type Vowel = typeof FATHA | typeof KASRA | typeof DAMMA

export type VowelOrSukoon = Vowel | typeof SUKOON

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

const SHORT_VOWELS = [FATHA, KASRA, DAMMA]
const LONG_VOWEL_TARGETS: Record<string, ReadonlySet<string>> = {
  [FATHA]: new Set([ALIF, ALIF_MAQSURA]),
  [KASRA]: new Set([YEH]),
  [DAMMA]: new Set([WAW]),
}

export function stripDiacritics(input: string): string {
  return input.replace(/[\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e8\u06ea-\u06ed]/g, '')
}

function stripObviousDiacritics(input: string): string {
  const chars = Array.from(input)
  const result: string[] = []

  for (let index = 0; index < chars.length; index += 1) {
    const current = chars[index]
    if (current === SUKOON) {
      const nextBase = findNextBaseLetter(chars, index + 1)
      if (nextBase && isWeakLetter(nextBase)) {
        result.push(current)
      }
      continue
    }
    if (SHORT_VOWELS.includes(current)) {
      const nextBase = findNextBaseLetter(chars, index + 1)
      if (nextBase && LONG_VOWEL_TARGETS[current]?.has(nextBase)) {
        continue
      }
    }
    result.push(current)
  }

  return result.join('')
}

export function applyDiacriticsPreference(input: string, preference: DiacriticsPreference): string {
  if (preference === 'all') return input
  if (preference === 'some') return stripObviousDiacritics(input)
  return stripDiacritics(input)
}

export function isWeakLetter(value = ''): boolean {
  return [ALIF, ALIF_MAQSURA, WAW, YEH].includes(value)
}

export function isHamzatedLetter(value = ''): boolean {
  return [HAMZA, ALIF_HAMZA, HAMZA_ON_WAW, HAMZA_ON_YEH].includes(value)
}

export function weakLetterGlide(letter: string): string {
  return letter === WAW || letter === ALIF ? WAW : YEH
}

export function isDiacritic(char = ''): boolean {
  return COMBINING_MARK.test(char)
}

export function removeLeadingDiacritics(chars: readonly string[]): readonly string[] {
  const result = [...chars]
  while (isDiacritic(result.at(0))) result.shift()
  return result
}

export function removeTrailingDiacritics(chars: readonly string[]): readonly string[] {
  const result = [...chars]
  while (isDiacritic(result.at(-1))) result.pop()
  return result
}

export function shortVowelFromPattern(vowel: 'a' | 'i' | 'u'): string {
  return SHORT_VOWEL_MAP[vowel]
}

export function longVowelFromPattern(vowel: 'a' | 'i' | 'u'): string {
  return LONG_VOWEL_MAP[vowel]
}

function findNextBaseLetter(chars: readonly string[], startIndex: number): string | undefined {
  for (let index = startIndex; index < chars.length; index += 1) {
    if (!COMBINING_MARK.test(chars[index])) return chars[index]
  }
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

  const isInitialWeak = isWeakLetter(letters.at(0))
  const isMiddleWeak = isWeakLetter(letters.at(1))
  const isFinalWeak = isWeakLetter(letters.at(-1))
  const hasHamza = hamzaPositions.length > 0

  if (isInitialWeak && isFinalWeak) return { type: 'doubly-weak', weakPositions, hamzaPositions }
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
