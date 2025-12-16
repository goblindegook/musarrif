import { resolveFormIPastVowel, resolveFormIPresentVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_HAMZA_BELOW,
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
  TANWEEN_KASRA,
  TEH,
  TEH_MARBUTA,
  WAW,
  weakLetterGlide,
  YEH,
} from '../letters'
import type { Verb } from '../verbs'
import { adjustDefective, removeTerminalCaseVowel, vowelFromRadical } from './nominals'

function masdar(verb: Verb): readonly string[] {
  const letters = [...verb.root]

  if (letters.length >= 5) {
    const [q1, ...rest] = letters
    const last = rest[rest.length - 1]
    const middle = rest.slice(0, -1).join(SUKOON)
    const base = [q1, FATHA, middle, SUKOON, last, FATHA, TEH_MARBUTA]
    return adjustDefective(base, last ?? q1, FATHA)
  }

  if (letters.length === 4) {
    const [q1, q2, q3, q4] = letters
    const isInitialHamza = q1 === ALIF_HAMZA
    const isMiddleWeak = isWeakLetter(q2) || isWeakLetter(q3)
    const isFinalWeak = isWeakLetter(q4)

    // Form IV quadriliteral: initial hamza + final weak (e.g., أنشأ → إِنْشَاء)
    if (verb.form === 4 && isInitialHamza && (isFinalWeak || q4 === ALIF_HAMZA)) {
      const finalGlide = q4 === ALIF_MAQSURA || q4 === ALIF_HAMZA ? HAMZA : weakLetterGlide(q4)
      return [ALIF_HAMZA_BELOW, KASRA, q2, SUKOON, q3, FATHA, ALIF, finalGlide]
    }

    // Form I quadriliteral: initial hamza + middle weak + final weak (e.g., أوفى → إِيفَاء)
    if (verb.form === 1 && isInitialHamza && isMiddleWeak && isFinalWeak) {
      const middleLetter = isWeakLetter(q2) ? q3 : q2
      const finalGlide = q4 === ALIF_MAQSURA ? HAMZA : weakLetterGlide(q4)
      return [ALIF_HAMZA_BELOW, KASRA, YEH, middleLetter, FATHA, ALIF, finalGlide]
    }

    const base =
      verb.form === 2
        ? [TEH, FATHA, q1, FATHA, q2, SUKOON, q3, FATHA, q4, FATHA, TEH_MARBUTA]
        : [q1, FATHA, q2, SUKOON, q3, FATHA, q4, FATHA, TEH_MARBUTA]
    return adjustDefective(base, q4, FATHA)
  }

  const [c1, c2, c3] = letters
  const isInitialWeak = isWeakLetter(c1)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const isInitialHamza = c1 === ALIF_HAMZA
  const isMiddleHamza = c2 === ALIF_HAMZA
  const isFinalHamza = c3 === ALIF_HAMZA

  switch (verb.form) {
    case 1: {
      if (verb.masdarPattern) {
        const finalRadical = isFinalHamza ? HAMZA : c3
        switch (verb.masdarPattern) {
          case 'fa3l':
            return adjustDefective([c1, FATHA, c2, SUKOON, finalRadical, DAMMA], finalRadical, FATHA)
          case 'fa3al':
            return adjustDefective([c1, FATHA, c2, FATHA, finalRadical, FATHA], finalRadical, FATHA)
          case 'fu3l':
            return adjustDefective([c1, DAMMA, c2, SUKOON, finalRadical, DAMMA], finalRadical, FATHA)
          case 'fu3ool':
            return adjustDefective([c1, DAMMA, c2, DAMMA, WAW, finalRadical, DAMMA], finalRadical, FATHA)
          case 'fi3aal':
            // Hollow fi3aal (e.g., قِيَام)
            if (isMiddleWeak) return [c1, KASRA, YEH, FATHA, ALIF, finalRadical]
            return adjustDefective([c1, KASRA, c2, FATHA, ALIF, finalRadical, FATHA, TEH_MARBUTA], finalRadical, FATHA)
          case 'fi3aala':
            return adjustDefective([c1, KASRA, c2, FATHA, ALIF, finalRadical, FATHA, TEH_MARBUTA], finalRadical, FATHA)
          case 'fi3la':
            return adjustDefective([c1, KASRA, c2, SUKOON, finalRadical, FATHA, TEH_MARBUTA], finalRadical, FATHA)
          case 'fi3l':
            // Hollow fi3l (e.g., صَيْر): middle weak becomes yeh, first vowel is fatḥa
            if (isMiddleWeak) return [c1, FATHA, YEH, SUKOON, finalRadical, DAMMA]
            return adjustDefective([c1, KASRA, c2, SUKOON, finalRadical, DAMMA], finalRadical, FATHA)
          case 'fa3aala':
            return adjustDefective([c1, FATHA, c2, FATHA, ALIF, finalRadical, FATHA, TEH_MARBUTA], finalRadical, FATHA)
          default:
            return []
        }
      }

      // Initial weak + final weak (e.g., وقي → وِقَايَة, ولى → وِلَايَة)
      if (isInitialWeak && !isMiddleWeak && isFinalWeak) {
        const finalGlide = c3 === ALIF_MAQSURA ? YEH : c3 === YEH ? YEH : WAW
        return [c1, KASRA, c2, FATHA, ALIF, finalGlide, FATHA, TEH_MARBUTA]
      }

      // Initial hamza + final weak (e.g., أتى → إِتْيَان)
      if (isInitialHamza && !isMiddleWeak && isFinalWeak) {
        const finalGlide = c3 === ALIF_MAQSURA ? YEH : c3 === YEH ? YEH : WAW
        return [ALIF_HAMZA_BELOW, KASRA, c2, SUKOON, finalGlide, FATHA, ALIF, NOON]
      }

      // Initial hamza + middle weak + final weak (e.g., أوي → إِوِيّ)
      if (isInitialHamza && isMiddleWeak && isFinalWeak) return [ALIF_HAMZA_BELOW, KASRA, WAW, KASRA, YEH, SHADDA]

      if (isMiddleHamza && isFinalWeak) {
        // Hamzated defective (e.g., رَأَى) yields رُؤْيَة
        const seatedHamza = vowelFromRadical('u') === DAMMA ? HAMZA_ON_WAW : HAMZA
        return [c1, DAMMA, seatedHamza, SUKOON, YEH, FATHA, TEH_MARBUTA]
      }

      if (isMiddleWeak) {
        // Doubly weak (middle wāw, final yā') uses حَوْي for the masdar
        if (c2 === WAW && c3 === YEH) return [c1, FATHA, c2, SUKOON, c3]

        switch (resolveFormIPresentVowel(verb)) {
          case 'u':
            return adjustDefective([c1, FATHA, WAW, SUKOON, c3, DAMMA], c3, FATHA)
          case 'i':
            return adjustDefective([c1, FATHA, YEH, SUKOON, c3, DAMMA], c3, FATHA)
          case 'a':
            return adjustDefective([c1, KASRA, YEH, FATHA, ALIF, c3, DAMMA], c3, FATHA)
          default:
            return []
        }
      }

      switch (resolveFormIPastVowel(verb)) {
        case 'u':
          return adjustDefective([c1, DAMMA, c2, DAMMA, WAW, SUKOON, c3], c3, FATHA)
        case 'i':
          return adjustDefective([c1, KASRA, c2, ALIF, c3, TEH_MARBUTA], c3, FATHA)
        case 'a':
          return adjustDefective([c1, KASRA, ALIF, c2, FATHA, c3, TEH_MARBUTA], c3, FATHA)
        default:
          return []
      }
    }

    case 2:
      // Defective Form II favors تَفْعِيَة (e.g., تَغْنِيَة) over the long-ī + tanween pattern
      if (isFinalWeak) return [TEH, FATHA, c1, SUKOON, c2, KASRA, YEH, FATHA, TEH_MARBUTA]
      return [TEH, FATHA, c1, SUKOON, c2, KASRA, YEH, c3]

    case 3:
      // Weak final radical: lengthen the preceding vowel and drop the weak letter (e.g., مُسَاوَاة)
      if (isFinalWeak) {
        // Hollow Form III: if c2 is ALIF, don't insert another ALIF (e.g., مُعَانَاة)
        if (c2 === ALIF) return [MEEM, DAMMA, c1, FATHA, ALIF, c3, FATHA, ALIF, TEH_MARBUTA]
        return [MEEM, DAMMA, c1, FATHA, ALIF, c2, FATHA, ALIF, TEH_MARBUTA]
      }

      // Hollow Form III: if c2 is ALIF, don't insert another ALIF (e.g., مُعَانَاة)
      if (c2 === ALIF) return [MEEM, DAMMA, c1, FATHA, ALIF, c3, FATHA, ALIF, TEH_MARBUTA]

      return [MEEM, DAMMA, c1, FATHA, ALIF, c2, FATHA, c3, FATHA, TEH_MARBUTA]

    case 4:
      // Initial hamza + middle weak + final weak (e.g., أوي → إِيوَاء)
      // Pattern: initial hamza → ī, middle weak → wāw, final weak → hamza
      // This must come before the general "Initial hamza" check
      if (isInitialHamza && isMiddleWeak && isFinalWeak) return [ALIF_HAMZA_BELOW, KASRA, YEH, WAW, FATHA, ALIF, HAMZA]

      // Initial hamza in Form IV coalesces to a long ī in the masdar: إِيمَان / إِيتَاء
      if (isInitialHamza) return [ALIF_HAMZA_BELOW, KASRA, YEH, c2, FATHA, ALIF, isFinalHamza ? HAMZA : c3]

      // Hollow Form IV: إِفَالَة pattern (e.g., إِقَامَة، إِعَانَة، إِضَافَة)
      if (isMiddleWeak) return [ALIF_HAMZA_BELOW, KASRA, c1, FATHA, ALIF, c3, FATHA, TEH_MARBUTA]

      // Weak final radical in Form IV takes the إِفْعَاء pattern
      if (isFinalWeak || isFinalHamza) return [ALIF_HAMZA_BELOW, KASRA, c1, SUKOON, c2, FATHA, ALIF, HAMZA]

      return adjustDefective([ALIF_HAMZA_BELOW, KASRA, c1, SUKOON, c2, FATHA, ALIF, c3, DAMMA], c3, FATHA)

    case 5:
      // Initial hamza + middle weak + final weak (e.g., أوي → تَأَوِّي)
      // Keep final weak with kasra, shadda on middle weak
      if (isInitialHamza && isMiddleWeak && isFinalWeak) return [TEH, FATHA, ALIF_HAMZA, FATHA, c2, SHADDA, KASRA, c3]

      // Defective Form V drops the weak final and takes kasratayn on the doubled middle radical: تَغَنٍّ
      if (isFinalWeak) return [TEH, FATHA, c1, FATHA, c2, SHADDA, TANWEEN_KASRA]

      return [TEH, FATHA, c1, FATHA, c2, SHADDA, DAMMA, c3]

    case 6:
      // Hollow defective Form VI with alif c2 doesn't repeat the alif (e.g., تَعَانٍ)
      if (c2 === ALIF && isFinalWeak) return [TEH, FATHA, c1, FATHA, ALIF, TANWEEN_KASRA]

      // Defective Form VI drops the weak final and takes kasratayn: تَفَاعٍ (e.g., تَلَاقٍ)
      if (isFinalWeak) return [TEH, FATHA, c1, FATHA, ALIF, c2, TANWEEN_KASRA]

      // Hollow Form VI with alif c2 drops the alif and takes tanween kasra pattern (e.g., تَعَانٍ)
      if (c2 === ALIF) return [TEH, FATHA, c1, FATHA, ALIF, c3, TANWEEN_KASRA]

      return [TEH, FATHA, c1, FATHA, ALIF, c2, DAMMA, c3]

    case 7:
      // Form VII masdar: اِفْتِعَال → nun-prefix + kasra on c1, fatḥa on c2 (e.g., اِنْفِجَار)
      // Defective Form VII drops the weak final and seats hamza: اِنْقِضَاء
      if (isFinalWeak) return [ALIF, KASRA, NOON, SUKOON, c1, KASRA, c2, FATHA, ALIF, HAMZA]

      if (isMiddleWeak) return [ALIF, KASRA, NOON, SUKOON, c1, KASRA, YEH, FATHA, ALIF, c3]

      return [ALIF, KASRA, NOON, SUKOON, c1, KASRA, c2, FATHA, ALIF, c3]

    case 8:
      // Weak final radical in Form VIII takes the اِفْتِعَاء pattern (no tanween)
      if (isFinalWeak) return [ALIF, KASRA, c1, SUKOON, TEH, KASRA, c2, FATHA, ALIF, HAMZA]

      if (isMiddleWeak) return [ALIF, KASRA, c1, SUKOON, TEH, KASRA, YEH, FATHA, ALIF, c3]

      if (c1 === WAW) return [ALIF, KASRA, TEH, SHADDA, KASRA, c2, FATHA, ALIF, c3]

      // Form VIII masdar: اِفْتِعَال
      return [ALIF, KASRA, c1, SUKOON, TEH, KASRA, c2, ALIF, c3]

    case 9:
      // Form IX masdar: اِفْعِلَال (e.g., اِحْمِرَار, اِصْفِرَار)
      return [ALIF, KASRA, c1, SUKOON, c2, KASRA, c3, FATHA, ALIF, c3]

    case 10: {
      // If the first radical is hamza, seat it on yeh after kasra (e.g., اِسْتِئْجارٌ)
      const seatedC1 = isInitialHamza ? HAMZA_ON_YEH : c1

      // Initial hamza + middle weak + final weak (e.g., أوي → اِسْتِئْواء)
      // Initial hamza is seated on yeh (ئ), then middle weak without vowel, then final weak becomes hamza
      if (isInitialHamza && isMiddleWeak && isFinalWeak)
        return [ALIF, KASRA, SEEN, SUKOON, TEH, KASRA, HAMZA_ON_YEH, SUKOON, c2, ALIF, HAMZA]

      // Hollow Form X masdar drops the glide and inserts alif with kasra on the ta: اِسْتِقَامَة، اِسْتِضَافَة
      if (isMiddleWeak) return [ALIF, KASRA, SEEN, SUKOON, TEH, KASRA, seatedC1, FATHA, ALIF, c3, FATHA, TEH_MARBUTA]

      // Defective Form X seats hamza and drops the weak final: اِسْتِيفَاء / اِسْتِرْضَاء
      if (isFinalWeak) return [ALIF, KASRA, SEEN, SUKOON, TEH, KASRA, seatedC1, SUKOON, c2, FATHA, ALIF, HAMZA]

      return [ALIF, KASRA, SEEN, SUKOON, TEH, KASRA, seatedC1, SUKOON, c2, FATHA, ALIF, c3]
    }
    default:
      return []
  }
}

export function deriveMasdar(verb: Verb): string {
  return removeTerminalCaseVowel(masdar(verb)).join('')
}
