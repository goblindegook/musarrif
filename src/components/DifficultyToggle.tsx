import { styled } from 'goober'
import type { Difficulty } from '../exercises/types'
import { useI18n } from '../hooks/i18n'

const DIFFICULTY_OPTIONS: readonly Difficulty[] = ['easy', 'medium', 'hard']

const VisuallyHidden = styled('span')`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

const Options = styled('div')`
  display: flex;
  align-items: center;
  border: 1px solid #e2e8f0;
  background: #fff;
  padding: 0.25rem;
  border-radius: 0.95rem;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
  flex: 1;
  gap: 0.25rem;
  min-width: 0;
  width: 100%;
`

const Option = styled('button')<{ active: boolean }>`
  background: ${({ active }) => (active ? '#fff8e1' : 'transparent')};
  border-radius: 0.75rem;
  border: 1px solid ${({ active }) => (active ? '#facc15' : 'transparent')};
  box-shadow: ${({ active }) => (active ? '0 4px 14px rgba(15, 23, 42, 0.12)' : 'none')};
  color: ${({ active }) => (active ? '#92400e' : '#475569')};
  cursor: pointer;
  flex: 1;
  font-size: 0.75rem;
  font-weight: 300;
  justify-content: center;
  letter-spacing: 0.08em;
  min-width: 64px;
  padding: 0.45rem 0.75rem;
  text-transform: uppercase;
  transition: background 120ms ease, border-color 120ms ease, box-shadow 120ms ease, color 120ms ease;

  &:hover {
    background: ${({ active }) => (active ? '#fff8e1' : '#f1f5f9')};
    border-color: ${({ active }) => (active ? '#facc15' : '#cbd5f5')};
    color: ${({ active }) => (active ? '#92400e' : '#334155')};
    box-shadow: ${({ active }) => (active ? '0 4px 14px rgba(15, 23, 42, 0.12)' : '0 6px 14px rgba(15, 23, 42, 0.1)')};
  }

  @media (min-width: 720px) {
    min-width: 96px;
    padding: 0.5rem 0.9rem;
  }
`

type Props = {
  difficulty: Difficulty
  onChangeDifficulty: (d: Difficulty) => void
}

export function DifficultyToggle({ difficulty, onChangeDifficulty }: Props) {
  const { t } = useI18n()

  return (
    <>
      <VisuallyHidden id="difficulty-label">{t('exercise.difficulty.title')}</VisuallyHidden>
      <Options role="group" aria-labelledby="difficulty-label">
        {DIFFICULTY_OPTIONS.map((option) => (
          <Option
            type="button"
            key={option}
            active={difficulty === option}
            aria-pressed={difficulty === option}
            onClick={() => onChangeDifficulty(option)}
            title={`${t('exercise.difficulty.title')}: ${t(`exercise.difficulty.${option}`)}`}
          >
            {t(`exercise.difficulty.${option}`)}
          </Option>
        ))}
      </Options>
    </>
  )
}
