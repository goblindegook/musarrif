import { mapRecord } from '../../primitives/objects.ts'
import { formIPastVowel, isFormIPastVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_MAQSURA,
  DAL,
  DAMMA,
  FATHA,
  finalize,
  isHamzatedLetter,
  isWeakLetter,
  KASRA,
  LAM,
  MEEM,
  NOON,
  resolveFormVIIIInfixConsonant,
  SEEN,
  SHADDA,
  SUKOON,
  seatHamza,
  TEH,
  WAW,
  YEH,
  ZAY,
  type Token,
  Root,
} from '../letters'
import type { PronounId } from '../pronouns'
import type { FormIVerb, NonFormIVerb, Verb } from '../verbs'

interface PastBaseForms {
  base: readonly Token[]
  suffixedBase: readonly Token[]
  feminineSingularDualBase: readonly Token[]
  masculineDualBase: readonly Token[]
  thirdPersonMasculinePluralBase: readonly Token[]
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
      '3fs': [...feminineSingularDualBase, FATHA, TEH, SUKOON],
      '2d': [...suffixedBase, SUKOON, TEH, DAMMA, MEEM, FATHA, ALIF],
      '3md': [...masculineDualBase, ALIF],
      '3fd': [...feminineSingularDualBase, FATHA, TEH, FATHA, ALIF],
      '1p': [...suffixedBase, SUKOON, NOON, FATHA, ALIF],
      '2mp': [...suffixedBase, SUKOON, TEH, DAMMA, MEEM, SUKOON],
      '2fp': [...suffixedBase, SUKOON, TEH, DAMMA, NOON, SHADDA, FATHA],
      '3mp': [...thirdPersonMasculinePluralBase, WAW, SUKOON, ALIF],
      '3fp': [...suffixedBase, SUKOON, NOON, FATHA],
    },
    finalize,
  )
}

function buildForms(stem: readonly Token[], c3: string): PastBaseForms {
  if (!isWeakLetter(c3))
    return {
      base: [...stem, FATHA],
      suffixedBase: stem,
      feminineSingularDualBase: stem,
      masculineDualBase: [...stem, FATHA],
      thirdPersonMasculinePluralBase: [...stem, DAMMA],
    }

  const normalizedStem = stem.slice(0, -2)

  if (c3 === YEH)
    return {
      base: [...normalizedStem, FATHA, ALIF_MAQSURA],
      suffixedBase: [...normalizedStem, FATHA, YEH],
      feminineSingularDualBase: normalizedStem,
      masculineDualBase: [...normalizedStem, FATHA, YEH, FATHA],
      thirdPersonMasculinePluralBase: [...normalizedStem, FATHA],
    }

  return {
    base: [...normalizedStem, FATHA, ALIF],
    suffixedBase: [...normalizedStem, FATHA, WAW],
    feminineSingularDualBase: normalizedStem,
    masculineDualBase: [...normalizedStem, FATHA, WAW, SUKOON],
    thirdPersonMasculinePluralBase: [...normalizedStem, FATHA],
  }
}

function derivePastFormIq(verb: Verb): PastBaseForms {
  const [c1, c2, c3, c4] = Root(verb.root)
  const stem = [c1, FATHA, c2, SUKOON, c3, FATHA, c4]

  return {
    ...buildForms(stem, c4.letter),
    thirdPersonMasculinePluralBase: [...stem.slice(0, -1), c4, DAMMA],
  }
}

function derivePastFormIIq(verb: Verb): PastBaseForms {
  const [c1, c2, c3, c4] = Root(verb.root)
  return buildForms([TEH, FATHA, c1, FATHA, c2, SUKOON, c3, FATHA, c4], c4.letter)
}

function derivePastFormIIIq(verb: Verb): PastBaseForms {
  const [c1, c2, c3, c4] = Root(verb.root)
  return buildForms([ALIF, KASRA, c1, SUKOON, c2, FATHA, NOON, SUKOON, c3, FATHA, c4], c4.letter)
}

