import { conjugateFuture } from './active/future'
import { conjugateImperative } from './active/imperative'
import { conjugatePast } from './active/past'
import { conjugatePresentMood } from './active/present'
import { conjugatePassiveFuture } from './passive/future'
import { conjugatePassivePast } from './passive/past'
import { conjugatePassivePresentMood } from './passive/present'
import type { PronounId } from './pronouns'
import type { VerbTense } from './tense'
import type { Verb } from './verbs'

export function conjugate(verb: Verb, verbTense: VerbTense): Record<PronounId, string> {
  return CONJUGATE[verbTense](verb)
}

const CONJUGATE = {
  'active.past': conjugatePast,
  'active.present.indicative': (verb: Verb) => conjugatePresentMood(verb, 'indicative'),
  'active.present.subjunctive': (verb: Verb) => conjugatePresentMood(verb, 'subjunctive'),
  'active.present.jussive': (verb: Verb) => conjugatePresentMood(verb, 'jussive'),
  'active.future': conjugateFuture,
  'active.imperative': conjugateImperative,
  'passive.past': conjugatePassivePast,
  'passive.present.indicative': (verb: Verb) => conjugatePassivePresentMood(verb, 'indicative'),
  'passive.present.subjunctive': (verb: Verb) => conjugatePassivePresentMood(verb, 'subjunctive'),
  'passive.present.jussive': (verb: Verb) => conjugatePassivePresentMood(verb, 'jussive'),
  'passive.future': conjugatePassiveFuture,
} as const
