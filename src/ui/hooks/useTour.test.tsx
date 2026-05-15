import { act, cleanup, renderHook } from '@testing-library/preact'
import { afterEach, expect, test } from 'vitest'
import { useTour } from './useTour'

afterEach(() => {
  cleanup()
  localStorage.clear()
})

test('opens automatically on first visit when tour is unseen', () => {
  const { result } = renderHook(() => useTour())

  expect(result.current.isOpen).toBe(true)
  expect(result.current.step).toBe(0)
  expect(result.current.totalSteps).toBe(5)
})

test('stays closed when tour has already been seen', () => {
  localStorage.setItem('conjugator:tourSeen', JSON.stringify(true))
  const { result } = renderHook(() => useTour())

  expect(result.current.isOpen).toBe(false)
  expect(result.current.step).toBe(-1)
})

test('marks tour as seen when closed', () => {
  const { result } = renderHook(() => useTour())

  act(() => {
    result.current.closeTour()
  })

  expect(localStorage.getItem('conjugator:tourSeen')).toBe(JSON.stringify(true))
  expect(result.current.isOpen).toBe(false)
  expect(result.current.step).toBe(-1)
})

test('advances through steps and closes after final step', () => {
  const { result } = renderHook(() => useTour())

  act(() => result.current.nextStep())
  act(() => result.current.nextStep())
  act(() => result.current.nextStep())
  act(() => result.current.nextStep())

  expect(result.current.step).toBe(4)
  expect(result.current.isOpen).toBe(true)

  act(() => result.current.nextStep())

  expect(result.current.isOpen).toBe(false)
  expect(result.current.step).toBe(-1)
  expect(localStorage.getItem('conjugator:tourSeen')).toBe(JSON.stringify(true))
})

test('openTour always resets to the first step', () => {
  localStorage.setItem('conjugator:tourSeen', JSON.stringify(true))
  const { result } = renderHook(() => useTour())

  act(() => result.current.openTour())
  act(() => result.current.nextStep())
  act(() => result.current.nextStep())

  expect(result.current.step).toBe(2)

  act(() => result.current.openTour())

  expect(result.current.isOpen).toBe(true)
  expect(result.current.step).toBe(0)
})
