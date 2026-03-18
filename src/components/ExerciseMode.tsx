import { styled } from 'goober'
import { useState } from 'preact/hooks'
import type { Difficulty } from '../exercises/difficulty'
import { randomExercise } from '../exercises/random'
import type { Exercise } from '../exercises/types'
import { useI18n } from '../hooks/i18n'
import { useLocalStorage } from '../hooks/local-storage'
import { DifficultyToggle } from './DifficultyToggle'

type Props = {
  generateExercise?: (difficulty: Difficulty) => Exercise
}

export function ExerciseMode({ generateExercise = randomExercise }: Props) {
  const { t } = useI18n()
  const [storedDifficulty, setDifficulty] = useLocalStorage<string>('exerciseDifficulty', 'easy')
  const difficulty: Difficulty =
    storedDifficulty === 'medium' || storedDifficulty === 'hard' ? storedDifficulty : 'easy'
  const [exercise, setExercise] = useState<Exercise>(() => generateExercise(difficulty))
  const [selected, setSelected] = useState<number | null>(null)

  const isAnswered = selected != null

  return (
    <ExercisePageBody>
      <ControlsBar>
        <DifficultyToggle
          difficulty={difficulty}
          onChangeDifficulty={(d: Difficulty) => {
            if (d === difficulty) return
            setDifficulty(d)
            setExercise(generateExercise(d))
            setSelected(null)
          }}
        />
      </ControlsBar>
      <ExerciseCard>
        <VerbDisplay lang="ar" dir="rtl">
          {exercise.word}
        </VerbDisplay>
        <Prompt>{t(exercise.promptTranslationKey)}</Prompt>
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
                  if (!isAnswered) setSelected(index)
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
        {isAnswered && (
          <NextButton
            type="button"
            onClick={() => {
              setExercise(generateExercise(difficulty))
              setSelected(null)
            }}
          >
            {t('exercise.next')}
          </NextButton>
        )}
      </ExerciseCard>
    </ExercisePageBody>
  )
}

const ExercisePageBody = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
`

const ControlsBar = styled('div')`
  width: 100%;
  max-width: 480px;
`

const ExerciseCard = styled('div')`
  background: #ffffff;
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
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
