import { transliterateReverse } from '@pacote/buckwalter'
import { memoize } from '@pacote/memoize'
import { wordDistance } from '../primitives/strings'
import { ALIF, HAMZA, normalizeForComparison } from './tokens'
import { type DisplayVerb, findVerbsByRoot, findVerbsByRootPrefix, frequencyRank, verbs } from './verbs'

type SearchOptions = {
  language: string
  translate: (key: string) => string | undefined
}

const DEFAULT_SEARCH_OPTIONS: SearchOptions = {
  language: '',
  translate: (key: string) => key,
}

function searchInternal(query: string, options = DEFAULT_SEARCH_OPTIONS): DisplayVerb[] {
  const normalizedQuery = normalizeQuery(query)
  if (!normalizedQuery) return []

  const candidates = [
    ...extractRootCandidates(normalizedQuery),
    ...[query, query.toLowerCase()].map((value) => transliterateReverse(value).replace(/[^ء-ي]/g, '')),
    transliterateReverse(foldRomanisedDigraphs(query)).replace(/[^ء-ي]/g, ''),
  ]

  return Array.from(
    new Set([
      ...candidates.flatMap(matchVerbsForCandidate),
      ...verbs.filter(
        (verb) =>
          verb.id.toLowerCase().startsWith(normalizedQuery) ||
          (options.language && normalizeQuery(options.translate(verb.id) ?? '').includes(normalizedQuery)),
      ),
    ]),
  )
    .map((verb) => ({
      verb,
      // Lemma distance cannot tell an exact root from a root-prefix match: ءمن and منع both sit 3 edits from "امن ب".
      rootMatch: candidates.includes(verb.root) ? 0 : 1,
      distance: wordDistance(normalizedQuery, normalizeQuery(verb.lemma)),
      translation: normalizeQuery(options.translate(verb.id) ?? ''),
    }))
    .toSorted(
      (a, b) =>
        a.rootMatch - b.rootMatch ||
        a.distance - b.distance ||
        frequencyRank(a.verb) - frequencyRank(b.verb) ||
        a.verb.root.localeCompare(b.verb.root) ||
        a.translation.localeCompare(b.translation),
    )
    .map((entry) => entry.verb)
}

export const search = memoize(
  (query: string, options?: SearchOptions) => [normalizeQuery(query), options?.language].join(':'),
  searchInternal,
  { capacity: 10000 },
)

const DIGRAPH_FOLDS: Record<string, string> = {
  kh: 'x',
  dh: '*',
  sh: '$',
  th: 'v',
  gh: 'g',
}

function foldRomanisedDigraphs(value: string): string {
  return value.replace(/kh|dh|sh|th|gh/gi, (match) => DIGRAPH_FOLDS[match.toLowerCase()])
}

function extractRootCandidates(query: string): string[] {
  const candidates = new Set<string>()
  for (const part of query.split(/[^ء-ي]+/)) {
    for (let size = 1; size <= Math.min(part.length, 5); size += 1) {
      for (let start = 0; start + size <= part.length; start += 1) {
        const candidate = part.slice(start, start + size)
        candidates.add(candidate)
        candidates.add(candidate.replaceAll(String(ALIF), String(HAMZA)))
      }
    }
  }
  return Array.from(candidates)
}

function matchVerbsForCandidate(candidate: string): readonly DisplayVerb[] {
  if (!candidate) return []
  const exact = findVerbsByRoot(candidate)
  return exact.length > 0 ? exact : findVerbsByRootPrefix(candidate)
}

const normalizeQuery = (value: string): string =>
  normalizeForComparison(value)
    .replace(/\p{M}|\u0640/gu, '')
    .toLowerCase()
