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
  finalize,
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
  ZAY,
} from '../tokens.ts'
import type { FormIVerb, NonFormIVerb, Verb } from '../verbs'
import { agreementMorpheme, type MorphemeToken, measureMorpheme, radicalMorpheme, Word } from '../word.ts'

interface PastBaseForms<T extends Token | MorphemeToken> {
  base: readonly T[]
  suffixedBase: readonly T[]
  feminineSingularDualBase: readonly T[]
  masculineDualBase: readonly T[]
  thirdPersonMasculinePluralBase: readonly T[]
}

export function conjugatePast(verb: Verb): Record<PronounId, string> {
  return mapRecord(addAgreement(backwardsCompatibleBaseForms(derivePastForms(verb))), (ms) =>
    finalize(ms.flatMap((m) => m.tokens)),
  )
}

function buildForms(stem: readonly Token[], defective?: Token): PastBaseForms<Token> {
  if (!defective?.isWeak)
    return {
      base: [...stem, FATHA],
      suffixedBase: stem,
      feminineSingularDualBase: [...stem, FATHA],
      masculineDualBase: [...stem, FATHA],
      thirdPersonMasculinePluralBase: [...stem, DAMMA],
    }

  const normalizedStem = stem.slice(0, -2)

  if (defective.equals(YEH))
    return {
      base: [...normalizedStem, FATHA, ALIF_MAQSURA],
      suffixedBase: [...normalizedStem, FATHA, YEH],
      feminineSingularDualBase: [...normalizedStem, FATHA],
      masculineDualBase: [...normalizedStem, FATHA, YEH, FATHA],
      thirdPersonMasculinePluralBase: [...normalizedStem, FATHA],
    }

  return {
    base: [...normalizedStem, FATHA, ALIF],
    suffixedBase: [...normalizedStem, FATHA, WAW],
    feminineSingularDualBase: [...normalizedStem, FATHA],
    masculineDualBase: [...normalizedStem, FATHA, WAW, SUKOON],
    thirdPersonMasculinePluralBase: [...normalizedStem, FATHA],
  }
}

function buildMorphemeForms(stem: readonly MorphemeToken[], defective?: Token): PastBaseForms<MorphemeToken> {
  if (!defective?.isWeak)
    return {
      base: [...stem, measureMorpheme([FATHA])],
      suffixedBase: stem,
      feminineSingularDualBase: [...stem, measureMorpheme([FATHA])],
      masculineDualBase: [...stem, measureMorpheme([FATHA])],
      thirdPersonMasculinePluralBase: [...stem, measureMorpheme([DAMMA])],
    }

  const ns = stem.slice(0, -2)

  if (defective.equals(YEH))
    return {
      base: [...ns, measureMorpheme([FATHA]), radicalMorpheme(ALIF_MAQSURA)],
      suffixedBase: [...ns, measureMorpheme([FATHA]), radicalMorpheme(YEH)],
      feminineSingularDualBase: [...ns, measureMorpheme([FATHA])],
      masculineDualBase: [...ns, measureMorpheme([FATHA]), radicalMorpheme(YEH), measureMorpheme([FATHA])],
      thirdPersonMasculinePluralBase: [...ns, measureMorpheme([FATHA])],
    }

  return {
    base: [...ns, measureMorpheme([FATHA]), radicalMorpheme(ALIF)],
    suffixedBase: [...ns, measureMorpheme([FATHA]), radicalMorpheme(WAW)],
    feminineSingularDualBase: [...ns, measureMorpheme([FATHA])],
    masculineDualBase: [...ns, measureMorpheme([FATHA]), radicalMorpheme(WAW), measureMorpheme([SUKOON])],
    thirdPersonMasculinePluralBase: [...ns, measureMorpheme([FATHA])],
  }
}

