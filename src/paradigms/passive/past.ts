import { mapRecord } from '../../primitives/objects'
import { isFormIPastVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  DAL,
  DAMMA,
  FATHA,
  finalize,
  KASRA,
  MEEM,
  NOON,
  Root,
  resolveFormVIIIInfixConsonant,
  SEEN,
  SHADDA,
  SUKOON,
  TEH,
  type Token,
  WAW,
  YEH,
} from '../letters'
import type { PronounId } from '../pronouns'
import type { FormIVerb, NonFormIVerb, Verb } from '../verbs'
import { constrainPassiveConjugation } from './support'

interface PassivePastParams {
  prefix: readonly Token[]
  suffix?: readonly Token[]
  suffix3ms?: readonly Token[]
  suffix3sd?: readonly Token[]
  suffix3mp?: readonly Token[]
  suffix3fp?: readonly Token[]
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
      '1p': [...prefix, ...suffix, NOON, FATHA, ALIF],
      '2mp': [...prefix, ...suffix, TEH, DAMMA, MEEM, SUKOON],
      '2fp': [...prefix, ...suffix, TEH, DAMMA, NOON, SHADDA, FATHA],
      '3mp': [...prefix, ...suffix3mp],
      '3fp': suffix3fp ? [...prefix, ...suffix3fp] : [...prefix, ...suffix, NOON, FATHA],
    },
    finalize,
  )
}

function derivePassivePastFormI(verb: FormIVerb): PassivePastParams {
  const [c1, c2, c3] = Root(verb.root)

  if (c2.isHamza && c3.isWeak) {
    return {
      prefix: [c1, DAMMA],
      suffix: [c2, KASRA, YEH],
      suffix3sd: [c2, KASRA, YEH, FATHA],
      suffix3mp: [c2, DAMMA, WAW, SUKOON, ALIF],
    }
  }

  if (c3.isWeak)
    return {
      prefix: [c1, DAMMA, c2],
      suffix: [KASRA, YEH],
      suffix3sd: [KASRA, YEH, FATHA],
      suffix3mp: [DAMMA, WAW, SUKOON, ALIF],
    }

  if (c2.isWeak && !isFormIPastVowel(verb, KASRA))
    return {
      prefix: [c1, KASRA],
      suffix: [c3, SUKOON],
      suffix3sd: [YEH, SUKOON, c3, FATHA],
      suffix3mp: [YEH, SUKOON, c3, DAMMA, WAW, SUKOON, ALIF],
    }

  if (c2.equals(c3))
    return {
      prefix: [c1, DAMMA, c2],
      suffix: [KASRA, c3, SUKOON],
      suffix3sd: [SHADDA, FATHA],
      suffix3mp: [SHADDA, DAMMA, WAW, SUKOON, ALIF],
    }

  return {
    prefix: [c1, DAMMA, c2, KASRA, c3],
    suffix: [SUKOON],
    suffix3sd: [FATHA],
    suffix3mp: [DAMMA, WAW, SUKOON, ALIF],
  }
}

function derivePassivePastFormII(verb: NonFormIVerb): PassivePastParams {
  const [c1, c2, c3] = Root(verb.root)
  return {
    prefix: [c1, DAMMA, c2, SHADDA, KASRA],
    suffix: [c3, SUKOON],
    suffix3sd: [c3, FATHA],
    suffix3mp: [c3, DAMMA, WAW, SUKOON, ALIF],
  }
}

function derivePassivePastFormIII(verb: NonFormIVerb): PassivePastParams {
  const [c1, c2, c3] = Root(verb.root)
  return {
    prefix: [c1, DAMMA, WAW, c2, KASRA],
    suffix: [c3, SUKOON],
    suffix3sd: [c3, FATHA],
    suffix3mp: [c3, DAMMA, WAW, SUKOON, ALIF],
  }
}

