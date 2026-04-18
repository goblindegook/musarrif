export type Voice = 'active' | 'passive'
type NonPresentTense = 'past' | 'future'
export type Tense = NonPresentTense | 'present' | 'imperative'
export type Mood = 'indicative' | 'subjunctive' | 'jussive'

export type VerbTense = 'active.imperative' | `${Voice}.${NonPresentTense}` | `${Voice}.present.${Mood}`

export type VerbParadigm = VerbTense | 'active.participle' | 'passive.participle' | 'masdar'

export const TENSES: VerbTense[] = [
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
