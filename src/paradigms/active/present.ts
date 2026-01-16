import { mapRecord } from '../../primitives/objects'
import { resolveFormIPastVowel, resolveFormIPresentVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_MADDA,
  ALIF_MAQSURA,
  DAMMA,
  FATHA,
  findLastLetterIndex,
  findLetterIndex,
  findWeakLetterIndex,
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
  removeLeadingDiacritics,
  removeTrailingDiacritics,
  replaceFinalDiacritic,
  SEEN,
  SHADDA,
  SUKOON,
  shortVowelFromPattern,
  TEH,
  type Vowel,
  WAW,
  weakLetterGlide,
  YEH,
} from '../letters'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'

export type Mood = 'indicative' | 'subjunctive' | 'jussive'

function hollowLetterGlide(letter: string): string {
  return letter === WAW || letter === YEH ? letter : ALIF
}

function defectiveLetterGlide(letter: string): string {
  return letter === ALIF_MAQSURA || letter === YEH ? YEH : WAW
}

const HOLLOW_APOCOPE_FORMS: ReadonlySet<Verb['form']> = new Set([1, 4, 7, 8, 10])

function isFormIFinalWeakPresentA(verb: Verb): boolean {
  return verb.form === 1 && isWeakLetter(verb.root[2]) && resolveFormIPresentVowel(verb) === 'a'
}

function buildFormIFinalWeakPresentAStem(prefix: string, verb: Verb): readonly string[] {
  const [c1, c2] = [...verb.root]
  return [prefix, FATHA, c1, SUKOON, c2, FATHA]
}

function replaceVowelBeforeShadda(word: readonly string[], vowel: Vowel): readonly string[] {
  return [...word.slice(0, word.lastIndexOf(SHADDA) - 1), vowel, SHADDA]
}

function buildFemininePlural(expanded: readonly string[], verb: Verb): readonly string[] {
  const [c1, c2, c3] = Array.from(verb.root)

  if (verb.form === 1 && c2 === c3) return [expanded[0], FATHA, c1, SUKOON, c2, KASRA, c3, SUKOON, NOON, FATHA]

  if (verb.form === 4 && c2 === c3) return [expanded[0], DAMMA, c1, SUKOON, c2, KASRA, c3, SUKOON, NOON, FATHA]

  if (verb.form === 6 && c2 === c3) return [...replaceFinalDiacritic(expandShadda(expanded), SUKOON), NOON, FATHA]

  // Form II defective verbs preserve final weak letter, add noon + fatḥa directly (no sukoon)
  if (isWeakLetter(c1) && isWeakLetter(c3) && verb.form === 2) return [...expanded, NOON, FATHA]

  if (isWeakLetter(c1) && isHamzatedLetter(c2) && isWeakLetter(c3)) return [...expanded, NOON, FATHA]

  // Form V defective verbs: replace alif maqsura with yeh + sukoon, add noon + fatḥa
  if (verb.form === 5 && c3 === YEH) return [...expanded.slice(0, -1), YEH, SUKOON, NOON, FATHA]

  // Defective verbs (not doubly weak, excluding Form VII) preserve final weak letter, add noon + fatḥa directly (no sukoon)
  if (isWeakLetter(c3) && !isWeakLetter(c1) && verb.form !== 7) return [...expanded, NOON, FATHA]

  if (isWeakLetter(c2) && isHamzatedLetter(c3))
    return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(shortenHollowStem(expanded)), SUKOON), NOON, FATHA]

  if (isWeakLetter(c2) && ![2, 3, 5].includes(verb.form)) {
    // For hollow verbs with middle ALIF, include WAW in possible hollow letters when shortening
    const hollowStem = shortenHollowStem(expanded)

    // If form ends with NOON, geminate with shadda when adding NOON suffix (e.g., كان → تَكُنَّ)
    if (hollowStem.at(-2) === NOON) return [...hollowStem.slice(0, -2), NOON, SHADDA, FATHA]

    return [...replaceFinalDiacritic(hollowStem, SUKOON), NOON, FATHA]
  }

  if (removeTrailingDiacritics(expanded).at(-1) === NOON) {
    const base = removeTrailingDiacritics(expanded)
    return [...base.slice(0, -1), NOON, SHADDA, FATHA]
  }

  if (isHamzatedLetter(c3) || isWeakLetter(c3)) return [...replaceFinalDiacritic(expanded, SUKOON), NOON, FATHA]

  return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(expanded), SUKOON), NOON, FATHA]
}

