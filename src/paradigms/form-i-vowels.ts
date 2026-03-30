import { DAMMA, FATHA, KASRA, type Vowel } from './letters'
import type { FormIVerb } from './verbs'

const FORM_I_VOWELS = {
  'fa3ala-yaf3alu': [FATHA, FATHA],
  'fa3ala-yaf3ilu': [FATHA, KASRA],
  'fa3ala-yaf3ulu': [FATHA, DAMMA],
  'fa3ila-yaf3alu': [KASRA, FATHA],
  'fa3ila-yaf3ilu': [KASRA, KASRA],
  'fa3ila-yaf3ulu': [KASRA, DAMMA],
  'fa3ula-yaf3alu': [DAMMA, FATHA],
  'fa3ula-yaf3ilu': [DAMMA, KASRA],
  'fa3ula-yaf3ulu': [DAMMA, DAMMA],
} as const

export type FormIPattern = keyof typeof FORM_I_VOWELS

export const FORM_I_PATTERNS = Object.keys(FORM_I_VOWELS) as readonly FormIPattern[]

export const FORM_I_PATTERN_LABELS = {
  'fa3ala-yaf3alu': 'فَعَلَ / يَفْعَلُ',
  'fa3ala-yaf3ilu': 'فَعَلَ / يَفْعِلُ',
  'fa3ala-yaf3ulu': 'فَعَلَ / يَفْعُلُ',
  'fa3ila-yaf3alu': 'فَعِلَ / يَفْعَلُ',
  'fa3ila-yaf3ilu': 'فَعِلَ / يَفْعِلُ',
  'fa3ila-yaf3ulu': 'فَعِلَ / يَفْعُلُ',
  'fa3ula-yaf3alu': 'فَعُلَ / يَفْعَلُ',
  'fa3ula-yaf3ilu': 'فَعُلَ / يَفْعِلُ',
  'fa3ula-yaf3ulu': 'فَعُلَ / يَفْعُلُ',
} satisfies Readonly<Record<FormIPattern, string>>

export function formIPastVowel(verb: FormIVerb): Vowel {
  return FORM_I_VOWELS[verb.formPattern][0]
}

export function formIPresentVowel(verb: FormIVerb): Vowel {
  return FORM_I_VOWELS[verb.formPattern][1]
}

export function isFormIPastVowel(verb: FormIVerb, vowel: Vowel): boolean {
  return FORM_I_VOWELS[verb.formPattern][0] === vowel
}

export function isFormIPresentVowel(verb: FormIVerb, vowel: Vowel): boolean {
  return FORM_I_VOWELS[verb.formPattern][1] === vowel
}
