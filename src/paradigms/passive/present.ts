import { mapRecord } from '../../primitives/objects'
import { isFormIPastVowel } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_MAQSURA,
  DAL,
  DAMMA,
  FATHA,
  finalize,
  KASRA,
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
import { isDual, isFemininePlural, isMasculinePlural } from '../pronouns'
import type { Mood } from '../tense'
import type { FormIVerb, NonFormIVerb, Verb } from '../verbs'
import { constrainPassiveConjugation } from './support'

const PRESENT_PREFIXES: Record<PronounId, string> = {
  '1s': ALIF_HAMZA,
  '2ms': TEH,
  '2fs': TEH,
  '3ms': YEH,
  '3fs': TEH,
  '2d': TEH,
  '3md': YEH,
  '3fd': TEH,
  '1p': NOON,
  '2mp': TEH,
  '2fp': TEH,
  '3mp': YEH,
  '3fp': YEH,
}

const INDICATIVE_SUFFIXES: Record<PronounId, readonly string[]> = {
  '1s': [DAMMA],
  '2ms': [DAMMA],
  '2fs': [KASRA, YEH, SUKOON, NOON, FATHA],
  '3ms': [DAMMA],
  '3fs': [DAMMA],
  '2d': [FATHA, ALIF, NOON, KASRA],
  '3md': [FATHA, ALIF, NOON, KASRA],
  '3fd': [FATHA, ALIF, NOON, KASRA],
  '1p': [DAMMA],
  '2mp': [DAMMA, WAW, SUKOON, NOON, FATHA],
  '2fp': [SUKOON, NOON, FATHA],
  '3mp': [DAMMA, WAW, SUKOON, NOON, FATHA],
  '3fp': [SUKOON, NOON, FATHA],
}

const SUBJUNCTIVE_SUFFIXES: Record<PronounId, readonly string[]> = {
  '1s': [FATHA],
  '2ms': [FATHA],
  '2fs': [KASRA, YEH],
  '3ms': [FATHA],
  '3fs': [FATHA],
  '2d': [FATHA, ALIF],
  '3md': [FATHA, ALIF],
  '3fd': [FATHA, ALIF],
  '1p': [FATHA],
  '2mp': [DAMMA, WAW, SUKOON, ALIF],
  '2fp': [SUKOON, NOON, FATHA],
  '3mp': [DAMMA, WAW, SUKOON, ALIF],
  '3fp': [SUKOON, NOON, FATHA],
}

const JUSSIVE_SUFFIXES: Record<PronounId, readonly string[]> = {
  '1s': [SUKOON],
  '2ms': [SUKOON],
  '2fs': [KASRA, YEH],
  '3ms': [SUKOON],
  '3fs': [SUKOON],
  '2d': [FATHA, ALIF],
  '3md': [FATHA, ALIF],
  '3fd': [FATHA, ALIF],
  '1p': [SUKOON],
  '2mp': [DAMMA, WAW, SUKOON, ALIF],
  '2fp': [SUKOON, NOON, FATHA],
  '3mp': [DAMMA, WAW, SUKOON, ALIF],
  '3fp': [SUKOON, NOON, FATHA],
}

const MOOD_SUFFIXES: Record<Mood, Record<PronounId, readonly string[]>> = {
  indicative: INDICATIVE_SUFFIXES,
  subjunctive: SUBJUNCTIVE_SUFFIXES,
  jussive: JUSSIVE_SUFFIXES,
}

function buildC1SegmentFormI(verb: FormIVerb, pronounId: PronounId): readonly Token[] {
  const [c1, c2, c3] = Root(verb.root)

  if (c2.equals(c3)) {
    if (!c1.isWeak && isFemininePlural(pronounId)) return [c1, SUKOON]
    if (isFemininePlural(pronounId)) return [c1]
    return [c1, FATHA]
  }

  // FIXME: isFormIPastVowel doesn't make sense here
  if (c2.isWeak && !isFormIPastVowel(verb, KASRA) && !c3.isWeak) return [c1, FATHA]

  if (c1.isHamza && pronounId === '1s') return [WAW]

  if (c1.is(YEH)) return [WAW]

  if (c1.isWeak || c2.isHamza) return [c1]

  return [c1, SUKOON]
}

function buildC2SegmentFormI(verb: FormIVerb, pronounId: PronounId, mood: Mood): readonly Token[] {
  const [, c2, c3] = Root(verb.root)

  if (c2.isHamza) return []

  if (c2.equals(c3)) {
    if (isFemininePlural(pronounId)) return [c2, FATHA]
    return [c2, SHADDA]
  }

  if (c3.isWeak) return [c2]

  if (!c2.isWeak || isFormIPastVowel(verb, KASRA)) return [c2, FATHA]

  if (isFemininePlural(pronounId)) return []

  if (mood !== 'jussive' || pronounId === '2fs' || isDual(pronounId) || isMasculinePlural(pronounId)) return [ALIF]

  return []
}

