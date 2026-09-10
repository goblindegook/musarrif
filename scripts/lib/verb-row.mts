import { transliterate } from '@pacote/buckwalter'
import type { FormIPattern } from '../../src/paradigms/form-i-vowels.ts'
import { deriveMasdar } from '../../src/paradigms/nominal/masdar.ts'
import {
  type DisplayVerb,
  isTriliteralFormIDisplayVerb,
  MASDAR_PATTERNS,
  type MasdarPattern,
  type PassiveVoice,
  type TriliteralForm,
  type Valency,
  type Verb,
} from '../../src/paradigms/verbs.ts'
import type { ParsedParadigms } from './paradigms.mts'

export interface RootEntry {
  root: string
  form: TriliteralForm
  vowels?: FormIPattern
  hollowContraction?: 'contracted' | 'uncontracted'
  contractedImperative?: boolean
  masdars?: readonly MasdarPattern[]
  lexicalMasdars?: readonly string[]
  passiveVoice?: PassiveVoice
  noPassiveParticiple?: boolean
  lexicalActiveParticiple?: string
  lexicalPassiveParticiple?: string
  valency?: readonly Valency[]
}

type MasdarSelection = { masdars?: MasdarPattern[]; lexicalMasdars?: string[] }

function derivedMasdar(verb: DisplayVerb, masdars?: readonly MasdarPattern[]): string {
  return String(deriveMasdar({ ...verb, masdars, lexicalMasdars: undefined } as Verb)[0])
}

function selectMasdars(verb: DisplayVerb, sourceMasdars: readonly string[]): MasdarSelection {
  const isFormI = isTriliteralFormIDisplayVerb(verb)
  const byPattern = new Map<string, MasdarPattern>()
  for (const pattern of isFormI ? MASDAR_PATTERNS : []) {
    const derived = derivedMasdar(verb, [pattern])
    if (!byPattern.has(derived)) byPattern.set(derived, pattern)
  }
  const defaultMasdar = derivedMasdar(verb)

  const masdars: MasdarPattern[] = []
  const lexicalMasdars: string[] = []

  for (const masdar of new Set(sourceMasdars)) {
    const pattern = byPattern.get(masdar)
    if (pattern) masdars.push(pattern)
    else if (masdar !== defaultMasdar) lexicalMasdars.push(transliterate(masdar))
  }

  return {
    masdars: isFormI && sourceMasdars.length > 0 ? masdars : undefined,
    lexicalMasdars: lexicalMasdars.length > 0 ? lexicalMasdars : undefined,
  }
}

function selectPassiveVoice(parsed: ParsedParadigms): PassiveVoice | undefined {
  const pronouns = Object.keys(parsed.paradigms['passive past'] ?? {})
  if (pronouns.length === 0) return 'none'
  if (pronouns.every((pronoun) => pronoun === '3ms')) return 'impersonal'
  return undefined
}

export function buildRootEntry(verb: DisplayVerb, parsed: ParsedParadigms, existing?: RootEntry): RootEntry {
  const { masdars, lexicalMasdars } = selectMasdars(verb, parsed.nominals.masdar ?? [])
  const passiveVoice = selectPassiveVoice(parsed)
  const vowels = isTriliteralFormIDisplayVerb(verb) ? verb.vowels : undefined
  const carried = existing?.vowels === vowels ? existing : undefined

  return {
    root: verb.rootId,
    form: verb.form,
    ...(vowels ? { vowels } : {}),
    ...(carried?.hollowContraction ? { hollowContraction: carried.hollowContraction } : {}),
    ...(carried?.contractedImperative ? { contractedImperative: true } : {}),
    ...(masdars ? { masdars } : {}),
    ...(lexicalMasdars ? { lexicalMasdars } : {}),
    ...(passiveVoice ? { passiveVoice } : {}),
    ...(parsed.nominals.passiveParticiple ? {} : { noPassiveParticiple: true }),
    ...(carried?.lexicalActiveParticiple ? { lexicalActiveParticiple: carried.lexicalActiveParticiple } : {}),
    ...(carried?.lexicalPassiveParticiple ? { lexicalPassiveParticiple: carried.lexicalPassiveParticiple } : {}),
    ...(carried?.valency?.length ? { valency: carried.valency } : {}),
  }
}

export function upsertRootEntry(roots: readonly RootEntry[], entry: RootEntry): RootEntry[] {
  const index = roots.findIndex((root) => root.root === entry.root && root.form === entry.form)
  const merged = index === -1 ? [...roots, entry] : roots.map((root, at) => (at === index ? entry : root))
  return merged.toSorted((a, b) => (a.root < b.root ? -1 : a.root > b.root ? 1 : a.form - b.form))
}
