import { styled } from 'goober'
import { Fragment } from 'preact'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { useFavourites } from '../../hooks/useFavourites'
import { useI18n } from '../../hooks/useI18n'
import { useRecent } from '../../hooks/useRecent'
import { useRouting } from '../../hooks/useRouting'
import { formIPastVowel, formIPresentVowel } from '../../paradigms/form-i-vowels'
import { applyDiacriticsPreference } from '../../paradigms/letters'
import { deriveMasdar } from '../../paradigms/nominal/masdar'
import { deriveActiveParticiple } from '../../paradigms/nominal/participle-active'
import { derivePassiveParticiple } from '../../paradigms/nominal/participle-passive'
import { search } from '../../paradigms/selection'
import type { Mood, Tense, Voice } from '../../paradigms/tense'
import {
  buildVerbFromId,
  type DisplayVerb,
  formatFormLabel,
  getAvailableParadigms,
  getVerbById,
} from '../../paradigms/verbs'
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

const ARABIC_LETTER_NAMES = {
  ء: 'همزة',
  ب: 'باء',
  ت: 'تاء',
  ث: 'ثاء',
  ج: 'جيم',
  ح: 'حاء',
  خ: 'خاء',
  د: 'دال',
  ذ: 'ذال',
  ر: 'راء',
  ز: 'زاي',
  س: 'سين',
  ش: 'شين',
  ص: 'صاد',
  ض: 'ضاد',
  ط: 'طاء',
  ظ: 'ظاء',
  ع: 'عين',
  غ: 'غين',
  ف: 'فاء',
  ق: 'قاف',
  ك: 'كاف',
  ل: 'لام',
  م: 'ميم',
  ن: 'نون',
  ه: 'هاء',
  و: 'واو',
  ي: 'ياء',
} as const

const spellArabicRootLetters = (root: string): string =>
  Array.from(root)
    .map((letter) => ARABIC_LETTER_NAMES[letter as keyof typeof ARABIC_LETTER_NAMES])
    .filter(Boolean)
    .join(' ،')

interface ConjugationModeProps {
  verbId: string
  voice?: Voice
  tense?: Tense
  mood?: Mood
}

