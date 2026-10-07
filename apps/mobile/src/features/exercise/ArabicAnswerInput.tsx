import { Host, TextField } from '@expo/ui/swift-ui'
import {
  autocorrectionDisabled,
  disabled as disabledModifier,
  font,
  foregroundStyle,
  multilineTextAlignment,
  onSubmit as onSubmitModifier,
  submitLabel as submitLabelModifier,
  textFieldStyle,
  textInputAutocapitalization,
} from '@expo/ui/swift-ui/modifiers'
import { StyleSheet, Text, View } from 'react-native'
import type { AnswerSegment } from '../../../../../src/exercises/answer-diff'
import { PrimaryButton } from '../../components/PrimaryButton'
import { useThemeTokens } from '../../theme/tokens'
import { AnswerDiff } from './AnswerDiff'

export function ArabicAnswerInput({
  value,
  onChangeText,
  onSubmit,
  disabled = false,
  placeholder,
  submitLabel,
  correctAnswerLabel,
  typedDiff,
  correctDiff,
}: {
  value: string
  onChangeText: (value: string) => void
  onSubmit: () => void
  disabled?: boolean
  placeholder: string
  submitLabel: string
  correctAnswerLabel: string
  typedDiff?: readonly AnswerSegment[]
  correctDiff?: readonly AnswerSegment[]
}) {
  const theme = useThemeTokens()
  const canSubmit = value.trim().length > 0 && !disabled

  return (
    <View style={styles.container}>
      {typedDiff == null ? (
        <View style={[styles.field, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Host seedColor={theme.accent} style={styles.host}>
            <TextField
              autoFocus
              modifiers={[
                textFieldStyle('plain'),
                font({ size: 24 }),
                foregroundStyle(theme.ink),
                multilineTextAlignment('trailing'),
                autocorrectionDisabled(),
                textInputAutocapitalization('never'),
                submitLabelModifier('done'),
                onSubmitModifier(onSubmit),
                disabledModifier(disabled),
              ]}
              onTextChange={onChangeText}
              placeholder={placeholder}
            />
          </Host>
        </View>
      ) : (
        <View style={[styles.diff, { backgroundColor: theme.surfaceSecondary, borderColor: theme.accent }]}>
          <AnswerDiff segments={typedDiff} testID="typed-answer-diff" />
        </View>
      )}
      {!disabled && (
        <PrimaryButton accessibilityLabel={submitLabel} disabled={!canSubmit} onPress={onSubmit} testID="submit-answer">
          {submitLabel}
        </PrimaryButton>
      )}
      {correctDiff != null && (
        <View style={styles.correct}>
          <Text style={{ color: theme.inkSecondary }}>{correctAnswerLabel}</Text>
          <AnswerDiff segments={correctDiff} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { gap: 10, width: '100%' },
  correct: { alignItems: 'flex-end', gap: 4 },
  diff: { borderCurve: 'continuous', borderRadius: 12, borderWidth: StyleSheet.hairlineWidth, padding: 12 },
  field: {
    borderCurve: 'continuous',
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    minHeight: 64,
    paddingHorizontal: 14,
  },
  host: { height: 64, width: '100%' },
})
