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
  longVowelA,
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
import { agreementMorpheme, type Morpheme, measureMorpheme, radicalMorpheme, Word } from '../word.ts'

function isQuadriliteralVerb(verb: Verb): verb is QuadriliteralVerb {
  return verb.rootTokens.length === 4
}

interface PastBaseForms {
  lemma: readonly Morpheme[]
  stem: readonly Morpheme[]
  feminineSingularDualStem: readonly Morpheme[]
  masculineDualStem: readonly Morpheme[]
  thirdPersonMasculinePluralStem: readonly Morpheme[]
}

export function conjugatePast(verb: Verb): Record<PronounId, Word> {
  return mapRecord(addAgreement(derivePastForms(verb)), (morphemes) => new Word(morphemes))
}

function buildForms(lemmaStem: readonly Morpheme[], conjugatedStem?: readonly Morpheme[]): PastBaseForms {
  const stem = conjugatedStem ?? lemmaStem
  return {
    lemma: [...lemmaStem, measureMorpheme(FATHA)],
    stem,
    feminineSingularDualStem: [...lemmaStem, measureMorpheme(FATHA)],
    masculineDualStem: [...lemmaStem, measureMorpheme(FATHA)],
    thirdPersonMasculinePluralStem: [...lemmaStem, measureMorpheme(DAMMA)],
  }
}

function buildDefectiveForms(defectiveStem: readonly Morpheme[], c3: Token): PastBaseForms {
  return {
    lemma: [...defectiveStem, radicalMorpheme(c3.equals(WAW) ? ALIF : ALIF_MAQSURA)],
    stem: [...defectiveStem, radicalMorpheme(c3)],
    feminineSingularDualStem: defectiveStem,
    masculineDualStem: [...defectiveStem, radicalMorpheme(c3), measureMorpheme(c3.equals(WAW) ? SUKOON : FATHA)],
    thirdPersonMasculinePluralStem: defectiveStem,
  }
}

function derivePastFormI(verb: FormIVerb): PastBaseForms {
  if (verb.root === 'ليس') return conjugateLaysa()

  const [c1, c2, c3] = verb.rootTokens
  const pastVowel = formIPastVowel(verb)
  const prefix = [radicalMorpheme(c1), measureMorpheme(FATHA), radicalMorpheme(c2)]

  if (c2.equals(c3))
    return buildForms(
      [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c3)],
      [...prefix, measureMorpheme(pastVowel), radicalMorpheme(c3)],
    )

  if (c3.isWeak && pastVowel.equals(KASRA))
    return {
      ...buildForms([...prefix, measureMorpheme(KASRA), radicalMorpheme(YEH)]),
      thirdPersonMasculinePluralStem: [...prefix, measureMorpheme(DAMMA)],
    }

  if (c3.isWeak) return buildDefectiveForms([...prefix, measureMorpheme(pastVowel)], c3)

  if (c2.equals(YEH))
    return buildForms(
      [radicalMorpheme(c1), measureMorpheme(FATHA), radicalMorpheme(ALIF), radicalMorpheme(c3)],
      [radicalMorpheme(c1), measureMorpheme(KASRA), radicalMorpheme(c3)],
    )

  if (c2.isWeak && !isFormIPastVowel(verb, KASRA))
    return buildForms(
      [radicalMorpheme(c1), measureMorpheme(FATHA), radicalMorpheme(ALIF), radicalMorpheme(c3)],
      [radicalMorpheme(c1), measureMorpheme(DAMMA), radicalMorpheme(c3)],
    )

  return buildForms([...prefix, measureMorpheme(pastVowel), radicalMorpheme(c3)])
}

function conjugateLaysa(): PastBaseForms {
  return buildForms(
    [
      radicalMorpheme(LAM),
      measureMorpheme(FATHA),
      radicalMorpheme(YEH),
      measureMorpheme(SUKOON),
      radicalMorpheme(SEEN),
    ],
    [radicalMorpheme(LAM), measureMorpheme(FATHA), radicalMorpheme(SEEN)],
  )
}

