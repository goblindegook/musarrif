import { mapRecord } from '../../primitives/objects'
import { hasPattern, isFormIPresentVowel, resolveFormIPresentVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_MAQSURA,
  DAMMA,
  FATHA,
  findLastLetterIndex,
  findLetterIndex,
  findWeakLetterIndex,
  geminateDoubleLetters,
  HAMZA,
  HAMZA_ON_WAW,
  HAMZA_ON_YEH,
  isDiacritic,
  isHamzatedLetter,
  isWeakLetter,
  KASRA,
  last,
  longVowelFromPattern,
  NOON,
  normalizeAlifMadda,
  removeFinalDiacritic,
  SEEN,
  SHADDA,
  SUKOON,
  seatHamza,
  shortVowelFromPattern,
  TEH,
  type Vowel,
  WAW,
  YEH,
} from '../letters'
import { isDual, isFemininePlural, isMasculinePlural, type PronounId } from '../pronouns'
import type { Verb } from '../verbs'

export type Mood = 'indicative' | 'subjunctive' | 'jussive'

function defectiveGlide(letter: string): string {
  return letter === YEH ? YEH : WAW
}

function isFormIFinalWeakPresent(verb: Verb, vowel: 'a' | 'i' | 'u'): boolean {
  return verb.form === 1 && isWeakLetter(verb.root[2]) && isFormIPresentVowel(verb, vowel)
}

function replaceVowelAfterGemination(word: readonly string[], vowel: Vowel): readonly string[] {
  return Array.from(
    word.join('').replace(new RegExp(`(.)${SUKOON}\\1(?!\\1${SUKOON}\\1).*`, 'u'), `$1${SUKOON}$1${vowel}`),
  )
}

function buildFeminineSingular(stem: readonly string[], verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const suffix = [SUKOON, NOON, FATHA]

  if (isFormIFinalWeakPresent(verb, 'a'))
    return isHamzatedLetter(c2)
      ? [YEH, FATHA, c1, FATHA, YEH, ...suffix]
      : [YEH, FATHA, c1, SUKOON, c2, FATHA, YEH, ...suffix]

  if (isFormIFinalWeakPresent(verb, 'u')) return [...dropTerminalWeakOrHamza(stem), KASRA, YEH, ...suffix]

  if (verb.form === 2 && isWeakLetter(c3)) return [...stem, NOON, FATHA]

  if (verb.form === 5 && isWeakLetter(c3)) return [...stem.slice(0, -1), YEH, ...suffix]

  if (verb.form === 7 && isWeakLetter(c3)) return [...stem, ...suffix]

  if (verb.form === 7 && c2 === c3) return [...removeFinalDiacritic(stem), KASRA, YEH, NOON, FATHA]

  if (verb.form === 3 && c2 === c3) return [...removeFinalDiacritic(stem), KASRA, YEH, NOON, FATHA]

  if (verb.form === 3 && isWeakLetter(c3)) return [...stem, NOON, FATHA]

  if (verb.form === 6 && isWeakLetter(c3)) {
    const withoutFinalDiacritic = removeFinalDiacritic(stem)
    const lastLetterIndex = findLastLetterIndex(withoutFinalDiacritic)
    return [
      ...withoutFinalDiacritic.slice(0, lastLetterIndex),
      YEH,
      ...withoutFinalDiacritic.slice(lastLetterIndex + 1),
      ...suffix,
    ]
  }

  if ((!isWeakLetter(c1) || isHamzatedLetter(c2)) && isWeakLetter(c3)) return [...stem, NOON, FATHA]

  return [...removeFinalDiacritic(dropTerminalWeakOrHamza(stem, KASRA)), KASRA, YEH, ...suffix]
}

