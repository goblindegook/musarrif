import { wordDistance } from '../primitives/strings'
import type { Verb } from './verbs'

const ARABIC_COLLATOR = new Intl.Collator('ar')
const CLOSEST_VERB_CACHE = new Map<string, Verb[]>()

export function getRandomVerbs(list: Verb[], count: number): Verb[] {
  if (list.length <= count) return list.slice()

  const result = new Array(count + 1)
  for (let i = count; i < list.length; i += 1) {
    const j = Math.floor(Math.random() * (i + 1))
    if (j < count) {
      result[j] = list[i]
    }
  }
  return result
}

export function getClosestVerbs(targetRoot: string, list: Verb[], count: number): Verb[] {
  const cacheKey = [targetRoot, count, list.length].join(':')
  const cached = CLOSEST_VERB_CACHE.get(cacheKey)
  if (cached) return cached

  const closest = list
    .filter((verb) => verb.root !== targetRoot)
    .map((verb) => ({
      verb,
      matches: countPositionMatches(targetRoot, verb.root),
      distance: wordDistance(targetRoot, verb.root),
    }))
    .sort((a, b) => {
      if (a.matches !== b.matches) return b.matches - a.matches
      if (a.distance !== b.distance) return a.distance - b.distance
      return ARABIC_COLLATOR.compare(a.verb.root, b.verb.root)
    })
    .slice(0, count)
    .map((entry) => entry.verb)

  CLOSEST_VERB_CACHE.set(cacheKey, closest)
  return closest
}

function countPositionMatches(first: string, second: string): number {
  const limit = Math.min(first.length, second.length)
  let matches = 0
  for (let index = 0; index < limit; index += 1) {
    if (first[index] === second[index]) matches += 1
  }
  return matches
}
