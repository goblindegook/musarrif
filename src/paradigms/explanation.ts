import { toRoman } from '../primitives/numbers'
import { annotate } from './annotation'
import type { FormIPattern } from './form-i-vowels'
import { deriveMasdar } from './nominal/masdar'
import type { PronounId } from './pronouns'
import { analyzeRoot, type RootAnalysisType } from './roots'
import type { VerbTense } from './tense'
import { DAL, normalizeForComparison, resolveFormVIIIInfixConsonant, TAH, type Token } from './tokens'
import { isQuadriliteralVerb, isTriliteralFormIVerb, type Verb, type VerbForm } from './verbs'
import type { Morpheme } from './word'
import { Word } from './word'

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

const NON_FORM_I_MASDAR_PATTERNS: Partial<Record<VerbForm, string>> = {
  2: 'تَفْعِيل',
  3: 'مُفَاعَلَة',
  4: 'إِفْعَال',
  5: 'تَفَعُّل',
  6: 'تَفَاعُل',
  7: 'اِنْفِعَال',
  8: 'اِفْتِعَال',
  9: 'اِفْعِلَال',
  10: 'اِسْتِفْعَال',
}

const QUADRILITERAL_MASDAR_PATTERNS: Partial<Record<VerbForm, string>> = {
  1: 'فَعْلَلَة',
  2: 'تَفَعْلُل',
  3: 'اِفْعِنْلَال',
  4: 'اِفْعِلَّال',
}

export type VerbFormDescriptor =
  | '1-action'
  | '1-intermediate'
  | '1-stative'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '1q'
  | '1q-bd'
  | '2q'
  | '3q'
  | '4q'

export function toFormDescriptor(
  verb: Pick<Verb, 'form' | 'rootTokens'> & { vowels?: FormIPattern },
): VerbFormDescriptor {
  if (verb.rootTokens.length > 3) {
    const [c1, c2, c3, c4] = verb.rootTokens
    if (verb.form === 1 && c1.equals(c3) && c2.equals(c4)) return '1q-bd'
    return `${verb.form}q` as VerbFormDescriptor
  }
  if (verb.form === 1 && verb.vowels) {
    const past = verb.vowels[0]
    if (past === 'u') return '1-stative'
    if (past === 'i') return '1-intermediate'
    return '1-action'
  }
  return String(verb.form) as VerbFormDescriptor
}

interface BaseExplanationLayers {
  arabic: string | readonly string[]
  paradigmRoots: string[]
  paradigmForm: VerbForm
  rootType?: RootAnalysisType
  form?: VerbFormDescriptor
  vowels?: FormIPattern
  formRoot?: FormRootInteraction
}

export interface VerbExplanationLayers extends BaseExplanationLayers {
  category: 'verb'
  tense?: VerbTense
  tenseRoot?: TenseRootInteraction
  pronoun?: PronounId
  prefix?: string
  suffix?: string
  elidedPrefix?: string
  elidedSuffix?: string
}

export interface NominalExplanationLayers extends BaseExplanationLayers {
  category: 'nominal'
  nominal?: NominalKind
  isMasdarMimi?: boolean
  masdarPattern?: string
}

export type ExplanationLayers = VerbExplanationLayers | NominalExplanationLayers

function toArabicText(arabic: string | readonly string[]): string {
  return Array.isArray(arabic) ? arabic.join('، ') : String(arabic)
}

