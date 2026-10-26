import { useCallback, useMemo, useState } from 'preact/hooks'
import { useLocalStorage } from './useLocalStorage'

const TOTAL_STEPS = 5

interface UseTour {
  isOpen: boolean
  step: number
  totalSteps: number
  openTour: () => void
  closeTour: () => void
  nextStep: () => void
}

export function useTour(): UseTour {
  const [tourSeen, setTourSeen] = useLocalStorage<boolean>('tourSeen', false)
  const [step, setStep] = useState<number>(tourSeen ? -1 : 0)

  const openTour = useCallback(() => {
    setStep(0)
  }, [])

  const closeTour = useCallback(() => {
    setTourSeen(true)
    setStep(-1)
  }, [setTourSeen])

  const nextStep = useCallback(() => {
    setStep((current) => {
      if (current >= TOTAL_STEPS - 1) {
        setTourSeen(true)
        return -1
      }
      return current + 1
    })
  }, [setTourSeen])

  return useMemo(
    () => ({
      isOpen: step >= 0,
      step,
      totalSteps: TOTAL_STEPS,
      openTour,
      closeTour,
      nextStep,
    }),
    [closeTour, nextStep, openTour, step],
  )
}
