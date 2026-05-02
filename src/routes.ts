import { createRouting } from './hooks/useRouting'
import type { Mood, NonPresentTense, Tense, Voice } from './paradigms/tense'

type AppRoute =
  | readonly ['verbs']
  | readonly ['verbs', verbId: string]
  | readonly ['verbs', verbId: string, voice: Voice]
  | readonly ['verbs', verbId: string, voice: Voice, tense: NonPresentTense | 'present']
  | readonly ['verbs', verbId: string, voice: Voice, tense: 'present', mood: Mood]
  | readonly ['verbs', verbId: string, voice: 'active', tense: 'imperative']
  | readonly ['test']

export const { Route, Router, RoutingProvider, useRouting } = createRouting({
  mode: 'hash',
  parse,
})

function parse(segments: readonly string[]): AppRoute {
  if (!segments.at(0)) return ['verbs']
  if (segments.at(0) === 'test') return ['test']
  if (segments.at(0) !== 'verbs') return parse(segments.slice(1))

  const [_, verbId, voice, tense, mood] = segments

  if (!verbId?.match(/^[^-]{3,5}-\d+$/)) return ['verbs']
  if (!isVoice(voice)) return ['verbs', verbId]
  if (!isTense(tense)) return ['verbs', verbId, voice, 'past']

  if (tense === 'present') {
    if (!isMood(mood)) return ['verbs', verbId, voice, tense]
    return ['verbs', verbId, voice, tense, mood]
  }

  if (tense === 'imperative') {
    if (voice === 'passive') return ['verbs', verbId, 'passive', 'past']
    return ['verbs', verbId, 'active', 'imperative']
  }

  return ['verbs', verbId, voice, tense]
}

const VOICES = new Set<Voice>(['active', 'passive'])

function isVoice(value: unknown): value is Voice {
  return VOICES.has(value as Voice)
}

const TENSES = new Set<Tense>(['past', 'present', 'future', 'imperative'])

function isTense(value: unknown): value is Tense {
  return TENSES.has(value as Tense)
}

const MOODS = new Set<Mood>(['indicative', 'subjunctive', 'jussive'])

function isMood(value: unknown): value is Mood {
  return MOODS.has(value as Mood)
}
