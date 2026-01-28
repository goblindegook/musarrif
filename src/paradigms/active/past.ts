import { mapRecord } from '../../primitives/objects.ts'
import { hasPattern, resolveFormIPastVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
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
  normalizeAlifMadda,
  removeTrailingDiacritics,
  replaceFinalDiacritic,
  SEEN,
  SHADDA,
  SUKOON,
  seatHamza,
  shortVowelFromPattern,
  TEH,
  WAW,
  YEH,
} from '../letters'
import type { PronounId } from '../pronouns'
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
  defectiveGlide: string
  suffixedBase: readonly string[]
  pluralBase: readonly string[]
}

type PastBaseForms = NonDefectivePastBaseForms | DefectivePastBaseForms

function nonDefectiveSuffixedBase(forms: NonDefectivePastBaseForms): readonly string[] {
  return forms.suffixedBase ?? replaceFinalDiacritic(forms.base, SUKOON)
}

function defectiveStem(forms: DefectivePastBaseForms): readonly string[] {
  return forms.suffixedBase.slice(0, -2)
}

function buildPastConjugations(verb: Verb): Record<PronounId, readonly string[]> {
  const forms = derivePastForms(verb)
  const isDefective = 'defectiveGlide' in forms
  const stem = isDefective ? defectiveStem(forms) : null
  const suffixedBase = isDefective ? forms.suffixedBase : nonDefectiveSuffixedBase(forms)
  const pluralBase = forms.pluralBase ?? replaceFinalDiacritic(forms.base, DAMMA)

  const [, c2, c3] = [...verb.root]

  return {
    '1s': [...suffixedBase, TEH, DAMMA],
    '2ms': [...suffixedBase, TEH, FATHA],
    '2fs': [...suffixedBase, TEH, KASRA],
    '3ms': forms.base,
    '3fs': stem ? [...stem, TEH, SUKOON] : [...forms.base, TEH, SUKOON],
    '2d': [...suffixedBase, TEH, DAMMA, MEEM, FATHA, ALIF],
    '3md': stem ? [...stem, forms.suffixedBase?.at(-2) ?? '', FATHA, ALIF] : normalizeAlifMadda([...forms.base, ALIF]),
    '3fd': stem ? [...stem, TEH, FATHA, ALIF] : [...forms.base, TEH, FATHA, ALIF],
    '1p': [...suffixedBase, NOON, FATHA, ALIF],
    '2mp': [...suffixedBase, TEH, DAMMA, MEEM, SUKOON],
    '2fp': [...suffixedBase, TEH, DAMMA, NOON, SHADDA, FATHA],
    '3mp': (() => {
      if (isWeakLetter(c2) && isHamzatedLetter(c3))
        return [
          ...removeTrailingDiacritics(forms.base).map((char) => (char === HAMZA ? HAMZA_ON_WAW : char)),
          DAMMA,
          WAW,
          ALIF,
        ]
      if (isDefective) return [...forms.pluralBase, ALIF]
      if (pluralBase.at(-1) === WAW) return [...pluralBase, ALIF]
      return [...pluralBase, WAW, ALIF]
    })(),
    '3fp': (() => {
      if (isDefective) return [...forms.suffixedBase, NOON, FATHA]
      if (suffixedBase.at(-2) === NOON) return [...suffixedBase.slice(0, -2), NOON, SHADDA, FATHA]
      return [...suffixedBase, NOON, FATHA]
    })(),
  }
}

export function conjugatePast(verb: Verb): Record<PronounId, string> {
  return mapRecord(buildPastConjugations(verb), (value) => geminateDoubleLetters(value).join('').normalize('NFC'))
}

