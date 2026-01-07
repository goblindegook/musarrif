import { mapRecord } from '../../primitives/objects.ts'
import { resolveFormIPastVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_MADDA,
  ALIF_MAQSURA,
  DAMMA,
  FATHA,
  geminateDoubleLetters,
  HAMZA,
  HAMZA_ON_WAW,
  HAMZA_ON_YEH,
  isHamzatedLetter,
  isWeakLetter,
  KASRA,
  MEEM,
  NOON,
  removeTrailingDiacritics,
  replaceFinalDiacritic,
  SEEN,
  SHADDA,
  SUKOON,
  shortVowelFromPattern,
  TEH,
  WAW,
  YEH,
} from '../letters'
import { PRONOUN_IDS, type PronounId } from '../pronouns'
import type { Verb } from '../verbs'

function weakLetterTail(letter: string): string {
  return letter === YEH || letter === ALIF_MAQSURA
    ? ALIF_MAQSURA
    : letter === ALIF_HAMZA || letter === HAMZA_ON_YEH
      ? letter
      : ALIF
}

interface NonDefectivePastBaseForms {
  base: readonly string[]
  baseWithSukoon: readonly string[]
  baseWithDamma: readonly string[]
}

interface DefectivePastBaseForms {
  base: readonly string[]
  defectiveBase: readonly string[]
  glide: string
}

type PastBaseForms = NonDefectivePastBaseForms | DefectivePastBaseForms

const PAST_BUILDERS: Record<PronounId, (forms: PastBaseForms, verb: Verb) => readonly string[]> = {
  '1s': (forms) => {
    if ('defectiveBase' in forms) return [...forms.defectiveBase, forms.glide, SUKOON, TEH, DAMMA]
    return [...forms.baseWithSukoon, TEH, DAMMA]
  },
  '2ms': (forms) => {
    if ('defectiveBase' in forms) return [...forms.defectiveBase, forms.glide, SUKOON, TEH, FATHA]
    return [...forms.baseWithSukoon, TEH, FATHA]
  },
  '2fs': (forms) => {
    if ('defectiveBase' in forms) return [...forms.defectiveBase, forms.glide, SUKOON, TEH, KASRA]
    return [...forms.baseWithSukoon, TEH, KASRA]
  },
  '3ms': (forms) => forms.base,
  '3fs': (forms) => {
    if ('defectiveBase' in forms) return [...forms.defectiveBase, TEH, SUKOON]
    return [...forms.base, TEH, SUKOON]
  },
  '2d': (forms) => {
    if ('defectiveBase' in forms) return [...forms.defectiveBase, forms.glide, SUKOON, TEH, DAMMA, MEEM, FATHA, ALIF]
    return [...forms.baseWithSukoon, TEH, DAMMA, MEEM, FATHA, ALIF]
  },
  '3md': (forms) => {
    if ('defectiveBase' in forms) return [...forms.defectiveBase, forms.glide, FATHA, ALIF]
    return [...forms.base, ALIF]
  },
  '3fd': (forms) => {
    if ('defectiveBase' in forms) return [...forms.defectiveBase, TEH, FATHA, ALIF]
    return [...forms.base, TEH, FATHA, ALIF]
  },
  '1p': (forms) => {
    if ('defectiveBase' in forms) return [...forms.defectiveBase, forms.glide, SUKOON, NOON, FATHA, ALIF]
    return [...forms.baseWithSukoon, NOON, FATHA, ALIF]
  },
  '2mp': (forms) => {
    if ('defectiveBase' in forms) return [...forms.defectiveBase, forms.glide, SUKOON, TEH, DAMMA, MEEM, SUKOON]
    return [...forms.baseWithSukoon, TEH, DAMMA, MEEM, SUKOON]
  },
  '2fp': (forms) => {
    if ('defectiveBase' in forms) return [...forms.defectiveBase, forms.glide, SUKOON, TEH, DAMMA, NOON, SHADDA, FATHA]
    return [...forms.baseWithSukoon, TEH, DAMMA, NOON, SHADDA, FATHA]
  },
  '3mp': (forms, verb) => {
    const [, c2, c3] = [...verb.root]

    // For hollow verbs with final hamza, hamza before و should be seated on waw: جَاؤُوا
    if (isWeakLetter(c2) && isHamzatedLetter(c3))
      return [
        ...removeTrailingDiacritics(forms.base).map((char) => (char === HAMZA ? HAMZA_ON_WAW : char)),
        DAMMA,
        WAW,
        ALIF,
      ]

    if ('defectiveBase' in forms) return [...forms.defectiveBase, forms.glide === YEH ? WAW : forms.glide, SUKOON, ALIF]
    return [...forms.baseWithDamma, WAW, ALIF]
  },
  '3fp': (forms) => {
    if ('defectiveBase' in forms) return [...forms.defectiveBase, forms.glide, SUKOON, NOON, FATHA]

    // If baseWithSukoon ends with NOON, geminate with shadda when adding NOON suffix
    if (forms.baseWithSukoon.at(-2) === NOON) return [...forms.baseWithSukoon.slice(0, -2), NOON, SHADDA, FATHA]

    return [...forms.baseWithSukoon, NOON, FATHA]
  },
}

