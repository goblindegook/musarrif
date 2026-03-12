import { mapRecord } from '../../primitives/objects'
import { isFormIPresentVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_HAMZA_BELOW,
  DAMMA,
  FATHA,
  HAMZA_ON_WAW,
  HAMZA_ON_YEH,
  isHamzatedLetter,
  isWeakLetter,
  KASRA,
  longVowel,
  NOON,
  normalizeAlifMadda,
  SHADDA,
  SUKOON,
  seatHamza,
  type Vowel,
  WAW,
  YEH,
} from '../letters'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugatePresentMood } from './present'

export function conjugateImperative(verb: Verb): Record<PronounId, string> {
  const letters = Array.from(verb.root)
  const [c1, c2, c3] = letters
  const seatedC1 = seatHamza(c1, FATHA)
  const isInitialWeak = isWeakLetter(seatedC1)
  const isInitialHamza = isHamzatedLetter(seatedC1)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)

  return mapRecord(
    mapRecord(conjugatePresentMood(verb, 'jussive'), (jussive, pronounId) => {
      if (!pronounId.startsWith('2')) return []

      const stem = Array.from(jussive).slice(2)

      if (letters.length === 4) {
        if (verb.form === 3) return [ALIF, KASRA, ...stem]
        return stem
      }

      switch (verb.form) {
        case 1: {
          const isPatternA = isFormIPresentVowel(verb, FATHA)
          const isPatternI = isFormIPresentVowel(verb, KASRA)
          const isPatternU = isFormIPresentVowel(verb, DAMMA)
          const patternLongVowel = longVowel(isPatternA || isPatternI ? KASRA : DAMMA)

          if (isInitialWeak) {
            if (stem.at(1) === FATHA && isFinalWeak) return [...stem.slice(0, 1), KASRA, YEH, ...stem.slice(1)]

            if (c2 === c3 && pronounId === '2fp') return [ALIF, KASRA, YEH, ...stem.slice(1)]

            if (seatedC1 === YEH) return [ALIF, ...patternLongVowel, ...stem.slice(1)]
          }

          if (isInitialHamza) {
            const initialHamzatedStem = Array.from(jussive).slice(4)

            if (verb.contractedImperative) return initialHamzatedStem

            if (isFinalWeak) {
              const glide = c2 === NOON || !isPatternI ? FATHA : pronounId === '2mp' ? DAMMA : KASRA
              return [ALIF, KASRA, HAMZA_ON_YEH, SUKOON, c2, glide, ...initialHamzatedStem.slice(2)]
            }

            if (c2 === c3) {
              const seatedC1 = isPatternI ? [ALIF_HAMZA_BELOW, KASRA] : [ALIF_HAMZA, DAMMA]
              const prefix = [...seatedC1, c2, SHADDA]

              if (pronounId === '2ms') return [...prefix, FATHA]
              if (pronounId === '2fs') return [...prefix, KASRA, YEH]
              if (pronounId === '2d') return [...prefix, FATHA, ALIF]
              if (pronounId === '2mp') return [...prefix, DAMMA, WAW, SUKOON, ALIF]
              return [ALIF, ...patternLongVowel, ...initialHamzatedStem]
            }

            if (isMiddleWeak) return [ALIF_HAMZA, DAMMA, ...initialHamzatedStem]

            if (isPatternA || isPatternI) return [ALIF, KASRA, YEH, SUKOON, ...initialHamzatedStem]

            return [ALIF, DAMMA, HAMZA_ON_WAW, SUKOON, ...initialHamzatedStem]
          }

          if (c3 === WAW && isPatternU && pronounId === '2d') return [ALIF, DAMMA, ...stem.slice(0, -2), FATHA, ALIF]

          if (c3 === WAW && stem.at(-1) === ALIF && !isPatternU) return stem

          if (stem.at(1) === SUKOON) return [ALIF, isPatternU ? DAMMA : KASRA, ...stem]

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

function restoreWeakLetterBeforeAlif(stem: readonly string[]): readonly string[] {
  if (stem.at(-3) === YEH) return stem
  if (stem.at(-2) === FATHA) return [...stem.slice(0, -2), KASRA, YEH, FATHA, ALIF]
  return [...stem.slice(0, -1), YEH, FATHA, ALIF]
}

function insertAfterShadda(stem: readonly string[], vowel: Vowel): readonly string[] {
  const shaddaIndex = stem.lastIndexOf(SHADDA)
  return [...stem.slice(0, shaddaIndex - 1), vowel, ...stem.slice(shaddaIndex)]
}
