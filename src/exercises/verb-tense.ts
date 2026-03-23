import { shuffle } from '@pacote/shuffle'
import { canConjugatePassive } from '../paradigms/passive/support'
import type { PronounId } from '../paradigms/pronouns'
import { getRootType } from '../paradigms/roots'
import { conjugate, type VerbTense } from '../paradigms/tense'
import type { DisplayVerb } from '../paradigms/verbs'
import {
  ACTIVE_TENSES,
  type Difficulty,
  diacriticsDifficulty,
  PASSIVE_TENSES,
  randomPronoun,
  randomTense,
  randomVerb,
} from './difficulty'
import type { CardConstraints } from './srs'
import { buildCardKey } from './srs'
import type { Exercise } from './types'

const TENSE_OPTION_SLUG: Record<string, string> = {
  past: 'past',
  future: 'future',
  imperative: 'imperative',
  'present.indicative': 'present',
  'present.subjunctive': 'subjunctive',
  'present.jussive': 'jussive',
}

function tenseKey(tense: VerbTense, includeVoice: boolean): string {
  const slug = TENSE_OPTION_SLUG[tense.slice(1).join('.')]
  if (!includeVoice || tense[1] === 'imperative') return `exercise.tense.option.${slug}`
  return `exercise.tense.option.${tense[0]}.${slug}`
}

export function verbTenseExercise(difficulty: Difficulty = 'easy', constraints?: CardConstraints): Exercise {
  const verb = randomVerb(constraints)
  const tense = constraints?.tense ?? randomTense(verb, difficulty === 'hard' ? 'hard' : 'medium')
  const pronoun = constraints?.pronoun ?? randomPronoun(verb, tense, difficulty === 'hard' ? 'hard' : 'medium')
  const [word, options] = buildOptions(verb, tense, pronoun, difficulty)

  return {
    kind: 'verbTense',
    promptTranslationKey: 'exercise.prompt.verbTense',
    word,
    options: options.map((t) => tenseKey(t, difficulty === 'hard')),
    answer: options.findIndex((t) => t.join('.') === tense.join('.')),
    cardKey: buildCardKey('verbTense', getRootType(verb.root), verb.form, tense, pronoun),
  }
}

function buildOptions(
  verb: DisplayVerb,
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
