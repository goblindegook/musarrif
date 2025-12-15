import {
  ALIF,
  ALIF_HAMZA,
  ALIF_MADDA,
  ALIF_MAQSURA,
  DAMMA,
  FATHA,
  KASRA,
  MEEM,
  NOON,
  SEEN,
  SHADDA,
  SUKOON,
  TEH,
  WAW,
  YEH,
} from '../constants'
import { FORM_I_PRESENT_VOWELS, resolveFormIPastVowel } from '../form-i-vowels'
import {
  isWeakLetter,
  removeTrailingDiacritics,
  shortVowelFromPattern,
  stripTrailingDiacritics,
  weakLetterTail,
} from '../helpers'
import { PRONOUN_IDS, type PronounId } from '../pronouns'
import type { Verb } from '../verbs'

type PastBaseForms = {
  base: readonly string[]
  baseWithSukoon: readonly string[]
  baseWithDamma: readonly string[]
  baseWithoutC3?: readonly string[]
  glide?: string
}

const PAST_BUILDERS: Record<PronounId, (forms: PastBaseForms) => readonly string[]> = {
  '1s': (forms) => [...forms.baseWithSukoon, TEH, DAMMA],
  '2ms': (forms) => [...forms.baseWithSukoon, TEH, FATHA],
  '2fs': (forms) => [...forms.baseWithSukoon, TEH, KASRA],
  '3ms': (forms) => [...forms.base],
  '3fs': (forms) => [...forms.base, TEH, SUKOON],
  '2d': (forms) => [...forms.baseWithSukoon, TEH, DAMMA, MEEM, FATHA, ALIF],
  '3dm': (forms) => [...forms.base, ALIF],
  '3df': (forms) => [...forms.base, TEH, FATHA, ALIF],
  '1p': (forms) => [...forms.baseWithSukoon, NOON, FATHA, ALIF],
  '2pm': (forms) => [...forms.baseWithSukoon, TEH, DAMMA, MEEM, SUKOON],
  '2pf': (forms) => [...forms.baseWithSukoon, TEH, DAMMA, NOON, SHADDA, FATHA],
  '3pm': (forms) => [...forms.baseWithDamma, WAW, ALIF],
  '3pf': (forms) => [...forms.baseWithSukoon, NOON, FATHA],
}

export function conjugatePast(verb: Verb): Record<PronounId, string> {
  const forms = derivePastForms(verb)

  return PRONOUN_IDS.reduce<Record<PronounId, string>>(
    (acc, pronounId) => {
      const past = forms.baseWithoutC3 ? buildDefectivePast(pronounId, forms) : PAST_BUILDERS[pronounId](forms)
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
      if (isWeakLetter(c3)) {
        // e.g., نَسِيَ -> ياء with kasra on C2
        if (pastVowel === 'i') return [c1, FATHA, c2, KASRA, YEH, FATHA]

        // Default to long ā (wāw -> alif, yā’ -> alif maqṣūra)
        return [c1, FATHA, c2, shortVowelFromPattern(pastVowel), weakLetterTail(c3)]
      }

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
      if (isWeakLetter(c2)) return normalizeDefectivePast([ALIF_HAMZA, FATHA, c1, FATHA, ALIF, c3, FATHA], c3)

      return normalizeDefectivePast([...prefix, c2, FATHA, c3, FATHA], c3)
    }

    case 5:
      return normalizeDefectivePast([TEH, FATHA, c1, FATHA, c2, SHADDA, FATHA, c3, FATHA], c3)

    case 6:
      // Hollow Form VI: if c2 is ALIF, don't insert another ALIF (e.g., تَعَانَ)
      if (c2 === ALIF) return normalizeDefectivePast([TEH, FATHA, c1, FATHA, ALIF, c3, FATHA], c3)

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
  if (verb.form === 1 && verb.formPattern) return shortVowelFromPattern(FORM_I_PRESENT_VOWELS[verb.formPattern])
  if (middleRadical === YEH) return KASRA
  if (middleRadical === WAW || middleRadical === ALIF) return DAMMA
  return FATHA
}

function buildDefectivePast(pronounId: PronounId, forms: PastBaseForms): readonly string[] {
  const baseWithoutC3 = forms.baseWithoutC3 ?? []
  const glide = forms.glide ?? YEH

  switch (pronounId) {
    case '3ms':
      return forms.base
    case '3fs':
      return [...baseWithoutC3, TEH, SUKOON]
    case '3dm':
      return [...baseWithoutC3, glide, FATHA, ALIF]
    case '3df':
      return [...baseWithoutC3, TEH, FATHA, ALIF]
    case '3pm': {
      const pluralGlide = glide === YEH ? WAW : glide
      return [...baseWithoutC3, pluralGlide, SUKOON, ALIF]
    }
    default:
      return PAST_BUILDERS[pronounId](forms)
  }
}
