import { annotate, type Morpheme } from './annotation'
import type { FormIPattern } from './form-i-vowels'
import { DAL, type LetterToken, normalizeForComparison, resolveFormVIIIInfixConsonant, TAH } from './letters'
import { deriveMasdar } from './nominal/masdar'
import type { PronounId } from './pronouns'
import { analyzeRoot, type RootAnalysisType } from './roots'
import type { VerbTense } from './tense'
import type { Verb, VerbForm } from './verbs'

type FormRootInteraction = 'assimilation-complete' | 'assimilation-voicing' | 'assimilation-emphasis'

type TenseRootInteraction =
  | 'final-drops'
  | 'final-isolated'
  | 'final-lengthens-ii'
  | 'final-lengthens-uu'
  | 'final-passive'
  | 'final-resurfaces'
  | 'geminate-contracts'
  | 'geminate-jussive'
  | 'hamza-seat'
  | 'initial-drops'
  | 'middle-lengthens-aa'
  | 'middle-lengthens-ii'
  | 'middle-lengthens-uu'
  | 'middle-passive-aa'
  | 'middle-passive-ii'
  | 'middle-shortens'

export type NominalKind = 'activeParticiple' | 'passiveParticiple' | 'masdar'

export type ExplanationLayers = {
  rootLetters: string[]
  arabic: string | readonly string[]
  rootType?: RootAnalysisType
  form?: VerbForm
  vowels?: FormIPattern
  formRoot?: FormRootInteraction
  tense?: VerbTense
  tenseRoot?: TenseRootInteraction
  pronoun?: PronounId
  nominal?: NominalKind
  nominalMimiMasdar?: boolean
  prefix?: string
  suffix?: string
}

function toArabicText(arabic: string | readonly string[]): string {
  return Array.isArray(arabic) ? arabic.join('، ') : (arabic as string)
}

function resolveHollow(rootType: RootAnalysisType, tenseContext: VerbTense): TenseRootInteraction {
  const isWaw = rootType.includes('waw')
  switch (tenseContext) {
    case 'active.past':
      return isWaw ? 'middle-lengthens-aa' : 'middle-lengthens-ii'
    case 'active.present.indicative':
    case 'active.present.subjunctive':
    case 'active.future':
      return isWaw ? 'middle-lengthens-uu' : 'middle-lengthens-ii'
    case 'active.present.jussive':
    case 'active.imperative':
      return 'middle-shortens'
    case 'passive.past':
      return 'middle-passive-ii'
    case 'passive.present.indicative':
    case 'passive.present.subjunctive':
    case 'passive.present.jussive':
    case 'passive.future':
      return 'middle-passive-aa'
  }
}

function resolveDefective(
  rootType: RootAnalysisType,
  tenseContext: VerbTense,
  pronoun: PronounId,
): TenseRootInteraction {
  const isWaw = rootType.includes('waw')
  switch (tenseContext) {
    case 'active.past':
      return ['3ms', '3fs', '3mp', '3md', '3fd'].includes(pronoun) ? 'final-isolated' : 'final-resurfaces'
    case 'active.present.indicative':
    case 'active.present.subjunctive':
    case 'active.future':
      return isWaw ? 'final-lengthens-uu' : 'final-lengthens-ii'
    case 'active.present.jussive':
    case 'active.imperative':
      return 'final-drops'
    case 'passive.past':
    case 'passive.present.indicative':
    case 'passive.present.subjunctive':
    case 'passive.present.jussive':
    case 'passive.future':
      return 'final-passive'
  }
}

const FORM_I_BASE_PATTERNS: Record<
  FormIPattern,
  { basePattern: string; pastVowel: string; arabicForm: string; arabicVowel: string }
