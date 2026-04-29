import { cleanup, fireEvent, render, screen } from '@testing-library/preact'
import type { ComponentChildren } from 'preact'
import { afterEach, describe, expect, test, vi } from 'vitest'
import type { Exercise } from '../../exercises/exercises'
import { I18nProvider } from '../../hooks/useI18n'
import { RoutingProvider } from '../../hooks/useRouting'
import { ExerciseMode } from './ExerciseMode'

afterEach(() => {
  document.title = ''
  localStorage.clear()
  cleanup()
  vi.restoreAllMocks()
})

function Wrapper({ children }: { children: ComponentChildren }) {
  return (
    <RoutingProvider>
      <I18nProvider>{children}</I18nProvider>
    </RoutingProvider>
  )
}

function testExercise(overrides = {}): Exercise {
  return {
    kind: 'verbForm',
    dimensions: ['forms', 'rootTypes', 'diacritics'],
    word: 'كَتَبَ',
    promptTranslationKey: 'exercise.prompt.verbForm',
    options: ['I', 'II', 'III', 'IV'],
    answer: 0,
    cardKey: 'verbForm:sound:1',
    explanations: [
      null,
      {
        rootLetters: ['ك', 'ت', 'ب'],
        form: 1,
        arabic: 'كَتَبَ',
        rootType: 'sound',
        vowels: 'a-u',
        tense: 'active.past',
        pronoun: '3ms',
      },
      {
        rootLetters: ['ك', 'ت', 'ب'],
        form: 1,
        arabic: 'كَتَبَ',
        rootType: 'sound',
        vowels: 'a-u',
        tense: 'active.past',
        pronoun: '3ms',
      },
      {
        rootLetters: ['ك', 'ت', 'ب'],
        form: 1,
        arabic: 'كَتَبَ',
        rootType: 'sound',
        vowels: 'a-u',
        tense: 'active.past',
        pronoun: '3ms',
      },
    ],
    ...overrides,
  }
}

