import { transliterateReverse } from '@pacote/buckwalter'
import { isFormIPresentVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA_BELOW,
  DAL,
  DAMMA,
  FATHA,
  HAMZA,
  KASRA,
  longVowel,
  MEEM,
  NOON,
  resolveFormVIIIInfixConsonant,
  SEEN,
  SHADDA,
  SUKOON,
  TANWEEN_KASRA,
  TEH,
  TEH_MARBUTA,
  tokenize,
  WAW,
  YEH,
} from '../tokens'
import type { FormIVerb, MasdarPattern, NonFormIVerb, QuadriliteralVerb, Verb } from '../verbs'
import { isQuadriliteralVerb, isTriliteralFormIVerb } from '../verbs'
import { type Morpheme, measureMorpheme, radicalMorpheme, Word } from '../word'

function deriveMasdarFormI(verb: FormIVerb, pattern: MasdarPattern): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens

  switch (pattern) {
    case 'fa3l':
      return [
        radicalMorpheme(c1),
        measureMorpheme(FATHA),
        radicalMorpheme(c2),
        measureMorpheme(SUKOON),
        radicalMorpheme(c3),
      ]

    case 'fa3al':
      return [
        radicalMorpheme(c1),
        measureMorpheme(FATHA),
        radicalMorpheme(c2),
        measureMorpheme(FATHA),
        radicalMorpheme(c3),
      ]

    case 'fa3aal':
      return [
        radicalMorpheme(c1),
        measureMorpheme(FATHA),
        radicalMorpheme(c2),
        measureMorpheme(FATHA, ALIF),
        radicalMorpheme(c3.isWeak ? HAMZA : c3),
      ]

    case 'fa3aala':
      if (c2.isWeak)
        return [
          radicalMorpheme(c1),
          measureMorpheme(DAMMA),
          radicalMorpheme(WAW),
          measureMorpheme(FATHA, ALIF),
          radicalMorpheme(c3),
          measureMorpheme(FATHA, TEH_MARBUTA),
        ]
      return [
        radicalMorpheme(c1),
        measureMorpheme(FATHA),
        radicalMorpheme(c2),
        measureMorpheme(FATHA, ALIF),
        radicalMorpheme(c3),
        measureMorpheme(FATHA, TEH_MARBUTA),
      ]

    case 'fa3alaan':
      return [
        radicalMorpheme(c1),
        measureMorpheme(FATHA),
        radicalMorpheme(c2),
        measureMorpheme(FATHA),
        radicalMorpheme(c3),
        measureMorpheme(FATHA, ALIF, NOON),
      ]

    case 'fa3ool':
      return []

    case 'fa3iil':
      return [
        radicalMorpheme(c1),
        measureMorpheme(FATHA),
        radicalMorpheme(c2),
        measureMorpheme(KASRA, YEH),
        radicalMorpheme(c3),
      ]

    case 'fu3l':
      return [
        radicalMorpheme(c1),
        measureMorpheme(DAMMA),
        radicalMorpheme(c2),
        measureMorpheme(SUKOON),
        radicalMorpheme(c3),
      ]

    case 'fu3ool':
      return [
        radicalMorpheme(c1),
        measureMorpheme(DAMMA),
        radicalMorpheme(c2),
        measureMorpheme(DAMMA, WAW, c3.equals(WAW) ? SUKOON : null),
        radicalMorpheme(c3),
      ]

    case 'fu3aal':
      return [
        radicalMorpheme(c1),
        measureMorpheme(DAMMA),
        radicalMorpheme(c2),
        measureMorpheme(FATHA, ALIF),
        radicalMorpheme(c3.isWeak ? HAMZA : c3),
      ]

    case 'fi3aal': {
      return [
        radicalMorpheme(c1),
        measureMorpheme(KASRA),
        radicalMorpheme(c2.isWeak && !c3.isWeak ? YEH : c2),
        measureMorpheme(FATHA, ALIF),
        radicalMorpheme(c3.isWeak ? HAMZA : c3),
      ]
    }

    case 'fa3la':
      return [
        radicalMorpheme(c1),
        measureMorpheme(FATHA),
        radicalMorpheme(c2),
        measureMorpheme(SUKOON),
        radicalMorpheme(c3),
        measureMorpheme(FATHA, TEH_MARBUTA),
      ]

    case 'fi3la':
      return [
        radicalMorpheme(c1),
        measureMorpheme(KASRA),
        radicalMorpheme(c2),
        measureMorpheme(SUKOON),
        radicalMorpheme(c3),
        measureMorpheme(FATHA, TEH_MARBUTA),
      ]

    case 'fu3la':
      return [
        radicalMorpheme(c1),
        measureMorpheme(DAMMA),
        radicalMorpheme(c2),
        measureMorpheme(SUKOON),
        radicalMorpheme(c3),
        measureMorpheme(FATHA, TEH_MARBUTA),
      ]

    case 'fu3laan':
      return [
        radicalMorpheme(c1),
        measureMorpheme(DAMMA),
        radicalMorpheme(c2),
        measureMorpheme(SUKOON),
        radicalMorpheme(c3),
        measureMorpheme(FATHA, ALIF, NOON),
      ]

    case 'fi3al':
      return [
        radicalMorpheme(c1),
        measureMorpheme(KASRA),
        radicalMorpheme(c2),
        measureMorpheme(FATHA),
        radicalMorpheme(c3),
      ]

    case 'fi3l':
      return [
        radicalMorpheme(c1),
        measureMorpheme(KASRA),
        radicalMorpheme(c2),
        measureMorpheme(SUKOON),
        radicalMorpheme(c3),
      ]

    case 'fi3aala':
      return [
        radicalMorpheme(c1),
        measureMorpheme(KASRA),
        radicalMorpheme(c2.isWeak && !c3.isWeak ? YEH : c2),
        measureMorpheme(FATHA, ALIF),
        radicalMorpheme(c3.isWeak ? YEH : c3),
        measureMorpheme(FATHA, TEH_MARBUTA),
      ]

    case 'mimi': {
      const vowel = c3.isHamza || isFormIPresentVowel(verb, KASRA) ? KASRA : FATHA
      if (c2.isWeak)
        return [
          measureMorpheme(MEEM, FATHA),
          radicalMorpheme(c1),
          measureMorpheme(...longVowel(vowel)),
          radicalMorpheme(c3),
        ]
      return [
        measureMorpheme(MEEM, FATHA),
        radicalMorpheme(c1),
        measureMorpheme(SUKOON),
        radicalMorpheme(c2),
        measureMorpheme(vowel),
        radicalMorpheme(c3),
      ]
    }
  }
}

