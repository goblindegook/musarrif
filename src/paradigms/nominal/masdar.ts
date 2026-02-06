import { hasPattern, isFormIPresentVowel, resolveFormIPresentVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_HAMZA_BELOW,
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
  TANWEEN_FATHA,
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
      if (isMiddleHamza) return geminateDoubleLetters([c1, FATHA, ALIF_HAMZA, SUKOON, finalRadical])
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
      return [c1, DAMMA, c2, DAMMA, finalRadical, SHADDA]

    case 'fi3aal': {
      const seatedC1 = isInitialHamza ? ALIF_HAMZA_BELOW : c1
      if (isMiddleWeak) return [seatedC1, KASRA, YEH, FATHA, ALIF, finalRadical]
      if (isFinalWeak) return [seatedC1, KASRA, c2, FATHA, ALIF, HAMZA]
      return [seatedC1, KASRA, c2, FATHA, ALIF, finalRadical, FATHA, TEH_MARBUTA]
    }

    case 'fi3la':
      return [c1, KASRA, c2, SUKOON, finalRadical, FATHA, TEH_MARBUTA]

    case 'fi3al':
      return [c1, KASRA, c2, FATHA, finalRadical]

    case 'fi3an':
      return [isInitialHamza ? ALIF_HAMZA_BELOW : c1, KASRA, c2, TANWEEN_FATHA, ALIF_MAQSURA]

    case 'fi3l':
      return [c1, KASRA, c2, SUKOON, finalRadical]

    case 'fa3aala':
      return [c1, FATHA, c2, FATHA, ALIF, finalRadical, FATHA, TEH_MARBUTA]

    case 'fi3aala':
      if (isFinalWeak) return [c1, KASRA, c2, FATHA, ALIF, YEH, FATHA, TEH_MARBUTA]
      return [c1, KASRA, c2, ALIF, finalRadical, FATHA, TEH_MARBUTA]

    case 'ifi3aal':
      // Attested triliteral with this pattern: أوي
      return [ALIF_HAMZA_BELOW, KASRA, c2, KASRA, c3, SHADDA]

    case 'mimi': {
      // a -> a, i -> i, u -> i
      const vowelPattern = isFormIPresentVowel(verb, 'a') ? 'a' : 'i'
      if (isMiddleWeak) return [MEEM, FATHA, c1, ...longVowelFromPattern(vowelPattern), c3]
      return [MEEM, FATHA, c1, SUKOON, c2, shortVowelFromPattern(vowelPattern), c3]
    }

    default:
      if (isInitialWeak && isMiddleHamza && isFinalWeak) return [c1, FATHA, ALIF_HAMZA, SUKOON, finalGlide]

      if (isInitialWeak && !isMiddleWeak && isFinalWeak)
        return [c1, KASRA, c2, FATHA, ALIF, finalGlide, FATHA, TEH_MARBUTA]

      if (isInitialHamza && !isMiddleWeak && isFinalWeak)
        return [ALIF_HAMZA_BELOW, KASRA, c2, SUKOON, finalGlide, FATHA, ALIF, NOON]

      if (isMiddleHamza && isFinalWeak) return [c1, DAMMA, HAMZA_ON_WAW, SUKOON, finalGlide, FATHA, TEH_MARBUTA]

      if (isMiddleWeak && isFinalHamza) return [MEEM, FATHA, c1, KASRA, YEH, c3]

      if (c2 === WAW && c3 === YEH) return [c1, DAMMA, c2, SHADDA, FATHA, TEH_MARBUTA]

      if (c3 === HAMZA && hasPattern(verb, 'fa3ula-yaf3ulu'))
        return [c1, DAMMA, c2, SUKOON, ALIF_HAMZA, FATHA, TEH_MARBUTA]

      if (isFinalWeak && !isMiddleWeak) return [c1, DAMMA, c2, FATHA, ALIF, HAMZA]

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
  const isFinalHamza = isHamzatedLetter(c3)
  const prefix = [TEH, FATHA, c1, SUKOON, c2, KASRA]

  if (c2 === YEH && c3 === YEH) return [TEH, FATHA, c1, KASRA, c2, SHADDA, FATHA, TEH_MARBUTA]

  if (isFinalWeak) return [...prefix, YEH, FATHA, TEH_MARBUTA]

  if (isFinalHamza) return [...prefix, HAMZA_ON_YEH, FATHA, TEH_MARBUTA]

  return [...prefix, YEH, c3]
}

