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
  isHamzatedLetter,
  isWeakLetter,
  KASRA,
  MEEM,
  NOON,
  resolveFormVIIIInfixConsonant,
  SEEN,
  SHADDA,
  SUKOON,
  seatHamza,
  TANWEEN_KASRA,
  TEH,
  YEH,
} from '../letters'
import type { Verb } from '../verbs'

export function participleStem(verb: Verb): readonly string[] {
  const [c1, c2] = [...verb.root]
  switch (verb.form) {
    case 2:
      return [MEEM, DAMMA, seatHamza(c1, DAMMA), FATHA, c2, SHADDA]
    case 3:
      return [MEEM, DAMMA, seatHamza(c1, DAMMA), FATHA, ALIF]
    case 4:
      return [MEEM, DAMMA, seatHamza(c1, DAMMA)]
    case 5:
      return [MEEM, DAMMA, TEH, FATHA, seatHamza(c1, FATHA), FATHA]
    case 6:
      return [MEEM, DAMMA, TEH, FATHA, seatHamza(c1, FATHA), FATHA, ALIF]
    case 7:
      return [MEEM, DAMMA, NOON, SUKOON, seatHamza(c1, FATHA), FATHA]
    case 10:
      return [MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA, seatHamza(c1, FATHA)]
    default:
      return []
  }
}

