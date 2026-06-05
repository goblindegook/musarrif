import { useCallback } from 'preact/hooks'
import { type AnswerResult, parseSrsStore, recordAnswer, type SrsStore } from '../../exercises/srs'
import { useLocalStorage } from './useLocalStorage'

type AnswerRecorder = (cardKey: string, result: AnswerResult) => void

export function useSrsStore(): [SrsStore, AnswerRecorder] {
  const [srs, setSrs] = useLocalStorage<SrsStore>('srs', {}, parseSrsStore)

  const recordSrsAnswer = useCallback(
    (cardKey: string, result: AnswerResult) => setSrs((current) => recordAnswer(current, cardKey, result)),
    [setSrs],
  )

  return [srs, recordSrsAnswer]
}
