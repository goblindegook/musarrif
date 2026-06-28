import { FATHA, longVowelI, longVowelU, MEEM, SHADDA, SUKOON, WAW, YEH } from '../tokens'
import { isQuadriliteralVerb, type Verb } from '../verbs'
import { measureMorpheme, radicalMorpheme, Word } from '../word'
import { deriveParticiple } from './participle'

export function derivePassiveParticiple(verb: Verb): Word {
  if (verb.noPassiveParticiple) return new Word([])

  if (!isQuadriliteralVerb(verb) && verb.form === 1) {
    const [c1, c2, c3] = verb.rootTokens
    const prefix = [measureMorpheme(MEEM, FATHA), radicalMorpheme(c1)]
    const defectiveLongVowel = c3.equals(YEH) ? longVowelI : longVowelU

    if (c3.isWeak)
      return new Word([
        ...prefix,
        measureMorpheme(SUKOON),
        radicalMorpheme(c2),
        measureMorpheme(...defectiveLongVowel, SHADDA),
      ])

    if (c2.equals(WAW))
      return new Word([
        ...prefix,
        ...(verb.presentHollow === 'uncontracted' ? [measureMorpheme(SUKOON), radicalMorpheme(c2)] : []),
        measureMorpheme(...longVowelU),
        radicalMorpheme(c3),
      ])

    if (c2.equals(YEH)) return new Word([...prefix, measureMorpheme(...longVowelI), radicalMorpheme(c3)])

    return new Word([
      ...prefix,
      measureMorpheme(SUKOON),
      radicalMorpheme(c2),
      measureMorpheme(...defectiveLongVowel),
      radicalMorpheme(c3),
    ])
  }

  return new Word(deriveParticiple(verb, FATHA))
}