const PRESENT_BUILDERS: Record<PronounId, (base: readonly string[], verb: Verb) => readonly string[]> = {
  '1s': (base) => applyPresentPrefix(base, ALIF_HAMZA),
  '2ms': (base) => applyPresentPrefix(base, TEH),
  '2fs': (base, verb) => {
    const [c1, c2, c3] = [...verb.root]
    const stem = applyPresentPrefix(base, TEH)

    if (isFormIFinalWeakPresentA(verb)) return [...buildFormIFinalWeakPresentAStem(TEH, verb), YEH, SUKOON, NOON, FATHA]

    // Replace final hamza with hamza on yeh, add kasra + yeh + noon + fatḥa
    if (isWeakLetter(c2) && isHamzatedLetter(c3))
      return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(stem), KASRA), YEH, NOON, FATHA]

    // Form II defective verbs preserve shadda and final weak letter
    if (verb.form === 2 && isWeakLetter(c3)) return [...stem, NOON, FATHA]

    // Form V defective verbs: replace alif maqsura with yeh + sukoon, add noon + fatḥa
    if (verb.form === 5 && c3 === YEH) return [...stem.slice(0, -1), YEH, SUKOON, NOON, FATHA]

    // Form II hollow verbs preserve full stem, replace final damma with kasra, add yeh + noon + fatḥa
    if (verb.form === 2 && isWeakLetter(c2)) return [...replaceFinalDiacritic(stem, KASRA), YEH, NOON, FATHA]

    // Form VII defective verbs preserve final weak letter, add sukoon + noon + fatḥa
    if (verb.form === 7 && isWeakLetter(c3)) return [...replaceFinalDiacritic(stem, SUKOON), NOON, FATHA]

    if (isWeakLetter(c1) && isHamzatedLetter(c2) && isWeakLetter(c3)) return [...stem, NOON, FATHA]

    // Defective verbs (not doubly weak) preserve final weak letter, add noon + fatḥa directly
    if (isWeakLetter(c3) && !isWeakLetter(c1)) return [...stem, NOON, FATHA]

    // Form I hollow verbs with middle ALIF don't have sukoon before noon in 2fs (e.g., كان → تَكُونِينَ)
    // Form III and Form V hollow verbs don't have sukoon before noon in 2fs
    if (
      (verb.form === 10 && (isHamzatedLetter(c2) || isHamzatedLetter(c3))) ||
      (isWeakLetter(c2) && (c2 === ALIF || [3, 5].includes(verb.form)))
    )
      return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(stem), KASRA), YEH, NOON, FATHA]

    return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(stem), KASRA), YEH, SUKOON, NOON, FATHA]
  },
  '3ms': (base) => base,
  '3fs': (base) => applyPresentPrefix(base, TEH),
  '2d': (base, verb) => {
    const [c1, c2, c3] = [...verb.root]
    const stem = applyPresentPrefix(base, TEH)

    if (isFormIFinalWeakPresentA(verb))
      return [...buildFormIFinalWeakPresentAStem(TEH, verb), YEH, FATHA, ALIF, NOON, KASRA]

    if (isHamzatedLetter(c3) && !isWeakLetter(c2))
      return collapseHamzaAlif([...replaceFinalDiacritic(stem, FATHA), ALIF, NOON, KASRA])

    if (isWeakLetter(c1) && isHamzatedLetter(c2) && isWeakLetter(c3)) return [...stem, FATHA, ALIF, NOON, KASRA]

    // Form V defective verbs: convert alif maqsura to yeh with kasra, add alif + noon + kasra
    if (verb.form === 5 && c3 === YEH) return [...stem.slice(0, -1), YEH, FATHA, ALIF, NOON, KASRA]

    // Form II defective verbs preserve final weak letter in dual forms (even if doubly weak)
    if (verb.form === 2 && isWeakLetter(c3)) return [...replaceFinalDiacritic(stem, FATHA), ALIF, NOON, KASRA]

    // Defective verbs (not doubly weak) preserve final weak letter in dual forms
    if (isWeakLetter(c3) && !isWeakLetter(c1)) return [...replaceFinalDiacritic(stem, FATHA), ALIF, NOON, KASRA]

    return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(stem), FATHA), ALIF, NOON, KASRA]
  },
  '3md': (base, verb) => {
    const [c1, c2, c3] = [...verb.root]

    if (isFormIFinalWeakPresentA(verb))
      return [...buildFormIFinalWeakPresentAStem(YEH, verb), YEH, FATHA, ALIF, NOON, KASRA]

    if (isHamzatedLetter(c3) && !isWeakLetter(c2))
      return collapseHamzaAlif([...replaceFinalDiacritic(base, FATHA), ALIF, NOON, KASRA])

    if (isWeakLetter(c1) && isHamzatedLetter(c2) && isWeakLetter(c3)) return [...base, FATHA, ALIF, NOON, KASRA]

    // Form II defective verbs preserve final weak letter in dual forms (even if doubly weak)
    if (verb.form === 2 && isWeakLetter(c3)) return [...replaceFinalDiacritic(base, FATHA), ALIF, NOON, KASRA]

    // Form V defective verbs: replace alif maqsura with yeh + fatḥa, add alif + noon + kasra
    if (verb.form === 5 && c3 === YEH) return [...base.slice(0, -1), YEH, FATHA, ALIF, NOON, KASRA]

    // Defective verbs (not doubly weak) preserve final weak letter in dual forms
    if (isWeakLetter(c3) && !isWeakLetter(c1)) return [...replaceFinalDiacritic(base, FATHA), ALIF, NOON, KASRA]

    return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(base), FATHA), ALIF, NOON, KASRA]
  },
  '3fd': (base, verb) => {
    const [c1, c2, c3] = [...verb.root]
    const stem = applyPresentPrefix(base, TEH)

    if (isFormIFinalWeakPresentA(verb))
      return [...buildFormIFinalWeakPresentAStem(TEH, verb), YEH, FATHA, ALIF, NOON, KASRA]

    if (isHamzatedLetter(c3) && !isWeakLetter(c2))
      return collapseHamzaAlif([...replaceFinalDiacritic(stem, FATHA), ALIF, NOON, KASRA])

    if (isWeakLetter(c1) && isHamzatedLetter(c2) && isWeakLetter(c3)) return [...stem, FATHA, ALIF, NOON, KASRA]

    // Form II defective verbs preserve final weak letter in dual forms (even if doubly weak)
    if (verb.form === 2 && isWeakLetter(c3)) return [...replaceFinalDiacritic(stem, FATHA), ALIF, NOON, KASRA]

    // Form V defective verbs: replace alif maqsura with yeh + fatḥa, add alif + noon + kasra
    if (verb.form === 5 && c3 === YEH) return [...stem.slice(0, -1), YEH, FATHA, ALIF, NOON, KASRA]

    // Defective verbs (not doubly weak) preserve final weak letter in dual forms
    if (isWeakLetter(c3) && !isWeakLetter(c1)) return [...replaceFinalDiacritic(stem, FATHA), ALIF, NOON, KASRA]

    return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(stem), FATHA), ALIF, NOON, KASRA]
  },
  '1p': (base) => applyPresentPrefix(base, NOON),
  '2mp': (base, verb) => {
    const [c1, c2, c3] = [...verb.root]
    const stem = applyPresentPrefix(base, TEH)

    if (isFormIFinalWeakPresentA(verb)) return [...buildFormIFinalWeakPresentAStem(TEH, verb), WAW, SUKOON, NOON, FATHA]

    if (isHamzatedLetter(c3) && !isWeakLetter(c2)) return [...stem, WAW, NOON, FATHA]

    if (verb.form === 2 && isWeakLetter(c3)) return [...replaceVowelBeforeShadda(stem, DAMMA), WAW, NOON, FATHA]

    // Form V defective verbs: replace alif maqsura with waw + sukoon, add noon + fatḥa
    if (verb.form === 5 && c3 === YEH) return [...stem.slice(0, -1), WAW, SUKOON, NOON, FATHA]

    // Form VII defective verbs preserve final weak letter, add waw + noon + fatḥa
    if (verb.form === 7 && isWeakLetter(c3)) return [...stem, WAW, NOON, FATHA]

    if (isWeakLetter(c1) && isHamzatedLetter(c2) && isWeakLetter(c3)) {
      const hamzatedStem = stem.map((char) => (char === HAMZA_ON_YEH ? ALIF_HAMZA : char))
      return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(hamzatedStem), DAMMA), WAW, NOON, FATHA]
    }

    // Defective verbs (not doubly weak): drop final weak letter, replace final diacritic with damma, add waw + noon + fatḥa
    if (isWeakLetter(c3) && !isWeakLetter(c1))
      return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(stem), DAMMA), WAW, NOON, FATHA]

    return [...dropTerminalWeakOrHamza(stem), WAW, NOON, FATHA]
  },
  '2fp': (base, verb) => {
    const [c1, c2, c3] = [...verb.root]

    if (isFormIFinalWeakPresentA(verb)) return [...buildFormIFinalWeakPresentAStem(TEH, verb), YEH, SUKOON, NOON, FATHA]

    if (verb.form === 9) return buildFemininePlural(expandShadda(applyPresentPrefix(base, TEH)), verb)

    if (verb.form === 10 && c2 === c3)
      return buildFemininePlural([TEH, FATHA, SEEN, SUKOON, TEH, FATHA, c1, SUKOON, c2, KASRA, c3, DAMMA], verb)

    return buildFemininePlural(applyPresentPrefix(base, TEH), verb)
  },
  '3mp': (base, verb) => {
    const [c1, c2, c3] = [...verb.root]

    if (isFormIFinalWeakPresentA(verb)) return [...buildFormIFinalWeakPresentAStem(YEH, verb), WAW, SUKOON, NOON, FATHA]

    if (isHamzatedLetter(c3) && !isWeakLetter(c2)) return [...base, WAW, NOON, FATHA]

    if (verb.form === 2 && isWeakLetter(c3)) return [...replaceVowelBeforeShadda(base, DAMMA), WAW, NOON, FATHA]

    // Form V defective verbs: replace alif maqsura with waw + sukoon, add noon + fatḥa
    if (verb.form === 5 && c3 === YEH) return [...base.slice(0, -1), WAW, SUKOON, NOON, FATHA]

    // Form VII defective verbs preserve final weak letter, add waw + noon + fatḥa
    if (verb.form === 7 && isWeakLetter(c3)) return [...base, WAW, NOON, FATHA]

    if (isWeakLetter(c1) && isHamzatedLetter(c2) && isWeakLetter(c3)) {
      const hamzatedBase = base.map((char) => (char === HAMZA_ON_YEH ? ALIF_HAMZA : char))
      return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(hamzatedBase), DAMMA), WAW, NOON, FATHA]
    }

    // Defective verbs (not doubly weak): drop final weak letter, replace final diacritic with damma, add waw + noon + fatḥa
    if (isWeakLetter(c3) && !isWeakLetter(c1))
      return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(base), DAMMA), WAW, NOON, FATHA]

    return [...dropTerminalWeakOrHamza(base), WAW, NOON, FATHA]
  },
  '3fp': (base, verb) => {
    const [c1, c2, c3] = [...verb.root]

    if (isFormIFinalWeakPresentA(verb)) return [...buildFormIFinalWeakPresentAStem(YEH, verb), YEH, SUKOON, NOON, FATHA]

    if (verb.form === 9) return buildFemininePlural(expandShadda(base), verb)

    if (verb.form === 10 && c2 === c3)
      return buildFemininePlural([YEH, FATHA, SEEN, SUKOON, TEH, FATHA, c1, SUKOON, c2, KASRA, c3, DAMMA], verb)

    return buildFemininePlural(base, verb)
  },
}

