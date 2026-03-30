import { conjugateFuture } from './active/future'
import { conjugateImperative } from './active/imperative'
import { conjugatePast } from './active/past'
import { conjugatePresentMood } from './active/present'
import { conjugatePassiveFuture } from './passive/future'
import { conjugatePassivePast } from './passive/past'
import { conjugatePassivePresentMood } from './passive/present'
import type { PronounId } from './pronouns'
import type { Verb } from './verbs'

export type Voice = 'active' | 'passive'
type NonPresentTense = 'past' | 'future'
export type Tense = NonPresentTense | 'present' | 'imperative'
export type Mood = 'indicative' | 'subjunctive' | 'jussive'

export type VerbTense = 'active.imperative' | `${Voice}.${NonPresentTense}` | `${Voice}.present.${Mood}`

export function conjugate(verb: Verb, verbTense: VerbTense): Record<PronounId, string> {
  switch (verbTense) {
    case 'active.past':
      return conjugatePast(verb)
    case 'active.present.indicative':
      return conjugatePresentMood(verb, 'indicative')
    case 'active.present.subjunctive':
      return conjugatePresentMood(verb, 'subjunctive')
    case 'active.present.jussive':
      return conjugatePresentMood(verb, 'jussive')
    case 'active.future':
      return conjugateFuture(verb)
    case 'active.imperative':
      return conjugateImperative(verb)
    case 'passive.past':
      return conjugatePassivePast(verb)
    case 'passive.present.indicative':
      return conjugatePassivePresentMood(verb, 'indicative')
    case 'passive.present.subjunctive':
      return conjugatePassivePresentMood(verb, 'subjunctive')
    case 'passive.present.jussive':
      return conjugatePassivePresentMood(verb, 'jussive')
    case 'passive.future':
      return conjugatePassiveFuture(verb)
  }
}
