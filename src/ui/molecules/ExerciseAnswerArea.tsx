import { css, styled } from 'goober'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks'
import type { Exercise, InputMode } from '../../exercises/exercises'
import { normalizeForComparison } from '../../paradigms/tokens'
import { ArabicDisplay } from '../atoms/ArabicDisplay'
import { useI18n } from '../hooks/useI18n'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import { ShortcutButton } from './ShortcutButton'

type Props = {
  exercise: Exercise
  forceReveal?: boolean
  onAnswer: (index: number, isCorrect: boolean) => void
  promptId?: string
}

export function ExerciseAnswerArea({ exercise, forceReveal = false, onAnswer, promptId }: Props) {
  const { t } = useI18n()
  const [mode, setMode] = useState<InputMode>('multiple-choice')
  const [selected, setSelected] = useState<number | null>(null)
  const [typedResult, setTypedResult] = useState<'idle' | 'correct' | 'wrong'>('idle')
  const [typedValue, setTypedValue] = useState('')
  const [speechResult, setSpeechResult] = useState<'idle' | 'correct' | 'wrong'>('idle')
  const {
    supported: speechSupported,
    state: speechState,
    transcript,
    errorCode,
    start: startSpeech,
    reset: resetSpeech,
  } = useSpeechRecognition()

  const isAnswered = selected !== null || typedResult !== 'idle' || speechResult !== 'idle'
  const reveal = isAnswered || forceReveal
  const hasTypedAnswer = typedValue.trim().length > 0
  const effectiveMode: InputMode =
    exercise.inputModes.includes(mode) && (mode !== 'speech' || speechSupported) ? mode : 'multiple-choice'
  const inputRef = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    setSelected(null)
    setTypedResult('idle')
    setSpeechResult('idle')
    resetSpeech()
  }, [exercise, resetSpeech])

  useEffect(() => {
    if (effectiveMode === 'keyboard' && typeof inputRef.current?.focus === 'function') inputRef.current.focus()
  }, [effectiveMode])

  useEffect(() => {
    if (typedResult === 'idle') setTypedValue('')
  }, [typedResult])

  useEffect(() => {
    if (effectiveMode === 'speech' && speechState === 'idle' && !reveal) {
      startSpeech(exercise.options, 'ar-SA')
    }
  }, [effectiveMode, speechState, reveal, exercise, startSpeech])

  const handleSpeechSubmit = useCallback(() => {
    if (isAnswered || !transcript) return
    const isCorrect = normalizeForComparison(transcript) === normalizeForComparison(exercise.options[exercise.answer])
    const answeredIndex = isCorrect ? exercise.answer : (exercise.answer + 1) % exercise.options.length
    setSpeechResult(isCorrect ? 'correct' : 'wrong')
    onAnswer(answeredIndex, isCorrect)
  }, [isAnswered, transcript, exercise, onAnswer])

  return (
    <Wrapper role={promptId != null ? 'group' : undefined} aria-labelledby={promptId}>
      {effectiveMode === 'multiple-choice' ? (
        <OptionsGrid>
          {exercise.options.map((option, index) => {
            const optionLabel = t(option)
            const hasArabicScript = /[؀-ۿ]/.test(optionLabel)
            const isCorrect = index === exercise.answer
            const isSelected = index === selected
            const state = reveal ? (isCorrect ? 'correct' : isSelected ? 'wrong' : 'dim') : 'idle'
            return (
              <ShortcutButton
                size="large"
                key={option}
                className={OPTION_BUTTON_CLASS}
                shortcutKey={`${index + 1}`}
                showShortcut={!reveal}
                onClick={() => {
                  if (reveal) return
                  setSelected(index)
                  onAnswer(index, index === exercise.answer)
                }}
                disabled={reveal}
                data-state={state}
                data-testid={isCorrect && reveal ? 'correct-option' : undefined}
                lang={hasArabicScript ? 'ar' : undefined}
                dir={hasArabicScript ? 'rtl' : undefined}
              >
                {optionLabel}
              </ShortcutButton>
            )
          })}
        </OptionsGrid>
      ) : effectiveMode === 'keyboard' ? (
        <TypingForm
          onSubmit={(e) => {
            e.preventDefault()
            if (!isAnswered && hasTypedAnswer) {
              const isCorrect =
                normalizeForComparison(typedValue) === normalizeForComparison(exercise.options[exercise.answer])
              const answeredIndex = isCorrect ? exercise.answer : (exercise.answer + 1) % exercise.options.length
              setTypedResult(isCorrect ? 'correct' : 'wrong')
              onAnswer(answeredIndex, isCorrect)
            }
          }}
        >
          <InputRow>
            <ArabicInput
              ref={inputRef}
              type="text"
              dir="rtl"
              lang="ar"
              value={typedValue}
              aria-labelledby={promptId}
              placeholder={t('exercise.typing.placeholder')}
              onInput={(e) => setTypedValue((e.target as HTMLInputElement).value)}
              onChange={(e) => setTypedValue((e.target as HTMLInputElement).value)}
              disabled={reveal}
              data-state={typedResult !== 'idle' ? typedResult : undefined}
              aria-invalid={typedResult === 'wrong' || undefined}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
            />
            <SubmitButton type="submit" aria-label={t('exercise.typing.submit')} disabled={reveal || !hasTypedAnswer}>
              ↵
            </SubmitButton>
          </InputRow>
          {reveal && typedResult !== 'correct' && (
            <CorrectReveal dir="rtl" lang="ar" data-testid="correct-answer-reveal">
              {t(exercise.options[exercise.answer])}
            </CorrectReveal>
          )}
        </TypingForm>
      ) : (
        <>
          {speechState === 'listening' && (
            <ListeningText aria-live="assertive">{t('exercise.toggle.listening')}</ListeningText>
          )}
          {speechState === 'result' && (
            <>
              {speechResult === 'idle' && <ArabicDisplay>{transcript}</ArabicDisplay>}
              {speechResult === 'correct' && (
                <CorrectReveal dir="rtl" lang="ar" data-testid="correct-answer-reveal">
                  {transcript}
                </CorrectReveal>
              )}
              {speechResult === 'wrong' && (
                <CorrectReveal dir="rtl" lang="ar" data-state="error">
                  {transcript}
                </CorrectReveal>
              )}
              {speechResult === 'wrong' && (
                <CorrectReveal dir="rtl" lang="ar" data-testid="correct-answer-reveal">
                  {exercise.options[exercise.answer]}
                </CorrectReveal>
              )}
              {speechResult === 'idle' && (
                <SpeechButtonRow>
                  <ShortcutButton
                    shortcutKey="r"
                    variant="secondary"
                    onClick={() => startSpeech(exercise.options, 'ar-SA')}
                  >
                    {t('exercise.speech.retry')}
                  </ShortcutButton>
                  <ShortcutButton shortcutKey="Enter" variant="primary" onClick={handleSpeechSubmit}>
                    {t('exercise.speech.submit')}
                  </ShortcutButton>
                </SpeechButtonRow>
              )}
            </>
          )}
          {speechState === 'error' && (
            <>
              <CorrectReveal data-state="error">
                {errorCode === 'no-speech' ? t('exercise.speech.error.noSpeech') : t('exercise.speech.error.generic')}
              </CorrectReveal>
              {!reveal && (
                <ShortcutButton
                  shortcutKey="r"
                  style={{ width: '100%' }}
                  onClick={() => startSpeech(exercise.options, 'ar-SA')}
                >
                  {t('exercise.speech.retry')}
                </ShortcutButton>
              )}
            </>
          )}
          {reveal && speechState === 'idle' && (
            <CorrectReveal dir="rtl" lang="ar" data-testid="correct-answer-reveal">
              {exercise.options[exercise.answer]}
            </CorrectReveal>
          )}
        </>
      )}

      {exercise.inputModes.includes('keyboard') && !reveal && (
        <ShortcutButton
          shortcutKey="t"
          onClick={() => setMode(effectiveMode === 'keyboard' ? 'multiple-choice' : 'keyboard')}
          variant="secondary"
          style={{ width: '100%' }}
        >
          {effectiveMode === 'keyboard' ? t('exercise.toggle.options') : t('exercise.toggle.type')}
        </ShortcutButton>
      )}

      {exercise.inputModes.includes('speech') && speechSupported && !reveal && (
        <ShortcutButton
          shortcutKey="v"
          showShortcut
          onClick={() => {
            if (effectiveMode === 'speech') {
              setMode('multiple-choice')
              resetSpeech()
            } else {
              setMode('speech')
            }
          }}
          variant="secondary"
          style={{ width: '100%' }}
        >
          {effectiveMode === 'speech' ? t('exercise.toggle.options') : t('exercise.toggle.speak')}
        </ShortcutButton>
      )}
    </Wrapper>
  )
}

