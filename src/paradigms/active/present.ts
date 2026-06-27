import { mapRecord } from '../../primitives/objects'
import { formIPresentVowel, isFormIPastVowel, isFormIPresentVowel } from '../form-i-vowels'
import { isDual, isMasculinePlural, type PronounId } from '../pronouns'
import type { Mood } from '../tense'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_MAQSURA,
  DAL,
  DAMMA,
  FATHA,
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
import {
  type FormIVerb,
  isQuadriliteralVerb,
  isTriliteralFormIVerb,
  type NonFormIVerb,
  type QuadriliteralVerb,
  type Verb,
} from '../verbs'
import { agreementMorpheme, type Morpheme, measureMorpheme, radicalMorpheme, Word } from '../word'

function deriveFeminineSingularStem(stem: readonly Morpheme[], verb: Verb): readonly Morpheme[] {
  const kasra = agreementMorpheme(KASRA)
  const fatha = agreementMorpheme(FATHA)

  if (isQuadriliteralVerb(verb)) return [...stem, kasra]

  const [c1, c2, c3] = verb.rootTokens

  switch (verb.form) {
    case 1:
      if (c3.isWeak && isFormIPresentVowel(verb, FATHA)) return [...stem.slice(0, -2), fatha]
      if (c3.isWeak && (c1.isWeak || c3.equals(WAW))) return [...stem.slice(0, -2), kasra]
      if (c3.isWeak) return stem.with(-1, kasra)
      return [...stem, kasra]

    case 2:
    case 3:
    case 4:
      if (c3.isWeak) return [...stem.slice(0, -2), kasra]
      return [...stem, kasra]

    case 5:
      if (c3.isWeak) return stem.slice(0, -1)
      return [...stem, kasra]

    case 6:
      if (c3.isWeak) return [...stem.slice(0, -2), fatha]
      return [...stem, kasra]

    case 7:
      if (c2.isWeak && c3.isWeak) return [...stem.slice(0, -2), fatha]
      if (c3.isWeak) return [...stem.slice(0, -2), kasra]
      return [...stem, kasra]

    case 8:
    case 9:
    case 10:
      if (c3.isWeak) return [...stem.slice(0, -2), kasra]
      return [...stem, kasra]
  }
}

function deriveMasculinePluralStem(stem: readonly Morpheme[], verb: Verb): readonly Morpheme[] {
  const fatha = agreementMorpheme(FATHA)
  const damma = agreementMorpheme(DAMMA)

  if (isQuadriliteralVerb(verb)) return [...stem, agreementMorpheme(DAMMA)]

  const [c1, c2, c3] = verb.rootTokens

  switch (verb.form) {
    case 1:
      if (c3.isWeak && isFormIPresentVowel(verb, FATHA) && c2.isHamza) return [radicalMorpheme(c1), fatha]
      if (c3.isWeak && isFormIPresentVowel(verb, FATHA))
        return [radicalMorpheme(c1), measureMorpheme(SUKOON), radicalMorpheme(c2), fatha]
      if (c2.isHamza && c3.isWeak) return [...stem.slice(0, -2), damma]
      if (c1.isWeak && c3.isWeak) return stem.slice(0, -2)
      if (c3.equals(WAW)) return [...stem.slice(0, -2), damma]
      if (c3.isWeak) return stem.with(-1, damma)
      return [...stem, damma]

    case 2:
    case 3:
      if (c3.isWeak) return [...stem.slice(0, -2), damma]
      return [...stem, damma]

    case 4:
      if (c1.isWeak && c3.isWeak) return stem.slice(0, -2)
      if (c3.isWeak) return [...stem.slice(0, -2), damma]
      return [...stem, damma]

    case 5:
      if (c3.isWeak) return stem.slice(0, -1)
      return [...stem, damma]

    case 6:
      if (c3.isWeak) return [...stem.slice(0, -2), fatha]
      return [...stem, damma]

    case 7:
      if (c2.isWeak && c3.isWeak) return [...stem.slice(0, -2), damma]
      if (c3.isWeak) return stem
      return [...stem, damma]

    case 8:
      if (c3.isWeak) return [...stem.slice(0, -2), damma]
      return [...stem, damma]

    case 9:
    case 10:
      if (c1.isWeak && c3.isWeak) return stem.slice(0, -2)
      if (c3.isWeak) return [...stem.slice(0, -2), damma]
      return [...stem, damma]
  }
}

