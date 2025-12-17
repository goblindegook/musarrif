import { mapRecord } from '../../primitives/objects'
import { resolveFormIPresentVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_MADDA,
  ALIF_MAQSURA,
  DAMMA,
  FATHA,
  HAMZA,
  HAMZA_ON_WAW,
  HAMZA_ON_YEH,
  isDiacritic,
  isHamzatedLetter,
  isWeakLetter,
  KASRA,
  longVowelFromPattern,
  NOON,
  removeLeadingDiacritics,
  removeTrailingDiacritics,
  SEEN,
  SHADDA,
  SUKOON,
  shortVowelFromPattern,
  stripTrailingDiacritics,
  TEH,
  WAW,
  weakLetterGlide,
  YEH,
} from '../letters'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
export type Mood = 'indicative' | 'subjunctive' | 'jussive'

function finalLetterGlide(letter: string): string {
  return letter === WAW ? WAW : letter === YEH ? YEH : ALIF_MAQSURA
}

function hollowLetterGlide(letter: string): string {
  return letter === WAW ? WAW : letter === YEH ? YEH : ALIF
}

const HOLLOW_JUSSIVE_APOCOPE_PRONOUNS: ReadonlySet<PronounId> = new Set(['1s', '1p', '2ms', '3ms', '3fs', '2pf', '3pf'])
const HOLLOW_APOCOPE_FORMS: ReadonlySet<Verb['form']> = new Set([1, 4, 7, 8, 10])

const PRESENT_DUAL_SUFFIX = [ALIF, NOON, KASRA]
const PRESENT_MASC_PLURAL_SUFFIX = [WAW, NOON, FATHA]
const PRESENT_FEM_PLURAL_SUFFIX = [NOON, FATHA]

const PRESENT_BUILDERS: Record<PronounId, (base: readonly string[], verb: Verb) => readonly string[]> = {
  '1s': (base) => applyPresentPrefix(base, ALIF_HAMZA),
  '2ms': (base) => applyPresentPrefix(base, TEH),
  '2fs': (base, verb) => {
    const [, c2, c3] = [...verb.root]
    const stem = applyPresentPrefix(base, TEH)
    if (isWeakLetter(c2) && isHamzatedLetter(c3)) {
      // Replace final hamza with hamza on yeh, add kasra + yeh + noon + fatḥa
      return [...stripTrailingDiacritics(dropTerminalWeakOrHamza(stem)), KASRA, YEH, NOON, FATHA]
    }
    return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(stem), KASRA), YEH, SUKOON, NOON, FATHA]
  },
  '3ms': (base) => base,
  '3fs': (base) => applyPresentPrefix(base, TEH),
  '2d': (base, _verb) => {
    return [
      ...replaceFinalDiacritic(dropTerminalWeakOrHamza(applyPresentPrefix(base, TEH)), FATHA),
      ...PRESENT_DUAL_SUFFIX,
    ]
  },
  '3dm': (base, _verb) => {
    return [...replaceFinalDiacritic(dropTerminalWeakOrHamza(base), FATHA), ...PRESENT_DUAL_SUFFIX]
  },
  '3df': (base, _verb) => {
    return [
      ...replaceFinalDiacritic(dropTerminalWeakOrHamza(applyPresentPrefix(base, TEH)), FATHA),
      ...PRESENT_DUAL_SUFFIX,
    ]
  },
  '1p': (base) => applyPresentPrefix(base, NOON),
  '2pm': (base) => {
    const stem = applyPresentPrefix(base, TEH)
    const processed = dropTerminalWeakOrHamza(stem)
    return [...processed, ...PRESENT_MASC_PLURAL_SUFFIX]
  },
  '2pf': (base, verb) => {
    const [, c2, c3] = [...verb.root]
    const stem = applyPresentPrefix(base, TEH)
    const expanded = verb.form === 9 ? expandShadda(stem) : stem
    // For defective verbs, keep the final weak letter
    if (isWeakLetter(c3) && !isWeakLetter(c2))
      return [...stripTrailingDiacritics(expanded), SUKOON, ...PRESENT_FEM_PLURAL_SUFFIX]

    const processed = dropTerminalWeakOrHamza(expanded)
    const stripped = stripTrailingDiacritics(processed)
    // For hollow verbs with final hamza, remove the yeh before HAMZA_ON_YEH
    if (isWeakLetter(c2) && isHamzatedLetter(c3) && stripped.at(-1) === HAMZA_ON_YEH && stripped.at(-2) === YEH)
      return [...stripped.slice(0, -2), HAMZA_ON_YEH, SUKOON, ...PRESENT_FEM_PLURAL_SUFFIX]

    return [...replaceFinalDiacritic(processed, SUKOON), ...PRESENT_FEM_PLURAL_SUFFIX]
  },
  '3pm': (base) => {
    return [...dropTerminalWeakOrHamza(base), ...PRESENT_MASC_PLURAL_SUFFIX]
  },
  '3pf': (base, verb) => {
    const [, c2, c3] = [...verb.root]
    const expanded = verb.form === 9 ? expandShadda(base) : base
    // For defective verbs, keep the final weak letter
    if (isWeakLetter(c3) && !isWeakLetter(c2))
      return [...stripTrailingDiacritics(expanded), SUKOON, ...PRESENT_FEM_PLURAL_SUFFIX]

    const processed = dropTerminalWeakOrHamza(expanded)
    const stripped = stripTrailingDiacritics(processed)
    // For hollow verbs with final hamza, remove the yeh before HAMZA_ON_YEH
    if (isWeakLetter(c2) && isHamzatedLetter(c3) && stripped.at(-1) === HAMZA_ON_YEH && stripped.at(-2) === YEH)
      return [...stripped.slice(0, -2), HAMZA_ON_YEH, SUKOON, ...PRESENT_FEM_PLURAL_SUFFIX]

    return [...replaceFinalDiacritic(processed, SUKOON), ...PRESENT_FEM_PLURAL_SUFFIX]
  },
}

