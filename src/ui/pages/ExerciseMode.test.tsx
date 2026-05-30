import { cleanup, fireEvent, screen } from '@testing-library/preact'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import type { Exercise } from '../../exercises/exercises'
import { mockSpeechSynthesis, renderWithProviders } from '../../test/fixtures'
import { ExerciseMode } from './ExerciseMode'

beforeEach(() => {
  mockSpeechSynthesis()
})

afterEach(() => {
  document.title = ''
  localStorage.clear()
  cleanup()
  vi.restoreAllMocks()
})

function testExercise(overrides = {}): Exercise {
  return {
    kind: 'verbForm',
    dimensions: ['forms', 'rootTypes', 'diacritics'],
    word: 'كَتَبَ',
    spokenWord: 'كَتَبَ',
    promptTranslationKey: 'exercise.prompt.verbForm',
    options: ['I', 'II', 'III', 'IV'],
    answer: 0,
    cardKey: 'verbForm:sound:1',
    explanation: {
      category: 'verb',
      paradigmRoots: ['ك', 'ت', 'ب'],
      paradigmForm: 1,
      form: '1',
      arabic: 'كَتَبَ',
      rootType: 'sound',
      vowels: 'a-u',
      tense: 'active.past',
      pronoun: '3ms',
    },
    ...overrides,
  }
}

