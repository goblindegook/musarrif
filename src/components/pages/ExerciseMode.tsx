import { css, styled } from 'goober'
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks'
import type { DimensionProfile } from '../../exercises/dimensions'
import type { Exercise } from '../../exercises/exercises'
import { isCoveredTriple, type NewCardSession, nextExercise } from '../../exercises/scheduler'
import type { SrsStore } from '../../exercises/srs'
import type { DayStats, SerializedDayStats } from '../../exercises/stats'
import {
  addPass,
  addResult,
  deserializeDayStats,
  getStreak,
  getStreakGoalProgress,
  serializeDayStats,
} from '../../exercises/stats'
import { useDimensionStore } from '../../hooks/useDimensionStore'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { useI18n } from '../../hooks/useI18n'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useSrsStore } from '../../hooks/useSrsStore'
import { renderExplanation } from '../../paradigms/explanation'
import { Button } from '../atoms/Button'
import { FormattedText } from '../atoms/FormattedText'
import { Text } from '../atoms/Text'
import { ExerciseAnswerArea } from '../molecules/ExerciseAnswerArea'
import { ShortcutButton } from '../molecules/ShortcutButton'
import { ExerciseStats } from '../organisms/ExerciseStats'

type Props = {
  generateExercise?: (profile: DimensionProfile, srsStore: SrsStore, session: NewCardSession) => Exercise
}

export function ExerciseMode({ generateExercise = nextExercise }: Props) {
  const { dir, lang, t } = useI18n()
  const [dimensionProfile, dimensionUnlocks, recordDimensionAnswer, clearDimensionUnlocks] = useDimensionStore()
  const [srsStore, recordSrsAnswer] = useSrsStore()
  const sessionRef = useRef<NewCardSession>({ reviews: 0, lastNewAt: -3 })
  const [exercise, setExercise] = useState<Exercise>(() =>
    generateExercise(dimensionProfile, srsStore, sessionRef.current),
  )
  const [answeredIndex, setAnsweredIndex] = useState<number | null>(null)
  const [skipped, setSkipped] = useState(false)
  const [streakExtendedAlert, setStreakExtendedAlert] = useState(false)
  const [rawStats, setRawStats] = useLocalStorage<SerializedDayStats[]>('exercise:daily', [])

  useDocumentTitle([t('mode.exercise'), t('title')].join(' · '))

  const storedStats: DayStats[] = useMemo(() => deserializeDayStats(rawStats), [rawStats])
  const updateStats = useCallback(
    (updater: (current: DayStats[]) => DayStats[]) => {
      setRawStats((raw) => serializeDayStats(updater(deserializeDayStats(raw))))
    },
    [setRawStats],
  )
  const loadNextExercise = useCallback(
    (profile: DimensionProfile) => {
      setExercise(generateExercise(profile, srsStore, sessionRef.current))
      setAnsweredIndex(null)
      setSkipped(false)
      clearDimensionUnlocks()
      setStreakExtendedAlert(false)
    },
    [generateExercise, srsStore, clearDimensionUnlocks],
  )

  const isAnswered = answeredIndex !== null || skipped
  const streak = getStreak(storedStats)

  const explanation = (() => {
    if (answeredIndex == null && !skipped) return []
    const selectedExplanation =
      skipped || answeredIndex == null
        ? exercise.explanations?.find((_, index) => index !== exercise.answer)
        : exercise.explanations?.[answeredIndex]
    return selectedExplanation != null ? renderExplanation(selectedExplanation, t) : []
  })()
  const unlockMessages = useMemo(
    () =>
      dimensionUnlocks.map(({ dimension, items }) =>
        t('exercise.unlock.line', {
          dimension: t(`exercise.unlock.dimension.${dimension}`),
          items: items.map((item) => t(item)).join(', '),
        }),
      ),
    [dimensionUnlocks, t],
  )

  const handleAnswer = useCallback(
    (index: number, isCorrect: boolean) => {
      if (isCoveredTriple(exercise.cardKey, srsStore)) {
        sessionRef.current = { ...sessionRef.current, reviews: sessionRef.current.reviews + 1 }
      } else {
        sessionRef.current = { ...sessionRef.current, lastNewAt: sessionRef.current.reviews }
      }
      const nextStats = addResult(storedStats, isCorrect)
      const previousStreakGoal = getStreakGoalProgress(storedStats)
      const nextStreakGoal = getStreakGoalProgress(nextStats)
      setAnsweredIndex(index)
      updateStats(() => nextStats)
      recordSrsAnswer(exercise.cardKey, isCorrect ? 'correct' : 'wrong')
      recordDimensionAnswer(exercise.dimensions, isCorrect)
      setStreakExtendedAlert(isCorrect && previousStreakGoal.remaining > 0 && nextStreakGoal.remaining === 0)
    },
    [exercise, srsStore, storedStats, updateStats, recordSrsAnswer, recordDimensionAnswer],
  )

  const handleSkip = useCallback(() => {
    recordSrsAnswer(exercise.cardKey, 'pass')
    updateStats((s) => addPass(s))
    setSkipped(true)
  }, [exercise, srsStore, recordSrsAnswer, updateStats])

  useEffect(() => {
    if (!isAnswered) return
    const nextButton = document.querySelector('button[autofocus]')
    if (nextButton instanceof HTMLButtonElement) nextButton.focus()
  }, [isAnswered])

  return (
    <ExerciseLayout>
      <ExerciseCard>
        <VerbDisplay lang="ar" dir="rtl">
          {exercise.word}
        </VerbDisplay>
        <FormattedText
          className={PROMPT_CLASS}
          text={t(
            exercise.promptTranslationKey,
            exercise.promptParams &&
              Object.fromEntries(Object.entries(exercise.promptParams).map(([k, v]) => [k, t(v)])),
          )}
        />
        <ExerciseAnswerArea exercise={exercise} forceReveal={skipped} onAnswer={handleAnswer} />
        <ExplanationWrapper visible={explanation.length > 0}>
          <ExplanationInner>
            {explanation.length > 0 && (
              <Explanation lang={lang} dir={dir}>
                {explanation.map((paragraph, index) => (
                  <Text key={`${index}-${paragraph}`}>{paragraph}</Text>
                ))}
              </Explanation>
            )}
          </ExplanationInner>
        </ExplanationWrapper>
        {isAnswered ? (
          <>
            {(unlockMessages.length > 0 || streakExtendedAlert) && (
              <Alerts>
                {unlockMessages.map((message, index) => (
                  <SuccessAlert
                    key={`${exercise.cardKey}-unlock-${index}`}
                    role="status"
                    aria-live="polite"
                    lang={lang}
                    dir={dir}
                  >
                    <Text>{message}</Text>
                  </SuccessAlert>
                ))}
                {streakExtendedAlert && (
                  <StreakAlert
                    key={`${exercise.cardKey}-streak`}
                    role="status"
                    aria-live="polite"
                    lang={lang}
                    dir={dir}
                  >
                    <Text>{t('exercise.streak.extended')}</Text>
                  </StreakAlert>
                )}
              </Alerts>
            )}

            <Button autoFocus variant="primary" onClick={() => loadNextExercise(dimensionProfile)}>
              {t('exercise.next')}
            </Button>
          </>
        ) : (
          <ShortcutButton shortcutKey={'s'} onClick={handleSkip}>
            {t('exercise.pass')}
          </ShortcutButton>
        )}
      </ExerciseCard>

      <ExerciseStats stats={storedStats} streak={streak} dimensionProfile={dimensionProfile} srsStore={srsStore} />
    </ExerciseLayout>
  )
}