function buildC3SegmentFormI(verb: FormIVerb, pronounId: PronounId): readonly Token[] {
  const [, c2, c3] = Root(verb.root)

  if (c3.isWeak) return []

  if (c2.isWeak) return [c3]

  if (isFemininePlural(pronounId)) return [c3]

  if (!c2.equals(c3)) return [c3]

  return []
}

function buildSuffixFormI(verb: FormIVerb, mood: Mood, pronounId: PronounId): readonly Token[] {
  const [, c2, c3] = Root(verb.root)

  if (c2.equals(c3)) return geminateSuffix(mood, pronounId)

  if (c3.isWeak) return [FATHA, ...defectiveSuffix(mood, pronounId)]

  return MOOD_SUFFIXES[mood][pronounId]
}

function derivePassivePresentStemFormI(verb: FormIVerb, pronounId: PronounId, mood: Mood): readonly Token[] {
  return [
    ...buildC1SegmentFormI(verb, pronounId),
    ...buildC2SegmentFormI(verb, pronounId, mood),
    ...buildC3SegmentFormI(verb, pronounId),
    ...buildSuffixFormI(verb, mood, pronounId),
  ]
}

function derivePassivePresentStemFormII(verb: NonFormIVerb, pronounId: PronounId, mood: Mood): readonly Token[] {
  const [c1, c2, c3] = Root(verb.root)
  const moodSuffix = MOOD_SUFFIXES[mood][pronounId]
  const prefix = [c1, FATHA, c2, SHADDA]

  if (c3.isWeak) {
    const glide = mood !== 'jussive' || c1.isWeak || c2.isWeak ? FATHA : isMasculinePlural(pronounId) ? DAMMA : KASRA

    return [...prefix, glide, ...defectiveSuffix(mood, pronounId, c2.equals(c3))]
  }

  return [...prefix, FATHA, c3, ...moodSuffix]
}

function derivePassivePresentStemFormIII(verb: NonFormIVerb, pronounId: PronounId, mood: Mood): readonly Token[] {
  const [c1, c2, c3] = Root(verb.root)
  const moodSuffix = MOOD_SUFFIXES[mood][pronounId]
  const prefix = [c1, FATHA, ALIF, c2]

  if (c2.equals(c3)) {
    if (isFemininePlural(pronounId)) return [...prefix, FATHA, c3, ...geminateSuffix(mood, pronounId)]
    return [...prefix, SHADDA, ...geminateSuffix(mood, pronounId)]
  }

  if (c3.isWeak) return [...prefix, FATHA, ...defectiveSuffix(mood, pronounId)]

  return [...prefix, FATHA, c3, ...moodSuffix]
}

function derivePassivePresentStemFormIV(verb: NonFormIVerb, pronounId: PronounId, mood: Mood): readonly Token[] {
  const [c1, c2, c3] = Root(verb.root)
  const moodSuffix = MOOD_SUFFIXES[mood][pronounId]

  if (c1.isHamza && pronounId === '1s') return [WAW, c2, FATHA, mood !== 'jussive' ? ALIF_MAQSURA : '']

  if (c2.isWeak && c3.isHamza) {
    if (isFemininePlural(pronounId) || moodSuffix.at(0) === SUKOON) return [c1, FATHA, c3, ...moodSuffix]
    if (pronounId === '2fs' || isMasculinePlural(pronounId)) return [c1, FATHA, ALIF, c3, ...moodSuffix]
    return [c1, FATHA, ALIF, c3, ...moodSuffix]
  }

  if (c2.isHamza) return [c1, FATHA, ...defectiveSuffix(mood, pronounId)]

  if (c3.isWeak) return [c1, SUKOON, c2, FATHA, ...defectiveSuffix(mood, pronounId, c2.equals(c3))]

  if (c2.isWeak) {
    if (isFemininePlural(pronounId) || moodSuffix.at(0) === SUKOON) return [c1, FATHA, c3, ...moodSuffix]
    return [c1, FATHA, ALIF, c3, ...moodSuffix]
  }

  if (c2.equals(c3)) {
    if (isFemininePlural(pronounId)) return [c1, SUKOON, c2, FATHA, c3, ...geminateSuffix(mood, pronounId)]
    return [c1, FATHA, c2, SUKOON, c3, ...geminateSuffix(mood, pronounId)]
  }

  return [c1, SUKOON, c2, FATHA, c3, ...moodSuffix]
}

function derivePassivePresentStemFormV(verb: NonFormIVerb, pronounId: PronounId, mood: Mood): readonly Token[] {
  const [c1, c2, c3] = Root(verb.root)
  const moodSuffix = MOOD_SUFFIXES[mood][pronounId]

  if (c3.isWeak) return [TEH, FATHA, c1, FATHA, c2, SHADDA, FATHA, ...defectiveSuffix(mood, pronounId)]

  return [TEH, FATHA, c1, FATHA, c2, SHADDA, FATHA, c3, ...moodSuffix]
}

