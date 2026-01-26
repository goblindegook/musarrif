import { mapRecord } from '../../primitives/objects'
import { resolveFormIPastVowel, resolveFormIPresentVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_HAMZA_BELOW,
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

function addSukoonBeforeFinalAlif(word: readonly string[], verb: Verb): readonly string[] {
  const alifIndex = word.lastIndexOf(ALIF)
  if (alifIndex <= 0) return word

  const [c1, c2, c3] = [...verb.root]

  if (c2 === ALIF) return word

  if (verb.form === 1 && resolveFormIPresentVowel(verb) === 'i' && isHamzatedLetter(c1)) return word

  if (verb.form === 1 && isHamzatedLetter(c1) && c2 === c3) return word

  if (verb.form === 1 && isWeakLetter(c1) && resolveFormIPastVowel(verb) === 'u') return word

  if (verb.form === 1 && resolveFormIPresentVowel(verb) === 'a' && !isHamzatedLetter(c2)) return word

  if (verb.form === 1 && isWeakLetter(c1) && isHamzatedLetter(c2) && !isWeakLetter(c3)) return word

  if (isHamzatedLetter(c1) && isWeakLetter(c2)) return word

  if (isHamzatedLetter(c3)) return word

  if (word.at(alifIndex - 1) !== WAW || isWeakLetter(word.at(alifIndex - 3)) || word.at(alifIndex - 3) === NOON)
    return word

  return [...word.slice(0, alifIndex - 1), WAW, ALIF]
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

        // Initial hamza + middle weak + final weak - Triliteral (e.g., أوي → اِيوِ)
        if (isInitialHamza && isMiddleWeak && isFinalWeak) {
          if (pronounId === '2ms') return [ALIF, KASRA, YEH, c2, KASRA]
          if (pronounId === '2fs') return [ALIF, KASRA, YEH, c2, KASRA, YEH]
          if (pronounId === '2d') return [ALIF, KASRA, YEH, c2, KASRA, YEH, FATHA, ALIF]
          if (pronounId === '2mp') return [ALIF, KASRA, YEH, c2, DAMMA, WAW, ALIF]
          if (pronounId === '2fp') return [ALIF, KASRA, YEH, c2, KASRA, YEH, NOON, FATHA]
        }

        if (isInitialWeak && isMiddleHamza && !isFinalWeak) return [ALIF, KASRA, c1, ...stem.slice(2)]

        if (isInitialWeak && isHamzatedLetter(c3)) return stem

        if (isInitialWeak && pastVowel === 'i' && !isFinalWeak && c2 !== c3) return [ALIF, KASRA, c1, ...stem.slice(2)]

        if (isInitialHamza && c2 === c3) {
          if (presentVowel === 'i') {
            const prefix = [ALIF_HAMZA_BELOW, KASRA, c2, SHADDA]
            if (pronounId === '2ms') return [...prefix, FATHA]
            if (pronounId === '2fs') return [...prefix, KASRA, YEH]
            if (pronounId === '2d') return [...prefix, FATHA, ALIF]
            if (pronounId === '2mp') return [...prefix, DAMMA, WAW, ALIF]
            if (pronounId === '2fp') return [ALIF, KASRA, YEH, c2, KASRA, c3, SUKOON, NOON, FATHA]
          } else {
            const prefix = [ALIF_HAMZA, DAMMA, c2, SHADDA]
            if (pronounId === '2ms') return [...prefix, FATHA]
            if (pronounId === '2fs') return [...prefix, KASRA, YEH]
            if (pronounId === '2d') return [...prefix, FATHA, ALIF]
            if (pronounId === '2mp') return [...prefix, DAMMA, WAW, ALIF]
            if (pronounId === '2fp') return [ALIF_HAMZA, DAMMA, c2, DAMMA, c3, SUKOON, NOON, FATHA]
          }
        }

        if (isInitialWeak && isFinalWeak && isMiddleHamza && pronounId === '2d')
          return [HAMZA_ON_YEH, KASRA, YEH, FATHA, ALIF]

        if (isInitialWeak && isFinalWeak) {
          const alifIndex = stem.indexOf(ALIF)

          if (alifIndex >= 0 && stem[alifIndex - 1] === FATHA)
            return [...stem.slice(0, alifIndex - 1), KASRA, YEH, FATHA, ALIF]
        }

        if (isInitialWeak && c2 === c3 && pronounId === '2fp') return [ALIF, KASRA, YEH, ...stem.slice(2)]

        if (isInitialWeak && presentVowel === 'u') {
          if (stem.at(0) === YEH || stem.at(0) === WAW) return [ALIF, DAMMA, WAW, ...stem.slice(2)]
          return stem
        }

        if (isInitialWeak) return stem

        if (isInitialHamza && isMiddleWeak) {
          const prefix = [ALIF_HAMZA, DAMMA]
          if (pronounId === '2ms') return [...prefix, c3, SUKOON]
          if (pronounId === '2fs') return [...prefix, WAW, c3, KASRA, YEH]
          if (pronounId === '2d') return [...prefix, WAW, c3, FATHA, ALIF]
          if (pronounId === '2mp') return [...prefix, WAW, c3, DAMMA, WAW, ALIF]
          if (pronounId === '2fp') return [...prefix, c3, SUKOON, NOON, FATHA]
        }

        if (isInitialHamza && isFinalWeak) {
          const prefix = [ALIF, KASRA, HAMZA_ON_YEH, SUKOON, c2]
          const stemVowel = presentVowel === 'i' && c2 !== NOON ? KASRA : FATHA
          if (pronounId === '2ms') return [...prefix, stemVowel]
          if (pronounId === '2fs') return [...prefix, stemVowel, YEH, SUKOON]
          if (pronounId === '2d') return [...prefix, stemVowel, YEH, FATHA, ALIF]
          if (pronounId === '2mp') return [...prefix, stemVowel === KASRA ? DAMMA : FATHA, WAW, ALIF]
          if (pronounId === '2fp') return [...prefix, stemVowel, YEH, SUKOON, NOON, FATHA]
        }

        if (isInitialHamza && (pastVowel === 'i' || presentVowel === 'i')) return [ALIF, KASRA, YEH, ...stem.slice(2)]

        // Hamzated initial strong verbs drop the hamza
        if (isInitialHamza) return stem.slice(2)

        if (c2 === c3 && presentVowel === 'i' && pronounId === '2ms') return [c1, KASRA, c2, SHADDA, FATHA]

        if (c2 === c3 && presentVowel === 'a' && pronounId !== '2fp')
          // Geminate Form I with present vowel 'a' drops the helping prefix and takes fatḥa on the first radical.
          return [c1, FATHA, ...stem.slice(2)]

        // Verbs with past vowel 'i' (fa3ila pattern) need imperative prefix اِـ
        // This is a morphological rule based on past pattern classification, even though
        // the imperative is technically derived from the present tense (jussive)
        // (e.g., مرض → اِمْرَضْ, سمع → اِسْمَعْ)
        if (pastVowel === 'i') return [ALIF, KASRA, ...stem]

        if (c3 === WAW && last(stem) === ALIF) return stem

        // If stem starts with two consonants (consonant + sukoon), add helping vowel prefix
        // The vowel depends on the present tense vowel: 'u' (damma) → اُ, 'i'/'a' → اِ

        if (isHamzatedLetter(c3) && pronounId === '2mp' && stem.at(1) === SUKOON) return [ALIF, KASRA, ...stem]

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
        if (isInitialHamza && isMiddleWeak && isFinalWeak) return [TEH, FATHA, ALIF_HAMZA, FATHA, WAW, FATHA, SHADDA]

        if (isFinalWeak && pronounId === '2mp') {
          const shaddaIndex = stem.lastIndexOf(SHADDA)
          return [...stem.slice(0, shaddaIndex - 1), FATHA, ...stem.slice(shaddaIndex)]
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
