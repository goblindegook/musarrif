import { styled } from 'goober'
import { useMemo } from 'preact/hooks'
import { useI18n } from '../hooks/i18n'
import { conjugateFuture } from '../paradigms/active/future'
import { conjugateImperative } from '../paradigms/active/imperative'
import { conjugatePast } from '../paradigms/active/past'
import { conjugatePresentMood, type Mood } from '../paradigms/active/present'
import { applyDiacriticsPreference, type DiacriticsPreference } from '../paradigms/letters'
import { conjugatePassiveFuture } from '../paradigms/passive/future'
import { conjugatePassivePast } from '../paradigms/passive/past'
import { conjugatePassivePresentMood } from '../paradigms/passive/present'
import { canConjugatePassive } from '../paradigms/passive/support'
import type { PronounId } from '../paradigms/pronouns'
import type { Tense, Verb, Voice } from '../paradigms/verbs'
import { CopyButton } from './CopyButton'
import { SpeechButton } from './SpeechButton'
import { TabBar, TabButton, TabPanel } from './Tabs'

type TranslationKey = Parameters<ReturnType<typeof useI18n>['t']>[0]

interface PronounSlot {
  id: PronounId
  label: string
  number: 'singular' | 'dual' | 'plural'
  person: '1st' | '2nd' | '3rd'
  gender?: 'masculine' | 'feminine'
}

const PRONOUNS: readonly PronounSlot[] = [
  { id: '1s', label: 'أَنَا', number: 'singular', person: '1st' },

  { id: '2ms', label: 'أَنْتَ', number: 'singular', person: '2nd', gender: 'masculine' },
  { id: '2fs', label: 'أَنْتِ', number: 'singular', person: '2nd', gender: 'feminine' },

  { id: '3ms', label: 'هُوَ', number: 'singular', person: '3rd', gender: 'masculine' },
  { id: '3fs', label: 'هِيَ', number: 'singular', person: '3rd', gender: 'feminine' },

  { id: '2d', label: 'أَنْتُمَا', number: 'dual', person: '2nd' },

  { id: '3md', label: 'هُمَا', number: 'dual', person: '3rd', gender: 'masculine' },
  { id: '3fd', label: 'هُمَا', number: 'dual', person: '3rd', gender: 'feminine' },

  { id: '1p', label: 'نَحْنُ', number: 'plural', person: '1st' },

  { id: '2mp', label: 'أَنْتُمْ', number: 'plural', person: '2nd', gender: 'masculine' },
  { id: '2fp', label: 'أَنْتُنَّ', number: 'plural', person: '2nd', gender: 'feminine' },

  { id: '3mp', label: 'هُمْ', number: 'plural', person: '3rd', gender: 'masculine' },
  { id: '3fp', label: 'هُنَّ', number: 'plural', person: '3rd', gender: 'feminine' },
] as const

interface ConjugationProps {
  verb: Verb
  voice: Voice
  diacriticsPreference?: DiacriticsPreference
  onTenseChange: (tense: Tense) => void
  onMoodChange: (mood: Mood) => void
  onVoiceChange: (voice: Voice) => void
}

interface PastConjugationProps extends ConjugationProps {
  tense: 'past'
  mood?: undefined
}

interface PresentConjugationProps extends ConjugationProps {
  tense: 'present'
  mood: Mood
}

interface FutureConjugationProps extends ConjugationProps {
  tense: 'future'
  mood?: undefined
}

interface ImperativeConjugationProps extends ConjugationProps {
  tense: 'imperative'
  mood?: undefined
}

type ConjugationTableProps =
  | PastConjugationProps
  | PresentConjugationProps
  | FutureConjugationProps
  | ImperativeConjugationProps

