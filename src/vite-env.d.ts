/// <reference types="vite/client" />

interface SpeechRecognitionPhrase {
  readonly phrase: string
  readonly boost: number
}

declare var SpeechRecognitionPhrase: {
  prototype: SpeechRecognitionPhrase
  new (phrase: string, boost?: number): SpeechRecognitionPhrase
}

interface SpeechRecognition {
  lang: string
  continuous: boolean
  interimResults: boolean
  maxAlternatives: number
  hints?: { phrases: SpeechRecognitionPhrase[] }
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
  start(): void
  abort(): void
}

declare var SpeechRecognition: {
  prototype: SpeechRecognition
  new (): SpeechRecognition
}

interface Window {
  SpeechRecognition: typeof SpeechRecognition | undefined
  webkitSpeechRecognition: typeof SpeechRecognition | undefined
}
