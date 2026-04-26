import { mapRecord } from '../../primitives/objects'
import { isFormIPresentVowel } from '../form-i-vowels'
import {
  ALIF,
  DAMMA,
  FATHA,
  finalize,
  HAMZA,
  KASRA,
  LetterToken,
  longVowel,
  NOON,
  SHADDA,
  SUKOON,
  WAW,
  YEH,
} from '../letters'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugatePresentMood } from './present'

// Ensures hamza seating is handled on finalization:
const HAMZA_TOKEN = new LetterToken(HAMZA)

export function conjugateImperative(verb: Verb): Record<PronounId, string> {
  const letters = verb.rootTokens
  const [c1, c2, c3] = letters

  return mapRecord(
    mapRecord(conjugatePresentMood(verb, 'jussive'), (jussive, pronounId) => {
      if (!pronounId.startsWith('2')) return []

      const stem = Array.from(jussive).slice(2)

      if (letters.length === 4) return [3, 4].includes(verb.form) ? [ALIF, KASRA, ...stem] : stem

      switch (verb.form) {
        case 1: {
          const isPatternI = isFormIPresentVowel(verb, KASRA)
          const isPatternU = isFormIPresentVowel(verb, DAMMA)
          const patternLongVowel = longVowel(isPatternU ? DAMMA : KASRA)

          if (c1.isWeak) {
            if (stem.at(1) === FATHA && c3.isWeak) return [...stem.slice(0, 1), KASRA, YEH, ...stem.slice(1)]

            if (c2.equals(c3) && pronounId === '2fp') return [ALIF, KASRA, YEH, ...stem.slice(1)]

            if (c1.is(YEH)) return [ALIF, ...patternLongVowel, ...stem.slice(1)]

            if (c2.isHamza) return [HAMZA_TOKEN, ...stem.slice(1)]
          }

          if (c1.isHamza) {
            const initialHamzatedStem = Array.from(jussive).slice(4)

            if (verb.contractedImperative) return initialHamzatedStem

            if (c3.isWeak) {
              const glide = c2.is(NOON) || !isPatternI ? FATHA : pronounId === '2mp' ? DAMMA : KASRA
              return [ALIF, KASRA, c1, SUKOON, c2, glide, ...initialHamzatedStem.slice(2)]
            }

            if (c2.equals(c3)) {
              const seatedC1 = isPatternI ? [HAMZA_TOKEN, KASRA] : [HAMZA_TOKEN, DAMMA]
              const prefix = [...seatedC1, c2, SUKOON, c3]

              if (pronounId === '2ms') return [...prefix, FATHA]
              if (pronounId === '2fs') return [...prefix, KASRA, YEH]
              if (pronounId === '2d') return [...prefix, FATHA, ALIF]
              if (pronounId === '2mp') return [...prefix, DAMMA, WAW, SUKOON, ALIF]
              return [ALIF, ...patternLongVowel, ...initialHamzatedStem]
            }

            if (c2.isWeak) return [HAMZA_TOKEN, DAMMA, ...initialHamzatedStem]

            if (isPatternU) return [ALIF, DAMMA, c1, SUKOON, ...initialHamzatedStem]

            return [ALIF, KASRA, YEH, SUKOON, ...initialHamzatedStem]
          }

          if (c3.is(WAW) && isPatternU && pronounId === '2d') return [ALIF, DAMMA, ...stem.slice(0, -2), FATHA, ALIF]

          if (c3.is(WAW) && stem.at(-1) === ALIF && !isPatternU) return stem

          if (stem.at(1) === SUKOON) return [ALIF, isPatternU ? DAMMA : KASRA, ...stem]

          return stem
        }

        case 2:
        case 3: {
          if (c1.isHamza) return [HAMZA_TOKEN, ...stem.slice(1)]
          if (c3.isWeak && pronounId === '2d') return restoreWeakLetterBeforeAlif(stem)
          return stem
        }

        case 4: {
          if (c1.isHamza) return [HAMZA_TOKEN, FATHA, ALIF, ...stem.slice(2)]
          if (c3.isWeak && pronounId === '2d') return [HAMZA_TOKEN, FATHA, ...restoreWeakLetterBeforeAlif(stem)]
          return [HAMZA_TOKEN, FATHA, ...stem]
        }

        case 5: {
          const shaddaIndex = stem.lastIndexOf(SHADDA)
          return [...stem.slice(0, shaddaIndex - 1), FATHA, ...stem.slice(shaddaIndex)]
        }

        case 7:
        case 8:
        case 9:
        case 10: {
          if (c1.isHamza && c2.equals(c3)) return [ALIF, KASRA, c1, SUKOON, ...stem.slice(2)]
          if (c3.isWeak && pronounId === '2d') return [ALIF, KASRA, ...restoreWeakLetterBeforeAlif(stem)]
          return [ALIF, KASRA, ...stem]
        }
      }

      return stem
    }),
    finalize,
  )
}

function restoreWeakLetterBeforeAlif(stem: readonly string[]): readonly string[] {
  if (stem.at(-3) === YEH) return stem
  if (stem.at(-2) === FATHA) return [...stem.slice(0, -2), KASRA, YEH, FATHA, ALIF]
  return [...stem.slice(0, -1), YEH, FATHA, ALIF]
}
