import { mapRecord } from '../../primitives/objects'
import { hasPattern } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_HAMZA_BELOW,
  DAL,
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
  resolveFormVIIIInfixConsonant,
  SHADDA,
  SUKOON,
  seatHamza,
  TEH,
  WAW,
  YEH,
} from '../letters'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { constrainPassiveConjugation } from './support'

interface PassivePastParams {
  prefix: readonly string[]
  suffix?: readonly string[]
  suffix3ms?: readonly string[]
  suffix3sd?: readonly string[]
  suffix3mp?: readonly string[]
  suffix3fp?: readonly string[]
}

function toConjugation(params: PassivePastParams): Record<PronounId, string> {
  const { prefix, suffix = [], suffix3sd = [], suffix3ms, suffix3mp = [], suffix3fp } = params

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
      '3fp': suffix3fp ? [...prefix, ...suffix3fp] : geminateDoubleLetters([...prefix, ...suffix, NOON, FATHA]),
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
  const seatedC2 = seatHamza(c2, KASRA)
  const seatedC3 = seatHamza(c3, KASRA)
  return {
    prefix: [c1, DAMMA, seatedC2, SHADDA, KASRA],
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
  const isMiddleHamza = isHamzatedLetter(c2)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalHamza = isHamzatedLetter(c3)
  const isFinalWeak = isWeakLetter(c3)
  const seatedC1 = isInitialHamza ? WAW : c1
  const seatedC3 = seatHamza(c3, KASRA)

  if (isMiddleHamza)
    return {
      prefix: [ALIF_HAMZA, DAMMA, seatedC1],
      suffix: [KASRA, seatedC3],
      suffix3sd: [KASRA, seatedC3, FATHA],
      suffix3mp: [DAMMA, WAW, ALIF],
    }

  if (isFinalWeak)
    return {
      prefix: [ALIF_HAMZA, DAMMA, seatedC1, SUKOON, c2],
      suffix: [KASRA, seatedC3],
      suffix3sd: [KASRA, seatedC3, FATHA],
      suffix3mp: [DAMMA, WAW, SUKOON, ALIF],
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
  const [c1] = [...verb.root]
  const formII = derivePassivePastFormII(verb)

  return {
    ...formII,
    prefix: [TEH, DAMMA, seatHamza(c1, DAMMA), ...formII.prefix.slice(1)],
  }
}

function derivePassivePastFormVI(verb: Verb): PassivePastParams {
  const [c1, c2, c3] = [...verb.root]
  const seatedC1 = seatHamza(c1, DAMMA)
  const seatedC3 = seatHamza(c3, KASRA)

  if (isWeakLetter(c3))
    return {
      prefix: [TEH, DAMMA, seatedC1, DAMMA, WAW, c2],
      suffix3sd: [KASRA, YEH, FATHA],
    }

  return {
    prefix: [TEH, DAMMA, seatedC1, DAMMA, WAW, c2, KASRA],
    suffix: [seatedC3, SUKOON],
    suffix3sd: [seatedC3, FATHA],
    suffix3mp: [seatedC3, DAMMA, WAW, SUKOON, ALIF],
  }
}

function derivePassivePastFormVII(verb: Verb<7>): PassivePastParams {
  const [c1, c2, c3] = [...verb.root]
  const isMiddleWeak = isWeakLetter(c2)

  if (c2 === c3) {
    return {
      prefix: [ALIF, DAMMA, NOON, SUKOON, c1, DAMMA],
      suffix: [c2, KASRA, c3, SUKOON],
      suffix3sd: [c2, SHADDA, FATHA],
      suffix3mp: [c2, SHADDA, DAMMA, WAW, SUKOON, ALIF],
    }
  }

  if (isMiddleWeak)
    return {
      prefix: [ALIF, DAMMA, NOON, SUKOON, c1, KASRA, YEH],
      suffix3sd: [c3, FATHA],
    }

  return {
    prefix: [ALIF, DAMMA, NOON, SUKOON, c1, DAMMA, c2, KASRA],
    suffix3sd: [c3, FATHA],
  }
}

function derivePassivePastFormVIII(verb: Verb<8>): PassivePastParams {
  const [c1, c2, c3] = [...verb.root]
  const isInitialWeak = isWeakLetter(c1)
  const isInitialHamza = isHamzatedLetter(c1)
  const isFinalWeak = isWeakLetter(c3)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalHamza = isHamzatedLetter(c3)
  const seatedC1 = isHamzatedLetter(c1) ? HAMZA_ON_WAW : c1
  const seatedC2 = seatHamza(c2, KASRA)
  const infix = resolveFormVIIIInfixConsonant(c1)

  if (c2 === c3)
    return {
      prefix: [ALIF, DAMMA, seatedC1, SUKOON, infix, DAMMA],
      suffix: [c2, KASRA, c3, SUKOON],
      suffix3sd: [c2, SHADDA, FATHA],
      suffix3mp: [c2, SHADDA, DAMMA, WAW, SUKOON, ALIF],
    }

  if ((isInitialWeak || isInitialHamza) && isFinalWeak)
    return {
      prefix: [ALIF, DAMMA, TEH, SHADDA, DAMMA, c2],
      suffix: [KASRA, YEH],
      suffix3sd: [KASRA, YEH, FATHA],
      suffix3mp: [DAMMA, WAW, SUKOON, ALIF],
      suffix3fp: [KASRA, YEH, SUKOON, NOON, FATHA],
    }

  if (isInitialWeak || isInitialHamza)
    return {
      prefix: [ALIF, DAMMA, TEH, SHADDA, DAMMA, c2, KASRA],
      suffix3sd: [HAMZA_ON_YEH, FATHA],
    }

  if (infix === c1 && isWeakLetter(c3))
    return {
      prefix: [ALIF, DAMMA, seatedC1, SHADDA, DAMMA, c2],
      suffix: [KASRA, YEH],
      suffix3sd: [KASRA, YEH, FATHA],
      suffix3mp: [DAMMA, WAW, SUKOON, ALIF],
      suffix3fp: [KASRA, YEH, SUKOON, NOON, FATHA],
    }

  if (isFinalWeak)
    return {
      prefix: [ALIF, DAMMA, seatedC1, SUKOON, infix, DAMMA, seatedC2],
      suffix: [KASRA, YEH],
      suffix3sd: [KASRA, YEH, FATHA],
      suffix3mp: [DAMMA, WAW, SUKOON, ALIF],
      suffix3fp: [KASRA, YEH, SUKOON, NOON, FATHA],
    }

  if (!isFinalHamza && (c2 === YEH || (isMiddleWeak && infix !== DAL)))
    return {
      prefix: [ALIF, DAMMA, seatedC1, SUKOON, infix, KASRA, YEH],
      suffix: [c3, SUKOON],
      suffix3sd: [c3, FATHA],
      suffix3mp: [c3, DAMMA, WAW, SUKOON, ALIF],
    }

  if (isMiddleWeak && isFinalHamza)
    return {
      prefix: [ALIF, DAMMA, seatedC1, SUKOON, infix, KASRA, YEH],
      suffix3ms: [HAMZA, FATHA],
    }

  return {
    prefix: [ALIF, DAMMA, seatedC1, SUKOON, infix, DAMMA, seatedC2, KASRA],
    suffix: [c3, SUKOON],
    suffix3sd: [c3, FATHA],
    suffix3mp: [c3, DAMMA, WAW, SUKOON, ALIF],
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
    case 6:
      return derivePassivePastFormVI(verb)
    case 7:
      return derivePassivePastFormVII(verb)
    case 8:
      return derivePassivePastFormVIII(verb)
    default:
      return { prefix: [], suffix3sd: [] }
  }
}

export function conjugatePassivePast(verb: Verb): Record<PronounId, string> {
  return constrainPassiveConjugation(verb, toConjugation(derivePassivePastForms(verb)))
}
