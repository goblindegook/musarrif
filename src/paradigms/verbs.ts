import { transliterate, transliterateReverse } from '@pacote/buckwalter'
import rawVerbs from '../data/roots.json'
import { clamp, parseInteger, toRoman } from '../primitives/numbers'
import { conjugatePast } from './active/past'
import type { FormIPattern } from './form-i-vowels'
import { ALL_TENSES, type VerbParadigm } from './tense'
import { tokenize } from './tokens'
import type {
  AllowedFormForRoot,
  DisplayVerb,
  DisplayVerbForRootAndForm,
  HollowContractionBehaviour,
  MasdarPattern,
  Passive,
  QuadriliteralForm,
  QuadriliteralRoot,
  QuadriliteralRootTokens,
  QuadriliteralVerb,
  RootKind,
  RootTokens,
  TriliteralDisplayVerb,
  TriliteralForm,
  TriliteralFormIVerb,
  TriliteralRoot,
  TriliteralRootTokens,
  Valency,
  Verb,
  VerbBase,
} from './verb-types'
import { FORMS, QUADRILITERAL_FORMS } from './verb-types'

export type {
  AllowedFormForRoot,
  DisplayVerb,
  FormIVerb,
  MasdarPattern,
  NonFormIVerb,
  Passive,
  QuadriliteralForm,
  QuadriliteralVerb,
  TriliteralDisplayVerb,
  TriliteralForm,
  TriliteralFormIVerb,
  Valency,
  Verb,
} from './verb-types'
export { FORMS, MASDAR_PATTERNS, QUADRILITERAL_FORMS } from './verb-types'

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
  'Hsb-1-i-a',
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

type RawVerb = {
  root: string
  form: TriliteralForm
  vowels?: FormIPattern
  hollowContraction?: HollowContractionBehaviour
  contractedImperative?: boolean
  passive?: Passive
  masdars?: readonly MasdarPattern[]
  lexicalMasdars?: readonly string[]
  lexicalActiveParticiple?: string
  lexicalPassiveParticiple?: string
  valency?: readonly Valency[]
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

function isFormIVerbInput(verb: Verb): verb is TriliteralFormIVerb {
  return verb.form === 1 && 'vowels' in verb
}

function buildFormIPatternsByRoot(raw: readonly RawVerb[]): Map<string, readonly FormIPattern[]> {
  const byRoot = new Map<string, FormIPattern[]>()
  for (const entry of raw) {
    if (entry.form !== 1 || entry.root.length !== 3) continue
    const patterns = byRoot.get(entry.root) ?? []
    patterns.push(entry.vowels ?? 'a-a')
    byRoot.set(entry.root, patterns)
  }
  for (const patterns of byRoot.values()) patterns.sort()
  return byRoot
}

// Roots with a single Form I row keep the bare `<root>-1` id for that row's vowels. A root with two or
// more gets no bare id at all: every reading is `<root>-1-<vowels>`, ordered alphabetically, and the
// alphabetically-first reading is what a stale bare-id lookup resolves to. A root with no Form I row at
// all (a fully synthetic build) treats the default `a-a` reading as bare; any other synthesized vowel
// pattern must be suffixed too, or two different synthetic readings collide on the same id.
const formIPatternsByRoot = buildFormIPatternsByRoot(rawVerbs as RawVerb[])

function formIVerbId(rootId: string, vowels: FormIPattern): string {
  const patterns = formIPatternsByRoot.get(rootId) ?? []
  const isBareReading = patterns.length === 1 ? patterns[0] === vowels : patterns.length === 0 && vowels === 'a-a'
  return isBareReading ? `${rootId}-1` : `${rootId}-1-${vowels}`
}

function buildDisplayVerb<T extends Verb>(verb: T, synthetic?: true): VerbBase<T> {
  const lemma = String(conjugatePast(verb)['3ms'])
  const rootId = transliterate(verb.root)
  const id = isFormIVerbInput(verb) ? formIVerbId(rootId, verb.vowels) : `${rootId}-${verb.form}`
  return synthetic ? { ...verb, id, lemma, rootId, synthetic } : { ...verb, id, lemma, rootId }
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
            passive: raw.passive,
            valency: raw.valency ?? [],
          }
        : {
            root: toQuadriliteralRoot(root),
            rootTokens,
            form: raw.form as Exclude<QuadriliteralForm, 1>,
            lexicalMasdars: raw.lexicalMasdars,
            passive: raw.passive,
            valency: raw.valency ?? [],
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
      passive: raw.passive,
      contractedImperative: raw.contractedImperative,
      lexicalActiveParticiple: raw.lexicalActiveParticiple,
      valency: raw.valency ?? [],
    })
  }

  return buildDisplayVerb({
    root: toTriliteralRoot(root),
    rootTokens,
    form: raw.form as Exclude<TriliteralForm, 1>,
    lexicalPassiveParticiple: raw.lexicalPassiveParticiple,
    masdars: raw.masdars,
    lexicalMasdars: raw.lexicalMasdars,
    // Form VII supports at most an impersonal passive.
    passive: raw.passive ?? (raw.form === 7 ? 'impersonal' : undefined),
    valency: raw.valency ?? [],
  })
}

