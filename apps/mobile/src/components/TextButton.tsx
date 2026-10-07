import { Button, Host, Text } from '@expo/ui/swift-ui'
import {
  accessibilityLabel as accessibilityLabelModifier,
  buttonStyle,
  font,
  foregroundStyle,
  frame,
} from '@expo/ui/swift-ui/modifiers'
import { useScaledSize } from '../theme/dynamic-type'
import { useThemeTokens } from '../theme/tokens'

export function TextButton({
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
  const height = useScaledSize(44)
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
            foregroundStyle(theme.accent),
            frame({ maxWidth: 10000, minHeight: height }),
          ]}
        >
          {children}
        </Text>
      </Button>
    </Host>
  )
}
