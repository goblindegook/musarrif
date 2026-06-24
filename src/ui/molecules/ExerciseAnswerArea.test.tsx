import { act, cleanup, fireEvent, render, screen } from '@testing-library/preact'
import type { ComponentChildren } from 'preact'
import { afterEach, expect, test, vi } from 'vitest'
import type { Exercise } from '../../exercises/exercises'
import { mockSpeechRecognition } from '../../test/fixtures'
import { I18nProvider } from '../hooks/useI18n'
import { ExerciseAnswerArea } from './ExerciseAnswerArea'

afterEach(() => {
  cleanup()
  Object.defineProperty(window, 'SpeechRecognition', {
    writable: true,
    configurable: true,
    value: undefined,
  })
})

function Wrapper({ children }: { children: ComponentChildren }) {
  return <I18nProvider>{children}</I18nProvider>
}

function makeExercise(overrides: Partial<Exercise> = {}): Exercise {
  return {
    kind: 'conjugation',
    dimensions: ['tenses'],
    word: 'يَكتُبُ',
    spokenWord: 'يَكتُبُ',
    promptTranslationKey: 'exercise.prompt.conjugation',
    options: ['كَتَبَ', 'يَكتُبُ', 'كَتَّبَ', 'أَكتَبَ'],
    answer: 0,
    cardKey: 'test:card',
    inputModes: ['multiple-choice'],
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
  fireEvent.click(screen.getByText('يَكتُبُ', { selector: 'button' }))
  expect(onAnswer).toHaveBeenCalledWith(1, false)
})

test('clicking the correct option calls onAnswer with isCorrect=true', () => {
  const onAnswer = vi.fn()
  render(<ExerciseAnswerArea exercise={makeExercise()} onAnswer={onAnswer} />, { wrapper: Wrapper })
  fireEvent.click(screen.getByText('كَتَبَ', { selector: 'button' }))
  expect(onAnswer).toHaveBeenCalledWith(0, true)
})

test('multiple-choice option buttons with Arabic text set lang and dir attributes', () => {
  render(<ExerciseAnswerArea exercise={makeExercise()} onAnswer={noop} />, { wrapper: Wrapper })
  expect(screen.getByText('كَتَبَ', { selector: 'button' })).toHaveAttribute('lang', 'ar')
  expect(screen.getByText('كَتَبَ', { selector: 'button' })).toHaveAttribute('dir', 'rtl')
})

test('multiple-choice option buttons with localized non-Arabic text do not force Arabic lang or direction', () => {
  render(
    <ExerciseAnswerArea
      exercise={makeExercise({ options: ['Past', 'Present', 'Future', 'Imperative'] })}
      onAnswer={noop}
    />,
    { wrapper: Wrapper },
  )
  expect(screen.getByText('Past', { selector: 'button' })).not.toHaveAttribute('lang')
  expect(screen.getByText('Past', { selector: 'button' })).not.toHaveAttribute('dir')
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
  expect(screen.getByText('كَتَبَ', { selector: 'button' })).toHaveAttribute('data-state', 'correct')
})

test('toggle button absent when supportsTyping is not set', () => {
  render(<ExerciseAnswerArea exercise={makeExercise()} onAnswer={noop} />, { wrapper: Wrapper })
  expect(screen.queryByText(/Type the answer/)).not.toBeInTheDocument()
})

test('toggle button visible when supportsTyping is true', () => {
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'keyboard'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  expect(screen.getByText(/Type the answer/)).toBeInTheDocument()
})

test('clicking the toggle switches to typing mode', () => {
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'keyboard'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Type the answer/))
  expect(screen.getByPlaceholderText('Type your answer')).toBeInTheDocument()
  expect(screen.queryByText('كَتَبَ')).not.toBeInTheDocument()
})

test('clicking the toggle again switches back to option buttons', () => {
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'keyboard'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Type the answer/))
  fireEvent.click(screen.getByText(/See options/))
  expect(screen.queryByPlaceholderText('Type your answer')).not.toBeInTheDocument()
})

test('toggle button has T shortcut', () => {
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'keyboard'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  fireEvent.keyDown(document, { key: 't' })
  expect(screen.getByPlaceholderText('Type your answer')).toBeInTheDocument()
})

