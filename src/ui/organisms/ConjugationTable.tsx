import { styled } from 'goober'
import { conjugate } from '../../paradigms/conjugation'
import { ARABIC_PRONOUNS, type PronounId } from '../../paradigms/pronouns'
import { ALL_TENSES, type Mood, type Tense, type VerbTense, type Voice } from '../../paradigms/tense'
import { applyDiacriticsPreference, type DiacriticsPreference } from '../../paradigms/tokens'
import type { DisplayVerb } from '../../paradigms/verbs'
import { getAvailableParadigms } from '../../paradigms/verbs'
import { keys } from '../../primitives/objects'
import { useI18n } from '../hooks/useI18n'
import { CopyButton } from '../molecules/CopyButton'
import { SpeechButton } from '../molecules/SpeechButton'
import { TabBar, TabButton, TabPanel } from '../molecules/Tabs'
import { ConjugationInsights } from './ConjugationInsights'

type TranslationKey = string

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
  mood?: never
}

export type ConjugationTableProps =
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
  const availableTenses = TENSE_OPTIONS[selectedVoice].filter((t) =>
    availableParadigms.some((p) => p === `${selectedVoice}.${t}` || p.startsWith(`${selectedVoice}.${t}.`)),
  )
  const moodOptions = keys(MOOD_LABELS)
  const paradigms = ALL_TENSES.filter((paradigm) => availableParadigms.includes(paradigm))

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
              aria-controls={panelId(verbTense)}
              tabIndex={option === selectedVoice ? 0 : -1}
              aria-label={t(VOICE_LABELS[option])}
              onClick={() => onVoiceChange(option)}
              onKeyDown={tabKeyDown(availableVoices, option, 'voice-tab', onVoiceChange)}
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
                aria-controls={panelId(verbTense)}
                tabIndex={option === tense ? 0 : -1}
                aria-label={t(TENSE_LABELS[option])}
                onClick={() => onTenseChange(option)}
                onKeyDown={tabKeyDown(availableTenses, option, 'tense-tab', onTenseChange)}
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
              {moodOptions.map((option) => (
                <TabButton
                  type="button"
                  key={option}
                  active={option === mood}
                  role="tab"
                  id={`mood-tab-${option}`}
                  aria-selected={option === mood}
                  aria-controls={panelId(verbTense)}
                  tabIndex={option === mood ? 0 : -1}
                  aria-label={t(MOOD_LABELS[option])}
                  size="sm"
                  onClick={() => onMoodChange(option)}
                  onKeyDown={tabKeyDown(moodOptions, option, 'mood-tab', onMoodChange)}
                  dir={dir}
                  lang={lang}
                >
                  {t(MOOD_LABELS[option])}
                </TabButton>
              ))}
            </SubTabBar>
          )}
        </TenseBlock>
      </TabBlock>
      {paradigms.map((paradigm) => (
        <ParadigmPanel
          key={paradigm}
          role="tabpanel"
          id={panelId(paradigm)}
          aria-label={t(`tense.${paradigm}`)}
          hidden={paradigm !== verbTense}
          data-print={paradigm.endsWith('.future') ? 'omit' : undefined}
        >
          <ParadigmTable
            verb={verb}
            verbTense={paradigm}
            diacriticsPreference={diacriticsPreference}
            interactive={paradigm === verbTense}
          />
        </ParadigmPanel>
      ))}
    </TabsContainer>
  )
}

const panelId = (verbTense: VerbTense) => `conjugation-panel-${verbTense}`

interface ParadigmTableProps {
  verb: DisplayVerb
  verbTense: VerbTense
  diacriticsPreference: DiacriticsPreference
  interactive: boolean
}

function ParadigmTable({ verb, verbTense, diacriticsPreference, interactive }: ParadigmTableProps) {
  const { t, dir, lang } = useI18n()
  const conjugations = conjugate(verb, verbTense)

  return (
    <Table dir="rtl">
      <thead>
        <Row>
          <TableHeadCell scope="col">
            <HeadLabel>{t('table.pronoun')}</HeadLabel>
          </TableHeadCell>
          <VerbHeadCell scope="col" colspan={2}>
            {t(`tense.${verbTense}`)}
          </VerbHeadCell>
        </Row>
      </thead>
      <TableBody>
        {PRONOUNS.map((slot) => {
          const conjugation = conjugations[slot.id]

          if (!String(conjugation))
            return (
              <BlankRow key={slot.id}>
                <PronounCell />
                <VerbCell dir="rtl" lang="ar">
                  {'\u00a0'}
                </VerbCell>
                <ActionCell />
              </BlankRow>
            )

          const displayText = applyDiacriticsPreference(String(conjugation), diacriticsPreference)

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
                {interactive && (
                  <ActionButtons>
                    <CopyButton text={displayText} ariaLabel={t('aria.copy', { text: displayText })} />
                    <SpeechButton
                      text={String(conjugation)}
                      lang="ar"
                      ariaLabel={t('aria.speak', { text: String(conjugation) })}
                    />
                    <ConjugationInsights
                      verb={verb}
                      verbTense={verbTense}
                      pronoun={slot.id}
                      arabic={String(conjugation)}
                    />
                  </ActionButtons>
                )}
              </ActionCell>
            </Row>
          )
        })}
      </TableBody>
    </Table>
  )
}

