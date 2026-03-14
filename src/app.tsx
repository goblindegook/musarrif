import { styled } from 'goober'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import { AppHeader } from './components/AppHeader'
import { Heading } from './components/atoms/Heading'
import { Text } from './components/atoms/Text'
import { ConjugateBox } from './components/ConjugateBox'
import { ConjugationTable } from './components/ConjugationTable'
import { CopyButton } from './components/CopyButton'
import { Detail } from './components/Detail'
import { FavouriteButton } from './components/FavouriteButton'
import { FormInsights } from './components/FormInsights'
import { Modal } from './components/Modal'
import { Panel } from './components/Panel'
import { QuickPickList } from './components/QuickPickList'
import { RootInsights } from './components/RootInsights'
import { Search } from './components/SearchBox'
import { ShareButton } from './components/ShareButton'
import { SpeechButton } from './components/SpeechButton'
import { TabBar, TabButton, TabPanel } from './components/Tabs'
import { VerbPill } from './components/VerbPill'
import { useI18n } from './hooks/i18n'
import {
  FAVOURITE_VERBS_STORAGE_KEY,
  RECENT_VERBS_STORAGE_KEY,
  readPreference,
  writePreference,
} from './hooks/preferences'
import { useRouting } from './hooks/routing'
import enTranslations from './locales/en.json'
import type { Mood } from './paradigms/active/present'
import { formIPastVowel, formIPresentVowel } from './paradigms/form-i-vowels'
import { applyDiacriticsPreference } from './paradigms/letters'
import { deriveMasdar } from './paradigms/nominal/masdar'
import { deriveActiveParticiple } from './paradigms/nominal/participle-active'
import { derivePassiveParticiple } from './paradigms/nominal/participle-passive'
import { search } from './paradigms/selection'
import { buildVerbFromId, type DisplayVerb, getVerbById, type Tense, type Voice, verbs } from './paradigms/verbs'

const formIVowelPattern = (verb: DisplayVerb<1>) => {
  const past = formIPastVowel(verb)
  const present = formIPresentVowel(verb)
  return past === present ? `\u25cc${past}` : `\u25cc${past} / \u25cc${present}`
}

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'] as const
const FORM_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const
type FormNumber = (typeof FORM_NUMBERS)[number]

