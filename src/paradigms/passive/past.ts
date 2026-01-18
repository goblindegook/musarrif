import { mapRecord } from '../../primitives/objects'
import {
  ALIF,
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
import { canConjugatePassive } from './support'

function buildForms(params: {
  base: readonly string[]
  stem: readonly string[]
  pluralBase: readonly string[]
  pluralSuffix?: readonly string[]
}): Record<PronounId, readonly string[]> {
  const { base, stem, pluralBase, pluralSuffix = [WAW, ALIF] } = params

  return {
    '1s': [...stem, TEH, DAMMA],
    '2ms': [...stem, TEH, FATHA],
    '2fs': [...stem, TEH, KASRA],
    '3ms': base,
    '3fs': [...base, TEH, SUKOON],
    '2d': [...stem, TEH, DAMMA, MEEM, FATHA, ALIF],
    '3md': [...base, ALIF],
    '3fd': [...base, TEH, FATHA, ALIF],
    '1p': [...stem, NOON, FATHA, ALIF],
    '2mp': [...stem, TEH, DAMMA, MEEM, SUKOON],
    '2fp': [...stem, TEH, DAMMA, NOON, SHADDA, FATHA],
    '3mp': [...pluralBase, ...pluralSuffix],
    '3fp': [...stem, NOON, FATHA],
  }
}

function toConjugation(forms: Record<PronounId, readonly string[]>): Record<PronounId, string> {
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
  if (!canConjugatePassive(verb)) {
    throw new Error('Passive past conjugation is only implemented for regular Form I verbs.')
  }

  const [c1, c2, c3] = [...verb.root]
  const isInitialHamza = isHamzatedLetter(c1)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const isMiddleHamza = isHamzatedLetter(c2)
  const isGeminate = c2 === c3

  if (isInitialHamza && !isMiddleWeak && isFinalWeak) {
    const final = c3 === ALIF_MAQSURA ? YEH : c3
    const base = [c1, DAMMA, c2, KASRA, final, FATHA]
    const stem = [c1, DAMMA, c2, KASRA, final]
    const pluralBase = [c1, DAMMA, c2, DAMMA, WAW]
    const forms = buildForms({ base, stem, pluralBase, pluralSuffix: [ALIF] })
    return toConjugation(forms)
  }

  if (isMiddleHamza && isFinalWeak) {
    const base = [c1, DAMMA, HAMZA_ON_YEH, KASRA, YEH, FATHA]
    const stem = [c1, DAMMA, HAMZA_ON_YEH, KASRA, YEH]
    const pluralBase = [c1, DAMMA, HAMZA_ON_WAW, DAMMA, WAW]
    const forms = buildForms({ base, stem, pluralBase, pluralSuffix: [ALIF] })
    return toConjugation(forms)
  }

  if (isMiddleWeak && isFinalWeak) {
    const final = c3 === ALIF_MAQSURA ? YEH : c3
    const base = [c1, DAMMA, c2, KASRA, final, FATHA]
    const stem = [c1, DAMMA, c2, KASRA, final]
    const pluralBase = [c1, DAMMA, c2, DAMMA, WAW]
    const forms = buildForms({ base, stem, pluralBase, pluralSuffix: [ALIF] })
    return toConjugation(forms)
  }

  if (isMiddleWeak && !isFinalWeak && !isInitialHamza) {
    const base = [c1, KASRA, YEH, c3, FATHA]
    const stem = [c1, KASRA, c3, SUKOON]
    const pluralBase = [c1, KASRA, YEH, c3, DAMMA]
    const forms = buildForms({ base, stem, pluralBase })
    return toConjugation(forms)
  }
  const base = isGeminate ? [c1, DAMMA, c2, SHADDA, FATHA] : [c1, DAMMA, c2, KASRA, c3, FATHA]
  const stem = [c1, DAMMA, c2, KASRA, c3, SUKOON]
  const pluralBase = isGeminate ? [c1, DAMMA, c2, SHADDA, DAMMA] : [c1, DAMMA, c2, KASRA, c3, DAMMA]
  const forms = buildForms({ base, stem, pluralBase })
  return toConjugation(forms)
}
