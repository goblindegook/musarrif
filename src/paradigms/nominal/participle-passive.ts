import { isFormIPastVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_MAQSURA,
  DAL,
  DAMMA,
  FATHA,
  finalize,
  HAMZA,
  isHamzatedLetter,
  isWeakLetter,
  KASRA,
  longVowel,
  MEEM,
  NOON,
  resolveFormVIIIInfixConsonant,
  SHADDA,
  SUKOON,
  seatHamza,
  TANWEEN_FATHA,
  TEH,
  WAW,
  YEH,
} from '../letters'
import type { Verb } from '../verbs'
import { participleStem } from './participle-active'

export function derivePassiveParticiple(verb: Verb): string {
  if (verb.noPassiveParticiple) return ''

  const result = (() => {
    const letters = [...verb.root]
    const [c1, c2, c3] = letters

    if (letters.length === 4) {
      const [q1, q2, q3, q4] = letters
      switch (verb.form) {
        case 1:
          return [MEEM, DAMMA, q1, FATHA, q2, SUKOON, q3, FATHA, q4]
        case 2:
          return [MEEM, DAMMA, TEH, FATHA, seatHamza(q1, FATHA), FATHA, q2, SUKOON, q3, FATHA, q4]
        case 3:
          return [MEEM, DAMMA, q1, SUKOON, q2, FATHA, NOON, SUKOON, q3, FATHA, q4]
        case 4:
          return [MEEM, DAMMA, q1, SUKOON, q2, FATHA, seatHamza(q3, FATHA), FATHA, q4, SHADDA]
        default:
          return []
      }
    }

    const isMiddleWeak = isWeakLetter(c2)
    const isMiddleHamza = isHamzatedLetter(c2)
    const isFinalWeak = isWeakLetter(c3)

    const seatedC3 = seatHamza(c3, FATHA)

    const stem = participleStem(verb)

    switch (verb.form) {
      case 1: {
        const glide = c3 === YEH ? KASRA : DAMMA
        const seatedC2 = seatHamza(c2, glide)
        const prefix = [MEEM, FATHA, seatHamza(c1, FATHA)]

        if (isFinalWeak) return [...prefix, SUKOON, seatedC2, ...longVowel(glide), SHADDA]

        if (isMiddleWeak && !isFormIPastVowel(verb, KASRA))
          return [...prefix, ...longVowel(c2 === WAW ? DAMMA : KASRA), c3]

        return [...prefix, SUKOON, seatedC2, ...longVowel(glide), isHamzatedLetter(c3) ? HAMZA : c3]
      }

      case 2: {
        if (isFinalWeak) return [...stem, TANWEEN_FATHA, ALIF_MAQSURA]

        return [...stem, FATHA, seatedC3]
      }

      case 3: {
        if (isFinalWeak) return [...stem, isMiddleHamza ? HAMZA : c2, TANWEEN_FATHA, ALIF_MAQSURA]

        if (c2 === c3) return [...stem, c2, SHADDA]

        return [...stem, isMiddleHamza ? HAMZA : c2, FATHA, seatedC3]
      }

      case 4: {
        if (isMiddleHamza) return [...stem, TANWEEN_FATHA, ALIF_MAQSURA]

        if (isFinalWeak) return [...stem, SUKOON, c2, TANWEEN_FATHA, ALIF_MAQSURA]

        if (isMiddleWeak) return [...stem, FATHA, ALIF, c3]

        if (c2 === c3) return [...stem, FATHA, c2, SHADDA]

        return [...stem, SUKOON, c2, FATHA, seatedC3]
      }

      case 5: {
        if (isFinalWeak) return [...stem, seatHamza(c2, FATHA), TANWEEN_FATHA, SHADDA, ALIF_MAQSURA]

        return [...stem, seatHamza(c2, FATHA), SHADDA, FATHA, seatedC3]
      }

      case 6: {
        if (c2 === c3) return [...stem, c2, SHADDA]

        if (isFinalWeak) return [...stem, isMiddleHamza ? HAMZA : c2, TANWEEN_FATHA, ALIF_MAQSURA]

        return [...stem, isMiddleHamza ? HAMZA : c2, FATHA, seatedC3]
      }

      case 7: {
        if (c2 === c3) return [...stem, c2, SHADDA]

        if (isFinalWeak) return [...stem, c2, FATHA, ALIF_MAQSURA]

        if (isMiddleWeak) return [...stem, ALIF, c3]

        return [...stem, c2, FATHA, c3]
      }

      case 8: {
        const infix = resolveFormVIIIInfixConsonant(seatHamza(c1, FATHA))
        const isInitialWeakOrHamza = isWeakLetter(c1) || isHamzatedLetter(c1)
        const seatedC1 = seatHamza(c1, DAMMA)
        const seatedC2 = seatHamza(c2, FATHA)
        const prefix = [MEEM, DAMMA]

        if (c2 === c3) return [...prefix, seatedC1, SUKOON, infix, FATHA, c2, SHADDA]

        if (isInitialWeakOrHamza && isFinalWeak)
          return [...prefix, infix, SHADDA, FATHA, c2, TANWEEN_FATHA, ALIF_MAQSURA]

        if (isInitialWeakOrHamza) return [...prefix, infix, SHADDA, FATHA, c2, FATHA, seatedC3]

        if (isFinalWeak) return [...prefix, seatedC1, SUKOON, infix, FATHA, seatedC2, TANWEEN_FATHA, ALIF_MAQSURA]

        if (c2 === YEH || (isMiddleWeak && infix !== DAL)) return [...prefix, seatedC1, SUKOON, infix, FATHA, ALIF, c3]

        return [...prefix, seatedC1, SUKOON, infix, FATHA, seatedC2, FATHA, seatedC3]
      }

      case 9: {
        return []
      }

      case 10: {
        if (isFinalWeak) return [...stem, SUKOON, c2, TANWEEN_FATHA, ALIF_MAQSURA]

        if (isMiddleWeak) return [...stem, FATHA, ALIF, c3]

        if (c2 === c3) return [...stem, FATHA, c2, SHADDA]

        return [...stem, SUKOON, c2, FATHA, seatedC3]
      }
    }
  })()

  return finalize(result)
}
