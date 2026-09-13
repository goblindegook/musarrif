import { describe, expect, test } from 'vitest'
import { INITIAL_DIMENSION_PROFILE as BASE_PROFILE } from '../test/fixtures'
import type { DimensionProfile } from './dimensions'
import {
  computeInsights,
  computeMastery,
  findLowestMastery,
  type InsightCandidateType,
  type MasteryCategory,
  type MasteryCategoryId,
  type MasteryItem,
  type MasteryItemIdByCategory,
} from './mastery'
import { buildCardKey, type SrsStore } from './srs'
import type { DailyActivity, TrackedExercises } from './stats'

function testMasteryCategories(items: {
  rootTypes?: MasteryItem<'rootTypes'>[]
  forms?: MasteryItem<'forms'>[]
  tenses?: MasteryItem<'tenses'>[]
  pronouns?: MasteryItem<'pronouns'>[]
  nominals?: MasteryItem<'nominals'>[]
}): readonly MasteryCategory<MasteryCategoryId>[] {
  return [
    { id: 'rootTypes', score: 0, locked: false, items: items.rootTypes ?? [] },
    { id: 'forms', score: 0, locked: false, items: items.forms ?? [] },
    { id: 'tenses', score: 0, locked: false, items: items.tenses ?? [] },
    { id: 'pronouns', score: 0, locked: false, items: items.pronouns ?? [] },
    { id: 'nominals', score: 0, locked: false, items: items.nominals ?? [] },
  ]
}

function getCategory<T extends MasteryCategoryId>(snapshot: readonly MasteryCategory<T>[], categoryId: T) {
  return snapshot.find((entry) => entry.id === categoryId)!
}

function getItem<T extends MasteryCategoryId>(category: MasteryCategory<T>, value: MasteryItemIdByCategory[T]) {
  return category.items.find((entry) => entry.value === value)!
}

