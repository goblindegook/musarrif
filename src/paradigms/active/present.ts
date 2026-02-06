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
  isGutturalLetter,
  isHamzatedLetter,
  isWeakLetter,
  KASRA,
  last,
  longVowelFromPattern,
  NOON,
  normalizeAlifMadda,
  removeTrailingDiacritics,
  replaceFinalDiacritic,
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
import { isDual, isFemininePlural, isMasculinePlural, isPlural, type PronounId } from '../pronouns'
import type { Verb } from '../verbs'

export type Mood = 'indicative' | 'subjunctive' | 'jussive'

function defectiveGlide(letter: string): string {
  return letter === ALIF_MAQSURA || letter === YEH ? YEH : WAW
}

function isFormIFinalWeakPresent(verb: Verb, vowel: 'a' | 'i' | 'u'): boolean {
  return verb.form === 1 && isWeakLetter(verb.root[2]) && isFormIPresentVowel(verb, vowel)
}

function buildFormIFinalWeakPresentAStem(prefix: string, verb: Verb): readonly string[] {
  const [c1, c2] = [...verb.root]
  if (isHamzatedLetter(c2)) return [...prefix, FATHA, c1, FATHA]
  return [...prefix, FATHA, c1, SUKOON, c2, FATHA]
}

function replaceVowelBeforeGeminate(word: readonly string[], vowel: Vowel): readonly string[] {
  for (let i = word.length - 3; i >= 0; i -= 1) {
    if (word[i] === word.at(i + 2) && word.at(i + 1) === SUKOON) {
      return [...word.slice(0, i + 3), vowel]
    }
  }
  return word
}

function buildFemininePlural(expanded: readonly string[], verb: Verb): readonly string[] {
  const [c1, c2, c3] = Array.from(verb.root)
  const isConsonantalMiddleWeak = hasPattern(verb, 'fa3ila-yaf3alu') && (c2 === YEH || c2 === WAW)

  if (verb.form === 1 && c2 === c3)
    return [
      expanded[0],
      FATHA,
      c1,
      SUKOON,
      c2,
      shortVowelFromPattern(resolveFormIPresentVowel(verb)),
      c3,
      SUKOON,
      NOON,
      FATHA,
    ]

  if (verb.form === 2 && isWeakLetter(c1) && isWeakLetter(c3)) return [...expanded, NOON, FATHA]
  if (verb.form === 3 && isWeakLetter(c3)) return [...expanded, NOON, FATHA]
  if (verb.form === 4 && c2 === c3) return [expanded[0], DAMMA, c1, SUKOON, c2, KASRA, c3, SUKOON, NOON, FATHA]
  if (verb.form === 5 && c3 === YEH) return [...expanded.slice(0, -1), YEH, SUKOON, NOON, FATHA]
  if (verb.form === 6 && c2 === c3) return [...replaceFinalDiacritic(expandShadda(expanded), SUKOON), NOON, FATHA]

  if (isWeakLetter(c1) && isHamzatedLetter(c2) && isWeakLetter(c3)) return [...expanded, NOON, FATHA]

  if (isWeakLetter(c3) && !isWeakLetter(c1) && verb.form !== 7) return [...expanded, NOON, FATHA]

  if (!isConsonantalMiddleWeak && isWeakLetter(c2) && isHamzatedLetter(c3))
    return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(shortenHollowStem(expanded)), SUKOON), NOON, FATHA]

  if (!isConsonantalMiddleWeak && isWeakLetter(c2) && ![2, 3, 5].includes(verb.form)) {
    return [...replaceFinalDiacritic(shortenHollowStem(expanded), SUKOON), NOON, FATHA]
  }

  return [...replaceFinalDiacritic(expanded, SUKOON), NOON, FATHA]
}

