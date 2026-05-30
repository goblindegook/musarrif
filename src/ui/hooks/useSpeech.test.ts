import { act, renderHook } from '@testing-library/preact'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { mockSpeechSynthesis } from '../../test/fixtures'
import { useSpeech } from './useSpeech'

const AR_VOICE_1 = { name: 'Majed', lang: 'ar-SA' } as SpeechSynthesisVoice
const AR_VOICE_2 = { name: 'Tarik', lang: 'ar-SA' } as SpeechSynthesisVoice
const EN_VOICE = { name: 'Samantha', lang: 'en-US' } as SpeechSynthesisVoice

beforeEach(() => {
  localStorage.clear()
})
afterEach(() => {
  vi.restoreAllMocks()
})

test('voices only contains voices matching lang', () => {
  mockSpeechSynthesis([AR_VOICE_1, AR_VOICE_2, EN_VOICE])
  const { result } = renderHook(() => useSpeech('en'))
  expect(result.current.voices).toEqual([EN_VOICE])
})

test('voices contains only Arabic voices when lang is ar', () => {
  mockSpeechSynthesis([AR_VOICE_1, AR_VOICE_2, EN_VOICE])
  const { result } = renderHook(() => useSpeech('ar'))
  expect(result.current.voices).toEqual([AR_VOICE_1, AR_VOICE_2])
})

test('voices is empty when no voices match lang', () => {
  mockSpeechSynthesis([])
  const { result } = renderHook(() => useSpeech('ar'))
  expect(result.current.voices).toHaveLength(0)
})

test('voices has one entry when one voice matches lang', () => {
  mockSpeechSynthesis([AR_VOICE_1])
  const { result } = renderHook(() => useSpeech('ar'))
  expect(result.current.voices).toHaveLength(1)
})

test('voiceName defaults to first voice when nothing in localStorage', () => {
  mockSpeechSynthesis([AR_VOICE_1, AR_VOICE_2])
  const { result } = renderHook(() => useSpeech('ar'))
  expect(result.current.voiceName).toBe('Majed')
})

test('default voiceName is persisted to localStorage', () => {
  mockSpeechSynthesis([AR_VOICE_1, AR_VOICE_2])
  renderHook(() => useSpeech('ar'))
  expect(localStorage.getItem('conjugator:arabicVoiceName')).toBe('"Majed"')
})

test('voiceName reads from localStorage when stored', () => {
  localStorage.setItem('conjugator:arabicVoiceName', '"Tarik"')
  mockSpeechSynthesis([AR_VOICE_1, AR_VOICE_2])
  const { result } = renderHook(() => useSpeech('ar'))
  expect(result.current.voiceName).toBe('Tarik')
})

test('voiceName is null when no voices match lang', () => {
  mockSpeechSynthesis([AR_VOICE_1, AR_VOICE_2])
  const { result } = renderHook(() => useSpeech('en'))
  expect(result.current.voiceName).toBeNull()
})

test('voiceName is null when no Arabic voices available', () => {
  mockSpeechSynthesis([])
  const { result } = renderHook(() => useSpeech('ar'))
  expect(result.current.voiceName).toBeNull()
})

test('setVoiceName persists to localStorage and updates voiceName', () => {
  mockSpeechSynthesis([AR_VOICE_1, AR_VOICE_2])
  const { result } = renderHook(() => useSpeech('ar'))
  act(() => {
    result.current.setVoiceName('Tarik')
  })
  expect(result.current.voiceName).toBe('Tarik')
  expect(localStorage.getItem('conjugator:arabicVoiceName')).toBe('"Tarik"')
})

test('subscribes to voiceschanged on mount', () => {
  const synthesis = mockSpeechSynthesis([])
  renderHook(() => useSpeech('ar'))
  expect(synthesis.addEventListener).toHaveBeenCalledWith('voiceschanged', expect.any(Function))
})

test('unsubscribes from voiceschanged on unmount', () => {
  const synthesis = mockSpeechSynthesis([])
  const { unmount } = renderHook(() => useSpeech('ar'))
  unmount()
  expect(synthesis.removeEventListener).toHaveBeenCalledWith('voiceschanged', expect.any(Function))
})

test('reloads voices when voiceschanged fires', () => {
  const synthesis = mockSpeechSynthesis([AR_VOICE_1])
  const { result } = renderHook(() => useSpeech('ar'))
  synthesis.getVoices.mockReturnValue([AR_VOICE_1, AR_VOICE_2])
  const handler = (synthesis.addEventListener.mock.calls as [string, ...unknown[]][]).find(
    ([e]) => e === 'voiceschanged',
  )?.[1] as () => void
  act(() => {
    handler()
  })
  expect(result.current.voices).toEqual([AR_VOICE_1, AR_VOICE_2])
})

test('speak sets utterance.voice to selected voice', async () => {
  const synthesis = mockSpeechSynthesis([AR_VOICE_1, AR_VOICE_2])
  localStorage.setItem('conjugator:arabicVoiceName', '"Majed"')
  const { result } = renderHook(() => useSpeech('ar'))
  await act(async () => {
    await result.current.speak('مرحبا')
  })
  const utterance = synthesis.speak.mock.calls[0][0]
  expect(utterance.voice).toBe(AR_VOICE_1)
})

test('speak does not set utterance.voice when stored voice not in list', async () => {
  const synthesis = mockSpeechSynthesis([AR_VOICE_1])
  localStorage.setItem('conjugator:arabicVoiceName', '"UnknownVoice"')
  const { result } = renderHook(() => useSpeech('ar'))
  await act(async () => {
    await result.current.speak('مرحبا')
  })
  const utterance = synthesis.speak.mock.calls[0][0]
  expect(utterance.voice).toBeUndefined()
})

test('speak does not set utterance.voice when no voices match lang', async () => {
  const synthesis = mockSpeechSynthesis([AR_VOICE_1, AR_VOICE_2])
  const { result } = renderHook(() => useSpeech('en'))
  await act(async () => {
    await result.current.speak('hello')
  })
  const utterance = synthesis.speak.mock.calls[0][0]
  expect(utterance.voice).toBeUndefined()
})
