import { cleanup, fireEvent, render, screen } from '@testing-library/preact'
import type { ComponentChildren } from 'preact'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import type { Exercise } from '../exercises/types'
import { I18nProvider } from '../hooks/i18n'
import { RoutingProvider } from '../hooks/routing'
import { ExerciseMode } from './ExerciseMode'

beforeEach(() => {
  cleanup()
  localStorage.removeItem('conjugator:exerciseDifficulty')
  localStorage.removeItem('conjugator:exerciseStats')
})

afterEach(() => {
  cleanup()
  localStorage.removeItem('conjugator:exerciseDifficulty')
  localStorage.removeItem('conjugator:exerciseStats')
})

function Wrapper({ children }: { children: ComponentChildren }) {
  return (
    <RoutingProvider>
      <I18nProvider>{children}</I18nProvider>
    </RoutingProvider>
  )
}

function testExercise(): Exercise {
  return {
    kind: 'form',
    word: 'كَتَبَ',
    promptTranslationKey: 'exercise.form.prompt',
    options: ['I', 'II', 'III', 'IV'],
    answer: 0,
  }
}

describe('ExerciseMode', () => {
  test('shows four option buttons', () => {
    render(<ExerciseMode generateExercise={testExercise} />, { wrapper: Wrapper })
    expect(screen.getAllByRole('button', { name: /^(I|II|III|IV)$/ })).toHaveLength(4)
  })

  test('does not show next button before answering', () => {
    render(<ExerciseMode generateExercise={testExercise} />, { wrapper: Wrapper })
    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument()
  })

  test('shows next button after selecting an option', () => {
    render(<ExerciseMode generateExercise={testExercise} />, { wrapper: Wrapper })
    fireEvent.click(screen.getAllByRole('button', { name: /^(I|II|III|IV)$/ })[0])
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
  })

  test('option buttons are disabled after answering', () => {
    render(<ExerciseMode generateExercise={testExercise} />, { wrapper: Wrapper })
    const options = screen.getAllByRole('button', { name: /^(I|II|III|IV)$/ })
    fireEvent.click(options[0])
    for (const option of options) {
      expect(option).toBeDisabled()
    }
  })

  test('clicking next loads a fresh question with enabled options', () => {
    render(<ExerciseMode generateExercise={testExercise} />, { wrapper: Wrapper })
    fireEvent.click(screen.getAllByRole('button', { name: /^(I|II|III|IV)$/ })[0])
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    const freshOptions = screen.getAllByRole('button', { name: /^(I|II|III|IV)$/ })
    expect(freshOptions).toHaveLength(4)
    for (const option of freshOptions) {
      expect(option).not.toBeDisabled()
    }
  })

  test('correct option is marked after selecting any answer', () => {
    // answer=0 → option at index 0 (I) is correct
    render(<ExerciseMode generateExercise={testExercise} />, { wrapper: Wrapper })
    fireEvent.click(screen.getAllByRole('button', { name: /^(I|II|III|IV)$/ })[0])
    expect(screen.getByTestId('correct-option')).toBeInTheDocument()
    expect(screen.getByTestId('correct-option')).toHaveAttribute('aria-label', 'I')
  })

  describe('difficulty toggle', () => {
    test('shows three difficulty buttons', () => {
      render(<ExerciseMode generateExercise={testExercise} />, { wrapper: Wrapper })
      expect(screen.getByRole('button', { name: /easy/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /medium/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /hard/i })).toBeInTheDocument()
    })

    test('easy is the default selected difficulty', () => {
      render(<ExerciseMode generateExercise={testExercise} />, { wrapper: Wrapper })
      expect(screen.getByRole('button', { name: /easy/i })).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByRole('button', { name: /medium/i })).toHaveAttribute('aria-pressed', 'false')
      expect(screen.getByRole('button', { name: /hard/i })).toHaveAttribute('aria-pressed', 'false')
    })

    test('selecting a difficulty updates the active button', () => {
      render(<ExerciseMode generateExercise={testExercise} />, { wrapper: Wrapper })
      fireEvent.click(screen.getByRole('button', { name: /medium/i }))
      expect(screen.getByRole('button', { name: /medium/i })).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByRole('button', { name: /easy/i })).toHaveAttribute('aria-pressed', 'false')
    })

    test('selecting a difficulty resets the in-progress answer', () => {
      const gen = vi.fn().mockReturnValue(testExercise())
      render(<ExerciseMode generateExercise={gen} />, { wrapper: Wrapper })
      fireEvent.click(screen.getAllByRole('button', { name: /^(I|II|III|IV)$/ })[0])
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: /hard/i }))
      expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument()
    })

    test('calls the generator with easy on mount', () => {
      const gen = vi.fn().mockReturnValue(testExercise())
      render(<ExerciseMode generateExercise={gen} />, { wrapper: Wrapper })
      expect(gen).toHaveBeenCalledWith('easy')
    })

    test('calls the generator with the current difficulty when next is clicked', () => {
      const gen = vi.fn().mockReturnValue(testExercise())
      render(<ExerciseMode generateExercise={gen} />, { wrapper: Wrapper })
      fireEvent.click(screen.getByRole('button', { name: /medium/i }))
      fireEvent.click(screen.getAllByRole('button', { name: /^(I|II|III|IV)$/ })[0])
      fireEvent.click(screen.getByRole('button', { name: /next/i }))
      expect(gen).toHaveBeenLastCalledWith('medium')
    })

    test('calls the generator with the new difficulty when difficulty changes', () => {
      const gen = vi.fn().mockReturnValue(testExercise())
      render(<ExerciseMode generateExercise={gen} />, { wrapper: Wrapper })
      fireEvent.click(screen.getByRole('button', { name: /hard/i }))
      expect(gen).toHaveBeenCalledWith('hard')
    })
  })

  describe('statistics panel', () => {
    test('shows a statistics toggle below the exercise', () => {
      render(<ExerciseMode generateExercise={testExercise} />, { wrapper: Wrapper })
      expect(screen.getByRole('button', { name: /statistics/i })).toBeInTheDocument()
    })

    test('shows the streak label when expanded', () => {
      render(<ExerciseMode generateExercise={testExercise} />, { wrapper: Wrapper })
      fireEvent.click(screen.getByRole('button', { name: /statistics/i }))
      expect(screen.getByText('Streak')).toBeInTheDocument()
    })

    test('streak becomes 1 after answering the first exercise', () => {
      render(<ExerciseMode generateExercise={testExercise} />, { wrapper: Wrapper })
      fireEvent.click(screen.getByRole('button', { name: /statistics/i }))
      fireEvent.click(screen.getAllByRole('button', { name: /^(I|II|III|IV)$/ })[0])
      expect(screen.getByText('1 days')).toBeInTheDocument()
    })
  })

  describe('difficulty persistence', () => {
    test('restores stored difficulty on mount', () => {
      localStorage.setItem('conjugator:exerciseDifficulty', JSON.stringify('medium'))
      render(<ExerciseMode generateExercise={testExercise} />, { wrapper: Wrapper })
      expect(screen.getByRole('button', { name: /medium/i })).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByRole('button', { name: /easy/i })).toHaveAttribute('aria-pressed', 'false')
    })

    test('persists difficulty to localStorage when changed', () => {
      render(<ExerciseMode generateExercise={testExercise} />, { wrapper: Wrapper })
      fireEvent.click(screen.getByRole('button', { name: /hard/i }))
      expect(localStorage.getItem('conjugator:exerciseDifficulty')).toBe(JSON.stringify('hard'))
    })
  })
})
