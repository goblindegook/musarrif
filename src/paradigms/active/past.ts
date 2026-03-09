import { mapRecord } from '../../primitives/objects.ts'
import { formIPastVowel, isFormIPastVowel } from '../form-i-vowels'
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

interface PastBaseForms {
  base: readonly string[]
  suffixedBase: readonly string[]
  feminineSingularDualBase: readonly string[]
  masculineDualBase: readonly string[]
  thirdPersonMasculinePluralBase: readonly string[]
}

export function conjugatePast(verb: Verb): Record<PronounId, string> {
  const { base, suffixedBase, feminineSingularDualBase, masculineDualBase, thirdPersonMasculinePluralBase } =
    derivePastForms(verb)

  return mapRecord(
    {
      '1s': [...suffixedBase, SUKOON, TEH, DAMMA],
      '2ms': [...suffixedBase, SUKOON, TEH, FATHA],
      '2fs': [...suffixedBase, SUKOON, TEH, KASRA],
      '3ms': base,
      '3fs': [...feminineSingularDualBase, TEH, SUKOON],
      '2d': [...suffixedBase, SUKOON, TEH, DAMMA, MEEM, FATHA, ALIF],
      '3md': [...masculineDualBase, ALIF],
      '3fd': [...feminineSingularDualBase, TEH, FATHA, ALIF],
      '1p': [...suffixedBase, SUKOON, NOON, FATHA, ALIF],
      '2mp': [...suffixedBase, SUKOON, TEH, DAMMA, MEEM, SUKOON],
      '2fp': [...suffixedBase, SUKOON, TEH, DAMMA, NOON, SHADDA, FATHA],
      '3mp': [...thirdPersonMasculinePluralBase, SUKOON, ALIF],
      '3fp': [...suffixedBase, SUKOON, NOON, FATHA],
    },
    (value) => normalizeAlifMadda(geminateDoubleLetters(value)).join('').normalize('NFC'),
  )
}

function buildForms(base: readonly string[], c3: string): PastBaseForms {
  if (!isWeakLetter(c3))
    return {
      base: [...base, FATHA],
      suffixedBase: base,
      feminineSingularDualBase: [...base, FATHA],
      masculineDualBase: [...base, FATHA],
      thirdPersonMasculinePluralBase: [...base, DAMMA, WAW],
    }

  const normalizedBase = base.slice(0, -1)

  return {
    base: [...normalizedBase, c3 === YEH ? ALIF_MAQSURA : ALIF],
    suffixedBase: [...normalizedBase, c3 === ALIF ? WAW : YEH],
    feminineSingularDualBase: normalizedBase,
    masculineDualBase: c3 === ALIF ? [...normalizedBase, WAW, SUKOON] : [...normalizedBase, YEH, FATHA],
    thirdPersonMasculinePluralBase: [...normalizedBase, WAW],
  }
}

function deriveQuadriliteralPastForms(verb: Verb): PastBaseForms {
  const [c1, c2, c3, c4] = [...verb.root]
  const seatedC1 = seatHamza(c1, FATHA)
  return buildForms([seatedC1, FATHA, c2, SUKOON, c3, FATHA, c4], c4)
}

function derivePastFormI(verb: Verb<1>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const seatedC1 = seatHamza(c1, FATHA)
  const isMiddleWeak = isWeakLetter(c2)
  const pastVowel = formIPastVowel(verb)
  const seatedC2 = seatHamza(c2, pastVowel)
  const seatedC3 = seatHamza(c3, pastVowel)
  const prefix = [seatedC1, FATHA, seatedC2]

  if (c2 === c3)
    return {
      ...buildForms([...prefix, SUKOON, c3], c3),
      suffixedBase: [...prefix, pastVowel, c3],
    }

  if (isWeakLetter(c3) && isFormIPastVowel(verb, KASRA))
    return {
      ...buildForms([...prefix, KASRA, YEH], ''),
      thirdPersonMasculinePluralBase: [...prefix, DAMMA, WAW],
    }

  if (isWeakLetter(c3)) return buildForms([...prefix, pastVowel, c3], c3)

  if (isMiddleWeak && isHamzatedLetter(c3))
    return {
      ...buildForms([seatedC1, FATHA, ALIF, c3], c3),
      suffixedBase: [seatedC1, KASRA, seatHamza(c3, KASRA)],
      thirdPersonMasculinePluralBase: [seatedC1, FATHA, ALIF, seatHamza(c3, DAMMA), DAMMA, WAW],
    }

  if (isMiddleWeak && !isFormIPastVowel(verb, KASRA))
    return {
      ...buildForms([seatedC1, FATHA, ALIF, c3], c3),
      suffixedBase: [seatedC1, c2 === YEH ? KASRA : DAMMA, c3],
    }

  return buildForms([...prefix, pastVowel, seatedC3], seatedC3)
}

