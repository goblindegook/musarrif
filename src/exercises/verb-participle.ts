import { isWeakLetter } from '../paradigms/letters'
import { deriveActiveParticiple } from '../paradigms/nominal/participle-active'
import { derivePassiveParticiple } from '../paradigms/nominal/participle-passive'
import { getRootType } from '../paradigms/roots'
import type { DisplayVerb } from '../paradigms/verbs'
import { synthesizeVerb } from '../paradigms/verbs'
import { type DimensionProfile, exerciseDiacritics, random, randomGeneratedVerb, randomVerb } from './dimensions'
import { randomizeOptions, singleLetterWordDistractor, weakAlternativeRootDistractor } from './distractors'
import { defineExercise } from './exercises'
import { buildCardKey } from './srs'

type Participle = 'active' | 'passive'

export const verbParticipleExercise = defineExercise(
  'verbParticiple',
  (profile, constraints) => {
    const verb = randomVerb(profile, constraints)
    const active = deriveActiveParticiple(verb)
    const passive = derivePassiveParticiple(verb)
    const kind: Participle = passive ? random(['active', 'passive']) : 'active'
    const answer = exerciseDiacritics(kind === 'active' ? active : passive, profile.diacritics)
    const word = exerciseDiacritics(verb.label, profile.diacritics)
    const options = buildOptions(verb, answer, kind, profile)

    return {
      promptTranslationKey:
        kind === 'active' ? 'exercise.prompt.verbActiveParticiple' : 'exercise.prompt.verbPassiveParticiple',
      word,
      options,
      answer: options.indexOf(answer),
      cardKey: buildCardKey('verbParticiple', getRootType(verb.root), verb.form),
    }
  },
  { minNominals: 1 },
)

function buildOptions(
  verb: DisplayVerb,
  answer: string,
  kind: Participle,
  profile: DimensionProfile,
): readonly string[] {
  const generators = [
    formDistractor(verb, kind, profile),
    rootDistractor(verb, kind, profile),
    Array.from(verb.root).some(isWeakLetter) ? weakRootDistractor(verb, kind, profile) : null,
    singleLetterWordDistractor(answer),
    oppositeParticipleDistractor(verb, kind, profile),
  ].filter((generator) => generator != null)

  return randomizeOptions(answer, generators, profile)
}

function formDistractor(verb: DisplayVerb, kind: Participle, profile: DimensionProfile): () => string {
  return () => {
    const alternative = randomGeneratedVerb(verb.root)
    const participle = kind === 'active' ? deriveActiveParticiple(alternative) : derivePassiveParticiple(alternative)
    return exerciseDiacritics(participle, profile.diacritics)
  }
}

function rootDistractor(verb: DisplayVerb, kind: Participle, profile: DimensionProfile): () => string {
  const rootGenerator = singleLetterWordDistractor(verb.root)

  return () => {
    const alternative = randomGeneratedVerb(rootGenerator(), verb.form)
    const participle = kind === 'active' ? deriveActiveParticiple(alternative) : derivePassiveParticiple(alternative)
    return exerciseDiacritics(participle, profile.diacritics)
  }
}

function weakRootDistractor(verb: DisplayVerb, kind: Participle, profile: DimensionProfile): () => string {
  const rootGenerator = weakAlternativeRootDistractor(verb.root)

  return () => {
    const alternative = randomGeneratedVerb(rootGenerator(), verb.form)
    const participle = kind === 'active' ? deriveActiveParticiple(alternative) : derivePassiveParticiple(alternative)
    return exerciseDiacritics(participle, profile.diacritics)
  }
}

function oppositeParticipleDistractor(verb: DisplayVerb, kind: Participle, profile: DimensionProfile): () => string {
  const alternative = synthesizeVerb(verb.root, verb.form)
  return () =>
    exerciseDiacritics(
      kind === 'active' ? derivePassiveParticiple(alternative) : deriveActiveParticiple(alternative),
      profile.diacritics,
    )
}
