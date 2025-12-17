import { FORM_I_PRESENT_VOWELS, resolveFormIPastVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_MADDA,
  ALIF_MAQSURA,
  DAMMA,
  FATHA,
  HAMZA,
  HAMZA_ON_WAW,
  HAMZA_ON_YEH,
  isHamzatedLetter,
  isWeakLetter,
  KASRA,
  MEEM,
  NOON,
  removeTrailingDiacritics,
  SEEN,
  SHADDA,
  SUKOON,
  shortVowelFromPattern,
  stripTrailingDiacritics,
  TEH,
  WAW,
  YEH,
} from '../letters'
import { PRONOUN_IDS, type PronounId } from '../pronouns'
import type { Verb } from '../verbs'

function weakLetterTail(letter: string): string {
  return letter === YEH || letter === ALIF_MAQSURA
    ? ALIF_MAQSURA
    : letter === ALIF_HAMZA
      ? ALIF_HAMZA
      : letter === HAMZA_ON_YEH
        ? HAMZA_ON_YEH
        : ALIF
}

type PastBaseForms =
  | {
      base: readonly string[]
      baseWithSukoon: readonly string[]
      baseWithDamma: readonly string[]
    }
  | {
      base: readonly string[]
      baseWithSukoon: readonly string[]
      baseWithDamma: readonly string[]
      baseWithoutC3: readonly string[]
      glide: string
    }

const PAST_BUILDERS: Record<PronounId, (forms: PastBaseForms, verb: Verb) => readonly string[]> = {
  '1s': (forms) => {
    if ('baseWithoutC3' in forms) return [...forms.baseWithoutC3, forms.glide, SUKOON, TEH, DAMMA]
    return [...forms.baseWithSukoon, TEH, DAMMA]
  },
  '2ms': (forms) => {
    if ('baseWithoutC3' in forms) return [...forms.baseWithoutC3, forms.glide, SUKOON, TEH, FATHA]
    return [...forms.baseWithSukoon, TEH, FATHA]
  },
  '2fs': (forms) => {
    if ('baseWithoutC3' in forms) return [...forms.baseWithoutC3, forms.glide, SUKOON, TEH, KASRA]
    return [...forms.baseWithSukoon, TEH, KASRA]
  },
  '3ms': (forms) => forms.base,
  '3fs': (forms) => {
    if ('baseWithoutC3' in forms) return [...forms.baseWithoutC3, TEH, SUKOON]
    return [...forms.base, TEH, SUKOON]
  },
  '2d': (forms) => {
    if ('baseWithoutC3' in forms) return [...forms.baseWithoutC3, forms.glide, SUKOON, TEH, DAMMA, MEEM, FATHA, ALIF]
    return [...forms.baseWithSukoon, TEH, DAMMA, MEEM, FATHA, ALIF]
  },
  '3dm': (forms) => {
    if ('baseWithoutC3' in forms) return [...forms.baseWithoutC3, forms.glide, FATHA, ALIF]
    return [...forms.base, ALIF]
  },
  '3df': (forms) => {
    if ('baseWithoutC3' in forms) return [...forms.baseWithoutC3, TEH, FATHA, ALIF]
    return [...forms.base, TEH, FATHA, ALIF]
  },
  '1p': (forms) => {
    if ('baseWithoutC3' in forms) return [...forms.baseWithoutC3, forms.glide, SUKOON, NOON, FATHA, ALIF]
    return [...forms.baseWithSukoon, NOON, FATHA, ALIF]
  },
  '2pm': (forms) => {
    if ('baseWithoutC3' in forms) return [...forms.baseWithoutC3, forms.glide, SUKOON, TEH, DAMMA, MEEM, SUKOON]
    return [...forms.baseWithSukoon, TEH, DAMMA, MEEM, SUKOON]
  },
  '2pf': (forms) => {
    if ('baseWithoutC3' in forms) return [...forms.baseWithoutC3, forms.glide, SUKOON, TEH, DAMMA, NOON, SHADDA, FATHA]
    return [...forms.baseWithSukoon, TEH, DAMMA, NOON, SHADDA, FATHA]
  },
  '3pm': (forms, verb) => {
    const [, c2, c3] = [...verb.root]

    // For hollow verbs with final hamza, hamza before و should be seated on waw: جَاؤُوا
    if (isWeakLetter(c2) && isHamzatedLetter(c3))
      return [
        ...stripTrailingDiacritics(forms.base).map((char) => (char === HAMZA ? HAMZA_ON_WAW : char)),
        DAMMA,
        WAW,
        ALIF,
      ]

    if ('baseWithoutC3' in forms) {
      const pluralGlide = forms.glide === YEH ? WAW : forms.glide
      return [...forms.baseWithoutC3, pluralGlide, SUKOON, ALIF]
    }
    return [...forms.baseWithDamma, WAW, ALIF]
  },
  '3pf': (forms) => {
    if ('baseWithoutC3' in forms) return [...forms.baseWithoutC3, forms.glide, SUKOON, NOON, FATHA]
    return [...forms.baseWithSukoon, NOON, FATHA]
  },
}

