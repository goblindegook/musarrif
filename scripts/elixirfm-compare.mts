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
import { inflectVerb, resolveVerb } from './lib/elixirfm.mts'

const RATE_MS = 500

// ── TAG mappings ──────────────────────────────────────────────────────────────

// VerbTense → ElixirFM TAG prefix (10-char positional, pos 1-5)
const TENSE_PREFIX: Record<VerbTense, string | null> = {
  'active.past': 'VP-A-',
  'passive.past': 'VP-P-',
  'active.present.indicative': 'VIIA-',
  'active.present.subjunctive': 'VISA-',
  'active.present.jussive': 'VIJA-',
  // ponytail: future = indicative + سَ prefix; compare against same tag
  'active.future': 'VIIA-',
  'active.imperative': 'VCJ---',
  'passive.present.indicative': 'VIIP-',
  'passive.present.subjunctive': 'VISP-',
  'passive.present.jussive': 'VIJP-',
  'passive.future': 'VIIP-',
}

const FUTURE_TENSES = new Set<VerbTense>(['active.future', 'passive.future'])

// PronounId → ElixirFM person+gender+number suffix
const PGN: Record<PronounId, string> = {
  '1s': '1MS',
  '2ms': '2MS',
  '2fs': '2FS',
  '3ms': '3MS',
  '3fs': '3FS',
  '2d': '2MD',
  '3md': '3MD',
  '3fd': '3FD',
  '1p': '1MP',
  '2mp': '2MP',
  '2fp': '2FP',
  '3mp': '3MP',
  '3fp': '3FP',
}

// Imperative: PronounId → gender+number only (no person in imperative tag)
const IMP_GN: Partial<Record<PronounId, string>> = {
  '2ms': 'MS',
  '2fs': 'FS',
  '2d': 'MD',
  '2mp': 'MP',
  '2fp': 'FP',
}

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

// ── Arabic handling ───────────────────────────────────────────────────────────

// Strip leading سَ (SEEN + FATHA) from Muṣarrif future forms before comparing
const SA_PREFIX = 'سَ'
function stripFutureSa(form: string): string {
  return form.startsWith(SA_PREFIX) ? form.slice(2) : form
}

// Normalize before comparison:
// 1. Strip sukun (U+0652) — Muṣarrif marks it, ElixirFM omits it; both are valid Arabic
// 2. NFC-normalize to unify combining character order (shadda+fatha vs fatha+shadda)
const SUKUN = 'ْ'
function normalize(form: string): string {
  return form.replaceAll(SUKUN, '').normalize('NFC')
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}

// ── Tag builder ───────────────────────────────────────────────────────────────

function buildTag(tense: VerbTense, pronounId: PronounId): string | null {
  const prefix = TENSE_PREFIX[tense]
  if (!prefix) return null
  if (tense === 'active.imperative') {
    const gn = IMP_GN[pronounId]
    return gn ? `VCJ---${gn}--` : null
  }
  const pgn = PGN[pronounId]
  return pgn ? `${prefix}${pgn}--` : null
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

    const [lexemeId, entryNum] = entry
    await sleep(RATE_MS)
    const elixirForms = await inflectVerb(lexemeId, entryNum)

    const availableTenses = new Set(getAvailableParadigms(verb))
    let verbMatched = 0
    let verbMismatch = 0

    for (const tense of ALL_TENSES) {
      if (!availableTenses.has(tense)) continue
      const isFuture = FUTURE_TENSES.has(tense)
      const musarrifForms = conjugate(verb, tense)

      for (const pronounId of PRONOUN_IDS) {
        const musarrifForm = musarrifForms[pronounId]
        if (!musarrifForm) continue
        const tag = buildTag(tense, pronounId)
        if (!tag) continue
        const elixirForm = elixirForms.get(tag)
        if (!elixirForm) continue

        const musNorm = normalize(isFuture ? stripFutureSa(musarrifForm) : musarrifForm)
        const eliNorm = normalize(elixirForm)

        if (musNorm === eliNorm) {
          verbMatched++
        } else {
          verbMismatch++
          mismatches.push({
            root: verb.rootId,
            form: verb.form,
            tense,
            pronounId,
            musarrif: musarrifForm,
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
console.log(`Not found: ${notFound}`)
console.log(`Errors   : ${errors}`)
