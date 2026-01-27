import { mapRecord } from '../../primitives/objects'
import type { Mood } from '../active/present'
import { hasPattern } from '../form-i-vowels'
import {
  ALIF,
  ALIF_HAMZA,
  ALIF_MAQSURA,
  DAMMA,
  FATHA,
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
import { isDual, isFemininePlural, isMasculinePlural, PRONOUN_IDS } from '../pronouns'
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
  '2mp': [DAMMA, WAW, NOON, FATHA],
  '2fp': [SUKOON, NOON, FATHA],
  '3mp': [DAMMA, WAW, NOON, FATHA],
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
  '2mp': [DAMMA, WAW, ALIF],
  '2fp': [SUKOON, NOON, FATHA],
  '3mp': [DAMMA, WAW, ALIF],
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
  '2mp': [DAMMA, WAW, ALIF],
  '2fp': [SUKOON, NOON, FATHA],
  '3mp': [DAMMA, WAW, ALIF],
  '3fp': [SUKOON, NOON, FATHA],
}

const MOOD_SUFFIXES: Record<Mood, Record<PronounId, readonly string[]>> = {
  indicative: INDICATIVE_SUFFIXES,
  subjunctive: SUBJUNCTIVE_SUFFIXES,
  jussive: JUSSIVE_SUFFIXES,
}

function buildC1Segment(verb: Verb, pronounId: PronounId): readonly string[] {
  const [c1, c2, c3] = Array.from(verb.root)

  const isInitialHamza = isHamzatedLetter(c1)
  const isMiddleHamza = isHamzatedLetter(c2)
  const isInitialWeak = isWeakLetter(c1)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const isGeminate = c2 === c3

  const isConsonantalMiddleWeak = hasPattern(verb, 'fa3ila-yaf3alu') && (c2 === YEH || c2 === WAW)

  if (isGeminate && !isInitialWeak && isFemininePlural(pronounId)) return [isInitialHamza ? HAMZA_ON_WAW : c1, SUKOON]

  if (isGeminate && isFemininePlural(pronounId)) return [isInitialHamza ? HAMZA_ON_WAW : c1]

  if (isGeminate) return [isInitialHamza ? HAMZA_ON_WAW : c1, FATHA]

  if (isMiddleWeak && isConsonantalMiddleWeak) return [isInitialHamza ? HAMZA_ON_WAW : c1, SUKOON]

  if (isMiddleWeak && !isFinalWeak) {
    if (isConsonantalMiddleWeak) return [isInitialHamza ? HAMZA_ON_WAW : c1]

    return [isInitialHamza ? HAMZA_ON_WAW : c1, FATHA]
  }

  if (isInitialHamza) return pronounId === '1s' ? [WAW] : [HAMZA_ON_WAW, SUKOON]

  if (isInitialWeak) return c1 === YEH ? [WAW] : [c1]

  if (isMiddleHamza) return [c1]

  return [c1 === YEH ? WAW : c1, SUKOON]
}

function buildC2Segment(verb: Verb, pronounId: PronounId, mood: Mood): readonly string[] {
  const [, c2, c3] = Array.from(verb.root)

  const isMiddleHamza = isHamzatedLetter(c2)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const isGeminate = c2 === c3

  const isConsonantalMiddleWeak = hasPattern(verb, 'fa3ila-yaf3alu') && (c2 === YEH || c2 === WAW)

  if (isGeminate && isFemininePlural(pronounId)) return [c2, FATHA]

  if (isGeminate) return [c2]

  if (isMiddleWeak && !isFinalWeak && !isConsonantalMiddleWeak && !isFemininePlural(pronounId)) {
    if (mood !== 'jussive' || pronounId === '2fs' || isDual(pronounId) || isMasculinePlural(pronounId)) return [ALIF]
  }

  if (isMiddleWeak && !isFinalWeak && isConsonantalMiddleWeak) return [c2]

  if (isMiddleWeak && !isFinalWeak) return []

  if (isMiddleHamza) return []

  if (isFinalWeak) return [c2]

  return [c2, FATHA]
}

