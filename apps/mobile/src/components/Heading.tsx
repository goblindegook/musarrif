import { Text as SwiftText } from '@expo/ui/swift-ui'
import { font, foregroundStyle, kerning, textCase } from '@expo/ui/swift-ui/modifiers'
import type { ReactNode } from 'react'
import { Text } from 'react-native'
import { useThemeTokens } from '../theme/tokens'

export const CAPS_TRACKING = 1

export function Heading({ children }: { children: ReactNode }) {
  const theme = useThemeTokens()
  return (
    <Text
      accessibilityRole="header"
      style={{
        color: theme.inkSecondary,
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: CAPS_TRACKING,
        textTransform: 'uppercase',
      }}
    >
      {children}
    </Text>
  )
}

export function FormSectionHeading({ children }: { children: string }) {
  const theme = useThemeTokens()
  return (
    <SwiftText
      modifiers={[
        font({ size: 13, weight: 'bold' }),
        foregroundStyle(theme.inkSecondary),
        textCase('uppercase'),
        kerning(CAPS_TRACKING),
      ]}
    >
      {children}
    </SwiftText>
  )
}
