import { mapRecord } from '../../primitives/objects'
import type { PronounId } from '../pronouns'
import { isDual, isFemininePlural, isMasculinePlural } from '../pronouns'
import type { Mood } from '../tense'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_MAQSURA,
  DAL,
  DAMMA,
  FATHA,
  KASRA,
  NOON,
  resolveFormVIIIInfixConsonant,
  SEEN,
  SHADDA,
  SUKOON,
  TEH,
  WAW,
  YEH,
} from '../tokens'
import { type FormIVerb, isQuadriliteralVerb, type NonFormIVerb, type QuadriliteralVerb, type Verb } from '../verbs'
import { agreementMorpheme, elidedMorpheme, type Morpheme, measureMorpheme, radicalMorpheme, Word } from '../word'
import { constrainPassiveConjugation } from './support'

const MOOD_SUFFIXES: Record<Mood, Record<PronounId, readonly Morpheme[]>> = {
  indicative: {
    '1s': [agreementMorpheme(DAMMA)],
    '2ms': [agreementMorpheme(DAMMA)],
    '2fs': [agreementMorpheme(KASRA, YEH, NOON, FATHA)],
    '3ms': [agreementMorpheme(DAMMA)],
    '3fs': [agreementMorpheme(DAMMA)],
    '2d': [agreementMorpheme(FATHA, ALIF, NOON, KASRA)],
    '3md': [agreementMorpheme(FATHA, ALIF, NOON, KASRA)],
    '3fd': [agreementMorpheme(FATHA, ALIF, NOON, KASRA)],
    '1p': [agreementMorpheme(DAMMA)],
    '2mp': [agreementMorpheme(DAMMA, WAW, NOON, FATHA)],
    '2fp': [agreementMorpheme(SUKOON, NOON, FATHA)],
    '3mp': [agreementMorpheme(DAMMA, WAW, NOON, FATHA)],
    '3fp': [agreementMorpheme(SUKOON, NOON, FATHA)],
  },
  subjunctive: {
    '1s': [agreementMorpheme(FATHA)],
    '2ms': [agreementMorpheme(FATHA)],
    '2fs': [agreementMorpheme(KASRA, YEH), elidedMorpheme(NOON, FATHA)],
    '3ms': [agreementMorpheme(FATHA)],
    '3fs': [agreementMorpheme(FATHA)],
    '2d': [agreementMorpheme(FATHA, ALIF), elidedMorpheme(NOON, KASRA)],
    '3md': [agreementMorpheme(FATHA, ALIF), elidedMorpheme(NOON, KASRA)],
    '3fd': [agreementMorpheme(FATHA, ALIF), elidedMorpheme(NOON, KASRA)],
    '1p': [agreementMorpheme(FATHA)],
    '2mp': [agreementMorpheme(DAMMA, WAW, ALIF), elidedMorpheme(NOON, FATHA)],
    '2fp': [agreementMorpheme(SUKOON, NOON, FATHA)],
    '3mp': [agreementMorpheme(DAMMA, WAW, ALIF), elidedMorpheme(NOON, FATHA)],
    '3fp': [agreementMorpheme(SUKOON, NOON, FATHA)],
  },
  jussive: {
    '1s': [agreementMorpheme(SUKOON)],
    '2ms': [agreementMorpheme(SUKOON)],
    '2fs': [agreementMorpheme(KASRA, YEH), elidedMorpheme(NOON, FATHA)],
    '3ms': [agreementMorpheme(SUKOON)],
    '3fs': [agreementMorpheme(SUKOON)],
    '2d': [agreementMorpheme(FATHA, ALIF), elidedMorpheme(NOON, KASRA)],
    '3md': [agreementMorpheme(FATHA, ALIF), elidedMorpheme(NOON, KASRA)],
    '3fd': [agreementMorpheme(FATHA, ALIF), elidedMorpheme(NOON, KASRA)],
    '1p': [agreementMorpheme(SUKOON)],
    '2mp': [agreementMorpheme(DAMMA, WAW, ALIF), elidedMorpheme(NOON, FATHA)],
    '2fp': [agreementMorpheme(SUKOON, NOON, FATHA)],
    '3mp': [agreementMorpheme(DAMMA, WAW, ALIF), elidedMorpheme(NOON, FATHA)],
    '3fp': [agreementMorpheme(SUKOON, NOON, FATHA)],
  },
}

