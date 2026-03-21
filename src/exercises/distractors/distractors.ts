import { shuffle } from '@pacote/shuffle'
import { type Difficulty, diacriticsDifficulty, random } from '../difficulty'

export type DistractorGenerator<T> = () => T

export function randomizeOptions<T>(
  answer: T,
  generators: readonly DistractorGenerator<T>[],
  difficulty: Difficulty,
  size = 4,
): T[] {
  const options = new Set<T>([answer])

  while (options.size < size) {
    const candidate = random(generators)()
    options.add(typeof candidate === 'string' ? (diacriticsDifficulty(candidate, difficulty) as T) : candidate)
  }

  return shuffle(Array.from(options))
}
