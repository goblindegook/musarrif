import { isFormIPresentVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_HAMZA_BELOW,
  ALIF_MAQSURA,
  DAL,
  DAMMA,
  FATHA,
  finalize,
  HAMZA,
  KASRA,
  longVowel,
  MEEM,
  NOON,
  Root,
  resolveFormVIIIInfixConsonant,
  SEEN,
  SHADDA,
  SUKOON,
  TANWEEN_FATHA,
  TANWEEN_KASRA,
  TEH,
  TEH_MARBUTA,
  type Token,
  WAW,
  YEH,
} from '../letters'
import type { FormIVerb, MasdarPattern, NonFormIVerb, Verb } from '../verbs'

function deriveMasdarFormI(verb: FormIVerb, pattern: MasdarPattern): readonly Token[] {
  const [c1, c2, c3] = Root(verb.root)

  switch (pattern) {
    case 'fa3l':
      return [c1, FATHA, c2, SUKOON, c3]

    case 'fa3al':
      return [c1, FATHA, c2, FATHA, c3]

    case 'fa3lan':
      return [c1, FATHA, c2, SUKOON, c3, TANWEEN_FATHA, ALIF]

    case 'fa3aal':
      return [c1, FATHA, c2.isWeak ? WAW : c2, FATHA, ALIF, c3.isWeak ? HAMZA : c3]

    case 'fu3l':
      return [c1, DAMMA, c2, SUKOON, c3]

    case 'fu3ool':
      return [c1, DAMMA, c2, DAMMA, WAW, c3]

    case 'fu3aal':
      return [c1, DAMMA, c2, FATHA, ALIF, c3.isWeak ? HAMZA : c3]

    case 'fu3ul':
      if (c2.isWeak) return [c1, DAMMA, c2, KASRA, c3, SHADDA]
      return [c1, DAMMA, c2, DAMMA, c3, SHADDA]

    case 'fi3aal': {
      if (c3.isWeak) return [c1, KASRA, c2, FATHA, ALIF, HAMZA]
      return [c1, KASRA, c2.isWeak ? YEH : c2, FATHA, ALIF, c3]
    }

    case 'fi3la':
      return [c1, KASRA, c2, SUKOON, c3, FATHA, TEH_MARBUTA]

    case 'fu3la':
      return [c1.isHamza ? ALIF_HAMZA : c1, DAMMA, c2, SUKOON, c3, FATHA, TEH_MARBUTA]

    case 'fi3al':
      return [c1, KASRA, c2, FATHA, c3]

    case 'fi3an':
      return [c1, KASRA, c2, TANWEEN_FATHA, ALIF_MAQSURA]

    case 'fi3l':
      return [c1, KASRA, c2, SUKOON, c3]

    case 'fa3iil':
      return [c1, FATHA, c2, KASRA, YEH, c3]

    case 'fa3aala':
      if (c2.isWeak) return [c1, DAMMA, WAW, FATHA, ALIF, c3, FATHA, TEH_MARBUTA]
      return [c1, FATHA, c2, FATHA, ALIF, c3, FATHA, TEH_MARBUTA]

    case 'fi3aala':
      if (c2.isWeak) return [c1, KASRA, c3.isWeak ? WAW : YEH, FATHA, ALIF, c3.isWeak ? YEH : c3, FATHA, TEH_MARBUTA]

      return [c1, KASRA, c2, FATHA, ALIF, c3.isWeak ? YEH : c3, FATHA, TEH_MARBUTA]

    case 'fi3iil':
      return [c1, KASRA, c2, KASRA, c3, SHADDA]

    case 'mimi': {
      const prefix = [MEEM, FATHA, c1]
      if (c3.isHamza) return [...prefix, KASRA, YEH, c3]
      if (c2.isWeak) return [...prefix, ...longVowel(isFormIPresentVowel(verb, KASRA) ? KASRA : FATHA), c3]
      return [...prefix, SUKOON, c2, isFormIPresentVowel(verb, FATHA) ? FATHA : KASRA, c3.is(YEH) ? ALIF_MAQSURA : c3]
    }
  }
}

function deriveMasdarFormII(verb: NonFormIVerb): readonly Token[] {
  const [c1, c2, c3] = Root(verb.root)

  const prefix = [TEH, FATHA, c1]

  if (c2.is(YEH) && c3.is(YEH)) return [...prefix, KASRA, c2, SUKOON, c3, FATHA, TEH_MARBUTA]

  if (c3.isWeak || c3.isHamza) return [...prefix, SUKOON, c2, KASRA, c3, FATHA, TEH_MARBUTA]

  return [...prefix, SUKOON, c2, KASRA, YEH, SUKOON, c3]
}

function deriveMasdarFormIII(verb: NonFormIVerb): readonly Token[] {
  const [c1, c2, c3] = Root(verb.root)
  const prefix = [MEEM, DAMMA, c1, FATHA, ALIF]

  if (c2.equals(c3)) return [...prefix, c2, SUKOON, c3, FATHA, TEH_MARBUTA]

  if (c3.is(YEH)) return [...prefix, c2, FATHA, ALIF, TEH_MARBUTA]

  return [...prefix, c2, FATHA, c3, FATHA, TEH_MARBUTA]
}

