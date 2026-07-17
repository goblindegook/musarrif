import { mapRecord } from '../../primitives/objects'
import { isFormIPastVowel } from '../form-i-vowels'
import type { PronounId } from '../pronouns'
import {
  ALIF,
  DAL,
  DAMMA,
  FATHA,
  HAMZA,
  KASRA,
  MEEM,
  NOON,
  resolveFormVIIIInfixConsonant,
  SEEN,
  SHADDA,
  SUKOON,
  TEH,
  WAW,
  YEH,
} from '../tokens'
import { type FormIVerb, isQuadriliteralVerb, type NonFormIVerb, type QuadriliteralVerb, type Verb } from '../verbs'
import { agreementMorpheme, type Morpheme, measureMorpheme, radicalMorpheme, Word } from '../word'
import { constrainPassiveConjugation } from './support'

interface PassivePastParams {
  stem: readonly Morpheme[]
  suffix?: readonly Morpheme[]
  suffix3sd?: readonly Morpheme[]
}

function deriveMasculinePluralStem(stem: readonly Morpheme[]): readonly Morpheme[] {
  const precedingRadical = stem.at(-2)
  if (precedingRadical?.role === 'radical' && precedingRadical.some((t) => t.isWeak))
    return [...stem.slice(0, -3), measureMorpheme(DAMMA)]
  return stem.with(-1, measureMorpheme(DAMMA))
}

function hasAgreement(last?: Morpheme): boolean {
  return last?.role === 'radical' && last.some((t) => !t.isWeak)
}

function toConjugation(params: PassivePastParams): Record<PronounId, Word> {
  const { stem, suffix = [], suffix3sd = [] } = params
  const agreement = hasAgreement([...stem, ...suffix].at(-1)) ? [SUKOON] : []

  return mapRecord(
    {
      '1s': [...stem, ...suffix, agreementMorpheme(...agreement, TEH, DAMMA)],
      '2ms': [...stem, ...suffix, agreementMorpheme(...agreement, TEH, FATHA)],
      '2fs': [...stem, ...suffix, agreementMorpheme(...agreement, TEH, KASRA)],
      '3ms': [...stem, ...suffix3sd],
      '3fs': [...stem, ...suffix3sd, agreementMorpheme(TEH, SUKOON)],
      '2d': [...stem, ...suffix, agreementMorpheme(...agreement, TEH, DAMMA, MEEM, FATHA, ALIF)],
      '3md': [...stem, ...suffix3sd, agreementMorpheme(ALIF)],
      '3fd': [...stem, ...suffix3sd, agreementMorpheme(TEH, FATHA, ALIF)],
      '1p': [...stem, ...suffix, agreementMorpheme(...agreement, NOON, FATHA, ALIF)],
      '2mp': [...stem, ...suffix, agreementMorpheme(...agreement, TEH, DAMMA, MEEM, SUKOON)],
      '2fp': [...stem, ...suffix, agreementMorpheme(...agreement, TEH, DAMMA, NOON, SHADDA, FATHA)],
      '3mp': [...deriveMasculinePluralStem([...stem, ...suffix3sd]), agreementMorpheme(WAW, ALIF)],
      '3fp': [...stem, ...suffix, agreementMorpheme(...agreement, NOON, FATHA)],
    },
    (morphemes) => new Word(morphemes),
  )
}

function derivePassivePastFormI(verb: FormIVerb): PassivePastParams {
  const [c1, c2, c3] = verb.rootTokens

  if (c3.isWeak)
    return {
      stem: [
        radicalMorpheme(c1),
        measureMorpheme(DAMMA),
        radicalMorpheme(c2),
        measureMorpheme(KASRA),
        radicalMorpheme(YEH),
      ],
      suffix3sd: [measureMorpheme(FATHA)],
    }

  if (c2.equals(YEH))
    return {
      stem: [radicalMorpheme(c1), measureMorpheme(KASRA)],
      suffix: [radicalMorpheme(c3)],
      suffix3sd: [radicalMorpheme(YEH), radicalMorpheme(c3), measureMorpheme(FATHA)],
    }

  if (c2.isWeak && !isFormIPastVowel(verb, KASRA))
    return {
      stem: [radicalMorpheme(c1), measureMorpheme(KASRA)],
      suffix: [radicalMorpheme(c3)],
      suffix3sd: [radicalMorpheme(YEH), radicalMorpheme(c3), measureMorpheme(FATHA)],
    }

  if (c2.equals(c3))
    return {
      stem: [radicalMorpheme(c1), measureMorpheme(DAMMA), radicalMorpheme(c2)],
      suffix: [measureMorpheme(KASRA), radicalMorpheme(c3)],
      suffix3sd: [measureMorpheme(SUKOON), radicalMorpheme(c3), measureMorpheme(FATHA)],
    }

  return {
    stem: [
      radicalMorpheme(c1),
      measureMorpheme(DAMMA),
      radicalMorpheme(c2),
      measureMorpheme(KASRA),
      radicalMorpheme(c3),
    ],
    suffix3sd: [measureMorpheme(FATHA)],
  }
}

