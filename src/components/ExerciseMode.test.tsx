import { cleanup, fireEvent, render, screen } from '@testing-library/preact'
import type { ComponentChildren } from 'preact'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import type { Exercise } from '../exercises/exercises'
import { I18nProvider } from '../hooks/i18n'
import { RoutingProvider } from '../hooks/routing'
import type { ExplanationLayers } from '../paradigms/explanation'
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
    cardKey: 'verbForm:sound:1',
  }
}

function utcAddDays(date: string, days: number): string {
  const d = new Date(date)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
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

  test('focuses next button after selecting an option', () => {
    render(<ExerciseMode generateExercise={testExercise} />, { wrapper: Wrapper })
    fireEvent.click(screen.getAllByRole('button', { name: /^(I|II|III|IV)$/ })[0])
    expect(screen.getByRole('button', { name: /next/i })).toHaveFocus()
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
      cardKey: 'verbForm:sound:1',
    }
    const gen = vi.fn().mockReturnValueOnce(testExercise()).mockReturnValueOnce(nextExercise)
    render(<ExerciseMode generateExercise={gen} />, { wrapper: Wrapper })

    fireEvent.click(screen.getByRole('button', { name: /skip/i }))

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
            pronouns: 2,
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
          pronouns: 2,
          diacritics: 0,
          forms: 0,
          rootTypes: 0,
          nominals: 0,
        })
      }
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

  test('sanitizes oversized persisted SRS state when loading from localStorage', () => {
    const cardKey = 'conjugation:regular:1:active-past:3ms'
    localStorage.setItem(
      'conjugator:srs',
      JSON.stringify({
        [cardKey]: {
          interval: 145313,
          ef: 2.5,
          repetitions: 13,
          dueDate: '2424-01-30',
        },
      }),
    )

    const gen = vi.fn().mockReturnValue({
      ...testExercise(),
      kind: 'conjugation',
      cardKey,
    })

    render(<ExerciseMode generateExercise={gen} />, { wrapper: Wrapper })

    const expectedDueDate = utcAddDays(new Date().toISOString().slice(0, 10), 365)
    expect(gen).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        [cardKey]: expect.objectContaining({ interval: 365, dueDate: expectedDueDate }),
      }),
    )

    const stored = JSON.parse(localStorage.getItem('conjugator:srs') ?? '{}')
    expect(stored[cardKey].interval).toBe(365)
    expect(stored[cardKey].dueDate).toBe(expectedDueDate)
  })
})