describe('ExerciseMode', () => {
  test('shows a speech button in the exercise header', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise({ spokenWord: 'كَتَبَ' })} />)

    expect(screen.getByLabelText('Play pronunciation for كَتَبَ')).toBeInTheDocument()
  })

  test('sets the page title for exercise mode', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    expect(document.title).toBe('Exercise · Muṣarrif')
  })

  test('shows four option buttons', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    expect(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })).toHaveLength(4)
  })

  test('does not show next button before answering', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    expect(screen.queryByText(/next/i, { selector: 'button' })).not.toBeInTheDocument()
  })

  test('shows next button after selecting an option', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    fireEvent.click(screen.getByText('I', { selector: 'button' }))
    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
  })

  test('focuses next button after selecting an option', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    fireEvent.click(screen.getByText('I', { selector: 'button' }))
    expect(screen.getByText(/next/i, { selector: 'button' })).toHaveFocus()
  })

  test('does not focus next button after selecting a wrong option', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    fireEvent.click(screen.getByText('II', { selector: 'button' }))
    expect(screen.getByText(/next/i, { selector: 'button' })).not.toHaveFocus()
  })

  test('does not focus next button after skipping', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    fireEvent.click(screen.getByText(/skip/i, { selector: 'button' }))
    expect(screen.getByText(/next/i, { selector: 'button' })).not.toHaveFocus()
  })

  test('answer area is labelled by the exercise prompt', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    const group = screen.getByRole('group')
    const promptId = group.getAttribute('aria-labelledby')
    expect(promptId).toBeTruthy()
    expect(document.getElementById(promptId!)).toBeInTheDocument()
  })

  test('option buttons are disabled after answering', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    const options = screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })
    fireEvent.click(options[0])
    for (const option of options) {
      expect(option).toBeDisabled()
    }
  })

  test('clicking next loads a fresh question with enabled options', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    fireEvent.click(screen.getByText('I', { selector: 'button' }))
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
    renderWithProviders(<ExerciseMode generateExercise={gen} />)

    fireEvent.click(screen.getByText(/skip/i, { selector: 'button' }))

    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
    expect(screen.getByText('I', { selector: 'button' })).toHaveAttribute('data-state', 'correct')
    expect(screen.getByText(/Form I is the base pattern/i)).toBeInTheDocument()
    expect(screen.getByText('كَتَبَ')).toBeInTheDocument()
  })

  test('clicking next after pass loads a fresh question', () => {
    const gen = vi
      .fn()
      .mockReturnValueOnce(testExercise())
      .mockReturnValueOnce(testExercise({ word: 'دَخَلَ' }))
    renderWithProviders(<ExerciseMode generateExercise={gen} />)

    fireEvent.click(screen.getByText(/skip/i, { selector: 'button' }))
    fireEvent.click(screen.getByText(/next/i, { selector: 'button' }))

    expect(screen.getByText('دَخَلَ')).toBeInTheDocument()
  })

  test('correct option is marked after selecting any answer', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    const answer = screen.getByText('I', { selector: 'button' })
    fireEvent.click(answer)
    expect(answer).toHaveAttribute('data-state', 'correct')
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
      renderWithProviders(<ExerciseMode generateExercise={gen} />)
      expect(gen).toHaveBeenCalledWith(
        { tenses: 0, pronouns: 0, diacritics: 0, forms: 0, rootTypes: 0, nominals: 0 },
        expect.any(Object),
        expect.any(Object),
        {},
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
      renderWithProviders(<ExerciseMode generateExercise={gen} />)
      expect(gen).toHaveBeenCalledWith(testProfile({ tenses: 1 }), expect.any(Object), expect.any(Object), {})
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
      renderWithProviders(<ExerciseMode generateExercise={gen} />)
      fireEvent.click(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[0])
      fireEvent.click(screen.getByText(/next/i, { selector: 'button' }))
      expect(gen).toHaveBeenNthCalledWith(
        2,
        testProfile({ tenses: 2, pronouns: 2 }),
        expect.any(Object),
        expect.any(Object),
        {},
      )
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

      renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
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

      renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
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

      renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
      fireEvent.click(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[1])

      expect(screen.queryByText('Forms unlocked: Form II')).not.toBeInTheDocument()
    })

    describe('streak alerts', () => {
      beforeEach(() => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date('2026-05-29'))
      })
      afterEach(() => {
        vi.useRealTimers()
      })

      test('shows streak-extended alert when daily correct answers reach 10', () => {
        localStorage.setItem(
          'conjugator:exercise:daily',
          JSON.stringify([{ date: '2026-05-29', correct: 9, incorrect: 0, passed: 0 }]),
        )

        renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
        fireEvent.click(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[0])

        expect(screen.getByText('Streak extended!')).toBeInTheDocument()
      })

      test('does not show streak-extended alert before daily correct answers reach 10', () => {
        localStorage.setItem(
          'conjugator:exercise:daily',
          JSON.stringify([{ date: '2026-05-29', correct: 8, incorrect: 0, passed: 0 }]),
        )

        renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
        fireEvent.click(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[0])

        expect(screen.queryByText('Streak extended!')).not.toBeInTheDocument()
      })
    })
  })
})

describe('SRS recording', () => {
  test('records answer in SRS store when option selected', () => {
    const exercise = testExercise({
      kind: 'conjugation',
      options: ['correct', 'incorrect', 'incorrect', 'incorrect'],
      answer: 0,
      cardKey: 'conjugation:regular:1:active.past:3ms',
    })
    renderWithProviders(<ExerciseMode generateExercise={() => exercise} />)
    fireEvent.click(screen.getByText('correct', { selector: 'button' }))
    const srs = JSON.parse(localStorage.getItem('conjugator:srs') ?? '{}')
    expect(srs['conjugation:regular:1:active.past:3ms']).toBeDefined()
  })

  test('keeps oversized persisted SRS state untouched when loading from localStorage', () => {
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

    renderWithProviders(<ExerciseMode generateExercise={gen} />)

    expect(gen).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        [cardKey]: expect.objectContaining({ interval: 145313, dueDate: '2424-01-30' }),
      }),
      expect.any(Object),
      {},
    )

    const stored = JSON.parse(localStorage.getItem('conjugator:srs') ?? '{}')
    expect(stored[cardKey]).toMatchObject({
      interval: 145313,
      dueDate: '2424-01-30',
    })
  })
})