function deriveFemininePluralStem(stem: readonly Morpheme[], verb: Verb): readonly Morpheme[] {
  if (isQuadriliteralVerb(verb)) {
    const [, , c3, c4] = verb.rootTokens
    if (verb.form === 4) {
      return [
        ...stem.slice(0, 4),
        radicalMorpheme(c3),
        measureMorpheme(SUKOON),
        radicalMorpheme(c4),
        measureMorpheme(KASRA),
        radicalMorpheme(c4),
        agreementMorpheme(SUKOON),
      ]
    }
    return [...stem, agreementMorpheme(SUKOON)]
  }

  const [c1, c2, c3] = verb.rootTokens
  const suffix = c3.isWeak ? agreementMorpheme() : agreementMorpheme(SUKOON)

  switch (verb.form) {
    case 1: {
      if (c2.equals(c3))
        return [
          radicalMorpheme(c1),
          measureMorpheme(SUKOON),
          radicalMorpheme(c2),
          measureMorpheme(formIPresentVowel(verb)),
          radicalMorpheme(c3),
          suffix,
        ]
      if (c3.isWeak && isFormIPresentVowel(verb, FATHA))
        return c2.isHamza
          ? [radicalMorpheme(c1), measureMorpheme(FATHA), radicalMorpheme(YEH), suffix]
          : [
              radicalMorpheme(c1),
              measureMorpheme(SUKOON),
              radicalMorpheme(c2),
              measureMorpheme(FATHA),
              radicalMorpheme(YEH),
              suffix,
            ]
      if (c2.isWeak && c3.isWeak) return [...stem, suffix]
      if (c2.isWeak && verb.presentHollow !== 'uncontracted') return [...shortenHollowStemMorphemes(stem), suffix]
      return [...stem, suffix]
    }

    case 2:
      return [...stem, suffix]

    case 3:
      if (c2.equals(c3))
        return [
          radicalMorpheme(c1),
          measureMorpheme(FATHA, ALIF),
          radicalMorpheme(c2),
          measureMorpheme(KASRA),
          radicalMorpheme(c2),
          suffix,
        ]
      return [...stem, suffix]

    case 4:
      if (c2.equals(c3))
        return [
          radicalMorpheme(c1),
          measureMorpheme(SUKOON),
          radicalMorpheme(c2),
          measureMorpheme(KASRA),
          radicalMorpheme(c3),
          suffix,
        ]
      if (c2.isWeak) return [...shortenHollowStemMorphemes(stem), suffix]
      return [...stem, suffix]

    case 5:
      if (c3.isWeak) return [...stem.with(-1, radicalMorpheme(YEH)), suffix]
      return [...stem, suffix]

    case 6:
      if (c3.isWeak) return [...stem.with(-1, radicalMorpheme(YEH)), suffix]
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
      if (c3.isWeak) return [...stem.with(-1, radicalMorpheme(YEH)), suffix]
      if (c2.isWeak) return [...shortenHollowStemMorphemes(stem), suffix]
      return [...stem, suffix]

    case 8:
      if (c2.equals(c3))
        return [
          radicalMorpheme(c1),
          measureMorpheme(SUKOON, resolveFormVIIIInfixConsonant(c1), FATHA),
          radicalMorpheme(c2),
          measureMorpheme(KASRA),
          radicalMorpheme(c3),
          suffix,
        ]
      if (c2.equals(YEH)) return [...shortenHollowStemMorphemes(stem), suffix]
      return [...stem, suffix]

    case 9:
      return [...expandGeminationMorphemes(stem, KASRA), suffix]

    case 10:
      if (c2.equals(c3))
        return [
          measureMorpheme(SEEN, SUKOON, TEH, FATHA),
          radicalMorpheme(c1),
          measureMorpheme(SUKOON),
          radicalMorpheme(c2),
          measureMorpheme(KASRA),
          radicalMorpheme(c3),
          suffix,
        ]
      if (c2.isWeak) return [...shortenHollowStemMorphemes(stem), suffix]
      return [...stem, suffix]
  }
}

