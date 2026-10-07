import type { UserDataSnapshot } from '../storage/schema'
import { decodeUserDataExport, encodeUserDataExport } from './UserDataCodec'

const browserExportFixture = {
  version: 1,
  settings: { language: 'pt', diacriticsPreference: 'none', themePreference: 'dark' },
  favouriteVerbs: ['ktb-1', 'sfr-1'],
  trackedExercises: [{ date: '2026-03-21', correct: 4, incorrect: 1, passed: 2 }],
  srs: {
    'conjugation:sound:1:active.past:3ms': {
      interval: 6,
      ef: 2.5,
      repetitions: 2,
      dueDate: '2026-03-27',
    },
  },
  dimensions: {
    profile: { tenses: 1, pronouns: 2, forms: 3, rootTypes: 4, nominals: 0 },
    windows: { tenses: [true, false], pronouns: [true], forms: [], rootTypes: [false], nominals: [] },
  },
}

describe('native user-data backup codec', () => {
  test('decodes a browser v1 export into mobile storage keys', () => {
    expect(decodeUserDataExport(JSON.stringify(browserExportFixture))).toEqual({
      values: {
        'setting:language': 'pt',
        'setting:diacriticsPreference': 'none',
        'setting:theme': 'dark',
        'favorite:ktb-1': true,
        'favorite:sfr-1': true,
        'exercise:daily:2026-03-21': { date: '2026-03-21', correct: 4, incorrect: 1, passed: 2 },
        'srs:conjugation:sound:1:active.past:3ms': {
          interval: 6,
          ef: 2.5,
          repetitions: 2,
          dueDate: '2026-03-27',
        },
        'dimension:store': browserExportFixture.dimensions,
      },
    })
  })

  test('rejects invalid JSON, non-object payloads, and an empty object', () => {
    expect(decodeUserDataExport('{')).toBeUndefined()
    expect(decodeUserDataExport('null')).toBeUndefined()
    expect(decodeUserDataExport('[]')).toBeUndefined()
    expect(decodeUserDataExport('{}')).toBeUndefined()
  })

  test('applies browser v1 defaults when optional export sections are absent', () => {
    expect(decodeUserDataExport(JSON.stringify({ favouriteVerbs: ['ktb-1'] }))).toEqual({
      values: {
        'setting:language': 'en',
        'setting:diacriticsPreference': 'some',
        'setting:theme': 'system',
        'favorite:ktb-1': true,
        'dimension:store': {
          profile: { tenses: 0, pronouns: 0, forms: 0, rootTypes: 0, nominals: 0 },
          windows: { tenses: [], pronouns: [], forms: [], rootTypes: [], nominals: [] },
        },
      },
    })
    expect(decodeUserDataExport(JSON.stringify({ version: 1 }))).toMatchObject({
      values: {
        'setting:language': 'en',
        'setting:diacriticsPreference': 'some',
        'setting:theme': 'system',
      },
    })
  })

  test('ignores unknown fields while retaining known fields and validates version type', () => {
    expect(
      decodeUserDataExport(
        JSON.stringify({ settings: { language: 'it', exerciseDifficulty: 'hard' }, futureField: true }),
      ),
    ).toMatchObject({ values: { 'setting:language': 'it' } })
    expect(decodeUserDataExport(JSON.stringify({ version: '1', favouriteVerbs: [] }))).toBeUndefined()
    expect(decodeUserDataExport(JSON.stringify({ futureField: true }))).toBeUndefined()
  })

  test('encodes browser v1 JSON, sorting keyed collections and excluding local-only values', () => {
    const snapshot: UserDataSnapshot['values'] = {
      'setting:language': 'ar',
      'setting:diacriticsPreference': 'all',
      'setting:theme': 'light',
      'setting:arabicVoice': 'Voice 1',
      'favorite:sfr-1': true,
      'favorite:ktb-1': true,
      'favorite:disabled': false,
      'exercise:daily:2026-03-22': { date: '2026-03-22', correct: 1, incorrect: 2, passed: 0 },
      'exercise:daily:2026-03-21': { date: '2026-03-21', correct: 4, incorrect: 1, passed: 2 },
      'srs:conjugation:sound:1:active.past:3ms': browserExportFixture.srs['conjugation:sound:1:active.past:3ms'],
      'dimension:store': browserExportFixture.dimensions,
      'local:tourComplete': true,
    }

    expect(JSON.parse(encodeUserDataExport(snapshot))).toEqual({
      version: 1,
      settings: { language: 'ar', diacriticsPreference: 'all', themePreference: 'light' },
      favouriteVerbs: ['ktb-1', 'sfr-1'],
      trackedExercises: [
        { date: '2026-03-21', correct: 4, incorrect: 1, passed: 2 },
        { date: '2026-03-22', correct: 1, incorrect: 2, passed: 0 },
      ],
      srs: browserExportFixture.srs,
      dimensions: browserExportFixture.dimensions,
    })
  })

  test('applies the same SRS and adaptive-dimension normalization as browser exports', () => {
    const snapshot: UserDataSnapshot['values'] = {
      'srs:conjugation:sound:1:active.future:3ms': {
        interval: 1.4,
        ef: 2.5,
        repetitions: 1,
        dueDate: '2026-03-22',
      },
      'srs:conjugation:sound:1:active.past:3ms': {
        interval: 1.4,
        ef: 2.5,
        repetitions: 1,
        dueDate: '2026-03-22',
      },
      'dimension:store': {
        profile: { tenses: 0, pronouns: 0, forms: 0, rootTypes: 0, nominals: 2 },
        windows: { tenses: [], pronouns: [], forms: [], rootTypes: [], nominals: [] },
      },
    }

    expect(JSON.parse(encodeUserDataExport(snapshot))).toMatchObject({
      srs: {
        'conjugation:sound:1:active.past:3ms': { interval: 1 },
      },
      dimensions: {
        profile: { nominals: 0 },
      },
    })
  })
})
