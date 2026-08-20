/**
 * Compares Muṣarrif conjugations against ElixirFM via web interface.
 *
 * Usage:
 *   npx tsx scripts/elixirfm-compare.mts [--sample N] [--root ROOT]
 *
 * --sample N   Only test N verbs (default: all 936)
 * --root ROOT  Only test verbs with this Buckwalter root (e.g. ktb)
 */

import { conjugate } from '../src/paradigms/conjugation.ts'
import { PRONOUN_IDS, type PronounId } from '../src/paradigms/pronouns.ts'
import { ALL_TENSES, type VerbTense } from '../src/paradigms/tense.ts'
import { type DisplayVerb, getAvailableParadigms, verbs } from '../src/paradigms/verbs.ts'
import { compareForm, inflectVerb, isSameLexeme, resolveVerb, toTag } from './lib/elixirfm.mts'
import type { VerbParadigm } from './lib/paradigms.mts'

const RATE_MS = 500

// ── TAG mappings ──────────────────────────────────────────────────────────────

// ElixirFM has no future tense, and Muṣarrif builds one by prefixing سَ to the present indicative —
// so stripping that prefix would compare the very cells the present indicative already compares.
const FUTURE_TENSES = new Set<VerbTense>(['active.future', 'passive.future'])

// Verb form number → ElixirFM Roman numeral (+ q suffix for quadrilateral)
const FORM_ROMAN: Record<number, string> = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
  7: 'VII',
  8: 'VIII',
  9: 'IX',
  10: 'X',
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}

// ── Tag builder ───────────────────────────────────────────────────────────────

// ElixirFM has no future tense, and every remaining VerbTense is the parser's VerbParadigm spelled
// with dots instead of spaces — so the two vocabularies convert without a table of their own.
function buildTag(tense: VerbTense, pronounId: PronounId): string | undefined {
  if (FUTURE_TENSES.has(tense)) return undefined
  return toTag(tense.replaceAll('.', ' ') as VerbParadigm, pronounId)
}

// ── Main ──────────────────────────────────────────────────────────────────────

interface Mismatch {
  root: string
  form: number
  tense: VerbTense
  pronounId: PronounId
  musarrif: string
  elixir: string
}

const args = process.argv.slice(2)
const sampleIdx = args.indexOf('--sample')
const sampleN = sampleIdx >= 0 ? Number(args[sampleIdx + 1]) : undefined
const rootIdx = args.indexOf('--root')
const rootFilter = rootIdx >= 0 ? args[rootIdx + 1] : undefined

let verbsToTest = rootFilter ? verbs.filter((v) => v.rootId === rootFilter) : verbs
if (sampleN) verbsToTest = verbsToTest.slice(0, sampleN)

const mismatches: Mismatch[] = []
let matched = 0
let notFound = 0
let skipped = 0
let differing = 0
let errors = 0

console.log(`Testing ${verbsToTest.length} verbs against ElixirFM…\n`)

for (const verb of verbsToTest as DisplayVerb[]) {
  const label = `${verb.rootId}-${verb.form}`
  try {
    process.stdout.write(`${label} (${verb.lemma})… `)
    await sleep(RATE_MS)

    const entries = await resolveVerb(verb.lemma)
    const isQuad = verb.root.length === 4
    const formKey = isQuad ? `${FORM_ROMAN[verb.form]}q` : FORM_ROMAN[verb.form]

    if (!entries.has(formKey)) {
      console.log('not in ElixirFM')
      notFound++
      continue
    }

    const entry = entries.get(formKey)
    if (!entry) {
      console.log('not in ElixirFM')
      notFound++
      continue
    }

    const [lexemeId, entryNum, citation] = entry

    // ElixirFM may hold a different vocalisation of the same root and form — its Form I for ك ب ر
    // is كَبَر where Muṣarrif has كَبُرَ. Those are different verbs, so comparing their paradigms
    // would report every cell as a mismatch; name the difference once instead.
    if (!isSameLexeme(citation, verb.lemma)) {
      console.log(`different lexeme in ElixirFM: ${citation}`)
      differing++
      continue
    }

    await sleep(RATE_MS)
    const elixirForms = await inflectVerb(lexemeId, entryNum)

    const availableTenses = new Set(getAvailableParadigms(verb))
    let verbMatched = 0
    let verbMismatch = 0

    for (const tense of ALL_TENSES) {
      if (!availableTenses.has(tense)) continue
      const musarrifForms = conjugate(verb, tense)

      for (const pronounId of PRONOUN_IDS) {
        const musarrifForm = musarrifForms[pronounId]
        if (!musarrifForm) continue
        const tag = buildTag(tense, pronounId)
        if (!tag) continue
        const elixirForm = elixirForms.get(tag)
        if (!elixirForm) {
          skipped++
          continue
        }

        const musarrifStr = musarrifForm.toString()
        const result = compareForm(musarrifStr, elixirForm)

        if (result === 'skip') {
          skipped++
        } else if (result === 'match') {
          verbMatched++
        } else {
          verbMismatch++
          mismatches.push({
            root: verb.rootId,
            form: verb.form,
            tense,
            pronounId,
            musarrif: musarrifStr,
            elixir: elixirForm,
          })
        }
      }
    }

    matched += verbMatched
    console.log(`✓ ${verbMatched} matched, ${verbMismatch} mismatched`)
  } catch (err) {
    console.log(`error: ${err instanceof Error ? err.message : err}`)
    errors++
  }
}

// ── Report ────────────────────────────────────────────────────────────────────

if (mismatches.length > 0) {
  console.log('\n════ MISMATCHES ════\n')
  for (const m of mismatches) {
    console.log(`${m.root} form ${m.form} | ${m.tense} | ${m.pronounId}`)
    console.log(`  Muṣarrif : ${m.musarrif}`)
    console.log(`  ElixirFM : ${m.elixir}`)
  }
}

console.log('\n════ SUMMARY ════')
console.log(`Matched  : ${matched}`)
console.log(`Mismatch : ${mismatches.length}`)
console.log(`Skipped  : ${skipped}`)
console.log(`Not found: ${notFound}`)
console.log(`Differing: ${differing}`)
console.log(`Errors   : ${errors}`)