const ExerciseLayout = styled('div')`
  width: 100%;
  max-width: 480px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ExerciseCard = styled('div')`
  background: var(--color-bg-surface);
  border-radius: 1.5rem;
  padding: 0.75rem;
  width: 100%;
  box-shadow: var(--shadow-elevated);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  @media (min-width: 480px) {
    padding: 1rem 1.25rem;
  }
`

const VerbDisplay = styled('p')`
  margin: 0;
  font-size: clamp(2.5rem, 10vw, 4rem);
  font-weight: 700;
  color: var(--color-text-primary);
  text-align: center;
  line-height: 1.2;
  direction: rtl;
  padding: 2rem 0 1rem;
`

const PROMPT_CLASS = css`
  margin: 0;
  font-size: 1rem;
  color: var(--color-text-secondary);
  text-align: center;
`

const ExplanationWrapper = styled('div')<{ visible: boolean }>`
  display: grid;
  grid-template-rows: ${({ visible }) => (visible ? '1fr' : '0fr')};
  margin-block-start: ${({ visible }) => (visible ? '0' : '-1.5rem')};
  transition: ${({ visible }) =>
    visible
      ? 'grid-template-rows 320ms cubic-bezier(0.25, 1, 0.5, 1), margin-block-start 320ms cubic-bezier(0.25, 1, 0.5, 1)'
      : 'none'};
  width: 100%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const ExplanationInner = styled('div')`
  min-height: 0;
  overflow: hidden;
`

const Explanation = styled('aside')`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: start;
  padding: 0.5rem 0;
`

const Alerts = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: start;
  gap: 0.5rem;
`

const SuccessAlert = styled('aside')`
  background: var(--color-success-bg);
  border: 2px solid var(--color-success-border);
  color: var(--color-success-text);
  border-radius: 0.75rem;
  padding: 0.625rem 0.75rem;
  animation: alert-in 320ms cubic-bezier(0.25, 1, 0.5, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const StreakAlert = styled('aside')`
  background: var(--color-streak-bg);
  border: 2px solid var(--color-accent);
  color: var(--color-streak-text);
  border-radius: 0.75rem;
  padding: 0.625rem 0.75rem;
  animation: streak-in 380ms cubic-bezier(0.25, 1, 0.5, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`
