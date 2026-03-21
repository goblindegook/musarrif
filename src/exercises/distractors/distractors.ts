import { shuffle } from '@pacote/shuffle'
import { type Difficulty, diacriticsDifficulty, random } from '../difficulty'

export type DistractorGenerator = () => string

export function randomizeOptions(
  answer: string,
  generators: readonly DistractorGenerator[],
  difficulty: Difficulty,
  size = 4,
): string[] {
  const options = new Set<string>([answer])
  while (options.size < size) options.add(diacriticsDifficulty(random(generators)(), difficulty))
  return shuffle(Array.from(options))
}
