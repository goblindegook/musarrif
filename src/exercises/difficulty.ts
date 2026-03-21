import { applyDiacriticsPreference } from '../paradigms/letters'
import { canConjugatePassive } from '../paradigms/passive/support'
import type { PronounId } from '../paradigms/pronouns'
import type { VerbTense } from '../paradigms/tense'
import { type DisplayVerb, type VerbForm, verbs } from '../paradigms/verbs'

export type Difficulty = 'easy' | 'medium' | 'hard'

export const EASY_TENSES: VerbTense[] = [
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

const FORMS: VerbForm[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export function randomVerb(difficulty: Difficulty): DisplayVerb {
  return random(difficulty === 'easy' ? verbs : verbs.filter(({ root }) => root.length === 3))
}

export function tensePool(verb: DisplayVerb, difficulty: Difficulty): VerbTense[] {
  if (difficulty === 'easy') return EASY_TENSES
  if (difficulty === 'medium' || !canConjugatePassive(verb)) return ACTIVE_TENSES
  return [...ACTIVE_TENSES, ...PASSIVE_TENSES]
}

export function randomTense(verb: DisplayVerb, difficulty: Difficulty): VerbTense {
  return random(tensePool(verb, difficulty))
}

function pronounPool(verb: DisplayVerb, [voice, tense]: VerbTense, difficulty: Difficulty): PronounId[] {
  const pronouns = difficulty === 'easy' ? PRONOUNS.filter((p) => !p.includes('d')) : PRONOUNS
  if (tense === 'imperative') return pronouns.filter((p) => p.startsWith('2'))
  if (voice === 'passive' && verb.passiveVoice === 'impersonal') return ['3ms']
  return pronouns
}

export function randomPronoun(verb: DisplayVerb, tense: VerbTense, difficulty: Difficulty): PronounId {
  return random(pronounPool(verb, tense, difficulty))
}

export function randomForm(): VerbForm {
  return random(FORMS)
}

export function random<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function diacriticsDifficulty(word: string, difficulty: Difficulty): string {
  if (difficulty === 'easy') return applyDiacriticsPreference(word, 'all')
  if (difficulty === 'medium') return applyDiacriticsPreference(word, 'some')
  return applyDiacriticsPreference(word, 'none')
}
