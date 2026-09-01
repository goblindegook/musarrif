import { useCallback } from 'preact/hooks'
import { type AnswerResult, parseSrsStore, recordAnswer, type SrsStore } from '../../exercises/srs'
import { utcToday } from '../../primitives/dates'
import { useLocalStorage } from './useLocalStorage'

type AnswerRecorder = (cardKey: string, result: AnswerResult, elapsedMs?: number) => void

export function useSrsStore(): [SrsStore, AnswerRecorder] {
  const [srs, setSrs] = useLocalStorage<SrsStore>('srs', {}, parseSrsStore)

  const recordSrsAnswer = useCallback(
    (cardKey: string, result: AnswerResult, elapsedMs?: number) =>
      setSrs((current) => recordAnswer(current, cardKey, result, utcToday(), elapsedMs)),
    [setSrs],
  )

  return [srs, recordSrsAnswer]
}