function buildMasculinePlural(stem: readonly string[], verb: Verb): readonly string[] {
  const [c1, c2, c3] = Array.from(verb.root)
  const suffix = [SUKOON, NOON, FATHA]

  if (isFormIFinalWeakPresent(verb, 'a'))
    return isHamzatedLetter(c2)
      ? [YEH, FATHA, c1, FATHA, WAW, ...suffix]
      : [YEH, FATHA, c1, SUKOON, c2, FATHA, WAW, ...suffix]

  if (isWeakLetter(c2) && isHamzatedLetter(c3)) {
    const lastIndex = findLastLetterIndex(stem)
    const hamzaStem = [
      ...stem.slice(0, lastIndex),
      verb.form === 5 ? HAMZA_ON_WAW : HAMZA_ON_YEH,
      ...stem.slice(lastIndex + 1),
    ]
    return [...removeFinalDiacritic(hamzaStem), DAMMA, WAW, NOON, FATHA]
  }

  if (isHamzatedLetter(c3)) return [...stem, WAW, NOON, FATHA]

  if (verb.form === 2 && isWeakLetter(c3)) return [...replaceVowelAfterGemination(stem, DAMMA), WAW, NOON, FATHA]

  if (verb.form === 3 && isWeakLetter(c3)) return [...dropTerminalWeakOrHamza(stem, DAMMA), DAMMA, WAW, NOON, FATHA]

  if (verb.form === 5 && c3 === YEH) return [...stem.slice(0, -1), WAW, ...suffix]

  if (verb.form === 7 && isWeakLetter(c3)) return [...stem, WAW, NOON, FATHA]

  if (verb.form === 7 && c2 === c3) return [...dropTerminalWeakOrHamza(stem, DAMMA), WAW, SUKOON, NOON, FATHA]

  if (isWeakLetter(c1) && isHamzatedLetter(c2) && isWeakLetter(c3)) {
    const hamzatedStem = stem.map((char) => (char === HAMZA_ON_YEH ? ALIF_HAMZA : char))
    return [...dropTerminalWeakOrHamza(hamzatedStem, DAMMA), DAMMA, WAW, NOON, FATHA]
  }

  if (verb.form === 6 && isWeakLetter(c3))
    return [...dropTerminalWeakOrHamza(stem, FATHA), FATHA, WAW, SUKOON, NOON, FATHA]

  // Defective verbs (not doubly weak): drop final weak letter, replace final diacritic with damma, add waw + noon + fatḥa
  if (isWeakLetter(c3) && !isWeakLetter(c1)) return [...dropTerminalWeakOrHamza(stem, DAMMA), DAMMA, WAW, NOON, FATHA]

  return [...dropTerminalWeakOrHamza(stem, DAMMA), WAW, NOON, FATHA]
}

function buildFemininePlural(stem: readonly string[], verb: Verb): readonly string[] {
  const [c1, c2, c3] = Array.from(verb.root)
  const suffix = [SUKOON, NOON, FATHA]

  if (isFormIFinalWeakPresent(verb, 'a'))
    return isHamzatedLetter(c2)
      ? [YEH, FATHA, c1, FATHA, YEH, ...suffix]
      : [YEH, FATHA, c1, SUKOON, c2, FATHA, YEH, ...suffix]

  if (c2 === c3) {
    switch (verb.form) {
      case 1:
        return [YEH, FATHA, c1, SUKOON, c2, shortVowelFromPattern(resolveFormIPresentVowel(verb)), c3, ...suffix]

      case 3:
        return [YEH, DAMMA, c1, FATHA, ALIF, c2, KASRA, c2, ...suffix]

      case 4:
        return [YEH, DAMMA, c1, SUKOON, c2, KASRA, c3, ...suffix]

      case 7:
        return [YEH, FATHA, NOON, SUKOON, c1, FATHA, c2, ...suffix]

      case 10:
        return [YEH, FATHA, SEEN, SUKOON, TEH, FATHA, c1, SUKOON, c2, KASRA, c3, ...suffix]
    }
  }

  if (verb.form === 5 && c3 === YEH) return [...stem.slice(0, -1), c3, ...suffix]

  if (verb.form === 6 && isWeakLetter(c3)) {
    const withoutFinalDiacritic = removeFinalDiacritic(stem)
    const lastLetterIndex = findLastLetterIndex(withoutFinalDiacritic)
    return [
      ...withoutFinalDiacritic.slice(0, lastLetterIndex),
      YEH,
      ...withoutFinalDiacritic.slice(lastLetterIndex + 1),
      ...suffix,
    ]
  }
  if ([6, 9].includes(verb.form)) return [...removeFinalDiacritic(expandGemination(stem)), ...suffix]

  if (isWeakLetter(c3)) return [...removeFinalDiacritic(stem), ...suffix]

  if (verb.form !== 5 && isWeakLetter(c2) && isHamzatedLetter(c3))
    return [...removeFinalDiacritic(dropTerminalWeakOrHamza(shortenHollowStem(stem))), ...suffix]

  if (verb.form === 1 && !hasPattern(verb, 'fa3ila-yaf3alu') && isWeakLetter(c2))
    return [...removeFinalDiacritic(shortenHollowStem(stem)), ...suffix]

  return [...removeFinalDiacritic(stem), ...suffix]
}

