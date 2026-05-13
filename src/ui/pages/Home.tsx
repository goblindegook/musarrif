import { styled } from 'goober'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import { tokenize } from '../../paradigms/letters'
import { analyzeRoot } from '../../paradigms/roots'
import { type DisplayVerb, FORMS, KWN_SISTERS_IDS, type VerbForm, verbs, ZNN_SISTERS_IDS } from '../../paradigms/verbs'
import { parseInteger, toRoman } from '../../primitives/numbers'
import { Button } from '../atoms/Button'
import { SelectableButton } from '../atoms/SelectableButton'
import { Subheading } from '../atoms/Subheading'
import { Text } from '../atoms/Text'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useFavourites } from '../hooks/useFavourites'
import { useI18n } from '../hooks/useI18n'
import { useRecent } from '../hooks/useRecent'
import { Panel } from '../molecules/Panel'
import { Search } from '../molecules/SearchBox'
import { TabBar, TabButton, TabPanel } from '../molecules/Tabs'
import { VerbPill } from '../molecules/VerbPill'
import { ConjugateBox } from '../organisms/ConjugateBox'
import { useRouting } from '../routes'

const VERBS_PER_PAGE = 30

const allVerbs = verbs.toSorted((a, b) => a.label.localeCompare(b.label, 'ar'))

type Filters = {
  form: VerbForm | null
  rootTypes: RootTypeFilter[]
  favourites: boolean
  kana: boolean
  zanna: boolean
}

type RootTypeFilter = 'sound' | 'assimilated' | 'hollow' | 'defective' | 'hamzated'
type OtherFilterToggle = 'favourites' | 'kana' | 'zanna'

const ROOT_TYPE_FILTERS: readonly RootTypeFilter[] = ['sound', 'assimilated', 'hollow', 'defective', 'hamzated']

function includesAll<T>(selected: readonly T[], required: readonly T[]): boolean {
  return required.every((item) => selected.includes(item))
}

function getVerbRootTypes(verb: DisplayVerb): RootTypeFilter[] {
  const analysis = analyzeRoot(tokenize(verb.root))
  const result: RootTypeFilter[] = []
  if (analysis.type === 'sound') result.push('sound')
  if (analysis.weakPositions.includes(0)) result.push('assimilated')
  if (analysis.weakPositions.includes(1)) result.push('hollow')
  if (analysis.weakPositions.includes(2)) result.push('defective')
  if (analysis.hamzaPositions.length > 0) result.push('hamzated')
  return result
}

function parseForm(value: string | null): VerbForm | null {
  const parsed = parseInteger(value, 0)
  return FORMS.includes(parsed as VerbForm) ? (parsed as VerbForm) : null
}

function parseRootTypes(values: readonly string[]): RootTypeFilter[] {
  return values.filter((value): value is RootTypeFilter => ROOT_TYPE_FILTERS.includes(value as RootTypeFilter))
}

function parseQuery(params: URLSearchParams): { filters: Filters; page: number } {
  return {
    filters: {
      form: parseForm(params.get('form')),
      rootTypes: parseRootTypes(params.getAll('rootType')),
      favourites: Boolean(params.get('favourites')),
      kana: Boolean(params.get('kana')),
      zanna: Boolean(params.get('zanna')),
    },
    page: Math.max(1, parseInteger(params.get('page'), 1)),
  }
}

function setQueryWithVerbFilters(filters: Filters, page: number): URLSearchParams {
  const next = new URLSearchParams()

  if (filters.form) next.set('form', String(filters.form))

  for (const rootType of filters.rootTypes) next.append('rootType', rootType)

  if (filters.favourites) next.set('favourites', '1')

  if (filters.kana) next.set('kana', '1')

  if (filters.zanna) next.set('zanna', '1')

  if (page > 1) next.set('page', String(page))

  return next
}

