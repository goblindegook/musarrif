import { cleanup, fireEvent, render, screen } from '@testing-library/preact'
import type { ComponentChildren } from 'preact'
import { afterEach, expect, test, vi } from 'vitest'
import type { Exercise } from '../../exercises/exercises'
import { I18nProvider } from '../../hooks/useI18n'
import { ExerciseAnswerArea } from './ExerciseAnswerArea'

afterEach(() => {
  cleanup()
})

function Wrapper({ children }: { children: ComponentChildren }) {
  return <I18nProvider>{children}</I18nProvider>
}

function makeExercise(overrides: Partial<Exercise> = {}): Exercise {
  return {
    kind: 'conjugation',
    dimensions: ['tenses'],
    word: 'يَكتُبُ',
    promptTranslationKey: 'exercise.prompt.conjugation',
    options: ['كَتَبَ', 'يَكتُبُ', 'كَتَّبَ', 'أَكتَبَ'],
    answer: 0,
    cardKey: 'test:card',
    ...overrides,
  }
}

const noop = () => {}

test('MC mode renders four option buttons and no text input', () => {
  render(
    <ExerciseAnswerArea
      exercise={makeExercise()}
      mode="multiple-choice"
      selected={null}
      typedResult="idle"
      onAnswer={noop}
      onTypedAnswer={noop}
      onToggleMode={noop}
    />,
    { wrapper: Wrapper },
  )
  expect(screen.getAllByRole('button')).toHaveLength(4)
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
})

test('clicking an option calls onAnswer with its index', () => {
  const onAnswer = vi.fn()
  render(
    <ExerciseAnswerArea
      exercise={makeExercise()}
      mode="multiple-choice"
      selected={null}
      typedResult="idle"
      onAnswer={onAnswer}
      onTypedAnswer={noop}
      onToggleMode={noop}
    />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByRole('button', { name: 'يَكتُبُ' }))
  expect(onAnswer).toHaveBeenCalledWith(1)
})

test('toggle button absent when supportsTyping is not set', () => {
  render(
    <ExerciseAnswerArea
      exercise={makeExercise()}
      mode="multiple-choice"
      selected={null}
      typedResult="idle"
      onAnswer={noop}
      onTypedAnswer={noop}
      onToggleMode={noop}
    />,
    { wrapper: Wrapper },
  )
  expect(screen.queryByRole('button', { name: 'Type answer' })).not.toBeInTheDocument()
})

test('toggle button visible when supportsTyping is true', () => {
  render(
    <ExerciseAnswerArea
      exercise={makeExercise({ supportsTyping: true })}
      mode="multiple-choice"
      selected={null}
      typedResult="idle"
      onAnswer={noop}
      onTypedAnswer={noop}
      onToggleMode={noop}
    />,
    { wrapper: Wrapper },
  )
  expect(screen.getByRole('button', { name: 'Type answer' })).toBeInTheDocument()
})

test('clicking the toggle calls onToggleMode', () => {
  const onToggleMode = vi.fn()
  render(
    <ExerciseAnswerArea
      exercise={makeExercise({ supportsTyping: true })}
      mode="multiple-choice"
      selected={null}
      typedResult="idle"
      onAnswer={noop}
      onTypedAnswer={noop}
      onToggleMode={onToggleMode}
    />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByRole('button', { name: 'Type answer' }))
  expect(onToggleMode).toHaveBeenCalledOnce()
})

test('typing mode renders a text input and no option buttons', () => {
  render(
    <ExerciseAnswerArea
      exercise={makeExercise({ supportsTyping: true })}
      mode="typing"
      selected={null}
      typedResult="idle"
      onAnswer={noop}
      onTypedAnswer={noop}
      onToggleMode={noop}
    />,
    { wrapper: Wrapper },
  )
  expect(screen.getByRole('textbox')).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: 'كَتَبَ' })).not.toBeInTheDocument()
})

test('submitting the typing form calls onTypedAnswer with the input value', () => {
  const onTypedAnswer = vi.fn()
  render(
    <ExerciseAnswerArea
      exercise={makeExercise({ supportsTyping: true })}
      mode="typing"
      selected={null}
      typedResult="idle"
      onAnswer={noop}
      onTypedAnswer={onTypedAnswer}
      onToggleMode={noop}
    />,
    { wrapper: Wrapper },
  )
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'كَتَبَ' } })
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
  expect(onTypedAnswer).toHaveBeenCalledWith('كَتَبَ')
})

test('typedResult correct: input is disabled and no reveal shown', () => {
  render(
    <ExerciseAnswerArea
      exercise={makeExercise({ supportsTyping: true })}
      mode="typing"
      selected={null}
      typedResult="correct"
      onAnswer={noop}
      onTypedAnswer={noop}
      onToggleMode={noop}
    />,
    { wrapper: Wrapper },
  )
  expect(screen.getByRole('textbox')).toBeDisabled()
  expect(screen.queryByTestId('correct-answer-reveal')).not.toBeInTheDocument()
})

test('typedResult wrong: input is disabled and correct answer is revealed', () => {
  render(
    <ExerciseAnswerArea
      exercise={makeExercise({ supportsTyping: true })}
      mode="typing"
      selected={null}
      typedResult="wrong"
      onAnswer={noop}
      onTypedAnswer={noop}
      onToggleMode={noop}
    />,
    { wrapper: Wrapper },
  )
  expect(screen.getByRole('textbox')).toBeDisabled()
  expect(screen.getByTestId('correct-answer-reveal')).toHaveTextContent('كَتَبَ')
})

test('toggle button is disabled when typedResult is not idle', () => {
  render(
    <ExerciseAnswerArea
      exercise={makeExercise({ supportsTyping: true })}
      mode="typing"
      selected={null}
      typedResult="wrong"
      onAnswer={noop}
      onTypedAnswer={noop}
      onToggleMode={noop}
    />,
    { wrapper: Wrapper },
  )
  expect(screen.getByRole('button', { name: 'Multiple choice' })).toBeDisabled()
})
