import { mapRecord } from '../../primitives/objects'
import { formIPresentVowel, isFormIPastVowel, isFormIPresentVowel } from '../form-i-vowels'
import type { PronounId } from '../pronouns'
import type { Mood } from '../tense'
import {
  ALIF,
  ALIF_MAQSURA,
  DAL,
  DAMMA,
  FATHA,
  HAMZA,
  HAMZA_ON_YEH,
  KASRA,
  longVowel,
  NOON,
  resolveFormVIIIInfixConsonant,
  SEEN,
  SHADDA,
  SUKOON,
  TEH,
  type Token,
  WAW,
  YEH,
} from '../tokens'
import { type FormIVerb, isQuadriliteralVerb, type NonFormIVerb, type QuadriliteralVerb, type Verb } from '../verbs'
import { agreementMorpheme, elidedMorpheme, type Morpheme, measureMorpheme, radicalMorpheme, Word } from '../word'

function deriveFeminineSingularStem(stem: readonly Morpheme[], verb: Verb): readonly Morpheme[] {
  const kasra = agreementMorpheme(KASRA)

  if (isQuadriliteralVerb(verb)) return [...stem, kasra]

  const [c1, c2, c3] = verb.rootTokens

  // Form I defective shapes collide structurally with each other. Every other case is handled generically — see contractActivePresentDefectiveRoot.
  if (verb.form === 1) {
    if (c3.equals(YEH) && isFormIPresentVowel(verb, FATHA)) return [...stem.slice(0, -2), agreementMorpheme(FATHA)]
    if (c3.isWeak && (c1.isWeak || c3.equals(WAW))) return [...stem.slice(0, -2), kasra]
    if (c3.isWeak) return stem.with(-1, kasra)
  }

  if ([2, 3, 4, 5].includes(verb.form) && c3.isWeak) return stem.slice(0, -1)

  if (verb.form === 7 && c2.equals(c3) && c2.isWeak) return [...stem.slice(0, -2), agreementMorpheme(FATHA)]

  return [...stem, kasra]
}

function deriveMasculinePluralStem(stem: readonly Morpheme[], verb: Verb): readonly Morpheme[] {
  const damma = agreementMorpheme(DAMMA)
  const [, c2, c3] = verb.rootTokens

  // Form V: a defective root's masculine plural here takes no agreement vowel at all and only
  // the weak radical itself is dropped (the preceding vowel measure survives):
  if (verb.form === 5 && c3.isWeak) return stem.slice(0, -1)

  // Form VII: content-identical to Form IV's elide+damma case, stays inline.
  if (verb.form === 7 && !c2.isWeak && c3.isWeak) return stem

  // Hollow root ending in hamza: the masculine plural -ū suffix would otherwise
  // sandwich a hamza-on-waw between two waws, which is avoided in favour of yeh:
  if (verb.form === 1 && c2.isWeak && c3.isHamza) return [...stem.slice(0, -1), radicalMorpheme(HAMZA_ON_YEH), damma]

  return [...stem, damma]
}

function deriveFemininePluralStem(stem: readonly Morpheme[], verb: Verb): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens
  const suffix = agreementMorpheme(SUKOON)

  switch (verb.form) {
    case 1:
    case 4:
      return [...migrateGeminateLinkingVowel(stem), suffix]

    case 2:
      return [...stem, suffix]

    case 3:
      return [...expandGeminationMorphemes(stem, KASRA), suffix]

    case 5:
      return [...stem, suffix]

    case 6:
      return [...(c3.isHamza ? stem : expandGeminationMorphemes(stem, FATHA)), suffix]

    case 7:
      if (c2.equals(c3))
        return [
          measureMorpheme(NOON, SUKOON),
          radicalMorpheme(c1),
          measureMorpheme(FATHA),
          radicalMorpheme(c2),
          measureMorpheme(KASRA),
          radicalMorpheme(c3),
          suffix,
        ]
      return [...stem, suffix]

    case 8:
    case 9:
      return [...expandGeminationMorphemes(stem, KASRA), suffix]

    case 10:
      return [...migrateGeminateLinkingVowel(stem), suffix]
  }
}

const dammaSuffix = (s: boolean) => (s ? [agreementMorpheme(DAMMA)] : [])

