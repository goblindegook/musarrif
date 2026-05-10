import { describe, expect, test } from 'vitest'
import type { DimensionProfile } from './dimensions'
import {
  computeMastery,
  findLowestMastery,
  type MasteryCategory,
  type MasteryItemId,
  type MasterySnapshot,
} from './mastery'
import { buildCardKey, type SrsStore } from './srs'

function testMasteryCategories(items: {
  rootTypes?: Array<{ id: MasteryItemId; score: number; locked?: boolean }>
  forms?: Array<{ id: MasteryItemId; score: number; locked?: boolean }>
  tenses?: Array<{ id: MasteryItemId; score: number; locked?: boolean }>
  pronouns?: Array<{ id: MasteryItemId; score: number; locked?: boolean }>
  nominals?: Array<{ id: MasteryItemId; score: number; locked?: boolean }>
}): readonly MasteryCategory[] {
  const toItems = (arr: Array<{ id: MasteryItemId; score: number; locked?: boolean }> = []) =>
    arr.map(({ id, score, locked = false }) => ({ id, score, locked }))
  return [
    { id: 'rootTypes', score: 0, locked: false, items: toItems(items.rootTypes) },
    { id: 'forms', score: 0, locked: false, items: toItems(items.forms) },
    { id: 'tenses', score: 0, locked: false, items: toItems(items.tenses) },
    { id: 'pronouns', score: 0, locked: false, items: toItems(items.pronouns) },
    { id: 'nominals', score: 0, locked: false, items: toItems(items.nominals) },
  ]
}

function getCategory(snapshot: MasterySnapshot, categoryId: string) {
  return snapshot.categories.find((entry) => entry.id === categoryId)!
}

