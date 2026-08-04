import { styled } from 'goober'
import { forwardRef } from 'preact/compat'
import { useEffect, useRef, useState } from 'preact/hooks'
import { ProgressBar } from '../atoms/ProgressBar'
import { Text } from '../atoms/Text'
import { useI18n } from '../hooks/useI18n'
import { collectFrame, EMPTY_COLLECTOR, isComplete, reassembleFrames } from '../optical-transfer'

interface OpticalReceiveProps {
  readonly onComplete: (json: string) => void
}

export function OpticalReceive({ onComplete }: OpticalReceiveProps) {
  const { t, dir } = useI18n()
  const [video, setVideo] = useState<HTMLVideoElement | null>(null)
  const [collector, setCollector] = useState(EMPTY_COLLECTOR)
  const [cameraFailed, setCameraFailed] = useState(false)
  // Tracks the digest of the last transfer that actually completed. Unlike collector state, this
  // must survive the EMPTY_COLLECTOR reset below: the sender has no acknowledgment channel and
  // loops its frames forever, so the still-live scanner keeps refilling the emptied collector with
  // the same digest after onComplete fires. Without this latch, that repeat capture would complete
  // again and re-invoke onComplete with the same JSON roughly one sender loop cycle later.
  const lastCompletedDigestRef = useRef<string | null>(null)

  useEffect(() => {
    if (video == null) return
    let cancelled = false
    let controls: { stop: () => void } | undefined

    import('@zxing/browser')
      .then(({ BrowserQRCodeReader }) =>
        new BrowserQRCodeReader(undefined, {
          delayBetweenScanAttempts: 0,
          delayBetweenScanSuccess: 0,
        }).decodeFromConstraints({ video: { facingMode: 'environment' } }, video, (result) => {
          // The scanner is a third party's async loop; its stop() call isn't guaranteed to suppress
          // an in-flight callback, so correctness of "no updates after cleanup" must live here too.
          if (!cancelled && result != null) setCollector((current) => collectFrame(current, result.getText()))
        }),
      )
      .then((started) => {
        if (cancelled) started?.stop()
        else controls = started
      })
      .catch(() => !cancelled && setCameraFailed(true))

    return () => {
      cancelled = true
      controls?.stop()
    }
  }, [video])

  useEffect(() => {
    if (!isComplete(collector)) return
    let cancelled = false
    const digest = collector.digest
    reassembleFrames(collector).then((json) => {
      if (cancelled) return
      // Reset unconditionally — on failure this is what lets a mismatched capture start over
      // instead of stalling; on success it's what lets a genuinely new transfer complete later.
      // Re-fire prevention for the *same* transfer is the digest latch below, not this reset.
      setCollector(EMPTY_COLLECTOR)
      if (json != null && digest !== lastCompletedDigestRef.current) {
        lastCompletedDigestRef.current = digest
        onComplete(json)
      }
    })
    return () => {
      cancelled = true
    }
  }, [collector, onComplete])

  return (
    <Body dir={dir}>
      <Text>{t('settings.opticalReceive.instructions')}</Text>
      {cameraFailed && <Text>{t('settings.opticalReceive.cameraError')}</Text>}
      <Preview ref={setVideo} muted autoPlay playsInline />
      {collector.total > 0 && (
        <>
          <ProgressBar value={collector.chunks.size} max={collector.total} />
          <Text>
            {t('settings.opticalReceive.progress', {
              received: String(collector.chunks.size),
              total: String(collector.total),
            })}
          </Text>
        </>
      )}
    </Body>
  )
}

const Body = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
`

const Preview = styled('video', forwardRef)`
  width: 100%;
  max-height: 60vh;
  border-radius: 0.75rem;
  background: var(--color-bg-surface-secondary);
`
