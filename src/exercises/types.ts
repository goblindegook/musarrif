export interface Exercise {
  kind: 'verbForm' | 'masdarForm' | 'masdarVerb' | 'verbRoot' | 'masdarRoot' | 'verbTense' | 'conjugation'
  word: string
  promptTranslationKey: string
  promptParams?: Record<string, string>
  options: readonly string[]
  answer: number
}
