import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildVerbFromId } from '../src/paradigms/verbs'
import { fetchParadigms } from './lib/elixirfm.mts'
import { renderVerbTestFile } from './lib/render-verb-test.mts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUTPUT_DIR = join(ROOT, 'src/paradigms/verbs')

function usage(): never {
  throw new Error('Usage: npm run add:tests:elixirfm <verb-slug> (example: npm run add:tests:elixirfm ktb-1)')
}

async function run() {
  const slug = process.argv[2]?.trim()
  if (!slug) usage()

  const verb = buildVerbFromId(slug)
  const parsed = await fetchParadigms(verb)
  const outputPath = join(OUTPUT_DIR, `${verb.id}.test.ts`)

  mkdirSync(OUTPUT_DIR, { recursive: true })
  writeFileSync(outputPath, renderVerbTestFile(verb.id, parsed, 'elixirfm'))

  console.log(`Wrote ${outputPath}`)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error)
    console.error(message)
    process.exitCode = 1
  })
}
