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

function collapseFinalNoon(
  forms: Record<PronounId, readonly string[]>,
  finalRadical: string,
): Record<PronounId, readonly string[]> {
  if (finalRadical !== NOON) return forms

  return {
    ...forms,
    '1p': replaceSuffix(forms['1p'], [NOON, SUKOON, NOON, FATHA, ALIF], [NOON, SHADDA, FATHA, ALIF]),
    '3fp': replaceSuffix(forms['3fp'], [NOON, SUKOON, NOON, FATHA], [NOON, SHADDA, FATHA]),
  }
}

function replaceSuffix(
  stem: readonly string[],
  find: readonly string[],
  replacement: readonly string[],
): readonly string[] {
  if (!stem.join('').endsWith(find.join(''))) return stem
  return Array.from(stem.join('').slice(0, stem.length - find.length) + replacement.join(''))
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
    return toConjugation(
      collapseFinalNoon(
        buildForms({
          base: [c1, DAMMA, c2, KASRA, final, FATHA],
          stem: [c1, DAMMA, c2, KASRA, final],
          pluralBase: [c1, DAMMA, c2, DAMMA, WAW],
          pluralSuffix: [ALIF],
        }),
        c3,
      ),
    )
  }

  if (isMiddleHamza && isFinalWeak) {
    return toConjugation(
      collapseFinalNoon(
        buildForms({
          base: [c1, DAMMA, HAMZA_ON_YEH, KASRA, YEH, FATHA],
          stem: [c1, DAMMA, HAMZA_ON_YEH, KASRA, YEH],
          pluralBase: [c1, DAMMA, HAMZA_ON_WAW, DAMMA, WAW],
          pluralSuffix: [ALIF],
        }),
        c3,
      ),
    )
  }

  if (isFinalWeak && !isMiddleWeak && !isInitialHamza) {
    return toConjugation(
      collapseFinalNoon(
        buildForms({
          base: [c1, DAMMA, c2, KASRA, YEH, FATHA],
          stem: [c1, DAMMA, c2, KASRA, YEH],
          pluralBase: [c1, DAMMA, c2, DAMMA, WAW],
          pluralSuffix: [ALIF],
        }),
        c3,
      ),
    )
  }

  if (isMiddleWeak && isFinalWeak) {
    const final = c3 === ALIF_MAQSURA ? YEH : c3
    return toConjugation(
      collapseFinalNoon(
        buildForms({
          base: [c1, DAMMA, c2, KASRA, final, FATHA],
          stem: [c1, DAMMA, c2, KASRA, final],
          pluralBase: [c1, DAMMA, c2, DAMMA, WAW],
          pluralSuffix: [ALIF],
        }),
        c3,
      ),
    )
  }

  if (isMiddleWeak && !isFinalWeak && !isInitialHamza) {
    return toConjugation(
      collapseFinalNoon(
        buildForms({
          base: [c1, KASRA, YEH, c3, FATHA],
          stem: [c1, KASRA, c3, SUKOON],
          pluralBase: [c1, KASRA, YEH, c3, DAMMA],
        }),
        c3,
      ),
    )
  }

  return toConjugation(
    collapseFinalNoon(
      buildForms({
        base: isGeminate ? [c1, DAMMA, c2, SHADDA, FATHA] : [c1, DAMMA, c2, KASRA, c3, FATHA],
        stem: [c1, DAMMA, c2, KASRA, c3, SUKOON],
        pluralBase: isGeminate ? [c1, DAMMA, c2, SHADDA, DAMMA] : [c1, DAMMA, c2, KASRA, c3, DAMMA],
      }),
      c3,
    ),
  )
}
