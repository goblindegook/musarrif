import { isFormIPresentVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_HAMZA_BELOW,
  ALIF_MAQSURA,
  DAL,
  DAMMA,
  FATHA,
  geminateDoubleLetters,
  HAMZA,
  HAMZA_ON_WAW,
  HAMZA_ON_YEH,
  isHamzatedLetter,
  isWeakLetter,
  KASRA,
  longVowel,
  MEEM,
  NOON,
  normalizeAlifMadda,
  resolveFormVIIIInfixConsonant,
  SEEN,
  SHADDA,
  SUKOON,
  seatHamza,
  TANWEEN_FATHA,
  TANWEEN_KASRA,
  TEH,
  TEH_MARBUTA,
  WAW,
  YEH,
} from '../letters'
import type { FormIVerb, MasdarPattern, NonFormIVerb, Verb } from '../verbs'

function deriveMasdarFormI(verb: FormIVerb, pattern: MasdarPattern): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const isInitialHamza = isHamzatedLetter(c1)
  const isFinalHamza = isHamzatedLetter(c3)

  switch (pattern) {
    case 'fa3l':
      return [seatHamza(c1, FATHA), FATHA, seatHamza(c2, FATHA), SUKOON, seatHamza(c3)]

    case 'fa3al':
      return [seatHamza(c1, FATHA), FATHA, c2, FATHA, c3]

    case 'fa3lan':
      return [seatHamza(c1, FATHA), FATHA, c2, SUKOON, c3, TANWEEN_FATHA, ALIF]

    case 'fa3aal':
      return [seatHamza(c1, FATHA), FATHA, isMiddleWeak ? WAW : c2, FATHA, ALIF, isFinalWeak ? HAMZA : c3]

    case 'fu3l':
      return [seatHamza(c1, FATHA), DAMMA, c2, SUKOON, c3]

    case 'fu3ool':
      return [seatHamza(c1, FATHA), DAMMA, c2, DAMMA, WAW, c3]

    case 'fu3aal':
      return [seatHamza(c1, FATHA), DAMMA, seatHamza(c2, DAMMA), FATHA, ALIF, isFinalWeak ? HAMZA : c3]

    case 'fu3ul':
      if (isMiddleWeak) return [seatHamza(c1, FATHA), DAMMA, c2, KASRA, c3, SHADDA]
      return [seatHamza(c1, FATHA), DAMMA, c2, DAMMA, c3, SHADDA]

    case 'fi3aal': {
      if (isFinalWeak) return [isInitialHamza ? ALIF_HAMZA_BELOW : c1, KASRA, c2, FATHA, ALIF, HAMZA]
      if (isMiddleWeak) return [isInitialHamza ? ALIF_HAMZA_BELOW : c1, KASRA, YEH, FATHA, ALIF, c3]
      return [isInitialHamza ? ALIF_HAMZA_BELOW : c1, KASRA, c2, FATHA, ALIF, seatHamza(c3), FATHA, TEH_MARBUTA]
    }

    case 'fi3la':
      return [isInitialHamza ? ALIF_HAMZA_BELOW : c1, KASRA, c2, SUKOON, c3, FATHA, TEH_MARBUTA]

    case 'fu3la':
      return [isInitialHamza ? ALIF_HAMZA : c1, DAMMA, c2, SUKOON, seatHamza(c3, FATHA), FATHA, TEH_MARBUTA]

    case 'fi3al':
      return [isInitialHamza ? ALIF_HAMZA_BELOW : c1, KASRA, c2, FATHA, c3]

    case 'fi3an':
      return [isInitialHamza ? ALIF_HAMZA_BELOW : c1, KASRA, c2, TANWEEN_FATHA, ALIF_MAQSURA]

    case 'fi3l':
      return [isInitialHamza ? ALIF_HAMZA_BELOW : c1, KASRA, c2, SUKOON, c3]

    case 'fa3aala':
      if (isMiddleWeak) return [seatHamza(c1, FATHA), DAMMA, WAW, FATHA, ALIF, c3, FATHA, TEH_MARBUTA]
      return [seatHamza(c1, FATHA), FATHA, c2, FATHA, ALIF, c3, FATHA, TEH_MARBUTA]

    case 'fi3aala':
      if (isMiddleWeak)
        return [
          seatHamza(c1, FATHA),
          KASRA,
          isFinalWeak ? WAW : YEH,
          FATHA,
          ALIF,
          isFinalWeak ? YEH : c3,
          FATHA,
          TEH_MARBUTA,
        ]

      return [seatHamza(c1, FATHA), KASRA, c2, FATHA, ALIF, isFinalWeak ? YEH : c3, FATHA, TEH_MARBUTA]

    case 'ifi3aal':
      return [isInitialHamza ? ALIF_HAMZA_BELOW : c1, KASRA, c2, KASRA, c3, SHADDA]

    case 'mimi': {
      // a -> a, i -> i, u -> i
      const shortVowel = isFormIPresentVowel(verb, FATHA) ? FATHA : KASRA
      const prefix = [MEEM, FATHA, seatHamza(c1, FATHA)]
      if (isFinalHamza) return [...prefix, KASRA, YEH, seatHamza(c3)]
      if (isMiddleWeak && isFormIPresentVowel(verb, DAMMA)) return [...prefix, FATHA, ALIF, seatHamza(c3)]
      if (isMiddleWeak) return [...prefix, ...longVowel(shortVowel), seatHamza(c3)]
      return [...prefix, SUKOON, c2, shortVowel, c3 === YEH ? ALIF_MAQSURA : c3]
    }
  }
}

