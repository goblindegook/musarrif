import { localizedPronoun, type Translate } from './localization'
import {
  type ExplanationKind,
  type ExplanationLayers,
  type ExplanationSentence,
  type FormIVowel,
  type FormRootInteraction,
  hasAbsorbedDualAlif,
  hasAlifAlWasl,
  hasAssimilatedEndingNun,
  isLaysa,
  isNeutralizedByForm,
  type NominalExplanationLayers,
  type NominalRootInteraction,
  PAST_VOWEL_NAMES,
  type Paragraph,
  type Paragraphs,
  type TenseRootInteraction,
  toArabicText,
  type VerbExplanationLayers,
  type VerbFormDescriptor,
} from './paradigms/explanation'
import type { FormIPattern } from './paradigms/form-i-vowels'
import { behaviourShapes, type RootAnalysis, rootTypeLocaleKey, type WeakLetter } from './paradigms/roots'
import type { VerbTense } from './paradigms/tense'
import { ALIF, FATHA, NOON } from './paradigms/tokens'
import type { TriliteralForm } from './paradigms/verb-types'
import { toRoman } from './primitives/numbers'

export function localizedRootDescription(t: Translate, analysis: Pick<RootAnalysis, 'type' | 'weakLetter'>): string {
  switch (rootTypeLocaleKey(analysis.type, analysis.weakLetter)) {
    case 'assimilated':
      return t('rootInfo.assimilated.description')
    case 'assimilated-defective-waw':
      return t('rootInfo.assimilated-defective-waw.description')
    case 'assimilated-defective-yaa':
      return t('rootInfo.assimilated-defective-yaa.description')
    case 'assimilated-doubled':
      return t('rootInfo.assimilated-doubled.description')
    case 'assimilated-hollow-waw':
      return t('rootInfo.assimilated-hollow-waw.description')
    case 'assimilated-hollow-yaa':
      return t('rootInfo.assimilated-hollow-yaa.description')
    case 'defective':
      return t('rootInfo.defective.description')
    case 'defective-waw':
      return t('rootInfo.defective-waw.description')
    case 'defective-yaa':
      return t('rootInfo.defective-yaa.description')
    case 'doubled':
      return t('rootInfo.doubled.description')
    case 'hamzated':
      return t('rootInfo.hamzated.description')
    case 'hamzated-assimilated':
      return t('rootInfo.hamzated-assimilated.description')
    case 'hamzated-assimilated-defective-yaa':
      return t('rootInfo.hamzated-assimilated-defective-yaa.description')
    case 'hamzated-defective':
      return t('rootInfo.hamzated-defective.description')
    case 'hamzated-defective-waw':
      return t('rootInfo.hamzated-defective-waw.description')
    case 'hamzated-defective-yaa':
      return t('rootInfo.hamzated-defective-yaa.description')
    case 'hamzated-doubled':
      return t('rootInfo.hamzated-doubled.description')
    case 'hamzated-hollow':
      return t('rootInfo.hamzated-hollow.description')
    case 'hamzated-hollow-defective':
      return t('rootInfo.hamzated-hollow-defective.description')
    case 'hamzated-hollow-waw':
      return t('rootInfo.hamzated-hollow-waw.description')
    case 'hamzated-hollow-yaa':
      return t('rootInfo.hamzated-hollow-yaa.description')
    case 'hollow':
      return t('rootInfo.hollow.description')
    case 'hollow-defective-waw':
      return t('rootInfo.hollow-defective-waw.description')
    case 'hollow-defective-yaa':
      return t('rootInfo.hollow-defective-yaa.description')
    case 'hollow-waw':
      return t('rootInfo.hollow-waw.description')
    case 'hollow-yaa':
      return t('rootInfo.hollow-yaa.description')
    default:
      return t('rootInfo.sound.description')
  }
}