> = {
  'a-a': { basePattern: 'faʿala (فَعَلَ)', pastVowel: 'fatḥa', arabicForm: 'فَعَلَ', arabicVowel: 'فتحة' },
  'a-i': { basePattern: 'faʿala (فَعَلَ)', pastVowel: 'fatḥa', arabicForm: 'فَعَلَ', arabicVowel: 'فتحة' },
  'a-u': { basePattern: 'faʿala (فَعَلَ)', pastVowel: 'fatḥa', arabicForm: 'فَعَلَ', arabicVowel: 'فتحة' },
  'i-a': { basePattern: 'faʿila (فَعِلَ)', pastVowel: 'kasra', arabicForm: 'فَعِلَ', arabicVowel: 'كسرة' },
  'i-i': { basePattern: 'faʿila (فَعِلَ)', pastVowel: 'kasra', arabicForm: 'فَعِلَ', arabicVowel: 'كسرة' },
  'i-u': { basePattern: 'faʿila (فَعِلَ)', pastVowel: 'kasra', arabicForm: 'فَعِلَ', arabicVowel: 'كسرة' },
  'u-a': { basePattern: 'faʿula (فَعُلَ)', pastVowel: 'ḍamma', arabicForm: 'فَعُلَ', arabicVowel: 'ضمة' },
  'u-i': { basePattern: 'faʿula (فَعُلَ)', pastVowel: 'ḍamma', arabicForm: 'فَعُلَ', arabicVowel: 'ضمة' },
  'u-u': { basePattern: 'faʿula (فَعُلَ)', pastVowel: 'ḍamma', arabicForm: 'فَعُلَ', arabicVowel: 'ضمة' },
}

function renderPronounParagraph(
  layers: ExplanationLayers,
  t: (key: string, params?: Record<string, string>) => string,
): string {
  const params = { pronounLabel: t(`pronoun.${layers.pronoun}`), arabic: toArabicText(layers.arabic) }
  const prefix = layers.prefix ? `${layers.prefix}ـ` : undefined
  const suffix = layers.suffix ? `ـ${layers.suffix}` : undefined

  if (prefix && suffix) return t('explanation.pronoun.prefix-and-suffix', { ...params, prefix, suffix })
  if (suffix) return t('explanation.pronoun.suffix-only', { ...params, suffix })
  if (prefix) return t('explanation.pronoun.prefix-only', { ...params, prefix })
  return t('explanation.pronoun.base-form', params)
}

export function renderExplanation(
  layers: ExplanationLayers,
  t: (key: string, params?: Record<string, string>) => string,
): string[] {
  const formIBaseParams = layers.vowels ? FORM_I_BASE_PATTERNS[layers.vowels] : {}
  const params = {
    root: layers.rootLetters?.join('-') ?? '',
    arabic: toArabicText(layers.arabic),
    form: layers.form == null ? '' : String(layers.form),
    ...formIBaseParams,
  }

  const tenseRootSentence = layers.tenseRoot ? t(`explanation.tense-root.${layers.tenseRoot}`, params) : ''

  return [
    [
      layers.rootType && t(`explanation.root.${layers.rootType}`, params),
      layers.form != null && t(`explanation.form.${layers.form}`, params),
      layers.vowels && t(`explanation.form-i-pattern.${layers.vowels}`, params),
      layers.formRoot && t(`explanation.form-root.${layers.formRoot}`, params),
    ],
    [
      layers.nominal ? t(`explanation.nominal.${layers.nominal}`, params) : '',
      layers.nominalMimiMasdar ? t('explanation.nominal.mimiMasdar', params) : '',
      layers.tense?.startsWith('passive') ? t(`explanation.voice.${layers.tense}`, params) : '',
      layers.tense && t(`explanation.tense.${layers.tense}`, params),
      layers.form === 1 && layers.tense === 'active.past' ? t('explanation.tense.active.past.form-i', params) : '',
      tenseRootSentence,
    ],
    [layers.tense && layers.pronoun && renderPronounParagraph(layers, t)],
  ]
    .map((paragraph) => paragraph.filter(Boolean).join(' '))
    .filter(Boolean)
}

