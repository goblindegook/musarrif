/**
 * Looks up English glosses from Wiktionary and ElixirFM for a root (or one of its forms), and lists
 * every verb id or root missing a translation in the locale files.
 *
 * Usage:
 *   npm run glosses -- --missing        list every untranslated verb id and root
 *   npm run glosses -- <root> [form]    fetch candidate glosses for a root, or one form of it
 *
 * This tool only fetches candidates — it writes nothing. Picking the translation, and writing it
 * into en/it/pt/ar.verbs.json, stays a hand step: see the translate-verb skill.
 */
import { readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { transliterateReverse } from '@pacote/buckwalter'
import { verbs } from '../src/paradigms/verbs.ts'
import { toRoman } from '../src/primitives/numbers.ts'
import { type LexiconEntry, lookupRoot } from './lib/elixirfm.mts'
import { findMissingTranslations, type LocaleVerbFile } from './lib/missing-translations.mts'
import { fetchRootNote } from './lib/wiktionary.mts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const LOCALES_DIR = join(ROOT, 'src/ui/locales')

function readLocale(name: string): LocaleVerbFile {
  return JSON.parse(readFileSync(join(LOCALES_DIR, `${name}.verbs.json`), 'utf8'))
}

function printMissing(): void {
  const locales = { en: readLocale('en'), it: readLocale('it'), pt: readLocale('pt'), ar: readLocale('ar') }
  const { verbs: missingVerbs, roots: missingRoots } = findMissingTranslations(verbs, locales)

  console.log(`Missing verb translations (${missingVerbs.length}):`)
  for (const { id, missingIn } of missingVerbs) console.log(`  ${id.padEnd(18)} missing: ${missingIn.join(', ')}`)

  console.log(`\nMissing root glosses (${missingRoots.length}):`)
  for (const { rootId, missingIn } of missingRoots)
    console.log(`  ${rootId.padEnd(18)} missing: ${missingIn.join(', ')}`)
}

function printLexiconEntries(entries: readonly LexiconEntry[]): void {
  if (entries.length === 0) {
    console.log('  (none)')
    return
  }
  for (const entry of entries) {
    const glosses = entry.glosses.map((gloss) => `"${gloss}"`).join(', ')
    console.log(
      `  ${entry.pos.padEnd(2)} ${entry.formClass.padEnd(5)} ${entry.orth.padEnd(14)} ${entry.phon.padEnd(16)} ${glosses}`,
    )
  }
}

// ElixirFM's `class` column carries a trailing "q" on a quadriliteral form (matching Wiktionary's
// own caption convention, see wiktionary.mts's readCaptionForm) — stripped here so a numeric form
// filter matches both triliteral and quadriliteral entries by their bare roman numeral.
function matchesForm(formClass: string, form: number): boolean {
  return formClass.replace(/q$/, '') === toRoman(form)
}

async function printRoot(rootCode: string, form?: number): Promise<void> {
  const arabicRoot = transliterateReverse(rootCode)
  console.log(`Root ${rootCode} (${arabicRoot})\n`)

  const [note, entries] = await Promise.all([
    fetchRootNote(arabicRoot).catch((error: unknown) => {
      console.warn(`Wiktionary root note unavailable: ${error instanceof Error ? error.message : String(error)}`)
      return { note: undefined, forms: [] }
    }),
    lookupRoot(arabicRoot).catch((error: unknown) => {
      console.warn(`ElixirFM lookup unavailable: ${error instanceof Error ? error.message : String(error)}`)
      return [] as LexiconEntry[]
    }),
  ])

  console.log(`Wiktionary root note (candidate for the root gloss): ${note.note ?? '(none)'}\n`)

  const inlineForms = form == null ? note.forms : note.forms.filter((f) => f.roman === toRoman(form))
  console.log('Wiktionary inline form glosses:')
  if (inlineForms.length === 0) console.log("  (none — check the lemma's own Wiktionary page)")
  for (const f of inlineForms)
    console.log(`  Form ${f.roman}  ${f.arabic}  (${f.translit})${f.gloss ? `  "${f.gloss}"` : ''}`)

  const verbEntries = entries.filter((e) => e.pos === 'V' && (form == null || matchesForm(e.formClass, form)))
  console.log('\nElixirFM verb entries:')
  printLexiconEntries(verbEntries)

  const nominalEntries = entries.filter((e) => e.pos !== 'V' && (form == null || matchesForm(e.formClass, form)))
  console.log('\nElixirFM nominal entries (candidates for the root gloss):')
  printLexiconEntries(nominalEntries)
}

async function run(): Promise<void> {
  const [command, formArg] = process.argv.slice(2)
  if (!command) throw new Error('Usage: npm run glosses -- --missing | npm run glosses -- <root> [form]')
  if (command === '--missing') return printMissing()

  if (formArg == null) return printRoot(command)
  const form = Number(formArg)
  if (!Number.isInteger(form) || form < 1) throw new Error(`Form must be a positive integer, got "${formArg}".`)
  await printRoot(command, form)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
}