function hasFathaDefectiveEnding(morphemes: readonly Morpheme[]): boolean {
  if (morphemes.at(-1)?.endsWith([FATHA])) return true
  return morphemes.at(-2)?.some((t) => t.isWeak) === true && morphemes.at(-3)?.equals([FATHA]) === true
}

function conjugateIndicative(verb: Verb): Record<PronounId, readonly Morpheme[]> {
  const [c1, , c3] = verb.rootTokens
  const stem = derivePresentStem(verb)
  const vowel = presentPrefixVowel(verb)
  const suffix = dammaSuffix(isQuadriliteralVerb(verb) || !c3.isWeak)
  const feminineSingularStem = deriveFeminineSingularStem(stem, verb)
  const feminineSingularSuffix = hasFathaDefectiveEnding(feminineSingularStem)
    ? agreementMorpheme(YEH, SUKOON, NOON, FATHA)
    : agreementMorpheme(YEH, NOON, FATHA)
  const masculinePluralStem = deriveMasculinePluralStem(stem, verb)
  const masculinePluralSuffix = hasFathaDefectiveEnding(masculinePluralStem)
    ? agreementMorpheme(WAW, SUKOON, NOON, FATHA)
    : agreementMorpheme(WAW, NOON, FATHA)
  const femininePluralStem = deriveFemininePluralStem(stem, verb)

  return mapRecord(
    {
      '1s':
        verb.form === 4 && c1.isHamza
          ? [
              agreementMorpheme(HAMZA, vowel),
              radicalMorpheme(WAW),
              ...stem.slice(stem.at(1)?.equals([SUKOON]) ? 2 : 1),
              ...suffix,
            ]
          : [agreementMorpheme(HAMZA, vowel), ...stem, ...suffix],
      '2ms': [agreementMorpheme(TEH, vowel), ...stem, ...suffix],
      '2fs': [agreementMorpheme(TEH, vowel), ...feminineSingularStem, feminineSingularSuffix],
      '3ms': [agreementMorpheme(YEH, vowel), ...stem, ...suffix],
      '3fs': [agreementMorpheme(TEH, vowel), ...stem, ...suffix],
      '2d': [agreementMorpheme(TEH, vowel), ...stem, agreementMorpheme(FATHA, ALIF, NOON, KASRA)],
      '3md': [agreementMorpheme(YEH, vowel), ...stem, agreementMorpheme(FATHA, ALIF, NOON, KASRA)],
      '3fd': [agreementMorpheme(TEH, vowel), ...stem, agreementMorpheme(FATHA, ALIF, NOON, KASRA)],
      '1p': [agreementMorpheme(NOON, vowel), ...stem, ...suffix],
      '2mp': [agreementMorpheme(TEH, vowel), ...masculinePluralStem, masculinePluralSuffix],
      '2fp': [agreementMorpheme(TEH, vowel), ...femininePluralStem, agreementMorpheme(NOON, FATHA)],
      '3mp': [agreementMorpheme(YEH, vowel), ...masculinePluralStem, masculinePluralSuffix],
      '3fp': [agreementMorpheme(YEH, vowel), ...femininePluralStem, agreementMorpheme(NOON, FATHA)],
    },
    (m) => contractDefectiveRoot(contractHollowRoot(m)),
  )
}

function presentPrefixVowel(verb: Verb): Token {
  if (isQuadriliteralVerb(verb)) return verb.form === 1 ? DAMMA : FATHA
  return [2, 3, 4].includes(verb.form) ? DAMMA : FATHA
}