function buildForms(base: readonly string[], c3: string): PastBaseForms {
  if (!isWeakLetter(c3)) return { base }

  const normalizedBase = [...removeTrailingDiacritics(base).slice(0, -1), weakLetterTail(c3)]
  const glide = c3 === WAW || c3 === ALIF ? WAW : YEH
  const suffixedBase = [...normalizedBase.slice(0, -1), glide, SUKOON]
  const pluralBase = [...suffixedBase.slice(0, -2), glide === YEH ? WAW : glide]
  return {
    base: normalizedBase,
    defectiveGlide: glide,
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
  const seatedFinalHamza = c3 === HAMZA ? seatHamza(c3, shortVowelFromPattern(pastVowel)) : c3
  const seatedC2 = seatHamza(c2, shortVowelFromPattern(pastVowel))
  const isMiddleWeak = isWeakLetter(c2)
  const isConsonantalMiddleWeak = hasPattern(verb, 'fa3ila-yaf3alu') && (c2 === YEH || c2 === WAW)

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
  if (isMiddleWeak && !isConsonantalMiddleWeak)
    return {
      base: normalizeAlifMadda(base),
      suffixedBase: [c1, c2 === YEH ? KASRA : DAMMA, c3, SUKOON],
      pluralBase: replaceFinalDiacritic(normalizeAlifMadda(base), DAMMA),
    }

  return buildForms([c1, FATHA, seatedC2, shortVowelFromPattern(pastVowel), seatedFinalHamza, FATHA], seatedFinalHamza)
}

function derivePastFormII(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  return buildForms([c1, FATHA, c2, SHADDA, FATHA, seatHamza(c3, FATHA), FATHA], c3)
}

function derivePastFormIII(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  return buildForms([c1, FATHA, ALIF, isHamzatedLetter(c2) ? HAMZA : c2, FATHA, c3, FATHA], c3)
}

function derivePastFormIV(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const prefix = [ALIF_HAMZA, FATHA, c1]

  // Geminate Form IV (e.g., أَحَبَّ) collapses the second/third radical with shadda
  if (c2 === c3) return buildForms([...prefix, FATHA, c2, SHADDA, FATHA], c3)

  // Hollow Form IV past contracts to long ā (e.g., أَضَافَ)
  if (isWeakLetter(c2) && !isWeakLetter(c3))
    return {
      base: [...prefix, FATHA, ALIF, c3, FATHA],
      suffixedBase: [...shortenHollowStem([...prefix, FATHA, ALIF, c3]), SUKOON],
      pluralBase: [...shortenHollowStem([...prefix, FATHA, ALIF, c3]), DAMMA],
    }

  return buildForms(normalizeAlifMadda([...prefix, SUKOON, c2, FATHA, c3, FATHA]), c3)
}

function derivePastFormV(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  return buildForms([TEH, FATHA, c1, FATHA, c2, SHADDA, FATHA, c3, FATHA], c3)
}

function derivePastFormVI(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const prefix = [TEH, FATHA, c1, FATHA, ALIF]

  if (c2 === c3)
    return {
      base: [...prefix, c2, SHADDA, FATHA],
      suffixedBase: [...prefix, c2, FATHA, c3, SUKOON],
      pluralBase: [...prefix, c2, SHADDA, DAMMA],
    }

  // Hollow Form VI with final hamza (e.g., تَجَاءَ) - don't normalize, hamza is not a weak letter
  if (isWeakLetter(c2) && isHamzatedLetter(c3)) {
    return {
      base: [...prefix, c3, FATHA],
      suffixedBase: [...shortenHollowStem([...prefix, c3, FATHA]), SUKOON],
      pluralBase: [...shortenHollowStem([...prefix, c3, FATHA]), DAMMA],
    }
  }

  return buildForms([...prefix, isHamzatedLetter(c2) ? HAMZA : c2, FATHA, c3, FATHA], c3)
}

function derivePastFormVII(verb: Verb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]

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
  const prefix = [ALIF, KASRA, SEEN, SUKOON, TEH, FATHA, isHamzatedLetter(c1) ? ALIF_HAMZA : c1]

  if (c2 === c3)
    return {
      base: [...prefix, FATHA, c2, SHADDA, FATHA],
      suffixedBase: [...prefix, SUKOON, c2, FATHA, c3, SUKOON],
      pluralBase: [...prefix, FATHA, c2, SHADDA, DAMMA],
    }

  if (isWeakLetter(c2) && !isWeakLetter(c3)) return buildForms([...prefix, FATHA, ALIF, c3, FATHA], c3)

  return buildForms([...prefix, SUKOON, c2, FATHA, c3, FATHA], c3)
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

function shortenHollowStem(stem: readonly string[]): readonly string[] {
  // Remove alif and change fatḥa before it to short vowel
  return removeTrailingDiacritics(stem)
    .map((char, i, arr) => {
      if (char === ALIF) return null
      if (char === FATHA && i + 1 < arr.length && arr[i + 1] === ALIF) return KASRA
      if (char === HAMZA) return HAMZA_ON_YEH
      return char
    })
    .filter((char): char is string => char != null)
}
