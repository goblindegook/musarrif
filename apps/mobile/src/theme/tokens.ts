import { type ColorSchemeName, useColorScheme } from 'react-native'

export type ThemeTokens = {
  background: string
  surface: string
  surfaceSecondary: string
  fill: string
  segmentedTrack: string
  selectedFill: string
  ink: string
  inkSecondary: string
  inkMuted: string
  accent: string
  border: string
  onAccent: string
  correct: string
  partial: string
  wrong: string
  insight: {
    radical: string
    measure: string
    particle: string
    agreement: string
    elided: string
  }
}

const lightTokens: ThemeTokens = {
  background: '#f6f3ec',
  surface: '#fbfaf7',
  surfaceSecondary: '#f0ece2',
  fill: '#e9e5dc',
  // Pre-compensated: the system segmented track tints its background grey, and this lands it on surfaceSecondary.
  segmentedTrack: '#fffcef',
  // Matches the selected segment of a native segmented control.
  selectedFill: '#ffffff',
  ink: '#1f1a17',
  inkSecondary: '#5b5147',
  inkMuted: '#6f665c',
  accent: '#a32b18',
  border: '#969085',
  onAccent: '#fbfaf7',
  correct: '#2f7d4f',
  partial: '#a8650c',
  wrong: '#b3261e',
  insight: {
    radical: '#1f5fbf',
    measure: '#b36200',
    particle: '#1d7a2c',
    agreement: '#c0206f',
    elided: '#9a9285',
  },
}

const darkTokens: ThemeTokens = {
  background: '#17140f',
  surface: '#211d16',
  surfaceSecondary: '#1c1812',
  fill: '#2d281f',
  segmentedTrack: '#000000',
  selectedFill: '#4a4336',
  ink: '#f2ede2',
  inkSecondary: '#a2988a',
  inkMuted: '#968c7e',
  accent: '#e8705a',
  border: '#726855',
  onAccent: '#17140f',
  correct: '#6cc08b',
  partial: '#e0a050',
  wrong: '#f2776d',
  insight: {
    radical: '#6fa3ff',
    measure: '#f2b440',
    particle: '#6fdc6f',
    agreement: '#ff7eb6',
    elided: '#c9c2b4',
  },
}

function getThemeTokens(colorScheme: ColorSchemeName | null): ThemeTokens {
  return colorScheme === 'dark' ? darkTokens : lightTokens
}

export function useThemeTokens(): ThemeTokens {
  return getThemeTokens(useColorScheme())
}
