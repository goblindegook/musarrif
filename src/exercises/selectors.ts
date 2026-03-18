import { conjugateFuture } from '../paradigms/active/future'
import { conjugateImperative } from '../paradigms/active/imperative'
import { conjugatePast } from '../paradigms/active/past'
import { conjugatePresentMood, type Mood } from '../paradigms/active/present'
import type { DiacriticsPreference } from '../paradigms/letters'
import { conjugatePassiveFuture } from '../paradigms/passive/future'
import { conjugatePassivePast } from '../paradigms/passive/past'
import { conjugatePassivePresentMood } from '../paradigms/passive/present'
import { canConjugatePassive } from '../paradigms/passive/support'
import type { PronounId } from '../paradigms/pronouns'
import { type Verb, type Voice, verbs } from '../paradigms/verbs'
import type { Difficulty } from './types'

type VerbTense =
  | [voice: 'active', mood: 'imperative']
  | [voice: Voice, tense: 'past' | 'future']
  | [voice: Voice, tense: 'present', mood: Mood]

const EASY_TENSES: VerbTense[] = [
  ['active', 'past'],
  ['active', 'present', 'indicative'],
]

const ACTIVE_TENSES: VerbTense[] = [
  ['active', 'past'],
  ['active', 'present', 'indicative'],
  ['active', 'present', 'subjunctive'],
  ['active', 'present', 'jussive'],
  ['active', 'future'],
  ['active', 'imperative'],
]

const PASSIVE_TENSES: VerbTense[] = [
  ['passive', 'past'],
  ['passive', 'present', 'indicative'],
  ['passive', 'present', 'subjunctive'],
  ['passive', 'present', 'jussive'],
  ['passive', 'future'],
]

const PRONOUNS: PronounId[] = ['1s', '1p', '2ms', '2fs', '2d', '2mp', '2fp', '3ms', '3fs', '3md', '3fd', '3mp', '3fp']

export function randomVerb(difficulty: Difficulty): Verb {
  return random(difficulty === 'easy' ? verbs : verbs.filter(({ root }) => root.length === 3))
}

export function randomTense(verb: Verb, difficulty: Difficulty): VerbTense {
  if (difficulty === 'easy') return random(EASY_TENSES)
  if (difficulty === 'medium' || !canConjugatePassive(verb)) return random(ACTIVE_TENSES)
  return random([...ACTIVE_TENSES, ...PASSIVE_TENSES])
}

export function randomPronoun(verb: Verb, [voice, tense]: VerbTense, difficulty: Difficulty): PronounId {
  const pronouns = difficulty === 'easy' ? PRONOUNS.filter((p) => !p.includes('d')) : PRONOUNS
  if (tense === 'imperative') return random(pronouns.filter((p) => p.startsWith('2')))
  if (voice === 'passive' && verb.passiveVoice === 'impersonal') return '3ms'
  return random(pronouns)
}

export function diacriticsDifficulty(difficulty: Difficulty): DiacriticsPreference {
  if (difficulty === 'easy') return 'all'
  if (difficulty === 'medium') return 'some'
  return 'none'
}

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

export function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