function buildC1SegmentFormI(verb: FormIVerb, pronounId: PronounId): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens

  if (c2.equals(c3)) {
    if (!c1.isWeak && isFemininePlural(pronounId)) return [radicalMorpheme(c1), measureMorpheme(SUKOON)]
    if (isFemininePlural(pronounId)) return [radicalMorpheme(c1)]
    return [radicalMorpheme(c1), measureMorpheme(FATHA)]
  }

  if (c2.isWeak && !c3.isWeak && verb.hollowContraction !== 'uncontracted')
    return [radicalMorpheme(c1), measureMorpheme(FATHA)]

  if (c1.isHamza && pronounId === '1s') return [radicalMorpheme(WAW)]

  if (c1.equals(YEH)) return [radicalMorpheme(WAW)]

  // c1 takes no sukoon only when c2's hamza itself contracts away (defective roots, رأى → يُرَى);
  // a sound c3 keeps the hamza (سَأَلَ → تُسْأَلُ), so c1 still needs its own sukoon here.
  if (c1.isWeak || (c2.isHamza && c3.isWeak)) return [radicalMorpheme(c1)]

  return [radicalMorpheme(c1), measureMorpheme(SUKOON)]
}

function buildC2SegmentFormI(verb: FormIVerb, pronounId: PronounId, mood: Mood): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens

  // Contract only for defective roots with c1 sound (رأى → يُرَى); keep hamza when c1 is weak
  // (وَأَى → يُوءَى) or c3 is sound (سَأَلَ → تُسْأَلُ — no vowel-blending to elide here):
  if (!c1.isWeak && c2.isHamza && c3.isWeak) return []

  if (c2.equals(c3)) {
    if (isFemininePlural(pronounId)) return [radicalMorpheme(c2), measureMorpheme(FATHA)]
    return [radicalMorpheme(c2), measureMorpheme(SUKOON), radicalMorpheme(c3)]
  }

  if (c3.isWeak) return [radicalMorpheme(c2)]

  if (!c2.isWeak || c3.isWeak || verb.hollowContraction === 'uncontracted')
    return [radicalMorpheme(c2), measureMorpheme(FATHA)]

  if (isFemininePlural(pronounId)) return []

  if (mood !== 'jussive' || pronounId === '2fs' || isDual(pronounId) || isMasculinePlural(pronounId))
    return [radicalMorpheme(ALIF)]

  return []
}

function buildC3SegmentFormI(verb: FormIVerb, pronounId: PronounId): readonly Morpheme[] {
  const [, c2, c3] = verb.rootTokens
  if (c3.isWeak) return []
  if (isFemininePlural(pronounId)) return [radicalMorpheme(c3)]
  if (c2.equals(c3)) return []
  return [radicalMorpheme(c3)]
}

function buildSuffixFormI(verb: FormIVerb, mood: Mood, pronounId: PronounId): readonly Morpheme[] {
  const [, c2, c3] = verb.rootTokens
  if (c2.equals(c3)) return geminateSuffix(mood, pronounId)
  if (c3.isWeak) return [measureMorpheme(FATHA), ...defectiveSuffix(mood, pronounId)]
  return MOOD_SUFFIXES[mood][pronounId]
}

function derivePassivePresentStemFormI(verb: FormIVerb, pronounId: PronounId, mood: Mood): readonly Morpheme[] {
  return [
    ...buildC1SegmentFormI(verb, pronounId),
    ...buildC2SegmentFormI(verb, pronounId, mood),
    ...buildC3SegmentFormI(verb, pronounId),
    ...buildSuffixFormI(verb, mood, pronounId),
  ]
}

