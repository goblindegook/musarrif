import { hasPattern } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  DAMMA,
  FATHA,
  HAMZA,
  HAMZA_ON_WAW,
  HAMZA_ON_YEH,
  isHamzatedLetter,
  isWeakLetter,
  KASRA,
  MEEM,
  NOON,
  normalizeAlifMadda,
  SEEN,
  SHADDA,
  SUKOON,
  TANWEEN_KASRA,
  TEH,
  WAW,
  YEH,
} from '../letters'
import type { Verb } from '../verbs'

export function deriveActiveParticiple(verb: Verb): string | null {
  const result = (() => {
    const letters = [...verb.root]
    const [c1, c2, c3] = letters

    if (letters.length === 4) {
      const [q1, q2, q3, q4] = letters

      // Form IV quadriliteral: initial hamza + final hamza (e.g., أنشأ → مُنْشِئ)
      if (verb.form === 4 && q1 === ALIF_HAMZA && q4 === ALIF_HAMZA)
        return [MEEM, DAMMA, q2, SUKOON, q3, KASRA, HAMZA_ON_YEH]

      return [MEEM, DAMMA, q1, FATHA, q2, SUKOON, q3, KASRA, q4]
    }

    const isInitialWeak = isWeakLetter(c1)
    const isInitialHamza = isHamzatedLetter(c1)
    const isMiddleWeak = isWeakLetter(c2)
    const isMiddleHamza = isHamzatedLetter(c2)
    const isFinalWeak = isWeakLetter(c3)
    const isFinalHamza = isHamzatedLetter(c3)

    switch (verb.form) {
      case 1: {
        const prefix = normalizeAlifMadda([c1, FATHA, ALIF])

        if (c2 === c3) return [...prefix, c2, SHADDA]

        if (isMiddleWeak && isFinalHamza) return [...prefix, HAMZA, TANWEEN_KASRA]

        if (isFinalWeak) return [...prefix, isMiddleHamza ? HAMZA : c2, TANWEEN_KASRA]

        if (isMiddleHamza) return [...prefix, HAMZA_ON_YEH, KASRA, c3]

        if (isFinalHamza && hasPattern(verb, 'fa3ula-yaf3ulu')) return [c1, FATHA, c2, KASRA, YEH, HAMZA]

        if (isFinalHamza) return [...prefix, c2, KASRA, HAMZA_ON_YEH]

        if (verb.masdarPatterns?.some((pattern) => ['fu3ool', 'fa3al', 'fa3aal'].includes(pattern)))
          return [...prefix, c2, KASRA, c3]

        if (!isInitialWeak && hasPattern(verb, 'fa3ila-yaf3alu'))
          return [WAW, YEH].includes(c2) ? [...prefix, c2, KASRA, c3] : [c1, FATHA, c2, KASRA, YEH, c3]

        if (isMiddleWeak) return [...prefix, HAMZA_ON_YEH, KASRA, c3]

        return [...prefix, c2, KASRA, c3]
      }

      case 2: {
        const seatedC1 = c1 === ALIF_HAMZA ? HAMZA_ON_WAW : c1
        const seatedC3 = isFinalHamza ? HAMZA_ON_YEH : c3

        if (isFinalWeak) return [MEEM, DAMMA, seatedC1, FATHA, c2, SHADDA, TANWEEN_KASRA]

        return [MEEM, DAMMA, seatedC1, FATHA, c2, SHADDA, KASRA, seatedC3]
      }

      case 3: {
        // Defective Form III active participle: drop final weak and use tanween kasra (e.g., وفي → مُوَافٍ)
        const seatedC1 = isInitialHamza ? HAMZA_ON_WAW : c1
        const seatedC2 = isHamzatedLetter(c2) ? HAMZA_ON_YEH : c2
        const seatedC3 = isFinalHamza ? HAMZA_ON_YEH : c3

        if (isFinalWeak) return [MEEM, DAMMA, seatedC1, FATHA, ALIF, seatedC2, TANWEEN_KASRA]

        if (c2 === c3) return [MEEM, DAMMA, seatedC1, FATHA, ALIF, seatedC2, SHADDA]

        return [MEEM, DAMMA, seatedC1, FATHA, ALIF, seatedC2, KASRA, seatedC3]
      }

      case 4: {
        const prefix = [MEEM, DAMMA, isInitialHamza ? HAMZA_ON_WAW : c1]

        if (isInitialWeak && isFinalHamza) return [...prefix, c2, KASRA, HAMZA_ON_YEH]

        if (isInitialWeak) return [...prefix, c2, TANWEEN_KASRA]

        if (isFinalWeak) return [...prefix, SUKOON, c2, TANWEEN_KASRA]

        if (isMiddleWeak) return [...prefix, KASRA, YEH, c3]

        if (isFinalHamza) return [...prefix, SUKOON, c2, KASRA, HAMZA_ON_YEH]

        if (c2 === c3) return [...prefix, KASRA, c2, SHADDA]

        return [...prefix, SUKOON, c2, KASRA, c3]
      }

      case 5: {
        if (isFinalWeak) return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, c2, TANWEEN_KASRA, SHADDA]

        return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, c2, SHADDA, KASRA, c3]
      }

      case 6: {
        if (isFinalHamza) return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, ALIF, c3, TANWEEN_KASRA]

        if (c2 === c3) return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, ALIF, c2, SHADDA]

        return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, ALIF, isHamzatedLetter(c2) ? HAMZA_ON_YEH : c2, KASRA, c3]
      }

      case 7: {
        if (isMiddleWeak) return [MEEM, DAMMA, NOON, SUKOON, c1, FATHA, ALIF, c3]

        return [MEEM, DAMMA, NOON, SUKOON, c1, FATHA, c2, KASRA, c3]
      }

      case 8: {
        if (isInitialHamza || isInitialWeak) return [MEEM, DAMMA, TEH, SHADDA, FATHA, c2, KASRA, c3]

        if (isMiddleWeak) return [MEEM, DAMMA, c1, SUKOON, TEH, FATHA, ALIF, c3]

        return [MEEM, DAMMA, c1, SUKOON, TEH, FATHA, c2, KASRA, c3]
      }

      case 9: {
        return [MEEM, DAMMA, c1, SUKOON, c2, FATHA, c3, SHADDA]
      }

      case 10: {
        const prefix = [MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA]

        if (isMiddleWeak) return [...prefix, c1, KASRA, YEH, c3]

        if (isInitialWeak || isFinalWeak) return [...prefix, c1, SUKOON, c2, TANWEEN_KASRA]

        if (c2 === c3) return [...prefix, c1, KASRA, c2, SHADDA]

        return [...prefix, c1, SUKOON, c2, KASRA, isFinalHamza ? HAMZA_ON_YEH : c3]
      }
    }
  })()

  return result.join('').normalize('NFC')
}
