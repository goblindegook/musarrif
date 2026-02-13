import { mapRecord } from '../../primitives/objects'
import { hasPattern } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_HAMZA_BELOW,
  DAMMA,
  FATHA,
  geminateDoubleLetters,
  HAMZA,
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
  suffix3ms?: readonly string[]
  suffix3mp?: readonly string[]
}

function toConjugation(params: PassivePastParams): Record<PronounId, string> {
  const { prefix, suffix, suffix3sd, suffix3ms, suffix3mp = [] } = params
  return mapRecord(
    {
      '1s': [...prefix, ...suffix, TEH, DAMMA],
      '2ms': [...prefix, ...suffix, TEH, FATHA],
      '2fs': [...prefix, ...suffix, TEH, KASRA],
      '3ms': [...prefix, ...(suffix3ms ?? suffix3sd)],
      '3fs': [...prefix, ...suffix3sd, TEH, SUKOON],
      '2d': [...prefix, ...suffix, TEH, DAMMA, MEEM, FATHA, ALIF],
      '3md': [...prefix, ...suffix3sd, ALIF],
      '3fd': [...prefix, ...suffix3sd, TEH, FATHA, ALIF],
      '1p': geminateDoubleLetters([...prefix, ...suffix, NOON, FATHA, ALIF]),
      '2mp': [...prefix, ...suffix, TEH, DAMMA, MEEM, SUKOON],
      '2fp': [...prefix, ...suffix, TEH, DAMMA, NOON, SHADDA, FATHA],
      '3mp': [...prefix, ...suffix3mp],
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

  if (isMiddleHamza && isFinalWeak) {
    return {
      prefix: [c1, DAMMA],
      suffix: [HAMZA_ON_YEH, KASRA, YEH],
      suffix3sd: [HAMZA_ON_YEH, KASRA, YEH, FATHA],
      suffix3mp: [HAMZA_ON_WAW, DAMMA, WAW, SUKOON, ALIF],
    }
  }

  if (isFinalWeak)
    return {
      prefix: [c1, DAMMA, c2],
      suffix: [KASRA, YEH],
      suffix3sd: [KASRA, YEH, FATHA],
      suffix3mp: [DAMMA, WAW, SUKOON, ALIF],
    }

  if (isMiddleWeak && !hasPattern(verb, 'fa3ila-yaf3alu'))
    return {
      prefix: [isInitialHamza ? ALIF_HAMZA_BELOW : c1, KASRA],
      suffix: [c3, SUKOON],
      suffix3sd: [YEH, c3, FATHA],
      suffix3mp: [YEH, c3, DAMMA, WAW, SUKOON, ALIF],
    }

  if (isGeminate)
    return {
      prefix: [c1, DAMMA, c2],
      suffix: [KASRA, c3, SUKOON],
      suffix3sd: [SHADDA, FATHA],
      suffix3mp: [SHADDA, DAMMA, WAW, SUKOON, ALIF],
    }

  if (isFinalHamza)
    return {
      prefix: [c1, DAMMA, c2, KASRA],
      suffix: [HAMZA_ON_YEH, SUKOON],
      suffix3sd: [HAMZA_ON_YEH, FATHA],
      suffix3mp: [HAMZA_ON_YEH, DAMMA, WAW, SUKOON, ALIF],
    }

  return {
    prefix: [c1, DAMMA, c2, KASRA],
    suffix: [c3, SUKOON],
    suffix3sd: [c3, FATHA],
    suffix3mp: [c3, DAMMA, WAW, SUKOON, ALIF],
  }
}

function derivePassivePastFormII(verb: Verb): PassivePastParams {
  const [c1, c2, c3] = [...verb.root]
  const seatedC3 = seatHamza(c3, KASRA)
  return {
    prefix: [c1, DAMMA, c2, SHADDA, KASRA],
    suffix: [seatedC3, SUKOON],
    suffix3sd: [seatedC3, FATHA],
    suffix3mp: [seatedC3, DAMMA, WAW, SUKOON, ALIF],
  }
}

function derivePassivePastFormIII(verb: Verb): PassivePastParams {
  const [c1, c2, c3] = [...verb.root]
  const seatedC2 = seatHamza(c2, KASRA)
  const seatedC3 = seatHamza(c3, KASRA)
  return {
    prefix: [c1, DAMMA, WAW, seatedC2, KASRA],
    suffix: [seatedC3, SUKOON],
    suffix3sd: [seatedC3, FATHA],
    suffix3mp: [seatedC3, DAMMA, WAW, SUKOON, ALIF],
  }
}

function derivePassivePastFormIV(verb: Verb): PassivePastParams {
  const [c1, c2, c3] = [...verb.root]
  const isInitialHamza = isHamzatedLetter(c1)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalHamza = isHamzatedLetter(c3)
  const isFinalWeak = isWeakLetter(c3)
  const seatedC1 = isInitialHamza ? WAW : c1
  const seatedC3 = seatHamza(c3, KASRA)

  if (isFinalWeak)
    return {
      prefix: [ALIF_HAMZA, DAMMA, seatedC1, SUKOON, c2],
      suffix: [KASRA, seatedC3],
      suffix3sd: [KASRA, seatedC3, FATHA],
      suffix3mp: [DAMMA, WAW, ALIF],
    }

  if (isMiddleWeak)
    return {
      prefix: [ALIF_HAMZA, DAMMA, seatedC1, KASRA],
      suffix: [seatedC3, SUKOON],
      suffix3ms: [YEH, isFinalHamza ? HAMZA : seatedC3, FATHA],
      suffix3sd: [YEH, seatedC3, FATHA],
      suffix3mp: [YEH, seatedC3, DAMMA, WAW, SUKOON, ALIF],
    }

  if (c2 === c3)
    return {
      prefix: [ALIF_HAMZA, DAMMA, seatedC1],
      suffix: [SUKOON, c2, KASRA, c3, SUKOON],
      suffix3ms: [KASRA, c2, SHADDA, FATHA],
      suffix3sd: [KASRA, c2, SHADDA, FATHA],
      suffix3mp: [KASRA, c2, SHADDA, DAMMA, WAW, SUKOON, ALIF],
    }

  return {
    prefix: [ALIF_HAMZA, DAMMA, seatedC1, SUKOON, c2, KASRA],
    suffix: [seatedC3, SUKOON],
    suffix3sd: [seatedC3, FATHA],
    suffix3mp: [seatedC3, DAMMA, WAW, SUKOON, ALIF],
  }
}

function derivePassivePastFormV(verb: Verb): PassivePastParams {
  const formII = derivePassivePastFormII(verb)
  return {
    ...formII,
    prefix: [TEH, DAMMA, ...formII.prefix],
  }
}

function derivePassivePastForms(verb: Verb): PassivePastParams {
  switch (verb.form) {
    case 1:
      return derivePassivePastFormI(verb)
    case 2:
      return derivePassivePastFormII(verb)
    case 3:
      return derivePassivePastFormIII(verb)
    case 4:
      return derivePassivePastFormIV(verb)
    case 5:
      return derivePassivePastFormV(verb)
    default:
      return { prefix: [], suffix: [], suffix3sd: [] }
  }
}

export function conjugatePassivePast(verb: Verb): Record<PronounId, string> {
  return toConjugation(derivePassivePastForms(verb))
}
