import { resolveFormIPresentVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_HAMZA_BELOW,
  ALIF_MADDA,
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
  shortVowelFromPattern,
  TANWEEN_KASRA,
  TEH,
  TEH_MARBUTA,
  WAW,
  YEH,
} from '../letters'
import type { MasdarPattern, Verb } from '../verbs'

function deriveMasdarFormI(verb: Verb, pattern?: MasdarPattern): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isInitialWeak = isWeakLetter(c1)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const isInitialHamza = isHamzatedLetter(c1)
  const isMiddleHamza = isHamzatedLetter(c2)
  const isFinalHamza = isHamzatedLetter(c3)
  const finalRadical = isFinalHamza ? HAMZA : c3
  const finalGlide = c3 === ALIF_MAQSURA || c3 === YEH ? YEH : WAW

  switch (pattern) {
    case 'fa3l':
      return geminateDoubleLetters([c1, FATHA, c2, SUKOON, finalRadical])

    case 'fa3al':
      return [c1, FATHA, c2, FATHA, finalRadical]

    case 'fa3aal':
      if (isMiddleWeak) return [c1, FATHA, WAW, FATHA, ALIF, finalRadical]
      if (isFinalWeak) return [c1, FATHA, c2, FATHA, ALIF, HAMZA]
      return [c1, FATHA, c2, FATHA, ALIF, finalRadical]

    case 'fu3l':
      return geminateDoubleLetters([c1, DAMMA, c2, SUKOON, finalRadical])

    case 'fu3ool':
      return [c1, DAMMA, c2, DAMMA, WAW, finalRadical]

    case 'fu3aal':
      if (isMiddleHamza) return [c1, DAMMA, HAMZA_ON_WAW, FATHA, ALIF, finalRadical]
      if (c3 === ALIF_MAQSURA || c3 === YEH) return [c1, DAMMA, c2, FATHA, ALIF, HAMZA]
      return [c1, DAMMA, c2, FATHA, ALIF, finalRadical]

    case 'fu3ul':
      if (c3 === WAW) return [c1, DAMMA, c2, DAMMA, finalRadical, SHADDA]
      return [c1, DAMMA, c2, DAMMA, finalRadical]

    case 'fi3aal':
      if (isMiddleWeak) return [c1, KASRA, YEH, FATHA, ALIF, finalRadical]
      return [c1, KASRA, c2, FATHA, ALIF, finalRadical, FATHA, TEH_MARBUTA]

    case 'fi3la':
      return [c1, KASRA, c2, SUKOON, finalRadical, FATHA, TEH_MARBUTA]

    case 'fi3l':
      return [c1, KASRA, c2, SUKOON, finalRadical]

    case 'fa3aala':
      return [c1, FATHA, c2, FATHA, ALIF, finalRadical, FATHA, TEH_MARBUTA]

    case 'fi3aala':
      return [c1, KASRA, c2, ALIF, finalRadical, FATHA, TEH_MARBUTA]

    case 'ifi3aal':
      // Attested triliteral with this pattern: أوي
      return [ALIF_HAMZA_BELOW, KASRA, c2, KASRA, c3, SHADDA]

    case 'mimi': {
      // a -> a, i -> i, u -> i
      const vowelPattern = resolveFormIPresentVowel(verb) !== 'a' ? 'i' : 'a'
      if (isMiddleWeak) return [MEEM, FATHA, c1, ...longVowelFromPattern(vowelPattern), c3]
      return [MEEM, FATHA, c1, SUKOON, c2, shortVowelFromPattern(vowelPattern), c3]
    }

    default:
      // Initial weak + middle hamza + final weak (e.g., وأى → وَأْي)
      if (isInitialWeak && isMiddleHamza && isFinalWeak) return [c1, FATHA, ALIF_HAMZA, SUKOON, finalGlide]

      // Initial weak + final weak (e.g., وقي → وِقَايَة, ولى → وِلَايَة)
      if (isInitialWeak && !isMiddleWeak && isFinalWeak)
        return [c1, KASRA, c2, FATHA, ALIF, finalGlide, FATHA, TEH_MARBUTA]

      // Initial hamza + final weak (e.g., أتى → إِتْيَان)
      if (isInitialHamza && !isMiddleWeak && isFinalWeak)
        return [ALIF_HAMZA_BELOW, KASRA, c2, SUKOON, finalGlide, FATHA, ALIF, NOON]

      // Initial hamza + middle weak + final weak (e.g., أوي → إِوِيّ)
      if (isInitialHamza && isMiddleWeak && isFinalWeak)
        return [ALIF_HAMZA_BELOW, KASRA, WAW, KASRA, finalGlide, SHADDA]

      // Hamzated defective (e.g., رَأَى) yields رُؤْيَة
      if (isMiddleHamza && isFinalWeak) return [c1, DAMMA, HAMZA_ON_WAW, SUKOON, finalGlide, FATHA, TEH_MARBUTA]

      // Hollow verb with final hamza (e.g., جيء → مَجِيء)
      if (isMiddleWeak && isFinalHamza) return [MEEM, FATHA, c1, KASRA, YEH, c3]

      // Doubly weak (middle wāw, final yā') uses حَوْي for the masdar
      if (c2 === WAW && c3 === YEH) return [c1, FATHA, c2, SUKOON, c3]

      if (isMiddleWeak) {
        const hollowGlide = c2 === ALIF ? longVowelFromPattern(resolveFormIPresentVowel(verb))[1] : c2
        return [c1, FATHA, hollowGlide === YEH ? YEH : WAW, SUKOON, c3]
      }

      return []
  }
}

