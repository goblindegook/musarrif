export type ExerciseKind =
  | 'conjugation'
  | 'masdarForm'
  | 'masdarRoot'
  | 'masdarVerb'
  | 'participleForm'
  | 'participleRoot'
  | 'participleVerb'
  | 'verbParticiple'
  | 'verbForm'
  | 'verbMasdar'
  | 'verbPronoun'
  | 'verbRoot'
  | 'rootFormVerb'
  | 'verbTense'

export interface Exercise {
  kind: ExerciseKind
  word: string
  promptTranslationKey: string
  promptParams?: Record<string, string>
  options: readonly string[]
  answer: number
  cardKey?: string
}
