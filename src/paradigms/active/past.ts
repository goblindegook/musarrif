import { mapRecord } from '../../primitives/objects.ts'
import { formIPastShortVowel, isFormIPastVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_MAQSURA,
  DAL,
  DAMMA,
  FATHA,
  geminateDoubleLetters,
  HAMZA,
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
  TEH,
  WAW,
  YEH,
} from '../letters'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'

interface SoundPastBaseForms {
  kind: 'sound'
  base: readonly string[]
  suffixedBase: readonly string[]
  pluralBase: readonly string[]
}

interface DefectivePastBaseForms {
  kind: 'defective'
  base: readonly string[]
  dualBase?: readonly string[]
  suffixedBase: readonly string[]
  pluralBase: readonly string[]
}

type PastBaseForms = SoundPastBaseForms | DefectivePastBaseForms

export function conjugatePast(verb: Verb): Record<PronounId, string> {
  const forms = derivePastForms(verb)
  const { kind, base, suffixedBase, pluralBase } = forms

  return mapRecord(
    {
      '1s': [...suffixedBase, TEH, DAMMA],
      '2ms': [...suffixedBase, TEH, FATHA],
      '2fs': [...suffixedBase, TEH, KASRA],
      '3ms': base,
      '3fs': kind === 'defective' ? [...suffixedBase.slice(0, -2), TEH, SUKOON] : [...base, TEH, SUKOON],
      '2d': [...suffixedBase, TEH, DAMMA, MEEM, FATHA, ALIF],
      '3md':
        kind === 'defective'
          ? (forms.dualBase ?? [...suffixedBase.slice(0, -1), suffixedBase.at(-2) === WAW ? SUKOON : FATHA, ALIF])
          : [...base, ALIF],
      '3fd': kind === 'defective' ? [...suffixedBase.slice(0, -2), TEH, FATHA, ALIF] : [...base, TEH, FATHA, ALIF],
      '1p': [...suffixedBase, NOON, FATHA, ALIF],
      '2mp': [...suffixedBase, TEH, DAMMA, MEEM, SUKOON],
      '2fp': [...suffixedBase, TEH, DAMMA, NOON, SHADDA, FATHA],
      '3mp': [...pluralBase, SUKOON, ALIF],
      '3fp': [...suffixedBase, NOON, FATHA],
    },
    (value) => normalizeAlifMadda(geminateDoubleLetters(value)).join('').normalize('NFC'),
  )
}

