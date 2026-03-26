import type { FormIPattern } from './form-i-vowels'
import type { PronounId } from './pronouns'
import { analyzeRoot, type RootAnalysisType } from './roots'
import type { VerbTense } from './tense'
import type { Verb, VerbForm } from './verbs'

type TenseContext =
  | 'active-past'
  | 'active-present-indicative'
  | 'active-present-subjunctive'
  | 'active-present-jussive'
  | 'active-future'
  | 'active-imperative'
  | 'passive-past'
  | 'passive-present-indicative'
  | 'passive-present-subjunctive'
  | 'passive-present-jussive'
  | 'passive-future'

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
  form: VerbForm
  arabic: string
  rootType: RootAnalysisType
  formIPattern: FormIPattern | null
  formRoot: FormRootInteraction | null
  tense: TenseContext
  tenseRoot: TenseRootInteraction | null
  pronoun: PronounId
}

const WAW = 'و'

function toTenseContext(verbTense: VerbTense): TenseContext {
  const [voice, tenseOrMood, mood] = verbTense
  if (tenseOrMood === 'imperative') return 'active-imperative'
  if (tenseOrMood === 'present') return `${voice}-present-${mood}` as TenseContext
  return `${voice}-${tenseOrMood}` as TenseContext
}

function toFormRoot(form: VerbForm, rootType: RootAnalysisType, rootLetters: string[]): FormRootInteraction | null {
  if (form !== 8) return null
  if (rootType === 'assimilated') return rootLetters[0] === WAW ? 'assimilation-waw' : 'assimilation-yaa'
  if (rootType === 'doubled') return 'assimilation-doubled'
  return null
}

function resolveHollow(rootType: RootAnalysisType, tenseContext: TenseContext): TenseRootInteraction {
  const isWaw = rootType.includes('waw')
  switch (tenseContext) {
    case 'active-past':
      return isWaw ? 'middle-lengthens-aa' : 'middle-lengthens-ii'
    case 'active-present-indicative':
    case 'active-present-subjunctive':
    case 'active-future':
      return isWaw ? 'middle-lengthens-uu' : 'middle-lengthens-ii'
    case 'active-present-jussive':
    case 'active-imperative':
      return 'middle-shortens'
    case 'passive-past':
      return 'middle-passive-ii'
    case 'passive-present-indicative':
    case 'passive-present-subjunctive':
    case 'passive-present-jussive':
    case 'passive-future':
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
    case 'active-past':
      return ['3ms', '3fs', '3mp', '3md', '3fd'].includes(pronoun) ? 'final-isolated' : 'final-resurfaces'
    case 'active-present-indicative':
    case 'active-present-subjunctive':
    case 'active-future':
      return isWaw ? 'final-lengthens-uu' : 'final-lengthens-ii'
    case 'active-present-jussive':
    case 'active-imperative':
      return 'final-drops'
    case 'passive-past':
    case 'passive-present-indicative':
    case 'passive-present-subjunctive':
    case 'passive-present-jussive':
    case 'passive-future':
      return 'final-passive'
  }
}

function resolveGeminate(tenseContext: TenseContext, form: VerbForm): TenseRootInteraction | null {
  if (form === 2 || form === 5) return null
  switch (tenseContext) {
    case 'active-present-jussive':
    case 'active-imperative':
      return 'geminate-jussive'
    default:
      return 'geminate-contracts'
  }
}

function toTenseRoot(
  rootType: RootAnalysisType,
  tenseContext: TenseContext,
  form: VerbForm,
  pronoun: PronounId,
): TenseRootInteraction | null {
  if (rootType.includes('hollow')) return resolveHollow(rootType, tenseContext)
  if (rootType.includes('defective')) return resolveDefective(rootType, tenseContext, pronoun)
  if (rootType === 'assimilated') {
    const isPresent =
      tenseContext === 'active-present-indicative' ||
      tenseContext === 'active-present-subjunctive' ||
      tenseContext === 'active-present-jussive'
    return isPresent && form === 1 ? 'initial-drops' : null
  }
  if (rootType === 'doubled' || rootType === 'hamzated-doubled') {
    return resolveGeminate(tenseContext, form)
  }
  if (rootType === 'hamzated') return 'hamza-seat'
  return null
}

function resolvePronounKey(tense: TenseContext, pronoun: PronounId): string {
  switch (tense) {
    case 'active-past':
    case 'passive-past':
      return `explanation.pronoun.past.${pronoun}`
    case 'active-present-indicative':
    case 'passive-present-indicative':
    case 'active-future':
    case 'passive-future':
      return `explanation.pronoun.present.indicative.${pronoun}`
    case 'active-present-subjunctive':
    case 'passive-present-subjunctive':
      return `explanation.pronoun.present.subjunctive.${pronoun}`
    case 'active-present-jussive':
    case 'passive-present-jussive':
      return `explanation.pronoun.present.jussive.${pronoun}`
    case 'active-imperative':
      return `explanation.pronoun.imperative.${pronoun}`
  }
}

export function renderExplanation(
  layers: ExplanationLayers,
  t: (key: string, params?: Record<string, string>) => string,
  mode: 'full' | 'concise',
): string[] {
  const params = { root: layers.rootLetters.join('-'), arabic: layers.arabic, form: String(layers.form) }

  const tenseRootSentence = layers.tenseRoot ? t(`explanation.tense-root.${layers.tenseRoot}`, params) : ''

  if (mode === 'concise') return [tenseRootSentence].filter(Boolean)

  return [
    [
      t(`explanation.root.${layers.rootType}`, params),
      t(`explanation.form.${layers.form}`, params),
      layers.formIPattern && t(`explanation.form-i-pattern.${layers.formIPattern}`, params),
      layers.formRoot && t(`explanation.form-root.${layers.formRoot}`, params),
    ],
    [
      layers.tense.startsWith('passive')
        ? t(
            layers.tense === 'passive-past' ? 'explanation.voice.passive.past' : 'explanation.voice.passive.present',
            params,
          )
        : '',
      t(`explanation.tense.${layers.tense}`, params),
      layers.form === 1 && layers.tense === 'active-past' ? t('explanation.tense.active-past.form-i', params) : '',
      tenseRootSentence,
    ],
    [t(resolvePronounKey(layers.tense, layers.pronoun), params)],
  ].map((paragraph) => paragraph.filter(Boolean).join(' '))
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
    formIPattern: verb.form === 1 ? verb.formPattern : null,
    formRoot: toFormRoot(verb.form, rootType, rootLetters),
    tense,
    tenseRoot: toTenseRoot(rootType, tense, verb.form, pronoun),
    pronoun,
  }
}
