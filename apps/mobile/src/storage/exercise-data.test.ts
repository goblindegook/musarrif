import { readDailyActivity, readSrsStore } from './exercise-data'

describe('readSrsStore', () => {
  test('keeps valid cards keyed without the srs prefix and ignores other keys', () => {
    const card = { interval: 2, ef: 2.5, repetitions: 1, dueDate: '2026-10-03' }

    expect(
      readSrsStore({
        'srs:conjugation.sound.1': card,
        'srs:broken': { interval: 0 },
        'favorite:ktb-1': true,
      }),
    ).toEqual({ 'conjugation.sound.1': card })
  })
})

describe('readDailyActivity', () => {
  test('reads daily entries as local dates and coerces invalid counts to zero', () => {
    expect(
      readDailyActivity({
        'exercise:daily:2026-10-01': { correct: 3, incorrect: -1, passed: 'many' },
      }),
    ).toEqual([{ date: new Date('2026-10-01T00:00:00'), correct: 3, incorrect: 0, passed: 0 }])
  })

  test('drops entries whose key is not a real calendar date', () => {
    expect(
      readDailyActivity({
        'exercise:daily:2026-02-31': { correct: 1, incorrect: 0, passed: 0 },
        'exercise:daily:yesterday': { correct: 1, incorrect: 0, passed: 0 },
      }),
    ).toEqual([])
  })

  test('drops entries that are not objects', () => {
    expect(readDailyActivity({ 'exercise:daily:2026-10-01': 5, 'exercise:daily:2026-10-02': [1] })).toEqual([])
  })
})