function buildDualPresent(word: readonly string[], verb: Verb, formIPrefix: string): readonly string[] {
  const [c1, c2, c3] = verb.root
  const suffix = [ALIF, NOON, KASRA]

  if (isFormIFinalWeakPresent(verb, 'a'))
    return [...buildFormIFinalWeakPresentAStem(formIPrefix, verb), YEH, FATHA, ...suffix]

  if (isWeakLetter(c2) && isHamzatedLetter(c3)) {
    const hamzaSeat = c2 === YEH ? HAMZA_ON_YEH : HAMZA
    const lastIndex = findLastLetterIndex(word)
    return [
      ...replaceFinalDiacritic([...word.slice(0, lastIndex), hamzaSeat, ...word.slice(lastIndex + 1)], FATHA),
      ...suffix,
    ]
  }

  if (isHamzatedLetter(c3)) return normalizeAlifMadda([...removeTrailingDiacritics(word), FATHA, ...suffix])

  if (isWeakLetter(c1) && isHamzatedLetter(c2) && isWeakLetter(c3)) return [...word, FATHA, ...suffix]

  if (verb.form === 2 && isWeakLetter(c3)) return [...removeTrailingDiacritics(word), FATHA, ...suffix]
  if (verb.form === 3 && isWeakLetter(c3)) return [...removeTrailingDiacritics(word), FATHA, ...suffix]
  if (verb.form === 5 && isWeakLetter(c3)) return [...word.slice(0, -1), YEH, FATHA, ...suffix]

  // Defective verbs (not doubly weak) preserve final weak letter in dual forms
  if (!isWeakLetter(c1) && isWeakLetter(c3)) return [...removeTrailingDiacritics(word), FATHA, ...suffix]

  return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(word, FATHA), FATHA), ...suffix]
}