function derivePassivePresentStemFormVI(verb: NonFormIVerb, pronounId: PronounId, mood: Mood): readonly Token[] {
  const [c1, c2, c3] = Root(verb.root)

  if (c3.isWeak) return [TEH, FATHA, c1, FATHA, ALIF, c2, FATHA, ...defectiveSuffix(mood, pronounId)]

  return [TEH, FATHA, c1, FATHA, ALIF, c2, FATHA, c3, ...MOOD_SUFFIXES[mood][pronounId]]
}

function derivePassivePresentStemFormVII(verb: NonFormIVerb, pronounId: PronounId, mood: Mood): readonly Token[] {
  const [c1, c2, c3] = Root(verb.root)

  if (c2.equals(c3)) {
    if (pronounId === '2fs' && mood !== 'indicative') return [NOON, SUKOON, c1, FATHA, c2, KASRA, YEH]
    if (isFemininePlural(pronounId)) return [NOON, SUKOON, c1, FATHA, c2, ...geminateSuffix(mood, pronounId)]
    return [NOON, SUKOON, c1, FATHA, c2, SUKOON, c3, ...geminateSuffix(mood, pronounId)]
  }

  if (c2.isWeak && mood === 'jussive') return [NOON, SUKOON, c1, FATHA, c3, SUKOON]

  if (c2.isWeak) return [NOON, SUKOON, c1, FATHA, ALIF, c3, ...MOOD_SUFFIXES[mood][pronounId]]

  if (c3.isWeak) return [NOON, SUKOON, c1, FATHA, c2, FATHA, ...defectiveSuffix(mood, pronounId)]

  return [NOON, SUKOON, c1, FATHA, c2, FATHA, c3, ...MOOD_SUFFIXES[mood][pronounId]]
}

function derivePassivePresentStemFormVIII(verb: NonFormIVerb, pronounId: PronounId, mood: Mood): readonly Token[] {
  const [c1, c2, c3] = Root(verb.root)
  const infix = resolveFormVIIIInfixConsonant(c1.letter)
  const moodSuffix = MOOD_SUFFIXES[mood][pronounId]

  if (c2.equals(c3)) {
    if (isFemininePlural(pronounId)) return [c1, SUKOON, infix, FATHA, c2, FATHA, c3, ...moodSuffix]
    return [c1, SUKOON, infix, FATHA, c2, SUKOON, c3, ...geminateSuffix(mood, pronounId)]
  }

  if (c1.isWeak && c3.isWeak) return [TEH, SHADDA, FATHA, c2, FATHA, ...defectiveSuffix(mood, pronounId)]

  if (c1.isWeak) return [TEH, SHADDA, FATHA, c2, FATHA, c3, ...moodSuffix]

  if (c2.isHamza && c3.isWeak && isMasculinePlural(pronounId))
    return mood === 'indicative'
      ? [c1, SUKOON, infix, FATHA, c2, FATHA, WAW, SUKOON, NOON, FATHA]
      : [c1, SUKOON, infix, FATHA, c2, FATHA, WAW, SUKOON, ALIF]

  if (!c3.isWeak && !c3.isHamza && (c2.is(YEH) || (c2.isWeak && infix !== DAL)))
    return mood === 'jussive'
      ? [c1, SUKOON, infix, FATHA, c3, ...moodSuffix]
      : [c1, SUKOON, infix, FATHA, ALIF, c3, ...moodSuffix]

  if (c3.isWeak && isMasculinePlural(pronounId)) return [c1, SUKOON, infix, FATHA, c2, ...moodSuffix]

  if (c3.isWeak) return [c1, SUKOON, infix, FATHA, c2, FATHA, ...defectiveSuffix(mood, pronounId)]

  if (c2.isWeak && c3.isHamza) {
    if (isFemininePlural(pronounId) || moodSuffix.at(0) === SUKOON) return [c1, SUKOON, infix, FATHA, c3, ...moodSuffix]

    return [c1, SUKOON, infix, FATHA, ALIF, c3, ...moodSuffix]
  }

  return [c1, SUKOON, infix, FATHA, c2, FATHA, c3, ...moodSuffix]
}

