import { toRoman } from '../primitives/numbers'
import { dropsInitialWaw } from './active/present'
import { derivationSteps } from './annotation'
import { conjugate } from './conjugation'
import type { FormIPattern } from './form-i-vowels'
import { deriveMasdar } from './nominal/masdar'
import { isFa3iilActiveParticiple } from './nominal/participle'
import type { PronounId } from './pronouns'
import { analyzeRoot, type RootAnalysisType, type RootShape, rootTypeLocaleKey, type WeakLetter } from './roots'
import type { VerbTense } from './tense'
import {
  ALIF,
  ALIF_MADDA,
  DAL,
  NOON,
  normalizeForComparison,
  resolveFormVIIIInfixConsonant,
  TAH,
  type Token,
  WAW,
  YEH,
} from './tokens'
import { isQuadriliteralVerb, isTriliteralFormIVerb, type TriliteralForm, type Verb } from './verbs'
import type { Morpheme } from './word'
import { Word } from './word'

type FormRootInteraction =
  | 'assimilation-complete'
  | 'assimilation-voicing'
  | 'assimilation-emphasis'
  | 'assimilation-weak-initial'

type TenseRootInteraction =
  | 'final-drops'
  | 'final-elides'
  | 'final-isolated'
  | 'final-lengthens-aa'
  | 'final-lengthens-ii'
  | 'final-lengthens-uu'
  | 'final-passive-aa'
  | 'final-passive-ya'
  | 'final-passive-uu'
  | 'final-resurfaces'
  | 'final-surfaces-consonant'
  | 'geminate-contracts'
  | 'geminate-jussive'
  | 'geminate-separates'
  | 'hamza-madda'
  | 'hamza-seat'
  | 'hamza-elides'
  | 'initial-drops'
  | 'initial-retained'
  | 'middle-lengthens-aa'
  | 'middle-lengthens-ii'
  | 'middle-lengthens-uu'
  | 'middle-lengthens-ii-derived'
  | 'middle-lengthens-aa-present'
  | 'middle-passive-aa'
  | 'middle-passive-ii'
  | 'middle-shortens'
  | 'middle-shortens-consonant'

export type NominalKind = 'activeParticiple' | 'passiveParticiple' | 'masdar'