const PRESENT_BUILDERS: Record<PronounId, (base: readonly string[], verb: Verb) => readonly string[]> = {
  '1s': (base) => applyPresentPrefix(base, ALIF_HAMZA),
  '2ms': (base) => applyPresentPrefix(base, TEH),
  '2fs': (base, verb) => {
    const [c1, c2, c3] = [...verb.root]
    const stem = applyPresentPrefix(base, TEH)
    const suffix = [YEH, SUKOON, NOON, FATHA]

    if (isFormIFinalWeakPresent(verb, 'a')) return [...buildFormIFinalWeakPresentAStem(TEH, verb), ...suffix]

    if (isFormIFinalWeakPresent(verb, 'u'))
      return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(stem), KASRA), ...suffix]

    if (verb.form === 2 && isWeakLetter(c3)) return [...stem, NOON, FATHA]

    if (verb.form === 5 && isWeakLetter(c3)) return [...stem.slice(0, -1), ...suffix]

    if (verb.form === 7 && isWeakLetter(c3)) return [...replaceFinalDiacritic(stem, SUKOON), NOON, FATHA]

    if (verb.form === 3 && c2 === c3) return [...replaceFinalDiacritic(stem, KASRA), YEH, NOON, FATHA]

    if (verb.form === 3 && isWeakLetter(c3)) return [...stem, NOON, FATHA]

    if ((!isWeakLetter(c1) || isHamzatedLetter(c2)) && isWeakLetter(c3)) return [...stem, NOON, FATHA]

    return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(stem, KASRA), KASRA), ...suffix]
  },
  '3ms': (base) => base,
  '3fs': (base) => applyPresentPrefix(base, TEH),
  '2d': (base, verb) => buildDualPresent(applyPresentPrefix(base, TEH), verb, TEH),
  '3md': (base, verb) => buildDualPresent(base, verb, YEH),
  '3fd': (base, verb) => buildDualPresent(applyPresentPrefix(base, TEH), verb, TEH),
  '1p': (base) => applyPresentPrefix(base, NOON),
  '2mp': (base, verb) => {
    const [c1, c2, c3] = [...verb.root]
    const stem = applyPresentPrefix(base, TEH)

    if (isFormIFinalWeakPresent(verb, 'a'))
      return [...buildFormIFinalWeakPresentAStem(TEH, verb), WAW, SUKOON, NOON, FATHA]

    if (isWeakLetter(c2) && isHamzatedLetter(c3)) {
      const lastIndex = findLastLetterIndex(stem)
      const hamzaStem = [...stem.slice(0, lastIndex), HAMZA_ON_YEH, ...stem.slice(lastIndex + 1)]
      return [...replaceFinalDiacritic(hamzaStem, DAMMA), WAW, NOON, FATHA]
    }

    if (isHamzatedLetter(c3) && !isWeakLetter(c2)) return [...stem, WAW, NOON, FATHA]

    if (c2 === YEH && c3 === YEH) return [...replaceFinalDiacritic(stem, DAMMA), WAW, NOON, FATHA]

    if (verb.form === 2 && isWeakLetter(c3)) return [...replaceVowelBeforeGeminate(stem, DAMMA), WAW, NOON, FATHA]

    if (verb.form === 3 && isWeakLetter(c3))
      return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(stem, DAMMA), DAMMA), WAW, NOON, FATHA]

    if (verb.form === 5 && c3 === YEH) return [...stem.slice(0, -1), WAW, SUKOON, NOON, FATHA]

    if (verb.form === 7 && isWeakLetter(c3)) return [...stem, WAW, NOON, FATHA]

    if (isWeakLetter(c1) && isHamzatedLetter(c2) && isWeakLetter(c3)) {
      const hamzatedStem = stem.map((char) => (char === HAMZA_ON_YEH ? ALIF_HAMZA : char))
      return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(hamzatedStem, DAMMA), DAMMA), WAW, NOON, FATHA]
    }

    // Defective verbs (not doubly weak): drop final weak letter, replace final diacritic with damma, add waw + noon + fatḥa
    if (isWeakLetter(c3) && !isWeakLetter(c1))
      return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(stem, DAMMA), DAMMA), WAW, NOON, FATHA]

    return [...dropTerminalWeakOrHamza(stem, DAMMA), WAW, NOON, FATHA]
  },
  '2fp': (base, verb) => {
    const [c1, c2, c3] = [...verb.root]

    if (isFormIFinalWeakPresent(verb, 'a'))
      return [...buildFormIFinalWeakPresentAStem(TEH, verb), YEH, SUKOON, NOON, FATHA]

    if (verb.form === 3 && c2 === c3) return [TEH, DAMMA, c1, FATHA, ALIF, c2, KASRA, c2, SUKOON, NOON, FATHA]

    if (verb.form === 9) return buildFemininePlural(expandShadda(applyPresentPrefix(base, TEH)), verb)

    if (verb.form === 10 && c2 === c3)
      return buildFemininePlural([TEH, FATHA, SEEN, SUKOON, TEH, FATHA, c1, SUKOON, c2, KASRA, c3, DAMMA], verb)

    return buildFemininePlural(applyPresentPrefix(base, TEH), verb)
  },
  '3mp': (base, verb) => {
    const [c1, c2, c3] = [...verb.root]
    const suffix = [WAW, SUKOON, NOON, FATHA]

    if (isFormIFinalWeakPresent(verb, 'a')) return [...buildFormIFinalWeakPresentAStem(YEH, verb), ...suffix]

    if (isWeakLetter(c2) && isHamzatedLetter(c3)) {
      const lastIndex = findLastLetterIndex(base)
      const hamzaBase = [...base.slice(0, lastIndex), HAMZA_ON_YEH, ...base.slice(lastIndex + 1)]
      return [...replaceFinalDiacritic(hamzaBase, DAMMA), WAW, NOON, FATHA]
    }

    if (isHamzatedLetter(c3) && !isWeakLetter(c2)) return [...base, WAW, NOON, FATHA]

    if (verb.form === 2 && c2 === YEH && c3 === YEH) return [...replaceFinalDiacritic(base, DAMMA), WAW, NOON, FATHA]

    if (verb.form === 2 && isWeakLetter(c3)) return [...replaceVowelBeforeGeminate(base, DAMMA), WAW, NOON, FATHA]

    if (verb.form === 3 && isWeakLetter(c3))
      return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(base, DAMMA), DAMMA), WAW, NOON, FATHA]

    if (verb.form === 5 && c3 === YEH) return [...base.slice(0, -1), ...suffix]

    if (verb.form === 7 && isWeakLetter(c3)) return [...base, WAW, NOON, FATHA]

    if (isWeakLetter(c1) && isHamzatedLetter(c2) && isWeakLetter(c3)) {
      const hamzatedBase = base.map((char) => (char === HAMZA_ON_YEH ? ALIF_HAMZA : char))
      return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(hamzatedBase, DAMMA), DAMMA), WAW, NOON, FATHA]
    }

    // Defective verbs (not doubly weak): drop final weak letter, replace final diacritic with damma, add waw + noon + fatḥa
    if (isWeakLetter(c3) && !isWeakLetter(c1))
      return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(base, DAMMA), DAMMA), WAW, NOON, FATHA]

    return [...dropTerminalWeakOrHamza(base, DAMMA), WAW, NOON, FATHA]
  },
  '3fp': (base, verb) => {
    const [c1, c2, c3] = [...verb.root]

    if (isFormIFinalWeakPresent(verb, 'a'))
      return [...buildFormIFinalWeakPresentAStem(YEH, verb), YEH, SUKOON, NOON, FATHA]

    if (verb.form === 3 && c2 === c3) return [YEH, DAMMA, c1, FATHA, ALIF, c2, KASRA, c2, SUKOON, NOON, FATHA]

    if (verb.form === 9) return buildFemininePlural(expandShadda(base), verb)

    if (verb.form === 10 && c2 === c3)
      return buildFemininePlural([YEH, FATHA, SEEN, SUKOON, TEH, FATHA, c1, SUKOON, c2, KASRA, c3, DAMMA], verb)

    return buildFemininePlural(base, verb)
  },
}

