import { resolveNominalExplanationLayers } from '../../paradigms/explanation.ts'
import { deriveActiveParticiple, derivePassiveParticiple } from '../../paradigms/nominal/participle.ts'
import type { DisplayVerb } from '../../paradigms/verbs.ts'
import { exerciseDiacritics, random, randomGeneratedVerb, randomNominalVerb } from '../dimensions.ts'
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
    const options = buildOptions(verb)
    const answerLabel = exerciseDiacritics(verb.lemma)

    return {
      dimensions: ['nominals', 'forms', 'rootTypes'],
      promptTranslationKey:
        kind === 'active' ? 'exercise.prompt.activeParticipleVerb' : 'exercise.prompt.passiveParticipleVerb',
      word: exerciseDiacritics(participle),
      spokenWord: participle,
      options,
      answer: options.indexOf(answerLabel),
      answerText: String(verb.lemma),
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

function buildOptions(verb: DisplayVerb): readonly string[] {
  const answer = exerciseDiacritics(verb.lemma)

  const generators = [
    sameRootDifferentFormDistractor(verb),
    singleLetterDistractor(verb),
    verb.rootTokens.some((t) => t.isWeak) ? weakAlternativeDistractor(verb) : null,
    mediumDifferentFormSingleLetterDistractor(verb),
  ].filter((generator) => generator != null)

  return randomizeOptions(answer, generators)
}

function sameRootDifferentFormDistractor(verb: DisplayVerb): () => string {
  return () => {
    const candidate = randomGeneratedVerb(verb.root)
    return exerciseDiacritics(candidate.lemma)
  }
}

function weakAlternativeDistractor(verb: DisplayVerb): () => string {
  const rootGenerator = weakAlternativeRootDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator(), verb.form)
    return exerciseDiacritics(candidate.lemma)
  }
}

function singleLetterDistractor(verb: DisplayVerb): () => string {
  const rootGenerator = singleLetterWordDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator(), verb.form)
    return exerciseDiacritics(candidate.lemma)
  }
}

function mediumDifferentFormSingleLetterDistractor(verb: DisplayVerb): () => string {
  const rootGenerator = singleLetterWordDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator())
    return exerciseDiacritics(candidate.lemma)
  }
}
