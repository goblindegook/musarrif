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
  phrases?: SpeechRecognitionPhrase[]
  processLocally?: boolean
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
  start(): void
  abort(): void
}

declare var SpeechRecognition: {
  prototype: SpeechRecognition
  new (): SpeechRecognition
  available?(options: {
    langs: string[]
    processLocally?: boolean
    quality?: string
  }): Promise<'available' | 'downloadable' | 'downloading' | 'unavailable'>
}

interface Window {
  SpeechRecognition: typeof SpeechRecognition | undefined
  webkitSpeechRecognition: typeof SpeechRecognition | undefined
}
