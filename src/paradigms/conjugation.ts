import { mapRecord } from '../primitives/objects'
import { conjugateFuture } from './active/future'
import { conjugateImperative } from './active/imperative'
import { conjugatePast } from './active/past'
import { conjugatePresentMood } from './active/present'
import { conjugatePassiveFuture } from './passive/future'
import { conjugatePassivePast } from './passive/past'
import { conjugatePassivePresentMood } from './passive/present'
import type { PronounId } from './pronouns'
import type { VerbTense } from './tense'
import { tokenize } from './tokens'
import type { Verb } from './verbs'
import { measureMorpheme, Word } from './word'

export function conjugate(verb: Verb, verbTense: VerbTense): Record<PronounId, Word> {
  return CONJUGATE[verbTense](verb)
}

function toWord(words: Record<PronounId, string>): Record<PronounId, Word> {
  return mapRecord(words, (word) => new Word([measureMorpheme(...tokenize(word))]))
}

const CONJUGATE = {
  'active.past': conjugatePast,
  'active.present.indicative': (verb: Verb) => conjugatePresentMood(verb, 'indicative'),
  'active.present.subjunctive': (verb: Verb) => conjugatePresentMood(verb, 'subjunctive'),
  'active.present.jussive': (verb: Verb) => conjugatePresentMood(verb, 'jussive'),
  'active.future': (verb: Verb) => toWord(conjugateFuture(verb)),
  'active.imperative': (verb: Verb) => toWord(conjugateImperative(verb)),
  'passive.past': (verb: Verb) => toWord(conjugatePassivePast(verb)),
  'passive.present.indicative': (verb: Verb) => toWord(conjugatePassivePresentMood(verb, 'indicative')),
  'passive.present.subjunctive': (verb: Verb) => toWord(conjugatePassivePresentMood(verb, 'subjunctive')),
  'passive.present.jussive': (verb: Verb) => toWord(conjugatePassivePresentMood(verb, 'jussive')),
  'passive.future': (verb: Verb) => toWord(conjugatePassiveFuture(verb)),
} as const
