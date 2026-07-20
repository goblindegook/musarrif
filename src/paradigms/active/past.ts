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
  WAW,
  YEH,
} from '../tokens.ts'
import type { FormIVerb, NonFormIVerb, QuadriliteralVerb, Verb } from '../verbs'
import { agreementMorpheme, type Morpheme, measureMorpheme, radicalMorpheme, Word } from '../word.ts'

function isQuadriliteralVerb(verb: Verb): verb is QuadriliteralVerb {
  return verb.rootTokens.length === 4
}

type PastBaseForms = [vowelStem: readonly Morpheme[], consonantStem?: readonly Morpheme[]]

export function conjugatePast(verb: Verb): Record<PronounId, Word> {
  const isQuadriliteral = isQuadriliteralVerb(verb)
  return mapRecord(addAgreement(derivePastForms(verb)), (morphemes) => {
    // Gemination and hollow contraction only apply to triliterals.
    return new Word(
      isQuadriliteral
        ? contractDefectiveRoot(morphemes)
        : contractActivePastHollowRoot(contractActivePastGeminateRoot(contractDefectiveRoot(morphemes))),
    )
  })
}

function addAgreement(forms: PastBaseForms): Record<PronounId, readonly Morpheme[]> {
  const [vowelStem, consonantStem = vowelStem] = forms
  return {
    '1s': [...consonantStem, measureMorpheme(SUKOON), agreementMorpheme(TEH, DAMMA)],
    '2ms': [...consonantStem, measureMorpheme(SUKOON), agreementMorpheme(TEH, FATHA)],
    '2fs': [...consonantStem, measureMorpheme(SUKOON), agreementMorpheme(TEH, KASRA)],
    '3ms': [...vowelStem, measureMorpheme(FATHA)],
    '3fs': [...vowelStem, measureMorpheme(FATHA), agreementMorpheme(TEH, SUKOON)],
    '2d': [...consonantStem, measureMorpheme(SUKOON), agreementMorpheme(TEH, DAMMA, MEEM, FATHA, ALIF)],
    '3md': [...vowelStem, measureMorpheme(FATHA), agreementMorpheme(ALIF)],
    '3fd': [...vowelStem, measureMorpheme(FATHA), agreementMorpheme(TEH, FATHA, ALIF)],
    '1p': [...consonantStem, measureMorpheme(SUKOON), agreementMorpheme(NOON, FATHA, ALIF)],
    '2mp': [...consonantStem, measureMorpheme(SUKOON), agreementMorpheme(TEH, DAMMA, MEEM, SUKOON)],
    '2fp': [...consonantStem, measureMorpheme(SUKOON), agreementMorpheme(TEH, DAMMA, NOON, SHADDA, FATHA)],
    '3mp': [...vowelStem, measureMorpheme(DAMMA), agreementMorpheme(WAW, ALIF)],
    '3fp': [...consonantStem, measureMorpheme(SUKOON), agreementMorpheme(NOON, FATHA)],
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

function derivePastFormI(verb: FormIVerb): PastBaseForms {
  if (verb.root === 'ليس') return conjugateLaysa()

  const [c1, c2, c3] = verb.rootTokens
  const pastVowel = formIPastVowel(verb)
  const prefix = [radicalMorpheme(c1), measureMorpheme(FATHA), radicalMorpheme(c2)]

  if (c3.isWeak) return [[...prefix, measureMorpheme(pastVowel), radicalMorpheme(c3)]]

  if (c2.equals(YEH) || (c2.isWeak && !isFormIPastVowel(verb, KASRA))) return [[...prefix, radicalMorpheme(c3)]]

  return [[...prefix, measureMorpheme(pastVowel), radicalMorpheme(c3)]]
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

  if (c2.isWeak)
    return [
      [...prefix, measureMorpheme(FATHA), radicalMorpheme(ALIF), radicalMorpheme(c3)],
      [...prefix, measureMorpheme(FATHA), radicalMorpheme(c3)],
    ]

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

  if (c2.isWeak && !infix.equals(DAL))
    return [
      [...prefix, radicalMorpheme(ALIF), radicalMorpheme(c3)],
      [...prefix, radicalMorpheme(c3)],
    ]

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

function findDefectiveRadicalIndex(morphemes: readonly Morpheme[]): number {
  return morphemes.findLastIndex((m) => m.role === 'radical' && (m.equals([WAW]) || m.equals([YEH])))
}

function findPrecedingRadical(morphemes: readonly Morpheme[], index: number): Morpheme | undefined {
  let i = index - 1
  while (i >= 0 && morphemes[i].role === 'measure') i--
  return morphemes.at(i)
}

function contractDefectiveRoot(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  const index = findDefectiveRadicalIndex(morphemes)
  if (index < 1) return morphemes

  const before = morphemes[index - 1].tokens[0]
  const c3 = morphemes[index].tokens[0]
  const after = morphemes[index + 1].tokens[0]
  const suffix = morphemes[index + 2]

  // Elide kasra + c3:
  if (before.equals(KASRA) && after.equals(DAMMA)) return morphemes.toSpliced(index - 1, 2)

  // Elide sukoon after kasra + c3:
  if (before.equals(KASRA) && after.equals(SUKOON)) return morphemes.toSpliced(index + 1, 1)

  if (before.equals(KASRA)) return morphemes

  // 3ms elides c3 and replaces it with alif or alif maqsura:
  if (after.equals(FATHA) && suffix == null) {
    return [
      ...morphemes.slice(0, index),
      radicalMorpheme(c3.equals(WAW) || findPrecedingRadical(morphemes, index)?.equals([c3]) ? ALIF : ALIF_MAQSURA),
    ]
  }

  // 3fs and 3fd elide defective root with fatha:
  if (after.equals(FATHA) && suffix.startsWith([TEH])) return morphemes.toSpliced(index, 2)

  // 3mp elides defective root and suffix long vowel (i.e. damma + waw + alif) gains a sukoon:
  if (after.equals(DAMMA)) return [...morphemes.slice(0, index), agreementMorpheme(WAW, SUKOON, ALIF)]

  return morphemes
}

// Standard-shape past forms (I, III, VI, VII, VIII, IX) always build their geminate stem
// uncontracted (C2 + vowel + C3), same shape a consonant-initial suffix needs (مَدَدْتُ). Before a
// vowel-initial suffix the linking vowel becomes sukoon so the existing shaddaPass (word.ts) can
// merge the identical radicals into a shadda (مَدَّ) — mirroring how a real speaker only contracts
// when a vowel follows. Forms IV and X are excluded: their linking vowel migrates between the
// C1-C2 and C2-C3 slots across contexts rather than just appearing/disappearing between C2-C3, so
// they keep their own inline two-variant logic. Weak radicals are excluded too: a doubled weak
// letter (e.g. حَيِيَ) doesn't contract the same way strong gemination does.
function contractActivePastGeminateRoot(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  const index = morphemes.findIndex(
    (_, i) =>
      morphemes[i - 1]?.role === 'radical' &&
      !morphemes[i - 1].some((t) => t.isWeak) &&
      morphemes[i + 1]?.role === 'radical' &&
      morphemes[i + 1].equals(morphemes[i - 1]),
  )
  if (index === -1) return morphemes

  if (morphemes[index + 2]?.startsWith([SUKOON])) return morphemes

  return [...morphemes.slice(0, index), measureMorpheme(SUKOON), ...morphemes.slice(index + 1)]
}

function findHollowRadicalIndex(morphemes: readonly Morpheme[]): number {
  return morphemes.findIndex((_, i) => morphemes[i - 1]?.equals([FATHA]) && morphemes[i + 1]?.role === 'radical')
}

// Form I hollow roots (قَالَ، بَاعَ) build their bare stem as C1 + FATHA + weak-C2 + C3, keeping the
// original radical rather than pre-selecting the long-vowel or dropped-radical shape a given
// pronoun's suffix will need. Before a vowel-initial suffix the weak radical becomes the long
// vowel ALIF (قَالَ). Other forms never reach this shape — their own weak-C2 branches already spell
// the contracted ALIF directly, since only Form I past has a hollow alternation at all.
function contractHollowRadicalBeforeVowelSuffix(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  const index = findHollowRadicalIndex(morphemes)
  if (index === -1 || morphemes[index + 2]?.equals([SUKOON])) return morphemes

  return [...morphemes.slice(0, index), radicalMorpheme(ALIF), ...morphemes.slice(index + 1)]
}

// Before a consonant-initial suffix the weak radical is dropped entirely and C1's FATHA shifts to
// the vowel the radical's own identity implies — KASRA for a يّ-medial root (بِعْتُ), DAMMA otherwise
// (قُلْتُ) — regardless of the verb's own pastVowel, matching what the original two-variant branches
// always produced.
function elideHollowRadicalBeforeConsonantSuffix(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  const index = findHollowRadicalIndex(morphemes)
  if (index === -1 || !morphemes[index + 2]?.startsWith([SUKOON])) return morphemes

  const vowel = morphemes[index].equals([YEH]) ? KASRA : DAMMA
  return [...morphemes.slice(0, index - 1), measureMorpheme(vowel), ...morphemes.slice(index + 1)]
}

function contractActivePastHollowRoot(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  return contractHollowRadicalBeforeVowelSuffix(elideHollowRadicalBeforeConsonantSuffix(morphemes))
}
