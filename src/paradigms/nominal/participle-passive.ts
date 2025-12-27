import { resolveFormIPresentVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_MAQSURA,
  DAMMA,
  FATHA,
  HAMZA,
  HAMZA_ON_WAW,
  HAMZA_ON_YEH,
  isWeakLetter,
  KASRA,
  MEEM,
  NOON,
  SEEN,
  SHADDA,
  SUKOON,
  TANWEEN_FATHA,
  TEH,
  WAW,
  weakLetterGlide,
  YEH,
} from '../letters'
import type { Verb } from '../verbs'
import { adjustDefective, removeTerminalCaseVowel, vowelFromRadical } from './nominals'

export function derivePassiveParticiple(verb: Verb): string {
  if (verb.form === 9 || verb.noPassiveParticiple) return ''

  const result = (() => {
    const letters = [...verb.root]
    const [c1, c2, c3] = letters

    if (letters.length === 4) {
      const [q1, q2, q3, q4] = letters
      const isInitialHamza = q1 === ALIF_HAMZA
      const isFinalWeak = isWeakLetter(q4)

      // Form IV quadriliteral: initial hamza + final weak (e.g., أنشأ → مُنْشَأ)
      if (verb.form === 4 && isInitialHamza && (isFinalWeak || q4 === ALIF_HAMZA)) {
        const finalGlide = q4 === ALIF_MAQSURA || q4 === ALIF_HAMZA ? ALIF_HAMZA : weakLetterGlide(q4)
        return [MEEM, DAMMA, q2, SUKOON, q3, FATHA, finalGlide]
      }

      if (verb.form === 1) {
        if (q1 === TEH) {
          // Initial TEH: مُفَعْلَل (e.g., مُتَرْجَم)
          return [MEEM, DAMMA, q1, FATHA, q2, SUKOON, q3, FATHA, q4]
        }
        // Default Form I quadriliteral: مُفَعْلَل (e.g., مُدَحْرَج)
        return [MEEM, DAMMA, q1, FATHA, q2, SUKOON, q3, FATHA, q4]
      }
      const base =
        verb.form === 2
          ? [MEEM, DAMMA, TEH, FATHA, q1, FATHA, q2, SUKOON, q3, FATHA, q4]
          : [MEEM, DAMMA, q1, FATHA, q2, SUKOON, q3, FATHA, q4]
      return adjustDefective(base, q4, FATHA)
    }

    const isInitialWeak = isWeakLetter(c1)
    const isInitialHamza = c1 === ALIF_HAMZA
    const isMiddleWeak = isWeakLetter(c2)
    const isFinalWeak = isWeakLetter(c3)

    switch (verb.form) {
      case 1: {
        // Initial weak + final weak (e.g., وقي → مَوْقِيّ, ولى → مَوْلِيّ)
        if (isInitialWeak && !isMiddleWeak && isFinalWeak) {
          return [MEEM, FATHA, c1, SUKOON, c2, KASRA, YEH, SHADDA]
        }

        // Initial hamza + final weak (e.g., أتى → مَأْتِيّ)
        if (isInitialHamza && !isMiddleWeak && isFinalWeak) {
          return [MEEM, FATHA, ALIF_HAMZA, SUKOON, c2, KASRA, YEH, SHADDA]
        }

        // Assimilated (initial weak) Form I keeps the glide (e.g., وصل → مَوْصُول)
        if (isInitialWeak && !isMiddleWeak && c2 !== ALIF_HAMZA && !isFinalWeak)
          return [MEEM, FATHA, c1, SUKOON, c2, DAMMA, WAW, c3, DAMMA]

        if (c3 === ALIF_HAMZA) return [MEEM, FATHA, c1, SUKOON, c2, DAMMA, WAW, HAMZA]

        // Hamzated defective: seat hamza on yeh with kasra, geminate the glide (e.g., مَرْئِيّ)
        if (c2 === ALIF_HAMZA && (c3 === YEH || c3 === ALIF_MAQSURA))
          return [MEEM, FATHA, c1, SUKOON, HAMZA_ON_YEH, KASRA, YEH, SHADDA]

        // Doubly weak (middle wāw, final yā') yields مَحْوِيّ
        if (c2 === WAW && c3 === YEH) return [MEEM, FATHA, c1, SUKOON, c2, KASRA, YEH, SHADDA]

        if (isMiddleWeak) {
          const vowel = resolveFormIPresentVowel(verb)
          const glide = vowel === 'u' ? WAW : vowel === 'i' ? YEH : ALIF
          return adjustDefective([MEEM, FATHA, c1, vowelFromRadical(vowel), glide, SUKOON, c3, DAMMA], c3, FATHA)
        }

        // Standard maf'ūl pattern uses a long ū (no written sukoon on wāw)
        return adjustDefective([MEEM, FATHA, c1, SUKOON, c2, DAMMA, WAW, c3, DAMMA], c3, FATHA)
      }

      case 2:
        // Geminate Form II: c2 === c3, fatḥa on c1, fatḥa then shadda on c2, then c3 (e.g., مُحَبَّب)
        if (c2 === c3) return adjustDefective([MEEM, DAMMA, c1, FATHA, c2, FATHA, SHADDA, c3, DAMMA], c3, FATHA)

        // Defective Form II: drop final weak and place tanween fatḥa on the doubled middle radical, convert to alif maqsura (e.g., مُوَفًّى)
        if (isFinalWeak) return [MEEM, DAMMA, c1, FATHA, c2, SHADDA, TANWEEN_FATHA, ALIF_MAQSURA]

        return adjustDefective([MEEM, DAMMA, c1, FATHA, c2, SHADDA, FATHA, c3, DAMMA], c3, FATHA)

      case 3:
        // Defective Form III passive participle: drop final weak and use tanween fatḥa + alif maqsura (e.g., وفي → مُوَافًى)
        if (isFinalWeak) return [MEEM, DAMMA, c1, FATHA, ALIF, c2, TANWEEN_FATHA, ALIF_MAQSURA]
        return adjustDefective([MEEM, DAMMA, c1, FATHA, ALIF, c2, FATHA, c3], c3, FATHA)

      case 4: {
        const seatedC1 = c1 === ALIF_HAMZA ? HAMZA_ON_WAW : c1

        // Initial hamza + middle weak + final weak (e.g., أوي → مُؤْوًى)
        if (c1 === ALIF_HAMZA && isMiddleWeak && isFinalWeak)
          return [MEEM, DAMMA, HAMZA_ON_WAW, SUKOON, c2, TANWEEN_FATHA, ALIF_MAQSURA]

        // Initial weak + final weak (e.g., وفي → مُوفًى): initial weak becomes ū, drop final weak, use tanween fatḥa + alif maqsura
        if (isInitialWeak && !isMiddleWeak && isFinalWeak) return [MEEM, DAMMA, WAW, c2, TANWEEN_FATHA, ALIF_MAQSURA]

        // Hollow Form IV passive participle (e.g., مُضَاف)
        if (isMiddleWeak) return [MEEM, DAMMA, seatedC1, FATHA, ALIF, c3]

        // Defective Form IV: drop final weak and use ALIF_MAQSURA (e.g., مُعْطَى, مُمْسَى)
        if (isFinalWeak) return [MEEM, DAMMA, seatedC1, SUKOON, c2, FATHA, ALIF_MAQSURA]

        if (c2 === c3) return adjustDefective([MEEM, DAMMA, seatedC1, FATHA, c2, SHADDA], c3, FATHA)

        return adjustDefective([MEEM, DAMMA, seatedC1, SUKOON, c2, FATHA, c3], c3, FATHA)
      }

      case 5:
        // Defective Form V: drop final weak and place tanween fatḥa + alif maqsura on the doubled middle radical (e.g., مُتَوَفًّى)
        if (isFinalWeak) return [MEEM, DAMMA, TEH, FATHA, c1, FATHA, c2, TANWEEN_FATHA, SHADDA, ALIF_MAQSURA]

        return adjustDefective([MEEM, DAMMA, TEH, FATHA, c1, FATHA, c2, SHADDA, FATHA, c3, DAMMA], c3, FATHA)

      case 6:
        return adjustDefective([MEEM, DAMMA, TEH, FATHA, c1, FATHA, ALIF, c2, FATHA, c3, DAMMA], c3, FATHA)

      case 7:
        if (isMiddleWeak) return [MEEM, DAMMA, NOON, SUKOON, c1, FATHA, ALIF, c3]

        return adjustDefective([MEEM, DAMMA, NOON, SUKOON, c1, FATHA, c2, FATHA, c3, DAMMA], c3, FATHA)

      case 8:
        // Weak final radical: drop the weak letter and place tanween fatḥ on the preceding consonant
        if (isFinalWeak) return [MEEM, DAMMA, c1, SUKOON, TEH, FATHA, c2, FATHA, ALIF_MAQSURA]

        if (isInitialWeak) return [MEEM, DAMMA, TEH, SHADDA, FATHA, c2, FATHA, c3]

        if (isMiddleWeak) return [MEEM, DAMMA, c1, SUKOON, TEH, FATHA, ALIF, c3]

        return adjustDefective([MEEM, DAMMA, c1, SUKOON, TEH, FATHA, c2, FATHA, c3, DAMMA], c3, FATHA)

      case 10:
        // Initial hamza + middle weak + final weak (e.g., أوي → مُسْتَأْوًى)
        // Initial hamza is kept as أْ, then middle weak with tanween fatḥa and alif maqṣūra
        if (c1 === ALIF_HAMZA && isMiddleWeak && isFinalWeak)
          return [MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA, ALIF_HAMZA, SUKOON, c2, TANWEEN_FATHA, ALIF_MAQSURA]

        // Hollow Form X passive participle (e.g., مُسْتَضَاف)
        if (isMiddleWeak) return [MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA, c1, FATHA, ALIF, c3]

        // Defective Form X: initial weak (but not hamza) drops, then c2 with tanween fatḥa and alif maqsura (e.g., وفي → مُسْتَفًى)
        if (isFinalWeak) {
          if (isInitialWeak && !isInitialHamza) {
            return [MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA, c2, TANWEEN_FATHA, ALIF_MAQSURA]
          }
          return adjustDefective([MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA, c1, SUKOON, c2, FATHA, c3, DAMMA], c3, FATHA)
        }

        return adjustDefective([MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA, c1, SUKOON, c2, FATHA, c3, DAMMA], c3, FATHA)

      default:
        return []
    }
  })()

  return removeTerminalCaseVowel(result).join('').normalize('NFC')
}
