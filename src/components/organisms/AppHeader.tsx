import { styled } from 'goober'
import { useCallback, useRef, useState } from 'preact/hooks'
import { useI18n } from '../../hooks/i18n'
import { getUserData, importUserData } from '../../hooks/local-storage'
import { useRouting } from '../../hooks/routing'
import { Button } from '../atoms/Button'
import { IconButton } from '../atoms/IconButton'
import { ConjugateIcon } from '../icons/ConjugateIcon'
import { ExerciseIcon } from '../icons/ExerciseIcon'
import { SettingsIcon } from '../icons/SettingsIcon'
import { LanguagePicker } from '../molecules/LanguagePicker'
import { Modal } from '../molecules/Modal'
import { ModeToggle } from '../molecules/ModeToggle'
import { SegmentedControl } from '../molecules/SegmentedControl'

const MODES = ['conjugation', 'test'] as const
const DIACRITICS_OPTIONS = ['all', 'some', 'none'] as const

export const AppHeader = () => {
  const { t, lang, dir, diacriticsPreference, setDiacriticsPreference } = useI18n()
  const { page, navigateTo } = useRouting()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const importInputRef = useRef<HTMLInputElement>(null)

  const exportUserData = useCallback(() => {
    const payload = getUserData()

    const link = document.createElement('a')
    link.href = `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(payload, null, 2))}`
    link.download = 'musarrif-data.json'
    link.click()
  }, [])

  const importData = useCallback(async (event: Event) => {
    const input = event.currentTarget as HTMLInputElement | null
    const file = input?.files?.[0]
    if (input == null || file == null) return

    try {
      if (importUserData(await file.text())) window.location.reload()
    } finally {
      input.value = ''
    }
  }, [])

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
              aria-label={t('settings.title')}
              aria-expanded={isSettingsOpen}
              title={t('settings.title')}
              active={isSettingsOpen}
            >
              <SettingsIcon />
            </IconButton>
          </SettingsButtonWrapper>
        </RightGroup>
      </TopBarHeader>
      <Modal isOpen={isSettingsOpen} title={t('settings.title')} onClose={() => setIsSettingsOpen(false)}>
        <SettingsModalBody>
          <ControlGroup>
            <ControlLabel>{t('diacritics.title')}</ControlLabel>
            <SegmentedControl
              fill
              options={DIACRITICS_OPTIONS.map((option) => ({
                value: option,
                label: t(`diacritics.${option}`),
                title: `${t('diacritics.title')}: ${t(`diacritics.${option}`)}`,
              }))}
              value={diacriticsPreference}
              onChange={(option) => setDiacriticsPreference(option)}
              aria-label={t('diacritics.title')}
            />
          </ControlGroup>
          <ControlGroup>
            <ControlLabel>{t('languagePicker.label')}</ControlLabel>
            <LanguagePicker />
          </ControlGroup>
          <ControlGroup>
            <ControlLabel>{t('settings.data.title')}</ControlLabel>
            <ActionRow>
              <Button onClick={exportUserData}>{t('settings.data.export')}</Button>
              <Button onClick={() => importInputRef.current?.click()}>{t('settings.data.import')}</Button>
            </ActionRow>
            <input ref={importInputRef} type="file" accept="application/json" onChange={importData} hidden />
          </ControlGroup>
        </SettingsModalBody>
      </Modal>
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
  padding: 1rem 0.75rem;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
  transition: padding 180ms cubic-bezier(0.22, 1, 0.36, 1);

  @media (min-width: 480px) {
    padding: 1rem;
  }
  @media (min-width: 960px) {
    position: static;
    background: transparent;
    box-shadow: none;
    padding: 0 0 2rem;
  }

  @media print {
    display: none;
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

const SettingsModalBody = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1.25rem;
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
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #94a3b8;
  padding-inline-start: 0.25rem;
`

const ActionRow = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`