function resolveHollow(rootType: RootAnalysisType, tenseContext: VerbTense): TenseRootInteraction {
  const isWaw = rootType.includes('waw')
  switch (tenseContext) {
    case 'active.past':
      return 'middle-lengthens-aa'
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

export type ExplanationKind = 'radical' | 'measure' | 'agreement' | 'particle' | 'elided'

export interface ExplanationSentence {
  text: string
  kind: ExplanationKind
}

function renderPronounSentences(
  layers: VerbExplanationLayers | undefined,
  t: (key: string, params?: Record<string, string>) => string,
): ExplanationSentence[] {
  if (layers?.pronoun == null) return []
  const pronounParams = { pronounLabel: t(`pronoun.${layers.pronoun}`), arabic: toArabicText(layers.arabic) }
  const prefix = layers.prefix ? `${layers.prefix}ـ` : undefined
  const suffix = layers.suffix ? `ـ${layers.suffix}` : undefined

  const mainText =
    prefix && suffix
      ? t('explanation.pronoun.prefix-and-suffix', { ...pronounParams, prefix, suffix })
      : prefix
        ? t('explanation.pronoun.prefix-only', { ...pronounParams, prefix })
        : suffix
          ? t('explanation.pronoun.suffix-only', { ...pronounParams, suffix })
          : t('explanation.pronoun.base-form', pronounParams)

  const sentences = [
    mainText && { text: mainText, kind: 'agreement' },
    layers.elidedPrefix && {
      text: t('explanation.pronoun.dropped-prefix', { ...pronounParams, elidedPrefix: `${layers.elidedPrefix}ـ` }),
      kind: 'elided',
    },
    layers.elidedSuffix && {
      text: t('explanation.pronoun.dropped-suffix', { ...pronounParams, elidedSuffix: `ـ${layers.elidedSuffix}` }),
      kind: 'elided',
    },
  ]

  return sentences.filter((s): s is ExplanationSentence => Boolean(s))
}

function resolveNominalKey(layers?: NominalExplanationLayers): string {
  if (layers?.nominal == null) return ''
  if (layers.nominal !== 'masdar')
    return layers.paradigmRoots.length > 3
      ? `explanation.nominal.${layers.nominal}.quad`
      : `explanation.nominal.${layers.nominal}`
  if (layers.paradigmRoots.length > 3) return `explanation.nominal.masdar.${layers.form}`
  if (layers.paradigmForm === 1)
    return layers.isMasdarMimi ? 'explanation.nominal.masdar.form-i-mimi' : 'explanation.nominal.masdar.form-i'
  return layers.masdarPattern ? 'explanation.nominal.masdar.non-form-i' : ''
}

const tenseKind = (tense: VerbTense): ExplanationKind =>
  tense === 'active.future'
    ? 'particle'
    : tense === 'active.past' || tense.startsWith('passive')
      ? 'measure'
      : 'agreement'

export function renderExplanation(
  layers: ExplanationLayers,
  t: (key: string, params?: Record<string, string>) => string,
): ExplanationSentence[][] {
  const nominalLayers = layers.category === 'nominal' ? layers : undefined
  const verbLayers = layers.category === 'verb' ? layers : undefined
  const params = {
    ...(layers.vowels && FORM_I_BASE_PATTERNS[layers.vowels]),
    arabic: toArabicText(layers.arabic),
    root: layers.paradigmRoots.join('-'),
    form: toRoman(layers.paradigmForm),
    pattern: nominalLayers?.masdarPattern ?? '',
  }

  const nominalKey = resolveNominalKey(nominalLayers)

  return [
    [
      layers.rootType && { text: t(`explanation.root.${layers.rootType}`, params), kind: 'radical' },
      layers.form && { text: t(`explanation.form.${layers.form}`, params), kind: 'measure' },
      layers.vowels != null && { text: t(`explanation.form-i-pattern.${layers.vowels}`, params), kind: 'measure' },
      layers.formRoot && { text: t(`explanation.form-root.${layers.formRoot}`, params), kind: 'radical' },
    ],
    [nominalKey && { text: t(nominalKey, params), kind: 'measure' }],
    [
      verbLayers?.tense?.startsWith('passive') && {
        text: t(`explanation.voice.${verbLayers?.tense}`, params),
        kind: 'measure',
      },
      verbLayers?.tense && {
        text: t(`explanation.tense.${verbLayers?.tense}`, params),
        kind: tenseKind(verbLayers?.tense),
      },
      layers.paradigmForm === 1 &&
        verbLayers?.tense === 'active.past' && {
          text: t('explanation.tense.active.past.form-i', params),
          kind: 'measure',
        },
      verbLayers?.tenseRoot && { text: t(`explanation.tense-root.${verbLayers.tenseRoot}`, params), kind: 'radical' },
    ],
    renderPronounSentences(verbLayers, t),
  ]
    .map((paragraph) => paragraph.filter((s): s is ExplanationSentence => Boolean(s)))
    .filter((para) => para.length > 0)
}

function extractAffixes(morphemes: readonly Morpheme[] = []): {
  prefix?: string
  suffix?: string
  elidedPrefix?: string
  elidedSuffix?: string
} {
  const stemRoles = ['radical', 'measure']
  const firstStemIdx = morphemes.findIndex((m) => stemRoles.includes(m.role))
  const lastStemIdx = morphemes.findLastIndex((m) => stemRoles.includes(m.role))

  if (firstStemIdx === -1) return {}

  const preAll = morphemes.slice(0, firstStemIdx)
  const postAll = morphemes.slice(lastStemIdx + 1).filter((m) => String(m) !== 'ْ')

  const pre = preAll.filter((m) => m.role !== 'elided')
  const post = postAll.filter((m) => m.role !== 'elided')
  const preElided = preAll.filter((m) => m.role === 'elided')
  const postElided = postAll.filter((m) => m.role === 'elided')

  return {
    prefix: pre.length ? pre.map(String).join('') : undefined,
    suffix: post.length ? post.map(String).join('') : undefined,
    elidedPrefix: preElided.length ? preElided.map(String).join('') : undefined,
    elidedSuffix: postElided.length ? postElided.map(String).join('') : undefined,
  }
}

export function resolveVerbExplanationLayers(
  verb: Verb,
  tense: VerbTense,
  pronoun: PronounId,
  arabic: string,
): VerbExplanationLayers {
  const rootType = analyzeRoot(verb.rootTokens).type

  return {
    category: 'verb',
    paradigmRoots: Array.from(verb.root),
    paradigmForm: verb.form,
    form: toFormDescriptor(verb),
    arabic,
    rootType,
    vowels: isTriliteralFormIVerb(verb) ? verb.vowels : undefined,
    formRoot: toFormRoot(verb.form, verb.rootTokens),
    tense,
    tenseRoot: toTenseRoot(rootType, tense, verb.form, pronoun),
    pronoun,
    ...extractAffixes(annotate(verb, tense, pronoun)?.steps.at(-1)?.morphemes),
  }
}

function toFormRoot(form: VerbForm, [c1]: readonly Token[]): FormRootInteraction | undefined {
  if (form !== 8) return
  const infixConsonant = resolveFormVIIIInfixConsonant(c1)
  if (infixConsonant.equals(c1)) return 'assimilation-complete'
  if (infixConsonant.equals(DAL)) return 'assimilation-voicing'
  if (infixConsonant.equals(TAH)) return 'assimilation-emphasis'
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
    return (tenseContext.startsWith('active.present') || tenseContext === 'active.future') && form === 1
      ? 'initial-drops'
      : undefined
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
  if (!isTriliteralFormIVerb(verb)) return false

  const selectedValues = (Array.isArray(arabic) ? arabic : [arabic]).map(normalizeForComparison)
  const patterns = verb.masdars ?? ['mimi']

  return deriveMasdar(verb).some(
    (masdar, index) => patterns[index] === 'mimi' && selectedValues.includes(normalizeForComparison(masdar)),
  )
}

function resolveMimiPatternLabel(arabic: string, verb: Verb): string {
  if (arabic.endsWith('ة')) return 'مَفْعَلَة'
  if (isTriliteralFormIVerb(verb) && verb.vowels.endsWith('i')) return 'مَفْعِل'
  return 'مَفْعَل'
}

function resolveMasdarPattern(verb: Verb, arabic: string | readonly string[]): string | undefined {
  if (isTriliteralFormIVerb(verb)) {
    const selectedMimiMasdar = isMimiMasdarSelection(verb, arabic) ? toArabicText(arabic) : undefined
    return selectedMimiMasdar ? resolveMimiPatternLabel(selectedMimiMasdar, verb) : undefined
  }

  return isQuadriliteralVerb(verb)
    ? (QUADRILITERAL_MASDAR_PATTERNS[verb.form] ?? '')
    : (NON_FORM_I_MASDAR_PATTERNS[verb.form] ?? '')
}

export function resolveNominalExplanationLayers(
  verb: Verb,
  nominal: NominalKind,
  arabic: string | Word | readonly string[],
): NominalExplanationLayers {
  const arabicString: string | readonly string[] = arabic instanceof Word ? String(arabic) : arabic
  return {
    category: 'nominal',
    paradigmRoots: Array.from(verb.root),
    paradigmForm: verb.form,
    form: toFormDescriptor(verb),
    arabic: arabicString,
    rootType: analyzeRoot(verb.rootTokens).type,
    vowels: isTriliteralFormIVerb(verb) ? verb.vowels : undefined,
    formRoot: toFormRoot(verb.form, verb.rootTokens),
    nominal,
    isMasdarMimi: nominal === 'masdar' && isMimiMasdarSelection(verb, arabicString),
    masdarPattern: nominal === 'masdar' ? resolveMasdarPattern(verb, arabicString) : undefined,
  }
}
