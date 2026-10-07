import { useState } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg'
import { diffAnswer } from '../../../../../src/exercises/answer-diff'
import type { Exercise, InputMode } from '../../../../../src/exercises/exercises'
import { filterMasteredLayers } from '../../../../../src/exercises/explanation'
import type { AnswerResult, SrsStore } from '../../../../../src/exercises/srs'
import { renderExplanation } from '../../../../../src/paradigms/explanation'
import { ArabicText } from '../../components/ArabicText'
import { PrimaryButton } from '../../components/PrimaryButton'
import { SecondaryButton } from '../../components/SecondaryButton'
import { Surface } from '../../components/Surface'
import { TextButton } from '../../components/TextButton'
import { useMotionDuration } from '../../theme/motion'
import { useThemeTokens } from '../../theme/tokens'
import { ExplanationParagraphs } from '../verb/Insights'
import { AnswerChoices } from './AnswerChoices'
import { ArabicAnswerInput } from './ArabicAnswerInput'

export type PersistedExerciseAnswer = {
  answer?: string
  cardKey: string
  dimensions: Exercise['dimensions']
  kind: Exercise['kind']
  responseTimeMs: number
  result: AnswerResult
}

type ExerciseTranslator = (key: string, params?: Record<string, string>) => string

export function ExerciseSession({
  exercise,
  srsStore,
  onPersistAnswer,
  onNext,
  translate,
  translatePrompt,
}: {
  exercise: Exercise
  srsStore: SrsStore
  onPersistAnswer: (answer: PersistedExerciseAnswer) => void
  onNext: () => void
  translate: ExerciseTranslator
  translatePrompt: ExerciseTranslator
}) {
  const theme = useThemeTokens()
  const insets = useSafeAreaInsets()
  const motion = useMotionDuration(240)
  const [mode, setMode] = useState<InputMode>('multiple-choice')
  const [result, setResult] = useState<AnswerResult | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [typedValue, setTypedValue] = useState('')
  const [typedDiff, setTypedDiff] = useState<ReturnType<typeof diffAnswer> | null>(null)
  const [startedAt, setStartedAt] = useState(Date.now())
  const [questionNumber, setQuestionNumber] = useState(0)
  const [explanationScroll, setExplanationScroll] = useState({ content: 0, offset: 0, viewport: 0 })
  const [activeExercise, setActiveExercise] = useState(exercise)
  const currentMode = exercise.inputModes.includes(mode) ? mode : 'multiple-choice'
  const correctAnswer = exercise.answerText ?? exercise.options[exercise.answer]
  const explanation =
    result != null && exercise.explanation != null
      ? renderExplanation(
          result === 'correct' ? filterMasteredLayers(srsStore, exercise.explanation) : exercise.explanation,
          translate,
        )
      : []

  const resultLabel =
    result === 'correct'
      ? translate('exercise.answer.correct').replace(/\.$/u, '')
      : result === 'partial'
        ? translate('exercise.answer.partial')
        : result === 'pass'
          ? translate('exercise.stats.skipped')
          : translate('exercise.stats.incorrect')

  // Reset during render, not in an effect, so the new word never paints with the previous answer's state.
  // The chosen input mode deliberately survives, so a key remount would be wrong here.
  if (activeExercise !== exercise) {
    setActiveExercise(exercise)
    setResult(null)
    setSelectedIndex(null)
    setTypedValue('')
    setTypedDiff(null)
    setStartedAt(Date.now())
    setQuestionNumber((number) => number + 1)
    setExplanationScroll({ content: 0, offset: 0, viewport: 0 })
  }

  function submit(answer: string, index?: number) {
    if (result != null) return
    const finalResult = diffAnswer(answer, correctAnswer).outcome
    setResult(finalResult)
    if (index != null) setSelectedIndex(index)
    onPersistAnswer({
      answer,
      cardKey: exercise.cardKey,
      dimensions: exercise.dimensions,
      kind: exercise.kind,
      responseTimeMs: Math.max(0, Date.now() - startedAt),
      result: finalResult,
    })
  }

  function submitTypedAnswer() {
    if (typedValue.trim() === '' || result != null) return
    const diff = diffAnswer(typedValue, correctAnswer)
    setTypedDiff(diff)
    submit(typedValue)
  }

  function skip() {
    if (result != null) return
    setResult('pass')
    onPersistAnswer({
      cardKey: exercise.cardKey,
      dimensions: exercise.dimensions,
      kind: exercise.kind,
      responseTimeMs: Math.max(0, Date.now() - startedAt),
      result: 'pass',
    })
  }

  return (
    <Surface style={styles.screen}>
      <KeyboardAvoidingView behavior="padding" style={styles.screen}>
        <View style={[styles.content, explanation.length > 0 && styles.questionWithExplanation]}>
          <View style={styles.prompt}>
            <ArabicText accessibilityLabel={translate('exercise.a11y.word')} style={styles.word}>
              {exercise.word}
            </ArabicText>
            <Text style={[styles.promptText, { color: theme.inkSecondary }]}>
              {translatePrompt(exercise.promptTranslationKey, exercise.promptParams)}
            </Text>
          </View>
          <Animated.View entering={FadeIn.duration(motion)} key={currentMode}>
            {currentMode === 'multiple-choice' ? (
              <AnswerChoices
                correctIndex={exercise.answer}
                correctLabel={translate('exercise.a11y.correctChoice')}
                incorrectLabel={translate('exercise.a11y.incorrectChoice')}
                labels={exercise.options.map((option) => translate(option))}
                disabled={result != null}
                onSelect={(index) => submit(exercise.options[index], index)}
                options={exercise.options}
                selectedIndex={selectedIndex}
              />
            ) : currentMode === 'keyboard' ? (
              <ArabicAnswerInput
                key={questionNumber}
                correctAnswerLabel={translate('exercise.correctAnswerLabel')}
                correctDiff={result != null && result !== 'correct' ? typedDiff?.correct : undefined}
                disabled={result != null}
                onChangeText={setTypedValue}
                onSubmit={submitTypedAnswer}
                placeholder={translate('exercise.typing.placeholder')}
                submitLabel={translate('exercise.typing.submit')}
                typedDiff={result === 'wrong' ? typedDiff?.typed : undefined}
                value={typedValue}
              />
            ) : null}
          </Animated.View>
          {result == null && (
            <Animated.View
              accessibilityLabel={translate('exercise.a11y.inputMode')}
              entering={FadeIn.duration(motion)}
              key={`${currentMode}-modes`}
              style={styles.modes}
            >
              {exercise.inputModes.includes('multiple-choice') && currentMode !== 'multiple-choice' && (
                <SecondaryButton
                  accessibilityLabel={translate('exercise.toggle.options')}
                  onPress={() => setMode('multiple-choice')}
                  testID="mode-options"
                >
                  {translate('exercise.toggle.options')}
                </SecondaryButton>
              )}
              {exercise.inputModes.includes('keyboard') && currentMode !== 'keyboard' && (
                <SecondaryButton
                  accessibilityLabel={translate('exercise.toggle.type')}
                  onPress={() => setMode('keyboard')}
                  testID="mode-keyboard"
                >
                  {translate('exercise.toggle.type')}
                </SecondaryButton>
              )}
            </Animated.View>
          )}
          {result == null && (
            <TextButton accessibilityLabel={translate('exercise.pass')} onPress={skip} testID="skip-question">
              {translate('exercise.pass')}
            </TextButton>
          )}
        </View>
        {explanation.length > 0 && (
          <Animated.View
            accessibilityLabel={translate('exercise.a11y.explanation')}
            entering={FadeIn.duration(motion)}
            style={[styles.explanationCard, { backgroundColor: theme.surfaceSecondary }]}
          >
            <ScrollView
              contentContainerStyle={styles.explanationContent}
              onContentSizeChange={(_width, content) => setExplanationScroll((current) => ({ ...current, content }))}
              onLayout={(event) => {
                const viewport = event.nativeEvent.layout.height
                setExplanationScroll((current) => ({ ...current, viewport }))
              }}
              onScroll={(event) => {
                const offset = event.nativeEvent.contentOffset.y
                setExplanationScroll((current) => ({ ...current, offset }))
              }}
              scrollEventThrottle={16}
            >
              <ExplanationParagraphs
                paragraphs={explanation}
                theme={theme}
                diacriticsPreference="all"
                markers={false}
              />
            </ScrollView>
            {explanationScroll.content - explanationScroll.viewport - explanationScroll.offset > 1 && (
              <View pointerEvents="none" style={styles.explanationFade}>
                <Svg height="100%" width="100%">
                  <Defs>
                    <LinearGradient id="explanation-fade" x1="0" x2="0" y1="0" y2="1">
                      <Stop offset="0" stopColor={theme.surfaceSecondary} stopOpacity={0} />
                      <Stop offset="1" stopColor={theme.surfaceSecondary} stopOpacity={1} />
                    </LinearGradient>
                  </Defs>
                  <Rect fill="url(#explanation-fade)" height="100%" width="100%" />
                </Svg>
              </View>
            )}
          </Animated.View>
        )}
        {result != null && (
          <Animated.View
            entering={FadeIn.duration(motion)}
            style={{
              marginTop: 'auto',
              paddingBottom: insets.bottom + 8,
              paddingHorizontal: 16,
              paddingTop: 8,
            }}
          >
            <PrimaryButton
              accessibilityLabel={`${resultLabel}. ${translate('exercise.next')}`}
              onPress={onNext}
              testID="exercise-next"
            >
              {`${resultLabel} · ${translate('exercise.next')}`}
            </PrimaryButton>
          </Animated.View>
        )}
      </KeyboardAvoidingView>
    </Surface>
  )
}

const styles = StyleSheet.create({
  content: { flex: 1, gap: 32, padding: 16 },
  explanationCard: {
    borderRadius: 16,
    flexShrink: 1,
    marginBottom: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  explanationContent: { gap: 12, padding: 16 },
  explanationFade: { bottom: 0, height: 40, left: 0, position: 'absolute', right: 0 },
  questionWithExplanation: { flex: 0 },
  modes: { gap: 8, width: '100%' },
  prompt: { alignItems: 'center', gap: 28, paddingVertical: 16 },
  promptText: { fontSize: 17, textAlign: 'center' },
  screen: { flex: 1 },
  word: { fontSize: 42, textAlign: 'center' },
})