export function Home() {
  const { t, lang, dir } = useI18n()
  const { navigateTo, queryParams, route, setQueryParams } = useRouting()
  const { favourites } = useFavourites()
  const { recents } = useRecent()
  const { filters, page } = parseQuery(queryParams)
  const [searchTab, setSearchTab] = useState<'search' | 'build'>('search')

  useDocumentTitle(t('title'))

  const handleSelect = useCallback(
    (verb: DisplayVerb) => {
      navigateTo(['verbs', verb.id])
    },
    [navigateTo],
  )

  const sortedRecents = useMemo(() => recents, [recents])
  const favouriteVerbIds = useMemo(() => new Set(favourites.map((verb) => verb.id)), [favourites])
  const visibleVerbs = useMemo(() => {
    let filtered = allVerbs
    if (filters.form != null) filtered = filtered.filter((verb) => verb.form === filters.form)
    if (filters.rootTypes.length > 0) {
      filtered = filtered.filter((verb) => includesAll(getVerbRootTypes(verb), filters.rootTypes))
    }
    if (filters.favourites) filtered = filtered.filter((verb) => favouriteVerbIds.has(verb.id))
    if (filters.kana) filtered = filtered.filter((verb) => KWN_SISTERS_IDS.has(verb.id))
    if (filters.zanna) filtered = filtered.filter((verb) => ZNN_SISTERS_IDS.has(verb.id))
    return filtered
  }, [favouriteVerbIds, filters])

  const pageCount = Math.max(1, Math.ceil(visibleVerbs.length / VERBS_PER_PAGE))
  const currentPage = Math.min(page, pageCount)

  useEffect(() => {
    if (route[0] !== 'verbs' || route[1] != null) return
    if (page === currentPage) return
    setQueryParams(setQueryWithVerbFilters(filters, currentPage))
  }, [currentPage, filters, page, route, setQueryParams])

  const paginatedVerbs = useMemo(() => {
    const start = (currentPage - 1) * VERBS_PER_PAGE
    return visibleVerbs.slice(start, start + VERBS_PER_PAGE)
  }, [currentPage, visibleVerbs])

  const selectFormFilter = useCallback(
    (form: VerbForm) => {
      setQueryParams((current) => {
        const { filters: currentFilters } = parseQuery(current)
        const nextFilters = {
          ...currentFilters,
          form: currentFilters.form === form ? null : form,
        }
        return setQueryWithVerbFilters(nextFilters, 1)
      })
    },
    [setQueryParams],
  )

  const toggleOtherFilter = useCallback(
    (filter: OtherFilterToggle) => {
      setQueryParams((current) => {
        const { filters: currentFilters } = parseQuery(current)
        return setQueryWithVerbFilters({ ...currentFilters, [filter]: !currentFilters[filter] }, 1)
      })
    },
    [setQueryParams],
  )

  const toggleRootTypeFilter = useCallback(
    (rootType: RootTypeFilter) => {
      setQueryParams((current) => {
        const { filters: currentFilters } = parseQuery(current)
        const hasRootType = currentFilters.rootTypes.includes(rootType)
        const rootTypes: RootTypeFilter[] = hasRootType
          ? currentFilters.rootTypes.filter((value) => value !== rootType)
          : rootType === 'sound'
            ? ['sound']
            : [...currentFilters.rootTypes.filter((value) => value !== 'sound'), rootType]

        return setQueryWithVerbFilters({ ...currentFilters, rootTypes }, 1)
      })
    },
    [setQueryParams],
  )

  return (
    <Main>
      <Stack area="search">
        <Panel>
          <TabBar role="tablist">
            <TabButton
              role="tab"
              type="button"
              aria-selected={searchTab === 'search'}
              aria-controls="panel-content-search"
              active={searchTab === 'search'}
              fluid
              onClick={() => setSearchTab('search')}
            >
              {t('tabs.search')}
            </TabButton>
            <TabButton
              role="tab"
              type="button"
              aria-selected={searchTab === 'build'}
              aria-controls="panel-content-build"
              active={searchTab === 'build'}
              fluid
              onClick={() => setSearchTab('build')}
            >
              {t('tabs.build')}
            </TabButton>
          </TabBar>

          {searchTab === 'search' && (
            <TabPanel
              id="panel-content-search"
              role="tabpanel"
              aria-labelledby="panel-tab-search"
              aria-label={t('tabs.search')}
            >
              <Search id="verb-search-input" onSelect={handleSelect} />
            </TabPanel>
          )}

          {searchTab === 'build' && (
            <TabPanel
              id="panel-content-build"
              role="tabpanel"
              aria-labelledby="panel-tab-build"
              aria-label={t('tabs.build')}
            >
              <ConjugateBox onSelect={handleSelect} />
            </TabPanel>
          )}
        </Panel>

        {sortedRecents.length > 0 && (
          <Panel title={t('recentlyViewed')} dir={dir} lang={lang} collapsible>
            <InlineVerbList>
              {sortedRecents.map((verb) => (
                <VerbPill key={verb.id} verb={verb} />
              ))}
            </InlineVerbList>
          </Panel>
        )}

        <Panel title={t('favourites')} dir={dir} lang={lang} collapsible defaultCollapsed>
          {favourites.length > 0 ? (
            <InlineVerbList>
              {favourites.map((verb) => (
                <VerbPill key={verb.id} verb={verb} />
              ))}
            </InlineVerbList>
          ) : (
            <Text dir={dir} lang={lang}>
              {t('favourites.empty')}
            </Text>
          )}
        </Panel>
      </Stack>

      <Stack area="verbList">
        <Panel title={t('verbList.title')} dir={dir} lang={lang}>
          <FilterGroup>
            <Subheading dir={dir} lang={lang}>
              {t('verbsList.filter.form.title')}
            </Subheading>
            <FilterBar role="group" aria-label={t('aria.selectForm')}>
              {FORMS.map((form) => (
                <SelectableButton
                  key={form}
                  id={`form-tab-${form}`}
                  type="button"
                  aria-selected={filters.form === form}
                  aria-controls={`form-panel-${form}`}
                  active={filters.form === form}
                  onClick={() => selectFormFilter(form)}
                >
                  {toRoman(form)}
                </SelectableButton>
              ))}
            </FilterBar>
          </FilterGroup>

          <FilterGroup>
            <Subheading dir={dir} lang={lang}>
              {t('verbsList.filter.rootType.title')}
            </Subheading>
            <FilterBar role="group" aria-label={t('verbsList.filter.rootType.title')}>
              {ROOT_TYPE_FILTERS.map((rootType) => (
                <SelectableButton
                  key={rootType}
                  type="button"
                  aria-pressed={filters.rootTypes.includes(rootType)}
                  active={filters.rootTypes.includes(rootType)}
                  onClick={() => toggleRootTypeFilter(rootType)}
                >
                  {t(`verbsList.filter.rootType.${rootType}.label`)}
                </SelectableButton>
              ))}
            </FilterBar>
          </FilterGroup>

          <FilterGroup>
            <Subheading dir={dir} lang={lang}>
              {t('verbsList.filter.other.title')}
            </Subheading>
            <FilterBar role="group" aria-label={t('verbsList.filter.other.title')}>
              <SelectableButton
                type="button"
                aria-pressed={filters.favourites}
                active={filters.favourites}
                onClick={() => toggleOtherFilter('favourites')}
              >
                {t('verbsList.filter.favourites.label')}
              </SelectableButton>
              <SelectableButton
                type="button"
                aria-pressed={filters.kana}
                active={filters.kana}
                onClick={() => toggleOtherFilter('kana')}
              >
                {t('verbsList.filter.kanaSisters.label')}
              </SelectableButton>
              <SelectableButton
                type="button"
                aria-pressed={filters.zanna}
                active={filters.zanna}
                onClick={() => toggleOtherFilter('zanna')}
              >
                {t('verbsList.filter.zannaSisters.label')}
              </SelectableButton>
            </FilterBar>
          </FilterGroup>

          <VerbResults>
            <VerbList>
              {paginatedVerbs.map((verb) => (
                <VerbPill key={verb.id} verb={verb} block />
              ))}
            </VerbList>
            {pageCount > 1 && (
              <PaginationBar>
                <Button
                  disabled={currentPage === 1}
                  onClick={() => setQueryParams(setQueryWithVerbFilters(filters, currentPage - 1))}
                >
                  {t('pagination.previous')}
                </Button>
                <PaginationStatus dir={dir} lang={lang}>
                  {t('pagination.page', { current: String(currentPage), total: String(pageCount) })}
                </PaginationStatus>
                <Button
                  disabled={currentPage === pageCount}
                  onClick={() => setQueryParams(setQueryWithVerbFilters(filters, currentPage + 1))}
                >
                  {t('pagination.next')}
                </Button>
              </PaginationBar>
            )}
          </VerbResults>
        </Panel>
      </Stack>
    </Main>
  )
}

const Main = styled('main')`
  width: 100%;
  display: grid;
  gap: 1rem;
  grid-auto-rows: min-content;
  align-items: start;
  max-width: 600px;
  margin: 0 auto;
  grid-template-columns: 1fr;
  grid-template-areas: 'search' 'verbList';

  @media (min-width: 960px) {
    gap: 1.25rem;
    max-width: inherit;
    grid-template-columns: 1fr 1.5fr;
    grid-template-rows: auto auto 1fr;
    grid-template-areas:
      'search verbList';
  }
`

const Stack = styled('div')<{ area: 'search' | 'verbList' }>`
  grid-area: ${({ area: gridArea }) => gridArea};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-self: flex-start;
`

const FilterGroup = styled('section')`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const FilterBar = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 640px) {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, auto));
  }
`

const VerbList = styled('div')`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  
  & > * {
    min-width: 0;
  }
`

const PaginationBar = styled('div')`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  gap: 0.75rem;
  align-items: center;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const PaginationStatus = styled('div')`
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  text-align: center;
`

const InlineVerbList = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const VerbResults = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  outline: none;
  padding-top: 0.5rem;
`
