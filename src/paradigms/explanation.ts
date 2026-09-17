import { toRoman } from '../primitives/numbers'
import { dropsInitialWaw } from './active/present'
import { derivationSteps } from './annotation'
import { conjugate } from './conjugation'
import type { FormIPattern } from './form-i-vowels'
import { deriveMasdar } from './nominal/masdar'
import { isFa3iilActiveParticiple } from './nominal/participle'
import type { PronounId } from './pronouns'
import {
  analyzeRoot,
  behaviourShapes,
  type RootAnalysis,
  type RootAnalysisType,
  type RootShape,
  rootShapes,
  rootTypeLocaleKey,
  type WeakLetter,
} from './roots'
import type { VerbTense } from './tense'
import {
  ALIF,
  ALIF_MADDA,
  DAL,
  FATHA,
  NOON,
  normalizeForComparison,
  resolveFormVIIIInfixConsonant,
  TAH,
  WAW,
  YEH,
} from './tokens'
import {
  getAvailableParadigms,
  isQuadriliteralVerb,
  isTriliteralFormIVerb,
  type TriliteralForm,
  type Verb,
} from './verbs'
import type { Morpheme } from './word'
import { Word } from './word'

type FormIVowel = 'a' | 'i' | 'u'

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
  | '2q'
  | '3q'
  | '4q'

export type NominalKind = 'activeParticiple' | 'passiveParticiple' | 'masdar'

type ActiveParticipleKind = 'faa3il' | 'fa3iil' | 'lexical'

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

type NominalRootInteraction = 'geminate-contracts' | 'geminate-separates'

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

interface BaseNominalExplanationLayers extends BaseExplanationLayers {
  category: 'nominal'
  nominalRoot?: NominalRootInteraction
}

interface ActiveParticipleExplanationLayers extends BaseNominalExplanationLayers {
  nominal: 'activeParticiple'
  activeParticipleKind: ActiveParticipleKind
}

interface PassiveParticipleExplanationLayers extends BaseNominalExplanationLayers {
  nominal: 'passiveParticiple'
}

interface MasdarExplanationLayers extends BaseNominalExplanationLayers {
  nominal: 'masdar'
  isMasdarMimi: boolean
  masdarPattern?: string
}

type NominalExplanationLayers<T extends NominalKind = NominalKind> = Extract<
  ActiveParticipleExplanationLayers | PassiveParticipleExplanationLayers | MasdarExplanationLayers,
  { nominal: T }
>

export type ExplanationLayers = VerbExplanationLayers | NominalExplanationLayers

export type ExplanationKind = 'radical' | 'measure' | 'agreement' | 'particle' | 'elided'

export interface ExplanationSentence {
  text: string
  kind: ExplanationKind
}

export type Paragraph = readonly ExplanationSentence[]

export type Paragraphs = readonly Paragraph[]

type DraftParagraph = readonly (ExplanationSentence | undefined)[]

// The past-tense pronouns whose ending starts with a vowel, so nothing forces the stem to break up.
const VOWEL_SUFFIX_PAST_PRONOUNS: readonly PronounId[] = ['3ms', '3fs', '3md', '3fd', '3mp']

// The present-tense pronouns whose ـْنَ ending starts with sukūn.
const FEMININE_PLURAL_PRONOUNS: readonly PronounId[] = ['2fp', '3fp']

// The present-tense pronouns whose ending starts with a vowel, which protects the stem from apocope.
const VOWEL_SUFFIX_PRESENT_PRONOUNS: readonly PronounId[] = ['2fs', '2d', '2mp', '3md', '3fd', '3mp']

// The pronouns whose ending opens on the dual's own alif: ـَا, or ـَانِ in the indicative.
const DUAL_PRONOUNS: readonly PronounId[] = ['2d', '3md', '3fd']

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
} as const satisfies Record<FormIVowel, TenseRootInteraction>

// Forms V and VI always close on ـَى (يَتَخَلَّى, يَتَعَافَى); the other derived forms always on ī
// (يُخَلِّي, يُنَادِي, يَسْتَدْعِي). Form I follows its own present vowel, exactly as a hollow root does.
const DEFECTIVE_PRESENT_AA_FORMS: readonly TriliteralForm[] = [5, 6]

const FORM_I_PRESENT_ENDING = {
  a: 'final-lengthens-aa',
  i: 'final-lengthens-ii',
  u: 'final-lengthens-uu',
} as const satisfies Record<FormIVowel, TenseRootInteraction>