function conjugatePresent(verb: Verb): Record<PronounId, string> {
  const base = derivePresentForms(verb)
  return mapRecord(PRESENT_BUILDERS, (build) => build(base, verb).join('').normalize('NFC'))
}

function dropNoonEnding(word: readonly string[]): readonly string[] {
  const chars = [...word]
  while (last(chars) === NOON || isDiacritic(last(chars))) chars.pop()
  return chars
}

function replaceDammaBeforeWawAlif(word: readonly string[]): readonly string[] {
  if (last(word) !== WAW) return word
  const stemBeforeWaw = word.slice(0, word.length - 1)
  return [...replaceFinalDiacritic(stemBeforeWaw, DAMMA), WAW, ALIF]
}

function replaceDiacriticBeforeFinalWaw(word: readonly string[], c2: string): readonly string[] {
  // Keep the long ū with wāw and seat it on an alif after dropping the nūn
  // For hollow verbs with middle ALIF, don't add sukoon before alif (e.g., كان → تَكُونُوا)
  // For other verbs, add sukoon before alif for consistency with imperative forms
  if (last(word) === WAW) {
    const stemBeforeWaw = word.slice(0, word.length - 1)
    const lastStemLetter = stemBeforeWaw.at(findLastLetterIndex(stemBeforeWaw))
    return c2 === ALIF ||
      (isHamzatedLetter(lastStemLetter) && !isWeakLetter(c2)) ||
      lastStemLetter === NOON ||
      (isWeakLetter(lastStemLetter) && !word.includes(ALIF_HAMZA))
      ? [...replaceFinalDiacritic(stemBeforeWaw, DAMMA), WAW, ALIF]
      : [...replaceFinalDiacritic(stemBeforeWaw, DAMMA), WAW, SUKOON, ALIF]
  }
  return word
}

