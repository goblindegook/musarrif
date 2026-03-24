import { shuffle } from '@pacote/shuffle'
import { type DimensionProfile, exerciseDiacritics, random } from '../dimensions'

export type DistractorGenerator<T> = () => T

export function randomizeOptions<T>(
  answer: T,
  generators: readonly DistractorGenerator<T>[],
  profile: DimensionProfile,
  size = 4,
): T[] {
  const options = new Set<T>([answer])

  while (options.size < size) {
    const candidate = random(generators)()
    options.add(typeof candidate === 'string' ? (exerciseDiacritics(candidate, profile.diacritics) as T) : candidate)
  }

  return shuffle(Array.from(options))
}
