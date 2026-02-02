import { mapRecord } from '../../primitives/objects'
import { hasPattern } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA_BELOW,
  ALIF_MAQSURA,
  DAMMA,
  FATHA,
  geminateDoubleLetters,
  HAMZA_ON_WAW,
  HAMZA_ON_YEH,
  isHamzatedLetter,
  isWeakLetter,
  KASRA,
  MEEM,
  NOON,
  SHADDA,
  SUKOON,
  seatHamza,
  TEH,
  WAW,
  YEH,
} from '../letters'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'

interface PassivePastParams {
  prefix: readonly string[]
  suffix: readonly string[]
  suffix3sd: readonly string[]
  suffix3pm?: readonly string[]
}

function toConjugation(params: PassivePastParams): Record<PronounId, string> {
  const { prefix, suffix, suffix3sd, suffix3pm = [] } = params
  return mapRecord(
    {
      '1s': [...prefix, ...suffix, TEH, DAMMA],
      '2ms': [...prefix, ...suffix, TEH, FATHA],
      '2fs': [...prefix, ...suffix, TEH, KASRA],
      '3ms': [...prefix, ...suffix3sd],
      '3fs': [...prefix, ...suffix3sd, TEH, SUKOON],
      '2d': [...prefix, ...suffix, TEH, DAMMA, MEEM, FATHA, ALIF],
      '3md': [...prefix, ...suffix3sd, ALIF],
      '3fd': [...prefix, ...suffix3sd, TEH, FATHA, ALIF],
      '1p': geminateDoubleLetters([...prefix, ...suffix, NOON, FATHA, ALIF]),
      '2mp': [...prefix, ...suffix, TEH, DAMMA, MEEM, SUKOON],
      '2fp': [...prefix, ...suffix, TEH, DAMMA, NOON, SHADDA, FATHA],
      '3mp': [...prefix, ...suffix3pm, DAMMA, WAW, SUKOON, ALIF],
      '3fp': geminateDoubleLetters([...prefix, ...suffix, NOON, FATHA]),
    },
    (value) => value.join('').normalize('NFC'),
  )
}

function derivePassivePastFormI(verb: Verb): PassivePastParams {
  const [c1, c2, c3] = [...verb.root]
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const isInitialHamza = isHamzatedLetter(c1)
  const isMiddleHamza = isHamzatedLetter(c2)
  const isFinalHamza = isHamzatedLetter(c3)
  const isGeminate = c2 === c3
  const isConsonantalMiddleWeak = hasPattern(verb, 'fa3ila-yaf3alu') && (c2 === YEH || c2 === WAW)

  if ((isInitialHamza || isMiddleWeak) && isFinalWeak)
    return {
      prefix: [c1, DAMMA, c2],
      suffix: [KASRA, c3 === ALIF_MAQSURA ? YEH : c3],
      suffix3sd: [KASRA, c3 === ALIF_MAQSURA ? YEH : c3, FATHA],
    }

  if (isMiddleHamza && isFinalWeak) {
    return {
      prefix: [c1, DAMMA],
      suffix: [HAMZA_ON_YEH, KASRA, YEH],
      suffix3sd: [HAMZA_ON_YEH, KASRA, YEH, FATHA],
      suffix3pm: [HAMZA_ON_WAW],
    }
  }

  if (isFinalWeak)
    return {
      prefix: [c1, DAMMA, c2],
      suffix: [KASRA, YEH],
      suffix3sd: [KASRA, YEH, FATHA],
    }

  if (isMiddleWeak && !isConsonantalMiddleWeak)
    return {
      prefix: [isInitialHamza ? ALIF_HAMZA_BELOW : c1, KASRA],
      suffix: [c3, SUKOON],
      suffix3sd: [YEH, c3, FATHA],
      suffix3pm: [YEH, c3],
    }

  if (isGeminate)
    return {
      prefix: [c1, DAMMA, c2],
      suffix: [KASRA, c3, SUKOON],
      suffix3sd: [SHADDA, FATHA],
      suffix3pm: [SHADDA],
    }

  if (isFinalHamza)
    return {
      prefix: [c1, DAMMA, c2, KASRA],
      suffix: [HAMZA_ON_YEH, SUKOON],
      suffix3sd: [HAMZA_ON_YEH, FATHA],
      suffix3pm: [HAMZA_ON_YEH],
    }

  return {
    prefix: [c1, DAMMA, c2, KASRA],
    suffix: [c3, SUKOON],
    suffix3sd: [c3, FATHA],
    suffix3pm: [c3],
  }
}

function derivePassivePastFormII(verb: Verb): PassivePastParams {
  const [c1, c2, c3] = [...verb.root]
  const seatedC3 = seatHamza(c3, KASRA)
  return {
    prefix: [c1, DAMMA, c2, SHADDA, KASRA],
    suffix: [seatedC3, SUKOON],
    suffix3sd: [seatedC3, FATHA],
    suffix3pm: [seatedC3],
  }
}

function derivePassivePastForms(verb: Verb): PassivePastParams {
  switch (verb.form) {
    case 1:
      return derivePassivePastFormI(verb)
    case 2:
      return derivePassivePastFormII(verb)
    default:
      return derivePassivePastFormI(verb)
  }
}

export function conjugatePassivePast(verb: Verb): Record<PronounId, string> {
  return toConjugation(derivePassivePastForms(verb))
}
