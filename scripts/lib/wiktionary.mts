import { JSDOM } from 'jsdom'
import { applyDiacriticsPreference } from '../../src/paradigms/tokens'
import { type DisplayVerb, isTriliteralFormIDisplayVerb } from '../../src/paradigms/verbs'
import { toRoman } from '../../src/primitives/numbers'
import type { NominalSet, ParsedParadigms, PronounId, VerbParadigm } from './paradigms.mts'

async function fetchHtmlAtPath(path: string): Promise<string> {
  const url = `https://en.wiktionary.org/wiki/${path}`
  const response = await fetch(url, {
    headers: {
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'accept-language': 'en',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36',
    },
  })
  if (response.ok) return response.text()
  throw new Error(`Failed to fetch Wiktionary page (${response.status}): ${url}`)
}

async function fetchHtml(title: string): Promise<string> {
  return fetchHtmlAtPath(encodeURIComponent(title))
}

// The appendix page's title has a literal "/" between "Appendix:Arabic_roots" and the radicals, and
// the radicals themselves are underscore-joined rather than spaced — encoding the title as one
// component (as a lemma page needs) would percent-escape that slash and break the path.
function rootAppendixPath(arabicRoot: string): string {
  return `Appendix:Arabic_roots/${Array.from(arabicRoot).map(encodeURIComponent).join('_')}`
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function normalizeArabicKey(value: string): string {
  return value
    .replace(/[\u064b-\u065f\u0670\u06d6-\u06ed]/g, '')
    .replace(/[ٱأإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/\s+/g, '')
}

function isArabicText(value: string): boolean {
  return /[ء-ي]/.test(value)
}

function extractArabicStrings(root: ParentNode): string[] {
  const output: string[] = []
  const seen = new Set<string>()
  const elements = root.querySelectorAll('.Arab')

  for (const element of elements) {
    const text = normalizeWhitespace(element.textContent ?? '')
    if (!isArabicText(text) || seen.has(text)) continue
    seen.add(text)
    output.push(text)
  }

  return output
}

function findSectionRoot(startHeading: Element): Element {
  const doc = startHeading.ownerDocument
  const section = doc.createElement('section')
  const cursor: Element = startHeading.parentElement ?? startHeading

  for (let node = cursor.nextElementSibling; node != null; node = node.nextElementSibling) {
    const nextH2 = node.tagName === 'H2' || node.firstElementChild?.tagName === 'H2'
    if (nextH2) break
    section.append(node.cloneNode(true))
  }

  return section
}

function findConjugationTables(arabicSection: Element): HTMLTableElement[] {
  const tables: HTMLTableElement[] = []
  const headings = Array.from(arabicSection.querySelectorAll('[id^="Conjugation"]'))

  for (const heading of headings) {
    const cursor = heading.closest('.mw-heading') ?? heading
    for (let node = cursor.nextElementSibling; node != null; node = node.nextElementSibling) {
      const startsHeadingBlock = node.classList.contains('mw-heading') || /^H[1-6]$/.test(node.tagName)
      if (startsHeadingBlock) break
      const table = node.querySelector('table.inflection-table')
      if (table) {
        tables.push(table as HTMLTableElement)
        break
      }
    }
  }

  return tables
}

function resolveParadigm(voice: 'active' | 'passive' | undefined, tenseText: string): VerbParadigm | undefined {
  if (!voice) return undefined
  if (tenseText.includes('past (perfect) indicative')) return `${voice} past`
  if (tenseText.includes('non-past (imperfect) indicative')) return `${voice} present indicative`
  if (tenseText.includes('subjunctive')) return `${voice} present subjunctive`
  if (tenseText.includes('jussive')) return `${voice} present jussive`
  if (voice === 'active' && tenseText.includes('imperative')) return 'active imperative'
  return undefined
}

function extractNominals(table: HTMLTableElement): NominalSet {
  const nominals: NominalSet = {}
  const rows = Array.from(table.querySelectorAll('tr'))

  for (const row of rows) {
    const head = normalizeWhitespace(row.querySelector('th')?.textContent ?? '').toLowerCase()
    const bodyCell = row.querySelector('td')
    if (!bodyCell) continue

    if (head.startsWith('verbal noun')) {
      const values = extractArabicStrings(bodyCell)
      if (values.length > 0) nominals.masdar = values
    } else if (head.startsWith('active participle')) {
      const values = extractArabicStrings(bodyCell)
      if (values.length > 0) nominals.activeParticiple = values[0]
    } else if (head.startsWith('passive participle')) {
      const values = extractArabicStrings(bodyCell)
      if (values.length > 0) nominals.passiveParticiple = values[0]
    }
  }

  return nominals
}

function addConjugationCell(bucket: Partial<Record<PronounId, string[]>>, values: string[], pronoun: PronounId): void {
  if (values.length > 0) bucket[pronoun] = values
}

function extractParadigms(
  table: HTMLTableElement,
): Partial<Record<VerbParadigm, Partial<Record<PronounId, string[]>>>> {
  const paradigms: Partial<Record<VerbParadigm, Partial<Record<PronounId, string[]>>>> = {}
  let voice: 'active' | 'passive' | undefined
  const rows = Array.from(table.querySelectorAll('tr'))

  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index]
    const lead = normalizeWhitespace(row.textContent ?? '').toLowerCase()
    if (lead.includes('active voice')) {
      voice = 'active'
      continue
    }
    if (lead.includes('passive voice')) {
      voice = 'passive'
      continue
    }

    const paradigm = resolveParadigm(voice, lead)
    if (!paradigm) continue

    const bucket = paradigms[paradigm] ?? {}
    paradigms[paradigm] = bucket

    const masculineCells = Array.from(row.querySelectorAll('td')).map((cell) => extractArabicStrings(cell))
    addConjugationCell(bucket, masculineCells[0] ?? [], '1s')
    addConjugationCell(bucket, masculineCells[1] ?? [], '2ms')
    addConjugationCell(bucket, masculineCells[2] ?? [], '3ms')
    addConjugationCell(bucket, masculineCells[3] ?? [], '2d')
    addConjugationCell(bucket, masculineCells[4] ?? [], '3md')
    addConjugationCell(bucket, masculineCells[5] ?? [], '1p')
    addConjugationCell(bucket, masculineCells[6] ?? [], '2mp')
    addConjugationCell(bucket, masculineCells[7] ?? [], '3mp')

    const feminineRow = rows[index + 1]
    if (!feminineRow) continue
    const feminineMarker = normalizeWhitespace(
      feminineRow.querySelector('th.secondary')?.textContent ?? '',
    ).toLowerCase()
    if (feminineMarker !== 'f') continue

    const feminineCells = Array.from(feminineRow.querySelectorAll('td')).map((cell) => extractArabicStrings(cell))
    if (paradigm === 'active imperative') {
      addConjugationCell(bucket, feminineCells[0] ?? [], '2fs')
      addConjugationCell(bucket, feminineCells[1] ?? [], '2fp')
      continue
    }

    addConjugationCell(bucket, feminineCells[0] ?? [], '2fs')
    addConjugationCell(bucket, feminineCells[1] ?? [], '3fs')
    addConjugationCell(bucket, feminineCells[2] ?? [], '3fd')
    addConjugationCell(bucket, feminineCells[3] ?? [], '2fp')
    addConjugationCell(bucket, feminineCells[4] ?? [], '3fp')
  }

  return paradigms
}

