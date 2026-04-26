import { mapRecord } from '../../primitives/objects'
import { formIPresentVowel, isFormIPastVowel, isFormIPresentVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_MAQSURA,
  DAL,
  DAMMA,
  FATHA,
  finalize,
  HAMZA,
  HAMZA_ON_YEH,
  isDiacritic,
  isWeakLetter,
  KASRA,
  LAM,
  longVowel,
  NOON,
  RootLetter,
  resolveFormVIIIInfixConsonant,
  SEEN,
  SHADDA,
  SUKOON,
  TEH,
  type Token,
  tokenize,
  type Vowel,
  WAW,
  YEH,
  ZAY,
} from '../letters'
import { isDual, isFemininePlural, isMasculinePlural, type PronounId } from '../pronouns'
import type { Mood } from '../tense'
import type { FormIVerb, NonFormIVerb, Verb } from '../verbs'

function isFormIDefectiveVowel(verb: Verb, vowel: Vowel): boolean {
  return verb.form === 1 && isWeakLetter(verb.root.at(-1)) && isFormIPresentVowel(verb, vowel)
}

function buildFeminineSingular(stem: readonly Token[], verb: Verb): readonly Token[] {
  if (verb.root.length > 3) return [...dropFinalDiacritic(stem), KASRA, YEH, SUKOON, NOON, FATHA]

  const [, c2, c3] = verb.rootTokens
  const suffix = [YEH, SUKOON, NOON, FATHA]

  if (isFormIDefectiveVowel(verb, FATHA)) return [...stem.slice(0, -2), FATHA, ...suffix]

  if (verb.form === 7 && c2.isWeak && c3.isWeak) return [...stem.slice(0, -2), FATHA, ...suffix]

  if ([5, 6].includes(verb.form) && c3.isWeak) return [...stem.slice(0, -2), FATHA, ...suffix]

  if (c3.isWeak) return [...dropFinalDiacritic(stem.slice(0, -2)), KASRA, ...suffix]

  if (c3.isHamza) return [...stem.slice(0, -2), HAMZA_ON_YEH, KASRA, ...suffix]

  return [...stem.slice(0, -1), KASRA, ...suffix]
}

function buildMasculinePlural(stem: readonly Token[], verb: Verb): readonly Token[] {
  const suffix = [WAW, SUKOON, NOON, FATHA]

  if (verb.root.length > 3) return [...stem, ...suffix]

  const [c1, c2, c3] = verb.rootTokens
  const prefix = stem.slice(0, -2)

  if (isFormIDefectiveVowel(verb, FATHA) && c2.isHamza) return [YEH, FATHA, c1, FATHA, ...suffix]

  if (isFormIDefectiveVowel(verb, FATHA)) return [YEH, FATHA, c1, SUKOON, c2, FATHA, ...suffix]

  if (c2.isWeak && c3.isHamza && prefix.at(-1) === WAW) return [...prefix, HAMZA, DAMMA, ...suffix]

  if (c3.isWeak) {
    if (c2.isWeak) return [...prefix, DAMMA, ...suffix]

    switch (verb.form) {
      case 2:
      case 3:
      case 8:
        return [...prefix, DAMMA, ...suffix]

      case 5:
      case 6:
        return [...prefix, FATHA, ...suffix]

      case 7:
        return [...stem, ...suffix]
    }

    if (c2.isHamza) return [...prefix, DAMMA, ...suffix]

    if (c1.isWeak) return [...dropFinalDiacritic(prefix), ...suffix]

    return [...stem.slice(0, -2), DAMMA, ...suffix]
  }

  return [...stem, ...suffix]
}

