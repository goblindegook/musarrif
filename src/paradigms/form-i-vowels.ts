import { keys } from '../primitives/objects'
import { DAMMA, FATHA, KASRA, type Token } from './tokens'
import type { FormIVerb } from './verbs'

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

export function formIPastVowel(verb: FormIVerb): Token {
  return FORM_I_VOWELS[verb.vowels][0]
}

export function formIPresentVowel(verb: FormIVerb): Token {
  return FORM_I_VOWELS[verb.vowels][1]
}

export function isFormIPastVowel(verb: FormIVerb, vowel: Token): boolean {
  return vowel.equals(FORM_I_VOWELS[verb.vowels][0])
}

export function isFormIPresentVowel(verb: FormIVerb, vowel: Token): boolean {
  return vowel.equals(FORM_I_VOWELS[verb.vowels][1])
}