function derivePassivePresentStemFormII(verb: NonFormIVerb, pronounId: PronounId, mood: Mood): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens
  const moodSuffix = MOOD_SUFFIXES[mood][pronounId]
  const prefix = [radicalMorpheme(c1), measureMorpheme(FATHA), radicalMorpheme(c2), measureMorpheme(SHADDA)]

  if (c3.isWeak) {
    const glide = mood !== 'jussive' || c1.isWeak || c2.isWeak ? FATHA : isMasculinePlural(pronounId) ? DAMMA : KASRA

    return [...prefix, measureMorpheme(glide), ...defectiveSuffix(mood, pronounId, c2.equals(c3))]
  }

  return [...prefix, measureMorpheme(FATHA), radicalMorpheme(c3), ...moodSuffix]
}

function derivePassivePresentStemFormIII(verb: NonFormIVerb, pronounId: PronounId, mood: Mood): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens
  const moodSuffix = MOOD_SUFFIXES[mood][pronounId]
  const prefix = [radicalMorpheme(c1), measureMorpheme(FATHA, ALIF), radicalMorpheme(c2)]

  if (c2.equals(c3)) {
    if (isFemininePlural(pronounId))
      return [...prefix, measureMorpheme(FATHA), radicalMorpheme(c3), ...geminateSuffix(mood, pronounId)]
    return [...prefix, measureMorpheme(SHADDA), ...geminateSuffix(mood, pronounId)]
  }

  if (c3.isWeak) return [...prefix, measureMorpheme(FATHA), ...defectiveSuffix(mood, pronounId)]

  return [...prefix, measureMorpheme(FATHA), radicalMorpheme(c3), ...moodSuffix]
}

function derivePassivePresentStemFormIV(verb: NonFormIVerb, pronounId: PronounId, mood: Mood): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens
  const moodSuffix = MOOD_SUFFIXES[mood][pronounId]

  if (c2.isHamza) return [radicalMorpheme(c1), measureMorpheme(FATHA), ...defectiveSuffix(mood, pronounId)]

  if (c3.isWeak)
    return [
      radicalMorpheme(c1),
      ...(c1.isWeak ? [] : [measureMorpheme(SUKOON)]),
      radicalMorpheme(c2),
      measureMorpheme(FATHA),
      ...defectiveSuffix(mood, pronounId, c2.equals(c3)),
    ]

  if (c2.isWeak) {
    if (isFemininePlural(pronounId) || moodSuffix.at(0)?.equals([SUKOON]))
      return [radicalMorpheme(c1), measureMorpheme(FATHA), radicalMorpheme(c3), ...moodSuffix]
    return [radicalMorpheme(c1), measureMorpheme(FATHA), radicalMorpheme(ALIF), radicalMorpheme(c3), ...moodSuffix]
  }

  if (c2.equals(c3)) {
    if (isFemininePlural(pronounId))
      return [
        radicalMorpheme(c1),
        measureMorpheme(SUKOON),
        radicalMorpheme(c2),
        measureMorpheme(FATHA),
        radicalMorpheme(c3),
        ...geminateSuffix(mood, pronounId),
      ]
    return [
      radicalMorpheme(c1),
      measureMorpheme(FATHA),
      radicalMorpheme(c2),
      measureMorpheme(SUKOON),
      radicalMorpheme(c3),
      ...geminateSuffix(mood, pronounId),
    ]
  }

  return [
    radicalMorpheme(c1),
    ...(c1.isWeak ? [] : [measureMorpheme(SUKOON)]),
    radicalMorpheme(c2),
    measureMorpheme(FATHA),
    radicalMorpheme(c3),
    ...moodSuffix,
  ]
}

