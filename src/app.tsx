import { styled } from 'goober'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import { Heading } from './components/atoms/Heading'
import { Text } from './components/atoms/Text'
import { ConjugationTable } from './components/ConjugationTable'
import { CopyButton } from './components/CopyButton'
import { Detail } from './components/Detail'
import { DiacriticsToggle } from './components/DiacriticsToggle'
import { FormInsights } from './components/FormInsights'
import { IconButton } from './components/IconButton'
import { SettingsIcon } from './components/icons/SettingsIcon'
import { LanguagePicker } from './components/LanguagePicker'
import { Modal } from './components/Modal'
import { Panel } from './components/Panel'
import { QuickPickList } from './components/QuickPickList'
import { RootInsights } from './components/RootInsights'
import { Search as SearchBox } from './components/SearchBox'
import { ShareButton } from './components/ShareButton'
import { SpeechButton } from './components/SpeechButton'
import { VerbPill } from './components/VerbPill'
import { useI18n } from './hooks/i18n'
import { useRouting } from './hooks/routing'
import enTranslations from './locales/en.json'
import { FORM_I_PAST_VOWELS, FORM_I_PRESENT_VOWELS } from './paradigms/form-i-vowels'
import { applyDiacriticsPreference, DAMMA, FATHA, KASRA } from './paradigms/letters'
import { deriveMasdar } from './paradigms/nominal/masdar'
import { deriveActiveParticiple } from './paradigms/nominal/participle-active'
import { derivePassiveParticiple } from './paradigms/nominal/participle-passive'
import { getVerbById, search, type Verb } from './paradigms/verbs'
import { mapRecord } from './primitives/objects'

const DOTTED_CIRCLE = '\u25cc'

const VOWELS: Record<'a' | 'i' | 'u', string> = {
  a: `${DOTTED_CIRCLE}${FATHA}`,
  i: `${DOTTED_CIRCLE}${KASRA}`,
  u: `${DOTTED_CIRCLE}${DAMMA}`,
} as const

const FORM_I_PATTERN_VOWELS = mapRecord(FORM_I_PAST_VOWELS, (past, pattern) => {
  const present = FORM_I_PRESENT_VOWELS[pattern]
  return past === present ? VOWELS[past] : `${VOWELS[past]} / ${VOWELS[present]}`
})

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'] as const

