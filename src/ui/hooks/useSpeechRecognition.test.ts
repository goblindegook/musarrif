import { act, renderHook } from '@testing-library/preact'
import { afterEach, expect, test, vi } from 'vitest'
import { mockSpeechRecognition } from '../../test/fixtures'
import { useSpeechRecognition } from './useSpeechRecognition'

afterEach(() => {
  vi.restoreAllMocks()
  Object.defineProperty(window, 'SpeechRecognition', {
    writable: true,
    configurable: true,
    value: undefined,
  })
})

test('supported is false when SpeechRecognition is not in window', () => {
  const { result } = renderHook(() => useSpeechRecognition())
  expect(result.current.supported).toBe(false)
})

test('supported is true when SpeechRecognition is in window', () => {
  mockSpeechRecognition()
  const { result } = renderHook(() => useSpeechRecognition())
  expect(result.current.supported).toBe(true)
})

test('initial state is idle', () => {
  mockSpeechRecognition()
  const { result } = renderHook(() => useSpeechRecognition())
  expect(result.current.state).toBe('idle')
  expect(result.current.transcript).toBe('')
  expect(result.current.errorCode).toBeNull()
})

test('start() sets state to listening', () => {
  const mock = mockSpeechRecognition()
  const { result } = renderHook(() => useSpeechRecognition())
  act(() => result.current.start([], 'ar-SA'))
  expect(result.current.state).toBe('listening')
  expect(mock.instance?.start).toHaveBeenCalledOnce()
})

test('start() sets recognition lang to ar-SA', () => {
  const mock = mockSpeechRecognition()
  const { result } = renderHook(() => useSpeechRecognition())
  act(() => result.current.start([], 'ar-SA'))
  expect(mock.instance?.lang).toBe('ar-SA')
})

test('onresult sets state to result and stores transcript', () => {
  const mock = mockSpeechRecognition()
  const { result } = renderHook(() => useSpeechRecognition())
  act(() => result.current.start([], 'ar-SA'))
  act(() => mock.fire.result('كَتَبَ'))
  expect(result.current.state).toBe('result')
  expect(result.current.transcript).toBe('كَتَبَ')
})

test('onerror sets state to error and stores errorCode', () => {
  const mock = mockSpeechRecognition()
  const { result } = renderHook(() => useSpeechRecognition())
  act(() => result.current.start([], 'ar-SA'))
  act(() => mock.fire.error('network'))
  expect(result.current.state).toBe('error')
  expect(result.current.errorCode).toBe('network')
})

test('onend without prior result or error sets state to error with no-speech code', () => {
  const mock = mockSpeechRecognition()
  const { result } = renderHook(() => useSpeechRecognition())
  act(() => result.current.start([], 'ar-SA'))
  act(() => mock.fire.end())
  expect(result.current.state).toBe('error')
  expect(result.current.errorCode).toBe('no-speech')
})

test('onend after onerror does not override error state', () => {
  const mock = mockSpeechRecognition()
  const { result } = renderHook(() => useSpeechRecognition())
  act(() => result.current.start([], 'ar-SA'))
  act(() => mock.fire.error('audio-capture'))
  act(() => mock.fire.end())
  expect(result.current.state).toBe('error')
  expect(result.current.errorCode).toBe('audio-capture')
})

test('reset() returns to idle and clears transcript and errorCode', () => {
  const mock = mockSpeechRecognition()
  const { result } = renderHook(() => useSpeechRecognition())
  act(() => result.current.start([], 'ar-SA'))
  act(() => mock.fire.result('كَتَبَ'))
  act(() => result.current.reset())
  expect(result.current.state).toBe('idle')
  expect(result.current.transcript).toBe('')
  expect(result.current.errorCode).toBeNull()
})

test('reset() aborts any active recognition session', () => {
  const mock = mockSpeechRecognition()
  const { result } = renderHook(() => useSpeechRecognition())
  act(() => result.current.start([], 'ar-SA'))
  act(() => result.current.reset())
  expect(mock.instance?.abort).toHaveBeenCalledOnce()
})

test('reset() then onend firing does not set error state', () => {
  const mock = mockSpeechRecognition()
  const { result } = renderHook(() => useSpeechRecognition())
  act(() => result.current.start([], 'ar-SA'))
  act(() => result.current.reset())
  // onend fires after abort — should be a no-op because handlers were cleared
  act(() => mock.fire.end())
  expect(result.current.state).toBe('idle')
  expect(result.current.errorCode).toBeNull()
})

test('unmount aborts any active recognition session', () => {
  const mock = mockSpeechRecognition()
  const { result, unmount } = renderHook(() => useSpeechRecognition())
  act(() => result.current.start([], 'ar-SA'))
  unmount()
  expect(mock.instance?.abort).toHaveBeenCalledOnce()
})

test('SpeechRecognitionPhrase hints are applied when available', () => {
  const mock = mockSpeechRecognition()
  // biome-ignore lint/complexity/useArrowFunction: regular function so it can be used with `new`
  const PhraseMock = vi.fn(function (phrase: string, boost: number) {
    return { phrase, boost }
  })
  Object.defineProperty(window, 'SpeechRecognitionPhrase', {
    writable: true,
    configurable: true,
    value: PhraseMock,
  })
  const phrases = ['كَتَبَ', 'يَكتُبُ']
  const { result } = renderHook(() => useSpeechRecognition())
  act(() => result.current.start(phrases, 'ar-SA'))
  expect(PhraseMock).toHaveBeenCalledWith('كَتَبَ', 10)
  expect(PhraseMock).toHaveBeenCalledWith('يَكتُبُ', 10)
  expect(mock.instance?.hints?.phrases).toHaveLength(2)
})
