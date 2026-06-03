import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { transliterateReverse } from '@pacote/buckwalter'
import { applyDiacriticsPreference } from '../src/paradigms/tokens'
import { synthesizeVerb, type VerbForm } from '../src/paradigms/verbs'
import { clamp, parseInteger } from '../src/primitives/numbers'
import { renderVerbTestFile } from './lib/verb-test-render'
import { parseArabicConjugationTable } from './lib/wiktionary-parse'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUTPUT_DIR = join(ROOT, 'src/paradigms/verbs')

function usage(): never {
  throw new Error('Usage: npm run wiktionary <verb-slug> (example: npm run wiktionary ktb-1)')
}

function resolveSlugForWiktionary(slug: string): string {
  const [rootId, rawForm] = slug.split('-')
  const form = clamp(parseInteger(rawForm, 1), 1, 10) as VerbForm
  const root = transliterateReverse(rootId)
  return synthesizeVerb(root, form).lemma
}

async function fetchWiktionaryPage(title: string): Promise<string> {
  const url = `https://en.wiktionary.org/wiki/${encodeURIComponent(title)}`
  const response = await fetch(url)
  if (response.ok) return response.text()
  throw new Error(`Failed to fetch Wiktionary page (${response.status}): ${url}`)
}

async function run() {
  const slug = process.argv[2]?.trim()
  if (!slug) usage()

  const lemma = resolveSlugForWiktionary(slug)
  const html = await fetchWiktionaryPage(applyDiacriticsPreference(lemma, 'none'))
  const parsed = parseArabicConjugationTable(html, lemma)
  const fileText = renderVerbTestFile(slug, parsed)

  mkdirSync(OUTPUT_DIR, { recursive: true })
  const outputPath = join(OUTPUT_DIR, `${slug}.test.ts`)
  writeFileSync(outputPath, fileText)

  const paradigms = Object.keys(parsed.paradigms).map((name) => name.replaceAll('.', ' '))
  const nominals = [
    parsed.nominals.activeParticiple ? 'active participle' : '',
    parsed.nominals.passiveParticiple ? 'passive participle' : '',
    parsed.nominals.masdar?.length ? 'masdar' : '',
  ].filter(Boolean)

  console.log(`Wrote ${outputPath}`)
  console.log(`Paradigms: ${[...paradigms, ...nominals].join(', ')}`)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error)
    console.error(message)
    process.exitCode = 1
  })
}
