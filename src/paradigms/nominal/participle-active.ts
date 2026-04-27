import { isFormIPastVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  DAL,
  DAMMA,
  FATHA,
  finalize,
  HAMZA,
  HAMZA_ON_YEH,
  KASRA,
  MEEM,
  NOON,
  resolveFormVIIIInfixConsonant,
  SEEN,
  SHADDA,
  SUKOON,
  TANWEEN_KASRA,
  TEH,
  type Token,
  YEH,
} from '../letters'
import type { Verb } from '../verbs'

export function participleStem(verb: Verb): readonly Token[] {
  const [c1, c2] = verb.rootTokens
  switch (verb.form) {
    case 2:
      return [MEEM, DAMMA, c1, FATHA, c2, SHADDA]
    case 3:
      return [MEEM, DAMMA, c1, FATHA, ALIF]
    case 4:
      return [MEEM, DAMMA, c1]
    case 5:
      return [MEEM, DAMMA, TEH, FATHA, c1, FATHA]
    case 6:
      return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, ALIF]
    case 7:
      return [MEEM, DAMMA, NOON, SUKOON, c1, FATHA]
    case 10:
      return [MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA, c1]
    default:
      return []
  }
}

export function deriveActiveParticiple(verb: Verb): string {
  const result = (() => {
    const letters = verb.rootTokens

    if (letters.length === 4) {
      const [q1, q2, q3, q4] = letters

      switch (verb.form) {
        case 1:
          return [MEEM, DAMMA, q1, FATHA, q2, SUKOON, q3, KASRA, q4]
        case 2:
          return [MEEM, DAMMA, TEH, FATHA, q1, FATHA, q2, SUKOON, q3, KASRA, q4]
        case 3:
          return [MEEM, DAMMA, q1, SUKOON, q2, FATHA, NOON, SUKOON, q3, KASRA, q4]
        case 4:
          return [MEEM, DAMMA, q1, SUKOON, q2, FATHA, q3, KASRA, q4, SHADDA]
        default:
          return []
      }
    }

    const [c1, c2, c3] = letters

    const stem = participleStem(verb)

    switch (verb.form) {
      case 1: {
        // FIXME: This makes no sense.
        if (verb.passiveVoice === 'impersonal' && isFormIPastVowel(verb, KASRA))
          return [ALIF_HAMZA, FATHA, c1, SUKOON, c2, FATHA, c3]

        if (c2.equals(c3)) return [c1, FATHA, ALIF, c2, SUKOON, c3]

        if (c3.isWeak) return [c1, FATHA, ALIF, c2, TANWEEN_KASRA]

        if (c2.isWeak && c3.isHamza) return [c1, FATHA, ALIF, HAMZA, TANWEEN_KASRA]

        if (c2.isWeak) return [c1, FATHA, ALIF, isFormIPastVowel(verb, KASRA) ? c2 : HAMZA_ON_YEH, KASRA, c3]

        // FIXME: This makes no sense.
        if (verb.masdars?.some((pattern) => ['fu3ool', 'fa3al', 'fa3aal'].includes(pattern)))
          return [c1, FATHA, ALIF, c2, KASRA, c3]

        if (c3.isHamza && isFormIPastVowel(verb, DAMMA)) return [c1, FATHA, c2, KASRA, YEH, SUKOON, HAMZA]

        if (c1.isHamza && isFormIPastVowel(verb, DAMMA)) return [c1, FATHA, c2, KASRA, YEH, SUKOON, c3]

        if (!c1.isWeak && isFormIPastVowel(verb, KASRA)) return [c1, FATHA, c2, KASRA, YEH, SUKOON, c3]

        return [c1, FATHA, ALIF, c2, KASRA, c3]
      }

      case 2: {
        if (c3.isWeak) return [...stem, TANWEEN_KASRA]

        return [...stem, KASRA, c3]
      }

      case 3: {
        if (c3.isWeak) return [...stem, c2, TANWEEN_KASRA]

        if (c2.equals(c3)) return [...stem, c2, SHADDA]

        return [...stem, c2, KASRA, c3]
      }

      case 4: {
        if (c2.isHamza) return [...stem, TANWEEN_KASRA]

        if (c3.isWeak) return [...stem, SUKOON, c2, TANWEEN_KASRA]

        if (c2.isWeak) return [...stem, KASRA, YEH, SUKOON, c3]

        if (c2.equals(c3)) return [...stem, KASRA, c2, SUKOON, c3]

        return [...stem, SUKOON, c2, KASRA, c3]
      }

      case 5: {
        if (c3.isWeak && c1.isWeak) return [...stem, c2, TANWEEN_KASRA]

        if (c3.isWeak) return [...stem, c2, SHADDA, TANWEEN_KASRA]

        return [...stem, c2, SHADDA, KASRA, c3]
      }

      case 6: {
        if (c2.equals(c3)) return [...stem, c2, SUKOON, c3]

        if (c2.isWeak && c3.isHamza) return [...stem, c3, TANWEEN_KASRA]

        if (c3.isWeak) return [...stem, c2, TANWEEN_KASRA]

        return [...stem, c2, KASRA, c3]
      }

      case 7: {
        if (c2.equals(c3)) return [...stem, c2, SUKOON, c3]

        if (c3.isWeak) return [...stem, c2, TANWEEN_KASRA]

        if (c2.isWeak) return [...stem, ALIF, c3]

        return [...stem, c2, KASRA, c3]
      }

      case 8: {
        const isInitialWeakOrHamza = c1.isWeak || c1.isHamza

        const infix = resolveFormVIIIInfixConsonant(c1.letter)

        const prefix = [MEEM, DAMMA, c1, SUKOON, infix, FATHA]

        if (c2.equals(c3)) return [...prefix, c2, SUKOON, c3]

        if (isInitialWeakOrHamza && c3.isWeak) return [MEEM, DAMMA, infix, SHADDA, FATHA, c2, TANWEEN_KASRA]

        if (isInitialWeakOrHamza) return [MEEM, DAMMA, infix, SHADDA, FATHA, c2, KASRA, c3]

        if (c3.isWeak) return [...prefix, c2, TANWEEN_KASRA]

        if (c2.equals(YEH) || (c2.isWeak && infix !== DAL)) return [...prefix, ALIF, c3]

        return [...prefix, c2, KASRA, c3]
      }

      case 9: {
        return [MEEM, DAMMA, c1, SUKOON, c2, FATHA, c3, SHADDA]
      }

      case 10: {
        if (c3.isWeak) return [...stem, SUKOON, c2, TANWEEN_KASRA]

        if (c2.isWeak) return [...stem, KASRA, YEH, c3]

        if (c2.equals(c3)) return [...stem, KASRA, c2, SHADDA]

        return [...stem, SUKOON, c2, KASRA, c3]
      }
    }
  })()

  return finalize(result)
}