function buildDualPresent(word: readonly string[], verb: Verb): readonly string[] {
  const [c1, c2, c3] = verb.root
  const suffix = [ALIF, NOON, KASRA]

  if (isFormIFinalWeakPresent(verb, 'a') && isHamzatedLetter(c2)) return [YEH, FATHA, c1, FATHA, YEH, FATHA, ...suffix]

  if (isFormIFinalWeakPresent(verb, 'a')) return [YEH, FATHA, c1, SUKOON, c2, FATHA, YEH, FATHA, ...suffix]

  if (isWeakLetter(c2) && isHamzatedLetter(c3)) {
    const hamzaSeat = verb.form === 5 ? ALIF_HAMZA : verb.form === 4 || c2 === YEH ? HAMZA_ON_YEH : HAMZA
    return [...removeFinalDiacritic([...word.slice(0, -2), hamzaSeat, ...word.slice(-1)]), FATHA, ...suffix]
  }

  if (isHamzatedLetter(c3)) return normalizeAlifMadda([...removeFinalDiacritic(word), FATHA, ...suffix])

  if (isHamzatedLetter(c2) && isWeakLetter(c3)) return [...word, FATHA, ...suffix]

  if ([2, 3, 5, 6].includes(verb.form) && isWeakLetter(c3)) return [...word.slice(0, -1), YEH, FATHA, ...suffix]

  if (!isWeakLetter(c1) && isWeakLetter(c3)) return [...word, FATHA, ...suffix]

  return [...removeFinalDiacritic(dropTerminalWeakOrHamza(word, FATHA)), FATHA, ...suffix]
}

function conjugateIndicative(verb: Verb): Record<PronounId, string> {
  const stem = derivePresentForms(verb)
  return mapRecord(
    {
      '1s': applyPresentPrefix(ALIF_HAMZA, stem),
      '2ms': applyPresentPrefix(TEH, stem),
      '2fs': applyPresentPrefix(TEH, buildFeminineSingular(stem, verb)),
      '3ms': stem,
      '3fs': applyPresentPrefix(TEH, stem),
      '2d': applyPresentPrefix(TEH, buildDualPresent(stem, verb)),
      '3md': buildDualPresent(stem, verb),
      '3fd': applyPresentPrefix(TEH, buildDualPresent(stem, verb)),
      '1p': applyPresentPrefix(NOON, stem),
      '2mp': applyPresentPrefix(TEH, buildMasculinePlural(stem, verb)),
      '2fp': applyPresentPrefix(TEH, buildFemininePlural(stem, verb)),
      '3mp': buildMasculinePlural(stem, verb),
      '3fp': buildFemininePlural(stem, verb),
    },
    (result) => geminateDoubleLetters(normalizeAlifMadda(result)).join('').normalize('NFC'),
  )
}

function dropNoonEnding(word: readonly string[]): readonly string[] {
  const chars = [...word]
  while (last(chars) === NOON || isDiacritic(last(chars))) chars.pop()
  return chars
}

