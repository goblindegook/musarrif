export interface Exercise {
  kind: 'verbForm' | 'masdarForm' | 'verbRoot' | 'masdarRoot' | 'verbTense' | 'conjugation'
  word: string
  promptTranslationKey: string
  promptParams?: Record<string, string>
  options: string[]
  answer: number
}
