export interface WebSpeechEngine {
  supported: boolean
  speak: (input: { text: string; lang: string; rate: number }) => Promise<void>
  cancel: () => void
}

export function createWebSpeechEngine(): WebSpeechEngine {
  const supported = Boolean(window?.speechSynthesis && window?.SpeechSynthesisUtterance)
  let currentUtterance: SpeechSynthesisUtterance | null = null

  return {
    supported,
    speak({ text, lang, rate }) {
      if (!supported) return Promise.resolve()
      window.speechSynthesis.cancel()

      return new Promise<void>((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text)
        currentUtterance = utterance
        utterance.lang = lang
        utterance.rate = rate
        utterance.onend = () => {
          if (currentUtterance === utterance) currentUtterance = null
          resolve()
        }
        utterance.onerror = () => {
          if (currentUtterance === utterance) currentUtterance = null
          resolve()
        }
        window.speechSynthesis.speak(utterance)
      })
    },
    cancel() {
      if (!supported) return
      if (currentUtterance) {
        currentUtterance.onend = null
        currentUtterance.onerror = null
        currentUtterance = null
      }
      window.speechSynthesis.cancel()
    },
  }
}