function derivePassivePresentStemFormV(verb: NonFormIVerb, pronounId: PronounId, mood: Mood): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens
  const moodSuffix = MOOD_SUFFIXES[mood][pronounId]

  if (c3.isWeak)
    return [
      measureMorpheme(TEH, FATHA),
      radicalMorpheme(c1),
      measureMorpheme(FATHA),
      radicalMorpheme(c2),
      measureMorpheme(SHADDA, FATHA),
      ...defectiveSuffix(mood, pronounId),
    ]

  return [
    measureMorpheme(TEH, FATHA),
    radicalMorpheme(c1),
    measureMorpheme(FATHA),
    radicalMorpheme(c2),
    measureMorpheme(SHADDA, FATHA),
    radicalMorpheme(c3),
    ...moodSuffix,
  ]
}

function derivePassivePresentStemFormVI(verb: NonFormIVerb, pronounId: PronounId, mood: Mood): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens

  if (c3.isWeak)
    return [
      measureMorpheme(TEH, FATHA),
      radicalMorpheme(c1),
      measureMorpheme(FATHA, ALIF),
      radicalMorpheme(c2),
      measureMorpheme(FATHA),
      ...defectiveSuffix(mood, pronounId),
    ]

  if (c2.equals(c3)) {
    const prefix = [measureMorpheme(TEH, FATHA), radicalMorpheme(c1), measureMorpheme(FATHA, ALIF), radicalMorpheme(c2)]

    if (isFemininePlural(pronounId))
      return [...prefix, measureMorpheme(FATHA), radicalMorpheme(c3), ...MOOD_SUFFIXES[mood][pronounId]]

    return [...prefix, measureMorpheme(SUKOON), radicalMorpheme(c3), ...geminateSuffix(mood, pronounId)]
  }

  return [
    measureMorpheme(TEH, FATHA),
    radicalMorpheme(c1),
    measureMorpheme(FATHA, ALIF),
    radicalMorpheme(c2),
    measureMorpheme(FATHA),
    radicalMorpheme(c3),
    ...MOOD_SUFFIXES[mood][pronounId],
  ]
}

function derivePassivePresentStemFormVII(verb: NonFormIVerb, pronounId: PronounId, mood: Mood): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens

  if (c2.equals(c3))
    return [
      measureMorpheme(NOON, SUKOON),
      radicalMorpheme(c1),
      measureMorpheme(FATHA),
      radicalMorpheme(c2),
      measureMorpheme(SUKOON),
      radicalMorpheme(c3),
      ...geminateSuffix(mood, pronounId),
    ]

  if (c2.isWeak && mood === 'jussive')
    return [
      measureMorpheme(NOON, SUKOON),
      radicalMorpheme(c1),
      measureMorpheme(FATHA),
      radicalMorpheme(c3),
      agreementMorpheme(SUKOON),
    ]

  if (c2.isWeak)
    return [
      measureMorpheme(NOON, SUKOON),
      radicalMorpheme(c1),
      measureMorpheme(FATHA),
      radicalMorpheme(ALIF),
      radicalMorpheme(c3),
      ...MOOD_SUFFIXES[mood][pronounId],
    ]

  if (c3.isWeak)
    return [
      measureMorpheme(NOON, SUKOON),
      radicalMorpheme(c1),
      measureMorpheme(FATHA),
      radicalMorpheme(c2),
      measureMorpheme(FATHA),
      ...defectiveSuffix(mood, pronounId),
    ]

  return [
    measureMorpheme(NOON, SUKOON),
    radicalMorpheme(c1),
    measureMorpheme(FATHA),
    radicalMorpheme(c2),
    measureMorpheme(FATHA),
    radicalMorpheme(c3),
    ...MOOD_SUFFIXES[mood][pronounId],
  ]
}

