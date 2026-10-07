import { Stack } from 'expo-router'
import { getCopy, useSystemLanguage } from '../../../i18n/copy'
import { useStackScreenOptions } from '../../../theme/stack-options'

export default function ExerciseStack() {
  const screenOptions = useStackScreenOptions()
  const { t } = getCopy(useSystemLanguage())

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="index" options={{ title: t('tabs.exercises') }} />
      <Stack.Screen name="progress" options={{ title: t('exercise.stats.title') }} />
    </Stack>
  )
}
