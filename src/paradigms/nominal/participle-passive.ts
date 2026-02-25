import { hasPattern } from '../form-i-vowels'
import {
  ALIF,
  ALIF_MAQSURA,
  DAL,
  DAMMA,
  FATHA,
  geminateDoubleLetters,
  HAMZA,
  HAMZA_ON_WAW,
  isHamzatedLetter,
  isWeakLetter,
  longVowelFromPattern,
  MEEM,
  NOON,
  normalizeAlifMadda,
  resolveFormVIIIInfixConsonant,
  SEEN,
  SHADDA,
  SUKOON,
  seatHamza,
  shortVowelFromPattern,
  TANWEEN_FATHA,
  TEH,
  WAW,
  YEH,
} from '../letters'
import type { Verb } from '../verbs'

export function derivePassiveParticiple(verb: Verb): string {
  if (verb.noPassiveParticiple) return ''

  const result = (() => {
    const letters = [...verb.root]
    const [c1, c2, c3] = letters

    if (letters.length === 4) {
      const [q1, q2, q3, q4] = letters

      return [MEEM, DAMMA, q1, FATHA, q2, SUKOON, q3, FATHA, q4]
    }

    const isInitialWeak = isWeakLetter(c1)
    const isInitialHamza = isHamzatedLetter(c1)
    const isMiddleWeak = isWeakLetter(c2)
    const isMiddleHamza = isHamzatedLetter(c2)
    const isFinalWeak = isWeakLetter(c3)
    const isFinalHamza = isHamzatedLetter(c3)
    const seatedC1 = seatHamza(c1, DAMMA)
    const seatedC2 = seatHamza(c2, FATHA)
    const seatedC3 = seatHamza(c3, FATHA)

    switch (verb.form) {
      case 1: {
        const defectivePattern = c3 === YEH ? 'i' : 'u'
        const defectiveVowel = longVowelFromPattern(defectivePattern)
        const seatedC2 = seatHamza(c2, shortVowelFromPattern(defectivePattern))
        const seatedC3 = isFinalHamza ? HAMZA : c3
        const prefix = [MEEM, FATHA, c1]

        if (isFinalWeak) return [...prefix, SUKOON, seatedC2, ...defectiveVowel, SHADDA]

        if (isMiddleWeak && !hasPattern(verb, 'fa3ila-yaf3alu'))
          return [...prefix, ...longVowelFromPattern(c2 === WAW ? 'u' : 'i'), c3]

        return [...prefix, SUKOON, seatedC2, ...defectiveVowel, seatedC3]
      }

      case 2: {
        const prefix = [MEEM, DAMMA, seatedC1, FATHA, c2]

        if (isFinalWeak) return [...prefix, SHADDA, TANWEEN_FATHA, ALIF_MAQSURA]

        return [...prefix, SHADDA, FATHA, seatHamza(c3, FATHA)]
      }

      case 3: {
        const seatedC2 = isMiddleHamza ? HAMZA : c2
        const prefix = [MEEM, DAMMA, seatedC1, FATHA, ALIF, seatedC2]

        if (isFinalWeak) return [...prefix, TANWEEN_FATHA, ALIF_MAQSURA]

        if (c2 === c3) return [...prefix, SHADDA]

        return [...prefix, FATHA, c3]
      }

      case 4: {
        const prefix = [MEEM, DAMMA, seatedC1]

        if (isFinalWeak) return [...prefix, SUKOON, c2, TANWEEN_FATHA, ALIF_MAQSURA]

        if (isInitialWeak) return [...prefix, c2, FATHA, seatedC3]

        if (isMiddleWeak) return [...prefix, FATHA, ALIF, c3]

        if (c2 === c3) return [...prefix, FATHA, c2, SHADDA]

        return [...prefix, SUKOON, c2, FATHA, seatedC3]
      }

      case 5: {
        const prefix = [MEEM, DAMMA, TEH, FATHA, c1]

        if (isFinalWeak) return [...prefix, FATHA, seatedC2, TANWEEN_FATHA, SHADDA, ALIF_MAQSURA]

        return [...prefix, FATHA, seatedC2, SHADDA, FATHA, seatHamza(c3, FATHA)]
      }

      case 6: {
        const prefix = [MEEM, DAMMA, TEH, FATHA, c1]

        if (c2 === c3) return [...prefix, FATHA, ALIF, c2, SHADDA]

        if (isFinalWeak) return [...prefix, FATHA, ALIF, isMiddleHamza ? HAMZA : c2, TANWEEN_FATHA, ALIF_MAQSURA]

        return [...prefix, FATHA, ALIF, isMiddleHamza ? HAMZA : c2, FATHA, seatHamza(c3, FATHA)]
      }

      case 7: {
        const prefix = [MEEM, DAMMA, NOON, SUKOON, c1]

        if (c2 === c3) return [...prefix, FATHA, c2, SHADDA]

        if (isFinalWeak) return [...prefix, FATHA, c2, FATHA, ALIF_MAQSURA]

        if (isMiddleWeak) return [...prefix, FATHA, ALIF, c3]

        return [...prefix, FATHA, c2, FATHA, c3]
      }

      case 8: {
        const prefix = [MEEM, DAMMA]
        const seatedC1 = isInitialHamza ? HAMZA_ON_WAW : c1

        const infix = resolveFormVIIIInfixConsonant(c1)

        if (c2 === c3) return [...prefix, seatedC1, SUKOON, infix, FATHA, c2, SHADDA]

        if (isInitialHamza || isInitialWeak) return [...prefix, infix, SHADDA, FATHA, c2, FATHA, c3]

        if (isMiddleWeak && infix !== DAL) return [...prefix, seatedC1, SUKOON, infix, FATHA, ALIF, c3]

        if (isFinalWeak) return [...prefix, seatedC1, SUKOON, infix, FATHA, seatedC2, TANWEEN_FATHA, ALIF_MAQSURA]

        return [...prefix, seatedC1, SUKOON, infix, FATHA, seatedC2, FATHA, c3]
      }

      case 9: {
        return []
      }

      case 10: {
        const prefix = [MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA, c1]

        if (isMiddleWeak) return [...prefix, FATHA, ALIF, c3]

        if (c2 === c3) return [...prefix, FATHA, c2, SHADDA]

        if (isFinalWeak) return [...prefix, SUKOON, c2, TANWEEN_FATHA, ALIF_MAQSURA]

        return [...prefix, SUKOON, c2, FATHA, c3]
      }
    }
  })()

  return geminateDoubleLetters(normalizeAlifMadda(result)).join('').normalize('NFC')
}
