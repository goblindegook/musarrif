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
  expect(screen.getAllByRole('button')).toHaveLength(4)
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
})

test('clicking an option calls onAnswer with its index and correctness', () => {
  const onAnswer = vi.fn()
  render(<ExerciseAnswerArea exercise={makeExercise()} onAnswer={onAnswer} />, { wrapper: Wrapper })
  fireEvent.click(screen.getByRole('button', { name: 'يَكتُبُ' }))
  expect(onAnswer).toHaveBeenCalledWith(1, false)
})

test('clicking the correct option calls onAnswer with isCorrect=true', () => {
  const onAnswer = vi.fn()
  render(<ExerciseAnswerArea exercise={makeExercise()} onAnswer={onAnswer} />, { wrapper: Wrapper })
  fireEvent.click(screen.getByRole('button', { name: 'كَتَبَ' }))
  expect(onAnswer).toHaveBeenCalledWith(0, true)
})

test('option buttons are disabled after answering', () => {
  render(<ExerciseAnswerArea exercise={makeExercise()} onAnswer={noop} />, { wrapper: Wrapper })
  fireEvent.click(screen.getAllByRole('button')[0])
  for (const btn of screen.getAllByRole('button')) {
    expect(btn).toBeDisabled()
  }
})

test('correct option is marked after answering', () => {
  render(<ExerciseAnswerArea exercise={makeExercise()} onAnswer={noop} />, { wrapper: Wrapper })
  fireEvent.click(screen.getAllByRole('button')[0])
  expect(screen.getByTestId('correct-option')).toBeInTheDocument()
})

test('toggle button absent when supportsTyping is not set', () => {
  render(<ExerciseAnswerArea exercise={makeExercise()} onAnswer={noop} />, { wrapper: Wrapper })
  expect(screen.queryByRole('button', { name: /Type the answer/ })).not.toBeInTheDocument()
})

test('toggle button visible when supportsTyping is true', () => {
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} onAnswer={noop} />, { wrapper: Wrapper })
  expect(screen.getByRole('button', { name: /Type the answer/ })).toBeInTheDocument()
})

test('clicking the toggle switches to typing mode', () => {
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} onAnswer={noop} />, { wrapper: Wrapper })
  fireEvent.click(screen.getByRole('button', { name: /Type the answer/ }))
  expect(screen.getByRole('textbox')).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: 'كَتَبَ' })).not.toBeInTheDocument()
})

test('clicking the toggle again switches back to option buttons', () => {
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} onAnswer={noop} />, { wrapper: Wrapper })
  fireEvent.click(screen.getByRole('button', { name: /Type the answer/ }))
  fireEvent.click(screen.getByRole('button', { name: /See options/ }))
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
})

test('toggle button has T shortcut', () => {
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} onAnswer={noop} />, { wrapper: Wrapper })
  fireEvent.keyDown(document, { key: 't' })
  expect(screen.getByRole('textbox')).toBeInTheDocument()
})

test('submitting the typing form calls onAnswer with correct index and true', () => {
  const onAnswer = vi.fn()
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} onAnswer={onAnswer} />, {
    wrapper: Wrapper,
  })
  fireEvent.click(screen.getByRole('button', { name: /Type the answer/ }))
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'كَتَبَ' } })
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
  expect(onAnswer).toHaveBeenCalledWith(0, true)
})

test('typing the correct answer disables input and shows no reveal', () => {
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} onAnswer={noop} />, { wrapper: Wrapper })
  fireEvent.click(screen.getByRole('button', { name: /Type the answer/ }))
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'كَتَبَ' } })
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
  expect(screen.getByRole('textbox')).toBeDisabled()
  expect(screen.queryByTestId('correct-answer-reveal')).not.toBeInTheDocument()
})

test('typing a wrong answer calls onAnswer with false and reveals correct answer', () => {
  const onAnswer = vi.fn()
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} onAnswer={onAnswer} />, {
    wrapper: Wrapper,
  })
  fireEvent.click(screen.getByRole('button', { name: /Type the answer/ }))
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'يَكتُبُ' } })
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
  expect(onAnswer).toHaveBeenCalledWith(1, false)
  expect(screen.getByTestId('correct-answer-reveal')).toHaveTextContent('كَتَبَ')
  expect(screen.getByRole('textbox')).toBeDisabled()
})

test('empty typing submit does not answer', () => {
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} onAnswer={noop} />, { wrapper: Wrapper })
  fireEvent.click(screen.getByRole('button', { name: /Type the answer/ }))
  fireEvent.submit(screen.getByRole('textbox').closest('form') as HTMLFormElement)
  expect(screen.queryByTestId('correct-answer-reveal')).not.toBeInTheDocument()
  expect(screen.getByRole('textbox')).not.toBeDisabled()
})

test('toggle button is hidden after answering', () => {
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} onAnswer={noop} />, { wrapper: Wrapper })
  fireEvent.click(screen.getAllByRole('button', { name: /كَتَبَ|يَكتُبُ|كَتَّبَ|أَكتَبَ/ })[0])
  expect(screen.queryByRole('button', { name: /Type the answer/ })).not.toBeInTheDocument()
})

test('forceReveal shows correct option, disables buttons, hides toggle', () => {
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} forceReveal onAnswer={noop} />, {
    wrapper: Wrapper,
  })
  expect(screen.getByTestId('correct-option')).toBeInTheDocument()
  for (const btn of screen.getAllByRole('button')) {
    expect(btn).toBeDisabled()
  }
  expect(screen.queryByRole('button', { name: /Type the answer/ })).not.toBeInTheDocument()
})

test('toggle button appears last in MC mode with "Type the answer" text', () => {
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} onAnswer={noop} />, { wrapper: Wrapper })
  const buttons = screen.getAllByRole('button')
  const toggleButton = screen.getByRole('button', { name: /Type the answer/ })
  expect(buttons[buttons.length - 1]).toBe(toggleButton)
})

test('toggle button shows "See options" in typing mode', () => {
  render(<ExerciseAnswerArea exercise={makeExercise({ supportsTyping: true })} onAnswer={noop} />, { wrapper: Wrapper })
  fireEvent.click(screen.getByRole('button', { name: /Type the answer/ }))
  expect(screen.getByRole('button', { name: /See options/ })).toBeInTheDocument()
})