export function conjugatePast(verb: Verb): Record<PronounId, string> {
  const forms = derivePastForms(verb)

  return PRONOUN_IDS.reduce<Record<PronounId, string>>(
    (acc, pronounId) => {
      const past = PAST_BUILDERS[pronounId](forms, verb)
      acc[pronounId] = past.join('')
      return acc
    },
    {} as Record<PronounId, string>,
  )
}

function buildPastBase(verb: Verb): readonly string[] {
  const letters = [...verb.root]

  if (letters.length < 3) {
    throw new Error(`Root must have at least 3 letters, received "${verb.root}".`)
  }

  // Handle quadriliteral and longer roots
  if (letters.length === 4) {
    const [c1, c2, c3, c4] = letters
    switch (verb.form) {
      case 1:
        return [c1, FATHA, c2, SUKOON, c3, FATHA, c4, FATHA]
      case 2:
        return [TEH, FATHA, c1, FATHA, c2, SUKOON, c3, FATHA, c4, FATHA]
      default:
        // For other forms, use Form I pattern
        return [c1, FATHA, c2, SUKOON, c3, FATHA, c4, FATHA]
    }
  }

  // Handle 5+ letter roots (rare, but possible)
  if (letters.length >= 5) {
    // For longer roots, use a simple pattern: first letter + FATHA, rest with SUKOON/FATHA
    const [c1, ...rest] = letters
    const [middle] = rest.slice(0, -1).join(SUKOON)
    const last = rest[rest.length - 1]
    return [c1, FATHA, middle, SUKOON, last, FATHA]
  }

  // Triliteral roots (3 letters) - original logic
  const [c1, c2, c3] = letters

  switch (verb.form) {
    case 1: {
      const pastVowel = resolveFormIPastVowel(verb)

      // Final-weak Form I: long vowel in the base, no ending fatḥa
      if (isWeakLetter(c3) && pastVowel === 'i') return [c1, FATHA, c2, KASRA, YEH, FATHA]

      // Final-weak Form I: long vowel in the base, no ending fatḥa
      if (isWeakLetter(c3)) return [c1, FATHA, c2, shortVowelFromPattern(pastVowel), weakLetterTail(c3)]

      // Geminate Form I: if c2 === c3, collapse with shadda (e.g., حَبَّ)
      if (c2 === c3) return [c1, FATHA, c2, SHADDA, FATHA]

      // Hollow Form I past contracts to a long /ā/ in the base (e.g., قامَ)
      if (isWeakLetter(c2)) return [c1, FATHA, ALIF, c3, FATHA]

      return [c1, FATHA, c2, shortVowelFromPattern(pastVowel), c3, FATHA]
    }

    case 2:
      // Geminate Form II: c2 === c3, fatḥa then shadda on c2, then c3 (e.g., حَبَّبَ)
      if (c2 === c3) return normalizeDefectivePast([c1, FATHA, c2, FATHA, SHADDA, c3, FATHA], c3)

      return normalizeDefectivePast([c1, FATHA, c2, SHADDA, FATHA, c3, FATHA], c3)

    case 3:
      // Hollow Form III: if c2 is ALIF, don't insert another ALIF (e.g., عَانَ)
      if (c2 === ALIF) return normalizeDefectivePast([c1, FATHA, ALIF, c3, FATHA], c3)

      return normalizeDefectivePast([c1, FATHA, ALIF, c2, FATHA, c3, FATHA], c3)

    case 4: {
      // Geminate Form IV (e.g., أَحَبَّ) collapses the second/third radical with shadda
      if (c2 === c3)
        return c1 === ALIF_HAMZA ? [ALIF_MADDA, c2, SHADDA, FATHA] : [ALIF_HAMZA, FATHA, c1, FATHA, c2, SHADDA, FATHA]

      const prefix = c1 === ALIF_HAMZA ? [ALIF_MADDA] : [ALIF_HAMZA, FATHA, c1, SUKOON]

      // Initial hamza + middle weak + final weak (e.g., أوي → آوَى)
      if (c1 === ALIF_HAMZA && isWeakLetter(c2) && isWeakLetter(c3))
        return normalizeDefectivePast([ALIF_MADDA, c2, FATHA, c3], c3)

      if (isWeakLetter(c3)) return normalizeDefectivePast([...prefix, c2, FATHA, c3], c3)

      // Hollow Form IV past contracts to long ā (e.g., أَضَافَ)
      // Hollow Form IV with final hamza (e.g., أَجَاءَ) - don't normalize, hamza is not a weak letter
      if (isWeakLetter(c2) && isHamzatedLetter(c3)) return [ALIF_HAMZA, FATHA, c1, FATHA, ALIF, c3, FATHA]
      if (isWeakLetter(c2)) return normalizeDefectivePast([ALIF_HAMZA, FATHA, c1, FATHA, ALIF, c3, FATHA], c3)

      return normalizeDefectivePast([...prefix, c2, FATHA, c3, FATHA], c3)
    }

    case 5:
      return normalizeDefectivePast([TEH, FATHA, c1, FATHA, c2, SHADDA, FATHA, c3, FATHA], c3)

    case 6:
      // Hollow Form VI: if c2 is ALIF, don't insert another ALIF (e.g., تَعَانَ)
      if (c2 === ALIF) return normalizeDefectivePast([TEH, FATHA, c1, FATHA, ALIF, c3, FATHA], c3)
      // Hollow Form VI with final hamza (e.g., تَجَاءَ) - don't normalize, hamza is not a weak letter
      if (isWeakLetter(c2) && isHamzatedLetter(c3)) return [TEH, FATHA, c1, FATHA, ALIF, c3, FATHA]

      return normalizeDefectivePast([TEH, FATHA, c1, FATHA, ALIF, c2, FATHA, c3, FATHA], c3)

    case 7:
      // Hollow Form VII (e.g., اِنْقَادَ) lengthens the glide to ألف
      if (isWeakLetter(c2)) return normalizeDefectivePast([ALIF, KASRA, NOON, SUKOON, c1, FATHA, ALIF, c3, FATHA], c3)

      return normalizeDefectivePast([ALIF, KASRA, NOON, SUKOON, c1, FATHA, c2, FATHA, c3, FATHA], c3)

    case 8:
      if (c1 === WAW) return normalizeDefectivePast([ALIF, KASRA, TEH, SHADDA, FATHA, c2, FATHA, c3, FATHA], c3)

      if (isWeakLetter(c2)) return normalizeDefectivePast([ALIF, KASRA, c1, SUKOON, TEH, FATHA, ALIF, c3, FATHA], c3)

      return normalizeDefectivePast([ALIF, KASRA, c1, SUKOON, TEH, FATHA, c2, FATHA, c3, FATHA], c3)

    case 9:
      return normalizeDefectivePast([ALIF, KASRA, c1, SUKOON, c2, FATHA, c3, SHADDA, FATHA], c3)

    case 10:
      // Initial hamza + middle weak + final weak (e.g., أوي → اِسْتَأْوَى)
      if (c1 === ALIF_HAMZA && isWeakLetter(c2) && isWeakLetter(c3))
        return normalizeDefectivePast(
          [ALIF, KASRA, SEEN, SUKOON, TEH, FATHA, ALIF_HAMZA, SUKOON, c2, FATHA, c3, FATHA],
          c3,
        )

      if (isWeakLetter(c2))
        return normalizeDefectivePast([ALIF, KASRA, SEEN, SUKOON, TEH, FATHA, c1, FATHA, ALIF, c3, FATHA], c3)

      return normalizeDefectivePast([ALIF, KASRA, SEEN, SUKOON, TEH, FATHA, c1, SUKOON, c2, FATHA, c3, FATHA], c3)

    default:
      return []
  }
}

