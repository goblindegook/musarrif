import { mapRecord } from '../../primitives/objects'
import { formIPresentVowel, isFormIPastVowel, isFormIPresentVowel } from '../form-i-vowels'
import { isDual, isFemininePlural, isMasculinePlural, type PronounId } from '../pronouns'
import type { Mood } from '../tense'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_MAQSURA,
  DAL,
  DAMMA,
  FATHA,
  finalize,
  KASRA,
  longVowel,
  NOON,
  resolveFormVIIIInfixConsonant,
  SEEN,
  SHADDA,
  SUKOON,
  TEH,
  type Token,
  tokenize,
  WAW,
  YEH,
} from '../tokens'
import type { FormIVerb, NonFormIVerb, Verb } from '../verbs'
import { agreementMorpheme, type MorphemeToken, measureMorpheme, radicalMorpheme, Word } from '../word'

function deriveFeminineSingularStem(stem: readonly MorphemeToken[], verb: Verb): readonly MorphemeToken[] {
  const suffix = agreementMorpheme(KASRA, YEH, NOON, FATHA)

  if (verb.root.length > 3) return [...stem, suffix]

  const [c1, c2, c3] = verb.rootTokens

  switch (verb.form) {
    case 1:
      if (c3.isWeak && isFormIPresentVowel(verb, FATHA))
        return [...stem.slice(0, -2), agreementMorpheme(FATHA, YEH, NOON, FATHA)]
      if (c3.isWeak && (c1.isWeak || c3.equals(WAW))) return [...stem.slice(0, -2), suffix]
      if (c3.isWeak) return [...stem.slice(0, -1), suffix]
      return [...stem, suffix]

    case 2:
    case 3:
    case 4:
      if (c3.isWeak) return [...stem.slice(0, -2), suffix]
      return [...stem, suffix]

    case 5:
    case 6:
      if (c3.isWeak) return [...stem.slice(0, -2), agreementMorpheme(FATHA, YEH, NOON, FATHA)]
      return [...stem, suffix]

    case 7:
      if (c2.isWeak && c3.isWeak) return [...stem.slice(0, -2), agreementMorpheme(FATHA, YEH, NOON, FATHA)]
      if (c3.isWeak) return [...stem.slice(0, -2), suffix]
      return [...stem, suffix]

    case 8:
    case 9:
    case 10:
      if (c3.isWeak) return [...stem.slice(0, -2), suffix]
      return [...stem, suffix]
  }
}

