import { styled } from 'goober'
import { forwardRef } from 'preact/compat'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks'
import { clamp } from '../../primitives/numbers'
import { Button } from '../atoms/Button'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { useI18n } from '../hooks/useI18n'

export type TourStepPlacement = 'above' | 'below' | 'center' | 'side'

interface TourTooltipProps {
  step: number
  totalSteps: number
  placement: TourStepPlacement
  targetSelector: string | null
  onNext: () => void
  onSkip: () => void
}

const GAP = 12
const WIDTH = 320
const DESKTOP_BREAKPOINT = 960

type ArrowPlacement = 'top' | 'bottom' | 'right'

type PositionResult = {
  top: number
  left: number
  arrowPlacement: ArrowPlacement
  containerTransform?: string
}

export const TourTooltip = ({ step, totalSteps, placement, targetSelector, onNext, onSkip }: TourTooltipProps) => {
  const { t } = useI18n()
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<PositionResult | null>(null)

  const isFinal = step === totalSteps - 1

  const updatePosition = useCallback(() => {
    const target = targetSelector ? document.querySelector(targetSelector) : null

    if (placement === 'center' || !(target instanceof HTMLElement)) {
      setPosition(null)
      return
    }

    const rect = target.getBoundingClientRect()

    if (placement === 'side' && window.innerWidth >= DESKTOP_BREAKPOINT) {
      // FIXME: should appear on the left for RTL languages
      setPosition({
        top: Math.max(12, rect.top + 8),
        left: Math.max(12, rect.left - WIDTH - 8),
        arrowPlacement: 'right',
      })
      return
    }

    const left = clamp(rect.left + rect.width / 2 - WIDTH / 2, GAP, window.innerWidth - WIDTH - GAP)

    if (placement === 'below') {
      setPosition({ top: rect.bottom + GAP, left, arrowPlacement: 'top' })
    } else if (rect.top < 180) {
      setPosition({ top: rect.top + GAP, left, arrowPlacement: 'top' })
    } else {
      setPosition({
        top: rect.top - GAP,
        left,
        arrowPlacement: 'bottom',
        containerTransform: 'translateY(-100%)',
      })
    }
  }, [placement, targetSelector])

  useLayoutEffect(() => updatePosition(), [updatePosition])

  useEffect(() => {
    if (placement === 'center') return
    const controller = new AbortController()
    window.addEventListener('scroll', updatePosition, { passive: true, capture: true, signal: controller.signal })
    window.addEventListener('resize', updatePosition, { passive: true, signal: controller.signal })
    return () => controller.abort()
  }, [placement, updatePosition])

  useLayoutEffect(() => {
    const node = containerRef.current
    if (!node) return
    try {
      node.showPopover?.()
    } catch {}
  }, [step])

  useEffect(() => {
    return () => {
      try {
        containerRef.current?.hidePopover?.()
      } catch {}
    }
  }, [])

  useEffect(() => document.querySelector<HTMLElement>('[data-tour-primary]')?.focus(), [step])

  return (
    <Container
      ref={containerRef}
      popover="manual"
      role="dialog"
      aria-label={t(`tour.step.${step}.title`)}
      style={
        position
          ? {
              top: `${position.top}px`,
              left: `${position?.left ?? 16}px`,
              transform: position?.containerTransform,
            }
          : { inset: '50% auto auto 50%', transform: 'translate(-50%, -50%)' }
      }
    >
      <Card>
        {position != null && <Arrow placement={position.arrowPlacement} />}
        <CardHeader>
          <Heading>{t(`tour.step.${step}.title`)}</Heading>
          {/* FIXME: accessible indicator */}
          <Dots aria-hidden="true">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <Dot key={String(index)} active={index <= step} />
            ))}
          </Dots>
        </CardHeader>
        <Text>{t(`tour.step.${step}.body`)}</Text>
        <Actions>
          {isFinal ? (
            <Button data-tour-primary size="compact" variant="primary" onClick={onNext}>
              {t('tour.done')}
            </Button>
          ) : (
            <>
              <Button data-tour-skip size="compact" onClick={onSkip}>
                {t('tour.skip')}
              </Button>
              <Button data-tour-primary size="compact" variant="primary" onClick={onNext}>
                {t('tour.next')}
              </Button>
            </>
          )}
        </Actions>
      </Card>
    </Container>
  )
}

const Container = styled('div', forwardRef)`
  position: fixed;
  inset: auto;
  z-index: 200;
  border: none;
  padding: 0;
  margin: 0;
  background: transparent;
  overflow: visible;
`

const Card = styled('div')`
  position: relative;
  border: 1px solid var(--color-border);
  background: var(--color-bg-surface);
  border-radius: 1rem;
  box-shadow: var(--shadow-elevated);
  padding: 1rem;
  width: min(320px, calc(100vw - 24px));
  animation: tourEnter 150ms ease-out;
  gap: 1rem;
  display: flex;
  flex-direction: column;

  @keyframes tourEnter {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Arrow = styled('div')<{ placement: ArrowPlacement }>`
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--color-bg-surface);
  transform: rotate(45deg);
  ${({ placement }) => {
    if (placement === 'top')
      return 'top: -5px; left: calc(50% - 5px); border-top: 1px solid var(--color-border); border-left: 1px solid var(--color-border);'
    if (placement === 'bottom')
      return 'bottom: -5px; left: calc(50% - 5px); border-right: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);'
    return 'right: -5px; top: 20px; border-top: 1px solid var(--color-border); border-right: 1px solid var(--color-border);'
  }}
`

const CardHeader = styled('div')`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
`

const Dots = styled('div')`
  display: flex;
  gap: 0.35rem;
  flex-shrink: 0;
  align-self: center;
`

const Dot = styled('span')<{ active: boolean }>`
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: ${({ active }) => (active ? 'var(--color-accent)' : 'var(--color-border)')};
`

const Actions = styled('div')`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;

  & > :only-child {
    margin-inline-start: auto;
  }
`