function derivePastFormII(verb: Verb<2>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const seatedC1 = seatHamza(c1, FATHA)
  const prefix = [seatedC1, FATHA, c2, SHADDA, FATHA]

  if (c2 === YEH && c3 === YEH)
    return {
      ...buildForms([...prefix, ALIF], c3),
      base: [...prefix, ALIF],
    }

  return buildForms([...prefix, seatHamza(c3, FATHA)], c3)
}

function derivePastFormIII(verb: Verb<3>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const seatedC1 = seatHamza(c1, FATHA)
  const seatedC2 = isHamzatedLetter(c2) ? HAMZA : c2
  const seatedC3 = seatHamza(c3, FATHA)
  const prefix = [seatedC1, FATHA, ALIF, seatedC2]

  if (c2 === c3)
    return {
      ...buildForms([...prefix, SUKOON, c3], c3),
      suffixedBase: [...prefix, FATHA, seatedC3],
    }

  return buildForms([...prefix, FATHA, seatedC3], c3)
}

function derivePastFormIV(verb: Verb<4>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const seatedC3 = seatHamza(c3, FATHA)
  const prefix = [ALIF_HAMZA, FATHA, seatHamza(c1, FATHA)]

  if (c2 === c3 && isWeakLetter(c3))
    return {
      ...buildForms([...prefix, SUKOON, c2, FATHA, ALIF], c3),
      base: [...prefix, SUKOON, c2, FATHA, ALIF],
      masculineDualBase: [...prefix, SUKOON, c2, FATHA],
    }

  if (c2 === c3) return buildForms([...prefix, FATHA, c2, SUKOON, c3], c3)

  if (isHamzatedLetter(c2) && isWeakLetter(c3)) return buildForms([...prefix, FATHA, c3], c3)

  if (isWeakLetter(c3)) return buildForms([...prefix, SUKOON, c2, FATHA, c3], c3)

  if (isWeakLetter(c2) && isHamzatedLetter(c3))
    return {
      ...buildForms([...prefix, FATHA, ALIF, c3], c3),
      suffixedBase: [...prefix, KASRA, seatHamza(c3, KASRA)],
      thirdPersonMasculinePluralBase: [...prefix, FATHA, ALIF, seatHamza(c3, DAMMA), DAMMA, WAW],
    }

  if (isWeakLetter(c2)) return buildForms([...prefix, FATHA, ALIF, seatedC3], c3)

  return buildForms([...prefix, SUKOON, c2, FATHA, seatedC3], c3)
}

function derivePastFormV(verb: Verb<5>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const prefix = [TEH, FATHA, seatHamza(c1, FATHA), FATHA, seatHamza(c2, FATHA), SHADDA, FATHA]

  if (isHamzatedLetter(c3))
    return {
      ...buildForms([...prefix, seatHamza(c3, FATHA)], c3),
      thirdPersonMasculinePluralBase: [...prefix, seatHamza(c3, DAMMA), DAMMA, WAW],
    }

  return buildForms([...prefix, seatHamza(c3, FATHA)], c3)
}