function deriveMasculinePluralStem(stem: readonly MorphemeToken[], verb: Verb): readonly MorphemeToken[] {
  if (verb.root.length > 3) return [...stem, agreementMorpheme(DAMMA, WAW, NOON, FATHA)]

  const [c1, c2, c3] = verb.rootTokens

  switch (verb.form) {
    case 1:
      if (c3.isWeak && isFormIPresentVowel(verb, FATHA) && c2.isHamza)
        return [radicalMorpheme(c1), agreementMorpheme(FATHA, WAW, NOON, FATHA)]
      if (c3.isWeak && isFormIPresentVowel(verb, FATHA))
        return [
          radicalMorpheme(c1),
          measureMorpheme(SUKOON),
          radicalMorpheme(c2),
          agreementMorpheme(FATHA, WAW, NOON, FATHA),
        ]
      if (c2.isHamza && c3.isWeak) return [...stem.slice(0, -2), agreementMorpheme(DAMMA, WAW, NOON, FATHA)]
      if (c1.isWeak && c3.isWeak) return [...stem.slice(0, -2), agreementMorpheme(WAW, NOON, FATHA)]
      if (c3.equals(WAW)) return [...stem.slice(0, -2), agreementMorpheme(DAMMA, WAW, NOON, FATHA)]
      if (c3.isWeak) return [...stem.slice(0, -1), agreementMorpheme(DAMMA, WAW, NOON, FATHA)]
      return [...stem, agreementMorpheme(DAMMA, WAW, NOON, FATHA)]

    case 2:
    case 3:
      if (c3.isWeak) return [...stem.slice(0, -2), agreementMorpheme(DAMMA, WAW, NOON, FATHA)]
      return [...stem, agreementMorpheme(DAMMA, WAW, NOON, FATHA)]

    case 4:
      if (c1.isWeak && c3.isWeak) return [...stem.slice(0, -2), agreementMorpheme(WAW, NOON, FATHA)]
      if (c3.isWeak) return [...stem.slice(0, -2), agreementMorpheme(DAMMA, WAW, NOON, FATHA)]
      return [...stem, agreementMorpheme(DAMMA, WAW, NOON, FATHA)]

    case 5:
    case 6:
      if (c3.isWeak) return [...stem.slice(0, -2), agreementMorpheme(FATHA, WAW, NOON, FATHA)]
      return [...stem, agreementMorpheme(DAMMA, WAW, NOON, FATHA)]

    case 7:
      if (c2.isWeak && c3.isWeak) return [...stem.slice(0, -2), agreementMorpheme(DAMMA, WAW, NOON, FATHA)]
      if (c3.isWeak) return [...stem, agreementMorpheme(WAW, NOON, FATHA)]
      return [...stem, agreementMorpheme(DAMMA, WAW, NOON, FATHA)]

    case 8:
      if (c3.isWeak) return [...stem.slice(0, -2), agreementMorpheme(DAMMA, WAW, NOON, FATHA)]
      return [...stem, agreementMorpheme(DAMMA, WAW, NOON, FATHA)]

    case 9:
    case 10:
      if (c1.isWeak && c3.isWeak) return [...stem.slice(0, -2), agreementMorpheme(WAW, NOON, FATHA)]
      if (c3.isWeak) return [...stem.slice(0, -2), agreementMorpheme(DAMMA, WAW, NOON, FATHA)]
      return [...stem, agreementMorpheme(DAMMA, WAW, NOON, FATHA)]
  }
}

