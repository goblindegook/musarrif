import { FORM_I_PATTERNS } from '../paradigms/form-i-vowels'
import { applyDiacriticsPreference } from '../paradigms/letters'
import type { PronounId } from '../paradigms/pronouns'
import type { VerbTense } from '../paradigms/tense'
import {
  type DisplayVerb,
  FORMS,
  getAvailableParadigms,
  synthesizeVerb,
  type VerbForm,
  verbs,
} from '../paradigms/verbs'
import type { CardConstraints } from './srs'
import { getSrsRootType, type SrsRootType } from './srs'

type Level<T extends readonly unknown[]> =
  Exclude<keyof T, keyof (readonly unknown[])> extends `${infer I extends number}` ? I : never

export type TensesLevel = Level<typeof TENSE_POOLS>
export type PronounsLevel = Level<typeof PRONOUN_POOLS>
export type DiacriticsLevel = Level<typeof DIACRITICS_PREFERENCES>
export type FormsLevel = Level<typeof FORM_POOLS>
export type RootTypesLevel = Level<typeof ROOT_TYPE_POOLS>
export type NominalsLevel = Level<typeof NOMINAL_UNLOCK_KEYS>

export type DimensionProfile = {
  tenses: TensesLevel
  pronouns: PronounsLevel
  diacritics: DiacriticsLevel
  forms: FormsLevel
  rootTypes: RootTypesLevel
  nominals: NominalsLevel
}
export type DimensionKey = keyof DimensionProfile

export type DimensionStore = {
  profile: DimensionProfile
  windows: Record<keyof DimensionProfile, boolean[]>
}

export interface DimensionUnlock {
  dimension: keyof DimensionProfile
  items: readonly string[]
}

export function random<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

const T0: VerbTense[] = ['active.past']
const T1: VerbTense[] = [...T0, 'active.present.indicative']
const T2: VerbTense[] = [...T1, 'active.future']
const T3: VerbTense[] = [...T2, 'active.present.subjunctive', 'active.present.jussive']
const T4: VerbTense[] = [...T3, 'active.imperative']
const T5: VerbTense[] = [
  ...T4,
  'passive.past',
  'passive.present.indicative',
  'passive.present.subjunctive',
  'passive.present.jussive',
  'passive.future',
]
const TENSE_POOLS = [T0, T1, T2, T3, T4, T5] as const

export function randomTense(verb: DisplayVerb, tenses: TensesLevel): VerbTense {
  const available = getAvailableParadigms(verb)
  return random(TENSE_POOLS[tenses].filter((tense) => available.includes(tense)))
}

export function tensePool(tenses: TensesLevel): readonly VerbTense[] {
  return [...TENSE_POOLS[tenses]]
}

const P0: PronounId[] = ['3ms']
const P1: PronounId[] = [...P0, '1s', '2ms', '2fs', '3fs']
const P2: PronounId[] = [...P1, '1p', '2mp', '2fp', '3mp', '3fp']
const P3: PronounId[] = [...P2, '2d', '3md', '3fd']
const PRONOUN_POOLS = [P0, P1, P2, P3] as const

export function pronounPool(pronouns: PronounsLevel): readonly PronounId[] {
  return PRONOUN_POOLS[pronouns]
}

export function randomPronoun(verb: DisplayVerb, tense: VerbTense, pronouns: PronounsLevel): PronounId {
  if (tense === 'active.imperative') {
    const imperativePool = PRONOUN_POOLS[pronouns].filter((p) => p.startsWith('2'))
    return imperativePool.length > 0 ? random(imperativePool) : '2ms'
  }
  if (tense.startsWith('passive') && verb.passiveVoice === 'impersonal') return '3ms'
  return random(PRONOUN_POOLS[pronouns])
}

export function normalizeExercisePronoun(verb: DisplayVerb, tense: VerbTense, pronoun: PronounId): PronounId {
  if (tense.startsWith('passive') && verb.passiveVoice === 'impersonal') return '3ms'
  return pronoun
}

