import { css, styled } from 'goober'
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks'
import type { DimensionProfile } from '../../exercises/dimensions'
import { formPool, pronounPool, rootTypesPool, tensePool } from '../../exercises/dimensions'
import type { Exercise } from '../../exercises/exercises'
import { filterMasteredLayers } from '../../exercises/explanation'
import { computeMastery, findLowestMastery, type MasteryItemId } from '../../exercises/mastery'
import { type ExerciseFocus, type ExerciseSession, isCoveredTriple, nextExercise } from '../../exercises/scheduler'
import type { SrsStore } from '../../exercises/srs'
import { renderExplanation } from '../../paradigms/explanation'
import type { PronounId } from '../../paradigms/pronouns'
import { toRoman } from '../../primitives/numbers'
import { Button } from '../atoms/Button'
import { FormattedText } from '../atoms/FormattedText'
import { Text } from '../atoms/Text'
import { useDimensionStore } from '../hooks/useDimensionStore'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useI18n } from '../hooks/useI18n'
import { useSrsStore } from '../hooks/useSrsStore'
import { useStats } from '../hooks/useStats'
import { ExerciseAnswerArea } from '../molecules/ExerciseAnswerArea'
import { OptionChip, type OptionGroup, type OptionItem, type OptionValue } from '../molecules/OptionChip'
import { ShortcutButton } from '../molecules/ShortcutButton'
import { SpeechButton } from '../molecules/SpeechButton'
import { ExerciseStats } from '../organisms/ExerciseStats'

type Props = {
  generateExercise?: (
    profile: DimensionProfile,
    srsStore: SrsStore,
    session: ExerciseSession,
    focus: ExerciseFocus,
  ) => Exercise
}

const PRONOUN_ABBREVIATION_LABELS: Record<PronounId, string> = {
  '1s': 'pronoun.1st.singular',
  '1p': 'pronoun.1st.plural',
  '2ms': 'pronoun.2nd.singular.masculine',
  '2fs': 'pronoun.2nd.singular.feminine',
  '2d': 'pronoun.2nd.dual',
  '2mp': 'pronoun.2nd.plural.masculine',
  '2fp': 'pronoun.2nd.plural.feminine',
  '3ms': 'pronoun.3rd.singular.masculine',
  '3fs': 'pronoun.3rd.singular.feminine',
  '3md': 'pronoun.3rd.dual.masculine',
  '3fd': 'pronoun.3rd.dual.feminine',
  '3mp': 'pronoun.3rd.plural.masculine',
  '3fp': 'pronoun.3rd.plural.feminine',
}