function addAgreement(forms: PastBaseForms): Record<PronounId, readonly Morpheme[]> {
  const { lemma, stem, feminineSingularDualStem, masculineDualStem, thirdPersonMasculinePluralStem } = forms
  return {
    '1s': [...stem, agreementMorpheme(SUKOON, TEH, DAMMA)],
    '2ms': [...stem, agreementMorpheme(SUKOON, TEH, FATHA)],
    '2fs': [...stem, agreementMorpheme(SUKOON, TEH, KASRA)],
    '3ms': lemma,
    '3fs': [...feminineSingularDualStem, agreementMorpheme(TEH, SUKOON)],
    '2d': [...stem, agreementMorpheme(SUKOON, TEH, DAMMA, MEEM, FATHA, ALIF)],
    '3md': [...masculineDualStem, agreementMorpheme(ALIF)],
    '3fd': [...feminineSingularDualStem, agreementMorpheme(TEH, FATHA, ALIF)],
    '1p': [...stem, agreementMorpheme(SUKOON, NOON, FATHA, ALIF)],
    '2mp': [...stem, agreementMorpheme(SUKOON, TEH, DAMMA, MEEM, SUKOON)],
    '2fp': [...stem, agreementMorpheme(SUKOON, TEH, DAMMA, NOON, SHADDA, FATHA)],
    '3mp': [...thirdPersonMasculinePluralStem, agreementMorpheme(WAW, ALIF)],
    '3fp': [...stem, agreementMorpheme(SUKOON, NOON, FATHA)],
  }
}

function derivePastFormIq(verb: QuadriliteralVerb): PastBaseForms {
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

  return buildForms(stem)
}

function derivePastFormIIq(verb: QuadriliteralVerb): PastBaseForms {
  const [c1, c2, c3, c4] = verb.rootTokens
  return buildForms([
    measureMorpheme(TEH, FATHA),
    radicalMorpheme(c1),
    measureMorpheme(FATHA),
    radicalMorpheme(c2),
    measureMorpheme(SUKOON),
    radicalMorpheme(c3),
    measureMorpheme(FATHA),
    radicalMorpheme(c4),
  ])
}

function derivePastFormIIIq(verb: QuadriliteralVerb): PastBaseForms {
  const [c1, c2, c3, c4] = verb.rootTokens
  return buildForms([
    measureMorpheme(ALIF, KASRA),
    radicalMorpheme(c1),
    measureMorpheme(SUKOON),
    radicalMorpheme(c2),
    measureMorpheme(FATHA, NOON, SUKOON),
    radicalMorpheme(c3),
    measureMorpheme(FATHA),
    radicalMorpheme(c4),
  ])
}

function derivePastFormIVq(verb: QuadriliteralVerb): PastBaseForms {
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
    lemma: [
      ...prefix,
      measureMorpheme(FATHA),
      radicalMorpheme(c4),
      measureMorpheme(SUKOON),
      radicalMorpheme(c4),
      measureMorpheme(FATHA),
    ],
    stem: [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c4), measureMorpheme(FATHA), radicalMorpheme(c4)],
    feminineSingularDualStem: [
      ...prefix,
      measureMorpheme(FATHA),
      radicalMorpheme(c4),
      measureMorpheme(SUKOON),
      radicalMorpheme(c4),
      measureMorpheme(FATHA),
    ],
    masculineDualStem: [
      ...prefix,
      measureMorpheme(FATHA),
      radicalMorpheme(c4),
      measureMorpheme(SUKOON),
      radicalMorpheme(c4),
      measureMorpheme(FATHA),
    ],
    thirdPersonMasculinePluralStem: [
      ...prefix,
      measureMorpheme(FATHA),
      radicalMorpheme(c4),
      measureMorpheme(SUKOON),
      radicalMorpheme(c4),
      measureMorpheme(DAMMA),
    ],
  }
}

function derivePastFormII(verb: NonFormIVerb): PastBaseForms {
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
      ...buildDefectiveForms(prefix, c3),
      lemma: [...prefix, radicalMorpheme(ALIF)],
    }

  return c3.isWeak ? buildDefectiveForms(prefix, c3) : buildForms([...prefix, radicalMorpheme(c3)])
}