test('submitting the typing form calls onAnswer with correct index and true', () => {
  const onAnswer = vi.fn()
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'keyboard'] })} onAnswer={onAnswer} />,
    {
      wrapper: Wrapper,
    },
  )
  fireEvent.click(screen.getByText(/Type the answer/))
  fireEvent.change(screen.getByPlaceholderText('Type your answer'), { target: { value: 'كَتَبَ' } })
  fireEvent.click(screen.getByLabelText('Submit'))
  expect(onAnswer).toHaveBeenCalledWith(0, true)
})

test('typing the correct answer disables input and shows no reveal', () => {
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'keyboard'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Type the answer/))
  fireEvent.change(screen.getByPlaceholderText('Type your answer'), { target: { value: 'كَتَبَ' } })
  fireEvent.click(screen.getByLabelText('Submit'))
  expect(screen.getByPlaceholderText('Type your answer')).toBeDisabled()
  expect(screen.queryByText('كَتَبَ')).not.toBeInTheDocument()
})

test('typing a wrong answer calls onAnswer with false and reveals correct answer', () => {
  const onAnswer = vi.fn()
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'keyboard'] })} onAnswer={onAnswer} />,
    {
      wrapper: Wrapper,
    },
  )
  fireEvent.click(screen.getByText(/Type the answer/))
  fireEvent.change(screen.getByPlaceholderText('Type your answer'), { target: { value: 'يَكتُبُ' } })
  fireEvent.click(screen.getByLabelText('Submit'))
  expect(onAnswer).toHaveBeenCalledWith(1, false)
  expect(screen.getByText('كَتَبَ')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Type your answer')).toBeDisabled()
})

test('empty typing submit does not answer', () => {
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'keyboard'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Type the answer/))
  fireEvent.submit(screen.getByPlaceholderText('Type your answer').closest('form') as HTMLFormElement)
  expect(screen.queryByText('كَتَبَ')).not.toBeInTheDocument()
  expect(screen.getByPlaceholderText('Type your answer')).not.toBeDisabled()
})

test('toggle button is hidden after answering', () => {
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'keyboard'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getAllByText(/كَتَبَ|يَكتُبُ|كَتَّبَ|أَكتَبَ/)[0])
  expect(screen.queryByText(/Type the answer/)).not.toBeInTheDocument()
})

test('forceReveal shows correct option, disables buttons, hides toggle', () => {
  render(
    <ExerciseAnswerArea
      exercise={makeExercise({ inputModes: ['multiple-choice', 'keyboard'] })}
      forceReveal
      onAnswer={noop}
    />,
    {
      wrapper: Wrapper,
    },
  )
  expect(screen.getByText('كَتَبَ', { selector: 'button' })).toHaveAttribute('data-state', 'correct')
  for (const btn of screen.getAllByText(/كَتَبَ|يَكتُبُ|كَتَّبَ|أَكتَبَ|Type the answer|See options/)) {
    expect(btn).toBeDisabled()
  }
  expect(screen.queryByText(/Type the answer/)).not.toBeInTheDocument()
})

test('toggle button appears last in MC mode with "Type the answer" text', () => {
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'keyboard'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  const buttons = screen.getAllByText(/كَتَبَ|يَكتُبُ|كَتَّبَ|أَكتَبَ|Type the answer|See options/)
  const toggleButton = screen.getByText(/Type the answer/)
  expect(buttons[buttons.length - 1]).toBe(toggleButton)
})

test('toggle button shows "See options" in typing mode', () => {
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'keyboard'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Type the answer/))
  expect(screen.getByText(/See options/)).toBeInTheDocument()
})

test('answer area has role="group" and aria-labelledby when promptId is provided', () => {
  render(<ExerciseAnswerArea exercise={makeExercise()} onAnswer={noop} promptId="exercise-prompt" />, {
    wrapper: Wrapper,
  })
  const group = screen.getByRole('group')
  expect(group).toHaveAttribute('aria-labelledby', 'exercise-prompt')
})

test('typing mode input has aria-labelledby pointing to the prompt', () => {
  render(
    <ExerciseAnswerArea
      exercise={makeExercise({ inputModes: ['multiple-choice', 'keyboard'] })}
      onAnswer={noop}
      promptId="exercise-prompt"
    />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Type the answer/))
  expect(screen.getByPlaceholderText('Type your answer')).toHaveAttribute('aria-labelledby', 'exercise-prompt')
})

