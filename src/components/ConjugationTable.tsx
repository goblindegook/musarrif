import { styled } from 'goober'
import { useMemo } from 'preact/hooks'
import { useI18n } from '../hooks/i18n'
import { conjugateFuture } from '../paradigms/active/future'
import { conjugateImperative } from '../paradigms/active/imperative'
import { conjugatePast } from '../paradigms/active/past'
import { conjugatePresentMood, type Mood } from '../paradigms/active/present'
import { applyDiacriticsPreference, type DiacriticsPreference } from '../paradigms/letters'
import type { PronounId } from '../paradigms/pronouns'
import type { Tense, Verb } from '../paradigms/verbs'
import { SpeechButton, useSpeechSupport } from './SpeechButton'

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

  { id: '3dm', label: 'هُمَا', number: 'dual', person: '3rd', gender: 'masculine' },
  { id: '3df', label: 'هُمَا', number: 'dual', person: '3rd', gender: 'feminine' },

  { id: '1p', label: 'نَحْنُ', number: 'plural', person: '1st' },

  { id: '2pm', label: 'أَنْتُمْ', number: 'plural', person: '2nd', gender: 'masculine' },
  { id: '2pf', label: 'أَنْتُنَّ', number: 'plural', person: '2nd', gender: 'feminine' },

  { id: '3pm', label: 'هُمْ', number: 'plural', person: '3rd', gender: 'masculine' },
  { id: '3pf', label: 'هُنَّ', number: 'plural', person: '3rd', gender: 'feminine' },
] as const

interface ConjugationProps {
  verb: Verb
  diacriticsPreference?: DiacriticsPreference
  onTenseChange: (tense: Tense) => void
  onMoodChange: (mood: Mood) => void
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
  tense,
  mood,
  onTenseChange,
  onMoodChange,
  diacriticsPreference = 'all',
}: ConjugationTableProps) {
  const { t, dir, lang } = useI18n()
  const speechSupported = useSpeechSupport('ar')
  const conjugations = useMemo(() => {
    if (tense === 'past') return conjugatePast(verb)
    if (tense === 'future') return conjugateFuture(verb)
    if (tense === 'imperative') return conjugateImperative(verb)
    return conjugatePresentMood(verb, mood)
  }, [verb, tense, mood])

  return (
    <TabsContainer>
      <TabBlock>
        <TabBar wrap role="tablist" aria-label={t('aria.selectTense')}>
          {(Object.keys(TENSE_OPTIONS) as Tense[]).map((option) => (
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
              aria-label={t(TENSE_OPTIONS[option])}
              onClick={() => onTenseChange(option)}
              dir={dir}
              lang={lang}
              fluid
            >
              {t(TENSE_OPTIONS[option])}
            </TabButton>
          ))}
        </TabBar>
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
      </TabBlock>
      {conjugations && (
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
                  {tense === 'present' && mood !== 'indicative' ? t(MOOD_OPTIONS[mood]) : t(TENSE_OPTIONS[tense])}
                </VerbHeadCell>
                {speechSupported && <TableHeadCell></TableHeadCell>}
              </Row>
            </thead>
            <TableBody>
              {PRONOUNS.filter((slot) => conjugations[slot.id]).map((slot, index) => (
                <Row key={slot.id} striped={index % 2 === 0}>
                  <PronounCell>
                    <span dir="rtl" lang="ar">
                      {applyDiacriticsPreference(slot.label, diacriticsPreference)}
                    </span>
                    <PronounDescription dir={dir} lang={lang}>
                      {formatDescription(slot, t)}
                    </PronounDescription>
                  </PronounCell>
                  <VerbCell dir="rtl" lang="ar">
                    {applyDiacriticsPreference(conjugations[slot.id], diacriticsPreference)}
                  </VerbCell>
                  {speechSupported && (
                    <AudioCell>
                      <SpeechButton
                        text={conjugations[slot.id]}
                        lang="ar"
                        ariaLabel={t('aria.speak', { text: conjugations[slot.id] })}
                      />
                    </AudioCell>
                  )}
                </Row>
              ))}
            </TableBody>
          </Table>
        </TabPanel>
      )}
    </TabsContainer>
  )
}

const TENSE_OPTIONS: Readonly<Record<Tense, TranslationKey>> = {
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

const TabBar = styled('div')<{ wrap?: boolean }>`
  display: flex;
  gap: 0.5rem;
  padding: 0;
  flex-wrap: ${({ wrap }) => (wrap ? 'wrap' : 'nowrap')};

  @media (min-width: 720px) {
    flex-wrap: nowrap;
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

const TabButton = styled('button')<{
  active?: boolean
  size?: 'sm' | 'lg'
  fluid?: boolean
  hasChildren?: boolean
}>`
  align-items: center;
  background: ${({ active }) => (active ? '#fff8e1' : '#fff')};
  border-radius: 0.75rem;
  border: 1px solid ${({ active }) => (active ? '#facc15' : '#e2e8f0')};
  box-shadow: ${({ active }) => (active ? '0 2px 10px rgba(15, 23, 42, 0.12)' : 'none')};
  color: ${({ active }) => (active ? '#92400e' : '#475569')};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex: 1;
  font-family: inherit;
  font-size: ${({ size }) => (size === 'sm' ? '0.8rem' : '0.9rem')};
  gap: 0.1rem;
  justify-content: center;
  letter-spacing: 0.08em;
  min-width: ${({ fluid }) => (fluid ? 'calc(50% - 0.25rem)' : '0')};
  padding: 0.4rem 0.6rem;
  position: relative;
  text-transform: uppercase;
  transition: background 120ms ease, border-color 120ms ease, box-shadow 120ms ease, color 120ms ease;

  &:hover {
    background: ${({ active }) => (active ? '#fff8e1' : '#f1f5f9')};
    border-color: ${({ active }) => (active ? '#facc15' : '#cbd5f5')};
    color: ${({ active }) => (active ? '#92400e' : '#334155')};
    box-shadow: ${({ active }) => (active ? '0' : '0 6px 14px rgba(15, 23, 42, 0.1)')};
  }

  @media (min-width: 720px) {
    min-width: 0;

    ${({ active, hasChildren }) =>
      active &&
      hasChildren &&
      `
      border-radius: 0.75rem 0.75rem 0 0;
      border-bottom: none;
      z-index: 1;

      &::after {
        content: '';
        position: absolute;
        bottom: calc(-0.5rem - 1px);
        left: -1px;
        right: -1px;
        height: calc(0.5rem + 1px);
        background: #fff8e1;
        z-index: 10;
        border-left: 1px solid #facc15;
        border-right: 1px solid #facc15;
      }
    `}
  }
`

const TabPanel = styled('div')`
  outline: none;
`

const Table = styled('table')`
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
  font-size: 1.05rem;
  direction: rtl;
  border: none;
`

const TableBody = styled('tbody')`
  tr:last-of-type td {
    padding-bottom: 1.25rem;
  }
`

const Row = styled('tr')<{ striped?: boolean }>`
  background: ${(props) => (props.striped ? '#fdfdf9' : 'transparent')};
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

const AudioCell = styled('td')`
  padding: 0.75rem 2rem;
  width: 54px;
  vertical-align: middle;
`

function formatDescription(slot: PronounSlot, translate: (key: TranslationKey) => string): string {
  return translate(['pronoun', slot.person, slot.number, slot.gender].filter(Boolean).join('.') as TranslationKey)
}