// ─── Styled components ────────────────────────────────────────────────────────

const Wrapper = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const OptionsGrid = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  width: 100%;
`

const TypingForm = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`

const InputRow = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  width: 100%;
`

const ArabicInput = styled('input')`
  flex: 1;
  min-width: 0;
  padding: 0.9rem 1rem;
  border-radius: 0.9rem;
  border: 1px solid var(--color-border-input);
  background: var(--color-bg-surface-secondary);
  color: var(--color-text-primary);
  font-size: 1.2rem;
  font-family: 'Noto Sans Arabic', sans-serif;
  text-align: center;
  direction: rtl;
  box-sizing: border-box;
  transition: background 120ms ease, border-color 120ms ease, box-shadow 120ms ease;

  &::placeholder {
    direction: inherit;
    text-align: inherit;
    color: var(--color-text-muted);
    font-family: inherit;
  }

  &:hover:not(:disabled) {
    background: var(--color-bg-surface);
    border-color: var(--color-border-input);
    box-shadow: var(--shadow-interactive-hover);
  }

  &:focus {
    outline: 3px solid var(--color-focus-outline);
    border-color: var(--color-accent);
  }

  &[data-state='correct'] {
    background: var(--color-success-bg);
    border-color: var(--color-success-border);
    color: var(--color-success-text);
  }

  &[data-state='wrong'] {
    background: var(--color-error-bg);
    border-color: var(--color-error-border);
    color: var(--color-error-text);
  }

  &:disabled {
    cursor: default;
  }