describe('buildMasterySnapshot', () => {
  test('marks nominals category and items as locked at profile level 0', () => {
    const snapshot = computeMastery(BASE_PROFILE, {}, '2026-04-21')
    const nominals = getCategory(snapshot, 'nominals')
    expect(nominals).toEqual({
      id: 'nominals',
      locked: true,
      score: 0,
      items: [
        { id: 'nominals.participles', categoryId: 'nominals', value: 'participles', locked: true, score: 0 },
        { id: 'nominals.masdar', categoryId: 'nominals', value: 'masdar', locked: true, score: 0 },
      ],
    })
  })

  test('mastery fades gradually the longer a card stays overdue', () => {
    const key = buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')
    const soundScore = (today: string) =>
      getItem(
        getCategory(
          computeMastery(
            BASE_PROFILE,
            { [key]: { interval: 30, ef: 2.5, repetitions: 10, dueDate: '2026-04-21' } },
            today,
          ),
          'rootTypes',
        ),
        'sound',
      ).score

    expect(soundScore('2026-04-21')).toBeGreaterThan(soundScore('2026-04-28'))
    expect(soundScore('2026-04-28')).toBeGreaterThan(soundScore('2027-04-21'))
    expect(soundScore('2027-04-21')).toBeGreaterThan(0)
  })

  test('counts non-due cards with interval-based mastery', () => {
    const key = buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')
    const store: SrsStore = {
      [key]: { interval: 365, ef: 2.5, repetitions: 10, dueDate: '2026-04-22' },
    }
    const snapshot = computeMastery(BASE_PROFILE, store, '2026-04-21')
    const rootTypes = getCategory(snapshot, 'rootTypes')
    expect(getItem(rootTypes, 'sound').score).toBeGreaterThan(0)
  })

  test('includes locked nominal items as zero in category score', () => {
    const profile: DimensionProfile = { ...BASE_PROFILE, nominals: 1 }
    const key = buildCardKey('participleForm', 'sound', 1)
    const store: SrsStore = {
      [key]: { interval: 365, ef: 2.5, repetitions: 10, dueDate: '2026-04-22' },
    }
    const snapshot = computeMastery(profile, store, '2026-04-21')
    const nominals = getCategory(snapshot, 'nominals')
    const participles = getItem(nominals, 'participles')
    const masdar = getItem(nominals, 'masdar')
    expect(participles.locked).toBe(false)
    expect(masdar.locked).toBe(true)
    expect(nominals.score).toBeCloseTo(participles.score / 2)
  })

  test('scores participles and verbal nouns from their own cards', () => {
    const profile: DimensionProfile = { ...BASE_PROFILE, nominals: 2 }
    const store: SrsStore = {
      [buildCardKey('participleForm', 'sound', 1)]: { interval: 365, ef: 2.5, repetitions: 10, dueDate: '2026-04-22' },
    }
    const nominals = getCategory(computeMastery(profile, store, '2026-04-21'), 'nominals')
    expect(getItem(nominals, 'participles').score).toBeGreaterThan(0)
    expect(getItem(nominals, 'masdar').score).toBe(0)
  })

  test('orders pronouns using conjugation table order', () => {
    const profile: DimensionProfile = { ...BASE_PROFILE, pronouns: 1 }
    const snapshot = computeMastery(profile, {}, '2026-04-21')
    const pronouns = getCategory(snapshot, 'pronouns')
    expect(pronouns).toEqual({
      id: 'pronouns',
      score: 0,
      locked: false,
      items: [
        { id: 'pronouns.1s', categoryId: 'pronouns', value: '1s', score: 0, locked: false },
        { id: 'pronouns.2ms', categoryId: 'pronouns', value: '2ms', score: 0, locked: false },
        { id: 'pronouns.2fs', categoryId: 'pronouns', value: '2fs', score: 0, locked: false },
        { id: 'pronouns.3ms', categoryId: 'pronouns', value: '3ms', score: 0, locked: false },
        { id: 'pronouns.3fs', categoryId: 'pronouns', value: '3fs', score: 0, locked: false },
        { id: 'pronouns.2d', categoryId: 'pronouns', value: '2d', score: 0, locked: true },
        { id: 'pronouns.3md', categoryId: 'pronouns', value: '3md', score: 0, locked: true },
        { id: 'pronouns.3fd', categoryId: 'pronouns', value: '3fd', score: 0, locked: true },
        { id: 'pronouns.1p', categoryId: 'pronouns', value: '1p', score: 0, locked: true },
        { id: 'pronouns.2mp', categoryId: 'pronouns', value: '2mp', score: 0, locked: true },
        { id: 'pronouns.2fp', categoryId: 'pronouns', value: '2fp', score: 0, locked: true },
        { id: 'pronouns.3mp', categoryId: 'pronouns', value: '3mp', score: 0, locked: true },
        { id: 'pronouns.3fp', categoryId: 'pronouns', value: '3fp', score: 0, locked: true },
      ],
    })
  })

  test('excludes impossible imperative pronoun combinations', () => {
    const profile: DimensionProfile = { ...BASE_PROFILE, tenses: 4, pronouns: 1 }
    const impossibleImperative = buildCardKey('conjugation', 'sound', 1, 'active.imperative', '1s')
    const store: SrsStore = {
      [impossibleImperative]: { interval: 365, ef: 2.5, repetitions: 10, dueDate: '2026-04-22' },
    }
    const snapshot = computeMastery(profile, store, '2026-04-21')
    const pronouns = getCategory(snapshot, 'pronouns')
    const tenses = getCategory(snapshot, 'tenses')
    expect(getItem(pronouns, '1s').score).toBe(0)
    expect(getItem(tenses, 'active.imperative').score).toBe(0)
  })

  test('keeps tense mastery stable when unlocking a new form', () => {
    const key = buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')
    const store: SrsStore = {
      [key]: { interval: 365, ef: 2.5, repetitions: 10, dueDate: '2026-04-22' },
    }
    const lockedFormsSnapshot = computeMastery(BASE_PROFILE, store, '2026-04-21')
    const unlockedFormsSnapshot = computeMastery({ ...BASE_PROFILE, forms: 1 }, store, '2026-04-21')
    const lockedScore = getItem(getCategory(lockedFormsSnapshot, 'tenses'), 'active.past').score
    const unlockedScore = getItem(getCategory(unlockedFormsSnapshot, 'tenses'), 'active.past').score
    expect(unlockedScore).toBeCloseTo(lockedScore)
  })

  test('does not overestimate active past from a single strong 3ms card', () => {
    const key = buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')
    const store: SrsStore = {
      [key]: { interval: 365, ef: 2.5, repetitions: 10, dueDate: '2026-04-22' },
    }
    const snapshot = computeMastery(BASE_PROFILE, store, '2026-04-21')
    const activePast = getItem(getCategory(snapshot, 'tenses'), 'active.past').score
    expect(activePast).toBeLessThan(0.2)
  })
})

