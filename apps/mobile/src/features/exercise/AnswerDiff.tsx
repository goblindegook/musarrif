import { Text, View } from 'react-native'
import type { AnswerSegment } from '../../../../../src/exercises/answer-diff'
import { useThemeTokens } from '../../theme/tokens'

export function AnswerDiff({ segments, testID }: { segments: readonly AnswerSegment[]; testID?: string }) {
  const theme = useThemeTokens()
  let offset = 0

  return (
    <View testID={testID}>
      <Text selectable style={{ color: theme.ink, fontSize: 25, textAlign: 'right', writingDirection: 'rtl' }}>
        {segments.map((segment) => {
          const segmentOffset = offset
          offset += segment.text.length
          return (
            <Text key={segmentOffset} style={{ color: segment.mark === 'error' ? theme.accent : theme.ink }}>
              {segment.text}
            </Text>
          )
        })}
      </Text>
    </View>
  )
}
