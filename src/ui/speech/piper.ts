import { piperGenerate } from 'piper-wasm'
import { PIPER_ARABIC_ASSET_PATHS, PIPER_ARABIC_CACHE_NAME, PIPER_ORT_BASE_URL } from './config'

export interface PiperSpeaker {
  speak: (input: { text: string; timeoutMs: number; rate: number }) => Promise<void>
  cancel: () => void
}

const PIPER_JS_URL = '/piper/piper_phonemize.js'
const PIPER_WASM_URL = '/piper/piper_phonemize.wasm'
const PIPER_WORKER_URL = '/piper/piper_worker.js'

function toAbsoluteUrl(pathname: string): string {
  return new URL(pathname, window.location.origin).toString()
}

async function loadAssetObjectUrls(): Promise<{ modelUrl: string; configUrl: string; dataUrl: string }> {
  const cache = await caches.open(PIPER_ARABIC_CACHE_NAME)
  const [modelResponse, configResponse, dataResponse] = await Promise.all([
    cache.match(toAbsoluteUrl(PIPER_ARABIC_ASSET_PATHS[0])),
    cache.match(toAbsoluteUrl(PIPER_ARABIC_ASSET_PATHS[1])),
    cache.match(toAbsoluteUrl(PIPER_ARABIC_ASSET_PATHS[2])),
  ])
  if (!modelResponse || !configResponse || !dataResponse) {
    throw new Error('Voice assets not in cache')
  }
  const [modelBlob, configBlob, dataBlob] = await Promise.all([
    modelResponse.blob(),
    configResponse.blob(),
    dataResponse.blob(),
  ])
  return {
    modelUrl: URL.createObjectURL(modelBlob),
    configUrl: URL.createObjectURL(configBlob),
    dataUrl: URL.createObjectURL(dataBlob),
  }
}

export function createPiperSpeaker(
  createAudioElement: (src: string) => HTMLAudioElement = (src) => new Audio(src),
): PiperSpeaker {
  let assetUrls: { modelUrl: string; configUrl: string; dataUrl: string } | null = null
  let generationCounter = 0
  let currentAudio: HTMLAudioElement | null = null

  return {
    async speak({ text, timeoutMs, rate }) {
      if (!assetUrls) {
        assetUrls = await loadAssetObjectUrls()
      }

      const generation = ++generationCounter

      const synthesis = piperGenerate(
        PIPER_JS_URL,
        PIPER_WASM_URL,
        assetUrls.dataUrl,
        PIPER_WORKER_URL,
        assetUrls.modelUrl,
        assetUrls.configUrl,
        null,
        text,
        () => {},
        null,
        false,
        PIPER_ORT_BASE_URL,
      )

      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Piper synthesis timed out')), timeoutMs),
      )

      const result = await Promise.race([synthesis, timeout])

      if (generation !== generationCounter) {
        URL.revokeObjectURL(result.file)
        return
      }

      const audio = createAudioElement(result.file)
      audio.playbackRate = rate
      currentAudio = audio

      await new Promise<void>((resolve, reject) => {
        audio.onended = () => resolve()
        audio.onerror = () => reject(new Error('Piper audio playback failed'))
        void audio.play().catch((e: unknown) => reject(e as Error))
      }).finally(() => {
        URL.revokeObjectURL(result.file)
        if (currentAudio === audio) currentAudio = null
      })
    },
    cancel() {
      generationCounter++
      if (currentAudio) {
        currentAudio.pause()
        currentAudio = null
      }
    },
  }
}
