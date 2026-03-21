import { styled } from 'goober'
import { useState } from 'preact/hooks'
import { useI18n } from '../hooks/i18n'
import { useRouting } from '../hooks/routing'
import { IconButton } from './atoms/IconButton'
import { SegmentedControl, SegmentedControlButton } from './atoms/SegmentedControl'
import { ConjugateIcon } from './icons/ConjugateIcon'
import { ExerciseIcon } from './icons/ExerciseIcon'
import { SettingsIcon } from './icons/SettingsIcon'
import { LanguagePicker } from './LanguagePicker'
import { ModeToggle } from './ModeToggle'

const MODES = ['conjugation', 'test'] as const
const DIACRITICS_OPTIONS = ['all', 'some', 'none'] as const

export const AppHeader = () => {
  const { t, lang, dir, diacriticsPreference, setDiacriticsPreference } = useI18n()
  const { page, navigateTo } = useRouting()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
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
        <RightGroup>
          <ModeToggle
            activeMode={MODES.indexOf(page)}
            labels={[t('mode.conjugate'), t('mode.exercise')]}
            icons={[<ConjugateIcon />, <ExerciseIcon />]}
            ariaLabel={t('mode.label')}
            onClick={(index) => {
              if (index === 0) navigateTo('/#/verbs')
              else navigateTo('/#/test')
            }}
          />
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
          <Controls visible={isSettingsOpen}>
            <ControlGroup>
              <ControlLabel>{t('diacritics.title')}</ControlLabel>
              <SegmentedControl fill role="group" aria-label={t('diacritics.title')}>
                {DIACRITICS_OPTIONS.map((option) => (
                  <SegmentedControlButton
                    type="button"
                    key={option}
                    active={diacriticsPreference === option}
                    aria-pressed={diacriticsPreference === option}
                    onClick={() => setDiacriticsPreference(option)}
                    title={`${t('diacritics.title')}: ${t(`diacritics.${option}`)}`}
                  >
                    {t(`diacritics.${option}`)}
                  </SegmentedControlButton>
                ))}
              </SegmentedControl>
            </ControlGroup>
            <ControlGroup>
              <ControlLabel>{t('languagePicker.label')}</ControlLabel>
              <LanguagePicker />
            </ControlGroup>
          </Controls>
        </RightGroup>
      </TopBarHeader>
    </TopBar>
  )
}

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
    position: static;
    background: transparent;
    box-shadow: none;
    padding: 0 0 2rem;
  }
`

const TopBarHeader = styled('div')`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  width: 100%;
  min-width: 0;
  gap: 1rem;
`

const TitleGroup = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  min-width: 0;
  overflow: hidden;
`

const Eyebrow = styled('p')`
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.78rem;
  color: #92400e;
  margin: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &[lang='ar'] {
    letter-spacing: 0;
  }
`

const PageTitle = styled('h1')`
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 1.3rem;
  color: #334155;
  line-height: 1.2;
  font-weight: 500;

  &[lang='ar'] {
    letter-spacing: 0;
  }

  @media (min-width: 960px) {
    font-size: clamp(1.9rem, 3vw, 2.4rem);
    line-height: 1.5;
  }
`

const Controls = styled('aside')<{ visible: boolean }>`
  position: absolute;
  top: calc(100% + 0.5rem);
  inset-inline-end: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1.25rem;
  width: max-content;
  min-width: min(360px, calc(100vw - 2rem));
  max-width: calc(100vw - 2rem);
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1rem 1.25rem;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.1);
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
  transform: ${({ visible }) => (visible ? 'translateY(0)' : 'translateY(-6px)')};
  transition: opacity 150ms ease, transform 150ms ease;
  z-index: 10;
`

const SettingsButtonWrapper = styled('div')`
  display: flex;
  justify-content: flex-end;
`

const RightGroup = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  justify-self: end;
  flex-shrink: 0;
`

const ControlGroup = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const ControlLabel = styled('span')`
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #94a3b8;
  padding-inline-start: 0.25rem;
`