function conjugatePresent(verb: Verb): Record<PronounId, string> {
  const base = buildPresentBase(verb)
  return mapRecord(PRESENT_BUILDERS, (build) => build(base, verb).join(''))
}

function dropNoonEnding(word: readonly string[], indicative: string): readonly string[] {
  const chars = [...removeTrailingDiacritics(word)]

  if (chars[chars.length - 1] !== NOON) return Array.from(indicative)

  // Drop the nūn itself
  chars.pop()

  while (chars.at(-1) === SUKOON) chars.pop()

  let lastBaseIndex = chars.length - 1
  while (lastBaseIndex >= 0 && isDiacritic(chars[lastBaseIndex])) lastBaseIndex -= 1
  const trailing = chars.slice(lastBaseIndex + 1)
  const prefix = chars.slice(0, lastBaseIndex + 1)

  if (chars[lastBaseIndex] === WAW) {
    // Keep the long ū with wāw and seat it on an alif after dropping the nūn
    const stemBeforeWaw = chars.slice(0, lastBaseIndex)
    const stemWithDamma = replaceFinalDiacritic(stemBeforeWaw, DAMMA)
    return [...stemWithDamma, WAW, ALIF]
  }

  return [...prefix, ...trailing]
}

function conjugateSubjunctive(verb: Verb): Record<PronounId, string> {
  return mapRecord(
    mapRecord(conjugatePresent(verb), (indicative, pronounId) => {
      const word = Array.from(indicative)

      const shouldDropNoon = ['2fs', '2d', '2pm', '3dm', '3df', '3pm'].includes(pronounId)
      if (shouldDropNoon) return dropNoonEnding(word, indicative)

      return replaceFinalDiacritic(word, FATHA)
    }),
    (letters) => letters.join(''),
  )
}