function buildFemininePlural(stem: readonly Token[], verb: Verb): readonly Token[] {
  const suffix = [SUKOON, NOON, FATHA]

  if (verb.root.length > 3) {
    const [, , c3, c4] = verb.rootTokens
    return verb.form === 4
      ? [...stem.slice(0, 6), c3, SUKOON, c4, KASRA, c4, ...suffix]
      : [...dropFinalDiacritic(stem), ...suffix]
  }

  const [c1, c2, c3] = verb.rootTokens

  if (c2.equals(c3)) {
    switch (verb.form) {
      case 1:
        return [YEH, FATHA, c1, SUKOON, c2, formIPresentVowel(verb), c3, ...suffix]

      case 3:
        return [YEH, DAMMA, c1, FATHA, ALIF, c2, KASRA, c2, ...suffix]

      case 4:
        return [YEH, DAMMA, c1, SUKOON, c2, KASRA, c3, ...suffix]

      case 7:
        return [YEH, FATHA, NOON, SUKOON, c1, FATHA, c2, ...suffix]

      case 8:
        return [YEH, FATHA, c1, SUKOON, resolveFormVIIIInfixConsonant(c1.letter), FATHA, c2, KASRA, c3, ...suffix]

      case 10:
        return [YEH, FATHA, SEEN, SUKOON, TEH, FATHA, c1, SUKOON, c2, KASRA, c3, ...suffix]
    }
  }

  if (isFormIDefectiveVowel(verb, FATHA))
    return c2.isHamza ? [YEH, FATHA, c1, FATHA, YEH, ...suffix] : [YEH, FATHA, c1, SUKOON, c2, FATHA, YEH, ...suffix]

  if ([2, 3, 4, 5, 6, 7, 8, 9].includes(verb.form) && c3.isWeak) return [...stem.slice(0, -1), YEH, ...suffix]

  if (verb.form === 6) return [...dropFinalDiacritic(c3.isHamza ? stem : expandGemination(stem, FATHA)), ...suffix]

  if (verb.form === 9) return [...dropFinalDiacritic(expandGemination(stem, KASRA)), ...suffix]

  if (c2.isWeak) {
    if (verb.form !== 5 && c3.isHamza) return [...shortenHollowStem(stem).slice(0, -2), ...tokenize(HAMZA), ...suffix]

    if (verb.form === 1 && (stem.includes(ALIF) || !isFormIPastVowel(verb, KASRA)) && !c3.isWeak)
      return [...dropFinalDiacritic(shortenHollowStem(stem)), ...suffix]

    if ([7, 10].includes(verb.form)) return [...dropFinalDiacritic(shortenHollowStem(stem)), ...suffix]

    if (verb.form === 8 && c2.is(YEH)) return [...dropFinalDiacritic(shortenHollowStem(stem)), ...suffix]
  }

  return [...dropFinalDiacritic(stem), ...suffix]
}

function buildDualPresent(stem: readonly Token[], verb: Verb): readonly Token[] {
  if (verb.root.length > 3) return [...dropFinalDiacritic(stem), FATHA, ALIF, NOON, KASRA]

  const [c1, c2, c3] = verb.rootTokens
  const suffix = [FATHA, ALIF, NOON, KASRA]

  if (c3.isHamza) {
    if (verb.form === 4) return [...stem.slice(0, -2), HAMZA_ON_YEH, ...suffix]
    if (verb.form === 5) return [...stem.slice(0, -2), ALIF_HAMZA, ...suffix]
    if ((verb.form === 10 && c2.isWeak) || c2.is(YEH)) return [...stem.slice(0, -2), HAMZA_ON_YEH, ...suffix]
    if (c2.isWeak) return [...stem.slice(0, -2), HAMZA, ...suffix]
  }

  if (c3.isWeak) {
    if (c2.isHamza) return [...stem.slice(0, -1), YEH, ...suffix]

    if (isFormIDefectiveVowel(verb, FATHA)) return [...stem.slice(0, -2), FATHA, YEH, ...suffix]

    if ([2, 3, 5, 6].includes(verb.form)) return [...stem.slice(0, -1), YEH, ...suffix]

    if (verb.form === 8) return [...stem, ...suffix]

    if (c1.isWeak) return [...dropFinalDiacritic(stem.slice(0, -2)), ...suffix]

    return [...stem, ...suffix]
  }

  return [...dropFinalDiacritic(stem), ...suffix]
}