function derivePassivePresentStemFormVIII(verb: NonFormIVerb, pronounId: PronounId, mood: Mood): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens
  const infix = resolveFormVIIIInfixConsonant(c1)
  const moodSuffix = MOOD_SUFFIXES[mood][pronounId]

  if (c2.equals(c3)) {
    if (isFemininePlural(pronounId))
      return [
        radicalMorpheme(c1),
        measureMorpheme(SUKOON),
        measureMorpheme(infix, FATHA),
        radicalMorpheme(c2),
        measureMorpheme(FATHA),
        radicalMorpheme(c3),
        ...moodSuffix,
      ]
    return [
      radicalMorpheme(c1),
      measureMorpheme(SUKOON),
      measureMorpheme(infix, FATHA),
      radicalMorpheme(c2),
      measureMorpheme(SUKOON),
      radicalMorpheme(c3),
      ...geminateSuffix(mood, pronounId),
    ]
  }

  if (c1.isWeak && c3.isWeak)
    return [
      measureMorpheme(TEH, SHADDA, FATHA),
      radicalMorpheme(c2),
      measureMorpheme(FATHA),
      ...defectiveSuffix(mood, pronounId),
    ]

  if (c1.isWeak)
    return [
      measureMorpheme(TEH, SHADDA, FATHA),
      radicalMorpheme(c2),
      measureMorpheme(FATHA),
      radicalMorpheme(c3),
      ...moodSuffix,
    ]

  if (!c3.isWeak && !c3.isHamza && (c2.equals(YEH) || (c2.isWeak && !infix.equals(DAL)))) {
    return !isFemininePlural(pronounId) &&
      (mood !== 'jussive' || pronounId === '2fs' || isDual(pronounId) || isMasculinePlural(pronounId))
      ? [
          radicalMorpheme(c1),
          measureMorpheme(SUKOON, infix, FATHA),
          radicalMorpheme(ALIF),
          radicalMorpheme(c3),
          ...moodSuffix,
        ]
      : [radicalMorpheme(c1), measureMorpheme(SUKOON, infix, FATHA), radicalMorpheme(c3), ...moodSuffix]
  }

  if (c3.isWeak)
    return [
      radicalMorpheme(c1),
      measureMorpheme(SUKOON, infix, FATHA),
      radicalMorpheme(c2),
      measureMorpheme(FATHA),
      ...defectiveSuffix(mood, pronounId),
    ]

  if (c2.isWeak && c3.isHamza) {
    if (isFemininePlural(pronounId) || moodSuffix.at(0)?.equals([SUKOON]))
      return [radicalMorpheme(c1), measureMorpheme(SUKOON, infix, FATHA), radicalMorpheme(c3), ...moodSuffix]

    return [radicalMorpheme(c1), measureMorpheme(SUKOON, infix, FATHA, ALIF), radicalMorpheme(c3), ...moodSuffix]
  }

  return [
    radicalMorpheme(c1),
    measureMorpheme(SUKOON, infix, FATHA),
    radicalMorpheme(c2),
    measureMorpheme(FATHA),
    radicalMorpheme(c3),
    ...moodSuffix,
  ]
}

function derivePassivePresentStemFormX(verb: NonFormIVerb, pronounId: PronounId, mood: Mood): readonly Morpheme[] {
  const [c1, c2, c3] = verb.rootTokens
  const prefix = [measureMorpheme(SEEN, SUKOON, TEH, FATHA)]
  const moodSuffix = MOOD_SUFFIXES[mood][pronounId]

  if (c3.isWeak)
    return [
      ...prefix,
      radicalMorpheme(c1),
      measureMorpheme(SUKOON),
      radicalMorpheme(c2),
      measureMorpheme(FATHA),
      ...defectiveSuffix(mood, pronounId),
    ]

  if (c2.equals(c3)) {
    if (isFemininePlural(pronounId))
      return [
        ...prefix,
        radicalMorpheme(c1),
        measureMorpheme(SUKOON),
        radicalMorpheme(c2),
        measureMorpheme(FATHA),
        radicalMorpheme(c3),
        ...geminateSuffix(mood, pronounId),
      ]
    return [
      ...prefix,
      radicalMorpheme(c1),
      measureMorpheme(FATHA),
      radicalMorpheme(c2),
      measureMorpheme(SHADDA),
      ...geminateSuffix(mood, pronounId),
    ]
  }

  if (c2.isWeak) {
    if (isFemininePlural(pronounId) || moodSuffix.at(0)?.equals([SUKOON]))
      return [...prefix, radicalMorpheme(c1), measureMorpheme(FATHA), radicalMorpheme(c3), ...moodSuffix]
    return [
      ...prefix,
      radicalMorpheme(c1),
      measureMorpheme(FATHA),
      radicalMorpheme(ALIF),
      radicalMorpheme(c3),
      ...moodSuffix,
    ]
  }

  return [
    ...prefix,
    radicalMorpheme(c1),
    measureMorpheme(SUKOON),
    radicalMorpheme(c2),
    measureMorpheme(FATHA),
    radicalMorpheme(c3),
    ...moodSuffix,
  ]
}