describe('find lowest mastery', () => {
  test('returns empty set when no unlocked items', () => {
    const categories = testMasteryCategories({
      rootTypes: [{ id: 'rootTypes.sound', categoryId: 'rootTypes', value: 'sound', score: 0, locked: true }],
    })
    expect(findLowestMastery(categories)).toHaveLength(0)
  })

  test('returns the single lowest-score item when only one unlocked item', () => {
    const categories = testMasteryCategories({
      rootTypes: [{ id: 'rootTypes.sound', categoryId: 'rootTypes', value: 'sound', score: 0.4, locked: false }],
    })
    expect(findLowestMastery(categories)).toEqual([
      { id: 'rootTypes.sound', categoryId: 'rootTypes', value: 'sound', score: 0.4, locked: false },
    ])
  })

  test('returns bottom 3 items by score across all categories', () => {
    const categories = testMasteryCategories({
      rootTypes: [
        { id: 'rootTypes.sound', categoryId: 'rootTypes', value: 'sound', score: 0.1, locked: false },
        { id: 'rootTypes.doubled', categoryId: 'rootTypes', value: 'doubled', score: 0.5, locked: false },
      ],
      forms: [
        { id: 'forms.1', categoryId: 'forms', value: 1, score: 0.2, locked: false },
        { id: 'forms.2', categoryId: 'forms', value: 2, score: 0.8, locked: false },
      ],
      tenses: [{ id: 'tenses.active.past', categoryId: 'tenses', value: 'active.past', score: 0.3, locked: false }],
    })
    expect(findLowestMastery(categories)).toEqual([
      { id: 'rootTypes.sound', categoryId: 'rootTypes', value: 'sound', score: 0.1, locked: false },
      { id: 'forms.1', categoryId: 'forms', value: 1, score: 0.2, locked: false },
      { id: 'tenses.active.past', categoryId: 'tenses', value: 'active.past', score: 0.3, locked: false },
    ])
  })

  test('includes ties at rank-3 boundary', () => {
    const categories = testMasteryCategories({
      rootTypes: [
        { id: 'rootTypes.sound', categoryId: 'rootTypes', value: 'sound', score: 0.1, locked: false },
        { id: 'rootTypes.doubled', categoryId: 'rootTypes', value: 'doubled', score: 0.2, locked: false },
      ],
      forms: [{ id: 'forms.1', categoryId: 'forms', value: 1, score: 0.2, locked: false }],
      tenses: [
        { id: 'tenses.active.past', categoryId: 'tenses', value: 'active.past', score: 0.2, locked: false },
        {
          id: 'tenses.active.present.indicative',
          categoryId: 'tenses',
          value: 'active.present.indicative',
          score: 0.5,
          locked: false,
        },
      ],
    })
    expect(findLowestMastery(categories)).toEqual([
      { id: 'rootTypes.sound', categoryId: 'rootTypes', value: 'sound', score: 0.1, locked: false },
      { id: 'rootTypes.doubled', categoryId: 'rootTypes', value: 'doubled', score: 0.2, locked: false },
      { id: 'forms.1', categoryId: 'forms', value: 1, score: 0.2, locked: false },
      { id: 'tenses.active.past', categoryId: 'tenses', value: 'active.past', score: 0.2, locked: false },
    ])
  })

  test('caps result at 5 items even when more ties exist', () => {
    const categories = testMasteryCategories({
      rootTypes: [
        { id: 'rootTypes.sound', categoryId: 'rootTypes', value: 'sound', score: 0, locked: false },
        { id: 'rootTypes.doubled', categoryId: 'rootTypes', value: 'doubled', score: 0, locked: false },
        { id: 'rootTypes.hamzated', categoryId: 'rootTypes', value: 'hamzated', score: 0, locked: false },
        { id: 'rootTypes.assimilated', categoryId: 'rootTypes', value: 'assimilated', score: 0, locked: false },
        { id: 'rootTypes.hollow', categoryId: 'rootTypes', value: 'hollow', score: 0, locked: false },
        { id: 'rootTypes.defective', categoryId: 'rootTypes', value: 'defective', score: 0, locked: false },
      ],
    })
    expect(findLowestMastery(categories)).toHaveLength(5)
  })

  test('cap preserves natural category iteration order (rootTypes → forms → tenses → pronouns)', () => {
    const categories = testMasteryCategories({
      rootTypes: [
        { id: 'rootTypes.sound', categoryId: 'rootTypes', value: 'sound', score: 0, locked: false },
        { id: 'rootTypes.doubled', categoryId: 'rootTypes', value: 'doubled', score: 0, locked: false },
        { id: 'rootTypes.hamzated', categoryId: 'rootTypes', value: 'hamzated', score: 0, locked: false },
      ],
      forms: [
        { id: 'forms.1', categoryId: 'forms', value: 1, score: 0, locked: false },
        { id: 'forms.2', categoryId: 'forms', value: 2, score: 0, locked: false },
        { id: 'forms.3', categoryId: 'forms', value: 3, score: 0, locked: false },
      ],
    })

    expect(findLowestMastery(categories)).toEqual([
      { id: 'rootTypes.sound', categoryId: 'rootTypes', value: 'sound', score: 0, locked: false },
      { id: 'rootTypes.doubled', categoryId: 'rootTypes', value: 'doubled', score: 0, locked: false },
      { id: 'rootTypes.hamzated', categoryId: 'rootTypes', value: 'hamzated', score: 0, locked: false },
      { id: 'forms.1', categoryId: 'forms', value: 1, score: 0, locked: false },
      { id: 'forms.2', categoryId: 'forms', value: 2, score: 0, locked: false },
    ])
  })

  test('excludes locked items', () => {
    const categories = testMasteryCategories({
      rootTypes: [{ id: 'rootTypes.sound', categoryId: 'rootTypes', value: 'sound', score: 0.8, locked: false }],
      forms: [
        { id: 'forms.1', categoryId: 'forms', value: 1, score: 0, locked: true },
        { id: 'forms.2', categoryId: 'forms', value: 2, score: 0, locked: true },
      ],
    })
    expect(findLowestMastery(categories)).toEqual([
      { id: 'rootTypes.sound', categoryId: 'rootTypes', value: 'sound', score: 0.8, locked: false },
    ])
  })

  test('handles all-zero scores by returning first 5 in natural order', () => {
    const categories = testMasteryCategories({
      tenses: [
        { id: 'tenses.active.past', categoryId: 'tenses', value: 'active.past', score: 0, locked: false },
        {
          id: 'tenses.active.present.indicative',
          categoryId: 'tenses',
          value: 'active.present.indicative',
          score: 0,
          locked: false,
        },
        {
          id: 'tenses.active.present.subjunctive',
          categoryId: 'tenses',
          value: 'active.present.subjunctive',
          score: 0,
          locked: false,
        },
      ],
      pronouns: [
        { id: 'pronouns.1s', categoryId: 'pronouns', value: '1s', score: 0, locked: false },
        { id: 'pronouns.2ms', categoryId: 'pronouns', value: '2ms', score: 0, locked: false },
        { id: 'pronouns.3ms', categoryId: 'pronouns', value: '3ms', score: 0, locked: false },
      ],
    })
    expect(findLowestMastery(categories)).toEqual([
      { id: 'tenses.active.past', categoryId: 'tenses', value: 'active.past', score: 0, locked: false },
      {
        id: 'tenses.active.present.indicative',
        categoryId: 'tenses',
        value: 'active.present.indicative',
        score: 0,
        locked: false,
      },
      {
        id: 'tenses.active.present.subjunctive',
        categoryId: 'tenses',
        value: 'active.present.subjunctive',
        score: 0,
        locked: false,
      },
      { id: 'pronouns.1s', categoryId: 'pronouns', value: '1s', score: 0, locked: false },
      { id: 'pronouns.2ms', categoryId: 'pronouns', value: '2ms', score: 0, locked: false },
    ])
  })
})

