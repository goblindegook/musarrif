import { conjugateFuture } from './active/future'
import { conjugateImperative } from './active/imperative'
import { conjugatePast } from './active/past'
import { conjugatePresentMood, type Mood } from './active/present'
import { conjugatePassiveFuture } from './passive/future'
import { conjugatePassivePast } from './passive/past'
import { conjugatePassivePresentMood } from './passive/present'
import type { PronounId } from './pronouns'
import type { Verb } from './verbs'

export type Tense = 'past' | 'present' | 'future' | 'imperative'
export type Voice = 'active' | 'passive'

export type VerbTense =
  | [voice: 'active', mood: 'imperative']
  | [voice: Voice, tense: 'past' | 'future']
  | [voice: Voice, tense: 'present', mood: Mood]

export function conjugate(verb: Verb, [voice, tense, mood]: VerbTense): Record<PronounId, string> {
  if (voice === 'passive')
    switch (tense) {
      case 'past':
        return conjugatePassivePast(verb)
      case 'present':
        return conjugatePassivePresentMood(verb, mood)
      case 'future':
        return conjugatePassiveFuture(verb)
    }

  switch (tense) {
    case 'past':
      return conjugatePast(verb)
    case 'present':
      return conjugatePresentMood(verb, mood)
    case 'future':
      return conjugateFuture(verb)
    case 'imperative':
      return conjugateImperative(verb)
  }
}

export function tenseEquals(a: VerbTense, b: VerbTense): boolean {
  return a.join('.') === b.join('.')
}
