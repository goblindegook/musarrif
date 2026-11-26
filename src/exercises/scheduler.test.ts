import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { getVerbById } from '../paradigms/verbs'
import { INITIAL_DIMENSION_PROFILE } from '../test/profiles'
import { forAnyRandomness } from '../test/random'
import * as dimensions from './dimensions'
import { isCoveredTriple, nextExercise } from './scheduler'
import { parseCardKey } from './srs'

describe('nextExercise', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-23T12:00:00Z'))
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  test('serves a due card when session does not allow new card introduction', () => {
    const store = {
      'production:verb:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
    }
    const session = { reviews: 0, lastNewAt: 0 }

    const keys = Array.from({ length: 20 }, () => nextExercise(INITIAL_DIMENSION_PROFILE, store, session).cardKey)

    expect(keys).toContain('production:verb:sound:1:active.past:3ms')
  })

  test('serves a due recognition card through a recognition exercise', () => {
    const store = {
      'recognition:verb:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
    }
    const session = { reviews: 0, lastNewAt: 0 }

    const keys = Array.from({ length: 20 }, () => nextExercise(INITIAL_DIMENSION_PROFILE, store, session).cardKey)

    expect(keys).toContain('recognition:verb:sound:1:active.past:3ms')
  })

  test('serves a due participle card through a participle exercise', () => {
    const store = {
      'recognition:participle:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
    }
    const session = { reviews: 0, lastNewAt: 0 }

    const keys = Array.from(
      { length: 20 },
      () => nextExercise({ ...INITIAL_DIMENSION_PROFILE, nominals: 1 }, store, session).cardKey,
    )

    expect(new Set(keys)).toEqual(new Set(['recognition:participle:sound:1']))
  })

  test('does not serve due subjunctive cards before subjunctive tenses are unlocked', () => {
    const store = {
      'recognition:verb:sound:1:active.present.subjunctive:3ms': {
        interval: 1,
        ef: 2.5,
        repetitions: 1,
        dueDate: '2026-03-23',
      },
    }
    const session = { reviews: 0, lastNewAt: 0 }

    const keys = Array.from(
      { length: 20 },
      () => nextExercise({ ...INITIAL_DIMENSION_PROFILE, tenses: 1 }, store, session).cardKey,
    )

    expect(keys).not.toContain('recognition:verb:sound:1:active.present.subjunctive:3ms')
  })

  test('uses normalized cardKey when due key has an incompatible pronoun for impersonal passive', () => {
    vi.spyOn(dimensions, 'randomVerb').mockReturnValue(getVerbById('lqy-10')!)
    const store = {
      'production:verb:defective:10:passive.present.subjunctive:2mp': {
        interval: 1,
        ef: 2.5,
        repetitions: 1,
        dueDate: '2026-03-23',
      },
    }
    const session = { reviews: 0, lastNewAt: 0 }

    const exercise = nextExercise(
      { ...INITIAL_DIMENSION_PROFILE, tenses: 5, pronouns: 2, forms: 9, rootTypes: 5 },
      store,
      session,
    )

    expect(exercise.cardKey).toBe('production:verb:defective:10:passive.present.subjunctive:3ms')
  })

  test('serves a new triple when session allows and due cards exist', () => {
    const store = { 'production:verb:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' } }
    const session = { reviews: 3, lastNewAt: 0 }

    const exercises = Array.from({ length: 20 }, () => nextExercise(INITIAL_DIMENSION_PROFILE, store, session))

    expect(exercises.every((e) => !isCoveredTriple(e.cardKey, store))).toBe(true)
  })

  test('does not introduce new triples when overdue backlog is high', () => {
    const store = Object.fromEntries(
      Array.from({ length: 21 }, (_, index) => [
        `production:verb:sound:1:active.past:3ms:${index}`,
        { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      ]),
    )

    const exercises = Array.from({ length: 20 }, () =>
      nextExercise({ ...INITIAL_DIMENSION_PROFILE, tenses: 1, pronouns: 1 }, store, { reviews: 8, lastNewAt: 0 }),
    )

    expect(exercises.every((e) => isCoveredTriple(e.cardKey, store))).toBe(true)
  })

  test('does not introduce new triples after only three reviews when backlog is moderate', () => {
    const store = {
      'production:verb:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      'production:verb:sound:2': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      'production:verb:doubled:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      'recognition:verb:sound:1:extra-1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      'recognition:verb:sound:1:extra-2': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
    }

    const exercises = Array.from({ length: 20 }, () =>
      nextExercise({ ...INITIAL_DIMENSION_PROFILE, forms: 1, rootTypes: 1 }, store, { reviews: 3, lastNewAt: 0 }),
    )

    expect(exercises.every((e) => isCoveredTriple(e.cardKey, store))).toBe(true)
  })

  test('serves due cards after eight reviews when moderate backlog only has breadth-expanding triples', () => {
    const store = {
      'production:verb:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      'production:verb:sound:2': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      'production:verb:doubled:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      'recognition:verb:sound:1:extra-1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      'recognition:verb:sound:1:extra-2': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
    }

    const exercises = Array.from({ length: 20 }, () =>
      nextExercise({ ...INITIAL_DIMENSION_PROFILE, forms: 1, rootTypes: 1 }, store, { reviews: 8, lastNewAt: 0 }),
    )

    expect(exercises.every((e) => isCoveredTriple(e.cardKey, store))).toBe(true)
  })

  test('does not allow root-type and form cross-product combinations during breadth freeze', () => {
    const store = {
      'production:verb:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      'production:verb:doubled:2': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      'production:verb:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
    }

    const exercises = Array.from({ length: 20 }, () =>
      nextExercise({ ...INITIAL_DIMENSION_PROFILE, forms: 1, rootTypes: 1 }, store, { reviews: 8, lastNewAt: 0 }),
    )

    expect(exercises.every((e) => isCoveredTriple(e.cardKey, store))).toBe(true)
  })

  test('does not introduce a new exercise kind while backlog remains above near-zero', () => {
    const store = Object.fromEntries(
      Array.from({ length: 5 }, (_, index) => [
        `production:verb:sound:1:active.past:3ms:${index}`,
        { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      ]),
    )

    const exercises = Array.from({ length: 20 }, () =>
      nextExercise(INITIAL_DIMENSION_PROFILE, store, { reviews: 8, lastNewAt: 0 }),
    )

    expect(exercises.every((e) => isCoveredTriple(e.cardKey, store))).toBe(true)
  })

  test('does not introduce a new form while backlog remains above near-zero', () => {
    const store = {
      'production:verb:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      'production:verb:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      'recognition:verb:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
    }

    const exercises = Array.from({ length: 20 }, () =>
      nextExercise({ ...INITIAL_DIMENSION_PROFILE, forms: 1 }, store, { reviews: 8, lastNewAt: 0 }),
    )

    expect(exercises.every((e) => isCoveredTriple(e.cardKey, store))).toBe(true)
  })

  test('serves a new triple when no due cards exist regardless of session ratio', () => {
    const store = { 'production:verb:sound:1': { interval: 7, ef: 2.5, repetitions: 2, dueDate: '2030-01-01' } }
    const session = { reviews: 0, lastNewAt: 0 }

    const exercise = nextExercise(INITIAL_DIMENSION_PROFILE, store, session)

    expect(isCoveredTriple(exercise.cardKey, store)).toBe(false)
  })

  test('weights the exercise kind of a new triple', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.3)

    const exercise = nextExercise(INITIAL_DIMENSION_PROFILE, {}, { reviews: 0, lastNewAt: 0 })

    expect(exercise.kind).toBe('conjugation')
  })

  test('weights verb exercises of a new triple above nominal exercises', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.28)

    const exercise = nextExercise({ ...INITIAL_DIMENSION_PROFILE, nominals: 1 }, {}, { reviews: 0, lastNewAt: 0 })

    expect(exercise.kind).toBe('conjugation')
  })

  test('introduces nominal triples when nominals unlock and uncovered triples exist', () => {
    const exercises = Array.from({ length: 50 }, () =>
      nextExercise(
        { ...INITIAL_DIMENSION_PROFILE, tenses: 2, pronouns: 2, forms: 1, rootTypes: 1, nominals: 1 },
        { 'production:verb:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' } },
        { reviews: 3, lastNewAt: 0 },
      ),
    )

    const nominalKinds = [
      'participleForm',
      'participleRoot',
      'participleVerb',
      'verbParticiple',
      'masdarForm',
      'masdarRoot',
      'masdarVerb',
      'verbMasdar',
    ]
    expect(exercises.map((e) => e.kind)).toContainEqual(expect.toBeOneOf(nominalKinds))
  })

  describe('focus mode', () => {
    afterEach(() => vi.restoreAllMocks())

    test.each([
      { range: [0, 0.75] as const, expectedForm: 3 },
      { range: [0.75, 1] as const, expectedForm: 1 },
    ])('selects form $expectedForm when draws fall in $range', ({ range, expectedForm }) => {
      // Draws of 0.75 and above also select form 1 if both due cards are eligible.
      const store = {
        'production:verb:sound:3': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
        'production:verb:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      }
      forAnyRandomness(() => {
        const exercise = nextExercise(
          { ...INITIAL_DIMENSION_PROFILE, forms: 2 },
          store,
          { reviews: 0, lastNewAt: 0 },
          { form: 3 },
        )
        expect(parseCardKey(exercise.cardKey).form).toBe(expectedForm)
      }, range)
    })

    test('falls back when pinned form has no available cards', () => {
      // forms: 0 → only form 1 unlocked; pin form 3 (not in pool)
      const exercise = nextExercise(
        { ...INITIAL_DIMENSION_PROFILE, forms: 0 },
        {},
        { reviews: 0, lastNewAt: -3 },
        { form: 3 },
      )
      expect(parseCardKey(exercise.cardKey).form).toBe(1)
    })

    test('behaves normally when no focus is set', () => {
      const store = {
        'production:verb:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      }
      const exercise = nextExercise({ ...INITIAL_DIMENSION_PROFILE, forms: 2 }, store, { reviews: 0, lastNewAt: 0 })
      expect(parseCardKey(exercise.cardKey).form).toBe(1)
    })

    test('routes to pinned tense when random < 0.75 and pinned due cards exist', () => {
      const store = {
        'production:verb:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
        'production:verb:sound:1:active.present.indicative:3ms': {
          interval: 1,
          ef: 2.5,
          repetitions: 1,
          dueDate: '2026-03-23',
        },
      }
      forAnyRandomness(() => {
        const exercise = nextExercise(
          { ...INITIAL_DIMENSION_PROFILE, tenses: 1 },
          store,
          { reviews: 0, lastNewAt: 0 },
          { tense: 'active.past' },
        )
        expect(parseCardKey(exercise.cardKey).tense).toBe('active.past')
      }, [0, 0.75])
    })

    test('routes to unconstrained pool for tense when random >= 0.75', () => {
      const store = {
        'production:verb:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
        'production:verb:sound:1:active.present.indicative:3ms': {
          interval: 1,
          ef: 2.5,
          repetitions: 1,
          dueDate: '2026-03-23',
        },
      }
      // Draws of 0.75 and above pick the later of the two equally weighted due cards.
      forAnyRandomness(() => {
        const exercise = nextExercise(
          { ...INITIAL_DIMENSION_PROFILE, tenses: 1 },
          store,
          { reviews: 0, lastNewAt: 0 },
          { tense: 'active.past' },
        )
        expect(parseCardKey(exercise.cardKey).tense).toBe('active.present.indicative')
      }, [0.75, 1])
    })

    test('exercises without a tense slot pass through when tense focus is active', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5) // always apply focus
      const store = {
        'production:verb:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
        'production:verb:sound:1:active.present.indicative:3ms': {
          interval: 1,
          ef: 2.5,
          repetitions: 1,
          dueDate: '2026-03-23',
        },
      }
      const exercises = Array.from({ length: 20 }, () =>
        nextExercise(
          { ...INITIAL_DIMENSION_PROFILE, tenses: 1 },
          store,
          { reviews: 0, lastNewAt: 0 },
          { tense: 'active.past' },
        ),
      )
      expect(exercises.map((e) => e.kind)).toContain('rootFormVerb')
    })

    test('freezes overdue reviews to cards with the focused tense when backlog is present', () => {
      const store = {
        'production:verb:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
        'production:verb:sound:1:active.present.indicative:3ms': {
          interval: 1,
          ef: 2.5,
          repetitions: 1,
          dueDate: '2026-03-23',
        },
        'production:verb:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      }

      forAnyRandomness(() => {
        const exercise = nextExercise(
          { ...INITIAL_DIMENSION_PROFILE, tenses: 1 },
          store,
          { reviews: 0, lastNewAt: 0 },
          { tense: 'active.past' },
        )

        expect(exercise.cardKey).toBe('production:verb:sound:1:active.past:3ms')
      }, [0, 0.75])
    })

    test('freezes overdue reviews to cards with the focused pronoun when backlog is present', () => {
      const store = {
        'production:verb:sound:1:active.past:1s': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
        'production:verb:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
        'production:verb:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      }

      forAnyRandomness(() => {
        const exercise = nextExercise(
          { ...INITIAL_DIMENSION_PROFILE, pronouns: 1 },
          store,
          { reviews: 0, lastNewAt: 0 },
          { pronoun: '1s' },
        )

        expect(exercise.cardKey).toBe('production:verb:sound:1:active.past:1s')
      }, [0, 0.75])
    })

    test('routes to pinned root type when random < 0.75 and pinned due cards exist', () => {
      const store = {
        'production:verb:hollow:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
        'production:verb:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      }
      forAnyRandomness(() => {
        const exercise = nextExercise(
          { ...INITIAL_DIMENSION_PROFILE, rootTypes: 4 },
          store,
          { reviews: 0, lastNewAt: 0 },
          { rootType: 'hollow' },
        )
        expect(parseCardKey(exercise.cardKey).rootType).toBe('hollow')
      }, [0, 0.75])
    })

    test('root type focus filters uncovered triples', () => {
      forAnyRandomness(() => {
        const exercise = nextExercise(
          { ...INITIAL_DIMENSION_PROFILE, rootTypes: 4 },
          {},
          { reviews: 0, lastNewAt: -3 },
          { rootType: 'hollow' },
        )
        expect(parseCardKey(exercise.cardKey).rootType).toBe('hollow')
      }, [0, 0.75])
    })

    test('routes to pinned pronoun when random < 0.75 and pinned due cards exist', () => {
      const store = {
        'production:verb:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
        'production:verb:sound:1:active.past:1s': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      }
      forAnyRandomness(() => {
        const exercise = nextExercise(
          { ...INITIAL_DIMENSION_PROFILE, tenses: 0, pronouns: 1 },
          store,
          { reviews: 0, lastNewAt: 0 },
          { pronoun: '1s' },
        )
        expect(parseCardKey(exercise.cardKey).pronoun).toBe('1s')
      }, [0, 0.75])
    })

    test('exercises without a pronoun slot pass through when pronoun focus is active', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5)
      const store = {
        'production:verb:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
        'production:verb:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      }
      const exercises = Array.from({ length: 20 }, () =>
        nextExercise(
          { ...INITIAL_DIMENSION_PROFILE, pronouns: 1 },
          store,
          { reviews: 0, lastNewAt: 0 },
          { pronoun: '1s' },
        ),
      )
      expect(exercises.map((e) => e.kind)).toContain('rootFormVerb')
    })

    test('nominal focus filters due cards to masdar kinds', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5)
      const masdarKinds = ['masdarForm', 'masdarRoot', 'masdarVerb', 'verbMasdar']
      const store = {
        'recognition:participle:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
        'recognition:masdar:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      }
      const exercises = Array.from({ length: 20 }, () =>
        nextExercise(
          { ...INITIAL_DIMENSION_PROFILE, nominals: 2 },
          store,
          { reviews: 0, lastNewAt: 0 },
          { nominal: 'masdar' },
        ),
      )
      expect(exercises.every((e) => masdarKinds.includes(e.kind))).toBe(true)
    })
  })
})

describe('isCoveredTriple', () => {
  test('returns false for a triple absent from the store', () => {
    expect(isCoveredTriple('production:verb:sound:1:active.past:3ms', {})).toBe(false)
  })

  test('returns true when an exact triple key with no tense/pronoun is in the store', () => {
    const store = { 'recognition:masdar:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2030-01-01' } }
    expect(isCoveredTriple('recognition:masdar:sound:1', store)).toBe(true)
  })

  test('returns true when a key with tense and pronoun suffix for the same triple is in the store', () => {
    const store = {
      'production:verb:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2030-01-01' },
    }
    expect(isCoveredTriple('production:verb:sound:1:active.past:3ms', store)).toBe(true)
  })

  test('returns false when a different kind has an entry but not the queried triple', () => {
    const store = { 'production:verb:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2030-01-01' } }
    expect(isCoveredTriple('production:verb:sound:1:active.past:3ms', store)).toBe(false)
  })

  test('does not confuse form 1 with form 10', () => {
    const store = {
      'production:verb:sound:10:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2030-01-01' },
    }
    expect(isCoveredTriple('production:verb:sound:1:active.past:3ms', store)).toBe(false)
  })
})