test('typing input has aria-invalid="true" after wrong answer submitted', () => {
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'keyboard'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Type the answer/))
  fireEvent.change(screen.getByPlaceholderText('Type your answer'), { target: { value: 'يَكتُبُ' } })
  fireEvent.click(screen.getByLabelText('Submit'))
  expect(screen.getByPlaceholderText('Type your answer')).toHaveAttribute('aria-invalid', 'true')
})

test('typing input does not have aria-invalid after correct answer submitted', () => {
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'keyboard'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Type the answer/))
  fireEvent.change(screen.getByPlaceholderText('Type your answer'), { target: { value: 'كَتَبَ' } })
  fireEvent.click(screen.getByLabelText('Submit'))
  expect(screen.getByPlaceholderText('Type your answer')).not.toHaveAttribute('aria-invalid', 'true')
})

// ─── Speech mode tests ────────────────────────────────────────────────────────

test('speech toggle absent when supportsSpeech is not set', () => {
  render(<ExerciseAnswerArea exercise={makeExercise()} onAnswer={noop} />, { wrapper: Wrapper })
  expect(screen.queryByText(/Speak the answer/)).not.toBeInTheDocument()
})

test('speech toggle absent when supportsSpeech is true but browser lacks SpeechRecognition', () => {
  // SpeechRecognition is not in jsdom by default
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'speech'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  expect(screen.queryByText(/Speak the answer/)).not.toBeInTheDocument()
})

test('speech toggle visible when supportsSpeech is true and browser supports recognition', () => {
  mockSpeechRecognition()
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'speech'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  expect(screen.getByText(/Speak the answer/)).toBeInTheDocument()
})

test('clicking speech toggle enters speech mode: toggle becomes "See options", listening starts', () => {
  mockSpeechRecognition()
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'speech'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Speak the answer/))
  expect(screen.getByText(/See options/)).toBeInTheDocument()
  expect(screen.getByDisplayValue(/Listening/)).toBeInTheDocument()
})

test('clicking speech toggle again returns to multiple-choice', () => {
  mockSpeechRecognition()
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'speech'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Speak the answer/)) // enter speech
  fireEvent.click(screen.getByText(/See options/)) // exit speech
  expect(screen.queryByDisplayValue(/Listening/)).not.toBeInTheDocument()
  expect(screen.getAllByRole('button').some((b) => b.textContent?.includes('كَتَبَ'))).toBe(true)
})

test('entering speech mode auto-starts recognition and shows listening state', () => {
  const mock = mockSpeechRecognition()
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'speech'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Speak the answer/))
  expect(mock.instance?.start).toHaveBeenCalledOnce()
  expect(screen.getByDisplayValue(/Listening/)).toBeInTheDocument()
})

test('correct speech result auto-submits and calls onAnswer', () => {
  const onAnswer = vi.fn()
  const mock = mockSpeechRecognition()
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'speech'] })} onAnswer={onAnswer} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Speak the answer/))
  act(() => mock.fire.result('كَتَبَ'))
  expect(onAnswer).toHaveBeenCalledWith(0, true)
})

test('correct speech result shows no submit or retry buttons', () => {
  const mock = mockSpeechRecognition()
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'speech'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Speak the answer/))
  act(() => mock.fire.result('كَتَبَ'))
  expect(screen.queryByLabelText('Try again')).not.toBeInTheDocument()
})

test('wrong speech result does not call onAnswer', () => {
  const onAnswer = vi.fn()
  const mock = mockSpeechRecognition()
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'speech'] })} onAnswer={onAnswer} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Speak the answer/))
  act(() => mock.fire.result('يَكتُبُ'))
  expect(onAnswer).not.toHaveBeenCalled()
})

test('wrong speech result shows transcript in error style', () => {
  const mock = mockSpeechRecognition()
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'speech'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Speak the answer/))
  act(() => mock.fire.result('يَكتُبُ'))
  expect(screen.getByDisplayValue('يَكتُبُ')).toBeInTheDocument()
})

test('retry button is disabled while listening', () => {
  mockSpeechRecognition()
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'speech'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Speak the answer/))
  expect(screen.getByLabelText('Try again')).toBeDisabled()
})

test('wrong speech result focuses the retry button', () => {
  const mock = mockSpeechRecognition()
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'speech'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Speak the answer/))
  act(() => mock.fire.result('يَكتُبُ'))
  expect(screen.getByLabelText('Try again')).toHaveFocus()
})