function conjugateSubjunctive(verb: Verb): Record<PronounId, readonly Morpheme[]> {
  const [, c2, c3] = verb.rootTokens
  const indicative = conjugateIndicative(verb)

  return {
    '1s': subjunctiveStem(indicative['1s']),
    '2ms': subjunctiveStem(indicative['2ms']),
    '2fs': [
      ...(verb.form === 7 && c2.isWeak && c3.isWeak
        ? [...indicative['2fs'].slice(0, -2), agreementMorpheme(KASRA, YEH)]
        : indicative['2fs'].with(
            -1,
            indicative['2fs'].at(-2)?.endsWith([FATHA]) ? agreementMorpheme(YEH, SUKOON) : agreementMorpheme(YEH),
          )),
      elidedMorpheme(NOON, FATHA),
    ],
    '3ms': subjunctiveStem(indicative['3ms']),
    '3fs': subjunctiveStem(indicative['3fs']),
    '2d': dropTrailingNoon(indicative['2d']),
    '3md': dropTrailingNoon(indicative['3md']),
    '3fd': dropTrailingNoon(indicative['3fd']),
    '1p': subjunctiveStem(indicative['1p']),
    '2mp': [
      ...indicative['2mp'].slice(0, -1),
      agreementMorpheme(WAW, indicative['2mp'].at(-1)?.startsWith([WAW, SUKOON]) ? SUKOON : null, ALIF),
      elidedMorpheme(NOON, FATHA),
    ],
    '2fp': indicative['2fp'],
    '3mp': [
      ...indicative['3mp'].slice(0, -1),
      agreementMorpheme(WAW, indicative['3mp'].at(-1)?.startsWith([WAW, SUKOON]) ? SUKOON : null, ALIF),
      elidedMorpheme(NOON, FATHA),
    ],
    '3fp': indicative['3fp'],
  }
}

const subjunctiveStem = (stem: readonly Morpheme[]): readonly Morpheme[] => {
  const finalMorpheme = stem.at(-1)
  if (finalMorpheme?.equals([ALIF_MAQSURA])) return stem
  if (finalMorpheme?.equals([DAMMA])) return stem.with(-1, finalMorpheme.with(-1, FATHA))
  return [...stem, agreementMorpheme(FATHA)]
}

function conjugateJussive(verb: Verb): Record<PronounId, readonly Morpheme[]> {
  const [, c2, c3] = verb.rootTokens
  const indicative = conjugateIndicative(verb)

  return {
    '1s': jussiveStem(indicative['1s'], verb),
    '2ms': jussiveStem(indicative['2ms'], verb),
    '2fs':
      verb.form === 7 && c2.isWeak && c3.isWeak
        ? [...indicative['2fs'].slice(0, -2), agreementMorpheme(KASRA, YEH), elidedMorpheme(NOON, FATHA)]
        : [
            ...indicative['2fs'].slice(0, -1),
            indicative['2fs'].at(-2)?.at(-1)?.equals(FATHA) ? agreementMorpheme(YEH, SUKOON) : agreementMorpheme(YEH),
            elidedMorpheme(NOON, FATHA),
          ],
    '3ms': jussiveStem(indicative['3ms'], verb),
    '3fs': jussiveStem(indicative['3fs'], verb),
    '2d': dropTrailingNoon(indicative['2d']),
    '3md': dropTrailingNoon(indicative['3md']),
    '3fd': dropTrailingNoon(indicative['3fd']),
    '1p': jussiveStem(indicative['1p'], verb),
    '2mp': jussiveMasculinePlural(indicative['2mp']),
    '2fp': indicative['2fp'],
    '3mp': jussiveMasculinePlural(indicative['3mp']),
    '3fp': indicative['3fp'],
  }
}

function jussiveStem(indicative: readonly Morpheme[], verb: Verb): readonly Morpheme[] {
  const final = indicative.at(-1)
  if (!final) return indicative

  const [, c2, c3] = verb.rootTokens
  const geminateJussiveFatha = verb.form === 9 || (c2.equals(c3) && [1, 3, 4, 6, 7, 8, 10].includes(verb.form))
  const stem = indicative.slice(0, -1)
  const finalToken = final.at(-1)

  if (finalToken?.equals(DAMMA)) {
    if (isQuadriliteralVerb(verb) && stem.at(-1)?.at(0)?.equals(stem.at(-3)?.at(0)))
      return [...migrateGeminateLinkingVowel(stem), agreementMorpheme(SUKOON)]

    if (stem.some((m, i) => m.role === 'radical' && stem[i + 1]?.role === 'radical'))
      return contractHollowRoot([...stem, agreementMorpheme(SUKOON)])

    return [...stem, final.with(-1, geminateJussiveFatha ? FATHA : SUKOON)]
  }

  return [...indicative.slice(0, -1), final.slice(0, -1), elidedMorpheme(final.tokens.at(-1))]
}

