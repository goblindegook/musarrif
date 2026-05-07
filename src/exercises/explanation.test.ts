import { describe, expect, test } from 'vitest'
import type { ExplanationLayers } from '../paradigms/explanation'
import { filterMasteredLayers } from './explanation'
import { buildCardKey, type SrsStore } from './srs'

describe('filterMasteredLayers', () => {
  const FULL_LAYERS: ExplanationLayers = {
    category: 'verb',
    paradigmRoots: ['ك', 'ت', 'ب'],
    paradigmForm: 1,
    arabic: 'كَتَبَ',
    rootType: 'sound',
    form: 1,
    vowels: 'a-u',
    tense: 'active.past',
    pronoun: '3ms',
    prefix: undefined,
    suffix: undefined,
  }

  test('returns all fields unchanged when store is empty', () => {
    const result = filterMasteredLayers({}, FULL_LAYERS)
    expect(result.rootType).toBe('sound')
    expect(result.form).toBe(1)
    expect(result.vowels).toBe('a-u')
    expect(result.tense).toBe('active.past')
    expect(result.pronoun).toBe('3ms')
  })

  test('returns all fields unchanged when no mastery exceeds threshold', () => {
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
        interval: 20,
        ef: 2.5,
        repetitions: 3,
        dueDate: '2099-01-01',
      },
    }
    const result = filterMasteredLayers(store, FULL_LAYERS)
    expect(result.rootType).toBe('sound')
    expect(result.form).toBe(1)
    expect(result.vowels).toBe('a-u')
    expect(result.tense).toBe('active.past')
    expect(result.pronoun).toBe('3ms')
  })

  test('hides rootType when rootType mastery reaches threshold', () => {
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
        interval: 21,
        ef: 2.5,
        repetitions: 3,
        dueDate: '2099-01-01',
      },
    }
    const result = filterMasteredLayers(store, FULL_LAYERS)
    expect(result.rootType).toBeUndefined()
  })

  test('excludes cards of a different root type from rootType mastery', () => {
    const store: SrsStore = {
      [buildCardKey('conjugation', 'hollow', 1, 'active.past', '3ms')]: {
        interval: 30,
        ef: 2.5,
        repetitions: 3,
        dueDate: '2099-01-01',
      },
    }
    const result = filterMasteredLayers(store, FULL_LAYERS)
    expect(result.rootType).toBe('sound')
  })

  test('computes rootType median from two cards with different combo keys', () => {
    // Two different pronoun combo keys → two dedup slots → median([20, 30]) = 25 ≥ 21 → hidden
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
        interval: 20,
        ef: 2.5,
        repetitions: 3,
        dueDate: '2099-01-01',
      },
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3fs')]: {
        interval: 30,
        ef: 2.5,
        repetitions: 3,
        dueDate: '2099-01-01',
      },
    }
    const result = filterMasteredLayers(store, FULL_LAYERS)
    expect(result.rootType).toBeUndefined()
  })

  test('keeps rootType hidden when a newly unlocked form adds a low-interval card', () => {
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
        interval: 30,
        ef: 2.5,
        repetitions: 3,
        dueDate: '2099-01-01',
      },
      [buildCardKey('conjugation', 'sound', 2, 'active.past', '3ms')]: {
        interval: 1,
        ef: 2.5,
        repetitions: 1,
        dueDate: '2099-01-01',
      },
    }
    const result = filterMasteredLayers(store, FULL_LAYERS)
    expect(result.rootType).toBeUndefined()
  })

  test('shows rootType again when the strongest card is due', () => {
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
        interval: 30,
        ef: 2.5,
        repetitions: 3,
        dueDate: '2099-01-01',
      },
    }
    const result = filterMasteredLayers(store, FULL_LAYERS, 21, '2099-01-01')
    expect(result.rootType).toBe('sound')
  })

  test('deduplicates by combination key keeping max interval per combination', () => {
    // Two exercise kinds for same combo key → dedup keeps max (40) → median([40]) = 40 ≥ 21 → tense hidden
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
        interval: 10,
        ef: 2.5,
        repetitions: 3,
        dueDate: '2099-01-01',
      },
      [buildCardKey('verbTense', 'sound', 1, 'active.past', '3ms')]: {
        interval: 40,
        ef: 2.5,
        repetitions: 3,
        dueDate: '2099-01-01',
      },
    }
    const result = filterMasteredLayers(store, FULL_LAYERS)
    expect(result.tense).toBeUndefined()
  })

  test('hides form and vowels when form mastery reaches threshold', () => {
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
        interval: 21,
        ef: 2.5,
        repetitions: 3,
        dueDate: '2099-01-01',
      },
    }
    const result = filterMasteredLayers(store, FULL_LAYERS)
    expect(result.form).toBeUndefined()
    expect(result.vowels).toBeUndefined()
  })

  test('hides tense when tense mastery reaches threshold', () => {
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
        interval: 21,
        ef: 2.5,
        repetitions: 3,
        dueDate: '2099-01-01',
      },
    }
    const result = filterMasteredLayers(store, FULL_LAYERS)
    expect(result.tense).toBeUndefined()
  })

  test('hides pronoun when pronoun mastery reaches threshold', () => {
    const result = filterMasteredLayers(
      {
        [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
          interval: 21,
          ef: 2.5,
          repetitions: 3,
          dueDate: '2099-01-01',
        },
      },
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

    expect(result.pronoun).toBeUndefined()
    expect(result.prefix).toBeUndefined()
  })

  test('hides formRoot only when both form and rootType exceed threshold', () => {
    const layers: ExplanationLayers = {
      category: 'verb',
      paradigmRoots: ['ك', 'ت', 'ب'],
      paradigmForm: 8,
      arabic: 'اِكْتَتَبَ',
      form: 8,
      rootType: 'sound',
      formRoot: 'assimilation-complete',
    }
    // hollow form-8 card: form-8 mastery 21, but rootType-sound mastery 0
    const hollowForm8Store: SrsStore = {
      [buildCardKey('conjugation', 'hollow', 8, 'active.past', '3ms')]: {
        interval: 21,
        ef: 2.5,
        repetitions: 3,
        dueDate: '2099-01-01',
      },
    }
    // sound form-1 card: rootType-sound mastery 21, but form-8 mastery 0
    const soundForm1Store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
        interval: 21,
        ef: 2.5,
        repetitions: 3,
        dueDate: '2099-01-01',
      },
    }
    // sound form-8 card: both mastered
    const bothStore: SrsStore = {
      [buildCardKey('conjugation', 'sound', 8, 'active.past', '3ms')]: {
        interval: 21,
        ef: 2.5,
        repetitions: 3,
        dueDate: '2099-01-01',
      },
    }
    expect(filterMasteredLayers(hollowForm8Store, layers).formRoot).toBe('assimilation-complete')
    expect(filterMasteredLayers(soundForm1Store, layers).formRoot).toBe('assimilation-complete')
    expect(filterMasteredLayers(bothStore, layers).formRoot).toBeUndefined()
  })

  test('hides tenseRoot only when both tense and rootType exceed threshold', () => {
    const layers: ExplanationLayers = {
      category: 'verb',
      paradigmRoots: ['ق', 'و', 'ل'],
      paradigmForm: 1,
      arabic: 'قَالَ',
      tense: 'active.past',
      rootType: 'hollow-waw',
      tenseRoot: 'middle-lengthens-aa',
    }
    // sound form-1 active.past card: tense-active.past mastered, but rootType-hollow NOT mastered
    const soundPastStore: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
        interval: 21,
        ef: 2.5,
        repetitions: 3,
        dueDate: '2099-01-01',
      },
    }
    // hollow form-1 active.present.indicative card: rootType-hollow mastered, but tense-active.past NOT mastered
    const hollowPresentStore: SrsStore = {
      [buildCardKey('conjugation', 'hollow', 1, 'active.present.indicative', '3ms')]: {
        interval: 21,
        ef: 2.5,
        repetitions: 3,
        dueDate: '2099-01-01',
      },
    }
    // hollow form-1 active.past card: both mastered
    const bothStore: SrsStore = {
      [buildCardKey('conjugation', 'hollow', 1, 'active.past', '3ms')]: {
        interval: 21,
        ef: 2.5,
        repetitions: 3,
        dueDate: '2099-01-01',
      },
    }
    expect(filterMasteredLayers(soundPastStore, layers).tenseRoot).toBe('middle-lengthens-aa')
    expect(filterMasteredLayers(hollowPresentStore, layers).tenseRoot).toBe('middle-lengthens-aa')
    expect(filterMasteredLayers(bothStore, layers).tenseRoot).toBeUndefined()
  })

  test('hides nominal when nominal mastery reaches threshold using MASDAR_KINDS', () => {
    const layers: ExplanationLayers = {
      category: 'nominal',
      paradigmRoots: ['ك', 'ت', 'ب'],
      paradigmForm: 1,
      arabic: 'كِتَابَة',
      nominal: 'masdar',
    }
    const store: SrsStore = {
      [buildCardKey('masdarForm', 'sound', 1)]: { interval: 21, ef: 2.5, repetitions: 3, dueDate: '2099-01-01' },
    }
    const result = filterMasteredLayers(store, layers)
    expect(result.nominal).toBeUndefined()
  })

  test('hides nominal when nominal mastery reaches threshold using PARTICIPLE_KINDS', () => {
    const layers: ExplanationLayers = {
      category: 'nominal',
      paradigmRoots: ['ك', 'ت', 'ب'],
      paradigmForm: 1,
      arabic: 'كَاتِب',
      nominal: 'activeParticiple',
    }
    const store: SrsStore = {
      [buildCardKey('participleForm', 'sound', 1)]: { interval: 21, ef: 2.5, repetitions: 3, dueDate: '2099-01-01' },
    }
    const result = filterMasteredLayers(store, layers)
    expect(result.nominal).toBeUndefined()
  })

  test('maps hollow-waw RootAnalysisType to hollow SrsRootType', () => {
    const layers: ExplanationLayers = {
      category: 'verb',
      paradigmRoots: ['ق', 'و', 'ل'],
      paradigmForm: 1,
      arabic: 'قَالَ',
      rootType: 'hollow-waw',
    }
    const store: SrsStore = {
      [buildCardKey('conjugation', 'hollow', 1, 'active.past', '3ms')]: {
        interval: 21,
        ef: 2.5,
        repetitions: 3,
        dueDate: '2099-01-01',
      },
    }
    const result = filterMasteredLayers(store, layers)
    expect(result.rootType).toBeUndefined()
  })

  test('preserves rootLetters and arabic unconditionally', () => {
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
        interval: 100,
        ef: 2.5,
        repetitions: 3,
        dueDate: '2099-01-01',
      },
    }
    const result = filterMasteredLayers(store, FULL_LAYERS)
    expect(result.paradigmRoots).toEqual(['ك', 'ت', 'ب'])
    expect(result.arabic).toBe('كَتَبَ')
  })

  test('uses custom threshold when provided', () => {
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
        interval: 7,
        ef: 2.5,
        repetitions: 3,
        dueDate: '2099-01-01',
      },
    }
    const result = filterMasteredLayers(store, FULL_LAYERS, 7)
    expect(result.rootType).toBeUndefined()
  })
})
