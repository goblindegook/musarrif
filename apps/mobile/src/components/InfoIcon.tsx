import { SymbolView } from 'expo-symbols'
import { View } from 'react-native'
import { useThemeTokens } from '../theme/tokens'

export function InfoIcon() {
  const theme = useThemeTokens()
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: theme.fill,
        borderRadius: 11,
        height: 22,
        justifyContent: 'center',
        width: 22,
      }}
    >
      <SymbolView name="info" size={12} tintColor={theme.ink} type="monochrome" weight="bold" />
    </View>
  )
}