export function conjugatePast(verb: Verb): Record<PronounId, string> {
  const forms = derivePastForms(verb)

  return mapRecord(
    PRONOUN_IDS.reduce(
      (acc, pronounId) => {
        acc[pronounId] = PAST_BUILDERS[pronounId](forms, verb)
        return acc
      },
      {} as Record<PronounId, readonly string[]>,
    ),
    (past) => geminateDoubleLetters(past).join('').normalize('NFC'),
  )
}

function buildDefectiveForms(base: readonly string[], c3: string): DefectivePastBaseForms {
  const normalizedBase = [...removeTrailingDiacritics(base).slice(0, -1), weakLetterTail(c3)]
  return {
    base: normalizedBase,
    defectiveBase: normalizedBase.slice(0, -1),
    glide: c3 === WAW || c3 === ALIF ? WAW : YEH,
  }
}

function buildNonDefectiveForms(base: readonly string[]): NonDefectivePastBaseForms {
  return {
    base,
    baseWithSukoon: replaceFinalDiacritic(base, SUKOON),
    baseWithDamma: replaceFinalDiacritic(base, DAMMA),
  }
}

function deriveQuadriliteralPastForms(verb: Verb): NonDefectivePastBaseForms {
  const [c1, c2, c3, c4] = [...verb.root]
  return buildNonDefectiveForms([c1, FATHA, c2, SUKOON, c3, FATHA, c4, FATHA])
}

function derivePastFormI(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const pastVowel = resolveFormIPastVowel(verb)

  // Final-weak Form I: long vowel in the base, no ending fatḥa
  // For past vowel 'i', keep YEH (ي) instead of normalizing to ALIF_MAQSURA (ى)
  if (isWeakLetter(c3) && pastVowel === 'i')
    return {
      base: c3 === ALIF_MAQSURA || c3 === ALIF ? [c1, FATHA, c2, KASRA, YEH] : [c1, FATHA, c2, KASRA, YEH, FATHA],
      defectiveBase: [c1, FATHA, c2, KASRA],
      glide: c3 === WAW || c3 === ALIF ? WAW : YEH,
    }

  // Final-weak Form I: long vowel in the base, no ending fatḥa
  if (isWeakLetter(c3))
    return buildDefectiveForms([c1, FATHA, c2, shortVowelFromPattern(pastVowel), weakLetterTail(c3)], c3)

  // Geminate Form I: if c2 === c3, collapse with shadda (e.g., حَبَّ)
  if (c2 === c3) return buildNonDefectiveForms([c1, FATHA, c2, SHADDA, FATHA])

  const base = [c1, FATHA, ALIF, c3, FATHA]

  // Hollow Form I past contracts to a long /ā/ in the base (e.g., قامَ)
  // Hollow Form I with final hamza (e.g., جيء → جَاءَ)
  if (isWeakLetter(c2) && isHamzatedLetter(c3))
    return {
      base,
      baseWithSukoon: [c1, c2 === YEH ? KASRA : DAMMA, HAMZA_ON_YEH, SUKOON],
      baseWithDamma: [c1, c2 === YEH ? KASRA : DAMMA, HAMZA_ON_YEH, DAMMA],
    }

  // Form I hollow verbs shorten to [c1, shortVowel, c3] in suffixed forms (e.g., قُلْ)
  // baseWithDamma keeps the alif for 3mp (قَالُوا)
  if (isWeakLetter(c2))
    return {
      base,
      baseWithSukoon: [c1, c2 === YEH ? KASRA : DAMMA, c3, SUKOON],
      baseWithDamma: replaceFinalDiacritic(base, DAMMA),
    }

  return buildNonDefectiveForms([c1, FATHA, c2, shortVowelFromPattern(pastVowel), c3, FATHA])
}

