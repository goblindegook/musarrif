import { mapRecord } from '../../primitives/objects.ts'
import { hasPattern, resolveFormIPastVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_MADDA,
  ALIF_MAQSURA,
  DAMMA,
  FATHA,
  findLastLetterIndex,
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
  suffixedBase?: readonly string[]
  pluralBase?: readonly string[]
}

interface DefectivePastBaseForms {
  base: readonly string[]
  glide: string
  suffixedBase: readonly string[]
  pluralBase: readonly string[]
}

type PastBaseForms = NonDefectivePastBaseForms | DefectivePastBaseForms

function nonDefectiveSuffixedBase(forms: NonDefectivePastBaseForms): readonly string[] {
  return forms.suffixedBase ?? replaceFinalDiacritic(forms.base, SUKOON)
}

function defectiveStem(forms: DefectivePastBaseForms): readonly string[] {
  if (forms.suffixedBase.at(-1) === SUKOON) return forms.suffixedBase.slice(0, -2)
  return forms.suffixedBase.slice(0, -1)
}

function shouldCollapseHamzaDual(base: readonly string[]): boolean {
  const hamzaIndex = base.findLastIndex((char) => isHamzatedLetter(char))
  if (hamzaIndex < 0) return false
  const previousLetterIndex = findLastLetterIndex(base, hamzaIndex)
  return base.at(previousLetterIndex) !== ALIF
}