export function ConjugationMode({ verbId, voice = 'active', tense = 'past', mood }: ConjugationModeProps) {
  const { t, lang, dir, diacriticsPreference } = useI18n()
  const { navigateTo } = useRouting()
  const { favourites, isFavourite, toggleFavourite } = useFavourites()
  const { recents, addRecent } = useRecent()
  const [openModal, setOpenModal] = useState<
    'form' | 'root' | 'active-participle' | 'passive-participle' | 'masdar' | null
  >(null)
  const [syntheticVerb, setSyntheticVerb] = useState<DisplayVerb | undefined>()
  const routeVerb = useMemo(() => buildVerbFromId(verbId), [verbId])
  const [searchTab, setSearchTab] = useState<'search' | 'build'>(() => {
    if (getVerbById(verbId)) return 'search'
    return routeVerb ? 'build' : 'search'
  })

  const formatArabic = useMemo(
    () => (value: string | null) => applyDiacriticsPreference(value ?? '', diacriticsPreference),
    [diacriticsPreference],
  )

  const selectedVerb = useMemo(
    () => (syntheticVerb?.id === verbId ? syntheticVerb : routeVerb),
    [syntheticVerb, verbId, routeVerb],
  )

  const documentTitle = useMemo(
    () => [formatArabic(selectedVerb.label), t('title')].filter(Boolean).join(' · '),
    [formatArabic, selectedVerb, t],
  )

  useDocumentTitle(documentTitle)

  const selectedVerbFormLabel = useMemo(() => formatFormLabel(selectedVerb.form, selectedVerb.root), [selectedVerb])

  const handleSelect = useCallback(
    (verb: DisplayVerb) => {
      setSyntheticVerb(verb)
      navigateTo(['verbs', verb.id])
    },
    [navigateTo],
  )

  useEffect(() => {
    setOpenModal(null)
  }, [selectedVerb])

  const derivedForms = useMemo(
    () => search(selectedVerb.root, { exactRoot: true }).sort((a, b) => a.form - b.form),
    [selectedVerb.root],
  )

  const recentVerbs = useMemo(() => recents.filter((verb) => verb.id !== verbId), [recents, verbId])

  useEffect(() => {
    addRecent(verbId)
  }, [verbId])

  const currentTense = voice === 'passive' && tense === 'imperative' ? 'past' : tense
  const currentMood = tense === 'present' ? mood : undefined

  const handleVoiceChange = useCallback(
    (nextVoice: Voice) => {
      if (currentMood) navigateTo(['verbs', verbId, nextVoice, 'present', currentMood])
      if (nextVoice === 'passive')
        navigateTo(['verbs', verbId, nextVoice, currentTense === 'imperative' ? 'past' : currentTense])
      else navigateTo(['verbs', verbId, nextVoice, currentTense])
    },
    [navigateTo, currentTense, verbId],
  )

  const handleTenseChange = useCallback(
    (nextTense: Tense) => {
      if (nextTense === 'imperative') navigateTo(['verbs', verbId, 'active', nextTense])
      else navigateTo(['verbs', verbId, voice, nextTense])
    },
    [navigateTo, voice, verbId],
  )

  const handleMoodChange = useCallback(
    (nextMood: Mood) => navigateTo(['verbs', verbId, voice, 'present', nextMood]),
    [navigateTo, voice, verbId],
  )

  const availableParadigms = useMemo(() => getAvailableParadigms(selectedVerb), [selectedVerb])
  const masdar = useMemo(
    () => (availableParadigms.includes('masdar') ? deriveMasdar(selectedVerb) : null),
    [selectedVerb, availableParadigms],
  )
  const activeParticiple = useMemo(
    () => (availableParadigms.includes('active.participle') ? deriveActiveParticiple(selectedVerb) : null),
    [selectedVerb, availableParadigms],
  )
  const passiveParticiple = useMemo(
    () => (availableParadigms.includes('passive.participle') ? derivePassiveParticiple(selectedVerb) : null),
    [selectedVerb, availableParadigms],
  )
  const recentsAndFavouritesPanels = (
    <>
      {recentVerbs.length > 0 && (
        <Panel title={t('recentlyViewed')} dir={dir} lang={lang} collapsible>
          <VerbList>
            {recentVerbs.map((verb) => (
              <VerbPill key={verb.id} verb={verb} />
            ))}
          </VerbList>
        </Panel>
      )}

      <Panel title={t('favourites')} dir={dir} lang={lang} collapsible defaultCollapsed>
        {favourites.length > 0 ? (
          <VerbList>
            {favourites.map((verb) => (
              <VerbPill key={verb.id} verb={verb} className={verb.id === verbId ? 'active' : undefined} />
            ))}
          </VerbList>
        ) : (
          <Text dir={dir} lang={lang}>
            {t('favourites.empty')}
          </Text>
        )}
      </Panel>
    </>
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
              <Search id="verb-search-input" onSelect={handleSelect} selectedVerb={selectedVerb} />

              <Heading dir={dir} lang={lang}>
                {derivedForms.length > 1 ? t('selectDerivedForm') : t('quickPicks')}
              </Heading>

              {derivedForms.length > 1 ? (
                <VerbList>
                  {derivedForms.map((verb) => (
                    <VerbPill key={verb.id} verb={verb} className={verb.id === verbId ? 'active' : undefined} />
                  ))}
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
      </Stack>

      <Stack area="verb">
        <VerbHeaderPanel
          verb={selectedVerb}
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
              speechText={spellArabicRootLetters(selectedVerb.root)}
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
                {selectedVerb.form === 1 && selectedVerb.vowels != null && (
                  <VowelPattern>{formIVowelPattern(selectedVerb)}</VowelPattern>
                )}
              </FormMetaValue>
            </Detail>
          </VerbMetaSection>
        </VerbHeaderPanel>

        <ConjugationSection>
          {currentTense === 'present' ? (
            <ConjugationTable
              verb={selectedVerb}
              voice={voice}
              tense="present"
              mood={currentMood ?? 'indicative'}
              diacriticsPreference={diacriticsPreference}
              onVoiceChange={handleVoiceChange}
              onTenseChange={handleTenseChange}
              onMoodChange={handleMoodChange}
            />
          ) : (
            <ConjugationTable
              verb={selectedVerb}
              voice={voice}
              tense={currentTense}
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
                          {selectedVerb.form === 1 && selectedVerb.masdars?.[index] === 'mimi' && (
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

      <Stack area="recents">{recentsAndFavouritesPanels}</Stack>

      <Stack area="footer">
        <Panel title={t('footer.feedback.title')} dir={dir} lang={lang} collapsible defaultCollapsed>
          <FormattedText dir={dir} lang={lang} text={t('footer.feedback.body')} />
          <LinkButton dir={dir} lang={lang} href="https://github.com/goblindegook/musarrif/issues" rel="noreferrer">
            {t('footer.feedback.cta')}
          </LinkButton>
        </Panel>
      </Stack>

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
        <Modal isOpen={openModal === 'masdar'} onClose={() => setOpenModal(null)} title={t('nominalInfo.title.masdar')}>
          <NominalInsights verb={selectedVerb} nominal="masdar" arabic={masdar} />
        </Modal>
      )}
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
  grid-template-areas: 'search' 'verb' 'recents' 'footer';

  @media (min-width: 960px) {
    gap: 1.25rem;
    max-width: inherit;
    grid-template-columns: 1fr 1.5fr;
    grid-template-rows: auto auto 1fr;
    grid-template-areas:
      'search verb'
      'recents verb'
      'footer verb';
  }

  @media print {
    max-width: 100%;
    margin: 0;
    gap: 0;
    grid-template-columns: 1fr;
    grid-template-areas: 'verb';
  }
`

const Stack = styled('div')<{ area: 'search' | 'verb' | 'footer' | 'recents' }>`
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
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;

  @media print {
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
  color: var(--color-text-muted);
  font-weight: 400;
`

const MasdarNote = styled('span')`
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text-secondary);

  @media print {
    font-size: 0.7rem;
  }
`

const ConjugationSection = styled('div')`
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  overflow: hidden;
  background: var(--color-bg-surface);
  box-shadow: var(--shadow-elevated);

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

const VowelPattern = styled(FormMetaItem)`
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
