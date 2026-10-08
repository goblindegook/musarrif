import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Text, useWindowDimensions, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import type { DisplayVerb } from '../../../../../../src/paradigms/verb-types'
import { Surface } from '../../../components/Surface'
import { DEFAULT_FILTERS, type FilterState, hasActiveFilters } from '../../../features/browse/filter-model'
import { SearchHeader } from '../../../features/browse/SearchHeader'
import { VerbFilterSheet } from '../../../features/browse/VerbFilterSheet'
import { VerbList } from '../../../features/browse/VerbList'
import { getCopy, useSystemLanguage } from '../../../i18n/copy'
import { useUserData } from '../../../storage/UserDataProvider'
import { useDiacriticsPreference, useFavouriteVerbIDs } from '../../../storage/user-data-hooks'
import { useThemeTokens } from '../../../theme/tokens'

const HEADER_TOP_MARGIN = 8
const HEADER_HEIGHT = 44
const LIST_GAP_BELOW_HEADER = 12

export default function SearchRoute() {
  const router = useRouter()
  const theme = useThemeTokens()
  const { width } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const { ready, error } = useUserData()
  const diacriticsPreference = useDiacriticsPreference()
  const favouriteVerbIDs = useFavouriteVerbIDs()
  const language = useSystemLanguage()
  const { t } = getCopy(language)
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [draftFilters, setDraftFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [filtersOpen, setFiltersOpen] = useState(false)
  if (!ready) {
    return (
      <Surface style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 }}>
        {error ? (
          <Text style={{ color: theme.ink }}>{t('error.library')}</Text>
        ) : (
          <ActivityIndicator accessibilityLabel={t('loading.library')} />
        )}
      </Surface>
    )
  }

  const openVerb = (verb: DisplayVerb) =>
    router.push({ pathname: '/search/verb/[verbId]', params: { verbId: verb.id } })
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <VerbList
        favouriteVerbIDs={favouriteVerbIDs}
        filters={filters}
        diacriticsPreference={diacriticsPreference}
        language={language}
        query={query}
        onSelect={openVerb}
        topInset={insets.top + HEADER_TOP_MARGIN + HEADER_HEIGHT + LIST_GAP_BELOW_HEADER}
        bottomInset={insets.bottom + 16}
      />
      <View style={{ position: 'absolute', top: insets.top + HEADER_TOP_MARGIN, left: 16, right: 16, zIndex: 10 }}>
        <SearchHeader
          width={width}
          placeholder={t('tabs.search')}
          filterLabel={t('browse.filters.show')}
          clearLabel={t('search.clear')}
          closeLabel={t('search.close')}
          query={query}
          filtersActive={hasActiveFilters(filters)}
          onChangeText={setQuery}
          onFilter={() => {
            setDraftFilters(filters)
            setFiltersOpen(true)
          }}
        />
      </View>
      <VerbFilterSheet
        filters={draftFilters}
        isPresented={filtersOpen}
        language={language}
        onApply={() => {
          setFilters(draftFilters)
          setFiltersOpen(false)
        }}
        onChange={setDraftFilters}
        onClear={() => {
          setDraftFilters(DEFAULT_FILTERS)
          setFilters(DEFAULT_FILTERS)
          setFiltersOpen(false)
        }}
        onDismiss={() => setFiltersOpen(false)}
      />
    </View>
  )
}
