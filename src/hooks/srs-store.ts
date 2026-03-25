import { useCallback, useEffect, useMemo } from 'preact/hooks'
import { type AnswerResult, recordAnswer, type SrsStore, sanitizeSrsStore } from '../exercises/srs'
import { useLocalStorage } from './local-storage'

type AnswerRecorder = (cardKey: string, result: AnswerResult) => void

export function useSrsStore(): [SrsStore, AnswerRecorder] {
  const [srs, setSrs] = useLocalStorage<SrsStore>('srs', {})
  const store = useMemo(() => sanitizeSrsStore(srs), [srs])

  useEffect(() => {
    if (store === srs) return
    setSrs(store)
  }, [srs, setSrs, store])

  const recordSrsAnswer = useCallback(
    (cardKey: string, result: AnswerResult) => setSrs((current) => recordAnswer(current, cardKey, result)),
    [setSrs],
  )

  return [store, recordSrsAnswer]
}
