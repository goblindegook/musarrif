import { shuffle } from '@pacote/shuffle'
import { resolveNominalExplanationLayers } from '../../paradigms/explanation'
import { deriveMasdar } from '../../paradigms/nominal/masdar.ts'
import type { DisplayVerb } from '../../paradigms/verbs.ts'
import {
  type DimensionProfile,
  exerciseDiacritics,
  random,
  randomGeneratedVerb,
  randomNominalVerb,
} from '../dimensions.ts'
import { singleLetterWordDistractor, weakAlternativeRootDistractor } from '../distractors.ts'
import { defineExercise } from '../exercises.ts'
import { buildCardKey, getSrsRootType } from '../srs.ts'

export const verbMasdarExercise = defineExercise(
  'verbMasdar',
  (profile, constraints) => {
    const verb = randomNominalVerb(profile, constraints)
    const masdars = deriveMasdar(verb).map((m) => exerciseDiacritics(m, profile.diacritics))
    const answer = random(masdars)
    const word = exerciseDiacritics(verb.lemma, profile.diacritics)
    const options = buildOptions(verb, answer, masdars, profile)
    const answerIndex = options.indexOf(answer)
    const explanation = resolveNominalExplanationLayers(verb, 'masdar', answer)

    return {
      dimensions: ['nominals', 'forms', 'rootTypes', 'diacritics'],
      promptTranslationKey: 'exercise.prompt.verbMasdar',
      word,
      spokenWord: verb.lemma,
      options,
      answer: answerIndex,
      cardKey: buildCardKey('verbMasdar', getSrsRootType(verb.root), verb.form),
      explanation,
      inputModes: verb.form !== 1 ? ['multiple-choice', 'keyboard', 'speech'] : ['multiple-choice'],
    }
  },
  { minNominals: 2 },
)

function buildOptions(
  verb: DisplayVerb,
  answer: string,
  masdars: readonly string[],
  profile: DimensionProfile,
): readonly string[] {
  const generators = [
    formDistractor(verb, profile),
    rootDistractor(verb, profile),
    Array.from(verb.rootTokens).some((t) => t.isWeak) ? weakRootDistractor(verb, profile) : null,
    singleLetterWordDistractor(answer),
  ].filter((g) => g != null)

  const options = new Set<string>([answer])

  while (options.size < 4) {
    const candidate = exerciseDiacritics(random(generators)(), profile.diacritics)
    if (!masdars.includes(candidate)) options.add(candidate)
  }

  return shuffle(Array.from(options))
}

function formDistractor(verb: DisplayVerb, profile: DimensionProfile): () => string {
  return () => {
    const candidate = randomGeneratedVerb(verb.root)
    return exerciseDiacritics(String(random(deriveMasdar(candidate))), profile.diacritics)
  }
}

function rootDistractor(verb: DisplayVerb, profile: DimensionProfile): () => string {
  const rootGenerator = singleLetterWordDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator(), verb.form)
    return exerciseDiacritics(String(random(deriveMasdar(candidate))), profile.diacritics)
  }
}

function weakRootDistractor(verb: DisplayVerb, profile: DimensionProfile): () => string {
  const rootGenerator = weakAlternativeRootDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator(), verb.form)
    return exerciseDiacritics(String(random(deriveMasdar(candidate))), profile.diacritics)
  }
}