const COMPLETE_PROFILE: DimensionProfile = {
  tenses: 5,
  pronouns: 3,
  forms: 9,
  rootTypes: 5,
  nominals: 2,
}

const ANCHOR_DATE = '2026-04-15'

function makeDailyActivity(daysAgo: number, correct: number, incorrect: number): DailyActivity {
  const d = new Date(2026, 3, 15) // April 15, local time — matches ANCHOR_DATE
  d.setDate(d.getDate() - daysAgo)
  return { date: new Date(d.getFullYear(), d.getMonth(), d.getDate()), correct, incorrect, passed: 0 }
}

function makeDailyRange(
  startDaysAgo: number,
  length: number,
  correct: number,
  incorrect: number,
): readonly DailyActivity[] {
  return Array.from({ length }, (_, i) => makeDailyActivity(startDaysAgo - i, correct, incorrect))
}

describe('computeInsights', () => {
  test('zero days → trend insufficient and journey.days === 0', () => {
    const result = computeInsights(BASE_PROFILE, {}, [])
    expect(result.journey).toMatchObject({
      days: 0,
      trend: 'insufficient',
    })
  })

  test('strengths and challenge return InsightCandidate arrays with up to 2 items', () => {
    const result = computeInsights(BASE_PROFILE, {}, [])
    expect(result.strengths.length).toBeGreaterThanOrEqual(0)
    expect(result.strengths.length).toBeLessThanOrEqual(2)
    expect(result.challenge.length).toBeGreaterThanOrEqual(0)
    expect(result.challenge.length).toBeLessThanOrEqual(2)
  })

  test('candidate types come from rootType, tense, form, and pronounClass', () => {
    const profile: DimensionProfile = { ...BASE_PROFILE, pronouns: 1 }
    const result = computeInsights(profile, {}, [])
    const allCandidates = [...result.strengths, ...result.challenge]
    const validTypes: InsightCandidateType[] = ['rootType', 'tense', 'form', 'pronounClass']
    for (const c of allCandidates) {
      expect(validTypes).toContain(c.type)
    }
  })

  test('global ranking: strengths.top scores are all >= challenge.weak scores', () => {
    const profile: DimensionProfile = { ...BASE_PROFILE, pronouns: 1 }
    const key = buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')
    const store: SrsStore = {
      [key]: { interval: 60, ef: 2.5, repetitions: 5, dueDate: '2099-01-01' },
    }
    const result = computeInsights(profile, store, [], '2026-05-23')
    const minStrength = Math.min(...result.strengths.map((c) => c.score))
    const maxWeak = Math.max(...result.challenge.map((c) => c.score))
    expect(minStrength).toBeGreaterThanOrEqual(maxWeak)
  })

  test('pronounClass is scored from the practised cards of its unlocked members', () => {
    const profile: DimensionProfile = { ...BASE_PROFILE, pronouns: 1 }
    const card = { interval: 60, ef: 2.5, repetitions: 5, dueDate: '2099-01-01' }
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: card,
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '1s')]: card,
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '2fs')]: card,
    }
    const result = computeInsights(profile, store, [], '2026-05-23')
    expect([...result.strengths, ...result.challenge]).toContainEqual({
      type: 'pronounClass',
      value: 'singular',
      score: expect.closeTo(0.911, 3),
    })
  })

  test('dual pronounClass included as candidate when unlocked at level 3', () => {
    const profile: DimensionProfile = { ...BASE_PROFILE, pronouns: 3 }
    const card = { interval: 60, ef: 2.5, repetitions: 5, dueDate: '2099-01-01' }
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '2d')]: card,
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3md')]: card,
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3fd')]: card,
    }
    const result = computeInsights(profile, store, [], '2026-05-23')
    expect([...result.strengths, ...result.challenge]).toContainEqual(
      expect.objectContaining({ type: 'pronounClass', value: 'dual' }),
    )
  })

  test('claims no strengths while every practised item is still new', () => {
    const profile: DimensionProfile = { ...BASE_PROFILE, pronouns: 1 }
    const fresh = { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2099-01-01' }
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: fresh,
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '1s')]: fresh,
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '2ms')]: fresh,
    }
    const result = computeInsights(profile, store, [], '2026-05-23')
    expect(result.strengths).toEqual([])
    expect(result.challenge).toHaveLength(2)
  })

  test('participles compete as a strength once unlocked', () => {
    const profile: DimensionProfile = { ...BASE_PROFILE, pronouns: 1, nominals: 1 }
    const mature = { interval: 90, ef: 2.5, repetitions: 6, dueDate: '2099-01-01' }
    const fresh = { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2099-01-01' }
    const store: SrsStore = {
      [buildCardKey('participleForm', 'sound', 1)]: mature,
      [buildCardKey('participleRoot', 'sound', 1)]: mature,
      [buildCardKey('participleVerb', 'sound', 1)]: mature,
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: fresh,
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '1s')]: fresh,
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '2ms')]: fresh,
    }
    const result = computeInsights(profile, store, [], '2026-05-23')
    expect(result.strengths).toEqual([{ type: 'nominal', value: 'participles', score: 1 }])
  })

  test('challenge reflects performance on practised cards, not the size of unpractised ones', () => {
    const profile: DimensionProfile = { ...BASE_PROFILE, forms: 1, pronouns: 1 }
    const weak = { interval: 1, ef: 1.7, repetitions: 0, dueDate: '2099-01-01' }
    const strong = { interval: 30, ef: 2.5, repetitions: 4, dueDate: '2099-01-01' }
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: weak,
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '1s')]: weak,
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '2ms')]: weak,
      [buildCardKey('conjugation', 'sound', 2, 'active.past', '3fs')]: strong,
      [buildCardKey('conjugation', 'sound', 2, 'active.past', '2fs')]: strong,
      [buildCardKey('conjugation', 'sound', 2, 'active.past', '1s')]: strong,
    }
    const result = computeInsights(profile, store, [], '2026-05-23')
    expect(result.challenge[0]).toMatchObject({ type: 'form', value: '1' })
    expect(result.strengths[0]).toMatchObject({ type: 'form', value: '2' })
  })

  test('improving trend when recent accuracy exceeds all-time by more than 5', () => {
    const stats: TrackedExercises = [...makeDailyRange(19, 5, 4, 6), ...makeDailyRange(14, 15, 17, 3)]
    const result = computeInsights(BASE_PROFILE, {}, stats, ANCHOR_DATE)
    expect(result.journey.trend).toBe('improving')
  })

  test('a learner inactive for weeks is asked to rebuild the habit, not to protect accuracy', () => {
    const stats = makeDailyRange(49, 20, 10, 2)
    const result = computeInsights(BASE_PROFILE, {}, stats, ANCHOR_DATE)
    expect(result).toMatchObject({
      journey: { trend: 'insufficient' },
      volume: { trend: 'inactive' },
      recommendation: [{ kind: 'habit', action: 'rebuildDailyHabit' }, expect.anything()],
    })
  })

  test('complete profile → stage.nextDimension null', () => {
    const result = computeInsights(COMPLETE_PROFILE, {}, [])
    expect(result.stage.nextDimension).toBeNull()
  })
})

