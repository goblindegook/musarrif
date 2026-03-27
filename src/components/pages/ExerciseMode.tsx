import { css, styled } from 'goober'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import {
  type DimensionProfile,
  type DimensionStore,
  type DimensionUnlock,
  enforcePrerequisites,
  getDimensionUnlocks,
  INITIAL_DIMENSION_STORE,
  promoteDimensions,
  recordDimensionAnswer,
} from '../../exercises/dimensions'
import type { Exercise } from '../../exercises/exercises'
import { randomExercise } from '../../exercises/random'
import type { SrsStore } from '../../exercises/srs'
import type { DayStats, SerializedDayStats } from '../../exercises/stats'
import { addPass, addResult, deserializeDayStats, getStreak, serializeDayStats } from '../../exercises/stats'
import { useI18n } from '../../hooks/i18n'
import { useLocalStorage } from '../../hooks/local-storage'
import { useSrsStore } from '../../hooks/srs-store'
import { renderExplanation } from '../../paradigms/explanation'
import { Button } from '../atoms/Button'
import { Text } from '../atoms/Text'
import { ShortcutButton } from '../buttons/ShortcutButton'
import { ExerciseStats } from '../ExerciseStats'

type Props = {
  generateExercise?: (profile: DimensionProfile, srsStore: SrsStore) => Exercise
}

export function ExerciseMode({ generateExercise = randomExercise }: Props) {
  const { dir, lang, t, tHtml } = useI18n()
  const [dimensionStore, setDimensionStore] = useLocalStorage<DimensionStore>('dimensions', INITIAL_DIMENSION_STORE)
  const [srsStore, recordSrsAnswer] = useSrsStore()
  const [exercise, setExercise] = useState<Exercise>(() =>
    generateExercise(enforcePrerequisites(dimensionStore.profile), srsStore),
  )
  const [selected, setSelected] = useState<number | null>(null)
  const [dimensionUnlocks, setDimensionUnlocks] = useState<readonly DimensionUnlock[]>([])
  const [rawStats, setRawStats] = useLocalStorage<SerializedDayStats[]>('exercise:daily', [])
  const storedStats: DayStats[] = useMemo(() => deserializeDayStats(rawStats), [rawStats])
  const updateStats = useCallback(
    (updater: (current: DayStats[]) => DayStats[]) => {
      setRawStats((raw) => serializeDayStats(updater(deserializeDayStats(raw))))
    },
    [setRawStats],
  )
  const loadNextExercise = useCallback(
    (store: DimensionStore) => {
      setExercise(generateExercise(store.profile, srsStore))
      setSelected(null)
      setDimensionUnlocks([])
    },
    [generateExercise, srsStore],
  )

  const isAnswered = selected != null
  const streak = getStreak(storedStats)

  const explanation =
    isAnswered && exercise.explanation
      ? renderExplanation(exercise.explanation, t, selected === exercise.answer ? 'concise' : 'full')
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
      setSelected(index)
      updateStats((current) => addResult(current, isCorrect))
      recordSrsAnswer(exercise.cardKey, isCorrect ? 'correct' : 'wrong')
      const nextDimensionStore = promoteDimensions(recordDimensionAnswer(dimensionStore, exercise.kind, isCorrect))
      setDimensionUnlocks(getDimensionUnlocks(dimensionStore.profile, nextDimensionStore.profile))
      setDimensionStore(nextDimensionStore)
    },
    [exercise, dimensionStore, updateStats, recordSrsAnswer, setDimensionStore],
  )

  const handleSkip = useCallback(() => {
    recordSrsAnswer(exercise.cardKey, 'pass')
    const promoted = promoteDimensions(recordDimensionAnswer(dimensionStore, exercise.kind, false))
    setDimensionStore(promoted)
    updateStats((s) => addPass(s))
    loadNextExercise(promoted)
  }, [exercise, dimensionStore, recordSrsAnswer, updateStats, setDimensionStore, loadNextExercise])

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
        <Prompt
          dangerouslySetInnerHTML={{
            __html: tHtml(
              exercise.promptTranslationKey,
              exercise.promptParams &&
                Object.fromEntries(Object.entries(exercise.promptParams).map(([k, v]) => [k, t(v)])),
            ),
          }}
        />
        <OptionsGrid>
          {exercise.options.map((option, index) => {
            const isCorrect = index === exercise.answer
            const isSelected = index === selected
            const state = isAnswered ? (isCorrect ? 'correct' : isSelected ? 'wrong' : 'dim') : 'idle'
            return (
              <ShortcutButton
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
            {unlockMessages.length > 0 && (
              <UnlockAlert role="status" aria-live="polite" lang={lang} dir={dir}>
                {unlockMessages.map((message, index) => (
                  <UnlockAlertText key={`${index}-${message}`}>{message}</UnlockAlertText>
                ))}
              </UnlockAlert>
            )}
            <Button autoFocus variant="primary" onClick={() => loadNextExercise(dimensionStore)}>
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
  padding: 2.5rem 2rem;
  width: 100%;
  box-shadow: 0 20px 55px rgba(15, 23, 42, 0.08);
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`

const VerbDisplay = styled('p')`
  margin: 0;
  font-size: clamp(2.5rem, 10vw, 4rem);
  font-weight: 700;
  color: #0f172a;
  text-align: center;
  line-height: 1.2;
  direction: rtl;
`

const Prompt = styled('p')`
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

const UnlockAlert = styled('aside')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: start;
  background: #dcfce7;
  border: 2px solid #16a34a;
  color: #15803d;
  border-radius: 0.75rem;
  padding: 0.625rem 0.75rem;
`

const UnlockAlertText = styled('p')`
  margin: 0;
  color: #15803d;
  line-height: 1.6;
  font-size: 0.98rem;
`

const OPTION_BUTTON_CLASS = css`
  &[data-state='correct'] {
    background: #dcfce7;
    border-color: #16a34a;
    color: #15803d;
  }

  &[data-state='wrong'] {
    background: #fee2e2;
    border-color: #dc2626;
    color: #b91c1c;
  }

  &[data-state='dim'] {
    opacity: 0.4;
  }
`