export function ConjugationTable({
  verb,
  voice,
  tense,
  mood,
  onTenseChange,
  onMoodChange,
  onVoiceChange,
  diacriticsPreference = 'all',
}: ConjugationTableProps) {
  const { t, dir, lang } = useI18n()
  const passiveAvailable = canConjugatePassive(verb)
  const availableVoices = passiveAvailable ? VOICE_OPTIONS : (['active'] as const)
  const activeVoice = passiveAvailable ? voice : 'active'
  const conjugations = useMemo(() => {
    if (activeVoice === 'passive') {
      if (tense === 'past') return conjugatePassivePast(verb)
      if (tense === 'future') return conjugatePassiveFuture(verb)
      if (tense === 'present') return conjugatePassivePresentMood(verb, mood)
      return null
    }
    if (tense === 'past') return conjugatePast(verb)
    if (tense === 'future') return conjugateFuture(verb)
    if (tense === 'imperative') return conjugateImperative(verb)
    return conjugatePresentMood(verb, mood)
  }, [activeVoice, verb, tense, mood])
  const conjugationEntries: Partial<Record<PronounId, string>> = conjugations ?? {}
  const availableTenses = TENSE_OPTIONS_BY_VOICE[activeVoice]

  return (
    <TabsContainer>
      <TabBlock>
        <TabBar role="tablist" aria-label={t('aria.selectVoice')}>
          {availableVoices.map((option) => (
            <TabButton
              type="button"
              key={option}
              active={option === activeVoice}
              hasChildren
              role="tab"
              id={`voice-tab-${option}`}
              aria-selected={option === activeVoice}
              aria-controls={'conjugation-panel'}
              tabIndex={option === activeVoice ? 0 : -1}
              aria-label={t(VOICE_LABELS[option])}
              onClick={() => onVoiceChange(option)}
              dir={dir}
              lang={lang}
              fluid
            >
              {t(VOICE_LABELS[option])}
            </TabButton>
          ))}
        </TabBar>
        <TenseBlock>
          <SubTabBar wrap role="tablist" aria-label={t('aria.selectTense')}>
            {availableTenses.map((option) => (
              <TabButton
                type="button"
                key={option}
                active={option === tense}
                hasChildren={option === 'present'}
                role="tab"
                id={`tense-tab-${option}`}
                aria-selected={option === tense}
                aria-controls={'conjugation-panel'}
                tabIndex={option === tense ? 0 : -1}
                aria-label={t(TENSE_LABELS[option])}
                onClick={() => onTenseChange(option)}
                dir={dir}
                lang={lang}
                fluid
              >
                {t(TENSE_LABELS[option])}
              </TabButton>
            ))}
          </SubTabBar>
          {tense === 'present' && (
            <SubTabBar role="tablist" aria-label={t('aria.selectMood')}>
              {(Object.keys(MOOD_OPTIONS) as Mood[]).map((option) => (
                <TabButton
                  type="button"
                  key={option}
                  active={option === mood}
                  role="tab"
                  id={`mood-tab-${option}`}
                  aria-selected={option === mood}
                  aria-controls={'conjugation-panel'}
                  tabIndex={option === mood ? 0 : -1}
                  aria-label={t(MOOD_OPTIONS[option])}
                  size="sm"
                  onClick={() => onMoodChange(option)}
                  dir={dir}
                  lang={lang}
                >
                  {t(MOOD_OPTIONS[option])}
                </TabButton>
              ))}
            </SubTabBar>
          )}
        </TenseBlock>
      </TabBlock>
      <TabPanel
        role="tabpanel"
        id="conjugation-panel"
        aria-labelledby={
          tense === 'past' || tense === 'future' || tense === 'imperative' ? `tense-tab-${tense}` : `mood-tab-${mood}`
        }
      >
        <Table dir="rtl">
          <thead>
            <Row>
              <TableHeadCell>{t('table.pronoun')}</TableHeadCell>
              <VerbHeadCell>
                {tense === 'present' && mood !== 'indicative' ? t(MOOD_OPTIONS[mood]) : t(TENSE_LABELS[tense])}
              </VerbHeadCell>
              <TableHeadCell></TableHeadCell>
            </Row>
          </thead>
          <TableBody>
            {PRONOUNS.map((slot) => {
              const conjugation = conjugationEntries[slot.id]
              if (!conjugation) return null
              const displayText = applyDiacriticsPreference(conjugation, diacriticsPreference)

              return (
                <Row key={slot.id}>
                  <PronounCell>
                    <span dir="rtl" lang="ar">
                      {applyDiacriticsPreference(slot.label, diacriticsPreference)}
                    </span>
                    <PronounDescription dir={dir} lang={lang}>
                      {formatDescription(slot, t)}
                    </PronounDescription>
                  </PronounCell>
                  <VerbCell dir="rtl" lang="ar">
                    {displayText}
                  </VerbCell>

                  <ActionCell>
                    <ActionButtons>
                      <CopyButton text={displayText} ariaLabel={t('aria.copy', { text: displayText })} />
                      <SpeechButton text={conjugation} lang="ar" ariaLabel={t('aria.speak', { text: conjugation })} />
                    </ActionButtons>
                  </ActionCell>
                </Row>
              )
            })}
          </TableBody>
        </Table>
      </TabPanel>
    </TabsContainer>
  )
}

