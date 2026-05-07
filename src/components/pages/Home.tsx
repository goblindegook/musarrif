import { styled } from 'goober'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { useFavourites } from '../../hooks/useFavourites'
import { useI18n } from '../../hooks/useI18n'
import { useRecent } from '../../hooks/useRecent'
import { type DisplayVerb, FORMS, KWN_SISTERS_IDS, type VerbForm, verbs, ZNN_SISTERS_IDS } from '../../paradigms/verbs'
import { parseInteger, toRoman } from '../../primitives/numbers'
import { useRouting } from '../../routes'
import { Button } from '../atoms/Button'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Panel } from '../molecules/Panel'
import { QuickPickList } from '../molecules/QuickPickList'
import { Search } from '../molecules/SearchBox'
import { TabBar, TabButton, TabPanel } from '../molecules/Tabs'
import { VerbPill } from '../molecules/VerbPill'
import { ConjugateBox } from '../organisms/ConjugateBox'

const VERBS_PER_PAGE = 30

const allVerbs = verbs.toSorted((a, b) => a.label.localeCompare(b.label, 'ar'))

type Filters = {
  form: VerbForm | null
  kana: boolean
  zanna: boolean
}

function parseForm(value: string | null): VerbForm | null {
  const parsed = parseInteger(value, 0)
  if (parsed === 0) return null
  return FORMS.includes(parsed as VerbForm) ? (parsed as VerbForm) : null
}

function parseQuery(params: URLSearchParams): { filters: Filters; page: number } {
  return {
    filters: {
      form: parseForm(params.get('form')),
      kana: Boolean(params.get('kana')),
      zanna: Boolean(params.get('zanna')),
    },
    page: Math.max(1, parseInteger(params.get('page'), 1)),
  }
}

function setQueryWithVerbFilters(current: URLSearchParams, filters: Filters, page: number): URLSearchParams {
  const next = new URLSearchParams(current)

  if (filters.form != null) next.set('form', String(filters.form))
  else next.delete('form')

  if (filters.kana) next.set('kana', '1')
  else next.delete('kana')

  if (filters.zanna) next.set('zanna', '1')
  else next.delete('zanna')

  if (page > 1) next.set('page', String(page))
  else next.delete('page')

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
  const visibleVerbs = useMemo(() => {
    let filtered = allVerbs
    if (filters.form != null) filtered = filtered.filter((verb) => verb.form === filters.form)
    if (!filters.kana && !filters.zanna) return filtered
    return filtered.filter(
      (verb) => (filters.kana && KWN_SISTERS_IDS.has(verb.id)) || (filters.zanna && ZNN_SISTERS_IDS.has(verb.id)),
    )
  }, [filters])

  const pageCount = Math.max(1, Math.ceil(visibleVerbs.length / VERBS_PER_PAGE))
  const currentPage = Math.min(page, pageCount)

  useEffect(() => {
    if (route[0] !== 'verbs' || route[1] != null) return
    if (page === currentPage) return
    setQueryParams((current) => setQueryWithVerbFilters(current, filters, currentPage))
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
        return setQueryWithVerbFilters(current, nextFilters, 1)
      })
    },
    [setQueryParams],
  )

  const toggleKanaSistersFilter = useCallback(() => {
    setQueryParams((current) => {
      const { filters: currentFilters } = parseQuery(current)
      return setQueryWithVerbFilters(current, { ...currentFilters, kana: !currentFilters.kana }, 1)
    })
  }, [setQueryParams])

  const toggleZannaSistersFilter = useCallback(() => {
    setQueryParams((current) => {
      const { filters: currentFilters } = parseQuery(current)
      return setQueryWithVerbFilters(current, { ...currentFilters, zanna: !currentFilters.zanna }, 1)
    })
  }, [setQueryParams])

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
              <Heading dir={dir} lang={lang}>
                {t('quickPicks')}
              </Heading>
              <QuickPickList />
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
        <Panel title={t('verbList.title')} dir={dir} lang={lang} collapsible>
          <FilterGroup>
            <FilterGroupTitle dir={dir} lang={lang}>
              {t('verbsList.filter.form.title')}
            </FilterGroupTitle>
            <FilterBar role="group" aria-label={t('aria.selectForm')}>
              {FORMS.map((form) => (
                <FilterButton
                  key={form}
                  id={`form-tab-${form}`}
                  type="button"
                  aria-selected={filters.form === form}
                  aria-controls={`form-panel-${form}`}
                  active={filters.form === form}
                  onClick={() => selectFormFilter(form)}
                >
                  {toRoman(form)}
                </FilterButton>
              ))}
            </FilterBar>
          </FilterGroup>

          <FilterGroup>
            <FilterGroupTitle dir={dir} lang={lang}>
              {t('verbsList.filter.other.title')}
            </FilterGroupTitle>
            <FilterBar role="group" aria-label={t('verbsList.filter.other.title')}>
              <FilterButton
                type="button"
                aria-pressed={filters.kana}
                active={filters.kana}
                onClick={toggleKanaSistersFilter}
              >
                {t('verbsList.filter.kanaSisters.label')}
              </FilterButton>
              <FilterButton
                type="button"
                aria-pressed={filters.zanna}
                active={filters.zanna}
                onClick={toggleZannaSistersFilter}
              >
                {t('verbsList.filter.zannaSisters.label')}
              </FilterButton>
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
                  onClick={() =>
                    setQueryParams((current) => setQueryWithVerbFilters(current, filters, currentPage - 1))
                  }
                >
                  {t('pagination.previous')}
                </Button>
                <PaginationStatus dir={dir} lang={lang}>
                  {t('pagination.page', { current: String(currentPage), total: String(pageCount) })}
                </PaginationStatus>
                <Button
                  disabled={currentPage === pageCount}
                  onClick={() =>
                    setQueryParams((current) => setQueryWithVerbFilters(current, filters, currentPage + 1))
                  }
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

const FilterGroupTitle = styled('h4')`
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
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

const FilterButton = styled('button')<{ active: boolean }>`
  align-items: center;
  background: ${({ active }) => (active ? 'var(--color-bg-accent)' : 'var(--color-bg-surface)')};
  border-radius: 0.75rem;
  border: 1px solid ${({ active }) => (active ? 'var(--color-accent)' : 'var(--color-border)')};
  box-shadow: ${({ active }) => (active ? 'var(--shadow-interactive-active)' : 'none')};
  color: ${({ active }) => (active ? 'var(--color-text-emphasis)' : 'var(--color-text-secondary)')};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 0.8rem;
  justify-content: center;
  letter-spacing: 0.08em;
  min-height: 2.4rem;
  padding: 0.4rem 0.75rem;
  text-transform: uppercase;
  transition:
    background 180ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 180ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 180ms cubic-bezier(0.22, 1, 0.36, 1),
    color 180ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 180ms cubic-bezier(0.22, 1, 0.36, 1);

  &:active {
    transform: scale(0.96);
  }

  &:hover {
    background: ${({ active }) => (active ? 'var(--color-bg-accent)' : 'var(--color-bg-accent-hover)')};
    border-color: var(--color-accent);
    color: ${({ active }) => (active ? 'var(--color-text-emphasis)' : 'var(--color-text-primary)')};
    box-shadow: ${({ active }) => (active ? 'var(--shadow-interactive-active)' : 'var(--shadow-interactive-hover)')};
  }

  &:focus-visible {
    outline: 3px solid var(--color-focus-outline);
    outline-offset: 2px;
    border-color: var(--color-accent);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
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
