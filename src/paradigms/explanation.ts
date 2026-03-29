import type { FormIPattern } from './form-i-vowels'
import { WAW } from './letters'
import type { PronounId } from './pronouns'
import { analyzeRoot, type RootAnalysisType } from './roots'
import type { VerbTense } from './tense'
import type { Verb, VerbForm } from './verbs'

export type TenseContext =
  | 'active.past'
  | 'active.present.indicative'
  | 'active.present.subjunctive'
  | 'active.present.jussive'
  | 'active.future'
  | 'active.imperative'
  | 'passive.past'
  | 'passive.present.indicative'
  | 'passive.present.subjunctive'
  | 'passive.present.jussive'
  | 'passive.future'

type FormRootInteraction = 'assimilation-waw' | 'assimilation-yaa' | 'assimilation-doubled'

type TenseRootInteraction =
  | 'middle-lengthens-aa'
  | 'middle-lengthens-ii'
  | 'middle-lengthens-uu'
  | 'middle-passive-ii'
  | 'middle-passive-aa'
  | 'middle-shortens'
  | 'final-isolated'
  | 'final-resurfaces'
  | 'final-lengthens-uu'
  | 'final-lengthens-ii'
  | 'final-passive'
  | 'final-drops'
  | 'initial-drops'
  | 'geminate-contracts'
  | 'geminate-jussive'
  | 'hamza-seat'

export type ExplanationLayers = {
  rootLetters: string[]
  arabic: string
  rootType?: RootAnalysisType
  form?: VerbForm
  formIPattern?: FormIPattern
  formRoot?: FormRootInteraction
  tense?: TenseContext
  tenseRoot?: TenseRootInteraction
  pronoun?: PronounId
}

function toTenseContext(verbTense: VerbTense): TenseContext {
  const [voice, tenseOrMood, mood] = verbTense
  if (tenseOrMood === 'imperative') return 'active.imperative'
  if (tenseOrMood === 'present') return `${voice}.present.${mood}` as TenseContext
  return `${voice}.${tenseOrMood}` as TenseContext
}

function toFormRoot(
  form: VerbForm,
  rootType: RootAnalysisType,
  rootLetters: string[],
): FormRootInteraction | undefined {
  if (form !== 8) return undefined
  if (rootType === 'assimilated') return rootLetters[0] === WAW ? 'assimilation-waw' : 'assimilation-yaa'
  if (rootType === 'doubled') return 'assimilation-doubled'
  return undefined
}