export function formsForRoot<Root extends string>(root: Root): readonly AllowedFormForRoot<Root>[] {
  return (isQuadriliteralRoot(root) ? QUADRILITERAL_FORMS : FORMS) as readonly AllowedFormForRoot<Root>[]
}

export function formatFormLabel<Root extends string>(form: AllowedFormForRoot<Root>, root: Root): string {
  return isQuadriliteralRoot(root) ? `${toRoman(form)}q` : toRoman(form)
}

export const verbs: DisplayVerb[] = (rawVerbs as RawVerb[]).map(parseRawVerb)

export function findVerbsByRoot(query: string): readonly DisplayVerb[] {
  return verbs.filter((verb) => verb.root === query)
}

export function findVerbsByRootPrefix(prefix: string): readonly DisplayVerb[] {
  return verbs.filter((verb) => verb.root.startsWith(prefix))
}

export function getVerbById(id: string): DisplayVerb | undefined {
  const [rootId, formText, ...patternParts] = id.split('-')
  const root = transliterateReverse(rootId.length < 3 ? 'Srf' : rootId)
  try {
    tokenizeRoot(root)
  } catch {
    return undefined
  }
  const maxForm = formsForRoot(root).at(-1) ?? 1
  const form = clamp(parseInteger(formText, 1), 1, maxForm) as TriliteralForm
  const pattern = patternParts.length > 0 ? (patternParts.join('-') as FormIPattern) : undefined

  if (isQuadriliteralRoot(root)) return getVerb(root, form as QuadriliteralForm)
  if (form === 1) return getVerb(root, 1, pattern)
  return getVerb(root, form as Exclude<TriliteralForm, 1>)
}

function findVerb<Root extends string, Form extends AllowedFormForRoot<Root>>(
  root: Root,
  form: Form,
  pattern?: FormIPattern,
): DisplayVerbForRootAndForm<Root, Form> | undefined {
  const rootId = /[\u0600-\u06ff]/.test(root) ? transliterate(root) : root
  const formIPattern =
    form === 1 && pattern == null && (formIPatternsByRoot.get(rootId)?.length ?? 0) > 1
      ? formIPatternsByRoot.get(rootId)?.[0]
      : pattern

  return verbs.find((entry) => {
    if (String(entry.root) !== String(root) && entry.rootId !== root) return false
    if (entry.form !== form) return false
    return form !== 1 || formIPattern == null || (isTriliteralFormIDisplayVerb(entry) && entry.vowels === formIPattern)
  }) as DisplayVerbForRootAndForm<Root, Form> | undefined
}

export function getVerb<Root extends string, Form extends AllowedFormForRoot<Root>>(
  root: Root,
  form: Form,
  pattern?: RootKind<Root> extends 'quadriliteral' ? never : FormIPattern,
): DisplayVerbForRootAndForm<Root, Form>
export function getVerb(root: string, form: TriliteralForm, pattern?: FormIPattern): DisplayVerb {
  const existingVerb = findVerb(root, form, pattern)
  if (existingVerb) return existingVerb

  return buildSyntheticVerb(transliterateReverse(root), form, pattern ?? 'a-a')
}

function buildSyntheticVerb(root: string, form: TriliteralForm, pattern: FormIPattern): DisplayVerb {
  const rootTokens = tokenizeRoot(root)

  if (rootTokens.length === 4) {
    const quadriliteralRoot = toQuadriliteralRoot(root)
    const matchingQuadriliteral = verbs.find((entry) => isQuadriliteralVerb(entry) && entry.root === quadriliteralRoot)

    return buildDisplayVerb(
      {
        root: quadriliteralRoot,
        rootTokens,
        form: clamp(form, 1, 4) as QuadriliteralForm,
        valency: matchingQuadriliteral?.valency ?? [],
      },
      true,
    )
  }

  const triliteralRoot = toTriliteralRoot(root)
  const matchingFormI = verbs.find(
    (entry): entry is TriliteralDisplayVerb<1> =>
      isTriliteralFormIDisplayVerb(entry) && entry.root === triliteralRoot && entry.vowels === pattern,
  )
  const matchingNonFormI = verbs.find(
    (entry): entry is TriliteralDisplayVerb<Exclude<TriliteralForm, 1>> =>
      !isTriliteralFormIDisplayVerb(entry) && entry.root === triliteralRoot,
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
          valency: matchingFormI?.valency ?? [],
        }
      : {
          root: triliteralRoot,
          rootTokens,
          form: form as Exclude<TriliteralForm, 1>,
          // Form VII supports at most an impersonal passive.
          passive: form === 7 ? 'impersonal' : undefined,
          valency: matchingNonFormI?.valency ?? [],
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

  return ALL_PARADIGMS.filter((paradigm) => !(paradigm.startsWith('passive') && verb.passive === 'none'))
}
