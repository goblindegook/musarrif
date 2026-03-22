import { conjugationExercise } from './conjugation'
import { type Difficulty, random } from './difficulty'
import { masdarFormExercise } from './masdar-form'
import { masdarRootExercise } from './masdar-root'
import { masdarVerbExercise } from './masdar-verb'
import { participleFormExercise } from './participle-form'
import type { Exercise } from './types'
import { verbFormExercise } from './verb-form'
import { verbMasdarExercise } from './verb-masdar'
import { verbPronounExercise } from './verb-pronoun'
import { verbRootExercise } from './verb-root'
import { verbTenseExercise } from './verb-tense'

interface ExerciseGenerator {
  generate: (difficulty: Difficulty) => Exercise
  difficulty?: Difficulty[]
}

const EXERCISES: readonly ExerciseGenerator[] = [
  { generate: conjugationExercise },
  { generate: masdarFormExercise, difficulty: ['medium', 'hard'] },
  { generate: masdarRootExercise, difficulty: ['medium', 'hard'] },
  { generate: masdarVerbExercise, difficulty: ['medium', 'hard'] },
  { generate: participleFormExercise },
  { generate: verbFormExercise },
  { generate: verbMasdarExercise, difficulty: ['medium', 'hard'] },
  { generate: verbPronounExercise },
  { generate: verbRootExercise },
  { generate: verbTenseExercise },
]

export function randomExercise(difficulty: Difficulty = 'easy'): Exercise {
  const available = EXERCISES.filter(
    (exercise) => exercise.difficulty == null || exercise.difficulty.includes(difficulty),
  )
  return random(available).generate(difficulty)
}
