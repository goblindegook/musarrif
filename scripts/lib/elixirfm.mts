import { applyDiacriticsPreference, DAMMA, FATHA, KASRA, SHADDA, SUKOON } from '../../src/paradigms/tokens'
import { type DisplayVerb, formatFormLabel } from '../../src/paradigms/verbs'
import type { NominalSet, ParsedParadigms, PronounId, VerbParadigm } from './paradigms.mts'

// ElixirFM tags every form positionally: V, aspect, mood, voice, then person, gender and number at
// indices 5–7 — VP-A-3MS--, VIJA-3FP--, VCJ---MS--. Reading those positions replaces the prefix and
// suffix tables this file used to keep, and gives one flat key space shared with the inflection rows.
// Aspect and mood together — the perfective leaves the mood position empty.
const TAG_ASPECT_MOOD: Record<VerbParadigm, string> = {
  'active past': 'P-',
  'active present indicative': 'II',
  'active present subjunctive': 'IS',
  'active present jussive': 'IJ',
  'active imperative': 'CJ',
  'passive past': 'P-',
  'passive present indicative': 'II',
  'passive present subjunctive': 'IS',
  'passive present jussive': 'IJ',
}

// Positions 2–4 of the tag: aspect, mood, voice. The imperative is always active, so it leaves the
// voice position empty rather than carrying an A.
function aspectMoodVoice(paradigm: VerbParadigm): string {
  if (paradigm === 'active imperative') return `${TAG_ASPECT_MOOD[paradigm]}-`
  return `${TAG_ASPECT_MOOD[paradigm]}${paradigm.startsWith('active') ? 'A' : 'P'}`
}

const PARADIGM_BY_ASPECT_MOOD_VOICE = new Map<string, VerbParadigm>(
  (Object.keys(TAG_ASPECT_MOOD) as VerbParadigm[]).map((paradigm) => [aspectMoodVoice(paradigm), paradigm]),
)

// The imperative carries no person, and ElixirFM inflects a first-person gender and a second-person
// feminine dual that Muṣarrif has no pronoun for — those tags simply have no reading here.
const PGN_BY_PRONOUN: Record<PronounId, string> = {
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

const PRONOUN_BY_PGN = new Map<string, PronounId>(
  Object.entries(PGN_BY_PRONOUN).map(([pronounId, pgn]) => [pgn, pronounId as PronounId]),
)

export function toTag(paradigm: VerbParadigm, pronounId: PronounId): string | undefined {
  const pgn = PGN_BY_PRONOUN[pronounId]
  if (paradigm === 'active imperative') {
    return pgn.startsWith('2') ? `V${aspectMoodVoice(paradigm)}--${pgn.slice(1)}--` : undefined
  }
  return `V${aspectMoodVoice(paradigm)}-${pgn}--`
}

export function fromTag(tag: string): { paradigm: VerbParadigm; pronounId: PronounId } | undefined {
  const paradigm = tag.startsWith('V') ? PARADIGM_BY_ASPECT_MOOD_VOICE.get(tag.slice(1, 4)) : undefined
  if (!paradigm) return undefined
  const pronounId = PRONOUN_BY_PGN.get(paradigm === 'active imperative' ? `2${tag.slice(6, 8)}` : tag.slice(5, 8))
  return pronounId && { paradigm, pronounId }
}

function getCell(block: string, klass: string): string | undefined {
  const match = new RegExp(`<td class="${klass}"[^>]*>([^<]+)</td>`).exec(block)
  return match?.[1]?.trim()
}

function addConjugation(
  paradigms: ParsedParadigms['paradigms'],
  paradigm: VerbParadigm,
  pronounId: PronounId,
  value: string,
): void {
  const bucket = paradigms[paradigm] ?? {}
  if (!(pronounId in bucket)) bucket[pronounId] = [value]
  paradigms[paradigm] = bucket
}

function parseInflectionRows(html: string): Map<string, string> {
  const forms = new Map<string, string>()
  for (const rowMatch of html.matchAll(/<tr>(.*?)<\/tr>/gs)) {
    const row = rowMatch[1]
    const tag = getCell(row, 'xtag')
    const orth = getCell(row, 'orth')
    if (!tag || !orth || tag.length <= 2) continue
    forms.set(tag, orth)
  }

  return forms
}

function parseNominals(html: string): NominalSet {
  const nominals: NominalSet = {}
  const masdar: string[] = []
  const seenMasdars = new Set<string>()
  for (const rowMatch of html.matchAll(/<tr>(.*?)<\/tr>/gs)) {
    const row = rowMatch[1]
    const tag = getCell(row, 'xtag')
    const orth = getCell(row, 'orth')
    if (!tag || !orth) continue

    if (tag === 'N---------' && !seenMasdars.has(orth)) {
      seenMasdars.add(orth)
      masdar.push(orth)
      continue
    }
    if (tag === 'A--A------' && !nominals.activeParticiple) {
      nominals.activeParticiple = orth
      continue
    }
    if (tag === 'A--P------' && !nominals.passiveParticiple) {
      nominals.passiveParticiple = orth
    }
  }

  if (masdar.length > 0) nominals.masdar = masdar
  return nominals
}

async function postElixir(params: Record<string, string>): Promise<string> {
  const response = await fetch('https://quest.ms.mff.cuni.cz/cgi-bin/elixir/index.fcgi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(params).toString(),
  })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return response.text()
}

