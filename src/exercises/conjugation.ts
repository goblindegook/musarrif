import { shuffle } from '@pacote/shuffle'
import { resolveVerbExplanationLayers } from '../paradigms/explanation'
import type { PronounId } from '../paradigms/pronouns'
import { conjugate, type VerbTense } from '../paradigms/tense'
import { type DisplayVerb, FORMS, synthesizeVerb } from '../paradigms/verbs'
import {
  type DimensionProfile,
  distractorTensePool,
  exerciseDiacritics,
  type PronounsLevel,
  randomPronoun,
  randomTense,
  randomVerb,
  rawPronounPool,
  type TensesLevel,
} from './dimensions'
import { defineExercise } from './exercises'
import { buildCardKey, getSrsRootType } from './srs'

const PRONOUN_KEYS: Record<PronounId, string> = {
  '1s': 'exercise.conjugation.pronoun.1s',
  '1p': 'exercise.conjugation.pronoun.1p',
  '2ms': 'exercise.conjugation.pronoun.2ms',
  '2fs': 'exercise.conjugation.pronoun.2fs',
  '2d': 'exercise.conjugation.pronoun.2d',
  '2mp': 'exercise.conjugation.pronoun.2mp',
  '2fp': 'exercise.conjugation.pronoun.2fp',
  '3ms': 'exercise.conjugation.pronoun.3ms',
  '3fs': 'exercise.conjugation.pronoun.3fs',
  '3md': 'exercise.conjugation.pronoun.3md',
  '3fd': 'exercise.conjugation.pronoun.3fd',
  '3mp': 'exercise.conjugation.pronoun.3mp',
  '3fp': 'exercise.conjugation.pronoun.3fp',
}

const TENSE_SLUGS: Record<string, string> = {
  past: 'past',
  future: 'future',
  imperative: 'imperative',
  'present.indicative': 'present',
  'present.subjunctive': 'subjunctive',
  'present.jussive': 'jussive',
}

function tensePromptKey(tense: VerbTense, includeVoice: boolean): string {
  const slug = TENSE_SLUGS[tense.slice(1).join('.')]
  if (!includeVoice || tense[1] === 'imperative') return `exercise.conjugation.tense.${slug}`
  return `exercise.conjugation.tense.${tense[0]}.${slug}`
}

function tensesEqual(a: VerbTense, b: VerbTense): boolean {
  return a.join('.') === b.join('.')
}

function distractorPronouns(tense: VerbTense, profile: DimensionProfile): PronounId[] {
  const pool = [...rawPronounPool(profile.pronouns)]
  if (tense[1] === 'imperative') return pool.filter((p) => p.startsWith('2'))
  return pool
}

function buildSiblings(verb: DisplayVerb): DisplayVerb[] {
  return FORMS.filter((f) => f !== verb.form).flatMap((form) => [
    form === 1 ? synthesizeVerb(verb.root, 1, 'fa3ala-yaf3alu') : synthesizeVerb(verb.root, form),
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
    distractorTensePool(tensesLevel)
      .filter((t) => !tensesEqual(t, targetTense))
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
  const typeA = distractorTensePool(profile.tenses)
    .filter((t) => !tensesEqual(t, targetTense))
    .flatMap((t) =>
      distractorPronouns(t, profile)
        .filter((p) => p !== targetPronoun)
        .map((p) => conjugate(verb, t)[p]),
    )
  const typeB = siblings.flatMap((sibling) =>
    distractorPronouns(targetTense, profile)
      .filter((p) => p !== targetPronoun)
      .map((p) => conjugate(sibling, targetTense)[p]),
  )
  const typeC = siblings.flatMap((sibling) =>
    distractorTensePool(profile.tenses)
      .filter((t) => !tensesEqual(t, targetTense))
      .map((t) => conjugate(sibling, t)[targetPronoun]),
  )
  return [...typeA, ...typeB, ...typeC]
}

function hardCandidates(
  verb: DisplayVerb,
  targetTense: VerbTense,
  targetPronoun: PronounId,
  profile: DimensionProfile,
): string[] {
  const type1 = distractorPronouns(targetTense, profile)
    .filter((p) => p !== targetPronoun)
    .map((p) => conjugate(verb, targetTense)[p])
  const type2 = distractorTensePool(profile.tenses)
    .filter((t) => !tensesEqual(t, targetTense))
    .map((t) => conjugate(verb, t)[targetPronoun])
  const type3 = buildSiblings(verb).map((sibling) => conjugate(sibling, targetTense)[targetPronoun])
  return [...type1, ...type2, ...type3]
}

export const conjugationExercise = defineExercise(
  'conjugation',
  (profile, constraints) => {
    const verb = randomVerb(profile, constraints)
    const word = exerciseDiacritics(verb.label, profile.diacritics)
    const targetTense = constraints?.tense ?? randomTense(verb, profile.tenses)
    const targetPronoun = constraints?.pronoun ?? randomPronoun(verb, targetTense, profile.pronouns)
    const conjugatedVerb = conjugate(verb, targetTense)[targetPronoun]
    const answer = exerciseDiacritics(conjugatedVerb, profile.diacritics)

    const raw =
      profile.pronouns >= 2 && profile.tenses >= 2
        ? hardCandidates(verb, targetTense, targetPronoun, profile)
        : profile.pronouns < 2 && profile.tenses < 2
          ? easyCandidates(targetTense, targetPronoun, verb, profile)
          : mediumCandidates(verb, targetTense, targetPronoun, profile)

    const candidates = new Set(raw.map((r) => exerciseDiacritics(r, profile.diacritics)))
    candidates.delete('')
    candidates.delete(answer)
    const options = new Set<string>([answer])
    for (const candidate of shuffle(Array.from(candidates))) {
      if (options.size >= 4) break
      options.add(candidate)
    }
    const shuffled = shuffle(Array.from(options))

    return {
      dimensions: ['tenses', 'pronouns', 'forms', 'rootTypes', 'diacritics'],
      promptTranslationKey: 'exercise.prompt.conjugation',
      promptParams: { tense: tensePromptKey(targetTense, profile.tenses >= 4), pronoun: PRONOUN_KEYS[targetPronoun] },
      word,
      options: shuffled,
      answer: shuffled.indexOf(answer),
      cardKey: buildCardKey('conjugation', getSrsRootType(verb.root), verb.form, targetTense, targetPronoun),
      explanation: resolveVerbExplanationLayers(verb, targetTense, targetPronoun, conjugatedVerb),
    }
  },
  { weight: 5 },
)
