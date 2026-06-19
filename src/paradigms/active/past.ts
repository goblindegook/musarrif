import { mapRecord } from '../../primitives/objects.ts'
import { formIPastVowel, isFormIPastVowel } from '../form-i-vowels'
import type { PronounId } from '../pronouns'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_MAQSURA,
  DAL,
  DAMMA,
  FATHA,
  KASRA,
  LAM,
  MEEM,
  NOON,
  resolveFormVIIIInfixConsonant,
  SEEN,
  SHADDA,
  SUKOON,
  TEH,
  type Token,
  WAW,
  YEH,
} from '../tokens.ts'
import type { FormIVerb, NonFormIVerb, QuadriliteralVerb, Verb } from '../verbs'
import { agreementMorpheme, type MorphemeToken, measureMorpheme, radicalMorpheme, Word } from '../word.ts'

function isQuadriliteralVerb(verb: Verb): verb is QuadriliteralVerb {
  return verb.rootTokens.length === 4
}

interface PastBaseForms<T extends Token | MorphemeToken> {
  base: readonly T[]
  suffixedBase: readonly T[]
  feminineSingularDualBase: readonly T[]
  masculineDualBase: readonly T[]
  thirdPersonMasculinePluralBase: readonly T[]
}

export function conjugatePast(verb: Verb): Record<PronounId, Word> {
  return mapRecord(addAgreement(derivePastForms(verb)), (morphemes) => new Word(morphemes))
}

function buildForms(stem: readonly MorphemeToken[], defective?: Token): PastBaseForms<MorphemeToken> {
  if (!defective?.isWeak)
    return {
      base: [...stem, measureMorpheme(FATHA)],
      suffixedBase: stem,
      feminineSingularDualBase: [...stem, measureMorpheme(FATHA)],
      masculineDualBase: [...stem, measureMorpheme(FATHA)],
      thirdPersonMasculinePluralBase: [...stem, measureMorpheme(DAMMA)],
    }

  const ns = stem.slice(0, -2)

  if (defective.equals(YEH))
    return {
      base: [...ns, measureMorpheme(FATHA), radicalMorpheme(ALIF_MAQSURA)],
      suffixedBase: [...ns, measureMorpheme(FATHA), radicalMorpheme(YEH)],
      feminineSingularDualBase: [...ns, measureMorpheme(FATHA)],
      masculineDualBase: [...ns, measureMorpheme(FATHA), radicalMorpheme(YEH), measureMorpheme(FATHA)],
      thirdPersonMasculinePluralBase: [...ns, measureMorpheme(FATHA)],
    }

  return {
    base: [...ns, measureMorpheme(FATHA), radicalMorpheme(ALIF)],
    suffixedBase: [...ns, measureMorpheme(FATHA), radicalMorpheme(WAW)],
    feminineSingularDualBase: [...ns, measureMorpheme(FATHA)],
    masculineDualBase: [...ns, measureMorpheme(FATHA), radicalMorpheme(WAW), measureMorpheme(SUKOON)],
    thirdPersonMasculinePluralBase: [...ns, measureMorpheme(FATHA)],
  }
}

