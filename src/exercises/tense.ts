import { shuffle } from '@pacote/shuffle'
import { canConjugatePassive } from '../paradigms/passive/support'
import type { PronounId } from '../paradigms/pronouns'
import { conjugate, type VerbTense } from '../paradigms/tense'
import type { Verb } from '../paradigms/verbs'
import {
  ACTIVE_TENSES,
  type Difficulty,
  diacriticsDifficulty,
  PASSIVE_TENSES,
  randomPronoun,
  randomTense,
  randomVerb,
} from './difficulty'
import type { Exercise } from './types'

const TENSE_OPTION_SLUG: Record<string, string> = {
  past: 'past',
  future: 'future',
  imperative: 'imperative',
  'present.indicative': 'present',
  'present.subjunctive': 'subjunctive',
  'present.jussive': 'jussive',
}

function tensesEqual(a: VerbTense, b: VerbTense): boolean {
  return a.join('.') === b.join('.')
}

function tenseKey(tense: VerbTense, includeVoice: boolean): string {
  const slug = TENSE_OPTION_SLUG[tense.slice(1).join('.')]
  if (!includeVoice || tense[1] === 'imperative') return `exercise.tense.option.${slug}`
  return `exercise.tense.option.${tense[0]}.${slug}`
}

export function tenseExercise(difficulty: Difficulty = 'easy'): Exercise {
  const verb = randomVerb(difficulty)
  const tense = randomTense(verb, difficulty === 'hard' ? 'hard' : 'medium')
  const pronoun = randomPronoun(verb, tense, difficulty === 'hard' ? 'hard' : 'medium')
  const [word, options] = buildOptions(verb, tense, pronoun, difficulty)

  return {
    kind: 'tense',
    promptTranslationKey: 'exercise.tense.prompt',
    word,
    options: options.map((t) => tenseKey(t, difficulty === 'hard')),
    answer: options.findIndex((t) => tensesEqual(t, tense)),
  }
}

function buildOptions(
  verb: Verb,
  tense: VerbTense,
  pronoun: PronounId,
  difficulty: Difficulty,
): [string, readonly VerbTense[]] {
  const stripDiacritics = (word: string) => diacriticsDifficulty(word, difficulty)

  const word = stripDiacritics(conjugate(verb, tense)[pronoun])

  const distractors = shuffle(
    (difficulty === 'hard' && canConjugatePassive(verb) ? [...ACTIVE_TENSES, ...PASSIVE_TENSES] : ACTIVE_TENSES).filter(
      (option) => stripDiacritics(conjugate(verb, option)[pronoun]) !== word,
    ),
  ).slice(0, 3)

  return [word, shuffle([tense, ...distractors])]
}
