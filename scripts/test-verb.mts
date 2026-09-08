import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildVerbFromId } from '../src/paradigms/verbs'
import { fetchParadigms as elixirfm } from './lib/elixirfm.mts'
import type { GenerationTool } from './lib/generate-verb-tests.mts'
import { fetchParadigms as qutrub } from './lib/qutrub.mts'
import { renderVerbTestFile } from './lib/render-verb-test.mts'
import { fetchParadigms as reverso } from './lib/reverso.mts'
import { fetchParadigms as wiktionary } from './lib/wiktionary.mts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = join(__dirname, '..', 'src/paradigms/verbs')

const fetchers = { elixirfm, qutrub, reverso, wiktionary } as const

function usage(): never {
  const sources = Object.keys(fetchers).join('|')
  throw new Error(`Usage: npm run add:tests <${sources}> <verb-slug> (example: npm run add:tests elixirfm ktb-1)`)
}

async function run() {
  const source = process.argv[2]?.trim() as GenerationTool | undefined
  const slug = process.argv[3]?.trim()
  if (!source || !slug || !(source in fetchers)) usage()

  const verb = buildVerbFromId(slug)
  const parsed = await fetchers[source](verb)
  const outputPath = join(OUTPUT_DIR, `${verb.id}.test.ts`)

  mkdirSync(OUTPUT_DIR, { recursive: true })
  writeFileSync(outputPath, renderVerbTestFile(verb.id, parsed, source))

  console.log(`Wrote ${outputPath}`)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
}
