import { describe, expect, test } from 'vitest'
import type { DimensionProfile } from './dimensions'
import { buildMasterySnapshot } from './mastery'
import { buildCardKey, type SrsStore } from './srs'

function getCategory(snapshot: ReturnType<typeof buildMasterySnapshot>, categoryId: string) {
  const category = snapshot.categories.find((entry) => entry.id === categoryId)
  if (category == null) throw new Error(`Missing category ${categoryId}`)
  return category
}

function getItem(category: ReturnType<typeof getCategory>, itemId: string) {
  const item = category.items.find((entry) => entry.id === itemId)
  if (item == null) throw new Error(`Missing item ${itemId}`)
  return item
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
    const snapshot = buildMasterySnapshot(BASE_PROFILE, {}, '2026-04-21')
    const nominals = getCategory(snapshot, 'nominals')
    expect(nominals.locked).toBe(true)
    expect(getItem(nominals, 'participles').locked).toBe(true)
    expect(getItem(nominals, 'masdar').locked).toBe(true)
  })

  test('treats due cards as zero mastery', () => {
    const key = buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')
    const store: SrsStore = {
      [key]: { interval: 365, ef: 2.5, repetitions: 10, dueDate: '2026-04-21' },
    }
    const snapshot = buildMasterySnapshot(BASE_PROFILE, store, '2026-04-21')
    const rootTypes = getCategory(snapshot, 'rootTypes')
    expect(getItem(rootTypes, 'sound').score).toBe(0)
  })

  test('counts non-due cards with interval-based mastery', () => {
    const key = buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')
    const store: SrsStore = {
      [key]: { interval: 365, ef: 2.5, repetitions: 10, dueDate: '2026-04-22' },
    }
    const snapshot = buildMasterySnapshot(BASE_PROFILE, store, '2026-04-21')
    const rootTypes = getCategory(snapshot, 'rootTypes')
    expect(getItem(rootTypes, 'sound').score).toBeGreaterThan(0)
  })

  test('includes locked nominal items as zero in category score', () => {
    const profile: DimensionProfile = { ...BASE_PROFILE, nominals: 1 }
    const key = buildCardKey('participleForm', 'sound', 1)
    const store: SrsStore = {
      [key]: { interval: 365, ef: 2.5, repetitions: 10, dueDate: '2026-04-22' },
    }
    const snapshot = buildMasterySnapshot(profile, store, '2026-04-21')
    const nominals = getCategory(snapshot, 'nominals')
    const participles = getItem(nominals, 'participles')
    const masdar = getItem(nominals, 'masdar')
    expect(participles.locked).toBe(false)
    expect(masdar.locked).toBe(true)
    expect(nominals.score).toBeCloseTo(participles.score / 2)
  })

  test('orders pronouns using conjugation table order', () => {
    const profile: DimensionProfile = { ...BASE_PROFILE, pronouns: 1 }
    const snapshot = buildMasterySnapshot(profile, {}, '2026-04-21')
    const pronouns = getCategory(snapshot, 'pronouns')
    expect(pronouns).toEqual({
      id: 'pronouns',
      score: 0,
      locked: false,
      items: [
        { id: '1s', score: 0, locked: false },
        { id: '2ms', score: 0, locked: false },
        { id: '2fs', score: 0, locked: false },
        { id: '3ms', score: 0, locked: false },
        { id: '3fs', score: 0, locked: false },
        { id: '2d', score: 0, locked: true },
        { id: '3md', score: 0, locked: true },
        { id: '3fd', score: 0, locked: true },
        { id: '1p', score: 0, locked: true },
        { id: '2mp', score: 0, locked: true },
        { id: '2fp', score: 0, locked: true },
        { id: '3mp', score: 0, locked: true },
        { id: '3fp', score: 0, locked: true },
      ],
    })
  })

  test('excludes impossible imperative pronoun combinations', () => {
    const profile: DimensionProfile = { ...BASE_PROFILE, tenses: 4, pronouns: 1 }
    const impossibleImperative = buildCardKey('conjugation', 'sound', 1, 'active.imperative', '1s')
    const store: SrsStore = {
      [impossibleImperative]: { interval: 365, ef: 2.5, repetitions: 10, dueDate: '2026-04-22' },
    }
    const snapshot = buildMasterySnapshot(profile, store, '2026-04-21')
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
    const lockedFormsSnapshot = buildMasterySnapshot(BASE_PROFILE, store, '2026-04-21')
    const unlockedFormsSnapshot = buildMasterySnapshot({ ...BASE_PROFILE, forms: 1 }, store, '2026-04-21')
    const lockedScore = getItem(getCategory(lockedFormsSnapshot, 'tenses'), 'active.past').score
    const unlockedScore = getItem(getCategory(unlockedFormsSnapshot, 'tenses'), 'active.past').score
    expect(unlockedScore).toBeCloseTo(lockedScore)
  })

  test('does not overestimate active past from a single strong 3ms card', () => {
    const key = buildCardKey('conjugation', 'sound', 1, 'active.past', '3ms')
    const store: SrsStore = {
      [key]: { interval: 365, ef: 2.5, repetitions: 10, dueDate: '2026-04-22' },
    }
    const snapshot = buildMasterySnapshot(BASE_PROFILE, store, '2026-04-21')
    const activePast = getItem(getCategory(snapshot, 'tenses'), 'active.past').score
    expect(activePast).toBeLessThan(0.2)
  })
})
