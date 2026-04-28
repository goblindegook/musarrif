import { isWeakLetter } from '../../paradigms/letters.ts'
import { deriveActiveParticiple } from '../../paradigms/nominal/participle-active.ts'
import { derivePassiveParticiple } from '../../paradigms/nominal/participle-passive.ts'
import type { DisplayVerb } from '../../paradigms/verbs.ts'
import { type DimensionProfile, exerciseDiacritics, random, randomGeneratedVerb, randomVerb } from '../dimensions.ts'
import { randomizeOptions, singleLetterWordDistractor, weakAlternativeRootDistractor } from '../distractors.ts'
import { defineExercise } from '../exercises.ts'
import { buildCardKey, getSrsRootType } from '../srs.ts'

type Participle = 'active' | 'passive'

export const participleVerbExercise = defineExercise(
  'participleVerb',
  (profile, constraints) => {
    const verb = randomVerb(profile, constraints)
    const active = deriveActiveParticiple(verb)
    const passive = derivePassiveParticiple(verb)
    const kind: Participle = passive ? random(['active', 'passive']) : 'active'
    const word = exerciseDiacritics(kind === 'active' ? active : passive, profile.diacritics)
    const options = buildOptions(verb, profile)
    const answerLabel = exerciseDiacritics(verb.label, profile.diacritics)

    return {
      dimensions: ['nominals', 'forms', 'rootTypes', 'diacritics'],
      promptTranslationKey:
        kind === 'active' ? 'exercise.prompt.activeParticipleVerb' : 'exercise.prompt.passiveParticipleVerb',
      word,
      options,
      answer: options.indexOf(answerLabel),
      cardKey: buildCardKey('participleVerb', getSrsRootType(verb.root), verb.form),
    }
  },
  { minNominals: 1 },
)

function buildOptions(verb: DisplayVerb, profile: DimensionProfile): readonly string[] {
  const answer = exerciseDiacritics(verb.label, profile.diacritics)

  const generators = [
    sameRootDifferentFormDistractor(verb, profile),
    singleLetterDistractor(verb, profile),
    Array.from(verb.root).some(isWeakLetter) ? weakAlternativeDistractor(verb, profile) : null,
    profile.diacritics >= 1 ? mediumDifferentFormSingleLetterDistractor(verb, profile) : null,
  ].filter((generator) => generator != null)

  return randomizeOptions(answer, generators, profile)
}

function sameRootDifferentFormDistractor(verb: DisplayVerb, profile: DimensionProfile): () => string {
  return () => {
    const candidate = randomGeneratedVerb(verb.root)
    return exerciseDiacritics(candidate.label, profile.diacritics)
  }
}

function weakAlternativeDistractor(verb: DisplayVerb, profile: DimensionProfile): () => string {
  const rootGenerator = weakAlternativeRootDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator(), verb.form)
    return exerciseDiacritics(candidate.label, profile.diacritics)
  }
}

function singleLetterDistractor(verb: DisplayVerb, profile: DimensionProfile): () => string {
  const rootGenerator = singleLetterWordDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator(), verb.form)
    return exerciseDiacritics(candidate.label, profile.diacritics)
  }
}

function mediumDifferentFormSingleLetterDistractor(verb: DisplayVerb, profile: DimensionProfile): () => string {
  const rootGenerator = singleLetterWordDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator())
    return exerciseDiacritics(candidate.label, profile.diacritics)
  }
}