function normalizeDefectivePast(base: readonly string[], c3: string): readonly string[] {
  if (!isWeakLetter(c3)) return base
  const chars = [...removeTrailingDiacritics(base)]
  if (chars.length === 0) return base

  const last = chars.pop()
  if (!last) return base

  // Drop final weak c3 and append appropriate tail
  // For defective verbs in past tense, final و becomes alif maqsura (ى), not alif (ا)
  const tail = c3 === WAW ? ALIF_MAQSURA : weakLetterTail(c3)
  return last === c3 ? [...chars, tail] : [...chars, last, tail]
}

function derivePastForms(verb: Verb): PastBaseForms {
  const base = buildPastBase(verb)
  const stem = stripTrailingDiacritics(base)
  const [c1, c2, c3] = [...verb.root]
  const isDefective = isWeakLetter(verb.root.at(-1))
  const isHollow = isWeakLetter(c2)
  const isFinalHamza = isHamzatedLetter(c3)

  // Hollow verb with final hamza (e.g., جيء → جَاءَ / جِئْتُ, Form IV: أَجَاءَ / أَجِئْتُ, Form VI: تَجَاءَ / تَجِئْتُ)
  // Base keeps hamza, but forms with suffixes drop hamza and seat it on yeh
  if (isHollow && isFinalHamza) {
    const shortVowel = hollowShortVowel(verb)
    // For Form IV and VI, preserve the prefix from the base
    if (verb.form === 4 || verb.form === 6) {
      // Base is [أ, ج, َ, ا, ء] or [ت, ج, ا, ء], we need [أ, ج, ِ, ئ] or [ت, ج, ِ, ئ]
      // Remove alif, change fatḥa before it to kasra, replace hamza with hamza on yeh
      const result = stripTrailingDiacritics(base)
        .map((char, i, stem) => {
          if (char === ALIF) return null
          if (char === FATHA && stem[i + 1] === ALIF) return KASRA
          if (char === HAMZA) return HAMZA_ON_YEH
          return char
        })
        .filter((char): char is string => char != null)
      return {
        base,
        baseWithSukoon: [...result, SUKOON],
        baseWithDamma: [...result, DAMMA],
      }
    }
    return {
      base,
      baseWithSukoon: [c1, shortVowel, HAMZA_ON_YEH, SUKOON],
      baseWithDamma: [c1, shortVowel, HAMZA_ON_YEH, DAMMA],
    }
  }

  if (!isDefective && isHollow)
    return {
      base,
      baseWithSukoon: [c1, hollowShortVowel(verb), c3, SUKOON],
      baseWithDamma: [...stem, DAMMA],
    }

  if (!isDefective)
    return {
      base: base,
      baseWithSukoon: [...stem, SUKOON],
      baseWithDamma: [...stem, DAMMA],
    }

  const baseWithoutC3 = stem.slice(0, -1)
  const glide = glideFromRadical(verb.root.at(-1))
  const lastRadical = verb.root.at(-1)

  return {
    base: lastRadical === ALIF_MAQSURA || lastRadical === ALIF ? stem : base,
    baseWithSukoon: [...baseWithoutC3, glide, SUKOON],
    baseWithDamma: [...baseWithoutC3, glide, DAMMA],
    baseWithoutC3: baseWithoutC3,
    glide,
  }
}

const glideFromRadical = (value = ''): string => (value === WAW || value === ALIF ? WAW : YEH)

function hollowShortVowel(verb: Verb): string {
  const middleRadical = verb.root.at(1)
  const isFinalHamza = isHamzatedLetter(verb.root.at(-1))
  // Hollow verbs with final hamza and middle ya always use kasra (e.g., جيء → جِئْتُ)
  if (isFinalHamza && middleRadical === YEH) return KASRA
  if (verb.form === 1 && verb.formPattern) return shortVowelFromPattern(FORM_I_PRESENT_VOWELS[verb.formPattern])
  if (middleRadical === YEH) return KASRA
  if (middleRadical === WAW || middleRadical === ALIF) return DAMMA
  return FATHA
}