function replaceDammaBeforeFinalWaw(word: readonly string[]): readonly string[] {
  if (last(word) !== WAW) return word
  return [...removeFinalDiacritic(word.slice(0, -1)), DAMMA, WAW, SUKOON, ALIF]
}

function replaceFathaBeforeFinalWawAlif(word: readonly string[]): readonly string[] {
  return [...removeFinalDiacritic(word.slice(0, word.length - 1)), FATHA, WAW, SUKOON, ALIF]
}

function dropWeakLetterBeforeLastAlif(word: readonly string[]): readonly string[] {
  const prevBaseIdx = findLastLetterIndex(word, word.lastIndexOf(ALIF))
  if (isWeakLetter(word.at(prevBaseIdx))) return [...word.slice(0, prevBaseIdx), ALIF]
  return word
}

function conjugateSubjunctive(verb: Verb): Record<PronounId, string> {
  const [, c2, c3] = Array.from(verb.root)
  const isFinalWeak = isWeakLetter(c3)

  return mapRecord(
    mapRecord(conjugateIndicative(verb), (indicative, pronounId) => {
      const word = Array.from(indicative)

      if (isDual(pronounId)) return dropNoonEnding(word)

      if (isFinalWeak && verb.form === 1 && isFormIPresentVowel(verb, 'a')) {
        if (pronounId === '2fs') return [...removeFinalDiacritic(dropNoonEnding(word)), SUKOON]
        if (isMasculinePlural(pronounId)) return replaceFathaBeforeFinalWawAlif(dropNoonEnding(word))
        return word
      }

      if (isFinalWeak && verb.form === 6) {
        if (pronounId === '2fs') return [...dropNoonEnding(word), SUKOON]
        if (isMasculinePlural(pronounId)) return [...dropNoonEnding(word), SUKOON, ALIF]
        return word
      }

      if (pronounId === '2fs' && verb.form === 7 && c2 === c3)
        return removeFinalDiacritic(dropNoonEnding(word).filter((char) => char !== SHADDA))

      if (pronounId === '2fs') return dropNoonEnding(word)

      if (isMasculinePlural(pronounId)) return [...dropNoonEnding(word), SUKOON, ALIF]

      if (c3 === YEH && verb.form === 5) return word

      return [...removeFinalDiacritic(word), FATHA]
    }),
    (letters) => normalizeAlifMadda(letters).join('').normalize('NFC'),
  )
}

