import { SymbolView } from 'expo-symbols'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { formIVowelPattern } from '../../../../../src/paradigms/form-i-vowels'
import { applyDiacriticsPreference, type DiacriticsPreference } from '../../../../../src/paradigms/tokens'
import type { DisplayVerb } from '../../../../../src/paradigms/verb-types'
import { formatFormLabel, isTriliteralFormIDisplayVerb } from '../../../../../src/paradigms/verbs'
import { ArabicText } from '../../components/ArabicText'
import { getCopy, type Language } from '../../i18n/copy'
import { getLocaleDirection } from '../../i18n/direction'
import { useThemeTokens } from '../../theme/tokens'

export function VerbRow({
  diacriticsPreference,
  includeIdInLabel = false,
  language,
  onPress,
  showDivider = true,
  testID,
  verb,
}: {
  diacriticsPreference: DiacriticsPreference
  includeIdInLabel?: boolean
  language: Language
  onPress: (verb: DisplayVerb) => void
  showDivider?: boolean
  testID?: string
  verb: DisplayVerb
}) {
  const theme = useThemeTokens()
  const { t, translate } = getCopy(language)
  const rtl = getLocaleDirection(language) === 'rtl'
  const lemma = applyDiacriticsPreference(verb.lemma, diacriticsPreference)
  const form = formatFormLabel(verb.form, verb.root)
  const vowelPattern = isTriliteralFormIDisplayVerb(verb) ? formIVowelPattern(verb) : undefined
  const gloss = language === 'ar' ? undefined : translate(verb.id)

  return (
    <Pressable
      accessibilityLabel={[
        lemma,
        t('meta.form.withNumber', { form }),
        vowelPattern,
        gloss,
        includeIdInLabel ? verb.id : null,
      ]
        .filter(Boolean)
        .join(', ')}
      accessibilityRole="button"
      onPress={() => onPress(verb)}
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: pressed ? theme.surfaceSecondary : 'transparent',
          borderBottomWidth: showDivider ? StyleSheet.hairlineWidth : 0,
          borderColor: theme.border,
          flexDirection: rtl ? 'row-reverse' : 'row',
        },
      ]}
      testID={testID}
    >
      <View
        style={[
          styles.formMeta,
          { flexDirection: rtl ? 'row-reverse' : 'row', paddingLeft: rtl ? 0 : 8, paddingRight: rtl ? 8 : 0 },
        ]}
      >
        {verb.synthetic ? <Text style={{ color: theme.inkMuted, fontSize: 13 }}>*</Text> : null}
        <Text allowFontScaling style={[styles.formLabel, { color: theme.inkSecondary }]}>
          {form}
        </Text>
        {vowelPattern ? (
          <ArabicText allowFontScaling style={[styles.vowelPattern, { color: theme.inkSecondary }]}>
            {vowelPattern}
          </ArabicText>
        ) : null}
      </View>
      <View style={[styles.label, { alignItems: rtl ? 'flex-start' : 'flex-end' }]}>
        <ArabicText allowFontScaling style={styles.lemma}>
          {lemma}
        </ArabicText>
        {gloss ? (
          <Text allowFontScaling style={[styles.gloss, { color: theme.inkSecondary }]}>
            {gloss}
          </Text>
        ) : null}
      </View>
      <SymbolView
        name={rtl ? 'chevron.left' : 'chevron.right'}
        size={14}
        tintColor={theme.inkMuted}
        type="monochrome"
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  formLabel: { fontSize: 16, fontWeight: '500' },
  formMeta: { alignItems: 'center', gap: 16 },
  gloss: { fontSize: 15 },
  label: { flex: 1, gap: 2 },
  lemma: { fontSize: 25 },
  row: { alignItems: 'center', gap: 12, minHeight: 60, paddingVertical: 8 },
  vowelPattern: { fontSize: 21, lineHeight: 28, textAlign: 'left', writingDirection: 'ltr' },
})