const PAST_VOWEL_NAMES: Record<FormIVowel, { pastVowel: string; arabicVowel: string }> = {
  a: { pastVowel: 'fatḥa', arabicVowel: 'فَتْحَة' },
  i: { pastVowel: 'kasra', arabicVowel: 'كَسْرَة' },
  u: { pastVowel: 'ḍamma', arabicVowel: 'ضَمَّة' },
}

const NON_FORM_I_MASDAR_PATTERNS: Partial<Record<TriliteralForm, string>> = {
  2: 'تَفْعِيل',
  3: 'مُفَاعَلَة',
  4: 'إِفْعَال',
  5: 'تَفَعُّل',
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
  4: 'اِفْعِلَّال',
}

function toArabicText(arabic: string | readonly string[]): string {
  return Array.isArray(arabic) ? arabic.join('، ') : String(arabic)
}

// Only the imperatives that actually open on a cluster carry the prop: اُشْكُرْ and اِنْقَصَّ do,
// while a contracted geminate (ذُمَّ) and a Form IV hamza (أَبْقِ) do not.
const hasAlifAlWasl = (arabic: string): boolean => arabic.startsWith(String(ALIF))

// لَيْسَ is جامد: no pattern prose applies to it, the same exception derivePastFormI and
// getAvailableParadigms already make.
const isLaysa = (root: string): boolean => root === 'ليس'

export function toFormDescriptor(
  verb: Pick<Verb, 'form' | 'rootTokens'> & { vowels?: FormIPattern },
): VerbFormDescriptor {
  if (verb.rootTokens.length > 3) return `${verb.form}q` as VerbFormDescriptor
  if (verb.form === 1 && verb.vowels) {
    const past = verb.vowels[0]
    if (past === 'u') return '1-stative'
    if (past === 'i') return '1-intermediate'
    return '1-action'
  }
  return String(verb.form) as VerbFormDescriptor
}

// عَوِزَ and خَوِرَ carry a wāw that never turns into a long vowel, so the hollow shape they have on
// paper is not one any cell shows.
function liveRootAnalysis(verb: Verb): RootAnalysis {
  const analysis = analyzeRoot(verb.rootTokens)
  if (contractsHollow(verb)) return analysis
  return { ...analysis, type: rootShapes(analysis.type.filter((shape) => shape !== 'hollow')), weakLetter: undefined }
}

// A Form VIII stem whose infix assimilates to د keeps a wāw middle radical intact (اِزْدَوَجَ), while
// a yāʾ one still contracts (اِزْدَادَ) - the same split derivePastFormVIII makes.
function contractsHollow(verb: Verb): boolean {
  const [c1, c2] = Array.from(verb.rootTokens)
  if (verb.form === 8 && c2.equals(WAW) && resolveFormVIIIInfixConsonant(c1).equals(DAL)) return false
  return !isTriliteralFormIVerb(verb) || verb.hollowContraction !== 'uncontracted'
}

function baseLayers(verb: Verb, arabic: string | readonly string[]): BaseExplanationLayers {
  const { type: rootType, weakLetter } = liveRootAnalysis(verb)

  return {
    arabic,
    paradigmRoots: Array.from(verb.root),
    paradigmForm: verb.form,
    form: toFormDescriptor(verb),
    rootType,
    weakLetter,
    formRoot: toFormRoot(verb),
  }
}

type FormICitation = Pick<BaseExplanationLayers, 'vowels' | 'pastForm' | 'presentForm'>

const NO_FORM_I_CITATION: FormICitation = { vowels: undefined, pastForm: undefined, presentForm: undefined }

function formICitation(verb: Verb): FormICitation {
  if (!isTriliteralFormIVerb(verb)) return NO_FORM_I_CITATION

  return {
    vowels: verb.vowels,
    pastForm: String(conjugate(verb, 'active.past')['3ms']),
    presentForm: String(conjugate(verb, 'active.present.indicative')['3ms']),
  }
}

export function resolveVerbExplanationLayers(verb: Verb, tense: VerbTense, pronoun: PronounId): VerbExplanationLayers {
  const frozen = isLaysa(verb.root)

  return {
    ...baseLayers(verb, getAvailableParadigms(verb).includes(tense) ? String(conjugate(verb, tense)[pronoun]) : ''),
    ...(frozen ? NO_FORM_I_CITATION : formICitation(verb)),
    category: 'verb',
    tense,
    tenseRoot: frozen ? undefined : toTenseRoot(verb, tense, pronoun),
    pronoun,
    ...extractAffixes(derivationSteps(verb, tense, pronoun).at(-1)?.morphemes),
  }
}