function derivePastFormI(verb: FormIVerb): PastBaseForms<MorphemeToken> {
  if (verb.root === 'ليس') return conjugateLaysa()
  if (verb.root === 'زيل') return conjugateZala()

  const [c1, c2, c3] = verb.rootTokens
  const pastVowel = formIPastVowel(verb)
  const prefix = [radicalMorpheme(c1), measureMorpheme([FATHA]), radicalMorpheme(c2)]

  if (c2.equals(c3))
    return {
      ...buildMorphemeForms([...prefix, measureMorpheme([SUKOON]), radicalMorpheme(c3)], c3),
      suffixedBase: [...prefix, measureMorpheme([pastVowel]), radicalMorpheme(c3)],
    }

  if (c3.isWeak && pastVowel.equals(KASRA))
    return {
      ...buildMorphemeForms([...prefix, measureMorpheme([KASRA]), radicalMorpheme(YEH)]),
      thirdPersonMasculinePluralBase: [...prefix, measureMorpheme([DAMMA])],
    }

  if (c3.isWeak) return buildMorphemeForms([...prefix, measureMorpheme([pastVowel]), radicalMorpheme(c3)], c3)

  if (c2.equals(YEH))
    return {
      ...buildMorphemeForms(
        [radicalMorpheme(c1), measureMorpheme([FATHA]), radicalMorpheme(ALIF), radicalMorpheme(c3)],
        c3,
      ),
      suffixedBase: [radicalMorpheme(c1), measureMorpheme([KASRA]), radicalMorpheme(c3)],
    }

  if (c2.isWeak && !isFormIPastVowel(verb, KASRA))
    return {
      ...buildMorphemeForms(
        [radicalMorpheme(c1), measureMorpheme([FATHA]), radicalMorpheme(ALIF), radicalMorpheme(c3)],
        c3,
      ),
      suffixedBase: [radicalMorpheme(c1), measureMorpheme([DAMMA]), radicalMorpheme(c3)],
    }

  return buildMorphemeForms([...prefix, measureMorpheme([pastVowel]), radicalMorpheme(c3)], c3)
}

function conjugateLaysa(): PastBaseForms<MorphemeToken> {
  return {
    ...buildMorphemeForms([
      radicalMorpheme(LAM),
      measureMorpheme([FATHA]),
      radicalMorpheme(YEH),
      measureMorpheme([SUKOON]),
      radicalMorpheme(SEEN),
    ]),
    suffixedBase: [radicalMorpheme(LAM), measureMorpheme([FATHA]), radicalMorpheme(SEEN)],
  }
}

function conjugateZala(): PastBaseForms<MorphemeToken> {
  return {
    ...buildMorphemeForms([
      radicalMorpheme(ZAY),
      measureMorpheme([FATHA]),
      radicalMorpheme(ALIF),
      radicalMorpheme(LAM),
    ]),
    suffixedBase: [radicalMorpheme(ZAY), measureMorpheme([KASRA]), radicalMorpheme(LAM)],
  }
}

function backwardsCompatibleBaseForms(forms: PastBaseForms<Token>): PastBaseForms<MorphemeToken> {
  // For backwards compatibility, it doesn't matter what the morpheme is.
  return {
    base: [measureMorpheme(forms.base)],
    suffixedBase: [measureMorpheme(forms.suffixedBase)],
    feminineSingularDualBase: [measureMorpheme(forms.feminineSingularDualBase)],
    masculineDualBase: [measureMorpheme(forms.masculineDualBase)],
    thirdPersonMasculinePluralBase: [measureMorpheme(forms.thirdPersonMasculinePluralBase)],
  }
}

function addAgreement(forms: PastBaseForms<MorphemeToken>): Record<PronounId, readonly MorphemeToken[]> {
  const { base, suffixedBase, feminineSingularDualBase, masculineDualBase, thirdPersonMasculinePluralBase } = forms
  return {
    '3ms': base,
    '3fs': [...feminineSingularDualBase, agreementMorpheme([TEH, SUKOON])],
    '3md': [...masculineDualBase, agreementMorpheme([ALIF])],
    '3fd': [...feminineSingularDualBase, agreementMorpheme([TEH, FATHA, ALIF])],
    '3mp': [...thirdPersonMasculinePluralBase, agreementMorpheme([WAW, ALIF])],
    '3fp': [...suffixedBase, agreementMorpheme([SUKOON, NOON, FATHA])],
    '1s': [...suffixedBase, agreementMorpheme([SUKOON, TEH, DAMMA])],
    '2ms': [...suffixedBase, agreementMorpheme([SUKOON, TEH, FATHA])],
    '2fs': [...suffixedBase, agreementMorpheme([SUKOON, TEH, KASRA])],
    '2d': [...suffixedBase, agreementMorpheme([SUKOON, TEH, DAMMA, MEEM, FATHA, ALIF])],
    '1p': [...suffixedBase, agreementMorpheme([SUKOON, NOON, FATHA, ALIF])],
    '2mp': [...suffixedBase, agreementMorpheme([SUKOON, TEH, DAMMA, MEEM, SUKOON])],
    '2fp': [...suffixedBase, agreementMorpheme([SUKOON, TEH, DAMMA, NOON, SHADDA, FATHA])],
  }
}

