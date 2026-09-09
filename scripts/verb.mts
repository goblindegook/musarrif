import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { FORM_I_PATTERNS, type FormIPattern } from '../src/paradigms/form-i-vowels'
import { buildVerbFromId, synthesizeVerb } from '../src/paradigms/verbs'
import { fetchParadigms as elixirfm } from './lib/elixirfm.mts'
import type { GenerationTool } from './lib/paradigms.mts'
import { fetchParadigms as qutrub } from './lib/qutrub.mts'
import { fetchParadigms as reverso } from './lib/reverso.mts'
import { buildRootEntry, type RootEntry, upsertRootEntry } from './lib/verb-row.mts'
import { fetchParadigms as wiktionary } from './lib/wiktionary.mts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOTS_PATH = join(__dirname, '..', 'src/data/roots.json')

const fetchers = { elixirfm, qutrub, reverso, wiktionary } as const

function usage(): never {
  const sources = Object.keys(fetchers).join('|')
  throw new Error(
    `Usage: npm run add:verb <${sources}> <verb-slug> [${FORM_I_PATTERNS.join('|')}] (example: npm run add:verb wiktionary ktb-1 a-u)`,
  )
}

async function run() {
  const source = process.argv[2]?.trim() as GenerationTool | undefined
  const slug = process.argv[3]?.trim()
  const pattern = process.argv[4]?.trim() as FormIPattern | undefined
  if (!source || !slug || !(source in fetchers)) usage()
  if (pattern && !FORM_I_PATTERNS.includes(pattern)) usage()

  const slugVerb = buildVerbFromId(slug)
  const verb = pattern ? synthesizeVerb(String(slugVerb.root), 1, pattern) : slugVerb
  const parsed = await fetchers[source](verb)

  const roots = JSON.parse(readFileSync(ROOTS_PATH, 'utf8')) as RootEntry[]
  const existing = roots.find((root) => root.root === verb.rootId && root.form === verb.form)
  const entry = buildRootEntry(verb, parsed, existing)

  writeFileSync(ROOTS_PATH, `${JSON.stringify(upsertRootEntry(roots, entry), null, 2)}\n`)

  if (entry.passiveVoice) console.warn(`${source} reported no full passive — wrote passiveVoice: ${entry.passiveVoice}`)
  if (entry.noPassiveParticiple) console.warn(`${source} reported no passive participle`)
  console.log(`${existing ? 'Updated' : 'Added'} ${verb.id} in ${ROOTS_PATH}`)
  console.log(JSON.stringify(entry, null, 2))
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
}
