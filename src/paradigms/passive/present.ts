import { mapRecord } from '../../primitives/objects'
import type { Mood } from '../active/present'
import { hasPattern } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_MAQSURA,
  DAMMA,
  FATHA,
  HAMZA,
  HAMZA_ON_WAW,
  isHamzatedLetter,
  isWeakLetter,
  KASRA,
  NOON,
  normalizeAlifMadda,
  SHADDA,
  SUKOON,
  seatHamza,
  TEH,
  WAW,
  YEH,
} from '../letters'
import type { PronounId } from '../pronouns'
import { isDual, isFemininePlural, isMasculinePlural } from '../pronouns'
import type { Verb } from '../verbs'

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
  '2fs': [KASRA, YEH, NOON, FATHA],
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

function buildC1SegmentFormI(verb: Verb, pronounId: PronounId): readonly string[] {
  const [c1, c2, c3] = Array.from(verb.root)

  const isInitialHamza = isHamzatedLetter(c1)
  const isMiddleHamza = isHamzatedLetter(c2)
  const isInitialWeak = isWeakLetter(c1)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const isGeminate = c2 === c3

  if (isGeminate && !isInitialWeak && isFemininePlural(pronounId)) return [isInitialHamza ? HAMZA_ON_WAW : c1, SUKOON]

  if (isGeminate && isFemininePlural(pronounId)) return [c1]

  if (isGeminate) return [isInitialHamza ? HAMZA_ON_WAW : c1, FATHA]

  if (isMiddleWeak && !hasPattern(verb, 'fa3ila-yaf3alu') && !isFinalWeak)
    return [isInitialHamza ? HAMZA_ON_WAW : c1, FATHA]

  if (isInitialHamza && pronounId === '1s') return [WAW]

  if (c1 === YEH) return [WAW]

  if (isInitialWeak || isMiddleHamza) return [c1]

  return [isInitialHamza ? HAMZA_ON_WAW : c1, SUKOON]
}

function buildC2SegmentFormI(verb: Verb, pronounId: PronounId, mood: Mood): readonly string[] {
  const [, c2, c3] = Array.from(verb.root)

  const isMiddleHamza = isHamzatedLetter(c2)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const isGeminate = c2 === c3

  if (isMiddleHamza) return []

  if (isGeminate && isFemininePlural(pronounId)) return [c2, FATHA]

  if (isGeminate) return [c2, SHADDA]

  if (isFinalWeak) return [c2]

  if (!isMiddleWeak || hasPattern(verb, 'fa3ila-yaf3alu')) return [c2, FATHA]

  if (isFemininePlural(pronounId)) return []

  if (mood !== 'jussive' || pronounId === '2fs' || isDual(pronounId) || isMasculinePlural(pronounId)) return [ALIF]

  return []
}

function buildC3SegmentFormI(verb: Verb, pronounId: PronounId, _mood: Mood): readonly string[] {
  const [, c2, c3] = Array.from(verb.root)

  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const isGeminate = c2 === c3

  if (isFinalWeak) return []

  if (isMiddleWeak) return [c3]

  if (!isGeminate || isFemininePlural(pronounId)) return [seatHamza(c3, pronounId === '2fs' ? KASRA : FATHA)]

  return []
}

function buildSuffixFormI(verb: Verb, mood: Mood, pronounId: PronounId): readonly string[] {
  const [, c2, c3] = Array.from(verb.root)

  const isGeminate = c2 === c3

  const moodSuffix = MOOD_SUFFIXES[mood][pronounId]

  if (isGeminate) return mood === 'jussive' ? SUBJUNCTIVE_SUFFIXES[pronounId] : moodSuffix

  if (c3 === NOON && isFemininePlural(pronounId)) return [SHADDA, FATHA]

  if (isWeakLetter(c3)) return [FATHA, ...defectiveSuffix(mood, pronounId, moodSuffix)]

  return moodSuffix
}

function derivePassivePresentStemFormI(verb: Verb, pronounId: PronounId, mood: Mood): readonly string[] {
  return [
    ...buildC1SegmentFormI(verb, pronounId),
    ...buildC2SegmentFormI(verb, pronounId, mood),
    ...buildC3SegmentFormI(verb, pronounId, mood),
    ...buildSuffixFormI(verb, mood, pronounId),
  ]
}

