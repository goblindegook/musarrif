import { mapRecord } from '../../primitives/objects.ts'
import { isFormIPastVowel, resolveFormIPastVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_MAQSURA,
  DAL,
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
  removeFinalDiacritic,
  resolveFormVIIIInfixConsonant,
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

export function conjugatePast(verb: Verb): Record<PronounId, string> {
  const forms = derivePastForms(verb)
  const isDefective = 'defectiveGlide' in forms
  const stem = isDefective ? forms.suffixedBase.slice(0, -2) : null
  const suffixedBase = forms.suffixedBase ?? [...removeFinalDiacritic(forms.base), SUKOON]
  const firstSuffixChar = suffixedBase.at(-2)
  const pluralBase = forms.pluralBase ?? [...removeFinalDiacritic(forms.base), DAMMA, WAW]

  const [, c2, c3] = [...verb.root]

  return mapRecord(
    {
      '1s': [...suffixedBase, TEH, DAMMA],
      '2ms': [...suffixedBase, TEH, FATHA],
      '2fs': [...suffixedBase, TEH, KASRA],
      '3ms': forms.base,
      '3fs': [...(stem ?? forms.base), TEH, SUKOON],
      '2d': [...suffixedBase, TEH, DAMMA, MEEM, FATHA, ALIF],
      '3md':
        verb.form === 4 && c2 === c3
          ? forms.base
          : stem && firstSuffixChar
            ? [...stem, firstSuffixChar, firstSuffixChar === WAW ? SUKOON : FATHA, ALIF]
            : [...forms.base, ALIF],
      '3fd': [...(stem ?? forms.base), TEH, FATHA, ALIF],
      '1p': [...suffixedBase, NOON, FATHA, ALIF],
      '2mp': [...suffixedBase, TEH, DAMMA, MEEM, SUKOON],
      '2fp': [...suffixedBase, TEH, DAMMA, NOON, SHADDA, FATHA],
      '3mp':
        isWeakLetter(c2) && isHamzatedLetter(c3)
          ? [...forms.base.slice(0, -2), HAMZA_ON_WAW, DAMMA, WAW, SUKOON, ALIF]
          : [...pluralBase, SUKOON, ALIF],
      '3fp': [...suffixedBase, NOON, FATHA],
    },
    (value) => normalizeAlifMadda(geminateDoubleLetters(value)).join('').normalize('NFC'),
  )
}

function buildForms(base: readonly string[], c3: string): PastBaseForms {
  if (!isWeakLetter(c3)) return { base }
  const normalizedBase = removeFinalDiacritic(base).slice(0, -1)
  const defectiveGlide = c3 === ALIF ? WAW : YEH
  return {
    base: [...normalizedBase, c3 === YEH ? ALIF_MAQSURA : ALIF],
    defectiveGlide,
    suffixedBase: [...normalizedBase, defectiveGlide, SUKOON],
    pluralBase: [...normalizedBase, WAW],
  }
}

function deriveQuadriliteralPastForms(verb: Verb): PastBaseForms {
  const [c1, c2, c3, c4] = [...verb.root]
  return buildForms([c1, FATHA, c2, SUKOON, c3, FATHA, c4, FATHA], c4)
}

function derivePastFormI(verb: Verb<1>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const isMiddleWeak = isWeakLetter(c2)
  const pastVowel = resolveFormIPastVowel(verb)
  const seatedC2 = seatHamza(c2, shortVowelFromPattern(pastVowel))
  const seatedC3 = seatHamza(c3, shortVowelFromPattern(pastVowel))

  if (isWeakLetter(c3) && isFormIPastVowel(verb, 'i')) {
    return {
      base: [c1, FATHA, seatedC2, KASRA, YEH, FATHA],
      suffixedBase: [c1, FATHA, seatedC2, KASRA, YEH],
      pluralBase: [c1, FATHA, seatedC2, DAMMA, WAW],
    }
  }

  if (isWeakLetter(c3)) return buildForms([c1, FATHA, seatedC2, shortVowelFromPattern(pastVowel), c3], c3)

  if (c2 === c3)
    return {
      base: [c1, FATHA, c2, SHADDA, FATHA],
      suffixedBase: [c1, FATHA, c2, shortVowelFromPattern(pastVowel), c3, SUKOON],
    }

  if (isMiddleWeak && isHamzatedLetter(c3))
    return {
      base: [c1, FATHA, ALIF, c3, FATHA],
      suffixedBase: [c1, KASRA, HAMZA_ON_YEH, SUKOON],
    }

  if (isMiddleWeak && !isFormIPastVowel(verb, 'i'))
    return {
      base: [c1, FATHA, ALIF, c3, FATHA],
      suffixedBase: [c1, c2 === YEH ? KASRA : DAMMA, c3, SUKOON],
      pluralBase: [c1, FATHA, ALIF, c3, DAMMA, WAW],
    }

  return buildForms([c1, FATHA, seatedC2, shortVowelFromPattern(pastVowel), seatedC3, FATHA], seatedC3)
}

function derivePastFormII(verb: Verb<2>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const prefix = [c1, FATHA, c2, SHADDA, FATHA]

  if (c2 === YEH && c3 === YEH) {
    return {
      base: [...prefix, ALIF],
      defectiveGlide: YEH,
      suffixedBase: [...prefix, YEH, SUKOON],
      pluralBase: [...prefix, WAW],
    }
  }
  return buildForms([...prefix, seatHamza(c3, FATHA), FATHA], c3)
}

function derivePastFormIII(verb: Verb<3>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const seatedC2 = isHamzatedLetter(c2) ? HAMZA : c2
  const prefix = [c1, FATHA, ALIF, seatedC2]

  if (c2 === c3)
    return {
      base: [...prefix, SHADDA, FATHA],
      suffixedBase: [...prefix, FATHA, c3, SUKOON],
      pluralBase: [...prefix, SHADDA, DAMMA, WAW],
    }

  return buildForms([...prefix, FATHA, c3, FATHA], c3)
}

function derivePastFormIV(verb: Verb<4>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const seatedC3 = seatHamza(c3, KASRA)
  const prefix = [ALIF_HAMZA, FATHA, c1]

  if (c2 === YEH && c3 === YEH)
    return {
      base: [...prefix, SUKOON, c2, FATHA, ALIF],
      defectiveGlide: YEH,
      suffixedBase: [...prefix, SUKOON, c2, FATHA, YEH, SUKOON],
      pluralBase: [...prefix, SUKOON, c2, FATHA, WAW],
    }

  if (c2 === c3) return buildForms([...prefix, FATHA, c2, SHADDA, FATHA], c3)

  if (isHamzatedLetter(c2) && isWeakLetter(c3)) return buildForms([...prefix, FATHA, c3, FATHA], c3)

  if (isWeakLetter(c3)) return buildForms([...prefix, SUKOON, c2, FATHA, c3, FATHA], c3)

  if (isWeakLetter(c2))
    return {
      base: [...prefix, FATHA, ALIF, c3, FATHA],
      suffixedBase: [...prefix, KASRA, seatedC3, SUKOON],
    }

  return buildForms([...prefix, SUKOON, c2, FATHA, c3, FATHA], c3)
}

function derivePastFormV(verb: Verb<5>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  return buildForms([TEH, FATHA, c1, FATHA, seatHamza(c2, FATHA), SHADDA, FATHA, seatHamza(c3, FATHA), FATHA], c3)
}

function derivePastFormVI(verb: Verb<6>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const seatedC2 = isHamzatedLetter(c2) ? HAMZA : c2
  const seatedC3 = seatHamza(c3, FATHA)
  const prefix = [TEH, FATHA, c1]

  if (c2 === c3)
    return {
      base: [...prefix, FATHA, ALIF, c2, SHADDA, FATHA],
      suffixedBase: [...prefix, FATHA, ALIF, c2, FATHA, c3, SUKOON],
    }

  if (isWeakLetter(c2) && isHamzatedLetter(c3))
    return {
      base: [...prefix, FATHA, ALIF, c3, FATHA],
      suffixedBase: [...prefix, KASRA, seatHamza(c3, KASRA), SUKOON],
    }

  if (isWeakLetter(c3)) {
    const normalizedBase = removeFinalDiacritic([...prefix, FATHA, ALIF, seatedC2, FATHA, c3, FATHA]).slice(0, -1)
    return {
      base: [...normalizedBase, ALIF_MAQSURA],
      defectiveGlide: YEH,
      suffixedBase: [...normalizedBase, YEH, SUKOON],
      pluralBase: [...normalizedBase, WAW],
    }
  }

  return buildForms([...prefix, FATHA, ALIF, seatedC2, FATHA, seatedC3, FATHA], seatedC3)
}

function derivePastFormVII(verb: Verb<7>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]

  if (c2 === c3) {
    return {
      base: [ALIF, KASRA, NOON, SUKOON, c1, FATHA, c2, SHADDA, FATHA],
      suffixedBase: [ALIF, KASRA, NOON, SUKOON, c1, FATHA, c2, FATHA, c3, SUKOON],
      pluralBase: [ALIF, KASRA, NOON, SUKOON, c1, FATHA, c2, SHADDA, DAMMA, WAW],
    }
  }

  if (isWeakLetter(c2) && isWeakLetter(c3))
    return {
      base: [ALIF, KASRA, NOON, SUKOON, c1, FATHA, c2, FATHA, ALIF_MAQSURA],
      defectiveGlide: YEH,
      suffixedBase: [ALIF, KASRA, NOON, SUKOON, c1, FATHA, c2, FATHA, YEH, SUKOON],
      pluralBase: [ALIF, KASRA, NOON, SUKOON, c1, FATHA, c2],
    }

  if (isWeakLetter(c2)) return buildForms([ALIF, KASRA, NOON, SUKOON, c1, FATHA, ALIF, c3, FATHA], c3)

  return buildForms([ALIF, KASRA, NOON, SUKOON, c1, FATHA, c2, FATHA, c3, FATHA], c3)
}

