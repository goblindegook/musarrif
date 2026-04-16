import { styled } from 'goober'
import { Fragment } from 'preact'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import { useFavourites } from '../../hooks/favourites'
import { getEnglishVerbTranslation, useI18n } from '../../hooks/i18n'
import { useRecent } from '../../hooks/recent'
import { buildVerbUrl, useRouting } from '../../hooks/routing'
import { formIPastVowel, formIPresentVowel } from '../../paradigms/form-i-vowels'
import { applyDiacriticsPreference } from '../../paradigms/letters'
import { deriveMasdar } from '../../paradigms/nominal/masdar'
import { deriveActiveParticiple } from '../../paradigms/nominal/participle-active'
import { derivePassiveParticiple } from '../../paradigms/nominal/participle-passive'
import { search } from '../../paradigms/selection'
import type { Mood, Tense, Voice } from '../../paradigms/tense'
import { buildVerbFromId, type DisplayVerb, formatFormLabel, getVerbById, verbs } from '../../paradigms/verbs'
import { FormattedText } from '../atoms/FormattedText'
import { Heading } from '../atoms/Heading'
import { LinkButton } from '../atoms/LinkButton'
import { Text } from '../atoms/Text'
import { CopyButton } from '../molecules/CopyButton'
import { Detail } from '../molecules/Detail'
import { FavouriteButton } from '../molecules/FavouriteButton'
import { Modal } from '../molecules/Modal'
import { Panel } from '../molecules/Panel'
import { QuickPickList } from '../molecules/QuickPickList'
import { Search } from '../molecules/SearchBox'
import { ShareButton } from '../molecules/ShareButton'
import { SpeechButton } from '../molecules/SpeechButton'
import { TabBar, TabButton, TabPanel } from '../molecules/Tabs'
import { VerbPill } from '../molecules/VerbPill'
import { ConjugateBox } from '../organisms/ConjugateBox'
import { ConjugationTable } from '../organisms/ConjugationTable'
import { FormInsights } from '../organisms/FormInsights'
import { NominalInsights } from '../organisms/NominalInsights'
import { RootInsights } from '../organisms/RootInsights'
import { VerbHeaderPanel } from '../organisms/VerbHeaderPanel'

const formIVowelPattern = (verb: DisplayVerb<1>) => {
  const past = formIPastVowel(verb)
  const present = formIPresentVowel(verb)
  return past === present ? `\u25cc${past}` : `\u25cc${past} / \u25cc${present}`
}

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'] as const
const FORM_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const
type FormNumber = (typeof FORM_NUMBERS)[number]

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

