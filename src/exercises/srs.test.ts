import { afterEach, describe, expect, test, vi } from 'vitest'
import type { CardState } from './srs'
import {
  buildCardKey,
  cardSrsWeight,
  getSrsRootType,
  parseCardKey,
  parseSrsStore,
  recordAnswer,
  updateCardState,
  weightedRandomSrs,
} from './srs'

describe('getSrsRootType', () => {
  test('returns sound for plain triliteral root', () => {
    expect(getSrsRootType('كتب')).toBe('sound')
  })

  test('returns hollow when root contains a weak middle radical', () => {
    expect(getSrsRootType('قول')).toBe('hollow')
  })

  test('returns hamzated when root contains hamza and no weak radicals', () => {
    expect(getSrsRootType('سأل')).toBe('hamzated')
  })

  test('returns doubled when second and third radicals are equal', () => {
    expect(getSrsRootType('ردد')).toBe('doubled')
  })
})

describe('buildCardKey', () => {
  test.each(['production', 'recognition'] as const)(
    '%s verb cell key includes root type, form, tense, pronoun',
    (kind) => {
      expect(buildCardKey(kind, 'verb', 'sound', 1, 'active.past', '1s')).toBe(`${kind}:verb:sound:1:active.past:1s`)
    },
  )

  test('3-tuple tense serialises all three parts', () => {
    expect(buildCardKey('production', 'verb', 'hollow', 3, 'passive.present.indicative', '3ms')).toBe(
      'production:verb:hollow:3:passive.present.indicative:3ms',
    )
  })

  test('imperative serialises as 2-token tense', () => {
    expect(buildCardKey('production', 'verb', 'sound', 1, 'active.imperative', '2ms')).toBe(
      'production:verb:sound:1:active.imperative:2ms',
    )
  })

  test.each(['verb', 'masdar', 'participle'] as const)(
    '%s key that is not conjugated has only root type and form',
    (type) => {
      expect(buildCardKey('recognition', type, 'hamzated', 4)).toBe(`recognition:${type}:hamzated:4`)
    },
  )
})

describe('parseCardKey', () => {
  test('parses a nominal key', () => {
    expect(parseCardKey('recognition:masdar:hamzated:4')).toEqual({
      key: 'recognition:masdar:hamzated:4',
      type: 'recognition',
      category: 'masdar',
      rootType: 'hamzated',
      form: 4,
    })
  })

  test('parses a 2-token tense key', () => {
    expect(parseCardKey('production:verb:sound:1:active.past:1s')).toEqual({
      key: 'production:verb:sound:1:active.past:1s',
      type: 'production',
      category: 'verb',
      rootType: 'sound',
      form: 1,
      tense: 'active.past',
      pronoun: '1s',
    })
  })

  test('parses a 3-token tense key', () => {
    expect(parseCardKey('recognition:verb:hollow:3:passive.present.indicative:3ms')).toEqual({
      key: 'recognition:verb:hollow:3:passive.present.indicative:3ms',
      type: 'recognition',
      category: 'verb',
      rootType: 'hollow',
      form: 3,
      tense: 'passive.present.indicative',
      pronoun: '3ms',
    })
  })
})