function derivePassivePastFormIV(verb: NonFormIVerb): PassivePastParams {
  const [c1, c2, c3] = Root(verb.root)

  if (c2.isHamza)
    return {
      prefix: [ALIF_HAMZA, DAMMA, c1.isHamza ? WAW : c1],
      suffix: [KASRA, c3],
      suffix3sd: [KASRA, c3, FATHA],
      suffix3mp: [DAMMA, WAW, ALIF],
    }

  if (c3.isWeak)
    return {
      prefix: [ALIF_HAMZA, DAMMA, c1.isHamza ? WAW : c1, SUKOON, c2],
      suffix: [KASRA, YEH],
      suffix3sd: [KASRA, YEH, FATHA],
      suffix3mp: [DAMMA, WAW, SUKOON, ALIF],
    }

  if (c2.isWeak)
    return {
      prefix: [ALIF_HAMZA, DAMMA, c1.isHamza ? WAW : c1, KASRA],
      suffix: [c3, SUKOON],
      suffix3ms: [YEH, SUKOON, c3, FATHA],
      suffix3sd: [YEH, SUKOON, c3, FATHA],
      suffix3mp: [YEH, SUKOON, c3, DAMMA, WAW, SUKOON, ALIF],
    }

  if (c2.equals(c3))
    return {
      prefix: [ALIF_HAMZA, DAMMA, c1.isHamza ? WAW : c1],
      suffix: [SUKOON, c2, KASRA, c3, SUKOON],
      suffix3ms: [KASRA, c2, SHADDA, FATHA],
      suffix3sd: [KASRA, c2, SHADDA, FATHA],
      suffix3mp: [KASRA, c2, SHADDA, DAMMA, WAW, SUKOON, ALIF],
    }

  return {
    prefix: [ALIF_HAMZA, DAMMA, c1.isHamza ? WAW : c1, SUKOON, c2, KASRA],
    suffix: [c3, SUKOON],
    suffix3sd: [c3, FATHA],
    suffix3mp: [c3, DAMMA, WAW, SUKOON, ALIF],
  }
}

function derivePassivePastFormV(verb: NonFormIVerb): PassivePastParams {
  const formII = derivePassivePastFormII(verb)

  return {
    ...formII,
    prefix: [TEH, DAMMA, ...formII.prefix],
  }
}

function derivePassivePastFormVI(verb: NonFormIVerb): PassivePastParams {
  const [c1, c2, c3] = Root(verb.root)

  if (c3.isWeak)
    return {
      prefix: [TEH, DAMMA, c1, DAMMA, WAW, c2],
      suffix3sd: [KASRA, YEH, FATHA],
    }

  return {
    prefix: [TEH, DAMMA, c1, DAMMA, WAW, c2, KASRA],
    suffix: [c3, SUKOON],
    suffix3sd: [c3, FATHA],
    suffix3mp: [c3, DAMMA, WAW, SUKOON, ALIF],
  }
}

function derivePassivePastFormVII(verb: NonFormIVerb): PassivePastParams {
  const [c1, c2, c3] = Root(verb.root)

  if (c2.equals(c3)) {
    return {
      prefix: [ALIF, DAMMA, NOON, SUKOON, c1, DAMMA],
      suffix: [c2, KASRA, c3, SUKOON],
      suffix3sd: [c2, SHADDA, FATHA],
      suffix3mp: [c2, SHADDA, DAMMA, WAW, SUKOON, ALIF],
    }
  }

  if (c2.isWeak)
    return {
      prefix: [ALIF, DAMMA, NOON, SUKOON, c1, KASRA, YEH],
      suffix3sd: [c3, FATHA],
    }

  return {
    prefix: [ALIF, DAMMA, NOON, SUKOON, c1, DAMMA, c2, KASRA],
    suffix3sd: [c3, FATHA],
  }
}

function derivePassivePastFormVIII(verb: NonFormIVerb): PassivePastParams {
  const [c1, c2, c3] = Root(verb.root)
  const infix = resolveFormVIIIInfixConsonant(c1.letter)

  if (c2.equals(c3))
    return {
      prefix: [ALIF, DAMMA, c1, SUKOON, infix, DAMMA],
      suffix: [c2, KASRA, c3, SUKOON],
      suffix3sd: [c2, SHADDA, FATHA],
      suffix3mp: [c2, SHADDA, DAMMA, WAW, SUKOON, ALIF],
    }

  if ((c1.isWeak || c1.isHamza) && c3.isWeak)
    return {
      prefix: [ALIF, DAMMA, TEH, SHADDA, DAMMA, c2],
      suffix: [KASRA, YEH],
      suffix3sd: [KASRA, YEH, FATHA],
      suffix3mp: [DAMMA, WAW, SUKOON, ALIF],
      suffix3fp: [KASRA, YEH, SUKOON, NOON, FATHA],
    }

  if (c1.isWeak || c1.isHamza)
    return {
      prefix: [ALIF, DAMMA, TEH, SHADDA, DAMMA, c2, KASRA],
      suffix: [c3, SUKOON],
      suffix3sd: [c3, FATHA],
      suffix3mp: [c3, DAMMA, WAW, SUKOON, ALIF],
    }

  if (c3.isWeak)
    return {
      prefix: [ALIF, DAMMA, c1, SUKOON, infix, DAMMA, c2],
      suffix: [KASRA, YEH],
      suffix3sd: [KASRA, YEH, FATHA],
      suffix3mp: [DAMMA, WAW, SUKOON, ALIF],
      suffix3fp: [KASRA, YEH, SUKOON, NOON, FATHA],
    }

  if (c2.is(YEH) || (c2.isWeak && infix !== DAL))
    return {
      prefix: [ALIF, DAMMA, c1, SUKOON, infix, KASRA, YEH, SUKOON],
      suffix3sd: [c3, FATHA],
    }

  return {
    prefix: [ALIF, DAMMA, c1, SUKOON, infix, DAMMA, c2, KASRA],
    suffix: [c3, SUKOON],
    suffix3sd: [c3, FATHA],
    suffix3mp: [c3, DAMMA, WAW, SUKOON, ALIF],
  }
}

