import rawVerbs from '../data/roots.json'
import { conjugatePast } from './active/past'
import type { FormIPattern } from './form-i-vowels'
import { HAMZA, isHamzatedLetter, isWeakLetter } from './letters'
import { detransliterate, transliterate } from './transliteration'

export type VerbForm = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export type MasdarPattern =
  | 'fa3aal'
  | 'fa3aala'
  | 'fa3al'
  | 'fa3l'
  | 'fa3lan'
  | 'fi3aal'
  | 'fi3aala'
  | 'fi3al'
  | 'fi3an'
  | 'fi3iil'
  | 'fi3l'
  | 'fi3la'
  | 'fu3aal'
  | 'fu3l'
  | 'fu3la'
  | 'fu3ool'
  | 'fu3ul'
  | 'mimi'

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

type VerbBase<T extends Verb> = T & { id: string; label: string; rootId: string }

export type DisplayVerb<F extends VerbForm = VerbForm> = F extends 1 ? VerbBase<FormIVerb> : VerbBase<NonFormIVerb>

export const normalizeHamza = (value: string): string => value.replace(/[آأإؤئ]/g, HAMZA)

export const verbs: DisplayVerb[] = (rawVerbs as Verb[]).map((rawVerb) => {
  const rootId = rawVerb.root
  const verb = { ...rawVerb, root: detransliterate(rootId) }
  const past = conjugatePast(verb)
  return { ...verb, label: past['3ms'], id: `${rootId}-${rawVerb.form}`, rootId }
})

const verbsById = new Map<string, DisplayVerb>()
for (const verb of verbs) verbsById.set(verb.id, verb)

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

export function buildVerbFromId(id?: string): DisplayVerb | undefined {
  const existingVerb = getVerbById(id)
  if (existingVerb) return existingVerb

  const [rootId, formText] = (id ?? '').split('-')
  if (!rootId || !formText) return undefined

  const root = detransliterate(rootId)

  const form = Math.min(Math.max(1, Number(formText)), 10) as VerbForm

  return form === 1 ? synthesizeVerb(root, 1, 'fa3ala-yaf3alu') : synthesizeVerb(root, form)
}

export function getVerb(root: string, form: VerbForm): DisplayVerb {
  const verb = verbs.find((entry) => entry.root === root && entry.form === form)
  if (!verb) throw new Error(`Verb with root ${root} and form ${form} not found`)
  return verb
}

export function synthesizeVerb(root: string, form: 1, pattern: FormIPattern): DisplayVerb
export function synthesizeVerb(root: string, form: Exclude<VerbForm, 1>): DisplayVerb
export function synthesizeVerb(root: string, form: VerbForm, pattern?: FormIPattern): DisplayVerb {
  const matchingFormI = verbs.find(
    (entry): entry is DisplayVerb<1> => entry.form === 1 && entry.root === root && entry.formPattern === pattern,
  )
  const raw: Verb =
    form === 1
      ? { root, form, formPattern: pattern ?? 'fa3ala-yaf3alu', masdarPatterns: matchingFormI?.masdarPatterns }
      : { root, form }
  const past = conjugatePast(raw)
  const rootId = transliterate(root)
  return { ...raw, id: `${rootId}-${form}`, label: past['3ms'], rootId }
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

  if (hasHamza && isMiddleWeak && isFinalWeak)
    return { type: 'hamzated-hollow-defective', weakPositions, hamzaPositions }
  if (hasHamza && isMiddleWeak) return { type: 'hamzated-hollow', weakPositions, hamzaPositions }
  if (hasHamza && isFinalWeak) return { type: 'hamzated-defective', weakPositions, hamzaPositions }
  if (hasHamza) return { type: 'hamzated', weakPositions, hamzaPositions }
  if (weakPositions.length >= 2) return { type: 'doubly-weak', weakPositions, hamzaPositions }
  if (isInitialWeak) return { type: 'assimilated', weakPositions, hamzaPositions }
  if (isMiddleWeak) return { type: 'hollow', weakPositions, hamzaPositions }
  if (isFinalWeak) return { type: 'defective', weakPositions, hamzaPositions }
  return { type: 'strong', weakPositions, hamzaPositions }
}