function utcAddDays(date: string, days: number): string {
  const d = new Date(date)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

function localDateKey(date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

describe('ExerciseMode', () => {
  test('sets the page title for exercise mode', () => {
    render(<ExerciseMode generateExercise={() => testExercise()} />, { wrapper: Wrapper })
    expect(document.title).toBe('Exercise · Muṣarrif')
  })

  test('shows four option buttons', () => {
    render(<ExerciseMode generateExercise={() => testExercise()} />, { wrapper: Wrapper })
    expect(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })).toHaveLength(4)
  })

  test('does not show next button before answering', () => {
    render(<ExerciseMode generateExercise={() => testExercise()} />, { wrapper: Wrapper })
    expect(screen.queryByText(/next/i, { selector: 'button' })).not.toBeInTheDocument()
  })

  test('shows next button after selecting an option', () => {
    render(<ExerciseMode generateExercise={() => testExercise()} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByLabelText('I'))
    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
  })

  test('focuses next button after selecting an option', () => {
    render(<ExerciseMode generateExercise={() => testExercise()} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByLabelText('I'))
    expect(screen.getByText(/next/i, { selector: 'button' })).toHaveFocus()
  })

  test('option buttons are disabled after answering', () => {
    render(<ExerciseMode generateExercise={() => testExercise()} />, { wrapper: Wrapper })
    const options = screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })
    fireEvent.click(options[0])
    for (const option of options) {
      expect(option).toBeDisabled()
    }
  })

  test('clicking next loads a fresh question with enabled options', () => {
    render(<ExerciseMode generateExercise={() => testExercise()} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByLabelText('I'))
    fireEvent.click(screen.getByText(/next/i, { selector: 'button' }))
    const freshOptions = screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })
    expect(freshOptions).toHaveLength(4)
    for (const option of freshOptions) {
      expect(option).not.toBeDisabled()
    }
  })

  test('clicking pass reveals the correct answer and waits for next', () => {
    const gen = vi
      .fn()
      .mockReturnValueOnce(testExercise())
      .mockReturnValueOnce(testExercise({ word: 'دَخَلَ' }))
    render(<ExerciseMode generateExercise={gen} />, { wrapper: Wrapper })

    fireEvent.click(screen.getByText(/skip/i, { selector: 'button' }))

    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
    expect(screen.getByLabelText('I')).toHaveAttribute('data-state', 'correct')
    expect(screen.getByText(/Form I is the base pattern/i)).toBeInTheDocument()
    expect(screen.getByText('كَتَبَ')).toBeInTheDocument()
  })

  test('clicking next after pass loads a fresh question', () => {
    const gen = vi
      .fn()
      .mockReturnValueOnce(testExercise())
      .mockReturnValueOnce(testExercise({ word: 'دَخَلَ' }))
    render(<ExerciseMode generateExercise={gen} />, { wrapper: Wrapper })

    fireEvent.click(screen.getByText(/skip/i, { selector: 'button' }))
    fireEvent.click(screen.getByText(/next/i, { selector: 'button' }))

    expect(screen.getByText('دَخَلَ')).toBeInTheDocument()
  })

  test('correct option is marked after selecting any answer', () => {
    render(<ExerciseMode generateExercise={() => testExercise()} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByLabelText('I'))
    expect(screen.getByLabelText('I')).toBeInTheDocument()
    expect(screen.getByLabelText('I')).toHaveAttribute('data-state', 'correct')
  })

  describe('profile-based generation', () => {
    function testProfile(overrides = {}) {
      return {
        tenses: 0,
        pronouns: 0,
        diacritics: 0,
        forms: 0,
        rootTypes: 0,
        nominals: 0,
        ...overrides,
      }
    }

    test('calls the generator with initial dimension profile on mount', () => {
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
          profile: testProfile({ tenses: 1 }),
          windows: { tenses: [], pronouns: [], diacritics: [], forms: [], rootTypes: [], nominals: [] },
        }),
      )
      const gen = vi.fn().mockReturnValue(testExercise())
      render(<ExerciseMode generateExercise={gen} />, { wrapper: Wrapper })
      expect(gen).toHaveBeenCalledWith(testProfile({ tenses: 1 }), expect.any(Object))
    })

    test('calls the generator with the current stored profile when next is clicked', () => {
      localStorage.setItem(
        'conjugator:dimensions',
        JSON.stringify({
          profile: testProfile({ tenses: 2, pronouns: 2 }),
          windows: { tenses: [], pronouns: [], diacritics: [], forms: [], rootTypes: [], nominals: [] },
        }),
      )
      const gen = vi.fn().mockReturnValue(testExercise())
      render(<ExerciseMode generateExercise={gen} />, { wrapper: Wrapper })
      fireEvent.click(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[0])
      fireEvent.click(screen.getByText(/next/i, { selector: 'button' }))
      expect(gen).toHaveBeenNthCalledWith(2, testProfile({ tenses: 2, pronouns: 2 }), expect.any(Object))
    })
  })

  describe('unlock alerts', () => {
    test('shows specific unlocked items when a new level is unlocked', () => {
      localStorage.setItem(
        'conjugator:dimensions',
        JSON.stringify({
          profile: {
            tenses: 0,
            pronouns: 1,
            diacritics: 0,
            forms: 0,
            rootTypes: 0,
            nominals: 0,
          },
          windows: {
            tenses: [],
            pronouns: [],
            diacritics: [],
            forms: Array(19).fill(true),
            rootTypes: [],
            nominals: [],
          },
        }),
      )

      render(<ExerciseMode generateExercise={() => testExercise()} />, { wrapper: Wrapper })
      fireEvent.click(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[0])

      expect(screen.getByText('Forms unlocked: Form II')).toBeInTheDocument()
    })

    test('clears unlock alert after loading the next exercise', () => {
      localStorage.setItem(
        'conjugator:dimensions',
        JSON.stringify({
          profile: {
            tenses: 0,
            pronouns: 1,
            diacritics: 0,
            forms: 0,
            rootTypes: 0,
            nominals: 0,
          },
          windows: {
            tenses: [],
            pronouns: [],
            diacritics: [],
            forms: Array(19).fill(true),
            rootTypes: [],
            nominals: [],
          },
        }),
      )

      render(<ExerciseMode generateExercise={() => testExercise()} />, { wrapper: Wrapper })
      fireEvent.click(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[0])
      fireEvent.click(screen.getByText(/next/i, { selector: 'button' }))

      expect(screen.queryByText('Forms unlocked: Form II')).not.toBeInTheDocument()
    })

    test('does not unlock when answer is wrong even if threshold is reached', () => {
      localStorage.setItem(
        'conjugator:dimensions',
        JSON.stringify({
          profile: {
            tenses: 0,
            pronouns: 1,
            diacritics: 0,
            forms: 0,
            rootTypes: 0,
            nominals: 0,
          },
          windows: {
            tenses: [],
            pronouns: [],
            diacritics: [],
            forms: Array(19).fill(true),
            rootTypes: [],
            nominals: [],
          },
        }),
      )

      render(<ExerciseMode generateExercise={() => testExercise()} />, { wrapper: Wrapper })
      fireEvent.click(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[1])

      expect(screen.queryByText('Forms unlocked: Form II')).not.toBeInTheDocument()
    })

    test('shows streak-extended alert when daily correct answers reach 10', () => {
      localStorage.setItem(
        'conjugator:exercise:daily',
        JSON.stringify([{ date: localDateKey(), correct: 9, incorrect: 0, passed: 0 }]),
      )

      render(<ExerciseMode generateExercise={() => testExercise()} />, { wrapper: Wrapper })
      fireEvent.click(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[0])

      expect(screen.getByText('Streak extended!')).toBeInTheDocument()
    })

    test('does not show streak-extended alert before daily correct answers reach 10', () => {
      localStorage.setItem(
        'conjugator:exercise:daily',
        JSON.stringify([{ date: localDateKey(), correct: 8, incorrect: 0, passed: 0 }]),
      )

      render(<ExerciseMode generateExercise={() => testExercise()} />, { wrapper: Wrapper })
      fireEvent.click(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[0])

      expect(screen.queryByText('Streak extended!')).not.toBeInTheDocument()
    })
  })
})

