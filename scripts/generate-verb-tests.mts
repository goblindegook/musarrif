import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getVerbById, verbs } from '../src/paradigms/verbs'
import { fetchParadigms as fetchElixirfmParadigms } from './lib/elixirfm.mts'
import { generateVerbTests } from './lib/generate-verb-tests.mts'
import type { ParsedParadigms } from './lib/paradigms.mts'
import { renderVerbTestFile } from './lib/render-verb-test.mts'
import { fetchParadigms as fetchReversoParadigms } from './lib/reverso.mts'
import { fetchParadigms as fetchWiktionaryParadigms } from './lib/wiktionary.mts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUTPUT_DIR = join(ROOT, 'src/paradigms/verbs')
const REPORTS_DIR = join(ROOT, 'reports')

function hasParsedContent(parsed: ParsedParadigms): boolean {
  return (
    Object.values(parsed.paradigms).some((values) => Object.keys(values).length > 0) ||
    Boolean(parsed.nominals.activeParticiple) ||
    Boolean(parsed.nominals.passiveParticiple) ||
    Boolean(parsed.nominals.masdar?.length)
  )
}

function writeVerbTest(slug: string, parsed: ParsedParadigms): void {
  mkdirSync(OUTPUT_DIR, { recursive: true })
  writeFileSync(join(OUTPUT_DIR, `${slug}.test.ts`), renderVerbTestFile(slug, parsed))
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

function isWiktionaryNotFound(error: unknown): boolean {
  const message = errorMessage(error)
  return (
    message.includes('Failed to fetch Wiktionary page (404):') ||
    message.includes('Arabic section was not found in the Wiktionary page') ||
    message.includes('No Arabic conjugation table was found on the page') ||
    message.includes('No conjugation table matched lemma')
  )
}

function isReversoNotFound(error: unknown): boolean {
  return errorMessage(error).includes('Failed to fetch Reverso page (404):')
}

function isElixirfmNotFound(error: unknown): boolean {
  return errorMessage(error).includes('ElixirFM entry not found')
}

async function generateFromWiktionary(slug: string): Promise<boolean> {
  const verb = getVerbById(slug)
  if (!verb) return false

  try {
    const parsed = await fetchWiktionaryParadigms(verb.lemma, verb.root, verb.form)
    if (!hasParsedContent(parsed)) return false
    writeVerbTest(slug, parsed)
    return true
  } catch (error: unknown) {
    if (isWiktionaryNotFound(error)) return false
    throw error
  }
}

async function generateFromReverso(slug: string): Promise<boolean> {
  const verb = getVerbById(slug)
  if (!verb) return false

  try {
    const parsed = await fetchReversoParadigms(verb.lemma)
    if (!hasParsedContent(parsed)) return false
    writeVerbTest(slug, parsed)
    return true
  } catch (error: unknown) {
    if (isReversoNotFound(error)) return false
    throw error
  }
}

async function generateFromElixirfm(slug: string): Promise<boolean> {
  const verb = getVerbById(slug)
  if (!verb) return false

  try {
    const parsed = await fetchElixirfmParadigms(verb)
    if (!hasParsedContent(parsed)) return false
    writeVerbTest(slug, parsed)
    return true
  } catch (error: unknown) {
    if (isElixirfmNotFound(error)) return false
    throw error
  }
}

async function run() {
  mkdirSync(REPORTS_DIR, { recursive: true })

  const { reportPath, results } = await generateVerbTests({
    slugs: verbs.map((verb) => verb.id),
    reportDir: REPORTS_DIR,
    hasExistingTest: (slug) => existsSync(join(OUTPUT_DIR, `${slug}.test.ts`)),
    generators: [
      { source: 'wiktionary', generate: generateFromWiktionary },
      { source: 'reverso', generate: generateFromReverso },
      { source: 'elixirfm', generate: generateFromElixirfm },
    ],
    writeReport: (path, content) => {
      writeFileSync(path, content)
    },
  })

  const counts = {
    existing: results.filter(({ source }) => source === 'existing').length,
    wiktionary: results.filter(({ source }) => source === 'wiktionary').length,
    reverso: results.filter(({ source }) => source === 'reverso').length,
    elixirfm: results.filter(({ source }) => source === 'elixirfm').length,
    missing: results.filter(({ source }) => source === 'missing').length,
  }

  console.log(`Wrote ${reportPath}`)
  console.log(
    `existing=${counts.existing} wiktionary=${counts.wiktionary} reverso=${counts.reverso} elixirfm=${counts.elixirfm} missing=${counts.missing}`,
  )
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
}
