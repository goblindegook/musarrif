import { isFormIPastVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_MAQSURA,
  DAL,
  DAMMA,
  FATHA,
  finalize,
  HAMZA,
  KASRA,
  longVowel,
  MEEM,
  NOON,
  Root,
  resolveFormVIIIInfixConsonant,
  SHADDA,
  SUKOON,
  TANWEEN_FATHA,
  TEH,
  WAW,
  YEH,
} from '../letters'
import type { Verb } from '../verbs'
import { participleStem } from './participle-active'

export function derivePassiveParticiple(verb: Verb): string {
  const result = (() => {
    const letters = Root(verb.root)

    if (letters.length === 4) {
      const [q1, q2, q3, q4] = letters
      switch (verb.form) {
        case 1:
          return [MEEM, DAMMA, q1, FATHA, q2, SUKOON, q3, FATHA, q4]
        case 2:
          return [MEEM, DAMMA, TEH, FATHA, q1, FATHA, q2, SUKOON, q3, FATHA, q4]
        case 3:
          return [MEEM, DAMMA, q1, SUKOON, q2, FATHA, NOON, SUKOON, q3, FATHA, q4]
        case 4:
          return [MEEM, DAMMA, q1, SUKOON, q2, FATHA, q3, FATHA, q4, SHADDA]
        default:
          return []
      }
    }

    const [c1, c2, c3] = letters

    const stem = participleStem(verb)

    switch (verb.form) {
      case 1: {
        const prefix = [MEEM, FATHA, c1]

        if (c3.isWeak) return [...prefix, SUKOON, c2, ...longVowel(c3.is(YEH) ? KASRA : DAMMA), SHADDA]

        if (c2.isWeak && !isFormIPastVowel(verb, KASRA))
          return [...prefix, ...longVowel(c2.is(WAW) ? DAMMA : KASRA), c3]

        return [...prefix, SUKOON, c2, ...longVowel(c3.is(YEH) ? KASRA : DAMMA), c3]
      }

      case 2: {
        if (c3.isWeak) return [...stem, TANWEEN_FATHA, ALIF_MAQSURA]

        return [...stem, FATHA, c3]
      }

      case 3: {
        if (c3.isWeak) return [...stem, c2, TANWEEN_FATHA, ALIF_MAQSURA]

        if (c2.equals(c3)) return [...stem, c2, SHADDA]

        return [...stem, c2, FATHA, c3]
      }

      case 4: {
        if (c2.isHamza) return [...stem, TANWEEN_FATHA, ALIF_MAQSURA]

        if (c3.isWeak) return [...stem, SUKOON, c2, TANWEEN_FATHA, ALIF_MAQSURA]

        if (c2.isWeak) return [...stem, FATHA, ALIF, c3]

        if (c2.equals(c3)) return [...stem, FATHA, c2, SHADDA]

        return [...stem, SUKOON, c2, FATHA, c3]
      }

      case 5: {
        if (c3.isWeak) return [...stem, c2, TANWEEN_FATHA, SHADDA, ALIF_MAQSURA]

        return [...stem, c2, SHADDA, FATHA, c3]
      }

      case 6: {
        if (c2.equals(c3)) return [...stem, c2, SHADDA]

        if (c3.isWeak) return [...stem, c2.isHamza ? HAMZA : c2, TANWEEN_FATHA, ALIF_MAQSURA]

        return [...stem, c2.isHamza ? HAMZA : c2, FATHA, c3]
      }

      case 7: {
        if (c2.equals(c3)) return [...stem, c2, SHADDA]

        if (c3.isWeak) return [...stem, c2, FATHA, ALIF_MAQSURA]

        if (c2.isWeak) return [...stem, ALIF, c3]

        return [...stem, c2, FATHA, c3]
      }

      case 8: {
        const infix = resolveFormVIIIInfixConsonant(c1.letter)
        const isInitialWeakOrHamza = c1.isWeak || c1.isHamza
        const prefix = [MEEM, DAMMA]

        if (c2.equals(c3)) return [...prefix, c1, SUKOON, infix, FATHA, c2, SHADDA]

        if (isInitialWeakOrHamza && c3.isWeak) return [...prefix, infix, SHADDA, FATHA, c2, TANWEEN_FATHA, ALIF_MAQSURA]

        if (isInitialWeakOrHamza) return [...prefix, infix, SHADDA, FATHA, c2, FATHA, c3]

        if (c3.isWeak) return [...prefix, c1, SUKOON, infix, FATHA, c2, TANWEEN_FATHA, ALIF_MAQSURA]

        if (c2.is(YEH) || (c2.isWeak && infix !== DAL)) return [...prefix, c1, SUKOON, infix, FATHA, ALIF, c3]

        return [...prefix, c1, SUKOON, infix, FATHA, c2, FATHA, c3]
      }

      case 9: {
        return []
      }

      case 10: {
        if (c3.isWeak) return [...stem, SUKOON, c2, TANWEEN_FATHA, ALIF_MAQSURA]

        if (c2.isWeak) return [...stem, FATHA, ALIF, c3]

        if (c2.equals(c3)) return [...stem, FATHA, c2, SHADDA]

        return [...stem, SUKOON, c2, FATHA, c3]
      }
    }
  })()

  return finalize(result)
}