describe('computeInsights — volume', () => {
  test('trend is insufficient when fewer than 7 days of prior history', () => {
    const stats = makeDailyRange(6, 3, 10, 2)
    const result = computeInsights(BASE_PROFILE, {}, stats, ANCHOR_DATE)
    expect(result.volume.trend).toBe('insufficient')
  })

  test('trend is insufficient when prior 7-day window is all zero', () => {
    const stats = makeDailyRange(3, 3, 10, 2)
    const result = computeInsights(BASE_PROFILE, {}, stats, ANCHOR_DATE)
    expect(result.volume.trend).toBe('insufficient')
  })

  test('trend is inactive when recent 7 days are all zero but prior history exists', () => {
    const stats = makeDailyRange(13, 7, 10, 2)
    const result = computeInsights(BASE_PROFILE, {}, stats, ANCHOR_DATE)
    expect(result.volume.trend).toBe('inactive')
  })

  test('trend is ramping when recent average exceeds prior by more than 25%', () => {
    const prior = makeDailyRange(13, 7, 8, 2)
    const recent = makeDailyRange(6, 7, 14, 2)
    const result = computeInsights(BASE_PROFILE, {}, [...prior, ...recent], ANCHOR_DATE)
    expect(result.volume.trend).toBe('ramping')
  })

  test('trend is dropping when recent average is more than 25% below prior', () => {
    const prior = makeDailyRange(13, 7, 20, 2)
    const recent = makeDailyRange(6, 7, 8, 2)
    const result = computeInsights(BASE_PROFILE, {}, [...prior, ...recent], ANCHOR_DATE)
    expect(result.volume.trend).toBe('dropping')
  })

  test('trend is steady when recent average is within 25% of prior', () => {
    const prior = makeDailyRange(13, 7, 10, 2)
    const recent = makeDailyRange(6, 7, 11, 2)
    const result = computeInsights(BASE_PROFILE, {}, [...prior, ...recent], ANCHOR_DATE)
    expect(result.volume.trend).toBe('steady')
  })
})