const PAST_BUILDERS: Record<PronounId, (forms: PastBaseForms, verb: Verb) => readonly string[]> = {
  '1s': (forms) => {
    if ('glide' in forms) return [...forms.suffixedBase, TEH, DAMMA]
    return [...nonDefectiveSuffixedBase(forms), TEH, DAMMA]
  },
  '2ms': (forms) => {
    if ('glide' in forms) return [...forms.suffixedBase, TEH, FATHA]
    return [...nonDefectiveSuffixedBase(forms), TEH, FATHA]
  },
  '2fs': (forms) => {
    if ('glide' in forms) return [...forms.suffixedBase, TEH, KASRA]
    return [...nonDefectiveSuffixedBase(forms), TEH, KASRA]
  },
  '3ms': (forms) => forms.base,
  '3fs': (forms) => {
    if ('glide' in forms) {
      if (forms.suffixedBase.at(-1) === SUKOON) return [...defectiveStem(forms), TEH, SUKOON]
      return [...forms.suffixedBase, FATHA, TEH, SUKOON]
    }
    return [...forms.base, TEH, SUKOON]
  },
  '2d': (forms) => {
    if ('glide' in forms) return [...forms.suffixedBase, TEH, DAMMA, MEEM, FATHA, ALIF]
    return [...nonDefectiveSuffixedBase(forms), TEH, DAMMA, MEEM, FATHA, ALIF]
  },
  '3md': (forms, verb) => {
    if ('glide' in forms) {
      const glide = forms.suffixedBase.at(-1) === SUKOON ? forms.suffixedBase.at(-2) : forms.suffixedBase.at(-1)
      return [...defectiveStem(forms), glide ?? '', FATHA, ALIF]
    }
    const lastRoot = verb.root.at(-1)
    if (isHamzatedLetter(lastRoot) && shouldCollapseHamzaDual(forms.base))
      return [...forms.base.slice(0, -2), ALIF_MADDA]
    return [...forms.base, ALIF]
  },
  '3fd': (forms) => {
    if ('glide' in forms) {
      if (forms.suffixedBase.at(-1) === SUKOON) return [...defectiveStem(forms), TEH, FATHA, ALIF]
      return [...forms.suffixedBase, FATHA, TEH, FATHA, ALIF]
    }
    return [...forms.base, TEH, FATHA, ALIF]
  },
  '1p': (forms) => {
    if ('glide' in forms) return [...forms.suffixedBase, NOON, FATHA, ALIF]
    return [...nonDefectiveSuffixedBase(forms), NOON, FATHA, ALIF]
  },
  '2mp': (forms, verb) => {
    const [, c2] = [...verb.root]
    const dropFinalSukoon = verb.form === 10 && isHamzatedLetter(c2)
    if ('glide' in forms && dropFinalSukoon) return [...forms.suffixedBase, TEH, DAMMA, MEEM]
    if ('glide' in forms) return [...forms.suffixedBase, TEH, DAMMA, MEEM, SUKOON]
    if (dropFinalSukoon) return [...nonDefectiveSuffixedBase(forms), TEH, DAMMA, MEEM]
    return [...nonDefectiveSuffixedBase(forms), TEH, DAMMA, MEEM, SUKOON]
  },
  '2fp': (forms) => {
    if ('glide' in forms) return [...forms.suffixedBase, TEH, DAMMA, NOON, SHADDA, FATHA]
    return [...nonDefectiveSuffixedBase(forms), TEH, DAMMA, NOON, SHADDA, FATHA]
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

    if ('glide' in forms) return [...forms.pluralBase, ALIF]

    const pluralBase = forms.pluralBase ?? replaceFinalDiacritic(forms.base, DAMMA)
    if (pluralBase.at(-1) === WAW) return [...pluralBase, ALIF]
    return [...pluralBase, WAW, ALIF]
  },
  '3fp': (forms) => {
    if ('glide' in forms) return [...forms.suffixedBase, NOON, FATHA]

    // If the suffixed base ends with NOON, geminate with shadda when adding NOON suffix
    const suffixedBase = nonDefectiveSuffixedBase(forms)
    if (suffixedBase.at(-2) === NOON) return [...suffixedBase.slice(0, -2), NOON, SHADDA, FATHA]

    return [...suffixedBase, NOON, FATHA]
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

function buildForms(base: readonly string[], c3: string): PastBaseForms {
  if (!isWeakLetter(c3)) return { base }

  const normalizedBase = [...removeTrailingDiacritics(base).slice(0, -1), weakLetterTail(c3)]
  const glide = c3 === WAW || c3 === ALIF ? WAW : YEH
  const suffixedBase = [...normalizedBase.slice(0, -1), glide, SUKOON]
  const pluralBase = [...suffixedBase.slice(0, -2), glide === YEH ? WAW : glide, SUKOON]
  return {
    base: normalizedBase,
    glide,
    suffixedBase,
    pluralBase,
  }
}

function deriveQuadriliteralPastForms(verb: Verb): PastBaseForms {
  const [c1, c2, c3, c4] = [...verb.root]
  return buildForms([c1, FATHA, c2, SUKOON, c3, FATHA, c4, FATHA], c4)
}

function derivePastFormI(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const pastVowel = resolveFormIPastVowel(verb)
  const isMiddleWeak = isWeakLetter(c2)
  const isConsonantalMiddleYeh = hasPattern(verb, 'fa3ila-yaf3alu') && c2 === YEH

  // Final-weak Form I: long vowel in the base, no ending fatḥa
  // For past vowel 'i', keep YEH (ي) instead of normalizing to ALIF_MAQSURA (ى)
  if (isWeakLetter(c3) && pastVowel === 'i') {
    return {
      base: c3 === ALIF_MAQSURA || c3 === ALIF ? [c1, FATHA, c2, KASRA, YEH] : [c1, FATHA, c2, KASRA, YEH, FATHA],
      suffixedBase: [c1, FATHA, c2, KASRA, YEH],
      pluralBase: [c1, FATHA, c2, DAMMA, WAW],
    }
  }

  // Final-weak Form I: long vowel in the base, no ending fatḥa
  if (isWeakLetter(c3)) return buildForms([c1, FATHA, c2, shortVowelFromPattern(pastVowel), weakLetterTail(c3)], c3)

  // Geminate Form I: collapse 3ms, expand in suffixed forms (e.g., حَبَّ / حَبَبْتُ)
  if (c2 === c3)
    return {
      base: [c1, FATHA, c2, SHADDA, FATHA],
      suffixedBase: [c1, FATHA, c2, shortVowelFromPattern(pastVowel), c3, SUKOON],
    }

  const base = [c1, FATHA, ALIF, c3, FATHA]

  // Hollow Form I past contracts to a long /ā/ in the base (e.g., قامَ)
  // Hollow Form I with final hamza (e.g., جيء → جَاءَ)
  if (isMiddleWeak && isHamzatedLetter(c3))
    return {
      base,
      suffixedBase: [c1, c2 === YEH ? KASRA : DAMMA, HAMZA_ON_YEH, SUKOON],
      pluralBase: [c1, c2 === YEH ? KASRA : DAMMA, HAMZA_ON_YEH, DAMMA],
    }

  // Form I hollow verbs shorten to [c1, shortVowel, c3] in suffixed forms (e.g., قُلْ)
  // pluralBase keeps the alif for 3mp (قَالُوا)
  if (isMiddleWeak && !isConsonantalMiddleYeh)
    return {
      base,
      suffixedBase: [c1, c2 === YEH ? KASRA : DAMMA, c3, SUKOON],
      pluralBase: replaceFinalDiacritic(base, DAMMA),
    }

  return buildForms([c1, FATHA, c2, shortVowelFromPattern(pastVowel), c3, FATHA], c3)
}

function derivePastFormII(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  return buildForms([c1, FATHA, c2, SHADDA, FATHA, c3, FATHA], c3)
}

function derivePastFormIII(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  return buildForms([c1, FATHA, ALIF, isHamzatedLetter(c2) ? HAMZA : c2, FATHA, c3, FATHA], c3)
}

function derivePastFormIV(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]

  // Geminate Form IV (e.g., أَحَبَّ) collapses the second/third radical with shadda
  if (c2 === c3) return buildForms([ALIF_HAMZA, FATHA, c1, FATHA, c2, SHADDA, FATHA], c3)

  // Initial hamza + middle weak + final weak (e.g., أوي → آوَى)
  if (c1 === ALIF_HAMZA && isWeakLetter(c2) && isWeakLetter(c3)) return buildForms([ALIF_MADDA, c2, FATHA, c3], c3)

  // Hollow Form IV past contracts to long ā (e.g., أَضَافَ)
  // Hollow Form IV with final hamza (e.g., أَجَاءَ) - don't normalize, hamza is not a weak letter
  if (isWeakLetter(c2) && isHamzatedLetter(c3)) {
    const base = [ALIF_HAMZA, FATHA, c1, FATHA, ALIF, c3, FATHA]
    return {
      base,
      suffixedBase: [...transformHollowWithFinalHamza(base), SUKOON],
      pluralBase: [...transformHollowWithFinalHamza(base), DAMMA],
    }
  }

  if (isWeakLetter(c2) && !isWeakLetter(c3)) {
    const stem = [ALIF_HAMZA, FATHA, c1, FATHA, ALIF, c3]
    return {
      base: [...stem, FATHA],
      suffixedBase: [...shortenHollowStem(stem, c2 === YEH ? KASRA : DAMMA), SUKOON],
      pluralBase: [...stem, DAMMA],
    }
  }

  const prefix = c1 === ALIF_HAMZA ? [ALIF_MADDA] : [ALIF_HAMZA, FATHA, c1, SUKOON]
  return buildForms([...prefix, c2, FATHA, c3, FATHA], c3)
}

function derivePastFormV(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  return buildForms([TEH, FATHA, c1, FATHA, c2, SHADDA, FATHA, c3, FATHA], c3)
}

function derivePastFormVI(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]

  if (c2 === c3)
    return {
      base: [TEH, FATHA, c1, FATHA, ALIF, c2, SHADDA, FATHA],
      suffixedBase: [TEH, FATHA, c1, FATHA, ALIF, c2, FATHA, c3, SUKOON],
      pluralBase: [TEH, FATHA, c1, FATHA, ALIF, c2, SHADDA, DAMMA],
    }

  // Hollow Form VI with final hamza (e.g., تَجَاءَ) - don't normalize, hamza is not a weak letter
  if (isWeakLetter(c2) && isHamzatedLetter(c3)) {
    const base = [TEH, FATHA, c1, FATHA, ALIF, c3, FATHA]
    return {
      base,
      suffixedBase: [...transformHollowWithFinalHamza(base), SUKOON],
      pluralBase: [...transformHollowWithFinalHamza(base), DAMMA],
    }
  }

  return buildForms([TEH, FATHA, c1, FATHA, ALIF, isHamzatedLetter(c2) ? HAMZA : c2, FATHA, c3, FATHA], c3)
}

