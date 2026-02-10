import { mapRecord } from '../../primitives/objects'
import { isFormIPastVowel, isFormIPresentVowel } from '../form-i-vowels'
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
  last,
  longVowelFromPattern,
  NOON,
  normalizeAlifMadda,
  removeLeadingDiacritics,
  SHADDA,
  SUKOON,
  shortVowelFromPattern,
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

export function conjugateImperative(verb: Verb): Record<PronounId, string> {
  const letters = Array.from(verb.root)
  const [c1, c2, c3, c4] = letters
  const isInitialWeak = isWeakLetter(c1)
  const isInitialHamza = isHamzatedLetter(c1)
  const isMiddleHamza = isHamzatedLetter(c2)
  const isMiddleWeak = letters.length === 4 ? isWeakLetter(c3) : isWeakLetter(c2)
  const isFinalWeak = letters.length === 4 ? isWeakLetter(c4) : isWeakLetter(c3)

  return mapRecord(
    mapRecord(conjugatePresentMood(verb, 'jussive'), (jussive, pronounId) => {
      if (!pronounId.startsWith('2')) return []

      const stem = removeLeadingDiacritics(Array.from(jussive).slice(1))

      switch (verb.form) {
        case 1: {
          if (isInitialHamza && isMiddleWeak && isFinalWeak) {
            const prefix = [ALIF, KASRA, YEH]
            if (pronounId === '2ms') return [...prefix, c2, KASRA]
            if (pronounId === '2fs') return [...prefix, c2, KASRA, YEH]
            if (pronounId === '2d') return [...prefix, c2, KASRA, YEH, FATHA, ALIF]
            if (pronounId === '2mp') return [...prefix, c2, DAMMA, WAW, SUKOON, ALIF]
            if (pronounId === '2fp') return [...prefix, c2, KASRA, YEH, NOON, FATHA]
          }

          if (isInitialWeak && isHamzatedLetter(c3)) return stem

          if (isInitialWeak && isFormIPastVowel(verb, 'i') && !isFinalWeak && c2 !== c3)
            return [ALIF, KASRA, c1, ...stem.slice(2)]

          if (isInitialHamza && c2 === c3) {
            const seatedC1 = isFormIPresentVowel(verb, 'i') ? ALIF_HAMZA_BELOW : ALIF_HAMZA
            const pattern = isFormIPresentVowel(verb, 'i') ? 'i' : 'u'
            const shortVowel = shortVowelFromPattern(pattern)
            const longVowel = longVowelFromPattern(pattern)
            const prefix = [seatedC1, shortVowel, c2, SHADDA]

            if (pronounId === '2ms') return [...prefix, FATHA]
            if (pronounId === '2fs') return [...prefix, KASRA, YEH]
            if (pronounId === '2d') return [...prefix, FATHA, ALIF]
            if (pronounId === '2mp') return [...prefix, DAMMA, WAW, SUKOON, ALIF]
            if (pronounId === '2fp') return [ALIF, ...longVowel, c2, shortVowel, c3, SUKOON, NOON, FATHA]
          }

          if (isInitialWeak && isFinalWeak && isMiddleHamza && pronounId === '2d')
            return [HAMZA_ON_YEH, KASRA, YEH, FATHA, ALIF]

          if (isInitialWeak && isFinalWeak) {
            const alifIndex = stem.indexOf(ALIF)
            if (stem.at(alifIndex - 1) === FATHA) return [...stem.slice(0, alifIndex - 1), KASRA, YEH, FATHA, ALIF]
          }

          if (isInitialWeak && c2 === c3 && pronounId === '2fp') return [ALIF, KASRA, YEH, ...stem.slice(2)]

          if (isInitialWeak && isFormIPresentVowel(verb, 'u')) {
            if (stem.at(0) === YEH || stem.at(0) === WAW) return [ALIF, DAMMA, WAW, ...stem.slice(2)]
            return stem
          }

          if (isInitialHamza && isMiddleWeak) {
            const prefix = [ALIF_HAMZA, DAMMA]
            if (pronounId === '2ms') return [...prefix, c3, SUKOON]
            if (pronounId === '2fs') return [...prefix, WAW, c3, KASRA, YEH]
            if (pronounId === '2d') return [...prefix, WAW, c3, FATHA, ALIF]
            if (pronounId === '2mp') return [...prefix, WAW, c3, DAMMA, WAW, SUKOON, ALIF]
            if (pronounId === '2fp') return [...prefix, c3, SUKOON, NOON, FATHA]
          }

          if (isInitialHamza && isFinalWeak) {
            const prefix = [ALIF, KASRA, HAMZA_ON_YEH, SUKOON, c2]
            const stemVowel = isFormIPresentVowel(verb, 'i') && c2 !== NOON ? KASRA : FATHA
            if (pronounId === '2ms') return [...prefix, stemVowel]
            if (pronounId === '2fs') return [...prefix, stemVowel, YEH, SUKOON]
            if (pronounId === '2d') return [...prefix, stemVowel, YEH, FATHA, ALIF]
            if (pronounId === '2mp') return [...prefix, stemVowel === KASRA ? DAMMA : FATHA, WAW, SUKOON, ALIF]
            if (pronounId === '2fp') return [...prefix, stemVowel, YEH, SUKOON, NOON, FATHA]
          }

          if (isInitialHamza && (isFormIPastVowel(verb, 'i') || isFormIPresentVowel(verb, 'i')))
            return [ALIF, KASRA, YEH, ...stem.slice(2)]

          if (isInitialHamza) return stem.slice(2)

          if (c3 === WAW && last(stem) === ALIF) return stem

          if (stem.at(1) === SUKOON) return [ALIF, isFormIPresentVowel(verb, 'u') ? DAMMA : KASRA, ...stem]

          return stem
        }

        case 2: {
          if (isInitialHamza) return [ALIF_HAMZA, ...stem.slice(1)]
          if (isMiddleWeak) return stem
          if (isFinalWeak && pronounId === '2d') return restoreWeakLetterBeforeAlif(stem)
          return stem
        }

        case 3: {
          if (isInitialHamza) return normalizeAlifMadda([ALIF_HAMZA, ...stem.slice(1)])
          if (isFinalWeak && pronounId === '2d') return restoreWeakLetterBeforeAlif(stem)
          return stem
        }

        case 4: {
          const prefix = [ALIF_HAMZA, FATHA]

          if (isInitialHamza && isFinalWeak) {
            if (pronounId === '2ms') return [...prefix, ALIF, c2, KASRA]
            if (pronounId === '2fs') return [...prefix, ALIF, c2, KASRA, YEH]
            if (pronounId === '2d') return [...prefix, ALIF, c2, KASRA, YEH, FATHA, ALIF]
            if (pronounId === '2mp') return [...prefix, ALIF, c2, DAMMA, WAW, SUKOON, ALIF]
            if (pronounId === '2fp') return [...prefix, ALIF, c2, KASRA, YEH, NOON, FATHA]
          }

          if (c2 === c3 && pronounId === '2d') return [...prefix, ...stem]

          if (isFinalWeak && pronounId === '2d') return [...prefix, ...restoreWeakLetterBeforeAlif(stem)]

          return [...prefix, ...stem]
        }

        case 5: {
          const shaddaIndex = stem.lastIndexOf(SHADDA)
          return [...stem.slice(0, shaddaIndex - 1), FATHA, ...stem.slice(shaddaIndex)]
        }

        case 7:
        case 8:
        case 9:
        case 10: {
          if (isFinalWeak && pronounId === '2d') return [ALIF, KASRA, ...restoreWeakLetterBeforeAlif(stem)]
          return [ALIF, KASRA, ...stem]
        }
      }

      return stem
    }),
    (letters) => normalizeAlifMadda(letters).join('').normalize('NFC'),
  )
}