describe('updateCardState', () => {
  test('first correct answer sets interval 1, repetitions 1, ef 2.5', () => {
    const result = updateCardState(undefined, 'correct', '2026-03-23')
    expect(result).toMatchObject({
      interval: 1,
      repetitions: 1,
      dueDate: '2026-03-24',
    })
    expect(result.ef).toBeCloseTo(2.5)
  })

  test('correct answer under 5 seconds grades 5 and raises ef', () => {
    const result = updateCardState(undefined, 'correct', '2026-03-23', 4_999)
    expect(result.ef).toBeCloseTo(2.6)
  })

  test('correct answer at or over 5 seconds grades 4 and keeps ef', () => {
    const result = updateCardState(undefined, 'correct', '2026-03-23', 5_000)
    expect(result.ef).toBeCloseTo(2.5)
  })

  test('second correct answer sets interval 6, repetitions 2', () => {
    const after1 = updateCardState(undefined, 'correct', '2026-03-23')
    const result = updateCardState(after1, 'correct', '2026-03-23')
    expect(result).toMatchObject({
      interval: 6,
      repetitions: 2,
      dueDate: '2026-03-29',
    })
  })

  test('third correct answer uses interval × ef', () => {
    const s1 = updateCardState(undefined, 'correct', '2026-03-23')
    const s2 = updateCardState(s1, 'correct', '2026-03-23')
    const result = updateCardState(s2, 'correct', '2026-03-23')
    expect(result).toMatchObject({
      interval: Math.round(6 * 2.5),
      repetitions: 3,
    })
  })

  test('incorrect answer resets repetitions and sets interval 1', () => {
    const s1 = updateCardState(undefined, 'correct', '2026-03-23')
    const s2 = updateCardState(s1, 'correct', '2026-03-23')
    const result = updateCardState(s2, 'wrong', '2026-03-23')
    expect(result).toMatchObject({
      interval: 1,
      repetitions: 0,
    })
    expect(result.ef).toBeCloseTo(2.5 - 0.54)
  })

  test('ef does not drop below 1.3', () => {
    let state: CardState | undefined
    for (let i = 0; i < 10; i++) state = updateCardState(state, 'wrong', '2026-03-23')
    expect(state!.ef).toBeCloseTo(1.3)
  })

  test('pass on a new card sets interval 1, preserves repetitions 0, preserves ef', () => {
    const result = updateCardState(undefined, 'pass', '2026-03-23')
    expect(result).toMatchObject({
      interval: 1,
      repetitions: 0,
      dueDate: '2026-03-24',
    })
    expect(result.ef).toBeCloseTo(2.5)
  })

  test('pass on interval-6 card halves interval to 3, preserves repetitions and ef', () => {
    const state: CardState = { interval: 6, ef: 2.5, repetitions: 2, dueDate: '2026-03-23' }
    const result = updateCardState(state, 'pass', '2026-03-23')
    expect(result).toMatchObject({
      interval: 3,
      repetitions: 2,
      dueDate: '2026-03-26',
    })
    expect(result.ef).toBeCloseTo(2.5)
  })

  test('pass on interval-1 card keeps interval at 1 (floor)', () => {
    const state: CardState = { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' }
    const result = updateCardState(state, 'pass', '2026-03-23')
    expect(result).toMatchObject({
      interval: 1,
      repetitions: 1,
      dueDate: '2026-03-24',
    })
  })

  test('correct answer does not cap interval or due date', () => {
    const state: CardState = { interval: 300, ef: 2.5, repetitions: 5, dueDate: '2026-03-23' }
    const result = updateCardState(state, 'correct', '2026-03-23')
    expect(result).toMatchObject({
      interval: 750,
      dueDate: '2028-04-11',
    })
  })

  test('pass answer does not cap interval or due date', () => {
    const state: CardState = { interval: 1000, ef: 2.5, repetitions: 5, dueDate: '2424-01-30' }
    const result = updateCardState(state, 'pass', '2026-03-23')
    expect(result).toMatchObject({
      interval: 500,
      dueDate: '2027-08-05',
    })
  })
})

describe('parseSrsStore', () => {
  test('keeps only valid card entries from unknown input', () => {
    const result = parseSrsStore({
      'production:verb:sound:1:active.past:3ms': {
        interval: 6,
        ef: 2.5,
        repetitions: 2,
        dueDate: '2026-03-29',
      },
      invalid: {
        interval: 0,
        ef: 2.5,
        repetitions: 2,
        dueDate: '2026-03-29',
      },
      missing: {
        interval: 3,
        ef: 2.5,
        repetitions: 2,
      },
      malformedDate: {
        interval: 3,
        ef: 2.5,
        repetitions: 2,
        dueDate: '2026/03/29',
      },
    })

    expect(Object.keys(result)).toEqual(['production:verb:sound:1:active.past:3ms'])
  })

  test('drops legacy future cards from parsed stores', () => {
    const result = parseSrsStore({
      'production:verb:sound:1:active.past:3ms': {
        interval: 6,
        ef: 2.5,
        repetitions: 2,
        dueDate: '2026-03-29',
      },
      'production:verb:sound:1:passive.future:3ms': {
        interval: 6,
        ef: 2.5,
        repetitions: 2,
        dueDate: '2026-03-29',
      },
      'verbTense:sound:1:active.future:3ms': {
        interval: 6,
        ef: 2.5,
        repetitions: 2,
        dueDate: '2026-03-29',
      },
    })

    expect(result).toEqual({
      'production:verb:sound:1:active.past:3ms': {
        interval: 6,
        ef: 2.5,
        repetitions: 2,
        dueDate: '2026-03-29',
      },
    })
  })

  test('drops verb cards for pronouns an impersonal passive cannot take', () => {
    const result = parseSrsStore({
      'production:verb:hollow:7:passive.present.subjunctive:3ms': {
        interval: 22,
        ef: 1.3,
        repetitions: 7,
        dueDate: '2026-11-12',
      },
      'production:verb:hollow:7:passive.present.subjunctive:3md': {
        interval: 1,
        ef: 1.42,
        repetitions: 0,
        dueDate: '2026-06-27',
      },
    })

    expect(result).toEqual({
      'production:verb:hollow:7:passive.present.subjunctive:3ms': {
        interval: 22,
        ef: 1.3,
        repetitions: 7,
        dueDate: '2026-11-12',
      },
    })
  })

  test('keeps oversized interval and dueDate values untouched', () => {
    const result = parseSrsStore({
      'production:verb:sound:1:active.past:3ms': {
        interval: 145313,
        ef: 2.5,
        repetitions: 13,
        dueDate: '2424-01-30',
      },
    })

    expect(result['production:verb:sound:1:active.past:3ms']).toMatchObject({
      interval: 145313,
      dueDate: '2424-01-30',
    })
  })

  test('returns empty store for non-object input', () => {
    expect(parseSrsStore('nope')).toEqual({})
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

  test('returns higher weight for overdue cards than due-today cards', () => {
    const dueToday: CardState = { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' }
    const state: CardState = { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-20' }
    expect(cardSrsWeight(state, '2026-03-23')).toBeGreaterThan(cardSrsWeight(dueToday, '2026-03-23'))
  })

  test('returns progressively higher weight for more overdue cards', () => {
    const slightlyOverdue: CardState = { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-22' }
    const veryOverdue: CardState = { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-20' }
    expect(cardSrsWeight(veryOverdue, '2026-03-23')).toBeGreaterThan(cardSrsWeight(slightlyOverdue, '2026-03-23'))
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
    const store = recordAnswer({}, 'production:verb:sound:1:active.past:1s', 'correct', '2026-03-23')
    expect(store['production:verb:sound:1:active.past:1s']).toMatchObject({
      repetitions: 1,
      dueDate: '2026-03-24',
    })
  })

  test('updates existing entry on subsequent answer', () => {
    const s1 = recordAnswer({}, 'production:verb:sound:1:active.past:1s', 'correct', '2026-03-23')
    const s2 = recordAnswer(s1, 'production:verb:sound:1:active.past:1s', 'correct', '2026-03-23')
    expect(s2['production:verb:sound:1:active.past:1s'].repetitions).toBe(2)
  })

  test('returns store unchanged when cardKey is undefined', () => {
    const store = { 'existing:key': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' } }
    expect(recordAnswer(store, undefined, 'correct')).toBe(store)
  })
})

test('a partial answer advances the card like a correct answer', () => {
  const card = { interval: 6, ef: 2.5, repetitions: 2, dueDate: '2026-09-01' }

  expect(updateCardState(card, 'partial', '2026-09-01')).toMatchObject({
    interval: 15,
    repetitions: 3,
    dueDate: '2026-09-16',
  })
})

test('a partial answer lowers the easiness factor where a correct answer leaves it alone', () => {
  const card = { interval: 6, ef: 2.5, repetitions: 2, dueDate: '2026-09-01' }

  expect(updateCardState(card, 'correct', '2026-09-01').ef).toBeCloseTo(2.5, 10)
  expect(updateCardState(card, 'partial', '2026-09-01').ef).toBeCloseTo(2.36, 10)
})

test('a partial answer is not a pass: a pass halves the interval and holds repetitions', () => {
  const card = { interval: 6, ef: 2.5, repetitions: 2, dueDate: '2026-09-01' }

  expect(updateCardState(card, 'pass', '2026-09-01')).toMatchObject({
    interval: 3,
    repetitions: 2,
    ef: 2.5,
  })
})

test('a fast partial answer does not earn the speed bonus a fast correct answer earns', () => {
  const card = { interval: 6, ef: 2.5, repetitions: 2, dueDate: '2026-09-01' }

  expect(updateCardState(card, 'correct', '2026-09-01', 1000).ef).toBeCloseTo(2.6, 10)
  expect(updateCardState(card, 'partial', '2026-09-01', 1000).ef).toBeCloseTo(2.36, 10)
})
