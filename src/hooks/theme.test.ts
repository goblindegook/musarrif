import { act, renderHook } from '@testing-library/preact'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { useTheme } from './theme'

function mockMatchMedia(prefersDark: boolean) {
  const mq = {
    matches: prefersDark,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }
  Object.defineProperty(window, 'matchMedia', { writable: true, value: () => mq })
  return mq
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
})

afterEach(() => {
  vi.restoreAllMocks()
})

test('defaults to system preference', () => {
  mockMatchMedia(false)
  const { result } = renderHook(() => useTheme())
  expect(result.current.themePreference).toBe('system')
})

test('applies light theme to document when preference is light', () => {
  mockMatchMedia(false)
  const { result } = renderHook(() => useTheme())
  act(() => result.current.setThemePreference('light'))
  expect(document.documentElement.getAttribute('data-theme')).toBe('light')
})

test('applies dark theme to document when preference is dark', () => {
  mockMatchMedia(false)
  const { result } = renderHook(() => useTheme())
  act(() => result.current.setThemePreference('dark'))
  expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
})

test('follows OS dark preference when system is chosen on dark OS', () => {
  mockMatchMedia(true)
  const { result } = renderHook(() => useTheme())
  act(() => result.current.setThemePreference('system'))
  expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
})

test('follows OS light preference when system is chosen on light OS', () => {
  mockMatchMedia(false)
  const { result } = renderHook(() => useTheme())
  act(() => result.current.setThemePreference('system'))
  expect(document.documentElement.getAttribute('data-theme')).toBe('light')
})

test('registers and removes OS change listener when preference is system', () => {
  const mq = mockMatchMedia(false)
  const { result, unmount } = renderHook(() => useTheme())
  act(() => result.current.setThemePreference('system'))
  expect(mq.addEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  unmount()
  expect(mq.removeEventListener).toHaveBeenCalled()
})

test('does not register new OS listener when switching to light', () => {
  const mq = mockMatchMedia(false)
  const { result } = renderHook(() => useTheme())
  const callsBefore = mq.addEventListener.mock.calls.length
  act(() => result.current.setThemePreference('light'))
  expect(mq.addEventListener).toHaveBeenCalledTimes(callsBefore)
})

test('registers OS change listener on mount when preference is already system', () => {
  const mq = mockMatchMedia(false)
  localStorage.setItem('conjugator:theme', '"system"')
  renderHook(() => useTheme())
  expect(mq.addEventListener).toHaveBeenCalledWith('change', expect.any(Function))
})

test('persists preference to localStorage', () => {
  mockMatchMedia(false)
  const { result } = renderHook(() => useTheme())
  act(() => result.current.setThemePreference('dark'))
  expect(localStorage.getItem('conjugator:theme')).toBe('"dark"')
})
