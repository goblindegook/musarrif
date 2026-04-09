export type Voice = 'active' | 'passive'
type NonPresentTense = 'past' | 'future'
export type Tense = NonPresentTense | 'present' | 'imperative'
export type Mood = 'indicative' | 'subjunctive' | 'jussive'

export type VerbTense = 'active.imperative' | `${Voice}.${NonPresentTense}` | `${Voice}.present.${Mood}`
