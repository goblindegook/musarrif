import { styled } from 'goober'
import { useState } from 'preact/hooks'
import { useI18n } from '../hooks/i18n'
import { DiacriticsToggle } from './DiacriticsToggle'
import { IconButton } from './IconButton'
import { SettingsIcon } from './icons/SettingsIcon'
import { LanguagePicker } from './LanguagePicker'

export const AppHeader = () => {
  const { t, lang, dir } = useI18n()
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
