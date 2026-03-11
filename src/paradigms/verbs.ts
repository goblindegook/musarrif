import rawVerbs from '../data/roots.json'
import { conjugatePast } from './active/past'
import type { FormIPattern } from './form-i-vowels'
import { HAMZA, isHamzatedLetter, isWeakLetter } from './letters'

export type VerbForm = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export type MasdarPattern =
  | 'fa3aal'
  | 'fa3aala'
  | 'fa3al'
  | 'fa3lan'
  | 'fa3l'
  | 'fi3aal'
  | 'fi3aala'
  | 'fi3al'
  | 'fi3an'
  | 'fi3l'
  | 'fi3la'
  | 'fu3la'
  | 'fu3aal'
  | 'fu3l'
  | 'fu3ool'
  | 'fu3ul'
  | 'ifi3aal'
  | 'mimi'

export type Tense = 'past' | 'present' | 'future' | 'imperative'
export type Voice = 'active' | 'passive'
export type PassiveVoice = 'none' | 'impersonal'

export type FormIVerb = {
  root: string
  form: 1
  formPattern: FormIPattern
  masdarPatterns?: readonly MasdarPattern[]
  passiveVoice?: PassiveVoice
  noPassiveParticiple?: boolean
  contractedImperative?: boolean
}

export type NonFormIVerb = {
  root: string
  form: Exclude<VerbForm, 1>
  passiveVoice?: PassiveVoice
  noPassiveParticiple?: boolean
}

export type Verb = FormIVerb | NonFormIVerb

type VerbBase<T extends Verb> = T & { id: string; label: string }

export type DisplayVerb<F extends VerbForm = VerbForm> = F extends 1 ? VerbBase<FormIVerb> : VerbBase<NonFormIVerb>

const TRANSLITERATION_MAP: Record<string, string> = {
  آ: '|',
  أ: '>',
  إ: '<',
  ٱ: '{',
  ا: 'A',
  ب: 'b',
  ت: 't',
  ث: 'v',
  ج: 'j',
  ح: 'H',
  خ: 'x',
  د: 'd',
  ذ: '*',
  ر: 'r',
  ز: 'z',
  س: 's',
  ش: '$',
  ص: 'S',
  ض: 'D',
  ط: 'T',
  ظ: 'Z',
  ع: 'E',
  غ: 'g',
  ف: 'f',
  ق: 'q',
  ك: 'k',
  ل: 'l',
  م: 'm',
  ن: 'n',
  ه: 'h',
  و: 'w',
  ي: 'y',
  ة: 'p',
  ى: 'Y',
  ء: "'",
  ؤ: '&',
  ئ: '}',
}

const ARABIC_MAP_BY_TRANSLITERATION = Object.fromEntries(
  Object.entries(TRANSLITERATION_MAP).map(([arabic, transliterated]) => [transliterated, arabic]),
)

export const normalizeHamza = (value: string): string => value.replace(/[آأإؤئ]/g, HAMZA)

export function transliterate(text: string): string {
  return Array.from(text)
    .map((char) => TRANSLITERATION_MAP[char] ?? char)
    .join('')
}

function verbId({ root, form }: Verb): string {
  return [transliterate(root), String(form)].join('-')
}

export const verbs: DisplayVerb[] = (rawVerbs as Verb[]).map((verb) => {
  const past = conjugatePast(verb)
  return { ...verb, label: past['3ms'], id: verbId(verb) }
})

const verbsById = new Map<string, DisplayVerb>()

for (const verb of verbs) {
  verbsById.set(verbId(verb), verb)
}

export const verbsByRoot = new Map<string, DisplayVerb[]>()

for (const verb of verbs) {
  const existing = verbsByRoot.get(verb.root)
  if (existing) existing.push(verb)
  else verbsByRoot.set(verb.root, [verb])

  const normalizedRoot = normalizeHamza(verb.root)
  if (normalizedRoot !== verb.root) {
    const normalizedExisting = verbsByRoot.get(normalizedRoot)
    if (normalizedExisting) normalizedExisting.push(verb)
    else verbsByRoot.set(normalizedRoot, [verb])
  }
}

