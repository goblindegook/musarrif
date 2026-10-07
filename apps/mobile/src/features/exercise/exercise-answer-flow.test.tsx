import { TextField } from '@expo/ui/swift-ui'
import { act, fireEvent, render, screen } from '@testing-library/react-native'
import type { Exercise } from '../../../../../src/exercises/exercises'
import { ExerciseSession } from './ExerciseSession'
import { sessionProps } from './exercise-session-props.ts'

const answerField = () => screen.UNSAFE_getByType(TextField)
const nextLabel = () => String(screen.getByTestId('exercise-next').props.children.props.children)

jest.mock('../../theme/tokens', () => require('./mock-theme-tokens').themeTokensMock)

const exercise: Exercise<'conjugation'> = {
  kind: 'conjugation',
  word: 'يَكْتُبُ',
  spokenWord: 'يَكْتُبُ',
  promptTranslationKey: 'Choose the Arabic form',
  options: ['يَكْتُبُ', 'كَتَبَ', 'يَكْتَبُ', 'كُتِبَ'],
  answer: 0,
  answerText: 'يَكْتُبُ',
  cardKey: 'conjugation:sound:1:active.present.indicative:3ms',
  dimensions: ['tenses', 'pronouns'],
  inputModes: ['multiple-choice', 'keyboard', 'speech'],
}

