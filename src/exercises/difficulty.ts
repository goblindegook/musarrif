import { applyDiacriticsPreference } from '../paradigms/letters'
import { canConjugatePassive } from '../paradigms/passive/support'
import type { PronounId } from '../paradigms/pronouns'
import type { VerbTense } from '../paradigms/tense'
import { type Verb, verbs } from '../paradigms/verbs'

export type Difficulty = 'easy' | 'medium' | 'hard'

const EASY_TENSES: VerbTense[] = [
  ['active', 'past'],
  ['active', 'present', 'indicative'],
]

export const ACTIVE_TENSES: VerbTense[] = [
  ['active', 'past'],
  ['active', 'present', 'indicative'],
  ['active', 'present', 'subjunctive'],
  ['active', 'present', 'jussive'],
  ['active', 'future'],
  ['active', 'imperative'],
]

export const PASSIVE_TENSES: VerbTense[] = [
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

export function random<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function diacriticsDifficulty(word: string, difficulty: Difficulty): string {
  if (difficulty === 'easy') return applyDiacriticsPreference(word, 'all')
  if (difficulty === 'medium') return applyDiacriticsPreference(word, 'some')
  return applyDiacriticsPreference(word, 'none')
}