// [lexemeId, entryNum, citation form]
export type ResolvedLexeme = [string, string, string]

function parseResolvedVerbHtml(html: string): Map<string, ResolvedLexeme> {
  const entries = new Map<string, ResolvedLexeme>()
  for (const lexemeMatch of html.matchAll(/<table[^>]*class="lexeme"[^>]*>(.*?)<\/table>/gs)) {
    const block = lexemeMatch[1]
    const pos = getCell(block, 'xtag')
    const formKey = getCell(block, 'class')
    const citation = getCell(block, 'orth')
    const clipMatch = /clip=\((\d+),(\d+)\)/.exec(block)
    if (pos !== 'V' || !formKey || !citation || !clipMatch || entries.has(formKey)) continue
    entries.set(formKey, [clipMatch[1], clipMatch[2], citation])
  }

  return entries
}

// ElixirFM writes shadda and short vowels but never sukūn, and its combining-mark order differs
// from Muṣarrif's, so both sides are normalised before they are compared as Arabic.
export function normalizeArabic(form: string): string {
  return form.replaceAll(String(SUKOON), '').normalize('NFC')
}

// A pronoun is only comparable when both sides actually inflect it. Muṣarrif returns an empty
// string for pronouns a paradigm does not fill — an impersonal passive inflects 3ms alone — and
// those are absent rather than wrong, so reporting them as mismatches only manufactures noise.
// ElixirFM cites a lexeme by its stem, without the final case vowel Muṣarrif carries on a lemma, so
// only what precedes that vowel identifies the verb. A stem vowel that still differs after this
// means ElixirFM holds a different verb of the same root and form — كَبَر against Muṣarrif's كَبُرَ.
// NFC orders a short vowel before a shadda, so on a doubled final radical the case vowel is the
// second-to-last character rather than the last (أَصَمَّ ends shadda, not fatḥa).

export function isSameLexeme(citation: string, lemma: string): boolean {
  const stem = (form: string) =>
    normalizeArabic(form).replace(new RegExp(`[${FATHA}${DAMMA}${KASRA}](${SHADDA}?)$`), '$1')
  return stem(citation) === stem(lemma)
}

export function compareForm(musarrif: string, elixir: string | undefined): 'match' | 'mismatch' | 'skip' {
  if (!musarrif || !elixir) return 'skip'
  return normalizeArabic(musarrif) === normalizeArabic(elixir) ? 'match' : 'mismatch'
}

async function resolve(text: string): Promise<Map<string, ResolvedLexeme>> {
  return parseResolvedVerbHtml(await postElixir({ code: 'Unicode', mode: 'resolve', submit: 'Resolve', text }))
}

// The vocalised lemma is the precise query — صَمَّ resolves to صَمّ "plug", while unvocalised صم
// also matches وَصَم and would pick the wrong lexeme. But ElixirFM only matches its own
// vocalisation, so a lemma it vowels differently (كَبُرَ against its كَبَر) resolves to nothing;
// retrying unvocalised finds that lexeme, and the caller compares citation forms to see it differs.
export async function resolveVerb(lemma: string): Promise<Map<string, ResolvedLexeme>> {
  const entries = await resolve(lemma)
  return entries.size > 0 ? entries : resolve(applyDiacriticsPreference(lemma, 'none'))
}

export async function inflectVerb(lexemeId: string, entryNum: string): Promise<Map<string, string>> {
  return parseInflectionRows(
    await postElixir({
      clip: `(${lexemeId},${entryNum})`,
      mode: 'inflect',
      submit: 'Inflect',
      text: 'perfect imperfect active passive imperative',
    }),
  )
}

async function deriveVerb(lexemeId: string, entryNum: string): Promise<NominalSet> {
  return parseNominals(
    await postElixir({
      clip: `(${lexemeId},${entryNum})`,
      mode: 'derive',
      submit: 'Derive',
      text: 'verb noun adjective',
    }),
  )
}

function buildParsedParadigms(rawForms: Map<string, string>, nominals: NominalSet): ParsedParadigms {
  const paradigms: ParsedParadigms['paradigms'] = {}

  for (const [tag, value] of rawForms) {
    const cell = fromTag(tag)
    if (cell) addConjugation(paradigms, cell.paradigm, cell.pronounId, value)
  }

  return { nominals, paradigms }
}

export async function fetchParadigms(verb: DisplayVerb): Promise<ParsedParadigms> {
  const entries = await resolveVerb(verb.lemma)
  const match = entries.get(formatFormLabel(verb.form, verb.root))
  if (!match) throw new Error(`ElixirFM entry not found for ${verb.id}`)
  const [lexemeId, entryNum] = match

  return buildParsedParadigms(await inflectVerb(lexemeId, entryNum), await deriveVerb(lexemeId, entryNum))
}