function extractAffixes(morphemes: Morpheme[]): { prefix?: string; suffix?: string } {
  const stemRoles = ['root', 'form']
  const firstStemIdx = morphemes.findIndex((m) => stemRoles.includes(m.role))
  const lastStemIdx = morphemes.findLastIndex((m) => stemRoles.includes(m.role))

  if (firstStemIdx === -1) return {}

  const pre = morphemes.slice(0, firstStemIdx).filter((m) => m.role !== 'dropped')
  const post = morphemes.slice(lastStemIdx + 1).filter((m) => m.role !== 'dropped')

  return {
    prefix: pre.length ? pre.map((m) => m.text).join('') : undefined,
    suffix: post.length ? post.map((m) => m.text).join('') : undefined,
  }
}

export function resolveVerbExplanationLayers(
  verb: Verb,
  verbTense: VerbTense,
  pronoun: PronounId,
  arabic: string,
): ExplanationLayers {
  const rootType = analyzeRoot(verb.rootTokens).type
  const tense = verbTense
  const annotatedForm = annotate(verb, verbTense, pronoun)
  const finalStep = annotatedForm?.steps[annotatedForm.steps.length - 1]
  const { prefix, suffix } = finalStep ? extractAffixes(finalStep.morphemes) : {}
  return {
    rootLetters: Array.from(verb.root),
    form: verb.form,
    arabic,
    rootType,
    vowels: verb.form === 1 ? verb.vowels : undefined,
    formRoot: toFormRoot(verb.form, verb.rootTokens),
    tense,
    tenseRoot: toTenseRoot(rootType, tense, verb.form, pronoun),
    pronoun,
    prefix,
    suffix,
  }
}

function toFormRoot(form: VerbForm, [c1]: readonly LetterToken[]): FormRootInteraction | undefined {
  if (form !== 8) return
  const infixConsonant = resolveFormVIIIInfixConsonant(c1)
  if (infixConsonant === c1) return 'assimilation-complete'
  if (infixConsonant === DAL) return 'assimilation-voicing'
  if (infixConsonant === TAH) return 'assimilation-emphasis'
}

function toTenseRoot(
  rootType: RootAnalysisType,
  tenseContext: VerbTense,
  form: VerbForm,
  pronoun: PronounId,
): TenseRootInteraction | undefined {
  if (rootType.includes('hollow')) return resolveHollow(rootType, tenseContext)
  if (rootType.includes('defective')) return resolveDefective(rootType, tenseContext, pronoun)
  if (rootType === 'assimilated')
    return tenseContext.startsWith('active.present') && form === 1 ? 'initial-drops' : undefined
  if (rootType === 'doubled' || rootType === 'hamzated-doubled') return resolveGeminate(tenseContext, form)
  if (rootType === 'hamzated') return 'hamza-seat'
}

function resolveGeminate(tenseContext: VerbTense, form: VerbForm): TenseRootInteraction | undefined {
  if (form === 2 || form === 5) return undefined
  return tenseContext === 'active.present.jussive' || tenseContext === 'active.imperative'
    ? 'geminate-jussive'
    : 'geminate-contracts'
}

function isMimiMasdarSelection(verb: Verb, arabic: string | readonly string[]): boolean {
  if (verb.form !== 1) return false

  const selectedValues = (Array.isArray(arabic) ? arabic : [arabic]).map(normalizeForComparison)
  const patterns = verb.masdars ?? ['mimi']

  return deriveMasdar(verb).some(
    (masdar, index) => patterns[index] === 'mimi' && selectedValues.includes(normalizeForComparison(masdar)),
  )
}

export function resolveNominalExplanationLayers(
  verb: Verb,
  nominal: NominalKind,
  arabic: string | readonly string[],
): ExplanationLayers {
  return {
    rootLetters: Array.from(verb.root),
    form: verb.form,
    arabic,
    rootType: analyzeRoot(verb.rootTokens).type,
    vowels: verb.form === 1 ? verb.vowels : undefined,
    formRoot: toFormRoot(verb.form, verb.rootTokens),
    nominal,
    nominalMimiMasdar: nominal === 'masdar' && isMimiMasdarSelection(verb, arabic),
  }
}
