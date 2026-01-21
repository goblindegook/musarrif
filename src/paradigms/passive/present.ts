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
  '2fs': [KASRA, YEH, SUKOON, NOON, FATHA],
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

export function conjugatePassivePresentMood(verb: Verb, mood: Mood): Record<PronounId, string> {
  const [c1, c2, c3] = [...verb.root]
  const isInitialHamza = isHamzatedLetter(c1)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const isMiddleHamza = isHamzatedLetter(c2)
  const isInitialWeak = isWeakLetter(c1)
  const isGeminate = c2 === c3

  const isConsonantalMiddleWeak = hasPattern(verb, 'fa3ila-yaf3alu') && (c2 === YEH || c2 === WAW)

  const suffixes =
    isConsonantalMiddleWeak && mood === 'indicative'
      ? { ...MOOD_SUFFIXES[mood], '2fs': [KASRA, YEH, NOON, FATHA] }
      : MOOD_SUFFIXES[mood]

  if (isInitialHamza && !isMiddleWeak && !isFinalWeak) {
    return mapRecord(
      PRONOUN_IDS.reduce(
        (acc, pronounId) => {
          const prefix = PRESENT_PREFIXES[pronounId]
          const stem = pronounId === '1s' ? [WAW, c2, FATHA, c3] : [HAMZA_ON_WAW, SUKOON, c2, FATHA, c3]

          if (pronounId === '2fs' && mood === 'indicative') {
            acc[pronounId] = [prefix, DAMMA, HAMZA_ON_WAW, SUKOON, c2, FATHA, c3, KASRA, YEH, NOON, FATHA]
            return acc
          }

          acc[pronounId] = [prefix, DAMMA, ...stem, ...suffixes[pronounId]]
          return acc
        },
        {} as Record<PronounId, readonly string[]>,
      ),
      (value) => value.join('').normalize('NFC'),
    )
  }

  if (isInitialHamza && isMiddleWeak && isFinalWeak) {
    return mapRecord(
      PRONOUN_IDS.reduce(
        (acc, pronounId) => {
          const prefix = PRESENT_PREFIXES[pronounId]
          const baseStem = pronounId === '1s' ? [WAW, c2] : [HAMZA_ON_WAW, SUKOON, c2]

          if (pronounId === '2fs') {
            const tail = mood === 'indicative' ? [FATHA, YEH, SUKOON, NOON, FATHA] : [FATHA, YEH, SUKOON]
            acc[pronounId] = [prefix, DAMMA, ...baseStem, ...tail]
            return acc
          }

          if (isFemininePlural(pronounId)) {
            acc[pronounId] = [prefix, DAMMA, HAMZA_ON_WAW, SUKOON, c2, FATHA, YEH, SUKOON, NOON, FATHA]
            return acc
          }

          if (isMasculinePlural(pronounId)) {
            const tail = mood === 'indicative' ? [FATHA, WAW, SUKOON, NOON, FATHA] : [FATHA, WAW, ALIF]
            acc[pronounId] = [prefix, DAMMA, HAMZA_ON_WAW, SUKOON, c2, ...tail]
            return acc
          }

          if (isDual(pronounId)) {
            const tail = mood === 'indicative' ? [FATHA, YEH, FATHA, ALIF, NOON, KASRA] : [FATHA, YEH, FATHA, ALIF]
            acc[pronounId] = [prefix, DAMMA, HAMZA_ON_WAW, SUKOON, c2, ...tail]
            return acc
          }

          const tail = mood === 'jussive' ? [FATHA] : [FATHA, ALIF_MAQSURA]
          acc[pronounId] = [prefix, DAMMA, ...baseStem, ...tail]
          return acc
        },
        {} as Record<PronounId, readonly string[]>,
      ),
      (value) => value.join('').normalize('NFC'),
    )
  }

  if (isFinalWeak && !isMiddleWeak && !isInitialHamza && !isMiddleHamza) {
    return mapRecord(
      PRONOUN_IDS.reduce(
        (acc, pronounId) => {
          const prefix = PRESENT_PREFIXES[pronounId]
          const c1Segment = isWeakLetter(c1) ? [c1] : [c1, SUKOON]

          if (pronounId === '2fs') {
            const tail = mood === 'indicative' ? [FATHA, YEH, SUKOON, NOON, FATHA] : [FATHA, YEH, SUKOON]
            acc[pronounId] = [prefix, DAMMA, ...c1Segment, c2, ...tail]
            return acc
          }

          if (isFemininePlural(pronounId)) {
            acc[pronounId] = [prefix, DAMMA, ...c1Segment, c2, FATHA, YEH, SUKOON, NOON, FATHA]
            return acc
          }

          if (isMasculinePlural(pronounId)) {
            const tail = mood === 'indicative' ? [FATHA, WAW, SUKOON, NOON, FATHA] : [FATHA, WAW, ALIF]
            acc[pronounId] = [prefix, DAMMA, ...c1Segment, c2, ...tail]
            return acc
          }

          if (isDual(pronounId)) {
            const tail = mood === 'indicative' ? [FATHA, YEH, FATHA, ALIF, NOON, KASRA] : [FATHA, YEH, FATHA, ALIF]
            acc[pronounId] = [prefix, DAMMA, ...c1Segment, c2, ...tail]
            return acc
          }

          const tail = mood === 'jussive' ? [FATHA] : [FATHA, ALIF_MAQSURA]
          acc[pronounId] = [prefix, DAMMA, ...c1Segment, c2, ...tail]
          return acc
        },
        {} as Record<PronounId, readonly string[]>,
      ),
      (value) => value.join('').normalize('NFC'),
    )
  }

  if (isMiddleHamza && isFinalWeak) {
    return mapRecord(
      PRONOUN_IDS.reduce(
        (acc, pronounId) => {
          const prefix = PRESENT_PREFIXES[pronounId]

          if (pronounId === '2fs') {
            const tail = mood === 'indicative' ? [FATHA, YEH, SUKOON, NOON, FATHA] : [FATHA, YEH, SUKOON]
            acc[pronounId] = [prefix, DAMMA, c1, ...tail]
            return acc
          }

          if (isFemininePlural(pronounId)) {
            acc[pronounId] = [prefix, DAMMA, c1, FATHA, YEH, SUKOON, NOON, FATHA]
            return acc
          }

          if (isMasculinePlural(pronounId)) {
            const tail = mood === 'indicative' ? [FATHA, WAW, SUKOON, NOON, FATHA] : [FATHA, WAW, ALIF]
            acc[pronounId] = [prefix, DAMMA, c1, ...tail]
            return acc
          }

          if (isDual(pronounId)) {
            const tail = mood === 'indicative' ? [FATHA, YEH, FATHA, ALIF, NOON, KASRA] : [FATHA, YEH, FATHA, ALIF]
            acc[pronounId] = [prefix, DAMMA, c1, ...tail]
            return acc
          }

          const stem = mood === 'jussive' ? [c1, FATHA] : [c1, FATHA, ALIF_MAQSURA]
          acc[pronounId] = [prefix, DAMMA, ...stem]
          return acc
        },
        {} as Record<PronounId, readonly string[]>,
      ),
      (value) => value.join('').normalize('NFC'),
    )
  }

  if (isInitialHamza && !isMiddleWeak && isFinalWeak) {
    return mapRecord(
      PRONOUN_IDS.reduce(
        (acc, pronounId) => {
          const prefix = PRESENT_PREFIXES[pronounId]
          const baseStem = pronounId === '1s' ? [WAW, c2] : [HAMZA_ON_WAW, SUKOON, c2]

          if (pronounId === '2fs') {
            const tail = mood === 'indicative' ? [FATHA, YEH, SUKOON, NOON, FATHA] : [FATHA, YEH, SUKOON]
            acc[pronounId] = [prefix, DAMMA, ...baseStem, ...tail]
            return acc
          }

          if (isFemininePlural(pronounId)) {
            acc[pronounId] = [prefix, DAMMA, HAMZA_ON_WAW, SUKOON, c2, FATHA, YEH, SUKOON, NOON, FATHA]
            return acc
          }

          if (isMasculinePlural(pronounId)) {
            const tail = mood === 'indicative' ? [FATHA, WAW, SUKOON, NOON, FATHA] : [FATHA, WAW, ALIF]
            acc[pronounId] = [prefix, DAMMA, HAMZA_ON_WAW, SUKOON, c2, ...tail]
            return acc
          }

          if (isDual(pronounId)) {
            const tail = mood === 'indicative' ? [FATHA, YEH, FATHA, ALIF, NOON, KASRA] : [FATHA, YEH, FATHA, ALIF]
            acc[pronounId] = [prefix, DAMMA, HAMZA_ON_WAW, SUKOON, c2, ...tail]
            return acc
          }

          const tail = mood === 'jussive' ? [FATHA] : [FATHA, ALIF_MAQSURA]
          acc[pronounId] = [prefix, DAMMA, ...baseStem, ...tail]
          return acc
        },
        {} as Record<PronounId, readonly string[]>,
      ),
      (value) => value.join('').normalize('NFC'),
    )
  }

  if (isMiddleWeak && !isConsonantalMiddleWeak) {
    return mapRecord(
      PRONOUN_IDS.reduce(
        (acc, pronounId) => {
          const prefix = PRESENT_PREFIXES[pronounId]

          if (pronounId === '2fs') {
            const tail = mood === 'indicative' ? [KASRA, YEH, NOON, FATHA] : [KASRA, YEH]
            acc[pronounId] = [prefix, DAMMA, c1, FATHA, ALIF, c3, ...tail]
            return acc
          }

          if (isFemininePlural(pronounId)) {
            acc[pronounId] = [prefix, DAMMA, c1, FATHA, c3, SUKOON, NOON, FATHA]
            return acc
          }

          if (isMasculinePlural(pronounId)) {
            const tail = mood === 'indicative' ? [DAMMA, WAW, NOON, FATHA] : [DAMMA, WAW, ALIF]
            acc[pronounId] = [prefix, DAMMA, c1, FATHA, ALIF, c3, ...tail]
            return acc
          }

          if (isDual(pronounId)) {
            const tail = mood === 'indicative' ? [FATHA, ALIF, NOON, KASRA] : [FATHA, ALIF]
            acc[pronounId] = [prefix, DAMMA, c1, FATHA, ALIF, c3, ...tail]
            return acc
          }

          const stem = mood === 'jussive' ? [c1, FATHA, c3] : [c1, FATHA, ALIF, c3]
          acc[pronounId] = [prefix, DAMMA, ...stem, ...suffixes[pronounId]]
          return acc
        },
        {} as Record<PronounId, readonly string[]>,
      ),
      (value) => value.join('').normalize('NFC'),
    )
  }

  if (isGeminate) {
    const geminateSuffixes = mood === 'jussive' ? SUBJUNCTIVE_SUFFIXES : suffixes

    return mapRecord(
      PRONOUN_IDS.reduce(
        (acc, pronounId) => {
          const prefix = PRESENT_PREFIXES[pronounId]

          if (pronounId === '2fs') {
            const tail = mood === 'indicative' ? [KASRA, YEH, SUKOON, NOON, FATHA] : [KASRA, YEH]
            acc[pronounId] = [prefix, DAMMA, c1, FATHA, c2, SHADDA, ...tail]
            return acc
          }

          if (isFemininePlural(pronounId)) {
            const stem = isInitialWeak ? [c1, c2, FATHA, c3] : [c1, SUKOON, c2, FATHA, c3]
            acc[pronounId] = [prefix, DAMMA, ...stem, ...geminateSuffixes[pronounId]]
            return acc
          }

          acc[pronounId] = [prefix, DAMMA, c1, FATHA, c2, SHADDA, ...geminateSuffixes[pronounId]]
          return acc
        },
        {} as Record<PronounId, readonly string[]>,
      ),
      (value) => value.join('').normalize('NFC'),
    )
  }

  if (isInitialWeak) {
    const seatedC1 = c1 === YEH ? WAW : c1
    return mapRecord(
      PRONOUN_IDS.reduce(
        (acc, pronounId) => {
          if (pronounId === '2fs' && mood === 'indicative') {
            acc[pronounId] = [
              PRESENT_PREFIXES[pronounId],
              DAMMA,
              seatedC1,
              c2,
              FATHA,
              seatHamza(c3, KASRA),
              KASRA,
              YEH,
              NOON,
              FATHA,
            ]
            return acc
          }

          if (c3 === NOON && isFemininePlural(pronounId)) {
            acc[pronounId] = [PRESENT_PREFIXES[pronounId], DAMMA, seatedC1, c2, FATHA, NOON, SHADDA, FATHA]
            return acc
          }

          acc[pronounId] = normalizeAlifMadda([
            PRESENT_PREFIXES[pronounId],
            DAMMA,
            seatedC1,
            c2,
            FATHA,
            seatHamza(c3, pronounId === '2fs' ? KASRA : FATHA),
            ...suffixes[pronounId],
          ])
          return acc
        },
        {} as Record<PronounId, readonly string[]>,
      ),
      (value) => value.join('').normalize('NFC'),
    )
  }

  return mapRecord(
    PRONOUN_IDS.reduce(
      (acc, pronounId) => {
        const seatedC3 = seatHamza(c3, pronounId === '2fs' ? KASRA : FATHA)
        acc[pronounId] = normalizeAlifMadda([
          PRESENT_PREFIXES[pronounId],
          DAMMA,
          c1,
          SUKOON,
          c2,
          FATHA,
          seatedC3,
          ...suffixes[pronounId],
        ])
        return acc
      },
      {} as Record<PronounId, readonly string[]>,
    ),
    (value) => value.join('').normalize('NFC'),
  )
}
