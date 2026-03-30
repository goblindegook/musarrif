import { shuffle } from '@pacote/shuffle'
import { resolveVerbExplanationLayers } from '../paradigms/explanation'
import type { PronounId } from '../paradigms/pronouns'
import { conjugate, type VerbTense } from '../paradigms/tense'
import type { DisplayVerb } from '../paradigms/verbs'
import { pick } from '../primitives/objects'
import {
  type DimensionProfile,
  exerciseDiacritics,
  randomPronoun,
  randomTense,
  randomVerb,
  type TensesLevel,
  tensePool,
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
    const explanation = resolveVerbExplanationLayers(verb, tense, pronoun, conjugate(verb, tense)[pronoun])
    const [word, options] = buildOptions(verb, tense, pronoun, profile, minTenses)
    const answer = options.findIndex((option) => option.join('.') === tense.join('.'))

    return {
      dimensions: ['tenses', 'forms', 'rootTypes', 'diacritics'],
      promptTranslationKey: 'exercise.prompt.verbTense',
      word,
      options: options.map((t) => tenseKey(t, profile.tenses >= 4)),
      answer,
      cardKey: buildCardKey('verbTense', getSrsRootType(verb.root), verb.form, tense, pronoun),
      explanations: options.map((_, index) =>
        index === answer ? pick(explanation, ['rootLetters', 'arabic', 'tenseRoot']) : explanation,
      ),
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
    tensePool(tensesLevel).filter((option) => stripDiacritics(conjugate(verb, option)[pronoun]) !== word),
  ).slice(0, 3)

  return [word, shuffle([tense, ...distractors])]
}
