export interface Exercise {
  kind: 'form' | 'root' | 'tense'
  word: string
  promptTranslationKey: string
  options: string[]
  answer: number
}
