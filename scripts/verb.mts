import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { fetchers, parseVerbArgs } from './lib/verb-args.mts'
import { buildRootEntry, type RootEntry, upsertRootEntry } from './lib/verb-row.mts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const ROOTS_PATH = join(ROOT, 'src/data/roots.json')

async function run() {
  const { source, verb } = parseVerbArgs(process.argv, 'add:verb')
  const parsed = await fetchers[source](verb)

  const roots = JSON.parse(readFileSync(ROOTS_PATH, 'utf8')) as RootEntry[]
  const existing = roots.find((root) => root.root === verb.rootId && root.form === verb.form)
  const entry = buildRootEntry(verb, parsed, existing)

  writeFileSync(ROOTS_PATH, `${JSON.stringify(upsertRootEntry(roots, entry), null, 2)}\n`)
  execFileSync(join(ROOT, 'node_modules/.bin/biome'), ['format', '--write', ROOTS_PATH], { stdio: 'ignore' })

  if (entry.passiveVoice) console.warn(`${source} reported no full passive, wrote passiveVoice: ${entry.passiveVoice}`)
  console.log(`${existing ? 'Updated' : 'Added'} ${verb.id} in ${ROOTS_PATH}`)
  console.log(JSON.stringify(entry, null, 2))
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
}
