import { JSDOM } from 'jsdom'
import type { NominalSet, ParsedParadigms, PronounId, VerbParadigm } from './paradigms.mts'

const REVERSO_BASE = 'https://conjugator.reverso.net'

async function fetchHtml(lemma: string): Promise<string> {
  const url = `${REVERSO_BASE}/conjugation-arabic-verb-${encodeURIComponent(lemma)}.html`
  const response = await fetch(url, {
    headers: {
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'accept-language': 'en-US,en;q=0.9',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36',
    },
  })
  if (response.ok) return response.text()
  throw new Error(`Failed to fetch Reverso page (${response.status}): ${url}`)
}

const MOBILE_TITLE_TO_PARADIGM: Partial<Record<string, VerbParadigm>> = {
  'Active Past': 'active past',
  'Active Present': 'active present indicative',
  'Active Subjunctive': 'active present subjunctive',
  'Active Jussive': 'active present jussive',
  'Passive Past': 'passive past',
  'Passive Present': 'passive present indicative',
  'Passive Subjunctive': 'passive present subjunctive',
  'Passive Jussive': 'passive present jussive',
  Imperative: 'active imperative',
}

// positional mapping — هُمَا is both 3md and 3fd, so text matching is ambiguous
const CONJUGATION_PRONOUN_ORDER: readonly PronounId[] = [
  '1s',
  '2ms',
  '2fs',
  '3ms',
  '3fs',
  '2d',
  '3md',
  '3fd',
  '1p',
  '2mp',
  '2fp',
  '3mp',
  '3fp',
]

const IMPERATIVE_PRONOUN_ORDER: readonly PronounId[] = ['2ms', '2fs', '2d', '2mp', '2fp']

function normalizeArabic(value: string): string {
  return value.trim().normalize('NFC')
}

function extractFirstForm(box: Element): string | undefined {
  const text = box.querySelector('.verbtxt-term')?.textContent
  return text ? normalizeArabic(text) || undefined : undefined
}

function parseConjugation(box: Element, pronounOrder: readonly PronounId[]): Partial<Record<PronounId, string>> {
  const result: Partial<Record<PronounId, string>> = {}
  const items = box.querySelectorAll('li')
  for (let i = 0; i < items.length && i < pronounOrder.length; i++) {
    const text = items[i].querySelector('.verbtxt-term')?.textContent?.split('/')[0]
    const form = text ? normalizeArabic(text) : undefined
    if (form) result[pronounOrder[i]] = form
  }
  return result
}

function parseHtml(html: string): ParsedParadigms {
  const dom = new JSDOM(html)
  const boxes = dom.window.document.querySelectorAll('[mobile-title]')

  const paradigms: ParsedParadigms['paradigms'] = {}
  const nominals: NominalSet = {}

  for (const box of boxes) {
    const title = box.getAttribute('mobile-title')?.trim()
    if (!title) continue

    if (title === 'Participles Active') {
      const form = extractFirstForm(box)
      if (form) nominals.activeParticiple = form
      continue
    }
    if (title === 'Participles Passive') {
      const form = extractFirstForm(box)
      if (form) nominals.passiveParticiple = form
      continue
    }
    if (title === 'Verbal noun') {
      const text = extractFirstForm(box)
      if (text)
        nominals.masdar = text
          .split('/')
          .map((s) => s.trim())
          .filter(Boolean)
      continue
    }

    const paradigm = MOBILE_TITLE_TO_PARADIGM[title]
    if (!paradigm) continue

    const pronounOrder = paradigm === 'active imperative' ? IMPERATIVE_PRONOUN_ORDER : CONJUGATION_PRONOUN_ORDER
    const forms = parseConjugation(box, pronounOrder)
    if (Object.keys(forms).length > 0) paradigms[paradigm] = forms
  }

  return { paradigms, nominals }
}

export async function fetchParadigms(lemma: string): Promise<ParsedParadigms> {
  return parseHtml(await fetchHtml(lemma))
}