function dropWeakLetterBeforeLastAlif(word: readonly string[]): readonly string[] {
  const prevBaseIdx = findLastLetterIndex(word, word.lastIndexOf(ALIF))
  if (isWeakLetter(word.at(prevBaseIdx))) return [...word.slice(0, prevBaseIdx), ALIF]
  return word
}

function conjugateSubjunctive(verb: Verb): Record<PronounId, string> {
  const letters = Array.from(verb.root)
  const [c1, c2, c3] = letters
  const isInitialHamza = isHamzatedLetter(c1)
  const isFinalWeak = isWeakLetter(c3)

  return mapRecord(
    mapRecord(conjugatePresent(verb), (indicative, pronounId) => {
      const word = Array.from(indicative)
      const isDual = ['2d', '3md', '3fd'].includes(pronounId)
      const isSecondFeminineSingular = pronounId === '2fs'
      const isMasculinePlural = pronounId === '2mp' || pronounId === '3mp'
      const isFemininePlural = pronounId === '2fp' || pronounId === '3fp'

      if (isDual) return collapseHamzaAlif(dropNoonEnding(word))

      if (verb.form === 1 && isWeakLetter(c3) && resolveFormIPresentVowel(verb) === 'a') {
        if (isSecondFeminineSingular) return replaceFinalDiacritic(dropNoonEnding(word), SUKOON)
        if (isMasculinePlural && last(dropNoonEnding(word)) === WAW)
          return [...replaceFinalDiacritic(dropNoonEnding(word), SUKOON), ALIF]
        if (isMasculinePlural) return dropNoonEnding(word)
        if (isFemininePlural || last(word) === ALIF_MAQSURA) return word
      }

      if (isMasculinePlural && verb.form === 2 && isHamzatedLetter(c1) && isWeakLetter(c2))
        return replaceDammaBeforeWawAlif(dropNoonEnding(word))

      if (isMasculinePlural && verb.form === 1 && resolveFormIPresentVowel(verb) === 'u')
        return replaceDammaBeforeWawAlif(dropNoonEnding(word))

      if (
        isMasculinePlural &&
        verb.form === 1 &&
        isInitialHamza &&
        !isFinalWeak &&
        resolveFormIPresentVowel(verb) === 'i'
      )
        return replaceDammaBeforeWawAlif(dropNoonEnding(word))

      if (isSecondFeminineSingular || isMasculinePlural) return replaceDiacriticBeforeFinalWaw(dropNoonEnding(word), c2)

      return replaceFinalDiacritic(word, FATHA)
    }),
    (letters) => letters.join('').normalize('NFC'),
  )
}