export function conjugatePastFormI(verb: FormIVerb): Record<PronounId, Word> {
  return mapRecord(addAgreement(derivePastFormI(verb)), (morphemes) => new Word(morphemes))
}

function derivePastFormIq(verb: Verb): PastBaseForms<Token> {
  const [c1, c2, c3, c4] = verb.rootTokens
  const stem = [c1, FATHA, c2, SUKOON, c3, FATHA, c4]

  return {
    ...buildForms(stem, c4),
    thirdPersonMasculinePluralBase: [...stem.slice(0, -1), c4, DAMMA],
  }
}

function derivePastFormIIq(verb: Verb): PastBaseForms<Token> {
  const [c1, c2, c3, c4] = verb.rootTokens
  return buildForms([TEH, FATHA, c1, FATHA, c2, SUKOON, c3, FATHA, c4], c4)
}

function derivePastFormIIIq(verb: Verb): PastBaseForms<Token> {
  const [c1, c2, c3, c4] = verb.rootTokens
  return buildForms([ALIF, KASRA, c1, SUKOON, c2, FATHA, NOON, SUKOON, c3, FATHA, c4], c4)
}

function derivePastFormIVq(verb: Verb): PastBaseForms<Token> {
  const [c1, c2, c3, c4] = verb.rootTokens
  const prefix = [ALIF, KASRA, c1, SUKOON, c2, FATHA, c3]

  return {
    base: [...prefix, FATHA, c4, SUKOON, c4, FATHA],
    suffixedBase: [...prefix, SUKOON, c4, FATHA, c4],
    feminineSingularDualBase: [...prefix, FATHA, c4, SUKOON, c4, FATHA],
    masculineDualBase: [...prefix, FATHA, c4, SUKOON, c4, FATHA],
    thirdPersonMasculinePluralBase: [...prefix, FATHA, c4, SUKOON, c4, DAMMA],
  }
}

function derivePastFormII(verb: NonFormIVerb): PastBaseForms<Token> {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [c1, FATHA, c2, SHADDA, FATHA]

  if (c2.equals(YEH) && c3.equals(YEH))
    return {
      ...buildForms([...prefix, ALIF], c3),
      base: [...prefix, ALIF],
    }

  return buildForms([...prefix, c3], c3)
}

function derivePastFormIII(verb: NonFormIVerb): PastBaseForms<Token> {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [c1, FATHA, ALIF, c2]

  if (c2.equals(c3))
    return {
      ...buildForms([...prefix, SUKOON, c3], c3),
      suffixedBase: [...prefix, FATHA, c3],
    }

  return buildForms([...prefix, FATHA, c3], c3)
}

function derivePastFormIV(verb: NonFormIVerb): PastBaseForms<Token> {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [ALIF_HAMZA, FATHA, c1]

  if (c2.equals(c3) && c3.isWeak)
    return {
      ...buildForms([...prefix, SUKOON, c2, FATHA, ALIF], c3),
      base: [...prefix, SUKOON, c2, FATHA, ALIF],
      masculineDualBase: [...prefix, SUKOON, c2, FATHA],
    }

  if (c2.equals(c3)) {
    return {
      base: [...prefix, FATHA, c2, SUKOON, c3, FATHA],
      suffixedBase: [...prefix, SUKOON, c2, FATHA, c3],
      feminineSingularDualBase: [...prefix, FATHA, c2, SUKOON, c3, FATHA],
      masculineDualBase: [...prefix, FATHA, c2, SUKOON, c3, FATHA],
      thirdPersonMasculinePluralBase: [...prefix, FATHA, c2, SUKOON, c3, DAMMA],
    }
  }

  if (c2.isHamza && c3.isWeak) return buildForms([...prefix, FATHA, c3], YEH)

  if (c3.isWeak) return buildForms([...prefix, SUKOON, c2, FATHA, c3], YEH)

  if (c2.isWeak) return buildForms([...prefix, FATHA, ALIF, c3], c3)

  return buildForms([...prefix, SUKOON, c2, FATHA, c3], c3)
}