function conjugateIndicative(verb: Verb): Record<PronounId, string> {
  const base = derivePresentForms(verb)
  return mapRecord(PRESENT_BUILDERS, (build) =>
    geminateDoubleLetters(normalizeAlifMadda(build(base, verb)))
      .join('')
      .normalize('NFC'),
  )
}

function dropNoonEnding(word: readonly string[]): readonly string[] {
  const chars = [...word]
  while (last(chars) === NOON || isDiacritic(last(chars))) chars.pop()
  return chars
}

function replaceDammaBeforeWawAlif(word: readonly string[]): readonly string[] {
  return [...replaceFinalDiacritic(word.slice(0, -1), DAMMA), WAW, SUKOON, ALIF]
}

function replaceDammaBeforeFinalWaw(word: readonly string[]): readonly string[] {
  return last(word) === WAW ? replaceDammaBeforeWawAlif(word) : word
}

function replaceFathaBeforeFinalWawAlif(word: readonly string[]): readonly string[] {
  return [...replaceFinalDiacritic(word.slice(0, word.length - 1), FATHA), WAW, SUKOON, ALIF]
}

function dropWeakLetterBeforeLastAlif(word: readonly string[]): readonly string[] {
  const prevBaseIdx = findLastLetterIndex(word, word.lastIndexOf(ALIF))
  if (isWeakLetter(word.at(prevBaseIdx))) return [...word.slice(0, prevBaseIdx), ALIF]
  return word
}

function conjugateSubjunctive(verb: Verb): Record<PronounId, string> {
  const [, , c3] = Array.from(verb.root)

  return mapRecord(
    mapRecord(conjugateIndicative(verb), (indicative, pronounId) => {
      const word = Array.from(indicative)
      const isSecondFeminineSingular = pronounId === '2fs'

      if (isDual(pronounId)) return dropNoonEnding(normalizeAlifMadda(word))

      if (isWeakLetter(c3) && isFormIPresentVowel(verb, 'a')) {
        if (isSecondFeminineSingular) return replaceFinalDiacritic(dropNoonEnding(word), SUKOON)
        if (isMasculinePlural(pronounId)) return replaceFathaBeforeFinalWawAlif(dropNoonEnding(word))
        return word
      }

      if (isSecondFeminineSingular) return replaceDammaBeforeFinalWaw(dropNoonEnding(word))
      if (isMasculinePlural(pronounId)) return replaceDammaBeforeWawAlif(dropNoonEnding(word))

      return replaceFinalDiacritic(word, FATHA)
    }),
    (letters) => letters.join('').normalize('NFC'),
  )
}