function derivePastFormVI(verb: Verb<6>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const seatedC2 = isHamzatedLetter(c2) ? HAMZA : c2
  const seatedC3 = seatHamza(c3, FATHA)
  const prefix = [TEH, FATHA, seatHamza(c1, FATHA)]

  if (c2 === c3)
    return {
      ...buildForms([...prefix, FATHA, ALIF, c2, SUKOON, c3], seatedC3),
      suffixedBase: [...prefix, FATHA, ALIF, c2, FATHA, c3],
    }

  if (isWeakLetter(c2) && isHamzatedLetter(c3))
    return {
      ...buildForms([...prefix, FATHA, ALIF, c3], c3),
      suffixedBase: [...prefix, KASRA, seatHamza(c3, KASRA)],
      thirdPersonMasculinePluralBase: [...prefix, FATHA, ALIF, seatHamza(c3, DAMMA), DAMMA, WAW],
    }

  if (isWeakLetter(c3)) return buildForms([...prefix, FATHA, ALIF, seatedC2, FATHA, YEH], YEH)

  return buildForms([...prefix, FATHA, ALIF, seatedC2, FATHA, seatedC3], seatedC3)
}

function derivePastFormVII(verb: Verb<7>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const seatedC3 = seatHamza(c3, FATHA)
  const prefix = [ALIF, KASRA, NOON, SUKOON, seatHamza(c1, FATHA), FATHA]

  if (c2 === c3)
    return {
      ...buildForms([...prefix, c2, SUKOON, c3], c3),
      suffixedBase: [...prefix, c2, FATHA, seatedC3],
    }

  if (isWeakLetter(c2) && isWeakLetter(c3))
    return {
      ...buildForms([...prefix, c2, FATHA, seatedC3], c3),
      thirdPersonMasculinePluralBase: [...prefix, c2],
    }

  if (isWeakLetter(c2)) return buildForms([...prefix, ALIF, seatedC3], c3)

  return buildForms([...prefix, c2, FATHA, seatedC3], c3)
}

function derivePastFormVIII(verb: Verb<8>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const infix = resolveFormVIIIInfixConsonant(c1)
  const seatedC2 = seatHamza(c2, FATHA)
  const seatedC3 = seatHamza(c3, FATHA)
  const prefix = [ALIF, KASRA, seatHamza(c1, KASRA), SUKOON, infix, FATHA]

  if (c2 === c3)
    return {
      ...buildForms([...prefix, c2, SUKOON, c3], c3),
      suffixedBase: [...prefix, c2, FATHA, seatedC3],
    }

  if (c1 === WAW || isHamzatedLetter(c1))
    return buildForms([ALIF, KASRA, infix, SHADDA, FATHA, c2, FATHA, seatedC3], c3)

  if (isWeakLetter(c2) && isWeakLetter(c3)) return buildForms([...prefix, c2, FATHA, YEH], YEH)

  if (c2 === YEH)
    return {
      ...buildForms([...prefix, ALIF, c3], c3),
      suffixedBase: [...prefix, seatedC3],
    }

  if (isWeakLetter(c2) && infix !== DAL) return buildForms([...prefix, ALIF, c3], c3)

  if (isWeakLetter(c3)) return buildForms([...prefix, seatedC2, FATHA, YEH], YEH)

  return buildForms([...prefix, seatedC2, FATHA, seatHamza(c3, FATHA)], c3)
}

function derivePastFormIX(verb: Verb<9>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const seatedC1 = seatHamza(c1, FATHA)
  return {
    ...buildForms([ALIF, KASRA, seatedC1, SUKOON, c2, FATHA, c3, SUKOON, c3], c3),
    suffixedBase: [ALIF, KASRA, seatedC1, SUKOON, c2, FATHA, c3, FATHA, c3],
  }
}

function derivePastFormX(verb: Verb<10>): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const seatedC3 = seatHamza(c3, FATHA)
  const prefix = [ALIF, KASRA, SEEN, SUKOON, TEH, FATHA, isHamzatedLetter(c1) ? ALIF_HAMZA : c1]

  if (isWeakLetter(c2) && isWeakLetter(c3)) return buildForms([...prefix, FATHA, ALIF], c3)

  if (c2 === c3)
    return {
      ...buildForms([...prefix, FATHA, c2, SUKOON, c3], c3),
      suffixedBase: [...prefix, SUKOON, c2, FATHA, seatedC3],
    }

  if (isWeakLetter(c3)) return buildForms([...prefix, SUKOON, c2, FATHA, YEH], YEH)

  if (isWeakLetter(c2))
    return {
      ...buildForms([...prefix, FATHA, ALIF, c3], c3),
      suffixedBase: [...prefix, FATHA, seatedC3],
    }

  return buildForms([...prefix, SUKOON, c2, FATHA, seatedC3], c3)
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
