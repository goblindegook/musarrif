import type { DisplayVerb } from '../../src/paradigms/verbs.ts'

// The CAMeL MSA analyser mislemmatises رَأَى: its past forms (رأى, رأت, رأيت) get the lemma راوَنْد,
// and its present forms (يرى, ترى) are read as the rare وَرَى, "to conceal".
const LEMMA_FIXES: Record<string, string> = {
  راوَنْد: 'رَأَى',
  وَرَى: 'رَأَى',
}

// Analyser lemmas drop the final vowel and the fatḥa before a long alif, and write waṣla as ٱ.
function vocalised(lemma: string): string {
  return lemma
    .normalize('NFC')
    .replace(/ٱ/g, 'ا')
    .replace(/\u064e(?=ا)/g, '')
    .replace(/[\u064b-\u0652]+$/, '')
}

function skeleton(lemma: string): string {
  return lemma
    .normalize('NFC')
    .replace(/[\u064b-\u065f\u0670]/g, '')
    .replace(/ٱ/g, 'ا')
}

export function rankVerbsByLemma(
  lemmaCounts: Iterable<readonly [string, number]>,
  verbs: readonly DisplayVerb[],
): string[] {
  const byVocalised = Map.groupBy(verbs, (verb) => vocalised(verb.lemma))
  const bySkeleton = Map.groupBy(verbs, (verb) => skeleton(verb.lemma))
  const totals = new Map<string, number>()

  for (const [analysed, count] of lemmaCounts) {
    const lemma = LEMMA_FIXES[analysed] ?? analysed
    const candidates = byVocalised.get(vocalised(lemma)) ?? bySkeleton.get(skeleton(lemma)) ?? []
    for (const verb of candidates) totals.set(verb.id, (totals.get(verb.id) ?? 0) + count / candidates.length)
  }

  return [...totals].toSorted(([a, totalA], [b, totalB]) => totalB - totalA || a.localeCompare(b)).map(([id]) => id)
}
