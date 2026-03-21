export const PRONOUN_IDS = ['1s', '1p', '2ms', '2fs', '2d', '2mp', '2fp', '3ms', '3fs', '3md', '3fd', '3mp', '3fp']

export type PronounId = (typeof PRONOUN_IDS)[number]

export const ARABIC_PRONOUNS: Record<PronounId, string> = {
  '1s': 'أَنَا',
  '1p': 'نَحْنُ',
  '2ms': 'أَنْتَ',
  '2fs': 'أَنْتِ',
  '2d': 'أَنْتُمَا',
  '2mp': 'أَنْتُمْ',
  '2fp': 'أَنْتُنَّ',
  '3ms': 'هُوَ',
  '3fs': 'هِيَ',
  '3md': 'هُمَا',
  '3fd': 'هُمَا',
  '3mp': 'هُمْ',
  '3fp': 'هُنَّ',
} as const

export function isMasculinePlural(pronounId: PronounId): pronounId is '2mp' | '3mp' {
  return pronounId === '2mp' || pronounId === '3mp'
}

export function isFemininePlural(pronounId: PronounId): pronounId is '2fp' | '3fp' {
  return pronounId === '2fp' || pronounId === '3fp'
}

export function isDual(pronounId: PronounId): pronounId is '2d' | '3md' | '3fd' {
  return pronounId === '2d' || pronounId === '3md' || pronounId === '3fd'
}
