import { shuffle } from '@pacote/shuffle'
import { isWeakLetter } from '../paradigms/letters'
import { deriveMasdar } from '../paradigms/nominal/masdar'
import type { DisplayVerb } from '../paradigms/verbs'
import { type DimensionProfile, exerciseDiacritics, random, randomGeneratedVerb, randomVerb } from './dimensions'
import { singleLetterWordDistractor, weakAlternativeRootDistractor } from './distractors'
import { defineExercise } from './exercises'
import { buildCardKey, getSrsRootType } from './srs'

export const verbMasdarExercise = defineExercise(
  'verbMasdar',
  (profile, constraints) => {
    const verb = randomVerb(profile, constraints)
    const masdars = deriveMasdar(verb).map((m) => exerciseDiacritics(m, profile.diacritics))
    const answer = random(masdars)
    const word = exerciseDiacritics(verb.label, profile.diacritics)
    const options = buildOptions(verb, answer, masdars, profile)

    return {
      dimensions: ['nominals', 'forms', 'rootTypes', 'diacritics'],
      promptTranslationKey: 'exercise.prompt.verbMasdar',
      word,
      options,
      answer: options.indexOf(answer),
      cardKey: buildCardKey('verbMasdar', getSrsRootType(verb.root), verb.form),
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
    Array.from(verb.root).some(isWeakLetter) ? weakRootDistractor(verb, profile) : null,
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
    return exerciseDiacritics(random(deriveMasdar(candidate)), profile.diacritics)
  }
}

function rootDistractor(verb: DisplayVerb, profile: DimensionProfile): () => string {
  const rootGenerator = singleLetterWordDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator(), verb.form)
    return exerciseDiacritics(random(deriveMasdar(candidate)), profile.diacritics)
  }
}

function weakRootDistractor(verb: DisplayVerb, profile: DimensionProfile): () => string {
  const rootGenerator = weakAlternativeRootDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator(), verb.form)
    return exerciseDiacritics(random(deriveMasdar(candidate)), profile.diacritics)
  }
}
