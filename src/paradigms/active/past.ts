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
      acc[pronounId] = past.join('').normalize('NFC')
      return acc
    },
    {} as Record<PronounId, string>,
  )
}

function buildDefectiveForms(base: readonly string[], verb: Verb): PastBaseForms {
  const stem = stripTrailingDiacritics(base)
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

function buildNonDefectiveForms(base: readonly string[]): PastBaseForms {
  const stem = stripTrailingDiacritics(base)
  return {
    base,
    baseWithSukoon: [...stem, SUKOON],
    baseWithDamma: [...stem, DAMMA],
  }
}

function deriveQuadriliteralPastForms(verb: Verb): PastBaseForms {
  const [c1, c2, c3, c4] = [...verb.root]
  return buildNonDefectiveForms([c1, FATHA, c2, SUKOON, c3, FATHA, c4, FATHA])
}

function derivePastFormI(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const isDefective = isWeakLetter(c3)
  const pastVowel = resolveFormIPastVowel(verb)

  // Final-weak Form I: long vowel in the base, no ending fatḥa
  if (isWeakLetter(c3) && pastVowel === 'i') return buildDefectiveForms([c1, FATHA, c2, KASRA, YEH, FATHA], verb)

  // Final-weak Form I: long vowel in the base, no ending fatḥa
  if (isWeakLetter(c3))
    return buildDefectiveForms([c1, FATHA, c2, shortVowelFromPattern(pastVowel), weakLetterTail(c3)], verb)

  // Geminate Form I: if c2 === c3, collapse with shadda (e.g., حَبَّ)
  if (c2 === c3) {
    return buildNonDefectiveForms([c1, FATHA, c2, SHADDA, FATHA])
  }

  // Hollow Form I past contracts to a long /ā/ in the base (e.g., قامَ)
  if (isWeakLetter(c2)) {
    // Hollow Form I with final hamza (e.g., جيء → جَاءَ)
    if (isHamzatedLetter(c3)) {
      const suffixedBase = [c1, hollowShortVowel(verb), HAMZA_ON_YEH]
      return {
        base: [c1, FATHA, ALIF, c3, FATHA],
        baseWithSukoon: [...suffixedBase, SUKOON],
        baseWithDamma: [...suffixedBase, DAMMA],
      }
    }
    // Form I hollow verbs shorten to [c1, shortVowel, c3] in suffixed forms (e.g., قُلْ)
    // baseWithDamma keeps the alif for 3pm (قَالُوا)
    const base = [c1, FATHA, ALIF, c3, FATHA]
    return {
      base,
      baseWithSukoon: [c1, hollowShortVowel(verb), c3, SUKOON],
      baseWithDamma: [...stripTrailingDiacritics(base), DAMMA],
    }
  }

  const base = [c1, FATHA, c2, shortVowelFromPattern(pastVowel), c3, FATHA]
  return isDefective ? buildDefectiveForms(base, verb) : buildNonDefectiveForms(base)
}

function derivePastFormII(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const isDefective = isWeakLetter(c3)

  // Geminate Form II: c2 === c3, fatḥa then shadda on c2, then c3 (e.g., حَبَّبَ)
  if (c2 === c3) {
    const base = normalizeDefectivePast([c1, FATHA, c2, FATHA, SHADDA, c3, FATHA], c3)
    return isDefective ? buildDefectiveForms(base, verb) : buildNonDefectiveForms(base)
  }

  const base = normalizeDefectivePast([c1, FATHA, c2, SHADDA, FATHA, c3, FATHA], c3)
  // Hollow Form II keeps the shadda pattern in suffixed forms (e.g., قَوَّلْ)
  return isDefective ? buildDefectiveForms(base, verb) : buildNonDefectiveForms(base)
}

function derivePastFormIII(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const isDefective = isWeakLetter(c3)
  const base = normalizeDefectivePast([c1, FATHA, ALIF, c2, FATHA, c3, FATHA], c3)
  // Hollow Form III keeps the alif in suffixed forms (e.g., قَاوَلْ)
  return isDefective ? buildDefectiveForms(base, verb) : buildNonDefectiveForms(base)
}

function derivePastFormIV(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const isDefective = isWeakLetter(c3)

  // Geminate Form IV (e.g., أَحَبَّ) collapses the second/third radical with shadda
  if (c2 === c3) {
    return buildNonDefectiveForms([ALIF_HAMZA, FATHA, c1, FATHA, c2, SHADDA, FATHA])
  }

  // Initial hamza + middle weak + final weak (e.g., أوي → آوَى)
  if (c1 === ALIF_HAMZA && isWeakLetter(c2) && isWeakLetter(c3)) {
    const base = normalizeDefectivePast([ALIF_MADDA, c2, FATHA, c3], c3)
    return isDefective ? buildDefectiveForms(base, verb) : buildNonDefectiveForms(base)
  }

  const prefix = c1 === ALIF_HAMZA ? [ALIF_MADDA] : [ALIF_HAMZA, FATHA, c1, SUKOON]

  if (isWeakLetter(c3)) {
    const base = normalizeDefectivePast([...prefix, c2, FATHA, c3], c3)
    return isDefective ? buildDefectiveForms(base, verb) : buildNonDefectiveForms(base)
  }

  // Hollow Form IV past contracts to long ā (e.g., أَضَافَ)
  // Hollow Form IV with final hamza (e.g., أَجَاءَ) - don't normalize, hamza is not a weak letter
  if (isWeakLetter(c2) && isHamzatedLetter(c3)) {
    const base = [ALIF_HAMZA, FATHA, c1, FATHA, ALIF, c3, FATHA]
    return {
      base,
      baseWithSukoon: [...transformHollowWithFinalHamza(base), SUKOON],
      baseWithDamma: [...transformHollowWithFinalHamza(base), DAMMA],
    }
  }
  if (isWeakLetter(c2)) {
    const base = normalizeDefectivePast([ALIF_HAMZA, FATHA, c1, FATHA, ALIF, c3, FATHA], c3)
    const stem = stripTrailingDiacritics(base)
    return {
      base,
      baseWithSukoon: [...shortenHollowStem(stem, hollowShortVowel(verb)), SUKOON],
      baseWithDamma: [...stem, DAMMA],
    }
  }

  const base = normalizeDefectivePast([...prefix, c2, FATHA, c3, FATHA], c3)
  return isDefective ? buildDefectiveForms(base, verb) : buildNonDefectiveForms(base)
}

function derivePastFormV(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const isDefective = isWeakLetter(c3)
  const base = normalizeDefectivePast([TEH, FATHA, c1, FATHA, c2, SHADDA, FATHA, c3, FATHA], c3)
  return isDefective ? buildDefectiveForms(base, verb) : buildNonDefectiveForms(base)
}

function derivePastFormVI(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const isDefective = isWeakLetter(c3)

  // Hollow Form VI with final hamza (e.g., تَجَاءَ) - don't normalize, hamza is not a weak letter
  if (isWeakLetter(c2) && isHamzatedLetter(c3)) {
    const base = [TEH, FATHA, c1, FATHA, ALIF, c3, FATHA]
    return {
      base,
      baseWithSukoon: [...transformHollowWithFinalHamza(base), SUKOON],
      baseWithDamma: [...transformHollowWithFinalHamza(base), DAMMA],
    }
  }

  const base = normalizeDefectivePast([TEH, FATHA, c1, FATHA, ALIF, c2, FATHA, c3, FATHA], c3)
  return isDefective ? buildDefectiveForms(base, verb) : buildNonDefectiveForms(base)
}

function derivePastFormVII(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const isDefective = isWeakLetter(c3)
  // Hollow Form VII (e.g., اِنْقَادَ) lengthens the glide to ألف
  const base = isWeakLetter(c2)
    ? normalizeDefectivePast([ALIF, KASRA, NOON, SUKOON, c1, FATHA, ALIF, c3, FATHA], c3)
    : normalizeDefectivePast([ALIF, KASRA, NOON, SUKOON, c1, FATHA, c2, FATHA, c3, FATHA], c3)
  return isDefective ? buildDefectiveForms(base, verb) : buildNonDefectiveForms(base)
}

function derivePastFormVIII(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const isDefective = isWeakLetter(c3)
  const base =
    c1 === WAW
      ? normalizeDefectivePast([ALIF, KASRA, TEH, SHADDA, FATHA, c2, FATHA, c3, FATHA], c3)
      : isWeakLetter(c2)
        ? normalizeDefectivePast([ALIF, KASRA, c1, SUKOON, TEH, FATHA, ALIF, c3, FATHA], c3)
        : normalizeDefectivePast([ALIF, KASRA, c1, SUKOON, TEH, FATHA, c2, FATHA, c3, FATHA], c3)
  return isDefective ? buildDefectiveForms(base, verb) : buildNonDefectiveForms(base)
}

function derivePastFormIX(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const isDefective = isWeakLetter(c3)
  const base = normalizeDefectivePast([ALIF, KASRA, c1, SUKOON, c2, FATHA, c3, SHADDA, FATHA], c3)
  return isDefective ? buildDefectiveForms(base, verb) : buildNonDefectiveForms(base)
}

function derivePastFormX(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const isDefective = isWeakLetter(c3)
  // Initial hamza + middle weak + final weak (e.g., أوي → اِسْتَأْوَى)
  const base =
    c1 === ALIF_HAMZA && isWeakLetter(c2) && isWeakLetter(c3)
      ? normalizeDefectivePast([ALIF, KASRA, SEEN, SUKOON, TEH, FATHA, ALIF_HAMZA, SUKOON, c2, FATHA, c3, FATHA], c3)
      : isWeakLetter(c2)
        ? normalizeDefectivePast([ALIF, KASRA, SEEN, SUKOON, TEH, FATHA, c1, FATHA, ALIF, c3, FATHA], c3)
        : normalizeDefectivePast([ALIF, KASRA, SEEN, SUKOON, TEH, FATHA, c1, SUKOON, c2, FATHA, c3, FATHA], c3)
  return isDefective ? buildDefectiveForms(base, verb) : buildNonDefectiveForms(base)
}

function derivePastForms(verb: Verb): PastBaseForms {
  // Handle quadriliteral and longer roots
  if (verb.root.length === 4) {
    return deriveQuadriliteralPastForms(verb)
  }

  // Triliteral roots (3 letters)
  switch (verb.form) {
    case 1:
      return derivePastFormI(verb)
    case 2:
      return derivePastFormII(verb)
    case 3:
      return derivePastFormIII(verb)
    case 4:
      return derivePastFormIV(verb)
    case 5:
      return derivePastFormV(verb)
    case 6:
      return derivePastFormVI(verb)
    case 7:
      return derivePastFormVII(verb)
    case 8:
      return derivePastFormVIII(verb)
    case 9:
      return derivePastFormIX(verb)
    case 10:
      return derivePastFormX(verb)
  }
}

function normalizeDefectivePast(base: readonly string[], c3: string): readonly string[] {
  if (!isWeakLetter(c3)) return base
  const chars = [...removeTrailingDiacritics(base)]
  const last = chars.pop()
  if (!last) return base

  // Drop final weak c3 and append appropriate tail
  // For defective verbs in past tense, final و becomes alif maqsura (ى), not alif (ا)
  return [...chars, weakLetterTail(c3)]
}

function transformHollowWithFinalHamza(base: readonly string[]): readonly string[] {
  // Remove alif, change fatḥa before it to kasra, replace hamza with hamza on yeh
  // Base is [أ, ج, َ, ا, ء] or [ت, ج, َ, ا, ء], we need [أ, ج, ِ, ئ] or [ت, ج, ِ, ئ]
  const stem = stripTrailingDiacritics(base)
  return stem
    .map((char, i, arr) => {
      if (char === ALIF) return null
      if (char === FATHA && i + 1 < arr.length && arr[i + 1] === ALIF) return KASRA
      if (char === HAMZA) return HAMZA_ON_YEH
      return char
    })
    .filter((char): char is string => char != null)
}

function shortenHollowStem(stem: readonly string[], shortVowel: string): readonly string[] {
  // Remove alif and change fatḥa before it to short vowel
  return stem
    .map((char, i, arr) => {
      if (char === ALIF) return null
      if (char === FATHA && i + 1 < arr.length && arr[i + 1] === ALIF) return shortVowel
      return char
    })
    .filter((char): char is string => char != null)
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