export function deriveActiveParticiple(verb: Verb): string {
  const result = (() => {
    const letters = [...verb.root]

    if (letters.length === 4) {
      const [q1, q2, q3, q4] = letters

      switch (verb.form) {
        case 1:
          return [MEEM, DAMMA, q1, FATHA, seatHamza(q2, FATHA), SUKOON, q3, KASRA, seatHamza(q4, KASRA)]
        case 2:
          return [MEEM, DAMMA, TEH, FATHA, seatHamza(q1, FATHA), FATHA, q2, SUKOON, q3, KASRA, q4]
        case 3:
          return [MEEM, DAMMA, q1, SUKOON, q2, FATHA, NOON, SUKOON, q3, KASRA, q4]
        case 4:
          return [MEEM, DAMMA, q1, SUKOON, q2, FATHA, seatHamza(q3, KASRA), KASRA, q4, SHADDA]
        default:
          return []
      }
    }

    const [c1, c2, c3] = letters
    const isInitialWeak = isWeakLetter(c1)
    const isMiddleWeak = isWeakLetter(c2)
    const isMiddleHamza = isHamzatedLetter(c2)
    const isFinalWeak = isWeakLetter(c3)
    const isFinalHamza = isHamzatedLetter(c3)

    const seatedC1 = seatHamza(c1, FATHA)
    const seatedC2 = seatHamza(c2, KASRA)
    const seatedC3 = seatHamza(c3, KASRA)

    const stem = participleStem(verb)

    switch (verb.form) {
      case 1: {
        // FIXME: This makes no sense.
        if (verb.passiveVoice === 'impersonal' && isFormIPastVowel(verb, KASRA))
          return [ALIF_HAMZA, FATHA, c1, SUKOON, c2, FATHA, c3]

        if (c2 === c3) return [seatedC1, FATHA, ALIF, c2, SUKOON, c3]

        if (isFinalWeak) return [seatedC1, FATHA, ALIF, c2, TANWEEN_KASRA]

        if (isMiddleWeak && isFinalHamza) return [seatedC1, FATHA, ALIF, HAMZA, TANWEEN_KASRA]

        if (isMiddleWeak)
          return [seatedC1, FATHA, ALIF, isFormIPastVowel(verb, KASRA) ? c2 : HAMZA_ON_YEH, KASRA, seatedC3]

        if (verb.masdarPatterns?.some((pattern) => ['fu3ool', 'fa3al', 'fa3aal'].includes(pattern)))
          return [seatedC1, FATHA, ALIF, c2, KASRA, seatedC3]

        if (isFinalHamza && isFormIPastVowel(verb, DAMMA)) return [seatedC1, FATHA, seatedC2, KASRA, YEH, SUKOON, HAMZA]

        if (isHamzatedLetter(c1) && isFormIPastVowel(verb, DAMMA))
          return [seatedC1, FATHA, seatedC2, KASRA, YEH, SUKOON, seatedC3]

        if (!isInitialWeak && isFormIPastVowel(verb, KASRA))
          return [seatedC1, FATHA, seatedC2, KASRA, YEH, SUKOON, seatedC3]

        return [seatedC1, FATHA, ALIF, seatedC2, KASRA, seatedC3]
      }

      case 2: {
        if (isFinalWeak) return [...stem, TANWEEN_KASRA]

        return [...stem, KASRA, seatedC3]
      }

      case 3: {
        if (isFinalWeak) return [...stem, isMiddleHamza ? HAMZA : c2, TANWEEN_KASRA]

        if (c2 === c3) return [...stem, c2, SHADDA]

        return [...stem, seatedC2, KASRA, seatedC3]
      }

      case 4: {
        if (isMiddleHamza) return [...stem, TANWEEN_KASRA]

        if (isFinalWeak) return [...stem, SUKOON, c2, TANWEEN_KASRA]

        if (isMiddleWeak) return [...stem, KASRA, YEH, SUKOON, c3]

        if (c2 === c3) return [...stem, KASRA, c2, SUKOON, c3]

        return [...stem, SUKOON, c2, KASRA, seatedC3]
      }

      case 5: {
        if (isFinalWeak && isInitialWeak) return [...stem, seatedC2, TANWEEN_KASRA]

        if (isFinalWeak) return [...stem, seatHamza(c2, FATHA), SHADDA, TANWEEN_KASRA]

        return [...stem, seatedC2, SHADDA, KASRA, seatedC3]
      }

      case 6: {
        if (c2 === c3) return [...stem, c2, SUKOON, c3]

        if (isMiddleWeak && isFinalHamza) return [...stem, c3, TANWEEN_KASRA]

        if (isFinalWeak) return [...stem, seatedC2, TANWEEN_KASRA]

        return [...stem, seatedC2, KASRA, seatedC3]
      }

      case 7: {
        if (c2 === c3) return [...stem, c2, SUKOON, c3]

        if (isFinalWeak) return [...stem, c2, TANWEEN_KASRA]

        if (isMiddleWeak) return [...stem, ALIF, c3]

        return [...stem, c2, KASRA, seatHamza(c3, KASRA)]
      }

      case 8: {
        const isINitialWeakOrHamza = isWeakLetter(c1) || isHamzatedLetter(c1)
        const seatedC1 = seatHamza(c1, DAMMA)
        const infix = resolveFormVIIIInfixConsonant(c1)
        const prefix = [MEEM, DAMMA, seatedC1, SUKOON, infix, FATHA]

        if (c2 === c3) return [...prefix, c2, SUKOON, c3]

        if (isINitialWeakOrHamza && isFinalWeak) return [MEEM, DAMMA, infix, SHADDA, FATHA, c2, TANWEEN_KASRA]

        if (isINitialWeakOrHamza) return [MEEM, DAMMA, infix, SHADDA, FATHA, c2, KASRA, seatedC3]

        if (isFinalWeak) return [...prefix, seatHamza(c2, FATHA), TANWEEN_KASRA]

        if (c2 === YEH || (isMiddleWeak && infix !== DAL)) return [...prefix, ALIF, c3]

        return [...prefix, seatedC2, KASRA, seatedC3]
      }

      case 9: {
        return [MEEM, DAMMA, seatedC1, SUKOON, c2, FATHA, c3, SHADDA]
      }

      case 10: {
        if (isFinalWeak) return [...stem, SUKOON, c2, TANWEEN_KASRA]

        if (isMiddleWeak) return [...stem, KASRA, YEH, c3]

        if (c2 === c3) return [...stem, KASRA, c2, SHADDA]

        return [...stem, SUKOON, c2, KASRA, seatedC3]
      }
    }
  })()

  return finalize(result)
}