function derivePassivePresentStemFormIq(
  verb: QuadriliteralVerb,
  pronounId: PronounId,
  mood: Mood,
): readonly Morpheme[] {
  const [c1, c2, c3, c4] = verb.rootTokens
  return [
    radicalMorpheme(c1),
    measureMorpheme(FATHA),
    radicalMorpheme(c2),
    measureMorpheme(SUKOON),
    radicalMorpheme(c3),
    measureMorpheme(FATHA),
    radicalMorpheme(c4),
    ...MOOD_SUFFIXES[mood][pronounId],
  ]
}

function derivePassivePresentStemFormIIq(
  verb: QuadriliteralVerb,
  pronounId: PronounId,
  mood: Mood,
): readonly Morpheme[] {
  const [c1, c2, c3, c4] = verb.rootTokens
  return [
    measureMorpheme(TEH, FATHA),
    radicalMorpheme(c1),
    measureMorpheme(FATHA),
    radicalMorpheme(c2),
    measureMorpheme(SUKOON),
    radicalMorpheme(c3),
    measureMorpheme(FATHA),
    radicalMorpheme(c4),
    ...MOOD_SUFFIXES[mood][pronounId],
  ]
}

function derivePassivePresentStemFormIIIq(
  verb: QuadriliteralVerb,
  pronounId: PronounId,
  mood: Mood,
): readonly Morpheme[] {
  const [c1, c2, c3, c4] = verb.rootTokens
  return [
    radicalMorpheme(c1),
    measureMorpheme(SUKOON),
    radicalMorpheme(c2),
    measureMorpheme(FATHA, NOON, SUKOON),
    radicalMorpheme(c3),
    measureMorpheme(FATHA),
    radicalMorpheme(c4),
    ...MOOD_SUFFIXES[mood][pronounId],
  ]
}

function derivePassivePresentStemFormIVq(
  verb: QuadriliteralVerb,
  pronounId: PronounId,
  mood: Mood,
): readonly Morpheme[] {
  const [c1, c2, c3, c4] = verb.rootTokens

  const useLongForm =
    isFemininePlural(pronounId) ||
    (mood === 'jussive' && !isDual(pronounId) && pronounId !== '2fs' && !isMasculinePlural(pronounId))

  if (useLongForm)
    return [
      radicalMorpheme(c1),
      measureMorpheme(SUKOON),
      radicalMorpheme(c2),
      measureMorpheme(FATHA),
      radicalMorpheme(c3),
      measureMorpheme(SUKOON),
      radicalMorpheme(c4),
      measureMorpheme(FATHA),
      radicalMorpheme(c4),
      ...MOOD_SUFFIXES[mood][pronounId],
    ]

  return [
    radicalMorpheme(c1),
    measureMorpheme(SUKOON),
    radicalMorpheme(c2),
    measureMorpheme(FATHA),
    radicalMorpheme(c3),
    measureMorpheme(FATHA),
    radicalMorpheme(c4),
    measureMorpheme(SHADDA),
    ...MOOD_SUFFIXES[mood][pronounId],
  ]
}

function geminateSuffix(mood: Mood, pronounId: PronounId): readonly Morpheme[] {
  return mood === 'jussive' ? MOOD_SUFFIXES.subjunctive[pronounId] : MOOD_SUFFIXES[mood][pronounId]
}