function conjugateJussive(verb: Verb): Record<PronounId, string> {
  const letters = Array.from(verb.root)
  const [, c2, c3] = letters
  const lastRoot = last(letters)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(lastRoot)
  const isFinalHamza = isHamzatedLetter(lastRoot)
  const isGeminate = c2 === c3

  return mapRecord(
    mapRecord(conjugateIndicative(verb), (indicative, pronounId) => {
      const word = Array.from(indicative)

      if (verb.form === 5 && isFinalWeak) {
        if (pronounId === '2fs') return [...dropNoonEnding(word), SUKOON]
        if (isDual(pronounId)) return dropNoonEnding(word)
        if (isMasculinePlural(pronounId)) return [...dropNoonEnding(word), SUKOON, ALIF]
        if (isFemininePlural(pronounId)) return [...dropNoonEnding(word), SUKOON, NOON, FATHA]
      }

      if (isFormIFinalWeakPresent(verb, 'a')) {
        if (pronounId === '2fs') return [...dropNoonEnding(word), SUKOON]
        if (isMasculinePlural(pronounId)) return replaceFathaBeforeFinalWawAlif(dropNoonEnding(word))
        if (isFemininePlural(pronounId)) return word
      }

      if (isDual(pronounId)) {
        if (isMiddleWeak) return dropNoonEnding(word)

        if (isFinalHamza) return dropNoonEnding(word)

        if (verb.form === 1 && isFinalWeak) {
          const base = dropNoonEnding(word)
          if (base.at(-3) === WAW) return [...base.slice(0, -2), SUKOON, ALIF]
          return base
        }
        if (verb.form === 4 && isFinalWeak) return dropNoonEnding(word)

        return dropWeakLetterBeforeLastAlif(dropNoonEnding(word))
      }

      if (verb.form === 7 && isGeminate && pronounId === '2fs')
        return removeFinalDiacritic(dropNoonEnding(word).filter((char) => char !== SHADDA))

      if (pronounId === '2fs') return replaceDammaBeforeFinalWaw(dropNoonEnding(word))

      if (isMasculinePlural(pronounId))
        return verb.form === 5 && isFinalHamza
          ? [...dropNoonEnding(word), ALIF]
          : replaceDammaBeforeFinalWaw(dropNoonEnding(word))

      if (isFinalHamza && isFemininePlural(pronounId)) return word

      if (verb.form !== 5 && isMiddleWeak && isFinalHamza)
        return [...removeFinalDiacritic(dropTerminalWeakOrHamza(shortenHollowStem(word))), SUKOON]

      if (isFinalWeak) return dropFinalDefectiveGlide(word)

      if ([1, 3, 4, 7, 10].includes(verb.form) && isGeminate) return [...removeFinalDiacritic(word), FATHA]

      if (verb.form === 9) return [...removeFinalDiacritic(word), FATHA]

      if (isFemininePlural(pronounId)) return [...removeFinalDiacritic(word), FATHA]

      if ([1, 4, 7, 8, 10].includes(verb.form) && isMiddleWeak && !hasPattern(verb, 'fa3ila-yaf3alu'))
        return [...removeFinalDiacritic(shortenHollowStem(word)), SUKOON]

      return [...removeFinalDiacritic(word), SUKOON]
    }),
    (letters) => geminateDoubleLetters(letters).join('').normalize('NFC'),
  )
}

export function conjugatePresentMood(verb: Verb, mood: Mood): Record<PronounId, string> {
  if (mood === 'subjunctive') return conjugateSubjunctive(verb)
  if (mood === 'jussive') return conjugateJussive(verb)
  return conjugateIndicative(verb)
}

function deriveQuadriliteralPresentForms(verb: Verb): readonly string[] {
  const [c1, c2, c3, c4] = [...verb.root]

  return [YEH, DAMMA, c1, FATHA, c2, SUKOON, c3, KASRA, c4, DAMMA]
}

function derivePresentFormI(verb: Verb<1>): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isInitialHamza = isHamzatedLetter(c1)
  const isMiddleHamza = isHamzatedLetter(c2)
  const isInitialWeak = isWeakLetter(c1)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const patternVowel = resolveFormIPresentVowel(verb)
  const shortVowel = shortVowelFromPattern(patternVowel)
  const seatedC1 = seatHamza(c1, shortVowel)
  const seatedC2 = seatHamza(c2, c1 === YEH ? KASRA : shortVowel)
  const seatedC3 = seatHamza(c3, shortVowel)
  const prefix = [YEH, FATHA]

  if (c2 === c3) return [...prefix, seatedC1, shortVowel, c2, SUKOON, c2, DAMMA]

  if (isInitialWeak && isFinalWeak) return [...prefix, seatedC2, shortVowel, defectiveGlide(c3)]

  if (isMiddleWeak && isFinalWeak)
    return [...prefix, c1, SUKOON, c2, shortVowel, patternVowel === 'a' ? ALIF_MAQSURA : defectiveGlide(c3)]

  if (c1 === YEH) return [...prefix, seatedC1, SUKOON, seatedC2, shortVowel, seatedC3, DAMMA]

  if (isInitialWeak) return [...prefix, seatedC2, shortVowel, seatedC3, DAMMA]

  if (isInitialHamza && isFinalWeak)
    return [
      ...prefix,
      ALIF_HAMZA,
      SUKOON,
      seatedC2,
      shortVowel,
      patternVowel === 'a' ? ALIF_MAQSURA : defectiveGlide(c3),
    ]

  if (isInitialHamza && isMiddleWeak) return [...prefix, seatedC1, ...longVowelFromPattern(patternVowel), c3, DAMMA]

  if (isInitialHamza) return [...prefix, c1, SUKOON, seatedC2, shortVowel, seatedC3, DAMMA]

  if (!hasPattern(verb, 'fa3ila-yaf3alu') && isMiddleWeak)
    return [...prefix, c1, ...longVowelFromPattern(c2 === YEH ? 'i' : patternVowel), c3, DAMMA]

  if (isMiddleHamza && isFinalWeak) return [...prefix, c1, FATHA, ALIF_MAQSURA]

  if (isFinalWeak)
    return [
      ...prefix,
      seatedC1,
      SUKOON,
      seatedC2,
      c3 === WAW ? DAMMA : shortVowel,
      c3 === WAW || patternVowel !== 'a' ? defectiveGlide(c3) : ALIF_MAQSURA,
    ]

  return [...prefix, seatedC1, SUKOON, seatedC2, shortVowel, seatedC3, DAMMA]
}