function conjugateJussive(verb: Verb): Record<PronounId, string> {
  const letters = Array.from(verb.root)
  const [c1, c2, c3] = letters
  const lastRoot = last(letters)
  const isInitialHamza = c1 === ALIF_HAMZA
  const isMiddleWeak = isWeakLetter(c2) || (letters.length === 4 && isWeakLetter(c3))
  const isFinalWeak = isWeakLetter(lastRoot)
  const isFinalHamza = isHamzatedLetter(lastRoot)
  const isGeminate = c2 === c3

  return mapRecord(
    mapRecord(conjugatePresent(verb), (indicative, pronounId) => {
      const word = Array.from(indicative)
      const isDual = ['2d', '3md', '3fd'].includes(pronounId)
      const isSecondFeminineSingular = pronounId === '2fs'
      const isMasculinePlural = pronounId === '2mp' || pronounId === '3mp'
      const isFemininePlural = pronounId === '2fp' || pronounId === '3fp'
      const isPlural = isMasculinePlural || isFemininePlural

      // Form V defective verbs: preserve weak letter in jussive (unlike other defective verbs)
      if (verb.form === 5 && isFinalWeak) {
        const last = dropNoonEnding(word).at(-1)

        if (last === YEH && isFemininePlural) return [...dropNoonEnding(word), SUKOON, NOON, FATHA]

        if (last === YEH && (isSecondFeminineSingular || isMasculinePlural)) return [...dropNoonEnding(word), SUKOON]

        if (last === WAW && (isSecondFeminineSingular || isPlural)) return [...dropNoonEnding(word), SUKOON, ALIF]

        if (isDual) return dropNoonEnding(word)

        return dropFinalDefectiveGlide(word)
      }

      if (verb.form === 1 && isFormIFinalWeakPresentA(verb)) {
        if (isDual) return dropNoonEnding(word)
        if (isSecondFeminineSingular) return replaceFinalDiacritic(dropNoonEnding(word), SUKOON)
        if (isMasculinePlural && last(dropNoonEnding(word)) === WAW)
          return [...replaceFinalDiacritic(dropNoonEnding(word), SUKOON), ALIF]
        if (isMasculinePlural) return dropNoonEnding(word)
        if (isFemininePlural) return word
      }

      if (isMasculinePlural && verb.form === 2 && isInitialHamza && isWeakLetter(c2))
        return replaceDammaBeforeWawAlif(dropNoonEnding(word))

      if (verb.form === 1 && isFinalHamza && isMasculinePlural) return replaceDammaBeforeWawAlif(dropNoonEnding(word))

      if (isMasculinePlural && verb.form === 1 && resolveFormIPresentVowel(verb) === 'u')
        return replaceDammaBeforeWawAlif(dropNoonEnding(word))

      if (
        isMasculinePlural &&
        verb.form === 1 &&
        isInitialHamza &&
        !isFinalWeak &&
        resolveFormIPresentVowel(verb) === 'i'
      )
        return replaceDammaBeforeWawAlif(dropNoonEnding(word))

      // Dual forms: Form I defective verbs keep the weak letter before alif; hollow verbs drop it
      if (isDual) {
        if (verb.form === 1 && isFinalWeak) return dropNoonEnding(word)
        return dropWeakLetterBeforeLastAlif(dropNoonEnding(word))
      }

      if (isSecondFeminineSingular || isMasculinePlural) return replaceDiacriticBeforeFinalWaw(dropNoonEnding(word), c2)

      // Initial hamza + middle weak + final weak: don't shorten hollow, just drop final weak
      if (isInitialHamza && isMiddleWeak && isFinalWeak) return dropFinalDefectiveGlide(word)

      // Hollow verb with final hamza: shorten hollow and drop hamza, seat it on yeh
      if (isMiddleWeak && isFinalHamza)
        return replaceFinalDiacritic(dropTerminalWeakOrHamza(shortenHollowStem(word)), SUKOON)

      const stem =
        HOLLOW_APOCOPE_FORMS.has(verb.form) && isWeakLetter(c2) && !isFinalWeak ? shortenHollowStem(word) : word

      if (isFinalWeak) return dropFinalDefectiveGlide(stem)

      if (verb.form === 4 && isGeminate) return replaceFinalDiacritic(stem, FATHA)

      if (verb.form === 10 && isGeminate) return replaceFinalDiacritic(stem, FATHA)

      if (verb.form === 1 && isGeminate && resolveFormIPresentVowel(verb) === 'i')
        return replaceFinalDiacritic(stem, FATHA)

      // Form IX verbs use fatḥa in jussive (same as subjunctive), not sukoon
      if (verb.form === 9) return replaceFinalDiacritic(stem, FATHA)

      // Feminine plurals use fatḥa in jussive (same as subjunctive), not sukoon
      if (isFemininePlural) return replaceFinalDiacritic(stem, FATHA)

      return replaceFinalDiacritic(stem, SUKOON)
    }),
    (letters) => letters.join('').normalize('NFC'),
  )
}

