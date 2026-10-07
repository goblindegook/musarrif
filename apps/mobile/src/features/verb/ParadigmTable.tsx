import { Pressable, StyleSheet, Text, View } from 'react-native'
import { conjugate } from '../../../../../src/paradigms/conjugation'
import type { PronounId } from '../../../../../src/paradigms/pronouns'
import { ARABIC_PRONOUNS, PRONOUN_IDS } from '../../../../../src/paradigms/pronouns'
import type { VerbTense } from '../../../../../src/paradigms/tense'
import type { DiacriticsPreference } from '../../../../../src/paradigms/tokens'
import { applyDiacriticsPreference } from '../../../../../src/paradigms/tokens'
import type { DisplayVerb } from '../../../../../src/paradigms/verb-types'
import { ArabicText } from '../../components/ArabicText'
import { InfoIcon } from '../../components/InfoIcon'
import { getCopy, type Language } from '../../i18n/copy'
import { useThemeTokens } from '../../theme/tokens'

type ParadigmTableProps = {
  verb: DisplayVerb
  tense: VerbTense
  diacriticsPreference: DiacriticsPreference
  language: Language
  onExplain: (pronoun: PronounId, arabic: string) => void
  onActions: (arabic: string, point: { x: number; y: number }) => void
}

export function ParadigmTable({
  verb,
  tense,
  diacriticsPreference,
  language,
  onExplain,
  onActions,
}: ParadigmTableProps) {
  const theme = useThemeTokens()
  const { t } = getCopy(language)
  const forms = conjugate(verb, tense)
  const shown = PRONOUN_IDS.filter((pronoun) => String(forms[pronoun] ?? '').length > 0)
  const persons: Record<string, string> = { '1': '1st', '2': '2nd', '3': '3rd' }
  const genders: Record<string, string> = { m: 'masculine', f: 'feminine' }
  const numbers: Record<string, string> = { s: 'singular', d: 'dual', p: 'plural' }
  // Ids read person, optional gender, number: `3fs`, `2d`.
  const abbreviation = (pronoun: PronounId) =>
    t(['pronoun', persons[pronoun[0]], numbers[pronoun.slice(-1)], genders[pronoun[1]]].filter(Boolean).join('.'))

  return (
    <View accessibilityLabel={t('verb.table')} accessibilityRole="list">
      {shown.map((pronoun, index) => {
        const arabic = String(forms[pronoun] ?? '')
        const displayed = applyDiacriticsPreference(arabic, diacriticsPreference)
        return (
          <Pressable
            accessibilityLabel={`${t(`pronoun.${pronoun}`)}: ${displayed}`}
            accessibilityRole="button"
            key={pronoun}
            testID="conjugation-form"
            onLongPress={(event) => onActions(arabic, { x: event.nativeEvent.pageX, y: event.nativeEvent.pageY })}
            onPress={() => onExplain(pronoun, arabic)}
            style={{
              minHeight: 64,
              paddingVertical: 8,
              borderBottomWidth: index === shown.length - 1 ? 0 : StyleSheet.hairlineWidth,
              borderBottomColor: theme.border,
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
            }}
          >
            <InfoIcon />
            <View style={{ alignItems: 'flex-end', minWidth: 90 }}>
              <ArabicText locale="ar" style={{ color: theme.inkMuted, fontSize: 19 }}>
                {applyDiacriticsPreference(ARABIC_PRONOUNS[pronoun], diacriticsPreference)}
              </ArabicText>
              <Text style={{ color: theme.inkMuted, fontSize: 12, fontStyle: 'italic', textAlign: 'right' }}>
                {abbreviation(pronoun)}
              </Text>
            </View>
            <ArabicText locale="ar" style={{ fontSize: 32, flex: 1 }}>
              {displayed}
            </ArabicText>
          </Pressable>
        )
      })}
    </View>
  )
}