function derivePastFormI(verb: FormIVerb): PastBaseForms<MorphemeToken> {
  if (verb.root === 'ليس') return conjugateLaysa()

  const [c1, c2, c3] = verb.rootTokens
  const pastVowel = formIPastVowel(verb)
  const prefix = [radicalMorpheme(c1), measureMorpheme(FATHA), radicalMorpheme(c2)]

  if (c2.equals(c3))
    return {
      ...buildForms([...prefix, measureMorpheme(SUKOON), radicalMorpheme(c3)], c3),
      suffixedBase: [...prefix, measureMorpheme(pastVowel), radicalMorpheme(c3)],
    }

  if (c3.isWeak && pastVowel.equals(KASRA))
    return {
      ...buildForms([...prefix, measureMorpheme(KASRA), radicalMorpheme(YEH)]),
      thirdPersonMasculinePluralBase: [...prefix, measureMorpheme(DAMMA)],
    }

  if (c3.isWeak) return buildForms([...prefix, measureMorpheme(pastVowel), radicalMorpheme(c3)], c3)

  if (c2.equals(YEH))
    return {
      ...buildForms([radicalMorpheme(c1), measureMorpheme(FATHA), radicalMorpheme(ALIF), radicalMorpheme(c3)], c3),
      suffixedBase: [radicalMorpheme(c1), measureMorpheme(KASRA), radicalMorpheme(c3)],
    }

  if (c2.isWeak && !isFormIPastVowel(verb, KASRA))
    return {
      ...buildForms([radicalMorpheme(c1), measureMorpheme(FATHA), radicalMorpheme(ALIF), radicalMorpheme(c3)], c3),
      suffixedBase: [radicalMorpheme(c1), measureMorpheme(DAMMA), radicalMorpheme(c3)],
    }

  return buildForms([...prefix, measureMorpheme(pastVowel), radicalMorpheme(c3)], c3)
}

function conjugateLaysa(): PastBaseForms<MorphemeToken> {
  return {
    ...buildForms([
      radicalMorpheme(LAM),
      measureMorpheme(FATHA),
      radicalMorpheme(YEH),
      measureMorpheme(SUKOON),
      radicalMorpheme(SEEN),
    ]),
    suffixedBase: [radicalMorpheme(LAM), measureMorpheme(FATHA), radicalMorpheme(SEEN)],
  }
}

function addAgreement(forms: PastBaseForms<MorphemeToken>): Record<PronounId, readonly MorphemeToken[]> {
  const { base, suffixedBase, feminineSingularDualBase, masculineDualBase, thirdPersonMasculinePluralBase } = forms
  return {
    '3ms': base,
    '3fs': [...feminineSingularDualBase, agreementMorpheme(TEH, SUKOON)],
    '3md': [...masculineDualBase, agreementMorpheme(ALIF)],
    '3fd': [...feminineSingularDualBase, agreementMorpheme(TEH, FATHA, ALIF)],
    '3mp': [...thirdPersonMasculinePluralBase, agreementMorpheme(WAW, ALIF)],
    '3fp': [...suffixedBase, agreementMorpheme(SUKOON, NOON, FATHA)],
    '1s': [...suffixedBase, agreementMorpheme(SUKOON, TEH, DAMMA)],
    '2ms': [...suffixedBase, agreementMorpheme(SUKOON, TEH, FATHA)],
    '2fs': [...suffixedBase, agreementMorpheme(SUKOON, TEH, KASRA)],
    '2d': [...suffixedBase, agreementMorpheme(SUKOON, TEH, DAMMA, MEEM, FATHA, ALIF)],
    '1p': [...suffixedBase, agreementMorpheme(SUKOON, NOON, FATHA, ALIF)],
    '2mp': [...suffixedBase, agreementMorpheme(SUKOON, TEH, DAMMA, MEEM, SUKOON)],
    '2fp': [...suffixedBase, agreementMorpheme(SUKOON, TEH, DAMMA, NOON, SHADDA, FATHA)],
  }
}

function derivePastFormIq(verb: QuadriliteralVerb): PastBaseForms<MorphemeToken> {
  const [c1, c2, c3, c4] = verb.rootTokens
  const stem = [
    radicalMorpheme(c1),
    measureMorpheme(FATHA),
    radicalMorpheme(c2),
    measureMorpheme(SUKOON),
    radicalMorpheme(c3),
    measureMorpheme(FATHA),
    radicalMorpheme(c4),
  ]

  return {
    ...buildForms(stem, c4),
    thirdPersonMasculinePluralBase: [...stem, measureMorpheme(DAMMA)],
  }
}