function derivePassivePresentStemFormII(verb: Verb, pronounId: PronounId, mood: Mood): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const moodSuffix = MOOD_SUFFIXES[mood][pronounId]
  const seatedC3 = seatHamza(c3, pronounId === '2fs' ? KASRA : FATHA)
  const prefix = [seatHamza(c1, DAMMA), FATHA, c2, SHADDA]
  const weakSuffix = defectiveSuffix(mood, pronounId, [SUKOON, NOON, FATHA])

  if (isWeakLetter(c3)) {
    const glide =
      mood !== 'jussive' || isWeakLetter(c1) || isWeakLetter(c2) ? FATHA : isMasculinePlural(pronounId) ? DAMMA : KASRA

    if (c2 === YEH && c3 === YEH && weakSuffix.at(0) === ALIF_MAQSURA) return [...prefix, glide, ALIF]

    return [...prefix, glide, ...weakSuffix]
  }

  return [...prefix, FATHA, seatedC3, ...moodSuffix]
}

function derivePassivePresentStemFormIII(verb: Verb, pronounId: PronounId, mood: Mood): readonly string[] {
  const [c1, c2, c3] = [...verb.root]
  const moodSuffix = MOOD_SUFFIXES[mood][pronounId]
  const seatedC1 = seatHamza(c1, DAMMA)
  const seatedC2 = isHamzatedLetter(c2) ? HAMZA : c2
  const seatedC3 = seatHamza(c3, pronounId === '2fs' ? KASRA : FATHA)
  const prefix = [seatedC1, FATHA, ALIF, seatedC2]

  if (c2 === c3) {
    const geminateSuffix = mood === 'jussive' ? SUBJUNCTIVE_SUFFIXES[pronounId] : moodSuffix
    if (isFemininePlural(pronounId)) return [...prefix, FATHA, c3, ...geminateSuffix]
    return [...prefix, SHADDA, ...geminateSuffix]
  }

  if (isWeakLetter(c3)) return [...prefix, FATHA, ...defectiveSuffix(mood, pronounId, moodSuffix)]

  return [...prefix, FATHA, seatedC3, ...moodSuffix]
}

function derivePassivePresentStemFormIV(verb: Verb, pronounId: PronounId, mood: Mood): readonly string[] {
  const [, c2] = [...verb.root]
  const moodSuffix = MOOD_SUFFIXES[mood][pronounId]
  const prefix = pronounId === '1s' ? [WAW, c2, FATHA] : [HAMZA_ON_WAW, SUKOON, c2, FATHA]

  return [...prefix, ...defectiveSuffix(mood, pronounId, moodSuffix)]
}

function defectiveSuffix(mood: Mood, pronounId: PronounId, femininePluralSuffix: readonly string[]): readonly string[] {
  if (pronounId === '2fs') return mood === 'indicative' ? [YEH, SUKOON, NOON, FATHA] : [YEH, SUKOON]

  if (isDual(pronounId)) return [YEH, ...MOOD_SUFFIXES[mood][pronounId]]

  if (isMasculinePlural(pronounId)) return mood === 'indicative' ? [WAW, SUKOON, NOON, FATHA] : [WAW, SUKOON, ALIF]

  if (isFemininePlural(pronounId)) return [YEH, ...femininePluralSuffix]

  if (mood === 'jussive') return []

  return [ALIF_MAQSURA]
}

function derivePassivePresentStem(verb: Verb, pronounId: PronounId, mood: Mood): readonly string[] {
  switch (verb.form) {
    case 1:
      return derivePassivePresentStemFormI(verb, pronounId, mood)
    case 2:
      return derivePassivePresentStemFormII(verb, pronounId, mood)
    case 3:
      return derivePassivePresentStemFormIII(verb, pronounId, mood)
    case 4:
      return derivePassivePresentStemFormIV(verb, pronounId, mood)
    default:
      return []
  }
}

export function conjugatePassivePresentMood(verb: Verb, mood: Mood): Record<PronounId, string> {
  return mapRecord(PRESENT_PREFIXES, (prefix, pronounId) =>
    (() => {
      const joined = normalizeAlifMadda([prefix, DAMMA, ...derivePassivePresentStem(verb, pronounId, mood)]).join('')
      return joined.normalize('NFC')
    })(),
  )
}
