export interface Exercise {
  kind:
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
    | 'verbTense'
  word: string
  promptTranslationKey: string
  promptParams?: Record<string, string>
  options: readonly string[]
  answer: number
  cardKey?: string
}