function conjugateJussive(verb: Verb): Record<PronounId, string> {
  const letters = Array.from(verb.root)
  const [c1, c2, c3] = letters
  const isInitialHamza = c1 === ALIF_HAMZA
  const isMiddleWeak = isWeakLetter(c2) || (letters.length === 4 && isWeakLetter(letters[2]))
  const isFinalWeak = isWeakLetter(verb.root.at(-1))
  const isFinalHamza = isHamzatedLetter(c3)

  return mapRecord(
    mapRecord(conjugatePresent(verb), (indicative, pronounId) => {
      const word = Array.from(indicative)

      // Don't call dropTerminalWeakOrHamza here - it would remove suffix letters
      // The hamza/weak letter was already handled in the builder
      const shouldDropNoon = ['2fs', '2d', '2pm', '3dm', '3df', '3pm'].includes(pronounId)
      if (shouldDropNoon) return dropNoonEnding(word, indicative)

      // Initial hamza + middle weak + final weak: don't shorten hollow, just drop final weak
      if (isInitialHamza && isMiddleWeak && isFinalWeak) return dropFinalDefectiveGlide(word)

      // Hollow verb with final hamza: shorten hollow and drop hamza, seat it on yeh
      if (!isInitialHamza && isMiddleWeak && isFinalHamza) {
        const shouldShortenHollow =
          HOLLOW_APOCOPE_FORMS.has(verb.form) && HOLLOW_JUSSIVE_APOCOPE_PRONOUNS.has(pronounId)
        const stem = shouldShortenHollow ? shortenHollowStem(word, c2) : word
        return replaceFinalDiacritic(dropTerminalWeakOrHamza(stem), SUKOON)
      }

      const shouldShortenHollow =
        (HOLLOW_APOCOPE_FORMS.has(verb.form) || (verb.form === 3 && c2 === ALIF)) &&
        HOLLOW_JUSSIVE_APOCOPE_PRONOUNS.has(pronounId) &&
        isWeakLetter(c2)
      const stem = shouldShortenHollow ? shortenHollowStem(word, c2) : word

      if (isWeakLetter(verb.root.at(-1))) return dropFinalDefectiveGlide(stem)

      // Form IX verbs use fatḥa in jussive (same as subjunctive), not sukoon
      if (['2pf', '3pf'].includes(pronounId) || verb.form === 9) return replaceFinalDiacritic(stem, FATHA)

      return replaceFinalDiacritic(stem, SUKOON)
    }),
    (letters) => letters.join(''),
  )
}

export function conjugatePresentMood(verb: Verb, mood: Mood): Record<PronounId, string> {
  if (mood === 'indicative') return conjugatePresent(verb)
  if (mood === 'subjunctive') return conjugateSubjunctive(verb)
  if (mood === 'jussive') return conjugateJussive(verb)
  throw new Error(`Unknown mood: ${mood}`)
}

function normalizeDefectivePresent(base: readonly string[], c3: string): readonly string[] {
  if (!isWeakLetter(c3)) return base

  const chars = [...removeTrailingDiacritics(base)]
  if (chars.length === 0) return base

  const last = chars.pop()
  if (!last) return base

  // Drop the radical and any trailing diacritics we already stripped, append glide
  return last === c3 ? [...chars, weakLetterGlide(c3)] : [...chars, last, weakLetterGlide(c3)]
}

