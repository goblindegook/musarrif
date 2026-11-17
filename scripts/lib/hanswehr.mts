import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve as resolvePath } from 'node:path'
import { gunzipSync } from 'node:zlib'

const BASE_URL = 'https://hanswehr.app/dict/'
const CACHE_DIR = '.caches/hanswehr'

export interface LexiconEntry {
  roman: string
  lemma: string
  translit: string
  gloss: string
}

interface RawEntry {
  searchableRoots?: string[]
  forms?: Array<{
    text: string
    form: string
    transliteration: string
    translation: { text: string }
  }>
}

async function fetchOk(url: string): Promise<Response> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Hans Wehr HTTP ${response.status}: ${url}`)
  return response
}

// The site ships its whole dictionary as one content-hashed file, so the cache never goes stale:
// a new release has a new name.
async function loadDataset(): Promise<RawEntry[]> {
  const manifest = (await (await fetchOk(`${BASE_URL}manifest.json`)).json()) as { url_gz: string }
  const cachePath = resolvePath(process.cwd(), CACHE_DIR, manifest.url_gz)
  if (!existsSync(cachePath)) {
    const body = Buffer.from(await (await fetchOk(`${BASE_URL}${manifest.url_gz}`)).arrayBuffer())
    mkdirSync(resolvePath(process.cwd(), CACHE_DIR), { recursive: true })
    writeFileSync(cachePath, body)
  }
  return JSON.parse(gunzipSync(readFileSync(cachePath)).toString('utf8')) as RawEntry[]
}

// Hans Wehr files a hamzated root under its alif, so أدم is searchable as ادم.
function foldHamza(root: string): string {
  return root.replaceAll(/[أإآ]/gu, 'ا')
}

function plainText(html: string): string {
  return html
    .replaceAll(/<[^>]*>/g, '')
    .replaceAll('‎', '')
    .replaceAll(/\s+/g, ' ')
    .trim()
}

export async function lookupRoot(arabicRoot: string): Promise<LexiconEntry[]> {
  const wanted = foldHamza(arabicRoot)
  return (await loadDataset())
    .filter((entry) => entry.searchableRoots?.includes(wanted))
    .flatMap((entry) => entry.forms ?? [])
    .map((form) => ({
      roman: form.form,
      lemma: form.text.normalize('NFC'),
      translit: form.transliteration,
      gloss: plainText(form.translation.text),
    }))
}