function conjugateJussive(verb: Verb): Record<PronounId, string> {
  const letters = Array.from(verb.root)
  const [, c2, c3] = letters
  const lastRoot = last(letters)
  const isConsonantalMiddleWeak = hasPattern(verb, 'fa3ila-yaf3alu') && (c2 === YEH || c2 === WAW)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(lastRoot)
  const isFinalHamza = isHamzatedLetter(lastRoot)
  const isGeminate = c2 === c3

  return mapRecord(
    mapRecord(conjugateIndicative(verb), (indicative, pronounId) => {
      const word = Array.from(indicative)
      const isSecondFeminineSingular = pronounId === '2fs'

      // Form V defective verbs: preserve weak letter in jussive (unlike other defective verbs)
      if (verb.form === 5 && isFinalWeak) {
        const base = dropNoonEnding(word)
        if (isFemininePlural(pronounId)) return [...base, SUKOON, NOON, FATHA]
        if (isPlural(pronounId)) return [...base, SUKOON, ALIF]
        if (isSecondFeminineSingular) return [...base, SUKOON]
        if (isDual(pronounId)) return base
        return dropFinalDefectiveGlide(word)
      }

      if (isFormIFinalWeakPresent(verb, 'a')) {
        if (isSecondFeminineSingular) return replaceFinalDiacritic(dropNoonEnding(word), SUKOON)
        if (isMasculinePlural(pronounId)) return replaceFathaBeforeFinalWawAlif(dropNoonEnding(word))
        if (isFemininePlural(pronounId)) return word
      }

      if (isDual(pronounId)) {
        if (isMiddleWeak) return dropNoonEnding(word)
        if (verb.form === 1 && isFinalWeak) {
          const base = dropNoonEnding(word)
          if (isDiacritic(base.at(-2)) && base.at(-3) === WAW) return [...base.slice(0, -2), SUKOON, ALIF]
          return base
        }
        if (verb.form === 4 && isFinalWeak) return dropNoonEnding(word)
        return dropWeakLetterBeforeLastAlif(dropNoonEnding(word))
      }

      if (isMasculinePlural(pronounId) && isMiddleWeak) {
        const stem = dropNoonEnding(word)
        const beforeWaw = findLastLetterIndex(stem.slice(0, -1))
        return replaceDammaBeforeWawAlif(stem.at(beforeWaw) === YEH ? [...stem.slice(0, beforeWaw), WAW] : stem)
      }

      if (isSecondFeminineSingular || isMasculinePlural(pronounId))
        return replaceDammaBeforeFinalWaw(dropNoonEnding(word))

      if (isMiddleWeak && isFinalHamza && isFemininePlural(pronounId)) return word

      if (isMiddleWeak && isFinalHamza)
        return replaceFinalDiacritic(dropTerminalWeakOrHamza(shortenHollowStem(word)), SUKOON)

      const stem =
        [1, 4, 7, 8, 10].includes(verb.form) && isMiddleWeak && !isConsonantalMiddleWeak && !isFinalWeak
          ? shortenHollowStem(word)
          : word

      if (isFinalWeak) return dropFinalDefectiveGlide(stem)

      if (isGeminate && [1, 3, 4, 10].includes(verb.form)) return replaceFinalDiacritic(stem, FATHA)

      if (verb.form === 9) return replaceFinalDiacritic(stem, FATHA)

      if (isFemininePlural(pronounId)) return replaceFinalDiacritic(stem, FATHA)

      return replaceFinalDiacritic(stem, SUKOON)
    }),
    (letters) => letters.join('').normalize('NFC'),
  )
}

export function conjugatePresentMood(verb: Verb, mood: Mood): Record<PronounId, string> {
  if (mood === 'subjunctive') return conjugateSubjunctive(verb)
  if (mood === 'jussive') return conjugateJussive(verb)
  return conjugateIndicative(verb)
}

function deriveQuadriliteralPresentForms(verb: Verb): readonly string[] {
  const [c1, c2, c3, c4] = [...verb.root]

  switch (verb.form) {
    case 4: {
      const finalGlide = c4 === ALIF_HAMZA ? HAMZA_ON_YEH : defectiveGlide(c4)
      return [YEH, DAMMA, c2, SUKOON, c3, KASRA, finalGlide, DAMMA]
    }

    default: {
      return [YEH, DAMMA, c1, FATHA, c2, SUKOON, c3, KASRA, c4, DAMMA]
    }
  }
}