function deriveMasdarFormII(verb: NonFormIVerb): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [measureMorpheme(TEH, FATHA), radicalMorpheme(c1)]

  if (c2.equals(YEH) && c3.equals(YEH))
    return [
      ...prefix,
      measureMorpheme(KASRA),
      radicalMorpheme(c2),
      measureMorpheme(SUKOON),
      radicalMorpheme(c3),
      measureMorpheme(FATHA, TEH_MARBUTA),
    ]

  if (c3.isWeak || c3.isHamza)
    return [
      ...prefix,
      measureMorpheme(SUKOON),
      radicalMorpheme(c2),
      measureMorpheme(KASRA),
      radicalMorpheme(c3),
      measureMorpheme(FATHA, TEH_MARBUTA),
    ]

  return [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(KASRA, YEH), radicalMorpheme(c3)]
}

function deriveMasdarFormIII(verb: NonFormIVerb): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [measureMorpheme(MEEM, DAMMA), radicalMorpheme(c1), measureMorpheme(FATHA, ALIF)]

  if (c2.equals(c3))
    return [
      ...prefix,
      radicalMorpheme(c2),
      measureMorpheme(SUKOON),
      radicalMorpheme(c3),
      measureMorpheme(FATHA, TEH_MARBUTA),
    ]

  if (c3.equals(YEH)) return [...prefix, radicalMorpheme(c2), measureMorpheme(FATHA, ALIF, TEH_MARBUTA)]

  return [
    ...prefix,
    radicalMorpheme(c2),
    measureMorpheme(FATHA),
    radicalMorpheme(c3),
    measureMorpheme(FATHA, TEH_MARBUTA),
  ]
}