function derivePassivePastFormII(verb: NonFormIVerb): PassivePastParams {
  const [c1, c2, c3] = verb.rootTokens

  return {
    stem: [
      radicalMorpheme(c1),
      measureMorpheme(DAMMA),
      radicalMorpheme(c2),
      measureMorpheme(SHADDA),
      measureMorpheme(KASRA),
      radicalMorpheme(c3.isWeak ? YEH : c3),
    ],
    suffix3sd: [measureMorpheme(FATHA)],
  }
}

function derivePassivePastFormIII(verb: NonFormIVerb): PassivePastParams {
  const [c1, c2, c3] = verb.rootTokens
  if (c3.isWeak)
    return {
      stem: [
        radicalMorpheme(c1),
        measureMorpheme(DAMMA, WAW),
        radicalMorpheme(c2),
        measureMorpheme(KASRA),
        radicalMorpheme(YEH),
      ],
      suffix3sd: [measureMorpheme(FATHA)],
    }

  return {
    stem: [
      radicalMorpheme(c1),
      measureMorpheme(DAMMA, WAW),
      radicalMorpheme(c2),
      measureMorpheme(KASRA),
      radicalMorpheme(c3),
    ],
    suffix3sd: [measureMorpheme(FATHA)],
  }
}

function derivePassivePastFormIV(verb: NonFormIVerb): PassivePastParams {
  const [c1, c2, c3] = verb.rootTokens

  if (c2.isHamza)
    return {
      stem: [measureMorpheme(HAMZA, DAMMA), radicalMorpheme(c1), measureMorpheme(KASRA), radicalMorpheme(c3)],
      suffix3sd: [measureMorpheme(FATHA)],
    }

  if (c3.isWeak)
    return {
      stem: [
        measureMorpheme(HAMZA, DAMMA),
        radicalMorpheme(c1.isHamza ? WAW : c1),
        ...(c1.isWeak || c1.isHamza ? [] : [measureMorpheme(SUKOON)]),
        radicalMorpheme(c2),
        measureMorpheme(KASRA),
        radicalMorpheme(YEH),
      ],
      suffix3sd: [measureMorpheme(FATHA)],
    }

  if (c2.isWeak) {
    const longVowelTail = c3.isHamza ? [] : [measureMorpheme(SUKOON)]
    return {
      stem: [measureMorpheme(HAMZA, DAMMA), radicalMorpheme(c1), measureMorpheme(KASRA)],
      suffix: [radicalMorpheme(c3)],
      suffix3sd: [radicalMorpheme(YEH), ...longVowelTail, radicalMorpheme(c3), measureMorpheme(FATHA)],
    }
  }

  if (c2.equals(c3))
    return {
      stem: [measureMorpheme(HAMZA, DAMMA), radicalMorpheme(c1.isHamza ? WAW : c1)],
      suffix: [measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(KASRA), radicalMorpheme(c3)],
      suffix3sd: [
        measureMorpheme(KASRA),
        radicalMorpheme(c2),
        measureMorpheme(SUKOON),
        radicalMorpheme(c3),
        measureMorpheme(FATHA),
      ],
    }

  return {
    stem: [
      measureMorpheme(HAMZA, DAMMA),
      radicalMorpheme(c1.isHamza ? WAW : c1),
      measureMorpheme(SUKOON),
      radicalMorpheme(c2),
      measureMorpheme(KASRA),
      radicalMorpheme(c3),
    ],
    suffix3sd: [measureMorpheme(FATHA)],
  }
}

function derivePassivePastFormV(verb: NonFormIVerb): PassivePastParams {
  const formII = derivePassivePastFormII(verb)

  return {
    ...formII,
    stem: [measureMorpheme(TEH, DAMMA), ...formII.stem],
  }
}

function derivePassivePastFormVI(verb: NonFormIVerb): PassivePastParams {
  const [c1, c2, c3] = verb.rootTokens

  if (c3.isWeak)
    return {
      stem: [
        measureMorpheme(TEH, DAMMA),
        radicalMorpheme(c1),
        measureMorpheme(DAMMA, WAW),
        radicalMorpheme(c2),
        measureMorpheme(KASRA),
        radicalMorpheme(YEH),
      ],
      suffix3sd: [measureMorpheme(FATHA)],
    }

  return {
    stem: [
      measureMorpheme(TEH, DAMMA),
      radicalMorpheme(c1),
      measureMorpheme(DAMMA, WAW),
      radicalMorpheme(c2),
      measureMorpheme(KASRA),
      radicalMorpheme(c3),
    ],
    suffix3sd: [measureMorpheme(FATHA)],
  }
}