function buildForms(base: readonly string[], c3: string): PastBaseForms {
  if (!isWeakLetter(c3))
    return {
      kind: 'sound',
      base,
      suffixedBase: [...removeFinalDiacritic(base), SUKOON],
      pluralBase: [...removeFinalDiacritic(base), DAMMA, WAW],
    }

  const normalizedBase = removeFinalDiacritic(base).slice(0, -1)
  return {
    kind: 'defective',
    base: [...normalizedBase, c3 === YEH ? ALIF_MAQSURA : ALIF],
    suffixedBase: [...normalizedBase, c3 === ALIF ? WAW : YEH, SUKOON],
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
  const pastVowel = formIPastShortVowel(verb)
  const seatedC2 = seatHamza(c2, pastVowel)
  const seatedC3 = seatHamza(c3, pastVowel)

  if (isWeakLetter(c3) && isFormIPastVowel(verb, 'i')) {
    return {
      kind: 'sound',
      base: [c1, FATHA, seatedC2, KASRA, YEH, FATHA],
      suffixedBase: [c1, FATHA, seatedC2, KASRA, YEH],
      pluralBase: [c1, FATHA, seatedC2, DAMMA, WAW],
    }
  }

  if (isWeakLetter(c3)) return buildForms([c1, FATHA, seatedC2, pastVowel, c3], c3)

  if (c2 === c3)
    return {
      kind: 'sound',
      base: [c1, FATHA, c2, SHADDA, FATHA],
      suffixedBase: [c1, FATHA, c2, pastVowel, c3, SUKOON],
      pluralBase: [c1, FATHA, c2, SHADDA, DAMMA, WAW],
    }

  if (isMiddleWeak && isHamzatedLetter(c3))
    return {
      ...buildForms([c1, FATHA, ALIF, c3, FATHA], c3),
      suffixedBase: [c1, KASRA, seatHamza(c3, KASRA), SUKOON],
      pluralBase: [c1, FATHA, ALIF, seatHamza(c3, DAMMA), DAMMA, WAW],
    }

  if (isMiddleWeak && !isFormIPastVowel(verb, 'i'))
    return {
      ...buildForms([c1, FATHA, ALIF, c3, FATHA], c3),
      suffixedBase: [c1, c2 === YEH ? KASRA : DAMMA, c3, SUKOON],
    }

  return buildForms([c1, FATHA, seatedC2, pastVowel, seatedC3, FATHA], seatedC3)
}

function derivePastFormII(verb: Verb<2>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const prefix = [c1, FATHA, c2, SHADDA, FATHA]

  if (c2 === YEH && c3 === YEH)
    return {
      kind: 'defective',
      base: [...prefix, ALIF],
      suffixedBase: [...prefix, YEH, SUKOON],
      pluralBase: [...prefix, WAW],
    }

  return buildForms([...prefix, seatHamza(c3, FATHA), FATHA], c3)
}

function derivePastFormIII(verb: Verb<3>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const seatedC2 = isHamzatedLetter(c2) ? HAMZA : c2
  const prefix = [c1, FATHA, ALIF, seatedC2]

  if (c2 === c3)
    return {
      kind: 'sound',
      base: [...prefix, SHADDA, FATHA],
      suffixedBase: [...prefix, FATHA, c3, SUKOON],
      pluralBase: [...prefix, SHADDA, DAMMA, WAW],
    }

  return buildForms([...prefix, FATHA, c3, FATHA], c3)
}

function derivePastFormIV(verb: Verb<4>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const prefix = [ALIF_HAMZA, FATHA, c1]

  if (c2 === c3 && isWeakLetter(c3))
    return {
      ...buildForms([...prefix, SUKOON, c2, FATHA, ALIF], c3),
      kind: 'defective',
      base: [...prefix, SUKOON, c2, FATHA, ALIF],
      dualBase: [...prefix, SUKOON, c2, FATHA, ALIF],
    }

  if (c2 === c3) return buildForms([...prefix, FATHA, c2, SHADDA, FATHA], c3)

  if (isHamzatedLetter(c2) && isWeakLetter(c3)) return buildForms([...prefix, FATHA, c3, FATHA], c3)

  if (isWeakLetter(c3)) return buildForms([...prefix, SUKOON, c2, FATHA, c3, FATHA], c3)

  if (isWeakLetter(c2) && isHamzatedLetter(c3))
    return {
      ...buildForms([...prefix, FATHA, ALIF, c3, FATHA], c3),
      suffixedBase: [...prefix, KASRA, seatHamza(c3, KASRA), SUKOON],
      pluralBase: [...prefix, FATHA, ALIF, seatHamza(c3, DAMMA), DAMMA, WAW],
    }

  if (isWeakLetter(c2)) return buildForms([...prefix, FATHA, ALIF, c3, FATHA], c3)

  return buildForms([...prefix, SUKOON, c2, FATHA, c3, FATHA], c3)
}

function derivePastFormV(verb: Verb<5>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const prefix = [TEH, FATHA, c1, FATHA, seatHamza(c2, FATHA), SHADDA, FATHA]

  if (isHamzatedLetter(c3))
    return {
      ...buildForms([...prefix, seatHamza(c3, FATHA), FATHA], c3),
      pluralBase: [...prefix, seatHamza(c3, DAMMA), DAMMA, WAW],
    }

  return buildForms([...prefix, seatHamza(c3, FATHA), FATHA], c3)
}

function derivePastFormVI(verb: Verb<6>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const seatedC2 = isHamzatedLetter(c2) ? HAMZA : c2
  const seatedC3 = seatHamza(c3, FATHA)
  const prefix = [TEH, FATHA, c1]

  if (c2 === c3)
    return {
      kind: 'sound',
      base: [...prefix, FATHA, ALIF, c2, SHADDA, FATHA],
      suffixedBase: [...prefix, FATHA, ALIF, c2, FATHA, c3, SUKOON],
      pluralBase: [...prefix, FATHA, ALIF, c2, SHADDA, DAMMA, WAW],
    }

  if (isWeakLetter(c2) && isHamzatedLetter(c3))
    return {
      ...buildForms([...prefix, FATHA, ALIF, c3, FATHA], c3),
      suffixedBase: [...prefix, KASRA, seatHamza(c3, KASRA), SUKOON],
      pluralBase: [...prefix, FATHA, ALIF, seatHamza(c3, DAMMA), DAMMA, WAW],
    }

  if (isWeakLetter(c3)) return buildForms([...prefix, FATHA, ALIF, seatedC2, FATHA, YEH, FATHA], YEH)

  return buildForms([...prefix, FATHA, ALIF, seatedC2, FATHA, seatedC3, FATHA], seatedC3)
}

function derivePastFormVII(verb: Verb<7>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const prefix = [ALIF, KASRA, NOON, SUKOON, c1, FATHA]

  if (c2 === c3)
    return {
      kind: 'sound',
      base: [...prefix, c2, SHADDA, FATHA],
      suffixedBase: [...prefix, c2, FATHA, c3, SUKOON],
      pluralBase: [...prefix, c2, SHADDA, DAMMA, WAW],
    }

  if (isWeakLetter(c2) && isWeakLetter(c3))
    return {
      ...buildForms([...prefix, c2, FATHA, YEH, FATHA], YEH),
      pluralBase: [...prefix, c2],
    }

  if (isWeakLetter(c2)) return buildForms([...prefix, ALIF, c3, FATHA], c3)

  return buildForms([...prefix, c2, FATHA, c3, FATHA], c3)
}

function derivePastFormVIII(verb: Verb<8>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const infix = resolveFormVIIIInfixConsonant(c1)
  const seatedC1 = seatHamza(c1, KASRA)
  const seatedC2 = seatHamza(c2, FATHA)

  if (c2 === c3)
    return {
      kind: 'sound',
      base: [ALIF, KASRA, seatedC1, SUKOON, infix, FATHA, c2, SHADDA, FATHA],
      suffixedBase: [ALIF, KASRA, seatedC1, SUKOON, infix, FATHA, c2, FATHA, c3, SUKOON],
      pluralBase: [ALIF, KASRA, seatedC1, SUKOON, infix, FATHA, c2, SHADDA, DAMMA, WAW],
    }

  if (c1 === WAW || c1 === ALIF_HAMZA) return buildForms([ALIF, KASRA, infix, SHADDA, FATHA, c2, FATHA, c3, FATHA], c3)

  if (isWeakLetter(c2) && isWeakLetter(c3))
    return buildForms([ALIF, KASRA, c1, SUKOON, infix, FATHA, c2, FATHA, YEH], YEH)

  if (c2 === YEH)
    return {
      ...buildForms([ALIF, KASRA, c1, SUKOON, infix, FATHA, ALIF, c3, FATHA], c3),
      suffixedBase: [ALIF, KASRA, c1, SUKOON, infix, FATHA, c3, SUKOON],
    }

  if (isWeakLetter(c2) && infix !== DAL) return buildForms([ALIF, KASRA, c1, SUKOON, infix, FATHA, ALIF, c3, FATHA], c3)

  if (isWeakLetter(c3)) return buildForms([ALIF, KASRA, c1, SUKOON, infix, FATHA, seatedC2, FATHA, YEH], YEH)

  return buildForms([ALIF, KASRA, c1, SUKOON, infix, FATHA, seatedC2, FATHA, seatHamza(c3, FATHA), FATHA], c3)
}

function derivePastFormIX(verb: Verb<9>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  return {
    kind: 'sound',
    base: [ALIF, KASRA, c1, SUKOON, c2, FATHA, c3, SHADDA, FATHA],
    suffixedBase: [ALIF, KASRA, c1, SUKOON, c2, FATHA, c3, FATHA, c3, SUKOON],
    pluralBase: [ALIF, KASRA, c1, SUKOON, c2, FATHA, c3, SHADDA, DAMMA, WAW],
  }
}

function derivePastFormX(verb: Verb<10>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const prefix = [ALIF, KASRA, SEEN, SUKOON, TEH, FATHA, isHamzatedLetter(c1) ? ALIF_HAMZA : c1]

  if (c2 === c3)
    return {
      kind: 'sound',
      base: [...prefix, FATHA, c2, SHADDA, FATHA],
      suffixedBase: [...prefix, SUKOON, c2, FATHA, c3, SUKOON],
      pluralBase: [...prefix, FATHA, c2, SHADDA, DAMMA, WAW],
    }

  if (isWeakLetter(c3)) return buildForms([...prefix, SUKOON, c2, FATHA, YEH, FATHA], YEH)

  if (isWeakLetter(c2))
    return {
      ...buildForms([...prefix, FATHA, ALIF, c3, FATHA], c3),
      suffixedBase: [...prefix, FATHA, c3, SUKOON],
    }

  return buildForms([...prefix, SUKOON, c2, FATHA, c3, FATHA], c3)
}

function derivePastForms(verb: Verb): PastBaseForms {
  if (verb.root.length === 4) return deriveQuadriliteralPastForms(verb)

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