export function localizedFormMeaning(t: Translate, form: VerbFormDescriptor): string {
  switch (form) {
    case '1-action':
      return t('formInfo.form1-action.semantic')
    case '1-intermediate':
      return t('formInfo.form1-intermediate.semantic')
    case '1-stative':
      return t('formInfo.form1-stative.semantic')
    case '2':
      return t('formInfo.form2.semantic')
    case '3':
      return t('formInfo.form3.semantic')
    case '4':
      return t('formInfo.form4.semantic')
    case '5':
      return t('formInfo.form5.semantic')
    case '6':
      return t('formInfo.form6.semantic')
    case '7':
      return t('formInfo.form7.semantic')
    case '8':
      return t('formInfo.form8.semantic')
    case '9':
      return t('formInfo.form9.semantic')
    case '10':
      return t('formInfo.form10.semantic')
    case '1q':
      return t('formInfo.form1q.semantic')
    case '2q':
      return t('formInfo.form2q.semantic')
    case '3q':
      return t('formInfo.form3q.semantic')
    case '4q':
      return t('formInfo.form4q.semantic')
  }
}

export function localizedFormRelationship(t: Translate, form: TriliteralForm): string {
  switch (form) {
    case 1:
      return t('formInfo.form1.relationship')
    case 2:
      return t('formInfo.form2.relationship')
    case 3:
      return t('formInfo.form3.relationship')
    case 4:
      return t('formInfo.form4.relationship')
    case 5:
      return t('formInfo.form5.relationship')
    case 6:
      return t('formInfo.form6.relationship')
    case 7:
      return t('formInfo.form7.relationship')
    case 8:
      return t('formInfo.form8.relationship')
    case 9:
      return t('formInfo.form9.relationship')
    case 10:
      return t('formInfo.form10.relationship')
  }
}

type Params = Record<string, string>

type DraftParagraph = readonly (ExplanationSentence | undefined)[]

export function localizedExplanation(t: Translate, layers: ExplanationLayers): Paragraphs {
  const arabic = toArabicText(layers.arabic)

  // A paradigm the verb does not have leaves the cell empty, and an empty cell has nothing to explain.
  if (!arabic) return []

  const nominalLayers = layers.category === 'nominal' ? layers : undefined
  const verbLayers = layers.category === 'verb' ? layers : undefined
  const tense = verbLayers?.tense

  const params: Params = {
    ...(layers.vowels && PAST_VOWEL_NAMES[layers.vowels[0] as FormIVowel]),
    arabic,
    root: layers.paradigmRoots.join('-'),
    initialRadical: layers.paradigmRoots[0] ?? '',
    form: toRoman(layers.paradigmForm),
    pattern: (nominalLayers?.nominal === 'masdar' ? nominalLayers.masdarPattern : undefined) ?? '',
    pastForm: layers.pastForm ?? '',
    presentForm: layers.presentForm ?? '',
  }

  if (verbLayers && isLaysa(layers.paradigmRoots.join('')))
    return toParagraphs(
      [
        sentence('measure', t('explanation.laysa.frozen', params)),
        sentence('radical', t('explanation.laysa.radical', params)),
      ],
      [sentence('measure', t('explanation.laysa.meaning', params))],
      renderPronounSentences(verbLayers, t),
    )

  return toParagraphs(
    [
      sentence('measure', layers.vowels && formIPatternNote(t, layers.vowels, params)),
      sentence('measure', layers.form && formNote(t, layers.form, params)),
      sentence('measure', layers.form === '8' && hasAlifAlWasl(arabic) && t('explanation.form.8-wasl', params)),
      sentence('radical', rootNote(layers, t, params)),
      sentence('radical', layers.rootType?.includes('biliteral') && t('explanation.root.biliteral', params)),
      sentence('radical', layers.formRoot && formRootNote(t, layers.formRoot, params)),
    ],
    [
      sentence('measure', nominalLayers && nominalNote(nominalLayers, t, params)),
      sentence('radical', nominalLayers?.nominalRoot && nominalRootNote(t, nominalLayers.nominalRoot, params)),
    ],
    [
      sentence('measure', tense && voiceNote(t, tense, params)),
      sentence('elided', tense === 'active.imperative' && t('explanation.tense.active.imperative.elision', params)),
      sentence(
        'measure',
        tense === 'active.imperative' &&
          hasAlifAlWasl(arabic) &&
          t('explanation.tense.active.imperative.support', params),
      ),
      tense && sentence(tenseKind(tense), tenseNote(t, tense, params)),
      sentence(
        'measure',
        layers.paradigmForm === 1 &&
          tense === 'active.past' &&
          verbLayers?.pronoun === '3ms' &&
          t('explanation.tense.active.past.form-i', params),
      ),
      sentence('radical', verbLayers?.tenseRoot && tenseRootNote(t, verbLayers.tenseRoot, params)),
    ],
    renderPronounSentences(verbLayers, t),
  )
}

