import { hasPattern } from '../form-i-vowels'
import {
  ALIF,
  DAL,
  DAMMA,
  FATHA,
  geminateDoubleLetters,
  HAMZA,
  HAMZA_ON_WAW,
  HAMZA_ON_YEH,
  isHamzatedLetter,
  isWeakLetter,
  KASRA,
  MEEM,
  NOON,
  normalizeAlifMadda,
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

export function deriveActiveParticiple(verb: Verb): string | null {
  const result = (() => {
    const letters = [...verb.root]

    if (letters.length === 4) {
      const [q1, q2, q3, q4] = letters

      return [MEEM, DAMMA, q1, FATHA, q2, SUKOON, q3, KASRA, q4]
    }

    const [c1, c2, c3] = letters
    const isInitialWeak = isWeakLetter(c1)
    const isInitialHamza = isHamzatedLetter(c1)
    const isMiddleWeak = isWeakLetter(c2)
    const isMiddleHamza = isHamzatedLetter(c2)
    const isFinalWeak = isWeakLetter(c3)
    const isFinalHamza = isHamzatedLetter(c3)

    const seatedC1 = seatHamza(c1, DAMMA)
    const seatedC2 = seatHamza(c2, KASRA)
    const seatedC3 = seatHamza(c3, KASRA)

    switch (verb.form) {
      case 1: {
        const prefix = [c1, FATHA, ALIF]

        if (c2 === c3) return [...prefix, c2, SHADDA]

        if (isMiddleWeak && isFinalHamza) return [...prefix, HAMZA, TANWEEN_KASRA]

        if (isFinalWeak) return [...prefix, c2, TANWEEN_KASRA]

        if (isFinalHamza && hasPattern(verb, 'fa3ula-yaf3ulu')) return [c1, FATHA, c2, KASRA, YEH, HAMZA]

        if (isFinalHamza) return [...prefix, c2, KASRA, seatedC3]

        if (verb.masdarPatterns?.some((pattern) => ['fu3ool', 'fa3al', 'fa3aal'].includes(pattern)))
          return [...prefix, c2, KASRA, c3]

        if (isMiddleWeak && hasPattern(verb, 'fa3ila-yaf3alu')) return [...prefix, c2, KASRA, c3]

        if (!isInitialWeak && hasPattern(verb, 'fa3ila-yaf3alu')) return [c1, FATHA, c2, KASRA, YEH, c3]

        return [...prefix, isMiddleWeak ? HAMZA_ON_YEH : seatedC2, KASRA, c3]
      }

      case 2: {
        if (isFinalWeak) return [MEEM, DAMMA, seatedC1, FATHA, c2, SHADDA, TANWEEN_KASRA]

        return [MEEM, DAMMA, seatedC1, FATHA, c2, SHADDA, KASRA, seatedC3]
      }

      case 3: {
        if (isFinalWeak) return [MEEM, DAMMA, seatedC1, FATHA, ALIF, seatedC2, TANWEEN_KASRA]

        if (c2 === c3) return [MEEM, DAMMA, seatedC1, FATHA, ALIF, seatedC2, SHADDA]

        return [MEEM, DAMMA, seatedC1, FATHA, ALIF, seatedC2, KASRA, seatedC3]
      }

      case 4: {
        const prefix = [MEEM, DAMMA, isInitialHamza ? HAMZA_ON_WAW : c1]

        if (isMiddleHamza) return [...prefix, TANWEEN_KASRA]

        if (isFinalWeak) return [...prefix, SUKOON, c2, TANWEEN_KASRA]

        if (isMiddleWeak) return [...prefix, KASRA, YEH, SUKOON, c3]

        if (c2 === c3) return [...prefix, KASRA, c2, SHADDA]

        return [...prefix, SUKOON, c2, KASRA, seatedC3]
      }

      case 5: {
        if (isFinalWeak && isInitialWeak) return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, seatedC2, TANWEEN_KASRA]

        if (isFinalWeak) return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, seatHamza(c2, FATHA), SHADDA, TANWEEN_KASRA]

        return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, seatedC2, SHADDA, KASRA, seatedC3]
      }

      case 6: {
        if (c2 === c3) return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, ALIF, c2, SHADDA]

        if (isMiddleWeak && isFinalHamza) return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, ALIF, c3, TANWEEN_KASRA]

        if (isFinalWeak)
          return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, ALIF, isMiddleHamza ? HAMZA_ON_YEH : c2, TANWEEN_KASRA]

        return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, ALIF, isMiddleHamza ? HAMZA_ON_YEH : c2, KASRA, seatedC3]
      }

      case 7: {
        if (c2 === c3) return [MEEM, DAMMA, NOON, SUKOON, c1, FATHA, c2, SHADDA]

        if (isFinalWeak) return [MEEM, DAMMA, NOON, SUKOON, c1, FATHA, c2, TANWEEN_KASRA]

        if (isMiddleWeak) return [MEEM, DAMMA, NOON, SUKOON, c1, FATHA, ALIF, c3]

        return [MEEM, DAMMA, NOON, SUKOON, c1, FATHA, c2, KASRA, seatHamza(c3, KASRA)]
      }

      case 8: {
        const seatedC1 = isInitialHamza ? HAMZA_ON_WAW : c1
        const seatedC2 = seatHamza(c2, FATHA)
        const infix = resolveFormVIIIInfixConsonant(c1)

        if (c2 === c3) return [MEEM, DAMMA, seatedC1, SUKOON, infix, FATHA, c2, SHADDA]

        if (isInitialHamza || isInitialWeak) return [MEEM, DAMMA, TEH, SHADDA, FATHA, c2, KASRA, c3]

        if (isMiddleWeak && infix !== DAL) return [MEEM, DAMMA, seatedC1, SUKOON, infix, FATHA, ALIF, c3]

        if (isFinalWeak) return [MEEM, DAMMA, seatedC1, SUKOON, infix, FATHA, seatedC2, TANWEEN_KASRA]

        return [MEEM, DAMMA, seatedC1, SUKOON, infix, FATHA, seatedC2, KASRA, c3]
      }

      case 9: {
        return [MEEM, DAMMA, c1, SUKOON, c2, FATHA, c3, SHADDA]
      }

      case 10: {
        const prefix = [MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA]

        if (c2 === c3) return [...prefix, c1, KASRA, c2, SHADDA]

        if (isMiddleWeak) return [...prefix, c1, KASRA, YEH, c3]

        if (isFinalWeak) return [...prefix, c1, SUKOON, c2, TANWEEN_KASRA]

        return [...prefix, c1, SUKOON, c2, KASRA, seatedC3]
      }
    }
  })()

  return geminateDoubleLetters(normalizeAlifMadda(result)).join('').normalize('NFC')
}
