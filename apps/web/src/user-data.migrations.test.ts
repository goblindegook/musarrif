import { describe, expect, test } from 'vitest'
import { migrateUserData } from './user-data.migrations'

const EARLY = { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-20' }
const LATE = { interval: 30, ef: 2.6, repetitions: 5, dueDate: '2026-04-20' }

describe('migrateUserData', () => {
  test('rewrites v1 cards as production and recognition cards', () => {
    expect(
      migrateUserData({
        version: 1,
        srs: {
          'conjugation:sound:1:active.past:3ms': LATE,
          'verbForm:sound:1:active.past:1s': LATE,
          'verbPronoun:hollow:3:passive.present.indicative:3ms': LATE,
          'verbRoot:sound:1:active.past:2ms': LATE,
          'verbTense:sound:1:active.past:3fs': LATE,
          'rootFormVerb:sound:2': EARLY,
          'verbMasdar:sound:1': EARLY,
          'masdarForm:sound:2': EARLY,
          'masdarRoot:sound:3': EARLY,
          'masdarVerb:sound:4': EARLY,
          'verbParticiple:sound:1': LATE,
          'participleForm:sound:2': LATE,
          'participleRoot:sound:3': LATE,
          'participleVerb:sound:4': LATE,
        },
      }),
    ).toEqual({
      version: 2,
      srs: {
        'production:verb:sound:1:active.past:3ms': LATE,
        'recognition:verb:sound:1:active.past:1s': LATE,
        'recognition:verb:hollow:3:passive.present.indicative:3ms': LATE,
        'recognition:verb:sound:1:active.past:2ms': LATE,
        'recognition:verb:sound:1:active.past:3fs': LATE,
        'production:verb:sound:2': EARLY,
        'production:masdar:sound:1': EARLY,
        'recognition:masdar:sound:2': EARLY,
        'recognition:masdar:sound:3': EARLY,
        'recognition:masdar:sound:4': EARLY,
        'production:participle:sound:1': LATE,
        'recognition:participle:sound:2': LATE,
        'recognition:participle:sound:3': LATE,
        'recognition:participle:sound:4': LATE,
      },
    })
  })

  test('keeps the earliest due card when recognition cards of one cell collide', () => {
    expect(
      migrateUserData({
        version: 1,
        srs: {
          'verbRoot:sound:1:active.past:3ms': LATE,
          'verbForm:sound:1:active.past:3ms': EARLY,
          'verbTense:sound:1:active.past:3ms': LATE,
        },
      }),
    ).toEqual({ version: 2, srs: { 'recognition:verb:sound:1:active.past:3ms': EARLY } })
  })

  test('treats data without a version as v1', () => {
    expect(migrateUserData({ srs: { 'verbTense:sound:1:active.past:3ms': LATE } })).toEqual({
      version: 2,
      srs: { 'recognition:verb:sound:1:active.past:3ms': LATE },
    })
  })

  test('leaves v2 data as it is', () => {
    expect(migrateUserData({ version: 2, srs: { 'recognition:verb:sound:1:active.past:3ms': LATE } })).toEqual({
      version: 2,
      srs: { 'recognition:verb:sound:1:active.past:3ms': LATE },
    })
  })
})
