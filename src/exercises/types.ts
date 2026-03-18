export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Exercise {
  kind: 'form' | 'root'
  word: string
  promptTranslationKey: string
  options: string[]
  answer: number
}
