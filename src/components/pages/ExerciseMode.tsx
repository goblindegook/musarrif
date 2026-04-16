import { css, styled } from 'goober'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import type { DimensionProfile } from '../../exercises/dimensions'
import type { Exercise } from '../../exercises/exercises'
import { randomExercise } from '../../exercises/random'
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
import { useDimensionStore } from '../../hooks/dimension-store'
import { useI18n } from '../../hooks/i18n'
import { useLocalStorage } from '../../hooks/local-storage'
import { useSrsStore } from '../../hooks/srs-store'
import { renderExplanation } from '../../paradigms/explanation'
import { Button } from '../atoms/Button'
import { FormattedText } from '../atoms/FormattedText'
import { Text } from '../atoms/Text'
import { ShortcutButton } from '../molecules/ShortcutButton'
import { ExerciseStats } from '../organisms/ExerciseStats'

type Props = {
  generateExercise?: (profile: DimensionProfile, srsStore: SrsStore) => Exercise
}

export function ExerciseMode({ generateExercise = randomExercise }: Props) {
  const { dir, lang, t } = useI18n()
  const [dimensionProfile, dimensionUnlocks, recordDimensionAnswer, clearDimensionUnlocks] = useDimensionStore()
  const [srsStore, recordSrsAnswer] = useSrsStore()
  const [exercise, setExercise] = useState<Exercise>(() => generateExercise(dimensionProfile, srsStore))
  const [selected, setSelected] = useState<number | null>(null)
  const [streakExtendedAlert, setStreakExtendedAlert] = useState(false)
  const [rawStats, setRawStats] = useLocalStorage<SerializedDayStats[]>('exercise:daily', [])
  const storedStats: DayStats[] = useMemo(() => deserializeDayStats(rawStats), [rawStats])
  const updateStats = useCallback(
    (updater: (current: DayStats[]) => DayStats[]) => {
      setRawStats((raw) => serializeDayStats(updater(deserializeDayStats(raw))))
    },
    [setRawStats],
  )
  const loadNextExercise = useCallback(
    (profile: DimensionProfile) => {
      setExercise(generateExercise(profile, srsStore))
      setSelected(null)
      clearDimensionUnlocks()
      setStreakExtendedAlert(false)
    },
    [generateExercise, srsStore, clearDimensionUnlocks],
  )

  const isAnswered = selected != null
  const streak = getStreak(storedStats)

  const explanation =
    selected != null && exercise.explanations?.[selected] != null
      ? renderExplanation(exercise.explanations[selected], t)
      : []
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
    (index: number) => {
      const isCorrect = index === exercise.answer
      const nextStats = addResult(storedStats, isCorrect)
      const previousStreakGoal = getStreakGoalProgress(storedStats)
      const nextStreakGoal = getStreakGoalProgress(nextStats)
      setSelected(index)
      updateStats(() => nextStats)
      recordSrsAnswer(exercise.cardKey, isCorrect ? 'correct' : 'wrong')
      recordDimensionAnswer(exercise.dimensions, isCorrect)
      setStreakExtendedAlert(isCorrect && previousStreakGoal.remaining > 0 && nextStreakGoal.remaining === 0)
    },
    [exercise, storedStats, updateStats, recordSrsAnswer, recordDimensionAnswer],
  )

  const handleSkip = useCallback(() => {
    recordSrsAnswer(exercise.cardKey, 'pass')
    const promotedProfile = recordDimensionAnswer(exercise.dimensions, false)
    updateStats((s) => addPass(s))
    loadNextExercise(promotedProfile)
  }, [exercise, recordSrsAnswer, recordDimensionAnswer, updateStats, loadNextExercise])

  useEffect(() => {
    if (!isAnswered) return
    const nextButton = document.querySelector('button[autofocus]')
    if (nextButton instanceof HTMLButtonElement) nextButton.focus()
  }, [isAnswered])

  useEffect(() => {
    document.title = [t('mode.exercise'), t('title')].join(' · ')
  }, [t])

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
        <OptionsGrid>
          {exercise.options.map((option, index) => {
            const isCorrect = index === exercise.answer
            const isSelected = index === selected
            const state = isAnswered ? (isCorrect ? 'correct' : isSelected ? 'wrong' : 'dim') : 'idle'
            return (
              <ShortcutButton
                size="large"
                key={option}
                className={OPTION_BUTTON_CLASS}
                shortcutKey={`${index + 1}`}
                showShortcut={!isAnswered}
                onClick={() => {
                  if (!isAnswered) handleAnswer(index)
                }}
                disabled={isAnswered}
                data-state={state}
                data-testid={isCorrect && isAnswered ? 'correct-option' : undefined}
                aria-label={t(option)}
              >
                {t(option)}
              </ShortcutButton>
            )
          })}
        </OptionsGrid>
        {explanation.length > 0 && (
          <Explanation lang={lang} dir={dir}>
            {explanation.map((paragraph, index) => (
              <Text key={`${index}-${paragraph}`}>{paragraph}</Text>
            ))}
          </Explanation>
        )}
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
          <ShortcutButton shortcutKey="s" onClick={handleSkip}>
            {t('exercise.pass')}
          </ShortcutButton>
        )}
      </ExerciseCard>

      <ExerciseStats stats={storedStats} streak={streak} />
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
  background: #ffffff;
  border-radius: 1.5rem;
  padding: 0.75rem;
  width: 100%;
  box-shadow: 0 20px 55px rgba(15, 23, 42, 0.08);
  border: 1px solid #e2e8f0;
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
  color: #0f172a;
  text-align: center;
  line-height: 1.2;
  direction: rtl;
  padding: 2rem 0 1rem;
`

const PROMPT_CLASS = css`
  margin: 0;
  font-size: 1rem;
  color: #64748b;
  text-align: center;
`

const OptionsGrid = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  width: 100%;
`

const Explanation = styled('aside')`
  width: 100%;
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
  background: #dcfce7;
  border: 2px solid #16a34a;
  color: #15803d;
  border-radius: 0.75rem;
  padding: 0.625rem 0.75rem;
  animation: alert-in 320ms cubic-bezier(0.25, 1, 0.5, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const StreakAlert = styled('aside')`
  background: #fffbeb;
  border: 2px solid #facc15;
  color: #92400e;
  border-radius: 0.75rem;
  padding: 0.625rem 0.75rem;
  animation: streak-in 380ms cubic-bezier(0.25, 1, 0.5, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const OPTION_BUTTON_CLASS = css`
  @keyframes option-correct {
    0%   { transform: scale(1); }
    45%  { transform: scale(1.04); }
    100% { transform: scale(1); }
  }

  @keyframes option-wrong {
    0%   { transform: translateX(0); }
    20%  { transform: translateX(-6px); }
    40%  { transform: translateX(5px); }
    60%  { transform: translateX(-4px); }
    80%  { transform: translateX(3px); }
    100% { transform: translateX(0); }
  }

  &[data-state='correct'] {
    background: #dcfce7;
    border-color: #16a34a;
    color: #15803d;
    animation: option-correct 300ms cubic-bezier(0.25, 1, 0.5, 1) forwards;
  }

  &[data-state='wrong'] {
    background: #fee2e2;
    border-color: #dc2626;
    color: #b91c1c;
    animation: option-wrong 350ms cubic-bezier(0.25, 1, 0.5, 1) forwards;
  }

  &[data-state='dim'] {
    opacity: 0.4;
  }

  @media (prefers-reduced-motion: reduce) {
    &[data-state='correct'],
    &[data-state='wrong'] {
      animation: none;
    }
  }
`