function derivePastFormII(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]

  // Geminate Form II: c2 === c3, fatḥa then shadda on c2, then c3 (e.g., حَبَّبَ)
  if (c2 === c3) return buildNonDefectiveForms([c1, FATHA, c2, FATHA, SHADDA, c3, FATHA])

  if (isWeakLetter(c3)) return buildDefectiveForms([c1, FATHA, c2, SHADDA, FATHA, c3, FATHA], c3)

  // Hollow Form II keeps the shadda pattern in suffixed forms (e.g., قَوَّلْ)
  return buildNonDefectiveForms([c1, FATHA, c2, SHADDA, FATHA, c3, FATHA])
}

function derivePastFormIII(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const seatedC2 = isHamzatedLetter(c2) ? HAMZA : c2
  if (isWeakLetter(c3)) return buildDefectiveForms([c1, FATHA, ALIF, seatedC2, FATHA, c3, FATHA], c3)

  // Hollow Form III keeps the alif in suffixed forms (e.g., قَاوَلْ)
  return buildNonDefectiveForms([c1, FATHA, ALIF, seatedC2, FATHA, c3, FATHA])
}

function derivePastFormIV(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]

  // Geminate Form IV (e.g., أَحَبَّ) collapses the second/third radical with shadda
  if (c2 === c3) return buildNonDefectiveForms([ALIF_HAMZA, FATHA, c1, FATHA, c2, SHADDA, FATHA])

  // Initial hamza + middle weak + final weak (e.g., أوي → آوَى)
  if (c1 === ALIF_HAMZA && isWeakLetter(c2) && isWeakLetter(c3)) {
    return buildDefectiveForms([ALIF_MADDA, c2, FATHA, c3], c3)
  }

  const prefix = c1 === ALIF_HAMZA ? [ALIF_MADDA] : [ALIF_HAMZA, FATHA, c1, SUKOON]

  if (isWeakLetter(c3)) {
    return buildDefectiveForms([...prefix, c2, FATHA, c3], c3)
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
    const stem = [ALIF_HAMZA, FATHA, c1, FATHA, ALIF, c3]
    return {
      base: [ALIF_HAMZA, FATHA, c1, FATHA, ALIF, c3, FATHA],
      baseWithSukoon: [...shortenHollowStem(stem, c2 === YEH ? KASRA : DAMMA), SUKOON],
      baseWithDamma: [...stem, DAMMA],
    }
  }

  return buildNonDefectiveForms([...prefix, c2, FATHA, c3, FATHA])
}

function derivePastFormV(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  if (isWeakLetter(c3)) return buildDefectiveForms([TEH, FATHA, c1, FATHA, c2, SHADDA, FATHA, c3, FATHA], c3)

  return buildNonDefectiveForms([TEH, FATHA, c1, FATHA, c2, SHADDA, FATHA, c3, FATHA])
}