describe('keyboard shortcuts', () => {
  test('pressing 1 answers with the first option', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    fireEvent.keyDown(document.body, { key: '1' })
    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
    expect(screen.getByText('I', { selector: 'button' })).toHaveAttribute('data-state', 'correct')
  })

  test('pressing 2 answers with the second option', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    fireEvent.keyDown(document.body, { key: '2' })
    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
    expect(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[1]).toHaveAttribute('data-state', 'wrong')
  })

  test('pressing 3 answers with the third option', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    fireEvent.keyDown(document.body, { key: '3' })
    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
    expect(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[2]).toHaveAttribute('data-state', 'wrong')
  })

  test('pressing 4 answers with the fourth option', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    fireEvent.keyDown(document.body, { key: '4' })
    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
    expect(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[3]).toHaveAttribute('data-state', 'wrong')
  })

  test('pressing S before answering reveals the answer and explanation', () => {
    const gen = vi
      .fn()
      .mockReturnValueOnce(testExercise())
      .mockReturnValue(testExercise({ word: 'دَخَلَ' }))
    renderWithProviders(<ExerciseMode generateExercise={gen} />)
    fireEvent.keyDown(document.body, { key: 's' })
    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
    expect(screen.getByText('I', { selector: 'button' })).toHaveAttribute('data-state', 'correct')
    expect(screen.getByText(/Form I is the base pattern/i)).toBeInTheDocument()
  })

  test('pressing S after answering does nothing', () => {
    const gen = vi
      .fn()
      .mockReturnValueOnce(testExercise())
      .mockReturnValue(testExercise({ word: 'دَخَلَ' }))
    renderWithProviders(<ExerciseMode generateExercise={gen} />)
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
    renderWithProviders(<ExerciseMode generateExercise={gen} />)
    fireEvent.keyDown(document.body, { key: '1' })
    fireEvent.keyDown(document.body, { key: '2' })
    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
    expect(screen.queryByText('دَخَلَ')).not.toBeInTheDocument()
  })

  test('modifier key combinations are ignored', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
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

    renderWithProviders(<ExerciseMode generateExercise={() => exercise} />)
    fireEvent.click(screen.getByText(/skip/i, { selector: 'button' }))

    const srs = JSON.parse(localStorage.getItem('conjugator:srs') ?? '{}')
    expect(srs['verbForm:regular:1']).toMatchObject({
      interval: 3,
      repetitions: 2,
    })
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
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    expect(screen.queryByText(/Form I is the base pattern/i)).not.toBeInTheDocument()
  })

  test('explanation paragraphs appear after selecting a wrong answer', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    fireEvent.click(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[1])
    expect(screen.getByText(/Form I is the base pattern/i)).toBeInTheDocument()
  })
})

describe('mastery filtering in ExerciseMode', () => {
  test('hides mastered rootType from explanation after correct answer', () => {
    localStorage.setItem(
      'conjugator:srs',
      JSON.stringify({
        'conjugation:sound:2:active.past:3ms': { interval: 21, ef: 2.5, repetitions: 5, dueDate: '2099-01-01' },
        'conjugation:sound:2:active.past:3fs': { interval: 21, ef: 2.5, repetitions: 5, dueDate: '2099-01-01' },
      }),
    )

    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    fireEvent.click(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[0])

    expect(screen.getByText(/Form I is the base pattern/i)).toBeInTheDocument()
    expect(screen.queryByText(/Sound root/i)).not.toBeInTheDocument()
  })

  test('wrong answer shows full explanation regardless of mastery', () => {
    localStorage.setItem(
      'conjugator:srs',
      JSON.stringify({
        'conjugation:sound:2:active.past:3ms': { interval: 21, ef: 2.5, repetitions: 5, dueDate: '2099-01-01' },
        'conjugation:sound:2:active.past:3fs': { interval: 21, ef: 2.5, repetitions: 5, dueDate: '2099-01-01' },
      }),
    )

    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    fireEvent.click(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[1])

    expect(screen.getByText(/Form I is the base pattern/i)).toBeInTheDocument()
    expect(screen.getByText(/Sound root/i)).toBeInTheDocument()
  })
})

