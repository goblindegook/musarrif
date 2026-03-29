import { shuffle } from '@pacote/shuffle'
import { resolveVerbExplanationLayers } from '../paradigms/explanation'
import type { PronounId } from '../paradigms/pronouns'
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
import { defineExercise } from './exercises'
import { buildCardKey, getSrsRootType } from './srs'

export const verbTenseExercise = defineExercise(
  'verbTense',
  (profile, constraints) => {
    const verb = randomVerb(profile, constraints)
    const minTenses = Math.max(profile.tenses, 3) as TensesLevel
    const tense = constraints?.tense ?? randomTense(verb, profile.tenses)
    const pronoun = constraints?.pronoun ?? randomPronoun(verb, tense, profile.pronouns)
    const [word, options] = buildOptions(verb, tense, pronoun, profile, minTenses)

    return {
      dimensions: ['tenses', 'forms', 'rootTypes', 'diacritics'],
      promptTranslationKey: 'exercise.prompt.verbTense',
      word,
      options: options.map((t) => tenseKey(t, profile.tenses >= 4)),
      answer: options.findIndex((t) => t.join('.') === tense.join('.')),
      cardKey: buildCardKey('verbTense', getSrsRootType(verb.root), verb.form, tense, pronoun),
      explanation: resolveVerbExplanationLayers(verb, tense, pronoun, conjugate(verb, tense)[pronoun]),
    }
  },
  { weight: 2 },
)

function tenseKey(tense: VerbTense, includeVoice: boolean): string {
  const slug = tense.slice(1).join('.')
  if (!includeVoice || tense[1] === 'imperative') return `exercise.tense.option.${slug}`
  return `exercise.tense.option.${tense[0]}.${slug}`
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
