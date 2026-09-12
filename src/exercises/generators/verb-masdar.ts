import { shuffle } from '@pacote/shuffle'
import { resolveNominalExplanationLayers } from '../../paradigms/explanation'
import { deriveMasdar } from '../../paradigms/nominal/masdar.ts'
import type { DisplayVerb } from '../../paradigms/verbs.ts'
import { exerciseDiacritics, random, randomGeneratedVerb, randomNominalVerb } from '../dimensions.ts'
import { singleLetterWordDistractor, weakAlternativeRootDistractor } from '../distractors.ts'
import { defineExercise } from '../exercises.ts'
import { buildCardKey, getSrsRootType } from '../srs.ts'

export const verbMasdarExercise = defineExercise(
  'verbMasdar',
  (profile, constraints) => {
    const verb = randomNominalVerb(profile, constraints)
    const rawMasdars = deriveMasdar(verb)
    const answerText = String(random(rawMasdars))
    const stopList = rawMasdars.map((m) => exerciseDiacritics(m))
    const answer = exerciseDiacritics(answerText)
    const word = exerciseDiacritics(verb.lemma)
    const options = buildOptions(verb, answer, stopList)
    const answerIndex = options.indexOf(answer)
    const explanation = resolveNominalExplanationLayers(verb, 'masdar', answer)

    return {
      dimensions: ['nominals', 'forms', 'rootTypes'],
      promptTranslationKey: 'exercise.prompt.verbMasdar',
      word,
      spokenWord: verb.lemma,
      options,
      answer: answerIndex,
      answerText,
      cardKey: buildCardKey('verbMasdar', getSrsRootType(verb.root), verb.form),
      explanation,
      inputModes: verb.form !== 1 ? ['multiple-choice', 'keyboard', 'speech'] : ['multiple-choice'],
    }
  },
  { minNominals: 2 },
)

function buildOptions(verb: DisplayVerb, answer: string, stopList: readonly string[]): readonly string[] {
  const generators = [
    formDistractor(verb),
    rootDistractor(verb),
    Array.from(verb.rootTokens).some((t) => t.isWeak) ? weakRootDistractor(verb) : null,
    singleLetterWordDistractor(answer),
  ].filter((g) => g != null)

  const options = new Set<string>([answer])

  while (options.size < 4) {
    const candidate = exerciseDiacritics(random(generators)())
    if (!stopList.includes(candidate)) options.add(candidate)
  }

  return shuffle(Array.from(options))
}

function formDistractor(verb: DisplayVerb): () => string {
  return () => {
    const candidate = randomGeneratedVerb(verb.root)
    return exerciseDiacritics(String(random(deriveMasdar(candidate))))
  }
}

function rootDistractor(verb: DisplayVerb): () => string {
  const rootGenerator = singleLetterWordDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator(), verb.form)
    return exerciseDiacritics(String(random(deriveMasdar(candidate))))
  }
}

function weakRootDistractor(verb: DisplayVerb): () => string {
  const rootGenerator = weakAlternativeRootDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator(), verb.form)
    return exerciseDiacritics(String(random(deriveMasdar(candidate))))
  }
}
