import { mapRecord } from '../../primitives/objects'
import { resolveFormIPastVowel, resolveFormIPresentVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_MADDA,
  DAMMA,
  FATHA,
  HAMZA_ON_YEH,
  isHamzatedLetter,
  isWeakLetter,
  KASRA,
  last,
  NOON,
  removeLeadingDiacritics,
  removeTrailingDiacritics,
  SEEN,
  SHADDA,
  SUKOON,
  TEH,
  WAW,
  YEH,
} from '../letters'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugatePresentMood } from './present'

function restoreWeakLetterBeforeAlif(stem: readonly string[]): readonly string[] {
  const alifIndex = stem.lastIndexOf(ALIF)
  if (stem.at(alifIndex - 1) === FATHA)
    return [...stem.slice(0, alifIndex - 1), KASRA, YEH, FATHA, ...stem.slice(alifIndex)]
  return [...stem.slice(0, alifIndex), YEH, FATHA, ...stem.slice(alifIndex)]
}

function dropSukoonBeforeFinalAlif(word: readonly string[]): readonly string[] {
  const alifIndex = word.lastIndexOf(ALIF)
  if (alifIndex > 1 && word.at(alifIndex - 1) === SUKOON && word.at(alifIndex - 2) === WAW)
    return [...word.slice(0, alifIndex - 1), ...word.slice(alifIndex)]
  return word
}

function addSukoonBeforeFinalAlif(word: readonly string[], verb: Verb): readonly string[] {
  const alifIndex = word.lastIndexOf(ALIF)
  if (alifIndex <= 0) return word

  const [c1, c2, c3] = [...verb.root]

  if (c2 === ALIF) return word

  if (verb.form === 1 && resolveFormIPresentVowel(verb) === 'i' && isHamzatedLetter(c1)) return word

  if (verb.form === 1 && resolveFormIPresentVowel(verb) === 'a' && !isHamzatedLetter(c2)) return word

  if (isHamzatedLetter(c1) && isWeakLetter(c2)) return word

  if (isHamzatedLetter(c3)) return word

  if (word.at(alifIndex - 1) !== WAW || isWeakLetter(word.at(alifIndex - 3)) || word.at(alifIndex - 3) === NOON)
    return word

  return [...word.slice(0, alifIndex - 1), WAW, SUKOON, ALIF]
}