function derivePresentFormI(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isInitialHamza = isHamzatedLetter(c1)
  const isMiddleHamza = isHamzatedLetter(c2)
  const isInitialWeak = isWeakLetter(c1)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const patternVowel = resolveFormIPresentVowel(verb)
  const shortVowel = shortVowelFromPattern(patternVowel)
  const seatedC1 = seatHamza(c1, shortVowel)
  const seatedC2 = c1 === YEH && isHamzatedLetter(c2) ? HAMZA_ON_YEH : seatHamza(c2, shortVowel)
  const seatedC3 = seatHamza(c3, shortVowel)
  const prefix = [YEH, FATHA]

  // Geminate Form I: use pattern vowel when it is ḍamma (e.g., يَقُرُّ), otherwise keep the default stem.
  if (c2 === c3) return [...prefix, seatHamza(c1, shortVowel), shortVowel, c2, SUKOON, c2, DAMMA]

  // Initial weak + final weak (e.g., وقي → يقي, ولى → يلي)
  // Initial waw drops, final weak remains with short vowel on c2
  // ALIF_MAQSURA becomes YEH in present tense, no trailing case vowel on 3ms base
  if (isInitialWeak && isFinalWeak) return [...prefix, seatHamza(c2, shortVowel), shortVowel, defectiveGlide(c3)]

  // Doubly weak (middle weak + final weak): treat as defective, not hollow (e.g., رَوِيَ → يَرْوِي)
  if (isMiddleWeak && isFinalWeak)
    return [...prefix, c1, SUKOON, c2, shortVowel, patternVowel === 'a' ? ALIF_MAQSURA : defectiveGlide(c3)]

  if (isInitialWeak && patternVowel === 'u' && isGutturalLetter(c2))
    return [...prefix, WAW, SUKOON, seatedC2, shortVowel, seatedC3, DAMMA]

  if (c1 === YEH) return [...prefix, YEH, SUKOON, seatedC2, shortVowel, seatedC3, DAMMA]

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

  if (isInitialHamza && isMiddleWeak && !isFinalWeak)
    return [...prefix, seatHamza(c1, shortVowel), ...longVowelFromPattern(patternVowel), c3, DAMMA]

  if (isInitialHamza) return [...prefix, c1, SUKOON, seatedC2, shortVowel, seatedC3, DAMMA]

  if (isMiddleHamza && isFinalWeak) return [...prefix, c1, FATHA, ALIF_MAQSURA]

  if (!hasPattern(verb, 'fa3ila-yaf3alu') && isMiddleWeak)
    return [...prefix, c1, ...longVowelFromPattern(c2 === YEH ? 'i' : patternVowel), c3, DAMMA]

  if (c3 === WAW) return [...prefix, c1, SUKOON, seatedC2, DAMMA, defectiveGlide(c3)]

  if (isFinalWeak)
    return [...prefix, c1, SUKOON, seatedC2, shortVowel, patternVowel === 'a' ? ALIF_MAQSURA : defectiveGlide(c3)]

  return [...prefix, seatedC1, SUKOON, seatedC2, shortVowel, seatedC3, DAMMA]
}

function derivePresentFormII(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const seatedC1 = c1 === ALIF_HAMZA ? HAMZA_ON_WAW : c1
  const seatedC3 = isHamzatedLetter(c3) ? HAMZA_ON_YEH : c3
  if (isWeakLetter(c3)) return [YEH, DAMMA, seatedC1, FATHA, c2, SUKOON, c2, KASRA, seatedC3]
  return [YEH, DAMMA, seatedC1, FATHA, c2, SUKOON, c2, KASRA, seatedC3, DAMMA]
}

function derivePresentFormIII(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const seatedC2 = isHamzatedLetter(c2) ? HAMZA_ON_YEH : c2
  if (c2 === c3) return [YEH, DAMMA, c1, FATHA, ALIF, seatedC2, SHADDA, DAMMA]
  if (isWeakLetter(c3)) return [YEH, DAMMA, c1, FATHA, ALIF, seatedC2, KASRA, defectiveGlide(c3)]
  return [YEH, DAMMA, c1, FATHA, ALIF, seatedC2, KASRA, c3, DAMMA]
}

function derivePresentFormIV(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const seatedC1 = isHamzatedLetter(c1) ? HAMZA_ON_WAW : c1
  const seatedC3 = isHamzatedLetter(c3) ? HAMZA_ON_YEH : c3
  const prefix = [YEH, DAMMA, seatedC1]

  if (c2 === c3) return [...prefix, KASRA, c2, SUKOON, c2, DAMMA]

  if (isFinalWeak) return [...prefix, SUKOON, c2, KASRA, defectiveGlide(c3)]

  if (isMiddleWeak) return [...prefix, KASRA, YEH, seatedC3, DAMMA]

  return [...prefix, SUKOON, c2, KASRA, seatedC3, DAMMA]
}

function derivePresentFormV(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  if (c3 === YEH) return [YEH, FATHA, TEH, FATHA, c1, FATHA, c2, SUKOON, c2, FATHA, ALIF_MAQSURA]
  return [YEH, FATHA, TEH, FATHA, c1, FATHA, c2, SUKOON, c2, FATHA, c3, DAMMA]
}