const readRecentVerbIds = (): readonly string[] => {
  try {
    const parsed = JSON.parse(readPreference(RECENT_VERBS_STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const readFavouriteVerbIds = (): readonly string[] => {
  try {
    const parsed = JSON.parse(readPreference(FAVOURITE_VERBS_STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const verbsByForm = (() => {
  const grouped = new Map<FormNumber, DisplayVerb[]>()
  for (const form of FORM_NUMBERS) grouped.set(form, [])

  verbs.forEach((verb) => {
    grouped.get(verb.form)?.push(verb)
  })

  for (const form of FORM_NUMBERS) {
    const entries = grouped.get(form) ?? []
    grouped.set(
      form,
      entries.sort((a, b) => a.label.localeCompare(b.label, 'ar')),
    )
  }

  return grouped
})()

export function App() {
  const { t, tHtml, lang, dir, diacriticsPreference } = useI18n()
  const { verbId, navigateToVerb, tense, mood, voice } = useRouting()
  const [isFormInfoOpen, setIsFormInfoOpen] = useState(false)
  const [isRootInfoOpen, setIsRootInfoOpen] = useState(false)
  const [selectedFormTab, setSelectedFormTab] = useState<FormNumber>(FORM_NUMBERS[0])
  const [recentVerbIds, setRecentVerbIds] = useState<readonly string[]>(readRecentVerbIds)
  const [favouriteVerbIds, setFavouriteVerbIds] = useState<readonly string[]>(readFavouriteVerbIds)
  const [syntheticVerb, setSyntheticVerb] = useState<DisplayVerb | undefined>()
  const routeVerb = useMemo(() => buildVerbFromId(verbId), [verbId])
  const [searchTab, setSearchTab] = useState<'search' | 'build'>(() => {
    if (getVerbById(verbId)) return 'search'
    return routeVerb ? 'build' : 'search'
  })

  const translateVerb = useCallback(
    (verb: DisplayVerb) => {
      if (!getVerbById(verb.id)) return '—'
      if (lang === 'ar') return (enTranslations.verbs as Record<string, string>)[verb.id]
      return t(verb.id)
    },
    [lang, t],
  )

  const formatArabic = useMemo(
    () => (value: string | null) => applyDiacriticsPreference(value ?? '', diacriticsPreference),
    [diacriticsPreference],
  )

  const selectedVerb = useMemo(
    () => (syntheticVerb?.id === verbId ? syntheticVerb : routeVerb),
    [syntheticVerb, verbId, routeVerb],
  )

  const handleSelect = useCallback(
    (verb: DisplayVerb) => {
      setSyntheticVerb(verb)
      navigateToVerb(verb.id)
    },
    [navigateToVerb],
  )

  useEffect(() => {
    setIsFormInfoOpen(false)
    setIsRootInfoOpen(false)
  }, [selectedVerb])

  useEffect(() => {
    document.title = [formatArabic(selectedVerb?.label ?? ''), t('title')].filter(Boolean).join(' · ')
  }, [selectedVerb, formatArabic, t])

  const derivedForms = useMemo(
    () => (selectedVerb?.root ? search(selectedVerb?.root, { exactRoot: true }).sort((a, b) => a.form - b.form) : []),
    [selectedVerb?.root],
  )

  const recentVerbs = useMemo(
    () =>
      recentVerbIds
        .map((id) => getVerbById(id))
        .filter((verb): verb is DisplayVerb => verb != null && verb.id !== selectedVerb?.id),
    [recentVerbIds, selectedVerb?.id],
  )

  const isFavourite = selectedVerb ? favouriteVerbIds.includes(selectedVerb.id) : false

  const toggleFavourite = useCallback(() => {
    if (!selectedVerb) return
    setFavouriteVerbIds((currentIds) => {
      const nextIds = currentIds.includes(selectedVerb.id)
        ? currentIds.filter((id) => id !== selectedVerb.id)
        : [...currentIds, selectedVerb.id]
      writePreference(FAVOURITE_VERBS_STORAGE_KEY, JSON.stringify(nextIds))
      return nextIds
    })
  }, [selectedVerb])

  const favouriteVerbs = useMemo(
    () =>
      favouriteVerbIds
        .map((id) => buildVerbFromId(id))
        .filter((verb): verb is DisplayVerb => verb != null)
        .sort((a, b) => a.label.localeCompare(b.label, 'ar')),
    [favouriteVerbIds],
  )

  useEffect(() => {
    if (!selectedVerb) return
    setRecentVerbIds((currentIds) => {
      const nextIds = [selectedVerb.id, ...currentIds.filter((id) => id !== selectedVerb.id)].slice(0, 11)
      writePreference(RECENT_VERBS_STORAGE_KEY, JSON.stringify(nextIds))
      return nextIds
    })
  }, [selectedVerb?.id])

  const selectedFormLabel = selectedVerb ? `${t('meta.form')} ${ROMAN_NUMERALS[selectedVerb.form - 1]}` : undefined
  const formInsightsLabel = selectedFormLabel ? `${selectedFormLabel} — ${t('formInfo.open')}` : t('formInfo.open')

  const selectedVoice: Voice = voice ?? 'active'
  const selectedTense = selectedVoice === 'passive' && tense === 'imperative' ? 'past' : (tense ?? 'past')
  const selectedMood = selectedTense === 'present' ? (mood ?? 'indicative') : undefined
  const routeMood = mood

  const handleVoiceChange = useCallback(
    (nextVoice: Voice) => {
      const nextTense = nextVoice === 'passive' && selectedTense === 'imperative' ? 'past' : selectedTense
      navigateToVerb(verbId, nextVoice, nextTense, nextTense === 'present' ? routeMood : undefined)
    },
    [navigateToVerb, routeMood, selectedTense, verbId],
  )

  const handleTenseChange = useCallback(
    (nextTense: Tense) => {
      navigateToVerb(verbId, selectedVoice, nextTense, nextTense === 'present' ? routeMood : undefined)
    },
    [navigateToVerb, routeMood, selectedVoice, verbId],
  )

  const handleMoodChange = useCallback(
    (nextMood: Mood) => {
      navigateToVerb(verbId, selectedVoice, 'present', nextMood)
    },
    [navigateToVerb, selectedVoice, verbId],
  )

  const masdar = useMemo(() => (selectedVerb ? deriveMasdar(selectedVerb) : null), [selectedVerb])
  const activeParticiple = useMemo(() => (selectedVerb ? deriveActiveParticiple(selectedVerb) : null), [selectedVerb])
  const passiveParticiple = useMemo(() => (selectedVerb ? derivePassiveParticiple(selectedVerb) : null), [selectedVerb])

  return (
    <Page dir={dir} lang={lang}>
      <AppHeader />
      <Main hasVerb={!!selectedVerb}>
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
                <Search id="verb-search-input" onSelect={handleSelect} selectedVerb={selectedVerb} />

                <Heading dir={dir} lang={lang}>
                  {derivedForms.length > 1 ? t('selectDerivedForm') : t('quickPicks')}
                </Heading>

                {derivedForms.length > 1 ? (
                  <VerbList>
                    {derivedForms.map((verb) => {
                      const isActive = verb.id === selectedVerb?.id
                      return <VerbPill key={verb.id} verb={verb} className={isActive ? 'active' : undefined} />
                    })}
                  </VerbList>
                ) : (
                  <QuickPickList selectedVerb={selectedVerb} />
                )}
              </TabPanel>
            )}

            {searchTab === 'build' && (
              <TabPanel
                id="panel-content-build"
                role="tabpanel"
                aria-labelledby="panel-tab-build"
                aria-label={t('tabs.build')}
              >
                <ConjugateBox onSelect={handleSelect} selectedVerb={selectedVerb} />
              </TabPanel>
            )}
          </Panel>

          {recentVerbs.length > 0 && (
            <Panel title={t('recentlyViewed')} dir={dir} lang={lang} collapsible>
              <VerbList>
                {recentVerbs.map((verb) => {
                  const isActive = verb.id === selectedVerb?.id
                  return <VerbPill key={verb.id} verb={verb} className={isActive ? 'active' : undefined} />
                })}
              </VerbList>
            </Panel>
          )}

          <Panel title={t('favourites')} dir={dir} lang={lang} collapsible defaultCollapsed>
            {favouriteVerbs.length > 0 ? (
              <VerbList>
                {favouriteVerbs.map((verb) => {
                  const isActive = verb.id === selectedVerb?.id
                  return <VerbPill key={verb.id} verb={verb} className={isActive ? 'active' : undefined} />
                })}
              </VerbList>
            ) : (
              <Text dir={dir} lang={lang}>
                {t('favourites.empty')}
              </Text>
            )}
          </Panel>

          {!selectedVerb && (
            <Panel title={t('verbsByForm.title')} dir={dir} lang={lang} collapsible defaultCollapsed>
              <TabBar wrap role="tablist" aria-label={t('aria.selectForm')}>
                {FORM_NUMBERS.map((form) => {
                  const isActive = selectedFormTab === form
                  return (
                    <TabButton
                      key={form}
                      id={`form-tab-${form}`}
                      role="tab"
                      type="button"
                      aria-selected={isActive}
                      aria-controls={`form-panel-${form}`}
                      size="sm"
                      fluid
                      active={isActive}
                      onClick={() => setSelectedFormTab(form)}
                    >
                      {ROMAN_NUMERALS[form - 1]}
                    </TabButton>
                  )
                })}
              </TabBar>
              <TabPanel
                role="tabpanel"
                id={`form-panel-${selectedFormTab}`}
                aria-labelledby={`form-tab-${selectedFormTab}`}
                aria-label={`${t('meta.form')} ${ROMAN_NUMERALS[selectedFormTab - 1]}`}
              >
                <VerbList>
                  {(verbsByForm.get(selectedFormTab) ?? []).map((verb) => (
                    <VerbPill key={verb.id} verb={verb} />
                  ))}
                </VerbList>
              </TabPanel>
            </Panel>
          )}
        </Stack>

        {selectedVerb && (
          <Stack area="verb">
            <Panel
              title={formatArabic(selectedVerb.label)}
              dir="rtl"
              lang="ar"
              actions={
                <>
                  <ShareButton />
                  <FavouriteButton isFavourite={isFavourite} onToggle={toggleFavourite} />
                  <CopyButton
                    text={formatArabic(selectedVerb.label)}
                    ariaLabel={t('aria.copy', { text: formatArabic(selectedVerb.label) })}
                  />
                  <SpeechButton
                    text={selectedVerb.label}
                    lang="ar"
                    ariaLabel={t('aria.speak', { text: selectedVerb.label })}
                  />
                </>
              }
            >
              <VerbMetaSection>
                <Detail
                  label={t('meta.root')}
                  labelLang={lang}
                  labelDir={dir}
                  onClick={() => setIsRootInfoOpen(true)}
                  ariaLabel={t('rootInfo.open')}
                  ariaHasPopup="dialog"
                  ariaExpanded={isRootInfoOpen}
                >
                  <RootMetaValue dir="rtl" lang="ar">
                    {Array.from(selectedVerb.root).map((letter, index) => (
                      <span key={index}>{letter}</span>
                    ))}
                  </RootMetaValue>
                </Detail>
                <Detail
                  label={t('meta.form')}
                  labelLang={lang}
                  labelDir={dir}
                  valueLang={lang}
                  valueDir={dir}
                  onClick={() => setIsFormInfoOpen(true)}
                  ariaLabel={formInsightsLabel}
                  ariaHasPopup="dialog"
                  ariaExpanded={isFormInfoOpen}
                >
                  <span>{ROMAN_NUMERALS[selectedVerb.form - 1]}</span>
                  {selectedVerb && selectedVerb.form === 1 && diacriticsPreference !== 'none' && (
                    <span style={{ fontSize: '1.2rem', fontWeight: 400 }}>{formIVowelPattern(selectedVerb)}</span>
                  )}
                </Detail>
                <Detail
                  label={t('meta.translation')}
                  labelLang={lang}
                  labelDir={dir}
                  value={translateVerb(selectedVerb)}
                  valueLang="en"
                  valueDir="ltr"
                />
                <Detail
                  label={t('meta.activeParticiple')}
                  labelLang={lang}
                  labelDir={dir}
                  value={formatArabic(activeParticiple) || '—'}
                  speechText={activeParticiple}
                  copyText={formatArabic(activeParticiple)}
                />
                <Detail
                  label={t('meta.passiveParticiple')}
                  labelLang={lang}
                  labelDir={dir}
                  value={formatArabic(passiveParticiple) || '—'}
                  speechText={passiveParticiple}
                  copyText={formatArabic(passiveParticiple)}
                />
                <Detail
                  label={t('meta.verbalNoun')}
                  labelLang={lang}
                  labelDir={dir}
                  speechText={masdar?.length ? masdar.join('، ') : null}
                  copyText={masdar?.map((value) => formatArabic(value)).join('، ')}
                >
                  {masdar?.length ? (
                    <MasdarList>
                      {masdar.map((value, index) => (
                        <MasdarItem key={value}>
                          <span>{formatArabic(value)}</span>
                          {selectedVerb.form === 1 && selectedVerb.masdarPatterns?.[index] === 'mimi' && (
                            <MasdarNote>({t('meta.verbalNoun.mimi')})</MasdarNote>
                          )}
                        </MasdarItem>
                      ))}
                    </MasdarList>
                  ) : (
                    '—'
                  )}
                </Detail>
              </VerbMetaSection>
            </Panel>

            <ConjugationSection>
              {selectedTense === 'present' ? (
                <ConjugationTable
                  verb={selectedVerb}
                  voice={selectedVoice}
                  tense="present"
                  mood={selectedMood ?? 'indicative'}
                  diacriticsPreference={diacriticsPreference}
                  onVoiceChange={handleVoiceChange}
                  onTenseChange={handleTenseChange}
                  onMoodChange={handleMoodChange}
                />
              ) : (
                <ConjugationTable
                  verb={selectedVerb}
                  voice={selectedVoice}
                  tense={selectedTense}
                  diacriticsPreference={diacriticsPreference}
                  onVoiceChange={handleVoiceChange}
                  onTenseChange={handleTenseChange}
                  onMoodChange={handleMoodChange}
                />
              )}
            </ConjugationSection>
          </Stack>
        )}

        {selectedVerb && (
          <Stack area="footer">
            <Panel title={t('footer.feedback.title')} dir={dir} lang={lang} collapsible defaultCollapsed>
              <Text dir={dir} lang={lang} dangerouslySetInnerHTML={{ __html: tHtml('footer.feedback.body') }} />
              <ActionLink dir={dir} lang={lang} href="https://github.com/goblindegook/musarrif/issues" rel="noreferrer">
                {t('footer.feedback.cta')}
              </ActionLink>
            </Panel>
          </Stack>
        )}

        {selectedVerb && (
          <>
            <Modal isOpen={isFormInfoOpen} onClose={() => setIsFormInfoOpen(false)} title={t('formInfo.title')}>
              <FormInsights verb={selectedVerb} />
            </Modal>
            <Modal isOpen={isRootInfoOpen} onClose={() => setIsRootInfoOpen(false)} title={t('rootInfo.title')}>
              <RootInsights root={selectedVerb.root} />
            </Modal>
          </>
        )}
      </Main>
    </Page>
  )
}

const Page = styled('div')`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 6rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 960px) {
    padding-top: 2rem;
  }
`

const Main = styled('main')<{ hasVerb: boolean }>`
  width: 100%;
  display: grid;
  gap: 1rem;
  grid-auto-rows: min-content;
  align-items: start;
  max-width: 600px;
  margin: 0 auto;
  grid-template-columns: 1fr;
  grid-template-areas:
    'search'
    'verb'
    'footer';

  ${({ hasVerb }) =>
    !hasVerb &&
    `
    place-items: center;
    align-content: center;
  `}

  @media (min-width: 960px) {
    gap: 1.25rem;
    
    ${({ hasVerb }) =>
      hasVerb &&
      `
      max-width: inherit;
      grid-template-columns: 1fr 1.5fr;
      grid-template-rows: auto 1fr;
      grid-template-areas:
        'search verb'
        'footer verb';
    `}
  }
`

const Stack = styled('div')<{ area: 'search' | 'verb' | 'footer' }>`
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

const VerbMetaSection = styled('section')`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;

  @media (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const MasdarList = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`

const MasdarItem = styled('div')`
  display: inline-flex;
  align-items: baseline;
  gap: 0.35rem;
`

const MasdarNote = styled('span')`
  font-size: 0.85rem;
  font-weight: 500;
  color: #64748b;
`

const ConjugationSection = styled('div')`
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.06);
`

const ActionLink = styled('a')`
  align-self: stretch;
  display: inline-block;
  align-items: center;
  text-align: center;
  gap: 0.35rem;
  font-weight: 600;
  color: #334155;
  text-decoration: none;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 0.55rem 0.95rem;
  background: #ffffff;
  box-shadow: 0 6px 14px rgba(15, 23, 42, 0.08);
  transition: background 120ms ease, border-color 120ms ease, box-shadow 120ms ease, color 120ms ease;

  &:hover,
  &:focus-visible {
    background: #f1f5f9;
    border-color: #cbd5f5;
    color: #0f172a;
    box-shadow: 0 6px 14px rgba(15, 23, 42, 0.1);
    outline: none;
  }
`

const RootMetaValue = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: space-between;
  justify-content: center;
  gap: 1rem;
`
