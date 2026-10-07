import { useThemeTokens } from './tokens'

export function useStackScreenOptions() {
  const theme = useThemeTokens()
  return {
    headerShadowVisible: false,
    headerStyle: { backgroundColor: theme.background },
    headerTintColor: theme.ink,
    contentStyle: { backgroundColor: theme.background },
  }
}
