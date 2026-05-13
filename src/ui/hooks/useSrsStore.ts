import { useCallback, useEffect, useMemo } from 'preact/hooks'
import { type AnswerResult, normalizeSrsStore, parseSrsStore, recordAnswer, type SrsStore } from '../../exercises/srs'
import { useLocalStorage } from './useLocalStorage'

type AnswerRecorder = (cardKey: string, result: AnswerResult) => void

export function useSrsStore(): [SrsStore, AnswerRecorder] {
  const [srs, setSrs] = useLocalStorage<SrsStore>('srs', {}, parseSrsStore)
  const store = useMemo(() => normalizeSrsStore(srs), [srs])

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