export function conjugateImperative(verb: Verb): Record<PronounId, string> {
  const jussive = conjugatePresentMood(verb, 'jussive')
  const letters = Array.from(verb.root)
  const [c1, c2, c3, c4] = letters
  const isInitialWeak = isWeakLetter(c1)
  const isInitialHamza = isHamzatedLetter(c1)
  const isMiddleHamza = isHamzatedLetter(c2)
  const isMiddleWeak = letters.length === 4 ? isWeakLetter(c3) : isWeakLetter(c2)
  const isFinalWeak = letters.length === 4 ? isWeakLetter(c4) : isWeakLetter(c3)

  const baseImperative = mapRecord(jussive, (jussiveVerb, pronounId) => {
    if (!pronounId.startsWith('2')) return []

    const [, ...rest] = removeLeadingDiacritics(Array.from(jussiveVerb))
    const stem = removeLeadingDiacritics(rest)

    switch (verb.form) {
      case 1: {
        const pastVowel = resolveFormIPastVowel(verb)
        const presentVowel = resolveFormIPresentVowel(verb)

        if (isFinalWeak && presentVowel === 'u') {
          if (pronounId === '2ms') return [ALIF, DAMMA, c1, SUKOON, c2, DAMMA]
          if (pronounId === '2fs') return [ALIF, DAMMA, c1, SUKOON, c2, KASRA, YEH]
          if (pronounId === '2d') return [ALIF, DAMMA, c1, SUKOON, c2, DAMMA, WAW, FATHA, ALIF]
          if (pronounId === '2mp') return [ALIF, DAMMA, c1, SUKOON, c2, DAMMA, WAW, ALIF]
          if (pronounId === '2fp') return [ALIF, DAMMA, c1, SUKOON, c2, DAMMA, WAW, NOON, FATHA]
        }

        // Initial hamza + middle weak + final weak - Triliteral (e.g., أوي → اِئْوِ)
        if (isInitialHamza && isMiddleWeak && isFinalWeak) return [ALIF, KASRA, HAMZA_ON_YEH, SUKOON, WAW, KASRA]

        if (isInitialWeak && isFinalWeak && isMiddleHamza && pronounId === '2d')
          return [HAMZA_ON_YEH, KASRA, YEH, FATHA, ALIF]

        if (isInitialWeak && isFinalWeak) {
          const alifIndex = stem.indexOf(ALIF)

          if (alifIndex > 1 && stem.at(alifIndex - 1) === YEH && stem.at(alifIndex - 2) === YEH)
            return [...stem.slice(0, alifIndex - 1), ...stem.slice(alifIndex)]

          if (alifIndex > 0 && stem.at(alifIndex - 1) === YEH) return stem

          if (alifIndex >= 0 && stem[alifIndex - 1] === FATHA)
            return [...stem.slice(0, alifIndex - 1), KASRA, YEH, FATHA, ALIF]
        }

        if (isInitialWeak && c2 === c3 && pronounId === '2fp') return [ALIF, KASRA, YEH, ...stem.slice(2)]

        if (isInitialWeak && presentVowel === 'u') {
          const trimmedStem = stem.at(0) === YEH ? stem.slice(1) : stem
          return [ALIF, DAMMA, WAW, ...removeLeadingDiacritics(trimmedStem)]
        }

        if (isInitialWeak) return stem

        if (isInitialHamza && isFinalWeak) {
          if (stem.at(0) === ALIF_HAMZA) return [ALIF, HAMZA_ON_YEH, ...stem.slice(1)]
          return [ALIF, HAMZA_ON_YEH, ...stem]
        }

        if (isInitialHamza && (pastVowel === 'i' || presentVowel === 'i'))
          return [ALIF, KASRA, YEH, ...removeLeadingDiacritics(stem.slice(1))]

        // Hamzated initial strong verbs drop the hamza
        if (isInitialHamza) return removeLeadingDiacritics(stem.slice(1))

        if (c2 === c3 && presentVowel === 'i' && pronounId === '2ms') return [c1, KASRA, c2, SHADDA, FATHA]

        if (c2 === c3 && presentVowel === 'a' && pronounId !== '2fp')
          // Geminate Form I with present vowel 'a' drops the helping prefix and takes fatḥa on the first radical.
          return [c1, FATHA, ...stem.slice(2)]

        // Verbs with past vowel 'i' (fa3ila pattern) need imperative prefix اِـ
        // This is a morphological rule based on past pattern classification, even though
        // the imperative is technically derived from the present tense (jussive)
        // (e.g., مرض → اِمْرَضْ, سمع → اِسْمَعْ)
        if (pastVowel === 'i') return [ALIF, KASRA, ...stem]

        // Defective verbs with final و: drop final و and add ALIF (e.g., غدو → غْدا)
        // ALIF carries the vowel implicitly, so no explicit FATHA is needed
        if (c3 === WAW && last(stem) === ALIF) return stem
        if (c3 === WAW) return [...removeTrailingDiacritics(stem), ALIF]

        // If stem starts with two consonants (consonant + sukoon), add helping vowel prefix
        // The vowel depends on the present tense vowel: 'u' (damma) → اُ, 'i'/'a' → اِ

        if (isHamzatedLetter(c3) && pronounId === '2mp') return dropSukoonBeforeFinalAlif([ALIF, KASRA, ...stem])

        if (stem.at(1) === SUKOON) return [ALIF, presentVowel === 'u' ? DAMMA : KASRA, ...stem]

        return stem
      }

      case 2: {
        if (isInitialHamza) return [ALIF_HAMZA, ...stem.slice(1)]

        // Form II defective verbs preserve final weak letter in dual forms
        if (isFinalWeak && pronounId === '2d') return restoreWeakLetterBeforeAlif(stem)

        return stem
      }

      case 3: {
        // Form III defective verbs preserve final weak letter in dual forms
        if (isFinalWeak && pronounId === '2d') return restoreWeakLetterBeforeAlif(stem)
        return stem
      }

      case 4: {
        // Initial hamza + middle weak + final weak (e.g., أوي → آوِ)
        if (isInitialHamza && isMiddleWeak && isFinalWeak) return [ALIF_MADDA, WAW, KASRA]

        // Form IV defective verbs preserve final weak letter in dual forms
        if (isFinalWeak && pronounId === '2d') return [ALIF_HAMZA, FATHA, ...restoreWeakLetterBeforeAlif(stem)]

        // Form IV always adds prefix
        return [ALIF_HAMZA, FATHA, ...stem]
      }

      case 5: {
        // Initial hamza + middle weak + final weak (e.g., أوي → تَأَوَّ)
        // Handle this before processing jussive stem to avoid incorrect diacritic order
        if (isInitialHamza && isMiddleWeak && isFinalWeak)
          // Jussive: يَتَأَوَّ → Imperative: تَأَوَّ (remove يَ, add تَ)
          // Pattern: تَ + أَ + وََّ (و + fatḥa + shadda)
          return [TEH, FATHA, ALIF_HAMZA, FATHA, WAW, FATHA, SHADDA]

        // Form V defective verbs preserve final weak letter in dual and plural forms
        if (isFinalWeak) {
          if (pronounId === '2mp') {
            // Jussive uses damma before shadda, imperative uses fatḥa instead
            const shaddaIndex = stem.lastIndexOf(SHADDA)
            return [...stem.slice(0, shaddaIndex - 1), FATHA, ...stem.slice(shaddaIndex)]
          }
        }

        return stem
      }

      case 7:
      case 8:
      case 9:
        return [ALIF, KASRA, ...stem]

      case 10: {
        // Initial hamza + middle weak + final weak (e.g., أوي → اِسْتَأْوِ)
        // Initial hamza is kept as أْ, then middle weak with kasra
        if (isInitialHamza && isMiddleWeak && isFinalWeak)
          return [ALIF, KASRA, SEEN, SUKOON, TEH, FATHA, ALIF_HAMZA, SUKOON, c2, KASRA]

        // Form X defective verbs: restore final weak letter in dual forms
        if (isFinalWeak && pronounId === '2d') return [ALIF, KASRA, ...restoreWeakLetterBeforeAlif(stem)]

        if (pronounId === '2mp' && isHamzatedLetter(c2) && stem.at(-2) === SUKOON)
          return [ALIF, KASRA, ...stem.slice(0, -2), stem[stem.length - 1]]

        return [ALIF, KASRA, ...stem]
      }
    }

    return stem
  })

  return mapRecord(baseImperative, (letters, pronounId) => {
    const isFinalWeakFormIWithU =
      verb.form === 1 && isWeakLetter(verb.root[2]) && resolveFormIPresentVowel(verb) === 'u'
    const adjusted = pronounId === '2mp' && !isFinalWeakFormIWithU ? addSukoonBeforeFinalAlif(letters, verb) : letters
    return adjusted.join('').normalize('NFC')
  })
}
