export interface Exercise {
  kind: 'form' | 'root' | 'tense' | 'conjugation'
  word: string
  promptTranslationKey: string
  promptParams?: Record<string, string>
  options: string[]
  answer: number
}