function jussiveMasculinePlural(indicative: readonly Morpheme[]): readonly Morpheme[] {
  const base = dropTrailingNoon(indicative)
  return base.with(-2, agreementMorpheme(...(base.at(-2)?.tokens ?? []), ALIF))
}

function dropTrailingNoon(stem: readonly Morpheme[]): readonly Morpheme[] {
  const last = stem.at(-1)
  const tokens = last?.tokens ?? []
  const noonIndex = tokens.findLastIndex((t) => t.equals(NOON))
  return [
    ...stem.slice(0, -1),
    agreementMorpheme(...tokens.slice(0, noonIndex)),
    elidedMorpheme(...tokens.slice(noonIndex)),
  ]
}

export function conjugatePresentMood(verb: Verb, mood: Mood): Record<PronounId, Word> {
  if (mood === 'subjunctive') return mapRecord(conjugateSubjunctive(verb), (m) => new Word(m))
  if (mood === 'jussive') return mapRecord(conjugateJussive(verb), (m) => new Word(m))
  return mapRecord(conjugateIndicative(verb), (morphemes) => new Word(morphemes))
}

function deriveFormIq(verb: QuadriliteralVerb): readonly Morpheme[] {
  const [c1, c2, c3, c4] = verb.rootTokens

  return [
    radicalMorpheme(c1),
    measureMorpheme(FATHA),
    radicalMorpheme(c2),
    measureMorpheme(SUKOON),
    radicalMorpheme(c3),
    measureMorpheme(KASRA),
    radicalMorpheme(c4),
  ]
}

function deriveFormIIq(verb: QuadriliteralVerb): readonly Morpheme[] {
  const [c1, c2, c3, c4] = verb.rootTokens

  return [
    measureMorpheme(TEH, FATHA),
    radicalMorpheme(c1),
    measureMorpheme(FATHA),
    radicalMorpheme(c2),
    measureMorpheme(SUKOON),
    radicalMorpheme(c3),
    measureMorpheme(FATHA),
    radicalMorpheme(c4),
  ]
}

function deriveFormIIIq(verb: QuadriliteralVerb): readonly Morpheme[] {
  const [c1, c2, c3, c4] = verb.rootTokens

  return [
    radicalMorpheme(c1),
    measureMorpheme(SUKOON),
    radicalMorpheme(c2),
    measureMorpheme(FATHA, NOON, SUKOON),
    radicalMorpheme(c3),
    measureMorpheme(KASRA),
    radicalMorpheme(c4),
  ]
}

function deriveFormIVq(verb: QuadriliteralVerb): readonly Morpheme[] {
  const [c1, c2, c3, c4] = verb.rootTokens

  return [
    radicalMorpheme(c1),
    measureMorpheme(SUKOON),
    radicalMorpheme(c2),
    measureMorpheme(FATHA),
    radicalMorpheme(c3),
    measureMorpheme(KASRA),
    radicalMorpheme(c4),
    measureMorpheme(SUKOON),
    radicalMorpheme(c4),
  ]
}

function deriveFormI(verb: FormIVerb): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens
  const presentVowel = formIPresentVowel(verb)

  if (c2.equals(c3))
    return [
      radicalMorpheme(c1),
      measureMorpheme(presentVowel),
      radicalMorpheme(c2),
      measureMorpheme(SUKOON),
      radicalMorpheme(c2),
    ]

  if (c3.isWeak) {
    if (c1.equals(WAW)) return [radicalMorpheme(c2), measureMorpheme(presentVowel), radicalMorpheme(c3)]

    if (c3.equals(WAW))
      return [
        radicalMorpheme(c1),
        measureMorpheme(SUKOON),
        radicalMorpheme(c2),
        measureMorpheme(DAMMA),
        radicalMorpheme(WAW),
      ]

    if (c2.isHamza) return [radicalMorpheme(c1), measureMorpheme(FATHA), radicalMorpheme(ALIF_MAQSURA)]

    if (presentVowel.equals(FATHA))
      return [
        radicalMorpheme(c1),
        measureMorpheme(SUKOON),
        radicalMorpheme(c2),
        measureMorpheme(FATHA),
        radicalMorpheme(ALIF_MAQSURA),
      ]

    return [
      radicalMorpheme(c1),
      measureMorpheme(SUKOON),
      radicalMorpheme(c2),
      measureMorpheme(...longVowel(presentVowel)),
    ]
  }

  if (c1.equals(WAW) && !presentVowel.equals(DAMMA))
    return [radicalMorpheme(c2), measureMorpheme(presentVowel), radicalMorpheme(c3)]

  if (verb.hollowContraction === 'uncontracted')
    return [
      radicalMorpheme(c1),
      measureMorpheme(SUKOON),
      radicalMorpheme(c2),
      measureMorpheme(FATHA),
      radicalMorpheme(c3),
    ]

  if (c2.equals(YEH) && isFormIPastVowel(verb, FATHA))
    return [radicalMorpheme(c1), measureMorpheme(KASRA), radicalMorpheme(YEH), radicalMorpheme(c3)]

  if (c2.isWeak) {
    const [shortVowel, longLetter] = longVowel(presentVowel)
    return [radicalMorpheme(c1), measureMorpheme(shortVowel), radicalMorpheme(longLetter), radicalMorpheme(c3)]
  }

  return [
    radicalMorpheme(c1),
    measureMorpheme(SUKOON),
    radicalMorpheme(c2),
    measureMorpheme(presentVowel),
    radicalMorpheme(c3),
  ]
}

