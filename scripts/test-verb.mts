import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildVerbFromId, isTriliteralFormIDisplayVerb } from '../src/paradigms/verbs'
import { fetchParadigms as fetchElixirfm } from './lib/elixirfm.mts'
import type { GenerationTool } from './lib/generate-verb-tests.mts'
import type { ParsedParadigms } from './lib/paradigms.mts'
import { fetchParadigms as fetchQutrub, presentVowelOf } from './lib/qutrub.mts'
import { renderVerbTestFile } from './lib/render-verb-test.mts'
import { fetchParadigms as fetchReverso } from './lib/reverso.mts'
import { fetchParadigms as fetchWiktionary } from './lib/wiktionary.mts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = join(__dirname, '..', 'src/paradigms/verbs')

type Verb = ReturnType<typeof buildVerbFromId>

const fetchers: Record<GenerationTool, (verb: Verb) => Promise<ParsedParadigms>> = {
  elixirfm: (verb) => fetchElixirfm(verb),
  reverso: (verb) => fetchReverso(verb.lemma),
  wiktionary: (verb) => fetchWiktionary(verb.lemma, verb.root, verb.form),
  qutrub: (verb) => fetchQutrub(verb.lemma, presentVowelOf(isTriliteralFormIDisplayVerb(verb) ? verb.vowels : '')),
}

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
