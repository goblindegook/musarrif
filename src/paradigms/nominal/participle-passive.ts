import { resolveFormIPresentVowel } from '../form-i-vowels'
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
        // Initial weak + final weak (e.g., وقي → مَوْقِيّ, ولى → مَوْلِيّ)
        if (isInitialWeak && isFinalWeak) return [MEEM, FATHA, c1, SUKOON, c2, KASRA, YEH, SHADDA]

        // Initial hamza + final weak (e.g., أتى → مَأْتِيّ)
        if (isInitialHamza && isFinalWeak) return [MEEM, FATHA, ALIF_HAMZA, SUKOON, c2, KASRA, YEH, SHADDA]

        if (isFinalHamza) return [MEEM, FATHA, c1, SUKOON, c2, DAMMA, WAW, HAMZA]

        // Hamzated defective: seat hamza on yeh with kasra, geminate the glide (e.g., مَرْئِيّ)
        if (c2 === ALIF_HAMZA && (c3 === YEH || c3 === ALIF_MAQSURA))
          return [MEEM, FATHA, c1, SUKOON, HAMZA_ON_YEH, KASRA, YEH, SHADDA]

        // Middle hamza in the maf'ūl pattern seats on wāw after ḍamma (e.g., سأل → مَسْؤُول)
        if (isMiddleHamza) return [MEEM, FATHA, c1, SUKOON, HAMZA_ON_WAW, DAMMA, WAW, c3]

        if (c2 === WAW && c3 === YEH) return [MEEM, FATHA, c1, SUKOON, c2, KASRA, c3, SHADDA]

        // Hollow verb passive participle: مَفْعُول pattern (e.g., مَقُول)
        // The glide (waw/yā'/alif) carries the vowel, so no sukoon is written before c3
        if (c2 === ALIF) return [MEEM, FATHA, c1, DAMMA, WAW, c3]
        if (isMiddleWeak) return [MEEM, FATHA, c1, ...longVowelFromPattern(resolveFormIPresentVowel(verb)), c3]

        // Defective Form I: final yā’/maqṣūra takes kasra + yā’ shadda (e.g., سعى → مَسْعِيّ)
        if (c3 === YEH || c3 === ALIF_MAQSURA) return [MEEM, FATHA, c1, SUKOON, c2, KASRA, YEH, SHADDA]

        // Standard maf'ūl pattern uses a long ū (no written sukoon on wāw)
        return [MEEM, FATHA, c1, SUKOON, c2, DAMMA, WAW, c3]
      }

      case 2: {
        const seatedC1 = c1 === ALIF_HAMZA ? HAMZA_ON_WAW : c1

        // Geminate Form II: c2 === c3, fatḥa on c1, fatḥa then shadda on c2, then c3 (e.g., مُحَبَّب)
        if (c2 === c3) return [MEEM, DAMMA, seatedC1, FATHA, c2, FATHA, SHADDA, c3]

        // Defective Form II: drop final weak and place tanween fatḥa on the doubled middle radical, convert to alif maqsura (e.g., مُوَفًّى)
        if (isFinalWeak) return [MEEM, DAMMA, seatedC1, FATHA, c2, SHADDA, TANWEEN_FATHA, ALIF_MAQSURA]

        return [MEEM, DAMMA, seatedC1, FATHA, c2, SHADDA, FATHA, c3]
      }

      case 3: {
        // Defective Form III passive participle: drop final weak and use tanween fatḥa + alif maqsura (e.g., وفي → مُوَافًى)
        const seatedC2 = isHamzatedLetter(c2) ? HAMZA : c2
        if (isFinalWeak) return [MEEM, DAMMA, c1, FATHA, ALIF, seatedC2, TANWEEN_FATHA, ALIF_MAQSURA]

        return [MEEM, DAMMA, c1, FATHA, ALIF, seatedC2, FATHA, c3]
      }

      case 4: {
        const seatedC1 = c1 === ALIF_HAMZA ? HAMZA_ON_WAW : c1

        // Initial hamza + middle weak + final weak (e.g., أوي → مُؤْوًى)
        if (c1 === ALIF_HAMZA && isMiddleWeak && isFinalWeak)
          return [MEEM, DAMMA, HAMZA_ON_WAW, SUKOON, c2, TANWEEN_FATHA, ALIF_MAQSURA]

        // Hollow Form IV passive participle (e.g., مُضَاف)
        if (isMiddleWeak) return [MEEM, DAMMA, seatedC1, FATHA, ALIF, c3]

        // Initial weak + final weak (e.g., وفي → مُوفًى): initial weak becomes ū, drop final weak, use tanween fatḥa + alif maqsura
        if (isInitialWeak && isFinalWeak) return [MEEM, DAMMA, WAW, c2, TANWEEN_FATHA, ALIF_MAQSURA]

        // Defective Form IV: drop final weak and use ALIF_MAQSURA (e.g., مُعْطَى, مُمْسَى)
        if (isFinalWeak) return [MEEM, DAMMA, seatedC1, SUKOON, c2, FATHA, ALIF_MAQSURA]

        if (c2 === c3) return [MEEM, DAMMA, seatedC1, FATHA, c2, SHADDA]

        return [MEEM, DAMMA, seatedC1, SUKOON, c2, FATHA, c3]
      }

      case 5: {
        // Defective Form V: drop final weak and place tanween fatḥa + alif maqsura on the doubled middle radical (e.g., مُتَوَفًّى)
        if (isFinalWeak) return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, c2, TANWEEN_FATHA, SHADDA, ALIF_MAQSURA]

        return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, c2, SHADDA, FATHA, c3]
      }

      case 6: {
        if (c2 === c3) return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, ALIF, c2, SHADDA]
        return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, ALIF, isHamzatedLetter(c2) ? HAMZA : c2, FATHA, c3]
      }

      case 7: {
        if (isMiddleWeak) return [MEEM, DAMMA, NOON, SUKOON, c1, FATHA, ALIF, c3]

        return [MEEM, DAMMA, NOON, SUKOON, c1, FATHA, c2, FATHA, c3]
      }

      case 8: {
        if (isInitialHamza || isInitialWeak) return [MEEM, DAMMA, TEH, SHADDA, FATHA, c2, FATHA, c3]

        if (isMiddleWeak) return [MEEM, DAMMA, c1, SUKOON, TEH, FATHA, ALIF, c3]

        // Weak final radical: drop the weak letter and place tanween fatḥ on the preceding consonant
        if (isFinalWeak) return [MEEM, DAMMA, c1, SUKOON, TEH, FATHA, c2, FATHA, ALIF_MAQSURA]

        return [MEEM, DAMMA, c1, SUKOON, TEH, FATHA, c2, FATHA, c3]
      }

      case 9: {
        return []
      }

      case 10: {
        // Initial hamza + middle weak + final weak (e.g., أوي → مُسْتَأْوًى)
        // Initial hamza is kept as أْ, then middle weak with tanween fatḥa and alif maqṣūra
        if (c1 === ALIF_HAMZA && isMiddleWeak && isFinalWeak)
          return [MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA, ALIF_HAMZA, SUKOON, c2, TANWEEN_FATHA, ALIF_MAQSURA]

        // Hollow Form X passive participle (e.g., مُسْتَضَاف)
        if (isMiddleWeak) return [MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA, c1, FATHA, ALIF, c3]

        if (c2 === c3) return [MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA, c1, FATHA, c2, SHADDA]

        // Defective Form X: preserve initial weak with sukoon, then c2 with tanween fatḥa and alif maqsura (e.g., وفي → مُسْتَوْفًى)
        if (isFinalWeak) return [MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA, c1, SUKOON, c2, TANWEEN_FATHA, ALIF_MAQSURA]

        return [MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA, c1, SUKOON, c2, FATHA, c3]
      }
    }
  })()

  return geminateDoubleLetters(result).join('').normalize('NFC')
}