export function conjugatePresentMood(verb: Verb, mood: Mood): Record<PronounId, string> {
  if (mood === 'indicative') return conjugatePresent(verb)
  if (mood === 'subjunctive') return conjugateSubjunctive(verb)
  if (mood === 'jussive') return conjugateJussive(verb)
  throw new Error(`Unknown mood: ${mood}`)
}

function deriveQuadriliteralPresentForms(verb: Verb): readonly string[] {
  const [c1, c2, c3, c4] = [...verb.root]
  const isInitialHamza = isHamzatedLetter(c1)
  const isFinalWeak = isWeakLetter(c4)
  const isFinalHamza = isHamzatedLetter(c4)

  switch (verb.form) {
    case 4: {
      // Form IV quadriliteral: initial hamza + final weak (e.g., أنشأ → ينشئ)
      if (isInitialHamza && (isFinalWeak || isFinalHamza)) {
        // Initial hamza drops in Form IV quadriliterals, final weak becomes hamza on yeh
        const finalGlide = c4 === ALIF_MAQSURA || c4 === ALIF_HAMZA ? HAMZA_ON_YEH : weakLetterGlide(c4)
        return [YEH, DAMMA, c2, SUKOON, c3, KASRA, finalGlide, DAMMA]
      }
      // Default Form IV quadriliteral pattern
      const seatedC1 = c1 === ALIF_HAMZA ? HAMZA_ON_WAW : c1
      return [YEH, DAMMA, seatedC1, SUKOON, c2, KASRA, c3, FATHA, c4, DAMMA]
    }

    default: {
      // Default to Form I quadriliteral pattern
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
  const pastVowel = resolveFormIPastVowel(verb)
  const patternVowel = resolveFormIPresentVowel(verb)

  // Geminate Form I: use pattern vowel when it is ḍamma (e.g., يَقُرُّ), otherwise keep the default stem.
  if (c2 === c3) {
    if (patternVowel === 'u') return [YEH, FATHA, c1, DAMMA, c2, SHADDA, DAMMA]
    if (patternVowel === 'i') return [YEH, FATHA, c1, KASRA, c2, SHADDA, DAMMA]
    return [YEH, DAMMA, c1, KASRA, c2, SHADDA, DAMMA]
  }

  // Initial weak + final weak (e.g., وقي → يقي, ولى → يلي)
  // Initial waw drops, final weak remains with short vowel on c2
  // ALIF_MAQSURA becomes YEH in present tense, no trailing case vowel on 3ms base
  if (isInitialWeak && isFinalWeak) {
    const seatedC2 = isHamzatedLetter(c2)
      ? patternVowel === 'i'
        ? HAMZA_ON_YEH
        : patternVowel === 'u'
          ? HAMZA_ON_WAW
          : c2
      : c2
    return [YEH, FATHA, seatedC2, shortVowelFromPattern(patternVowel), defectiveLetterGlide(c3)]
  }

  // Doubly weak (middle weak + final weak): treat as defective, not hollow (e.g., رَوِيَ → يَرْوِي)
  if (isMiddleWeak && isFinalWeak)
    return [YEH, FATHA, c1, SUKOON, c2, shortVowelFromPattern(patternVowel), defectiveLetterGlide(c3)]

  // Initial weak (assimilated) verbs drop the leading wāw in the present (e.g., وصل → يَصِلُ)
  if (isInitialWeak) return [YEH, FATHA, c2, shortVowelFromPattern(patternVowel), c3, DAMMA]

  // Initial hamza + middle weak + final weak (e.g., أتى → يأتي, أوي → يأوي)
  // Initial hamza is kept in triliteral verbs, middle weak becomes long vowel, final weak remains
  if (isInitialHamza && isMiddleWeak && isFinalWeak)
    return [YEH, FATHA, ALIF_HAMZA, SUKOON, hollowLetterGlide(c2), KASRA, defectiveLetterGlide(c3)]

  // Initial hamza + final weak (e.g., أتى → يأتي, أوي → يأوي)
  // Initial hamza is kept in triliteral verbs, final weak remains
  if (isInitialHamza && isFinalWeak)
    return [YEH, FATHA, ALIF_HAMZA, SUKOON, c2, shortVowelFromPattern(patternVowel), defectiveLetterGlide(c3)]

  // Initial hamza only (e.g., أكل → يأكل)
  if (isInitialHamza) return [YEH, FATHA, c1, SUKOON, c2, shortVowelFromPattern(patternVowel), c3, DAMMA]

  // Middle hamza + final weak (e.g., رَأَى → يَرَى)
  if (isMiddleHamza && isFinalWeak) return [YEH, FATHA, c1, FATHA, ALIF_MAQSURA]

  // Hollow verbs with middle ALIF always use long WAW vowel
  if (c2 === ALIF) return [YEH, FATHA, c1, ...longVowelFromPattern('u'), c3, DAMMA]

  // Hollow verbs with middle YEH use long YEH vowel
  if (c2 === YEH) return [YEH, FATHA, c1, ...longVowelFromPattern('i'), c3, DAMMA]

  // Other hollow verbs use vowel from pattern
  if (isMiddleWeak) return [YEH, FATHA, c1, ...longVowelFromPattern(patternVowel), c3, DAMMA]

  // Special case: fa3ala-yaf3alu pattern (past 'a' + present 'a') with final WAW uses damma instead of long vowel (e.g., غدو → يَغْدُو)
  if (pastVowel === 'a' && patternVowel === 'a' && c3 === WAW) return [YEH, FATHA, c1, SUKOON, c2, DAMMA, c3]

  // Final-weak Form I with present vowel 'a' takes alif maqsura in 3ms (e.g., بَقِيَ → يَبْقَى)
  if (isFinalWeak && patternVowel === 'a' && (c3 === YEH || c3 === ALIF_MAQSURA))
    return [YEH, FATHA, c1, SUKOON, c2, FATHA, ALIF_MAQSURA]

  // For defective verbs ending in ي, use kasra before the final ي; for و, use damma
  if (c3 === YEH || c3 === ALIF_MAQSURA) return [YEH, FATHA, c1, SUKOON, c2, KASRA, defectiveLetterGlide(c3)]

  // Defective verbs (final weak only): final weak letter remains, no trailing damma (e.g., رَمَى → يَرْمِي)
  if (isFinalWeak) return [YEH, FATHA, c1, SUKOON, c2, DAMMA, defectiveLetterGlide(c3)]

  // Regular strong verb
  return [YEH, FATHA, c1, SUKOON, c2, shortVowelFromPattern(patternVowel), c3, DAMMA]
}

function derivePresentFormII(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isFinalWeak = isWeakLetter(c3)
  const seatedC1 = c1 === ALIF_HAMZA ? HAMZA_ON_WAW : c1
  // Geminate Form II: c2 === c3, fatḥa on c1, kasra then shadda on c2, then c3 (e.g., يُحَبِّبُ)
  if (c2 === c3) return [YEH, DAMMA, seatedC1, FATHA, c2, KASRA, SHADDA, c3, DAMMA]

  // Defective Form II verbs don't have final ḍamma
  if (isFinalWeak) return [YEH, DAMMA, seatedC1, FATHA, c2, KASRA, SHADDA, c3]

  return [YEH, DAMMA, seatedC1, FATHA, c2, KASRA, SHADDA, c3, DAMMA]
}

function derivePresentFormIII(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const seatedC2 = isHamzatedLetter(c2) ? HAMZA_ON_YEH : c2
  return [YEH, DAMMA, c1, FATHA, ALIF, seatedC2, KASRA, c3, DAMMA]
}

function derivePresentFormIV(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isInitialHamza = c1 === ALIF_HAMZA
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)

  // Geminate Form IV (e.g., يُحِبُّ) carries shadda on the doubled radical
  if (c2 === c3) return [YEH, DAMMA, c1, KASRA, c2, SHADDA, DAMMA]

  // Initial hamza + middle weak + final weak (e.g., أوي → يُؤْوِي)
  if (isInitialHamza && isMiddleWeak && isFinalWeak)
    return [YEH, DAMMA, HAMZA_ON_WAW, SUKOON, hollowLetterGlide(c2), KASRA, weakLetterGlide(c3)]

  // Seat initial hamza on wāw after ḍamma (e.g., يُؤْمِنُ)
  const seatedC1 = c1 === ALIF_HAMZA ? HAMZA_ON_WAW : c1
  const seatedC3 = c3 === ALIF_HAMZA ? HAMZA_ON_YEH : c3

  // For defective Form IV verbs, final و becomes yeh in present tense (e.g., يُمْسِي)
  if (isFinalWeak) return [YEH, DAMMA, seatedC1, SUKOON, c2, KASRA, c3 === WAW ? YEH : weakLetterGlide(c3)]

  // Hollow Form IV present: kasra on c1, long ī from c2 (e.g., يُقِيمُ)
  if (isMiddleWeak) return [YEH, DAMMA, seatedC1, KASRA, YEH, seatedC3, DAMMA]

  return [YEH, DAMMA, seatedC1, SUKOON, c2, KASRA, seatedC3, DAMMA]
}

function derivePresentFormV(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]

  // Form V defective: final ي becomes ى (alif maqsura) in present tense (e.g., تَوَفَّى → يَتَوَفَّى)
  if (c3 === YEH) return [YEH, FATHA, TEH, FATHA, c1, FATHA, c2, FATHA, SHADDA, ALIF_MAQSURA]

  return [YEH, FATHA, TEH, FATHA, c1, FATHA, c2, SHADDA, FATHA, c3, DAMMA]
}

