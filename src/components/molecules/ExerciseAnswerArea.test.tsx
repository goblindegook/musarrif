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
  render(<ExerciseAnswerArea exercise={makeExercise()} onAnswer={noop} />, { wrapper: Wrapper })
  expect(screen.getAllByText(/كَتَبَ|يَكتُبُ|كَتَّبَ|أَكتَبَ|Type the answer|See options/)).toHaveLength(4)
  expect(screen.queryByPlaceholderText('Type your answer')).not.toBeInTheDocument()
})

test('clicking an option calls onAnswer with its index and correctness', () => {
  const onAnswer = vi.fn()
  render(<ExerciseAnswerArea exercise={makeExercise()} onAnswer={onAnswer} />, { wrapper: Wrapper })
  fireEvent.click(screen.getByLabelText('يَكتُبُ'))
  expect(onAnswer).toHaveBeenCalledWith(1, false)
})

test('clicking the correct option calls onAnswer with isCorrect=true', () => {
  const onAnswer = vi.fn()
  render(<ExerciseAnswerArea exercise={makeExercise()} onAnswer={onAnswer} />, { wrapper: Wrapper })
  fireEvent.click(screen.getByLabelText('كَتَبَ'))
  expect(onAnswer).toHaveBeenCalledWith(0, true)
})

test('option buttons are disabled after answering', () => {
  render(<ExerciseAnswerArea exercise={makeExercise()} onAnswer={noop} />, { wrapper: Wrapper })
  fireEvent.click(screen.getAllByText(/كَتَبَ|يَكتُبُ|كَتَّبَ|أَكتَبَ|Type the answer|See options/)[0])
  for (const btn of screen.getAllByText(/كَتَبَ|يَكتُبُ|كَتَّبَ|أَكتَبَ|Type the answer|See options/)) {
    expect(btn).toBeDisabled()
  }
})

test('correct option is marked after answering', () => {
  render(<ExerciseAnswerArea exercise={makeExercise()} onAnswer={noop} />, { wrapper: Wrapper })
  fireEvent.click(screen.getAllByText(/كَتَبَ|يَكتُبُ|كَتَّبَ|أَكتَبَ|Type the answer|See options/)[0])
  expect(screen.getByLabelText('كَتَبَ')).toHaveAttribute('data-state', 'correct')
})

test('toggle button absent when supportsTyping is not set', () => {
  render(<ExerciseAnswerArea exercise={makeExercise()} onAnswer={noop} />, { wrapper: Wrapper })
  expect(screen.queryByText(/Type the answer/)).not.toBeInTheDocument()
})

test('toggle button visible when supportsTyping is true', () => {
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} onAnswer={noop} />, { wrapper: Wrapper })
  expect(screen.getByText(/Type the answer/)).toBeInTheDocument()
})

test('clicking the toggle switches to typing mode', () => {
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} onAnswer={noop} />, { wrapper: Wrapper })
  fireEvent.click(screen.getByText(/Type the answer/))
  expect(screen.getByPlaceholderText('Type your answer')).toBeInTheDocument()
  expect(screen.queryByText('كَتَبَ')).not.toBeInTheDocument()
})

test('clicking the toggle again switches back to option buttons', () => {
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} onAnswer={noop} />, { wrapper: Wrapper })
  fireEvent.click(screen.getByText(/Type the answer/))
  fireEvent.click(screen.getByText(/See options/))
  expect(screen.queryByPlaceholderText('Type your answer')).not.toBeInTheDocument()
})

test('toggle button has T shortcut', () => {
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} onAnswer={noop} />, { wrapper: Wrapper })
  fireEvent.keyDown(document, { key: 't' })
  expect(screen.getByPlaceholderText('Type your answer')).toBeInTheDocument()
})

test('submitting the typing form calls onAnswer with correct index and true', () => {
  const onAnswer = vi.fn()
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} onAnswer={onAnswer} />, {
    wrapper: Wrapper,
  })
  fireEvent.click(screen.getByText(/Type the answer/))
  fireEvent.change(screen.getByPlaceholderText('Type your answer'), { target: { value: 'كَتَبَ' } })
  fireEvent.click(screen.getByLabelText('Submit'))
  expect(onAnswer).toHaveBeenCalledWith(0, true)
})

test('typing the correct answer disables input and shows no reveal', () => {
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} onAnswer={noop} />, { wrapper: Wrapper })
  fireEvent.click(screen.getByText(/Type the answer/))
  fireEvent.change(screen.getByPlaceholderText('Type your answer'), { target: { value: 'كَتَبَ' } })
  fireEvent.click(screen.getByLabelText('Submit'))
  expect(screen.getByPlaceholderText('Type your answer')).toBeDisabled()
  expect(screen.queryByText('كَتَبَ')).not.toBeInTheDocument()
})

test('typing a wrong answer calls onAnswer with false and reveals correct answer', () => {
  const onAnswer = vi.fn()
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} onAnswer={onAnswer} />, {
    wrapper: Wrapper,
  })
  fireEvent.click(screen.getByText(/Type the answer/))
  fireEvent.change(screen.getByPlaceholderText('Type your answer'), { target: { value: 'يَكتُبُ' } })
  fireEvent.click(screen.getByLabelText('Submit'))
  expect(onAnswer).toHaveBeenCalledWith(1, false)
  expect(screen.getByText('كَتَبَ')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Type your answer')).toBeDisabled()
})

test('empty typing submit does not answer', () => {
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} onAnswer={noop} />, { wrapper: Wrapper })
  fireEvent.click(screen.getByText(/Type the answer/))
  fireEvent.submit(screen.getByPlaceholderText('Type your answer').closest('form') as HTMLFormElement)
  expect(screen.queryByText('كَتَبَ')).not.toBeInTheDocument()
  expect(screen.getByPlaceholderText('Type your answer')).not.toBeDisabled()
})

test('toggle button is hidden after answering', () => {
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} onAnswer={noop} />, { wrapper: Wrapper })
  fireEvent.click(screen.getAllByText(/كَتَبَ|يَكتُبُ|كَتَّبَ|أَكتَبَ/)[0])
  expect(screen.queryByText(/Type the answer/)).not.toBeInTheDocument()
})

test('forceReveal shows correct option, disables buttons, hides toggle', () => {
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} forceReveal onAnswer={noop} />, {
    wrapper: Wrapper,
  })
  expect(screen.getByLabelText('كَتَبَ')).toHaveAttribute('data-state', 'correct')
  for (const btn of screen.getAllByText(/كَتَبَ|يَكتُبُ|كَتَّبَ|أَكتَبَ|Type the answer|See options/)) {
    expect(btn).toBeDisabled()
  }
  expect(screen.queryByText(/Type the answer/)).not.toBeInTheDocument()
})

test('toggle button appears last in MC mode with "Type the answer" text', () => {
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} onAnswer={noop} />, { wrapper: Wrapper })
  const buttons = screen.getAllByText(/كَتَبَ|يَكتُبُ|كَتَّبَ|أَكتَبَ|Type the answer|See options/)
  const toggleButton = screen.getByText(/Type the answer/)
  expect(buttons[buttons.length - 1]).toBe(toggleButton)
})

test('toggle button shows "See options" in typing mode', () => {
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} onAnswer={noop} />, { wrapper: Wrapper })
  fireEvent.click(screen.getByText(/Type the answer/))
  expect(screen.getByText(/See options/)).toBeInTheDocument()
})
