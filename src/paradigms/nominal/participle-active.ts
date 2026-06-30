import { isFormIPastVowel } from '../form-i-vowels'
import { ALIF, ALIF_HAMZA, DAMMA, FATHA, HAMZA, HAMZA_ON_YEH, KASRA, SUKOON, TANWEEN_KASRA, YEH } from '../tokens'
import { isQuadriliteralVerb, type Verb } from '../verbs'
import { measureMorpheme, radicalMorpheme, Word } from '../word'
import { deriveParticiple } from './participle'

export function deriveActiveParticiple(verb: Verb): Word {
  if (!isQuadriliteralVerb(verb) && verb.form === 1) {
    const [c1, c2, c3] = verb.rootTokens

    if (verb.passiveVoice === 'impersonal' && isFormIPastVowel(verb, KASRA))
      return new Word([
        measureMorpheme(ALIF_HAMZA, FATHA),
        radicalMorpheme(c1),
        measureMorpheme(SUKOON),
        radicalMorpheme(c2),
        measureMorpheme(FATHA),
        radicalMorpheme(c3),
      ])

    if (c2.equals(c3))
      return new Word([
        radicalMorpheme(c1),
        measureMorpheme(FATHA, ALIF),
        radicalMorpheme(c2),
        measureMorpheme(SUKOON),
        radicalMorpheme(c3),
      ])

    if (c3.isWeak)
      return new Word([
        radicalMorpheme(c1),
        measureMorpheme(FATHA, ALIF),
        radicalMorpheme(c2),
        measureMorpheme(TANWEEN_KASRA),
      ])

    if (c2.isWeak && c3.isHamza)
      return new Word([radicalMorpheme(c1), measureMorpheme(FATHA, ALIF, HAMZA, TANWEEN_KASRA)])

    if (c2.isWeak)
      return new Word([
        radicalMorpheme(c1),
        measureMorpheme(FATHA, ALIF),
        radicalMorpheme(isFormIPastVowel(verb, KASRA) ? c2 : HAMZA_ON_YEH),
        measureMorpheme(KASRA),
        radicalMorpheme(c3),
      ])

    if (verb.masdars?.some((pattern) => ['fu3ool', 'fa3al', 'fa3aal'].includes(pattern)))
      return new Word([
        radicalMorpheme(c1),
        measureMorpheme(FATHA, ALIF),
        radicalMorpheme(c2),
        measureMorpheme(KASRA),
        radicalMorpheme(c3),
      ])

    if (c3.isHamza && isFormIPastVowel(verb, DAMMA))
      return new Word([
        radicalMorpheme(c1),
        measureMorpheme(FATHA),
        radicalMorpheme(c2),
        measureMorpheme(KASRA, YEH, SUKOON, HAMZA),
      ])

    if (c1.isHamza && isFormIPastVowel(verb, DAMMA))
      return new Word([
        radicalMorpheme(c1),
        measureMorpheme(FATHA),
        radicalMorpheme(c2),
        measureMorpheme(KASRA, YEH, SUKOON),
        radicalMorpheme(c3),
      ])

    if (!c1.isWeak && isFormIPastVowel(verb, KASRA))
      return new Word([
        radicalMorpheme(c1),
        measureMorpheme(FATHA),
        radicalMorpheme(c2),
        measureMorpheme(KASRA, YEH, SUKOON),
        radicalMorpheme(c3),
      ])

    return new Word([
      radicalMorpheme(c1),
      measureMorpheme(FATHA, ALIF),
      radicalMorpheme(c2),
      measureMorpheme(KASRA),
      radicalMorpheme(c3),
    ])
  }

  return new Word(deriveParticiple(verb, true))
}
