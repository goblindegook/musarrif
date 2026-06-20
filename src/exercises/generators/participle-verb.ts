import { resolveNominalExplanationLayers } from '../../paradigms/explanation.ts'
import { deriveActiveParticiple } from '../../paradigms/nominal/participle-active.ts'
import { derivePassiveParticiple } from '../../paradigms/nominal/participle-passive.ts'
import type { DisplayVerb } from '../../paradigms/verbs.ts'
import {
  type DimensionProfile,
  exerciseDiacritics,
  random,
  randomGeneratedVerb,
  randomNominalVerb,
} from '../dimensions.ts'
import { randomizeOptions, singleLetterWordDistractor, weakAlternativeRootDistractor } from '../distractors.ts'
import { defineExercise } from '../exercises.ts'
import { buildCardKey, getSrsRootType } from '../srs.ts'

type Participle = 'active' | 'passive'

export const participleVerbExercise = defineExercise(
  'participleVerb',
  (profile, constraints) => {
    const verb = randomNominalVerb(profile, constraints)
    const active = String(deriveActiveParticiple(verb))
    const passive = String(derivePassiveParticiple(verb))
    const kind: Participle = passive ? random(['active', 'passive']) : 'active'
    const participle = kind === 'active' ? active : passive
    const options = buildOptions(verb, profile)
    const answerLabel = exerciseDiacritics(verb.lemma, profile.diacritics)

    return {
      dimensions: ['nominals', 'forms', 'rootTypes', 'diacritics'],
      promptTranslationKey:
        kind === 'active' ? 'exercise.prompt.activeParticipleVerb' : 'exercise.prompt.passiveParticipleVerb',
      word: exerciseDiacritics(participle, profile.diacritics),
      spokenWord: participle,
      options,
      answer: options.indexOf(answerLabel),
      cardKey: buildCardKey('participleVerb', getSrsRootType(verb.root), verb.form),
      explanation: resolveNominalExplanationLayers(
        verb,
        kind === 'active' ? 'activeParticiple' : 'passiveParticiple',
        participle,
      ),
      inputModes: ['multiple-choice', 'keyboard', 'speech'],
    }
  },
  { minNominals: 1 },
)

function buildOptions(verb: DisplayVerb, profile: DimensionProfile): readonly string[] {
  const answer = exerciseDiacritics(verb.lemma, profile.diacritics)

  const generators = [
    sameRootDifferentFormDistractor(verb, profile),
    singleLetterDistractor(verb, profile),
    verb.rootTokens.some((t) => t.isWeak) ? weakAlternativeDistractor(verb, profile) : null,
    profile.diacritics >= 1 ? mediumDifferentFormSingleLetterDistractor(verb, profile) : null,
  ].filter((generator) => generator != null)

  return randomizeOptions(answer, generators, profile)
}

function sameRootDifferentFormDistractor(verb: DisplayVerb, profile: DimensionProfile): () => string {
  return () => {
    const candidate = randomGeneratedVerb(verb.root)
    return exerciseDiacritics(candidate.lemma, profile.diacritics)
  }
}

function weakAlternativeDistractor(verb: DisplayVerb, profile: DimensionProfile): () => string {
  const rootGenerator = weakAlternativeRootDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator(), verb.form)
    return exerciseDiacritics(candidate.lemma, profile.diacritics)
  }
}

function singleLetterDistractor(verb: DisplayVerb, profile: DimensionProfile): () => string {
  const rootGenerator = singleLetterWordDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator(), verb.form)
    return exerciseDiacritics(candidate.lemma, profile.diacritics)
  }
}

function mediumDifferentFormSingleLetterDistractor(verb: DisplayVerb, profile: DimensionProfile): () => string {
  const rootGenerator = singleLetterWordDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator())
    return exerciseDiacritics(candidate.lemma, profile.diacritics)
  }
}
