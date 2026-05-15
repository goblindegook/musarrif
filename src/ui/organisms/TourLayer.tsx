import { styled } from 'goober'
import { useEffect, useRef } from 'preact/hooks'
import { TourTooltip } from '../molecules/TourTooltip'

type TourStepPlacement = 'above' | 'below' | 'center' | 'side'

const TOUR_STEPS: readonly { selector: string | null; placement: TourStepPlacement }[] = [
  { selector: '[data-tour-step="0"]', placement: 'below' },
  { selector: '[data-tour-step="1"]', placement: 'side' },
  { selector: '[data-tour-step="2"]', placement: 'below' },
  { selector: '[data-tour-step="3"]', placement: 'below' },
  { selector: '[data-tour-step="4"]', placement: 'below' },
]

interface TourLayerProps {
  isOpen: boolean
  step: number
  totalSteps: number
  onNext: () => void
  onSkip: () => void
}

export const TourLayer = ({ isOpen, step, totalSteps, onNext, onSkip }: TourLayerProps) => {
  const priorFocusedRef = useRef<HTMLElement | null>(null)
  const config = step >= 0 ? (TOUR_STEPS[step] ?? null) : null

  useEffect(() => {
    if (!isOpen) return
    priorFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    return () => {
      priorFocusedRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onSkip()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onSkip])

  useEffect(() => {
    clearTourStyles()

    const selector = config?.selector
    if (!isOpen || selector == null) return
    const target = document.querySelector(selector)
    if (!(target instanceof HTMLElement)) return

    const header = document.querySelector<HTMLElement>('header')
    if (header?.contains(target)) {
      return raiseHeaderTargetAboveOverlay(header, target)
    }

    target.dataset.tourHighlighted = 'true'
    target.dataset.tourPrevZ = target.style.zIndex
    target.style.zIndex = '102'

    return () => {
      target.style.zIndex = target.dataset.tourPrevZ ?? ''
      delete target.dataset.tourHighlighted
      delete target.dataset.tourPrevZ
    }
  }, [isOpen, config?.selector])

  if (!isOpen || step < 0 || config == null) return null

  return (
    <>
      <Overlay />
      <TourTooltip
        step={step}
        totalSteps={totalSteps}
        placement={config.placement}
        targetSelector={config.selector}
        onNext={onNext}
        onSkip={onSkip}
      />
    </>
  )
}

// FIXME: use ::backdrop
const Overlay = styled('div')`
  position: fixed;
  inset: 0;
  z-index: 101;
  background: var(--color-overlay);
  backdrop-filter: blur(2px);
  pointer-events: none;
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`

function clearTourStyles() {
  const highlighted = Array.from(document.querySelectorAll<HTMLElement>('[data-tour-highlighted="true"]'))
  highlighted.forEach((node) => {
    node.style.zIndex = node.dataset.tourPrevZ ?? ''
    delete node.dataset.tourHighlighted
    delete node.dataset.tourPrevZ
  })

  const raisedHeaders = Array.from(document.querySelectorAll<HTMLElement>('[data-tour-header-raised="true"]'))
  raisedHeaders.forEach((header) => {
    header.style.zIndex = header.dataset.tourPrevZ ?? ''
    delete header.dataset.tourPrevZ
    delete header.dataset.tourHeaderRaised
  })

  const raisedTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-tour-target-raised="true"]'))
  raisedTargets.forEach((target) => {
    target.style.zIndex = target.dataset.tourPrevZ ?? ''
    delete target.dataset.tourPrevZ
    delete target.dataset.tourTargetRaised
  })
}

function raiseHeaderTargetAboveOverlay(header: HTMLElement, target: HTMLElement) {
  header.dataset.tourHeaderRaised = 'true'
  header.dataset.tourPrevZ = header.style.zIndex
  header.style.zIndex = '102'

  // FIXME: Should not raise all the header buttons
  target.dataset.tourTargetRaised = 'true'
  target.dataset.tourPrevZ = target.style.zIndex
  target.style.zIndex = '104'

  return () => {
    header.style.zIndex = header.dataset.tourPrevZ ?? ''
    target.style.zIndex = target.dataset.tourPrevZ ?? ''
    delete header.dataset.tourHeaderRaised
    delete header.dataset.tourPrevZ
    delete target.dataset.tourTargetRaised
    delete target.dataset.tourPrevZ
  }
}
