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
    const isInitialHamza = isHamzatedLetter(c1)
    const isMiddleWeak = isWeakLetter(c2)
    const isMiddleHamza = isHamzatedLetter(c2)
    const isFinalWeak = isWeakLetter(c3)
    const isFinalHamza = isHamzatedLetter(c3)

    const seatedC1 = seatHamza(c1, FATHA)
    const seatedC2 = seatHamza(c2, KASRA)
    const seatedC3 = seatHamza(c3, KASRA)

    switch (verb.form) {
      case 1: {
        const prefix = [seatedC1, FATHA, ALIF]

        if (verb.passiveVoice === 'impersonal' && isFormIPastVowel(verb, KASRA))
          return [ALIF_HAMZA, FATHA, c1, SUKOON, c2, FATHA, c3]

        if (c2 === c3) return [...prefix, c2, SHADDA]

        if (isMiddleWeak && isFinalHamza) return [...prefix, HAMZA, TANWEEN_KASRA]

        if (isFinalWeak) return [...prefix, c2, TANWEEN_KASRA]

        if (isFinalHamza && isFormIPastVowel(verb, DAMMA)) return [seatedC1, FATHA, c2, KASRA, YEH, SUKOON, HAMZA]

        if (isFinalHamza) return [...prefix, c2, KASRA, seatedC3]

        if (verb.masdarPatterns?.some((pattern) => ['fu3ool', 'fa3al', 'fa3aal'].includes(pattern)))
          return [...prefix, c2, KASRA, c3]

        if (isMiddleWeak && isFormIPastVowel(verb, KASRA)) return [...prefix, c2, KASRA, c3]

        if (isInitialHamza && isFormIPastVowel(verb, DAMMA)) return [seatedC1, FATHA, c2, KASRA, YEH, SUKOON, c3]

        if (!isInitialWeak && isFormIPastVowel(verb, KASRA)) return [seatedC1, FATHA, c2, KASRA, YEH, SUKOON, c3]

        return [...prefix, isMiddleWeak ? HAMZA_ON_YEH : seatedC2, KASRA, c3]
      }

      case 2: {
        if (isFinalWeak) return [MEEM, DAMMA, seatHamza(c1, DAMMA), FATHA, c2, SHADDA, TANWEEN_KASRA]

        return [MEEM, DAMMA, seatHamza(c1, DAMMA), FATHA, c2, SHADDA, KASRA, seatedC3]
      }

      case 3: {
        if (isFinalWeak)
          return [MEEM, DAMMA, seatHamza(c1, DAMMA), FATHA, ALIF, isMiddleHamza ? HAMZA : c2, TANWEEN_KASRA]

        if (c2 === c3) return [MEEM, DAMMA, seatHamza(c1, DAMMA), FATHA, ALIF, c2, SHADDA]

        return [MEEM, DAMMA, seatHamza(c1, DAMMA), FATHA, ALIF, seatedC2, KASRA, seatedC3]
      }

      case 4: {
        if (isMiddleHamza) return [MEEM, DAMMA, seatHamza(c1, DAMMA), TANWEEN_KASRA]

        if (isFinalWeak) return [MEEM, DAMMA, seatHamza(c1, DAMMA), SUKOON, c2, TANWEEN_KASRA]

        if (isMiddleWeak) return [MEEM, DAMMA, seatHamza(c1, DAMMA), KASRA, YEH, SUKOON, c3]

        if (c2 === c3) return [MEEM, DAMMA, seatHamza(c1, DAMMA), KASRA, c2, SHADDA]

        return [MEEM, DAMMA, seatHamza(c1, DAMMA), SUKOON, c2, KASRA, seatedC3]
      }

      case 5: {
        if (isFinalWeak && isInitialWeak) return [MEEM, DAMMA, TEH, FATHA, seatedC1, FATHA, seatedC2, TANWEEN_KASRA]

        if (isFinalWeak) return [MEEM, DAMMA, TEH, FATHA, seatedC1, FATHA, seatHamza(c2, FATHA), SHADDA, TANWEEN_KASRA]

        return [MEEM, DAMMA, TEH, FATHA, seatedC1, FATHA, seatedC2, SHADDA, KASRA, seatedC3]
      }

      case 6: {
        if (c2 === c3) return [MEEM, DAMMA, TEH, FATHA, seatedC1, FATHA, ALIF, c2, SHADDA]

        if (isMiddleWeak && isFinalHamza) return [MEEM, DAMMA, TEH, FATHA, seatedC1, FATHA, ALIF, c3, TANWEEN_KASRA]

        if (isFinalWeak) return [MEEM, DAMMA, TEH, FATHA, seatedC1, FATHA, ALIF, seatedC2, TANWEEN_KASRA]

        return [MEEM, DAMMA, TEH, FATHA, seatedC1, FATHA, ALIF, seatedC2, KASRA, seatedC3]
      }

      case 7: {
        if (c2 === c3) return [MEEM, DAMMA, NOON, SUKOON, seatedC1, FATHA, c2, SHADDA]

        if (isFinalWeak) return [MEEM, DAMMA, NOON, SUKOON, seatedC1, FATHA, c2, TANWEEN_KASRA]

        if (isMiddleWeak) return [MEEM, DAMMA, NOON, SUKOON, seatedC1, FATHA, ALIF, c3]

        return [MEEM, DAMMA, NOON, SUKOON, seatedC1, FATHA, c2, KASRA, seatHamza(c3, KASRA)]
      }

      case 8: {
        const seatedC1 = seatHamza(c1, DAMMA)
        const infix = resolveFormVIIIInfixConsonant(c1)

        if (c2 === c3) return [MEEM, DAMMA, seatedC1, SUKOON, infix, FATHA, c2, SHADDA]

        if ((isInitialHamza || isInitialWeak) && isFinalWeak)
          return [MEEM, DAMMA, TEH, SHADDA, FATHA, c2, TANWEEN_KASRA]

        if (isInitialHamza || isInitialWeak) return [MEEM, DAMMA, TEH, SHADDA, FATHA, c2, KASRA, seatedC3]

        if (isFinalWeak) return [MEEM, DAMMA, seatedC1, SUKOON, infix, FATHA, seatHamza(c2, FATHA), TANWEEN_KASRA]

        if (c2 === YEH || (isMiddleWeak && infix !== DAL))
          return [MEEM, DAMMA, seatedC1, SUKOON, infix, FATHA, ALIF, c3]

        return [MEEM, DAMMA, seatedC1, SUKOON, infix, FATHA, seatedC2, KASRA, seatedC3]
      }

      case 9: {
        return [MEEM, DAMMA, seatedC1, SUKOON, c2, FATHA, c3, SHADDA]
      }

      case 10: {
        const prefix = [MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA, seatedC1]

        if (isFinalWeak) return [...prefix, SUKOON, c2, TANWEEN_KASRA]

        if (isMiddleWeak) return [...prefix, KASRA, YEH, c3]

        if (c2 === c3) return [...prefix, KASRA, c2, SHADDA]

        return [...prefix, SUKOON, c2, KASRA, seatedC3]
      }
    }
  })()

  return finalize(result)
}
