/**
 * Maps the verb lemma counts written by scripts/frequency.py to verb ids, most frequent first, and
 * writes them to src/data/verb-frequency.json, which the home verb list's "Most common" sort reads.
 *
 * Usage:
 *   uv run scripts/frequency.py <path-to-MSA_freq_lists.tsv>
 *   npm run frequency
 *
 * Verbs no lemma matches are left out and sort after the ranked ones.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { verbs } from '../src/paradigms/verbs.ts'
import { rankVerbsByLemma } from './lib/frequency.mts'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const LEMMAS = join(ROOT, '.caches/frequency/verb-lemmas.tsv')
const OUTPUT = join(ROOT, 'src/data/verb-frequency.json')

const lemmaCounts = readFileSync(LEMMAS, 'utf8')
  .trim()
  .split('\n')
  .map((line) => line.split('\t'))
  .map(([lemma, count]) => [lemma, Number(count)] as const)

const ranking = rankVerbsByLemma(lemmaCounts, verbs)
writeFileSync(OUTPUT, `${JSON.stringify(ranking, null, 2)}\n`)
console.log(`Ranked ${ranking.length} of ${verbs.length} verbs; the rest are unranked.`)