function derivePassivePastFormX(verb: NonFormIVerb): PassivePastParams {
  const [c1, c2, c3] = Root(verb.root)

  if (c3.isWeak)
    return {
      prefix: [ALIF, DAMMA, SEEN, SUKOON, TEH, DAMMA, c1, SUKOON, c2],
      suffix: [KASRA, YEH, SUKOON],
      suffix3sd: [KASRA, YEH, FATHA],
      suffix3mp: [DAMMA, WAW, SUKOON, ALIF],
      suffix3fp: [KASRA, YEH, SUKOON, NOON, FATHA],
    }

  if (c2.equals(c3))
    return {
      prefix: [ALIF, DAMMA, SEEN, SUKOON, TEH, DAMMA, c1, KASRA],
      suffix: [c2, KASRA, c3, SUKOON],
      suffix3sd: [c2, SHADDA, FATHA],
      suffix3mp: [c2, SHADDA, DAMMA, WAW, SUKOON, ALIF],
    }

  if (c2.isWeak)
    return {
      prefix: [ALIF, DAMMA, SEEN, SUKOON, TEH, DAMMA, c1, KASRA],
      suffix: [c3, SUKOON],
      suffix3sd: [YEH, SUKOON, c3, FATHA],
      suffix3mp: [YEH, SUKOON, c3, DAMMA, WAW, SUKOON, ALIF],
    }

  return {
    prefix: [ALIF, DAMMA, SEEN, SUKOON, TEH, DAMMA, c1, SUKOON, c2, KASRA],
    suffix: [c3, SUKOON],
    suffix3sd: [c3, FATHA],
    suffix3mp: [c3, DAMMA, WAW, SUKOON, ALIF],
  }
}

function derivePassivePastFormIq(verb: FormIVerb): PassivePastParams {
  const [c1, c2, c3, c4] = Root(verb.root)

  return {
    prefix: [c1, DAMMA, c2.is(YEH) ? WAW : c2, SUKOON, c3, KASRA, c4],
    suffix: [SUKOON],
    suffix3sd: [FATHA],
    suffix3mp: [DAMMA, WAW, SUKOON, ALIF],
  }
}

function derivePassivePastFormIIq(verb: NonFormIVerb): PassivePastParams {
  const [c1, c2, c3, c4] = Root(verb.root)

  return {
    prefix: [TEH, DAMMA, c1, DAMMA, c2, SUKOON, c3, KASRA, c4],
    suffix3sd: [FATHA],
  }
}

function derivePassivePastFormIIIq(verb: NonFormIVerb): PassivePastParams {
  const [c1, c2, c3, c4] = Root(verb.root)

  return {
    prefix: [ALIF, DAMMA, c1, SUKOON, c2, DAMMA, NOON, SUKOON, c3, KASRA, c4],
    suffix3sd: [FATHA],
  }
}

function derivePassivePastFormIVq(verb: NonFormIVerb): PassivePastParams {
  const [c1, c2, c3, c4] = Root(verb.root)

  return {
    prefix: [ALIF, DAMMA, c1, SUKOON, c2, DAMMA],
    suffix: [c3, SUKOON, c4, KASRA, c4, SUKOON],
    suffix3ms: [c3, KASRA, c4, SHADDA, FATHA],
    suffix3sd: [c3, KASRA, c4, SHADDA, FATHA],
    suffix3mp: [c3, KASRA, c4, SHADDA, DAMMA, WAW, SUKOON, ALIF],
  }
}

function derivePassivePastForms(verb: Verb): PassivePastParams {
  if (verb.root.length > 3) {
    switch (verb.form) {
      case 1:
        return derivePassivePastFormIq(verb)
      case 2:
        return derivePassivePastFormIIq(verb)
      case 3:
        return derivePassivePastFormIIIq(verb)
      case 4:
        return derivePassivePastFormIVq(verb)
      default:
        return { prefix: [] }
    }
  }

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
    case 9:
      return { prefix: [] }
    case 10:
      return derivePassivePastFormX(verb)
  }
}

export function conjugatePassivePast(verb: Verb): Record<PronounId, string> {
  return constrainPassiveConjugation(verb, toConjugation(derivePassivePastForms(verb)))
}
