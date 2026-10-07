import { Button, Host, Text } from '@expo/ui/swift-ui'
import {
  accessibilityLabel as accessibilityLabelModifier,
  background,
  buttonStyle,
  clipShape,
  font,
  foregroundStyle,
  frame,
} from '@expo/ui/swift-ui/modifiers'
import { useScaledSize } from '../theme/dynamic-type'
import { useThemeTokens } from '../theme/tokens'

export function SecondaryButton({
  accessibilityLabel,
  children,
  onPress,
  testID,
}: {
  accessibilityLabel: string
  children: string
  onPress: () => void
  testID?: string
}) {
  const theme = useThemeTokens()
  const height = useScaledSize(52)
  return (
    <Host seedColor={theme.accent} style={{ height: height, width: '100%' }}>
      <Button
        modifiers={[buttonStyle('plain'), accessibilityLabelModifier(accessibilityLabel)]}
        onPress={onPress}
        testID={testID}
      >
        <Text
          modifiers={[
            font({ textStyle: 'headline' }),
            foregroundStyle(theme.ink),
            frame({ maxWidth: 10000, minHeight: height }),
            background(theme.fill),
            clipShape('capsule'),
          ]}
        >
          {children}
        </Text>
      </Button>
    </Host>
  )
}