function deriveFormII(verb: NonFormIVerb): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens

  return [
    radicalMorpheme(c1),
    measureMorpheme(FATHA),
    radicalMorpheme(c2),
    measureMorpheme(SUKOON),
    radicalMorpheme(c2),
    measureMorpheme(KASRA),
    radicalMorpheme(c3),
  ]
}

function deriveFormIII(verb: NonFormIVerb): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [radicalMorpheme(c1), measureMorpheme(FATHA, ALIF), radicalMorpheme(c2)]

  if (c2.equals(c3)) return [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c3)]

  return [...prefix, measureMorpheme(KASRA), radicalMorpheme(c3)]
}

function deriveFormIV(verb: NonFormIVerb): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [radicalMorpheme(c1)]

  if (c2.isHamza) return [...prefix, measureMorpheme(KASRA), radicalMorpheme(c3)]

  if (c3.isWeak)
    return [
      ...prefix,
      ...(c1.isWeak ? [] : [measureMorpheme(SUKOON)]),
      radicalMorpheme(c2),
      measureMorpheme(KASRA),
      radicalMorpheme(YEH),
    ]

  if (c2.isWeak) return [...prefix, measureMorpheme(KASRA), radicalMorpheme(YEH), radicalMorpheme(c3)]

  if (c2.equals(c3))
    return [...prefix, measureMorpheme(KASRA), radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)]

  return [
    ...prefix,
    ...(c1.isWeak ? [] : [measureMorpheme(SUKOON)]),
    radicalMorpheme(c2),
    measureMorpheme(KASRA),
    radicalMorpheme(c3),
  ]
}

function deriveFormV(verb: NonFormIVerb): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens

  if (c3.equals(YEH))
    return [
      measureMorpheme(TEH, FATHA),
      radicalMorpheme(c1),
      measureMorpheme(FATHA),
      radicalMorpheme(c2),
      measureMorpheme(SUKOON, c2, FATHA),
      radicalMorpheme(ALIF_MAQSURA),
    ]

  return [
    measureMorpheme(TEH, FATHA),
    radicalMorpheme(c1),
    measureMorpheme(FATHA),
    radicalMorpheme(c2),
    measureMorpheme(SUKOON, c2, FATHA),
    radicalMorpheme(c3),
  ]
}

function deriveFormVI(verb: NonFormIVerb): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [measureMorpheme(TEH, FATHA), radicalMorpheme(c1), measureMorpheme(FATHA, ALIF)]

  if (c3.isWeak) return [...prefix, radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(ALIF_MAQSURA)]

  if (c2.equals(c3)) return [...prefix, radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c2)]

  return [...prefix, radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)]
}

function deriveFormVII(verb: NonFormIVerb): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [measureMorpheme(NOON, SUKOON), radicalMorpheme(c1), measureMorpheme(FATHA)]

  if (c2.equals(c3)) return [...prefix, radicalMorpheme(c2), measureMorpheme(SHADDA)]

  if (c3.isWeak) return [...prefix, radicalMorpheme(c2), measureMorpheme(KASRA), radicalMorpheme(c3)]

  if (c2.isWeak) return [...prefix, radicalMorpheme(ALIF), radicalMorpheme(c3)]

  return [...prefix, radicalMorpheme(c2), measureMorpheme(KASRA), radicalMorpheme(c3)]
}

