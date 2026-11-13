import { useEffect } from 'preact/hooks'
import { Overlay } from '../atoms/Overlay'
import { type Translate, useI18n } from '../hooks/useI18n'
import { type TourStepPlacement, TourTooltip } from '../molecules/TourTooltip'

interface TourStep {
  selector: string | null
  placement: TourStepPlacement
  title: (t: Translate) => string
  body: (t: Translate) => string
}

const TOUR_STEPS: readonly TourStep[] = [
  {
    selector: '[data-tour-step="0"]',
    placement: 'below',
    title: (t) => t('tour.step.0.title'),
    body: (t) => t('tour.step.0.body'),
  },
  {
    selector: '[data-tour-step="1"]',
    placement: 'side',
    title: (t) => t('tour.step.1.title'),
    body: (t) => t('tour.step.1.body'),
  },
  {
    selector: '[data-tour-step="2"]',
    placement: 'below',
    title: (t) => t('tour.step.2.title'),
    body: (t) => t('tour.step.2.body'),
  },
  {
    selector: '[data-tour-step="3"]',
    placement: 'below',
    title: (t) => t('tour.step.3.title'),
    body: (t) => t('tour.step.3.body'),
  },
  {
    selector: '[data-tour-step="4"]',
    placement: 'below',
    title: (t) => t('tour.step.4.title'),
    body: (t) => t('tour.step.4.body'),
  },
]

interface TourLayerProps {
  isOpen: boolean
  step: number
  totalSteps: number
  onNext: () => void
  onSkip: () => void
}

export const TourLayer = ({ isOpen, step, totalSteps, onNext, onSkip }: TourLayerProps) => {
  const { t } = useI18n()
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
    target.scrollIntoView({ block: 'nearest' })

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
      <Overlay zIndex={101} />
      <TourTooltip
        step={step}
        totalSteps={totalSteps}
        title={config.title(t)}
        body={config.body(t)}
        placement={config.placement}
        targetSelector={config.selector}
        onNext={onNext}
        onSkip={onSkip}
      />
    </>
  )
}

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
