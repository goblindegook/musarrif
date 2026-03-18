import { type Difficulty, random } from './difficulty'
import { formExercise } from './form'
import { rootExercise } from './root'
import type { Exercise } from './types'

const EXERCISES = [formExercise, rootExercise]

export function randomExercise(difficulty: Difficulty = 'easy'): Exercise {
  return random(EXERCISES)(difficulty)
}