function derivePastFormV(verb: NonFormIVerb): PastBaseForms<Token> {
  const [c1, c2, c3] = verb.rootTokens

  return buildForms([TEH, FATHA, c1, FATHA, c2, SHADDA, FATHA, c3], c3)
}

function derivePastFormVI(verb: NonFormIVerb): PastBaseForms<Token> {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [TEH, FATHA, c1]

  if (c2.equals(c3))
    return {
      ...buildForms([...prefix, FATHA, ALIF, c2, SUKOON, c3], c3),
      suffixedBase: [...prefix, FATHA, ALIF, c2, FATHA, c3],
    }

  return buildForms([...prefix, FATHA, ALIF, c2, FATHA, c3], c3.isWeak ? YEH : c3)
}

function derivePastFormVII(verb: NonFormIVerb): PastBaseForms<Token> {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [ALIF, KASRA, NOON, SUKOON, c1, FATHA]

  if (c2.equals(c3))
    return {
      ...buildForms([...prefix, c2, SUKOON, c3], c3),
      suffixedBase: [...prefix, c2, FATHA, c3],
    }

  if (c2.isWeak && c3.isWeak)
    return {
      ...buildForms([...prefix, c2, FATHA, c3], c3),
      thirdPersonMasculinePluralBase: prefix,
    }

  if (c2.isWeak) return buildForms([...prefix, ALIF, c3], c3)

  return buildForms([...prefix, c2, FATHA, c3], c3)
}

function derivePastFormVIII(verb: NonFormIVerb): PastBaseForms<Token> {
  const [c1, c2, c3] = verb.rootTokens
  const infix = resolveFormVIIIInfixConsonant(c1)
  const prefix = [ALIF, KASRA, c1, SUKOON, infix, FATHA]

  if (c2.equals(c3))
    return {
      ...buildForms([...prefix, c2, SUKOON, c3], c3),
      suffixedBase: [...prefix, c2, FATHA, c3],
    }

  if (c1.equals(WAW) || c1.isHamza) return buildForms([ALIF, KASRA, infix, SHADDA, FATHA, c2, FATHA, c3], c3)

  if (c2.isWeak && c3.isWeak) return buildForms([...prefix, c2, FATHA, c3], YEH)

  if (c2.equals(YEH))
    return {
      ...buildForms([...prefix, ALIF, c3], c3),
      suffixedBase: [...prefix, c3],
    }

  if (c2.isWeak && !infix.equals(DAL)) return buildForms([...prefix, ALIF, c3], c3)

  if (c3.isWeak) return buildForms([...prefix, c2, FATHA, c3], YEH)

  return buildForms([...prefix, c2, FATHA, c3], c3)
}

function derivePastFormIX(verb: NonFormIVerb): PastBaseForms<Token> {
  const [c1, c2, c3] = verb.rootTokens
  return {
    ...buildForms([ALIF, KASRA, c1, SUKOON, c2, FATHA, c3, SUKOON, c3], c3),
    suffixedBase: [ALIF, KASRA, c1, SUKOON, c2, FATHA, c3, FATHA, c3],
  }
}

function derivePastFormX(verb: NonFormIVerb): PastBaseForms<Token> {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [ALIF, KASRA, SEEN, SUKOON, TEH, FATHA, c1]

  if (c2.isWeak && c3.isWeak) return buildForms([...prefix, FATHA, ALIF], c3)

  if (c2.equals(c3))
    return {
      ...buildForms([...prefix, FATHA, c2, SUKOON, c3], c3),
      suffixedBase: [...prefix, SUKOON, c2, FATHA, c3],
    }

  if (c3.isWeak) return buildForms([...prefix, SUKOON, c2, FATHA, c3], YEH)

  if (c2.isWeak)
    return {
      ...buildForms([...prefix, FATHA, ALIF, c3], c3),
      suffixedBase: [...prefix, FATHA, c3],
    }

  return buildForms([...prefix, SUKOON, c2, FATHA, c3], c3)
}

function flattenFormMorphemes(forms: PastBaseForms<MorphemeToken>): PastBaseForms<Token> {
  return mapRecord(forms, (morphemes) => morphemes.flatMap((morpheme) => morpheme.tokens))
}

function derivePastForms(verb: Verb): PastBaseForms<Token> {
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
      return flattenFormMorphemes(derivePastFormI(verb))
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