function derivePastFormIIq(verb: QuadriliteralVerb): PastBaseForms<MorphemeToken> {
  const [c1, c2, c3, c4] = verb.rootTokens
  return buildForms(
    [
      measureMorpheme(TEH, FATHA),
      radicalMorpheme(c1),
      measureMorpheme(FATHA),
      radicalMorpheme(c2),
      measureMorpheme(SUKOON),
      radicalMorpheme(c3),
      measureMorpheme(FATHA),
      radicalMorpheme(c4),
    ],
    c4,
  )
}

function derivePastFormIIIq(verb: QuadriliteralVerb): PastBaseForms<MorphemeToken> {
  const [c1, c2, c3, c4] = verb.rootTokens
  return buildForms(
    [
      measureMorpheme(ALIF, KASRA),
      radicalMorpheme(c1),
      measureMorpheme(SUKOON),
      radicalMorpheme(c2),
      measureMorpheme(FATHA, NOON, SUKOON),
      radicalMorpheme(c3),
      measureMorpheme(FATHA),
      radicalMorpheme(c4),
    ],
    c4,
  )
}

function derivePastFormIVq(verb: QuadriliteralVerb): PastBaseForms<MorphemeToken> {
  const [c1, c2, c3, c4] = verb.rootTokens
  const prefix = [
    measureMorpheme(ALIF, KASRA),
    radicalMorpheme(c1),
    measureMorpheme(SUKOON),
    radicalMorpheme(c2),
    measureMorpheme(FATHA),
    radicalMorpheme(c3),
  ]

  return {
    base: [
      ...prefix,
      measureMorpheme(FATHA),
      radicalMorpheme(c4),
      measureMorpheme(SUKOON),
      radicalMorpheme(c4),
      measureMorpheme(FATHA),
    ],
    suffixedBase: [
      ...prefix,
      measureMorpheme(SUKOON),
      radicalMorpheme(c4),
      measureMorpheme(FATHA),
      radicalMorpheme(c4),
    ],
    feminineSingularDualBase: [
      ...prefix,
      measureMorpheme(FATHA),
      radicalMorpheme(c4),
      measureMorpheme(SUKOON),
      radicalMorpheme(c4),
      measureMorpheme(FATHA),
    ],
    masculineDualBase: [
      ...prefix,
      measureMorpheme(FATHA),
      radicalMorpheme(c4),
      measureMorpheme(SUKOON),
      radicalMorpheme(c4),
      measureMorpheme(FATHA),
    ],
    thirdPersonMasculinePluralBase: [
      ...prefix,
      measureMorpheme(FATHA),
      radicalMorpheme(c4),
      measureMorpheme(SUKOON),
      radicalMorpheme(c4),
      measureMorpheme(DAMMA),
    ],
  }
}

function derivePastFormII(verb: NonFormIVerb): PastBaseForms<MorphemeToken> {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [
    radicalMorpheme(c1),
    measureMorpheme(FATHA),
    radicalMorpheme(c2),
    measureMorpheme(SHADDA),
    measureMorpheme(FATHA),
  ]

  if (c2.equals(YEH) && c3.equals(YEH))
    return {
      ...buildForms([...prefix, radicalMorpheme(ALIF)], c3),
      base: [...prefix, radicalMorpheme(ALIF)],
    }

  return buildForms([...prefix, radicalMorpheme(c3)], c3)
}

function derivePastFormIII(verb: NonFormIVerb): PastBaseForms<MorphemeToken> {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [radicalMorpheme(c1), measureMorpheme(FATHA, ALIF), radicalMorpheme(c2)]

  if (c2.equals(c3))
    return {
      ...buildForms([...prefix, measureMorpheme(SUKOON), radicalMorpheme(c3)], c3),
      suffixedBase: [...prefix, measureMorpheme(FATHA), radicalMorpheme(c3)],
    }

  return buildForms([...prefix, measureMorpheme(FATHA), radicalMorpheme(c3)], c3)
}

