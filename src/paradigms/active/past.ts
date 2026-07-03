import { mapRecord } from '../../primitives/objects.ts'
import { formIPastVowel, isFormIPastVowel } from '../form-i-vowels'
import type { PronounId } from '../pronouns'
import {
  ALIF,
  ALIF_HAMZA,
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
  WAW,
  YEH,
} from '../tokens.ts'
import type { FormIVerb, NonFormIVerb, QuadriliteralVerb, Verb } from '../verbs'
import { agreementMorpheme, type Morpheme, measureMorpheme, radicalMorpheme, Word } from '../word.ts'
import { contractActivePastDefectiveRoot } from './past-defective'
import { contractActivePastGeminateRoot } from './past-geminate'

function isQuadriliteralVerb(verb: Verb): verb is QuadriliteralVerb {
  return verb.rootTokens.length === 4
}

type PastBaseForms = [vowelStem: readonly Morpheme[], consonantStem?: readonly Morpheme[]]

export function conjugatePast(verb: Verb): Record<PronounId, Word> {
  const isQuadriliteral = isQuadriliteralVerb(verb)
  return mapRecord(addAgreement(derivePastForms(verb)), (morphemes) => {
    // Gemination contraction only applies to triliterals.
    return new Word(
      isQuadriliteral
        ? contractActivePastDefectiveRoot(morphemes)
        : contractActivePastGeminateRoot(contractActivePastDefectiveRoot(morphemes)),
    )
  })
}

function derivePastFormI(verb: FormIVerb): PastBaseForms {
  if (verb.root === 'ليس') return conjugateLaysa()

  const [c1, c2, c3] = verb.rootTokens
  const pastVowel = formIPastVowel(verb)
  const prefix = [radicalMorpheme(c1), measureMorpheme(FATHA), radicalMorpheme(c2)]

  if (c3.isWeak && pastVowel.equals(KASRA)) return [[...prefix, measureMorpheme(KASRA), radicalMorpheme(YEH)]]

  if (c3.isWeak) return [[...prefix, measureMorpheme(pastVowel), radicalMorpheme(c3)]]

  if (c2.equals(YEH))
    return [
      [radicalMorpheme(c1), measureMorpheme(FATHA), radicalMorpheme(ALIF), radicalMorpheme(c3)],
      [radicalMorpheme(c1), measureMorpheme(KASRA), radicalMorpheme(c3)],
    ]

  if (c2.isWeak && !isFormIPastVowel(verb, KASRA))
    return [
      [radicalMorpheme(c1), measureMorpheme(FATHA), radicalMorpheme(ALIF), radicalMorpheme(c3)],
      [radicalMorpheme(c1), measureMorpheme(DAMMA), radicalMorpheme(c3)],
    ]

  return [[...prefix, measureMorpheme(pastVowel), radicalMorpheme(c3)]]
}

function conjugateLaysa(): PastBaseForms {
  return [
    [
      radicalMorpheme(LAM),
      measureMorpheme(FATHA),
      radicalMorpheme(YEH),
      measureMorpheme(SUKOON),
      radicalMorpheme(SEEN),
    ],
    [radicalMorpheme(LAM), measureMorpheme(FATHA), radicalMorpheme(SEEN)],
  ]
}

function addAgreement(forms: PastBaseForms): Record<PronounId, readonly Morpheme[]> {
  const [vowelStem, consonantStem = vowelStem] = forms
  return {
    '1s': [...consonantStem, agreementMorpheme(SUKOON, TEH, DAMMA)],
    '2ms': [...consonantStem, agreementMorpheme(SUKOON, TEH, FATHA)],
    '2fs': [...consonantStem, agreementMorpheme(SUKOON, TEH, KASRA)],
    '3ms': [...vowelStem, measureMorpheme(FATHA)],
    '3fs': [...vowelStem, measureMorpheme(FATHA), agreementMorpheme(TEH, SUKOON)],
    '2d': [...consonantStem, agreementMorpheme(SUKOON, TEH, DAMMA, MEEM, FATHA, ALIF)],
    '3md': [...vowelStem, measureMorpheme(FATHA), agreementMorpheme(ALIF)],
    '3fd': [...vowelStem, measureMorpheme(FATHA), agreementMorpheme(TEH, FATHA, ALIF)],
    '1p': [...consonantStem, agreementMorpheme(SUKOON, NOON, FATHA, ALIF)],
    '2mp': [...consonantStem, agreementMorpheme(SUKOON, TEH, DAMMA, MEEM, SUKOON)],
    '2fp': [...consonantStem, agreementMorpheme(SUKOON, TEH, DAMMA, NOON, SHADDA, FATHA)],
    '3mp': [...vowelStem, measureMorpheme(DAMMA), agreementMorpheme(WAW, ALIF)],
    '3fp': [...consonantStem, agreementMorpheme(SUKOON, NOON, FATHA)],
  }
}

function derivePastFormIq(verb: QuadriliteralVerb): PastBaseForms {
  const [c1, c2, c3, c4] = verb.rootTokens
  return [
    [
      radicalMorpheme(c1),
      measureMorpheme(FATHA),
      radicalMorpheme(c2),
      measureMorpheme(SUKOON),
      radicalMorpheme(c3),
      measureMorpheme(FATHA),
      radicalMorpheme(c4),
    ],
  ]
}

function derivePastFormIIq(verb: QuadriliteralVerb): PastBaseForms {
  const [c1, c2, c3, c4] = verb.rootTokens
  return [
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
  ]
}