function deriveMasdarFormII(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isFinalWeak = isWeakLetter(c3)

  // Defective Form II favors تَفْعِيَة (e.g., تَغْنِيَة) over the long-ī + tanween pattern
  if (isFinalWeak) return [TEH, FATHA, c1, SUKOON, c2, KASRA, YEH, FATHA, TEH_MARBUTA]

  return [TEH, FATHA, c1, SUKOON, c2, KASRA, YEH, c3]
}

function deriveMasdarFormIII(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const seatedC2 = isHamzatedLetter(c2) ? HAMZA : c2

  // Defective Form III masdar: drop final weak and use مُفَاعَاة pattern (e.g., وفي → مُوَافَاة)
  // Pattern: مُ + فَ + ا + عَ + ا + ء + ة = مُفَاعَاة
  // Similar to Form I fu3aal but with MEEM prefix and TEH_MARBUTA suffix
  if (c3 === ALIF_MAQSURA || c3 === YEH)
    return [MEEM, DAMMA, c1, FATHA, ALIF, seatedC2, FATHA, ALIF, HAMZA, TEH_MARBUTA]

  return [MEEM, DAMMA, c1, FATHA, ALIF, seatedC2, FATHA, c3, FATHA, TEH_MARBUTA]
}

function deriveMasdarFormIV(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isInitialWeak = isWeakLetter(c1)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const isInitialHamza = isHamzatedLetter(c1)
  const isFinalHamza = isHamzatedLetter(c3)

  // Initial hamza + middle weak + final weak (e.g., أوي → إِيوَاء)
  // Pattern: initial hamza → ī, middle weak → wāw, final weak → hamza
  // This must come before the general "Initial hamza" check
  if (isInitialHamza && isMiddleWeak && isFinalWeak) return [ALIF_HAMZA_BELOW, KASRA, YEH, WAW, FATHA, ALIF, HAMZA]

  // Initial weak + final weak (e.g., وفي → إِيفَاء): initial weak drops, becomes ī
  if (isInitialWeak && !isMiddleWeak && isFinalWeak) return [ALIF_HAMZA_BELOW, KASRA, YEH, c2, FATHA, ALIF, HAMZA]

  // Initial hamza in Form IV coalesces to a long ī in the masdar: إِيمَان / إِيتَاء
  if (isInitialHamza) return [ALIF_HAMZA_BELOW, KASRA, YEH, c2, FATHA, ALIF, isFinalHamza ? HAMZA : c3]

  // Hollow Form IV: إِفَالَة pattern (e.g., إِقَامَة، إِعَانَة، إِضَافَة)
  if (isMiddleWeak) return [ALIF_HAMZA_BELOW, KASRA, c1, FATHA, ALIF, c3, FATHA, TEH_MARBUTA]

  // Weak final radical in Form IV takes the إِفْعَاء pattern
  if (isFinalWeak || isFinalHamza) return [ALIF_HAMZA_BELOW, KASRA, c1, SUKOON, c2, FATHA, ALIF, HAMZA]

  return [ALIF_HAMZA_BELOW, KASRA, c1, SUKOON, c2, FATHA, ALIF, c3]
}