`

const SubmitButton = styled('button')`
  position: relative;
  padding: 0.85rem 1.25rem;
  border-radius: 0.75rem;
  border: 2px solid var(--color-border);
  background: var(--color-bg-surface);
  color: var(--color-text-tertiary);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition:
    background 180ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 180ms cubic-bezier(0.22, 1, 0.36, 1),
    color 180ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 180ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 180ms cubic-bezier(0.22, 1, 0.36, 1);

  &:enabled:hover {
    background: var(--color-bg-accent-hover);
    border-color: var(--color-accent);
    color: var(--color-text-primary);
  }

  &:enabled:active {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 3px solid var(--color-focus-outline);
    outline-offset: 2px;
    border-color: var(--color-accent);
  }

  &:disabled {
    cursor: default;
    color: var(--color-text-muted);
    background: var(--color-bg-surface-secondary);
    border-color: var(--color-border);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

// Extended with &[data-state='error'] for speech error messages — same visual pattern, error colours
const CorrectReveal = styled('p')`
  margin: 0;
  padding: 0.625rem 0.75rem;
  border-radius: 0.75rem;
  background: var(--color-success-bg);
  border: 2px solid var(--color-success-border);
  color: var(--color-success-text);
  font-size: 1.2rem;
  text-align: center;
  font-family: 'Noto Sans Arabic', sans-serif;

  &[data-state='error'] {
    background: var(--color-error-bg);
    border-color: var(--color-error-border);
    color: var(--color-error-text);
  }
`

// Bordered accent indicator shown while recognition is active — no existing atom for this
// padding/font-size match ArabicDisplay so height stays stable on transition to transcript
const ListeningText = styled('p')`
  margin: 0;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid var(--color-accent);
  background: var(--color-bg-surface-secondary);
  color: var(--color-text-muted);
  font-size: 2rem;
  text-align: center;
`

// 2-column grid for submit + re-record buttons — no existing layout primitive for this
const SpeechButtonRow = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
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
    background: var(--color-success-bg);
    border-color: var(--color-success-border);
    color: var(--color-success-text);
    animation: option-correct 300ms cubic-bezier(0.25, 1, 0.5, 1) forwards;
  }

  &[data-state='wrong'] {
    background: var(--color-error-bg);
    border-color: var(--color-error-border);
    color: var(--color-error-text);
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