function derivePresentFormVI(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const seatedC2 = isHamzatedLetter(c2) ? HAMZA : c2
  if (c2 === c3) return [YEH, FATHA, TEH, FATHA, c1, FATHA, ALIF, c2, SHADDA, DAMMA]
  return [YEH, FATHA, TEH, FATHA, c1, FATHA, ALIF, seatedC2, FATHA, c3, DAMMA]
}

function derivePresentFormVII(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)

  // Defective Form VII verbs don't have final ḍamma
  if (isMiddleWeak && isFinalWeak) return [YEH, FATHA, NOON, SUKOON, c1, FATHA, ALIF, c3]

  if (isMiddleWeak) return [YEH, FATHA, NOON, SUKOON, c1, FATHA, ALIF, c3, DAMMA]

  // Defective Form VII verbs don't have final ḍamma
  if (isFinalWeak)
    return [YEH, FATHA, NOON, SUKOON, c1, FATHA, c2, c3 === YEH || c3 === ALIF_MAQSURA ? KASRA : DAMMA, c3]

  return [YEH, FATHA, NOON, SUKOON, c1, FATHA, c2, KASRA, c3, DAMMA]
}

function derivePresentFormVIII(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]

  if (isHamzatedLetter(c1)) return [YEH, FATHA, TEH, SHADDA, FATHA, c2, KASRA, c3, DAMMA]

  if (c1 === WAW) return [YEH, FATHA, TEH, SHADDA, FATHA, c2, KASRA, c3, DAMMA]

  if (isWeakLetter(c2)) return [YEH, FATHA, c1, SUKOON, TEH, FATHA, ALIF, c3, DAMMA]

  return [YEH, FATHA, c1, SUKOON, TEH, FATHA, c2, KASRA, c3, DAMMA]
}