function tabKeyDown<T extends string>(
  options: readonly T[],
  current: T,
  idPrefix: string,
  onChange: (next: T) => void,
) {
  return (e: KeyboardEvent) => {
    const idx = options.indexOf(current)
    let next: number
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (idx + 1) % options.length
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (idx - 1 + options.length) % options.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = options.length - 1
    else return
    e.preventDefault()
    document.getElementById(`${idPrefix}-${options[next]}`)?.focus()
    onChange(options[next])
  }
}

const VOICE_OPTIONS: readonly Voice[] = ['active', 'passive']

const VOICE_LABELS: Readonly<Record<Voice, TranslationKey>> = {
  active: 'voice.active',
  passive: 'voice.passive',
} as const

const TENSE_OPTIONS: Readonly<Record<Voice, readonly Tense[]>> = {
  active: ['past', 'present', 'future', 'imperative'],
  passive: ['past', 'present', 'future'],
} as const

const TENSE_LABELS: Readonly<Record<Tense, TranslationKey>> = {
  past: 'tense.past',
  present: 'tense.present',
  future: 'tense.future',
  imperative: 'mood.imperative',
} as const

const MOOD_LABELS: Readonly<Record<Mood, TranslationKey>> = {
  indicative: 'mood.indicative',
  subjunctive: 'mood.subjunctive',
  jussive: 'mood.jussive',
} as const

const TabsContainer = styled('nav')`
  display: flex;
  flex-direction: column;
  background: transparent;

  @media print {
    background: #fff;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: start;
    gap: 6mm 4mm;
  }
`

const ParadigmPanel = styled(TabPanel)`
  &[hidden] {
    display: none;
  }

  @media print {
    padding-top: 0;
    break-inside: avoid;

    &[hidden] {
      display: flex;
    }

    &[data-print='omit'] {
      display: none;
    }
  }
`

const TabBlock = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem 0rem 0.35rem;

  @media (min-width: 480px) {
    padding: 1rem 1.25rem 0.35rem;
  }

  @media (min-width: 720px) {
    padding: 1.5rem 0 0.35rem;
  }

  @media print {
    display: none;
  }
`

const SubTabBar = styled(TabBar)`
  background: linear-gradient(to bottom, var(--color-bg-accent) 0%, transparent 50%);
  border-top: 1px solid var(--color-accent);
  margin-top: -4px;
  padding: 0.75rem 0;
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
    font-size: 0.62rem;
    line-height: 1.05;
    thead tr {
      border-top: none;
      border-bottom: 0.5px solid #e2ddd4;
    }
    tbody td:last-child {
      display: none;
    }
  }
`

const TableBody = styled('tbody')`
  tr:last-of-type {
    border-bottom: none;
  }

  tr:last-of-type td {
    padding-bottom: 1.25rem;
  }

  tr:nth-child(odd) {
    background: var(--color-bg-surface-secondary);
  }

  @media print {
    tr:last-of-type td {
      padding-bottom: 0.28rem;
    }

    tr:nth-child(odd) {
      background: transparent;
    }
  }
`

const Row = styled('tr')`
  border-bottom: 1px solid var(--color-border);

  @media print {
    border-top: 0.5px solid #e2ddd4;
    border-bottom: 0.5px solid #e2ddd4;
  }
`

const BlankRow = styled(Row)`
  display: none;

  @media print {
    display: table-row;
    border-style: dashed;
    border-color: transparent;
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
    width: 1%;
    white-space: nowrap;
    padding: 0.28rem 0 0.28rem 0.2rem;
    font-weight: 400;
    color: #4d4d4d;

    span {
      font-size: 0.5rem;
      line-height: 1.05;
    }
  }
`

const PronounDescription = styled('small')`
  display: block;
  font-size: 0.85rem;
  font-style: italic;
  color: var(--color-text-secondary);

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
    padding: 0.28rem 0.2rem;
    font-size: 0.88rem;
    line-height: 1.05;
  }
`

const HeadLabel = styled('span')`
  @media print {
    display: none;
  }
`

const TableHeadCell = styled('th')`
  text-align: left;
  padding: 0.6rem 0.75rem;
  background: transparent;
  vertical-align: middle;

  @media (min-width: 480px) {
    padding: 0.6rem 1.25rem;
  }

  @media print {
    padding: 0.1rem 0.25rem;
    font-size: 0.5rem;
    line-height: 1.05;
    background: transparent;
    white-space: nowrap;
  }
`

const VerbHeadCell = styled(TableHeadCell)`
  text-align: right;
  padding: 0.6rem;
  width: 65%;

  @media print {
    padding: 0.1rem 0.2rem;
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

  @media print {
    display: none;
  }
`

function formatDescription(slot: PronounSlot, translate: (key: TranslationKey) => string): string {
  return translate(['pronoun', slot.person, slot.number, slot.gender].filter(Boolean).join('.') as TranslationKey)
}
