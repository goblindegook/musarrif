import { describe, expect, test } from 'vitest'
import { INITIAL_DIMENSION_PROFILE } from '../test/profiles'
import type { DimensionStore } from './dimensions'
import { mergeExerciseData } from './merge'

const NO_WINDOWS = { tenses: [], pronouns: [], forms: [], rootTypes: [], nominals: [] }
const NO_DIMENSIONS: DimensionStore = { profile: INITIAL_DIMENSION_PROFILE, windows: NO_WINDOWS }
const EMPTY = { srs: {}, dimensions: NO_DIMENSIONS, trackedExercises: [] }

describe('SRS cards', () => {
  test('keeps the more recently reviewed card even when its due date is earlier', () => {
    const merged = mergeExerciseData(
      { ...EMPTY, srs: { 'a:3ms': { interval: 30, ef: 2.6, repetitions: 4, dueDate: '2026-03-31' } } },
      { ...EMPTY, srs: { 'a:3ms': { interval: 1, ef: 2.3, repetitions: 0, dueDate: '2026-03-21' } } },
    )

    expect(merged.srs).toEqual({ 'a:3ms': { interval: 1, ef: 2.3, repetitions: 0, dueDate: '2026-03-21' } })
  })

  test('keeps the existing card when both were reviewed on the same day', () => {
    const merged = mergeExerciseData(
      { ...EMPTY, srs: { 'a:3ms': { interval: 6, ef: 2.5, repetitions: 2, dueDate: '2026-03-27' } } },
      { ...EMPTY, srs: { 'a:3ms': { interval: 1, ef: 2.3, repetitions: 0, dueDate: '2026-03-22' } } },
    )

    expect(merged.srs).toEqual({ 'a:3ms': { interval: 6, ef: 2.5, repetitions: 2, dueDate: '2026-03-27' } })
  })

  test('drops the fraction of the interval when working out the review day', () => {
    const merged = mergeExerciseData(
      { ...EMPTY, srs: { 'a:3ms': { interval: 6, ef: 2.5, repetitions: 2, dueDate: '2026-03-27' } } },
      { ...EMPTY, srs: { 'a:3ms': { interval: 1.4, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' } } },
    )

    expect(merged.srs).toEqual({ 'a:3ms': { interval: 1.4, ef: 2.5, repetitions: 1, dueDate: '2026-03-23' } })
  })

  test('keeps cards found on only one side', () => {
    const merged = mergeExerciseData(
      { ...EMPTY, srs: { 'a:3ms': { interval: 6, ef: 2.5, repetitions: 2, dueDate: '2026-03-27' } } },
      { ...EMPTY, srs: { 'a:1s': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-25' } } },
    )

    expect(merged.srs).toEqual({
      'a:3ms': { interval: 6, ef: 2.5, repetitions: 2, dueDate: '2026-03-27' },
      'a:1s': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2026-03-25' },
    })
  })
})

describe('dimensions', () => {
  const localDimensions: DimensionStore = {
    profile: { ...INITIAL_DIMENSION_PROFILE, tenses: 2 },
    windows: { ...NO_WINDOWS, tenses: [true, false] },
  }
  const incomingDimensions: DimensionStore = {
    profile: { ...INITIAL_DIMENSION_PROFILE, pronouns: 1 },
    windows: { ...NO_WINDOWS, pronouns: [false] },
  }

  test('come from the side with the most recent card review', () => {
    const merged = mergeExerciseData(
      {
        ...EMPTY,
        srs: { 'a:3ms': { interval: 10, ef: 2.5, repetitions: 3, dueDate: '2026-03-30' } },
        dimensions: localDimensions,
      },
      {
        ...EMPTY,
        srs: { 'a:1s': { interval: 2, ef: 2.5, repetitions: 1, dueDate: '2026-03-24' } },
        dimensions: incomingDimensions,
      },
    )

    expect(merged.dimensions).toEqual(incomingDimensions)
  })

  test('stay as they are when the latest reviews fall on the same day', () => {
    const merged = mergeExerciseData(
      {
        ...EMPTY,
        srs: { 'a:3ms': { interval: 10, ef: 2.5, repetitions: 3, dueDate: '2026-03-30' } },
        dimensions: localDimensions,
      },
      {
        ...EMPTY,
        srs: { 'a:1s': { interval: 2, ef: 2.5, repetitions: 1, dueDate: '2026-03-22' } },
        dimensions: incomingDimensions,
      },
    )

    expect(merged.dimensions).toEqual(localDimensions)
  })

  test('come from the imported side when only it has cards', () => {
    const merged = mergeExerciseData(
      { ...EMPTY, dimensions: localDimensions },
      {
        ...EMPTY,
        srs: { 'a:1s': { interval: 2, ef: 2.5, repetitions: 1, dueDate: '2026-03-24' } },
        dimensions: incomingDimensions,
      },
    )

    expect(merged.dimensions).toEqual(incomingDimensions)
  })

  test('stay as they are when only the existing side has cards', () => {
    const merged = mergeExerciseData(
      {
        ...EMPTY,
        srs: { 'a:3ms': { interval: 10, ef: 2.5, repetitions: 3, dueDate: '2026-03-30' } },
        dimensions: localDimensions,
      },
      { ...EMPTY, dimensions: incomingDimensions },
    )

    expect(merged.dimensions).toEqual(localDimensions)
  })

  test('stay as they are when neither side has cards', () => {
    const merged = mergeExerciseData(
      { ...EMPTY, dimensions: localDimensions },
      { ...EMPTY, dimensions: incomingDimensions },
    )

    expect(merged.dimensions).toEqual(localDimensions)
  })
})

describe('daily activity', () => {
  test('takes each day from the side that answered more that day', () => {
    const merged = mergeExerciseData(
      {
        ...EMPTY,
        trackedExercises: [
          { date: '2026-03-20', correct: 2, incorrect: 1, passed: 0 },
          { date: '2026-03-21', correct: 1, incorrect: 0, passed: 0 },
        ],
      },
      {
        ...EMPTY,
        trackedExercises: [
          { date: '2026-03-22', correct: 4, incorrect: 0, passed: 1 },
          { date: '2026-03-20', correct: 1, incorrect: 3, passed: 0 },
        ],
      },
    )

    expect(merged.trackedExercises).toEqual([
      { date: '2026-03-20', correct: 1, incorrect: 3, passed: 0 },
      { date: '2026-03-21', correct: 1, incorrect: 0, passed: 0 },
      { date: '2026-03-22', correct: 4, incorrect: 0, passed: 1 },
    ])
  })

  test('keeps the existing day when both sides answered as many', () => {
    const merged = mergeExerciseData(
      { ...EMPTY, trackedExercises: [{ date: '2026-03-20', correct: 2, incorrect: 1, passed: 0 }] },
      { ...EMPTY, trackedExercises: [{ date: '2026-03-20', correct: 1, incorrect: 1, passed: 1 }] },
    )

    expect(merged.trackedExercises).toEqual([{ date: '2026-03-20', correct: 2, incorrect: 1, passed: 0 }])
  })
})
