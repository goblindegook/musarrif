import { transliterateReverse } from '@pacote/buckwalter'
import { wordDistance } from '../primitives/strings'
import { ALIF, HAMZA, stripDiacritics } from './letters'
import { type DisplayVerb, normalizeHamza, verbs, verbsByRoot } from './verbs'

const ARABIC_COLLATOR = new Intl.Collator('ar')
const CLOSEST_VERB_CACHE = new Map<string, DisplayVerb[]>()

export function getRandomVerbs(count: number): DisplayVerb[] {
  if (verbs.length <= count) return verbs.slice()

  const result = new Array(count + 1)
  for (let i = count; i < verbs.length; i += 1) {
    const j = Math.floor(Math.random() * (i + 1))
    if (j < count) {
      result[j] = verbs[i]
    }
  }
  return result
}

export function getClosestVerbs(targetRoot: string, count: number): DisplayVerb[] {
  const cacheKey = [targetRoot, count, verbs.length].join(':')
  const cached = CLOSEST_VERB_CACHE.get(cacheKey)
  if (cached) return cached

  const closest = verbs
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

function addCandidate(acc: Set<string>, value: string): void {
  acc.add(value)
  acc.add(value.replace(new RegExp(ALIF, 'g'), HAMZA))
}

function extractRootCandidates(query: string): string[] {
  return Array.from(
    query.split(/[^ء-ي]+/).reduce((acc, part) => {
      if (!part) return acc
      const letters = Array.from(part).filter((char) => /[ء-ي]/.test(char))
      if (letters.length < 1) return acc
      if (letters.length <= 5) addCandidate(acc, letters.join(''))

      const maxWindow = Math.min(letters.length, 5)
      for (let size = 1; size <= maxWindow; size += 1) {
        for (let start = 0; start <= letters.length - size; start += 1) {
          addCandidate(acc, letters.slice(start, start + size).join(''))
        }
      }
      return acc
    }, new Set<string>()),
  )
}

function matchVerbsForCandidate(candidate: string): DisplayVerb[] {
  const matches: DisplayVerb[] = []
  if (!candidate) return matches

  const exact = verbsByRoot.get(candidate) ?? []
  if (exact.length > 0) return exact

  for (const [root, rootVerbs] of verbsByRoot.entries()) {
    if (root.startsWith(candidate)) matches.push(...rootVerbs)
  }
  return matches
}

type SearchOptions = {
  exactRoot?: boolean
  translate?: (key: string, params?: Record<string, string>) => string
}

const normalizeQuery = (value: string): string =>
  normalizeHamza(stripDiacritics(value))
    .normalize('NFD')
    .replace(/\p{M}|\u0640/gu, '')
    .toLowerCase()
    .trim()

export function search(query: string, options: SearchOptions = {}): DisplayVerb[] {
  const t = options.translate ?? ((key) => key)
  const matches: DisplayVerb[] = []
  const normalizedQuery = normalizeQuery(query)
  if (!normalizedQuery) return matches

  const candidates = extractRootCandidates(normalizedQuery)
  const distance = new Map<string, number>()

  const addMatches = (verbsForRoot: DisplayVerb[]) => {
    for (const verb of verbsForRoot) {
      if (distance.has(verb.id)) continue
      matches.push(verb)
      distance.set(verb.id, wordDistance(normalizedQuery, normalizeQuery(verb.label)))
    }
  }

  const buckwalterCandidate = Array.from(transliterateReverse(query))
    .filter((char) => /[ء-ي]/.test(char))
    .join('')

  if (options.exactRoot) {
    addMatches(verbsByRoot.get(normalizedQuery) ?? [])
    if (buckwalterCandidate) addMatches(verbsByRoot.get(buckwalterCandidate) ?? [])
  } else {
    addMatches(candidates.flatMap(matchVerbsForCandidate))
    if (buckwalterCandidate) addMatches(matchVerbsForCandidate(buckwalterCandidate))
    addMatches(
      verbs.filter((v) => {
        const translated = t(v.id)
        return translated != null && normalizeQuery(translated).includes(normalizedQuery)
      }),
    )
  }

  return matches.sort((v1, v2) => {
    const d1 = distance.get(v1.id) ?? 0
    const d2 = distance.get(v2.id) ?? 0
    if (d1 !== d2) return d1 - d2
    if (v1.root !== v2.root) return v1.root.localeCompare(v2.root)
    const t1 = t(v1.id) ?? v1.id
    const t2 = t(v2.id) ?? v2.id
    return normalizeQuery(t1).localeCompare(normalizeQuery(t2))
  })
}
