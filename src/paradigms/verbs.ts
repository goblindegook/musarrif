import { transliterate, transliterateReverse } from '@pacote/buckwalter'
import rawVerbs from '../data/roots.json'
import { clamp, parseInteger, toRoman } from '../primitives/numbers'
import { conjugatePast } from './active/past'
import type { FormIPattern } from './form-i-vowels'
import { ALL_TENSES, type VerbParadigm } from './tense'
import { type Token, tokenize } from './tokens'

export type TriliteralForm = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export type QuadriliteralForm = 1 | 2 | 3 | 4
export type VerbForm = TriliteralForm

export const FORMS: readonly TriliteralForm[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export const QUADRILITERAL_FORMS: readonly QuadriliteralForm[] = [1, 2, 3, 4]

declare const triliteralRootBrand: unique symbol
declare const quadriliteralRootBrand: unique symbol

export type TriliteralRoot = string & { readonly [triliteralRootBrand]: 'triliteral' }
export type QuadriliteralRoot = string & { readonly [quadriliteralRootBrand]: 'quadriliteral' }
export type VerbRoot = TriliteralRoot | QuadriliteralRoot

export const KWN_SISTERS_IDS = new Set([
  'brH-1',
  'byt-1',
  'DHy-4',
  'dwm-1',
  'fkk-7',
  'kwn-1',
  'lys-1',
  'msw-4',
  'SbH-4',
  'Syr-1',
  'Zll-1',
  'zwl-1',
  "ft'-1",
])
export const ZNN_SISTERS_IDS = new Set([
  'dry-1',
  'Elm-1',
  'Hsb-1',
  'lfw-4',
  'wjd-1',
  'xyl-1',
  'Znn-1',
  "r'y-1",
  'Edd-1',
  'jEl-1',
  'Syr-2',
  'trk-1',
  "'x*-8",
])

type RootLength<Value extends string, Acc extends readonly unknown[] = []> = string extends Value
  ? number
  : Value extends `${infer _}${infer Rest}`
    ? RootLength<Rest, [...Acc, unknown]>
    : Acc['length']

type RootKind<Value extends string> = Value extends TriliteralRoot
  ? 'triliteral'
  : Value extends QuadriliteralRoot
    ? 'quadriliteral'
    : RootLength<Value> extends 3
      ? 'triliteral'
      : RootLength<Value> extends 4
        ? 'quadriliteral'
        : 'unknown'

export type AllowedFormForRoot<Value extends string> =
  RootKind<Value> extends 'quadriliteral'
    ? QuadriliteralForm
    : RootKind<Value> extends 'triliteral'
      ? TriliteralForm
      : VerbForm

export type TriliteralRootTokens = readonly [Token, Token, Token]
export type QuadriliteralRootTokens = readonly [Token, Token, Token, Token]
export type RootTokens = TriliteralRootTokens | QuadriliteralRootTokens

export type MasdarPattern = (typeof MASDAR_PATTERNS)[number]
export type PassiveVoice = 'none' | 'impersonal'
export type HollowContractionBehaviour = 'contracted' | 'uncontracted'

type VerbProps<Root extends VerbRoot, Tokens extends RootTokens, Form extends number> = {
  root: Root
  rootTokens: Tokens
  form: Form
  masdars?: readonly MasdarPattern[]
  lexicalMasdars?: readonly string[]
  passiveVoice?: PassiveVoice
  noPassiveParticiple?: boolean
}

export type TriliteralFormIVerb = VerbProps<TriliteralRoot, TriliteralRootTokens, 1> & {
  vowels: FormIPattern
  hollowContraction?: HollowContractionBehaviour
  contractedImperative?: boolean
  lexicalActiveParticiple?: string
}

export type TriliteralNonFormIVerb = VerbProps<TriliteralRoot, TriliteralRootTokens, Exclude<TriliteralForm, 1>>
export type TriliteralVerb = TriliteralFormIVerb | TriliteralNonFormIVerb

export type QuadriliteralVerb = VerbProps<QuadriliteralRoot, QuadriliteralRootTokens, QuadriliteralForm>

export type FormIVerb = TriliteralFormIVerb
export type NonFormIVerb = TriliteralNonFormIVerb
export type Verb = TriliteralVerb | QuadriliteralVerb

type VerbBase<T extends Verb> = T & {
  id: string
  lemma: string
  rootId: string
  synthetic?: true
}

export type DisplayVerb<T extends Verb | VerbForm = Verb> = T extends Verb
  ? VerbBase<T>
  : VerbBase<Extract<Verb, { form: T }>>

export type TriliteralDisplayVerb<Form extends TriliteralForm = TriliteralForm> = VerbBase<
  Extract<TriliteralVerb, { form: Form }>
>
export type QuadriliteralDisplayVerb<Form extends QuadriliteralForm = QuadriliteralForm> = VerbBase<
  Extract<QuadriliteralVerb, { form: Form }>
>

type VerbForRootAndForm<Root extends string, Form extends AllowedFormForRoot<Root>> =
  RootKind<Root> extends 'quadriliteral'
    ? QuadriliteralVerb
    : RootKind<Root> extends 'triliteral'
      ? Form extends 1
        ? TriliteralFormIVerb
        : TriliteralNonFormIVerb
      : Form extends 1
        ? Extract<Verb, { form: 1 }>
        : Exclude<Verb, { form: 1 }>

type DisplayVerbForRootAndForm<Root extends string, Form extends AllowedFormForRoot<Root>> = VerbBase<
  VerbForRootAndForm<Root, Form>
>

export const MASDAR_PATTERNS = [
  // Basic
  'fa3l', // simple action
  'fi3l', // mental states, abstract qualities
  'fu3l', // inherent states, qualities
  'fa3al', // abstract result
  'fa3il', // action (uncommon)
  // Extended vowel
  'fa3aal', // extended activity, occupation
  'fa3iil', // sometimes adjective-like (rare)
  'fi3aal', // ongoing action
  'fu3aal', // bodily state, sound, illness (uncommon)
  'fu3ool', // movement, transition, repeated action
  'fa3alaan', // ongoing process
  'fu3laan', // state or condition
  // Feminine
  'fa3aala', // profession, craft, continued activity
  'fa3la', // single concrete event
  'fi3aala', // process, organized activity
  'fi3la', // single concrete event
  'fu3la', // single concrete event
  // Uncommon
  'fi3al', // inherent qualities
  // Mimi
  'mimi',
] as const

type RawVerb = {
  root: string
  form: VerbForm
  vowels?: FormIPattern
  hollowContraction?: HollowContractionBehaviour
  masdars?: readonly MasdarPattern[]
  lexicalMasdars?: readonly string[]
  lexicalActiveParticiple?: string
  passiveVoice?: PassiveVoice
  noPassiveParticiple?: boolean
  contractedImperative?: boolean
}

function tokenizeRoot(root: string): RootTokens {
  const rootTokens = tokenize(root)
  if (rootTokens.length === 3) return rootTokens as TriliteralRootTokens
  if (rootTokens.length === 4) return rootTokens as QuadriliteralRootTokens
  throw new Error(`Unsupported root length ${rootTokens.length} for ${root}`)
}

function isTriliteralRoot(root: string): root is TriliteralRoot {
  return root.length === 3
}

function isQuadriliteralRoot(root: string): root is QuadriliteralRoot {
  return root.length === 4
}

export function toTriliteralRoot(root: string): TriliteralRoot {
  if (!isTriliteralRoot(root)) throw new Error(`Expected triliteral root, received ${root}`)
  return root
}

function toQuadriliteralRoot(root: string): QuadriliteralRoot {
  if (!isQuadriliteralRoot(root)) throw new Error(`Expected quadriliteral root, received ${root}`)
  return root
}

export function isQuadriliteralVerb(verb: Verb): verb is QuadriliteralVerb {
  return verb.rootTokens.length === 4
}

export function isTriliteralFormIVerb(verb: Verb): verb is TriliteralFormIVerb {
  return verb.form === 1 && verb.rootTokens.length === 3
}

export function isTriliteralFormIDisplayVerb(verb: DisplayVerb): verb is TriliteralDisplayVerb<1> {
  return verb.form === 1 && verb.rootTokens.length === 3
}

function buildDisplayVerb<T extends Verb>(verb: T, synthetic?: true): VerbBase<T> {
  const lemma = String(conjugatePast(verb)['3ms'])
  const rootId = transliterate(verb.root)
  return synthetic
    ? { ...verb, id: `${rootId}-${verb.form}`, lemma, rootId, synthetic }
    : { ...verb, id: `${rootId}-${verb.form}`, lemma, rootId }
}

function parseRawVerb(raw: RawVerb): DisplayVerb {
  const rootId = raw.root
  const root = transliterateReverse(rootId)
  const rootTokens = tokenizeRoot(root)

  if (rootTokens.length === 4) {
    if (!QUADRILITERAL_FORMS.includes(raw.form as QuadriliteralForm))
      throw new Error(`Quadriliteral root ${root} cannot use Form ${raw.form}`)

    return buildDisplayVerb(
      raw.form === 1
        ? {
            root: toQuadriliteralRoot(root),
            rootTokens,
            form: 1,
            masdars: raw.masdars,
            lexicalMasdars: raw.lexicalMasdars,
            passiveVoice: raw.passiveVoice,
            noPassiveParticiple: raw.noPassiveParticiple,
          }
        : {
            root: toQuadriliteralRoot(root),
            rootTokens,
            form: raw.form as Exclude<QuadriliteralForm, 1>,
            lexicalMasdars: raw.lexicalMasdars,
            passiveVoice: raw.passiveVoice,
            noPassiveParticiple: raw.noPassiveParticiple,
          },
    )
  }

  if (raw.form === 1) {
    return buildDisplayVerb({
      root: toTriliteralRoot(root),
      rootTokens,
      form: 1,
      vowels: raw.vowels ?? 'a-a',
      hollowContraction: raw.hollowContraction,
      masdars: raw.masdars,
      lexicalMasdars: raw.lexicalMasdars,
      passiveVoice: raw.passiveVoice,
      noPassiveParticiple: raw.noPassiveParticiple,
      contractedImperative: raw.contractedImperative,
      lexicalActiveParticiple: raw.lexicalActiveParticiple,
    })
  }

  return buildDisplayVerb({
    root: toTriliteralRoot(root),
    rootTokens,
    form: raw.form as Exclude<TriliteralForm, 1>,
    lexicalMasdars: raw.lexicalMasdars,
    // Form VII supports at most an impersonal passive.
    passiveVoice: raw.passiveVoice ?? (raw.form === 7 ? 'impersonal' : undefined),
    noPassiveParticiple: raw.noPassiveParticiple,
  })
}

export function formsForRoot<Root extends string>(root: Root): readonly AllowedFormForRoot<Root>[] {
  return (isQuadriliteralRoot(root) ? QUADRILITERAL_FORMS : FORMS) as readonly AllowedFormForRoot<Root>[]
}

export function formatFormLabel<Root extends string>(form: AllowedFormForRoot<Root>, root: Root): string {
  return isQuadriliteralRoot(root) ? `${toRoman(form)}q` : toRoman(form)
}

export const verbs: DisplayVerb[] = (rawVerbs as RawVerb[]).map(parseRawVerb)

const verbsById = new Map<string, DisplayVerb>()
for (const verb of verbs) verbsById.set(verb.id, verb)

export function findVerbsByRoot(query: string): readonly DisplayVerb[] {
  return verbs.filter((verb) => verb.root === query)
}

export function findVerbsByRootPrefix(prefix: string): readonly DisplayVerb[] {
  return verbs.filter((verb) => verb.root.startsWith(prefix))
}

export function getVerbById(id?: string): DisplayVerb | undefined {
  return id ? verbsById.get(id) : undefined
}

export function getVerb<Root extends string, Form extends AllowedFormForRoot<Root>>(
  root: Root,
  form: Form,
): VerbForRootAndForm<Root, Form> {
  const verbByRoot = verbs.find((entry) => String(entry.root) === String(root) && entry.form === form)
  if (verbByRoot) return verbByRoot as unknown as VerbForRootAndForm<Root, Form>
  const verbById = getVerbById(`${root}-${form}`)
  if (verbById) return verbById as unknown as VerbForRootAndForm<Root, Form>
  throw new Error(`Verb with root ${root} and form ${form} not found`)
}

export function buildVerbFromId(id = ''): DisplayVerb {
  const existingVerb = getVerbById(id)
  if (existingVerb) return existingVerb

  const [rootId, formText] = id.split('-')
  const root = transliterateReverse(rootId.length < 3 ? 'Srf' : rootId)
  const maxForm = formsForRoot(root).at(-1) ?? 1
  const form = clamp(parseInteger(formText, 1), 1, maxForm) as VerbForm

  if (isQuadriliteralRoot(root)) return synthesizeVerb(root, form as QuadriliteralForm)
  if (form === 1) return synthesizeVerb(root, 1, 'a-a')
  return synthesizeVerb(root, form as Exclude<TriliteralForm, 1>)
}

export function synthesizeVerb<Root extends string, Form extends AllowedFormForRoot<Root>>(
  root: Root,
  form: Form,
  pattern?: RootKind<Root> extends 'quadriliteral' ? never : FormIPattern,
): DisplayVerbForRootAndForm<Root, Form>
export function synthesizeVerb(root: string, form: VerbForm, pattern: FormIPattern = 'a-a'): DisplayVerb {
  const rootTokens = tokenizeRoot(root)

  if (rootTokens.length === 4) {
    if (!QUADRILITERAL_FORMS.includes(form as QuadriliteralForm))
      throw new Error(`Quadriliteral root ${root} cannot use Form ${form}`)

    return buildDisplayVerb(
      {
        root: toQuadriliteralRoot(root),
        rootTokens,
        form: form as QuadriliteralForm,
      },
      true,
    )
  }

  const triliteralRoot = toTriliteralRoot(root)
  const matchingFormI = verbs.find(
    (entry): entry is TriliteralDisplayVerb<1> =>
      isTriliteralFormIDisplayVerb(entry) && entry.root === triliteralRoot && entry.vowels === pattern,
  )

  return buildDisplayVerb(
    form === 1
      ? {
          root: triliteralRoot,
          rootTokens,
          form: 1,
          vowels: pattern,
          masdars: matchingFormI?.masdars,
          lexicalMasdars: matchingFormI?.lexicalMasdars ?? [],
          lexicalActiveParticiple: matchingFormI?.lexicalActiveParticiple,
        }
      : {
          root: triliteralRoot,
          rootTokens,
          form: form as Exclude<TriliteralForm, 1>,
          // Form VII supports at most an impersonal passive.
          passiveVoice: form === 7 ? 'impersonal' : undefined,
        },
    true,
  )
}

const ALL_PARADIGMS: readonly VerbParadigm[] = [...ALL_TENSES, 'active.participle', 'passive.participle', 'masdar']

export function getAvailableParadigms(verb: Verb): VerbParadigm[] {
  if (isTriliteralFormIVerb(verb) && verb.root === 'ليس') return ['active.past']
  if (isTriliteralFormIVerb(verb) && verb.root === 'زيل')
    return [
      'active.past',
      'active.present.indicative',
      'active.present.subjunctive',
      'active.present.jussive',
      'active.future',
    ]

  return ALL_PARADIGMS.filter((paradigm) => {
    if (paradigm.startsWith('passive') && (verb.form === 9 || verb.passiveVoice === 'none')) return false
    if (paradigm === 'passive.participle' && verb.noPassiveParticiple) return false
    return true
  })
}