function getItem(category: MasteryCategory, itemId: string) {
  return category.items.find((entry) => entry.id[1] === itemId)!
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
        { id: ['nominals', 'participles'], locked: true, score: 0 },
        { id: ['nominals', 'masdar'], locked: true, score: 0 },
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
        { id: ['pronouns', '1s'], score: 0, locked: false },
        { id: ['pronouns', '2ms'], score: 0, locked: false },
        { id: ['pronouns', '2fs'], score: 0, locked: false },
        { id: ['pronouns', '3ms'], score: 0, locked: false },
        { id: ['pronouns', '3fs'], score: 0, locked: false },
        { id: ['pronouns', '2d'], score: 0, locked: true },
        { id: ['pronouns', '3md'], score: 0, locked: true },
        { id: ['pronouns', '3fd'], score: 0, locked: true },
        { id: ['pronouns', '1p'], score: 0, locked: true },
        { id: ['pronouns', '2mp'], score: 0, locked: true },
        { id: ['pronouns', '2fp'], score: 0, locked: true },
        { id: ['pronouns', '3mp'], score: 0, locked: true },
        { id: ['pronouns', '3fp'], score: 0, locked: true },
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
      rootTypes: [{ id: ['rootTypes', 'sound'], score: 0, locked: true }],
    })
    expect(findLowestMastery(categories)).toHaveLength(0)
  })

  test('returns the single lowest-score item when only one unlocked item', () => {
    const categories = testMasteryCategories({
      rootTypes: [{ id: ['rootTypes', 'sound'], score: 0.4 }],
    })
    expect(findLowestMastery(categories)).toEqual([['rootTypes', 'sound']])
  })

  test('returns bottom 3 items by score across all categories', () => {
    const categories = testMasteryCategories({
      rootTypes: [
        { id: ['rootTypes', 'sound'], score: 0.1 },
        { id: ['rootTypes', 'doubled'], score: 0.5 },
      ],
      forms: [
        { id: ['forms', 1], score: 0.2 },
        { id: ['forms', 2], score: 0.8 },
      ],
      tenses: [{ id: ['tenses', 'active.past'], score: 0.3 }],
    })
    expect(findLowestMastery(categories)).toEqual([
      ['rootTypes', 'sound'],
      ['forms', 1],
      ['tenses', 'active.past'],
    ])
  })

  test('includes ties at rank-3 boundary', () => {
    const categories = testMasteryCategories({
      rootTypes: [
        { id: ['rootTypes', 'sound'], score: 0.1 },
        { id: ['rootTypes', 'doubled'], score: 0.2 },
      ],
      forms: [{ id: ['forms', 1], score: 0.2 }],
      tenses: [
        { id: ['tenses', 'active.past'], score: 0.2 },
        { id: ['tenses', 'active.present.indicative'], score: 0.5 },
      ],
    })
    expect(findLowestMastery(categories)).toEqual([
      ['rootTypes', 'sound'],
      ['rootTypes', 'doubled'],
      ['forms', 1],
      ['tenses', 'active.past'],
    ])
  })

  test('caps result at 5 items even when more ties exist', () => {
    const categories = testMasteryCategories({
      rootTypes: [
        { id: ['rootTypes', 'sound'], score: 0 },
        { id: ['rootTypes', 'doubled'], score: 0 },
        { id: ['rootTypes', 'hamzated'], score: 0 },
        { id: ['rootTypes', 'assimilated'], score: 0 },
        { id: ['rootTypes', 'hollow'], score: 0 },
        { id: ['rootTypes', 'defective'], score: 0 },
      ],
    })
    expect(findLowestMastery(categories)).toHaveLength(5)
  })

  test('cap preserves natural category iteration order (rootTypes → forms → tenses → pronouns)', () => {
    const categories = testMasteryCategories({
      rootTypes: [
        { id: ['rootTypes', 'sound'], score: 0 },
        { id: ['rootTypes', 'doubled'], score: 0 },
        { id: ['rootTypes', 'hamzated'], score: 0 },
      ],
      forms: [
        { id: ['forms', 1], score: 0 },
        { id: ['forms', 2], score: 0 },
        { id: ['forms', 3], score: 0 },
      ],
    })

    expect(findLowestMastery(categories)).toEqual([
      ['rootTypes', 'sound'],
      ['rootTypes', 'doubled'],
      ['rootTypes', 'hamzated'],
      ['forms', 1],
      ['forms', 2],
    ])
  })

  test('excludes nominals items even when unlocked and low-scored', () => {
    const categories = testMasteryCategories({
      rootTypes: [{ id: ['rootTypes', 'sound'], score: 0.5 }],
      nominals: [
        { id: ['nominals', 'participles'], score: 0 },
        { id: ['nominals', 'masdar'], score: 0 },
      ],
    })
    expect(findLowestMastery(categories)).toEqual([['rootTypes', 'sound']])
  })

  test('excludes locked items from recommendation', () => {
    const categories = testMasteryCategories({
      rootTypes: [{ id: ['rootTypes', 'sound'], score: 0.8 }],
      forms: [
        { id: ['forms', 1], score: 0, locked: true },
        { id: ['forms', 2], score: 0, locked: true },
      ],
    })
    expect(findLowestMastery(categories)).toEqual([['rootTypes', 'sound']])
  })

  test('handles all-zero scores by returning first 5 in natural order', () => {
    const categories = testMasteryCategories({
      tenses: [
        { id: ['tenses', 'active.past'], score: 0 },
        { id: ['tenses', 'active.present.indicative'], score: 0 },
        { id: ['tenses', 'active.present.subjunctive'], score: 0 },
      ],
      pronouns: [
        { id: ['pronouns', '1s'], score: 0 },
        { id: ['pronouns', '2ms'], score: 0 },
        { id: ['pronouns', '3ms'], score: 0 },
      ],
    })
    expect(findLowestMastery(categories)).toEqual([
      ['tenses', 'active.past'],
      ['tenses', 'active.present.indicative'],
      ['tenses', 'active.present.subjunctive'],
      ['pronouns', '1s'],
      ['pronouns', '2ms'],
    ])
  })
})
