import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderVerbTestFile } from './lib/render-verb-test.mts'
import { fetchers, parseVerbArgs } from './lib/verb-args.mts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = join(__dirname, '..', 'src/paradigms/verbs')

async function run() {
  const { source, verb } = parseVerbArgs(process.argv, 'add:tests')
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