function readCaptionArabic(table: HTMLTableElement): string[] {
  const caption = table.querySelector('caption')
  return caption ? extractArabicStrings(caption) : []
}

function readCaptionForm(table: HTMLTableElement): string | undefined {
  const caption = normalizeWhitespace(table.querySelector('caption')?.textContent ?? '')
  return caption.match(/\(([IVX]+q?),/)?.[1]
}

function readCaptionVowels(table: HTMLTableElement): string | undefined {
  const caption = normalizeWhitespace(table.querySelector('caption')?.textContent ?? '')
  const match = caption.match(/\b([aiu]) ~ ([aiu])\b/)
  return match ? `${match[1]}-${match[2]}` : undefined
}

type RootDeclaration = { el: Element; arabicRoot: string }

function findRootDeclarations(arabicSection: Element): RootDeclaration[] {
  const declarations: RootDeclaration[] = []
  const tables = arabicSection.querySelectorAll('table.inflection-table')
  for (const table of tables) {
    const header = table.querySelector('th')
    if (!header?.textContent?.trim().toLowerCase().includes('root')) continue
    const arabSpan = table.querySelector('.Arab')
    const arabRoot = arabSpan?.textContent?.replace(/\s+/g, '').trim()
    if (arabRoot) declarations.push({ el: table, arabicRoot: arabRoot })
  }
  return declarations
}

function nearestRoot(table: HTMLTableElement, declarations: RootDeclaration[]): string | undefined {
  let result: string | undefined
  for (const { el, arabicRoot } of declarations) {
    if (el.compareDocumentPosition(table) & 4 /* DOCUMENT_POSITION_FOLLOWING */) result = arabicRoot
  }
  return result
}

function parseConjugationTable(
  html: string,
  lemma: string,
  root?: string,
  form?: number,
  vowels?: string,
): ParsedParadigms {
  const dom = new JSDOM(html)
  const doc = dom.window.document
  const arabicHeading = doc.querySelector('h2#Arabic')
  if (!arabicHeading) throw new Error('Arabic section was not found in the Wiktionary page')

  const arabicSection = findSectionRoot(arabicHeading)
  const tables = findConjugationTables(arabicSection)
  if (tables.length === 0) throw new Error('No Arabic conjugation table was found on the page')

  const rootDeclarations = findRootDeclarations(arabicSection)
  const candidateTables =
    root && rootDeclarations.length > 0 ? tables.filter((t) => nearestRoot(t, rootDeclarations) === root) : tables
  const tablesToSearch = candidateTables.length > 0 ? candidateTables : tables

  const normalizedLemma = normalizeArabicKey(lemma)
  const exactMatches = tablesToSearch.filter((table) => readCaptionArabic(table).includes(lemma))
  const normalizedMatches = tablesToSearch.filter((table) =>
    readCaptionArabic(table).some((captionWord) => normalizeArabicKey(captionWord) === normalizedLemma),
  )
  const lemmaMatches = exactMatches.length > 0 ? exactMatches : normalizedMatches

  const expectedForm = form != null ? `${toRoman(form)}${root?.length === 4 ? 'q' : ''}` : undefined
  const formMatches = expectedForm
    ? lemmaMatches.filter((table) => readCaptionForm(table) === expectedForm)
    : lemmaMatches
  const vowelMatches =
    vowels && formMatches.some((table) => readCaptionVowels(table))
      ? formMatches.filter((table) => readCaptionVowels(table) === vowels)
      : formMatches
  const matchingTable = vowelMatches[0]
  const table = matchingTable ?? tablesToSearch[0]

  if (!matchingTable) {
    throw new Error(
      `No conjugation table matched lemma "${lemma}"${expectedForm ? ` (form ${expectedForm})` : ''}${vowels ? ` (vowels ${vowels})` : ''}. Closest caption: ${normalizeWhitespace(table.querySelector('caption')?.textContent ?? '')}`,
    )
  }

  return {
    paradigms: extractParadigms(table),
    nominals: extractNominals(table),
  }
}

export async function fetchParadigms(verb: DisplayVerb): Promise<ParsedParadigms> {
  return parseConjugationTable(
    await fetchHtml(applyDiacriticsPreference(verb.lemma, 'none')),
    verb.lemma,
    verb.root,
    verb.form,
    isTriliteralFormIDisplayVerb(verb) ? verb.vowels : undefined,
  )
}

export interface RootFormGloss {
  roman: string
  arabic: string
  translit: string
  gloss?: string
}

export interface RootGlossInfo {
  note?: string
  forms: RootFormGloss[]
}

function readRootNote(content: Element): string | undefined {
  const rootHeading = content.querySelector('h3#Root')
  const headwordParagraph = rootHeading?.closest('.mw-heading')?.nextElementSibling
  const noteList = headwordParagraph?.nextElementSibling
  if (noteList?.tagName !== 'OL') return undefined
  const note = normalizeWhitespace(noteList.querySelector('li')?.textContent ?? '')
  return note || undefined
}

// "Derived terms" lists each verb as `<li><b>Form <roman></b>: <span class="Arab">…</span> (<span
// class="tr Latn">translit</span>[, "<span class="mention-gloss">gloss</span>"])`, with a nested
// `<ul>` of verbal-noun/participle entries that carry no "Form" label — scanning every `<li>` for
// that label rather than anchoring to "Derived terms" copes with roots that nest it a level deeper
// under a "Verbs" subheading.
function readFormGlosses(content: Element): RootFormGloss[] {
  const forms: RootFormGloss[] = []
  for (const item of content.querySelectorAll('li')) {
    const roman = /^Form\s+([IVX]+q?)$/.exec(
      normalizeWhitespace(item.querySelector(':scope > b')?.textContent ?? ''),
    )?.[1]
    const arabic = normalizeWhitespace(item.querySelector(':scope > .Arab')?.textContent ?? '')
    if (!roman || !arabic) continue
    const translit = normalizeWhitespace(item.querySelector(':scope > .tr.Latn')?.textContent ?? '')
    const glossText = item.querySelector(':scope > .mention-gloss')?.textContent
    forms.push({ roman, arabic, translit, gloss: glossText ? normalizeWhitespace(glossText) : undefined })
  }
  return forms
}

// Reads the "related to X" root note and every Form entry's inline gloss off a root's Appendix page
// — the same page the add-verb skill has agents read manually for roots Wiktionary's per-lemma
// pages don't gloss. Coverage is partial: many roots list Form entries with no inline gloss at all,
// leaving `gloss` undefined for those — the caller falls back to ElixirFM or the lemma's own page.
export async function fetchRootNote(arabicRoot: string): Promise<RootGlossInfo> {
  const dom = new JSDOM(await fetchHtmlAtPath(rootAppendixPath(arabicRoot)))
  const content = dom.window.document.querySelector('#mw-content-text') ?? dom.window.document.body

  return { note: readRootNote(content), forms: readFormGlosses(content) }
}
