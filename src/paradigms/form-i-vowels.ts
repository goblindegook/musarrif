import { DAMMA, FATHA, KASRA, type Vowel } from './letters'
import type { FormIVerb } from './verbs'

export type FormIPattern =
  | 'fa3ala-yaf3alu'
  | 'fa3ala-yaf3ilu'
  | 'fa3ala-yaf3ulu'
  | 'fa3ila-yaf3alu'
  | 'fa3ila-yaf3ilu'
  | 'fa3ila-yaf3ulu'
  | 'fa3ula-yaf3alu'
  | 'fa3ula-yaf3ilu'
  | 'fa3ula-yaf3ulu'

export const FORM_I_PATTERNS: FormIPattern[] = [
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

const FORM_I_PAST_VOWELS = {
  'fa3ala-yaf3alu': FATHA,
  'fa3ala-yaf3ilu': FATHA,
  'fa3ala-yaf3ulu': FATHA,
  'fa3ila-yaf3alu': KASRA,
  'fa3ila-yaf3ilu': KASRA,
  'fa3ila-yaf3ulu': KASRA,
  'fa3ula-yaf3alu': DAMMA,
  'fa3ula-yaf3ilu': DAMMA,
  'fa3ula-yaf3ulu': DAMMA,
} satisfies Record<FormIPattern, Vowel>

const FORM_I_PRESENT_VOWELS = {
  'fa3ala-yaf3alu': FATHA,
  'fa3ala-yaf3ilu': KASRA,
  'fa3ala-yaf3ulu': DAMMA,
  'fa3ila-yaf3alu': FATHA,
  'fa3ila-yaf3ilu': KASRA,
  'fa3ila-yaf3ulu': DAMMA,
  'fa3ula-yaf3alu': FATHA,
  'fa3ula-yaf3ilu': KASRA,
  'fa3ula-yaf3ulu': DAMMA,
} satisfies Record<FormIPattern, Vowel>

export function formIPastVowel(verb: FormIVerb): Vowel {
  return FORM_I_PAST_VOWELS[verb.formPattern]
}

export function formIPresentVowel(verb: FormIVerb): Vowel {
  return FORM_I_PRESENT_VOWELS[verb.formPattern]
}

export function isFormIPastVowel(verb: FormIVerb, vowel: Vowel): boolean {
  return FORM_I_PAST_VOWELS[verb.formPattern] === vowel
}

export function isFormIPresentVowel(verb: FormIVerb, vowel: Vowel): boolean {
  return FORM_I_PRESENT_VOWELS[verb.formPattern] === vowel
}