function deriveMasdarFormV(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const isInitialHamza = isHamzatedLetter(c1)

  // Initial hamza + middle weak + final weak (e.g., أوي → تَأَوِّي)
  // Keep final weak with kasra, shadda on middle weak
  if (isInitialHamza && isMiddleWeak && isFinalWeak) return [TEH, FATHA, ALIF_HAMZA, FATHA, c2, SHADDA, KASRA, c3]

  // Defective Form V drops the weak final and takes kasratayn on the doubled middle radical: تَغَنٍّ
  if (isFinalWeak) return [TEH, FATHA, c1, FATHA, c2, SHADDA, TANWEEN_KASRA]

  return [TEH, FATHA, c1, FATHA, c2, SHADDA, DAMMA, c3]
}

function deriveMasdarFormVI(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const isFinalHamza = isHamzatedLetter(c3)
  const seatedC2WithDamma = isHamzatedLetter(c2) ? HAMZA_ON_WAW : c2

  // Hollow defective Form VI with alif c2 doesn't repeat the alif (e.g., تَعَانٍ)
  if (c2 === ALIF && isFinalWeak) return [TEH, FATHA, c1, FATHA, ALIF, TANWEEN_KASRA]

  // Hollow Form VI with final hamza (e.g., تَجَاءٍ)
  if (isMiddleWeak && isFinalHamza) return [TEH, FATHA, c1, FATHA, ALIF, c3, TANWEEN_KASRA]

  // Defective Form VI drops the weak final and takes kasratayn: تَفَاعٍ (e.g., تَلَاقٍ)
  if (isFinalWeak) return [TEH, FATHA, c1, FATHA, ALIF, c2, TANWEEN_KASRA]

  // Hollow Form VI with alif c2 drops the alif and takes tanween kasra pattern (e.g., تَعَانٍ)
  if (c2 === ALIF) return [TEH, FATHA, c1, FATHA, ALIF, c3, TANWEEN_KASRA]

  return [TEH, FATHA, c1, FATHA, ALIF, seatedC2WithDamma, DAMMA, c3]
}

function deriveMasdarFormVII(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]

  // Form VII masdar: اِفْتِعَال → nun-prefix + kasra on c1, fatḥa on c2 (e.g., اِنْفِجَار)
  // Defective Form VII drops the weak final and seats hamza: اِنْقِضَاء
  if (isWeakLetter(c3)) return [ALIF, KASRA, NOON, SUKOON, c1, KASRA, c2, FATHA, ALIF, HAMZA]

  if (isWeakLetter(c2)) return [ALIF, KASRA, NOON, SUKOON, c1, KASRA, YEH, FATHA, ALIF, c3]

  return [ALIF, KASRA, NOON, SUKOON, c1, KASRA, c2, FATHA, ALIF, c3]
}

function deriveMasdarFormVIII(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]

  if (isWeakLetter(c1) || isHamzatedLetter(c1)) return [ALIF, KASRA, TEH, SHADDA, KASRA, c2, FATHA, ALIF, c3]

  if (isWeakLetter(c3)) return [ALIF, KASRA, c1, SUKOON, TEH, KASRA, c2, FATHA, ALIF, HAMZA]

  if (isWeakLetter(c2)) return [ALIF, KASRA, c1, SUKOON, TEH, KASRA, YEH, FATHA, ALIF, c3]

  return [ALIF, KASRA, c1, SUKOON, TEH, KASRA, c2, FATHA, ALIF, c3]
}

