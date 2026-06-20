import {
  ALIF,
  ALIF_MAQSURA,
  DAL,
  DAMMA,
  FATHA,
  HAMZA,
  KASRA,
  longVowel,
  MEEM,
  NOON,
  resolveFormVIIIInfixConsonant,
  SHADDA,
  SUKOON,
  TANWEEN_FATHA,
  TEH,
  WAW,
  YEH,
} from '../tokens'
import { isQuadriliteralVerb, isTriliteralFormIVerb, type Verb } from '../verbs'
import { type MorphemeToken, measureMorpheme, radicalMorpheme, Word } from '../word'
import { participleStem } from './participle-active'

export function derivePassiveParticiple(verb: Verb): Word {
  if (verb.noPassiveParticiple) return new Word([])

  const morphemes = (() => {
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
            measureMorpheme(FATHA),
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
            measureMorpheme(FATHA),
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
            measureMorpheme(FATHA),
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
            measureMorpheme(FATHA),
            radicalMorpheme(q4),
            measureMorpheme(SHADDA),
          ]
      }
    }

    const [c1, c2, c3] = verb.rootTokens
    const stem = participleStem(verb)

    switch (verb.form) {
      case 1: {
        if (!isTriliteralFormIVerb(verb)) return []
        const prefix: readonly MorphemeToken[] = [measureMorpheme(MEEM, FATHA), radicalMorpheme(c1)]

        if (c3.isWeak)
          return [
            ...prefix,
            measureMorpheme(SUKOON),
            radicalMorpheme(c2),
            measureMorpheme(...longVowel(c3.equals(YEH) ? KASRA : DAMMA), SHADDA),
          ]

        if (c2.equals(WAW))
          return verb.presentHollow === 'uncontracted'
            ? [
                ...prefix,
                measureMorpheme(SUKOON),
                radicalMorpheme(c2),
                measureMorpheme(...longVowel(DAMMA)),
                radicalMorpheme(c3),
              ]
            : [...prefix, measureMorpheme(...longVowel(DAMMA)), radicalMorpheme(c3)]

        if (c2.equals(YEH)) return [...prefix, measureMorpheme(...longVowel(KASRA)), radicalMorpheme(c3)]

        return [
          ...prefix,
          measureMorpheme(SUKOON),
          radicalMorpheme(c2),
          measureMorpheme(...longVowel(c3.equals(YEH) ? KASRA : DAMMA)),
          radicalMorpheme(c3),
        ]
      }

      case 2: {
        if (c3.isWeak) return [...stem, measureMorpheme(TANWEEN_FATHA, ALIF_MAQSURA)]
        return [...stem, measureMorpheme(FATHA), radicalMorpheme(c3)]
      }

      case 3: {
        if (c3.isWeak) return [...stem, radicalMorpheme(c2), measureMorpheme(TANWEEN_FATHA, ALIF_MAQSURA)]
        if (c2.equals(c3)) return [...stem, radicalMorpheme(c2), measureMorpheme(SHADDA)]
        return [...stem, radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)]
      }

      case 4: {
        if (c2.isHamza) return [...stem, measureMorpheme(TANWEEN_FATHA, ALIF_MAQSURA)]
        if (c3.isWeak)
          return [...stem, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(TANWEEN_FATHA, ALIF_MAQSURA)]
        if (c2.isWeak) return [...stem, measureMorpheme(FATHA, ALIF), radicalMorpheme(c3)]
        if (c2.equals(c3)) return [...stem, measureMorpheme(FATHA), radicalMorpheme(c2), measureMorpheme(SHADDA)]
        return [...stem, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)]
      }

      case 5: {
        if (c3.isWeak) return [...stem, radicalMorpheme(c2), measureMorpheme(TANWEEN_FATHA, SHADDA, ALIF_MAQSURA)]
        return [...stem, radicalMorpheme(c2), measureMorpheme(SHADDA, FATHA), radicalMorpheme(c3)]
      }

      case 6: {
        if (c2.equals(c3)) return [...stem, radicalMorpheme(c2), measureMorpheme(SHADDA)]
        if (c3.isWeak)
          return [...stem, radicalMorpheme(c2.isHamza ? HAMZA : c2), measureMorpheme(TANWEEN_FATHA, ALIF_MAQSURA)]
        return [...stem, radicalMorpheme(c2.isHamza ? HAMZA : c2), measureMorpheme(FATHA), radicalMorpheme(c3)]
      }

      case 7: {
        if (c2.equals(c3)) return [...stem, radicalMorpheme(c2), measureMorpheme(SHADDA)]
        if (c3.isWeak) return [...stem, radicalMorpheme(c2), measureMorpheme(FATHA, ALIF_MAQSURA)]
        if (c2.isWeak) return [...stem, measureMorpheme(ALIF), radicalMorpheme(c3)]
        return [...stem, radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)]
      }

      case 8: {
        const infix = resolveFormVIIIInfixConsonant(c1)
        const isInitialWeakOrHamza = c1.isWeak || c1.isHamza
        const prefix: readonly MorphemeToken[] = [measureMorpheme(MEEM, DAMMA)]

        if (c2.equals(c3))
          return [
            ...prefix,
            radicalMorpheme(c1),
            measureMorpheme(SUKOON, infix, FATHA),
            radicalMorpheme(c2),
            measureMorpheme(SHADDA),
          ]
        if (isInitialWeakOrHamza && c3.isWeak)
          return [
            ...prefix,
            measureMorpheme(infix, SHADDA, FATHA),
            radicalMorpheme(c2),
            measureMorpheme(TANWEEN_FATHA, ALIF_MAQSURA),
          ]
        if (isInitialWeakOrHamza)
          return [
            ...prefix,
            measureMorpheme(infix, SHADDA, FATHA),
            radicalMorpheme(c2),
            measureMorpheme(FATHA),
            radicalMorpheme(c3),
          ]
        if (c3.isWeak)
          return [
            ...prefix,
            radicalMorpheme(c1),
            measureMorpheme(SUKOON, infix, FATHA),
            radicalMorpheme(c2),
            measureMorpheme(TANWEEN_FATHA, ALIF_MAQSURA),
          ]
        if (c2.equals(YEH) || (c2.isWeak && !infix.equals(DAL)))
          return [...prefix, radicalMorpheme(c1), measureMorpheme(SUKOON, infix, FATHA, ALIF), radicalMorpheme(c3)]
        return [
          ...prefix,
          radicalMorpheme(c1),
          measureMorpheme(SUKOON, infix, FATHA),
          radicalMorpheme(c2),
          measureMorpheme(FATHA),
          radicalMorpheme(c3),
        ]
      }

      case 9: {
        return []
      }

      case 10: {
        if (c3.isWeak)
          return [...stem, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(TANWEEN_FATHA, ALIF_MAQSURA)]
        if (c2.isWeak) return [...stem, measureMorpheme(FATHA, ALIF), radicalMorpheme(c3)]
        if (c2.equals(c3)) return [...stem, measureMorpheme(FATHA), radicalMorpheme(c2), measureMorpheme(SHADDA)]
        return [...stem, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)]
      }
    }
  })()

  return new Word(morphemes)
}
