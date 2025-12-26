import { mapRecord } from '../../primitives/objects'
import { resolveFormIPastVowel, resolveFormIPresentVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_MADDA,
  FATHA,
  HAMZA_ON_YEH,
  isWeakLetter,
  KASRA,
  removeLeadingDiacritics,
  SEEN,
  SHADDA,
  SUKOON,
  shortVowelFromPattern,
  TEH,
  WAW,
} from '../letters'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugatePresentMood } from './present'

export function conjugateImperative(verb: Verb): Record<PronounId, string> {
  const jussive = conjugatePresentMood(verb, 'jussive')
  const letters = Array.from(verb.root)
  const [c1, c2, c3, c4] = letters
  const isInitialWeak = isWeakLetter(c1)
  const isInitialHamza = c1 === ALIF_HAMZA
  const isMiddleWeak = letters.length === 4 ? isWeakLetter(c3) : isWeakLetter(c2)
  const isFinalWeak = letters.length === 4 ? isWeakLetter(c4) : isWeakLetter(c3)

  return mapRecord(
    mapRecord(jussive, (jussiveVerb, pronounId) => {
      if (!pronounId.startsWith('2')) return []

      const [, ...rest] = removeLeadingDiacritics(Array.from(jussiveVerb))
      const stem = removeLeadingDiacritics(rest)

      switch (verb.form) {
        case 1: {
          const pastVowel = resolveFormIPastVowel(verb)
          const presentVowel = resolveFormIPresentVowel(verb)

          // Initial weak + final weak (e.g., وقي → قِ, ولى → لِ)
          if (isInitialWeak && !isMiddleWeak && isFinalWeak) return [c2, KASRA]

          // Initial hamza + final weak (e.g., أتى → ائْتِ)
          if (isInitialHamza && !isMiddleWeak && isFinalWeak) return [ALIF, HAMZA_ON_YEH, SUKOON, c2, KASRA]

          // Initial hamza + middle weak + final weak - Triliteral (e.g., أوي → اِئْوِ)
          if (isInitialHamza && isMiddleWeak && isFinalWeak) return [ALIF, KASRA, HAMZA_ON_YEH, SUKOON, WAW, KASRA]

          // Initial weak verbs with past vowel 'i' drop the initial و in present/jussive
          // so the stem already starts with the second radical (e.g., وَلَدَ → يَلِدْ → لِدْ)
          // Don't add اِـ prefix as the initial weak has already been dropped
          if (isInitialWeak && !isMiddleWeak && !isFinalWeak && pastVowel === 'i') return stem

          // Verbs with past vowel 'i' (fa3ila pattern) need imperative prefix اِـ
          // This is a morphological rule based on past pattern classification, even though
          // the imperative is technically derived from the present tense (jussive)
          // (e.g., مرض → اِمْرَضْ, سمع → اِسْمَعْ)
          if (pastVowel === 'i') return [ALIF, KASRA, ...stem]

          // If stem starts with two consonants (consonant + sukoon), add helping vowel prefix
          // The vowel depends on the present tense vowel: 'u' (damma) → اُ, 'i'/'a' → اِ
          // Exclude hollow verbs (middle weak) and defective verbs (final weak) as they have special handling
          if (!isFinalWeak && stem.at(1) === SUKOON) {
            return [ALIF, shortVowelFromPattern(presentVowel), ...stem]
          }

          return stem
        }

        case 2: {
          // Geminate Form II: change kasra on c1 to fatha, and kasra before shadda (e.g., حَبِّ)
          if (c2 === c3) return [c1, FATHA, c2, KASRA, SHADDA]

          return stem
        }

        case 4: {
          // Initial hamza + middle weak + final weak (e.g., أوي → آوِ)
          if (isInitialHamza && isMiddleWeak && isFinalWeak) return [ALIF_MADDA, WAW, KASRA]

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

          return [ALIF, KASRA, ...stem]
        }

        default:
          return stem
      }
    }),
    (letters) => letters.join('').normalize('NFC'),
  )
}