function derivePassivePresentStemFormX(verb: NonFormIVerb, pronounId: PronounId, mood: Mood): readonly Token[] {
  const [c1, c2, c3] = Root(verb.root)
  const prefix = [SEEN, SUKOON, TEH, FATHA]
  const moodSuffix = MOOD_SUFFIXES[mood][pronounId]

  if (c3.isWeak) return [...prefix, c1, SUKOON, c2, FATHA, ...defectiveSuffix(mood, pronounId)]

  if (c2.equals(c3)) {
    if (isFemininePlural(pronounId)) return [...prefix, c1, FATHA, c2, FATHA, c3, ...geminateSuffix(mood, pronounId)]
    return [...prefix, c1, FATHA, c2, SHADDA, ...geminateSuffix(mood, pronounId)]
  }

  if (c3.isHamza && moodSuffix.at(0) === SUKOON) return [...prefix, c1, FATHA, ALIF_HAMZA, ...moodSuffix]

  if (c2.isWeak) {
    if (isFemininePlural(pronounId) || moodSuffix.at(0) === SUKOON) return [...prefix, c1, FATHA, c3, ...moodSuffix]
    return [...prefix, c1, FATHA, ALIF, c3, ...moodSuffix]
  }

  return [...prefix, c1, SUKOON, c2, FATHA, c3, ...moodSuffix]
}

function derivePassivePresentStemFormIq(verb: FormIVerb, pronounId: PronounId, mood: Mood): readonly Token[] {
  const [c1, c2, c3, c4] = Root(verb.root)
  return [c1, FATHA, c2, SUKOON, c3, FATHA, c4, ...MOOD_SUFFIXES[mood][pronounId]]
}

function derivePassivePresentStemFormIIq(verb: NonFormIVerb, pronounId: PronounId, mood: Mood): readonly Token[] {
  const [c1, c2, c3, c4] = Root(verb.root)
  return [TEH, FATHA, c1, FATHA, c2, SUKOON, c3, FATHA, c4, ...MOOD_SUFFIXES[mood][pronounId]]
}

function derivePassivePresentStemFormIIIq(verb: NonFormIVerb, pronounId: PronounId, mood: Mood): readonly Token[] {
  const [c1, c2, c3, c4] = Root(verb.root)
  return [c1, SUKOON, c2, FATHA, NOON, SUKOON, c3, FATHA, c4, ...MOOD_SUFFIXES[mood][pronounId]]
}

function derivePassivePresentStemFormIVq(verb: NonFormIVerb, pronounId: PronounId, mood: Mood): readonly Token[] {
  const [c1, c2, c3, c4] = Root(verb.root)

  const useLongForm =
    isFemininePlural(pronounId) ||
    (mood === 'jussive' && !isDual(pronounId) && pronounId !== '2fs' && !isMasculinePlural(pronounId))

  if (useLongForm) return [c1, SUKOON, c2, FATHA, c3, SUKOON, c4, FATHA, c4, ...MOOD_SUFFIXES[mood][pronounId]]

  return [c1, SUKOON, c2, FATHA, c3, FATHA, c4, SHADDA, ...MOOD_SUFFIXES[mood][pronounId]]
}

function geminateSuffix(mood: Mood, pronounId: PronounId): readonly string[] {
  return mood === 'jussive' ? SUBJUNCTIVE_SUFFIXES[pronounId] : MOOD_SUFFIXES[mood][pronounId]
}

function defectiveSuffix(mood: Mood, pronounId: PronounId, isGeminateRoot?: boolean): readonly string[] {
  if (mood === 'indicative') {
    if (pronounId === '2fs') return [YEH, SUKOON, NOON, FATHA]
    if (isDual(pronounId)) return [YEH, FATHA, ALIF, NOON, KASRA]
    if (isMasculinePlural(pronounId)) return [WAW, SUKOON, NOON, FATHA]
  }

  if (pronounId === '2fs') return [YEH, SUKOON]
  if (isDual(pronounId)) return [YEH, FATHA, ALIF]
  if (isMasculinePlural(pronounId)) return [WAW, SUKOON, ALIF]
  if (isFemininePlural(pronounId)) return [YEH, SUKOON, NOON, FATHA]

  if (mood === 'jussive') return []

  if (isGeminateRoot) return [ALIF]

  return [ALIF_MAQSURA]
}

function derivePassivePresentStem(verb: Verb, pronounId: PronounId, mood: Mood): readonly Token[] {
  if (verb.root.length > 3) {
    switch (verb.form) {
      case 1:
        return derivePassivePresentStemFormIq(verb, pronounId, mood)
      case 2:
        return derivePassivePresentStemFormIIq(verb, pronounId, mood)
      case 3:
        return derivePassivePresentStemFormIIIq(verb, pronounId, mood)
      case 4:
        return derivePassivePresentStemFormIVq(verb, pronounId, mood)
      default:
        return []
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

export function conjugatePassivePresentMood(verb: Verb, mood: Mood): Record<PronounId, string> {
  return constrainPassiveConjugation(
    verb,
    mapRecord(PRESENT_PREFIXES, (prefix, pronounId) =>
      finalize([prefix, DAMMA, ...derivePassivePresentStem(verb, pronounId, mood)]),
    ),
  )
}