function deriveMasdarFormIV(verb: NonFormIVerb): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [measureMorpheme(ALIF_HAMZA_BELOW, KASRA), radicalMorpheme(c1.isWeak || c1.isHamza ? YEH : c1)]

  if (c2.isHamza)
    return [...prefix, measureMorpheme(FATHA, ALIF), radicalMorpheme(c2), measureMorpheme(FATHA, TEH_MARBUTA)]

  if (c3.isWeak)
    return [
      ...prefix,
      ...(c1.isWeak || c1.isHamza ? [] : [measureMorpheme(SUKOON)]),
      radicalMorpheme(c2),
      measureMorpheme(FATHA, ALIF, HAMZA),
    ]

  if (c2.isWeak)
    return [
      ...prefix,
      measureMorpheme(FATHA),
      radicalMorpheme(ALIF),
      radicalMorpheme(c3),
      measureMorpheme(FATHA, TEH_MARBUTA),
    ]

  return [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(FATHA, ALIF), radicalMorpheme(c3)]
}

function deriveMasdarFormV(verb: NonFormIVerb): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [
    measureMorpheme(TEH, FATHA),
    radicalMorpheme(c1),
    measureMorpheme(FATHA),
    radicalMorpheme(c2),
    measureMorpheme(SHADDA),
  ]

  if (c3.isWeak) return [...prefix, measureMorpheme(TANWEEN_KASRA)]

  return [...prefix, measureMorpheme(DAMMA), radicalMorpheme(c3)]
}

function deriveMasdarFormVI(verb: NonFormIVerb): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens

  if (c3.isWeak)
    return [
      measureMorpheme(TEH, FATHA),
      radicalMorpheme(c1),
      measureMorpheme(FATHA, ALIF),
      radicalMorpheme(c2),
      measureMorpheme(TANWEEN_KASRA),
    ]

  return [
    measureMorpheme(TEH, FATHA),
    radicalMorpheme(c1),
    measureMorpheme(FATHA, ALIF),
    radicalMorpheme(c2),
    measureMorpheme(DAMMA),
    radicalMorpheme(c3),
  ]
}

function deriveMasdarFormVII(verb: NonFormIVerb): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [measureMorpheme(ALIF, KASRA, NOON, SUKOON), radicalMorpheme(c1), measureMorpheme(KASRA)]

  if (c3.isWeak) return [...prefix, radicalMorpheme(c2), measureMorpheme(FATHA, ALIF, HAMZA)]

  if (c2.isWeak) return [...prefix, measureMorpheme(YEH, FATHA, ALIF), radicalMorpheme(c3)]

  return [...prefix, radicalMorpheme(c2), measureMorpheme(FATHA, ALIF), radicalMorpheme(c3)]
}

function deriveMasdarFormVIII(verb: NonFormIVerb): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens
  const infix = resolveFormVIIIInfixConsonant(c1)
  const prefix = [
    measureMorpheme(ALIF, KASRA),
    radicalMorpheme(c1.isWeak || c1.isHamza ? infix : c1),
    measureMorpheme(SUKOON, infix, KASRA),
  ]

  if (c2.equals(c3))
    return [
      measureMorpheme(ALIF, KASRA),
      radicalMorpheme(c1),
      measureMorpheme(SUKOON, infix, KASRA),
      radicalMorpheme(c2),
      measureMorpheme(FATHA, ALIF),
      radicalMorpheme(c3.isWeak ? HAMZA : c3),
    ]

  if (c3.isWeak)
    return [...prefix, radicalMorpheme(c2), measureMorpheme(FATHA, ALIF), radicalMorpheme(c3.isWeak ? HAMZA : c3)]

  if (c2.isWeak && !infix.equals(DAL)) return [...prefix, measureMorpheme(YEH, FATHA, ALIF), radicalMorpheme(c3)]

  return [...prefix, radicalMorpheme(c2), measureMorpheme(FATHA, ALIF), radicalMorpheme(c3.isWeak ? HAMZA : c3)]
}

function deriveMasdarFormIX(verb: NonFormIVerb): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens
  return [
    measureMorpheme(ALIF, KASRA),
    radicalMorpheme(c1),
    measureMorpheme(SUKOON),
    radicalMorpheme(c2),
    measureMorpheme(KASRA),
    radicalMorpheme(c3),
    measureMorpheme(FATHA, ALIF),
    radicalMorpheme(c3),
  ]
}