export function ExerciseMode({ generateExercise = nextExercise }: Props) {
  const { dir, lang, t } = useI18n()
  const [dimensionProfile, dimensionChanges, recordDimensionAnswer, clearDimensionChanges] = useDimensionStore()
  const [srsStore, recordSrsAnswer] = useSrsStore()
  const sessionRef = useRef<ExerciseSession>({ reviews: 0, lastNewAt: -3 })
  const [activeFocus, setActiveFocus] = useState<ExerciseFocus>({})
  const [isFocusPickerOpen, setIsFocusPickerOpen] = useState(false)
  const [exercise, setExercise] = useState<Exercise>(() =>
    generateExercise(dimensionProfile, srsStore, sessionRef.current, {}),
  )
  const [answeredIndex, setAnsweredIndex] = useState<number | null>(null)
  const [skipped, setSkipped] = useState(false)
  const [streakExtendedAlert, setStreakExtendedAlert] = useState(false)
  const { streak, recordResult } = useStats()

  useEffect(() => {
    if (streak.correct === streak.goal) setStreakExtendedAlert(true)
  }, [streak.correct, streak.goal])

  useDocumentTitle([t('mode.exercise'), t('title')].join(' · '))

  const mastery = useMemo(() => computeMastery(dimensionProfile, srsStore), [dimensionProfile, srsStore])

  const focusGroups = useMemo((): readonly OptionGroup<MasteryItemId>[] => {
    const recommended = Object.fromEntries(findLowestMastery(mastery).map((i) => [i.id, i]))
    const recommendedLabel = t('exercise.focus.recommended')

    const itemOption = (label: string, id: MasteryItemId, ariaLabel?: string) =>
      Object.keys(recommended).includes(id)
        ? { glyph: '↓', ariaLabel: [ariaLabel ?? label, recommendedLabel].join(', ') }
        : { ariaLabel: ariaLabel ?? label }

    const groupOption = (key: string, options: readonly OptionItem<MasteryItemId>[]) => {
      const label = t(`exercise.focus.${key}.label`)
      const recommendation = options.some((o) => Object.keys(recommended).includes(o.value))
        ? {
            glyph: '↓',
            ariaLabel: [label, recommendedLabel].join(', '),
            hint: [t('exercise.focus.recommendHint'), t('exercise.focus.mixedHint')].join(' · '),
          }
        : {}
      return {
        key,
        label,
        ariaLabel: label,
        pickerTitle: t(`exercise.focus.${key}.pickerTitle`),
        hint: t('exercise.focus.mixedHint'),
        options,
        ...recommendation,
      }
    }

    const groups: OptionGroup<MasteryItemId>[] = []

    const forms = formPool(dimensionProfile.forms)
    if (forms.length >= 2) {
      groups.push(
        groupOption(
          'form',
          forms.map((f) => ({
            value: `forms.${f}`,
            label: t(`exercise.unlock.form.${f}`),
            ...itemOption(toRoman(f), `forms.${f}`, t('exercise.stats.mastery.form', { form: toRoman(f) })),
          })),
        ),
      )
    }

    const tenses = tensePool(dimensionProfile.tenses)
    if (tenses.length >= 2) {
      groups.push(
        groupOption(
          'tense',
          tenses.map((value) => ({
            value: `tenses.${value}`,
            label: t(`tense.${value}`),
            ...itemOption(t(`tense.${value}`), `tenses.${value}`),
          })),
        ),
      )
    }

    const rootTypes = rootTypesPool(dimensionProfile.rootTypes)
    if (rootTypes.length >= 2) {
      groups.push(
        groupOption(
          'rootType',
          rootTypes.map((value) => ({
            value: `rootTypes.${value}`,
            label: t(`exercise.stats.mastery.rootType.${value}`),
            ...itemOption(t(`exercise.stats.mastery.rootType.${value}`), `rootTypes.${value}`),
          })),
        ),
      )
    }

    const pronouns = pronounPool(dimensionProfile.pronouns)
    if (pronouns.length >= 2) {
      groups.push(
        groupOption(
          'pronoun',
          pronouns.map((p) => ({
            value: `pronouns.${p}`,
            label: t(PRONOUN_ABBREVIATION_LABELS[p]),
            ...itemOption(t(PRONOUN_ABBREVIATION_LABELS[p]), `pronouns.${p}`, t(`pronoun.${p}`)),
          })),
        ),
      )
    }

    if (dimensionProfile.nominals >= 2)
      groups.push(
        groupOption('nominal', [
          {
            value: 'nominals.participles' as MasteryItemId,
            label: t('exercise.stats.mastery.nominal.participles'),
            ...itemOption(t('exercise.stats.mastery.nominal.participles'), 'nominals.participles'),
          },
          {
            value: 'nominals.masdar' as MasteryItemId,
            label: t('exercise.stats.mastery.nominal.masdar'),
            ...itemOption(t('exercise.stats.mastery.nominal.masdar'), 'nominals.masdar'),
          },
        ]),
      )

    return groups
  }, [mastery, dimensionProfile, t])

  const focusOptionValue = useMemo((): OptionValue<MasteryItemId> | null => {
    if (activeFocus.form) return { groupKey: 'form', value: `forms.${activeFocus.form}` as MasteryItemId }
    if (activeFocus.tense) return { groupKey: 'tense', value: `tenses.${activeFocus.tense}` as MasteryItemId }
    if (activeFocus.rootType)
      return { groupKey: 'rootType', value: `rootTypes.${activeFocus.rootType}` as MasteryItemId }
    if (activeFocus.pronoun) return { groupKey: 'pronoun', value: `pronouns.${activeFocus.pronoun}` as MasteryItemId }
    if (activeFocus.nominal) return { groupKey: 'nominal', value: `nominals.${activeFocus.nominal}` as MasteryItemId }
    return null
  }, [activeFocus])

  const handleFocusChange = useCallback(
    (optionValue: OptionValue<MasteryItemId> | null) => {
      if (optionValue == null) {
        setActiveFocus({})
        return
      }
      const selected = mastery.flatMap((category) => category.items).find((item) => item.id === optionValue.value)
      if (selected == null) return

      switch (selected.categoryId) {
        case 'forms':
          setActiveFocus({ form: selected.value as ExerciseFocus['form'] })
          break
        case 'tenses':
          setActiveFocus({ tense: selected.value as ExerciseFocus['tense'] })
          break
        case 'rootTypes':
          setActiveFocus({ rootType: selected.value as ExerciseFocus['rootType'] })
          break
        case 'pronouns':
          setActiveFocus({ pronoun: selected.value as ExerciseFocus['pronoun'] })
          break
        case 'nominals':
          setActiveFocus({ nominal: selected.value as ExerciseFocus['nominal'] })
          break
      }
    },
    [mastery],
  )

  const loadNextExercise = useCallback(
    (profile: DimensionProfile) => {
      setExercise(generateExercise(profile, srsStore, sessionRef.current, activeFocus))
      setAnsweredIndex(null)
      setSkipped(false)
      clearDimensionChanges()
      setStreakExtendedAlert(false)
    },
    [generateExercise, srsStore, clearDimensionChanges, activeFocus],
  )

  const isAnswered = answeredIndex !== null || skipped

  const explanation = (() => {
    if (answeredIndex == null && !skipped) return []
    if (exercise.explanation == null) return []
    return renderExplanation(
      answeredIndex !== exercise.answer || skipped
        ? exercise.explanation
        : filterMasteredLayers(srsStore, exercise.explanation),
      t,
    )
  })()

  const handleAnswer = useCallback(
    (index: number, isCorrect: boolean) => {
      if (isCoveredTriple(exercise.cardKey, srsStore)) {
        sessionRef.current = { ...sessionRef.current, reviews: sessionRef.current.reviews + 1 }
      } else {
        sessionRef.current = { ...sessionRef.current, lastNewAt: sessionRef.current.reviews }
      }
      setAnsweredIndex(index)
      recordResult(isCorrect ? 'correct' : 'incorrect')
      recordSrsAnswer(exercise.cardKey, isCorrect ? 'correct' : 'wrong')
      recordDimensionAnswer(exercise.dimensions, isCorrect)
    },
    [exercise, srsStore, recordResult, recordSrsAnswer, recordDimensionAnswer],
  )

  const handleSkip = useCallback(() => {
    recordSrsAnswer(exercise.cardKey, 'pass')
    recordResult('passed')
    setSkipped(true)
  }, [exercise.cardKey, recordSrsAnswer, recordResult, setSkipped])

  useEffect(() => {
    if (!isAnswered) return
    if (answeredIndex !== exercise.answer) return
    const nextButton = document.querySelector('button[autofocus]')
    if (nextButton instanceof HTMLButtonElement) nextButton.focus()
  }, [isAnswered, answeredIndex, exercise.answer])

  return (
    <ExerciseLayout>
      <ExerciseCard>
        <ExerciseTopRow>
          <FocusChipSlot>
            <OptionChip
              groups={focusGroups}
              value={focusOptionValue}
              onChange={handleFocusChange}
              onOpenChange={setIsFocusPickerOpen}
              icon="◎"
              label={t('exercise.focus.label')}
              clearLabel={t('exercise.focus.clear')}
              backLabel={t('exercise.focus.back')}
              pickerTitle={t('exercise.focus.pickerTitle')}
              hint={t('exercise.focus.mixedHint')}
            />
          </FocusChipSlot>
          <SpeechButton text={exercise.spokenWord} lang="ar" ariaLabel={t('aria.speak', { text: exercise.word })} />
        </ExerciseTopRow>
        <VerbDisplay lang="ar" dir="rtl">
          {exercise.word}
        </VerbDisplay>
        <FormattedText
          id={EXERCISE_PROMPT_ID}
          className={PROMPT_CLASS}
          text={t(
            exercise.promptTranslationKey,
            Object.fromEntries(Object.entries(exercise.promptParams ?? {}).map(([k, v]) => [k, t(v)])),
          )}
        />
        <AnswerAreaContainer aria-hidden={isFocusPickerOpen}>
          <ExerciseAnswerArea
            exercise={exercise}
            forceReveal={skipped}
            onAnswer={handleAnswer}
            promptId={EXERCISE_PROMPT_ID}
          />
        </AnswerAreaContainer>
        <ExplanationWrapper visible={explanation.length > 0}>
          <ExplanationInner>
            {explanation.length > 0 && (
              <Explanation lang={lang} dir={dir}>
                {explanation.map((paragraph, index) => (
                  <FormattedText key={index} text={paragraph.map((s) => s.text).join(' ')} />
                ))}
              </Explanation>
            )}
          </ExplanationInner>
        </ExplanationWrapper>
        {isAnswered ? (
          <>
            {(dimensionChanges.length || streakExtendedAlert) && (
              <Alerts>
                {dimensionChanges.map((change, index) =>
                  change.type === 'promotion' ? (
                    <SuccessAlert key={`${exercise.cardKey}-change-${index}`} lang={lang} dir={dir}>
                      <Text>
                        {t('exercise.unlock.line', {
                          dimension: t(`exercise.unlock.dimension.${change.dimension}`),
                          items: change.items.map((item) => t(item)).join(', '),
                        })}
                      </Text>
                    </SuccessAlert>
                  ) : (
                    <WarningAlert key={`${exercise.cardKey}-change-${index}`} lang={lang} dir={dir}>
                      <Text>
                        {t('exercise.demotion.line', {
                          dimension: t(`exercise.unlock.dimension.${change.dimension}`),
                          items: change.items.map((item) => t(item)).join(', '),
                        })}
                      </Text>
                    </WarningAlert>
                  ),
                )}
                {streakExtendedAlert && (
                  <StreakAlert key={`${exercise.cardKey}-streak`} lang={lang} dir={dir}>
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

      <ExerciseStats dimensionProfile={dimensionProfile} srsStore={srsStore} />
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
  position: relative;

  @media (min-width: 480px) {
    padding: 1rem 1.25rem;
  }
`

const ExerciseTopRow = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`

const FocusChipSlot = styled('div')`
  flex: 1;
  min-width: 0;
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

const EXERCISE_PROMPT_ID = 'exercise-prompt'

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

const AnswerAreaContainer = styled('div')`
  width: 100%;
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

const SuccessAlert = styled('output')`
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

const WarningAlert = styled('output')`
  background: var(--color-warning-bg);
  border: 2px solid var(--color-warning-border);
  color: var(--color-warning-text);
  border-radius: 0.75rem;
  padding: 0.625rem 0.75rem;
  animation: alert-in 320ms cubic-bezier(0.25, 1, 0.5, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const StreakAlert = styled('output')`
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