function derivePastFormVI(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]

  // Hollow Form VI with final hamza (e.g., تَجَاءَ) - don't normalize, hamza is not a weak letter
  if (isWeakLetter(c2) && isHamzatedLetter(c3)) {
    const base = [TEH, FATHA, c1, FATHA, ALIF, c3, FATHA]
    return {
      base,
      baseWithSukoon: [...transformHollowWithFinalHamza(base), SUKOON],
      baseWithDamma: [...transformHollowWithFinalHamza(base), DAMMA],
    }
  }

  if (isWeakLetter(c3)) {
    return buildDefectiveForms([TEH, FATHA, c1, FATHA, ALIF, c2, FATHA, c3, FATHA], c3)
  }
  return buildNonDefectiveForms([TEH, FATHA, c1, FATHA, ALIF, c2, FATHA, c3, FATHA])
}

function derivePastFormVII(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  // Hollow Form VII (e.g., اِنْقَادَ) lengthens the glide to ألف
  const base = isWeakLetter(c2)
    ? [ALIF, KASRA, NOON, SUKOON, c1, FATHA, ALIF, c3, FATHA]
    : [ALIF, KASRA, NOON, SUKOON, c1, FATHA, c2, FATHA, c3, FATHA]
  if (isWeakLetter(c3)) {
    return buildDefectiveForms(base, c3)
  }
  return buildNonDefectiveForms(base)
}

function derivePastFormVIII(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]

  if (c1 === WAW || c1 === ALIF_HAMZA) {
    return buildNonDefectiveForms([ALIF, KASRA, TEH, SHADDA, FATHA, c2, FATHA, c3, FATHA])
  }

  if (isWeakLetter(c2)) {
    if (isWeakLetter(c3)) {
      return buildDefectiveForms([ALIF, KASRA, c1, SUKOON, TEH, FATHA, ALIF, c3, FATHA], c3)
    }
    return buildNonDefectiveForms([ALIF, KASRA, c1, SUKOON, TEH, FATHA, ALIF, c3, FATHA])
  }

  if (isWeakLetter(c3)) {
    return buildDefectiveForms([ALIF, KASRA, c1, SUKOON, TEH, FATHA, c2, FATHA, c3, FATHA], c3)
  }
  return buildNonDefectiveForms([ALIF, KASRA, c1, SUKOON, TEH, FATHA, c2, FATHA, c3, FATHA])
}

function derivePastFormIX(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  if (isWeakLetter(c3)) {
    return buildDefectiveForms([ALIF, KASRA, c1, SUKOON, c2, FATHA, c3, SHADDA, FATHA], c3)
  }
  return buildNonDefectiveForms([ALIF, KASRA, c1, SUKOON, c2, FATHA, c3, SHADDA, FATHA])
}

function derivePastFormX(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  if (c2 === c3) {
    const base = [ALIF, KASRA, SEEN, SUKOON, TEH, FATHA, c1, FATHA, c2, SHADDA, FATHA]
    return {
      base,
      baseWithSukoon: [ALIF, KASRA, SEEN, SUKOON, TEH, FATHA, c1, SUKOON, c2, FATHA, c3, SUKOON],
      baseWithDamma: replaceFinalDiacritic(base, DAMMA),
    }
  }
  // Initial hamza + middle weak + final weak (e.g., أوي → اِسْتَأْوَى)
  const base =
    c1 === ALIF_HAMZA && isWeakLetter(c2) && isWeakLetter(c3)
      ? [ALIF, KASRA, SEEN, SUKOON, TEH, FATHA, ALIF_HAMZA, SUKOON, c2, FATHA, c3, FATHA]
      : isWeakLetter(c2)
        ? [ALIF, KASRA, SEEN, SUKOON, TEH, FATHA, c1, FATHA, ALIF, c3, FATHA]
        : [ALIF, KASRA, SEEN, SUKOON, TEH, FATHA, c1, SUKOON, c2, FATHA, c3, FATHA]
  if (isWeakLetter(c3)) {
    return buildDefectiveForms(base, c3)
  }
  return buildNonDefectiveForms(base)
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

function transformHollowWithFinalHamza(base: readonly string[]): readonly string[] {
  // Remove alif, change fatḥa before it to kasra, replace hamza with hamza on yeh
  // Base is [أ, ج, َ, ا, ء] or [ت, ج, َ, ا, ء], we need [أ, ج, ِ, ئ] or [ت, ج, ِ, ئ]
  return removeTrailingDiacritics(base)
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
