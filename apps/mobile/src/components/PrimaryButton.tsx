import { Button, Host, Text } from '@expo/ui/swift-ui'
import {
  accessibilityLabel as accessibilityLabelModifier,
  buttonStyle,
  controlSize,
  font,
  foregroundStyle,
  frame,
  opacity,
  tint,
} from '@expo/ui/swift-ui/modifiers'
import { View } from 'react-native'
import { useScaledSize } from '../theme/dynamic-type'
import { useThemeTokens } from '../theme/tokens'

type PrimaryButtonProps = {
  accessibilityLabel: string
  children: string
  disabled?: boolean
  onPress?: () => void
  testID?: string
}

export function PrimaryButton({ accessibilityLabel, children, disabled = false, onPress, testID }: PrimaryButtonProps) {
  const theme = useThemeTokens()

  return (
    <View
      accessibilityLabel={disabled ? accessibilityLabel : undefined}
      accessibilityRole={disabled ? 'button' : undefined}
      accessibilityState={disabled ? { disabled: true } : undefined}
      accessible={disabled}
    >
      <Host seedColor={theme.accent} style={{ height: useScaledSize(52), width: '100%' }}>
        <Button
          modifiers={[
            buttonStyle('glassProminent'),
            controlSize('large'),
            tint(theme.ink),
            ...(disabled ? [opacity(0.4)] : []),
            accessibilityLabelModifier(accessibilityLabel),
          ]}
          onPress={disabled ? undefined : onPress}
          testID={testID}
        >
          <Text
            modifiers={[
              font({ textStyle: 'headline' }),
              foregroundStyle(theme.selectedFill),
              frame({ maxWidth: 10000 }),
            ]}
          >
            {children}
          </Text>
        </Button>
      </Host>
    </View>
  )
}
