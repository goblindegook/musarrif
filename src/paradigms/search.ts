import { transliterateReverse } from '@pacote/buckwalter'
import { memoize } from '@pacote/memoize'
import { wordDistance } from '../primitives/strings'
import { ALIF, HAMZA, normalizeForComparison } from './tokens'
import { type DisplayVerb, findVerbsByRoot, findVerbsByRootPrefix, verbs } from './verbs'

type SearchOptions = {
  language: string
  translate: (key: string) => string | undefined
}

const DEFAULT_SEARCH_OPTIONS: SearchOptions = {
  language: '',
  translate: (key: string) => key,
}

function searchInternal(query: string, options = DEFAULT_SEARCH_OPTIONS): DisplayVerb[] {
  const matches: DisplayVerb[] = []
  const normalizedQuery = normalizeQuery(query)
  if (!normalizedQuery) return matches

  const candidates = extractRootCandidates(normalizedQuery)
  const distance = new Map<string, number>()

  const addMatches = (verbsForRoot: readonly DisplayVerb[]) => {
    for (const verb of verbsForRoot) {
      if (distance.has(verb.id)) continue
      matches.push(verb)
      distance.set(verb.id, wordDistance(normalizedQuery, normalizeQuery(verb.lemma)))
    }
  }

  const buckwalterCandidate = Array.from(transliterateReverse(query))
    .filter((char) => /[ء-ي]/.test(char))
    .join('')

  addMatches(candidates.flatMap(matchVerbsForCandidate))
  if (buckwalterCandidate) addMatches(matchVerbsForCandidate(buckwalterCandidate))

  if (options.language) {
    addMatches(
      verbs.filter((v) => {
        const translated = options.translate(v.id)
        return normalizeQuery(translated ?? '').includes(normalizedQuery)
      }),
    )
  }

  return matches.sort((v1, v2) => {
    const d1 = distance.get(v1.id) ?? 0
    const d2 = distance.get(v2.id) ?? 0
    if (d1 !== d2) return d1 - d2
    if (v1.root !== v2.root) return v1.root.localeCompare(v2.root)
    const t1 = options.translate(v1.id) ?? ''
    const t2 = options.translate(v2.id) ?? ''
    return normalizeQuery(t1).localeCompare(normalizeQuery(t2))
  })
}

export const search = memoize(
  (query: string, options?: SearchOptions) => [normalizeQuery(query), options?.language].join(':'),
  searchInternal,
  { capacity: 10000 },
)

function addCandidate(acc: Set<string>, value: string): void {
  acc.add(value)
  acc.add(value.replace(new RegExp(ALIF.raw, 'g'), HAMZA.raw))
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

function matchVerbsForCandidate(candidate: string): readonly DisplayVerb[] {
  const matches: DisplayVerb[] = []
  if (!candidate) return matches

  const exact = findVerbsByRoot(candidate)
  if (exact.length > 0) return exact

  return findVerbsByRootPrefix(candidate)
}

const normalizeQuery = (value: string): string =>
  normalizeForComparison(value)
    .replace(/\p{M}|\u0640/gu, '')
    .toLowerCase()
