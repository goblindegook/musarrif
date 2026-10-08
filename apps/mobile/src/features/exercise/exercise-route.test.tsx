import { act, fireEvent, render, screen } from '@testing-library/react-native'
import { DEFAULT_DIMENSION_PROFILE } from '../../../../../src/exercises/dimensions'
import { nextExercise } from '../../../../../src/exercises/scheduler'
import { showBanner } from '../../../modules/musarrif-apple-services/src/NotificationBanner'
import { createInMemoryRepository } from '../../storage/in-memory-repository'
import type { UserDataSnapshot } from '../../storage/schema'
import { UserDataProvider } from '../../storage/UserDataProvider'
import { ExerciseRoute } from './ExerciseRoute'
import { seededRandom } from './seeded-random'

jest.mock('expo-router', () => ({ Stack: { Screen: () => null } }))
jest.mock('../../../modules/musarrif-apple-services/src/NotificationBanner', () => ({ showBanner: jest.fn() }))
jest.mock('../../../../../src/exercises/scheduler', () => {
  const actual = jest.requireActual('../../../../../src/exercises/scheduler')
  return { ...actual, nextExercise: jest.fn(actual.nextExercise) }
})
jest.mock('../../theme/tokens', () => require('./mock-theme-tokens').themeTokensMock)

describe('exercise route', () => {
  afterEach(() => jest.restoreAllMocks())

  test('generates from the shared scheduler and persists answer progress through the provider', async () => {
    const random = jest.spyOn(Math, 'random').mockImplementation(seededRandom(27))
    const expected = nextExercise(DEFAULT_DIMENSION_PROFILE)
    const scheduler = jest.mocked(nextExercise)
    scheduler.mockClear()
    scheduler.mockReturnValue(expected)
    random.mockImplementation(seededRandom(27))

    const values: UserDataSnapshot['values'] = {}
    const repository = createInMemoryRepository(values)

    await render(
      <UserDataProvider repositoryFactory={async () => repository}>
        <ExerciseRoute />
      </UserDataProvider>,
    )
    await act(async () => {})

    expect(screen.getAllByText(expected.word).length).toBeGreaterThan(0)
    const wrongAnswerIndex = (expected.answer + 1) % expected.options.length
    await fireEvent.press(screen.getAllByRole('radio')[wrongAnswerIndex])
    await act(async () => {
      await Promise.resolve()
      await Promise.resolve()
    })

    expect(values[`srs:${expected.cardKey}`]).toBeDefined()
    expect(values['dimension:store']).toEqual(expect.objectContaining({ profile: DEFAULT_DIMENSION_PROFILE }))
    expect(Object.keys(values).some((key) => key.startsWith('exercise:daily:'))).toBe(true)
    await fireEvent.press(screen.getByTestId('exercise-next'))
    expect(scheduler).toHaveBeenLastCalledWith(expect.objectContaining({}), expect.anything(), {
      reviews: 0,
      lastNewAt: 0,
    })
    scheduler.mockRestore()
    jest.restoreAllMocks()
  })

  test('skip records SRS pass and daily passed count without adapting dimensions', async () => {
    const actualScheduler = jest.requireActual(
      '../../../../../src/exercises/scheduler',
    ) as typeof import('../../../../../src/exercises/scheduler')
    const expected = actualScheduler.nextExercise(DEFAULT_DIMENSION_PROFILE)
    jest.mocked(nextExercise).mockReturnValue(expected)
    const values: UserDataSnapshot['values'] = {}
    const repository = createInMemoryRepository(values)
    await render(
      <UserDataProvider repositoryFactory={async () => repository}>
        <ExerciseRoute />
      </UserDataProvider>,
    )
    await act(async () => {})

    await act(async () => {})
    expect(screen.getAllByText(expected.word).length).toBeGreaterThan(0)
    await fireEvent.press(screen.getByTestId('skip-question'))
    await act(async () => {})

    expect(values[`srs:${expected.cardKey}`]).toBeDefined()
    expect(values['dimension:store']).toBeUndefined()
    expect(
      Object.values(values).some(
        (value) => typeof value === 'object' && value !== null && 'passed' in value && value.passed === 1,
      ),
    ).toBe(true)
  })

  test('shows a native in-app banner when the tenth correct answer of the day extends the streak', async () => {
    const actualScheduler = jest.requireActual(
      '../../../../../src/exercises/scheduler',
    ) as typeof import('../../../../../src/exercises/scheduler')
    const expected = actualScheduler.nextExercise(DEFAULT_DIMENSION_PROFILE)
    jest.mocked(nextExercise).mockReturnValue(expected)
    const now = new Date()
    const day = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    const values: UserDataSnapshot['values'] = {
      [`exercise:daily:${day}`]: { date: day, correct: 9, incorrect: 0, passed: 0 },
    }
    const repository = createInMemoryRepository(values)
    await render(
      <UserDataProvider repositoryFactory={async () => repository}>
        <ExerciseRoute />
      </UserDataProvider>,
    )
    await act(async () => {})

    await fireEvent.press(screen.getAllByRole('radio')[expected.answer])
    await act(async () => {})

    expect(showBanner).toHaveBeenCalledWith({ kind: 'streak', message: 'Streak extended!', color: '#a32b18' })
  })
})
