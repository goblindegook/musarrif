import type { FormIPattern } from '../paradigms/form-i-vowels'
import { applyDiacriticsPreference } from '../paradigms/letters'
import { canConjugatePassive } from '../paradigms/passive/support'
import type { PronounId } from '../paradigms/pronouns'
import { getRootType } from '../paradigms/roots'
import type { VerbTense } from '../paradigms/tense'
import { type DisplayVerb, FORMS, synthesizeVerb, type VerbForm, verbs } from '../paradigms/verbs'
import type { CardConstraints } from './srs'

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

export function randomVerb(constraints?: CardConstraints): DisplayVerb {
  let pool: DisplayVerb[] = verbs.filter(({ root }) => root.length === 3)
  if (constraints?.rootType) pool = pool.filter((v) => getRootType(v.root) === constraints.rootType)
  if (constraints?.form) pool = pool.filter((v) => v.form === constraints.form)
  return random(pool.length > 0 ? pool : verbs)
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

const FORM_I_PATTERNS: FormIPattern[] = [
  'fa3ala-yaf3alu',
  'fa3ala-yaf3ilu',
  'fa3ala-yaf3ulu',
  'fa3ila-yaf3alu',
  'fa3ila-yaf3ilu',
  'fa3ila-yaf3ulu',
  'fa3ula-yaf3alu',
  'fa3ula-yaf3ilu',
  'fa3ula-yaf3ulu',
]

export function randomGeneratedVerb(root: string, form: VerbForm = random(FORMS)): DisplayVerb {
  if (form === 1) return synthesizeVerb(root, 1, random(FORM_I_PATTERNS))
  return synthesizeVerb(root, form)
}

export function random<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function diacriticsDifficulty(word: string, difficulty: Difficulty): string {
  if (difficulty === 'easy') return applyDiacriticsPreference(word, 'all')
  if (difficulty === 'medium') return applyDiacriticsPreference(word, 'some')
  return applyDiacriticsPreference(word, 'none')
}