function tenseKind(tense: VerbTense): ExplanationKind {
  if (tense === 'active.future') return 'particle'
  if (tense === 'active.past' || tense.startsWith('passive')) return 'measure'
  return 'agreement'
}

function formIPatternNote(t: Translate, vowels: FormIPattern, params: Params): string {
  switch (vowels) {
    case 'a-a':
      return t('explanation.form-i-pattern.a-a', params)
    case 'a-i':
      return t('explanation.form-i-pattern.a-i', params)
    case 'a-u':
      return t('explanation.form-i-pattern.a-u', params)
    case 'i-a':
      return t('explanation.form-i-pattern.i-a', params)
    case 'i-i':
      return t('explanation.form-i-pattern.i-i', params)
    case 'i-u':
      return t('explanation.form-i-pattern.i-u', params)
    case 'u-a':
      return t('explanation.form-i-pattern.u-a', params)
    case 'u-i':
      return t('explanation.form-i-pattern.u-i', params)
    case 'u-u':
      return t('explanation.form-i-pattern.u-u', params)
  }
}

function formNote(t: Translate, form: VerbFormDescriptor, params: Params): string {
  switch (form) {
    case '1-action':
      return t('explanation.form.1-action', params)
    case '1-intermediate':
      return t('explanation.form.1-intermediate', params)
    case '1-stative':
      return t('explanation.form.1-stative', params)
    case '2':
      return t('explanation.form.2', params)
    case '3':
      return t('explanation.form.3', params)
    case '4':
      return t('explanation.form.4', params)
    case '5':
      return t('explanation.form.5', params)
    case '6':
      return t('explanation.form.6', params)
    case '7':
      return t('explanation.form.7', params)
    case '8':
      return t('explanation.form.8', params)
    case '9':
      return t('explanation.form.9', params)
    case '10':
      return t('explanation.form.10', params)
    case '1q':
      return t('explanation.form.1q', params)
    case '2q':
      return t('explanation.form.2q', params)
    case '3q':
      return t('explanation.form.3q', params)
    case '4q':
      return t('explanation.form.4q', params)
  }
}

function formRootNote(t: Translate, formRoot: FormRootInteraction, params: Params): string {
  switch (formRoot) {
    case 'assimilation-complete':
      return t('explanation.form-root.assimilation-complete', params)
    case 'assimilation-voicing':
      return t('explanation.form-root.assimilation-voicing', params)
    case 'assimilation-emphasis':
      return t('explanation.form-root.assimilation-emphasis', params)
    case 'assimilation-weak-initial':
      return t('explanation.form-root.assimilation-weak-initial', params)
    case 'assimilation-hamza-initial':
      return t('explanation.form-root.assimilation-hamza-initial', params)
  }
}

function rootNote(layers: ExplanationLayers, t: Translate, params: Params): string | undefined {
  const { rootType, weakLetter, paradigmForm: form } = layers
  if (rootType == null) return undefined

  const live = behaviourShapes(rootType).filter((shape) => !isNeutralizedByForm(shape, form))

  if (live.length === 0 && rootType.includes('hollow')) return t('explanation.root.hollow-sound-form', params)
  if (live.length === 0 && rootType.includes('doubled')) return t('explanation.root.doubled-sound-form', params)
  if (live.length === 0 && weakLetter) return uncontractedHollowNote(t, weakLetter, params)
  if (live.length === 1 && live[0] === 'assimilated' && form === 8) return undefined
  if (live.length === 1 && live[0] === 'assimilated' && form !== 1)
    return t('explanation.root.assimilated-sound-form', params)

  // A neutralized shape only ever drops out above Form I, where a final weak radical is always yāʾ.
  const liveWeakLetter = live.includes('hollow')
    ? weakLetter
    : live.includes('defective')
      ? form === 1
        ? weakLetter
        : 'yaa'
      : undefined
  return rootShapeNote(t, rootTypeLocaleKey(live, liveWeakLetter), params)
}

function uncontractedHollowNote(t: Translate, weakLetter: WeakLetter, params: Params): string {
  switch (weakLetter) {
    case 'waw':
      return t('explanation.root.hollow-uncontracted-waw', params)
    case 'yaa':
      return t('explanation.root.hollow-uncontracted-yaa', params)
  }
}

