import { mapRecord } from '../../primitives/objects'
import { hasPattern } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA_BELOW,
  ALIF_MAQSURA,
  DAMMA,
  FATHA,
  HAMZA_ON_WAW,
  HAMZA_ON_YEH,
  isHamzatedLetter,
  isWeakLetter,
  KASRA,
  MEEM,
  NOON,
  SHADDA,
  SUKOON,
  TEH,
  WAW,
  YEH,
} from '../letters'
import type { PronounId } from '../pronouns'
import { PRONOUN_IDS } from '../pronouns'
import type { Verb } from '../verbs'

function toConjugation(params: {
  base: readonly string[]
  stem: readonly string[]
  thirdMasculinePluralStem: readonly string[]
  finalRadical: string
}): Record<PronounId, string> {
  const { base, stem, thirdMasculinePluralStem, finalRadical } = params
  const forms: Record<PronounId, readonly string[]> = {
    '1s': [...stem, TEH, DAMMA],
    '2ms': [...stem, TEH, FATHA],
    '2fs': [...stem, TEH, KASRA],
    '3ms': base,
    '3fs': [...base, TEH, SUKOON],
    '2d': [...stem, TEH, DAMMA, MEEM, FATHA, ALIF],
    '3md': [...base, ALIF],
    '3fd': [...base, TEH, FATHA, ALIF],
    // TODO: Simplify construction and geminate noons afterwards
    '1p': finalRadical === NOON ? [...stem.slice(0, -2), NOON, SHADDA, FATHA, ALIF] : [...stem, NOON, FATHA, ALIF],
    '2mp': [...stem, TEH, DAMMA, MEEM, SUKOON],
    '2fp': [...stem, TEH, DAMMA, NOON, SHADDA, FATHA],
    '3mp': [...thirdMasculinePluralStem, DAMMA, WAW, ALIF],
    // TODO: Simplify construction and geminate noon afterwards
    '3fp': finalRadical === NOON ? [...stem.slice(0, -2), NOON, SHADDA, FATHA] : [...stem, NOON, FATHA],
  }
  return mapRecord(
    PRONOUN_IDS.reduce(
      (acc, pronounId) => {
        acc[pronounId] = forms[pronounId]
        return acc
      },
      {} as Record<PronounId, readonly string[]>,
    ),
    (value) => value.join('').normalize('NFC'),
  )
}

export function conjugatePassivePast(verb: Verb): Record<PronounId, string> {
  const [c1, c2, c3] = [...verb.root]
  const isInitialHamza = isHamzatedLetter(c1)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const isMiddleHamza = isHamzatedLetter(c2)
  const isGeminate = c2 === c3

  const isConsonantalMiddleWeak = hasPattern(verb, 'fa3ila-yaf3alu') && (c2 === YEH || c2 === WAW)

  if ((isInitialHamza || isMiddleWeak) && isFinalWeak) {
    return toConjugation({
      base: [c1, DAMMA, c2, KASRA, c3 === ALIF_MAQSURA ? YEH : c3, FATHA],
      stem: [c1, DAMMA, c2, KASRA, c3 === ALIF_MAQSURA ? YEH : c3],
      thirdMasculinePluralStem: [c1, DAMMA, c2],
      finalRadical: c3,
    })
  }

  if (isMiddleHamza && isFinalWeak) {
    return toConjugation({
      base: [c1, DAMMA, HAMZA_ON_YEH, KASRA, YEH, FATHA],
      stem: [c1, DAMMA, HAMZA_ON_YEH, KASRA, YEH],
      thirdMasculinePluralStem: [c1, DAMMA, HAMZA_ON_WAW],
      finalRadical: c3,
    })
  }

  if (isFinalWeak && !isMiddleWeak && !isInitialHamza) {
    return toConjugation({
      base: [c1, DAMMA, c2, KASRA, YEH, FATHA],
      stem: [c1, DAMMA, c2, KASRA, YEH],
      thirdMasculinePluralStem: [c1, DAMMA, c2],
      finalRadical: c3,
    })
  }

  if (isMiddleWeak && !isConsonantalMiddleWeak) {
    const seatedC1 = isInitialHamza ? ALIF_HAMZA_BELOW : c1
    return toConjugation({
      base: [seatedC1, KASRA, YEH, c3, FATHA],
      stem: [seatedC1, KASRA, c3, SUKOON],
      thirdMasculinePluralStem: [seatedC1, KASRA, YEH, c3],
      finalRadical: c3,
    })
  }

  if (isGeminate) {
    return toConjugation({
      base: [c1, DAMMA, c2, SHADDA, FATHA],
      stem: [c1, DAMMA, c2, KASRA, c3, SUKOON],
      thirdMasculinePluralStem: [c1, DAMMA, c2, SHADDA],
      finalRadical: c3,
    })
  }

  return toConjugation({
    base: [c1, DAMMA, c2, KASRA, c3, FATHA],
    stem: [c1, DAMMA, c2, KASRA, c3, SUKOON],
    thirdMasculinePluralStem: [c1, DAMMA, c2, KASRA, c3],
    finalRadical: c3,
  })
}
