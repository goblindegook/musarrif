import { mapRecord } from '../../primitives/objects'
import { isFormIPresentVowel } from '../form-i-vowels'
import type { PronounId } from '../pronouns'
import { ALIF, DAMMA, FATHA, HAMZA, KASRA, longVowel, NOON, SHADDA, SUKOON, WAW, YEH } from '../tokens'
import { isQuadriliteralVerb, type Verb } from '../verbs'
import { agreementMorpheme, type Morpheme, measureMorpheme, radicalMorpheme, Word } from '../word'
import { conjugatePresentMood } from './present'

export function conjugateImperative(verb: Verb): Record<PronounId, Word> {
  const [c1, c2, c3] = verb.rootTokens

  return mapRecord(
    mapRecord(conjugatePresentMood(verb, 'jussive'), (jussive, pronounId) => {
      if (!pronounId.startsWith('2')) return []

      const stem = jussive.morphemes.slice(1)

      if (isQuadriliteralVerb(verb)) return [3, 4].includes(verb.form) ? [measureMorpheme(ALIF, KASRA), ...stem] : stem

      switch (verb.form) {
        case 1: {
          const isPatternI = isFormIPresentVowel(verb, KASRA)
          const isPatternU = isFormIPresentVowel(verb, DAMMA)
          const patternLongVowel = longVowel(isPatternU ? DAMMA : KASRA)

          if (c1.isWeak) {
            if (stem.at(1)?.tokens.at(0)?.equals(FATHA) && c3.isWeak)
              return [...stem.slice(0, 1), measureMorpheme(KASRA, YEH), ...stem.slice(1)]
            if (c2.equals(c3) && pronounId === '2fp') return [measureMorpheme(ALIF, KASRA, YEH), ...stem.slice(1)]
            if (c1.equals(YEH) && c2.isHamza) return [measureMorpheme(ALIF, ...patternLongVowel), ...stem.slice(2)]
            if (c1.equals(YEH)) return [measureMorpheme(ALIF, ...patternLongVowel), ...stem.slice(1)]
            if (c2.isHamza) return [radicalMorpheme(HAMZA), ...stem.slice(1)]
          }

          if (c1.isHamza) {
            const initialHamzatedStem = jussive.morphemes.slice(3)

            if (verb.contractedImperative) return initialHamzatedStem

            if (c3.isWeak) {
              const glide = c2.equals(NOON) || !isPatternI ? FATHA : pronounId === '2mp' ? DAMMA : KASRA
              const suffixTokens = jussive.morphemes
                .slice(4)
                .flatMap((m) => [...m.tokens])
                .slice(1)
              return [
                measureMorpheme(ALIF, KASRA),
                radicalMorpheme(c1),
                measureMorpheme(SUKOON),
                radicalMorpheme(c2),
                measureMorpheme(glide),
                agreementMorpheme(...suffixTokens),
              ]
            }

            if (c2.equals(c3)) {
              const prefix = [
                radicalMorpheme(HAMZA),
                measureMorpheme(isPatternI ? KASRA : DAMMA),
                radicalMorpheme(c2),
                measureMorpheme(SUKOON),
                radicalMorpheme(c3),
              ]
              if (pronounId === '2ms') return [...prefix, measureMorpheme(FATHA)]
              if (pronounId === '2fs') return [...prefix, agreementMorpheme(KASRA, YEH)]
              if (pronounId === '2d') return [...prefix, agreementMorpheme(FATHA, ALIF)]
              if (pronounId === '2mp') return [...prefix, agreementMorpheme(DAMMA, WAW, ALIF)]
              return [measureMorpheme(ALIF, ...patternLongVowel), ...initialHamzatedStem]
            }

            if (c2.isWeak) return [radicalMorpheme(HAMZA), ...stem.slice(1)]

            if (isPatternU)
              return [
                measureMorpheme(ALIF, DAMMA),
                radicalMorpheme(c1),
                measureMorpheme(SUKOON),
                ...initialHamzatedStem,
              ]

            return [measureMorpheme(ALIF, KASRA, YEH), measureMorpheme(SUKOON), ...initialHamzatedStem]
          }

          if (c3.equals(WAW) && isPatternU && pronounId === '2d')
            return [measureMorpheme(ALIF, DAMMA), ...stem.slice(0, -2), measureMorpheme(FATHA, ALIF)]

          if (c3.equals(WAW) && stem.at(-1)?.contains(ALIF) && !isPatternU) return stem

          // Words cannot start with two consecutive consonants, add alif al-wasl:
          if (stem.at(1)?.tokens.at(0)?.equals(SUKOON))
            return [measureMorpheme(ALIF, isPatternU ? DAMMA : KASRA), ...stem]

          return stem
        }

        case 2:
        case 3: {
          if (c1.isHamza) return [radicalMorpheme(HAMZA), ...stem.slice(1)]
          if (c3.isWeak && pronounId === '2d') return restoreWeakLetterBeforeAlif(stem)
          return stem
        }

        case 4: {
          if (c1.isHamza) return [measureMorpheme(HAMZA, FATHA, ALIF), ...stem.slice(2)]
          if (c3.isWeak && pronounId === '2d')
            return [measureMorpheme(HAMZA, FATHA), ...restoreWeakLetterBeforeAlif(stem)]
          return [measureMorpheme(HAMZA, FATHA), ...stem]
        }

        case 5: {
          const shaddaIndex = stem.findLastIndex((m) => m.contains(SHADDA))
          return [...stem.slice(0, shaddaIndex - 1), measureMorpheme(FATHA), ...stem.slice(shaddaIndex)]
        }

        case 7:
        case 8:
        case 9:
        case 10: {
          if (c1.isHamza && c2.equals(c3)) return [measureMorpheme(ALIF, KASRA), radicalMorpheme(c1), ...stem.slice(1)]
          if (c3.isWeak && pronounId === '2d')
            return [measureMorpheme(ALIF, KASRA), ...restoreWeakLetterBeforeAlif(stem)]
          return [measureMorpheme(ALIF, KASRA), ...stem]
        }
      }

      return stem
    }),
    (m) => new Word(m),
  )
}

function restoreWeakLetterBeforeAlif(stem: readonly Morpheme[]): readonly Morpheme[] {
  if (stem.at(-2)?.contains(YEH)) return stem
  const final = stem.at(-1)
  if (final?.tokens.at(0)?.equals(FATHA)) return stem.with(-1, agreementMorpheme(KASRA, YEH, FATHA, ALIF))
  return stem.with(-1, agreementMorpheme(YEH, FATHA, ALIF))
}