function derivePastFormIVq(verb: Verb): PastBaseForms {
  const [c1, c2, c3, c4] = Root(verb.root)
  const prefix = [ALIF, KASRA, c1, SUKOON, c2, FATHA, c3]

  return {
    base: [...prefix, FATHA, c4, SUKOON, c4, FATHA],
    suffixedBase: [...prefix, SUKOON, c4, FATHA, c4],
    feminineSingularDualBase: [...prefix, FATHA, c4, SUKOON, c4],
    masculineDualBase: [...prefix, FATHA, c4, SUKOON, c4, FATHA],
    thirdPersonMasculinePluralBase: [...prefix, FATHA, c4, SUKOON, c4, DAMMA],
  }
}

function derivePastFormI(verb: FormIVerb): PastBaseForms {
  const [c1, c2, c3] = Root(verb.root)
  const pastVowel = formIPastVowel(verb)
  const prefix = [c1, FATHA, c2]

  if (c2.equals(c3))
    return {
      ...buildForms([...prefix, SUKOON, c3], c3.letter),
      suffixedBase: [...prefix, pastVowel, c3],
    }

  if (c3.isWeak && pastVowel === KASRA)
    return {
      ...buildForms([...prefix, KASRA, YEH], ''),
      thirdPersonMasculinePluralBase: [...prefix, DAMMA],
    }

  if (c3.isWeak) return buildForms([...prefix, pastVowel, c3], c3.letter)

  if (c2.isWeak && c3.isHamza)
    return {
      ...buildForms([c1, FATHA, ALIF, c3], c3.letter),
      suffixedBase: [c1, KASRA, c3],
      thirdPersonMasculinePluralBase: [c1, FATHA, ALIF, c3, DAMMA],
    }

  if (c2.isWeak && !isFormIPastVowel(verb, KASRA))
    return {
      ...buildForms([c1, FATHA, ALIF, c3], c3.letter),
      suffixedBase: [c1, c2.is(YEH) ? KASRA : DAMMA, c3],
    }

  return buildForms([...prefix, pastVowel, c3], c3.letter)
}

function derivePastFormII(verb: NonFormIVerb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const prefix = [seatHamza(c1, FATHA), FATHA, c2, SHADDA, FATHA]

  if (c2 === YEH && c3 === YEH)
    return {
      ...buildForms([...prefix, ALIF], c3),
      base: [...prefix, ALIF],
    }

  return buildForms([...prefix, seatHamza(c3, FATHA)], c3)
}

function derivePastFormIII(verb: NonFormIVerb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const prefix = [seatHamza(c1, FATHA), FATHA, ALIF, seatHamza(c2)]

  if (c2 === c3)
    return {
      ...buildForms([...prefix, SUKOON, c3], c3),
      suffixedBase: [...prefix, FATHA, seatHamza(c3, FATHA)],
    }

  return buildForms([...prefix, FATHA, seatHamza(c3, FATHA)], c3)
}

function derivePastFormIV(verb: NonFormIVerb): PastBaseForms {
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

  if (isHamzatedLetter(c2) && isWeakLetter(c3)) return buildForms([...prefix, FATHA, c3], YEH)

  if (isWeakLetter(c3)) return buildForms([...prefix, SUKOON, c2, FATHA, c3], YEH)

  if (isWeakLetter(c2) && isHamzatedLetter(c3))
    return {
      ...buildForms([...prefix, FATHA, ALIF, c3], c3),
      suffixedBase: [...prefix, KASRA, seatHamza(c3, KASRA)],
      thirdPersonMasculinePluralBase: [...prefix, FATHA, ALIF, seatHamza(c3, DAMMA), DAMMA],
    }

  if (isWeakLetter(c2)) return buildForms([...prefix, FATHA, ALIF, seatedC3], c3)

  return buildForms([...prefix, SUKOON, c2, FATHA, seatedC3], c3)
}