function buildPresentBase(verb: Verb): readonly string[] {
  const letters = [...verb.root]

  if (letters.length < 3) throw new Error('Root must have at least 3 letters.')

  // Handle quadriliteral and longer roots
  if (letters.length === 4) {
    const [c1, c2, c3, c4] = letters
    const isInitialHamza = c1 === ALIF_HAMZA
    const isFinalWeak = isWeakLetter(c4)

    switch (verb.form) {
      case 2:
        return [YEH, FATHA, TEH, FATHA, c1, FATHA, c2, SUKOON, c3, FATHA, c4, DAMMA]

      case 4: {
        // Form IV quadriliteral: initial hamza + final weak (e.g., أنشأ → ينشئ)
        if (isInitialHamza && (isFinalWeak || c4 === ALIF_HAMZA)) {
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

  // Handle 5+ letter roots
  if (letters.length >= 5) {
    const [c1, ...rest] = letters
    const middle = rest.slice(0, -1).join(SUKOON)
    const last = rest.at(-1) ?? ''
    return [YEH, FATHA, c1, SUKOON, middle, SUKOON, last, DAMMA]
  }

  // Triliteral roots (3 letters)
  const [c1, c2, c3] = letters
  const isInitialHamza = c1 === ALIF_HAMZA
  const isInitialWeak = isWeakLetter(c1)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)

  switch (verb.form) {
    case 1: {
      const patternVowel = resolveFormIPresentVowel(verb)

      // Initial weak + final weak (e.g., وقي → يقي, ولى → يلي)
      if (isInitialWeak && !isMiddleWeak && isFinalWeak) {
        // Initial waw drops, final weak remains with short vowel on c2
        // ALIF_MAQSURA becomes YEH in present tense, no trailing case vowel on 3ms base
        const finalGlide = c3 === ALIF_MAQSURA ? YEH : c3 === YEH ? YEH : WAW
        return [YEH, FATHA, c2, shortVowelFromPattern(patternVowel), finalGlide]
      }

      // Initial weak + middle weak (e.g., وعد → يعد)
      if (isInitialWeak && isMiddleWeak && !isFinalWeak)
        // Initial waw drops, middle weak handled as hollow
        return normalizeDefectivePresent(
          patternVowel === 'a'
            ? [YEH, FATHA, ALIF, c3, DAMMA]
            : [YEH, FATHA, shortVowelFromPattern(patternVowel), longVowelFromPattern(patternVowel), SUKOON, c3, DAMMA],
          c3,
        )

      // Doubly weak (middle wāw, final yā') keeps the glide and takes kasra before yā': يَحْوِي
      if (!isInitialWeak && !isInitialHamza && c2 === WAW && c3 === YEH) return [YEH, FATHA, c1, SUKOON, c2, KASRA, YEH]

      // Middle hamza + final weak (e.g., رَأَى → يَرَى)
      if (!isInitialWeak && !isInitialHamza && c2 === ALIF_HAMZA && isFinalWeak)
        return [YEH, FATHA, c1, FATHA, ALIF_MAQSURA]

      // Final-weak (defective) Form I: glide remains, no trailing case vowel on 3ms base
      if (!isInitialWeak && !isInitialHamza && !isMiddleWeak && isFinalWeak)
        return [YEH, FATHA, c1, SUKOON, c2, longVowelFromPattern(patternVowel), finalLetterGlide(c3)]

      // Hollow verbs with final hamza (e.g., جيء → يَجِيءُ)
      // When middle radical is ya, always use kasra regardless of pattern
      if (!isInitialWeak && !isInitialHamza && isMiddleWeak && (c3 === ALIF_HAMZA || c3 === HAMZA)) {
        const shortVowel = c2 === YEH ? KASRA : shortVowelFromPattern(patternVowel)
        const longVowel = c2 === YEH ? YEH : longVowelFromPattern(patternVowel)
        return [YEH, FATHA, c1, shortVowel, longVowel, c3, DAMMA]
      }

      // Hollow verbs (middle weak letter wāw or yā' written as long vowel)
      if (!isInitialWeak && !isInitialHamza && isMiddleWeak && !isFinalWeak)
        return normalizeDefectivePresent(
          patternVowel === 'a'
            ? // e.g., يَنَامُ
              [YEH, FATHA, c1, FATHA, ALIF, c3, DAMMA]
            : // e.g., يَقُومُ / يَبِيعُ
              [
                YEH,
                FATHA,
                c1,
                shortVowelFromPattern(patternVowel),
                longVowelFromPattern(patternVowel),
                SUKOON,
                c3,
                DAMMA,
              ],
          c3,
        )

      // Initial weak (assimilated) verbs drop the leading wāw in the present (e.g., وصل → يَصِلُ)
      if (isInitialWeak && !isMiddleWeak && !isFinalWeak)
        return [YEH, FATHA, c2, shortVowelFromPattern(patternVowel), c3, DAMMA]

      // Initial hamza + middle weak + final weak (e.g., أوي → يأوي)
      if (isInitialHamza && isMiddleWeak && isFinalWeak) {
        // Initial hamza is kept in triliteral verbs, middle weak becomes long vowel, final weak remains
        const finalGlide = c3 === ALIF_MAQSURA || c3 === YEH ? YEH : WAW
        return [YEH, FATHA, ALIF_HAMZA, SUKOON, hollowLetterGlide(c2), KASRA, finalGlide]
      }

      // Initial hamza + final weak (e.g., أتى → يأتي)
      if (isInitialHamza && !isMiddleWeak && isFinalWeak) {
        // Initial hamza is kept in triliteral verbs, final weak remains with short vowel on c2
        // No trailing case vowel on 3ms base for final weak verbs
        const finalGlide = c3 === ALIF_MAQSURA || c3 === YEH ? YEH : WAW
        return [YEH, FATHA, ALIF_HAMZA, SUKOON, c2, shortVowelFromPattern(patternVowel), finalGlide]
      }

      // Geminate Form I: if c2 === c3, ḍamma on prefix, kasra on c1, shadda on c2 (e.g., يُحِبُّ)
      if (c2 === c3) return [YEH, DAMMA, c1, KASRA, c2, SHADDA, DAMMA]

      // Initial hamza only (e.g., أكل → يأكل)
      if (isInitialHamza && !isMiddleWeak && !isFinalWeak)
        return normalizeDefectivePresent(
          [YEH, FATHA, c1, SUKOON, c2, shortVowelFromPattern(patternVowel), c3, DAMMA],
          c3,
        )

      // Regular strong verb
      return normalizeDefectivePresent([YEH, FATHA, c1, SUKOON, c2, shortVowelFromPattern(patternVowel), c3, DAMMA], c3)
    }

    case 2:
      // Geminate Form II: c2 === c3, fatḥa on c1, kasra then shadda on c2, then c3 (e.g., يُحَبِّبُ)
      if (c2 === c3) return normalizeDefectivePresent([YEH, DAMMA, c1, FATHA, c2, KASRA, SHADDA, c3, DAMMA], c3)
      return normalizeDefectivePresent([YEH, DAMMA, c1, FATHA, c2, KASRA, SHADDA, c3, DAMMA], c3)

    case 3:
      // Hollow Form III: if c2 is ALIF, use FATHA on prefix, KASRA on c1, YEH for long ī (e.g., يَعِينُ)
      if (c2 === ALIF) return normalizeDefectivePresent([YEH, FATHA, c1, KASRA, YEH, c3, DAMMA], c3)
      return normalizeDefectivePresent([YEH, DAMMA, c1, FATHA, ALIF, c2, KASRA, c3, DAMMA], c3)

    case 4: {
      // Geminate Form IV (e.g., يُحِبُّ) carries shadda on the doubled radical
      if (c2 === c3) return [YEH, DAMMA, c1, KASRA, c2, SHADDA, DAMMA]

      // Initial hamza + middle weak + final weak (e.g., أوي → يُؤْوِي)
      if (c1 === ALIF_HAMZA && isMiddleWeak && isFinalWeak)
        return normalizeDefectivePresent(
          [YEH, DAMMA, HAMZA_ON_WAW, SUKOON, hollowLetterGlide(c2), KASRA, weakLetterGlide(c3)],
          c3,
        )

      // Seat initial hamza on wāw after ḍamma (e.g., يُؤْمِنُ)
      const seatedC1 = c1 === ALIF_HAMZA ? HAMZA_ON_WAW : c1
      const seatedC3 = c3 === ALIF_HAMZA ? HAMZA_ON_YEH : c3

      if (isFinalWeak) {
        // For defective Form IV verbs, final و becomes yeh in present tense (e.g., يُمْسِي)
        return [YEH, DAMMA, seatedC1, SUKOON, c2, KASRA, c3 === WAW ? YEH : weakLetterGlide(c3)]
      }

      // Hollow Form IV present: kasra on c1, long ī from c2 (e.g., يُقِيمُ)
      if (isMiddleWeak) return normalizeDefectivePresent([YEH, DAMMA, seatedC1, KASRA, YEH, seatedC3, DAMMA], c3)

      return normalizeDefectivePresent([YEH, DAMMA, seatedC1, SUKOON, c2, KASRA, seatedC3, DAMMA], c3)
    }

    case 5:
      // Form V defective: final ي becomes ى (alif maqsura) in present tense (e.g., تَوَفَّى → يَتَوَفَّى)
      if (c3 === YEH) {
        return [YEH, FATHA, TEH, FATHA, c1, FATHA, c2, SHADDA, FATHA, ALIF_MAQSURA]
      }
      return normalizeDefectivePresent([YEH, FATHA, TEH, FATHA, c1, FATHA, c2, SHADDA, FATHA, c3, DAMMA], c3)

    case 6:
      // Hollow Form VI: if c2 is ALIF, don't insert another ALIF (e.g., يَتَعَانُ)
      if (c2 === ALIF) return normalizeDefectivePresent([YEH, FATHA, TEH, FATHA, c1, FATHA, ALIF, c3, DAMMA], c3)

      return normalizeDefectivePresent([YEH, FATHA, TEH, FATHA, c1, FATHA, ALIF, c2, FATHA, c3, DAMMA], c3)

    case 7:
      if (isMiddleWeak) return normalizeDefectivePresent([YEH, FATHA, NOON, SUKOON, c1, FATHA, ALIF, c3, DAMMA], c3)

      return normalizeDefectivePresent([YEH, FATHA, NOON, SUKOON, c1, FATHA, c2, KASRA, c3, DAMMA], c3)

    case 8:
      if (c1 === WAW) return normalizeDefectivePresent([YEH, FATHA, TEH, SHADDA, FATHA, c2, KASRA, c3, DAMMA], c3)

      if (isMiddleWeak) return normalizeDefectivePresent([YEH, FATHA, c1, SUKOON, TEH, FATHA, ALIF, c3, DAMMA], c3)

      return normalizeDefectivePresent([YEH, FATHA, c1, SUKOON, TEH, FATHA, c2, KASRA, c3, DAMMA], c3)

    case 9:
      return normalizeDefectivePresent([YEH, FATHA, c1, SUKOON, c2, FATHA, c3, SHADDA, DAMMA], c3)

    case 10:
      // Hollow Form X present (e.g., يَسْتَضِيفُ)
      if (isMiddleWeak)
        return normalizeDefectivePresent([YEH, FATHA, SEEN, SUKOON, TEH, FATHA, c1, KASRA, YEH, c3, DAMMA], c3)

      return normalizeDefectivePresent([YEH, FATHA, SEEN, SUKOON, TEH, FATHA, c1, SUKOON, c2, KASRA, c3, DAMMA], c3)

    default:
      return []
  }
}

function shortenHollowStem(word: readonly string[], hollowRadical: string | undefined): readonly string[] {
  if (!hollowRadical) return word

  const chars = [...word]
  const hollowTargets = new Set([hollowRadical, hollowLetterGlide(hollowRadical)])
  if (hollowRadical === WAW) hollowTargets.add(YEH)
  if (hollowRadical === ALIF) hollowTargets.add(YEH)
  hollowTargets.add(ALIF)
  const hollowIndex = chars.findIndex((char, index) => index > 0 && !isDiacritic(char) && hollowTargets.has(char))
  if (hollowIndex === -1) return word

  let removalCount = 1
  while (isDiacritic(chars[hollowIndex + removalCount])) removalCount += 1

  chars.splice(hollowIndex, removalCount)
  return chars
}

function expandShadda(word: readonly string[]): readonly string[] {
  const chars = [...word]

  // Find shadda and the letter it's attached to
  for (let i = 0; i < chars.length - 1; i += 1) {
    if (chars[i + 1] === SHADDA && !isDiacritic(chars[i]))
      // Expand shadda: replace letter + shadda with letter + fatḥa + letter
      return [...chars.slice(0, i + 1), FATHA, chars[i], ...chars.slice(i + 2)]
  }

  return chars
}

function replaceFinalDiacritic(word: readonly string[], diacritic: string): readonly string[] {
  const chars = [...word]

  // Find the last base letter (non-diacritic)
  let lastBaseIndex = chars.length - 1
  while (lastBaseIndex >= 0 && isDiacritic(chars[lastBaseIndex])) lastBaseIndex -= 1

  if (lastBaseIndex < 0) return [...chars, diacritic]

  // Check if there's a shadda right after the last base letter (for form IX verbs)
  if (lastBaseIndex + 1 < chars.length && chars[lastBaseIndex + 1] === SHADDA)
    // Remove everything after the shadda, then add shadda + new diacritic
    return [...chars.slice(0, lastBaseIndex + 2), diacritic]

  // Normal case: strip trailing diacritics and add new one
  return [...stripTrailingDiacritics(chars), diacritic]
}

function dropTerminalWeakOrHamza(word: readonly string[]): readonly string[] {
  for (let i = word.length - 1; i >= 0; i -= 1) {
    if (isDiacritic(word[i])) continue
    if (word[i] === ALIF_HAMZA || word[i] === HAMZA) return [...word.slice(0, i), HAMZA_ON_YEH, ...word.slice(i + 1)]
    if (isWeakLetter(word[i])) {
      const sliced = word.slice(0, i)
      // For Form V pattern [letter, SHADDA, FATHA, ALIF_MAQSURA], preserve shadda and fatḥa
      if (i >= 2 && word[i - 2] === SHADDA && word[i - 1] === FATHA && word[i] === ALIF_MAQSURA) {
        return sliced
      }
      return removeTrailingDiacritics(sliced)
    }
    return word
  }
  return word
}

function dropFinalDefectiveGlide(word: readonly string[]): readonly string[] {
  const chars = [...stripTrailingDiacritics(word)]
  if (chars.length === 0) return word
  const last = chars.at(-1)

  if (last === NOON) {
    // Find the last base letter before the terminal nūn (skip diacritics)
    let baseIndex = chars.length - 2
    while (baseIndex >= 0 && isDiacritic(chars[baseIndex])) baseIndex -= 1
    const base = chars[baseIndex]
    // Rebuild without extra diacritics on the glide; keep fatḥa on the nūn: …طِينَ
    if (isWeakLetter(base)) return [...chars.slice(0, baseIndex), base, NOON, FATHA]
  }

  if (isWeakLetter(last)) {
    chars.pop()
    return chars
  }
  return replaceFinalDiacritic(word, SUKOON)
}

function applyPresentPrefix(chars: readonly string[], prefix: string): readonly string[] {
  if (!chars.length) return chars

  const remainder = chars.slice(1)
  const carriedDiacritics: string[] = []

  // Carry over any prefix diacritics (e.g., fatḥa from the base "ya-")
  while (remainder.length > 0 && isDiacritic(remainder[0])) {
    const mark = remainder.shift()
    if (mark) carriedDiacritics.push(mark)
  }

  // If we're adding hamza prefix to a hamza-initial stem (e.g., آذَنُ, آكُلُ)
  if (prefix === ALIF_HAMZA && remainder[0] === ALIF_HAMZA) {
    // Drop the stem hamza and any diacritics attached to it (e.g., sukoon)
    remainder.shift()
    return [ALIF_MADDA, ...removeLeadingDiacritics(remainder)]
  }

  return [prefix, ...carriedDiacritics, ...remainder]
}
