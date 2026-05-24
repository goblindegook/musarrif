import { act, cleanup, renderHook } from '@testing-library/preact'
import { afterEach, expect, test } from 'vitest'
import { useTour } from './useTour'

afterEach(() => {
  cleanup()
  localStorage.clear()
})

test('opens automatically on first visit when tour is unseen', () => {
  const { result } = renderHook(() => useTour())

  expect(result.current).toMatchObject({
    isOpen: true,
    step: 0,
    totalSteps: 5,
  })
})

test('stays closed when tour has already been seen', () => {
  localStorage.setItem('conjugator:tourSeen', JSON.stringify(true))
  const { result } = renderHook(() => useTour())

  expect(result.current).toMatchObject({
    isOpen: false,
    step: -1,
  })
})

test('marks tour as seen when closed', () => {
  const { result } = renderHook(() => useTour())

  act(() => {
    result.current.closeTour()
  })

  expect(localStorage.getItem('conjugator:tourSeen')).toBe(JSON.stringify(true))
  expect(result.current).toMatchObject({
    isOpen: false,
    step: -1,
  })
})

test('advances through steps and closes after final step', () => {
  const { result } = renderHook(() => useTour())

  act(() => result.current.nextStep())
  act(() => result.current.nextStep())
  act(() => result.current.nextStep())
  act(() => result.current.nextStep())

  expect(result.current).toMatchObject({
    step: 4,
    isOpen: true,
  })

  act(() => result.current.nextStep())

  expect(result.current).toMatchObject({
    isOpen: false,
    step: -1,
  })
  expect(localStorage.getItem('conjugator:tourSeen')).toBe(JSON.stringify(true))
})

test('openTour always resets to the first step', () => {
  localStorage.setItem('conjugator:tourSeen', JSON.stringify(true))
  const { result } = renderHook(() => useTour())

  act(() => result.current.openTour())
  act(() => result.current.nextStep())
  act(() => result.current.nextStep())

  expect(result.current).toMatchObject({ step: 2 })

  act(() => result.current.openTour())

  expect(result.current).toMatchObject({
    isOpen: true,
    step: 0,
  })
})