function derivePastFormIII(verb: NonFormIVerb): PastBaseForms {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [radicalMorpheme(c1), measureMorpheme(FATHA, ALIF), radicalMorpheme(c2)]

  if (c2.equals(c3))
    return buildForms(
      [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c3)],
      [...prefix, measureMorpheme(FATHA), radicalMorpheme(c3)],
    )

  return c3.isWeak
    ? buildDefectiveForms([...prefix, measureMorpheme(FATHA)], c3)
    : buildForms([...prefix, measureMorpheme(FATHA), radicalMorpheme(c3)])
}

function derivePastFormIV(verb: NonFormIVerb): PastBaseForms {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [measureMorpheme(ALIF_HAMZA, FATHA), radicalMorpheme(c1)]

  if (c2.equals(c3) && c3.isWeak)
    return {
      ...buildDefectiveForms([...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA)], c3),
      lemma: [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(ALIF)],
      masculineDualStem: [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA)],
    }

  if (c2.equals(c3)) {
    return {
      lemma: [
        ...prefix,
        measureMorpheme(FATHA),
        radicalMorpheme(c2),
        measureMorpheme(SUKOON),
        radicalMorpheme(c3),
        measureMorpheme(FATHA),
      ],
      stem: [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)],
      feminineSingularDualStem: [
        ...prefix,
        measureMorpheme(FATHA),
        radicalMorpheme(c2),
        measureMorpheme(SUKOON),
        radicalMorpheme(c3),
        measureMorpheme(FATHA),
      ],
      masculineDualStem: [
        ...prefix,
        measureMorpheme(FATHA),
        radicalMorpheme(c2),
        measureMorpheme(SUKOON),
        radicalMorpheme(c3),
        measureMorpheme(FATHA),
      ],
      thirdPersonMasculinePluralStem: [
        ...prefix,
        measureMorpheme(FATHA),
        radicalMorpheme(c2),
        measureMorpheme(SUKOON),
        radicalMorpheme(c3),
        measureMorpheme(DAMMA),
      ],
    }
  }

  if (c2.isHamza && c3.isWeak) return buildDefectiveForms([...prefix, measureMorpheme(FATHA)], YEH)

  if (c3.isWeak)
    return buildDefectiveForms([...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA)], YEH)

  if (c2.isWeak) return buildForms([...prefix, measureMorpheme(FATHA), radicalMorpheme(ALIF), radicalMorpheme(c3)])

  return buildForms([
    ...prefix,
    measureMorpheme(SUKOON),
    radicalMorpheme(c2),
    measureMorpheme(FATHA),
    radicalMorpheme(c3),
  ])
}

function derivePastFormV(verb: NonFormIVerb): PastBaseForms {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [
    measureMorpheme(TEH, FATHA),
    radicalMorpheme(c1),
    measureMorpheme(FATHA),
    radicalMorpheme(c2),
    measureMorpheme(SHADDA),
    measureMorpheme(FATHA),
  ]
  return c3.isWeak ? buildDefectiveForms(prefix, c3) : buildForms([...prefix, radicalMorpheme(c3)])
}

function derivePastFormVI(verb: NonFormIVerb): PastBaseForms {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [measureMorpheme(TEH, FATHA), radicalMorpheme(c1)]

  if (c2.equals(c3))
    return buildForms(
      [...prefix, measureMorpheme(FATHA, ALIF), radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)],
      [...prefix, measureMorpheme(FATHA, ALIF), radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)],
    )

  return c3.isWeak
    ? buildDefectiveForms([...prefix, measureMorpheme(...longVowelA), radicalMorpheme(c2), measureMorpheme(FATHA)], YEH)
    : buildForms([
        ...prefix,
        measureMorpheme(FATHA, ALIF),
        radicalMorpheme(c2),
        measureMorpheme(FATHA),
        radicalMorpheme(c3),
      ])
}