function deriveMasdarFormII(verb: NonFormIVerb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isFinalWeak = isWeakLetter(c3)
  const isFinalHamza = isHamzatedLetter(c3)
  const prefix = [TEH, FATHA, seatHamza(c1, FATHA)]

  if (c2 === YEH && c3 === YEH) return [...prefix, KASRA, c2, SUKOON, c3, FATHA, TEH_MARBUTA]

  if (isFinalWeak || isFinalHamza) return [...prefix, SUKOON, c2, KASRA, seatHamza(c3, KASRA), FATHA, TEH_MARBUTA]

  // FIXME: Add missing explicit sukoon.
  return [...prefix, SUKOON, c2, KASRA, YEH, c3]
}

function deriveMasdarFormIII(verb: NonFormIVerb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const seatedC1 = isHamzatedLetter(c1) ? HAMZA_ON_WAW : c1
  const seatedC2 = isHamzatedLetter(c2) ? HAMZA : c2
  const seatedC3 = seatHamza(c3, FATHA)
  const prefix = [MEEM, DAMMA, seatedC1, FATHA, ALIF]

  if (c2 === c3) return [...prefix, seatedC2, SUKOON, c3, FATHA, TEH_MARBUTA]

  if (c3 === YEH) return [...prefix, seatedC2, FATHA, ALIF, TEH_MARBUTA]

  return [...prefix, seatedC2, FATHA, seatedC3, FATHA, TEH_MARBUTA]
}

function deriveMasdarFormIV(verb: NonFormIVerb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isInitialWeak = isWeakLetter(c1)
  const isMiddleHamza = isHamzatedLetter(c2)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const isInitialHamza = isHamzatedLetter(c1)
  const isFinalHamza = isHamzatedLetter(c3)
  const prefix = [ALIF_HAMZA_BELOW, KASRA, isInitialWeak || isInitialHamza ? YEH : c1]

  if (isMiddleHamza && isFinalWeak) return [...prefix, FATHA, ALIF, HAMZA, FATHA, TEH_MARBUTA]

  if (isFinalWeak) return [...prefix, SUKOON, c2, FATHA, ALIF, HAMZA]

  if (isMiddleWeak) return [...prefix, FATHA, ALIF, c3, FATHA, TEH_MARBUTA]

  return [...prefix, SUKOON, c2, FATHA, ALIF, isFinalHamza ? HAMZA : c3]
}

function deriveMasdarFormV(verb: NonFormIVerb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isFinalWeak = isWeakLetter(c3)
  const prefix = [TEH, FATHA, seatHamza(c1, FATHA), FATHA]

  if (isFinalWeak) return [...prefix, seatHamza(c2, FATHA), SHADDA, TANWEEN_KASRA]

  return [...prefix, seatHamza(c2, FATHA), SHADDA, DAMMA, seatHamza(c3, DAMMA)]
}

function deriveMasdarFormVI(verb: NonFormIVerb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalHamza = isHamzatedLetter(c3)
  const isFinalWeak = isWeakLetter(c3)
  const prefix = [TEH, FATHA, seatHamza(c1, FATHA), FATHA]

  if (isMiddleWeak && isFinalHamza) return [...prefix, ALIF, c3, TANWEEN_KASRA]

  if (isFinalWeak) return [...prefix, ALIF, isHamzatedLetter(c2) ? HAMZA_ON_WAW : c2, TANWEEN_KASRA]

  return [...prefix, ALIF, isHamzatedLetter(c2) ? HAMZA_ON_WAW : c2, DAMMA, seatHamza(c3, DAMMA)]
}

function deriveMasdarFormVII(verb: NonFormIVerb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const prefix = [ALIF, KASRA, NOON, SUKOON, seatHamza(c1, FATHA), KASRA]

  if (isWeakLetter(c3)) return [...prefix, c2, FATHA, ALIF, HAMZA]

  return [...prefix, isWeakLetter(c2) ? YEH : c2, FATHA, ALIF, seatHamza(c3)]
}