function defectiveSuffix(mood: Mood, pronounId: PronounId, isGeminateRoot?: boolean): readonly Morpheme[] {
  if (mood === 'indicative') {
    if (pronounId === '2fs') return [agreementMorpheme(YEH, SUKOON, NOON, FATHA)]
    if (isDual(pronounId)) return [agreementMorpheme(YEH, FATHA, ALIF, NOON, KASRA)]
    if (isMasculinePlural(pronounId)) return [agreementMorpheme(WAW, SUKOON, NOON, FATHA)]
  }

  if (pronounId === '2fs') return [agreementMorpheme(YEH, SUKOON), elidedMorpheme(NOON, FATHA)]
  if (isDual(pronounId)) return [agreementMorpheme(YEH, FATHA, ALIF), elidedMorpheme(NOON, KASRA)]
  if (isMasculinePlural(pronounId)) return [agreementMorpheme(WAW, SUKOON, ALIF), elidedMorpheme(NOON, FATHA)]
  if (isFemininePlural(pronounId)) return [agreementMorpheme(YEH, SUKOON, NOON, FATHA)]

  if (mood === 'jussive') return []

  if (isGeminateRoot) return [measureMorpheme(ALIF)]

  return [measureMorpheme(ALIF_MAQSURA)]
}

function derivePassivePresentStem(verb: Verb, pronounId: PronounId, mood: Mood): readonly Morpheme[] {
  if (isQuadriliteralVerb(verb)) {
    switch (verb.form) {
      case 1:
        return derivePassivePresentStemFormIq(verb, pronounId, mood)
      case 2:
        return derivePassivePresentStemFormIIq(verb, pronounId, mood)
      case 3:
        return derivePassivePresentStemFormIIIq(verb, pronounId, mood)
      case 4:
        return derivePassivePresentStemFormIVq(verb, pronounId, mood)
    }
  }

  switch (verb.form) {
    case 1:
      return derivePassivePresentStemFormI(verb, pronounId, mood)
    case 2:
      return derivePassivePresentStemFormII(verb, pronounId, mood)
    case 3:
      return derivePassivePresentStemFormIII(verb, pronounId, mood)
    case 4:
      return derivePassivePresentStemFormIV(verb, pronounId, mood)
    case 5:
      return derivePassivePresentStemFormV(verb, pronounId, mood)
    case 6:
      return derivePassivePresentStemFormVI(verb, pronounId, mood)
    case 7:
      return derivePassivePresentStemFormVII(verb, pronounId, mood)
    case 8:
      return derivePassivePresentStemFormVIII(verb, pronounId, mood)
    case 9:
      return []
    case 10:
      return derivePassivePresentStemFormX(verb, pronounId, mood)
  }
}

export function conjugatePassivePresentMood(verb: Verb, mood: Mood): Record<PronounId, Word> {
  const [c1] = verb.rootTokens

  return constrainPassiveConjugation(
    verb,
    mapRecord(
      {
        '1s': agreementMorpheme(ALIF_HAMZA, DAMMA),
        '2ms': agreementMorpheme(TEH, DAMMA),
        '2fs': agreementMorpheme(TEH, DAMMA),
        '3ms': agreementMorpheme(YEH, DAMMA),
        '3fs': agreementMorpheme(TEH, DAMMA),
        '2d': agreementMorpheme(TEH, DAMMA),
        '3md': agreementMorpheme(YEH, DAMMA),
        '3fd': agreementMorpheme(TEH, DAMMA),
        '1p': agreementMorpheme(NOON, DAMMA),
        '2mp': agreementMorpheme(TEH, DAMMA),
        '2fp': agreementMorpheme(TEH, DAMMA),
        '3mp': agreementMorpheme(YEH, DAMMA),
        '3fp': agreementMorpheme(YEH, DAMMA),
      },
      (prefix, pronounId) => {
        const stem = derivePassivePresentStem(verb, pronounId, mood)

        if (pronounId === '1s' && [4, 8].includes(verb.form) && c1.isHamza)
          return new Word([prefix, radicalMorpheme(WAW), ...stem.slice(stem.at(1)?.equals([SUKOON]) ? 2 : 1)])

        return new Word([prefix, ...stem])
      },
    ),
    new Word([]),
  )
}
