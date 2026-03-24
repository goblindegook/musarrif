import { shuffle } from '@pacote/shuffle'
import type { PronounId } from '../paradigms/pronouns'
import { getRootType } from '../paradigms/roots'
import { conjugate, type VerbTense } from '../paradigms/tense'
import type { DisplayVerb } from '../paradigms/verbs'
import {
  type DimensionProfile,
  distractorTensePool,
  exerciseDiacritics,
  randomPronoun,
  randomTense,
  randomVerb,
  type TensesLevel,
} from './dimensions'
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

export function verbTenseExercise(profile: DimensionProfile, constraints?: CardConstraints): Exercise {
  const verb = randomVerb(profile, constraints)
  const minTenses = Math.max(profile.tenses, 2) as TensesLevel
  const tense = constraints?.tense ?? randomTense(verb, minTenses)
  const pronoun = constraints?.pronoun ?? randomPronoun(verb, tense, profile.pronouns)
  const [word, options] = buildOptions(verb, tense, pronoun, profile, minTenses)

  return {
    kind: 'verbTense',
    promptTranslationKey: 'exercise.prompt.verbTense',
    word,
    options: options.map((t) => tenseKey(t, profile.tenses >= 4)),
    answer: options.findIndex((t) => t.join('.') === tense.join('.')),
    cardKey: buildCardKey('verbTense', getRootType(verb.root), verb.form, tense, pronoun),
  }
}

function buildOptions(
  verb: DisplayVerb,
  tense: VerbTense,
  pronoun: PronounId,
  profile: DimensionProfile,
  tensesLevel: TensesLevel,
): [string, readonly VerbTense[]] {
  const stripDiacritics = (word: string) => exerciseDiacritics(word, profile.diacritics)
  const word = stripDiacritics(conjugate(verb, tense)[pronoun])

  const distractors = shuffle(
    distractorTensePool(tensesLevel).filter((option) => stripDiacritics(conjugate(verb, option)[pronoun]) !== word),
  ).slice(0, 3)

  return [word, shuffle([tense, ...distractors])]
}