function derivePresentFormVI(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const seatedC2 = isHamzatedLetter(c2) ? HAMZA : c2
  if (c2 === c3) return [YEH, FATHA, TEH, FATHA, c1, FATHA, ALIF, c2, SUKOON, c2, DAMMA]
  return [YEH, FATHA, TEH, FATHA, c1, FATHA, ALIF, seatedC2, FATHA, c3, DAMMA]
}

function derivePresentFormVII(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isFinalWeak = isWeakLetter(c3)

  if (isFinalWeak) return [YEH, FATHA, NOON, SUKOON, c1, FATHA, c2, KASRA, c3]

  return [YEH, FATHA, NOON, SUKOON, c1, FATHA, c2, KASRA, c3, DAMMA]
}

function derivePresentFormVIII(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]

  if (isHamzatedLetter(c1) || isWeakLetter(c1)) return [YEH, FATHA, TEH, SUKOON, TEH, FATHA, c2, KASRA, c3, DAMMA]

  if (isWeakLetter(c2)) return [YEH, FATHA, c1, SUKOON, TEH, FATHA, ALIF, c3, DAMMA]

  return [YEH, FATHA, c1, SUKOON, TEH, FATHA, c2, KASRA, c3, DAMMA]
}

function derivePresentFormIX(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  return [YEH, FATHA, c1, SUKOON, c2, FATHA, c3, SUKOON, c3, DAMMA]
}

function derivePresentFormX(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isMiddleWeak = isWeakLetter(c2)
  const seatedC3 = isHamzatedLetter(c3) ? HAMZA_ON_YEH : c3
  const prefix = [YEH, FATHA, SEEN, SUKOON, TEH, FATHA, c1]

  if (c2 === c3) return [...prefix, KASRA, c2, SUKOON, c2, DAMMA]

  // Hollow Form X present (e.g., يَسْتَضِيفُ)
  if (isMiddleWeak) return [...prefix, KASRA, YEH, seatedC3, DAMMA]

  return [...prefix, SUKOON, c2, KASRA, seatedC3, DAMMA]
}

function derivePresentForms(verb: Verb): readonly string[] {
  const letters = [...verb.root]

  if (letters.length < 3) throw new Error('Root must have at least 3 letters.')

  // Handle quadriliteral and longer roots
  if (letters.length === 4) {
    return deriveQuadriliteralPresentForms(verb)
  }

  // Triliteral roots (3 letters)
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
  const hollowLetterIndex = findWeakLetterIndex(word, 0)
  if (hollowLetterIndex < 0) return word
  const nextLetterIndex = findLetterIndex(word, hollowLetterIndex)

  return [...word.slice(0, hollowLetterIndex), ...word.slice(nextLetterIndex)]
}

function expandShadda(word: readonly string[]): readonly string[] {
  for (let i = 0; i < word.length - 2; i += 1) {
    if (word[i] === word.at(i + 2) && word.at(i + 1) === SUKOON && !isDiacritic(word[i]))
      return [...word.slice(0, i + 1), FATHA, word[i], ...word.slice(i + 3)]
  }
  return word
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

  if (isWeakLetter(last)) return removeTrailingDiacritics(word.slice(0, lastLetterIndex))

  return word
}

function dropFinalDefectiveGlide(word: readonly string[]): readonly string[] {
  // Check if word ends with NOON (feminine plural ending)
  if (word.at(-2) === NOON) {
    // For other defective verbs, buildFemininePlural adds SUKOON before NOON, but we need to preserve
    // the existing diacritics before the weak letter. Remove trailing diacritics to find the weak letter,
    // then preserve everything up to and including it, and add NOON + FATHA.
    const stem = removeTrailingDiacritics(word)
    const weakLetterIndex = findLastLetterIndex(stem, stem.length - 1)
    if (isWeakLetter(stem.at(weakLetterIndex))) return [...stem.slice(0, weakLetterIndex + 1), NOON, FATHA]
  }

  return removeTrailingDiacritics(word).slice(0, -1)
}

function applyPresentPrefix(chars: readonly string[], prefix: string): readonly string[] {
  return [prefix, ...chars.slice(1)]
}