test('wrong speech result enables the retry button', () => {
  const mock = mockSpeechRecognition()
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'speech'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Speak the answer/))
  act(() => mock.fire.result('يَكتُبُ'))
  expect(screen.getByLabelText('Try again')).not.toBeDisabled()
})

test('retrying after wrong speech result restarts listening', () => {
  const mock = mockSpeechRecognition()
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'speech'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Speak the answer/))
  act(() => mock.fire.result('يَكتُبُ'))
  fireEvent.click(screen.getByLabelText('Try again'))
  expect(screen.getByDisplayValue(/Listening/)).toBeInTheDocument()
})

test('correct speech result after wrong attempt auto-submits', () => {
  const onAnswer = vi.fn()
  const mock = mockSpeechRecognition()
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'speech'] })} onAnswer={onAnswer} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Speak the answer/))
  act(() => mock.fire.result('يَكتُبُ'))
  fireEvent.click(screen.getByLabelText('Try again'))
  act(() => mock.fire.result('كَتَبَ'))
  expect(onAnswer).toHaveBeenCalledWith(0, true)
})

test('re-record button after wrong result starts listening without returning to idle', () => {
  const mock = mockSpeechRecognition()
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'speech'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Speak the answer/))
  act(() => mock.fire.result('يَكتُبُ'))
  fireEvent.click(screen.getByLabelText('Try again'))
  expect(screen.getByDisplayValue(/Listening/)).toBeInTheDocument()
})

test('no-speech error shows correct error message and retry button', () => {
  const mock = mockSpeechRecognition()
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'speech'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Speak the answer/))
  act(() => mock.fire.end()) // onend without prior result → no-speech
  expect(screen.getByDisplayValue(/Didn’t catch that/)).toBeInTheDocument()
  expect(screen.getByLabelText('Try again')).toBeInTheDocument()
})

test('generic error shows generic error message', () => {
  const mock = mockSpeechRecognition()
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'speech'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Speak the answer/))
  act(() => mock.fire.error('network'))
  expect(screen.getByDisplayValue(/Recognition failed/)).toBeInTheDocument()
})

test('speech toggle hidden after correct answer auto-submits', () => {
  const mock = mockSpeechRecognition()
  render(
    <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'speech'] })} onAnswer={noop} />,
    { wrapper: Wrapper },
  )
  fireEvent.click(screen.getByText(/Speak the answer/))
  act(() => mock.fire.result('كَتَبَ'))
  expect(screen.queryByText(/See options/)).not.toBeInTheDocument()
  expect(screen.queryByText(/Speak the answer/)).not.toBeInTheDocument()
})

// ─── Mode reset on exercise change ────────────────────────────────────────────

test('typing mode falls back to MC when new exercise does not support typing', () => {
  const { rerender } = render(
    <I18nProvider>
      <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'keyboard'] })} onAnswer={noop} />
    </I18nProvider>,
  )
  fireEvent.click(screen.getByText(/Type the answer/))
  expect(screen.getByPlaceholderText('Type your answer')).toBeInTheDocument()

  rerender(
    <I18nProvider>
      <ExerciseAnswerArea exercise={makeExercise()} onAnswer={noop} />
    </I18nProvider>,
  )
  expect(screen.queryByPlaceholderText('Type your answer')).not.toBeInTheDocument()
  expect(screen.getAllByRole('button').some((b) => b.textContent?.includes('كَتَبَ'))).toBe(true)
})

test('speech mode falls back to MC when new exercise does not support speech', () => {
  mockSpeechRecognition()
  const { rerender } = render(
    <I18nProvider>
      <ExerciseAnswerArea exercise={makeExercise({ inputModes: ['multiple-choice', 'speech'] })} onAnswer={noop} />
    </I18nProvider>,
  )
  fireEvent.click(screen.getByText(/Speak the answer/))
  expect(screen.getByText(/See options/)).toBeInTheDocument()

  rerender(
    <I18nProvider>
      <ExerciseAnswerArea exercise={makeExercise()} onAnswer={noop} />
    </I18nProvider>,
  )
  expect(screen.queryByText(/See options/)).not.toBeInTheDocument()
  expect(screen.getAllByRole('button').some((b) => b.textContent?.includes('كَتَبَ'))).toBe(true)
})