function conjugateIndicative(verb: Verb): Record<PronounId, string> {
  const stem = derivePresentForms(verb)
  const feminineSingularStem = buildFeminineSingular(stem, verb)
  const dualStem = buildDualPresent(stem, verb)
  const masculinePluralStem = buildMasculinePlural(stem, verb)
  const femininePluralStem = buildFemininePlural(stem, verb)

  return mapRecord(
    {
      '1s': applyPresentPrefix(ALIF_HAMZA, stem),
      '2ms': applyPresentPrefix(TEH, stem),
      '2fs': applyPresentPrefix(TEH, feminineSingularStem),
      '3ms': stem,
      '3fs': applyPresentPrefix(TEH, stem),
      '2d': applyPresentPrefix(TEH, dualStem),
      '3md': dualStem,
      '3fd': applyPresentPrefix(TEH, dualStem),
      '1p': applyPresentPrefix(NOON, stem),
      '2mp': applyPresentPrefix(TEH, masculinePluralStem),
      '2fp': applyPresentPrefix(TEH, femininePluralStem),
      '3mp': masculinePluralStem,
      '3fp': femininePluralStem,
    },
    finalize,
  )
}

function dropNoonEnding(word: readonly Token[]): readonly Token[] {
  return word.slice(0, word.lastIndexOf(NOON))
}

