import { Stack, useRouter } from 'expo-router'
import { ExerciseRoute } from '../../../features/exercise/ExerciseRoute'
import { getCopy, useSystemLanguage } from '../../../i18n/copy'
import { useThemeTokens } from '../../../theme/tokens'

export default function ExerciseTab() {
  const router = useRouter()
  const theme = useThemeTokens()
  const { t } = getCopy(useSystemLanguage())
  return (
    <>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          accessibilityLabel={t('exercise.stats.title')}
          icon="chart.bar.xaxis"
          onPress={() => router.push('/exercise/progress')}
          tintColor={theme.accent}
        />
      </Stack.Toolbar>
      <ExerciseRoute />
    </>
  )
}
