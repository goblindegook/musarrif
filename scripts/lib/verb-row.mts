import { transliterate } from '@pacote/buckwalter'
import type { FormIPattern } from '../../src/paradigms/form-i-vowels.ts'
import { deriveMasdar } from '../../src/paradigms/nominal/masdar.ts'
import {
  type DisplayVerb,
  isTriliteralFormIDisplayVerb,
  MASDAR_PATTERNS,
  type MasdarPattern,
  type PassiveVoice,
  type Valency,
  type Verb,
  type VerbForm,
} from '../../src/paradigms/verbs.ts'
import type { ParsedParadigms } from './paradigms.mts'

export interface RootEntry {
  root: string
  form: VerbForm
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
  const patterns = isTriliteralFormIDisplayVerb(verb) ? MASDAR_PATTERNS : []
  const byDerivation = new Map<string, MasdarPattern | undefined>([[derivedMasdar(verb), undefined]])
  for (const pattern of patterns) byDerivation.set(derivedMasdar(verb, [pattern]), pattern)

  const masdars: MasdarPattern[] = []
  const lexicalMasdars: string[] = []

  for (const masdar of sourceMasdars) {
    if (!byDerivation.has(masdar)) {
      lexicalMasdars.push(transliterate(masdar))
      continue
    }
    const pattern = byDerivation.get(masdar)
    if (pattern) masdars.push(pattern)
  }

  return {
    masdars: masdars.length > 0 ? masdars : undefined,
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

  return {
    root: verb.rootId,
    form: verb.form,
    ...(isTriliteralFormIDisplayVerb(verb) ? { vowels: verb.vowels } : {}),
    ...(existing?.hollowContraction ? { hollowContraction: existing.hollowContraction } : {}),
    ...(existing?.contractedImperative ? { contractedImperative: true } : {}),
    ...(masdars ? { masdars } : {}),
    ...(lexicalMasdars ? { lexicalMasdars } : {}),
    ...(selectPassiveVoice(parsed) ? { passiveVoice: selectPassiveVoice(parsed) } : {}),
    ...(parsed.nominals.passiveParticiple ? {} : { noPassiveParticiple: true }),
    ...(existing?.lexicalActiveParticiple ? { lexicalActiveParticiple: existing.lexicalActiveParticiple } : {}),
    ...(existing?.lexicalPassiveParticiple ? { lexicalPassiveParticiple: existing.lexicalPassiveParticiple } : {}),
    ...(existing?.valency?.length ? { valency: existing.valency } : {}),
  }
}

export function upsertRootEntry(roots: readonly RootEntry[], entry: RootEntry): RootEntry[] {
  const index = roots.findIndex((root) => root.root === entry.root && root.form === entry.form)
  const merged = index === -1 ? [...roots, entry] : roots.map((root, at) => (at === index ? entry : root))
  return merged.toSorted((a, b) => (a.root < b.root ? -1 : a.root > b.root ? 1 : a.form - b.form))
}
