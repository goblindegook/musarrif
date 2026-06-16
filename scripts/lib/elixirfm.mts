import { type DisplayVerb, formatFormLabel } from '../../src/paradigms/verbs'
import type { NominalSet, ParsedParadigms, PronounId, VerbParadigm } from './parse-wiktionary.mts'

const ELIXIR_URL = 'https://quest.ms.mff.cuni.cz/cgi-bin/elixir/index.fcgi'

const PARADIGM_PREFIXES: Record<Exclude<VerbParadigm, 'active imperative'>, string> = {
  'active past': 'VP-A-',
  'active present indicative': 'VIIA-',
  'active present subjunctive': 'VISA-',
  'active present jussive': 'VIJA-',
  'passive past': 'VP-P-',
  'passive present indicative': 'VIIP-',
  'passive present subjunctive': 'VISP-',
  'passive present jussive': 'VIJP-',
}

const PRONOUN_BY_SUFFIX = new Map<string, PronounId>([
  ['1MS', '1s'],
  ['2MS', '2ms'],
  ['2FS', '2fs'],
  ['3MS', '3ms'],
  ['3FS', '3fs'],
  ['2MD', '2d'],
  ['3MD', '3md'],
  ['3FD', '3fd'],
  ['1MP', '1p'],
  ['2MP', '2mp'],
  ['2FP', '2fp'],
  ['3MP', '3mp'],
  ['3FP', '3fp'],
])

const IMPERATIVE_PRONOUN_BY_SUFFIX = new Map<string, PronounId>([
  ['MS', '2ms'],
  ['FS', '2fs'],
  ['MD', '2d'],
  ['FD', '2d'],
  ['MP', '2mp'],
  ['FP', '2fp'],
])

type HtmlLoader = {
  deriveHtml: (lexemeId: string, entryNum: string) => Promise<string>
  inflectHtml: (lexemeId: string, entryNum: string) => Promise<string>
  resolveHtml: (lemma: string) => Promise<string>
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
  if (!(pronounId in bucket)) bucket[pronounId] = value
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

function mergeParadigmPrefix(
  paradigms: ParsedParadigms['paradigms'],
  rawForms: Map<string, string>,
  paradigm: Exclude<VerbParadigm, 'active imperative'>,
  prefix: string,
): void {
  for (const [tag, value] of rawForms) {
    if (!tag.startsWith(prefix)) continue
    const pronounId = PRONOUN_BY_SUFFIX.get(tag.slice(prefix.length, prefix.length + 3))
    if (!pronounId) continue
    addConjugation(paradigms, paradigm, pronounId, value)
  }
}

export async function postElixir(params: Record<string, string>): Promise<string> {
  const response = await fetch(ELIXIR_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(params).toString(),
  })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return response.text()
}

export function parseResolvedVerbHtml(html: string): Map<string, [string, string]> {
  const entries = new Map<string, [string, string]>()
  for (const lexemeMatch of html.matchAll(/<table[^>]*class="lexeme"[^>]*>(.*?)<\/table>/gs)) {
    const block = lexemeMatch[1]
    const pos = getCell(block, 'xtag')
    const formKey = getCell(block, 'class')
    const clipMatch = /clip=\((\d+),(\d+)\)/.exec(block)
    if (pos !== 'V' || !formKey || !clipMatch || entries.has(formKey)) continue
    entries.set(formKey, [clipMatch[1], clipMatch[2]])
  }

  return entries
}

export async function resolveVerb(lemma: string): Promise<Map<string, [string, string]>> {
  const html = await postElixir({ code: 'Unicode', mode: 'resolve', submit: 'Resolve', text: lemma })
  return parseResolvedVerbHtml(html)
}

export async function inflectVerb(lexemeId: string, entryNum: string): Promise<Map<string, string>> {
  const html = await postElixir({
    clip: `(${lexemeId},${entryNum})`,
    mode: 'inflect',
    submit: 'Inflect',
    text: 'perfect imperfect active passive imperative',
  })
  return parseInflectionRows(html)
}

export async function deriveVerb(lexemeId: string, entryNum: string): Promise<NominalSet> {
  const html = await postElixir({
    clip: `(${lexemeId},${entryNum})`,
    mode: 'derive',
    submit: 'Derive',
    text: 'verb noun adjective',
  })
  return parseNominals(html)
}

export function getElixirFormKey(verb: DisplayVerb): string {
  return formatFormLabel(verb.form, verb.root)
}

export function parseInflectedVerbHtml(inflectHtml: string, deriveHtml: string): ParsedParadigms {
  const rawForms = parseInflectionRows(inflectHtml)
  const paradigms: ParsedParadigms['paradigms'] = {}

  for (const [paradigm, prefix] of Object.entries(PARADIGM_PREFIXES) as [
    Exclude<VerbParadigm, 'active imperative'>,
    string,
  ][]) {
    mergeParadigmPrefix(paradigms, rawForms, paradigm, prefix)
  }

  for (const [tag, value] of rawForms) {
    if (!tag.startsWith('VCJ---')) continue
    const pronounId = IMPERATIVE_PRONOUN_BY_SUFFIX.get(tag.slice(6, 8))
    if (!pronounId) continue
    addConjugation(paradigms, 'active imperative', pronounId, value)
  }

  return { nominals: parseNominals(deriveHtml), paradigms }
}

export async function fetchElixirFmParadigms(
  verb: DisplayVerb,
  overrides: Partial<HtmlLoader> = {},
): Promise<ParsedParadigms> {
  const loader: HtmlLoader = {
    deriveHtml:
      overrides.deriveHtml ??
      (async (lexemeId, entryNum) => {
        const nominals = await deriveVerb(lexemeId, entryNum)
        const rows = [
          nominals.masdar
            ?.map((value) => `<tr><td class="xtag">N---------</td><td class="orth">${value}</td></tr>`)
            .join('') ?? '',
          nominals.activeParticiple
            ? `<tr><td class="xtag">A--A------</td><td class="orth">${nominals.activeParticiple}</td></tr>`
            : '',
          nominals.passiveParticiple
            ? `<tr><td class="xtag">A--P------</td><td class="orth">${nominals.passiveParticiple}</td></tr>`
            : '',
        ].join('')
        return `<table>${rows}</table>`
      }),
    inflectHtml:
      overrides.inflectHtml ??
      (async (lexemeId, entryNum) => {
        const forms = await inflectVerb(lexemeId, entryNum)
        const rows = Array.from(forms.entries())
          .map(([tag, value]) => `<tr><td class="xtag">${tag}</td><td class="orth">${value}</td></tr>`)
          .join('')
        return `<table>${rows}</table>`
      }),
    resolveHtml:
      overrides.resolveHtml ??
      (async (lemma) => {
        const entries = await resolveVerb(lemma)
        const rows = Array.from(entries.entries())
          .map(
            ([formKey, [lexemeId, entryNum]]) =>
              `<table class="lexeme"><tr><td class="xtag">V</td><td class="class">${formKey}</td><td><a href="index.fcgi?mode=inflect&amp;clip=(${lexemeId},${entryNum})">Inflect</a></td></tr></table>`,
          )
          .join('')
        return rows
      }),
  }

  const entries = parseResolvedVerbHtml(await loader.resolveHtml(verb.lemma))
  const match = entries.get(getElixirFormKey(verb))
  if (!match) throw new Error(`ElixirFM entry not found for ${verb.id}`)
  const [lexemeId, entryNum] = match

  return parseInflectedVerbHtml(
    await loader.inflectHtml(lexemeId, entryNum),
    await loader.deriveHtml(lexemeId, entryNum),
  )
}
