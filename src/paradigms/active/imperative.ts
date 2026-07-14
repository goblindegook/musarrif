import { mapRecord } from '../../primitives/objects'
import { isFormIPresentVowel } from '../form-i-vowels'
import type { PronounId } from '../pronouns'
import {
  ALIF,
  DAMMA,
  FATHA,
  HAMZA,
  KASRA,
  longVowelA,
  longVowelI,
  longVowelU,
  NOON,
  SHADDA,
  SUKOON,
  WAW,
  YEH,
} from '../tokens'
import { isQuadriliteralVerb, type Verb } from '../verbs'
import { agreementMorpheme, measureMorpheme, radicalMorpheme, Word } from '../word'
import { conjugatePresentMood } from './present'

export function conjugateImperative(verb: Verb): Record<PronounId, Word> {
  const [c1, c2, c3] = verb.rootTokens

  return mapRecord(
    mapRecord(conjugatePresentMood(verb, 'jussive'), (jussive, pronounId) => {
      if (!pronounId.startsWith('2')) return []

      const jussiveMorphemes = jussive.morphemes.filter((m) => m.role !== 'elided')
      const stem = jussiveMorphemes.slice(1)

      if (isQuadriliteralVerb(verb))
        return stem.at(1)?.equals([SUKOON])
          ? // Words cannot start with two consecutive consonants, add alif al-wasl:
            [measureMorpheme(ALIF, KASRA), ...stem]
          : stem

      switch (verb.form) {
        case 1: {
          const isPatternI = isFormIPresentVowel(verb, KASRA)
          const isPatternU = isFormIPresentVowel(verb, DAMMA) || c3.equals(WAW)
          const patternLongVowel = isPatternU ? longVowelU : longVowelI

          if (c1.isWeak) {
            if (c2.equals(c3) && pronounId === '2fp')
              return [measureMorpheme(ALIF, ...patternLongVowel), ...stem.slice(1)]
            if (c1.equals(YEH)) return [measureMorpheme(ALIF, ...patternLongVowel), ...stem.slice(c2.isHamza ? 2 : 1)]
            if (c2.isHamza) return [radicalMorpheme(HAMZA), ...stem.slice(1)]
          }

          if (c1.isHamza) {
            if (verb.contractedImperative) return jussiveMorphemes.slice(3)

            if (c3.isWeak)
              return [
                measureMorpheme(ALIF, KASRA),
                radicalMorpheme(c1),
                measureMorpheme(SUKOON),
                radicalMorpheme(c2),
                measureMorpheme(c2.equals(NOON) || !isPatternI ? FATHA : pronounId === '2mp' ? DAMMA : KASRA),
                agreementMorpheme(
                  ...jussiveMorphemes
                    .slice(4)
                    .flatMap((m) => m.tokens)
                    .slice(1),
                ),
              ]

            if (c2.equals(c3)) {
              const prefix = [
                radicalMorpheme(HAMZA),
                measureMorpheme(isPatternI ? KASRA : DAMMA),
                radicalMorpheme(c2),
                measureMorpheme(SUKOON),
                radicalMorpheme(c3),
              ]
              if (pronounId === '2ms') return [...prefix, measureMorpheme(FATHA)]
              if (pronounId === '2fs') return [...prefix, agreementMorpheme(...longVowelI)]
              if (pronounId === '2d') return [...prefix, agreementMorpheme(...longVowelA)]
              if (pronounId === '2mp') return [...prefix, agreementMorpheme(...longVowelU, ALIF)]
              return [measureMorpheme(ALIF, ...patternLongVowel), ...jussiveMorphemes.slice(3)]
            }

            if (c2.isWeak) return [radicalMorpheme(HAMZA), ...stem.slice(1)]

            if (isPatternU)
              return [
                measureMorpheme(ALIF, DAMMA),
                radicalMorpheme(c1),
                measureMorpheme(SUKOON),
                ...jussiveMorphemes.slice(3),
              ]

            return [
              measureMorpheme(ALIF, KASRA),
              radicalMorpheme(c1),
              measureMorpheme(SUKOON),
              ...jussiveMorphemes.slice(3),
            ]
          }

          // Words cannot start with two consecutive consonants, add alif al-wasl:
          if (stem.at(1)?.startsWith([SUKOON])) return [measureMorpheme(ALIF, isPatternU ? DAMMA : KASRA), ...stem]

          return stem
        }

        case 2:
        case 3: {
          return c1.isHamza ? [radicalMorpheme(HAMZA), ...stem.slice(1)] : stem
        }

        case 4: {
          if (c1.isHamza)
            return c3.isWeak
              ? [measureMorpheme(HAMZA, ...longVowelA), radicalMorpheme(c2), ...stem.slice(1)]
              : [measureMorpheme(HAMZA, ...longVowelA), ...stem.slice(2)]
          if (c1.isWeak && c3.isWeak) {
            const prefix = [
              measureMorpheme(HAMZA, FATHA),
              radicalMorpheme(c1),
              measureMorpheme(SUKOON),
              radicalMorpheme(c2),
            ]
            if (pronounId === '2ms') return [...prefix, measureMorpheme(KASRA)]
            if (pronounId === '2fs') return [...prefix, agreementMorpheme(KASRA, YEH)]
            if (pronounId === '2d') return [...prefix, agreementMorpheme(KASRA, YEH, FATHA, ALIF)]
            if (pronounId === '2mp') return [...prefix, agreementMorpheme(DAMMA, WAW, ALIF)]
            return [...prefix, agreementMorpheme(KASRA, YEH, NOON, FATHA)]
          }
          return [measureMorpheme(HAMZA, FATHA), ...stem]
        }

        case 5: {
          const shaddaIndex = stem.findLastIndex((m) => m.includes(SHADDA))
          return [...stem.slice(0, shaddaIndex - 2), measureMorpheme(FATHA), ...stem.slice(shaddaIndex - 1)]
        }

        case 7:
        case 8:
        case 9:
        case 10: {
          if (c1.isHamza && c2.equals(c3)) return [measureMorpheme(ALIF, KASRA), radicalMorpheme(c1), ...stem.slice(1)]
          return [measureMorpheme(ALIF, KASRA), ...stem]
        }
      }

      return stem
    }),
    (m) => new Word(m),
  )
}
