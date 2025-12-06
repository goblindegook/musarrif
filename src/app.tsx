import { styled } from 'goober'
import { useEffect, useMemo, useState } from 'preact/hooks'
import { ConjugationTable } from './components/ConjugationTable'
import { Detail } from './components/Detail'
import { DiacriticsToggle } from './components/DiacriticsToggle'
import { LanguagePicker } from './components/LanguagePicker'
import { Modal } from './components/Modal'
import { QuickPickList, SuggestionsList } from './components/QuickPickList'
import { Search as SearchBox } from './components/SearchBox'
import { SpeechButton } from './components/SpeechButton'
import { VerbPill } from './components/VerbPill'
import { useI18n } from './hooks/i18n'
import { useRouting } from './hooks/routing'
import enTranslations from './locales/en.json'
import { DAMMA, FATHA, KASRA } from './paradigms/constants'
import { FORM_I_PAST_VOWELS, FORM_I_PRESENT_VOWELS } from './paradigms/form-i-vowels'
import { analyzeRoot, applyDiacriticsPreference } from './paradigms/helpers'
import { deriveMasdar } from './paradigms/nominal/masdar'
import { deriveActiveParticiple } from './paradigms/nominal/participle-active'
import { derivePassiveParticiple } from './paradigms/nominal/participle-passive'
import { conjugate, getVerbById, search, type Verb, verbs } from './paradigms/verbs'
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

const Page = styled('div')`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 720px) {
    padding: 2rem 1.5rem;
  }
`

const TopBar = styled('header')`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 0 0 2rem;

  @media (min-width: 960px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0;
  }
`

const TitleGroup = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  align-self: stretch;

  @media (min-width: 960px) {
    align-self: flex-start;
    align-items: flex-start;
  }
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
  font-size: clamp(2.8rem, 6vw, 4.8rem);
  text-transform: uppercase;
  font-weight: 400;
  color: #334155;
  letter-spacing: 0.2em;

  @media (min-width: 960px) {
    font-size: clamp(1.9rem, 3vw, 2.4rem);
  }
`

const Controls = styled('aside')`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.75rem;

  @media (min-width: 720px) {
    flex-direction: row;
    align-items: center;
    gap: 1.25rem;
  }
`

const Main = styled('main')`
  width: 100%;
  display: grid;
  gap: 1rem;
  grid-auto-rows: min-content;
  align-items: start;
  grid-template-columns: 1fr;
  grid-template-areas:
    'search'
    'verb'
    'form';

  @media (min-width: 960px) {
    gap: 1.25rem;
    grid-template-columns: 1fr 1.5fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'search verb'
      'form verb';
  }
`

const Panel = styled('section')`
  background: #ffffff;
  border-radius: 1.5rem;
  padding: 1rem 1.25rem;
  box-shadow: 0 20px 55px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 720px) {
    padding: 1.5rem 2rem;
  }
`

const SearchPanel = styled(Panel)`
  grid-area: search;
`

const FooterStack = styled('div')`
  grid-area: form;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const MainStack = styled('div')`
  grid-area: verb;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-self: flex-start;
`

const PanelTitle = styled('h2')`
  margin: 0;
  font-weight: 600;
  font-size: 1.55rem;
`

const PanelSubtitle = styled('h3')`
  margin: 0;
  font-weight: 600;
  font-size: 1.25rem;
`

const VerbTitleRow = styled('div')`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 1rem;

  ${PanelTitle} {
    margin: 0;
  }
`

const Field = styled('label')`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-weight: 600;
  color: #1e293b;
  width: 100%;
  max-width: 100%;
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
const Text = styled('p')`
  margin: 0;
  color: #475569;
  line-height: 1.6;
  font-size: 0.98rem;
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

const RootDisplay = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 4rem;
  background: #f8fafc;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  margin-bottom: 1rem;
`

const RootLetter = styled('span')<{ weak?: boolean; hamza?: boolean }>`
  font-size: 2rem;
  font-weight: 600;
  color: ${(props) => (props.weak || props.hamza ? '#92400e' : '#0f172a')};
  display: flex;
  flex-direction: column;
  align-items: center;e
  gap: 0.25rem;
  position: relative;
  flex: 1;