function derivePastFormIIIq(verb: QuadriliteralVerb): PastBaseForms {
  const [c1, c2, c3, c4] = verb.rootTokens
  return [
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
  ]
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

  return [
    [...prefix, measureMorpheme(FATHA), radicalMorpheme(c4), measureMorpheme(SUKOON), radicalMorpheme(c4)],
    [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c4), measureMorpheme(FATHA), radicalMorpheme(c4)],
  ]
}

function derivePastFormII(verb: NonFormIVerb): PastBaseForms {
  const [c1, c2, c3] = verb.rootTokens
  return [
    [
      radicalMorpheme(c1),
      measureMorpheme(FATHA),
      radicalMorpheme(c2),
      measureMorpheme(SHADDA),
      measureMorpheme(FATHA),
      radicalMorpheme(c3),
    ],
  ]
}

function derivePastFormIII(verb: NonFormIVerb): PastBaseForms {
  const [c1, c2, c3] = verb.rootTokens
  return [
    [
      radicalMorpheme(c1),
      measureMorpheme(FATHA, ALIF),
      radicalMorpheme(c2),
      measureMorpheme(FATHA),
      radicalMorpheme(c3),
    ],
  ]
}

function derivePastFormIV(verb: NonFormIVerb): PastBaseForms {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [measureMorpheme(ALIF_HAMZA, FATHA), radicalMorpheme(c1)]

  if (c2.equals(c3) && c3.isWeak)
    return [[...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)]]

  if (c2.equals(c3))
    return [
      [...prefix, measureMorpheme(FATHA), radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)],
      [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)],
    ]

  if (c2.isHamza && c3.isWeak) return [[...prefix, measureMorpheme(FATHA), radicalMorpheme(YEH)]]

  if (c3.isWeak)
    return [[...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(YEH)]]

  if (c2.isWeak) return [[...prefix, measureMorpheme(FATHA), radicalMorpheme(ALIF), radicalMorpheme(c3)]]

  return [[...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)]]
}

function derivePastFormV(verb: NonFormIVerb): PastBaseForms {
  const [c1, c2, c3] = verb.rootTokens
  return [
    [
      measureMorpheme(TEH, FATHA),
      radicalMorpheme(c1),
      measureMorpheme(FATHA),
      radicalMorpheme(c2),
      measureMorpheme(SHADDA),
      measureMorpheme(FATHA),
      radicalMorpheme(c3),
    ],
  ]
}

function derivePastFormVI(verb: NonFormIVerb): PastBaseForms {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [measureMorpheme(TEH, FATHA), radicalMorpheme(c1)]

  return [
    c3.isWeak
      ? [...prefix, measureMorpheme(...longVowelA), radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(YEH)]
      : [...prefix, measureMorpheme(FATHA, ALIF), radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)],
  ]
}

function derivePastFormVII(verb: NonFormIVerb): PastBaseForms {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [measureMorpheme(ALIF, KASRA, NOON, SUKOON), radicalMorpheme(c1), measureMorpheme(FATHA)]

  if (c2.isWeak && c3.isWeak) return [[...prefix, radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)]]

  if (c2.isWeak) return [[...prefix, radicalMorpheme(ALIF), radicalMorpheme(c3)]]

  return [[...prefix, radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)]]
}

function derivePastFormVIII(verb: NonFormIVerb): PastBaseForms {
  const [c1, c2, c3] = verb.rootTokens
  const infix = resolveFormVIIIInfixConsonant(c1)
  const prefix = [measureMorpheme(ALIF, KASRA), radicalMorpheme(c1), measureMorpheme(SUKOON, infix, FATHA)]

  if (c2.equals(c3)) return [[...prefix, radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)]]

  if (c1.equals(WAW) || c1.isHamza)
    return [
      [
        measureMorpheme(ALIF, KASRA, infix, SHADDA, FATHA),
        radicalMorpheme(c2),
        measureMorpheme(FATHA),
        radicalMorpheme(c3),
      ],
    ]

  if (c2.isWeak && c3.isWeak) return [[...prefix, radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(YEH)]]

  if (c2.equals(YEH))
    return [
      [...prefix, radicalMorpheme(ALIF), radicalMorpheme(c3)],
      [...prefix, radicalMorpheme(c3)],
    ]

  if (c2.isWeak && !infix.equals(DAL)) return [[...prefix, radicalMorpheme(ALIF), radicalMorpheme(c3)]]

  if (c3.isWeak) return [[...prefix, radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(YEH)]]

  return [[...prefix, radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)]]
}

function derivePastFormIX(verb: NonFormIVerb): PastBaseForms {
  const [c1, c2, c3] = verb.rootTokens
  return [
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
  ]
}

function derivePastFormX(verb: NonFormIVerb): PastBaseForms {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [measureMorpheme(ALIF, KASRA, SEEN, SUKOON, TEH, FATHA), radicalMorpheme(c1)]

  if (c2.isWeak && c3.isWeak) return [[...prefix, measureMorpheme(FATHA), radicalMorpheme(c3)]]

  if (c2.equals(c3))
    return [
      [...prefix, measureMorpheme(FATHA), radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)],
      [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)],
    ]

  if (c3.isWeak)
    return [[...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(YEH)]]

  if (c2.isWeak)
    return [
      [...prefix, measureMorpheme(...longVowelA), radicalMorpheme(c3)],
      [...prefix, measureMorpheme(FATHA), radicalMorpheme(c3)],
    ]

  return [[...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)]]
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