function deriveFemininePluralStem(stem: readonly MorphemeToken[], verb: Verb): readonly MorphemeToken[] {
  if (verb.root.length > 3) {
    const [, , c3, c4] = verb.rootTokens
    if (verb.form === 4) {
      return [
        ...stem.slice(0, 4),
        radicalMorpheme(c3),
        measureMorpheme(SUKOON),
        radicalMorpheme(c4),
        measureMorpheme(KASRA),
        radicalMorpheme(c4),
        agreementMorpheme(SUKOON, NOON, FATHA),
      ]
    }
    return [...stem, agreementMorpheme(SUKOON, NOON, FATHA)]
  }

  const [c1, c2, c3] = verb.rootTokens
  const suffix = c3.isWeak ? agreementMorpheme(NOON, FATHA) : agreementMorpheme(SUKOON, NOON, FATHA)

  switch (verb.form) {
    case 1: {
      const pv = formIPresentVowel(verb)
      if (c2.equals(c3))
        return [
          radicalMorpheme(c1),
          measureMorpheme(SUKOON),
          radicalMorpheme(c2),
          measureMorpheme(pv),
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
      if (c3.isWeak) return [...stem.slice(0, -1), radicalMorpheme(YEH), suffix]
      return [...stem, suffix]

    case 6:
      if (c3.isWeak) return [...stem.slice(0, -1), radicalMorpheme(YEH), suffix]
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
      if (c3.isWeak) return [...stem.slice(0, -1), radicalMorpheme(YEH), suffix]
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

function deriveDualStem(stem: readonly MorphemeToken[], verb: Verb): readonly MorphemeToken[] {
  const suffix = agreementMorpheme(FATHA, ALIF, NOON, KASRA)

  if (verb.root.length > 3) return [...stem, suffix]

  const [c1, c2, c3] = verb.rootTokens

  switch (verb.form) {
    case 1:
      if (c3.isWeak && c2.isHamza) return [...stem.slice(0, -1), radicalMorpheme(YEH), suffix]
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
      if (c3.isWeak) return [...stem.slice(0, -1), radicalMorpheme(YEH), suffix]
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

function deriveIndicativeForms(verb: Verb): Record<PronounId, readonly MorphemeToken[]> {
  const [c1, , c3] = verb.rootTokens
  const stem = derivePresentStem(verb)
  const dual = deriveDualStem(stem, verb)
  const masculinePlural = deriveMasculinePluralStem(stem, verb)
  const femininePlural = deriveFemininePluralStem(stem, verb)
  const vowel = presentPrefixVowel(verb)
  const needsDamma = verb.root.length === 4 || !c3.isWeak || (verb.form === 10 && c1.isWeak && c3.isWeak)

  return {
    '1s': [agreementMorpheme(ALIF_HAMZA, vowel), ...stem, ...dammaSuffix(needsDamma)],
    '2ms': [agreementMorpheme(TEH, vowel), ...stem, ...dammaSuffix(needsDamma)],
    '2fs': [agreementMorpheme(TEH, vowel), ...deriveFeminineSingularStem(stem, verb)],
    '3ms': [agreementMorpheme(YEH, vowel), ...stem, ...dammaSuffix(needsDamma)],
    '3fs': [agreementMorpheme(TEH, vowel), ...stem, ...dammaSuffix(needsDamma)],
    '2d': [agreementMorpheme(TEH, vowel), ...dual],
    '3md': [agreementMorpheme(YEH, vowel), ...dual],
    '3fd': [agreementMorpheme(TEH, vowel), ...dual],
    '1p': [agreementMorpheme(NOON, vowel), ...stem, ...dammaSuffix(needsDamma)],
    '2mp': [agreementMorpheme(TEH, vowel), ...masculinePlural],
    '2fp': [agreementMorpheme(TEH, vowel), ...femininePlural],
    '3mp': [agreementMorpheme(YEH, vowel), ...masculinePlural],
    '3fp': [agreementMorpheme(YEH, vowel), ...femininePlural],
  }
}

function backwardsCompatibleConjugateIndicative(verb: Verb): Record<PronounId, string> {
  return mapRecord(deriveIndicativeForms(verb), (morphemes) => finalize(morphemes.flatMap((m) => [...m.tokens])))
}

function conjugateIndicative(verb: Verb): Record<PronounId, Word> {
  return mapRecord(deriveIndicativeForms(verb), (morphemes) => new Word(morphemes))
}

function dropNoonEnding(word: readonly Token[]): readonly Token[] {
  return word.slice(
    0,
    word.findLastIndex((t) => NOON.equals(t)),
  )
}

function conjugateSubjunctive(verb: Verb): Record<PronounId, string> {
  const [c1, c2, c3] = verb.rootTokens

  return mapRecord(
    mapRecord(backwardsCompatibleConjugateIndicative(verb), (indicative, pronounId) => {
      const word = tokenize(indicative)

      if (isDual(pronounId)) return dropNoonEnding(word)

      if (c3.isWeak && verb.form === 1 && isFormIPresentVowel(verb, FATHA)) {
        if (pronounId === '2fs') return [...dropNoonEnding(word), SUKOON]
        if (isMasculinePlural(pronounId)) return [...dropNoonEnding(word), ALIF]
        return word
      }

      if (c3.isWeak && verb.form === 6) {
        if (pronounId === '2fs') return [...dropNoonEnding(word), SUKOON]
        if (isMasculinePlural(pronounId)) return [...dropNoonEnding(word), ALIF]
        return word
      }

      if (pronounId === '2fs' && verb.form === 7) {
        if (c2.equals(c3)) return [TEH, FATHA, NOON, SUKOON, c1, FATHA, c2, SUKOON, c3, KASRA, YEH]
        return [...dropFinalDiacritic(dropNoonEnding(word).slice(0, -2)), KASRA, YEH]
      }

      if (pronounId === '2fs') return dropNoonEnding(word)

      if (isMasculinePlural(pronounId)) return [...dropNoonEnding(word), ALIF]

      if (c3.equals(YEH) && verb.form === 5) return word

      return [...dropFinalDiacritic(word), FATHA]
    }),
    finalize,
  )
}

function conjugateJussive(verb: Verb): Record<PronounId, string> {
  const letters = verb.rootTokens
  const [c1, c2, c3] = letters

  if (letters.length > 3) {
    return mapRecord(
      mapRecord(backwardsCompatibleConjugateIndicative(verb), (indicative, pronounId) => {
        const word = tokenize(indicative)

        const [, , c3, c4] = letters
        if (isDual(pronounId)) return dropNoonEnding(word)
        if (pronounId === '2fs') return dropNoonEnding(word)
        if (isMasculinePlural(pronounId)) return [...dropNoonEnding(word), ALIF]
        if (isFemininePlural(pronounId)) return [...word.slice(0, -1), FATHA]

        return verb.form === 4
          ? [...word.slice(0, 6), c3, SUKOON, c4, KASRA, c4, SUKOON]
          : [...dropFinalDiacritic(word), SUKOON]
      }),
      finalize,
    )
  }

  return mapRecord(
    mapRecord(backwardsCompatibleConjugateIndicative(verb), (indicative, pronounId) => {
      const word = tokenize(indicative)

      if (verb.form === 1 && c3.isWeak && isFormIPresentVowel(verb, FATHA)) {
        if (pronounId === '2fs') return [...dropNoonEnding(word), SUKOON]
        if (isMasculinePlural(pronounId)) return [...dropNoonEnding(word), ALIF]
      }

      if (verb.form === 5 && c3.isWeak) {
        if (pronounId === '2fs') return [...dropNoonEnding(word), SUKOON]
        if (isMasculinePlural(pronounId)) return [...dropNoonEnding(word), ALIF]
        if (isDual(pronounId)) return dropNoonEnding(word)
      }

      if (isDual(pronounId)) {
        const base = dropNoonEnding(word)

        if (c2.isHamza || c2.isWeak || c3.isHamza) return base

        if (WAW.equals(base.at(-3))) return [...base.slice(0, -3), WAW, ALIF]

        if ([1, 4].includes(verb.form)) return base

        if (YEH.equals(base.at(-3))) return [...base.slice(0, -3), ALIF]

        return base
      }

      if (pronounId === '2fs') {
        if (verb.form === 7 && c2.equals(c3)) return [TEH, FATHA, NOON, SUKOON, c1, FATHA, c2, KASRA, SHADDA, YEH]
        if (verb.form === 7) return [...dropNoonEnding(word).slice(0, -2), KASRA, YEH]
        return dropNoonEnding(word)
      }

      if (isMasculinePlural(pronounId))
        return [...dropFinalDiacritic(dropNoonEnding(word).slice(0, -1)), DAMMA, WAW, ALIF]

      if (isFemininePlural(pronounId)) {
        if (c3.equals(NOON)) return [...word.slice(0, -2), SUKOON, NOON, FATHA]
        return [...word.slice(0, -1), FATHA]
      }

      if (c3.isWeak) return dropFinalDiacritic(word).slice(0, -1)

      if (c2.equals(c3) && [1, 3, 4, 7, 8, 9, 10].includes(verb.form)) return [...dropFinalDiacritic(word), FATHA]

      if (verb.form === 9) return [...dropFinalDiacritic(word), FATHA]

      if (c2.isWeak) {
        if (verb.form === 1 && (word.some((t) => t.equals(ALIF)) || !isFormIPastVowel(verb, KASRA)))
          return [...shortenHollowStem(word).slice(0, -1), SUKOON]

        if ([4, 7, 10].includes(verb.form)) return [...shortenHollowStem(word).slice(0, -1), SUKOON]

        if (verb.form === 8 && (c2.equals(YEH) || !resolveFormVIIIInfixConsonant(c1).equals(DAL)))
          return [...shortenHollowStem(word).slice(0, -1), SUKOON]
      }

      return [...dropFinalDiacritic(word), SUKOON]
    }),
    finalize,
  )
}

export function conjugatePresentMood(verb: Verb, mood: Mood): Record<PronounId, Word> {
  if (mood === 'subjunctive') return toCompatibilityWords(conjugateSubjunctive(verb))
  if (mood === 'jussive') return toCompatibilityWords(conjugateJussive(verb))
  return conjugateIndicative(verb)
}

function derivePresentFormIq(verb: Verb): readonly MorphemeToken[] {
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

function derivePresentFormIIq(verb: Verb): readonly MorphemeToken[] {
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

function derivePresentFormIIIq(verb: Verb): readonly MorphemeToken[] {
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

function derivePresentFormIVq(verb: Verb): readonly MorphemeToken[] {
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

function derivePresentFormI(verb: FormIVerb): readonly MorphemeToken[] {
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
    return [radicalMorpheme(c1), measureMorpheme(...longVowel(KASRA)), radicalMorpheme(c3)]

  if (c2.isWeak) return [radicalMorpheme(c1), measureMorpheme(...longVowel(presentVowel)), radicalMorpheme(c3)]

  return [
    radicalMorpheme(c1),
    measureMorpheme(SUKOON),
    radicalMorpheme(c2),
    measureMorpheme(presentVowel),
    radicalMorpheme(c3),
  ]
}

function derivePresentFormII(verb: NonFormIVerb): readonly MorphemeToken[] {
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

function derivePresentFormIII(verb: NonFormIVerb): readonly MorphemeToken[] {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [radicalMorpheme(c1), measureMorpheme(FATHA, ALIF), radicalMorpheme(c2)]

  if (c2.equals(c3)) return [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c3)]

  if (c3.isWeak) return [...prefix, measureMorpheme(KASRA), radicalMorpheme(c3)]

  return [...prefix, measureMorpheme(KASRA), radicalMorpheme(c3)]
}

function derivePresentFormIV(verb: NonFormIVerb): readonly MorphemeToken[] {
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

function derivePresentFormV(verb: NonFormIVerb): readonly MorphemeToken[] {
  const [c1, c2, c3] = verb.rootTokens

  if (c3.equals(YEH))
    return [
      measureMorpheme(TEH, FATHA),
      radicalMorpheme(c1),
      measureMorpheme(FATHA),
      radicalMorpheme(c2),
      measureMorpheme(SUKOON),
      radicalMorpheme(c2),
      measureMorpheme(FATHA),
      radicalMorpheme(ALIF_MAQSURA),
    ]

  return [
    measureMorpheme(TEH, FATHA),
    radicalMorpheme(c1),
    measureMorpheme(FATHA),
    radicalMorpheme(c2),
    measureMorpheme(SUKOON),
    radicalMorpheme(c2),
    measureMorpheme(FATHA),
    radicalMorpheme(c3),
  ]
}

function derivePresentFormVI(verb: NonFormIVerb): readonly MorphemeToken[] {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [measureMorpheme(TEH, FATHA), radicalMorpheme(c1), measureMorpheme(FATHA, ALIF)]

  if (c3.isWeak) return [...prefix, radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(ALIF_MAQSURA)]

  if (c2.equals(c3)) return [...prefix, radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c2)]

  return [...prefix, radicalMorpheme(c2), measureMorpheme(FATHA), radicalMorpheme(c3)]
}

function derivePresentFormVII(verb: NonFormIVerb): readonly MorphemeToken[] {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [measureMorpheme(NOON, SUKOON), radicalMorpheme(c1), measureMorpheme(FATHA)]

  if (c2.equals(c3)) return [...prefix, radicalMorpheme(c2), measureMorpheme(SHADDA)]

  if (c3.isWeak) return [...prefix, radicalMorpheme(c2), measureMorpheme(KASRA), radicalMorpheme(c3)]

  if (c2.isWeak) return [...prefix, radicalMorpheme(ALIF), radicalMorpheme(c3)]

  return [...prefix, radicalMorpheme(c2), measureMorpheme(KASRA), radicalMorpheme(c3)]
}

function derivePresentFormVIII(verb: NonFormIVerb): readonly MorphemeToken[] {
  const [c1, c2, c3] = verb.rootTokens
  const assimilatedC1 = c1.isHamza || c1.isWeak ? TEH : c1
  const infix = resolveFormVIIIInfixConsonant(c1)
  const seatedC2 = c2
  const seatedC3 = c3

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
      radicalMorpheme(seatedC2),
      measureMorpheme(KASRA),
      radicalMorpheme(YEH),
    ]

  if (c2.equals(YEH) || (c2.isWeak && !infix.equals(DAL)))
    return [radicalMorpheme(c1), measureMorpheme(SUKOON, infix, FATHA), radicalMorpheme(ALIF), radicalMorpheme(c3)]

  return [
    radicalMorpheme(assimilatedC1),
    measureMorpheme(SUKOON, infix, FATHA),
    radicalMorpheme(seatedC2),
    measureMorpheme(KASRA),
    radicalMorpheme(seatedC3),
  ]
}

function derivePresentFormIX(verb: NonFormIVerb): readonly MorphemeToken[] {
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

function derivePresentFormX(verb: NonFormIVerb): readonly MorphemeToken[] {
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

function presentPrefixVowel(verb: Verb): Token {
  if (verb.root.length === 4) return verb.form === 1 ? DAMMA : FATHA
  return [2, 3, 4].includes(verb.form) ? DAMMA : FATHA
}

function derivePresentStem(verb: Verb): readonly MorphemeToken[] {
  const letters = [...verb.root]

  if (letters.length < 3) throw new Error('Root must have at least 3 letters.')

  if (letters.length === 4) {
    switch (verb.form) {
      case 1:
        return derivePresentFormIq(verb)
      case 2:
        return derivePresentFormIIq(verb)
      case 3:
        return derivePresentFormIIIq(verb)
      case 4:
        return derivePresentFormIVq(verb)
      default:
        return []
    }
  }

  switch (verb.form) {
    case 1:
      return derivePresentFormI(verb)
    case 2:
      return derivePresentFormII(verb)
    case 3:
      return derivePresentFormIII(verb)
    case 4:
      return derivePresentFormIV(verb)
    case 5:
      return derivePresentFormV(verb)
    case 6:
      return derivePresentFormVI(verb)
    case 7:
      return derivePresentFormVII(verb)
    case 8:
      return derivePresentFormVIII(verb)
    case 9:
      return derivePresentFormIX(verb)
    case 10:
      return derivePresentFormX(verb)
  }
}

function toCompatibilityWords(words: Record<PronounId, string>): Record<PronounId, Word> {
  return mapRecord(words, (word) => new Word([measureMorpheme(...tokenize(word))]))
}

function shortenHollowStem(word: readonly Token[]): readonly Token[] {
  const hollowLetterIndex = word.findIndex((char, i) => i > 0 && char.isWeak)
  const nextLetterIndex = word.findIndex((char, i) => i > hollowLetterIndex && !char.isCombiningMark)
  return [...word.slice(0, hollowLetterIndex), ...word.slice(nextLetterIndex)]
}

function shortenHollowStemMorphemes(stem: readonly MorphemeToken[]): readonly MorphemeToken[] {
  for (let i = 1; i < stem.length; i++) {
    const weakIdx = stem[i].tokens.findIndex((t) => t.isWeak)
    if (weakIdx >= 0) {
      const shortened = stem[i].tokens.filter((_, j) => j !== weakIdx)
      return [...stem.slice(0, i), measureMorpheme(...shortened), ...stem.slice(i + 1)]
    }
  }
  return stem
}

function expandGeminationMorphemes(stem: readonly MorphemeToken[], vowel: Token): readonly MorphemeToken[] {
  for (let i = 1; i < stem.length - 1; i++) {
    if (SUKOON.equals(stem[i].tokens[0]) && stem[i - 1].tokens[0].equals(stem[i + 1].tokens[0])) {
      return [...stem.slice(0, i), measureMorpheme(vowel), ...stem.slice(i + 1)]
    }
  }
  return stem
}

function dropFinalDiacritic(word: readonly Token[]): readonly Token[] {
  const lastIndex = word.findLastIndex((char) => !char.isCombiningMark)
  const base = word.slice(0, lastIndex + 1)
  return word.slice(lastIndex + 1).some((t) => t.equals(SHADDA)) ? [...base, SHADDA] : base
}