function deriveMasdarFormIV(verb: NonFormIVerb): readonly Token[] {
  const [c1, c2, c3] = Root(verb.root)

  const prefix = [ALIF_HAMZA_BELOW, KASRA, c1.isWeak || c1.isHamza ? YEH : c1]

  if (c2.isHamza) return [...prefix, FATHA, ALIF, c2, FATHA, TEH_MARBUTA]

  if (c3.isWeak) return [...prefix, SUKOON, c2, FATHA, ALIF, HAMZA]

  if (c2.isWeak) return [...prefix, FATHA, ALIF, c3, FATHA, TEH_MARBUTA]

  return [...prefix, SUKOON, c2, FATHA, ALIF, c3]
}

function deriveMasdarFormV(verb: NonFormIVerb): readonly Token[] {
  const [c1, c2, c3] = Root(verb.root)

  const prefix = [TEH, FATHA, c1, FATHA, c2, SHADDA]

  if (c3.isWeak) return [...prefix, TANWEEN_KASRA]

  return [...prefix, DAMMA, c3]
}

function deriveMasdarFormVI(verb: NonFormIVerb): readonly Token[] {
  const [c1, c2, c3] = Root(verb.root)

  const prefix = [TEH, FATHA, c1, FATHA, ALIF]

  if (c2.isWeak && c3.isHamza) return [...prefix, c3, TANWEEN_KASRA]

  if (c3.isWeak) return [...prefix, c2, TANWEEN_KASRA]

  return [...prefix, c2, DAMMA, c3]
}

function deriveMasdarFormVII(verb: NonFormIVerb): readonly Token[] {
  const [c1, c2, c3] = Root(verb.root)

  const prefix = [ALIF, KASRA, NOON, SUKOON, c1, KASRA]

  if (c3.isWeak) return [...prefix, c2, FATHA, ALIF, HAMZA]

  if (c2.isWeak) return [...prefix, YEH, FATHA, ALIF, c3]

  return [...prefix, c2, FATHA, ALIF, c3]
}

function deriveMasdarFormVIII(verb: NonFormIVerb): readonly Token[] {
  const [c1, c2, c3] = Root(verb.root)
  const infix = resolveFormVIIIInfixConsonant(c1.letter)
  const prefix = [ALIF, KASRA, c1.isWeak || c1.isHamza ? infix : c1, SUKOON, infix, KASRA]

  if (c2.equals(c3)) return [ALIF, KASRA, c1, SUKOON, infix, KASRA, c2, FATHA, ALIF, c3.isWeak ? HAMZA : c3]

  if (c3.isWeak) return [...prefix, c2, FATHA, ALIF, c3.isWeak ? HAMZA : c3]

  if (c2.isWeak && infix !== DAL) return [...prefix, YEH, FATHA, ALIF, c3]

  return [...prefix, c2, FATHA, ALIF, c3.isWeak ? HAMZA : c3]
}

function deriveMasdarFormIX(verb: NonFormIVerb): readonly Token[] {
  const [c1, c2, c3] = Root(verb.root)

  return [ALIF, KASRA, c1, SUKOON, c2, KASRA, c3, FATHA, ALIF, c3]
}

function deriveMasdarFormX(verb: NonFormIVerb): readonly Token[] {
  const [c1, c2, c3] = Root(verb.root)

  const prefix = [ALIF, KASRA, SEEN, SUKOON, TEH, KASRA]

  if (c1.isWeak) return [...prefix, YEH, c2, FATHA, ALIF, c3.isWeak ? HAMZA : c3]

  if (c3.isWeak) return [...prefix, c1, SUKOON, c2, FATHA, ALIF, HAMZA]

  if (c2.isWeak) return [...prefix, c1, FATHA, ALIF, c3, FATHA, TEH_MARBUTA]

  return [...prefix, c1, SUKOON, c2, FATHA, ALIF, c3]
}

function deriveMasdarFormIq(verb: FormIVerb, pattern: MasdarPattern): readonly Token[] {
  const [q1, q2, q3, q4] = Root(verb.root)

  if (pattern === 'fa3aal') return [q1, FATHA, q2, SUKOON, q3, FATHA, ALIF, q4]

  if (pattern === 'fi3aal') return [q1, KASRA, q2, SUKOON, q3, FATHA, ALIF, q4]

  return [q1, FATHA, q2, SUKOON, q3, FATHA, q4, FATHA, TEH_MARBUTA]
}

function deriveMasdarFormIIq(verb: Verb): readonly Token[] {
  const [q1, q2, q3, q4] = Root(verb.root)
  return [TEH, FATHA, q1, FATHA, q2, SUKOON, q3, DAMMA, q4]
}

function deriveMasdarFormIIIq(verb: Verb): readonly Token[] {
  const [q1, q2, q3, q4] = Root(verb.root)
  return [ALIF, KASRA, q1, SUKOON, q2, KASRA, NOON, SUKOON, q3, FATHA, ALIF, q4]
}

function deriveMasdarFormIVq(verb: Verb): readonly Token[] {
  const [q1, q2, q3, q4] = Root(verb.root)
  return [ALIF, KASRA, q1, SUKOON, q2, KASRA, q3, SUKOON, q4, FATHA, ALIF, q4]
}

function masdar(verb: Verb, pattern: MasdarPattern): readonly Token[] {
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
  return patterns.map((pattern) => finalize(masdar(verb, pattern)))
}
