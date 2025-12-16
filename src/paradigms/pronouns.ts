export const PRONOUN_IDS = [
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
] as const

export type PronounId = (typeof PRONOUN_IDS)[number]
