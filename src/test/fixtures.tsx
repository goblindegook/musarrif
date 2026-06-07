import { render } from '@testing-library/preact'
import type { ComponentChild, ComponentChildren } from 'preact'
import { vi } from 'vitest'
import { I18nProvider } from '../ui/hooks/useI18n'
import { RoutingProvider } from '../ui/routes'

export const INITIAL_DIMENSION_PROFILE = {
  tenses: 0,
  pronouns: 0,
  diacritics: 0,
  forms: 0,
  rootTypes: 0,
  nominals: 0,
} as const

function Wrapper({ children }: { children: ComponentChildren }) {
  return (
    <RoutingProvider>
      <I18nProvider>{children}</I18nProvider>
    </RoutingProvider>
  )
}

export function renderWithProviders(ui: ComponentChild) {
  return render(ui, { wrapper: Wrapper })
}

export function mockSpeechSynthesis(voices: Array<{ name: string; lang: string }> = []) {
  const synthesis = {
    getVoices: vi.fn(() => voices),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    speak: vi.fn((utterance) => utterance.onend?.()),
    cancel: vi.fn(),
  }
  Object.defineProperty(window, 'speechSynthesis', { writable: true, configurable: true, value: synthesis })
  Object.defineProperty(window, 'SpeechSynthesisUtterance', { writable: true, configurable: true, value: vi.fn() })
  return synthesis
}

export function mockSpeechRecognition() {
  type RecognitionInstance = {
    lang: string
    continuous: boolean
    interimResults: boolean
    maxAlternatives: number
    phrases?: { phrase: string; boost: number }[]
    onresult: ((event: { results: [[{ transcript: string }]] }) => void) | null
    onerror: ((event: { error: string }) => void) | null
    onend: (() => void) | null
    start: ReturnType<typeof vi.fn>
    abort: ReturnType<typeof vi.fn>
  }

  let instance: RecognitionInstance | null = null

  // Regular function (not arrow) so it can be called with `new`
  function MockSpeechRecognition(this: RecognitionInstance) {
    this.lang = ''
    this.continuous = false
    this.interimResults = false
    this.maxAlternatives = 1
    this.onresult = null
    this.onerror = null
    this.onend = null
    this.start = vi.fn()
    this.abort = vi.fn()
    instance = this
  }

  Object.defineProperty(window, 'SpeechRecognition', {
    writable: true,
    configurable: true,
    value: MockSpeechRecognition,
  })

  return {
    get instance() {
      return instance
    },
    fire: {
      result: (transcript: string) => instance?.onresult?.({ results: [[{ transcript }]] }),
      error: (error: string) => instance?.onerror?.({ error }),
      end: () => instance?.onend?.(),
    },
  }
}