const F0: VerbForm[] = [1]
const F1: VerbForm[] = [...F0, 2]
const F2: VerbForm[] = [...F1, 3]
const F3: VerbForm[] = [...F2, 4]
const F4: VerbForm[] = [...F3, 5]
const F5: VerbForm[] = [...F4, 6]
const F6: VerbForm[] = [...F5, 7]
const F7: VerbForm[] = [...F6, 8]
const F8: VerbForm[] = [...F7, 9]
const F9: VerbForm[] = [...F8, 10]
const FORM_POOLS = [F0, F1, F2, F3, F4, F5, F6, F7, F8, F9] as const

export function formPool(forms: FormsLevel): readonly VerbForm[] {
  return FORM_POOLS[forms]
}

const R0: SrsRootType[] = ['sound']
const R1: SrsRootType[] = [...R0, 'doubled']
const R2: SrsRootType[] = [...R1, 'hamzated']
const R3: SrsRootType[] = [...R2, 'assimilated']
const R4: SrsRootType[] = [...R3, 'hollow']
const R5: SrsRootType[] = [...R4, 'defective']
const ROOT_TYPE_POOLS = [R0, R1, R2, R3, R4, R5] as const

const DIACRITICS_PREFERENCES = ['all', 'some', 'none'] as const

const NOMINAL_UNLOCK_KEYS = [
  [],
  ['exercise.unlock.nominal.activeParticiple', 'exercise.unlock.nominal.passiveParticiple'],
  ['exercise.unlock.nominal.masdar'],
] as const

const DIMENSION_UNLOCK_KEYS: Record<keyof DimensionProfile, readonly (readonly string[])[]> = {
  tenses: [
    [],
    ['exercise.unlock.tenseGroup.presentIndicative'],
    ['exercise.unlock.tenseGroup.future'],
    ['exercise.unlock.tenseGroup.subjunctiveJussive'],
    ['exercise.unlock.tenseGroup.imperative'],
    ['exercise.unlock.tenseGroup.passive'],
  ],
  pronouns: [
    [],
    ['exercise.unlock.pronounGroup.singular'],
    ['exercise.unlock.pronounGroup.plural'],
    ['exercise.unlock.pronounGroup.dual'],
  ],
  diacritics: [[], ['exercise.unlock.diacriticsMode.some'], ['exercise.unlock.diacriticsMode.none']],
  forms: [
    [],
    ['exercise.unlock.form.2'],
    ['exercise.unlock.form.3'],
    ['exercise.unlock.form.4'],
    ['exercise.unlock.form.5'],
    ['exercise.unlock.form.6'],
    ['exercise.unlock.form.7'],
    ['exercise.unlock.form.8'],
    ['exercise.unlock.form.9'],
    ['exercise.unlock.form.10'],
  ],
  rootTypes: [
    [],
    ['exercise.unlock.rootType.doubled'],
    ['exercise.unlock.rootType.hamzated'],
    ['exercise.unlock.rootType.assimilated'],
    ['exercise.unlock.rootType.hollow'],
    ['exercise.unlock.rootType.defective'],
  ],
  nominals: [...NOMINAL_UNLOCK_KEYS],
}

export function rootTypesPool(level: RootTypesLevel): readonly SrsRootType[] {
  return ROOT_TYPE_POOLS[level]
}

export function randomVerb(profile: DimensionProfile, constraints?: CardConstraints): DisplayVerb {
  const availableForms = formPool(profile.forms)
  const availableRootTypes = rootTypesPool(profile.rootTypes)
  let pool = verbs.filter(
    ({ root, form }) =>
      root.length === 3 &&
      (availableForms as VerbForm[]).includes(form) &&
      (availableRootTypes as SrsRootType[]).includes(getSrsRootType(root)),
  )
  if (constraints?.form != null) pool = pool.filter((v) => v.form === constraints.form)
  if (constraints?.rootType != null) pool = pool.filter((v) => getSrsRootType(v.root) === constraints.rootType)
  const triliterals = verbs.filter(({ root }) => root.length === 3)
  return random(pool.length > 0 ? pool : triliterals)
}

export function randomGeneratedVerb(root: string, form: VerbForm = random(FORMS)): DisplayVerb {
  if (form === 1) return synthesizeVerb(root, 1, random(FORM_I_PATTERNS))
  return synthesizeVerb(root, form)
}

