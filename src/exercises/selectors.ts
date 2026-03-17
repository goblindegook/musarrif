import { conjugateFuture } from '../paradigms/active/future'
import { conjugateImperative } from '../paradigms/active/imperative'
import { conjugatePast } from '../paradigms/active/past'
import { conjugatePresentMood, type Mood } from '../paradigms/active/present'
import { conjugatePassiveFuture } from '../paradigms/passive/future'
import { conjugatePassivePast } from '../paradigms/passive/past'
import { conjugatePassivePresentMood } from '../paradigms/passive/present'
import { canConjugatePassive } from '../paradigms/passive/support'
import type { PronounId } from '../paradigms/pronouns'
import type { Verb } from '../paradigms/verbs'

export type TenseConfig =
  | { voice: 'active'; tense: 'imperative' }
  | { voice: 'active' | 'passive'; tense: 'past' | 'future' }
  | { voice: 'active' | 'passive'; tense: 'present'; mood: Mood }

export const ACTIVE_TENSES: TenseConfig[] = [
  { voice: 'active', tense: 'past' },
  { voice: 'active', tense: 'present', mood: 'indicative' },
  { voice: 'active', tense: 'present', mood: 'subjunctive' },
  { voice: 'active', tense: 'present', mood: 'jussive' },
  { voice: 'active', tense: 'future' },
  { voice: 'active', tense: 'imperative' },
]

export const PASSIVE_TENSES: TenseConfig[] = [
  { voice: 'passive', tense: 'past' },
  { voice: 'passive', tense: 'present', mood: 'indicative' },
  { voice: 'passive', tense: 'present', mood: 'subjunctive' },
  { voice: 'passive', tense: 'present', mood: 'jussive' },
  { voice: 'passive', tense: 'future' },
]

const PRONOUNS: PronounId[] = ['1s', '1p', '2ms', '2fs', '2d', '2mp', '2fp', '3ms', '3fs', '3md', '3fd', '3mp', '3fp']

export function supportedTenses(verb: Verb): TenseConfig[] {
  return canConjugatePassive(verb) ? [...ACTIVE_TENSES, ...PASSIVE_TENSES] : ACTIVE_TENSES
}

export function conjugate(verb: Verb, config: TenseConfig): Record<PronounId, string> {
  switch (config.tense) {
    case 'past':
      return config.voice === 'passive' ? conjugatePassivePast(verb) : conjugatePast(verb)
    case 'present':
      return config.voice === 'passive'
        ? conjugatePassivePresentMood(verb, config.mood)
        : conjugatePresentMood(verb, config.mood)
    case 'future':
      return config.voice === 'passive' ? conjugatePassiveFuture(verb) : conjugateFuture(verb)
    case 'imperative':
      return conjugateImperative(verb)
  }
}

export function randomPronoun(verb: Verb, config: TenseConfig): PronounId {
  if (config.tense === 'imperative') return random(PRONOUNS.filter((p) => p.startsWith('2')))
  if (config.voice === 'passive' && verb.passiveVoice === 'impersonal') return '3ms'
  return random(PRONOUNS)
}

export function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