function derivePresentFormII(verb: Verb<2>): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const seatedC1 = c1 === ALIF_HAMZA ? HAMZA_ON_WAW : c1
  const seatedC3 = isHamzatedLetter(c3) ? HAMZA_ON_YEH : c3

  if (isWeakLetter(c3)) return [YEH, DAMMA, seatedC1, FATHA, c2, SUKOON, c2, KASRA, seatedC3]

  return [YEH, DAMMA, seatedC1, FATHA, c2, SUKOON, c2, KASRA, seatedC3, DAMMA]
}

function derivePresentFormIII(verb: Verb<3>): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const seatedC1 = seatHamza(c1, DAMMA)
  const seatedC2 = seatHamza(c2, KASRA)
  const seatedC3 = seatHamza(c3, KASRA)
  const prefix = [YEH, DAMMA, seatedC1, FATHA, ALIF, seatedC2]

  if (c2 === c3) return [...prefix, SHADDA, DAMMA]

  if (isWeakLetter(c3)) return [...prefix, KASRA, defectiveGlide(c3)]

  return [...prefix, KASRA, seatedC3, DAMMA]
}

function derivePresentFormIV(verb: Verb<4>): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const seatedC1 = seatHamza(c1, DAMMA)
  const seatedC3 = isHamzatedLetter(c3) ? (isMiddleWeak ? HAMZA : HAMZA_ON_YEH) : c3
  const prefix = [YEH, DAMMA, seatedC1]

  if (isFinalWeak) return [...prefix, SUKOON, c2, KASRA, defectiveGlide(c3)]

  if (c2 === c3) return [...prefix, KASRA, c2, SUKOON, c2, DAMMA]

  if (isMiddleWeak) return [...prefix, KASRA, YEH, seatedC3, DAMMA]

  return [...prefix, SUKOON, c2, KASRA, seatedC3, DAMMA]
}

function derivePresentFormV(verb: Verb<5>): readonly string[] {
  const [c1, c2, c3] = [...verb.root]

  if (c3 === YEH) return [YEH, FATHA, TEH, FATHA, c1, FATHA, c2, SUKOON, c2, FATHA, ALIF_MAQSURA]

  return [YEH, FATHA, TEH, FATHA, c1, FATHA, c2, SUKOON, c2, FATHA, seatHamza(c3, FATHA), DAMMA]
}

function derivePresentFormVI(verb: Verb<6>): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const seatedC2 = isHamzatedLetter(c2) ? HAMZA : c2
  const seatedC3 = seatHamza(c3, FATHA)

  if (isWeakLetter(c3)) return [YEH, FATHA, TEH, FATHA, c1, FATHA, ALIF, seatedC2, FATHA, ALIF_MAQSURA]

  if (c2 === c3) return [YEH, FATHA, TEH, FATHA, c1, FATHA, ALIF, c2, SUKOON, c2, DAMMA]

  return [YEH, FATHA, TEH, FATHA, c1, FATHA, ALIF, seatedC2, FATHA, seatedC3, DAMMA]
}

