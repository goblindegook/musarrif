import {
  ALIF,
  ALIF_HAMZA,
  ALIF_MADDA,
  ALIF_MAQSURA,
  DAMMA,
  FATHA,
  HAMZA,
  HAMZA_ON_WAW,
  HAMZA_ON_YEH,
  KASRA,
  MEEM,
  NOON,
  SEEN,
  SHADDA,
  SUKOON,
  TANWEEN_KASRA,
  TEH,
  WAW,
  YEH,
} from '../constants'
import { isWeakLetter, stripTrailingDiacritics, weakLetterGlide } from '../helpers'
import type { Verb } from '../verbs'
import { adjustDefective, removeTerminalCaseVowel } from './nominals'

export function deriveActiveParticiple(verb: Verb): string | null {
  const result = (() => {
    const letters = [...verb.root]
    const [c1, c2, c3] = letters

    if (letters.length === 4) {
      const [q1, q2, q3, q4] = letters
      const isInitialHamza = q1 === ALIF_HAMZA
      const isMiddleWeak = isWeakLetter(q2) || isWeakLetter(q3)
      const isFinalWeak = isWeakLetter(q4) || q4 === ALIF_HAMZA

      // Form IV quadriliteral: initial hamza + final weak (e.g., أنشأ → مُنْشِئ)
      if (verb.form === 4 && isInitialHamza && isFinalWeak) {
        const finalGlide = q4 === ALIF_MAQSURA || q4 === ALIF_HAMZA ? HAMZA_ON_YEH : weakLetterGlide(q4)
        return [MEEM, DAMMA, q2, SUKOON, q3, KASRA, finalGlide]
      }

      // Form I quadriliteral: initial hamza + middle weak + final weak (e.g., أوفى → مُوفٍ)
      if (verb.form === 1 && isInitialHamza && isMiddleWeak && isFinalWeak) {
        const weakMiddle = isWeakLetter(q2) ? q2 : q3
        const strongMiddle = isWeakLetter(q2) ? q3 : q2
        return [MEEM, DAMMA, weakMiddle, strongMiddle, TANWEEN_KASRA]
      }

      if (verb.form === 1) return [MEEM, DAMMA, q1, FATHA, q2, SUKOON, q3, KASRA, q4]

      if (verb.form === 2)
        return adjustDefective([MEEM, DAMMA, TEH, FATHA, q1, FATHA, q2, SUKOON, q3, KASRA, q4], q4, KASRA)

      return adjustDefective([MEEM, DAMMA, q1, FATHA, q2, SUKOON, q3, KASRA, q4], q4, KASRA)
    }

    if (letters.length > 4) {
      const [q1, ...rest] = letters
      const last = rest[rest.length - 1]
      const middle = rest.slice(0, -1).join(SUKOON)
      const base = [MEEM, DAMMA, q1, FATHA, middle, SUKOON, last]
      return adjustDefective(base, last, KASRA)
    }

    const isInitialWeak = isWeakLetter(c1)
    const isInitialHamza = c1 === ALIF_HAMZA
    const isMiddleWeak = isWeakLetter(c2)
    const isFinalWeak = isWeakLetter(c3)

    switch (verb.form) {
      case 1: {
        // Initial weak + final weak (e.g., وقي → وَاقٍ, ولى → وَالٍ)
        if (isInitialWeak && !isMiddleWeak && isFinalWeak) return [c1, FATHA, ALIF, c2, TANWEEN_KASRA]

        // Initial hamza + middle weak + final weak triliteral (e.g., أوي → آوٍ)
        if (isInitialHamza && isMiddleWeak && isFinalWeak) return [ALIF_MADDA, c2, TANWEEN_KASRA]

        // Initial hamza + final weak (e.g., أتى → آتٍ)
        if (isInitialHamza && !isMiddleWeak && isFinalWeak) return [ALIF_MADDA, c2, TANWEEN_KASRA]

        // Assimilated (initial weak) Form I keeps the glide (e.g., وصل → وَاصِل)
        if (isInitialWeak && !isMiddleWeak && c2 !== ALIF_HAMZA && !isFinalWeak)
          return [c1, FATHA, ALIF, c2, KASRA, c3, DAMMA]

        // Hamzated defective (middle hamza, final glide) seats hamza on the line with tanween kasra: رَاءٍ
        if (c2 === ALIF_HAMZA && isFinalWeak) return [c1, FATHA, ALIF, HAMZA, TANWEEN_KASRA]

        // Doubly weak (middle wāw, final yā') yields حَاوٍ (drop final glide, kasratayn on wāw)
        if (c2 === WAW && c3 === YEH) return [c1, FATHA, ALIF, c2, TANWEEN_KASRA]

        if (verb.formPattern === 'fa3ila-yaf3alu' || verb.formPattern === 'fa3ila-yaf3ilu') {
          // Form I faʿila-yafʿalu/‑yafʿilu:
          // - fuʿول مصدر → فَاعِل (e.g., حَابِط)
          // - otherwise → فَعِيل (e.g., سَعِيد)
          if (verb.masdarPattern === 'fu3ool') return adjustDefective([c1, FATHA, ALIF, c2, KASRA, c3], c3, KASRA)

          return adjustDefective([c1, FATHA, c2, KASRA, YEH, c3], c3, KASRA)
        }

        if (c3 === ALIF_HAMZA) return [c1, FATHA, ALIF, c2, KASRA, HAMZA_ON_YEH]

        if (isMiddleWeak) return adjustDefective([c1, FATHA, ALIF, HAMZA_ON_YEH, KASRA, c3, DAMMA], c3, KASRA)

        // Defective final (e.g., وَفَى → وَافٍ). Drop weak c3 and place kasratayn on the preceding consonant.
        if (isFinalWeak) return c1 === ALIF_HAMZA ? [ALIF_MADDA, c2, KASRA] : [c1, FATHA, ALIF, c2, KASRA]

        const base = c1 === ALIF_HAMZA ? [ALIF_MADDA, c2, KASRA, c3, DAMMA] : [c1, FATHA, ALIF, c2, KASRA, c3, DAMMA]
        return adjustDefective(base, c3, KASRA)
      }

      case 2:
        // Geminate Form II: c2 === c3, fatḥa on c1, kasra then shadda on c2, then c3 (e.g., مُحَبِّب)
        if (c2 === c3) return adjustDefective([MEEM, DAMMA, c1, FATHA, c2, KASRA, SHADDA, c3, DAMMA], c3, KASRA)

        return adjustDefective([MEEM, DAMMA, c1, FATHA, c2, SHADDA, KASRA, c3, DAMMA], c3, KASRA)

      case 3:
        // Hollow Form III: if c2 is ALIF, don't insert another ALIF (e.g., مُعَانٍ)
        if (c2 === ALIF && isFinalWeak) return [MEEM, DAMMA, c1, FATHA, ALIF, TANWEEN_KASRA]

        // Weak final radical: drop the glide and place kasratayn on the preceding consonant (e.g., مُسَاوٍ)
        if (isFinalWeak) return [MEEM, DAMMA, c1, FATHA, ALIF, c2, TANWEEN_KASRA]

        // Hollow Form III: if c2 is ALIF, don't insert another ALIF (e.g., مُعَانٍ)
        if (c2 === ALIF) return [MEEM, DAMMA, c1, FATHA, ALIF, c3, TANWEEN_KASRA]

        return adjustDefective([MEEM, DAMMA, c1, FATHA, ALIF, c2, KASRA, c3], c3, KASRA)

      case 4: {
        const seatedC1 = c1 === ALIF_HAMZA ? HAMZA_ON_WAW : c1

        if (c3 === ALIF_MAQSURA) return [MEEM, DAMMA, seatedC1, SUKOON, c2, TANWEEN_KASRA]

        // Final hamza seats on yeh after kasra (e.g., مُنْبِئ)
        if (c3 === ALIF_HAMZA) return [MEEM, DAMMA, seatedC1, SUKOON, c2, KASRA, HAMZA_ON_YEH]

        // Hollow Form IV active participle (e.g., مُقِيم)
        if (isMiddleWeak) return [MEEM, DAMMA, seatedC1, KASRA, YEH, c3]

        // Geminate Form IV active participle (e.g., مُحِبّ)
        if (c2 === c3) {
          const geminated = [MEEM, DAMMA, seatedC1, KASRA, c2, SHADDA]
          return adjustDefective(isFinalWeak ? stripTrailingDiacritics(geminated) : geminated, c3, KASRA)
        }

        const adjusted = [MEEM, DAMMA, seatedC1, SUKOON, c2, KASRA, c3]
        return adjustDefective(isFinalWeak ? stripTrailingDiacritics(adjusted) : adjusted, c3, KASRA)
      }

      case 5:
        return adjustDefective([MEEM, DAMMA, TEH, FATHA, c1, FATHA, c2, SHADDA, KASRA, c3, DAMMA], c3, KASRA)

      case 6:
        // Hollow Form VI: if c2 is ALIF, don't insert another ALIF and use tanween kasra (e.g., مُتَعَانٍ)
        if (c2 === ALIF) return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, ALIF, c3, TANWEEN_KASRA]
        return adjustDefective([MEEM, DAMMA, TEH, FATHA, c1, FATHA, ALIF, c2, KASRA, c3, DAMMA], c3, KASRA)

      case 7:
        if (isMiddleWeak) return [MEEM, DAMMA, NOON, SUKOON, c1, FATHA, ALIF, c3]

        return adjustDefective([MEEM, DAMMA, NOON, SUKOON, c1, FATHA, c2, KASRA, c3, DAMMA], c3, KASRA)

      case 8:
        if (isInitialWeak) return [MEEM, DAMMA, TEH, SHADDA, FATHA, c2, KASRA, c3]

        if (isMiddleWeak) return [MEEM, DAMMA, c1, SUKOON, TEH, FATHA, ALIF, c3]

        // Drop the weak final radical and put kasratayn on the preceding consonant (e.g., مُنْتَهٍ)
        if (isFinalWeak) return [MEEM, DAMMA, c1, SUKOON, TEH, FATHA, c2, KASRA]

        return adjustDefective([MEEM, DAMMA, c1, SUKOON, TEH, FATHA, c2, KASRA, c3, DAMMA], c3, KASRA)

      case 9:
        return adjustDefective([MEEM, DAMMA, c1, SUKOON, c2, FATHA, c3, SHADDA], c3, KASRA)

      case 10: {
        // Hollow Form X active participle (e.g., مُسْتَضِيف)
        if (isMiddleWeak) return [MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA, c1, KASRA, YEH, c3]

        return adjustDefective([MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA, c1, SUKOON, c2, KASRA, c3, DAMMA], c3, KASRA)
      }
      default:
        return []
    }
  })()

  return removeTerminalCaseVowel(result)
}