function derivePresentFormIX(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  return [YEH, FATHA, c1, SUKOON, c2, FATHA, c3, SHADDA, DAMMA]
}

function derivePresentFormX(verb: Verb): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const isMiddleWeak = isWeakLetter(c2)
  const seatedC2 = isHamzatedLetter(c2) ? HAMZA_ON_YEH : c2
  const seatedC3 = isHamzatedLetter(c3) ? HAMZA_ON_YEH : c3

  if (c2 === c3) return [YEH, FATHA, SEEN, SUKOON, TEH, FATHA, c1, KASRA, c2, SHADDA, DAMMA]

  // Hollow Form X present (e.g., يَسْتَضِيفُ)
  if (isMiddleWeak) return [YEH, FATHA, SEEN, SUKOON, TEH, FATHA, c1, KASRA, YEH, seatedC3, DAMMA]

  return [YEH, FATHA, SEEN, SUKOON, TEH, FATHA, c1, SUKOON, seatedC2, KASRA, seatedC3, DAMMA]
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
  for (let i = 0; i < word.length - 1; i += 1) {
    if (word[i + 1] === SHADDA && !isDiacritic(word[i]))
      // Expand shadda: replace letter + shadda with letter + vowel + letter
      return [...word.slice(0, i + 1), FATHA, word[i], ...word.slice(i + 2)]
  }
  return word
}

function dropTerminalWeakOrHamza(word: readonly string[]): readonly string[] {
  const lastLetterIndex = findLastLetterIndex(word)
  const last = word.at(lastLetterIndex)

  if (isHamzatedLetter(last))
    return [...word.slice(0, lastLetterIndex), HAMZA_ON_YEH, ...word.slice(lastLetterIndex + 1)]

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

  const chars = removeTrailingDiacritics(word)

  if (isWeakLetter(last(chars))) return chars.slice(0, -1)

  return replaceFinalDiacritic(word, SUKOON)
}

function collapseHamzaAlif(word: readonly string[]): readonly string[] {
  const hamzaIndex = word.findIndex((char, index) => char === ALIF_HAMZA && word[index + 1] === FATHA)
  if (hamzaIndex < 0 || word.at(hamzaIndex + 2) !== ALIF) return word
  return [...word.slice(0, hamzaIndex), ALIF_MADDA, ...word.slice(hamzaIndex + 3)]
}

function applyPresentPrefix(chars: readonly string[], prefix: string): readonly string[] {
  const remainder = chars.slice(1)
  const carriedDiacritics: string[] = []

  // Carry over any prefix diacritics (e.g., fatḥa from the base "ya-")
  while (isDiacritic(remainder.at(0))) {
    const mark = remainder.shift()
    if (mark) carriedDiacritics.push(mark)
  }

  // If we're adding hamza prefix to a hamza-initial stem (e.g., آذَنُ, آكُلُ)
  if (prefix === ALIF_HAMZA && remainder.at(0) === ALIF_HAMZA) {
    // Drop the stem hamza and any diacritics attached to it (e.g., sukoon)
    remainder.shift()
    return [ALIF_MADDA, ...removeLeadingDiacritics(remainder)]
  }

  return [prefix, ...carriedDiacritics, ...remainder]
}
