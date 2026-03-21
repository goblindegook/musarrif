export interface Exercise {
  kind:
    | 'conjugation'
    | 'masdarForm'
    | 'masdarRoot'
    | 'masdarVerb'
    | 'verbForm'
    | 'verbPronoun'
    | 'verbRoot'
    | 'verbTense'
  word: string
  promptTranslationKey: string
  promptParams?: Record<string, string>
  options: readonly string[]
  answer: number
}
