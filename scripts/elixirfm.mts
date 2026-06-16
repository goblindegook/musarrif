import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildVerbFromId, type DisplayVerb } from '../src/paradigms/verbs'
import { fetchElixirFmParadigms } from './lib/elixirfm.mts'
import type { ParsedParadigms } from './lib/parse-wiktionary.mts'
import { renderVerbTestFile } from './lib/render-verb-test.mts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUTPUT_DIR = join(ROOT, 'src/paradigms/verbs')

type LoadParadigms = (verb: DisplayVerb) => Promise<ParsedParadigms>

function usage(): never {
  throw new Error('Usage: npm run add:tests:elixirfm <verb-slug> (example: npm run add:tests:elixirfm ktb-1)')
}

export async function buildGeneratedElixirFmVerbTest(
  slug: string,
  loadParadigms: LoadParadigms = fetchElixirFmParadigms,
): Promise<{ fileText: string; outputPath: string; verb: DisplayVerb }> {
  const verb = buildVerbFromId(slug)
  const parsed = await loadParadigms(verb)
  return {
    fileText: renderVerbTestFile(verb.id, parsed),
    outputPath: join(OUTPUT_DIR, `${verb.id}.test.ts`),
    verb,
  }
}

async function run() {
  const slug = process.argv[2]?.trim()
  if (!slug) usage()

  const generated = await buildGeneratedElixirFmVerbTest(slug)
  mkdirSync(OUTPUT_DIR, { recursive: true })
  writeFileSync(generated.outputPath, generated.fileText)

  console.log(`Wrote ${generated.outputPath}`)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error)
    console.error(message)
    process.exitCode = 1
  })
}