describe('keyboard shortcuts', () => {
  function nextExercise(): Exercise {
    return {
      kind: 'verbForm',
      word: 'دَخَلَ',
      promptTranslationKey: 'exercise.prompt.verbForm',
      options: ['I', 'II', 'III', 'IV'],
      answer: 0,
      cardKey: 'verbForm:sound:1',
    }
  }

  test('pressing 1 answers with the first option', () => {
    render(<ExerciseMode generateExercise={testExercise} />, { wrapper: Wrapper })
    fireEvent.keyDown(document.body, { key: '1' })
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
    expect(screen.getByTestId('correct-option')).toHaveAttribute('aria-label', 'I')
  })

  test('pressing 2 answers with the second option', () => {
    render(<ExerciseMode generateExercise={testExercise} />, { wrapper: Wrapper })
    fireEvent.keyDown(document.body, { key: '2' })
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /^(I|II|III|IV)$/ })[1]).toHaveAttribute('data-state', 'wrong')
  })

  test('pressing 3 answers with the third option', () => {
    render(<ExerciseMode generateExercise={testExercise} />, { wrapper: Wrapper })
    fireEvent.keyDown(document.body, { key: '3' })
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /^(I|II|III|IV)$/ })[2]).toHaveAttribute('data-state', 'wrong')
  })

  test('pressing 4 answers with the fourth option', () => {
    render(<ExerciseMode generateExercise={testExercise} />, { wrapper: Wrapper })
    fireEvent.keyDown(document.body, { key: '4' })
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /^(I|II|III|IV)$/ })[3]).toHaveAttribute('data-state', 'wrong')
  })

  test('pressing S before answering skips to the next exercise', () => {
    const gen = vi.fn().mockReturnValueOnce(testExercise()).mockReturnValue(nextExercise())
    render(<ExerciseMode generateExercise={gen} />, { wrapper: Wrapper })
    fireEvent.keyDown(document.body, { key: 's' })
    expect(screen.getByText('دَخَلَ')).toBeInTheDocument()
  })

  test('pressing S after answering does nothing', () => {
    const gen = vi.fn().mockReturnValueOnce(testExercise()).mockReturnValue(nextExercise())
    render(<ExerciseMode generateExercise={gen} />, { wrapper: Wrapper })
    fireEvent.keyDown(document.body, { key: '1' })
    fireEvent.keyDown(document.body, { key: 's' })
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
    expect(screen.queryByText('دَخَلَ')).not.toBeInTheDocument()
  })

  test('pressing a digit after answering does nothing', () => {
    const gen = vi.fn().mockReturnValueOnce(testExercise()).mockReturnValue(nextExercise())
    render(<ExerciseMode generateExercise={gen} />, { wrapper: Wrapper })
    fireEvent.keyDown(document.body, { key: '1' })
    fireEvent.keyDown(document.body, { key: '2' })
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
    expect(screen.queryByText('دَخَلَ')).not.toBeInTheDocument()
  })

  test('modifier key combinations are ignored', () => {
    render(<ExerciseMode generateExercise={testExercise} />, { wrapper: Wrapper })
    fireEvent.keyDown(document.body, { key: '1', ctrlKey: true })
    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument()
  })
})

describe('pass SRS recording', () => {
  test('clicking pass records a daily pass entry and halves the card SRS interval', () => {
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
    fireEvent.click(screen.getByRole('button', { name: /skip/i }))

    const srs = JSON.parse(localStorage.getItem('conjugator:srs') ?? '{}')
    expect(srs[cardKey].interval).toBe(3)
    expect(srs[cardKey].repetitions).toBe(2)
    expect(srs[cardKey].ef).toBeCloseTo(2.5)

    const daily = JSON.parse(localStorage.getItem('conjugator:exercise:daily') ?? '[]')
    expect(daily).toHaveLength(1)
    expect(daily[0]).toMatchObject({
      passed: 1,
      correct: 0,
      incorrect: 0,
      date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
    })
  })
})

const explanationFixture: ExplanationLayers = {
  rootLetters: ['ك', 'ت', 'ب'],
  form: 1,
  arabic: 'كَتَبَ',
  rootType: 'sound',
  formIPattern: 'fa3ala-yaf3ulu',
  formRoot: null,
  tense: 'active-past',
  tenseRoot: null,
  pronoun: '3ms',
}

function exerciseWithExplanation(): Exercise {
  return {
    kind: 'conjugation',
    word: 'كَتَبَ',
    promptTranslationKey: 'exercise.prompt.conjugation',
    promptParams: { tense: 'exercise.conjugation.tense.past', pronoun: 'exercise.conjugation.pronoun.3ms' },
    options: ['كَتَبَ', 'يَكْتُبُ', 'كَتَبْتُ', 'كَتَبَتْ'],
    answer: 0,
    cardKey: 'conjugation:regular:1:active-past:3ms',
    explanation: explanationFixture,
  }
}

describe('Explanation in ExerciseMode', () => {
  test('explanation is not visible before answering', () => {
    render(<ExerciseMode generateExercise={exerciseWithExplanation} />, { wrapper: Wrapper })
    const paragraphs = document.querySelectorAll('p[class]')
    expect(paragraphs).toHaveLength(2)
  })

  test('explanation paragraphs appear after selecting a wrong answer', () => {
    render(<ExerciseMode generateExercise={exerciseWithExplanation} />, { wrapper: Wrapper })
    fireEvent.click(screen.getAllByRole('button')[1])
    const paragraphs = document.querySelectorAll('p[class]')
    expect(paragraphs).toHaveLength(5)
  })
})