function deriveFormVIII(verb: NonFormIVerb): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens
  const assimilatedC1 = c1.isHamza || c1.isWeak ? TEH : c1
  const infix = resolveFormVIIIInfixConsonant(c1)

  if (c2.equals(c3))
    return [
      radicalMorpheme(c1),
      measureMorpheme(SUKOON, infix, FATHA),
      radicalMorpheme(c2),
      measureMorpheme(SUKOON),
      radicalMorpheme(c3),
    ]

  if (c3.isWeak)
    return [
      radicalMorpheme(assimilatedC1),
      measureMorpheme(SUKOON, infix, FATHA),
      radicalMorpheme(c2),
      measureMorpheme(KASRA),
      radicalMorpheme(YEH),
    ]

  if (c2.equals(YEH) || (c2.isWeak && !infix.equals(DAL)))
    return [radicalMorpheme(c1), measureMorpheme(SUKOON, infix, FATHA), radicalMorpheme(ALIF), radicalMorpheme(c3)]

  return [
    radicalMorpheme(assimilatedC1),
    measureMorpheme(SUKOON, infix, FATHA),
    radicalMorpheme(c2),
    measureMorpheme(KASRA),
    radicalMorpheme(c3),
  ]
}

function deriveFormIX(verb: NonFormIVerb): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens

  return [
    radicalMorpheme(c1),
    measureMorpheme(SUKOON),
    radicalMorpheme(c2),
    measureMorpheme(FATHA),
    radicalMorpheme(c3),
    measureMorpheme(SUKOON),
    radicalMorpheme(c3),
  ]
}

function deriveFormX(verb: NonFormIVerb): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [measureMorpheme(SEEN, SUKOON, TEH, FATHA), radicalMorpheme(c1)]

  if (c2.isWeak && c3.isWeak)
    return [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(KASRA), radicalMorpheme(c3)]

  if (c2.isWeak) return [...prefix, measureMorpheme(KASRA), radicalMorpheme(YEH), radicalMorpheme(c3)]

  if (!c1.isWeak && c3.isWeak)
    return [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(KASRA), radicalMorpheme(YEH)]

  if (c2.equals(c3))
    return [...prefix, measureMorpheme(KASRA), radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)]

  return [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(KASRA), radicalMorpheme(c3)]
}

export function derivePresentStem(verb: Verb): readonly Morpheme[] {
  if (isQuadriliteralVerb(verb)) {
    switch (verb.form) {
      case 1:
        return deriveFormIq(verb)
      case 2:
        return deriveFormIIq(verb)
      case 3:
        return deriveFormIIIq(verb)
      case 4:
        return deriveFormIVq(verb)
    }
  }

  switch (verb.form) {
    case 1:
      return deriveFormI(verb)
    case 2:
      return deriveFormII(verb)
    case 3:
      return deriveFormIII(verb)
    case 4:
      return deriveFormIV(verb)
    case 5:
      return deriveFormV(verb)
    case 6:
      return deriveFormVI(verb)
    case 7:
      return deriveFormVII(verb)
    case 8:
      return deriveFormVIII(verb)
    case 9:
      return deriveFormIX(verb)
    case 10:
      return deriveFormX(verb)
  }
}

function contractHollowRoot(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  const index = morphemes.findIndex((m, i) => m.role === 'radical' && morphemes[i + 1]?.role === 'radical')
  if (index === -1 || !morphemes[index + 2]?.equals([SUKOON])) return morphemes

  const weakIdx = morphemes[index].tokens.findIndex((t) => t.isWeak)
  if (weakIdx === -1) return morphemes

  return [...morphemes.slice(0, index), elidedMorpheme(morphemes[index].tokens[weakIdx]), ...morphemes.slice(index + 1)]
}

function substituteWeakRadicalWithYehBeforeDualMarker(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  const index = morphemes.findIndex(
    (m, i) => m.equals([ALIF_MAQSURA]) && morphemes[i + 1]?.equals([FATHA, ALIF, NOON, KASRA]),
  )
  if (index === -1) return morphemes
  return [...morphemes.slice(0, index), radicalMorpheme(YEH), ...morphemes.slice(index + 1)]
}

