import { isFormIPastVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  DAL,
  DAMMA,
  FATHA,
  HAMZA,
  HAMZA_ON_YEH,
  KASRA,
  MEEM,
  NOON,
  resolveFormVIIIInfixConsonant,
  SEEN,
  SHADDA,
  SUKOON,
  TANWEEN_KASRA,
  TEH,
  YEH,
} from '../tokens'
import { isQuadriliteralVerb, type Verb } from '../verbs'
import { type MorphemeToken, measureMorpheme, radicalMorpheme, Word } from '../word'

export function participleStem(verb: Verb): readonly MorphemeToken[] {
  const [c1, c2] = verb.rootTokens
  switch (verb.form) {
    case 2:
      return [
        measureMorpheme(MEEM, DAMMA),
        radicalMorpheme(c1),
        measureMorpheme(FATHA),
        radicalMorpheme(c2),
        measureMorpheme(SHADDA),
      ]
    case 3:
      return [measureMorpheme(MEEM, DAMMA), radicalMorpheme(c1), measureMorpheme(FATHA, ALIF)]
    case 4:
      return [measureMorpheme(MEEM, DAMMA), radicalMorpheme(c1)]
    case 5:
      return [measureMorpheme(MEEM, DAMMA, TEH, FATHA), radicalMorpheme(c1), measureMorpheme(FATHA)]
    case 6:
      return [measureMorpheme(MEEM, DAMMA, TEH, FATHA), radicalMorpheme(c1), measureMorpheme(FATHA, ALIF)]
    case 7:
      return [measureMorpheme(MEEM, DAMMA, NOON, SUKOON), radicalMorpheme(c1), measureMorpheme(FATHA)]
    case 10:
      return [measureMorpheme(MEEM, DAMMA, SEEN, SUKOON, TEH, FATHA), radicalMorpheme(c1)]
    default:
      return []
  }
}