function conjugationExercise(overrides: Partial<Exercise> = {}): Exercise {
  return {
    kind: 'conjugation',
    dimensions: ['tenses', 'pronouns', 'forms', 'rootTypes', 'diacritics'],
    word: 'يَكتُبُ',
    spokenWord: 'يَكتُبُ',
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
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    expect(screen.queryByText('Type the answer', { selector: 'button' })).not.toBeInTheDocument()
  })

  test('conjugation exercise shows typing mode toggle', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => conjugationExercise()} />)
    expect(screen.getByText('Type the answer', { selector: 'button' })).toBeInTheDocument()
  })

  test('clicking toggle switches to text input', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => conjugationExercise()} />)
    fireEvent.click(screen.getByText('Type the answer', { selector: 'button' }))
    expect(screen.getByPlaceholderText('Type your answer')).toBeInTheDocument()
  })

  test('clicking toggle again switches back to option buttons', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => conjugationExercise()} />)
    fireEvent.click(screen.getByText('Type the answer', { selector: 'button' }))
    fireEvent.click(screen.getByText('See options', { selector: 'button' }))
    expect(screen.queryByPlaceholderText('Type your answer')).not.toBeInTheDocument()
    expect(screen.getAllByText(/كَتَبَ|يَكتُبُ|كَتَّبَ|أَكتَبَ/, { selector: 'button' })).toHaveLength(4)
  })

  test('typing the exact correct answer records as correct', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => conjugationExercise()} />)
    fireEvent.click(screen.getByText('Type the answer', { selector: 'button' }))
    fireEvent.change(screen.getByPlaceholderText('Type your answer'), { target: { value: 'كَتَبَ' } })
    fireEvent.click(screen.getByLabelText('Submit'))
    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
    expect(screen.queryByText('كَتَبَ', { selector: 'p' })).not.toBeInTheDocument()
  })

  test('submit is disabled until a non-whitespace answer is typed', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => conjugationExercise()} />)
    fireEvent.click(screen.getByText('Type the answer', { selector: 'button' }))
    expect(screen.getByLabelText('Submit')).toBeDisabled()
    fireEvent.change(screen.getByPlaceholderText('Type your answer'), { target: { value: '   ' } })
    expect(screen.getByLabelText('Submit')).toBeDisabled()
    fireEvent.change(screen.getByPlaceholderText('Type your answer'), { target: { value: 'كَتَبَ' } })
    expect(screen.getByLabelText('Submit')).not.toBeDisabled()
  })

  test('empty typing submit does not answer the exercise', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => conjugationExercise()} />)
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
    renderWithProviders(<ExerciseMode generateExercise={() => conjugationExercise()} />)
    fireEvent.click(screen.getByText('Type the answer', { selector: 'button' }))
    fireEvent.change(screen.getByPlaceholderText('Type your answer'), { target: { value: 'كتب' } })
    fireEvent.click(screen.getByLabelText('Submit'))
    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
    expect(screen.queryByText('كَتَبَ', { selector: 'p' })).not.toBeInTheDocument()
  })

  test('typing a wrong answer shows the correct answer text', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => conjugationExercise()} />)
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
    renderWithProviders(<ExerciseMode generateExercise={gen} />)
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
    renderWithProviders(<ExerciseMode generateExercise={gen} />)
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
    renderWithProviders(<ExerciseMode generateExercise={gen} />)
    fireEvent.click(screen.getByText('Type the answer', { selector: 'button' }))
    fireEvent.click(screen.getByText(/skip/i, { selector: 'button' }))

    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument()
    expect(screen.getByText('I', { selector: 'p' })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Type your answer')).not.toHaveAttribute('data-state', 'wrong')
    expect(screen.getByText(/Form I is the base pattern/i)).toBeInTheDocument()
  })
})

