/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/preact" />

interface ImportMetaEnv {
  readonly VITE_ROUTING_MODE?: 'hash' | 'path'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

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
  showSaveFilePicker?: (options: {
    suggestedName: string
    types: Array<{
      description: string
      accept: Record<string, string[]>
    }>
  }) => Promise<FileSystemFileHandle>
}
