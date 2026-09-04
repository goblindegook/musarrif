import { styled } from 'goober'
import { useEffect, useRef, useState } from 'preact/hooks'
import { Text } from '../atoms/Text'
import { useI18n } from '../hooks/useI18n'
import { encodeFrames } from '../optical-transfer'

const FRAME_INTERVAL_MS = 125

type ToCanvas = (canvas: HTMLCanvasElement, text: string, options: Record<string, unknown>) => Promise<void>

interface OpticalSendProps {
  readonly payload: string
}

export function OpticalSend({ payload }: OpticalSendProps) {
  const { t, dir } = useI18n()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [frames, setFrames] = useState<readonly string[]>([])
  const [index, setIndex] = useState(0)
  const [toCanvas, setToCanvas] = useState<ToCanvas | null>(null)
  const drawQueueRef = useRef<Promise<void>>(Promise.resolve())

  useEffect(() => {
    let cancelled = false
    // setState treats a bare function as an updater, so the loader is wrapped in one.
    import('qrcode').then((module) => !cancelled && setToCanvas(() => module.default.toCanvas as ToCanvas))
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    encodeFrames(payload).then((encoded) => {
      if (cancelled) return
      setFrames(encoded)
      setIndex(0)
    })
    return () => {
      cancelled = true
    }
  }, [payload])

  useEffect(() => {
    if (frames.length < 2) return
    const timer = setInterval(() => setIndex((current) => (current + 1) % frames.length), FRAME_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [frames])

  useEffect(() => {
    const canvas = canvasRef.current
    const frame = frames[index]
    if (canvas == null || frame == null || toCanvas == null) return

    // Draws are queued rather than fired in parallel: without this, a slow earlier draw could
    // resolve after a faster later one and repaint the canvas with a stale frame. The cancelled
    // flag (same shape as the other two effects) lets a superseded draw skip its turn instead of
    // running once it's no longer the current frame.
    let cancelled = false
    drawQueueRef.current = drawQueueRef.current.then(() => {
      if (cancelled) return
      return toCanvas(canvas, frame, {
        errorCorrectionLevel: 'M',
        margin: 2,
        width: 320,
        color: {
          light: '#fbfaf7',
          dark: '#1f1a17',
        },
      }).catch(() => {
        // Swallow so a QR draw failure never surfaces as an unhandled rejection; the canvas
        // simply keeps showing the last successfully drawn frame.
      })
    })

    return () => {
      cancelled = true
    }
  }, [frames, index, toCanvas])

  return (
    <Body dir={dir}>
      <Text>{t('settings.opticalSend.instructions')}</Text>
      {frames.length === 0 && <Text>{t('settings.opticalSend.preparing')}</Text>}
      <CodeFrame>
        <canvas ref={canvasRef} />
      </CodeFrame>
    </Body>
  )
}

const Body = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
`

const CodeFrame = styled('div')`
  display: flex;
  justify-content: center;
  padding: 1rem;
  border-radius: var(--radius);
  background: #fbfaf7;

  & canvas {
    max-width: 100%;
    height: auto;
  }
`
