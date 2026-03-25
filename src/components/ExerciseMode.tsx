import { styled } from 'goober'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import {
  type DimensionProfile,
  type DimensionStore,
  enforcePrerequisites,
  INITIAL_DIMENSION_STORE,
  promoteDimensions,
  recordDimensionAnswer,
} from '../exercises/dimensions'
import type { Exercise } from '../exercises/exercises'
import { randomExercise } from '../exercises/random'
import type { SrsStore } from '../exercises/srs'
import { recordAnswer } from '../exercises/srs'
import type { DayStats, SerializedDayStats } from '../exercises/stats'
import { addPass, addResult, deserializeDayStats, getStreak, serializeDayStats } from '../exercises/stats'
import { useI18n } from '../hooks/i18n'
import { useLocalStorage } from '../hooks/local-storage'
import { ExerciseStats } from './ExerciseStats'

type Props = {
  generateExercise?: (profile: DimensionProfile, srsStore: SrsStore) => Exercise
}

export function ExerciseMode({ generateExercise = randomExercise }: Props) {
  const { t, tHtml } = useI18n()
  const [dimensionStore, setDimensionStore] = useLocalStorage<DimensionStore>('dimensions', INITIAL_DIMENSION_STORE)
  const [srs, updateSrs] = useLocalStorage<SrsStore>('srs', {})
  const [exercise, setExercise] = useState<Exercise>(() =>
    generateExercise(enforcePrerequisites(dimensionStore.profile), srs),
  )
  const [selected, setSelected] = useState<number | null>(null)
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
      setExercise(generateExercise(store.profile, srs))
      setSelected(null)
    },
    [generateExercise, srs],
  )

  const isAnswered = selected != null
  const streak = getStreak(storedStats)

  const handleAnswer = useCallback(
    (index: number) => {
      const isCorrect = index === exercise.answer
      setSelected(index)
      updateStats((current) => addResult(current, isCorrect))
      updateSrs((current) => recordAnswer(current, exercise.cardKey, isCorrect ? 'correct' : 'wrong'))
      setDimensionStore(promoteDimensions(recordDimensionAnswer(dimensionStore, exercise.kind, isCorrect)))
    },
    [exercise, dimensionStore, updateStats, updateSrs, setDimensionStore],
  )

  const handleSkip = useCallback(() => {
    updateSrs((current) => recordAnswer(current, exercise.cardKey, 'pass'))
    const promoted = promoteDimensions(recordDimensionAnswer(dimensionStore, exercise.kind, false))
    setDimensionStore(promoted)
    updateStats((s) => addPass(s))
    loadNextExercise(promoted)
  }, [exercise, dimensionStore, updateSrs, updateStats, setDimensionStore, loadNextExercise])

  useEffect(() => {
    if (isAnswered) return
    const abortController = new AbortController()
    document.addEventListener(
      'keydown',
      (e) => {
        if (e.metaKey || e.ctrlKey || e.altKey) return
        if (e.key >= '1' && e.key <= '4') {
          const index = Number.parseInt(e.key, 10) - 1
          if (index < exercise.options.length) handleAnswer(index)
        } else if (e.key === 's' || e.key === 'S') {
          handleSkip()
        }
      },
      { signal: abortController.signal },
    )
    return () => abortController.abort()
  }, [isAnswered, exercise.options.length, handleAnswer, handleSkip])

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
              <OptionButton
                key={option}
                type="button"
                onClick={() => {
                  if (!isAnswered) handleAnswer(index)
                }}
                disabled={isAnswered}
                data-state={state}
                data-testid={isCorrect && isAnswered ? 'correct-option' : undefined}
                aria-label={t(option)}
              >
                {!isAnswered && <ShortcutTag aria-hidden="true">{index + 1}</ShortcutTag>}
                {t(option)}
              </OptionButton>
            )
          })}
        </OptionsGrid>
        {isAnswered ? (
          <NextButton
            autoFocus
            type="button"
            onClick={() => {
              loadNextExercise(dimensionStore)
            }}
          >
            {t('exercise.next')}
          </NextButton>
        ) : (
          <PassButton type="button" onClick={handleSkip}>
            <ShortcutTag aria-hidden="true">S</ShortcutTag>
            {t('exercise.pass')}
          </PassButton>
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

const OptionButton = styled('button')`
  position: relative;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 2px solid #e2e8f0;
  background: #ffffff;
  color: #334155;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 120ms ease, border-color 120ms ease, color 120ms ease;
  line-height: 1;

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

  &:enabled:hover {
    background: #fff8e1;
    border-color: #facc15;
    color: #0f172a;
    outline: none;
  }

  &:enabled:focus-visible {
    outline: 2px solid #facc15;
    outline-offset: 2px;
  }

  &:disabled {
    cursor: default;
  }
`

const NextButton = styled('button')`
  position: relative;
  width: 100%;
  padding: 0.85rem 1.5rem;
  border-radius: 0.75rem;
  border: 2px solid #334155;
  background: #334155;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 120ms ease, border-color 120ms ease, color 120ms ease;
  outline: none;

  &:hover {
    background: #4a4f38;
    border-color: #4a4f38;
  }

  &:focus {
    outline: 2px solid #facc15;
    outline-offset: 2px;
  }
`

const PassButton = styled('button')`
  position: relative;
  width: 100%;
  padding: 0.85rem 1.5rem;
  border-radius: 0.75rem;
  border: 2px solid #e2e8f0;
  background: #ffffff;
  color: #334155;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 120ms ease, border-color 120ms ease, color 120ms ease;

  &:hover {
    background: #fff8e1;
    border-color: #facc15;
    color: #92400e;
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid #facc15;
    outline-offset: 2px;
  }
`

const ShortcutTag = styled('span')`
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: 0.85rem;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 600;
  line-height: 1;
  color: #94a3b8;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  padding: 0.2rem 0.35rem;
  pointer-events: none;
  font-family: ui-monospace, monospace;
`
