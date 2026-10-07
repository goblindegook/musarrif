import { useWindowDimensions } from 'react-native'

/** Grows a fixed-height SwiftUI host with the user's text size, so text set in a text style is not clipped. */
export function useScaledSize(points: number): number {
  return points * Math.min(useWindowDimensions().fontScale, 1.6)
}