export function ConjugationMode() {
  const { t, lang, dir, diacriticsPreference } = useI18n()
  const { verbId, navigateTo, tense, mood, voice } = useRouting()
  const { favourites, isFavourite, toggleFavourite } = useFavourites()
  const { recents, addRecent } = useRecent()
  const [openModal, setOpenModal] = useState<
    'form' | 'root' | 'active-participle' | 'passive-participle' | 'masdar' | null
  >(null)
  const [selectedFormTab, setSelectedFormTab] = useState<FormNumber>(1)
  const [syntheticVerb, setSyntheticVerb] = useState<DisplayVerb | undefined>()
  const routeVerb = useMemo(() => buildVerbFromId(verbId), [verbId])
  const [searchTab, setSearchTab] = useState<'search' | 'build'>(() => {
    if (getVerbById(verbId)) return 'search'
    return routeVerb ? 'build' : 'search'
  })

  const translateVerb = useCallback(
    (verb: DisplayVerb) => {
      if (lang === 'ar') {
        const englishTranslation = getEnglishVerbTranslation(verb.id)
        return englishTranslation ? englishTranslation : '—'
      }
      const translation = t(verb.id)
      return translation !== verb.id ? translation : '—'
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
  const selectedVerbFormLabel = useMemo(
    () => (selectedVerb ? formatFormLabel(selectedVerb.form, selectedVerb.root) : ''),
    [selectedVerb],
  )

  const handleSelect = useCallback(
    (verb: DisplayVerb) => {
      setSyntheticVerb(verb)
      navigateTo(buildVerbUrl(verb.id))
    },
    [navigateTo],
  )

  useEffect(() => {
    setOpenModal(null)
  }, [selectedVerb])

  useEffect(() => {
    document.title = [formatArabic(selectedVerb?.label ?? ''), t('title')].filter(Boolean).join(' · ')
  }, [selectedVerb, formatArabic, t])

  const derivedForms = useMemo(
    () => (selectedVerb?.root ? search(selectedVerb?.root, { exactRoot: true }).sort((a, b) => a.form - b.form) : []),
    [selectedVerb?.root],
  )

  const recentVerbs = useMemo(() => recents.filter((verb) => verb.id !== selectedVerb?.id), [recents, selectedVerb?.id])

  useEffect(() => {
    if (selectedVerb) addRecent(selectedVerb.id)
  }, [selectedVerb?.id])

  const selectedVoice: Voice = voice ?? 'active'
  const selectedTense = selectedVoice === 'passive' && tense === 'imperative' ? 'past' : (tense ?? 'past')
  const selectedMood = selectedTense === 'present' ? (mood ?? 'indicative') : undefined
  const routeMood = mood

  const handleVoiceChange = useCallback(
    (nextVoice: Voice) => {
      const nextTense = nextVoice === 'passive' && selectedTense === 'imperative' ? 'past' : selectedTense
      navigateTo(buildVerbUrl(verbId, nextVoice, nextTense, nextTense === 'present' ? routeMood : undefined))
    },
    [navigateTo, routeMood, selectedTense, verbId],
  )

  const handleTenseChange = useCallback(
    (nextTense: Tense) => {
      navigateTo(buildVerbUrl(verbId, selectedVoice, nextTense, nextTense === 'present' ? routeMood : undefined))
    },
    [navigateTo, routeMood, selectedVoice, verbId],
  )

  const handleMoodChange = useCallback(
    (nextMood: Mood) => {
      navigateTo(buildVerbUrl(verbId, selectedVoice, 'present', nextMood))
    },
    [navigateTo, selectedVoice, verbId],
  )

  const verbTranslation = useMemo(() => {
    if (!selectedVerb || lang === 'ar') return undefined
    const result = translateVerb(selectedVerb)
    return result !== '—' ? result : undefined
  }, [selectedVerb, lang, translateVerb])

  const masdar = useMemo(() => (selectedVerb ? deriveMasdar(selectedVerb) : null), [selectedVerb])
  const activeParticiple = useMemo(() => (selectedVerb ? deriveActiveParticiple(selectedVerb) : null), [selectedVerb])
  const passiveParticiple = useMemo(() => (selectedVerb ? derivePassiveParticiple(selectedVerb) : null), [selectedVerb])

  return (
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
          {favourites.length > 0 ? (
            <VerbList>
              {favourites.map((verb) => {
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
              aria-label={t('meta.form.withNumber', { form: ROMAN_NUMERALS[selectedFormTab - 1] })}
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
          <VerbHeaderPanel
            title={formatArabic(selectedVerb.label)}
            subtitle={verbTranslation}
            subtitleDir="ltr"
            subtitleLang={lang}
            dir="rtl"
            lang="ar"
            actions={
              <>
                <ShareButton />
                <CopyButton
                  text={formatArabic(selectedVerb.label)}
                  ariaLabel={t('aria.copy', { text: formatArabic(selectedVerb.label) })}
                />
                <SpeechButton
                  text={selectedVerb.label}
                  lang="ar"
                  ariaLabel={t('aria.speak', { text: selectedVerb.label })}
                />
                <FavouriteButton
                  isFavourite={isFavourite(selectedVerb.id)}
                  onToggle={() => toggleFavourite(selectedVerb.id)}
                />
              </>
            }
          >
            <VerbMetaSection>
              <Detail
                label={t('meta.root')}
                labelLang={lang}
                labelDir={dir}
                onInsightsClick={() => setOpenModal('root')}
                insightsLabel={t('rootInfo.open')}
                insightsOpen={openModal === 'root'}
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
                valueLang="en"
                valueDir="ltr"
                onInsightsClick={() => setOpenModal('form')}
                insightsLabel={t('formInfo.open', { form: selectedVerbFormLabel })}
                insightsOpen={openModal === 'form'}
              >
                <FormMetaValue>
                  <FormMetaItem>{selectedVerbFormLabel}</FormMetaItem>
                  {selectedVerb.form === 1 && <FormPattern>{formIVowelPattern(selectedVerb)}</FormPattern>}
                </FormMetaValue>
              </Detail>
            </VerbMetaSection>
          </VerbHeaderPanel>

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

          <Panel title={t('nominals.title')} dir={dir} lang={lang}>
            <NominalsGrid>
              <MasdarSlot>
                <Detail
                  label={masdar && masdar.length > 1 ? t('meta.verbalNoun.plural') : t('meta.verbalNoun')}
                  labelLang={lang}
                  labelDir={dir}
                  speechText={masdar?.length ? masdar.join('، ') : null}
                  copyText={masdar?.map((value) => formatArabic(value)).join('، ')}
                  onInsightsClick={masdar?.length ? () => setOpenModal('masdar') : undefined}
                  insightsLabel={t('nominalInfo.title.masdar')}
                  insightsOpen={openModal === 'masdar'}
                >
                  {masdar?.length ? (
                    <MasdarList>
                      {masdar.map((value, index) => (
                        <Fragment key={value}>
                          <MasdarItem>
                            <span>{formatArabic(value)}</span>
                            {selectedVerb.form === 1 && selectedVerb.masdarPatterns?.[index] === 'mimi' && (
                              <MasdarNote>({t('meta.verbalNoun.mimi')})</MasdarNote>
                            )}
                          </MasdarItem>
                          {index < masdar.length - 1 && <MasdarSeparator>،</MasdarSeparator>}
                        </Fragment>
                      ))}
                    </MasdarList>
                  ) : (
                    '—'
                  )}
                </Detail>
              </MasdarSlot>
              <Detail
                label={t('meta.activeParticiple')}
                labelLang={lang}
                labelDir={dir}
                value={formatArabic(activeParticiple) || '—'}
                speechText={activeParticiple}
                copyText={formatArabic(activeParticiple)}
                onInsightsClick={activeParticiple ? () => setOpenModal('active-participle') : undefined}
                insightsLabel={t('nominalInfo.title.activeParticiple')}
                insightsOpen={openModal === 'active-participle'}
              />
              <Detail
                label={t('meta.passiveParticiple')}
                labelLang={lang}
                labelDir={dir}
                value={formatArabic(passiveParticiple) || '—'}
                speechText={passiveParticiple}
                copyText={formatArabic(passiveParticiple)}
                onInsightsClick={passiveParticiple ? () => setOpenModal('passive-participle') : undefined}
                insightsLabel={t('nominalInfo.title.passiveParticiple')}
                insightsOpen={openModal === 'passive-participle'}
              />
            </NominalsGrid>
          </Panel>
        </Stack>
      )}

      {selectedVerb && (
        <Stack area="footer">
          <Panel title={t('footer.feedback.title')} dir={dir} lang={lang} collapsible defaultCollapsed>
            <FormattedText dir={dir} lang={lang} text={t('footer.feedback.body')} />
            <LinkButton dir={dir} lang={lang} href="https://github.com/goblindegook/musarrif/issues" rel="noreferrer">
              {t('footer.feedback.cta')}
            </LinkButton>
          </Panel>
        </Stack>
      )}

      {selectedVerb && (
        <>
          <Modal
            isOpen={openModal === 'form'}
            onClose={() => setOpenModal(null)}
            title={t('formInfo.title', { form: selectedVerbFormLabel })}
          >
            <FormInsights verb={selectedVerb} />
          </Modal>
          <Modal isOpen={openModal === 'root'} onClose={() => setOpenModal(null)} title={t('rootInfo.title')}>
            <RootInsights root={selectedVerb.root} rootId={selectedVerb.rootId} />
          </Modal>
          {activeParticiple && (
            <Modal
              isOpen={openModal === 'active-participle'}
              onClose={() => setOpenModal(null)}
              title={t('nominalInfo.title.activeParticiple')}
            >
              <NominalInsights verb={selectedVerb} nominal="activeParticiple" arabic={activeParticiple} />
            </Modal>
          )}
          {passiveParticiple && (
            <Modal
              isOpen={openModal === 'passive-participle'}
              onClose={() => setOpenModal(null)}
              title={t('nominalInfo.title.passiveParticiple')}
            >
              <NominalInsights verb={selectedVerb} nominal="passiveParticiple" arabic={passiveParticiple} />
            </Modal>
          )}
          {masdar?.length && (
            <Modal
              isOpen={openModal === 'masdar'}
              onClose={() => setOpenModal(null)}
              title={t('nominalInfo.title.masdar')}
            >
              <NominalInsights verb={selectedVerb} nominal="masdar" arabic={masdar[0]} />
            </Modal>
          )}
        </>
      )}
    </Main>
  )
}

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
    justify-items: stretch;
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

  @media print {
    max-width: 100%;
    margin: 0;
    gap: 0;
    grid-template-columns: 1fr;
    grid-template-areas: 'verb';
  }
`

const Stack = styled('div')<{ area: 'search' | 'verb' | 'footer' }>`
  grid-area: ${({ area: gridArea }) => gridArea};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-self: flex-start;

  @media print {
    ${({ area }) => (area === 'verb' ? 'gap: 0.5rem;' : 'display: none;')}
  }
`

const VerbList = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const VerbMetaSection = styled('section')`
  display: grid;
  grid-template-columns: 1frr;
  gap: 0.75rem;

  @media (min-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }

  @media (min-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media print {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.35rem;
  }
`

const MasdarList = styled('div')`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: baseline;
`

const MasdarItem = styled('div')`
  display: inline-flex;
  align-items: baseline;
  gap: 0.35rem;
`

const MasdarSeparator = styled('span')`
  margin-inline-end: 0.3rem;
  color: #94a3b8;
  font-weight: 400;
`

const MasdarNote = styled('span')`
  font-size: 0.85rem;
  font-weight: 500;
  color: #64748b;

  @media print {
    font-size: 0.7rem;
  }
`

const ConjugationSection = styled('div')`
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.06);

  @media print {
    border: 1px solid #e2e8f0;
    border-radius: 0.3rem;
    box-shadow: none;
  }
`

const RootMetaValue = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 1rem;

  @media print {
    gap: 0.35rem;
  }
`

const FormMetaValue = styled('div')`
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: baseline;
  justify-items: start;
  width: 100%;

  @media print {
    grid-template-columns: auto 1fr;
    column-gap: 0.35rem;
  }
`

const FormMetaItem = styled('span')`
  font-weight: 600;
`

const FormPattern = styled(FormMetaItem)`
  font-size: 1.2rem;
  font-weight: 400;
  justify-self: end;
  text-align: right;

  @media print {
    font-size: 0.9rem;
  }
`

const NominalsGrid = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;

  @media (min-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
`

const MasdarSlot = styled('div')`
  @media (min-width: 480px) {
    grid-column: 1 / -1;
  }
`
