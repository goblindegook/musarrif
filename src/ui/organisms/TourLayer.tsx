import { styled } from 'goober'
import { useEffect } from 'preact/hooks'
import { type TourStepPlacement, TourTooltip } from '../molecules/TourTooltip'

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
  const config = step >= 0 ? (TOUR_STEPS[step] ?? null) : null

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
      header.dataset.tourRaised = 'true'
      setZIndex(header, 102)

      // FIXME: Should not raise all the header buttons
      target.dataset.tourRaised = 'true'
      setZIndex(target, 104)

      return () => {
        delete header.dataset.tourRaised
        delete target.dataset.tourRaised
        restoreZIndex(header)
        restoreZIndex(target)
      }
    }

    target.dataset.tourHighlighted = 'true'
    setZIndex(target, 102)

    return () => {
      delete target.dataset.tourHighlighted
      restoreZIndex(target)
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
  Array.from(document.querySelectorAll<HTMLElement>('[data-tour-highlighted="true"]')).forEach((node) => {
    delete node.dataset.tourHighlighted
    restoreZIndex(node)
  })

  Array.from(document.querySelectorAll<HTMLElement>('[data-tour-raised="true"]')).forEach((node) => {
    delete node.dataset.tourRaised
    restoreZIndex(node)
  })
}

function setZIndex(element: HTMLElement, value: number) {
  element.dataset.tourPrevZ = element.style.zIndex
  element.style.zIndex = String(value)
}

function restoreZIndex(element: HTMLElement) {
  element.style.zIndex = element.dataset.tourPrevZ ?? ''
  delete element.dataset.tourPrevZ
}