function deriveMasdarFormX(verb: NonFormIVerb): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [measureMorpheme(ALIF, KASRA, SEEN, SUKOON, TEH, KASRA)]

  if (c1.isWeak)
    return [
      ...prefix,
      measureMorpheme(YEH),
      radicalMorpheme(c2),
      measureMorpheme(FATHA, ALIF),
      radicalMorpheme(c3.isWeak ? HAMZA : c3),
    ]

  if (c3.isWeak)
    return [
      ...prefix,
      radicalMorpheme(c1),
      measureMorpheme(SUKOON),
      radicalMorpheme(c2),
      measureMorpheme(FATHA, ALIF, HAMZA),
    ]

  if (c2.isWeak)
    return [
      ...prefix,
      radicalMorpheme(c1),
      measureMorpheme(FATHA),
      radicalMorpheme(ALIF),
      radicalMorpheme(c3),
      measureMorpheme(FATHA, TEH_MARBUTA),
    ]

  return [
    ...prefix,
    radicalMorpheme(c1),
    measureMorpheme(SUKOON),
    radicalMorpheme(c2),
    measureMorpheme(FATHA, ALIF),
    radicalMorpheme(c3),
  ]
}

function deriveMasdarFormIq(verb: QuadriliteralVerb): readonly Morpheme[] {
  const [q1, q2, q3, q4] = verb.rootTokens
  return [
    radicalMorpheme(q1),
    measureMorpheme(FATHA),
    radicalMorpheme(q2),
    measureMorpheme(SUKOON),
    radicalMorpheme(q3),
    measureMorpheme(FATHA),
    radicalMorpheme(q4),
    measureMorpheme(FATHA, TEH_MARBUTA),
  ]
}

function deriveMasdarFormIIq(verb: QuadriliteralVerb): readonly Morpheme[] {
  const [q1, q2, q3, q4] = verb.rootTokens
  return [
    measureMorpheme(TEH, FATHA),
    radicalMorpheme(q1),
    measureMorpheme(FATHA),
    radicalMorpheme(q2),
    measureMorpheme(SUKOON),
    radicalMorpheme(q3),
    measureMorpheme(DAMMA),
    radicalMorpheme(q4),
  ]
}

function deriveMasdarFormIIIq(verb: QuadriliteralVerb): readonly Morpheme[] {
  const [q1, q2, q3, q4] = verb.rootTokens
  return [
    measureMorpheme(ALIF, KASRA),
    radicalMorpheme(q1),
    measureMorpheme(SUKOON),
    radicalMorpheme(q2),
    measureMorpheme(KASRA, NOON, SUKOON),
    radicalMorpheme(q3),
    measureMorpheme(FATHA, ALIF),
    radicalMorpheme(q4),
  ]
}

function deriveMasdarFormIVq(verb: QuadriliteralVerb): readonly Morpheme[] {
  const [q1, q2, q3, q4] = verb.rootTokens
  return [
    measureMorpheme(ALIF, KASRA),
    radicalMorpheme(q1),
    measureMorpheme(SUKOON),
    radicalMorpheme(q2),
    measureMorpheme(KASRA),
    radicalMorpheme(q3),
    measureMorpheme(SUKOON),
    radicalMorpheme(q4),
    measureMorpheme(FATHA, ALIF),
    radicalMorpheme(q4),
  ]
}

function masdar(verb: Verb, pattern: MasdarPattern): readonly Morpheme[] {
  if (isQuadriliteralVerb(verb)) {
    switch (verb.form) {
      case 1:
        return deriveMasdarFormIq(verb)
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

export function deriveMasdar(verb: Verb): readonly Word[] {
  const patterns: readonly MasdarPattern[] = (isTriliteralFormIVerb(verb) && verb.masdars) || ['mimi']
  const derived = patterns.map((pattern) => new Word(masdar(verb, pattern)))
  const lexicalized = (verb.lexicalizedMasdars ?? [])
    .map(transliterateReverse)
    .map(tokenize)
    .map((tokens) => new Word([measureMorpheme(...tokens)]))
  return [...derived, ...lexicalized]
}