function derivePastFormIV(verb: NonFormIVerb): PastBaseForms<MorphemeToken> {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [measureMorpheme(ALIF_HAMZA, FATHA), radicalMorpheme(c1)]

  if (c2.equals(c3) && c3.isWeak)
    return {
      ...buildForms(
        [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(ALIF)],
        c3,
      ),
      base: [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(ALIF)],
      masculineDualBase: [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA)],
    }

  if (c2.equals(c3)) {
    return {
      base: [
        ...prefix,
        measureMorpheme(FATHA),
        radicalMorpheme(c2),
        measureMorpheme(SUKOON),
        radicalMorpheme(c3),
        measureMorpheme(FATHA),
      ],
      suffixedBase: [
        ...prefix,
        measureMorpheme(SUKOON),
        radicalMorpheme(c2),
        measureMorpheme(FATHA),
        radicalMorpheme(c3),
      ],
      feminineSingularDualBase: [
        ...prefix,
        measureMorpheme(FATHA),
        radicalMorpheme(c2),
        measureMorpheme(SUKOON),
        radicalMorpheme(c3),
        measureMorpheme(FATHA),
      ],
      masculineDualBase: [
        ...prefix,
        measureMorpheme(FATHA),
        radicalMorpheme(c2),
        measureMorpheme(SUKOON),
        radicalMorpheme(c3),
        measureMorpheme(FATHA),
      ],
      thirdPersonMasculinePluralBase: [
        ...prefix,
        measureMorpheme(FATHA),
        radicalMorpheme(c2),
        measureMorpheme(SUKOON),
        radicalMorpheme(c3),
        measureMorpheme(DAMMA),
      ],
    }
  }

  if (c2.isHamza && c3.isWeak) return buildForms([...prefix, measureMorpheme(FATHA), radicalMorpheme(c3)], YEH)

  if (c3.isWeak)
    return buildForms(
      [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)],
      YEH,
    )

  if (c2.isWeak) return buildForms([...prefix, measureMorpheme(FATHA), radicalMorpheme(ALIF), radicalMorpheme(c3)], c3)

  return buildForms(
    [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)],
    c3,
  )
}

function derivePastFormV(verb: NonFormIVerb): PastBaseForms<MorphemeToken> {
  const [c1, c2, c3] = verb.rootTokens

  return buildForms(
    [
      measureMorpheme(TEH, FATHA),
      radicalMorpheme(c1),
      measureMorpheme(FATHA),
      radicalMorpheme(c2),
      measureMorpheme(SHADDA),
      measureMorpheme(FATHA),
      radicalMorpheme(c3),
    ],
    c3,
  )
}

function derivePastFormVI(verb: NonFormIVerb): PastBaseForms<MorphemeToken> {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [measureMorpheme(TEH, FATHA), radicalMorpheme(c1)]

  if (c2.equals(c3))
    return {
      ...buildForms(
        [...prefix, measureMorpheme(FATHA, ALIF), radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)],
        c3,
      ),
      suffixedBase: [
        ...prefix,
        measureMorpheme(FATHA, ALIF),
        radicalMorpheme(c2),
        measureMorpheme(FATHA),
        radicalMorpheme(c3),
      ],
    }

  return buildForms(
    [...prefix, measureMorpheme(FATHA, ALIF), radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)],
    c3.isWeak ? YEH : c3,
  )
}

function derivePastFormVII(verb: NonFormIVerb): PastBaseForms<MorphemeToken> {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [measureMorpheme(ALIF, KASRA, NOON, SUKOON), radicalMorpheme(c1), measureMorpheme(FATHA)]

  if (c2.equals(c3))
    return {
      ...buildForms([...prefix, radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)], c3),
      suffixedBase: [...prefix, radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)],
    }

  if (c2.isWeak && c3.isWeak)
    return {
      ...buildForms([...prefix, radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)], c3),
      thirdPersonMasculinePluralBase: prefix,
    }

  if (c2.isWeak) return buildForms([...prefix, radicalMorpheme(ALIF), radicalMorpheme(c3)], c3)

  return buildForms([...prefix, radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)], c3)
}

