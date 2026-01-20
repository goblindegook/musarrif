export const PRONOUN_IDS = [
  '1s',
  '1p',
  '2ms',
  '2fs',
  '2d',
  '2mp',
  '2fp',
  '3ms',
  '3fs',
  '3md',
  '3fd',
  '3mp',
  '3fp',
] as const

export type PronounId = (typeof PRONOUN_IDS)[number]

export function isMasculinePlural(pronounId: PronounId): boolean {
  return pronounId === '2mp' || pronounId === '3mp'
}

export function isFemininePlural(pronounId: PronounId): boolean {
  return pronounId === '2fp' || pronounId === '3fp'
}

export function isPlural(pronounId: PronounId): boolean {
  return isMasculinePlural(pronounId) || isFemininePlural(pronounId)
}
