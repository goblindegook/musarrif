import { shuffle } from '@pacote/shuffle'
import { conjugate } from '../../paradigms/conjugation'
import { resolveVerbExplanationLayers } from '../../paradigms/explanation'
import type { PronounId } from '../../paradigms/pronouns'
import type { VerbTense } from '../../paradigms/tense'
import { type DisplayVerb, FORMS, synthesizeVerb } from '../../paradigms/verbs'
import {
  type DimensionProfile,
  exerciseDiacritics,
  normalizeExercisePronoun,
  type PronounsLevel,
  pronounPool,
  randomPronoun,
  randomTense,
  randomVerb,
  type TensesLevel,
  tensePool,
} from '../dimensions'
import { defineExercise } from '../exercises'
import { buildCardKey, getSrsRootType } from '../srs'

const TENSE_SLUGS: Record<string, string> = {
  past: 'past',
  future: 'future',
  imperative: 'imperative',
  'present.indicative': 'present',
  'present.subjunctive': 'subjunctive',
  'present.jussive': 'jussive',
}

function tensePromptKey(tense: VerbTense, includeVoice: boolean): string {
  const [voice, ...parts] = tense.split('.')
  const tenseOrMood = parts.join('.')
  const slug = TENSE_SLUGS[tenseOrMood]
  if (!includeVoice || tense === 'active.imperative') return `exercise.conjugation.tense.${slug}`
  return `exercise.conjugation.tense.${voice}.${slug}`
}

function distractorPronouns(tense: VerbTense, profile: DimensionProfile): PronounId[] {
  const pool = [...pronounPool(profile.pronouns)]
  if (tense === 'active.imperative') return pool.filter((p) => p.startsWith('2'))
  return pool
}

function buildSiblings(verb: DisplayVerb): DisplayVerb[] {
  return FORMS.filter((f) => f !== verb.form).flatMap((form) => [
    form === 1 ? synthesizeVerb(verb.root, 1, 'a-a') : synthesizeVerb(verb.root, form),
  ])
}

function easyCandidates(
  targetTense: VerbTense,
  targetPronoun: PronounId,
  verb: DisplayVerb,
  profile: DimensionProfile,
): string[] {
  // Use minimum pools for distractor generation to ensure variety
  const tensesLevel = Math.max(profile.tenses, 3) as TensesLevel
  const pronounsLevel = Math.max(profile.pronouns, 2) as PronounsLevel
  return buildSiblings(verb).flatMap((v) =>
    tensePool(tensesLevel)
      .filter((t) => t !== targetTense)
      .flatMap((t) =>
        distractorPronouns(t, { ...profile, tenses: tensesLevel, pronouns: pronounsLevel })
          .filter((p) => p !== targetPronoun)
          .map((p) => conjugate(v, t)[p]),
      ),
  )
}

function mediumCandidates(
  verb: DisplayVerb,
  targetTense: VerbTense,
  targetPronoun: PronounId,
  profile: DimensionProfile,
): string[] {
  const siblings = buildSiblings(verb)
  return [
    ...tensePool(profile.tenses)
      .filter((t) => t !== targetTense)
      .flatMap((t) =>
        distractorPronouns(t, profile)
          .filter((p) => p !== targetPronoun)
          .map((p) => conjugate(verb, t)[p]),
      ),
    ...siblings.flatMap((sibling) =>
      distractorPronouns(targetTense, profile)
        .filter((p) => p !== targetPronoun)
        .map((p) => conjugate(sibling, targetTense)[p]),
    ),
    ...siblings.flatMap((sibling) =>
      tensePool(profile.tenses)
        .filter((t) => t !== targetTense)
        .map((t) => conjugate(sibling, t)[targetPronoun]),
    ),
  ]
}

function hardCandidates(
  verb: DisplayVerb,
  targetTense: VerbTense,
  targetPronoun: PronounId,
  profile: DimensionProfile,
): string[] {
  return [
    ...distractorPronouns(targetTense, profile)
      .filter((p) => p !== targetPronoun)
      .map((p) => conjugate(verb, targetTense)[p]),
    ...tensePool(profile.tenses)
      .filter((t) => t !== targetTense)
      .map((t) => conjugate(verb, t)[targetPronoun]),
    ...buildSiblings(verb).map((sibling) => conjugate(sibling, targetTense)[targetPronoun]),
  ]
}

export const conjugationExercise = defineExercise(
  'conjugation',
  (profile, constraints) => {
    const verb = randomVerb(profile, constraints)
    const word = exerciseDiacritics(verb.lemma, profile.diacritics)
    const targetTense = constraints?.tense ?? randomTense(verb, profile.tenses)
    const targetPronoun = normalizeExercisePronoun(
      verb,
      targetTense,
      constraints?.pronoun ?? randomPronoun(verb, targetTense, profile.pronouns),
    )
    const conjugatedVerb = conjugate(verb, targetTense)[targetPronoun]
    const answer = exerciseDiacritics(conjugatedVerb, profile.diacritics)
    const explanation = resolveVerbExplanationLayers(verb, targetTense, targetPronoun, conjugatedVerb)

    const raw =
      profile.pronouns >= 2 && profile.tenses >= 2
        ? hardCandidates(verb, targetTense, targetPronoun, profile)
        : profile.pronouns < 2 && profile.tenses < 2
          ? easyCandidates(targetTense, targetPronoun, verb, profile)
          : mediumCandidates(verb, targetTense, targetPronoun, profile)

    const candidates = new Set(raw.map((r) => exerciseDiacritics(r, profile.diacritics)))
    candidates.delete('')
    candidates.delete(answer)
    const uniqueOptions = new Set<string>([answer])
    for (const candidate of shuffle(Array.from(candidates))) {
      if (uniqueOptions.size >= 4) break
      uniqueOptions.add(candidate)
    }
    const options = shuffle(Array.from(uniqueOptions))

    return {
      dimensions: ['tenses', 'pronouns', 'forms', 'rootTypes', 'diacritics'],
      promptTranslationKey: 'exercise.prompt.conjugation',
      promptParams: {
        tense: tensePromptKey(targetTense, profile.tenses >= 4),
        pronoun: `pronoun.${targetPronoun}`,
      },
      word,
      spokenWord: verb.lemma,
      options,
      answer: options.indexOf(answer),
      cardKey: buildCardKey('conjugation', getSrsRootType(verb.root), verb.form, targetTense, targetPronoun),
      explanation,
      supportsTyping: true,
      supportsSpeech: true,
    }
  },
  { weight: 5 },
)
