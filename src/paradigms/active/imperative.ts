import { mapRecord } from '../../primitives/objects'
import { ALIF, ALIF_HAMZA, ALIF_MADDA, FATHA, HAMZA_ON_YEH, KASRA, SEEN, SHADDA, SUKOON, TEH, WAW } from '../constants'
import { isWeakLetter, removeLeadingDiacritics } from '../helpers'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugatePresentMood } from './present'

export function conjugateImperative(verb: Verb): Record<PronounId, string> {
  const jussive = conjugatePresentMood(verb, 'jussive')
  const letters = Array.from(verb.root)
  const [c1, c2, c3, c4] = letters
  const isInitialWeak = isWeakLetter(c1)
  const isInitialHamza = c1 === ALIF_HAMZA
  const isMiddleWeak = isWeakLetter(c2) || (letters.length === 4 && isWeakLetter(c3))
  const isFinalWeak = letters.length === 4 ? isWeakLetter(c4) : isWeakLetter(c3)

  return mapRecord(
    mapRecord(jussive, (jussiveVerb, pronounId) => {
      if (!pronounId.startsWith('2')) return []

      const [, ...rest] = removeLeadingDiacritics(Array.from(jussiveVerb))
      const stem = removeLeadingDiacritics(rest)

      switch (verb.form) {
        case 1: {
          // Initial weak + final weak (e.g., وقي → قِ, ولى → لِ)
          if (isInitialWeak && !isMiddleWeak && isFinalWeak) return [c2, KASRA]

          // Initial hamza + final weak (e.g., أتى → ائْتِ)
          if (isInitialHamza && !isMiddleWeak && isFinalWeak) return [ALIF, HAMZA_ON_YEH, SUKOON, c2, KASRA]

          // Initial hamza + middle weak + final weak (e.g., أوي → اِئْوِ, أوفى → أَوْفِ)
          if (isInitialHamza && isMiddleWeak && isFinalWeak) {
            // Quadriliteral: أوفى → أَوْفِ (أ-و-ف-ى)
            if (letters.length === 4) return [ALIF_HAMZA, FATHA, WAW, SUKOON, isWeakLetter(c2) ? c3 : c2, KASRA]

            // Triliteral: أوي → اِئْوِ (initial hamza becomes ائ, middle weak kept, final weak dropped)
            return [ALIF, KASRA, HAMZA_ON_YEH, SUKOON, WAW, KASRA]
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
          if (isInitialHamza && isMiddleWeak && isFinalWeak) {
            // Jussive: يَتَأَوَّ → Imperative: تَأَوَّ (remove يَ, add تَ)
            // Pattern: تَ + أَ + وََّ (و + fatḥa + shadda)
            return [TEH, FATHA, ALIF_HAMZA, FATHA, WAW, FATHA, SHADDA]
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

          return [ALIF, KASRA, ...stem]
        }

        default:
          return stem
      }
    }),
    (letters) => letters.join(''),
  )
}
