import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildVerbFromId } from '../src/paradigms/verbs'
import { renderVerbTestFile } from './lib/render-verb-test.mts'
import { fetchParadigms } from './lib/reverso.mts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUTPUT_DIR = join(ROOT, 'src/paradigms/verbs')

function usage(): never {
  throw new Error('Usage: npm run add:tests:reverso <verb-slug> (example: npm run add:tests:reverso ktb-1)')
}

async function run() {
  const slug = process.argv[2]?.trim()
  if (!slug) usage()

  const verb = buildVerbFromId(slug)
  const parsed = await fetchParadigms(verb.lemma)
  const outputPath = join(OUTPUT_DIR, `${verb.id}.test.ts`)

  mkdirSync(OUTPUT_DIR, { recursive: true })
  writeFileSync(outputPath, renderVerbTestFile(verb.id, parsed, 'reverso'))

  console.log(`Wrote ${outputPath}`)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error)
    console.error(message)
    process.exitCode = 1
  })
}