function deriveMasdarFormIII(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const seatedC2 = isHamzatedLetter(c2) ? HAMZA : c2

  if (c3 === ALIF_MAQSURA || c3 === YEH) return [MEEM, DAMMA, c1, FATHA, ALIF, seatedC2, FATHA, ALIF, TEH_MARBUTA]

  return [MEEM, DAMMA, c1, FATHA, ALIF, seatedC2, FATHA, c3, FATHA, TEH_MARBUTA]
}

function deriveMasdarFormIV(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isInitialWeak = isWeakLetter(c1)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const isInitialHamza = isHamzatedLetter(c1)
  const isFinalHamza = isHamzatedLetter(c3)

  if (isInitialWeak && !isMiddleWeak && isFinalWeak) return [ALIF_HAMZA_BELOW, KASRA, YEH, c2, FATHA, ALIF, HAMZA]

  if (isInitialHamza) return [ALIF_HAMZA_BELOW, KASRA, YEH, c2, FATHA, ALIF, isFinalWeak ? HAMZA : c3]

  if (isMiddleWeak) return [ALIF_HAMZA_BELOW, KASRA, c1, FATHA, ALIF, c3, FATHA, TEH_MARBUTA]

  if (isFinalWeak || isFinalHamza) return [ALIF_HAMZA_BELOW, KASRA, c1, SUKOON, c2, FATHA, ALIF, HAMZA]

  return [ALIF_HAMZA_BELOW, KASRA, c1, SUKOON, c2, FATHA, ALIF, c3]
}

function deriveMasdarFormV(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isFinalWeak = isWeakLetter(c3)
  const prefix = [TEH, FATHA, c1, FATHA]

  if (isFinalWeak) return [...prefix, c2, SHADDA, TANWEEN_KASRA]

  return [...prefix, c2, SHADDA, DAMMA, c3]
}

function deriveMasdarFormVI(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalHamza = isHamzatedLetter(c3)
  const prefix = [TEH, FATHA, c1, FATHA]

  if (isMiddleWeak && isFinalHamza) return [...prefix, ALIF, c3, TANWEEN_KASRA]

  return [...prefix, ALIF, isHamzatedLetter(c2) ? HAMZA_ON_WAW : c2, DAMMA, c3]
}

function deriveMasdarFormVII(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const prefix = [ALIF, KASRA, NOON, SUKOON, c1, KASRA]

  if (isWeakLetter(c2)) return [...prefix, YEH, FATHA, ALIF, c3]

  return [...prefix, c2, FATHA, ALIF, c3]
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

  return [ALIF, KASRA, c1, SUKOON, c2, KASRA, c3, FATHA, ALIF, c3]
}

function deriveMasdarFormX(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isInitialWeak = isWeakLetter(c1)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const isInitialHamza = isHamzatedLetter(c1)
  const isFinalHamza = isHamzatedLetter(c3)

  const prefix = [ALIF, KASRA, SEEN, SUKOON, TEH, KASRA]

  if (isInitialWeak && isFinalWeak) return [...prefix, c2, FATHA, ALIF, HAMZA]

  const seatedC1 = isInitialHamza ? HAMZA_ON_YEH : c1

  if (isMiddleWeak) return [...prefix, seatedC1, FATHA, ALIF, c3, FATHA, TEH_MARBUTA]

  return [...prefix, seatedC1, SUKOON, c2, FATHA, ALIF, isFinalHamza || isFinalWeak ? HAMZA : c3]
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
      return deriveMasdarFormI(verb, pattern)
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
  }
}

export function deriveMasdar(verb: Verb): readonly string[] {
  const patterns = verb.form === 1 && verb.masdarPatterns ? verb.masdarPatterns : [undefined]
  return patterns
    .map((pattern) => {
      return masdar(verb, pattern).join('').normalize('NFC')
    })
    .filter(Boolean)
}