describe('computeInsights — overdue', () => {
  test('count is 0 when store is empty', () => {
    const result = computeInsights(BASE_PROFILE, {}, [], ANCHOR_DATE)
    expect(result.overdue.count).toBe(0)
  })

  test('count is 0 when all cards are not yet due', () => {
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
        ef: 2.5,
        repetitions: 5,
        interval: 30,
        dueDate: '2026-04-16',
      },
    }
    const result = computeInsights(BASE_PROFILE, store, [], ANCHOR_DATE)
    expect(result.overdue.count).toBe(0)
  })

  test('cards due today are regular reviews, not backlog', () => {
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
        ef: 2.5,
        repetitions: 5,
        interval: 30,
        dueDate: ANCHOR_DATE,
      },
    }
    const result = computeInsights(BASE_PROFILE, store, [], ANCHOR_DATE)
    expect(result).toMatchObject({ overdue: { count: 0 }, backlog: { state: 'none' } })
  })

  test('counts cards where dueDate is in the past as overdue', () => {
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
        ef: 2.5,
        repetitions: 5,
        interval: 30,
        dueDate: '2026-04-10',
      },
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '1s')]: {
        ef: 2.5,
        repetitions: 3,
        interval: 10,
        dueDate: '2026-03-01',
      },
    }
    const result = computeInsights(BASE_PROFILE, store, [], ANCHOR_DATE)
    expect(result.overdue.count).toBe(2)
  })

  test('does not count future-due cards', () => {
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
        ef: 2.5,
        repetitions: 5,
        interval: 30,
        dueDate: '2026-04-16',
      },
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '1s')]: {
        ef: 2.5,
        repetitions: 3,
        interval: 10,
        dueDate: '2026-04-14',
      },
    }
    const result = computeInsights(BASE_PROFILE, store, [], ANCHOR_DATE)
    expect(result.overdue.count).toBe(1)
  })

  test('backlog state is none when no cards are overdue', () => {
    const result = computeInsights(BASE_PROFILE, {}, [], ANCHOR_DATE)
    expect(result.backlog).toEqual({ state: 'none' })
  })

  test('backlog state is few with a rounded eta for small overdue queues', () => {
    const store: SrsStore = {}
    for (let i = 0; i < 12; i++) {
      store[`conjugation:sound:1:active.past:3ms:${i}`] = {
        ef: 2.5,
        repetitions: 2,
        interval: 3,
        dueDate: '2026-04-14',
      }
    }
    const stats = makeDailyRange(13, 14, 2, 0)
    const result = computeInsights(BASE_PROFILE, store, stats, ANCHOR_DATE)
    expect(result.backlog).toEqual({ state: 'few', eta: 'oneWeek' })
  })

  test('backlog state is many with a rounded eta for large overdue queues', () => {
    const store: SrsStore = {}
    for (let i = 0; i < 30; i++) {
      store[`conjugation:sound:1:active.past:3ms:${i}`] = {
        ef: 2.5,
        repetitions: 3,
        interval: 3,
        dueDate: '2026-04-14',
      }
    }
    const stats = makeDailyRange(13, 14, 2, 0)
    const result = computeInsights(BASE_PROFILE, store, stats, ANCHOR_DATE)
    expect(result.backlog).toEqual({ state: 'many', eta: 'threeWeeks' })
  })
})

