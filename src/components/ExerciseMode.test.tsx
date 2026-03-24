import { cleanup, fireEvent, render, screen } from '@testing-library/preact'
import type { ComponentChildren } from 'preact'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import type { Exercise } from '../exercises/types'
import { I18nProvider } from '../hooks/i18n'
import { RoutingProvider } from '../hooks/routing'
import { ExerciseMode } from './ExerciseMode'

beforeEach(() => {
  cleanup()
  localStorage.removeItem('conjugator:dimensions')
  localStorage.removeItem('conjugator:exercise:daily')
  localStorage.removeItem('conjugator:srs')
})

afterEach(() => {
  cleanup()
  localStorage.removeItem('conjugator:dimensions')
  localStorage.removeItem('conjugator:exercise:daily')
  localStorage.removeItem('conjugator:srs')
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
    kind: 'verbForm',
    word: 'كَتَبَ',
    promptTranslationKey: 'exercise.prompt.verbForm',
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

  test('clicking pass loads a fresh question', () => {
    const nextExercise: Exercise = {
      kind: 'verbForm',
      word: 'دَخَلَ',
      promptTranslationKey: 'exercise.prompt.verbForm',
      options: ['I', 'II', 'III', 'IV'],
      answer: 0,
    }
    const gen = vi.fn().mockReturnValueOnce(testExercise()).mockReturnValueOnce(nextExercise)
    render(<ExerciseMode generateExercise={gen} />, { wrapper: Wrapper })

    fireEvent.click(screen.getByRole('button', { name: /pass/i }))

    expect(screen.getByText('دَخَلَ')).toBeInTheDocument()
  })

  test('correct option is marked after selecting any answer', () => {
    render(<ExerciseMode generateExercise={testExercise} />, { wrapper: Wrapper })
    fireEvent.click(screen.getAllByRole('button', { name: /^(I|II|III|IV)$/ })[0])
    expect(screen.getByTestId('correct-option')).toBeInTheDocument()
    expect(screen.getByTestId('correct-option')).toHaveAttribute('aria-label', 'I')
  })

  describe('profile-based generation', () => {
    test('calls the generator with INITIAL_DIMENSION_STORE profile on mount', () => {
      const gen = vi.fn().mockReturnValue(testExercise())
      render(<ExerciseMode generateExercise={gen} />, { wrapper: Wrapper })
      expect(gen).toHaveBeenCalledWith(
        { tenses: 0, pronouns: 0, diacritics: 0, forms: 0, rootTypes: 0, nominals: 0 },
        expect.any(Object),
      )
    })

    test('calls the generator with stored dimension profile on mount', () => {
      localStorage.setItem(
        'conjugator:dimensions',
        JSON.stringify({
          profile: {
            tenses: 1,
            pronouns: 0,
            diacritics: 0,
            forms: 0,
            rootTypes: 0,
            nominals: 0,
          },
          windows: { tenses: [], pronouns: [], diacritics: [], forms: [], rootTypes: [], nominals: [] },
        }),
      )
      const gen = vi.fn().mockReturnValue(testExercise())
      render(<ExerciseMode generateExercise={gen} />, { wrapper: Wrapper })
      expect(gen).toHaveBeenCalledWith(
        {
          tenses: 1,
          pronouns: 0,
          diacritics: 0,
          forms: 0,
          rootTypes: 0,
          nominals: 0,
        },
        expect.any(Object),
      )
    })

    test('calls the generator with the current stored profile when next is clicked', () => {
      localStorage.setItem(
        'conjugator:dimensions',
        JSON.stringify({
          profile: {
            tenses: 2,
            pronouns: 0,
            diacritics: 0,
            forms: 0,
            rootTypes: 0,
            nominals: 0,
          },
          windows: { tenses: [], pronouns: [], diacritics: [], forms: [], rootTypes: [], nominals: [] },
        }),
      )
      const gen = vi.fn().mockReturnValue(testExercise())
      render(<ExerciseMode generateExercise={gen} />, { wrapper: Wrapper })
      fireEvent.click(screen.getAllByRole('button', { name: /^(I|II|III|IV)$/ })[0])
      fireEvent.click(screen.getByRole('button', { name: /next/i }))
      for (const call of gen.mock.calls) {
        expect(call[0]).toMatchObject({
          tenses: 2,
          pronouns: 0,
          diacritics: 0,
          forms: 0,
          rootTypes: 0,
          nominals: 0,
        })
      }
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
})

describe('SRS recording', () => {
  test('records answer in SRS store when option selected', () => {
    localStorage.clear()
    const exercise: Exercise = {
      kind: 'conjugation',
      word: 'كَتَبَ',
      promptTranslationKey: 'exercise.prompt.conjugation',
      promptParams: { tense: 'exercise.conjugation.tense.past', pronoun: 'exercise.conjugation.pronoun.3ms' },
      options: ['كَتَبَ', 'يَكْتُبُ', 'كَتَبْتَ', 'كُتِبَ'],
      answer: 0,
      cardKey: 'conjugation:regular:1:active-past:3ms',
    }
    render(<ExerciseMode generateExercise={() => exercise} />, {
      wrapper: ({ children }: { children: ComponentChildren }) => (
        <RoutingProvider>
          <I18nProvider>{children}</I18nProvider>
        </RoutingProvider>
      ),
    })
    fireEvent.click(screen.getAllByRole('button')[0])
    const srs = JSON.parse(localStorage.getItem('conjugator:srs') ?? '{}')
    expect(srs['conjugation:regular:1:active-past:3ms']).toBeDefined()
    localStorage.clear()
  })
})

describe('pass SRS recording', () => {
  test('clicking pass halves the card interval without updating daily stats', () => {
    const cardKey = 'verbForm:regular:1'
    const exercise: Exercise = {
      kind: 'verbForm',
      word: 'كَتَبَ',
      promptTranslationKey: 'exercise.prompt.verbForm',
      options: ['I', 'II', 'III', 'IV'],
      answer: 0,
      cardKey,
    }
    localStorage.setItem(
      'conjugator:srs',
      JSON.stringify({ [cardKey]: { interval: 6, ef: 2.5, repetitions: 2, dueDate: '2026-03-29' } }),
    )
    localStorage.setItem('conjugator:exercise:daily', JSON.stringify([]))

    render(<ExerciseMode generateExercise={() => exercise} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByRole('button', { name: /pass/i }))

    const srs = JSON.parse(localStorage.getItem('conjugator:srs') ?? '{}')
    expect(srs[cardKey].interval).toBe(3)
    expect(srs[cardKey].repetitions).toBe(2)
    expect(srs[cardKey].ef).toBeCloseTo(2.5)

    const daily = JSON.parse(localStorage.getItem('conjugator:exercise:daily') ?? '[]')
    expect(daily).toEqual([])
  })
})
