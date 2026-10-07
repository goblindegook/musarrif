import type { ReactNode } from 'react'
import { View, type ViewProps } from 'react-native'
import { useThemeTokens } from '../theme/tokens'

export function Surface({ children, style, ...props }: ViewProps & { children: ReactNode }) {
  const theme = useThemeTokens()

  return (
    <View {...props} style={[{ backgroundColor: theme.background }, style]}>
      {children}
    </View>
  )
}
