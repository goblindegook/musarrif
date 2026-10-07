import { Button, Text } from '@expo/ui/swift-ui'
import {
  accessibilityLabel,
  background,
  buttonStyle,
  clipShape,
  font,
  foregroundStyle,
  frame,
  opacity,
} from '@expo/ui/swift-ui/modifiers'
import { useThemeTokens } from '../theme/tokens'

/** Must sit inside a `Host`. */
export function ChoiceButton({
  accessibilityLabel: label,
  dim = false,
  fontSize = 20,
  minHeight,
  onPress,
  selected = false,
  shape = 'roundedRectangle',
  testID,
  text,
}: {
  accessibilityLabel: string
  dim?: boolean
  fontSize?: number
  minHeight: number
  onPress: () => void
  selected?: boolean
  shape?: 'capsule' | 'circle' | 'roundedRectangle'
  testID: string
  text: string
}) {
  const theme = useThemeTokens()
  return (
    <Button modifiers={[buttonStyle('plain'), accessibilityLabel(label)]} onPress={onPress} testID={testID}>
      <Text
        modifiers={[
          font({ size: fontSize, weight: selected ? 'semibold' : 'regular' }),
          foregroundStyle(theme.ink),
          frame({ maxWidth: 10000, minHeight }),
          background(selected ? theme.selectedFill : theme.fill),
          clipShape(shape, 12),
          opacity(dim && !selected ? 0.5 : 1),
        ]}
      >
        {text}
      </Text>
    </Button>
  )
}