function stripFemininePluralSuffixAfterDefectiveTail(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  const index = morphemes.findIndex(
    (m, i) => m.some((t) => t.isWeak) && morphemes[i + 1]?.role === 'agreement' && morphemes[i + 1]?.equals([SUKOON]),
  )
  if (index === -1) return morphemes

  const target = morphemes[index]
  const replacement =
    target.role === 'radical' && !target.equals([WAW])
      ? morphemes[index - 1]?.endsWith([FATHA])
        ? agreementMorpheme(YEH, SUKOON)
        : radicalMorpheme(YEH)
      : target
  return [...morphemes.slice(0, index), replacement, ...morphemes.slice(index + 2)]
}

function elideWeakRadicalReusingPrecedingVowelBeforeFeminineSingularSuffix(
  morphemes: readonly Morpheme[],
): readonly Morpheme[] {
  const index = morphemes.findIndex(
    (m, i) => m.some((t) => t.isWeak) && morphemes[i + 1]?.role === 'agreement' && morphemes[i + 1]?.equals([KASRA]),
  )
  if (index < 1) return morphemes

  const precedingRadicals = morphemes.slice(0, index).filter((m) => m.role === 'radical')
  if (precedingRadicals.length < 2) return morphemes

  const precedingVowel = morphemes[index - 1]

  return [...morphemes.slice(0, index - 1), agreementMorpheme(precedingVowel.at(0)), ...morphemes.slice(index + 2)]
}

function elideWeakRadicalBeforeMasculinePluralDamma(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  const index = morphemes.findIndex(
    (m, i) => m.role === 'radical' && m.some((t) => t.isWeak) && morphemes[i + 1]?.equals([DAMMA]),
  )
  if (index < 1) return morphemes

  const vowel = morphemes[index].equals([ALIF_MAQSURA]) ? agreementMorpheme(FATHA) : agreementMorpheme(DAMMA)
  return [...morphemes.slice(0, index - 1), vowel, ...morphemes.slice(index + 2)]
}

function replaceFusedDefectiveMeasureBeforeMasculinePluralDamma(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  const index = morphemes.findIndex(
    (m, i) => m.length === 2 && m.some((t) => t.isWeak) && morphemes[i + 1]?.equals([DAMMA]),
  )
  if (index === -1) return morphemes
  return [...morphemes.slice(0, index), agreementMorpheme(DAMMA), ...morphemes.slice(index + 2)]
}

function contractDefectiveRoot(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  return replaceFusedDefectiveMeasureBeforeMasculinePluralDamma(
    elideWeakRadicalBeforeMasculinePluralDamma(
      elideWeakRadicalReusingPrecedingVowelBeforeFeminineSingularSuffix(
        stripFemininePluralSuffixAfterDefectiveTail(substituteWeakRadicalWithYehBeforeDualMarker(morphemes)),
      ),
    ),
  )
}

function expandGeminationMorphemes(stem: readonly Morpheme[], vowel: Token): readonly Morpheme[] {
  for (let i = 1; i < stem.length - 1; i++) {
    if (SUKOON.equals(stem[i].at(0)) && stem[i - 1].at(0)?.equals(stem[i + 1].at(0))) {
      return [...stem.slice(0, i), measureMorpheme(vowel), ...stem.slice(i + 1)]
    }
  }
  return stem
}

// Forms I/IV/X have only one linking vowel between C1 and the geminate C2-C3 pair; feminine
// plural's consonant-initial suffix needs that vowel between C2 and C3 instead, so it migrates
// rather than being replaced in place (contrast expandGeminationMorphemes above).
function migrateGeminateLinkingVowel(stem: readonly Morpheme[]): readonly Morpheme[] {
  for (let i = 2; i < stem.length - 1; i++) {
    if (SUKOON.equals(stem[i].at(0)) && stem[i - 1].at(0)?.equals(stem[i + 1].at(0))) {
      return [...stem.slice(0, i - 2), stem[i], stem[i - 1], stem[i - 2], ...stem.slice(i + 1)]
    }
  }
  return stem
}