// rootTypeLocaleKey joins the live shapes into a plain string, so no union can prove this switch
// exhaustive; every combination a dataset verb reaches has a case.
function rootShapeNote(t: Translate, rootTypeKey: string, params: Params): string | undefined {
  switch (rootTypeKey) {
    case 'sound':
      return t('explanation.root.sound', params)
    case 'assimilated':
      return t('explanation.root.assimilated', params)
    case 'assimilated-defective-waw':
      return t('explanation.root.assimilated-defective-waw', params)
    case 'assimilated-defective-yaa':
      return t('explanation.root.assimilated-defective-yaa', params)
    case 'assimilated-doubled':
      return t('explanation.root.assimilated-doubled', params)
    case 'assimilated-hollow-waw':
      return t('explanation.root.assimilated-hollow-waw', params)
    case 'assimilated-hollow-yaa':
      return t('explanation.root.assimilated-hollow-yaa', params)
    case 'defective-waw':
      return t('explanation.root.defective-waw', params)
    case 'defective-yaa':
      return t('explanation.root.defective-yaa', params)
    case 'doubled':
      return t('explanation.root.doubled', params)
    case 'hamzated':
      return t('explanation.root.hamzated', params)
    case 'hamzated-assimilated':
      return t('explanation.root.hamzated-assimilated', params)
    case 'hamzated-assimilated-defective-yaa':
      return t('explanation.root.hamzated-assimilated-defective-yaa', params)
    case 'hamzated-defective-waw':
      return t('explanation.root.hamzated-defective-waw', params)
    case 'hamzated-defective-yaa':
      return t('explanation.root.hamzated-defective-yaa', params)
    case 'hamzated-doubled':
      return t('explanation.root.hamzated-doubled', params)
    case 'hamzated-hollow-defective':
      return t('explanation.root.hamzated-hollow-defective', params)
    case 'hamzated-hollow-waw':
      return t('explanation.root.hamzated-hollow-waw', params)
    case 'hamzated-hollow-yaa':
      return t('explanation.root.hamzated-hollow-yaa', params)
    case 'hollow-defective-waw':
      return t('explanation.root.hollow-defective-waw', params)
    case 'hollow-defective-yaa':
      return t('explanation.root.hollow-defective-yaa', params)
    case 'hollow-waw':
      return t('explanation.root.hollow-waw', params)
    case 'hollow-yaa':
      return t('explanation.root.hollow-yaa', params)
    default:
      return undefined
  }
}

function nominalNote(layers: NominalExplanationLayers, t: Translate, params: Params): string | undefined {
  if (layers.nominal == null) return undefined

  const isQuadriliteral = layers.paradigmRoots.length > 3

  if (layers.nominal === 'masdar') {
    if (isQuadriliteral) return layers.form && quadriliteralMasdarNote(t, layers.form, params)
    if (layers.paradigmForm !== 1)
      return layers.masdarPattern ? t('explanation.nominal.masdar.non-form-i', params) : undefined
    return layers.isMasdarMimi
      ? t('explanation.nominal.masdar.form-i-mimi', params)
      : t('explanation.nominal.masdar.form-i', params)
  }

  if (layers.nominal === 'activeParticiple') {
    switch (layers.activeParticipleKind) {
      case 'lexical':
        return t('explanation.nominal.activeParticiple.form-i-lexical', params)
      case 'fa3iil':
        return t('explanation.nominal.activeParticiple.form-i-fa3iil', params)
      case 'faa3il':
        return isQuadriliteral
          ? t('explanation.nominal.activeParticiple.quad', params)
          : t('explanation.nominal.activeParticiple', params)
    }
  }

  return isQuadriliteral
    ? t('explanation.nominal.passiveParticiple.quad', params)
    : t('explanation.nominal.passiveParticiple', params)
}

function quadriliteralMasdarNote(t: Translate, form: VerbFormDescriptor, params: Params): string | undefined {
  switch (form) {
    case '1q':
      return t('explanation.nominal.masdar.1q', params)
    case '2q':
      return t('explanation.nominal.masdar.2q', params)
    case '3q':
      return t('explanation.nominal.masdar.3q', params)
    case '4q':
      return t('explanation.nominal.masdar.4q', params)
    case '1-action':
    case '1-intermediate':
    case '1-stative':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '10':
      return undefined
  }
}