function deriveDualStem(stem: readonly Morpheme[], verb: Verb): readonly Morpheme[] {
  const suffix = agreementMorpheme(FATHA, ALIF, NOON, KASRA)

  if (isQuadriliteralVerb(verb)) return [...stem, suffix]

  const [c1, c2, c3] = verb.rootTokens

  switch (verb.form) {
    case 1:
      if (c3.isWeak && c2.isHamza) return [...stem.with(-1, radicalMorpheme(YEH)), suffix]
      if (c3.isWeak && isFormIPresentVowel(verb, FATHA))
        return [...stem.slice(0, -2), agreementMorpheme(FATHA, YEH), suffix]
      if (c1.isWeak && c3.isWeak) return [...stem.slice(0, -2), suffix]
      return [...stem, suffix]

    case 2:
    case 3:
      return [...stem, suffix]

    case 4:
      if (c1.isWeak && c3.isWeak) return [...stem.slice(0, -2), suffix]
      return [...stem, suffix]

    case 5:
    case 6:
      if (c3.isWeak) return [...stem.with(-1, radicalMorpheme(YEH)), suffix]
      return [...stem, suffix]

    case 7:
    case 8:
    case 9:
      return [...stem, suffix]

    case 10:
      if (c1.isWeak && c3.isWeak) return [...stem.slice(0, -2), suffix]
      return [...stem, suffix]
  }
}

const dammaSuffix = (s: boolean) => (s ? [agreementMorpheme(DAMMA)] : [])

function deriveIndicativeForms(verb: Verb): Record<PronounId, readonly Morpheme[]> {
  const [c1, , c3] = verb.rootTokens
  const stem = derivePresentStem(verb)
  const dual = deriveDualStem(stem, verb)
  const masculinePlural = deriveMasculinePluralStem(stem, verb)
  const femininePlural = deriveFemininePluralStem(stem, verb)
  const vowel = presentPrefixVowel(verb)
  const suffix = dammaSuffix(isQuadriliteralVerb(verb) || !c3.isWeak || (verb.form === 10 && c1.isWeak && c3.isWeak))

  return {
    '1s': [agreementMorpheme(ALIF_HAMZA, vowel), ...stem, ...suffix],
    '2ms': [agreementMorpheme(TEH, vowel), ...stem, ...suffix],
    '2fs': [
      agreementMorpheme(TEH, vowel),
      ...deriveFeminineSingularStem(stem, verb),
      agreementMorpheme(YEH, NOON, FATHA),
    ],
    '3ms': [agreementMorpheme(YEH, vowel), ...stem, ...suffix],
    '3fs': [agreementMorpheme(TEH, vowel), ...stem, ...suffix],
    '2d': [agreementMorpheme(TEH, vowel), ...dual],
    '3md': [agreementMorpheme(YEH, vowel), ...dual],
    '3fd': [agreementMorpheme(TEH, vowel), ...dual],
    '1p': [agreementMorpheme(NOON, vowel), ...stem, ...suffix],
    '2mp': [agreementMorpheme(TEH, vowel), ...masculinePlural, agreementMorpheme(WAW, NOON, FATHA)],
    '2fp': [agreementMorpheme(TEH, vowel), ...femininePlural, agreementMorpheme(NOON, FATHA)],
    '3mp': [agreementMorpheme(YEH, vowel), ...masculinePlural, agreementMorpheme(WAW, NOON, FATHA)],
    '3fp': [agreementMorpheme(YEH, vowel), ...femininePlural, agreementMorpheme(NOON, FATHA)],
  }
}

function presentPrefixVowel(verb: Verb): Token {
  if (isQuadriliteralVerb(verb)) return verb.form === 1 ? DAMMA : FATHA
  return [2, 3, 4].includes(verb.form) ? DAMMA : FATHA
}

function dropTrailingNoon(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  const last = morphemes.at(-1)
  const keptTokens =
    last?.tokens.slice(
      0,
      last.tokens.findLastIndex((t) => t.equals(NOON)),
    ) ?? []
  return morphemes.with(-1, agreementMorpheme(...keptTokens))
}

