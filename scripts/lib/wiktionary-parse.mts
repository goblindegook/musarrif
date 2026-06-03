import { JSDOM } from 'jsdom'
import type { PronounId } from '../../src/paradigms/pronouns.ts'

export type { PronounId }

export type VerbParadigm =
  | 'active past'
  | 'active present indicative'
  | 'active present subjunctive'
  | 'active present jussive'
  | 'active imperative'
  | 'passive past'
  | 'passive present indicative'
  | 'passive present subjunctive'
  | 'passive present jussive'

export type NominalSet = {
  masdar?: string[]
  activeParticiple?: string
  passiveParticiple?: string
}

export type ParsedParadigms = {
  paradigms: Partial<Record<VerbParadigm, Partial<Record<PronounId, string>>>>
  nominals: NominalSet
}

const ARABIC_DIACRITICS = /[\u064b-\u065f\u0670\u06d6-\u06ed]/g

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function normalizeArabicKey(value: string): string {
  return value
    .replace(ARABIC_DIACRITICS, '')
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
  const headings = Array.from(
    arabicSection.querySelectorAll(
      'h3[id^="Conjugation"], h4[id^="Conjugation"], h5[id^="Conjugation"], h6[id^="Conjugation"]',
    ),
  )

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

function addConjugationCell(
  bucket: Partial<Record<PronounId, string>>,
  value: string | undefined,
  pronoun: PronounId,
): void {
  if (value) bucket[pronoun] = value
}

function extractParadigms(table: HTMLTableElement): Partial<Record<VerbParadigm, Partial<Record<PronounId, string>>>> {
  const paradigms: Partial<Record<VerbParadigm, Partial<Record<PronounId, string>>>> = {}
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

    const masculineCells = Array.from(row.querySelectorAll('td')).map((cell) => extractArabicStrings(cell)[0] ?? '')
    addConjugationCell(bucket, masculineCells[0], '1s')
    addConjugationCell(bucket, masculineCells[1], '2ms')
    addConjugationCell(bucket, masculineCells[2], '3ms')
    addConjugationCell(bucket, masculineCells[3], '2d')
    addConjugationCell(bucket, masculineCells[4], '3md')
    addConjugationCell(bucket, masculineCells[5], '1p')
    addConjugationCell(bucket, masculineCells[6], '2mp')
    addConjugationCell(bucket, masculineCells[7], '3mp')

    const feminineRow = rows[index + 1]
    if (!feminineRow) continue
    const feminineMarker = normalizeWhitespace(
      feminineRow.querySelector('th.secondary')?.textContent ?? '',
    ).toLowerCase()
    if (feminineMarker !== 'f') continue

    const feminineCells = Array.from(feminineRow.querySelectorAll('td')).map(
      (cell) => extractArabicStrings(cell)[0] ?? '',
    )
    if (paradigm === 'active imperative') {
      addConjugationCell(bucket, feminineCells[0], '2fs')
      addConjugationCell(bucket, feminineCells[1], '2fp')
      continue
    }

    addConjugationCell(bucket, feminineCells[0], '2fs')
    addConjugationCell(bucket, feminineCells[1], '3fs')
    addConjugationCell(bucket, feminineCells[2], '3fd')
    addConjugationCell(bucket, feminineCells[3], '2fp')
    addConjugationCell(bucket, feminineCells[4], '3fp')
  }

  return paradigms
}

function readCaptionText(table: HTMLTableElement): string {
  return normalizeWhitespace(table.querySelector('caption')?.textContent ?? '')
}

function readCaptionArabic(table: HTMLTableElement): string[] {
  const caption = table.querySelector('caption')
  return caption ? extractArabicStrings(caption) : []
}

export function parseArabicConjugationTable(html: string, lemma: string): ParsedParadigms {
  const dom = new JSDOM(html)
  const doc = dom.window.document
  const arabicHeading = doc.querySelector('h2#Arabic')
  if (!arabicHeading) throw new Error('Arabic section was not found in the Wiktionary page')

  const arabicSection = findSectionRoot(arabicHeading)
  const tables = findConjugationTables(arabicSection)
  if (tables.length === 0) throw new Error('No Arabic conjugation table was found on the page')

  const exactMatch = tables.find((table) => readCaptionArabic(table).includes(lemma))
  const normalizedLemma = normalizeArabicKey(lemma)
  const normalizedMatch = tables.find((table) =>
    readCaptionArabic(table).some((captionWord) => normalizeArabicKey(captionWord) === normalizedLemma),
  )
  const matchingTable = exactMatch ?? normalizedMatch
  const table = matchingTable ?? tables[0]

  if (!matchingTable) {
    throw new Error(`No conjugation table matched lemma "${lemma}". Closest caption: ${readCaptionText(table)}`)
  }

  return {
    paradigms: extractParadigms(table),
    nominals: extractNominals(table),
  }
}