function derivePresentFormVII(verb: Verb<7>): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isFinalWeak = isWeakLetter(c3)

  if (c2 === c3) return [YEH, FATHA, NOON, SUKOON, c1, FATHA, c2, SHADDA, DAMMA]

  if (isFinalWeak) return [YEH, FATHA, NOON, SUKOON, c1, FATHA, c2, KASRA, c3]

  return [YEH, FATHA, NOON, SUKOON, c1, FATHA, c2, KASRA, c3, DAMMA]
}

function derivePresentFormVIII(verb: Verb<8>): readonly string[] {
  const [c1, c2, c3] = [...verb.root]

  if (isHamzatedLetter(c1) || isWeakLetter(c1)) return [YEH, FATHA, TEH, SUKOON, TEH, FATHA, c2, KASRA, c3, DAMMA]

  if (isWeakLetter(c2)) return [YEH, FATHA, c1, SUKOON, TEH, FATHA, ALIF, c3, DAMMA]

  return [YEH, FATHA, c1, SUKOON, TEH, FATHA, c2, KASRA, c3, DAMMA]
}

function derivePresentFormIX(verb: Verb<9>): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  return [YEH, FATHA, c1, SUKOON, c2, FATHA, c3, SUKOON, c3, DAMMA]
}

function derivePresentFormX(verb: Verb<10>): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isMiddleWeak = isWeakLetter(c2)
  const seatedC3 = isHamzatedLetter(c3) ? HAMZA_ON_YEH : c3
  const prefix = [YEH, FATHA, SEEN, SUKOON, TEH, FATHA, c1]

  if (c2 === c3) return [...prefix, KASRA, c2, SUKOON, c2, DAMMA]

  if (isMiddleWeak) return [...prefix, KASRA, YEH, seatedC3, DAMMA]

  return [...prefix, SUKOON, c2, KASRA, seatedC3, DAMMA]
}

function derivePresentForms(verb: Verb): readonly string[] {
  const letters = [...verb.root]

  if (letters.length < 3) throw new Error('Root must have at least 3 letters.')

  if (letters.length === 4) return deriveQuadriliteralPresentForms(verb)

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

function shortenHollowStem(word: readonly string[]): readonly string[] {
  // The hollow stem cannot be a long vowel if the next letter carries a sukoon.
  const hollowLetterIndex = findWeakLetterIndex(word, 0)
  const nextLetterIndex = findLetterIndex(word, hollowLetterIndex)
  return [...word.slice(0, hollowLetterIndex), ...word.slice(nextLetterIndex)]
}

function expandGemination(word: readonly string[]): readonly string[] {
  return Array.from(word.join('').replace(new RegExp(`([^\\p{Mn}])${SUKOON}\\1`), `$1${FATHA}$1`))
}

function dropTerminalWeakOrHamza(word: readonly string[], hamzaVowel?: Vowel): readonly string[] {
  const lastLetterIndex = findLastLetterIndex(word)
  const last = word.at(lastLetterIndex)

  if (isHamzatedLetter(last)) {
    return [
      ...word.slice(0, lastLetterIndex),
      seatHamza(
        last,
        hamzaVowel ?? word.findLast((char, index) => index < lastLetterIndex && isDiacritic(char)) ?? KASRA,
      ),
      ...word.slice(lastLetterIndex + 1),
    ]
  }

  if (isWeakLetter(last)) return removeFinalDiacritic(word.slice(0, lastLetterIndex))

  return word
}

function dropFinalDefectiveGlide(word: readonly string[]): readonly string[] {
  // For other defective verbs, buildFemininePlural adds SUKOON before NOON, but we need to preserve
  // the existing diacritics before the weak letter. Remove trailing diacritics to find the weak letter,
  // then preserve everything up to and including it, and add NOON + FATHA.
  if (word.at(-2) === NOON) return [...removeFinalDiacritic(word).slice(0, -2), NOON, FATHA]

  return removeFinalDiacritic(word).slice(0, -1)
}

function applyPresentPrefix(prefix: string, chars: readonly string[]): readonly string[] {
  return [prefix, ...chars.slice(1)]
}
