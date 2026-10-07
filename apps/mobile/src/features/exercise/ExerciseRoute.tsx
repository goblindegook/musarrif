import { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Text } from 'react-native'
import type { Exercise } from '../../../../../src/exercises/exercises'
import type { ExerciseSession as SchedulerSession } from '../../../../../src/exercises/scheduler'
import { nextExercise } from '../../../../../src/exercises/scheduler'
import { showBanner } from '../../../modules/musarrif-apple-services/src/NotificationBanner'
import { Surface } from '../../components/Surface'
import { getCopy, useSystemLanguage } from '../../i18n/copy'
import { readDimensionStore, readSrsStore } from '../../storage/exercise-data'
import { useUserData } from '../../storage/UserDataProvider'
import { useSrsStore } from '../../storage/user-data-hooks'
import { useThemeTokens } from '../../theme/tokens'
import { recordExerciseAnswer } from './answer-progress'
import { ExerciseSession as ExerciseView, type PersistedExerciseAnswer } from './ExerciseSession'

export function ExerciseRoute() {
  const theme = useThemeTokens()
  const { ready, error, store, put } = useUserData()
  const language = useSystemLanguage()
  const { t } = getCopy(language)
  const srsStore = useSrsStore()
  const [exercise, setExercise] = useState<Exercise | null>(null)
  const [persistenceFailed, setPersistenceFailed] = useState(false)
  const schedulerSessionRef = useRef<SchedulerSession>({ reviews: 0, lastNewAt: -3 })

  const pickNext = useCallback(
    (session?: SchedulerSession) => {
      const values = store.getValues()
      setExercise(nextExercise(readDimensionStore(values).profile, readSrsStore(values), session))
    },
    [store],
  )

  useEffect(() => {
    if (ready) pickNext()
  }, [pickNext, ready])

  const persistAnswer = useCallback(
    (answer: PersistedExerciseAnswer) => {
      const progress = recordExerciseAnswer(store.getValues(), answer, new Date())
      if (!progress) return

      void Promise.all(progress.writes.map(([key, value]) => put(key, value)))
        .then(() => setPersistenceFailed(false))
        .catch(() => setPersistenceFailed(true))

      for (const change of progress.dimensionChanges) {
        const items = change.items.map((item) => t(item)).join(', ')
        const dimension = t(`exercise.unlock.dimension.${change.dimension}`)
        showBanner(
          change.type === 'promotion'
            ? { kind: 'success', message: t('exercise.unlock.line', { dimension, items }), color: theme.correct }
            : { kind: 'warning', message: t('exercise.demotion.line', { dimension, items }), color: theme.partial },
        )
      }
      if (progress.streakExtended) {
        showBanner({ kind: 'streak', message: t('exercise.streak.extended'), color: theme.accent })
      }

      if (progress.skipped) return
      const session = schedulerSessionRef.current
      if (progress.wasCovered) session.reviews += 1
      else session.lastNewAt = session.reviews
    },
    [put, store, t, theme],
  )

  const next = useCallback(() => pickNext(schedulerSessionRef.current), [pickNext])

  if (!ready) {
    return (
      <Surface style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        {error ? (
          <Text style={{ color: theme.ink }}>{t('error.library')}</Text>
        ) : (
          <ActivityIndicator accessibilityLabel={t('loading.library')} />
        )}
      </Surface>
    )
  }

  if (exercise == null) {
    return (
      <Surface style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <ActivityIndicator accessibilityLabel={t('loading.exercise')} />
      </Surface>
    )
  }

  const promptTranslation = (key: string, params?: Record<string, string>) => {
    const translatedParams = Object.fromEntries(Object.entries(params ?? {}).map(([name, value]) => [name, t(value)]))
    return t(key, translatedParams).replace(/<\/?strong>/gu, '')
  }

  return (
    <Surface style={{ flex: 1 }}>
      {persistenceFailed ? (
        <Text accessibilityRole="alert" style={{ color: theme.ink, paddingHorizontal: 24, paddingTop: 12 }}>
          {t('exercise.error.save')}
        </Text>
      ) : null}
      <ExerciseView
        exercise={exercise}
        onNext={next}
        onPersistAnswer={persistAnswer}
        srsStore={srsStore}
        translate={t}
        translatePrompt={promptTranslation}
      />
    </Surface>
  )
}
