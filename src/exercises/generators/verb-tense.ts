import { shuffle } from '@pacote/shuffle'
import { conjugate } from '../../paradigms/conjugation'
import { resolveVerbExplanationLayers } from '../../paradigms/explanation'
import type { PronounId } from '../../paradigms/pronouns.ts'
import type { VerbTense } from '../../paradigms/tense.ts'
import type { DisplayVerb } from '../../paradigms/verbs.ts'
import { pick } from '../../primitives/objects.ts'
import {
  type DimensionProfile,
  exerciseDiacritics,
  normalizeExercisePronoun,
  randomPronoun,
  randomTense,
  randomVerb,
  type TensesLevel,
  tensePool,
} from '../dimensions.ts'
import { defineExercise } from '../exercises.ts'
import { buildCardKey, getSrsRootType } from '../srs.ts'

export const verbTenseExercise = defineExercise(
  'verbTense',
  (profile, constraints) => {
    const verb = randomVerb(profile, constraints)
    const tense = constraints?.tense ?? randomTense(verb, profile.tenses)
    const pronoun = normalizeExercisePronoun(
      verb,
      tense,
      constraints?.pronoun ?? randomPronoun(verb, tense, profile.pronouns),
    )
    const explanation = resolveVerbExplanationLayers(verb, tense, pronoun, conjugate(verb, tense)[pronoun])
    const [word, options] = buildOptions(verb, tense, pronoun, profile)
    const answer = options.indexOf(tense)

    return {
      dimensions: ['tenses', 'forms', 'rootTypes', 'diacritics'],
      promptTranslationKey: 'exercise.prompt.verbTense',
      word,
      options: options.map((t) => tenseKey(t, profile.tenses >= 5)),
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
  if (includeVoice) return `tense.${tense}`
  return `tense.${tense.replace(/^\w+\./, '')}`
}

function buildOptions(
  verb: DisplayVerb,
  tense: VerbTense,
  pronoun: PronounId,
  profile: DimensionProfile,
): [string, readonly VerbTense[]] {
  const word = exerciseDiacritics(conjugate(verb, tense)[pronoun], profile.diacritics)

  const distractors = tensePool(Math.max(profile.tenses, 3) as TensesLevel).filter(
    (option) => exerciseDiacritics(conjugate(verb, option)[pronoun], profile.diacritics) !== word,
  )

  return [word, shuffle([tense, ...shuffle(distractors).slice(0, 3)])]
}