function deriveMasdarFormVIII(verb: NonFormIVerb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const seatedC1 = seatHamza(c1, KASRA)
  const seatedC2 = seatHamza(c2, KASRA)
  const infix = resolveFormVIIIInfixConsonant(c1)

  if (c2 === c3) return [ALIF, KASRA, seatedC1, SUKOON, infix, KASRA, c2, FATHA, ALIF, c3]

  if (isWeakLetter(c1) || isHamzatedLetter(c1))
    return [ALIF, KASRA, infix, SUKOON, infix, KASRA, c2, FATHA, ALIF, isWeakLetter(c3) ? HAMZA : seatHamza(c3)]

  if (isWeakLetter(c3)) return [ALIF, KASRA, seatedC1, SUKOON, infix, KASRA, seatedC2, FATHA, ALIF, HAMZA]

  if (isWeakLetter(c2) && infix !== DAL) return [ALIF, KASRA, seatedC1, SUKOON, infix, KASRA, YEH, FATHA, ALIF, c3]

  return [ALIF, KASRA, seatedC1, SUKOON, infix, KASRA, seatedC2, FATHA, ALIF, c3]
}

function deriveMasdarFormIX(verb: NonFormIVerb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]

  return [ALIF, KASRA, seatHamza(c1, FATHA), SUKOON, c2, KASRA, c3, FATHA, ALIF, c3]
}

function deriveMasdarFormX(verb: NonFormIVerb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isInitialWeak = isWeakLetter(c1)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const seatedC1 = isHamzatedLetter(c1) ? HAMZA_ON_YEH : c1
  const seatedC3 = isHamzatedLetter(c3) || isFinalWeak ? HAMZA : c3

  const prefix = [ALIF, KASRA, SEEN, SUKOON, TEH, KASRA]

  if (isInitialWeak) return [...prefix, YEH, c2, FATHA, ALIF, seatedC3]

  if (isFinalWeak) return [...prefix, seatedC1, SUKOON, c2, FATHA, ALIF, seatedC3]

  if (isMiddleWeak) return [...prefix, seatedC1, FATHA, ALIF, c3, FATHA, TEH_MARBUTA]

  return [...prefix, seatedC1, SUKOON, c2, FATHA, ALIF, seatedC3]
}

function deriveMasdarFormIq(verb: FormIVerb, pattern: MasdarPattern): readonly string[] {
  const [q1, q2, q3, q4] = Array.from(verb.root)

  if (pattern === 'fa3aal')
    return [seatHamza(q1, FATHA), FATHA, seatHamza(q2, FATHA), SUKOON, seatHamza(q3, FATHA), FATHA, ALIF, q4]

  if (pattern === 'fi3aal')
    return [seatHamza(q1, KASRA), KASRA, seatHamza(q2, FATHA), SUKOON, seatHamza(q3, FATHA), FATHA, ALIF, q4]

  return [
    seatHamza(q1, FATHA),
    FATHA,
    seatHamza(q2, FATHA),
    SUKOON,
    seatHamza(q3, FATHA),
    FATHA,
    seatHamza(q4, FATHA),
    FATHA,
    TEH_MARBUTA,
  ]
}

function deriveMasdarFormIIq(verb: Verb): readonly string[] {
  const [q1, q2, q3, q4] = Array.from(verb.root)
  return [TEH, FATHA, seatHamza(q1, FATHA), FATHA, q2, SUKOON, q3, DAMMA, q4]
}

function deriveMasdarFormIIIq(verb: Verb): readonly string[] {
  const [q1, q2, q3, q4] = Array.from(verb.root)
  return [ALIF, KASRA, q1, SUKOON, q2, KASRA, NOON, SUKOON, q3, FATHA, ALIF, q4]
}

function deriveMasdarFormIVq(verb: Verb): readonly string[] {
  const [q1, q2, q3, q4] = Array.from(verb.root)
  return [ALIF, KASRA, q1, SUKOON, q2, KASRA, q3, SUKOON, q4, FATHA, ALIF, q4]
}

function masdar(verb: Verb, pattern: MasdarPattern): readonly string[] {
  if (verb.root.length > 3) {
    switch (verb.form) {
      case 1:
        return deriveMasdarFormIq(verb, pattern)
      case 2:
        return deriveMasdarFormIIq(verb)
      case 3:
        return deriveMasdarFormIIIq(verb)
      case 4:
        return deriveMasdarFormIVq(verb)
      default:
        return []
    }
  }

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
  const patterns = (verb.form === 1 && verb.masdarPatterns) || ['mimi']
  return patterns.map((pattern) =>
    geminateDoubleLetters(normalizeAlifMadda(masdar(verb, pattern)))
      .join('')
      .normalize('NFC'),
  )
}