function nominalRootNote(t: Translate, nominalRoot: NominalRootInteraction, params: Params): string {
  switch (nominalRoot) {
    case 'geminate-contracts':
      return t('explanation.nominal-root.geminate-contracts', params)
    case 'geminate-separates':
      return t('explanation.nominal-root.geminate-separates', params)
    case 'hollow-hamza':
      return t('explanation.nominal-root.hollow-hamza', params)
    case 'hollow-long-vowel':
      return t('explanation.nominal-root.hollow-long-vowel', params)
    case 'hollow-voice-selects':
      return t('explanation.nominal-root.hollow-voice-selects', params)
    case 'hollow-always-alif':
      return t('explanation.nominal-root.hollow-always-alif', params)
    case 'defective-form-i-active':
      return t('explanation.nominal-root.defective-form-i-active', params)
    case 'defective-form-i-passive':
      return t('explanation.nominal-root.defective-form-i-passive', params)
    case 'defective-tanween-active':
      return t('explanation.nominal-root.defective-tanween-active', params)
    case 'defective-tanween-passive':
      return t('explanation.nominal-root.defective-tanween-passive', params)
  }
}

function voiceNote(t: Translate, tense: VerbTense, params: Params): string | undefined {
  switch (tense) {
    case 'passive.past':
      return t('explanation.voice.passive.past', params)
    case 'passive.present.indicative':
      return t('explanation.voice.passive.present.indicative', params)
    case 'passive.present.subjunctive':
      return t('explanation.voice.passive.present.subjunctive', params)
    case 'passive.present.jussive':
      return t('explanation.voice.passive.present.jussive', params)
    case 'passive.future':
      return t('explanation.voice.passive.future', params)
    case 'active.past':
    case 'active.present.indicative':
    case 'active.present.subjunctive':
    case 'active.present.jussive':
    case 'active.future':
    case 'active.imperative':
      return undefined
  }
}

// The imperative is explained by its elision and support sentences, and the passive past by its voice
// sentence, so neither has a tense sentence of its own.
function tenseNote(t: Translate, tense: VerbTense, params: Params): string | undefined {
  switch (tense) {
    case 'active.past':
      return t('explanation.tense.active.past', params)
    case 'active.present.indicative':
      return t('explanation.tense.active.present.indicative', params)
    case 'active.present.subjunctive':
      return t('explanation.tense.active.present.subjunctive', params)
    case 'active.present.jussive':
      return t('explanation.tense.active.present.jussive', params)
    case 'active.future':
      return t('explanation.tense.active.future', params)
    case 'passive.present.indicative':
      return t('explanation.tense.passive.present.indicative', params)
    case 'passive.present.subjunctive':
      return t('explanation.tense.passive.present.subjunctive', params)
    case 'passive.present.jussive':
      return t('explanation.tense.passive.present.jussive', params)
    case 'passive.future':
      return t('explanation.tense.passive.future', params)
    case 'active.imperative':
    case 'passive.past':
      return undefined
  }
}

