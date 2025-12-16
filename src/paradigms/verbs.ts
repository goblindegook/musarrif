import rawVerbs from '../data/verbs.json'
import { wordDistance } from '../primitives/strings'
import { conjugatePast } from './active/past'
import type { FormIPattern } from './form-i-vowels'
import { ALIF, stripDiacritics } from './letters'

type VerbForm = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
type MasdarPattern =
  | 'fa3l'
  | 'fa3al'
  | 'fu3l'
  | 'fu3ool'
  | 'fu3aal'
  | 'fi3aal'
  | 'fi3aala'
  | 'fa3aala'
  | 'fi3la'
  | 'fi3l'
export type Tense = 'past' | 'present' | 'future' | 'imperative'

type RawFormI = {
  root: string
  form: 1
  formPattern: FormIPattern
  masdarPattern?: MasdarPattern
  noPassiveParticiple?: boolean
}

type RawNonFormI = {
  root: string
  form: Exclude<VerbForm, 1>
  masdarPattern?: MasdarPattern
  noPassiveParticiple?: boolean
}

type RawVerb = RawFormI | RawNonFormI

export type Verb = (RawFormI | RawNonFormI) & {
  id: string
  label: string
}

const TRANSLITERATION_MAP: Record<string, string> = {
  آ: 'AA',
  أ: 'A1',
  إ: 'A2',
  ا: 'A',
  ب: 'b',
  ت: 't',
  ث: '0t',
  ج: 'j',
  ح: '0H',
  خ: 'x',
  د: 'd',
  ذ: '0z',
  ر: 'r',
  ز: 'z',
  س: 's',
  ش: '0x',
  ص: '0S',
  ض: '0D',
  ط: '0T',
  ظ: '0Z',
  ع: '3',
  غ: 'gh',
  ف: 'f',
  ق: 'q',
  ك: 'k',
  ل: 'l',
  م: 'm',
  ن: 'n',
  ه: 'h',
  و: 'w',
  ي: 'y',
  ة: 'h',
  ى: 'a',
  ء: 'A3',
}

const normalizeHamza = (value: string): string => value.replace(/[آأإ]/g, ALIF)

function verbId({ root, form }: RawVerb): string {
  return (
    Array.from(stripDiacritics(root))
      .map((char) => TRANSLITERATION_MAP[char] ?? char)
      .join('') +
    '-' +
    String(form)
  )
}

export const verbs: Verb[] = (rawVerbs as RawVerb[]).map((verb) => {
  const id = verbId(verb)
  const past = conjugatePast({ ...verb, label: '', id })
  return { ...verb, label: past['3ms'], id }
})

const verbsById = new Map<string, Verb>()

for (const verb of verbs) {
  verbsById.set(verbId(verb), verb)
}

const verbsByRoot = new Map<string, Verb[]>()

for (const verb of verbs) {
  const existing = verbsByRoot.get(verb.root)
  if (existing) {
    existing.push(verb)
  } else {
    verbsByRoot.set(verb.root, [verb])
  }

  const normalizedRoot = normalizeHamza(verb.root)
  if (normalizedRoot !== verb.root) {
    const normalizedExisting = verbsByRoot.get(normalizedRoot)
    if (normalizedExisting) {
      normalizedExisting.push(verb)
    } else {
      verbsByRoot.set(normalizedRoot, [verb])
    }
  }
}

function extractRootCandidates(query: string): string[] {
  return Array.from(
    query.split(/[^ء-ي]+/).reduce((acc, part) => {
      if (!part) return acc
      const letters = Array.from(part).filter((char) => /[ء-ي]/.test(char))
      if (letters.length < 1) return acc
      if (letters.length <= 5) acc.add(letters.join(''))

      const maxWindow = Math.min(letters.length, 5)
      for (let size = 1; size <= maxWindow; size += 1) {
        for (let start = 0; start <= letters.length - size; start += 1) {
          acc.add(letters.slice(start, start + size).join(''))
        }
      }
      return acc
    }, new Set<string>()),
  )
}

function matchVerbsForCandidate(candidate: string): Verb[] {
  const matches: Verb[] = []
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
    .replace(/\p{M}/gu, '')
    .replace(/\u0640/g, '')
    .toLowerCase()
    .trim()

export function search(query: string, options: SearchOptions = {}): Verb[] {
  const t = options.translate ?? ((key) => key)
  const matches: Verb[] = []
  const normalizedQuery = normalizeQuery(query)
  if (!normalizedQuery) return matches

  const candidates = extractRootCandidates(normalizedQuery)
  const distance = new Map<string, number>()

  const addMatches = (verbsForRoot: Verb[]) => {
    for (const verb of verbsForRoot) {
      if (distance.has(verb.id)) continue
      matches.push(verb)
      distance.set(verb.id, wordDistance(normalizedQuery, normalizeQuery(verb.label)))
    }
  }

  if (options.exactRoot) {
    addMatches(verbsByRoot.get(normalizedQuery) ?? [])
  } else {
    addMatches(candidates.flatMap(matchVerbsForCandidate))
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

export function getVerbById(id?: string): Verb | undefined {
  return id ? verbsById.get(id) : undefined
}