describe('focus chip', () => {
  function multiFormProfile() {
    return JSON.stringify({
      profile: { tenses: 0, pronouns: 0, diacritics: 0, forms: 2, rootTypes: 0, nominals: 0 },
      windows: { tenses: [], pronouns: [], diacritics: [], forms: [], rootTypes: [], nominals: [] },
    })
  }

  test('chip is hidden when only Form I is unlocked (forms: 0)', () => {
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    expect(screen.queryByText(/focus/i, { selector: 'button' })).not.toBeInTheDocument()
  })

  test('chip is visible when multiple forms are unlocked (forms: 2)', () => {
    localStorage.setItem('conjugator:dimensions', multiFormProfile())
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    expect(screen.getByText(/focus/i).closest('button')).toBeInTheDocument()
  })

  test('picker shows only forms up to current unlock level', () => {
    localStorage.setItem('conjugator:dimensions', multiFormProfile())
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    fireEvent.click(screen.getByText(/focus/i).closest('button')!)
    expect(screen.getByText('Form I', { selector: 'button' })).toBeInTheDocument()
    expect(screen.getByText('Form II', { selector: 'button' })).toBeInTheDocument()
    expect(screen.getByText('Form III', { selector: 'button' })).toBeInTheDocument()
    expect(screen.queryByText('Form IV', { selector: 'button' })).not.toBeInTheDocument()
  })

  test('passes pinned form to generateExercise after form is selected', () => {
    localStorage.setItem('conjugator:dimensions', multiFormProfile())
    const gen = vi.fn().mockReturnValue(testExercise())
    renderWithProviders(<ExerciseMode generateExercise={gen} />)

    fireEvent.click(screen.getByText(/focus/i).closest('button')!)
    fireEvent.click(screen.getByText('Form III', { selector: 'button' }))
    // answer and advance to trigger next generateExercise call
    fireEvent.click(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[0])
    fireEvent.click(screen.getByText(/next/i, { selector: 'button' }))

    expect(gen).toHaveBeenCalledWith(expect.any(Object), expect.any(Object), expect.any(Object), { form: 3 })
  })

  test('pinned form resets to null on remount (session-only)', () => {
    localStorage.setItem('conjugator:dimensions', multiFormProfile())
    const gen = vi.fn().mockReturnValue(testExercise())
    const { unmount } = renderWithProviders(<ExerciseMode generateExercise={gen} />)

    fireEvent.click(screen.getByText(/focus/i).closest('button')!)
    fireEvent.click(screen.getByText('Form III', { selector: 'button' }))
    expect(screen.getAllByText(/Form III/i).length).toBeGreaterThan(0)

    unmount()
    cleanup()

    renderWithProviders(<ExerciseMode generateExercise={gen} />)
    expect(screen.queryByText(/Form III/i)).not.toBeInTheDocument()
    expect(screen.getByText(/focus/i).closest('button')).toBeInTheDocument()
  })

  test('chip is visible when only tenses dimension has multiple options', () => {
    localStorage.setItem(
      'conjugator:dimensions',
      JSON.stringify({
        profile: { tenses: 1, pronouns: 0, diacritics: 0, forms: 0, rootTypes: 0, nominals: 0 },
        windows: { tenses: [], pronouns: [], diacritics: [], forms: [], rootTypes: [], nominals: [] },
      }),
    )
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    expect(screen.getByText(/focus/i).closest('button')).toBeInTheDocument()
  })

  test('pronoun options expose non-abbreviated aria labels', () => {
    localStorage.setItem(
      'conjugator:dimensions',
      JSON.stringify({
        profile: { tenses: 0, pronouns: 1, diacritics: 0, forms: 0, rootTypes: 0, nominals: 0 },
        windows: { tenses: [], pronouns: [], diacritics: [], forms: [], rootTypes: [], nominals: [] },
      }),
    )
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    fireEvent.click(screen.getByText(/focus/i).closest('button')!)

    const pronounOption = screen.getByText('3rd m. s.', { selector: 'button' })
    expect(pronounOption).toHaveAttribute(
      'aria-label',
      expect.stringMatching(/^3rd person masculine singular(, recommended)?$/),
    )
  })

  test('shows group picker when multiple dimensions have options', () => {
    localStorage.setItem(
      'conjugator:dimensions',
      JSON.stringify({
        profile: { tenses: 1, pronouns: 0, diacritics: 0, forms: 2, rootTypes: 0, nominals: 0 },
        windows: { tenses: [], pronouns: [], diacritics: [], forms: [], rootTypes: [], nominals: [] },
      }),
    )
    renderWithProviders(<ExerciseMode generateExercise={() => testExercise()} />)
    fireEvent.click(screen.getByText(/focus/i).closest('button')!)
    expect(screen.getByText('Form', { selector: 'button' })).toBeInTheDocument()
    expect(screen.getByText('Tense', { selector: 'button' })).toBeInTheDocument()
  })

  test('passes tense focus to generateExercise after selecting a tense', () => {
    localStorage.setItem(
      'conjugator:dimensions',
      JSON.stringify({
        profile: { tenses: 1, pronouns: 0, diacritics: 0, forms: 2, rootTypes: 0, nominals: 0 },
        windows: { tenses: [], pronouns: [], diacritics: [], forms: [], rootTypes: [], nominals: [] },
      }),
    )
    const gen = vi.fn().mockReturnValue(testExercise())
    renderWithProviders(<ExerciseMode generateExercise={gen} />)

    fireEvent.click(screen.getByText(/focus/i).closest('button')!)
    fireEvent.click(screen.getByText('Tense', { selector: 'button' }))
    fireEvent.click(screen.getByText('Active Past', { selector: 'button' }))
    fireEvent.click(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[0])
    fireEvent.click(screen.getByText(/next/i, { selector: 'button' }))

    expect(gen).toHaveBeenCalledWith(expect.any(Object), expect.any(Object), expect.any(Object), {
      tense: 'active.past',
    })
  })

  test('passes rootType focus to generateExercise after selecting a root type', () => {
    localStorage.setItem(
      'conjugator:dimensions',
      JSON.stringify({
        profile: { tenses: 0, pronouns: 0, diacritics: 0, forms: 0, rootTypes: 4, nominals: 0 },
        windows: { tenses: [], pronouns: [], diacritics: [], forms: [], rootTypes: [], nominals: [] },
      }),
    )
    const gen = vi.fn().mockReturnValue(testExercise())
    renderWithProviders(<ExerciseMode generateExercise={gen} />)

    fireEvent.click(screen.getByText(/focus/i).closest('button')!)
    fireEvent.click(screen.getByText('Hollow', { selector: 'button' }))
    fireEvent.click(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[0])
    fireEvent.click(screen.getByText(/next/i, { selector: 'button' }))

    expect(gen).toHaveBeenCalledWith(expect.any(Object), expect.any(Object), expect.any(Object), { rootType: 'hollow' })
  })

  test('passes empty focus after clearing selection', () => {
    localStorage.setItem('conjugator:dimensions', multiFormProfile())
    const gen = vi.fn().mockReturnValue(testExercise())
    renderWithProviders(<ExerciseMode generateExercise={gen} />)

    // set focus to form III
    fireEvent.click(screen.getByText(/focus/i).closest('button')!)
    fireEvent.click(screen.getByText('Form III', { selector: 'button' }))
    // clear it
    fireEvent.click(screen.getByLabelText('Clear focus', { selector: 'button' }))
    // advance
    fireEvent.click(screen.getAllByText(/^(I|II|III|IV)$/, { selector: 'button' })[0])
    fireEvent.click(screen.getByText(/next/i, { selector: 'button' }))

    expect(gen).toHaveBeenCalledWith(expect.any(Object), expect.any(Object), expect.any(Object), {})
  })
})
