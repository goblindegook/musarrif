import { keys } from '../primitives/objects'
import { DAMMA, FATHA, KASRA, type Token } from './tokens'

const FORM_I_VOWELS = {
  'a-a': [FATHA, FATHA],
  'a-i': [FATHA, KASRA],
  'a-u': [FATHA, DAMMA],
  'i-a': [KASRA, FATHA],
  'i-i': [KASRA, KASRA],
  'i-u': [KASRA, DAMMA],
  'u-a': [DAMMA, FATHA],
  'u-i': [DAMMA, KASRA],
  'u-u': [DAMMA, DAMMA],
} as const

export type FormIPattern = keyof typeof FORM_I_VOWELS

export const FORM_I_PATTERNS = keys(FORM_I_VOWELS)

export const RARE_FORM_I_PATTERNS: ReadonlySet<FormIPattern> = new Set(['i-i', 'i-u', 'u-a', 'u-i'])

export function formIPastVowel(verb: { vowels: FormIPattern }): Token {
  return FORM_I_VOWELS[verb.vowels][0]
}

export function formIPresentVowel(verb: { vowels: FormIPattern }): Token {
  return FORM_I_VOWELS[verb.vowels][1]
}

export function isFormIPastVowel(verb: { vowels: FormIPattern }, vowel: Token): boolean {
  return vowel.equals(FORM_I_VOWELS[verb.vowels][0])
}

export function isFormIPresentVowel(verb: { vowels: FormIPattern }, vowel: Token): boolean {
  return vowel.equals(FORM_I_VOWELS[verb.vowels][1])
}
