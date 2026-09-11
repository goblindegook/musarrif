import type { FormIPattern } from './form-i-vowels'
import type { Token } from './tokens'

export const FORMS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const
export const QUADRILITERAL_FORMS = [1, 2, 3, 4] as const

export type TriliteralForm = (typeof FORMS)[number]
export type QuadriliteralForm = (typeof QUADRILITERAL_FORMS)[number]

declare const triliteralRootBrand: unique symbol
declare const quadriliteralRootBrand: unique symbol

export type TriliteralRoot = string & { readonly [triliteralRootBrand]: 'triliteral' }
export type QuadriliteralRoot = string & { readonly [quadriliteralRootBrand]: 'quadriliteral' }

type RootLength<Value extends string, Acc extends readonly unknown[] = []> = string extends Value
  ? number
  : Value extends `${infer _}${infer Rest}`
    ? RootLength<Rest, [...Acc, unknown]>
    : Acc['length']

export type RootKind<Value extends string> = Value extends TriliteralRoot
  ? 'triliteral'
  : Value extends QuadriliteralRoot
    ? 'quadriliteral'
    : RootLength<Value> extends 3
      ? 'triliteral'
      : RootLength<Value> extends 4
        ? 'quadriliteral'
        : 'unknown'

export type AllowedFormForRoot<Value extends string> =
  RootKind<Value> extends 'quadriliteral' ? QuadriliteralForm : TriliteralForm

export type TriliteralRootTokens = readonly [Token, Token, Token]
export type QuadriliteralRootTokens = readonly [Token, Token, Token, Token]
export type RootTokens = TriliteralRootTokens | QuadriliteralRootTokens

export const MASDAR_PATTERNS = [
  'fa3l',
  'fi3l',
  'fu3l',
  'fa3al',
  'fa3il',
  'fa3aal',
  'fa3iil',
  'fi3aal',
  'fu3aal',
  'fu3ool',
  'fa3alaan',
  'fu3laan',
  'fa3aala',
  'fa3la',
  'fi3aala',
  'fi3la',
  'fu3la',
  'fi3al',
  'mimi',
] as const

export type MasdarPattern = (typeof MASDAR_PATTERNS)[number]
export type PassiveVoice = 'none' | 'impersonal'
export type Valency = 1 | 2 | 3
export type HollowContractionBehaviour = 'contracted' | 'uncontracted'

type VerbProps<Root extends TriliteralRoot | QuadriliteralRoot, Tokens extends RootTokens, Form extends number> = {
  root: Root
  rootTokens: Tokens
  form: Form
  masdars?: readonly MasdarPattern[]
  lexicalMasdars?: readonly string[]
  passiveVoice?: PassiveVoice
  lexicalPassiveParticiple?: string
  valency: readonly Valency[]
}

export type TriliteralFormIVerb = VerbProps<TriliteralRoot, TriliteralRootTokens, 1> & {
  vowels: FormIPattern
  hollowContraction?: HollowContractionBehaviour
  contractedImperative?: boolean
  lexicalActiveParticiple?: string
}

export type TriliteralNonFormIVerb = VerbProps<TriliteralRoot, TriliteralRootTokens, Exclude<TriliteralForm, 1>>
type TriliteralVerb = TriliteralFormIVerb | TriliteralNonFormIVerb

export type QuadriliteralVerb = VerbProps<QuadriliteralRoot, QuadriliteralRootTokens, QuadriliteralForm>

export type FormIVerb = TriliteralFormIVerb
export type NonFormIVerb = TriliteralNonFormIVerb
export type Verb = TriliteralVerb | QuadriliteralVerb

export type VerbBase<T extends Verb> = T & {
  id: string
  lemma: string
  rootId: string
  synthetic?: true
}

export type DisplayVerb<T extends Verb | TriliteralForm = Verb> = T extends Verb
  ? VerbBase<T>
  : VerbBase<Extract<Verb, { form: T }>>

export type TriliteralDisplayVerb<Form extends TriliteralForm = TriliteralForm> = VerbBase<
  Extract<TriliteralVerb, { form: Form }>
>

export type VerbForRootAndForm<Root extends string, Form extends AllowedFormForRoot<Root>> =
  RootKind<Root> extends 'quadriliteral'
    ? QuadriliteralVerb
    : RootKind<Root> extends 'triliteral'
      ? Form extends 1
        ? TriliteralFormIVerb
        : TriliteralNonFormIVerb
      : Form extends 1
        ? Extract<Verb, { form: 1 }>
        : Exclude<Verb, { form: 1 }>

export type DisplayVerbForRootAndForm<Root extends string, Form extends AllowedFormForRoot<Root>> = VerbBase<
  VerbForRootAndForm<Root, Form>
>
