import { styled } from 'goober'
import { useCallback, useMemo, useState } from 'preact/hooks'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { useFavourites } from '../../hooks/useFavourites'
import { useI18n } from '../../hooks/useI18n'
import { useRecent } from '../../hooks/useRecent'
import { type DisplayVerb, FORM_LABELS, FORMS, verbs } from '../../paradigms/verbs'
import { useRouting } from '../../routes'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Panel } from '../molecules/Panel'
import { QuickPickList } from '../molecules/QuickPickList'
import { Search } from '../molecules/SearchBox'
import { TabBar, TabButton, TabPanel } from '../molecules/Tabs'
import { VerbPill } from '../molecules/VerbPill'
import { ConjugateBox } from '../organisms/ConjugateBox'

type FormNumber = (typeof FORMS)[number]

const verbsByForm = (() => {
  const grouped = new Map<FormNumber, DisplayVerb[]>()
  for (const form of FORMS) grouped.set(form, [])
  for (const verb of verbs) grouped.get(verb.form)?.push(verb)
  for (const form of FORMS) {
    const entries = grouped.get(form) ?? []
    grouped.set(
      form,
      entries.sort((a, b) => a.label.localeCompare(b.label, 'ar')),
    )
  }

  return grouped
})()

export function Home() {
  const { t, lang, dir } = useI18n()
  const { navigateTo } = useRouting()
  const { favourites } = useFavourites()
  const { recents } = useRecent()
  const [selectedFormTab, setSelectedFormTab] = useState<FormNumber>(1)
  const [searchTab, setSearchTab] = useState<'search' | 'build'>('search')

  useDocumentTitle(t('title'))

  const handleSelect = useCallback(
    (verb: DisplayVerb) => {
      navigateTo(['verbs', verb.id])
    },
    [navigateTo],
  )

  const isMobile = useMemo(() => window.innerWidth < 960, [])

  const sortedRecents = useMemo(() => recents, [recents])

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
            <VerbList>
              {sortedRecents.map((verb) => (
                <VerbPill key={verb.id} verb={verb} />
              ))}
            </VerbList>
          </Panel>
        )}

        <Panel title={t('favourites')} dir={dir} lang={lang} collapsible defaultCollapsed>
          {favourites.length > 0 ? (
            <VerbList>
              {favourites.map((verb) => (
                <VerbPill key={verb.id} verb={verb} />
              ))}
            </VerbList>
          ) : (
            <Text dir={dir} lang={lang}>
              {t('favourites.empty')}
            </Text>
          )}
        </Panel>
      </Stack>

      <Stack area="verbList">
        <Panel title={t('verbsByForm.title')} dir={dir} lang={lang} collapsible defaultCollapsed={isMobile}>
          <TabBar wrap role="tablist" aria-label={t('aria.selectForm')}>
            {FORMS.map((form) => (
              <TabButton
                key={form}
                id={`form-tab-${form}`}
                role="tab"
                type="button"
                aria-selected={selectedFormTab === form}
                aria-controls={`form-panel-${form}`}
                size="sm"
                fluid
                active={selectedFormTab === form}
                onClick={() => setSelectedFormTab(form)}
              >
                {FORM_LABELS[form - 1]}
              </TabButton>
            ))}
          </TabBar>
          <TabPanel
            role="tabpanel"
            id={`form-panel-${selectedFormTab}`}
            aria-labelledby={`form-tab-${selectedFormTab}`}
            aria-label={t('meta.form.withNumber', { form: FORM_LABELS[selectedFormTab - 1] })}
          >
            <VerbList>
              {(verbsByForm.get(selectedFormTab) ?? []).map((verb) => (
                <VerbPill key={verb.id} verb={verb} />
              ))}
            </VerbList>
          </TabPanel>
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

const VerbList = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`