const NON_FORM_I_MASDAR_PATTERNS: Partial<Record<TriliteralForm, string>> = {
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

const QUADRILITERAL_MASDAR_PATTERNS: Partial<Record<TriliteralForm, string>> = {
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
  paradigmForm: TriliteralForm
  rootType?: RootAnalysisType
  weakLetter?: WeakLetter
  form?: VerbFormDescriptor
  vowels?: FormIPattern
  formRoot?: FormRootInteraction
  pastForm?: string
  presentForm?: string
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

type ActiveParticipleKind = 'faa3il' | 'fa3iil' | 'lexical'

interface ActiveParticipleExplanationLayers extends BaseExplanationLayers {
  category: 'nominal'
  nominal: 'activeParticiple'
  activeParticipleKind: ActiveParticipleKind
}

interface PassiveParticipleExplanationLayers extends BaseExplanationLayers {
  category: 'nominal'
  nominal: 'passiveParticiple'
}

interface MasdarExplanationLayers extends BaseExplanationLayers {
  category: 'nominal'
  nominal: 'masdar'
  isMasdarMimi: boolean
  masdarPattern?: string
}

type NominalExplanationLayers<T extends NominalKind = NominalKind> = Extract<
  ActiveParticipleExplanationLayers | PassiveParticipleExplanationLayers | MasdarExplanationLayers,
  { nominal: T }
>

export type ExplanationLayers = VerbExplanationLayers | NominalExplanationLayers

function toArabicText(arabic: string | readonly string[]): string {
  return Array.isArray(arabic) ? arabic.join('، ') : String(arabic)
}

// The past-tense pronouns whose ending starts with a vowel, so nothing forces the stem to break up.
const VOWEL_SUFFIX_PAST_PRONOUNS: readonly PronounId[] = ['3ms', '3fs', '3md', '3fd', '3mp']

// The present-tense pronouns whose ـْنَ ending starts with sukūn.
const FEMININE_PLURAL_PRONOUNS: readonly PronounId[] = ['2fp', '3fp']

// The present-tense pronouns whose ending starts with a vowel, which protects the stem from apocope.
const VOWEL_SUFFIX_PRESENT_PRONOUNS: readonly PronounId[] = ['2fs', '2d', '2mp', '3md', '3fd', '3mp']

// The pronouns whose personal ending begins with nūn: ـْنَ for the feminine plural, ـْنَا for 1p.
const NUN_INITIAL_ENDING_PRONOUNS: readonly PronounId[] = ['1p', '2fp', '3fp']

// The present-tense pronouns that carry no personal ending at all, leaving the stem's final vowel bare.
const BARE_PRESENT_PRONOUNS: readonly PronounId[] = ['1s', '1p', '2ms', '3ms', '3fs']

// The moods that drop the stem's final vowel when no vowel-initial ending follows.
const APOCOPATING_TENSES: readonly VerbTense[] = [
  'active.present.jussive',
  'active.imperative',
  'passive.present.jussive',
]

// Forms II, III, V, VI and IX keep the middle radical a plain consonant: the gemination of II/V, the
// long vowel of III/VI and the final gemination of IX (اِبْيَضَّ) protect it, so a hollow root
// conjugates sound throughout those forms.
const HOLLOW_NEUTRAL_FORMS: readonly TriliteralForm[] = [2, 3, 5, 6, 9]

// Only the gemination of Forms II and V protects identical radicals; III and VI still contract.
const DOUBLED_NEUTRAL_FORMS: readonly TriliteralForm[] = [2, 5]

// Forms IV and X always give ī (يُقِيمُ, يَسْتَقِيمُ) and Forms VII and VIII always give ā
// (يَنْقَامُ, يَخْتَارُ), waw or yaa alike.
const HOLLOW_PRESENT_II_FORMS: readonly TriliteralForm[] = [4, 10]
const HOLLOW_PRESENT_AA_FORMS: readonly TriliteralForm[] = [7, 8]

// Form I takes it from the pattern's own present vowel instead, so the root letter does not decide:
// يَقُولُ gives ū and يَبِيعُ ī, but the يَخَافُ / يَنَامُ class gives ā with either middle radical.
const FORM_I_PRESENT_LENGTHENING = {
  a: 'middle-lengthens-aa-present',
  i: 'middle-lengthens-ii',
  u: 'middle-lengthens-uu',
} as const satisfies Record<string, TenseRootInteraction>

// The long middle vowel survives only when nothing consonantal follows it: a vowel-initial ending
// keeps it in every tense, while the jussive and imperative shorten it wherever such an ending is
// absent, and the feminine plural ـْنَ shortens it even in the indicative.
function resolveHollow(verb: Verb, tenseContext: VerbTense, pronoun: PronounId): TenseRootInteraction {
  const isPassive = tenseContext.startsWith('passive')

  if (tenseContext.endsWith('past')) {
    if (!VOWEL_SUFFIX_PAST_PRONOUNS.includes(pronoun)) return 'middle-shortens-consonant'
    return isPassive ? 'middle-passive-ii' : 'middle-lengthens-aa'
  }

  const keepsLongVowel = VOWEL_SUFFIX_PRESENT_PRONOUNS.includes(pronoun)
  if (!keepsLongVowel && APOCOPATING_TENSES.includes(tenseContext)) return 'middle-shortens'
  if (FEMININE_PLURAL_PRONOUNS.includes(pronoun)) return 'middle-shortens-consonant'
  if (isPassive) return 'middle-passive-aa'
  if (HOLLOW_PRESENT_II_FORMS.includes(verb.form)) return 'middle-lengthens-ii-derived'
  if (HOLLOW_PRESENT_AA_FORMS.includes(verb.form)) return 'middle-lengthens-aa-present'
  if (isTriliteralFormIVerb(verb)) return FORM_I_PRESENT_LENGTHENING[verb.vowels[2] as 'a' | 'i' | 'u']
  return 'middle-lengthens-aa-present'
}

function resolveDefective(verb: Verb, tenseContext: VerbTense, pronoun: PronounId): TenseRootInteraction | undefined {
  switch (tenseContext) {
    case 'active.past':
      if (pronoun === '3ms') return 'final-isolated'
      if (['3fs', '3fd'].includes(pronoun)) return 'final-elides'
      return 'final-resurfaces'
    case 'active.present.indicative':
    case 'active.future':
      return BARE_PRESENT_PRONOUNS.includes(pronoun) ? barePresentEnding(verb) : 'final-surfaces-consonant'
    case 'active.present.subjunctive':
      // The subjunctive's own fatḥa sits on the final radical, so it is a consonant even when bare.
      return 'final-surfaces-consonant'
    case 'active.present.jussive':
    case 'active.imperative':
      return BARE_PRESENT_PRONOUNS.includes(pronoun) ? 'final-drops' : 'final-surfaces-consonant'
    case 'passive.past':
      return pronoun === '3mp' ? 'final-passive-uu' : 'final-passive-ya'
    case 'passive.present.indicative':
    case 'passive.present.subjunctive':
    case 'passive.future':
      return BARE_PRESENT_PRONOUNS.includes(pronoun) ? 'final-passive-aa' : 'final-surfaces-consonant'
    case 'passive.present.jussive':
      return BARE_PRESENT_PRONOUNS.includes(pronoun) ? 'final-drops' : 'final-surfaces-consonant'
  }
}

// Forms V and VI always close on ـَى (يَتَخَلَّى, يَتَعَافَى); the other derived forms always on ī
// (يُخَلِّي, يُنَادِي, يَسْتَدْعِي). Form I follows its own present vowel, exactly as a hollow root does.
const DEFECTIVE_PRESENT_AA_FORMS: readonly TriliteralForm[] = [5, 6]

const FORM_I_PRESENT_ENDING = {
  a: 'final-lengthens-aa',
  i: 'final-lengthens-ii',
  u: 'final-lengthens-uu',
} as const satisfies Record<string, TenseRootInteraction>

function barePresentEnding(verb: Verb): TenseRootInteraction {
  if (DEFECTIVE_PRESENT_AA_FORMS.includes(verb.form)) return 'final-lengthens-aa'
  if (isTriliteralFormIVerb(verb)) return FORM_I_PRESENT_ENDING[verb.vowels[2] as 'a' | 'i' | 'u']
  return 'final-lengthens-ii'
}

const FORM_I_BASE_PATTERNS: Record<FormIPattern, { pastVowel: string; arabicVowel: string }> = {
  'a-a': { pastVowel: 'fatḥa', arabicVowel: 'فَتْحَة' },
  'a-i': { pastVowel: 'fatḥa', arabicVowel: 'فَتْحَة' },
  'a-u': { pastVowel: 'fatḥa', arabicVowel: 'فَتْحَة' },
  'i-a': { pastVowel: 'kasra', arabicVowel: 'كَسْرَة' },
  'i-i': { pastVowel: 'kasra', arabicVowel: 'كَسْرَة' },
  'i-u': { pastVowel: 'kasra', arabicVowel: 'كَسْرَة' },
  'u-a': { pastVowel: 'ḍamma', arabicVowel: 'ضَمَّة' },
  'u-i': { pastVowel: 'ḍamma', arabicVowel: 'ضَمَّة' },
  'u-u': { pastVowel: 'ḍamma', arabicVowel: 'ضَمَّة' },
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
  const endingNun = hasAssimilatedEndingNun(layers) ? String(NOON) : ''
  const suffix = layers.suffix ? `ـ${endingNun}${layers.suffix}` : undefined

  const mainText =
    prefix && suffix
      ? t('explanation.pronoun.prefix-and-suffix', { ...pronounParams, prefix, suffix })
      : prefix
        ? t('explanation.pronoun.prefix-only', { ...pronounParams, prefix })
        : suffix
          ? t('explanation.pronoun.suffix-only', { ...pronounParams, suffix })
          : layers.paradigmForm === 1 && layers.tense === 'active.past'
            ? ''
            : t('explanation.pronoun.base-form', pronounParams)

  const sentences = [
    mainText && { text: mainText, kind: 'agreement' },
    layers.elidedPrefix &&
      layers.tense !== 'active.imperative' && {
        text: t('explanation.pronoun.dropped-prefix', { ...pronounParams, elidedPrefix: `${layers.elidedPrefix}ـ` }),
        kind: 'elided',
      },
    layers.elidedSuffix?.includes(String(NOON)) && {
      text: t('explanation.pronoun.dropped-suffix', { ...pronounParams, elidedSuffix: `ـ${layers.elidedSuffix}` }),
      kind: 'elided',
    },
    hasAssimilatedEndingNun(layers) && {
      text: t('explanation.pronoun.assimilated-nun', pronounParams),
      kind: 'elided',
    },
  ]

  return sentences.filter((s): s is ExplanationSentence => Boolean(s))
}

// ـْنَ and ـْنَا merge into a stem that already ends in ن (سَكَنَّ, سَكَنَّا), so the ending's own nūn
// never reaches the extracted suffix and the affix sentence alone would leave it unaccounted for.
// Outside the past, 1p carries no nūn at all: its ending is the bare mood vowel of نَكْتُبَ.
function hasAssimilatedEndingNun(layers: VerbExplanationLayers): boolean {
  const pronoun = layers.pronoun as PronounId
  if (!NUN_INITIAL_ENDING_PRONOUNS.includes(pronoun)) return false
  if (pronoun === '1p' && !layers.tense?.endsWith('past')) return false
  return layers.suffix != null && !layers.suffix.includes(String(NOON))
}

function resolveNominalKey(layers?: NominalExplanationLayers): string {
  if (layers?.nominal == null) return ''
  if (layers.nominal === 'activeParticiple') {
    if (layers.activeParticipleKind === 'fa3iil') return 'explanation.nominal.activeParticiple.form-i-fa3iil'
    if (layers.activeParticipleKind === 'lexical') return 'explanation.nominal.activeParticiple.form-i-lexical'
  }
  if (layers.nominal !== 'masdar')
    return layers.paradigmRoots.length > 3
      ? `explanation.nominal.${layers.nominal}.quad`
      : `explanation.nominal.${layers.nominal}`
  if (layers.paradigmRoots.length > 3) return `explanation.nominal.masdar.${layers.form}`
  if (layers.paradigmForm === 1)
    return layers.isMasdarMimi ? 'explanation.nominal.masdar.form-i-mimi' : 'explanation.nominal.masdar.form-i'
  return layers.masdarPattern ? 'explanation.nominal.masdar.non-form-i' : ''
}

function resolveRootNoteKey(
  rootType: RootAnalysisType,
  weakLetter: WeakLetter | undefined,
  form: TriliteralForm,
): string {
  const live = rootType.filter((shape) => !isNeutralizedByForm(shape, form))

  if (live.length === 0 && rootType.includes('hollow')) return 'explanation.root.hollow-sound-form'
  if (live.length === 0 && rootType.includes('doubled')) return 'explanation.root.doubled-sound-form'
  if (live.length === 1 && live[0] === 'assimilated' && form === 8) return ''
  if (live.length === 1 && live[0] === 'assimilated' && form !== 1) return 'explanation.root.assimilated-sound-form'

  // A neutralized shape only ever drops out above Form I, where a final weak radical is always yāʾ.
  const liveWeakLetter = live.includes('hollow')
    ? weakLetter
    : live.includes('defective')
      ? liveFinalLetter(form, weakLetter)
      : undefined
  return `explanation.root.${rootTypeLocaleKey(live, liveWeakLetter)}`
}

function liveFinalLetter(form: TriliteralForm, weakLetter: WeakLetter | undefined): WeakLetter | undefined {
  return form === 1 ? weakLetter : 'yaa'
}

function isNeutralizedByForm(shape: RootShape, form: TriliteralForm): boolean {
  if (shape === 'hollow') return HOLLOW_NEUTRAL_FORMS.includes(form)
  if (shape === 'doubled') return DOUBLED_NEUTRAL_FORMS.includes(form)
  return false
}

// Only the imperatives that actually open on a cluster carry the prop: اُشْكُرْ and اِنْقَصَّ do,
// while a contracted geminate (ذُمَّ) and a Form IV hamza (أَبْقِ) do not.
const hasAlifAlWasl = (arabic: string): boolean => arabic.startsWith(String(ALIF))

// لَيْسَ is جامد: no pattern prose applies to it, the same exception derivePastFormI and
// getAvailableParadigms already make.
const isLaysa = (root: string): boolean => root === 'ليس'

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
    initialRadical: layers.paradigmRoots[0] ?? '',
    form: toRoman(layers.paradigmForm),
    pattern: (nominalLayers?.nominal === 'masdar' ? nominalLayers?.masdarPattern : undefined) ?? '',
    pastForm: layers.pastForm ?? '',
    presentForm: layers.presentForm ?? '',
  }

  const nominalKey = resolveNominalKey(nominalLayers)
  const rootNoteKey = layers.rootType && resolveRootNoteKey(layers.rootType, layers.weakLetter, layers.paradigmForm)

  if (verbLayers && isLaysa(layers.paradigmRoots.join(''))) {
    return [
      [
        { text: t('explanation.laysa.frozen', params), kind: 'measure' as const },
        { text: t('explanation.laysa.radical', params), kind: 'radical' as const },
      ],
      [{ text: t('explanation.laysa.meaning', params), kind: 'measure' as const }],
      renderPronounSentences(verbLayers, t),
    ].filter((paragraph) => paragraph.length > 0)
  }

  return [
    [
      layers.vowels != null && { text: t(`explanation.form-i-pattern.${layers.vowels}`, params), kind: 'measure' },
      layers.form && {
        text: t(`explanation.form.${layers.form === '1q-bd' ? '1q' : layers.form}`, params),
        kind: 'measure',
      },
      rootNoteKey && { text: t(rootNoteKey, params), kind: 'radical' },
      layers.formRoot && { text: t(`explanation.form-root.${layers.formRoot}`, params), kind: 'radical' },
    ],
    [nominalKey && { text: t(nominalKey, params), kind: 'measure' }],
    [
      verbLayers?.tense?.startsWith('passive') && {
        text: t(`explanation.voice.${verbLayers?.tense}`, params),
        kind: 'measure',
      },
      verbLayers?.tense === 'active.imperative' && {
        text: t('explanation.tense.active.imperative.elision', params),
        kind: 'elided',
      },
      verbLayers?.tense === 'active.imperative' &&
        hasAlifAlWasl(params.arabic) && {
          text: t('explanation.tense.active.imperative.support', params),
          kind: 'measure',
        },
      verbLayers?.tense &&
        verbLayers.tense !== 'active.imperative' &&
        verbLayers.tense !== 'passive.past' && {
          text: t(`explanation.tense.${verbLayers?.tense}`, params),
          kind: tenseKind(verbLayers?.tense),
        },
      layers.paradigmForm === 1 &&
        verbLayers?.tense === 'active.past' &&
        verbLayers.pronoun === '3ms' && {
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

export function resolveVerbExplanationLayers(verb: Verb, tense: VerbTense, pronoun: PronounId): VerbExplanationLayers {
  const { type: rootType, weakLetter } = analyzeRoot(verb.rootTokens)
  const isFormI = isTriliteralFormIVerb(verb) && !isLaysa(verb.root)
  const arabic = String(conjugate(verb, tense)[pronoun])

  return {
    category: 'verb',
    paradigmRoots: Array.from(verb.root),
    paradigmForm: verb.form,
    form: toFormDescriptor(verb),
    arabic,
    rootType,
    weakLetter,
    vowels: isFormI ? verb.vowels : undefined,
    pastForm: isFormI ? String(conjugate(verb, 'active.past')['3ms']) : undefined,
    presentForm: isFormI ? String(conjugate(verb, 'active.present.indicative')['3ms']) : undefined,
    formRoot: toFormRoot(verb.form, verb.rootTokens),
    tense,
    tenseRoot: isLaysa(verb.root) ? undefined : toTenseRoot(verb, tense, pronoun),
    pronoun,
    ...extractAffixes(derivationSteps(verb, tense, pronoun).at(-1)?.morphemes),
  }
}

function toFormRoot(form: TriliteralForm, [c1]: readonly Token[]): FormRootInteraction | undefined {
  if (form !== 8) return
  if ([WAW, YEH].some((weak) => c1.equals(weak))) return 'assimilation-weak-initial'
  const infixConsonant = resolveFormVIIIInfixConsonant(c1)
  if (infixConsonant.equals(c1)) return 'assimilation-complete'
  if (infixConsonant.equals(DAL)) return 'assimilation-voicing'
  if (infixConsonant.equals(TAH)) return 'assimilation-emphasis'
}

// A root can carry more than one irregular shape at once (e.g. assimilated + defective). Only one
// tenseRoot sentence renders, so the dominant shape wins: defective > hollow > doubled > assimilated >
// hamzated - the priority the conjugation itself follows, where a geminate stem (وَدَّ، يَوَدُّ) settles
// the cell before the initial wāw ever could. A root that is both hollow and defective
// (لفيف مقرون) conjugates defective throughout: its middle weak letter stays a plain consonant
// (نَوَى، يَنْوِي), so the final radical is what drives every tense change. A lexically uncontracted
// hollow verb (عَوِزَ، يَعْوَزُ) keeps its middle consonant in every cell, so no cell has one either.
function toTenseRoot(verb: Verb, tenseContext: VerbTense, pronoun: PronounId): TenseRootInteraction | undefined {
  const { type: rootType } = analyzeRoot(verb.rootTokens)

  if (rootType.includes('defective')) return resolveDefective(verb, tenseContext, pronoun)
  if (rootType.includes('hollow') && !HOLLOW_NEUTRAL_FORMS.includes(verb.form) && contractsHollow(verb))
    return resolveHollow(verb, tenseContext, pronoun)
  if (rootType.includes('doubled')) return resolveGeminate(tenseContext, verb.form, pronoun)
  if (rootType.includes('assimilated')) {
    if (!tenseContext.startsWith('active.present') && tenseContext !== 'active.future') return undefined
    if (!isTriliteralFormIVerb(verb) || !verb.rootTokens[0].equals(WAW)) return undefined
    return dropsInitialWaw(verb) ? 'initial-drops' : 'initial-retained'
  }
  if (rootType.includes('hamzated')) {
    const word = conjugate(verb, tenseContext)[pronoun]
    if (word.includes(ALIF_MADDA)) return 'hamza-madda'
    // كُلْ, خُذْ and مُرْ shed the hamza entirely, leaving no seat to describe.
    return word.some((token) => token.isHamza) ? 'hamza-seat' : 'hamza-elides'
  }
}

// A Form VIII stem whose infix assimilates to د keeps a wāw middle radical intact (اِزْدَوَجَ), while
// a yāʾ one still contracts (اِزْدَادَ) - the same split derivePastFormVIII makes.
function contractsHollow(verb: Verb): boolean {
  const [c1, c2] = Array.from(verb.rootTokens)
  if (verb.form === 8 && c2.equals(WAW) && resolveFormVIIIInfixConsonant(c1).equals(DAL)) return false
  return !isTriliteralFormIVerb(verb) || verb.hollowContraction !== 'uncontracted'
}

function resolveGeminate(
  tenseContext: VerbTense,
  form: TriliteralForm,
  pronoun: PronounId,
): TenseRootInteraction | undefined {
  if (DOUBLED_NEUTRAL_FORMS.includes(form)) return undefined
  // Only the bare jussive and imperative admit both an expanded and a contracted form; a personal
  // ending settles the question on its own, exactly as it does in the indicative.
  if (BARE_PRESENT_PRONOUNS.includes(pronoun) && APOCOPATING_TENSES.includes(tenseContext)) return 'geminate-jussive'
  const contracts = tenseContext.endsWith('past')
    ? VOWEL_SUFFIX_PAST_PRONOUNS.includes(pronoun)
    : !FEMININE_PLURAL_PRONOUNS.includes(pronoun)
  return contracts ? 'geminate-contracts' : 'geminate-separates'
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

function resolveActiveParticipleKind(verb: Verb): ActiveParticipleKind {
  if (isFa3iilActiveParticiple(verb)) return 'fa3iil'
  return isTriliteralFormIVerb(verb) && verb.lexicalActiveParticiple ? 'lexical' : 'faa3il'
}

export function resolveNominalExplanationLayers<T extends NominalKind>(
  verb: Verb,
  nominal: T,
  arabic: string | Word | readonly string[],
): NominalExplanationLayers<T> {
  const arabicString: string | readonly string[] = arabic instanceof Word ? String(arabic) : arabic
  const isFormI = isTriliteralFormIVerb(verb)

  const { type: rootType, weakLetter } = analyzeRoot(verb.rootTokens)

  const base = {
    paradigmRoots: Array.from(verb.root),
    paradigmForm: verb.form,
    form: toFormDescriptor(verb),
    arabic: arabicString,
    rootType,
    weakLetter,
    vowels: isFormI ? verb.vowels : undefined,
    pastForm: isFormI ? String(conjugate(verb, 'active.past')['3ms']) : undefined,
    presentForm: isFormI ? String(conjugate(verb, 'active.present.indicative')['3ms']) : undefined,
    formRoot: toFormRoot(verb.form, verb.rootTokens),
  }

  switch (nominal) {
    case 'activeParticiple':
      return {
        ...base,
        nominal,
        category: 'nominal',
        activeParticipleKind: resolveActiveParticipleKind(verb),
      } as NominalExplanationLayers<T>
    case 'passiveParticiple':
      return { ...base, nominal, category: 'nominal' } as NominalExplanationLayers<T>
    case 'masdar':
      return {
        ...base,
        nominal,
        category: 'nominal',
        isMasdarMimi: isMimiMasdarSelection(verb, arabicString),
        masdarPattern: resolveMasdarPattern(verb, arabicString),
      } as NominalExplanationLayers<T>
  }
}