export function deriveActiveParticiple(verb: Verb): Word {
  return new Word(
    (() => {
      if (isQuadriliteralVerb(verb)) {
        const [q1, q2, q3, q4] = verb.rootTokens

        switch (verb.form) {
          case 1:
            return [
              measureMorpheme(MEEM, DAMMA),
              radicalMorpheme(q1),
              measureMorpheme(FATHA),
              radicalMorpheme(q2),
              measureMorpheme(SUKOON),
              radicalMorpheme(q3),
              measureMorpheme(KASRA),
              radicalMorpheme(q4),
            ]
          case 2:
            return [
              measureMorpheme(MEEM, DAMMA, TEH, FATHA),
              radicalMorpheme(q1),
              measureMorpheme(FATHA),
              radicalMorpheme(q2),
              measureMorpheme(SUKOON),
              radicalMorpheme(q3),
              measureMorpheme(KASRA),
              radicalMorpheme(q4),
            ]
          case 3:
            return [
              measureMorpheme(MEEM, DAMMA),
              radicalMorpheme(q1),
              measureMorpheme(SUKOON),
              radicalMorpheme(q2),
              measureMorpheme(FATHA, NOON, SUKOON),
              radicalMorpheme(q3),
              measureMorpheme(KASRA),
              radicalMorpheme(q4),
            ]
          case 4:
            return [
              measureMorpheme(MEEM, DAMMA),
              radicalMorpheme(q1),
              measureMorpheme(SUKOON),
              radicalMorpheme(q2),
              measureMorpheme(FATHA),
              radicalMorpheme(q3),
              measureMorpheme(KASRA),
              radicalMorpheme(q4),
              measureMorpheme(SHADDA),
            ]
          default:
            return []
        }
      }

      const [c1, c2, c3] = verb.rootTokens
      const stem = participleStem(verb)

      switch (verb.form) {
        case 1: {
          if (verb.passiveVoice === 'impersonal' && isFormIPastVowel(verb, KASRA))
            return [
              measureMorpheme(ALIF_HAMZA, FATHA),
              radicalMorpheme(c1),
              measureMorpheme(SUKOON),
              radicalMorpheme(c2),
              measureMorpheme(FATHA),
              radicalMorpheme(c3),
            ]

          if (c2.equals(c3))
            return [
              radicalMorpheme(c1),
              measureMorpheme(FATHA, ALIF),
              radicalMorpheme(c2),
              measureMorpheme(SUKOON),
              radicalMorpheme(c3),
            ]

          if (c3.isWeak)
            return [
              radicalMorpheme(c1),
              measureMorpheme(FATHA, ALIF),
              radicalMorpheme(c2),
              measureMorpheme(TANWEEN_KASRA),
            ]

          if (c2.isWeak && c3.isHamza) return [radicalMorpheme(c1), measureMorpheme(FATHA, ALIF, HAMZA, TANWEEN_KASRA)]

          if (c2.isWeak)
            return [
              radicalMorpheme(c1),
              measureMorpheme(FATHA, ALIF),
              radicalMorpheme(isFormIPastVowel(verb, KASRA) ? c2 : HAMZA_ON_YEH),
              measureMorpheme(KASRA),
              radicalMorpheme(c3),
            ]

          if (verb.masdars?.some((pattern) => ['fu3ool', 'fa3al', 'fa3aal'].includes(pattern)))
            return [
              radicalMorpheme(c1),
              measureMorpheme(FATHA, ALIF),
              radicalMorpheme(c2),
              measureMorpheme(KASRA),
              radicalMorpheme(c3),
            ]

          if (c3.isHamza && isFormIPastVowel(verb, DAMMA))
            return [
              radicalMorpheme(c1),
              measureMorpheme(FATHA),
              radicalMorpheme(c2),
              measureMorpheme(KASRA, YEH, SUKOON, HAMZA),
            ]

          if (c1.isHamza && isFormIPastVowel(verb, DAMMA))
            return [
              radicalMorpheme(c1),
              measureMorpheme(FATHA),
              radicalMorpheme(c2),
              measureMorpheme(KASRA, YEH, SUKOON),
              radicalMorpheme(c3),
            ]

          if (!c1.isWeak && isFormIPastVowel(verb, KASRA))
            return [
              radicalMorpheme(c1),
              measureMorpheme(FATHA),
              radicalMorpheme(c2),
              measureMorpheme(KASRA, YEH, SUKOON),
              radicalMorpheme(c3),
            ]

          return [
            radicalMorpheme(c1),
            measureMorpheme(FATHA, ALIF),
            radicalMorpheme(c2),
            measureMorpheme(KASRA),
            radicalMorpheme(c3),
          ]
        }

        case 2: {
          if (c3.isWeak) return [...stem, measureMorpheme(TANWEEN_KASRA)]
          return [...stem, measureMorpheme(KASRA), radicalMorpheme(c3)]
        }

        case 3: {
          if (c3.isWeak) return [...stem, radicalMorpheme(c2), measureMorpheme(TANWEEN_KASRA)]
          if (c2.equals(c3)) return [...stem, radicalMorpheme(c2), measureMorpheme(SHADDA)]
          return [...stem, radicalMorpheme(c2), measureMorpheme(KASRA), radicalMorpheme(c3)]
        }

        case 4: {
          if (c2.isHamza) return [...stem, measureMorpheme(TANWEEN_KASRA)]
          if (c3.isWeak) return [...stem, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(TANWEEN_KASRA)]
          if (c2.isWeak)
            return [...stem, measureMorpheme(KASRA), radicalMorpheme(YEH), measureMorpheme(SUKOON), radicalMorpheme(c3)]
          if (c2.equals(c3))
            return [...stem, measureMorpheme(KASRA), radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)]
          return [...stem, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(KASRA), radicalMorpheme(c3)]
        }

        case 5: {
          if (c3.isWeak && c1.isWeak) return [...stem, radicalMorpheme(c2), measureMorpheme(TANWEEN_KASRA)]
          if (c3.isWeak) return [...stem, radicalMorpheme(c2), measureMorpheme(SHADDA, TANWEEN_KASRA)]
          return [...stem, radicalMorpheme(c2), measureMorpheme(SHADDA, KASRA), radicalMorpheme(c3)]
        }

        case 6: {
          if (c2.equals(c3)) return [...stem, radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)]
          if (c3.isWeak) return [...stem, radicalMorpheme(c2), measureMorpheme(TANWEEN_KASRA)]
          return [...stem, radicalMorpheme(c2), measureMorpheme(KASRA), radicalMorpheme(c3)]
        }

        case 7: {
          if (c2.equals(c3)) return [...stem, radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)]
          if (c3.isWeak) return [...stem, radicalMorpheme(c2), measureMorpheme(TANWEEN_KASRA)]
          if (c2.isWeak) return [...stem, measureMorpheme(ALIF), radicalMorpheme(c3)]
          return [...stem, radicalMorpheme(c2), measureMorpheme(KASRA), radicalMorpheme(c3)]
        }

        case 8: {
          const isInitialWeakOrHamza = c1.isWeak || c1.isHamza
          const infix = resolveFormVIIIInfixConsonant(c1)
          const prefix = [measureMorpheme(MEEM, DAMMA), radicalMorpheme(c1), measureMorpheme(SUKOON, infix, FATHA)]

          if (c2.equals(c3)) return [...prefix, radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)]
          if (isInitialWeakOrHamza && c3.isWeak)
            return [
              measureMorpheme(MEEM, DAMMA, infix, SHADDA, FATHA),
              radicalMorpheme(c2),
              measureMorpheme(TANWEEN_KASRA),
            ]
          if (isInitialWeakOrHamza)
            return [
              measureMorpheme(MEEM, DAMMA, infix, SHADDA, FATHA),
              radicalMorpheme(c2),
              measureMorpheme(KASRA),
              radicalMorpheme(c3),
            ]
          if (c3.isWeak) return [...prefix, radicalMorpheme(c2), measureMorpheme(TANWEEN_KASRA)]
          if (c2.equals(YEH) || (c2.isWeak && !infix.equals(DAL)))
            return [...prefix, measureMorpheme(ALIF), radicalMorpheme(c3)]
          return [...prefix, radicalMorpheme(c2), measureMorpheme(KASRA), radicalMorpheme(c3)]
        }

        case 9: {
          return [
            measureMorpheme(MEEM, DAMMA),
            radicalMorpheme(c1),
            measureMorpheme(SUKOON),
            radicalMorpheme(c2),
            measureMorpheme(FATHA),
            radicalMorpheme(c3),
            measureMorpheme(SHADDA),
          ]
        }

        case 10: {
          if (c3.isWeak) return [...stem, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(TANWEEN_KASRA)]
          if (c2.isWeak) return [...stem, measureMorpheme(KASRA), radicalMorpheme(YEH), radicalMorpheme(c3)]
          if (c2.equals(c3)) return [...stem, measureMorpheme(KASRA), radicalMorpheme(c2), measureMorpheme(SHADDA)]
          return [...stem, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(KASRA), radicalMorpheme(c3)]
        }
      }
    })(),
  )
}
