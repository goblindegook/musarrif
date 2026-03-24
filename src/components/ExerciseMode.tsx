import { styled } from 'goober'
import { useCallback, useMemo, useState } from 'preact/hooks'
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
                  if (!isAnswered) {
                    const isCorrect = index === exercise.answer
                    setSelected(index)
                    updateStats((current) => addResult(current, isCorrect))
                    updateSrs((current) => recordAnswer(current, exercise.cardKey, isCorrect ? 'correct' : 'wrong'))
                    setDimensionStore(
                      promoteDimensions(recordDimensionAnswer(dimensionStore, exercise.kind, isCorrect)),
                    )
                  }
                }}
                disabled={isAnswered}
                data-state={state}
                data-testid={isCorrect && isAnswered ? 'correct-option' : undefined}
                aria-label={t(option)}
              >
                {t(option)}
              </OptionButton>
            )
          })}
        </OptionsGrid>
        {isAnswered ? (
          <NextButton
            type="button"
            onClick={() => {
              loadNextExercise(dimensionStore)
            }}
          >
            {t('exercise.next')}
          </NextButton>
        ) : (
          <PassButton
            type="button"
            onClick={() => {
              updateSrs((current) => recordAnswer(current, exercise.cardKey, 'pass'))
              const promoted = promoteDimensions(recordDimensionAnswer(dimensionStore, exercise.kind, false))
              setDimensionStore(promoted)
              updateStats((s) => addPass(s))
              loadNextExercise(promoted)
            }}
          >
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
  padding: 1rem;
  border-radius: 0.75rem;
  border: 2px solid #e2e8f0;
  background: #ffffff;
  color: #334155;
  font-size: 1.25rem;
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

  &:not(:disabled):hover,
  &:not(:disabled):focus-visible {
    background: #fff8e1;
    border-color: #facc15;
    color: #0f172a;
    outline: none;
  }

  &:disabled {
    cursor: default;
  }
`

const NextButton = styled('button')`
  width: 100%;
  padding: 0.85rem 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  background: #334155;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 120ms ease, border-color 120ms ease;

  &:hover,
  &:focus-visible {
    background: #0f172a;
    outline: none;
  }
`

const PassButton = styled('button')`
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
`
