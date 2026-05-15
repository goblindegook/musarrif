import { styled } from 'goober'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import * as v from 'valibot'
import { analyzeRoot } from '../../paradigms/roots'
import { tokenize } from '../../paradigms/tokens'
import { type DisplayVerb, FORMS, KWN_SISTERS_IDS, type VerbForm, verbs, ZNN_SISTERS_IDS } from '../../paradigms/verbs'
import { toRoman } from '../../primitives/numbers'
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

type RootTypeFilter = 'sound' | 'assimilated' | 'hollow' | 'defective' | 'hamzated'

const ROOT_TYPE_FILTERS: readonly RootTypeFilter[] = ['sound', 'assimilated', 'hollow', 'defective', 'hamzated']

type GroupFilter = 'favourites' | 'kana' | 'zanna'

interface Query {
  filters: {
    form: VerbForm | null
    root: RootTypeFilter[]
    group: GroupFilter | null
  }
  page: number
}

const Query = v.object({
  filters: v.object({
    form: v.fallback(v.nullable(v.pipe(v.string(), v.toNumber(), v.picklist(FORMS))), null),
    root: v.fallback(v.array(v.picklist(ROOT_TYPE_FILTERS)), []),
    group: v.fallback(v.nullable(v.picklist(['favourites', 'kana', 'zanna'])), null),
  }),
  page: v.fallback(v.pipe(v.string(), v.toNumber(), v.toMinValue(1)), 1),
})

function parseQuery(params: URLSearchParams): Query {
  return v.parse(Query, {
    filters: {
      form: params.get('form'),
      root: params.getAll('root'),
      group: params.get('group'),
    },
    page: params.get('page'),
  })
}

function setQuery(query: Query): URLSearchParams {
  const next = new URLSearchParams()
  if (query.filters.form) next.set('form', String(query.filters.form))
  for (const rootType of query.filters.root) next.append('root', rootType)
  if (query.filters.group) next.set('group', query.filters.group)
  if (query.page > 1) next.set('page', String(query.page))
  return next
}

const OTHER_FILTERS: readonly { key: GroupFilter; labelKey: string }[] = [
  { key: 'favourites', labelKey: 'verbsList.filter.favourites.label' },
  { key: 'kana', labelKey: 'verbsList.filter.kanaSisters.label' },
  { key: 'zanna', labelKey: 'verbsList.filter.zannaSisters.label' },
]

function getVerbRootTypes(verb: DisplayVerb): RootTypeFilter[] {
  const analysis = analyzeRoot(tokenize(verb.root))
  const result: RootTypeFilter[] = []
  if (analysis.weakPositions.length === 0 && analysis.hamzaPositions.length === 0) result.push('sound')
  if (analysis.weakPositions.includes(0)) result.push('assimilated')
  if (analysis.weakPositions.includes(1)) result.push('hollow')
  if (analysis.weakPositions.includes(2)) result.push('defective')
  if (analysis.hamzaPositions.length > 0) result.push('hamzated')
  return result
}

function withFormFilter(query: Query, option: VerbForm): Query {
  return { ...query, filters: { ...query.filters, form: query.filters.form === option ? null : option }, page: 1 }
}

function withGroupFilter(query: Query, option: GroupFilter): Query {
  return { ...query, filters: { ...query.filters, group: query.filters.group === option ? null : option }, page: 1 }
}

function withRootTypeFilter(query: Query, option: RootTypeFilter): Query {
  let root = query.filters.root
  const exists = root.includes(option)
  if (exists) root = root.filter((f) => f !== option)
  if (!exists && option === 'sound') root = ['sound']
  if (!exists && option !== 'sound') root = [...root.filter((entry) => entry !== 'sound'), option]
  return { filters: { ...query.filters, root }, page: 1 }
}

function filterVerbs({ filters }: Query, favouriteVerbIds: ReadonlySet<string>): DisplayVerb[] {
  let filtered = allVerbs
  if (filters.form) filtered = filtered.filter((verb) => verb.form === filters.form)
  if (filters.root.length > 0)
    filtered = filtered.filter((verb) => filters.root.every((item) => getVerbRootTypes(verb).includes(item)))
  if (filters.group === 'favourites') filtered = filtered.filter((verb) => favouriteVerbIds.has(verb.id))
  if (filters.group === 'kana') filtered = filtered.filter((verb) => KWN_SISTERS_IDS.has(verb.id))
  if (filters.group === 'zanna') filtered = filtered.filter((verb) => ZNN_SISTERS_IDS.has(verb.id))
  return filtered
}