describe('computeInsights — stuck', () => {
  test('topDimensions is empty when store is empty', () => {
    const result = computeInsights(BASE_PROFILE, {}, [], ANCHOR_DATE)
    expect(result.stuck.topDimensions).toEqual([])
  })

  test('topDimensions is empty when ef is above threshold', () => {
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
        ef: 1.6,
        repetitions: 5,
        interval: 5,
        dueDate: '2099-01-01',
      },
    }
    const result = computeInsights(BASE_PROFILE, store, [], ANCHOR_DATE)
    expect(result.stuck.topDimensions).toEqual([])
  })

  test('hard cards that have since been recalled three times in a row are no longer stuck', () => {
    const recovered = { ef: 1.3, repetitions: 3, interval: 6, dueDate: '2099-01-01' }
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'passive.past', '3ms')]: recovered,
      [buildCardKey('conjugation', 'sound', 1, 'passive.past', '1s')]: recovered,
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: recovered,
    }
    const result = computeInsights(BASE_PROFILE, store, [], ANCHOR_DATE)
    expect(result.stuck.topDimensions).toEqual([])
  })

  test('topDimensions has at most 2 entries', () => {
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
        ef: 1.3,
        repetitions: 0,
        interval: 1,
        dueDate: '2099-01-01',
      },
    }
    const result = computeInsights(BASE_PROFILE, store, [], ANCHOR_DATE)
    expect(result.stuck.topDimensions.length).toBeLessThanOrEqual(2)
  })

  test('topDimensions is empty when there is only one stuck card (no discriminative signal)', () => {
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
        ef: 1.3,
        repetitions: 0,
        interval: 1,
        dueDate: '2099-01-01',
      },
    }
    const result = computeInsights(BASE_PROFILE, store, [], ANCHOR_DATE)
    expect(result.stuck.topDimensions).toEqual([])
  })

  test('tense with most stuck cards appears in topDimensions', () => {
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'passive.past', '3ms')]: {
        ef: 1.3,
        repetitions: 0,
        interval: 1,
        dueDate: '2099-01-01',
      },
      [buildCardKey('conjugation', 'sound', 1, 'passive.past', '1s')]: {
        ef: 1.3,
        repetitions: 0,
        interval: 1,
        dueDate: '2099-01-01',
      },
      [buildCardKey('conjugation', 'sound', 1, 'passive.past', '2ms')]: {
        ef: 1.3,
        repetitions: 0,
        interval: 1,
        dueDate: '2099-01-01',
      },
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
        ef: 1.3,
        repetitions: 0,
        interval: 1,
        dueDate: '2099-01-01',
      },
    }
    const result = computeInsights(BASE_PROFILE, store, [], ANCHOR_DATE)
    const dimKeys = result.stuck.topDimensions.map((d) => `${d.type}:${d.value}`)
    expect(dimKeys).toContain('tense:passive.past')
  })

  test('dominant tense appears in topDimensions when passive cards outnumber active', () => {
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'passive.past', '3ms')]: {
        ef: 1.3,
        repetitions: 0,
        interval: 1,
        dueDate: '2099-01-01',
      },
      [buildCardKey('conjugation', 'sound', 1, 'passive.past', '1s')]: {
        ef: 1.3,
        repetitions: 0,
        interval: 1,
        dueDate: '2099-01-01',
      },
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
        ef: 1.3,
        repetitions: 0,
        interval: 1,
        dueDate: '2099-01-01',
      },
    }
    const result = computeInsights(BASE_PROFILE, store, [], ANCHOR_DATE)
    const dimKeys = result.stuck.topDimensions.map((d) => `${d.type}:${d.value}`)
    expect(dimKeys).toContain('tense:passive.past')
  })

  test('scores are proportions of total stuck count', () => {
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'passive.past', '3ms')]: {
        ef: 1.3,
        repetitions: 0,
        interval: 1,
        dueDate: '2099-01-01',
      },
      [buildCardKey('conjugation', 'sound', 1, 'passive.past', '1s')]: {
        ef: 1.3,
        repetitions: 0,
        interval: 1,
        dueDate: '2099-01-01',
      },
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
        ef: 1.3,
        repetitions: 0,
        interval: 1,
        dueDate: '2099-01-01',
      },
    }
    const result = computeInsights(BASE_PROFILE, store, [], ANCHOR_DATE)
    const passivePast = result.stuck.topDimensions.find((d) => d.type === 'tense' && d.value === 'passive.past')
    expect(passivePast).toBeDefined()
    expect(passivePast!.score).toBeCloseTo(2 / 3)
  })

  test('root type with most stuck cards appears in topDimensions', () => {
    const failing = { ef: 1.3, repetitions: 0, interval: 1, dueDate: '2099-01-01' }
    const store: SrsStore = {
      [buildCardKey('conjugation', 'hollow', 1, 'active.past', '3ms')]: failing,
      [buildCardKey('conjugation', 'hollow', 1, 'active.past', '1s')]: failing,
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '2ms')]: failing,
    }
    const result = computeInsights(BASE_PROFILE, store, [], ANCHOR_DATE)
    expect(result.stuck.topDimensions[0]).toEqual({ type: 'rootType', value: 'hollow', score: expect.closeTo(2 / 3) })
  })

  test('recommendations always contain habit and focus actions', () => {
    const result = computeInsights(BASE_PROFILE, {}, [], ANCHOR_DATE)
    expect(result.recommendation).toHaveLength(2)
    expect(result.recommendation[0]).toMatchObject({ kind: 'habit' })
    expect(result.recommendation[1]).toMatchObject({ kind: 'focus' })
  })

  test('declining accuracy prioritizes protecting accuracy over increasing pace', () => {
    const store: SrsStore = {}
    for (let i = 0; i < 25; i++) {
      store[`conjugation:sound:1:active.past:3ms:${i}`] = {
        ef: 2.5,
        repetitions: 3,
        interval: 3,
        dueDate: '2026-04-14',
      }
    }
    const prior = makeDailyRange(22, 16, 10, 1)
    const recent = makeDailyRange(6, 7, 4, 6)
    const result = computeInsights(BASE_PROFILE, store, [...prior, ...recent], ANCHOR_DATE)
    expect(result.recommendation[0]).toMatchObject({ kind: 'habit', action: 'protectAccuracy' })
  })

  test('focus recommendation prefers stuck dimensions when they exist', () => {
    const store: SrsStore = {
      [buildCardKey('conjugation', 'sound', 1, 'passive.past', '3ms')]: {
        ef: 1.3,
        repetitions: 0,
        interval: 1,
        dueDate: '2099-01-01',
      },
      [buildCardKey('conjugation', 'sound', 1, 'passive.past', '1s')]: {
        ef: 1.3,
        repetitions: 0,
        interval: 1,
        dueDate: '2099-01-01',
      },
      [buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')]: {
        ef: 1.3,
        repetitions: 0,
        interval: 1,
        dueDate: '2099-01-01',
      },
    }
    const result = computeInsights(BASE_PROFILE, store, [], ANCHOR_DATE)
    expect(result.recommendation[1]).toMatchObject({
      kind: 'focus',
      action: 'focusCandidate',
      candidate: expect.objectContaining({ type: 'tense', value: 'passive.past' }),
    })
  })
})
