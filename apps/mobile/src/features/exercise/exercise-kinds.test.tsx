import { fireEvent, render, screen } from '@testing-library/react-native'
import type { ExerciseKind } from '../../../../../src/exercises/exercise-kinds'
import type { Exercise } from '../../../../../src/exercises/exercises'
import { EXERCISE_GENERATORS } from '../../../../../src/exercises/scheduler'
import { ExerciseSession } from './ExerciseSession'
import { sessionProps } from './exercise-session-props.ts'
import { seededRandom } from './seeded-random'

jest.mock('../../theme/tokens', () => require('./mock-theme-tokens').themeTokensMock)

const profile = { tenses: 5, pronouns: 3, forms: 9, rootTypes: 5, nominals: 2 } as const

const exercises = EXERCISE_GENERATORS.map((generator, index) => {
  const previousRandom = Math.random
  Math.random = seededRandom(index + 19)
  const exercise = generator.generate(profile)
  Math.random = previousRandom
  return exercise
})

describe('exercise kinds', () => {
  test.each(exercises.map((exercise) => [exercise.kind, exercise] as const))(
    '%s renders its generated prompt and preserves card identity on answer',
    async (kind: ExerciseKind, exercise: Exercise) => {
      const onPersistAnswer = jest.fn()
      await render(<ExerciseSession {...sessionProps({ exercise, onPersistAnswer, translate: (key) => key })} />)

      expect(screen.getByText(exercise.word)).toBeTruthy()
      expect(screen.getByText(exercise.promptTranslationKey)).toBeTruthy()
      await fireEvent.press(screen.getByRole('radio', { name: exercise.options[exercise.answer] }))

      expect(screen.getByText('exercise.answer.correct · exercise.next')).toBeTruthy()
      expect(onPersistAnswer).toHaveBeenCalledWith(
        expect.objectContaining({
          cardKey: exercise.cardKey,
          dimensions: exercise.dimensions,
          kind,
          result: 'correct',
        }),
      )
    },
  )
})