describe('native exercise answer flow', () => {
  test('reveals the shared grammar explanation after an answer', () => {
    const explainedExercise: Exercise<'conjugation'> = {
      ...exercise,
      explanation: {
        category: 'verb',
        arabic: 'كَتَبَ',
        paradigmRoots: ['ك', 'ت', 'ب'],
        paradigmForm: 1,
        form: '1-action',
        pastForm: 'كَتَبَ',
        tense: 'active.past',
        pronoun: '3ms',
      },
    }
    render(<ExerciseSession {...sessionProps({ exercise: explainedExercise })} />)

    expect(screen.queryByText(/A fatḥa in the past usually means/)).toBeNull()
    fireEvent.press(screen.getByRole('radio', { name: explainedExercise.options[1] }))
    expect(screen.getByText(/A fatḥa in the past usually means/)).toBeTruthy()
  })

  test('accepts an Arabic keyboard answer and shows the shared answer diff', () => {
    const onPersistAnswer = jest.fn()
    render(<ExerciseSession {...sessionProps({ exercise, onPersistAnswer })} />)

    fireEvent.press(screen.getByTestId('mode-keyboard'))
    act(() => answerField().props.onTextChange('يَكْتُبُ'))
    fireEvent.press(screen.getByTestId('submit-answer'))

    expect(nextLabel()).toBe('Correct · Next')
    expect(onPersistAnswer).toHaveBeenCalledWith(
      expect.objectContaining({ cardKey: exercise.cardKey, result: 'correct', answer: 'يَكْتُبُ' }),
    )
  })

  test('choosing to type focuses the answer field so the keyboard opens', () => {
    render(<ExerciseSession {...sessionProps({ exercise })} />)

    fireEvent.press(screen.getByTestId('mode-keyboard'))

    expect(answerField().props.autoFocus).toBe(true)
  })

  test('marks wrong Arabic letters in the diff and reveals the answer before continuing', () => {
    const onPersistAnswer = jest.fn()
    const onNext = jest.fn()
    render(<ExerciseSession {...sessionProps({ exercise, onNext, onPersistAnswer })} />)

    fireEvent.press(screen.getByTestId('mode-keyboard'))
    act(() => answerField().props.onTextChange('يَفْعَلُ'))
    fireEvent.press(screen.getByTestId('submit-answer'))

    expect(nextLabel()).toBe('Incorrect · Next')
    expect(screen.getByTestId('typed-answer-diff')).toBeTruthy()
    expect(screen.getAllByText('يَكْتُبُ').length).toBeGreaterThan(0)
    expect(onPersistAnswer).toHaveBeenCalledWith(expect.objectContaining({ result: 'wrong' }))

    expect(screen.queryByRole('button', { name: 'Try again' })).toBeNull()
    fireEvent.press(screen.getByTestId('exercise-next'))
    expect(onNext).toHaveBeenCalledTimes(1)
    expect(onPersistAnswer).toHaveBeenCalledTimes(1)
  })

  test('wrong multiple-choice answers can continue without retrying', () => {
    const onNext = jest.fn()
    render(<ExerciseSession {...sessionProps({ exercise, onNext })} />)

    fireEvent.press(screen.getByRole('radio', { name: exercise.options[1] }))
    expect(screen.queryByRole('button', { name: 'Try again' })).toBeNull()
    fireEvent.press(screen.getByTestId('exercise-next'))

    expect(onNext).toHaveBeenCalledTimes(1)
  })

  test('a correct answer keeps feedback and explanation visible until Next is tapped', () => {
    jest.useFakeTimers()
    const onNext = jest.fn()
    const explainedExercise: Exercise<'conjugation'> = {
      ...exercise,
      explanation: {
        category: 'verb',
        arabic: 'كَتَبَ',
        paradigmRoots: ['ك', 'ت', 'ب'],
        paradigmForm: 1,
        form: '1-action',
        pastForm: 'كَتَبَ',
        tense: 'active.past',
        pronoun: '3ms',
      },
    }
    render(<ExerciseSession {...sessionProps({ exercise: explainedExercise, onNext })} />)

    fireEvent.press(screen.getByRole('radio', { name: exercise.options[exercise.answer] }))
    expect(nextLabel()).toBe('Correct · Next')
    expect(screen.getByLabelText('Answer explanation')).toBeTruthy()
    expect(onNext).not.toHaveBeenCalled()

    act(() => jest.advanceTimersByTime(2000))
    expect(onNext).not.toHaveBeenCalled()
    expect(screen.getByLabelText('Answer explanation')).toBeTruthy()
    fireEvent.press(screen.getByTestId('exercise-next'))
    expect(onNext).toHaveBeenCalledTimes(1)
    jest.useRealTimers()
  })

  test('locks the input mode once an answer has been given', () => {
    render(<ExerciseSession {...sessionProps({ exercise })} />)

    fireEvent.press(screen.getByRole('radio', { name: exercise.options[1] }))
    expect(screen.queryByTestId('mode-keyboard')).toBeNull()
  })

  test('a new question with the same review card starts unanswered after Next', () => {
    const onNext = jest.fn()
    const onPersistAnswer = jest.fn()
    const { rerender } = render(<ExerciseSession {...sessionProps({ exercise, onNext, onPersistAnswer })} />)

    fireEvent.press(screen.getByRole('radio', { name: exercise.options[1] }))
    fireEvent.press(screen.getByTestId('exercise-next'))
    expect(onNext).toHaveBeenCalledTimes(1)

    const nextQuestion = {
      ...exercise,
      word: 'كَتَبَ',
      options: ['كَتَبَ', 'يَكْتُبُ', 'كُتِبَ', 'يَكْتَبُ'],
      answer: 0,
      answerText: 'كَتَبَ',
    }
    rerender(<ExerciseSession {...sessionProps({ exercise: nextQuestion, onNext, onPersistAnswer })} />)

    expect(screen.queryByTestId('exercise-next')).toBeNull()
    expect(screen.getByRole('radio', { name: 'كَتَبَ' }).props.accessibilityState.disabled).toBe(false)
    fireEvent.press(screen.getByRole('radio', { name: 'كَتَبَ' }))
    expect(onPersistAnswer).toHaveBeenCalledTimes(2)
  })

  test('Skip records a pass, reveals the correct answer and explanation, then offers Next', () => {
    const onPersistAnswer = jest.fn()
    const explainedExercise: Exercise<'conjugation'> = {
      ...exercise,
      explanation: {
        category: 'verb',
        arabic: 'كَتَبَ',
        paradigmRoots: ['ك', 'ت', 'ب'],
        paradigmForm: 1,
        form: '1-action',
        pastForm: 'كَتَبَ',
        tense: 'active.past',
        pronoun: '3ms',
      },
    }
    render(<ExerciseSession {...sessionProps({ exercise: explainedExercise, onNext: jest.fn(), onPersistAnswer })} />)

    fireEvent.press(screen.getByTestId('skip-question'))

    expect(onPersistAnswer).toHaveBeenCalledWith(expect.objectContaining({ cardKey: exercise.cardKey, result: 'pass' }))
    expect(nextLabel()).toBe('Skipped · Next')
    expect(screen.getByLabelText('Correct answer')).toBeTruthy()
    expect(screen.getByLabelText('Answer explanation')).toBeTruthy()
    expect(screen.queryByTestId('skip-question')).toBeNull()
    expect(screen.getByTestId('exercise-next')).toBeTruthy()
  })

  test('uses the injected locale translator for controls and answer feedback', () => {
    const translate = (key: string) =>
      ({
        'exercise.answer.correct': 'Risposta corretta',
        'exercise.next': 'Avanti',
        'exercise.toggle.type': 'Scrivi',
        'exercise.typing.placeholder': 'Type your answer',
        'exercise.typing.submit': 'Submit answer',
      })[key] ?? key
    render(<ExerciseSession {...sessionProps({ exercise, translate })} />)

    fireEvent.press(screen.getByTestId('mode-keyboard'))
    act(() => answerField().props.onTextChange('يَكْتُبُ'))
    fireEvent.press(screen.getByTestId('submit-answer'))
    expect(nextLabel()).toBe('Risposta corretta · Avanti')
  })

  test('shows translated labels for answer options that are translation keys', () => {
    const tenseExercise: Exercise<'conjugation'> = {
      ...exercise,
      options: ['tense.past', 'tense.present'],
      answer: 0,
      answerText: 'tense.past',
    }
    render(<ExerciseSession {...sessionProps({ exercise: tenseExercise })} />)

    expect(screen.getByRole('radio', { name: 'Past' })).toBeTruthy()
    expect(screen.getByRole('radio', { name: 'Present' })).toBeTruthy()
  })
})
