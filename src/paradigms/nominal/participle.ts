import {
  ALIF,
  ALIF_MAQSURA,
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
  TANWEEN_FATHA,
  TANWEEN_KASRA,
  TEH,
  type Token,
  YEH,
} from '../tokens'
import { isQuadriliteralVerb, type TriliteralVerb, type Verb } from '../verbs'
import { type Morpheme, measureMorpheme, radicalMorpheme } from '../word'

function participleStem(verb: TriliteralVerb): readonly Morpheme[] {
  const [c1, c2] = verb.rootTokens
  switch (verb.form) {
    case 2:
      return [
        measureMorpheme(MEEM, DAMMA),
        radicalMorpheme(c1),
        measureMorpheme(FATHA),
        radicalMorpheme(c2),
        measureMorpheme(SHADDA),
      ]
    case 3:
      return [measureMorpheme(MEEM, DAMMA), radicalMorpheme(c1), measureMorpheme(FATHA, ALIF)]
    case 4:
      return [measureMorpheme(MEEM, DAMMA), radicalMorpheme(c1)]
    case 5:
      return [measureMorpheme(MEEM, DAMMA, TEH, FATHA), radicalMorpheme(c1), measureMorpheme(FATHA)]
    case 6:
      return [measureMorpheme(MEEM, DAMMA, TEH, FATHA), radicalMorpheme(c1), measureMorpheme(FATHA, ALIF)]
    case 7:
      return [measureMorpheme(MEEM, DAMMA, NOON, SUKOON), radicalMorpheme(c1), measureMorpheme(FATHA)]
    case 10:
      return [measureMorpheme(MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA), radicalMorpheme(c1)]
    default:
      return []
  }
}

