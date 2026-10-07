import { Stack } from 'expo-router'
import { getCopy, useSystemLanguage } from '../../../i18n/copy'
import { useStackScreenOptions } from '../../../theme/stack-options'

export default function SettingsStack() {
  const screenOptions = useStackScreenOptions()
  const { t } = getCopy(useSystemLanguage())

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="index" options={{ title: t('settings.title') }} />
    </Stack>
  )
}