export function getVerbById(id?: string): DisplayVerb | undefined {
  return id ? verbsById.get(id) : undefined
}

function parseVerbId(id?: string): { readonly root: string; readonly form: VerbForm } | undefined {
  const [transliteratedRoot, formText] = (id ?? '').split('-')
  if (!transliteratedRoot) return undefined

  const root = Array.from(transliteratedRoot)
    .map((letter) => ARABIC_MAP_BY_TRANSLITERATION[letter])
    .filter((i) => i)

  const form = Math.min(Math.max(1, Number(formText)), 10) as VerbForm

  return { root: root.join(''), form }
}

export function buildVerbFromId(id?: string): DisplayVerb | undefined {
  const existingVerb = getVerbById(id)
  if (existingVerb) return existingVerb

  const parsed = parseVerbId(id)
  if (!parsed) return undefined

  return parsed.form === 1 ? buildVerb(parsed.root, 1, 'fa3ala-yaf3alu') : buildVerb(parsed.root, parsed.form)
}

export function getVerb(root: string, form: VerbForm): DisplayVerb {
  const verb = verbs.find((entry) => entry.root === root && entry.form === form)
  if (!verb) throw new Error(`Verb with root ${root} and form ${form} not found`)
  return verb
}

export function buildVerb(root: string, form: 1, pattern: FormIPattern): DisplayVerb
export function buildVerb(root: string, form: Exclude<VerbForm, 1>): DisplayVerb
export function buildVerb(root: string, form: VerbForm, pattern?: FormIPattern): DisplayVerb {
  const matchingFormI = verbs.find(
    (entry): entry is DisplayVerb<1> => entry.form === 1 && entry.root === root && entry.formPattern === pattern,
  )
  const raw: Verb =
    form === 1
      ? { root, form, formPattern: pattern ?? 'fa3ala-yaf3alu', masdarPatterns: matchingFormI?.masdarPatterns }
      : { root, form }
  const past = conjugatePast(raw)
  return { ...raw, id: `${transliterate(root)}-${form}`, label: past['3ms'] }
}

interface RootAnalysis {
  type:
    | 'strong'
    | 'hollow'
    | 'defective'
    | 'doubly-weak'
    | 'assimilated'
    | 'hamzated'
    | 'hamzated-hollow'
    | 'hamzated-defective'
    | 'hamzated-hollow-defective'
  weakPositions: number[]
  hamzaPositions: number[]
}

export function analyzeRoot(root: string): RootAnalysis {
  const letters = Array.from(root)
  const weakPositions: number[] = []
  const hamzaPositions: number[] = []

  letters.forEach((letter, index) => {
    if (isWeakLetter(letter)) weakPositions.push(index)
    if (isHamzatedLetter(letter)) hamzaPositions.push(index)
  })

  const [c1, c2, c3] = Array.from(letters)
  const isInitialWeak = isWeakLetter(c1)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const hasHamza = hamzaPositions.length > 0

  if (!hasHamza && weakPositions.length >= 2) return { type: 'doubly-weak', weakPositions, hamzaPositions }
  if (isInitialWeak) return { type: 'assimilated', weakPositions, hamzaPositions }
  if (hasHamza && isMiddleWeak && isFinalWeak)
    return { type: 'hamzated-hollow-defective', weakPositions, hamzaPositions }
  if (hasHamza && isMiddleWeak) return { type: 'hamzated-hollow', weakPositions, hamzaPositions }
  if (hasHamza && isFinalWeak) return { type: 'hamzated-defective', weakPositions, hamzaPositions }
  if (hasHamza) return { type: 'hamzated', weakPositions, hamzaPositions }
  if (isMiddleWeak) return { type: 'hollow', weakPositions, hamzaPositions }
  if (isFinalWeak) return { type: 'defective', weakPositions, hamzaPositions }
  return { type: 'strong', weakPositions, hamzaPositions }
}
