import { act, renderHook } from '@testing-library/preact'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { useTheme } from './useTheme'

function mockMatchMedia(prefersDark: boolean) {
  const mq = {
    matches: prefersDark,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }
  Object.defineProperty(window, 'matchMedia', { writable: true, value: () => mq })
  return mq
}

function insertThemeColorMeta() {
  const meta = document.createElement('meta')
  meta.setAttribute('name', 'theme-color')
  meta.setAttribute('content', '#f5f4ee')
  document.head.append(meta)
}

function getThemeColorMetaContent() {
  return document.querySelector('meta[name="theme-color"]')?.getAttribute('content')
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  document.querySelector('meta[name="theme-color"]')?.remove()
  insertThemeColorMeta()
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

test('applies light theme color meta when preference is light', () => {
  mockMatchMedia(true)
  const { result } = renderHook(() => useTheme())
  act(() => result.current.setThemePreference('light'))
  expect(getThemeColorMetaContent()).toBe('#f5f4ee')
})

test('applies dark theme to document when preference is dark', () => {
  mockMatchMedia(false)
  const { result } = renderHook(() => useTheme())
  act(() => result.current.setThemePreference('dark'))
  expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
})

test('applies dark theme color meta when preference is dark', () => {
  mockMatchMedia(false)
  const { result } = renderHook(() => useTheme())
  act(() => result.current.setThemePreference('dark'))
  expect(getThemeColorMetaContent()).toBe('#1c1a14')
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

test('updates theme color meta when OS preference changes in system mode', () => {
  const mq = mockMatchMedia(false)
  const { result } = renderHook(() => useTheme())
  act(() => result.current.setThemePreference('system'))
  expect(getThemeColorMetaContent()).toBe('#f5f4ee')

  const systemHandler = mq.addEventListener.mock.calls.find(([event]) => event === 'change')?.[1]
  expect(systemHandler).toBeDefined()
  mq.matches = true
  act(() => (systemHandler as () => void)())

  expect(getThemeColorMetaContent()).toBe('#1c1a14')
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
