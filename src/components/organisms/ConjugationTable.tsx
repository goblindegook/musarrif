import { styled } from 'goober'
import { useI18n } from '../../hooks/i18n'
import { conjugate } from '../../paradigms/conjugation'
import { applyDiacriticsPreference, type DiacriticsPreference } from '../../paradigms/letters'
import { ARABIC_PRONOUNS, type PronounId } from '../../paradigms/pronouns'
import type { Mood, Tense, VerbTense, Voice } from '../../paradigms/tense'
import type { DisplayVerb } from '../../paradigms/verbs'
import { getAvailableParadigms } from '../../paradigms/verbs'
import { CopyButton } from '../molecules/CopyButton'
import { SpeechButton } from '../molecules/SpeechButton'
import { TabBar, TabButton, TabPanel } from '../molecules/Tabs'
import { ConjugationInsights } from './ConjugationInsights'

type TranslationKey = Parameters<ReturnType<typeof useI18n>['t']>[0]

interface PronounSlot {
  id: PronounId
  number: 'singular' | 'dual' | 'plural'
  person: '1st' | '2nd' | '3rd'
  gender?: 'masculine' | 'feminine'
}

const PRONOUNS: readonly PronounSlot[] = [
  { id: '1s', number: 'singular', person: '1st' },

  { id: '2ms', number: 'singular', person: '2nd', gender: 'masculine' },
  { id: '2fs', number: 'singular', person: '2nd', gender: 'feminine' },

  { id: '3ms', number: 'singular', person: '3rd', gender: 'masculine' },
  { id: '3fs', number: 'singular', person: '3rd', gender: 'feminine' },

  { id: '2d', number: 'dual', person: '2nd' },

  { id: '3md', number: 'dual', person: '3rd', gender: 'masculine' },
  { id: '3fd', number: 'dual', person: '3rd', gender: 'feminine' },

  { id: '1p', number: 'plural', person: '1st' },

  { id: '2mp', number: 'plural', person: '2nd', gender: 'masculine' },
  { id: '2fp', number: 'plural', person: '2nd', gender: 'feminine' },

  { id: '3mp', number: 'plural', person: '3rd', gender: 'masculine' },
  { id: '3fp', number: 'plural', person: '3rd', gender: 'feminine' },
] as const

interface ConjugationProps {
  verb: DisplayVerb
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
  const availableParadigms = getAvailableParadigms(verb)
  const availableVoices = VOICE_OPTIONS.filter((v) => availableParadigms.some((p) => p.startsWith(`${v}.`)))
  const selectedVoice: Voice = availableVoices.includes(voice) ? voice : (availableVoices[0] ?? 'active')
  const verbTense: VerbTense =
    tense === 'imperative'
      ? 'active.imperative'
      : tense === 'present'
        ? `${selectedVoice}.present.${mood}`
        : `${selectedVoice}.${tense}`
  const conjugations = conjugate(verb, verbTense)
  const availableTenses = TENSE_OPTIONS_BY_VOICE[selectedVoice].filter((t) =>
    availableParadigms.some((p) => p === `${selectedVoice}.${t}` || p.startsWith(`${selectedVoice}.${t}.`)),
  )