function conjugateSubjunctive(verb: Verb): Record<PronounId, readonly Morpheme[]> {
  const [, c2, c3] = verb.rootTokens
  const indicative = deriveIndicativeForms(verb)

  return {
    '1s': defaultSubjunctiveForm(indicative['1s']),
    '2ms': defaultSubjunctiveForm(indicative['2ms']),
    '2fs':
      verb.form === 7 && c2.isWeak && c3.isWeak
        ? [...indicative['2fs'].slice(0, -2), agreementMorpheme(KASRA, YEH)]
        : indicative['2fs'].with(
            -1,
            c3.isWeak && ((isTriliteralFormIVerb(verb) && isFormIPresentVowel(verb, FATHA)) || verb.form === 6)
              ? agreementMorpheme(YEH, SUKOON)
              : agreementMorpheme(YEH),
          ),
    '3ms': defaultSubjunctiveForm(indicative['3ms']),
    '3fs': defaultSubjunctiveForm(indicative['3fs']),
    '2d': indicative['2d'].with(-1, agreementMorpheme(FATHA, ALIF)),
    '3md': indicative['3md'].with(-1, agreementMorpheme(FATHA, ALIF)),
    '3fd': indicative['3fd'].with(-1, agreementMorpheme(FATHA, ALIF)),
    '1p': defaultSubjunctiveForm(indicative['1p']),
    '2mp': indicative['2mp'].with(-1, agreementMorpheme(WAW, ALIF)),
    '2fp': indicative['2fp'],
    '3mp': indicative['3mp'].with(-1, agreementMorpheme(WAW, ALIF)),
    '3fp': indicative['3fp'],
  }
}

const defaultSubjunctiveForm = (stem: readonly Morpheme[]): readonly Morpheme[] => {
  const finalMorpheme = stem.at(-1)
  const finalToken = finalMorpheme?.tokens.at(-1)

  if (finalMorpheme && finalToken?.equals(DAMMA)) return stem.with(-1, finalMorpheme.with(-1, FATHA))

  if (finalToken?.equals(ALIF_MAQSURA)) return stem

  return [...stem, agreementMorpheme(FATHA)]
}

function conjugateJussive(verb: Verb): Record<PronounId, readonly Morpheme[]> {
  const [, c2, c3] = verb.rootTokens
  const geminateJussiveFatha = verb.form === 9 || (c2.equals(c3) && [1, 3, 4, 7, 8, 10].includes(verb.form))
  const fathaDefective =
    c3.isWeak && ((isTriliteralFormIVerb(verb) && isFormIPresentVowel(verb, FATHA)) || verb.form === 5)

  return mapRecord(deriveIndicativeForms(verb), (morphemes, pronounId) => {
    const indicativeStem = new Word(morphemes).morphemes
    const stem = morphemes.slice(0, -1)
    const final = morphemes.at(-1)
    const finalToken = final?.tokens.at(-1)

    if (isDual(pronounId)) {
      const base = dropTrailingNoon(indicativeStem)

      if (verb.form === 5 && c3.isWeak) return base
      if (c2.isHamza || c2.isWeak || c3.isHamza) return base
      if (base.at(-2)?.containsToken(WAW)) return base.with(-1, agreementMorpheme(ALIF))
      if ([1, 4].includes(verb.form)) return base
      if (base.at(-2)?.containsToken(YEH)) return [...base.slice(0, -2), agreementMorpheme(ALIF)]

      return [...stem, c3.equals(WAW) ? agreementMorpheme(ALIF) : agreementMorpheme(FATHA, ALIF)]
    }

    if (isMasculinePlural(pronounId)) {
      if (
        (isTriliteralFormIVerb(verb) && c3.isWeak && isFormIPresentVowel(verb, FATHA)) ||
        (verb.form === 5 && c3.isWeak)
      ) {
        const base = dropTrailingNoon(indicativeStem)
        return base.with(-1, agreementMorpheme(...(base.at(-1)?.tokens ?? []), ALIF))
      }

      return indicativeStem.with(-1, agreementMorpheme(DAMMA, WAW, ALIF))
    }

    if (pronounId === '2fs') {
      if (verb.form === 7 && c3.isWeak) return stem.with(-1, agreementMorpheme(KASRA, YEH))
      return fathaDefective ? [...stem, agreementMorpheme(YEH, SUKOON)] : [...stem, agreementMorpheme(YEH)]
    }

    if (finalToken?.equals(DAMMA)) {
      if (isQuadriliteralVerb(verb) && stem.at(-1)?.tokens[0].equals(stem.at(-3)?.tokens[0]))
        return [
          ...stem.slice(0, -4),
          measureMorpheme(SUKOON),
          stem[stem.length - 3],
          measureMorpheme(KASRA),
          stem[stem.length - 1],
          agreementMorpheme(SUKOON),
        ]

      if (
        c2.isWeak &&
        verb.form !== 5 &&
        stem.some(
          (m, i) =>
            (m.role === 'measure' && m.tokens.some((t) => t.isWeak && (!ALIF.equals(t) || verb.form === 1))) ||
            (m.role === 'radical' && stem[i + 1]?.role === 'radical'),
        )
      )
        return [...shortenHollowStemMorphemes(stem), agreementMorpheme(SUKOON)]

      if (c3.isWeak && stem.at(-1)?.contains((t) => t.isWeak)) return stem.slice(0, -1)

      if (final) return [...stem, final.with(-1, geminateJussiveFatha ? FATHA : SUKOON)]

      return stem
    }

    const last = indicativeStem.at(-1)
    if (!last?.tokens.at(-1)?.isWeak) return indicativeStem
    return indicativeStem.with(-1, agreementMorpheme(...last.tokens.slice(0, -1)))
  })
}