function tenseRootNote(t: Translate, tenseRoot: TenseRootInteraction, params: Params): string {
  switch (tenseRoot) {
    case 'final-drops':
      return t('explanation.tense-root.final-drops', params)
    case 'final-elides':
      return t('explanation.tense-root.final-elides', params)
    case 'final-isolated':
      return t('explanation.tense-root.final-isolated', params)
    case 'final-lengthens-aa':
      return t('explanation.tense-root.final-lengthens-aa', params)
    case 'final-lengthens-ii':
      return t('explanation.tense-root.final-lengthens-ii', params)
    case 'final-lengthens-uu':
      return t('explanation.tense-root.final-lengthens-uu', params)
    case 'final-passive-aa':
      return t('explanation.tense-root.final-passive-aa', params)
    case 'final-passive-ya':
      return t('explanation.tense-root.final-passive-ya', params)
    case 'final-passive-uu':
      return t('explanation.tense-root.final-passive-uu', params)
    case 'final-resurfaces':
      return t('explanation.tense-root.final-resurfaces', params)
    case 'final-surfaces-consonant':
      return t('explanation.tense-root.final-surfaces-consonant', params)
    case 'geminate-contracts':
      return t('explanation.tense-root.geminate-contracts', params)
    case 'geminate-jussive':
      return t('explanation.tense-root.geminate-jussive', params)
    case 'geminate-separates':
      return t('explanation.tense-root.geminate-separates', params)
    case 'hamza-madda':
      return t('explanation.tense-root.hamza-madda', params)
    case 'hamza-seat':
      return t('explanation.tense-root.hamza-seat', params)
    case 'hamza-elides':
      return t('explanation.tense-root.hamza-elides', params)
    case 'initial-drops':
      return t('explanation.tense-root.initial-drops', params)
    case 'initial-retained':
      return t('explanation.tense-root.initial-retained', params)
    case 'initial-retained-lexical':
      return t('explanation.tense-root.initial-retained-lexical', params)
    case 'middle-lengthens-aa':
      return t('explanation.tense-root.middle-lengthens-aa', params)
    case 'middle-lengthens-ii':
      return t('explanation.tense-root.middle-lengthens-ii', params)
    case 'middle-lengthens-uu':
      return t('explanation.tense-root.middle-lengthens-uu', params)
    case 'middle-lengthens-ii-derived':
      return t('explanation.tense-root.middle-lengthens-ii-derived', params)
    case 'middle-lengthens-aa-present':
      return t('explanation.tense-root.middle-lengthens-aa-present', params)
    case 'middle-passive-aa':
      return t('explanation.tense-root.middle-passive-aa', params)
    case 'middle-passive-ii':
      return t('explanation.tense-root.middle-passive-ii', params)
    case 'middle-shortens':
      return t('explanation.tense-root.middle-shortens', params)
    case 'middle-shortens-consonant':
      return t('explanation.tense-root.middle-shortens-consonant', params)
  }
}

function renderPronounSentences(layers: VerbExplanationLayers | undefined, t: Translate): Paragraph {
  if (layers?.pronoun == null) return []

  const params: Params = { pronounLabel: localizedPronoun(t, layers.pronoun), arabic: toArabicText(layers.arabic) }
  const assimilatedNun = hasAssimilatedEndingNun(layers)

  const prefix = layers.prefix ? `${layers.prefix}ـ` : undefined
  const ending = `${hasAbsorbedDualAlif(layers) ? `${FATHA}${ALIF}` : ''}${assimilatedNun ? String(NOON) : ''}${layers.suffix ?? ''}`
  const suffix = ending ? `ـ${ending}` : undefined

  return toParagraph(
    !prefix && !suffix && layers.paradigmForm === 1 && layers.tense === 'active.past'
      ? undefined
      : sentence('agreement', affixNote(t, prefix, suffix, params)),
    sentence(
      'elided',
      layers.elidedPrefix &&
        layers.tense !== 'active.imperative' &&
        t('explanation.pronoun.dropped-prefix', { ...params, elidedPrefix: `${layers.elidedPrefix}ـ` }),
    ),
    sentence(
      'elided',
      layers.elidedSuffix?.includes(String(NOON)) &&
        t('explanation.pronoun.dropped-suffix', { ...params, elidedSuffix: `ـ${layers.elidedSuffix}` }),
    ),
    sentence('elided', assimilatedNun && t('explanation.pronoun.assimilated-nun', params)),
  )
}

function affixNote(t: Translate, prefix: string | undefined, suffix: string | undefined, params: Params): string {
  if (prefix && suffix) return t('explanation.pronoun.prefix-and-suffix', { ...params, prefix, suffix })
  if (prefix) return t('explanation.pronoun.prefix-only', { ...params, prefix })
  if (suffix) return t('explanation.pronoun.suffix-only', { ...params, suffix })
  return t('explanation.pronoun.base-form', params)
}

function sentence(kind: ExplanationKind, text: string | false | undefined): ExplanationSentence | undefined {
  return text ? { text, kind } : undefined
}

function toParagraph(...sentences: DraftParagraph): Paragraph {
  return sentences.filter((sentence): sentence is ExplanationSentence => sentence != null)
}

function toParagraphs(...paragraphs: readonly DraftParagraph[]): Paragraphs {
  return paragraphs.map((sentences) => toParagraph(...sentences)).filter((paragraph) => paragraph.length > 0)
}
