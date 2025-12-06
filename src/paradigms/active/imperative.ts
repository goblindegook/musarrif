import { mapRecord } from '../../primitives/objects'
import { ALIF, ALIF_HAMZA, FATHA, HAMZA_ON_YEH, KASRA, SHADDA, SUKOON, WAW } from '../constants'
import { isDiacritic, isWeakLetter, join, removeLeadingDiacritics } from '../helpers'
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
    mapRecord(jussive, (jussiveWord, pronounId) => {
      if (!pronounId.startsWith('2')) return []

      // Handle special cases before processing jussive
      // Initial weak + final weak (e.g., وقي → قِ, ولى → لِ)
      if (isInitialWeak && !isMiddleWeak && isFinalWeak && verb.form === 1) return [c2, KASRA]

      // Initial hamza + final weak (e.g., أتى → ائْتِ)
      if (isInitialHamza && !isMiddleWeak && isFinalWeak && verb.form === 1)
        return [ALIF, HAMZA_ON_YEH, SUKOON, c2, KASRA]

      // Initial hamza + middle weak + final weak (e.g., أوي → أَوِ, أوفى → أَوْفِ)
      if (isInitialHamza && isMiddleWeak && isFinalWeak && verb.form === 1) {
        // Quadriliteral: أوفى → أَوْفِ (أ-و-ف-ى)
        if (letters.length === 4) return [ALIF_HAMZA, FATHA, WAW, SUKOON, isWeakLetter(c2) ? c3 : c2, KASRA]

        // Triliteral: أوي → أَوِ
        return [ALIF_HAMZA, FATHA, WAW, KASRA]
      }

      const chars = removeLeadingDiacritics(Array.from(jussiveWord))
      if (chars.length === 0) return []

      const [, ...rest] = chars
      const stem = removeLeadingDiacritics(rest)
      if (stem.length === 0) return []

      // Geminate Form II: change kasra on c1 to fatha, and sukoon after shadda to kasra (e.g., حَبِّ)
      if (verb.form === 2 && c2 === c3) return [c1, FATHA, c2, SHADDA, KASRA]

      if (verb.form === 7 || verb.form === 8 || verb.form === 10) return [ALIF, KASRA, ...stem]

      if (verb.form === 4 || stem[1] === SUKOON || !isDiacritic(stem[1])) return [ALIF_HAMZA, FATHA, ...stem]

      return stem
    }),
    (letters) => join(...letters),
  )
}
