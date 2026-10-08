import { useMemo } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { search } from '../../../../../src/paradigms/search'
import type { DiacriticsPreference } from '../../../../../src/paradigms/tokens'
import type { DisplayVerb } from '../../../../../src/paradigms/verb-types'
import { getCopy, type Language } from '../../i18n/copy'
import { useThemeTokens } from '../../theme/tokens'
import { VerbRow } from '../verb/VerbRow'
import { DEFAULT_FILTERS, type FilterState, filterVerbs } from './filter-model'

type VerbListProps = {
  language?: Language
  query?: string
  favouriteVerbIDs?: ReadonlySet<string>
  filters?: FilterState
  diacriticsPreference?: DiacriticsPreference
  topInset?: number
  bottomInset?: number
  onSelect: (verb: DisplayVerb) => void
}

// Enough rows to fill the first screen; FlatList virtualizes the rest.
const INITIAL_ROWS = 30

export function VerbList({
  language = 'en',
  query = '',
  favouriteVerbIDs = new Set<string>(),
  filters = DEFAULT_FILTERS,
  diacriticsPreference = 'all',
  topInset,
  bottomInset,
  onSelect,
}: VerbListProps) {
  const theme = useThemeTokens()
  const { t, translate } = getCopy(language)
  const matches = useMemo(
    () => (query.trim() ? new Set(search(query, { language, translate }).map((verb) => verb.id)) : null),
    [language, query, translate],
  )
  const filtered = useMemo(
    () => filterVerbs(filters, favouriteVerbIDs).filter((verb) => matches == null || matches.has(verb.id)),
    [favouriteVerbIDs, filters, matches],
  )
  return (
    <FlatList
      contentContainerStyle={[
        styles.listContent,
        topInset == null ? null : { paddingTop: topInset },
        bottomInset == null ? null : { paddingBottom: bottomInset },
      ]}
      contentInsetAdjustmentBehavior={topInset == null ? 'automatic' : 'never'}
      data={filtered}
      testID="verb-results"
      initialNumToRender={INITIAL_ROWS}
      keyExtractor={(verb) => verb.id}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={<Text style={[styles.empty, { color: theme.inkSecondary }]}>{t('search.noResults')}</Text>}
      style={[styles.scrollList, { backgroundColor: theme.background }]}
      renderItem={({ item, index }) => (
        <VerbRow
          diacriticsPreference={diacriticsPreference}
          language={language}
          onPress={onSelect}
          showDivider={index < filtered.length - 1}
          testID="verb-row"
          verb={item}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  empty: { fontSize: 16, padding: 12 },
  listContent: { gap: 0, paddingBottom: 24, paddingHorizontal: 16, paddingTop: 12 },
  scrollList: { flex: 1 },
})
