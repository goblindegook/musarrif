import { createRouting } from './hooks/useRouting'
import type { Mood, NonPresentTense, Voice } from './paradigms/tense'
import { isMood, isTense, isVoice } from './paradigms/tense'

type AppRoute =
  | readonly ['verbs']
  | readonly ['verbs', verbId: string]
  | readonly ['verbs', verbId: string, voice: Voice]
  | readonly ['verbs', verbId: string, voice: Voice, tense: NonPresentTense | 'present']
  | readonly ['verbs', verbId: string, voice: Voice, tense: 'present', mood: Mood]
  | readonly ['verbs', verbId: string, voice: 'active', tense: 'imperative']
  | readonly ['test']

const parse = (segments: readonly string[]): AppRoute => {
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

export const { Route, Router, RoutingProvider, useRouting } = createRouting({ parse })
