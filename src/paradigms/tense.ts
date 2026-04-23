export type Voice = 'active' | 'passive'
export type NonPresentTense = 'past' | 'future'
export type Tense = NonPresentTense | 'present' | 'imperative'
export type Mood = 'indicative' | 'subjunctive' | 'jussive'

export type VerbTense = 'active.imperative' | `${Voice}.${NonPresentTense}` | `${Voice}.present.${Mood}`

export type VerbParadigm = VerbTense | 'active.participle' | 'passive.participle' | 'masdar'

export const ALL_TENSES: VerbTense[] = [
  'active.past',
  'active.present.indicative',
  'active.present.subjunctive',
  'active.present.jussive',
  'active.future',
  'active.imperative',
  'passive.past',
  'passive.present.indicative',
  'passive.present.subjunctive',
  'passive.present.jussive',
  'passive.future',
]

const VOICES = new Set<Voice>(['active', 'passive'])
const TENSES = new Set<Tense>(['past', 'present', 'future', 'imperative'])
const MOODS = new Set<Mood>(['indicative', 'subjunctive', 'jussive'])

export function isVoice(value: unknown): value is Voice {
  return VOICES.has(value as Voice)
}

export function isTense(value: unknown): value is Tense {
  return TENSES.has(value as Tense)
}

export function isMood(value: unknown): value is Mood {
  return MOODS.has(value as Mood)
}