function derivePassivePastFormVII(verb: NonFormIVerb): PassivePastParams {
  const [c1, c2, c3] = verb.rootTokens

  if (c2.equals(c3)) {
    return {
      stem: [measureMorpheme(ALIF, DAMMA, NOON, SUKOON), radicalMorpheme(c1), measureMorpheme(DAMMA)],
      suffix3sd: [radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3), measureMorpheme(FATHA)],
    }
  }

  if (c2.isWeak)
    return {
      stem: [
        measureMorpheme(ALIF, DAMMA, NOON, SUKOON),
        radicalMorpheme(c1),
        measureMorpheme(KASRA),
        radicalMorpheme(YEH),
      ],
      suffix3sd: [radicalMorpheme(c3), measureMorpheme(FATHA)],
    }

  return {
    stem: [
      measureMorpheme(ALIF, DAMMA, NOON, SUKOON),
      radicalMorpheme(c1),
      measureMorpheme(DAMMA),
      radicalMorpheme(c2),
      measureMorpheme(KASRA),
    ],
    suffix3sd: [radicalMorpheme(c3), measureMorpheme(FATHA)],
  }
}

function derivePassivePastFormVIII(verb: NonFormIVerb): PassivePastParams {
  const [c1, c2, c3] = verb.rootTokens
  const infix = resolveFormVIIIInfixConsonant(c1)

  if (c2.equals(c3))
    return {
      stem: [
        measureMorpheme(ALIF, DAMMA),
        radicalMorpheme(c1),
        measureMorpheme(SUKOON, infix, DAMMA),
        radicalMorpheme(c2),
      ],
      suffix: [measureMorpheme(KASRA), radicalMorpheme(c3)],
      suffix3sd: [measureMorpheme(SUKOON), radicalMorpheme(c3), measureMorpheme(FATHA)],
    }

  if (c1.isWeak || c1.isHamza)
    return {
      stem: [
        measureMorpheme(ALIF, DAMMA, TEH, SHADDA, DAMMA),
        radicalMorpheme(c2),
        measureMorpheme(KASRA),
        radicalMorpheme(c3),
      ],
      suffix3sd: [measureMorpheme(FATHA)],
    }

  if (c3.isWeak)
    return {
      stem: [
        measureMorpheme(ALIF, DAMMA),
        radicalMorpheme(c1),
        measureMorpheme(SUKOON, infix, DAMMA),
        radicalMorpheme(c2),
        measureMorpheme(KASRA),
        radicalMorpheme(YEH),
      ],
      suffix3sd: [measureMorpheme(FATHA)],
    }

  if (c2.equals(YEH) || (c2.isWeak && !infix.equals(DAL)))
    return {
      stem: [measureMorpheme(ALIF, DAMMA), radicalMorpheme(c1), measureMorpheme(SUKOON, infix, KASRA)],
      suffix: [radicalMorpheme(c3)],
      suffix3sd: [radicalMorpheme(YEH), radicalMorpheme(c3), measureMorpheme(FATHA)],
    }

  return {
    stem: [
      measureMorpheme(ALIF, DAMMA),
      radicalMorpheme(c1),
      measureMorpheme(SUKOON, infix, DAMMA),
      radicalMorpheme(c2),
      measureMorpheme(KASRA),
      radicalMorpheme(c3),
    ],
    suffix3sd: [measureMorpheme(FATHA)],
  }
}

function derivePassivePastFormX(verb: NonFormIVerb): PassivePastParams {
  const [c1, c2, c3] = verb.rootTokens

  if (c3.isWeak)
    return {
      stem: [
        measureMorpheme(ALIF, DAMMA, SEEN, SUKOON, TEH, DAMMA),
        radicalMorpheme(c1),
        ...(c1.isWeak ? [] : [measureMorpheme(SUKOON)]),
        radicalMorpheme(c2),
        measureMorpheme(KASRA),
        radicalMorpheme(YEH),
      ],
      suffix3sd: [measureMorpheme(FATHA)],
    }

  if (c2.equals(c3))
    return {
      stem: [
        measureMorpheme(ALIF, DAMMA, SEEN, SUKOON, TEH, DAMMA),
        radicalMorpheme(c1),
        measureMorpheme(KASRA),
        radicalMorpheme(c2),
      ],
      suffix: [measureMorpheme(KASRA), radicalMorpheme(c3)],
      suffix3sd: [measureMorpheme(SUKOON), radicalMorpheme(c3), measureMorpheme(FATHA)],
    }

  if (c2.isWeak)
    return {
      stem: [measureMorpheme(ALIF, DAMMA, SEEN, SUKOON, TEH, DAMMA), radicalMorpheme(c1), measureMorpheme(KASRA)],
      suffix: [radicalMorpheme(c3)],
      suffix3sd: [radicalMorpheme(YEH), measureMorpheme(SUKOON), radicalMorpheme(c3), measureMorpheme(FATHA)],
    }

  return {
    stem: [
      measureMorpheme(ALIF, DAMMA, SEEN, SUKOON, TEH, DAMMA),
      radicalMorpheme(c1),
      measureMorpheme(SUKOON),
      radicalMorpheme(c2),
      measureMorpheme(KASRA),
      radicalMorpheme(c3),
    ],
    suffix3sd: [measureMorpheme(FATHA)],
  }
}