`

const RootAnnotation = styled('small')`
  font-size: 0.65rem;
  color: #92400e;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
`

function enTranslate(verb: Verb, _t: (key: string) => string) {
  return (enTranslations.verbs as Record<string, string>)[verb.id]
}

export function App() {
  const { t, tHtml, lang, dir, diacriticsPreference } = useI18n()
  const { verbId, navigateToVerb, tense, mood } = useRouting()
  const [isFormInfoOpen, setIsFormInfoOpen] = useState(false)
  const [isRootInfoOpen, setIsRootInfoOpen] = useState(false)
  const translateVerb = useMemo(
    () => (lang !== 'ar' ? (verb: Verb) => t(verb.id) : (verb: Verb) => enTranslate(verb, t)),
    [lang, t],
  )

  const formatArabic = useMemo(
    () => (value: string) => applyDiacriticsPreference(value, diacriticsPreference),
    [diacriticsPreference],
  )

  const selectedVerb = useMemo(() => getVerbById(verbId), [verbId])

  useEffect(() => {
    setIsFormInfoOpen(false)
    setIsRootInfoOpen(false)
  }, [selectedVerb])

  const selectedId = selectedVerb?.id

  const derivedForms = useMemo(() => search(selectedVerb?.root, { exactRoot: true }), [selectedVerb?.root])

  const formInsightExamples = useMemo<Verb[]>(() => {
    if (!selectedVerb) return []
    const pool = verbs.filter((verb) => verb.form === selectedVerb.form && verb.id !== selectedId)
    if (pool.length === 0) return []
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 5)
  }, [selectedId, selectedVerb])

  const selectedFormPattern = selectedVerb?.form === 1 ? selectedVerb.formPattern : undefined

  const selectedFormLabel = selectedVerb ? `${t('meta.form')} ${ROMAN_NUMERALS[selectedVerb.form - 1]}` : undefined
  const formInsightsLabel = selectedFormLabel ? `${selectedFormLabel} — ${t('formInfo.open')}` : t('formInfo.open')

  const pastTitle = useMemo(() => (selectedVerb ? conjugate(selectedVerb, 'past')?.['3ms'] : undefined), [selectedVerb])

  const masdar = useMemo(() => (selectedVerb ? deriveMasdar(selectedVerb) : null), [selectedVerb])
  const activeParticiple = useMemo(() => (selectedVerb ? deriveActiveParticiple(selectedVerb) : null), [selectedVerb])
  const passiveParticiple = useMemo(() => (selectedVerb ? derivePassiveParticiple(selectedVerb) : null), [selectedVerb])

  return (
    <Page dir={dir} lang={lang}>
      <TopBar>
        <TitleGroup dir={dir} lang={lang}>
          <Eyebrow dir={dir} lang={lang}>
            {t('eyebrow')}
          </Eyebrow>
          <PageTitle dir={dir} lang={lang}>
            {t('title')}
          </PageTitle>
        </TitleGroup>
        <Controls>
          <DiacriticsToggle />
          <LanguagePicker />
        </Controls>
      </TopBar>
      <Main>
        <SearchPanel>
          <Field>
            <PanelTitle dir={dir} lang={lang}>
              {t('verbLabel')}
            </PanelTitle>
            <SearchBox onSelect={(verb: Verb) => navigateToVerb(verb.id)} selectedVerb={selectedVerb} />
          </Field>

          <PanelSubtitle dir={dir} lang={lang}>
            {derivedForms.length > 1 ? t('selectDerivedForm') : t('quickPicks')}
          </PanelSubtitle>

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
        </SearchPanel>

        {selectedVerb && (
          <MainStack>
            <Panel>
              {pastTitle && (
                <VerbTitleRow>
                  <PanelTitle dir="rtl" lang="ar">
                    {formatArabic(pastTitle)}
                  </PanelTitle>
                  <SpeechButton text={pastTitle} lang="ar" ariaLabel={t('aria.speak', { text: pastTitle })} />
                </VerbTitleRow>
              )}
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
                  value={activeParticiple ? formatArabic(activeParticiple) : '—'}
                  speechText={activeParticiple}
                />
                <Detail
                  label={t('meta.passiveParticiple')}
                  labelLang={lang}
                  labelDir={dir}
                  value={passiveParticiple ? formatArabic(passiveParticiple) : '—'}
                  speechText={passiveParticiple}
                />
                <Detail
                  label={t('meta.verbalNoun')}
                  labelLang={lang}
                  labelDir={dir}
                  value={masdar ? formatArabic(masdar) : '—'}
                  speechText={masdar}
                />
              </VerbMetaSection>
            </Panel>

            <ConjugationSection>
              {!tense || tense === 'past' ? (
                <ConjugationTable
                  verb={selectedVerb}
                  tense="past"
                  diacriticsPreference={diacriticsPreference}
                  onTenseChange={(nextTense) => navigateToVerb(verbId, nextTense)}
                  onMoodChange={(nextMood) => navigateToVerb(verbId, tense, nextMood)}
                />
              ) : tense === 'present' ? (
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
                  tense="future"
                  diacriticsPreference={diacriticsPreference}
                  onTenseChange={(nextTense) => navigateToVerb(verbId, nextTense)}
                  onMoodChange={(nextMood) => navigateToVerb(verbId, tense, nextMood)}
                />
              )}
            </ConjugationSection>
          </MainStack>
        )}

        <FooterStack>
          <Panel>
            <PanelTitle dir={dir} lang={lang}>
              {t('footer.feedback.title')}
            </PanelTitle>
            <Text dir={dir} lang={lang} dangerouslySetInnerHTML={{ __html: tHtml('footer.feedback.body') }} />
            <ActionLink dir={dir} lang={lang} href="https://github.com/goblindegook/musarrif/issues" rel="noreferrer">
              {t('footer.feedback.cta')}
            </ActionLink>
          </Panel>
        </FooterStack>

        {selectedVerb && (
          <>
            <Modal isOpen={isFormInfoOpen} onClose={() => setIsFormInfoOpen(false)} title={t('formInfo.title')}>
              <Text dir={dir} lang={lang}>
                {t(`formInfo.form${selectedVerb.form}.description`)}
              </Text>
              <Text dir={dir} lang={lang}>
                {t(`formInfo.form${selectedVerb.form}.relationship`)}
              </Text>
              <PanelSubtitle dir={dir} lang={lang}>
                {t('formInfo.examples')}
              </PanelSubtitle>
              <SuggestionsList>
                {formInsightExamples.map((example) => (
                  <VerbPill
                    key={example.id}
                    verb={example}
                    className={example.id === selectedVerb?.id ? 'active' : undefined}
                  />
                ))}
              </SuggestionsList>
            </Modal>
            <Modal isOpen={isRootInfoOpen} onClose={() => setIsRootInfoOpen(false)} title={t('rootInfo.title')}>
              {(() => {
                try {
                  const rootAnalysis = analyzeRoot(selectedVerb.root)
                  return (
                    <>
                      <RootDisplay dir="rtl" lang="ar">
                        {Array.from(selectedVerb.root).map((letter, index) => {
                          const isWeak = rootAnalysis.weakPositions.includes(index)
                          const isHamza = rootAnalysis.hamzaPositions.includes(index)
                          return (
                            <RootLetter key={index} weak={isWeak} hamza={isHamza}>
                              {letter}
                              {isWeak && <RootAnnotation>{t('rootInfo.annotation.weak')}</RootAnnotation>}
                              {isHamza && <RootAnnotation>{t('rootInfo.annotation.hamzated')}</RootAnnotation>}
                            </RootLetter>
                          )
                        })}
                      </RootDisplay>
                      <Text dir={dir} lang={lang}>
                        {t(`rootInfo.${rootAnalysis.type}.description`) || t('rootInfo.strong.description')}
                      </Text>
                      <PanelSubtitle dir={dir} lang={lang}>
                        {t('rootInfo.forms')}
                      </PanelSubtitle>
                      <SuggestionsList>
                        {derivedForms.map((verb) => {
                          const isActive = verb.id === selectedVerb?.id
                          return <VerbPill key={verb.id} verb={verb} className={isActive ? 'active' : undefined} />
                        })}
                      </SuggestionsList>
                    </>
                  )
                } catch {}
              })()}
            </Modal>
          </>
        )}
      </Main>
    </Page>
  )
}
