import { type ShortVowel, shortVowelFromPattern, type Vowel } from './letters'
import type { Verb } from './verbs'

export type FormIPattern =
  | 'fa3ala-yaf3alu'
  | 'fa3ala-yaf3ulu'
  | 'fa3ala-yaf3ilu'
  | 'fa3ila-yaf3alu'
  | 'fa3ila-yaf3ulu'
  | 'fa3ila-yaf3ilu'
  | 'fa3ula-yaf3ulu'

export const FORM_I_PAST_VOWELS = {
  'fa3ala-yaf3alu': 'a',
  'fa3ala-yaf3ulu': 'a',
  'fa3ala-yaf3ilu': 'a',
  'fa3ila-yaf3alu': 'i',
  'fa3ila-yaf3ulu': 'i',
  'fa3ila-yaf3ilu': 'i',
  'fa3ula-yaf3ulu': 'u',
} satisfies Record<FormIPattern, ShortVowel>

export const FORM_I_PRESENT_VOWELS = {
  'fa3ala-yaf3alu': 'a',
  'fa3ala-yaf3ulu': 'u',
  'fa3ala-yaf3ilu': 'i',
  'fa3ila-yaf3alu': 'a',
  'fa3ila-yaf3ulu': 'u',
  'fa3ila-yaf3ilu': 'i',
  'fa3ula-yaf3ulu': 'u',
} satisfies Record<FormIPattern, ShortVowel>

export function formIPastShortVowel(verb: Verb<1>): Vowel {
  return shortVowelFromPattern(FORM_I_PAST_VOWELS[verb.formPattern])
}

export function formIPresentShortVowel(verb: Verb<1>): Vowel {
  return shortVowelFromPattern(FORM_I_PRESENT_VOWELS[verb.formPattern])
}

export function isFormIPastVowel(verb: Verb<1>, vowel: ShortVowel): boolean {
  return FORM_I_PAST_VOWELS[verb.formPattern] === vowel
}

export function isFormIPresentVowel(verb: Verb<1>, vowel: ShortVowel): boolean {
  return FORM_I_PRESENT_VOWELS[verb.formPattern] === vowel
}
