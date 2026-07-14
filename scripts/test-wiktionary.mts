import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { transliterateReverse } from '@pacote/buckwalter'
import { formsForRoot, getVerbById, synthesizeVerb, type VerbForm } from '../src/paradigms/verbs'
import { clamp, parseInteger } from '../src/primitives/numbers'
import { renderVerbTestFile } from './lib/render-verb-test.mts'
import { fetchParadigms } from './lib/wiktionary.mts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUTPUT_DIR = join(ROOT, 'src/paradigms/verbs')

function usage(): never {
  throw new Error('Usage: npm run wiktionary <verb-slug> (example: npm run wiktionary ktb-1)')
}

function resolveSlugForWiktionary(slug: string): { lemma: string; root: string | undefined; form: VerbForm } {
  const existing = getVerbById(slug)
  if (existing) {
    return { lemma: existing.lemma, root: existing.root, form: existing.form }
  }
  const [rootId, rawForm] = slug.split('-')
  const root = transliterateReverse(rootId)
  const form = clamp(parseInteger(rawForm, 1), 1, formsForRoot(root).at(-1) ?? 1) as VerbForm
  return { lemma: synthesizeVerb(root, form).lemma, root, form }
}

async function run() {
  const slug = process.argv[2]?.trim()
  if (!slug) usage()

  const { lemma, root, form } = resolveSlugForWiktionary(slug)
  const parsed = await fetchParadigms(lemma, root, form)
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
