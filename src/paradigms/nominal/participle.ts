import { derivePresentStem } from '../active/present'
import { isFormIPastVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_MAQSURA,
  DAL,
  DAMMA,
  FATHA,
  HAMZA_ON_YEH,
  KASRA,
  longVowelI,
  longVowelU,
  MEEM,
  resolveFormVIIIInfixConsonant,
  SHADDA,
  SUKOON,
  TANWEEN_FATHA,
  TANWEEN_KASRA,
  WAW,
  YEH,
} from '../tokens'
import { isQuadriliteralVerb, type Verb } from '../verbs'
import { type Morpheme, measureMorpheme, radicalMorpheme, Word } from '../word'

export function deriveActiveParticiple(verb: Verb): Word {
  if (!isQuadriliteralVerb(verb) && verb.form === 1) {
    const [c1, c2, c3] = verb.rootTokens

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
      return new Word([
        radicalMorpheme(c1),
        measureMorpheme(FATHA, ALIF),
        radicalMorpheme(c3),
        measureMorpheme(TANWEEN_KASRA),
      ])

    if (c2.isWeak)
      return new Word([
        radicalMorpheme(c1),
        measureMorpheme(FATHA, ALIF),
        radicalMorpheme(isFormIPastVowel(verb, KASRA) ? c2 : HAMZA_ON_YEH),
        measureMorpheme(KASRA),
        radicalMorpheme(c3),
      ])

    if (verb.masdars?.some((pattern) => ['fa3al', 'fa3aal', 'fi3l', 'fu3ool'].includes(pattern)))
      return new Word([
        radicalMorpheme(c1),
        measureMorpheme(FATHA, ALIF),
        radicalMorpheme(c2),
        measureMorpheme(KASRA),
        radicalMorpheme(c3),
      ])

    if (isFormIPastVowel(verb, DAMMA) && verb.masdars?.some((pattern) => ['fi3al', 'fa3aala'].includes(pattern)))
      return new Word([
        radicalMorpheme(c1),
        measureMorpheme(FATHA),
        radicalMorpheme(c2),
        measureMorpheme(KASRA, YEH),
        radicalMorpheme(c3),
      ])

    if (c1.isWeak || isFormIPastVowel(verb, FATHA))
      return new Word([
        radicalMorpheme(c1),
        measureMorpheme(FATHA, ALIF),
        radicalMorpheme(c2),
        measureMorpheme(KASRA),
        radicalMorpheme(c3),
      ])

    return new Word([
      radicalMorpheme(c1),
      measureMorpheme(FATHA),
      radicalMorpheme(c2),
      measureMorpheme(KASRA, YEH),
      radicalMorpheme(c3),
    ])
  }

  return new Word(deriveParticiple(verb, true))
}

export function derivePassiveParticiple(verb: Verb): Word {
  return new Word(verb.noPassiveParticiple ? [] : deriveParticiple(verb, false))
}

