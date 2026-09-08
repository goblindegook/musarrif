import type { ParsedParadigms, PronounId, VerbParadigm } from './paradigms.mts'

const ENDPOINT = 'https://qutrub.arabeyes.org/ajaxGet'

export type PresentVowel = 'a' | 'i' | 'u'

type QutrubRow = Record<string, string>
type QutrubResponse = { result?: Record<string, QutrubRow> }

const COLUMN_PARADIGMS: Record<string, VerbParadigm> = {
  'الماضي المعلوم': 'active past',
  'المضارع المعلوم': 'active present indicative',
  'المضارع المجزوم': 'active present jussive',
  'المضارع المنصوب': 'active present subjunctive',
  الأمر: 'active imperative',
  'الماضي المجهول': 'passive past',
  'المضارع المجهول': 'passive present indicative',
  'المضارع المجهول المجزوم': 'passive present jussive',
  'المضارع المجهول المنصوب': 'passive present subjunctive',
}

const ROW_PRONOUNS: Record<string, PronounId> = {
  أنا: '1s',
  نحن: '1p',
  أنت: '2ms',
  أنتِ: '2fs',
  أنتما: '2d',
  'أنتما مؤ': '2d',
  أنتم: '2mp',
  أنتن: '2fp',
  هو: '3ms',
  هي: '3fs',
  هما: '3md',
  'هما مؤ': '3fd',
  هم: '3mp',
  هن: '3fp',
}

// Qutrub picks the reading from the present vowel; Forms II–X fix it themselves, so fatḥa is a safe default.
export function presentVowelOf(formIVowels: string): PresentVowel {
  const vowel = formIVowels.split('-')[1]
  return vowel === 'i' || vowel === 'u' ? vowel : 'a'
}

const SUKOON = 'ْ'

// Qutrub vocalises every form except the أنتم past suffix, which it leaves as a bare mīm,
// and writes a shadda ahead of its vowel, which NFC swaps back.
function normalizeForm(form: string): string {
  return (form.endsWith('تُم') ? form + SUKOON : form).normalize('NFC')
}

export async function fetchParadigms(lemma: string, presentVowel: PresentVowel): Promise<ParsedParadigms> {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      data: { text: lemma, action: 'Conjugate', all: 1, transitive: 1, future_type: presentVowel },
    }),
  })
  if (!response.ok) throw new Error(`Failed to fetch Qutrub conjugation (${response.status}): ${lemma}`)

  const { result } = (await response.json()) as QutrubResponse
  const header = result?.['0']
  if (!header) throw new Error(`Qutrub returned no conjugation for ${lemma}`)

  const rows = Object.entries(result)
    .filter(([index]) => index !== '0')
    .map(([, row]) => row)
  const paradigms: ParsedParadigms['paradigms'] = {}

  for (const [column, title] of Object.entries(header)) {
    const paradigm = COLUMN_PARADIGMS[title.trim()]
    if (!paradigm) continue

    const forms: Partial<Record<PronounId, string[]>> = {}

    for (const row of rows) {
      const pronoun = ROW_PRONOUNS[row['0']?.trim() ?? '']
      const form = row[column]?.trim()
      // أنتما and أنتما مؤ both map to 2d, and the masculine row comes first
      if (!pronoun || !form || forms[pronoun]) continue
      forms[pronoun] = [normalizeForm(form)]
    }

    if (Object.keys(forms).length > 0) paradigms[paradigm] = forms
  }

  return { paradigms, nominals: {} }
}
