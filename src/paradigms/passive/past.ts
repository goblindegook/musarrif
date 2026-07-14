import { mapRecord } from '../../primitives/objects'
import { isFormIPastVowel } from '../form-i-vowels'
import type { PronounId } from '../pronouns'
import {
  ALIF,
  ALIF_HAMZA,
  DAL,
  DAMMA,
  FATHA,
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
  prefix: readonly Morpheme[]
  suffix?: readonly Morpheme[]
  suffix3sd?: readonly Morpheme[]
}

function deriveMasculinePluralSuffix(suffix3sd: readonly Morpheme[]): readonly Morpheme[] {
  const precedingRadical = suffix3sd.at(-2)
  if (precedingRadical?.role === 'radical' && precedingRadical.some((t) => t.isWeak)) return [measureMorpheme(DAMMA)]
  return [...suffix3sd.slice(0, -1), measureMorpheme(DAMMA)]
}

function hasAgreement(last?: Morpheme): boolean {
  return last?.role === 'radical' && last.some((t) => !t.isWeak)
}

function toConjugation(params: PassivePastParams): Record<PronounId, Word> {
  const { prefix, suffix = [], suffix3sd = [] } = params
  const agreement = hasAgreement([...prefix, ...suffix].at(-1)) ? [SUKOON] : []

  return mapRecord(
    {
      '1s': [...prefix, ...suffix, agreementMorpheme(...agreement, TEH, DAMMA)],
      '2ms': [...prefix, ...suffix, agreementMorpheme(...agreement, TEH, FATHA)],
      '2fs': [...prefix, ...suffix, agreementMorpheme(...agreement, TEH, KASRA)],
      '3ms': [...prefix, ...suffix3sd],
      '3fs': [...prefix, ...suffix3sd, agreementMorpheme(TEH, SUKOON)],
      '2d': [...prefix, ...suffix, agreementMorpheme(...agreement, TEH, DAMMA, MEEM, FATHA, ALIF)],
      '3md': [...prefix, ...suffix3sd, agreementMorpheme(ALIF)],
      '3fd': [...prefix, ...suffix3sd, agreementMorpheme(TEH, FATHA, ALIF)],
      '1p': [...prefix, ...suffix, agreementMorpheme(...agreement, NOON, FATHA, ALIF)],
      '2mp': [...prefix, ...suffix, agreementMorpheme(...agreement, TEH, DAMMA, MEEM, SUKOON)],
      '2fp': [...prefix, ...suffix, agreementMorpheme(...agreement, TEH, DAMMA, NOON, SHADDA, FATHA)],
      '3mp': [...prefix, ...deriveMasculinePluralSuffix(suffix3sd), agreementMorpheme(WAW, ALIF)],
      '3fp': [...prefix, ...suffix, agreementMorpheme(...agreement, NOON, FATHA)],
    },
    (morphemes) => new Word(morphemes),
  )
}