function derivePastFormVIII(verb: NonFormIVerb): PastBaseForms<MorphemeToken> {
  const [c1, c2, c3] = verb.rootTokens
  const infix = resolveFormVIIIInfixConsonant(c1)
  const prefix = [measureMorpheme(ALIF, KASRA), radicalMorpheme(c1), measureMorpheme(SUKOON, infix, FATHA)]

  if (c2.equals(c3))
    return {
      ...buildForms([...prefix, radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)], c3),
      suffixedBase: [...prefix, radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)],
    }

  if (c1.equals(WAW) || c1.isHamza)
    return buildForms(
      [
        measureMorpheme(ALIF, KASRA, infix, SHADDA, FATHA),
        radicalMorpheme(c2),
        measureMorpheme(FATHA),
        radicalMorpheme(c3),
      ],
      c3,
    )

  if (c2.isWeak && c3.isWeak)
    return buildForms([...prefix, radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)], YEH)

  if (c2.equals(YEH))
    return {
      ...buildForms([...prefix, radicalMorpheme(ALIF), radicalMorpheme(c3)], c3),
      suffixedBase: [...prefix, radicalMorpheme(c3)],
    }

  if (c2.isWeak && !infix.equals(DAL)) return buildForms([...prefix, radicalMorpheme(ALIF), radicalMorpheme(c3)], c3)

  if (c3.isWeak) return buildForms([...prefix, radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)], YEH)

  return buildForms([...prefix, radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)], c3)
}

function derivePastFormIX(verb: NonFormIVerb): PastBaseForms<MorphemeToken> {
  const [c1, c2, c3] = verb.rootTokens
  return {
    ...buildForms(
      [
        measureMorpheme(ALIF, KASRA),
        radicalMorpheme(c1),
        measureMorpheme(SUKOON),
        radicalMorpheme(c2),
        measureMorpheme(FATHA),
        radicalMorpheme(c3),
        measureMorpheme(SUKOON),
        radicalMorpheme(c3),
      ],
      c3,
    ),
    suffixedBase: [
      measureMorpheme(ALIF, KASRA),
      radicalMorpheme(c1),
      measureMorpheme(SUKOON),
      radicalMorpheme(c2),
      measureMorpheme(FATHA),
      radicalMorpheme(c3),
      measureMorpheme(FATHA),
      radicalMorpheme(c3),
    ],
  }
}

function derivePastFormX(verb: NonFormIVerb): PastBaseForms<MorphemeToken> {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [measureMorpheme(ALIF, KASRA, SEEN, SUKOON, TEH, FATHA), radicalMorpheme(c1)]

  if (c2.isWeak && c3.isWeak) return buildForms([...prefix, measureMorpheme(FATHA), radicalMorpheme(ALIF)], c3)

  if (c2.equals(c3))
    return {
      ...buildForms(
        [...prefix, measureMorpheme(FATHA), radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)],
        c3,
      ),
      suffixedBase: [
        ...prefix,
        measureMorpheme(SUKOON),
        radicalMorpheme(c2),
        measureMorpheme(FATHA),
        radicalMorpheme(c3),
      ],
    }

  if (c3.isWeak)
    return buildForms(
      [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)],
      YEH,
    )

  if (c2.isWeak)
    return {
      ...buildForms([...prefix, measureMorpheme(FATHA), radicalMorpheme(ALIF), radicalMorpheme(c3)], c3),
      suffixedBase: [...prefix, measureMorpheme(FATHA), radicalMorpheme(c3)],
    }

  return buildForms(
    [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)],
    c3,
  )
}

function derivePastForms(verb: Verb): PastBaseForms<MorphemeToken> {
  if (isQuadriliteralVerb(verb)) {
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

  throw new Error('Unsupported verb')
}
