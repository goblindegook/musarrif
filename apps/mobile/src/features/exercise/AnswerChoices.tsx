import { SymbolView } from 'expo-symbols'
import { useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated'
import { ArabicText } from '../../components/ArabicText'
import { useScaledSize } from '../../theme/dynamic-type'
import { useMotionDuration } from '../../theme/motion'
import { useThemeTokens } from '../../theme/tokens'

export function AnswerChoices({
  labels,
  options,
  correctIndex,
  correctLabel,
  incorrectLabel,
  selectedIndex,
  disabled = false,
  onSelect,
}: {
  labels: readonly string[]
  options: readonly string[]
  correctIndex: number
  correctLabel: string
  incorrectLabel: string
  selectedIndex: number | null
  disabled?: boolean
  onSelect: (index: number) => void
}) {
  const theme = useThemeTokens()
  const height = useScaledSize(64)
  const revealed = selectedIndex !== null || disabled

  return (
    <View accessibilityRole="radiogroup" style={styles.grid}>
      {options.map((option, index) => {
        const isSelected = index === selectedIndex
        const isCorrect = revealed && index === correctIndex
        const isWrong = isSelected && index !== correctIndex
        return (
          <AnswerOption isCorrect={isCorrect} isWrong={isWrong} key={option}>
            <Pressable
              accessibilityLabel={labels[index]}
              accessibilityRole="radio"
              accessibilityState={{ checked: isSelected, disabled: revealed }}
              disabled={revealed}
              onPress={() => onSelect(index)}
              style={({ pressed }) => [
                styles.option,
                {
                  backgroundColor: theme.surface,
                  height,
                  borderColor: isCorrect ? theme.correct : isWrong ? theme.wrong : theme.border,
                  borderWidth: isCorrect || isWrong ? 2 : StyleSheet.hairlineWidth,
                  opacity: pressed ? 0.78 : 1,
                },
              ]}
            >
              {/* A label that differs from its option was translated, so it is app-language text, not Arabic. */}
              {labels[index] === option ? (
                <ArabicText style={styles.optionText}>{labels[index]}</ArabicText>
              ) : (
                <Text style={[styles.localisedText, { color: theme.ink }]}>{labels[index]}</Text>
              )}
              {(isCorrect || isWrong) && (
                <View accessibilityLabel={isCorrect ? correctLabel : incorrectLabel} style={styles.badge}>
                  <SymbolView
                    name={isCorrect ? 'checkmark.circle.fill' : 'xmark.circle.fill'}
                    size={22}
                    tintColor={isCorrect ? theme.correct : theme.wrong}
                    type="monochrome"
                  />
                </View>
              )}
            </Pressable>
          </AnswerOption>
        )
      })}
    </View>
  )
}

function AnswerOption({
  children,
  isCorrect,
  isWrong,
}: {
  children: React.ReactNode
  isCorrect: boolean
  isWrong: boolean
}) {
  const duration = useMotionDuration(120)
  const scale = useSharedValue(1)
  const shift = useSharedValue(0)
  useEffect(() => {
    if (duration === 0) return
    if (isCorrect) scale.value = withSequence(withTiming(1.03, { duration }), withTiming(1, { duration }))
    if (isWrong) {
      shift.value = withSequence(
        withTiming(-6, { duration: duration / 2 }),
        withTiming(6, { duration }),
        withTiming(0, { duration: duration / 2 }),
      )
    }
  }, [duration, isCorrect, isWrong, scale, shift])
  const animated = useAnimatedStyle(() => ({ transform: [{ translateX: shift.value }, { scale: scale.value }] }))

  return <Animated.View style={[styles.cell, animated]}>{children}</Animated.View>
}

const styles = StyleSheet.create({
  cell: { flexBasis: '47%', flexGrow: 1 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  badge: { position: 'absolute', right: 16, top: 21 },
  option: {
    alignItems: 'center',
    borderCurve: 'continuous',
    borderRadius: 32,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  localisedText: { fontSize: 17, textAlign: 'center' },
  optionText: { fontSize: 24, textAlign: 'center' },
})