export function deriveParticiple(verb: Verb, vowel: Token): readonly Morpheme[] {
  if (isQuadriliteralVerb(verb)) {
    const [q1, q2, q3, q4] = verb.rootTokens
    switch (verb.form) {
      case 1:
        return [
          measureMorpheme(MEEM, DAMMA),
          radicalMorpheme(q1),
          measureMorpheme(FATHA),
          radicalMorpheme(q2),
          measureMorpheme(SUKOON),
          radicalMorpheme(q3),
          measureMorpheme(vowel),
          radicalMorpheme(q4),
        ]
      case 2:
        return [
          measureMorpheme(MEEM, DAMMA, TEH, FATHA),
          radicalMorpheme(q1),
          measureMorpheme(FATHA),
          radicalMorpheme(q2),
          measureMorpheme(SUKOON),
          radicalMorpheme(q3),
          measureMorpheme(vowel),
          radicalMorpheme(q4),
        ]
      case 3:
        return [
          measureMorpheme(MEEM, DAMMA),
          radicalMorpheme(q1),
          measureMorpheme(SUKOON),
          radicalMorpheme(q2),
          measureMorpheme(FATHA, NOON, SUKOON),
          radicalMorpheme(q3),
          measureMorpheme(vowel),
          radicalMorpheme(q4),
        ]
      case 4:
        return [
          measureMorpheme(MEEM, DAMMA),
          radicalMorpheme(q1),
          measureMorpheme(SUKOON),
          radicalMorpheme(q2),
          measureMorpheme(FATHA),
          radicalMorpheme(q3),
          measureMorpheme(vowel),
          radicalMorpheme(q4),
          measureMorpheme(SHADDA),
        ]
    }
  }

  const [c1, c2, c3] = verb.rootTokens
  const stem = participleStem(verb)
  const isActive = vowel.equals(KASRA)
  const defectiveSuffix = isActive ? measureMorpheme(TANWEEN_KASRA) : measureMorpheme(TANWEEN_FATHA, ALIF_MAQSURA)

  switch (verb.form) {
    case 1: {
      return []
    }

    case 2: {
      if (c3.isWeak) return [...stem, defectiveSuffix]
      return [...stem, measureMorpheme(vowel), radicalMorpheme(c3)]
    }

    case 3: {
      if (c3.isWeak) return [...stem, radicalMorpheme(c2), defectiveSuffix]
      if (c2.equals(c3)) return [...stem, radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)]
      return [...stem, radicalMorpheme(c2), measureMorpheme(vowel), radicalMorpheme(c3)]
    }

    case 4: {
      if (c2.isHamza) return [...stem, defectiveSuffix]
      if (c3.isWeak) return [...stem, measureMorpheme(SUKOON), radicalMorpheme(c2), defectiveSuffix]
      if (c2.isWeak)
        return [...stem, measureMorpheme(vowel), radicalMorpheme(isActive ? YEH : ALIF), radicalMorpheme(c3)]
      if (c2.equals(c3))
        return [...stem, measureMorpheme(vowel), radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)]
      return [...stem, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(vowel), radicalMorpheme(c3)]
    }

    case 5: {
      if (isActive && c3.isWeak && c1.isWeak) return [...stem, radicalMorpheme(c2), measureMorpheme(TANWEEN_KASRA)]
      if (c3.isWeak) return [...stem, radicalMorpheme(c2), measureMorpheme(SHADDA), defectiveSuffix]
      return [...stem, radicalMorpheme(c2), measureMorpheme(SHADDA, vowel), radicalMorpheme(c3)]
    }

    case 6: {
      if (c2.equals(c3)) return [...stem, radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)]
      if (c3.isWeak) return [...stem, radicalMorpheme(c2), defectiveSuffix]
      return [...stem, radicalMorpheme(c2), measureMorpheme(vowel), radicalMorpheme(c3)]
    }

    case 7: {
      if (c2.equals(c3)) return [...stem, radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)]
      if (c3.isWeak)
        return [
          ...stem,
          radicalMorpheme(c2),
          isActive ? measureMorpheme(TANWEEN_KASRA) : measureMorpheme(FATHA, ALIF_MAQSURA),
        ]

      if (c2.isWeak) return [...stem, measureMorpheme(ALIF), radicalMorpheme(c3)]
      return [...stem, radicalMorpheme(c2), measureMorpheme(vowel), radicalMorpheme(c3)]
    }

    case 8: {
      const infix = resolveFormVIIIInfixConsonant(c1)
      const isInitialWeakOrHamza = c1.isWeak || c1.isHamza
      const prefix: readonly Morpheme[] = [
        measureMorpheme(MEEM, DAMMA),
        radicalMorpheme(c1),
        measureMorpheme(SUKOON, infix, FATHA),
      ]
      const weakPrefix: readonly Morpheme[] = [
        measureMorpheme(MEEM, DAMMA),
        measureMorpheme(infix, SUKOON, infix, FATHA),
      ]

      if (c2.equals(c3)) return [...prefix, radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)]
      if (isInitialWeakOrHamza && c3.isWeak) return [...weakPrefix, radicalMorpheme(c2), defectiveSuffix]
      if (isInitialWeakOrHamza) return [...weakPrefix, radicalMorpheme(c2), measureMorpheme(vowel), radicalMorpheme(c3)]
      if (c3.isWeak) return [...prefix, radicalMorpheme(c2), defectiveSuffix]
      if (c2.equals(YEH) || (c2.isWeak && !infix.equals(DAL)))
        return [
          measureMorpheme(MEEM, DAMMA),
          radicalMorpheme(c1),
          measureMorpheme(SUKOON, infix, FATHA, ALIF),
          radicalMorpheme(c3),
        ]
      return [...prefix, radicalMorpheme(c2), measureMorpheme(vowel), radicalMorpheme(c3)]
    }

    case 9: {
      if (!isActive) return []
      return [
        measureMorpheme(MEEM, DAMMA),
        radicalMorpheme(c1),
        measureMorpheme(SUKOON),
        radicalMorpheme(c2),
        measureMorpheme(FATHA),
        radicalMorpheme(c3),
        measureMorpheme(SUKOON),
        radicalMorpheme(c3),
      ]
    }

    case 10: {
      if (c3.isWeak) return [...stem, measureMorpheme(SUKOON), radicalMorpheme(c2), defectiveSuffix]
      if (c2.isWeak)
        return [...stem, measureMorpheme(vowel), radicalMorpheme(isActive ? YEH : ALIF), radicalMorpheme(c3)]
      if (c2.equals(c3))
        return [...stem, measureMorpheme(vowel), radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)]
      return [...stem, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(vowel), radicalMorpheme(c3)]
    }
  }
}
