import { afterEach, describe, expect, test, vi } from 'vitest'
import type { CardState } from './srs'
import { buildCardKey, cardSrsWeight, parseCardKey, recordAnswer, updateCardState, weightedRandomSrs } from './srs'

describe('buildCardKey', () => {
  test('conjugation-style key includes kind, rootType, form, tense, pronoun', () => {
    expect(buildCardKey('conjugation', 'sound', 1, ['active', 'past'], '1s')).toBe('conjugation:sound:1:active-past:1s')
  })

  test('3-tuple tense serialises all three parts', () => {
    expect(buildCardKey('verbTense', 'weak', 3, ['passive', 'present', 'indicative'], '3ms')).toBe(
      'verbTense:weak:3:passive-present-indicative:3ms',
    )
  })

  test('imperative serialises as 2-token tense', () => {
    expect(buildCardKey('conjugation', 'sound', 1, ['active', 'imperative'], '2ms')).toBe(
      'conjugation:sound:1:active-imperative:2ms',
    )
  })

  test('base-form key omits tense and pronoun', () => {
    expect(buildCardKey('masdarForm', 'hamzated', 4)).toBe('masdarForm:hamzated:4')
  })
})

describe('parseCardKey', () => {
  test('parses base-form key', () => {
    expect(parseCardKey('masdarForm:hamzated:4')).toEqual({
      kind: 'masdarForm',
      rootType: 'hamzated',
      form: 4,
      tense: undefined,
      pronoun: undefined,
    })
  })

  test('parses 2-token tense key', () => {
    expect(parseCardKey('conjugation:sound:1:active-past:1s')).toEqual({
      kind: 'conjugation',
      rootType: 'sound',
      form: 1,
      tense: ['active', 'past'],
      pronoun: '1s',
    })
  })

  test('parses 3-token tense key', () => {
    expect(parseCardKey('verbTense:weak:3:passive-present-indicative:3ms')).toEqual({
      kind: 'verbTense',
      rootType: 'weak',
      form: 3,
      tense: ['passive', 'present', 'indicative'],
      pronoun: '3ms',
    })
  })
})

describe('updateCardState', () => {
  test('first correct answer sets interval 1, repetitions 1, ef 2.5', () => {
    const result = updateCardState(undefined, 'correct', '2026-03-23')
    expect(result.interval).toBe(1)
    expect(result.repetitions).toBe(1)
    expect(result.ef).toBeCloseTo(2.5)
    expect(result.dueDate).toBe('2026-03-24')
  })

  test('second correct answer sets interval 6, repetitions 2', () => {
    const after1 = updateCardState(undefined, 'correct', '2026-03-23')
    const result = updateCardState(after1, 'correct', '2026-03-23')
    expect(result.interval).toBe(6)
    expect(result.repetitions).toBe(2)
    expect(result.dueDate).toBe('2026-03-29')
  })

  test('third correct answer uses interval × ef', () => {
    const s1 = updateCardState(undefined, 'correct', '2026-03-23')
    const s2 = updateCardState(s1, 'correct', '2026-03-23')
    const result = updateCardState(s2, 'correct', '2026-03-23')
    expect(result.interval).toBe(Math.round(6 * 2.5))
    expect(result.repetitions).toBe(3)
  })

  test('incorrect answer resets repetitions and sets interval 1', () => {
    const s1 = updateCardState(undefined, 'correct', '2026-03-23')
    const s2 = updateCardState(s1, 'correct', '2026-03-23')
    const result = updateCardState(s2, 'wrong', '2026-03-23')
    expect(result.interval).toBe(1)
    expect(result.repetitions).toBe(0)
    expect(result.ef).toBeCloseTo(2.5 - 0.54)
  })

  test('ef does not drop below 1.3', () => {
    let state: CardState | undefined
    for (let i = 0; i < 10; i++) state = updateCardState(state, 'wrong', '2026-03-23')
    expect(state!.ef).toBeCloseTo(1.3)
  })

  test('pass on a new card sets interval 1, preserves repetitions 0, preserves ef', () => {
    const result = updateCardState(undefined, 'pass', '2026-03-23')
    expect(result.interval).toBe(1)
    expect(result.repetitions).toBe(0)
    expect(result.ef).toBeCloseTo(2.5)
    expect(result.dueDate).toBe('2026-03-24')
  })

  test('pass on interval-6 card halves interval to 3, preserves repetitions and ef', () => {
    const state: CardState = { interval: 6, ef: 2.5, repetitions: 2, dueDate: '2026-03-23' }
    const result = updateCardState(state, 'pass', '2026-03-23')
    expect(result.interval).toBe(3)
    expect(result.repetitions).toBe(2)
    expect(result.ef).toBeCloseTo(2.5)
    expect(result.dueDate).toBe('2026-03-26')
  })

  test('pass on interval-1 card keeps interval at 1 (floor)', () => {
    const state: CardState = { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' }
    const result = updateCardState(state, 'pass', '2026-03-23')
    expect(result.interval).toBe(1)
    expect(result.repetitions).toBe(1)
    expect(result.dueDate).toBe('2026-03-24')
  })
})

describe('cardSrsWeight', () => {
  test('returns MAX_WEIGHT for new card (no state)', () => {
    expect(cardSrsWeight(undefined, '2026-03-23')).toBe(10)
  })

  test('returns MAX_WEIGHT for due card', () => {
    const state: CardState = { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' }
    expect(cardSrsWeight(state, '2026-03-23')).toBe(10)
  })

  test('returns MAX_WEIGHT for overdue card', () => {
    const state: CardState = { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-20' }
    expect(cardSrsWeight(state, '2026-03-23')).toBe(10)
  })

  test('returns 1/daysUntilDue for not-yet-due card', () => {
    const state: CardState = { interval: 6, ef: 2.5, repetitions: 2, dueDate: '2026-03-25' }
    expect(cardSrsWeight(state, '2026-03-23')).toBeCloseTo(1 / 2)
  })
})

describe('weightedRandomSrs', () => {
  afterEach(() => vi.restoreAllMocks())

  test('selects item proportional to weight — high weight selected at low random value', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1)
    const items = [
      { v: 'a', w: 9 },
      { v: 'b', w: 1 },
    ]
    expect(weightedRandomSrs(items, (i) => i.w).v).toBe('a')
  })

  test('selects item proportional to weight — low weight selected at high random value', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.95)
    const items = [
      { v: 'a', w: 9 },
      { v: 'b', w: 1 },
    ]
    expect(weightedRandomSrs(items, (i) => i.w).v).toBe('b')
  })
})

describe('recordAnswer', () => {
  test('creates a new entry on first answer', () => {
    const store = recordAnswer({}, 'conjugation:sound:1:active-past:1s', 'correct', '2026-03-23')
    expect(store['conjugation:sound:1:active-past:1s'].repetitions).toBe(1)
    expect(store['conjugation:sound:1:active-past:1s'].dueDate).toBe('2026-03-24')
  })

  test('updates existing entry on subsequent answer', () => {
    const s1 = recordAnswer({}, 'conjugation:sound:1:active-past:1s', 'correct', '2026-03-23')
    const s2 = recordAnswer(s1, 'conjugation:sound:1:active-past:1s', 'correct', '2026-03-23')
    expect(s2['conjugation:sound:1:active-past:1s'].repetitions).toBe(2)
  })

  test('returns store unchanged when cardKey is undefined', () => {
    const store = { 'existing:key': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' } }
    expect(recordAnswer(store, undefined, 'correct')).toBe(store)
  })
})
