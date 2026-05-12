import { describe, expect, test } from 'vitest'
import type { DimensionProfile } from './dimensions'
import {
  computeMastery,
  findLowestMastery,
  type MasteryCategory,
  type MasteryCategoryId,
  type MasteryItem,
  type MasteryItemIdByCategory,
} from './mastery'
import { buildCardKey, type SrsStore } from './srs'

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

const BASE_PROFILE: DimensionProfile = {
  tenses: 0,
  pronouns: 0,
  diacritics: 0,
  forms: 0,
  rootTypes: 0,
  nominals: 0,
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

  test('treats due cards as zero mastery', () => {
    const key = buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')
    const store: SrsStore = {
      [key]: { interval: 365, ef: 2.5, repetitions: 10, dueDate: '2026-04-21' },
    }
    const snapshot = computeMastery(BASE_PROFILE, store, '2026-04-21')
    const rootTypes = getCategory(snapshot, 'rootTypes')
    expect(getItem(rootTypes, 'sound').score).toBe(0)
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