function derivePastFormVII(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]

  // Hollow Form VII (e.g., اِنْقَادَ) lengthens the glide to ألف
  if (isWeakLetter(c2)) return buildForms([ALIF, KASRA, NOON, SUKOON, c1, FATHA, ALIF, c3, FATHA], c3)

  return buildForms([ALIF, KASRA, NOON, SUKOON, c1, FATHA, c2, FATHA, c3, FATHA], c3)
}

function derivePastFormVIII(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]

  if (c1 === WAW || c1 === ALIF_HAMZA) return buildForms([ALIF, KASRA, TEH, SHADDA, FATHA, c2, FATHA, c3, FATHA], c3)

  if (isWeakLetter(c2)) return buildForms([ALIF, KASRA, c1, SUKOON, TEH, FATHA, ALIF, c3, FATHA], c3)

  return buildForms([ALIF, KASRA, c1, SUKOON, TEH, FATHA, c2, FATHA, c3, FATHA], c3)
}

function derivePastFormIX(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  return buildForms([ALIF, KASRA, c1, SUKOON, c2, FATHA, c3, SHADDA, FATHA], c3)
}

function derivePastFormX(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  if (c2 === c3)
    return {
      base: [ALIF, KASRA, SEEN, SUKOON, TEH, FATHA, c1, FATHA, c2, SHADDA, FATHA],
      suffixedBase: [ALIF, KASRA, SEEN, SUKOON, TEH, FATHA, c1, SUKOON, c2, FATHA, c3, SUKOON],
      pluralBase: [ALIF, KASRA, SEEN, SUKOON, TEH, FATHA, c1, FATHA, c2, SHADDA, DAMMA],
    }

  if (isWeakLetter(c2) && !isWeakLetter(c3))
    return buildForms([ALIF, KASRA, SEEN, SUKOON, TEH, FATHA, c1, FATHA, ALIF, c3, FATHA], c3)

  return buildForms(
    [ALIF, KASRA, SEEN, SUKOON, TEH, FATHA, isHamzatedLetter(c1) ? ALIF_HAMZA : c1, SUKOON, c2, FATHA, c3, FATHA],
    c3,
  )
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