const VOICE_OPTIONS: readonly Voice[] = ['active', 'passive']

const VOICE_LABELS: Readonly<Record<Voice, TranslationKey>> = {
  active: 'voice.active',
  passive: 'voice.passive',
} as const

const TENSE_OPTIONS_BY_VOICE: Readonly<Record<Voice, readonly Tense[]>> = {
  active: ['past', 'present', 'future', 'imperative'],
  passive: ['past', 'present', 'future'],
} as const

const TENSE_LABELS: Readonly<Record<Tense, TranslationKey>> = {
  past: 'tense.past',
  present: 'tense.present',
  future: 'tense.future',
  imperative: 'mood.imperative',
} as const

const MOOD_OPTIONS: Readonly<Record<Mood, TranslationKey>> = {
  indicative: 'mood.indicative',
  subjunctive: 'mood.subjunctive',
  jussive: 'mood.jussive',
} as const

const TabsContainer = styled('nav')`
  display: flex;
  flex-direction: column;
  background: #f8fafc;
`

const TabBlock = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem 1.25rem;

  @media (min-width: 720px) {
    padding: 1.5rem 2rem;
  }
`

const SubTabBar = styled(TabBar)`
  background: linear-gradient(to bottom, #fff8e1 0%, transparent 50%);
  border-top: 1px solid #facc15;
  margin-top: -4px;
  margin-left: -1.25rem;
  margin-right: -1.25rem;
  padding: 0.75rem 1.25rem 0.75rem 1.25rem;

  @media (min-width: 720px) {
    margin-left: -2rem;
    margin-right: -2rem;
    padding: 0.75rem 2rem;
  }
`

const TenseBlock = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0;
`

const Table = styled('table')`
  width: 100%;
  border-collapse: collapse;
  font-size: 1.05rem;
  direction: rtl;
  border: none;
`

const TableBody = styled('tbody')`
  tr:last-of-type td {
    padding-bottom: 1.25rem;
  }

  tr:nth-child(odd) {
    background: #fdfdf9;
  }
`

const Row = styled('tr')`
  border-bottom: 1px solid #e2e8f0;
`

const PronounCell = styled('td')`
  padding: 0.6rem 2rem;
  text-align: left;
  font-weight: 600;
  letter-spacing: 0.01em;
  vertical-align: middle;

  span {
    font-size: 1.2rem;
  }
`

const PronounDescription = styled('small')`
  display: block;
  font-size: 0.85rem;
  font-style: italic;
  color: #64748b;
`

const VerbCell = styled('td')`
  width: 65%;
  padding: 0.6rem;
  font-weight: 600;
  text-align: right;
  font-size: 1.8rem;
  vertical-align: middle;
`

const TableHeadCell = styled('th')`
  text-align: left;
  padding: 0.6rem 2rem;
  background: #f8fafc;
  vertical-align: middle;
`

const VerbHeadCell = styled(TableHeadCell)`
  text-align: right;
  padding: 0.6rem;
  width: 65%;
`

const ActionCell = styled('td')`
  padding: 0.75rem 2rem;
  vertical-align: middle;
`

const ActionButtons = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.35rem;
`

function formatDescription(slot: PronounSlot, translate: (key: TranslationKey) => string): string {
  return translate(['pronoun', slot.person, slot.number, slot.gender].filter(Boolean).join('.') as TranslationKey)
}
