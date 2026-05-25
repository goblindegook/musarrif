import { afterEach, describe, expect, test, vi } from 'vitest'
import { getVerbById } from '../paradigms/verbs'
import { INITIAL_DIMENSION_PROFILE } from '../test/fixtures'
import * as dimensions from './dimensions'
import { isCoveredTriple, nextExercise } from './scheduler'
import { parseCardKey } from './srs'

describe('nextExercise', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('serves a due card when session does not allow new card introduction', () => {
    const store = {
      'conjugation:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
    }
    const session = { reviews: 0, lastNewAt: 0 }

    const keys = Array.from({ length: 20 }, () => nextExercise(INITIAL_DIMENSION_PROFILE, store, session).cardKey)

    expect(keys).toContain('conjugation:sound:1:active.past:3ms')
  })

  test('does not serve due subjunctive cards before subjunctive tenses are unlocked', () => {
    const store = {
      'verbTense:sound:1:active.present.subjunctive:3ms': {
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

    expect(keys).not.toContain('verbTense:sound:1:active.present.subjunctive:3ms')
  })

  test('uses normalized cardKey when due key has an incompatible pronoun for impersonal passive', () => {
    vi.spyOn(dimensions, 'randomVerb').mockReturnValue(getVerbById('lqy-10')!)
    const store = {
      'conjugation:defective:10:passive.present.subjunctive:2mp': {
        interval: 1,
        ef: 2.5,
        repetitions: 1,
        dueDate: '2026-03-23',
      },
    }
    const session = { reviews: 0, lastNewAt: 0 }

    const exercise = nextExercise(
      { ...INITIAL_DIMENSION_PROFILE, tenses: 4, pronouns: 2, forms: 9, rootTypes: 5 },
      store,
      session,
    )

    expect(exercise.cardKey).toBe('conjugation:defective:10:passive.present.subjunctive:3ms')
  })

  test('serves a new triple when session allows and due cards exist', () => {
    const store = { 'verbForm:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' } }
    const session = { reviews: 3, lastNewAt: 0 }

    const exercises = Array.from({ length: 20 }, () => nextExercise(INITIAL_DIMENSION_PROFILE, store, session))

    expect(exercises.every((e) => !isCoveredTriple(e.cardKey, store))).toBe(true)
  })

  test('serves a new triple when no due cards exist regardless of session ratio', () => {
    const store = { 'verbForm:sound:1': { interval: 7, ef: 2.5, repetitions: 2, dueDate: '2030-01-01' } }
    const session = { reviews: 0, lastNewAt: 0 }

    const exercise = nextExercise(INITIAL_DIMENSION_PROFILE, store, session)

    expect(isCoveredTriple(exercise.cardKey, store)).toBe(false)
  })

  test('introduces nominal triples when nominals unlock and uncovered triples exist', () => {
    const exercises = Array.from({ length: 50 }, () =>
      nextExercise(
        { ...INITIAL_DIMENSION_PROFILE, tenses: 2, pronouns: 2, forms: 1, rootTypes: 1, nominals: 1 },
        { 'conjugation:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' } },
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
    expect(exercises.some((e) => nominalKinds.includes(e.kind))).toBe(true)
  })

  describe('focus mode', () => {
    afterEach(() => vi.restoreAllMocks())

    test('routes to pinned form when random < 0.75 and pinned due cards exist', () => {
      vi.spyOn(Math, 'random').mockReturnValueOnce(0.5) // routing: 0.5 < 0.75 → pinned
      const store = {
        'verbForm:sound:3': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
        'verbForm:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      }
      const exercise = nextExercise(
        { ...INITIAL_DIMENSION_PROFILE, forms: 2 },
        store,
        { reviews: 0, lastNewAt: 0 },
        { form: 3 },
      )
      expect(parseCardKey(exercise.cardKey).form).toBe(3)
    })

    test('routes to unconstrained pool when random >= 0.75', () => {
      // With random >= 0.75, activeForm = undefined → pool includes all forms.
      // Run 30 draws; if constrained to form 3 only, all would be form 3.
      const spy = vi.spyOn(Math, 'random')
      const store = {
        'verbForm:sound:3': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
        'verbForm:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      }
      const forms = Array.from({ length: 30 }, () => {
        spy.mockReturnValueOnce(0.9) // routing: 0.9 >= 0.75 → unconstrained
        return parseCardKey(
          nextExercise({ ...INITIAL_DIMENSION_PROFILE, forms: 2 }, store, { reviews: 0, lastNewAt: 0 }, { form: 3 })
            .cardKey,
        ).form
      })
      expect(forms.some((f) => f !== 3)).toBe(true)
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

    test('appears at roughly 75% across draws', () => {
      const store = {
        'verbForm:sound:3': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
        'verbForm:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      }
      const session = { reviews: 0, lastNewAt: 0 }
      const forms = Array.from(
        { length: 200 },
        () =>
          parseCardKey(nextExercise({ ...INITIAL_DIMENSION_PROFILE, forms: 2 }, store, session, { form: 3 }).cardKey)
            .form,
      )
      const pinnedCount = forms.filter((f) => f === 3).length
      expect(pinnedCount).toBeGreaterThan(110)
      expect(pinnedCount).toBeLessThan(190)
    })

    test('behaves normally when no focus is set', () => {
      const store = {
        'verbForm:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      }
      const exercise = nextExercise({ ...INITIAL_DIMENSION_PROFILE, forms: 2 }, store, { reviews: 0, lastNewAt: 0 })
      expect(parseCardKey(exercise.cardKey).form).toBe(1)
    })

    test('routes to pinned tense when random < 0.75 and pinned due cards exist', () => {
      vi.spyOn(Math, 'random').mockReturnValueOnce(0.5) // routing: 0.5 < 0.75 → pinned
      const store = {
        'conjugation:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
        'conjugation:sound:1:active.present.indicative:3ms': {
          interval: 1,
          ef: 2.5,
          repetitions: 1,
          dueDate: '2026-03-23',
        },
      }
      const exercise = nextExercise(
        { ...INITIAL_DIMENSION_PROFILE, tenses: 1 },
        store,
        { reviews: 0, lastNewAt: 0 },
        { tense: 'active.past' },
      )
      expect(parseCardKey(exercise.cardKey).tense).toBe('active.past')
    })

    test('routes to unconstrained pool for tense when random >= 0.75', () => {
      const spy = vi.spyOn(Math, 'random')
      const store = {
        'conjugation:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
        'conjugation:sound:1:active.present.indicative:3ms': {
          interval: 1,
          ef: 2.5,
          repetitions: 1,
          dueDate: '2026-03-23',
        },
      }
      const tenses = Array.from({ length: 30 }, () => {
        spy.mockReturnValueOnce(0.9) // routing: 0.9 >= 0.75 → unconstrained
        return parseCardKey(
          nextExercise(
            { ...INITIAL_DIMENSION_PROFILE, tenses: 1 },
            store,
            { reviews: 0, lastNewAt: 0 },
            { tense: 'active.past' },
          ).cardKey,
        ).tense
      })
      expect(tenses.some((t) => t !== 'active.past')).toBe(true)
    })

    test('exercises without a tense slot pass through when tense focus is active', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5) // always apply focus
      const store = {
        'verbForm:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
        'conjugation:sound:1:active.present.indicative:3ms': {
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
      expect(exercises.some((e) => e.kind === 'verbForm')).toBe(true)
    })

    test('routes to pinned root type when random < 0.75 and pinned due cards exist', () => {
      vi.spyOn(Math, 'random').mockReturnValueOnce(0.5)
      const store = {
        'verbForm:hollow:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
        'verbForm:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      }
      const exercise = nextExercise(
        { ...INITIAL_DIMENSION_PROFILE, rootTypes: 4 },
        store,
        { reviews: 0, lastNewAt: 0 },
        { rootType: 'hollow' },
      )
      expect(parseCardKey(exercise.cardKey).rootType).toBe('hollow')
    })

    test('root type focus filters uncovered triples', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5)
      const exercises = Array.from({ length: 30 }, () =>
        nextExercise(
          { ...INITIAL_DIMENSION_PROFILE, rootTypes: 4 },
          {},
          { reviews: 0, lastNewAt: -3 },
          { rootType: 'hollow' },
        ),
      )
      expect(exercises.every((e) => parseCardKey(e.cardKey).rootType === 'hollow')).toBe(true)
    })

    test('routes to pinned pronoun when random < 0.75 and pinned due cards exist', () => {
      vi.spyOn(Math, 'random').mockReturnValueOnce(0.5)
      const store = {
        'conjugation:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
        'conjugation:sound:1:active.past:1s': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      }
      const exercise = nextExercise(
        { ...INITIAL_DIMENSION_PROFILE, tenses: 0, pronouns: 1 },
        store,
        { reviews: 0, lastNewAt: 0 },
        { pronoun: '1s' },
      )
      expect(parseCardKey(exercise.cardKey).pronoun).toBe('1s')
    })

    test('exercises without a pronoun slot pass through when pronoun focus is active', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5)
      const store = {
        'verbForm:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
        'conjugation:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' },
      }
      const exercises = Array.from({ length: 20 }, () =>
        nextExercise(
          { ...INITIAL_DIMENSION_PROFILE, pronouns: 1 },
          store,
          { reviews: 0, lastNewAt: 0 },
          { pronoun: '1s' },
        ),
      )
      expect(exercises.some((e) => e.kind === 'verbForm')).toBe(true)
    })
  })
})

describe('isCoveredTriple', () => {
  test('returns false for a triple absent from the store', () => {
    expect(isCoveredTriple('conjugation:sound:1:active.past:3ms', {})).toBe(false)
  })

  test('returns true when an exact triple key with no tense/pronoun is in the store', () => {
    const store = { 'masdarForm:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2030-01-01' } }
    expect(isCoveredTriple('masdarForm:sound:1', store)).toBe(true)
  })

  test('returns true when a key with tense and pronoun suffix for the same triple is in the store', () => {
    const store = {
      'conjugation:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2030-01-01' },
    }
    expect(isCoveredTriple('conjugation:sound:1:active.past:3ms', store)).toBe(true)
  })

  test('returns false when a different kind has an entry but not the queried triple', () => {
    const store = { 'verbForm:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2030-01-01' } }
    expect(isCoveredTriple('conjugation:sound:1:active.past:3ms', store)).toBe(false)
  })

  test('does not confuse form 1 with form 10', () => {
    const store = {
      'conjugation:sound:10:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2030-01-01' },
    }
    expect(isCoveredTriple('conjugation:sound:1:active.past:3ms', store)).toBe(false)
  })
})