function deriveMasdarFormIX(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]

  // Form IX masdar: اِفْعِلَال (e.g., اِحْمِرَار, اِصْفِرَار)
  return [ALIF, KASRA, c1, SUKOON, c2, KASRA, c3, FATHA, ALIF, c3]
}

function deriveMasdarFormX(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isInitialWeak = isWeakLetter(c1)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const isInitialHamza = isHamzatedLetter(c1)

  // Assimilated defective Form X: initial weak drops, then c2 with fatḥa, then alif + hamza (e.g., وفي → اِسْتِفَاء)
  if (isInitialWeak && isFinalWeak) return [ALIF, KASRA, SEEN, SUKOON, TEH, KASRA, c2, FATHA, ALIF, HAMZA]

  // If the first radical is hamza, seat it on yeh after kasra (e.g., اِسْتِئْجارٌ)
  const seatedC1 = isInitialHamza ? HAMZA_ON_YEH : c1

  // Initial hamza + middle weak + final weak (e.g., أوي → اِسْتِئْواء)
  // Initial hamza is seated on yeh (ئ), then middle weak without vowel, then final weak becomes hamza
  if (isMiddleWeak && isFinalWeak) return [ALIF, KASRA, SEEN, SUKOON, TEH, KASRA, seatedC1, SUKOON, c2, ALIF, HAMZA]

  // Hollow Form X masdar drops the glide and inserts alif with kasra on the ta: اِسْتِقَامَة، اِسْتِضَافَة
  if (isMiddleWeak) return [ALIF, KASRA, SEEN, SUKOON, TEH, KASRA, seatedC1, FATHA, ALIF, c3, FATHA, TEH_MARBUTA]

  if (isHamzatedLetter(c2)) return [ALIF, KASRA, SEEN, SUKOON, TEH, KASRA, seatedC1, SUKOON, ALIF_MADDA, c3]

  if (isHamzatedLetter(c3) || isFinalWeak)
    return [ALIF, KASRA, SEEN, SUKOON, TEH, KASRA, seatedC1, SUKOON, c2, FATHA, ALIF, HAMZA]

  return [ALIF, KASRA, SEEN, SUKOON, TEH, KASRA, seatedC1, SUKOON, c2, FATHA, ALIF, c3]
}

function deriveMasdarQuadriliteral(verb: Verb): readonly string[] {
  const [q1, q2, q3, q4] = Array.from(verb.root)

  // Form IV quadriliteral: initial hamza + final hamza (e.g., أنشأ → إِنْشَاء)
  if (verb.form === 4 && isHamzatedLetter(q1) && isHamzatedLetter(q4))
    return [ALIF_HAMZA_BELOW, KASRA, q2, SUKOON, q3, FATHA, ALIF, HAMZA]

  return [q1, FATHA, q2, SUKOON, q3, FATHA, q4, FATHA, TEH_MARBUTA]
}

function masdar(verb: Verb, pattern?: MasdarPattern): readonly string[] {
  if (verb.root.length === 4) return deriveMasdarQuadriliteral(verb)

  switch (verb.form) {
    case 1:
      if (pattern) return deriveMasdarFormI(verb, pattern)
      return deriveMasdarFormI(verb)
    case 2:
      return deriveMasdarFormII(verb)
    case 3:
      return deriveMasdarFormIII(verb)
    case 4:
      return deriveMasdarFormIV(verb)
    case 5:
      return deriveMasdarFormV(verb)
    case 6:
      return deriveMasdarFormVI(verb)
    case 7:
      return deriveMasdarFormVII(verb)
    case 8:
      return deriveMasdarFormVIII(verb)
    case 9:
      return deriveMasdarFormIX(verb)
    case 10:
      return deriveMasdarFormX(verb)
    default:
      return []
  }
}

export function deriveMasdar(verb: Verb): readonly string[] {
  const patterns = verb.form === 1 && verb.masdarPatterns ? verb.masdarPatterns : [undefined]
  return patterns.map((pattern) => masdar(verb, pattern).join('').normalize('NFC'))
}