function conjugateSubjunctive(verb: Verb): Record<PronounId, string> {
  const [, , c3] = verb.rootTokens

  return mapRecord(
    mapRecord(conjugateIndicative(verb), (indicative, pronounId) => {
      const word = Array.from(indicative)

      if (isDual(pronounId)) return dropNoonEnding(word)

      if (c3.isWeak && verb.form === 1 && isFormIPresentVowel(verb, FATHA)) {
        if (pronounId === '2fs') return [...dropNoonEnding(word).slice(0, -1), SUKOON]
        if (isMasculinePlural(pronounId)) return [...dropNoonEnding(word).slice(0, -1), SUKOON, ALIF]
        return word
      }

      if (c3.isWeak && verb.form === 6) {
        if (pronounId === '2fs') return [...dropNoonEnding(word).slice(0, -1), SUKOON]
        if (isMasculinePlural(pronounId)) return [...dropNoonEnding(word).slice(0, -1), SUKOON, ALIF]
        return word
      }

      if (pronounId === '2fs' && verb.form === 7)
        return [...dropFinalDiacritic(dropNoonEnding(word).slice(0, -2)).filter((char) => char !== SHADDA), KASRA, YEH]

      if (pronounId === '2fs') return dropNoonEnding(word).slice(0, -1)

      if (isMasculinePlural(pronounId)) return [...dropNoonEnding(word).slice(0, -1), SUKOON, ALIF]

      if (c3.is(YEH) && verb.form === 5) return word

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
      mapRecord(conjugateIndicative(verb), (indicative, pronounId) => {
        const word = Array.from(indicative)

        const [, , c3, c4] = letters
        if (isDual(pronounId)) return dropNoonEnding(word)
        if (pronounId === '2fs') return dropNoonEnding(word).slice(0, -1)
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
    mapRecord(conjugateIndicative(verb), (indicative, pronounId) => {
      const word = Array.from(indicative)

      if (isFormIDefectiveVowel(verb, FATHA)) {
        if (pronounId === '2fs') return [...dropNoonEnding(word).slice(0, -1), SUKOON]
        if (isMasculinePlural(pronounId)) return [...dropNoonEnding(word).slice(0, -1), SUKOON, ALIF]
      }

      if (verb.form === 5 && c3.isWeak) {
        if (pronounId === '2fs') return [...dropNoonEnding(word).slice(0, -1), SUKOON]
        if (isMasculinePlural(pronounId)) return [...dropNoonEnding(word).slice(0, -1), SUKOON, ALIF]
        if (isDual(pronounId)) return dropNoonEnding(word)
      }

      if (isDual(pronounId)) {
        const base = dropNoonEnding(word)

        if (c2.isHamza || c2.isWeak || c3.isHamza) return base

        if (base.at(-3) === WAW) return [...base.slice(0, -3), WAW, SUKOON, ALIF]

        if ([1, 4].includes(verb.form)) return base

        if (base.at(-3) === YEH) return [...base.slice(0, -3), ALIF]

        return base
      }

      if (pronounId === '2fs' && verb.form === 7 && c2.equals(c3))
        return dropNoonEnding(word)
          .slice(0, -1)
          .filter((char) => char !== SHADDA)

      if (pronounId === '2fs') {
        if (verb.form === 7) return [...dropNoonEnding(word).slice(0, -3), KASRA, YEH]
        return dropNoonEnding(word).slice(0, -1)
      }

      if (isMasculinePlural(pronounId) && verb.form === 4 && c2.isHamza && c3.isWeak)
        return [...dropNoonEnding(word).slice(0, -1), ALIF]

      if (isMasculinePlural(pronounId))
        return [...dropFinalDiacritic(dropNoonEnding(word).slice(0, -2)), DAMMA, WAW, SUKOON, ALIF]

      if (isFemininePlural(pronounId)) {
        if (c3.is(NOON)) return [...word.slice(0, -2), SUKOON, NOON, FATHA]
        return [...word.slice(0, -1), FATHA]
      }

      if (verb.form !== 5 && c2.isWeak && c3.isHamza)
        return [...shortenHollowStem(word).slice(0, -2), ...tokenize(HAMZA), SUKOON]

      if (c3.isWeak) return dropFinalDiacritic(word).slice(0, -1)

      if (c2.equals(c3) && [1, 3, 4, 7, 8, 9, 10].includes(verb.form)) return [...dropFinalDiacritic(word), FATHA]

      if (verb.form === 9) return [...dropFinalDiacritic(word), FATHA]

      if (c2.isWeak) {
        if (verb.form === 1 && (word.includes(ALIF) || !isFormIPastVowel(verb, KASRA)))
          return [...shortenHollowStem(word).slice(0, -1), SUKOON]

        if ([4, 7, 10].includes(verb.form)) return [...shortenHollowStem(word).slice(0, -1), SUKOON]

        if (verb.form === 8 && (c2.is(YEH) || resolveFormVIIIInfixConsonant(c1.letter) !== DAL))
          return [...shortenHollowStem(word).slice(0, -1), SUKOON]
      }

      return [...dropFinalDiacritic(word), SUKOON]
    }),
    finalize,
  )
}

function deriveZalaStem(): readonly Token[] {
  return [YEH, FATHA, ZAY, FATHA, ALIF, LAM, DAMMA]
}

export function conjugatePresentMood(verb: Verb, mood: Mood): Record<PronounId, string> {
  if (mood === 'subjunctive') return conjugateSubjunctive(verb)
  if (mood === 'jussive') return conjugateJussive(verb)
  return conjugateIndicative(verb)
}

function derivePresentFormIq(verb: Verb): readonly Token[] {
  const [c1, c2, c3, c4] = verb.rootTokens

  return [YEH, DAMMA, c1, FATHA, c2, SUKOON, c3, KASRA, c4, DAMMA]
}

function derivePresentFormIIq(verb: Verb): readonly Token[] {
  const [c1, c2, c3, c4] = verb.rootTokens

  return [YEH, FATHA, TEH, FATHA, c1, FATHA, c2, SUKOON, c3, FATHA, c4, DAMMA]
}

function derivePresentFormIIIq(verb: Verb): readonly Token[] {
  const [c1, c2, c3, c4] = verb.rootTokens

  return [YEH, FATHA, c1, SUKOON, c2, FATHA, NOON, SUKOON, c3, KASRA, c4, DAMMA]
}

function derivePresentFormIVq(verb: Verb): readonly Token[] {
  const [c1, c2, c3, c4] = verb.rootTokens

  return [YEH, FATHA, c1, SUKOON, c2, FATHA, c3, KASRA, c4, SUKOON, c4, DAMMA]
}

function derivePresentFormI(verb: FormIVerb): readonly Token[] {
  const [c1, c2, c3] = verb.rootTokens
  const presentVowel = formIPresentVowel(verb)
  const prefix = [YEH, FATHA]

  if (c2.equals(c3)) return [...prefix, c1, presentVowel, c2, SUKOON, c2, DAMMA]

  if (c3.isWeak) {
    if (c1.is(WAW)) return [...prefix, c2, presentVowel, c3]

    if (c3.is(WAW)) return [...prefix, c1, SUKOON, c2, DAMMA, WAW]

    if (c2.isHamza) return [...prefix, c1, FATHA, ALIF_MAQSURA]

    if (presentVowel === FATHA) return [...prefix, c1, SUKOON, c2, FATHA, ALIF_MAQSURA]

    return [...prefix, c1, SUKOON, c2, ...longVowel(presentVowel)]
  }

  if (c1.is(WAW)) return [...prefix, c2, presentVowel, c3, DAMMA]

  // FIXME: isFormIPastVowel check doesn't make sense here
  if (!isFormIPastVowel(verb, KASRA) && c2.isWeak)
    return [...prefix, c1, ...longVowel(c2.is(YEH) ? KASRA : presentVowel), c3, DAMMA]

  return [...prefix, c1, SUKOON, c2, presentVowel, c3, DAMMA]
}

function derivePresentFormII(verb: NonFormIVerb): readonly Token[] {
  const [c1, c2, c3] = verb.rootTokens

  if (c3.isWeak) return [YEH, DAMMA, c1, FATHA, c2, SUKOON, c2, KASRA, c3]

  return [YEH, DAMMA, c1, FATHA, c2, SUKOON, c2, KASRA, c3, DAMMA]
}

function derivePresentFormIII(verb: NonFormIVerb): readonly Token[] {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [YEH, DAMMA, c1, FATHA, ALIF, c2]

  if (c2.equals(c3)) return [...prefix, SUKOON, c3, DAMMA]

  if (c3.isWeak) return [...prefix, KASRA, c3]

  return [...prefix, KASRA, c3, DAMMA]
}

function derivePresentFormIV(verb: NonFormIVerb): readonly Token[] {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [YEH, DAMMA, c1]

  if (c2.isHamza) return [...prefix, KASRA, c3]

  if (c3.isWeak) return [...prefix, SUKOON, c2, KASRA, YEH]

  if (c2.isWeak) return [...prefix, KASRA, YEH, c3, DAMMA]

  if (c2.equals(c3)) return [...prefix, KASRA, c2, SUKOON, c3, DAMMA]

  return [...prefix, SUKOON, c2, KASRA, c3, DAMMA]
}

function derivePresentFormV(verb: NonFormIVerb): readonly Token[] {
  const [c1, c2, c3] = verb.rootTokens

  if (c3.is(YEH)) return [YEH, FATHA, TEH, FATHA, c1, FATHA, c2, SUKOON, c2, FATHA, ALIF_MAQSURA]

  return [YEH, FATHA, TEH, FATHA, c1, FATHA, c2, SUKOON, c2, FATHA, c3, DAMMA]
}

function derivePresentFormVI(verb: NonFormIVerb): readonly Token[] {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [YEH, FATHA, TEH, FATHA, c1, FATHA, ALIF]

  if (c3.isWeak) return [...prefix, c2, FATHA, ALIF_MAQSURA]

  if (c2.equals(c3)) return [...prefix, c2, SUKOON, c2, DAMMA]

  return [...prefix, c2, FATHA, c3, DAMMA]
}

function derivePresentFormVII(verb: NonFormIVerb): readonly Token[] {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [YEH, FATHA, NOON, SUKOON, c1, FATHA]

  if (c2.equals(c3)) return [...prefix, c2, SHADDA, DAMMA]

  if (c3.isWeak) return [...prefix, c2, KASRA, c3]

  if (c2.isWeak) return [...prefix, ALIF, c3, DAMMA]

  return [...prefix, c2, KASRA, c3, DAMMA]
}

function derivePresentFormVIII(verb: NonFormIVerb): readonly Token[] {
  const [c1, c2, c3] = verb.rootTokens
  const assimilatedC1 = c1.isHamza || c1.isWeak ? TEH : c1
  const infix = resolveFormVIIIInfixConsonant(c1.letter)
  const seatedC2 = c2
  const seatedC3 = c3

  if (c2.equals(c3)) return [YEH, FATHA, c1, SUKOON, infix, FATHA, c2, SUKOON, c3, DAMMA]

  if (c3.isWeak) return [YEH, FATHA, assimilatedC1, SUKOON, infix, FATHA, seatedC2, KASRA, YEH]

  if (c2.is(YEH) || (c2.isWeak && infix !== DAL)) return [YEH, FATHA, c1, SUKOON, infix, FATHA, ALIF, c3, DAMMA]

  return [YEH, FATHA, assimilatedC1, SUKOON, infix, FATHA, seatedC2, KASRA, seatedC3, DAMMA]
}

function derivePresentFormIX(verb: NonFormIVerb): readonly Token[] {
  const [c1, c2, c3] = verb.rootTokens

  return [YEH, FATHA, c1, SUKOON, c2, FATHA, c3, SUKOON, c3, DAMMA]
}

function derivePresentFormX(verb: NonFormIVerb): readonly Token[] {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [YEH, FATHA, SEEN, SUKOON, TEH, FATHA, c1]

  if (c2.isWeak && c3.isWeak) return [...prefix, SUKOON, c2, KASRA, c3]

  if (c2.equals(c3)) return [...prefix, KASRA, c2, SUKOON, c3, DAMMA]

  if (c2.isWeak) return [...prefix, KASRA, YEH, c3, DAMMA]

  if (!c1.isWeak && c3.isWeak) return [...prefix, SUKOON, c2, KASRA, YEH]

  return [...prefix, SUKOON, c2, KASRA, c3, DAMMA]
}

function derivePresentForms(verb: Verb): readonly Token[] {
  const letters = [...verb.root]

  if (letters.length < 3) throw new Error('Root must have at least 3 letters.')

  if (verb.root === 'زيل' && verb.form === 1) return deriveZalaStem()

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

function shortenHollowStem(word: readonly Token[]): readonly Token[] {
  // The hollow stem cannot be a long vowel if the next letter carries a sukoon.
  const hollowLetterIndex = word.findIndex((char, i) => i > 0 && isWeakLetter(char as string))
  const nextLetterIndex = word.findIndex((char, i) => i > hollowLetterIndex && !isDiacritic(char))
  return [...word.slice(0, hollowLetterIndex), ...word.slice(nextLetterIndex)]
}

function expandGemination(word: readonly Token[], vowel: Vowel): readonly Token[] {
  return Array.from(
    word
      .map((t) => (t instanceof RootLetter ? t.letter : t))
      .join('')
      .replace(new RegExp(`([^\\p{Mn}])${SUKOON}\\1`), `$1${vowel}$1`),
  )
}

function applyPresentPrefix(prefix: string, chars: readonly Token[]): readonly Token[] {
  return [prefix, ...chars.slice(1)]
}

function dropFinalDiacritic(word: readonly Token[]): readonly Token[] {
  const lastIndex = word.findLastIndex((char) => !isDiacritic(char))
  const base = word.slice(0, lastIndex + 1)
  return word.slice(lastIndex + 1).includes(SHADDA) ? [...base, SHADDA] : base
}
