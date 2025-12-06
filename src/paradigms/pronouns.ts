export type PronounId =
  | '3ms'
  | '3fs'
  | '3dm'
  | '3df'
  | '3pm'
  | '3pf'
  | '2ms'
  | '2fs'
  | '2d'
  | '2pm'
  | '2pf'
  | '1s'
  | '1p'

export const PRONOUN_IDS: PronounId[] = [
  '1s',
  '1p',
  '2ms',
  '2fs',
  '2d',
  '2pm',
  '2pf',
  '3ms',
  '3fs',
  '3dm',
  '3df',
  '3pm',
  '3pf',
]

type PronounPerson = '1st' | '2nd' | '3rd'
export type PronounGender = 'masculine' | 'feminine'
export type PronounNumber = 'singular' | 'dual' | 'plural'

export interface PronounSlot {
  id: PronounId
  label: string
  number: PronounNumber
  person: PronounPerson
  gender?: PronounGender
}

export const PRONOUNS: readonly PronounSlot[] = [
  { id: '1s', label: 'أَنَا', number: 'singular', person: '1st' },

  { id: '2ms', label: 'أَنْتَ', number: 'singular', person: '2nd', gender: 'masculine' },
  { id: '2fs', label: 'أَنْتِ', number: 'singular', person: '2nd', gender: 'feminine' },

  { id: '3ms', label: 'هُوَ', number: 'singular', person: '3rd', gender: 'masculine' },
  { id: '3fs', label: 'هِيَ', number: 'singular', person: '3rd', gender: 'feminine' },

  { id: '2d', label: 'أَنْتُمَا', number: 'dual', person: '2nd' },

  { id: '3dm', label: 'هُمَا', number: 'dual', person: '3rd', gender: 'masculine' },
  { id: '3df', label: 'هُمَا', number: 'dual', person: '3rd', gender: 'feminine' },

  { id: '1p', label: 'نَحْنُ', number: 'plural', person: '1st' },

  { id: '2pm', label: 'أَنْتُمْ', number: 'plural', person: '2nd', gender: 'masculine' },
  { id: '2pf', label: 'أَنْتُنَّ', number: 'plural', person: '2nd', gender: 'feminine' },

  { id: '3pm', label: 'هُمْ', number: 'plural', person: '3rd', gender: 'masculine' },
  { id: '3pf', label: 'هُنَّ', number: 'plural', person: '3rd', gender: 'feminine' },
] as const