export function exerciseDiacritics(word: string, diacritics: DiacriticsLevel): string {
  const pref = DIACRITICS_PREFERENCES[diacritics]
  return applyDiacriticsPreference(word, pref)
}

const WINDOW_SIZES: Record<keyof DimensionProfile, number> = {
  tenses: 20,
  pronouns: 20,
  diacritics: 50,
  forms: 20,
  rootTypes: 20,
  nominals: 20,
}
const PROMOTION_THRESHOLD = 0.8
const DEMOTION_THRESHOLD = 0.4

const MAX_LEVELS: Record<keyof DimensionProfile, number> = {
  tenses: TENSE_POOLS.length - 1,
  pronouns: PRONOUN_POOLS.length - 1,
  diacritics: DIACRITICS_PREFERENCES.length - 1,
  forms: FORM_POOLS.length - 1,
  rootTypes: ROOT_TYPE_POOLS.length - 1,
  nominals: NOMINAL_UNLOCK_KEYS.length - 1,
}

export function enforcePrerequisites(profile: DimensionProfile): DimensionProfile {
  const p = { ...profile }
  if (p.nominals >= 1 && (p.tenses < 2 || p.pronouns < 2)) p.nominals = 0
  if (p.nominals >= 2 && p.forms < FORM_POOLS.length - 1) p.nominals = 1
  if (
    p.diacritics >= 2 &&
    !(
      p.tenses >= MAX_LEVELS.tenses &&
      p.pronouns >= MAX_LEVELS.pronouns &&
      p.forms >= MAX_LEVELS.forms &&
      p.rootTypes >= MAX_LEVELS.rootTypes &&
      p.nominals >= MAX_LEVELS.nominals
    )
  ) {
    p.diacritics = 1
  }
  return p
}

export function recordDimensionAnswer(
  store: DimensionStore,
  dimensions: readonly DimensionKey[],
  correct: boolean,
): DimensionStore {
  const windows = { ...store.windows }
  for (const dim of dimensions) {
    const appended = [...windows[dim], correct]
    windows[dim] = appended.length > WINDOW_SIZES[dim] ? appended.slice(-WINDOW_SIZES[dim]) : appended
  }
  return { ...store, windows }
}

export function promoteDimensions(store: DimensionStore, allowPromotion = true): DimensionStore {
  const { profile, windows } = store
  const nextProfile = { ...profile }

  for (const dimension of Object.keys(profile) as (keyof DimensionProfile)[]) {
    const w = windows[dimension]
    const current = profile[dimension]
    const windowSize = WINDOW_SIZES[dimension]
    if (w.length < windowSize) continue
    const accuracy = w.filter(Boolean).length / windowSize
    const canPromote =
      profile.pronouns >= 1 || !(dimension === 'tenses' || dimension === 'forms' || dimension === 'rootTypes')
    if (allowPromotion && accuracy >= PROMOTION_THRESHOLD && current < MAX_LEVELS[dimension] && canPromote) {
      ;(nextProfile as Record<string, number>)[dimension] = current + 1
    } else if (accuracy <= DEMOTION_THRESHOLD && current > 0) {
      ;(nextProfile as Record<string, number>)[dimension] = current - 1
    }
  }

  const enforced = enforcePrerequisites(nextProfile)

  const nextWindows = { ...windows }
  for (const dimension of Object.keys(profile) as (keyof DimensionProfile)[]) {
    if (enforced[dimension] !== profile[dimension]) {
      nextWindows[dimension] = []
    }
  }
  return { profile: enforced, windows: nextWindows }
}

export function getDimensionUnlocks(previous: DimensionProfile, next: DimensionProfile): DimensionUnlock[] {
  const unlocks: DimensionUnlock[] = []
  for (const dimension of Object.keys(previous) as (keyof DimensionProfile)[]) {
    const current = previous[dimension]
    const target = next[dimension]
    if (target <= current) continue
    const levelUnlocks = DIMENSION_UNLOCK_KEYS[dimension]
    const items: string[] = []
    for (let level = current + 1; level <= target; level++) {
      items.push(...(levelUnlocks[level] ?? []))
    }
    if (items.length > 0) unlocks.push({ dimension, items })
  }
  return unlocks
}