export function conjugatePresentMood(verb: Verb, mood: Mood): Record<PronounId, Word> {
  if (mood === 'subjunctive') return mapRecord(conjugateSubjunctive(verb), (m) => new Word(m))
  if (mood === 'jussive') return mapRecord(conjugateJussive(verb), (m) => new Word(m))
  return mapRecord(deriveIndicativeForms(verb), (morphemes) => new Word(morphemes))
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

  if (c1.equals(WAW)) return [radicalMorpheme(c2), measureMorpheme(presentVowel), radicalMorpheme(c3)]

  if (verb.presentHollow === 'uncontracted')
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

  if (c3.isWeak)
    return [
      radicalMorpheme(c1),
      measureMorpheme(FATHA),
      radicalMorpheme(c2),
      measureMorpheme(SUKOON),
      radicalMorpheme(c2),
      measureMorpheme(KASRA),
      radicalMorpheme(c3),
    ]

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

  if (c3.isWeak) return [...prefix, measureMorpheme(KASRA), radicalMorpheme(c3)]

  return [...prefix, measureMorpheme(KASRA), radicalMorpheme(c3)]
}

function deriveFormIV(verb: NonFormIVerb): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [radicalMorpheme(c1)]

  if (c2.isHamza) return [...prefix, measureMorpheme(KASRA), radicalMorpheme(c3)]

  if (c3.isWeak)
    return [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(KASRA), radicalMorpheme(YEH)]

  if (c2.isWeak) return [...prefix, measureMorpheme(KASRA), radicalMorpheme(YEH), radicalMorpheme(c3)]

  if (c2.equals(c3))
    return [...prefix, measureMorpheme(KASRA), radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)]

  return [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(KASRA), radicalMorpheme(c3)]
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

function derivePresentStem(verb: Verb): readonly Morpheme[] {
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

function shortenHollowStemMorphemes(stem: readonly Morpheme[]): readonly Morpheme[] {
  for (let i = 1; i < stem.length; i++) {
    const weakIdx = stem[i].tokens.findIndex((t) => t.isWeak)
    if (weakIdx >= 0) {
      const shortened = stem[i].tokens.filter((_, j) => j !== weakIdx)
      return [...stem.slice(0, i), measureMorpheme(...shortened), ...stem.slice(i + 1)]
    }
  }
  return stem
}

function expandGeminationMorphemes(stem: readonly Morpheme[], vowel: Token): readonly Morpheme[] {
  for (let i = 1; i < stem.length - 1; i++) {
    if (SUKOON.equals(stem[i].tokens[0]) && stem[i - 1].tokens[0].equals(stem[i + 1].tokens[0])) {
      return [...stem.slice(0, i), measureMorpheme(vowel), ...stem.slice(i + 1)]
    }
  }
  return stem
}