describe('SRS recording', () => {
  test('records answer in SRS store when option selected', () => {
    const exercise: Exercise = {
      kind: 'conjugation',
      dimensions: ['tenses', 'pronouns', 'forms', 'rootTypes', 'diacritics'],
      word: 'كَتَبَ',
      promptTranslationKey: 'exercise.prompt.conjugation',
      promptParams: { tense: 'exercise.conjugation.tense.past', pronoun: 'pronoun.3ms' },
      options: ['كَتَبَ', 'يَكْتُبُ', 'كَتَبْتَ', 'كُتِبَ'],
      answer: 0,
      cardKey: 'conjugation:regular:1:active.past:3ms',
    }
    render(<ExerciseMode generateExercise={() => exercise} />, {
      wrapper: ({ children }: { children: ComponentChildren }) => (
        <RoutingProvider>
          <I18nProvider>{children}</I18nProvider>
        </RoutingProvider>
      ),
    })
    fireEvent.click(screen.getByLabelText('كَتَبَ'))
    const srs = JSON.parse(localStorage.getItem('conjugator:srs') ?? '{}')
    expect(srs['conjugation:regular:1:active.past:3ms']).toBeDefined()
  })

  test('sanitizes oversized persisted SRS state when loading from localStorage', () => {
    const cardKey = 'conjugation:regular:1:active.past:3ms'
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
  test('pressing 1 answers with the first option', () => {
    render(<ExerciseMode generateExercise={() => testExercise()} />, { wrapper: Wrapper })
    fireEvent.keyDown(document.body, { key: '1' })
    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
    expect(screen.getByLabelText('I')).toHaveAttribute('data-state', 'correct')
  })

  test('pressing 2 answers with the second option', () => {
    render(<ExerciseMode generateExercise={() => testExercise()} />, { wrapper: Wrapper })
    fireEvent.keyDown(document.body, { key: '2' })
    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
    expect(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[1]).toHaveAttribute('data-state', 'wrong')
  })

  test('pressing 3 answers with the third option', () => {
    render(<ExerciseMode generateExercise={() => testExercise()} />, { wrapper: Wrapper })
    fireEvent.keyDown(document.body, { key: '3' })
    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
    expect(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[2]).toHaveAttribute('data-state', 'wrong')
  })

  test('pressing 4 answers with the fourth option', () => {
    render(<ExerciseMode generateExercise={() => testExercise()} />, { wrapper: Wrapper })
    fireEvent.keyDown(document.body, { key: '4' })
    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
    expect(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[3]).toHaveAttribute('data-state', 'wrong')
  })

  test('pressing S before answering reveals the answer and explanation', () => {
    const gen = vi
      .fn()
      .mockReturnValueOnce(testExercise())
      .mockReturnValue(testExercise({ word: 'دَخَلَ' }))
    render(<ExerciseMode generateExercise={gen} />, { wrapper: Wrapper })
    fireEvent.keyDown(document.body, { key: 's' })
    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
    expect(screen.getByLabelText('I')).toHaveAttribute('data-state', 'correct')
    expect(screen.getByText(/Form I is the base pattern/i)).toBeInTheDocument()
  })

  test('pressing S after answering does nothing', () => {
    const gen = vi
      .fn()
      .mockReturnValueOnce(testExercise())
      .mockReturnValue(testExercise({ word: 'دَخَلَ' }))
    render(<ExerciseMode generateExercise={gen} />, { wrapper: Wrapper })
    fireEvent.keyDown(document.body, { key: '1' })
    fireEvent.keyDown(document.body, { key: 's' })
    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
    expect(screen.queryByText('دَخَلَ')).not.toBeInTheDocument()
  })

  test('pressing a digit after answering does nothing', () => {
    const gen = vi
      .fn()
      .mockReturnValueOnce(testExercise())
      .mockReturnValue(testExercise({ word: 'دَخَلَ' }))
    render(<ExerciseMode generateExercise={gen} />, { wrapper: Wrapper })
    fireEvent.keyDown(document.body, { key: '1' })
    fireEvent.keyDown(document.body, { key: '2' })
    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
    expect(screen.queryByText('دَخَلَ')).not.toBeInTheDocument()
  })

  test('modifier key combinations are ignored', () => {
    render(<ExerciseMode generateExercise={() => testExercise()} />, { wrapper: Wrapper })
    fireEvent.keyDown(document.body, { key: '1', ctrlKey: true })
    expect(screen.queryByText(/next/i, { selector: 'button' })).not.toBeInTheDocument()
  })
})

describe('pass SRS recording', () => {
  test('clicking pass records a daily pass entry and halves the card SRS interval', () => {
    const exercise = testExercise({ cardKey: 'verbForm:regular:1' })
    localStorage.setItem(
      'conjugator:srs',
      JSON.stringify({ 'verbForm:regular:1': { interval: 6, ef: 2.5, repetitions: 2, dueDate: '2026-03-29' } }),
    )
    localStorage.setItem('conjugator:exercise:daily', JSON.stringify([]))

    render(<ExerciseMode generateExercise={() => exercise} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText(/skip/i, { selector: 'button' }))

    const srs = JSON.parse(localStorage.getItem('conjugator:srs') ?? '{}')
    expect(srs['verbForm:regular:1'].interval).toBe(3)
    expect(srs['verbForm:regular:1'].repetitions).toBe(2)
    expect(srs['verbForm:regular:1'].ef).toBeCloseTo(2.5)

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

describe('Explanation in ExerciseMode', () => {
  test('explanation is not visible before answering', () => {
    render(<ExerciseMode generateExercise={() => testExercise()} />, { wrapper: Wrapper })
    expect(screen.queryByText(/Form I is the base pattern/i)).not.toBeInTheDocument()
  })

  test('explanation paragraphs appear after selecting a wrong answer', () => {
    render(<ExerciseMode generateExercise={() => testExercise()} />, { wrapper: Wrapper })
    fireEvent.click(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[1])
    expect(screen.getByText(/Form I is the base pattern/i)).toBeInTheDocument()
  })
})

function conjugationExercise(overrides: Partial<Exercise> = {}): Exercise {
  return {
    kind: 'conjugation',
    dimensions: ['tenses', 'pronouns', 'forms', 'rootTypes', 'diacritics'],
    word: 'يَكتُبُ',
    promptTranslationKey: 'exercise.prompt.conjugation',
    promptParams: { tense: 'exercise.conjugation.tense.past', pronoun: 'pronoun.3ms' },
    options: ['كَتَبَ', 'يَكتُبُ', 'كَتَّبَ', 'أَكتَبَ'],
    answer: 0,
    cardKey: 'conjugation:sound:1:active.past:3ms',
    supportsTyping: true,
    ...overrides,
  }
}

describe('typing mode', () => {
  test('non-conjugation exercise shows no typing mode toggle', () => {
    render(<ExerciseMode generateExercise={() => testExercise()} />, { wrapper: Wrapper })
    expect(screen.queryByText('Type the answer', { selector: 'button' })).not.toBeInTheDocument()
  })

  test('conjugation exercise shows typing mode toggle', () => {
    render(<ExerciseMode generateExercise={() => conjugationExercise()} />, { wrapper: Wrapper })
    expect(screen.getByText('Type the answer', { selector: 'button' })).toBeInTheDocument()
  })

  test('clicking toggle switches to text input', () => {
    render(<ExerciseMode generateExercise={() => conjugationExercise()} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Type the answer', { selector: 'button' }))
    expect(screen.getByPlaceholderText('Type your answer')).toBeInTheDocument()
  })

  test('clicking toggle again switches back to option buttons', () => {
    render(<ExerciseMode generateExercise={() => conjugationExercise()} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Type the answer', { selector: 'button' }))
    fireEvent.click(screen.getByText('See options', { selector: 'button' }))
    expect(screen.queryByPlaceholderText('Type your answer')).not.toBeInTheDocument()
    expect(screen.getAllByText(/كَتَبَ|يَكتُبُ|كَتَّبَ|أَكتَبَ/, { selector: 'button' })).toHaveLength(4)
  })

  test('typing the exact correct answer records as correct', () => {
    render(<ExerciseMode generateExercise={() => conjugationExercise()} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Type the answer', { selector: 'button' }))
    fireEvent.change(screen.getByPlaceholderText('Type your answer'), { target: { value: 'كَتَبَ' } })
    fireEvent.click(screen.getByLabelText('Submit'))
    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
    expect(screen.queryByText('كَتَبَ', { selector: 'p' })).not.toBeInTheDocument()
  })

  test('submit is disabled until a non-whitespace answer is typed', () => {
    render(<ExerciseMode generateExercise={() => conjugationExercise()} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Type the answer', { selector: 'button' }))
    expect(screen.getByLabelText('Submit')).toBeDisabled()
    fireEvent.change(screen.getByPlaceholderText('Type your answer'), { target: { value: '   ' } })
    expect(screen.getByLabelText('Submit')).toBeDisabled()
    fireEvent.change(screen.getByPlaceholderText('Type your answer'), { target: { value: 'كَتَبَ' } })
    expect(screen.getByLabelText('Submit')).not.toBeDisabled()
  })

  test('empty typing submit does not answer the exercise', () => {
    render(<ExerciseMode generateExercise={() => conjugationExercise()} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Type the answer', { selector: 'button' }))
    fireEvent.submit(screen.getByPlaceholderText('Type your answer').closest('form') as HTMLFormElement)
    expect(screen.queryByText(/next/i, { selector: 'button' })).not.toBeInTheDocument()
    expect(screen.queryByText('كَتَبَ', { selector: 'p' })).not.toBeInTheDocument()
    fireEvent.change(screen.getByPlaceholderText('Type your answer'), { target: { value: '   ' } })
    fireEvent.submit(screen.getByPlaceholderText('Type your answer').closest('form') as HTMLFormElement)
    expect(screen.queryByText(/next/i, { selector: 'button' })).not.toBeInTheDocument()
    expect(screen.queryByText('كَتَبَ', { selector: 'p' })).not.toBeInTheDocument()
  })

  test('typing the bare correct answer (no diacritics) also records as correct', () => {
    render(<ExerciseMode generateExercise={() => conjugationExercise()} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Type the answer', { selector: 'button' }))
    fireEvent.change(screen.getByPlaceholderText('Type your answer'), { target: { value: 'كتب' } })
    fireEvent.click(screen.getByLabelText('Submit'))
    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
    expect(screen.queryByText('كَتَبَ', { selector: 'p' })).not.toBeInTheDocument()
  })

  test('typing a wrong answer shows the correct answer text', () => {
    render(<ExerciseMode generateExercise={() => conjugationExercise()} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Type the answer', { selector: 'button' }))
    fireEvent.change(screen.getByPlaceholderText('Type your answer'), { target: { value: 'يَكتُبُ' } })
    fireEvent.click(screen.getByLabelText('Submit'))
    expect(screen.getByText('كَتَبَ', { selector: 'p' })).toBeInTheDocument()
    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
  })

  test('typing mode persists after advancing to next exercise', () => {
    const gen = vi
      .fn()
      .mockReturnValueOnce(conjugationExercise())
      .mockReturnValueOnce(conjugationExercise({ word: 'يَذهَبُ', cardKey: 'conjugation:sound:1:active.past:3fs' }))
    render(<ExerciseMode generateExercise={gen} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Type the answer', { selector: 'button' }))
    fireEvent.change(screen.getByPlaceholderText('Type your answer'), { target: { value: 'كَتَبَ' } })
    fireEvent.click(screen.getByLabelText('Submit'))
    fireEvent.click(screen.getByText(/next/i, { selector: 'button' }))
    expect(screen.getByPlaceholderText('Type your answer')).toBeInTheDocument()
  })

  test('correct-answer reveal is gone after advancing to next exercise', () => {
    const gen = vi
      .fn()
      .mockReturnValueOnce(conjugationExercise())
      .mockReturnValueOnce(conjugationExercise({ word: 'يَذهَبُ', cardKey: 'conjugation:sound:1:active.past:3fs' }))
    render(<ExerciseMode generateExercise={gen} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Type the answer', { selector: 'button' }))
    fireEvent.change(screen.getByPlaceholderText('Type your answer'), { target: { value: 'يَكتُبُ' } })
    fireEvent.click(screen.getByLabelText('Submit'))
    fireEvent.click(screen.getByText(/next/i, { selector: 'button' }))
    expect(screen.queryByText('كَتَبَ', { selector: 'p' })).not.toBeInTheDocument()
  })

  test('skip in typing mode reveals answer without wrong input state and shows explanation', () => {
    const gen = vi
      .fn()
      .mockReturnValueOnce(testExercise({ supportsTyping: true }))
      .mockReturnValueOnce(testExercise({ supportsTyping: true, word: 'دَخَلَ', cardKey: 'verbForm:sound:2' }))
    render(<ExerciseMode generateExercise={gen} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Type the answer', { selector: 'button' }))
    fireEvent.click(screen.getByText(/skip/i, { selector: 'button' }))

    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
    expect(screen.getByText('I', { selector: 'p' })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Type your answer')).not.toHaveAttribute('data-state', 'wrong')
    expect(screen.getByText(/Form I is the base pattern/i)).toBeInTheDocument()
  })

  test('skip in typing mode uses the fullest explanation when answer payload is reduced', () => {
    const reducedAnswerExercise = conjugationExercise({
      explanations: [
        {
          rootLetters: ['ك', 'ت', 'ب'],
          arabic: 'كَتَبَ',
          tense: 'active.past',
          pronoun: '3ms',
        },
        {
          rootLetters: ['ك', 'ت', 'ب'],
          form: 1,
          arabic: 'كَتَبَ',
          rootType: 'sound',
          vowels: 'a-u',
          tense: 'active.past',
          pronoun: '3ms',
        },
        {
          rootLetters: ['ك', 'ت', 'ب'],
          form: 1,
          arabic: 'كَتَبَ',
          rootType: 'sound',
          vowels: 'a-u',
          tense: 'active.past',
          pronoun: '3ms',
        },
        {
          rootLetters: ['ك', 'ت', 'ب'],
          form: 1,
          arabic: 'كَتَبَ',
          rootType: 'sound',
          vowels: 'a-u',
          tense: 'active.past',
          pronoun: '3ms',
        },
      ],
    })

    render(<ExerciseMode generateExercise={() => reducedAnswerExercise} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Type the answer', { selector: 'button' }))
    fireEvent.click(screen.getByText(/skip/i, { selector: 'button' }))

    expect(screen.getByText(/Form I is the base pattern/i)).toBeInTheDocument()
  })
})