function deriveParticiple(verb: Verb, isActive: boolean): readonly Morpheme[] {
  const presentStem = derivePresentStem(verb)
  const prefix = measureMorpheme(MEEM, DAMMA)
  const vowel = isActive ? KASRA : FATHA

  if (isQuadriliteralVerb(verb)) {
    const q4 = verb.rootTokens[3]
    switch (verb.form) {
      case 1:
      case 2:
      case 3:
        return [prefix, ...presentStem.slice(0, -2), measureMorpheme(vowel), radicalMorpheme(q4)]
      case 4:
        return [
          prefix,
          ...presentStem.slice(0, -4),
          measureMorpheme(vowel),
          radicalMorpheme(q4),
          measureMorpheme(SHADDA),
        ]
    }
  }

  const [c1, c2, c3] = verb.rootTokens
  const defectiveSuffix = isActive ? measureMorpheme(TANWEEN_KASRA) : measureMorpheme(TANWEEN_FATHA, ALIF_MAQSURA)

  switch (verb.form) {
    case 1: {
      const prefix = [measureMorpheme(MEEM, FATHA), radicalMorpheme(c1)]
      if (c3.isWeak) {
        const defectiveLongVowel = c3.equals(YEH) ? longVowelI : longVowelU
        return [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(...defectiveLongVowel, SHADDA)]
      }
      if (c2.equals(WAW))
        return [
          ...prefix,
          ...(verb.presentHollow === 'uncontracted' ? [measureMorpheme(SUKOON), radicalMorpheme(c2)] : []),
          measureMorpheme(...longVowelU),
          radicalMorpheme(c3),
        ]
      if (c2.equals(YEH)) return [...prefix, measureMorpheme(...longVowelI), radicalMorpheme(c3)]
      return [
        ...prefix,
        measureMorpheme(SUKOON),
        radicalMorpheme(c2),
        measureMorpheme(...longVowelU),
        radicalMorpheme(c3),
      ]
    }

    case 2: {
      const stem = [prefix, ...presentStem.slice(0, -2)]
      if (c3.isWeak) return [...stem, defectiveSuffix]
      return [...stem, measureMorpheme(vowel), radicalMorpheme(c3)]
    }

    case 3: {
      const stem = [prefix, ...presentStem.slice(0, 2)]
      if (c3.isWeak) return [...stem, radicalMorpheme(c2), defectiveSuffix]
      if (c2.equals(c3)) return [...stem, radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)]
      return [...stem, radicalMorpheme(c2), measureMorpheme(vowel), radicalMorpheme(c3)]
    }

    case 4: {
      const stem = [prefix, ...presentStem.slice(0, 1)]
      if (c2.isHamza) return [...stem, defectiveSuffix]
      if (c3.isWeak)
        return [...stem, ...(c1.isWeak ? [] : [measureMorpheme(SUKOON)]), radicalMorpheme(c2), defectiveSuffix]
      if (c2.isWeak)
        return [...stem, measureMorpheme(vowel), radicalMorpheme(isActive ? YEH : ALIF), radicalMorpheme(c3)]
      if (c2.equals(c3))
        return [...stem, measureMorpheme(vowel), radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)]
      return [
        ...stem,
        ...(c1.isWeak ? [] : [measureMorpheme(SUKOON)]),
        radicalMorpheme(c2),
        measureMorpheme(vowel),
        radicalMorpheme(c3),
      ]
    }

    case 5: {
      const stem = [prefix, ...presentStem.slice(0, 3)]
      if (c3.isWeak) return [...stem, radicalMorpheme(c2), measureMorpheme(SHADDA), defectiveSuffix]
      return [...stem, radicalMorpheme(c2), measureMorpheme(SHADDA, vowel), radicalMorpheme(c3)]
    }

    case 6: {
      const stem = [prefix, ...presentStem.slice(0, 3)]
      if (c2.equals(c3)) return [...stem, radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)]
      if (c3.isWeak) return [...stem, radicalMorpheme(c2), defectiveSuffix]
      return [...stem, radicalMorpheme(c2), measureMorpheme(vowel), radicalMorpheme(c3)]
    }

    case 7: {
      const stem = [prefix, ...presentStem.slice(0, 3)]
      if (c2.equals(c3)) return [...stem, radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)]
      if (c3.isWeak)
        return [
          ...stem,
          radicalMorpheme(c2),
          isActive ? measureMorpheme(TANWEEN_KASRA) : measureMorpheme(FATHA, ALIF_MAQSURA),
        ]
      if (c2.isWeak) return [...stem, measureMorpheme(ALIF), radicalMorpheme(c3)]
      return [...stem, radicalMorpheme(c2), measureMorpheme(vowel), radicalMorpheme(c3)]
    }

    case 8: {
      const stem = [prefix, ...presentStem.slice(0, 2)]
      const infix = resolveFormVIIIInfixConsonant(c1)
      if (c2.equals(c3)) return [...stem, radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)]
      if (c3.isWeak) return [...stem, radicalMorpheme(c2), defectiveSuffix]
      if (c2.equals(YEH) || (c2.isWeak && !infix.equals(DAL)))
        return [...stem, measureMorpheme(ALIF), radicalMorpheme(c3)]
      return [...stem, radicalMorpheme(c2), measureMorpheme(vowel), radicalMorpheme(c3)]
    }

    case 9: {
      if (!isActive) return []
      return [prefix, ...presentStem]
    }

    case 10: {
      const stem = [prefix, ...presentStem.slice(0, 2)]
      if (c3.isWeak) return [...stem, measureMorpheme(SUKOON), radicalMorpheme(c2), defectiveSuffix]
      if (c2.isWeak)
        return [...stem, measureMorpheme(vowel), radicalMorpheme(isActive ? YEH : ALIF), radicalMorpheme(c3)]
      if (c2.equals(c3))
        return [...stem, measureMorpheme(vowel), radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)]
      return [...stem, measureMorpheme(SUKOON), radicalMorpheme(c2), measureMorpheme(vowel), radicalMorpheme(c3)]
    }
  }
}
