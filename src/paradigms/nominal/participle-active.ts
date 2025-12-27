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
  isHamzatedLetter,
  isWeakLetter,
  KASRA,
  MEEM,
  NOON,
  removeTrailingDiacritics,
  SEEN,
  SHADDA,
  SUKOON,
  TANWEEN_KASRA,
  TEH,
  WAW,
  weakLetterGlide,
  YEH,
} from '../letters'
import type { Verb } from '../verbs'
import { adjustDefective, removeTerminalCaseVowel } from './nominals'

export function deriveActiveParticiple(verb: Verb): string | null {
  const result = (() => {
    const letters = [...verb.root]
    const [c1, c2, c3] = letters

    if (letters.length === 4) {
      const [q1, q2, q3, q4] = letters
      const isInitialHamza = q1 === ALIF_HAMZA
      const isFinalWeak = isWeakLetter(q4) || q4 === ALIF_HAMZA

      // Form IV quadriliteral: initial hamza + final weak (e.g., أنشأ → مُنْشِئ)
      if (verb.form === 4 && isInitialHamza && isFinalWeak) {
        const finalGlide = q4 === ALIF_MAQSURA || q4 === ALIF_HAMZA ? HAMZA_ON_YEH : weakLetterGlide(q4)
        return [MEEM, DAMMA, q2, SUKOON, q3, KASRA, finalGlide]
      }

      return [MEEM, DAMMA, q1, FATHA, q2, SUKOON, q3, KASRA, q4]
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

        if (verb.formPattern === 'fa3ila-yaf3alu' || verb.formPattern === 'fa3ila-yaf3ilu') {
          // Form I faʿila-yafʿalu/‑yafʿilu:
          // - fuʿول مصدر → فَاعِل (e.g., حَابِط)
          // - otherwise → فَعِيل (e.g., سَعِيد)
          if (verb.masdarPattern === 'fu3ool') return adjustDefective([c1, FATHA, ALIF, c2, KASRA, c3], c3, KASRA)

          return adjustDefective([c1, FATHA, c2, KASRA, YEH, c3], c3, KASRA)
        }

        if (c3 === ALIF_HAMZA) return [c1, FATHA, ALIF, c2, KASRA, HAMZA_ON_YEH]

        // Hollow verb with final hamza (e.g., جيء → جَاءٍ)
        if (isMiddleWeak && isHamzatedLetter(c3)) return [c1, FATHA, ALIF, c3, TANWEEN_KASRA]

        if (isMiddleWeak) return adjustDefective([c1, FATHA, ALIF, HAMZA_ON_YEH, KASRA, c3, DAMMA], c3, KASRA)

        // Defective final (e.g., وَفَى → وَافٍ). Drop weak c3 and place kasratayn on the preceding consonant.
        if (isFinalWeak) return [c1, FATHA, ALIF, c2, KASRA]

        return adjustDefective([c1, FATHA, ALIF, c2, KASRA, c3, DAMMA], c3, KASRA)
      }

      case 2:
        // Geminate Form II: c2 === c3, fatḥa on c1, kasra then shadda on c2, then c3 (e.g., مُحَبِّب)
        if (c2 === c3) return adjustDefective([MEEM, DAMMA, c1, FATHA, c2, KASRA, SHADDA, c3, DAMMA], c3, KASRA)

        // Defective Form II: drop final weak and place tanween kasra on the doubled middle radical (e.g., مُوَفٍّ)
        if (isFinalWeak) return [MEEM, DAMMA, c1, FATHA, c2, SHADDA, TANWEEN_KASRA]

        return adjustDefective([MEEM, DAMMA, c1, FATHA, c2, SHADDA, KASRA, c3, DAMMA], c3, KASRA)

      case 3:
        // Defective Form III active participle: drop final weak and use tanween kasra (e.g., وفي → مُوَافٍ)
        if (isFinalWeak) return [MEEM, DAMMA, c1, FATHA, ALIF, c2, TANWEEN_KASRA]
        return adjustDefective([MEEM, DAMMA, c1, FATHA, ALIF, c2, KASRA, c3], c3, KASRA)

      case 4: {
        const seatedC1 = c1 === ALIF_HAMZA ? HAMZA_ON_WAW : c1

        // Initial hamza + middle weak + final weak (e.g., أوي → مُؤْوٍ)
        if (c1 === ALIF_HAMZA && isMiddleWeak && isFinalWeak)
          return [MEEM, DAMMA, HAMZA_ON_WAW, SUKOON, c2, TANWEEN_KASRA]

        // Initial weak + final weak (e.g., وفي → مُوفٍ): initial weak becomes ū, drop final weak, use tanween kasra
        if (isInitialWeak && !isMiddleWeak && isFinalWeak) return [MEEM, DAMMA, WAW, c2, TANWEEN_KASRA]

        // Defective Form IV with final و or alif maqsura: drop final weak and use tanween kasra (e.g., مُعْطٍ, مُمْسٍ)
        if (c3 === WAW || c3 === ALIF_MAQSURA) return [MEEM, DAMMA, seatedC1, SUKOON, c2, TANWEEN_KASRA]

        // Final hamza seats on yeh after kasra (e.g., مُنْبِئ)
        if (c3 === ALIF_HAMZA) return [MEEM, DAMMA, seatedC1, SUKOON, c2, KASRA, HAMZA_ON_YEH]

        // Hollow Form IV active participle (e.g., مُقِيم)
        if (isMiddleWeak) return [MEEM, DAMMA, seatedC1, KASRA, YEH, c3]

        // Geminate Form IV active participle (e.g., مُحِبّ)
        if (c2 === c3) return adjustDefective([MEEM, DAMMA, seatedC1, KASRA, c2, SHADDA], c3, KASRA)

        const adjusted = [MEEM, DAMMA, seatedC1, SUKOON, c2, KASRA, c3]
        return adjustDefective(isFinalWeak ? removeTrailingDiacritics(adjusted) : adjusted, c3, KASRA)
      }

      case 5:
        // Initial hamza + middle weak + final weak (e.g., أوي → مُتَأَوٍّ)
        // Drop final weak and use tanween kasra on the doubled middle radical
        if (c1 === ALIF_HAMZA && isMiddleWeak && isFinalWeak)
          return [MEEM, DAMMA, TEH, FATHA, ALIF_HAMZA, FATHA, c2, SHADDA, TANWEEN_KASRA]

        // Defective Form V: drop final weak and place tanween kasra on the doubled middle radical (e.g., مُتَوَفٍّ)
        if (isFinalWeak) return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, c2, TANWEEN_KASRA, SHADDA]

        return adjustDefective([MEEM, DAMMA, TEH, FATHA, c1, FATHA, c2, SHADDA, KASRA, c3, DAMMA], c3, KASRA)

      case 6:
        // Hollow Form VI with final hamza (e.g., مُتَجَاءٍ)
        if (isMiddleWeak && isHamzatedLetter(c3)) return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, ALIF, c3, TANWEEN_KASRA]

        return adjustDefective([MEEM, DAMMA, TEH, FATHA, c1, FATHA, ALIF, c2, KASRA, c3, DAMMA], c3, KASRA)

      case 7:
        if (isMiddleWeak) return [MEEM, DAMMA, NOON, SUKOON, c1, FATHA, ALIF, c3]

        return adjustDefective([MEEM, DAMMA, NOON, SUKOON, c1, FATHA, c2, KASRA, c3, DAMMA], c3, KASRA)

      case 8:
        if (isInitialWeak) return [MEEM, DAMMA, TEH, SHADDA, FATHA, c2, KASRA, c3]

        if (isMiddleWeak) return [MEEM, DAMMA, c1, SUKOON, TEH, FATHA, ALIF, c3]

        return adjustDefective([MEEM, DAMMA, c1, SUKOON, TEH, FATHA, c2, KASRA, c3, DAMMA], c3, KASRA)

      case 9:
        return adjustDefective([MEEM, DAMMA, c1, SUKOON, c2, FATHA, c3, SHADDA], c3, KASRA)

      case 10: {
        // Initial hamza + middle weak + final weak (e.g., أوي → مُسْتَأْوٍ)
        // Initial hamza is kept as أْ, then middle weak with tanween kasra
        if (c1 === ALIF_HAMZA && isMiddleWeak && isFinalWeak)
          return [MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA, ALIF_HAMZA, SUKOON, c2, TANWEEN_KASRA]

        // Hollow Form X active participle (e.g., مُسْتَضِيف)
        if (isMiddleWeak) return [MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA, c1, KASRA, YEH, c3]

        // Defective Form X: preserve initial weak with sukoon, then c2 with kasra, then tanween kasra (e.g., وفي → مُسْتَوْفٍ)
        if (isFinalWeak && isInitialWeak && !isInitialHamza)
          return [MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA, c1, SUKOON, c2, TANWEEN_KASRA]

        return adjustDefective([MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA, c1, SUKOON, c2, KASRA, c3, DAMMA], c3, KASRA)
      }
      default:
        return []
    }
  })()

  return removeTerminalCaseVowel(result).join('').normalize('NFC')
}