function derivePastFormVII(verb: NonFormIVerb): PastBaseForms {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [measureMorpheme(ALIF, KASRA, NOON, SUKOON), radicalMorpheme(c1), measureMorpheme(FATHA)]

  if (c2.equals(c3))
    return buildForms(
      [...prefix, radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)],
      [...prefix, radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)],
    )

  if (c2.isWeak && c3.isWeak)
    return {
      ...buildDefectiveForms([...prefix, radicalMorpheme(c2), measureMorpheme(FATHA)], c3),
      thirdPersonMasculinePluralStem: prefix,
    }

  if (c2.isWeak) return buildForms([...prefix, radicalMorpheme(ALIF), radicalMorpheme(c3)])

  return c3.isWeak
    ? buildDefectiveForms([...prefix, radicalMorpheme(c2), measureMorpheme(FATHA)], c3)
    : buildForms([...prefix, radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)])
}

function derivePastFormVIII(verb: NonFormIVerb): PastBaseForms {
  const [c1, c2, c3] = verb.rootTokens
  const infix = resolveFormVIIIInfixConsonant(c1)
  const prefix = [measureMorpheme(ALIF, KASRA), radicalMorpheme(c1), measureMorpheme(SUKOON, infix, FATHA)]

  if (c2.equals(c3))
    return buildForms(
      [...prefix, radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)],
      [...prefix, radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)],
    )

  if (c1.equals(WAW) || c1.isHamza)
    return c3.isWeak
      ? buildDefectiveForms(
          [measureMorpheme(ALIF, KASRA, infix, SHADDA, FATHA), radicalMorpheme(c2), measureMorpheme(FATHA)],
          c3,
        )
      : buildForms([
          measureMorpheme(ALIF, KASRA, infix, SHADDA, FATHA),
          radicalMorpheme(c2),
          measureMorpheme(FATHA),
          radicalMorpheme(c3),
        ])

  if (c2.isWeak && c3.isWeak) return buildDefectiveForms([...prefix, radicalMorpheme(c2), measureMorpheme(FATHA)], YEH)

  if (c2.equals(YEH))
    return buildForms([...prefix, radicalMorpheme(ALIF), radicalMorpheme(c3)], [...prefix, radicalMorpheme(c3)])

  if (c2.isWeak && !infix.equals(DAL)) return buildForms([...prefix, radicalMorpheme(ALIF), radicalMorpheme(c3)])

  if (c3.isWeak) return buildDefectiveForms([...prefix, radicalMorpheme(c2), measureMorpheme(FATHA)], YEH)

  return buildForms([...prefix, radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)])
}

function derivePastFormIX(verb: NonFormIVerb): PastBaseForms {
  const [c1, c2, c3] = verb.rootTokens
  return buildForms(
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
    [
      measureMorpheme(ALIF, KASRA),
      radicalMorpheme(c1),
      measureMorpheme(SUKOON),
      radicalMorpheme(c2),
      measureMorpheme(FATHA),
      radicalMorpheme(c3),
      measureMorpheme(FATHA),
      radicalMorpheme(c3),
    ],
  )
}

function derivePastFormX(verb: NonFormIVerb): PastBaseForms {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [measureMorpheme(ALIF, KASRA, SEEN, SUKOON, TEH, FATHA), radicalMorpheme(c1)]

  if (c2.isWeak && c3.isWeak) return buildDefectiveForms([...prefix, measureMorpheme(FATHA)], c3)

  if (c2.equals(c3))
    return buildForms(
      [...prefix, measureMorpheme(FATHA), radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)],
      [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)],
    )

  if (c3.isWeak)
    return buildDefectiveForms([...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA)], YEH)

  if (c2.isWeak)
    return buildForms(
      [...prefix, measureMorpheme(...longVowelA), radicalMorpheme(c3)],
      [...prefix, measureMorpheme(FATHA), radicalMorpheme(c3)],
    )

  return buildForms([
    ...prefix,
    measureMorpheme(SUKOON),
    radicalMorpheme(c2),
    measureMorpheme(FATHA),
    radicalMorpheme(c3),
  ])
}

function derivePastForms(verb: Verb): PastBaseForms {
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
