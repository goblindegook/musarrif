import { mapRecord } from '../../primitives/objects'
import { isFormIPastVowel, isFormIPresentVowel, longVowelFromPattern, shortVowelFromPattern } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_HAMZA_BELOW,
  DAMMA,
  FATHA,
  HAMZA_ON_YEH,
  isHamzatedLetter,
  isWeakLetter,
  KASRA,
  longA,
  longI,
  longU,
  NOON,
  normalizeAlifMadda,
  SHADDA,
  SUKOON,
  type Vowel,
  WAW,
  YEH,
} from '../letters'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugatePresentMood } from './present'

function restoreWeakLetterBeforeAlif(stem: readonly string[]): readonly string[] {
  if (stem.at(-3) === YEH) return stem
  if (stem.at(-2) === FATHA) return [...stem.slice(0, -2), KASRA, YEH, FATHA, ALIF]
  return [...stem.slice(0, -1), YEH, FATHA, ALIF]
}

export function conjugateImperative(verb: Verb): Record<PronounId, string> {
  const letters = Array.from(verb.root)
  const [c1, c2, c3] = letters
  const isInitialWeak = isWeakLetter(c1)
  const isInitialHamza = isHamzatedLetter(c1)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const isFinalHamza = isHamzatedLetter(c3)

  return mapRecord(
    mapRecord(conjugatePresentMood(verb, 'jussive'), (jussive, pronounId) => {
      if (!pronounId.startsWith('2')) return []

      const stem = Array.from(jussive).slice(2)

      switch (verb.form) {
        case 1: {
          const pattern = isFormIPresentVowel(verb, 'i') ? 'i' : 'u'

          if (isInitialWeak) {
            if (c2 === c3) return pronounId === '2fp' ? [ALIF, ...longI, ...stem.slice(1)] : stem

            if (stem.at(1) === FATHA && isFinalWeak) return [...stem.slice(0, 1), ...longI, ...stem.slice(1)]

            if (isFinalWeak || isFinalHamza) return stem

            if (isFormIPastVowel(verb, 'i')) return [ALIF, ...longI, ...stem.slice(1)]

            if (c1 === YEH) return [ALIF, ...longU, ...stem.slice(1)]

            return stem
          }

          if (isInitialHamza) {
            const initialHamzatedStem = Array.from(jussive).slice(4)

            if (c2 === c3) {
              const seatedC1 = isFormIPresentVowel(verb, 'i') ? ALIF_HAMZA_BELOW : ALIF_HAMZA
              const prefix = [seatedC1, shortVowelFromPattern(pattern), c2, SHADDA]

              if (pronounId === '2ms') return [...prefix, FATHA]
              if (pronounId === '2fs') return [...prefix, ...longI]
              if (pronounId === '2d') return [...prefix, ...longA]
              if (pronounId === '2mp') return [...prefix, ...longU, SUKOON, ALIF]
              if (pronounId === '2fp') return [ALIF, ...longVowelFromPattern(pattern), ...initialHamzatedStem]
            }

            if (isMiddleWeak && isFinalWeak) return [ALIF, ...longI, SUKOON, ...initialHamzatedStem]

            if (isMiddleWeak) {
              if (pronounId === '2ms' || pronounId === '2fp') return [ALIF_HAMZA, DAMMA, ...initialHamzatedStem]
              return [ALIF_HAMZA, ...longU, SUKOON, ...initialHamzatedStem.slice(1)]
            }

            if (isFinalWeak) {
              const prefix = [ALIF, KASRA, HAMZA_ON_YEH, SUKOON, c2]
              const stemVowel = isFormIPresentVowel(verb, 'i') && c2 !== NOON ? KASRA : FATHA
              if (pronounId === '2ms') return [...prefix, stemVowel]
              if (pronounId === '2fs') return [...prefix, stemVowel, YEH]
              if (pronounId === '2d') return [...prefix, stemVowel, YEH, ...initialHamzatedStem.slice(3)]
              if (pronounId === '2mp')
                return [...prefix, stemVowel === KASRA ? DAMMA : FATHA, ...initialHamzatedStem.slice(2)]
              if (pronounId === '2fp') return [...prefix, stemVowel, YEH, ...initialHamzatedStem.slice(3)]
            }

            if (isFormIPastVowel(verb, 'i') || isFormIPresentVowel(verb, 'i'))
              return [ALIF, ...longI, SUKOON, ...initialHamzatedStem]

            return initialHamzatedStem
          }

          if (c3 === WAW && stem.at(-1) === ALIF) return stem

          if (stem.at(1) === SUKOON) return [ALIF, isFormIPresentVowel(verb, 'u') ? DAMMA : KASRA, ...stem]

          return stem
        }

        case 2:
        case 3: {
          if (isInitialHamza) return [ALIF_HAMZA, ...stem.slice(1)]
          if (isFinalWeak && pronounId === '2d') return restoreWeakLetterBeforeAlif(stem)
          return stem
        }

        case 4: {
          if (isInitialHamza) return [ALIF_HAMZA, FATHA, ALIF, ...stem.slice(2)]
          if (isFinalWeak && pronounId === '2d') return [ALIF_HAMZA, FATHA, ...restoreWeakLetterBeforeAlif(stem)]
          return [ALIF_HAMZA, FATHA, ...stem]
        }

        case 5: {
          return insertAfterShadda(stem, FATHA)
        }

        case 7:
        case 8:
        case 9:
        case 10: {
          if (isInitialHamza && c2 === c3) return [ALIF, KASRA, HAMZA_ON_YEH, SUKOON, ...stem.slice(2)]
          if (isFinalWeak && pronounId === '2d') return [ALIF, KASRA, ...restoreWeakLetterBeforeAlif(stem)]
          return [ALIF, KASRA, ...stem]
        }
      }

      return stem
    }),
    (letters) => normalizeAlifMadda(letters).join('').normalize('NFC'),
  )
}

function insertAfterShadda(stem: readonly string[], vowel: Vowel): readonly string[] {
  const shaddaIndex = stem.lastIndexOf(SHADDA)
  return [...stem.slice(0, shaddaIndex - 1), vowel, ...stem.slice(shaddaIndex)]
}
