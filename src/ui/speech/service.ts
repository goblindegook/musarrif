import { createPiperTTSCache, type PiperTTSCache } from './cache'
import { PIPER_ARABIC_CACHE_NAME } from './config'
import { createPiperSpeaker, type PiperSpeaker } from './piper'
import { createWebSpeechEngine, type WebSpeechEngine } from './web-speech'

export type PiperTTSStatus = 'notInstalled' | 'installing' | 'installed' | 'failed'
export type EnginePreference = 'webSpeech' | 'piper'

export interface SpeechSnapshot {
  engine: EnginePreference
  piperTTSStatus: PiperTTSStatus
  webSpeechSupported: boolean
}

interface SpeakRequest {
  text: string
  lang: string
  speechRate?: number
}

interface SpeechDependencies {
  cache: PiperTTSCache
  piper: Pick<PiperSpeaker, 'speak' | 'cancel'>
  webSpeech: Pick<WebSpeechEngine, 'supported' | 'speak' | 'cancel'>
  now: () => number
  piperTimeoutMs: number
  piperBackoffMs: number
}

type SpeechListener = (snapshot: SpeechSnapshot) => void

export interface SpeechOrchestrator {
  speak: (request: SpeakRequest) => Promise<void>
  getSnapshot: () => SpeechSnapshot
  subscribe: (listener: SpeechListener) => () => void
  refreshStatus: () => Promise<void>
  install: () => Promise<void>
  retryInstall: () => Promise<void>
  remove: () => Promise<void>
  setEngine: (engine: EnginePreference) => void
}

function createDependencies(overrides: Partial<SpeechDependencies>): SpeechDependencies {
  return {
    now: () => Date.now(),
    cache: overrides.cache ?? createPiperTTSCache(PIPER_ARABIC_CACHE_NAME),
    piper: overrides.piper ?? createPiperSpeaker(),
    webSpeech: overrides.webSpeech ?? createWebSpeechEngine(),
    piperTimeoutMs: 4000,
    piperBackoffMs: 15000,
    ...overrides,
  }
}

export function createSpeechOrchestrator(overrides: Partial<SpeechDependencies> = {}): SpeechOrchestrator {
  const dependencies = createDependencies(overrides)
  const listeners = new Set<SpeechListener>()
  const storedPref = localStorage.getItem('speech.enginePreference')
  const initialEnginePref: EnginePreference = storedPref === 'webSpeech' ? 'webSpeech' : 'piper'
  let snapshot: SpeechSnapshot = {
    piperTTSStatus: 'notInstalled',
    engine: initialEnginePref,
    webSpeechSupported: dependencies.webSpeech.supported,
  }
  let piperBackoffUntil = 0

  const notify = () => {
    listeners.forEach((listener) => {
      listener(snapshot)
    })
  }

  const setSnapshot = (next: SpeechSnapshot) => {
    if (
      next.piperTTSStatus === snapshot.piperTTSStatus &&
      next.engine === snapshot.engine &&
      next.webSpeechSupported === snapshot.webSpeechSupported
    )
      return
    snapshot = next
    notify()
  }

  const fallbackToWebSpeech = async (request: SpeakRequest) => {
    if (!dependencies.webSpeech.supported) return
    await dependencies.webSpeech.speak({ text: request.text, lang: request.lang, rate: request.speechRate ?? 1 })
  }

  const refreshArabicVoiceStatusImpl = async () => {
    const installed = await dependencies.cache.isInstalled()
    setSnapshot({ ...snapshot, piperTTSStatus: installed ? 'installed' : 'notInstalled' })
  }

  const installArabicVoiceImpl = async () => {
    setSnapshot({ ...snapshot, piperTTSStatus: 'installing' })
    try {
      await dependencies.cache.install()
      localStorage.setItem('speech.enginePreference', 'piper')
      setSnapshot({ ...snapshot, piperTTSStatus: 'installed', engine: 'piper' })
    } catch {
      setSnapshot({ ...snapshot, piperTTSStatus: 'failed' })
    }
  }

  const removeArabicVoiceImpl = async () => {
    dependencies.piper.cancel()
    await dependencies.cache.remove()
    setSnapshot({ ...snapshot, piperTTSStatus: 'notInstalled' })
  }

  const speakImpl = async (request: SpeakRequest) => {
    dependencies.piper.cancel()
    dependencies.webSpeech.cancel()

    if (request.lang !== 'ar') {
      await fallbackToWebSpeech(request)
      return
    }

    const installed = await dependencies.cache.isInstalled()
    if (!installed) setSnapshot({ ...snapshot, piperTTSStatus: 'notInstalled' })
    if (!installed || dependencies.now() < piperBackoffUntil || snapshot.engine === 'webSpeech') {
      await fallbackToWebSpeech(request)
      return
    }

    if (snapshot.piperTTSStatus !== 'installed') setSnapshot({ ...snapshot, piperTTSStatus: 'installed' })

    try {
      await dependencies.piper.speak({
        text: request.text,
        timeoutMs: dependencies.piperTimeoutMs,
        rate: request.speechRate ?? 1,
      })
    } catch {
      piperBackoffUntil = dependencies.now() + dependencies.piperBackoffMs
      await fallbackToWebSpeech(request)
    }
  }

  return {
    speak: speakImpl,
    getSnapshot() {
      return snapshot
    },
    subscribe(listener) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
    refreshStatus: refreshArabicVoiceStatusImpl,
    install: installArabicVoiceImpl,
    async retryInstall() {
      await dependencies.cache.remove().catch(() => undefined)
      await installArabicVoiceImpl()
    },
    remove: removeArabicVoiceImpl,
    setEngine(pref: EnginePreference) {
      localStorage.setItem('speech.enginePreference', pref)
      setSnapshot({ ...snapshot, engine: pref })
    },
  }
}

let speechOrchestrator: SpeechOrchestrator | null = null

function getSpeechOrchestrator() {
  if (!speechOrchestrator) speechOrchestrator = createSpeechOrchestrator()
  return speechOrchestrator
}

export const speak = (request: SpeakRequest) => getSpeechOrchestrator().speak(request)
export const getSnapshot = () => getSpeechOrchestrator().getSnapshot()
export const subscribe = (listener: SpeechListener) => getSpeechOrchestrator().subscribe(listener)
export const refreshStatus = () => getSpeechOrchestrator().refreshStatus()
export const install = () => getSpeechOrchestrator().install()
export const retryInstall = () => getSpeechOrchestrator().retryInstall()
export const remove = () => getSpeechOrchestrator().remove()
export const setEngine = (pref: EnginePreference) => getSpeechOrchestrator().setEngine(pref)