function derivePastFormV(verb: NonFormIVerb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const prefix = [TEH, FATHA, seatHamza(c1, FATHA), FATHA, seatHamza(c2, FATHA), SHADDA, FATHA]

  if (isHamzatedLetter(c3))
    return {
      ...buildForms([...prefix, seatHamza(c3, FATHA)], c3),
      thirdPersonMasculinePluralBase: [...prefix, seatHamza(c3, DAMMA), DAMMA],
    }

  return buildForms([...prefix, seatHamza(c3, FATHA)], c3)
}

function derivePastFormVI(verb: NonFormIVerb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const prefix = [TEH, FATHA, seatHamza(c1, FATHA)]

  if (c2 === c3)
    return {
      ...buildForms([...prefix, FATHA, ALIF, c2, SUKOON, c3], c3),
      suffixedBase: [...prefix, FATHA, ALIF, c2, FATHA, c3],
    }

  if (isWeakLetter(c2) && isHamzatedLetter(c3))
    return {
      ...buildForms([...prefix, FATHA, ALIF, c3], c3),
      suffixedBase: [...prefix, KASRA, seatHamza(c3, KASRA)],
      thirdPersonMasculinePluralBase: [...prefix, FATHA, ALIF, seatHamza(c3, DAMMA), DAMMA],
    }

  if (isWeakLetter(c3)) return buildForms([...prefix, FATHA, ALIF, seatHamza(c2), FATHA, YEH], YEH)

  return buildForms([...prefix, FATHA, ALIF, seatHamza(c2), FATHA, seatHamza(c3, FATHA)], c3)
}

function derivePastFormVII(verb: NonFormIVerb): PastBaseForms {
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
      thirdPersonMasculinePluralBase: prefix,
    }

  if (isWeakLetter(c2)) return buildForms([...prefix, ALIF, seatedC3], c3)

  return buildForms([...prefix, c2, FATHA, seatedC3], c3)
}

function derivePastFormVIII(verb: NonFormIVerb): PastBaseForms {
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

function derivePastFormIX(verb: NonFormIVerb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const seatedC1 = seatHamza(c1, FATHA)
  return {
    ...buildForms([ALIF, KASRA, seatedC1, SUKOON, c2, FATHA, c3, SUKOON, c3], c3),
    suffixedBase: [ALIF, KASRA, seatedC1, SUKOON, c2, FATHA, c3, FATHA, c3],
  }
}

function derivePastFormX(verb: NonFormIVerb): PastBaseForms {
  const [c1, c2, c3] = [...verb.root]
  const seatedC3 = seatHamza(c3, FATHA)
  const prefix = [ALIF, KASRA, SEEN, SUKOON, TEH, FATHA, seatHamza(c1, FATHA)]

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
  if (verb.root === 'ليس' && verb.form === 1) return conjugateLaysa()

  if (verb.root === 'زيل' && verb.form === 1) return conjugateZala()

  if (verb.root.length === 4) {
    switch (verb.form) {
      case 1:
        return derivePastFormIq(verb)
      case 2:
        return derivePastFormIIq(verb)
      case 3:
        return derivePastFormIIIq(verb)
      case 4:
        return derivePastFormIVq(verb)
      default:
        return {
          base: [],
          suffixedBase: [],
          feminineSingularDualBase: [],
          masculineDualBase: [],
          thirdPersonMasculinePluralBase: [],
        }
    }
  }

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

function conjugateLaysa(): PastBaseForms {
  return {
    ...buildForms([LAM, FATHA, YEH, SUKOON, SEEN], SEEN),
    suffixedBase: [LAM, FATHA, SEEN],
  }
}

function conjugateZala(): PastBaseForms {
  return {
    ...buildForms([ZAY, FATHA, ALIF, LAM], LAM),
    suffixedBase: [ZAY, KASRA, LAM],
  }
}
