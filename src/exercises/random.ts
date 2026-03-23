import { conjugationExercise } from './conjugation'
import { type Difficulty, random } from './difficulty'
import { masdarFormExercise } from './masdar-form'
import { masdarRootExercise } from './masdar-root'
import { masdarVerbExercise } from './masdar-verb'
import { participleFormExercise } from './participle-form'
import { participleRootExercise } from './participle-root'
import { participleVerbExercise } from './participle-verb'
import type { Exercise } from './types'
import { verbFormExercise } from './verb-form'
import { verbMasdarExercise } from './verb-masdar'
import { verbParticipleExercise } from './verb-participle'
import { verbPronounExercise } from './verb-pronoun'
import { verbRootExercise } from './verb-root'
import { verbTenseExercise } from './verb-tense'

interface ExerciseGenerator {
  generate: (difficulty: Difficulty) => Exercise
  difficulty?: Difficulty[]
  weight?: number
}

const EXERCISES: readonly ExerciseGenerator[] = [
  { generate: conjugationExercise, weight: 3 },
  { generate: masdarFormExercise, difficulty: ['medium', 'hard'] },
  { generate: masdarRootExercise, difficulty: ['medium', 'hard'] },
  { generate: masdarVerbExercise, difficulty: ['medium', 'hard'] },
  { generate: participleFormExercise },
  { generate: participleRootExercise },
  { generate: participleVerbExercise },
  { generate: verbFormExercise },
  { generate: verbMasdarExercise, difficulty: ['medium', 'hard'] },
  { generate: verbParticipleExercise },
  { generate: verbPronounExercise },
  { generate: verbRootExercise },
  { generate: verbTenseExercise },
]

export function randomExercise(difficulty: Difficulty): Exercise {
  return random(
    EXERCISES.filter((exercise) => exercise.difficulty == null || exercise.difficulty.includes(difficulty)).flatMap(
      (e) => Array<ExerciseGenerator>(e.weight ?? 1).fill(e),
    ),
  ).generate(difficulty)
}