function derivePassivePastFormIq(verb: QuadriliteralVerb): PassivePastParams {
  const [c1, c2, c3, c4] = verb.rootTokens

  return {
    stem: [
      radicalMorpheme(c1),
      measureMorpheme(DAMMA),
      radicalMorpheme(c2.equals(YEH) ? WAW : c2),
      measureMorpheme(SUKOON),
      radicalMorpheme(c3),
      measureMorpheme(KASRA),
      radicalMorpheme(c4),
    ],
    suffix3sd: [measureMorpheme(FATHA)],
  }
}

function derivePassivePastFormIIq(verb: QuadriliteralVerb): PassivePastParams {
  const [c1, c2, c3, c4] = verb.rootTokens

  return {
    stem: [
      measureMorpheme(TEH, DAMMA),
      radicalMorpheme(c1),
      measureMorpheme(DAMMA),
      radicalMorpheme(c2),
      measureMorpheme(SUKOON),
      radicalMorpheme(c3),
      measureMorpheme(KASRA),
      radicalMorpheme(c4),
    ],
    suffix3sd: [measureMorpheme(FATHA)],
  }
}

function derivePassivePastFormIIIq(verb: QuadriliteralVerb): PassivePastParams {
  const [c1, c2, c3, c4] = verb.rootTokens

  return {
    stem: [
      measureMorpheme(ALIF, DAMMA),
      radicalMorpheme(c1),
      measureMorpheme(SUKOON),
      radicalMorpheme(c2),
      measureMorpheme(DAMMA, NOON, SUKOON),
      radicalMorpheme(c3),
      measureMorpheme(KASRA),
      radicalMorpheme(c4),
    ],
    suffix3sd: [measureMorpheme(FATHA)],
  }
}

function derivePassivePastFormIVq(verb: QuadriliteralVerb): PassivePastParams {
  const [c1, c2, c3, c4] = verb.rootTokens

  return {
    stem: [
      measureMorpheme(ALIF, DAMMA),
      radicalMorpheme(c1),
      measureMorpheme(SUKOON),
      radicalMorpheme(c2),
      measureMorpheme(DAMMA),
      radicalMorpheme(c3),
    ],
    suffix: [measureMorpheme(SUKOON), radicalMorpheme(c4), measureMorpheme(KASRA), radicalMorpheme(c4)],
    suffix3sd: [
      measureMorpheme(KASRA),
      radicalMorpheme(c4),
      measureMorpheme(SUKOON),
      radicalMorpheme(c4),
      measureMorpheme(FATHA),
    ],
  }
}

function derivePassivePastForms(verb: Verb): PassivePastParams {
  if (isQuadriliteralVerb(verb)) {
    switch (verb.form) {
      case 1:
        return derivePassivePastFormIq(verb)
      case 2:
        return derivePassivePastFormIIq(verb)
      case 3:
        return derivePassivePastFormIIIq(verb)
      case 4:
        return derivePassivePastFormIVq(verb)
    }
  }

  switch (verb.form) {
    case 1:
      return derivePassivePastFormI(verb)
    case 2:
      return derivePassivePastFormII(verb)
    case 3:
      return derivePassivePastFormIII(verb)
    case 4:
      return derivePassivePastFormIV(verb)
    case 5:
      return derivePassivePastFormV(verb)
    case 6:
      return derivePassivePastFormVI(verb)
    case 7:
      return derivePassivePastFormVII(verb)
    case 8:
      return derivePassivePastFormVIII(verb)
    case 9:
      return { stem: [] }
    case 10:
      return derivePassivePastFormX(verb)
  }
}

export function conjugatePassivePast(verb: Verb): Record<PronounId, Word> {
  return constrainPassiveConjugation(verb, toConjugation(derivePassivePastForms(verb)), new Word([]))
}