function buildC3Segment(verb: Verb, pronounId: PronounId, mood: Mood): readonly string[] {
  const [, c2, c3] = Array.from(verb.root)

  const isMiddleHamza = isHamzatedLetter(c2)
  const isMiddleWeak = isWeakLetter(c2)
  const isConsonantalMiddleWeak = hasPattern(verb, 'fa3ila-yaf3alu') && (c2 === YEH || c2 === WAW)
  const isFinalWeak = isWeakLetter(c3)
  const isGeminate = c2 === c3

  if (isConsonantalMiddleWeak && !isFinalWeak) return [FATHA, c3]

  if (isMiddleWeak && !isFinalWeak) return [c3]

  if (
    isFinalWeak &&
    (pronounId === '2fs' || isFemininePlural(pronounId) || isMasculinePlural(pronounId) || isDual(pronounId))
  )
    return []

  if (isMiddleHamza && isFinalWeak && mood === 'jussive') return [FATHA]

  if (isMiddleHamza && isFinalWeak) return [FATHA, ALIF_MAQSURA]

  if (isFinalWeak) return []

  if (isGeminate) return isFemininePlural(pronounId) ? [c3] : [SHADDA]

  if (c3 === NOON && isFemininePlural(pronounId)) return [NOON]

  return [seatHamza(c3, pronounId === '2fs' ? KASRA : FATHA)]
}

function suffix(verb: Verb, mood: Mood, pronounId: PronounId): readonly string[] {
  const [c1, c2, c3] = Array.from(verb.root)

  const isInitialHamza = isHamzatedLetter(c1)
  const isMiddleHamza = isHamzatedLetter(c2)
  const isInitialWeak = isWeakLetter(c1)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const isGeminate = c2 === c3

  const isConsonantalMiddleWeak = hasPattern(verb, 'fa3ila-yaf3alu') && (c2 === YEH || c2 === WAW)

  if (isGeminate) return mood === 'jussive' ? SUBJUNCTIVE_SUFFIXES[pronounId] : MOOD_SUFFIXES[mood][pronounId]

  if (isFinalWeak) {
    if (pronounId === '2fs') return mood === 'indicative' ? [FATHA, YEH, SUKOON, NOON, FATHA] : [FATHA, YEH, SUKOON]

    if (isDual(pronounId))
      return mood === 'indicative' ? [FATHA, YEH, FATHA, ALIF, NOON, KASRA] : [FATHA, YEH, FATHA, ALIF]

    if (
      !isInitialHamza &&
      isMiddleWeak &&
      isMasculinePlural(pronounId) &&
      (mood === 'subjunctive' || mood === 'jussive')
    )
      return [FATHA, WAW, SUKOON, ALIF]

    if (isMasculinePlural(pronounId))
      return mood === 'indicative' ? [FATHA, WAW, SUKOON, NOON, FATHA] : [FATHA, WAW, ALIF]

    if (isFemininePlural(pronounId)) return [FATHA, YEH, SUKOON, NOON, FATHA]

    if (isMiddleHamza) return []

    return mood === 'jussive' ? [FATHA] : [FATHA, ALIF_MAQSURA]
  }

  if (isMiddleWeak && !isConsonantalMiddleWeak) {
    if (pronounId === '2fs') return mood === 'indicative' ? [KASRA, YEH, NOON, FATHA] : [KASRA, YEH]
    if (isDual(pronounId)) return mood === 'indicative' ? [FATHA, ALIF, NOON, KASRA] : [FATHA, ALIF]
    if (isMasculinePlural(pronounId)) return mood === 'indicative' ? [DAMMA, WAW, NOON, FATHA] : [DAMMA, WAW, ALIF]
    if (isFemininePlural(pronounId)) return [SUKOON, NOON, FATHA]
    return MOOD_SUFFIXES[mood][pronounId]
  }

  if (isInitialWeak && c3 === NOON && isFemininePlural(pronounId)) return [SHADDA, FATHA]

  if (isConsonantalMiddleWeak && mood === 'indicative' && pronounId === '2fs') return [KASRA, YEH, NOON, FATHA]

  return MOOD_SUFFIXES[mood][pronounId]
}

export function conjugatePassivePresentMood(verb: Verb, mood: Mood): Record<PronounId, string> {
  return mapRecord(
    PRONOUN_IDS.reduce(
      (acc, pronounId) => {
        acc[pronounId] = [
          PRESENT_PREFIXES[pronounId],
          DAMMA,
          ...buildC1Segment(verb, pronounId),
          ...buildC2Segment(verb, pronounId, mood),
          ...buildC3Segment(verb, pronounId, mood),
          ...suffix(verb, mood, pronounId),
        ]
        return acc
      },
      {} as Record<PronounId, readonly string[]>,
    ),
    (value) => normalizeAlifMadda(value).join('').normalize('NFC'),
  )
}