export function Home() {
  const { t, lang, dir } = useI18n()
  const { navigateTo, queryParams, route, setQueryParams } = useRouting()
  const { favourites } = useFavourites()
  const { recents } = useRecent()
  const [searchTab, setSearchTab] = useState<'search' | 'build'>('search')

  useDocumentTitle(t('title'))

  const query = useMemo(() => parseQuery(queryParams), [queryParams])
  const favouriteVerbIds = useMemo(() => new Set(favourites.map((verb) => verb.id)), [favourites])
  const visibleVerbs = useMemo(() => filterVerbs(query, favouriteVerbIds), [favouriteVerbIds, query])

  const handleSelect = useCallback((verb: DisplayVerb) => navigateTo(['verbs', verb.id]), [navigateTo])

  const isFilterDisabled = useCallback(
    (isActive: boolean, query: Query) => !isActive && filterVerbs(query, favouriteVerbIds).length === 0,
    [favouriteVerbIds],
  )

  const pageCount = Math.max(1, Math.ceil(visibleVerbs.length / VERBS_PER_PAGE))
  const currentPage = Math.min(query.page, pageCount)

  useEffect(() => {
    if (route[0] !== 'verbs' || route[1] != null) return
    if (query.page === currentPage) return
    setQueryParams(setQuery(query))
  }, [currentPage, query, route, setQueryParams])

  const paginatedVerbs = useMemo(() => {
    const start = (currentPage - 1) * VERBS_PER_PAGE
    return visibleVerbs.slice(start, start + VERBS_PER_PAGE)
  }, [currentPage, visibleVerbs])

  const applyFormFilter = useCallback(
    (option: VerbForm) => setQueryParams((current) => setQuery(withFormFilter(parseQuery(current), option))),
    [setQueryParams, query],
  )

  const applyRootTypeFilter = useCallback(
    (option: RootTypeFilter) => setQueryParams((current) => setQuery(withRootTypeFilter(parseQuery(current), option))),
    [setQueryParams, query],
  )

  const applyGroupFilter = useCallback(
    (option: GroupFilter) => setQueryParams((current) => setQuery(withGroupFilter(parseQuery(current), option))),
    [setQueryParams, query],
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
              data-tour-step="2"
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

        {recents.length > 0 && (
          <Panel title={t('recentlyViewed')} dir={dir} lang={lang} collapsible>
            <InlineVerbList>
              {recents.map((verb) => (
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
        {/* FIXME: data-tour-step should be on Panel */}
        <div data-tour-step="1">
          <Panel title={t('verbList.title')} dir={dir} lang={lang}>
            <FilterGroup>
              <Subheading dir={dir} lang={lang}>
                {t('verbsList.filter.form.title')}
              </Subheading>
              <FilterBar role="group" aria-label={t('aria.selectForm')}>
                {FORMS.map((option) => (
                  <SelectableButton
                    key={option}
                    id={`form-tab-${option}`}
                    type="button"
                    aria-selected={query.filters.form === option}
                    aria-controls={`form-panel-${option}`}
                    active={query.filters.form === option}
                    disabled={isFilterDisabled(query.filters.form === option, withFormFilter(query, option))}
                    onClick={() => applyFormFilter(option)}
                  >
                    {toRoman(option)}
                  </SelectableButton>
                ))}
              </FilterBar>
            </FilterGroup>

            <FilterGroup>
              <Subheading dir={dir} lang={lang}>
                {t('verbsList.filter.rootType.title')}
              </Subheading>
              <FilterBar role="group" aria-label={t('verbsList.filter.rootType.title')}>
                {ROOT_TYPE_FILTERS.map((option) => (
                  <SelectableButton
                    key={option}
                    type="button"
                    aria-pressed={query.filters.root.includes(option)}
                    active={query.filters.root.includes(option)}
                    disabled={isFilterDisabled(query.filters.root.includes(option), withRootTypeFilter(query, option))}
                    onClick={() => applyRootTypeFilter(option)}
                  >
                    {t(`verbsList.filter.rootType.${option}.label`)}
                  </SelectableButton>
                ))}
              </FilterBar>
            </FilterGroup>

            <FilterGroup>
              <Subheading dir={dir} lang={lang}>
                {t('verbsList.filter.other.title')}
              </Subheading>
              <FilterBar role="group" aria-label={t('verbsList.filter.other.title')}>
                {OTHER_FILTERS.map((option) => (
                  <SelectableButton
                    key={option.key}
                    type="button"
                    aria-pressed={query.filters.group === option.key}
                    active={query.filters.group === option.key}
                    disabled={isFilterDisabled(query.filters.group === option.key, withGroupFilter(query, option.key))}
                    onClick={() => applyGroupFilter(option.key)}
                  >
                    {t(option.labelKey)}
                  </SelectableButton>
                ))}
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
                    onClick={() => setQueryParams(setQuery({ ...query, page: currentPage - 1 }))}
                  >
                    {t('pagination.previous')}
                  </Button>
                  <PaginationStatus dir={dir} lang={lang}>
                    {t('pagination.page', { current: String(currentPage), total: String(pageCount) })}
                  </PaginationStatus>
                  <Button
                    disabled={currentPage === pageCount}
                    onClick={() => setQueryParams(setQuery({ ...query, page: currentPage + 1 }))}
                  >
                    {t('pagination.next')}
                  </Button>
                </PaginationBar>
              )}
            </VerbResults>
          </Panel>
        </div>
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
