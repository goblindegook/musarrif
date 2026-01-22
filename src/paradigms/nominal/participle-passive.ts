import { hasPattern, resolveFormIPresentVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_MAQSURA,
  DAMMA,
  FATHA,
  geminateDoubleLetters,
  HAMZA,
  HAMZA_ON_WAW,
  HAMZA_ON_YEH,
  isHamzatedLetter,
  isWeakLetter,
  KASRA,
  longVowelFromPattern,
  MEEM,
  NOON,
  SEEN,
  SHADDA,
  SUKOON,
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

      // Form IV quadriliteral: initial hamza + final hamza (e.g., أنشأ → مُنْشَأ)
      if (verb.form === 4 && q1 === ALIF_HAMZA && q4 === ALIF_HAMZA)
        return [MEEM, DAMMA, q2, SUKOON, q3, FATHA, ALIF_HAMZA]

      // Default Form I quadriliteral: مُفَعْلَل (e.g., مُدَحْرَج)
      return [MEEM, DAMMA, q1, FATHA, q2, SUKOON, q3, FATHA, q4]
    }

    const isInitialWeak = isWeakLetter(c1)
    const isInitialHamza = isHamzatedLetter(c1)
    const isMiddleWeak = isWeakLetter(c2)
    const isMiddleHamza = isHamzatedLetter(c2)
    const isFinalWeak = isWeakLetter(c3)
    const isFinalHamza = isHamzatedLetter(c3)

    switch (verb.form) {
      case 1: {
        const presentVowel = resolveFormIPresentVowel(verb)
        const isConsonantalMiddleWeak = hasPattern(verb, 'fa3ila-yaf3alu') && (c2 === YEH || c2 === WAW)
        const prefix = [MEEM, FATHA, c1]

        if (isMiddleHamza && isFinalWeak) return [...prefix, SUKOON, HAMZA_ON_YEH, KASRA, YEH, SHADDA]

        if (isInitialWeak && isFinalWeak) return [...prefix, SUKOON, c2, KASRA, YEH, SHADDA]

        if (isInitialHamza && isFinalWeak) return [...prefix, SUKOON, c2, KASRA, YEH, SHADDA]

        if (isMiddleWeak && isFinalWeak) return [...prefix, SUKOON, c2, KASRA, YEH, SHADDA]

        if (isFinalHamza) return [...prefix, SUKOON, c2, DAMMA, WAW, HAMZA]

        if (isMiddleHamza) return [...prefix, SUKOON, HAMZA_ON_WAW, DAMMA, WAW, c3]

        if (c2 === WAW && c3 === YEH) return [...prefix, SUKOON, c2, KASRA, c3, SHADDA]

        if (c2 === ALIF) return [...prefix, ...longVowelFromPattern(presentVowel), c3]

        if (isMiddleWeak && !isConsonantalMiddleWeak)
          return [...prefix, ...longVowelFromPattern(c2 === WAW ? 'u' : 'i'), c3]

        if ((c3 === ALIF || c3 === ALIF_MAQSURA) && presentVowel === 'u')
          return [...prefix, SUKOON, c2, DAMMA, WAW, SHADDA]

        if (c3 === YEH || c3 === ALIF_MAQSURA) return [...prefix, SUKOON, c2, KASRA, YEH, SHADDA]

        return [...prefix, SUKOON, c2, DAMMA, WAW, c3]
      }

      case 2: {
        const prefix = [MEEM, DAMMA, isInitialHamza ? HAMZA_ON_WAW : c1, FATHA, c2]

        if (c2 === c3) return [...prefix, FATHA, SHADDA, c3]

        if (isFinalWeak) return [...prefix, SHADDA, TANWEEN_FATHA, ALIF_MAQSURA]

        return [...prefix, SHADDA, FATHA, c3]
      }

      case 3: {
        const prefix = [MEEM, DAMMA, c1, FATHA, ALIF, isMiddleHamza ? HAMZA : c2]

        if (isFinalWeak) return [...prefix, TANWEEN_FATHA, ALIF_MAQSURA]

        return [...prefix, FATHA, c3]
      }

      case 4: {
        const seatedC1 = isInitialHamza ? HAMZA_ON_WAW : c1

        if (isInitialWeak) return [MEEM, DAMMA, WAW, c2, TANWEEN_FATHA, ALIF_MAQSURA]

        if (isFinalWeak) return [MEEM, DAMMA, seatedC1, SUKOON, c2, TANWEEN_FATHA, ALIF_MAQSURA]

        if (isMiddleWeak) return [MEEM, DAMMA, seatedC1, FATHA, ALIF, c3]

        if (c2 === c3) return [MEEM, DAMMA, seatedC1, FATHA, c2, SHADDA]

        return [MEEM, DAMMA, seatedC1, SUKOON, c2, FATHA, c3]
      }

      case 5: {
        if (isFinalWeak) return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, c2, TANWEEN_FATHA, SHADDA, ALIF_MAQSURA]

        return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, c2, SHADDA, FATHA, c3]
      }

      case 6: {
        if (c2 === c3) return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, ALIF, c2, SHADDA]

        return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, ALIF, isMiddleHamza ? HAMZA : c2, FATHA, c3]
      }

      case 7: {
        if (isMiddleWeak) return [MEEM, DAMMA, NOON, SUKOON, c1, FATHA, ALIF, c3]

        return [MEEM, DAMMA, NOON, SUKOON, c1, FATHA, c2, FATHA, c3]
      }

      case 8: {
        if (isInitialHamza || isInitialWeak) return [MEEM, DAMMA, TEH, SHADDA, FATHA, c2, FATHA, c3]

        if (isMiddleWeak) return [MEEM, DAMMA, c1, SUKOON, TEH, FATHA, ALIF, c3]

        if (isFinalWeak) return [MEEM, DAMMA, c1, SUKOON, TEH, FATHA, c2, FATHA, ALIF_MAQSURA]

        return [MEEM, DAMMA, c1, SUKOON, TEH, FATHA, c2, FATHA, c3]
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

  return geminateDoubleLetters(result).join('').normalize('NFC')
}