export function resolveNominalExplanationLayers<T extends NominalKind>(
  verb: Verb,
  nominal: T,
  arabic: string | Word | readonly string[],
): NominalExplanationLayers<T> {
  const arabicText: string | readonly string[] = arabic instanceof Word ? String(arabic) : arabic
  const base = {
    ...baseLayers(verb, arabicText),
    ...formICitation(verb),
    category: 'nominal' as const,
    nominal,
    nominalRoot: toNominalRoot(verb, arabicText),
  }

  if (nominal === 'activeParticiple')
    return { ...base, activeParticipleKind: resolveActiveParticipleKind(verb) } as NominalExplanationLayers<T>

  if (nominal === 'masdar')
    return {
      ...base,
      isMasdarMimi: isMimiMasdarSelection(verb, arabicText),
      masdarPattern: resolveMasdarPattern(verb, arabicText),
    } as NominalExplanationLayers<T>

  return base as NominalExplanationLayers<T>
}

function extractAffixes(morphemes: readonly Morpheme[] = []): {
  prefix?: string
  suffix?: string
  elidedPrefix?: string
  elidedSuffix?: string
} {
  const firstStem = morphemes.findIndex(isStem)

  if (firstStem === -1) return {}

  const before = morphemes.slice(0, firstStem)
  const after = morphemes.slice(morphemes.findLastIndex(isStem) + 1).filter((m) => String(m) !== 'ْ')

  return {
    prefix: affixText(kept(before)),
    suffix: affixText(kept(after)),
    elidedPrefix: affixText(elided(before)),
    elidedSuffix: affixText(elided(after)),
  }
}

const isStem = (morpheme: Morpheme): boolean => morpheme.role === 'radical' || morpheme.role === 'measure'
const kept = (part: readonly Morpheme[]): readonly Morpheme[] => part.filter((m) => m.role !== 'elided')
const elided = (part: readonly Morpheme[]): readonly Morpheme[] => part.filter((m) => m.role === 'elided')
const affixText = (part: readonly Morpheme[]): string | undefined => part.map(String).join('') || undefined