export function App() {
  const { t, tHtml, lang, dir, diacriticsPreference } = useI18n()
  const { verbId, navigateToVerb, tense, mood } = useRouting()
  const [isFormInfoOpen, setIsFormInfoOpen] = useState(false)
  const [isRootInfoOpen, setIsRootInfoOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const translateVerb = useCallback(
    (verb: Verb) => (lang !== 'ar' ? t(verb.id) : (enTranslations.verbs as Record<string, string>)[verb.id]),
    [lang, t],
  )

  const formatArabic = useMemo(
    () => (value: string | null) => applyDiacriticsPreference(value ?? '', diacriticsPreference),
    [diacriticsPreference],
  )

  const selectedVerb = useMemo(() => getVerbById(verbId), [verbId])

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

  const selectedFormPattern = selectedVerb?.form === 1 ? selectedVerb.formPattern : undefined

  const selectedFormLabel = selectedVerb ? `${t('meta.form')} ${ROMAN_NUMERALS[selectedVerb.form - 1]}` : undefined
  const formInsightsLabel = selectedFormLabel ? `${selectedFormLabel} — ${t('formInfo.open')}` : t('formInfo.open')

  const masdar = useMemo(() => (selectedVerb ? deriveMasdar(selectedVerb) : null), [selectedVerb])
  const activeParticiple = useMemo(() => (selectedVerb ? deriveActiveParticiple(selectedVerb) : null), [selectedVerb])
  const passiveParticiple = useMemo(() => (selectedVerb ? derivePassiveParticiple(selectedVerb) : null), [selectedVerb])

  return (
    <Page dir={dir} lang={lang} settingsOpen={isSettingsOpen}>
      <TopBar>
        <TopBarHeader>
          <TitleGroup dir={dir} lang={lang}>
            <Eyebrow dir={dir} lang={lang}>
              {t('eyebrow')}
            </Eyebrow>
            <PageTitle dir={dir} lang={lang}>
              {t('title')}
            </PageTitle>
          </TitleGroup>
          <SettingsButtonWrapper>
            <IconButton
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              ariaLabel={t('settings.toggle')}
              ariaExpanded={isSettingsOpen}
              title={t('settings.toggle')}
              active={isSettingsOpen}
            >
              <SettingsIcon />
            </IconButton>
          </SettingsButtonWrapper>
        </TopBarHeader>
        <Controls visible={isSettingsOpen}>
          <DiacriticsToggle />
          <LanguagePicker />
        </Controls>
      </TopBar>
      <Main hasVerb={!!selectedVerb}>
        <Stack area="search">
          <Panel>
            <VisuallyHiddenLabel htmlFor="verb-search-input">{t('verbLabel')}</VisuallyHiddenLabel>
            <SearchBox
              id="verb-search-input"
              onSelect={(verb: Verb) => navigateToVerb(verb.id)}
              selectedVerb={selectedVerb}
            />

            <Heading dir={dir} lang={lang}>
              {derivedForms.length > 1 ? t('selectDerivedForm') : t('quickPicks')}
            </Heading>

            {derivedForms.length > 1 ? (
              <FormOptionList>
                {derivedForms.map((verb) => {
                  const isActive = verb.id === selectedVerb?.id
                  return <VerbPill key={verb.id} verb={verb} className={isActive ? 'active' : undefined} />
                })}
              </FormOptionList>
            ) : (
              <QuickPickList selectedVerb={selectedVerb} />
            )}
          </Panel>
        </Stack>

        {selectedVerb && (
          <Stack area="verb">
            <Panel
              title={formatArabic(selectedVerb.label)}
              dir="rtl"
              lang="ar"
              actions={
                <>
                  <CopyButton
                    text={formatArabic(selectedVerb.label)}
                    ariaLabel={t('aria.copy', { text: formatArabic(selectedVerb.label) })}
                  />
                  <SpeechButton
                    text={selectedVerb.label}
                    lang="ar"
                    ariaLabel={t('aria.speak', { text: selectedVerb.label })}
                  />
                  <ShareButton />
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
                    {Array.from(selectedVerb.root).map((letter, index) => {
                      return <span key={index}>{letter}</span>
                    })}
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
                  {selectedFormPattern && diacriticsPreference !== 'none' && (
                    <span style={{ fontSize: '1.2rem', fontWeight: 400 }}>
                      {applyDiacriticsPreference(FORM_I_PATTERN_VOWELS[selectedFormPattern], diacriticsPreference)}
                    </span>
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
                  value={masdar?.map((value) => formatArabic(value)).join('، ') || '—'}
                  speechText={masdar ? masdar.join('، ') : null}
                  copyText={masdar?.map((value) => formatArabic(value)).join('، ')}
                />
              </VerbMetaSection>
            </Panel>

            <ConjugationSection>
              {tense === 'present' ? (
                <ConjugationTable
                  verb={selectedVerb}
                  tense="present"
                  mood={mood ?? 'indicative'}
                  diacriticsPreference={diacriticsPreference}
                  onTenseChange={(nextTense) => navigateToVerb(verbId, nextTense)}
                  onMoodChange={(nextMood) => navigateToVerb(verbId, tense, nextMood)}
                />
              ) : (
                <ConjugationTable
                  verb={selectedVerb}
                  tense={tense ?? 'past'}
                  diacriticsPreference={diacriticsPreference}
                  onTenseChange={(nextTense) => navigateToVerb(verbId, nextTense)}
                  onMoodChange={(nextMood) => navigateToVerb(verbId, tense, nextMood)}
                />
              )}
            </ConjugationSection>
          </Stack>
        )}

        {selectedVerb && (
          <Stack area="footer">
            <Panel title={t('footer.feedback.title')} dir={dir} lang={lang}>
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
              <FormInsights form={selectedVerb.form} />
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

const Page = styled('div')<{ settingsOpen: boolean }>`
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

const TopBar = styled('header')`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
  flex-wrap: wrap;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: radial-gradient(circle at top, #fffdf7 0%, #f5f4ee 60%, #ede9df 100%);
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
  transition: padding 200ms ease;

  @media (min-width: 960px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 2rem;
    position: static;
    background: transparent;
    box-shadow: none;
  }
`

const TopBarHeader = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`

const TitleGroup = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  align-self: flex-start;
`

const Eyebrow = styled('p')`
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.78rem;
  color: #92400e;
  margin: 0;
`

const PageTitle = styled('h1')`
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 1.3rem;
  color: #334155;
  line-height: 1.2;
  font-weight: 500;

  @media (min-width: 960px) {
    font-size: clamp(1.9rem, 3vw, 2.4rem);
    line-height: 1.5;
  }
`

const Controls = styled('aside')<{ visible: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.75rem;
  max-height: ${({ visible }) => (visible ? '200px' : '0')};
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  margin-top: ${({ visible }) => (visible ? '0' : '-1rem')};
  overflow: hidden;
  transition: max-height 300ms ease, opacity 200ms ease, margin-top 300ms ease;

  @media (min-width: 720px) {
    flex-direction: row;
    align-items: center;
    gap: 1.25rem;
  }

  @media (min-width: 960px) {
    max-height: none;
    opacity: 1;
    margin-top: 0;
    overflow: visible;
  }
`

const SettingsButtonWrapper = styled('div')`
  @media (min-width: 960px) {
    display: none;
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

const VisuallyHiddenLabel = styled('label')`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border-width: 0;
`

const VerbMetaSection = styled('section')`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;

  @media (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const ConjugationSection = styled('div')`
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.06);
`

const FormOptionList = styled('section')`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
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
