export interface Exercise {
  kind: 'verbForm' | 'verbRoot' | 'verbTense' | 'conjugation'
  word: string
  promptTranslationKey: string
  promptParams?: Record<string, string>
  options: string[]
  answer: number
}
