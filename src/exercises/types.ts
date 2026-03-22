export interface Exercise {
  kind:
    | 'conjugation'
    | 'masdarForm'
    | 'masdarRoot'
    | 'masdarVerb'
    | 'participleForm'
    | 'participleRoot'
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
}
