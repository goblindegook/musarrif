import { StyleSheet, Text, View } from 'react-native'
import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg'
import type { DailyActivity } from '../../../../../src/exercises/stats'
import type { Language } from '../../i18n/copy'
import { useThemeTokens } from '../../theme/tokens'

type Series = 'correct' | 'incorrect' | 'passed'
const series: readonly Series[] = ['correct', 'incorrect', 'passed']
const WIDTH = 320
const AXIS = 24
const PLOT_WIDTH = WIDTH - AXIS
const DAY_WIDTH = PLOT_WIDTH / 7
const BAR_WIDTH = 8
const BAR_GAP = 1.5
const GROUP_WIDTH = series.length * BAR_WIDTH + (series.length - 1) * BAR_GAP
const TOP = 12
const BOTTOM = 122
const HEIGHT = 142

export function ExerciseProgressChart({
  days,
  language,
  labels,
  accessibilityLabel,
}: {
  days: readonly DailyActivity[]
  language: Language
  labels: Record<Series, string>
  accessibilityLabel: string
}) {
  const theme = useThemeTokens()
  const colors: Record<Series, string> = { correct: theme.correct, incorrect: theme.wrong, passed: theme.inkMuted }
  const textColor = theme.inkSecondary
  const gridColor = theme.border
  const largest = Math.max(1, ...days.flatMap((day) => series.map((key) => day[key])))
  // An even top keeps the middle gridline on a whole number.
  const maximum = largest + (largest % 2)
  const yFor = (value: number) => BOTTOM - (value * (BOTTOM - TOP)) / maximum
  const weekday = new Intl.DateTimeFormat(language, { weekday: 'short' })

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="image"
      style={styles.container}
      testID="progress-chart"
    >
      <View style={{ aspectRatio: WIDTH / HEIGHT, width: '100%' }}>
        <Svg height="100%" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width="100%">
          {[0, maximum / 2, maximum].map((value) => (
            <Line
              key={value}
              stroke={gridColor}
              strokeOpacity={0.45}
              strokeWidth={0.6}
              x1={AXIS}
              x2={WIDTH}
              y1={yFor(value)}
              y2={yFor(value)}
            />
          ))}
          {[0, maximum / 2, maximum].map((value) => (
            <SvgText
              key={`label-${value}`}
              fill={theme.inkMuted}
              fontSize={9}
              textAnchor="end"
              x={AXIS - 6}
              y={yFor(value) + 3}
            >
              {value}
            </SvgText>
          ))}
          {days.flatMap((day, index) =>
            series.map((key, seriesIndex) => {
              if (day[key] === 0) return null
              const height = BOTTOM - yFor(day[key])
              return (
                <Rect
                  key={`${key}-${day.date.toDateString()}`}
                  fill={colors[key]}
                  height={height}
                  rx={1.5}
                  testID={`progress-chart-${key}`}
                  width={BAR_WIDTH}
                  x={AXIS + index * DAY_WIDTH + (DAY_WIDTH - GROUP_WIDTH) / 2 + seriesIndex * (BAR_WIDTH + BAR_GAP)}
                  y={yFor(day[key])}
                />
              )
            }),
          )}
        </Svg>
      </View>
      <View style={styles.days}>
        {days.map((day) => (
          <Text key={day.date.toDateString()} style={[styles.day, { color: textColor }]}>
            {weekday.format(day.date)}
          </Text>
        ))}
      </View>
      <View style={styles.legend}>
        {series.map((key) => (
          <View key={key} style={styles.legendItem}>
            <View style={[styles.swatch, { backgroundColor: colors[key] }]} />
            <Text style={[styles.legendText, { color: textColor }]}>{labels[key]}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  day: { flex: 1, fontSize: 11, textAlign: 'center' },
  days: { flexDirection: 'row', paddingLeft: `${(AXIS / WIDTH) * 100}%` },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginTop: 8 },
  legendItem: { alignItems: 'center', flexDirection: 'row', gap: 5 },
  legendText: { fontSize: 12 },
  swatch: { borderRadius: 3, height: 6, width: 14 },
})