function resolveHollow(rootType: RootAnalysisType, tenseContext: TenseContext): TenseRootInteraction {
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
  tenseContext: TenseContext,
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

function resolveGeminate(tenseContext: TenseContext, form: VerbForm): TenseRootInteraction | undefined {
  if (form === 2 || form === 5) return undefined
  return tenseContext === 'active.present.jussive' || tenseContext === 'active.imperative'
    ? 'geminate-jussive'
    : 'geminate-contracts'
}

function toTenseRoot(
  rootType: RootAnalysisType,
  tenseContext: TenseContext,
  form: VerbForm,
  pronoun: PronounId,
): TenseRootInteraction | undefined {
  if (rootType.includes('hollow')) return resolveHollow(rootType, tenseContext)

  if (rootType.includes('defective')) return resolveDefective(rootType, tenseContext, pronoun)

  if (rootType === 'assimilated')
    return tenseContext.startsWith('active.present') && form === 1 ? 'initial-drops' : undefined

  if (rootType === 'doubled' || rootType === 'hamzated-doubled') return resolveGeminate(tenseContext, form)

  if (rootType === 'hamzated') return 'hamza-seat'

  return undefined
}

const FORM_I_BASE_PATTERNS: Record<
  FormIPattern,
  { basePattern: string; pastVowel: string; arabicForm: string; arabicVowel: string }
> = {
  'fa3ala-yaf3alu': { basePattern: 'faʿala (فَعَلَ)', pastVowel: 'fatḥa', arabicForm: 'فَعَلَ', arabicVowel: 'فتحة' },
  'fa3ala-yaf3ilu': { basePattern: 'faʿala (فَعَلَ)', pastVowel: 'fatḥa', arabicForm: 'فَعَلَ', arabicVowel: 'فتحة' },
  'fa3ala-yaf3ulu': { basePattern: 'faʿala (فَعَلَ)', pastVowel: 'fatḥa', arabicForm: 'فَعَلَ', arabicVowel: 'فتحة' },
  'fa3ila-yaf3alu': { basePattern: 'faʿila (فَعِلَ)', pastVowel: 'kasra', arabicForm: 'فَعِلَ', arabicVowel: 'كسرة' },
  'fa3ila-yaf3ilu': { basePattern: 'faʿila (فَعِلَ)', pastVowel: 'kasra', arabicForm: 'فَعِلَ', arabicVowel: 'كسرة' },
  'fa3ila-yaf3ulu': { basePattern: 'faʿila (فَعِلَ)', pastVowel: 'kasra', arabicForm: 'فَعِلَ', arabicVowel: 'كسرة' },
  'fa3ula-yaf3alu': { basePattern: 'faʿula (فَعُلَ)', pastVowel: 'ḍamma', arabicForm: 'فَعُلَ', arabicVowel: 'ضمة' },
  'fa3ula-yaf3ilu': { basePattern: 'faʿula (فَعُلَ)', pastVowel: 'ḍamma', arabicForm: 'فَعُلَ', arabicVowel: 'ضمة' },
  'fa3ula-yaf3ulu': { basePattern: 'faʿula (فَعُلَ)', pastVowel: 'ḍamma', arabicForm: 'فَعُلَ', arabicVowel: 'ضمة' },
}

export function renderExplanation(
  layers: ExplanationLayers,
  t: (key: string, params?: Record<string, string>) => string,
  mode: 'full' | 'concise',
): string[] {
  const formIBaseParams = layers.formIPattern ? FORM_I_BASE_PATTERNS[layers.formIPattern] : {}
  const params = {
    root: layers.rootLetters?.join('-') ?? '',
    arabic: layers.arabic ?? '',
    form: layers.form == null ? '' : String(layers.form),
    ...formIBaseParams,
  }

  const tenseRootSentence = layers.tenseRoot ? t(`explanation.tense-root.${layers.tenseRoot}`, params) : ''
  if (mode === 'concise') return [tenseRootSentence].filter(Boolean)

  return [
    [
      layers.rootType && t(`explanation.root.${layers.rootType}`, params),
      layers.form != null && t(`explanation.form.${layers.form}`, params),
      layers.formIPattern && t(`explanation.form-i-pattern.${layers.formIPattern}`, params),
      layers.formRoot && t(`explanation.form-root.${layers.formRoot}`, params),
    ],
    [
      layers.tense?.startsWith('passive.') ? t(`explanation.voice.${layers.tense}`, params) : '',
      layers.tense && t(`explanation.tense.${layers.tense}`, params),
      layers.form === 1 && layers.tense === 'active.past' ? t('explanation.tense.active.past.form-i', params) : '',
      tenseRootSentence,
    ],
    [layers.tense && layers.pronoun ? t(`explanation.pronoun.${layers.tense}.${layers.pronoun}`, params) : ''],
  ]
    .map((paragraph) => paragraph.filter(Boolean).join(' '))
    .filter(Boolean)
}

export function resolveVerbExplanationLayers(
  verb: Verb,
  verbTense: VerbTense,
  pronoun: PronounId,
  arabic: string,
): ExplanationLayers {
  const rootLetters = Array.from(verb.root)
  const rootType = analyzeRoot(verb.root).type
  const tense = toTenseContext(verbTense)
  return {
    rootLetters,
    form: verb.form,
    arabic,
    rootType,
    formIPattern: verb.form === 1 ? verb.formPattern : undefined,
    formRoot: toFormRoot(verb.form, rootType, rootLetters),
    tense,
    tenseRoot: toTenseRoot(rootType, tense, verb.form, pronoun),
    pronoun,
  }
}
