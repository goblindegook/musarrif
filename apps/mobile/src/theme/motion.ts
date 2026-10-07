import { useEffect, useState } from 'react'
import { AccessibilityInfo } from 'react-native'

function getMotionDuration(durationMs: number, reduceMotion = true): number {
  return reduceMotion ? 0 : durationMs
}

export function useMotionDuration(durationMs: number): number {
  const [reduceMotion, setReduceMotion] = useState(true)

  useEffect(() => {
    let active = true
    void AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (active) setReduceMotion(enabled)
    })
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion)

    return () => {
      active = false
      subscription.remove()
    }
  }, [])

  return getMotionDuration(durationMs, reduceMotion)
}
