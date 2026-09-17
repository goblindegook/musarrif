import { describe, expect, test } from 'vitest'
import type { VerbExplanationLayers } from '../paradigms/explanation'
import { filterMasteredLayers } from './explanation'

describe('filterMasteredLayers', () => {
  const FULL_LAYERS: VerbExplanationLayers = {
    category: 'verb',
    paradigmRoots: ['ك', 'ت', 'ب'],
    paradigmForm: 1,
    arabic: 'كَتَبَ',
    rootType: ['sound'],
    form: '1-action',
    vowels: 'a-u',
    tense: 'active.past',
    pronoun: '3ms',
    prefix: undefined,
    suffix: undefined,
  }

  test('returns all fields unchanged when store is empty', () => {
    const result = filterMasteredLayers({}, FULL_LAYERS)
    expect(result).toMatchObject({
      rootType: ['sound'],
      form: '1-action',
      vowels: 'a-u',
      tense: 'active.past',
      pronoun: '3ms',
    })
  })

  test('returns all fields unchanged when no mastery exceeds threshold', () => {
    const result = filterMasteredLayers(
      { 'conjugation:sound:1:active.past:3ms': { interval: 20, ef: 2.5, repetitions: 3, dueDate: '2099-01-01' } },
      FULL_LAYERS,
    )
    expect(result).toMatchObject({
      rootType: ['sound'],
      form: '1-action',
      vowels: 'a-u',
      tense: 'active.past',
      pronoun: '3ms',
    })
  })

  test('hides rootType when rootType mastery reaches threshold', () => {
    const result = filterMasteredLayers(
      { 'conjugation:sound:1:active.past:3ms': { interval: 21, ef: 2.5, repetitions: 3, dueDate: '2099-01-01' } },
      FULL_LAYERS,
    )
    expect(result.rootType).toBeUndefined()
  })

  test('a mastered doubled card hides the root note of a sound doubled root, which files under doubled', () => {
    const result = filterMasteredLayers(
      { 'conjugation:doubled:1:active.past:3ms': { interval: 21, ef: 2.5, repetitions: 3, dueDate: '2099-01-01' } },
      { ...FULL_LAYERS, paradigmRoots: ['م', 'د', 'د'], arabic: 'مَدَّ', rootType: ['sound', 'doubled'] },
    )
    expect(result.rootType).toBeUndefined()
  })

  test('excludes cards of a different root type from rootType mastery', () => {
    const result = filterMasteredLayers(
      { 'conjugation:hollow:1:active.past:3ms': { interval: 30, ef: 2.5, repetitions: 3, dueDate: '2099-01-01' } },
      FULL_LAYERS,
    )
    expect(result.rootType).toEqual(['sound'])
  })

  test('computes rootType median from two cards with different combo keys', () => {
    // Two different pronoun combo keys → two dedup slots → median([20, 30]) = 25 ≥ 21 → hidden
    const result = filterMasteredLayers(
      {
        'conjugation:sound:1:active.past:3ms': { interval: 20, ef: 2.5, repetitions: 3, dueDate: '2099-01-01' },
        'conjugation:sound:1:active.past:3fs': { interval: 30, ef: 2.5, repetitions: 3, dueDate: '2099-01-01' },
      },
      FULL_LAYERS,
    )
    expect(result.rootType).toBeUndefined()
  })

  test('keeps rootType hidden when a newly unlocked form adds a low-interval card', () => {
    const result = filterMasteredLayers(
      {
        'conjugation:sound:1:active.past:3ms': { interval: 30, ef: 2.5, repetitions: 3, dueDate: '2099-01-01' },
        'conjugation:sound:2:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2099-01-01' },
      },
      FULL_LAYERS,
    )
    expect(result.rootType).toBeUndefined()
  })

  test('shows rootType again when the strongest card is due', () => {
    const result = filterMasteredLayers(
      { 'conjugation:sound:1:active.past:3ms': { interval: 30, ef: 2.5, repetitions: 3, dueDate: '2099-01-01' } },
      FULL_LAYERS,
      21,
      '2099-01-01',
    )
    expect(result.rootType).toEqual(['sound'])
  })

  test('deduplicates by combination key keeping max interval per combination', () => {
    // Two exercise kinds for same combo key → dedup keeps max (40) → median([40]) = 40 ≥ 21 → tense hidden
    const result = filterMasteredLayers(
      {
        'conjugation:sound:1:active.past:3ms': { interval: 10, ef: 2.5, repetitions: 3, dueDate: '2099-01-01' },
        'verbTense:sound:1:active.past:3ms': { interval: 40, ef: 2.5, repetitions: 3, dueDate: '2099-01-01' },
      },
      FULL_LAYERS,
    )
    expect(result.tense).toBeUndefined()
  })

  test('hides form and vowels when form mastery reaches threshold', () => {
    const result = filterMasteredLayers(
      { 'conjugation:sound:1:active.past:3ms': { interval: 21, ef: 2.5, repetitions: 3, dueDate: '2099-01-01' } },
      FULL_LAYERS,
    )
    expect(result).toMatchObject({ form: undefined, vowels: undefined })
  })

  test('hides tense when tense mastery reaches threshold', () => {
    const result = filterMasteredLayers(
      { 'conjugation:sound:1:active.past:3ms': { interval: 21, ef: 2.5, repetitions: 3, dueDate: '2099-01-01' } },
      FULL_LAYERS,
    )
    expect(result.tense).toBeUndefined()
  })

  test('hides pronoun when pronoun mastery reaches threshold', () => {
    const result = filterMasteredLayers(
      { 'conjugation:sound:1:active.past:3ms': { interval: 21, ef: 2.5, repetitions: 3, dueDate: '2099-01-01' } },
      {
        category: 'verb',
        paradigmRoots: ['ك', 'ت', 'ب'],
        paradigmForm: 1,
        arabic: 'يَكتُبُ',
        pronoun: '3ms',
        prefix: 'يَ',
        suffix: undefined,
      },
    )

    expect(result).toMatchObject({
      pronoun: undefined,
      prefix: undefined,
    })
  })

  test.each([
    ['conjugation:hollow:8:active.past:3ms', 'assimilation-complete'],
    ['conjugation:sound:1:active.past:3ms', 'assimilation-complete'],
    ['conjugation:sound:8:active.past:3ms', undefined],
  ])('hides formRoot only when both form and rootType exceed threshold', (card, formRoot) => {
    expect(
      filterMasteredLayers(
        { [card]: { interval: 21, ef: 2.5, repetitions: 3, dueDate: '2099-01-01' } },
        {
          category: 'verb',
          paradigmRoots: ['ك', 'ت', 'ب'],
          paradigmForm: 8,
          arabic: 'اِكْتَتَبَ',
          form: '8',
          rootType: ['sound'],
          formRoot: 'assimilation-complete',
        },
      ),
    ).toMatchObject({ formRoot })
  })

  test.each([
    ['conjugation:sound:1:active.past:3ms', 'middle-lengthens-aa'],
    ['conjugation:hollow:1:active.present.indicative:3ms', 'middle-lengthens-aa'],
    ['conjugation:hollow:1:active.past:3ms', undefined],
  ])('hides tenseRoot only when both tense and rootType exceed threshold', (card, tenseRoot) => {
    expect(
      filterMasteredLayers(
        { [card]: { interval: 21, ef: 2.5, repetitions: 3, dueDate: '2099-01-01' } },
        {
          category: 'verb',
          paradigmRoots: ['ق', 'و', 'ل'],
          paradigmForm: 1,
          arabic: 'قَالَ',
          tense: 'active.past',
          rootType: ['hollow'],
          weakLetter: 'waw',
          tenseRoot: 'middle-lengthens-aa',
        },
      ),
    ).toMatchObject({ tenseRoot })
  })

  test('hides nominal when nominal mastery reaches threshold using MASDAR_KINDS', () => {
    const result = filterMasteredLayers(
      { 'masdarForm:sound:1': { interval: 21, ef: 2.5, repetitions: 3, dueDate: '2099-01-01' } },
      {
        category: 'nominal',
        paradigmRoots: ['ك', 'ت', 'ب'],
        paradigmForm: 1,
        arabic: 'كِتَابَة',
        nominal: 'masdar',
        isMasdarMimi: false,
      },
    )
    expect(result.nominal).toBeUndefined()
  })

  test('hides nominal when nominal mastery reaches threshold using PARTICIPLE_KINDS', () => {
    const result = filterMasteredLayers(
      { 'participleForm:sound:1': { interval: 21, ef: 2.5, repetitions: 3, dueDate: '2099-01-01' } },
      {
        category: 'nominal',
        paradigmRoots: ['ك', 'ت', 'ب'],
        paradigmForm: 1,
        arabic: 'كَاتِب',
        nominal: 'activeParticiple',
        activeParticipleKind: 'faa3il',
      },
    )
    expect(result.nominal).toBeUndefined()
  })

  test('maps hollow-waw RootAnalysisType to hollow SrsRootType', () => {
    const result = filterMasteredLayers(
      { 'conjugation:hollow:1:active.past:3ms': { interval: 21, ef: 2.5, repetitions: 3, dueDate: '2099-01-01' } },
      {
        category: 'verb',
        paradigmRoots: ['ق', 'و', 'ل'],
        paradigmForm: 1,
        arabic: 'قَالَ',
        rootType: ['hollow'],
        weakLetter: 'waw',
      },
    )

    expect(result.rootType).toBeUndefined()
  })

  test('preserves rootLetters and arabic unconditionally', () => {
    const result = filterMasteredLayers(
      { 'conjugation:sound:1:active.past:3ms': { interval: 100, ef: 2.5, repetitions: 3, dueDate: '2099-01-01' } },
      FULL_LAYERS,
    )
    expect(result).toMatchObject({
      paradigmRoots: ['ك', 'ت', 'ب'],
      arabic: 'كَتَبَ',
    })
  })

  test('uses custom threshold when provided', () => {
    const result = filterMasteredLayers(
      { 'conjugation:sound:1:active.past:3ms': { interval: 7, ef: 2.5, repetitions: 3, dueDate: '2099-01-01' } },
      FULL_LAYERS,
      7,
    )
    expect(result.rootType).toBeUndefined()
  })
})