  return (
    <TabsContainer>
      <TabBlock>
        <TabBar role="tablist" aria-label={t('aria.selectVoice')}>
          {availableVoices.map((option) => (
            <TabButton
              type="button"
              key={option}
              active={option === selectedVoice}
              hasChildren
              role="tab"
              id={`voice-tab-${option}`}
              aria-selected={option === selectedVoice}
              aria-controls={'conjugation-panel'}
              tabIndex={option === selectedVoice ? 0 : -1}
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
              const conjugation = conjugations[slot.id]
              if (!conjugation) return null
              const displayText = applyDiacriticsPreference(conjugation, diacriticsPreference)

              return (
                <Row key={slot.id}>
                  <PronounCell>
                    <span dir="rtl" lang="ar">
                      {applyDiacriticsPreference(ARABIC_PRONOUNS[slot.id], diacriticsPreference)}
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
                      <ConjugationInsights verb={verb} verbTense={verbTense} pronoun={slot.id} arabic={conjugation} />
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

  @media print {
    background: #fff;
  }
`

const TabBlock = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;

  @media (min-width: 480px) {
    padding: 1rem 1.25rem;
  }

  @media (min-width: 720px) {
    padding: 1.5rem 1.25rem;
  }

  @media print {
    display: none;
  }
`

const SubTabBar = styled(TabBar)`
  background: linear-gradient(to bottom, #fff8e1 0%, transparent 50%);
  border-top: 1px solid #facc15;
  margin-top: -4px;
  margin-left: -1rem;
  margin-right: -1rem;
  padding: 0.75rem;

  @media (min-width: 480px) {
    margin-left: -1.25rem;
    margin-right: -1.25rem;
    padding: 0.75rem 1.25rem;
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

  @media print {
    font-size: 0.86rem;
    line-height: 1.15;
    thead th:last-child,
    tbody td:last-child {
      display: none;
    }
  }
`

const TableBody = styled('tbody')`
  tr:last-of-type td {
    padding-bottom: 1.25rem;
  }

  tr:nth-child(odd) {
    background: #fdfdf9;
  }

  @media print {
    tr:last-of-type td {
      padding-bottom: 0.35rem;
    }

    tr:nth-child(odd) {
      background: transparent;
    }
  }
`

const Row = styled('tr')`
  border-bottom: 1px solid #e2e8f0;

  @media print {
    border-bottom-color: #cbd5e1;
  }
`

const PronounCell = styled('td')`
  padding: 0.6rem 0.75rem;
  text-align: left;
  font-weight: 600;
  letter-spacing: 0.01em;
  vertical-align: middle;

  span {
    font-size: 1.2rem;
  }

  @media (min-width: 480px) {
    padding: 0.6rem 1.25rem;
  }

  @media print {
    padding: 0.35rem 0 0.35rem 0.45rem;

    span {
      font-size: 0.96rem;
      line-height: 1.1;
    }
  }
`

const PronounDescription = styled('small')`
  display: block;
  font-size: 0.85rem;
  font-style: italic;
  color: #64748b;

  @media print {
    display: none;
  }
`

const VerbCell = styled('td')`
  width: 65%;
  padding: 0.6rem;
  font-weight: 600;
  text-align: right;
  font-size: 1.6rem;
  vertical-align: middle;

  @media (min-width: 480px) {
    font-size: 1.8rem;
  }

  @media print {
    width: auto;
    padding: 0.35rem 0.35rem;
    font-size: 1.18rem;
    line-height: 1.15;
  }
`

const TableHeadCell = styled('th')`
  text-align: left;
  padding: 0.6rem 0.75rem;
  background: #f8fafc;
  vertical-align: middle;

  @media (min-width: 480px) {
    padding: 0.6rem 1.25rem;
  }

  @media print {
    padding: 0.2rem 0.45rem;
    font-size: 0.7rem;
    line-height: 1.1;
    background: transparent;
  }
`

const VerbHeadCell = styled(TableHeadCell)`
  text-align: right;
  padding: 0.6rem;
  width: 65%;

  @media print {
    padding: 0.2rem 0.35rem;
  }
`

const ActionCell = styled('td')`
  padding: 0.75rem;
  vertical-align: middle;

  @media (min-width: 480px) {
    padding: 0.75rem 1.25rem;
  }

  @media print {
    display: none;
  }
`

const ActionButtons = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.25rem;

  @media (min-width: 480px) {
    gap: 0.35rem;
  }

  @media print {
    display: none;
  }
`

function formatDescription(slot: PronounSlot, translate: (key: TranslationKey) => string): string {
  return translate(['pronoun', slot.person, slot.number, slot.gender].filter(Boolean).join('.') as TranslationKey)
}