function derivePassivePastFormI(verb: FormIVerb): PassivePastParams {
  const [c1, c2, c3] = verb.rootTokens

  if (c3.isWeak)
    return {
      prefix: [radicalMorpheme(c1), measureMorpheme(DAMMA), radicalMorpheme(c2)],
      suffix: [measureMorpheme(KASRA), radicalMorpheme(YEH)],
      suffix3sd: [measureMorpheme(KASRA), radicalMorpheme(YEH), measureMorpheme(FATHA)],
    }

  if (c2.equals(YEH))
    return {
      prefix: [radicalMorpheme(c1), measureMorpheme(KASRA)],
      suffix: [radicalMorpheme(c3)],
      suffix3sd: [radicalMorpheme(YEH), radicalMorpheme(c3), measureMorpheme(FATHA)],
    }

  if (c2.isWeak && !isFormIPastVowel(verb, KASRA))
    return {
      prefix: [radicalMorpheme(c1), measureMorpheme(KASRA)],
      suffix: [radicalMorpheme(c3)],
      suffix3sd: [radicalMorpheme(YEH), radicalMorpheme(c3), measureMorpheme(FATHA)],
    }

  if (c2.equals(c3))
    return {
      prefix: [radicalMorpheme(c1), measureMorpheme(DAMMA), radicalMorpheme(c2)],
      suffix: [measureMorpheme(KASRA), radicalMorpheme(c3)],
      suffix3sd: [measureMorpheme(SUKOON), radicalMorpheme(c3), measureMorpheme(FATHA)],
    }

  return {
    prefix: [
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
  if (c3.isWeak)
    return {
      prefix: [radicalMorpheme(c1), measureMorpheme(DAMMA), radicalMorpheme(c2), measureMorpheme(SHADDA)],
      suffix: [measureMorpheme(KASRA), radicalMorpheme(YEH)],
      suffix3sd: [measureMorpheme(KASRA), radicalMorpheme(YEH), measureMorpheme(FATHA)],
    }

  return {
    prefix: [radicalMorpheme(c1), measureMorpheme(DAMMA), radicalMorpheme(c2), measureMorpheme(SHADDA, KASRA)],
    suffix: [radicalMorpheme(c3)],
    suffix3sd: [radicalMorpheme(c3), measureMorpheme(FATHA)],
  }
}

function derivePassivePastFormIII(verb: NonFormIVerb): PassivePastParams {
  const [c1, c2, c3] = verb.rootTokens
  if (c3.isWeak)
    return {
      prefix: [radicalMorpheme(c1), measureMorpheme(DAMMA, WAW), radicalMorpheme(c2)],
      suffix: [measureMorpheme(KASRA), radicalMorpheme(YEH)],
      suffix3sd: [measureMorpheme(KASRA), radicalMorpheme(YEH), measureMorpheme(FATHA)],
    }

  return {
    prefix: [radicalMorpheme(c1), measureMorpheme(DAMMA, WAW), radicalMorpheme(c2), measureMorpheme(KASRA)],
    suffix: [radicalMorpheme(c3)],
    suffix3sd: [radicalMorpheme(c3), measureMorpheme(FATHA)],
  }
}

function derivePassivePastFormIV(verb: NonFormIVerb): PassivePastParams {
  const [c1, c2, c3] = verb.rootTokens

  if (c2.isHamza)
    return {
      prefix: [measureMorpheme(ALIF_HAMZA, DAMMA), radicalMorpheme(c1.isHamza ? WAW : c1)],
      suffix: [measureMorpheme(KASRA), radicalMorpheme(c3)],
      suffix3sd: [measureMorpheme(KASRA), radicalMorpheme(c3), measureMorpheme(FATHA)],
    }

  if (c3.isWeak)
    return {
      prefix: [
        measureMorpheme(ALIF_HAMZA, DAMMA),
        radicalMorpheme(c1.isHamza ? WAW : c1),
        ...(c1.isWeak ? [] : [measureMorpheme(SUKOON)]),
        radicalMorpheme(c2),
      ],
      suffix: [measureMorpheme(KASRA), radicalMorpheme(YEH)],
      suffix3sd: [measureMorpheme(KASRA), radicalMorpheme(YEH), measureMorpheme(FATHA)],
    }

  if (c2.isWeak) {
    const longVowelTail = c3.isHamza ? [] : [measureMorpheme(SUKOON)]
    return {
      prefix: [measureMorpheme(ALIF_HAMZA, DAMMA), radicalMorpheme(c1.isHamza ? WAW : c1), measureMorpheme(KASRA)],
      suffix: [radicalMorpheme(c3)],
      suffix3sd: [radicalMorpheme(YEH), ...longVowelTail, radicalMorpheme(c3), measureMorpheme(FATHA)],
    }
  }

  if (c2.equals(c3))
    return {
      prefix: [measureMorpheme(ALIF_HAMZA, DAMMA), radicalMorpheme(c1.isHamza ? WAW : c1)],
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
    prefix: [
      measureMorpheme(ALIF_HAMZA, DAMMA),
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
    prefix: [measureMorpheme(TEH, DAMMA), ...formII.prefix],
  }
}

function derivePassivePastFormVI(verb: NonFormIVerb): PassivePastParams {
  const [c1, c2, c3] = verb.rootTokens

  if (c3.isWeak)
    return {
      prefix: [measureMorpheme(TEH, DAMMA), radicalMorpheme(c1), measureMorpheme(DAMMA, WAW), radicalMorpheme(c2)],
      suffix3sd: [measureMorpheme(KASRA), radicalMorpheme(YEH), measureMorpheme(FATHA)],
    }

  return {
    prefix: [
      measureMorpheme(TEH, DAMMA),
      radicalMorpheme(c1),
      measureMorpheme(DAMMA, WAW),
      radicalMorpheme(c2),
      measureMorpheme(KASRA),
    ],
    suffix: [radicalMorpheme(c3)],
    suffix3sd: [radicalMorpheme(c3), measureMorpheme(FATHA)],
  }
}

function derivePassivePastFormVII(verb: NonFormIVerb): PassivePastParams {
  const [c1, c2, c3] = verb.rootTokens

  if (c2.equals(c3)) {
    return {
      prefix: [measureMorpheme(ALIF, DAMMA, NOON, SUKOON), radicalMorpheme(c1), measureMorpheme(DAMMA)],
      suffix3sd: [radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3), measureMorpheme(FATHA)],
    }
  }

  if (c2.isWeak)
    return {
      prefix: [
        measureMorpheme(ALIF, DAMMA, NOON, SUKOON),
        radicalMorpheme(c1),
        measureMorpheme(KASRA),
        radicalMorpheme(YEH),
      ],
      suffix3sd: [radicalMorpheme(c3), measureMorpheme(FATHA)],
    }

  return {
    prefix: [
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
      prefix: [measureMorpheme(ALIF, DAMMA), radicalMorpheme(c1), measureMorpheme(SUKOON, infix, DAMMA)],
      suffix: [radicalMorpheme(c2), measureMorpheme(KASRA), radicalMorpheme(c3)],
      suffix3sd: [radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3), measureMorpheme(FATHA)],
    }

  if ((c1.isWeak || c1.isHamza) && c3.isWeak)
    return {
      prefix: [measureMorpheme(ALIF, DAMMA, TEH, SHADDA, DAMMA), radicalMorpheme(c2)],
      suffix: [measureMorpheme(KASRA), radicalMorpheme(YEH)],
      suffix3sd: [measureMorpheme(KASRA), radicalMorpheme(YEH), measureMorpheme(FATHA)],
    }

  if (c1.isWeak || c1.isHamza)
    return {
      prefix: [measureMorpheme(ALIF, DAMMA, TEH, SHADDA, DAMMA), radicalMorpheme(c2), measureMorpheme(KASRA)],
      suffix: [radicalMorpheme(c3)],
      suffix3sd: [radicalMorpheme(c3), measureMorpheme(FATHA)],
    }

  if (c3.isWeak)
    return {
      prefix: [
        measureMorpheme(ALIF, DAMMA),
        radicalMorpheme(c1),
        measureMorpheme(SUKOON, infix, DAMMA),
        radicalMorpheme(c2),
      ],
      suffix: [measureMorpheme(KASRA), radicalMorpheme(YEH)],
      suffix3sd: [measureMorpheme(KASRA), radicalMorpheme(YEH), measureMorpheme(FATHA)],
    }

  if (c2.equals(YEH) || (c2.isWeak && !infix.equals(DAL)))
    return {
      prefix: [measureMorpheme(ALIF, DAMMA), radicalMorpheme(c1), measureMorpheme(SUKOON, infix, KASRA)],
      suffix: [radicalMorpheme(c3)],
      suffix3sd: [radicalMorpheme(YEH), radicalMorpheme(c3), measureMorpheme(FATHA)],
    }

  return {
    prefix: [
      measureMorpheme(ALIF, DAMMA),
      radicalMorpheme(c1),
      measureMorpheme(SUKOON, infix, DAMMA),
      radicalMorpheme(c2),
      measureMorpheme(KASRA),
    ],
    suffix: [radicalMorpheme(c3)],
    suffix3sd: [radicalMorpheme(c3), measureMorpheme(FATHA)],
  }
}

function derivePassivePastFormX(verb: NonFormIVerb): PassivePastParams {
  const [c1, c2, c3] = verb.rootTokens

  if (c3.isWeak)
    return {
      prefix: [
        measureMorpheme(ALIF, DAMMA, SEEN, SUKOON, TEH, DAMMA),
        radicalMorpheme(c1),
        ...(c1.isWeak ? [] : [measureMorpheme(SUKOON)]),
        radicalMorpheme(c2),
      ],
      suffix: [measureMorpheme(KASRA), radicalMorpheme(YEH)],
      suffix3sd: [measureMorpheme(KASRA), radicalMorpheme(YEH), measureMorpheme(FATHA)],
    }

  if (c2.equals(c3))
    return {
      prefix: [measureMorpheme(ALIF, DAMMA, SEEN, SUKOON, TEH, DAMMA), radicalMorpheme(c1), measureMorpheme(KASRA)],
      suffix: [radicalMorpheme(c2), measureMorpheme(KASRA), radicalMorpheme(c3)],
      suffix3sd: [radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3), measureMorpheme(FATHA)],
    }

  if (c2.isWeak)
    return {
      prefix: [measureMorpheme(ALIF, DAMMA, SEEN, SUKOON, TEH, DAMMA), radicalMorpheme(c1), measureMorpheme(KASRA)],
      suffix: [radicalMorpheme(c3)],
      suffix3sd: [radicalMorpheme(YEH), measureMorpheme(SUKOON), radicalMorpheme(c3), measureMorpheme(FATHA)],
    }

  return {
    prefix: [
      measureMorpheme(ALIF, DAMMA, SEEN, SUKOON, TEH, DAMMA),
      radicalMorpheme(c1),
      measureMorpheme(SUKOON),
      radicalMorpheme(c2),
      measureMorpheme(KASRA),
    ],
    suffix: [radicalMorpheme(c3)],
    suffix3sd: [radicalMorpheme(c3), measureMorpheme(FATHA)],
  }
}

function derivePassivePastFormIq(verb: QuadriliteralVerb): PassivePastParams {
  const [c1, c2, c3, c4] = verb.rootTokens

  return {
    prefix: [
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
    prefix: [
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
    prefix: [
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
    prefix: [
      measureMorpheme(ALIF, DAMMA),
      radicalMorpheme(c1),
      measureMorpheme(SUKOON),
      radicalMorpheme(c2),
      measureMorpheme(DAMMA),
    ],
    suffix: [
      radicalMorpheme(c3),
      measureMorpheme(SUKOON),
      radicalMorpheme(c4),
      measureMorpheme(KASRA),
      radicalMorpheme(c4),
    ],
    suffix3sd: [
      radicalMorpheme(c3),
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
      return { prefix: [] }
    case 10:
      return derivePassivePastFormX(verb)
  }
}

export function conjugatePassivePast(verb: Verb): Record<PronounId, Word> {
  return constrainPassiveConjugation(verb, toConjugation(derivePassivePastForms(verb)), new Word([]))
}