function derivePastFormVIII(verb: Verb<8>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const infix = resolveFormVIIIInfixConsonant(c1)
  const seatedC1 = isHamzatedLetter(c1) ? HAMZA_ON_YEH : c1
  const seatedC2 = seatHamza(c2, FATHA)

  if (c2 === c3)
    return {
      base: [ALIF, KASRA, seatedC1, SUKOON, infix, FATHA, c2, SHADDA, FATHA],
      suffixedBase: [ALIF, KASRA, seatedC1, SUKOON, infix, FATHA, c2, FATHA, c3, SUKOON],
      pluralBase: [ALIF, KASRA, seatedC1, SUKOON, infix, FATHA, c2, SHADDA, DAMMA, WAW],
    }

  if (c1 === WAW || c1 === ALIF_HAMZA) return buildForms([ALIF, KASRA, infix, SHADDA, FATHA, c2, FATHA, c3, FATHA], c3)

  if (isWeakLetter(c2) && isWeakLetter(c3))
    return buildForms([ALIF, KASRA, c1, SUKOON, infix, FATHA, c2, FATHA, YEH], YEH)

  if (c2 === YEH)
    return {
      base: [ALIF, KASRA, c1, SUKOON, infix, FATHA, ALIF, c3, FATHA],
      suffixedBase: [ALIF, KASRA, c1, SUKOON, infix, FATHA, c3, SUKOON],
      pluralBase: [ALIF, KASRA, c1, SUKOON, infix, FATHA, ALIF, c3, DAMMA, WAW],
    }

  if (isWeakLetter(c2) && infix !== DAL) return buildForms([ALIF, KASRA, c1, SUKOON, infix, FATHA, ALIF, c3, FATHA], c3)

  if (isWeakLetter(c3)) return buildForms([ALIF, KASRA, c1, SUKOON, infix, FATHA, seatedC2, FATHA, YEH], YEH)

  return buildForms([ALIF, KASRA, c1, SUKOON, infix, FATHA, seatedC2, FATHA, c3, FATHA], c3)
}

function derivePastFormIX(verb: Verb<9>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  return buildForms([ALIF, KASRA, c1, SUKOON, c2, FATHA, c3, SHADDA, FATHA], c3)
}

function derivePastFormX(verb: Verb<10>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const prefix = [ALIF, KASRA, SEEN, SUKOON, TEH, FATHA, isHamzatedLetter(c1) ? ALIF_HAMZA : c1]

  if (c2 === c3)
    return {
      base: [...prefix, FATHA, c2, SHADDA, FATHA],
      suffixedBase: [...prefix, SUKOON, c2, FATHA, c3, SUKOON],
      pluralBase: [...prefix, FATHA, c2, SHADDA, DAMMA, WAW],
    }

  if (isWeakLetter(c2)) return buildForms([...prefix, FATHA, ALIF, c3, FATHA], c3)

  return buildForms([...prefix, SUKOON, c2, FATHA, c3, FATHA], c3)
}

function derivePastForms(verb: Verb): PastBaseForms {
  // Handle quadriliteral and longer roots
  if (verb.root.length === 4) return deriveQuadriliteralPastForms(verb)

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