function toFormRoot(verb: Verb): FormRootInteraction | undefined {
  if (verb.form !== 8) return

  const [c1] = verb.rootTokens
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
function toTenseRoot(verb: Verb, tense: VerbTense, pronoun: PronounId): TenseRootInteraction | undefined {
  const { type: rootType } = analyzeRoot(verb.rootTokens)

  if (rootType.includes('defective')) return resolveDefective(verb, tense, pronoun)
  if (rootType.includes('hollow') && !HOLLOW_NEUTRAL_FORMS.includes(verb.form) && contractsHollow(verb))
    return resolveHollow(verb, tense, pronoun)
  if (rootType.includes('doubled')) return resolveGeminate(verb, tense, pronoun)
  if (rootType.includes('assimilated')) return resolveAssimilated(verb, tense)
  if (rootType.includes('hamzated')) return resolveHamzated(verb, tense, pronoun)
}

function resolveDefective(verb: Verb, tense: VerbTense, pronoun: PronounId): TenseRootInteraction | undefined {
  switch (tense) {
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

function barePresentEnding(verb: Verb): TenseRootInteraction {
  if (DEFECTIVE_PRESENT_AA_FORMS.includes(verb.form)) return 'final-lengthens-aa'
  if (isTriliteralFormIVerb(verb)) return FORM_I_PRESENT_ENDING[verb.vowels[2] as FormIVowel]
  return 'final-lengthens-ii'
}

// The long middle vowel survives only when nothing consonantal follows it: a vowel-initial ending
// keeps it in every tense, while the jussive and imperative shorten it wherever such an ending is
// absent, and the feminine plural ـْنَ shortens it even in the indicative.
function resolveHollow(verb: Verb, tense: VerbTense, pronoun: PronounId): TenseRootInteraction {
  const isPassive = tense.startsWith('passive')

  if (tense.endsWith('past')) {
    if (!VOWEL_SUFFIX_PAST_PRONOUNS.includes(pronoun)) return 'middle-shortens-consonant'
    return isPassive ? 'middle-passive-ii' : 'middle-lengthens-aa'
  }

  if (!VOWEL_SUFFIX_PRESENT_PRONOUNS.includes(pronoun) && APOCOPATING_TENSES.includes(tense)) return 'middle-shortens'
  if (FEMININE_PLURAL_PRONOUNS.includes(pronoun)) return 'middle-shortens-consonant'
  if (isPassive) return 'middle-passive-aa'
  if (HOLLOW_PRESENT_II_FORMS.includes(verb.form)) return 'middle-lengthens-ii-derived'
  if (HOLLOW_PRESENT_AA_FORMS.includes(verb.form)) return 'middle-lengthens-aa-present'
  if (isTriliteralFormIVerb(verb)) return FORM_I_PRESENT_LENGTHENING[verb.vowels[2] as FormIVowel]
  return 'middle-lengthens-aa-present'
}

function resolveGeminate(verb: Verb, tense: VerbTense, pronoun: PronounId): TenseRootInteraction | undefined {
  if (DOUBLED_NEUTRAL_FORMS.includes(verb.form)) return undefined
  // Only the bare jussive and imperative admit both an expanded and a contracted form; a personal
  // ending settles the question on its own, exactly as it does in the indicative.
  if (BARE_PRESENT_PRONOUNS.includes(pronoun) && APOCOPATING_TENSES.includes(tense)) return 'geminate-jussive'

  const contracts = tense.endsWith('past')
    ? VOWEL_SUFFIX_PAST_PRONOUNS.includes(pronoun)
    : !FEMININE_PLURAL_PRONOUNS.includes(pronoun)
  return contracts ? 'geminate-contracts' : 'geminate-separates'
}

function resolveAssimilated(verb: Verb, tense: VerbTense): TenseRootInteraction | undefined {
  if (!tense.startsWith('active.present') && tense !== 'active.future') return undefined
  if (!isTriliteralFormIVerb(verb) || !verb.rootTokens[0].equals(WAW)) return undefined
  return dropsInitialWaw(verb) ? 'initial-drops' : 'initial-retained'
}

function resolveHamzated(verb: Verb, tense: VerbTense, pronoun: PronounId): TenseRootInteraction {
  const word = conjugate(verb, tense)[pronoun]
  if (word.includes(ALIF_MADDA)) return 'hamza-madda'
  // كُلْ, خُذْ and مُرْ shed the hamza entirely, leaving no seat to describe.
  return word.some((token) => token.isHamza) ? 'hamza-seat' : 'hamza-elides'
}

// Every pattern either writes the identical pair once with a شَدَّة (مَدّ، مُمْتَدّ) or keeps a vowel
// between them (ضَرَر، مَمْدُود، اِمْتِدَاد), so the second radical's own count settles the cell. A masdar
// list that does both (ضَرّ، ضَرَر) has no single answer to give.
function toNominalRoot(verb: Verb, arabic: string | readonly string[]): NominalRootInteraction | undefined {
  const { type: rootType } = liveRootAnalysis(verb)
  if (!rootType.includes('doubled') || DOUBLED_NEUTRAL_FORMS.includes(verb.form)) return undefined

  const [, c2] = verb.rootTokens
  const outcomes = new Set(
    (typeof arabic === 'string' ? [arabic] : arabic).map((form) =>
      Array.from(form).filter((letter) => c2.equals(letter)).length > 1 ? 'geminate-separates' : 'geminate-contracts',
    ),
  )

  return outcomes.size === 1 ? [...outcomes][0] : undefined
}

function resolveActiveParticipleKind(verb: Verb): ActiveParticipleKind {
  if (isFa3iilActiveParticiple(verb)) return 'fa3iil'
  return isTriliteralFormIVerb(verb) && verb.lexicalActiveParticiple ? 'lexical' : 'faa3il'
}

function isMimiMasdarSelection(verb: Verb, arabic: string | readonly string[]): boolean {
  if (!isTriliteralFormIVerb(verb)) return false

  const selectedValues = (Array.isArray(arabic) ? arabic : [arabic]).map(normalizeForComparison)
  const patterns = verb.masdars ?? ['mimi']

  return deriveMasdar(verb).some(
    (masdar, index) => patterns[index] === 'mimi' && selectedValues.includes(normalizeForComparison(masdar)),
  )
}

function resolveMasdarPattern(verb: Verb, arabic: string | readonly string[]): string | undefined {
  if (isTriliteralFormIVerb(verb))
    return isMimiMasdarSelection(verb, arabic) ? resolveMimiPatternLabel(verb, toArabicText(arabic)) : undefined

  return isQuadriliteralVerb(verb)
    ? (QUADRILITERAL_MASDAR_PATTERNS[verb.form] ?? '')
    : (NON_FORM_I_MASDAR_PATTERNS[verb.form] ?? '')
}

function resolveMimiPatternLabel(verb: Verb, arabic: string): string {
  if (arabic.endsWith('ة')) return 'مَفْعَلَة'
  if (isTriliteralFormIVerb(verb) && verb.vowels.endsWith('i')) return 'مَفْعِل'
  return 'مَفْعَل'
}

export function renderExplanation(layers: ExplanationLayers, t: Translate): Paragraphs {
  const arabic = toArabicText(layers.arabic)

  // A paradigm the verb does not have leaves the cell empty, and an empty cell has nothing to explain.
  if (!arabic) return []

  const nominalLayers = layers.category === 'nominal' ? layers : undefined
  const verbLayers = layers.category === 'verb' ? layers : undefined
  const tense = verbLayers?.tense

  const say = sayWith(t, {
    ...(layers.vowels && PAST_VOWEL_NAMES[layers.vowels[0] as FormIVowel]),
    arabic,
    root: layers.paradigmRoots.join('-'),
    initialRadical: layers.paradigmRoots[0] ?? '',
    form: toRoman(layers.paradigmForm),
    pattern: (nominalLayers?.nominal === 'masdar' ? nominalLayers.masdarPattern : undefined) ?? '',
    pastForm: layers.pastForm ?? '',
    presentForm: layers.presentForm ?? '',
  })

  if (verbLayers && isLaysa(layers.paradigmRoots.join('')))
    return toParagraphs(
      [say('measure', 'explanation.laysa.frozen'), say('radical', 'explanation.laysa.radical')],
      [say('measure', 'explanation.laysa.meaning')],
      renderPronounSentences(verbLayers, t),
    )

  return toParagraphs(
    [
      say('measure', layers.vowels && `explanation.form-i-pattern.${layers.vowels}`),
      say('measure', layers.form && `explanation.form.${layers.form}`),
      say('measure', layers.form === '8' && hasAlifAlWasl(arabic) && 'explanation.form.8-wasl'),
      say('radical', resolveRootNoteKey(layers)),
      say('radical', layers.rootType?.includes('biliteral') && 'explanation.root.biliteral'),
      say('radical', layers.formRoot && `explanation.form-root.${layers.formRoot}`),
    ],
    [
      say('measure', resolveNominalKey(nominalLayers)),
      say('radical', nominalLayers?.nominalRoot && `explanation.nominal-root.${nominalLayers.nominalRoot}`),
    ],
    [
      say('measure', tense?.startsWith('passive') && `explanation.voice.${tense}`),
      say('elided', tense === 'active.imperative' && 'explanation.tense.active.imperative.elision'),
      say(
        'measure',
        tense === 'active.imperative' && hasAlifAlWasl(arabic) && 'explanation.tense.active.imperative.support',
      ),
      tense &&
        say(
          tenseKind(tense),
          tense !== 'active.imperative' && tense !== 'passive.past' && `explanation.tense.${tense}`,
        ),
      say(
        'measure',
        layers.paradigmForm === 1 &&
          tense === 'active.past' &&
          verbLayers?.pronoun === '3ms' &&
          'explanation.tense.active.past.form-i',
      ),
      say('radical', verbLayers?.tenseRoot && `explanation.tense-root.${verbLayers.tenseRoot}`),
    ],
    renderPronounSentences(verbLayers, t),
  )
}

function tenseKind(tense: VerbTense): ExplanationKind {
  if (tense === 'active.future') return 'particle'
  if (tense === 'active.past' || tense.startsWith('passive')) return 'measure'
  return 'agreement'
}

function resolveRootNoteKey(layers: ExplanationLayers): string {
  const { rootType, weakLetter, paradigmForm: form } = layers
  if (rootType == null) return ''

  const live = behaviourShapes(rootType).filter((shape) => !isNeutralizedByForm(shape, form))

  if (live.length === 0 && rootType.includes('hollow')) return 'explanation.root.hollow-sound-form'
  if (live.length === 0 && rootType.includes('doubled')) return 'explanation.root.doubled-sound-form'
  if (live.length === 1 && live[0] === 'assimilated' && form === 8) return ''
  if (live.length === 1 && live[0] === 'assimilated' && form !== 1) return 'explanation.root.assimilated-sound-form'

  // A neutralized shape only ever drops out above Form I, where a final weak radical is always yāʾ.
  const liveWeakLetter = live.includes('hollow')
    ? weakLetter
    : live.includes('defective')
      ? form === 1
        ? weakLetter
        : 'yaa'
      : undefined
  return `explanation.root.${rootTypeLocaleKey(live, liveWeakLetter)}`
}

function isNeutralizedByForm(shape: RootShape, form: TriliteralForm): boolean {
  if (shape === 'hollow') return HOLLOW_NEUTRAL_FORMS.includes(form)
  if (shape === 'doubled') return DOUBLED_NEUTRAL_FORMS.includes(form)
  return false
}

function resolveNominalKey(layers?: NominalExplanationLayers): string {
  if (layers == null) return ''

  const isQuadriliteral = layers.paradigmRoots.length > 3

  if (layers.nominal === 'masdar') {
    if (isQuadriliteral) return `explanation.nominal.masdar.${layers.form}`
    if (layers.paradigmForm !== 1) return layers.masdarPattern ? 'explanation.nominal.masdar.non-form-i' : ''
    return layers.isMasdarMimi ? 'explanation.nominal.masdar.form-i-mimi' : 'explanation.nominal.masdar.form-i'
  }

  if (layers.nominal === 'activeParticiple' && layers.activeParticipleKind !== 'faa3il')
    return `explanation.nominal.activeParticiple.form-i-${layers.activeParticipleKind}`

  return isQuadriliteral ? `explanation.nominal.${layers.nominal}.quad` : `explanation.nominal.${layers.nominal}`
}

function renderPronounSentences(layers: VerbExplanationLayers | undefined, t: Translate): Paragraph {
  if (layers?.pronoun == null) return []

  const say = sayWith(t, { pronounLabel: t(`pronoun.${layers.pronoun}`), arabic: toArabicText(layers.arabic) })
  const assimilatedNun = hasAssimilatedEndingNun(layers)

  const prefix = layers.prefix ? `${layers.prefix}ـ` : undefined
  const ending = `${hasAbsorbedDualAlif(layers) ? `${FATHA}${ALIF}` : ''}${assimilatedNun ? String(NOON) : ''}${layers.suffix ?? ''}`
  const suffix = ending ? `ـ${ending}` : undefined

  const affixKey =
    prefix && suffix ? 'prefix-and-suffix' : prefix ? 'prefix-only' : suffix ? 'suffix-only' : 'base-form'

  return toParagraph(
    affixKey === 'base-form' && layers.paradigmForm === 1 && layers.tense === 'active.past'
      ? undefined
      : say('agreement', `explanation.pronoun.${affixKey}`, {
          ...(prefix && { prefix }),
          ...(suffix && { suffix }),
        }),
    say('elided', layers.elidedPrefix && layers.tense !== 'active.imperative' && 'explanation.pronoun.dropped-prefix', {
      elidedPrefix: `${layers.elidedPrefix}ـ`,
    }),
    say('elided', layers.elidedSuffix?.includes(String(NOON)) && 'explanation.pronoun.dropped-suffix', {
      elidedSuffix: `ـ${layers.elidedSuffix}`,
    }),
    say('elided', assimilatedNun && 'explanation.pronoun.assimilated-nun'),
  )
}

// A stem-final hamza swallows the dual's own alif into a madda (يَقْرَآنِ, قَرَآ, يَطَآنِ), leaving the
// extracted suffix with the nūn alone, or with nothing at all where the mood drops the nūn too.
function hasAbsorbedDualAlif(layers: VerbExplanationLayers): boolean {
  if (!DUAL_PRONOUNS.includes(layers.pronoun as PronounId)) return false
  if (layers.suffix?.includes(String(ALIF))) return false
  return toArabicText(layers.arabic).includes(String(ALIF_MADDA))
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

type Translate = (key: string, params?: Record<string, string>) => string

function sayWith(t: Translate, params: Record<string, string>) {
  return (
    kind: ExplanationKind,
    key: string | false | undefined,
    extraParams?: Record<string, string>,
  ): ExplanationSentence | undefined => (key ? { text: t(key, { ...params, ...extraParams }), kind } : undefined)
}

function toParagraph(...sentences: DraftParagraph): Paragraph {
  return sentences.filter((sentence): sentence is ExplanationSentence => sentence != null)
}

function toParagraphs(...paragraphs: readonly DraftParagraph[]): Paragraphs {
  return paragraphs.map((sentences) => toParagraph(...sentences)).filter((paragraph) => paragraph.length > 0)
}
