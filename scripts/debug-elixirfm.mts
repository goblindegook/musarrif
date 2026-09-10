/**
 * Compares Muṣarrif conjugations against ElixirFM via web interface.
 *
 * Usage:
 *   npx tsx scripts/elixirfm-compare.mts [--sample N] [--root ROOT]
 *
 * --sample N   Only test N verbs (default: all)
 * --root ROOT  Only test verbs with this Buckwalter root (e.g. ktb)
 */

import { conjugate } from '../src/paradigms/conjugation.ts'
import { PRONOUN_IDS, type PronounId } from '../src/paradigms/pronouns.ts'
import { ALL_TENSES, type VerbTense } from '../src/paradigms/tense.ts'
import { type DisplayVerb, getAvailableParadigms, verbs } from '../src/paradigms/verbs.ts'
import { compareForm, inflectVerb, isSameLexeme, resolveVerb, toTag } from './lib/elixirfm.mts'
import type { VerbParadigm } from './lib/paradigms.mts'

// ElixirFM has no future tense, and every remaining VerbTense is the parser's VerbParadigm spelled
// with dots instead of spaces — so the two vocabularies convert without a table of their own.
function buildTag(tense: VerbTense, pronounId: PronounId): string | undefined {
  if (['active.future', 'passive.future'].includes(tense)) return undefined
  return toTag(tense.replaceAll('.', ' ') as VerbParadigm, pronounId)
}

interface Mismatch {
  root: string
  form: number
  tense: VerbTense
  pronounId: PronounId
  musarrif: string
  elixir: string
}

const args = process.argv.slice(2)

function flagValue(name: string): string | undefined {
  const index = args.indexOf(name)
  if (index < 0) return undefined
  const value = args[index + 1]
  if (!value || value.startsWith('--')) throw new Error(`${name} requires a value`)
  return value
}

const sampleValue = flagValue('--sample')
const sampleN = sampleValue === undefined ? undefined : Number(sampleValue)
if (sampleN !== undefined && (!Number.isInteger(sampleN) || sampleN < 1))
  throw new Error(`--sample requires a positive integer, received "${sampleValue}"`)
const rootFilter = flagValue('--root')

let verbsToTest = rootFilter ? verbs.filter((v) => v.rootId === rootFilter) : verbs
if (sampleN) verbsToTest = verbsToTest.slice(0, sampleN)

const mismatches: Mismatch[] = []
let matched = 0
let notFound = 0
let skipped = 0
let differing = 0
let verbsDiffering = 0
let errors = 0

console.log(`Testing ${verbsToTest.length} verbs against ElixirFM…\n`)

for (const verb of verbsToTest as DisplayVerb[]) {
  const label = `${verb.rootId}-${verb.form}`
  try {
    process.stdout.write(`${label.padEnd(10)} ${verb.lemma.padEnd(14)} `)
    const entry = await resolveVerb(verb, 500)
    if (!entry) {
      console.log('absent')
      notFound++
      continue
    }

    const [lexemeId, entryNum, citation] = entry

    // ElixirFM may hold a different vocalisation of the same root and form — its Form I for ك ب ر
    // is كَبَر where Muṣarrif has كَبُرَ. Those are different verbs, so comparing their paradigms
    // would report every cell as a mismatch; name the difference once instead.
    if (!isSameLexeme(citation, verb.lemma)) {
      console.log(`other-lexeme ${citation}`)
      differing++
      continue
    }

    const elixirForms = await inflectVerb(lexemeId, entryNum, 500)

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
        const elixir = elixirForms.get(tag)
        if (!elixir) {
          skipped++
          continue
        }

        const musarrif = musarrifForm.toString()
        const result = compareForm(musarrif, elixir)

        if (result === 'skip') {
          skipped++
        } else if (result === 'match') {
          verbMatched++
        } else {
          verbMismatch++
          mismatches.push({ root: verb.rootId, form: verb.form, tense, pronounId, musarrif, elixir })
        }
      }
    }

    matched += verbMatched
    if (verbMismatch > 0) verbsDiffering++
    console.log(verbMismatch === 0 ? `ok ${verbMatched}` : `differs ${verbMismatch}/${verbMatched + verbMismatch}`)
  } catch (err) {
    console.log(`error: ${err instanceof Error ? err.message : err}`)
    errors++
  }
}

if (mismatches.length > 0) {
  console.log('\nMISMATCHES  verb / paradigm / pronoun / musarrif != elixirfm\n')
  for (const m of mismatches) {
    const id = `${m.root}-${m.form}`
    console.log(`${id.padEnd(10)} ${m.tense.padEnd(28)} ${m.pronounId.padEnd(4)} ${m.musarrif} != ${m.elixir}`)
  }
}

const compared = verbsToTest.length - notFound - differing - errors
const cells = matched + mismatches.length
const agreement = cells === 0 ? 100 : (matched / cells) * 100

const row = (label: string, value: string | number) => console.log(`${label.padEnd(15)}${value}`)

console.log('\nSUMMARY')
row('verbs', verbsToTest.length)
row('  compared', `${compared} (clean ${compared - verbsDiffering}, differing ${verbsDiffering})`)
row('  absent', notFound)
row('  other-lexeme', differing)
row('  errors', errors)
row('cells', `${cells} (matched ${matched}, differing ${mismatches.length}, skipped ${skipped})`)
row('agreement', `${agreement.toFixed(1)}%`)
