import { listen } from '@tauri-apps/api/event'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { styled } from 'goober'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'
import { Button } from '../atoms/Button'
import { IconButton } from '../atoms/IconButton'
import { Select } from '../atoms/Select'
import { Subheading } from '../atoms/Subheading'
import { useI18n } from '../hooks/useI18n'
import { useSpeech } from '../hooks/useSpeech'
import { type ThemePreference, useTheme } from '../hooks/useTheme'
import { ConjugateIcon } from '../icons/ConjugateIcon'
import { ExerciseIcon } from '../icons/ExerciseIcon'
import { HelpIcon } from '../icons/HelpIcon'
import { SettingsIcon } from '../icons/SettingsIcon'
import { LanguagePicker } from '../molecules/LanguagePicker'
import { Modal } from '../molecules/Modal'
import { ModeToggle } from '../molecules/ModeToggle'
import { SegmentedControl } from '../molecules/SegmentedControl'
import { useRouting } from '../routes'
import { getUserData, importUserData, USER_DATA_MIME_TYPE } from '../user-data'

const DIACRITICS_OPTIONS = ['all', 'some', 'none'] as const
const THEME_OPTIONS = ['light', 'dark', 'system'] as const

interface AppHeaderProps {
  onHelp?: () => void
}

export const AppHeader = ({ onHelp }: AppHeaderProps) => {
  const { t, lang, dir, diacriticsPreference, setDiacriticsPreference } = useI18n()
  const { themePreference, setThemePreference } = useTheme()
  const { voices, voiceName, setVoiceName } = useSpeech('ar')
  const { route, navigateTo } = useRouting()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [pendingImportContent, setPendingImportContent] = useState<string | null>(null)
  const importInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!('__TAURI_INTERNALS__' in window)) return
    let unlisten: (() => void) | undefined
    listen('open-settings', () => setIsSettingsOpen(true)).then((fn) => {
      unlisten = fn
    })
    return () => unlisten?.()
  }, [])

  useEffect(() => {
    const handler = (e: Event) => {
      setPendingImportContent((e as CustomEvent<string>).detail)
    }
    document.addEventListener('musarrif:pending-import', handler)
    return () => document.removeEventListener('musarrif:pending-import', handler)
  }, [])

  const exportUserData = useCallback(() => {
    const payload = getUserData()
    const link = document.createElement('a')
    link.href = `${`data:${USER_DATA_MIME_TYPE};charset=utf-8,`}${encodeURIComponent(JSON.stringify(payload, null, 2))}`
    link.download = 'user-data.musarrif'
    link.click()
  }, [])

  const importData = useCallback(async (event: Event) => {
    const input = event.currentTarget as HTMLInputElement | null
    const file = input?.files?.[0]
    if (input == null || file == null) return

    try {
      document.dispatchEvent(new CustomEvent('musarrif:pending-import', { detail: await file.text() }))
    } finally {
      input.value = ''
    }
  }, [])

  return (
    <TopBar>
      <TopBarHeader>
        <TitleGroup
          dir={dir}
          lang={lang}
          onMouseDown={(e: MouseEvent) => {
            if ('__TAURI_INTERNALS__' in window && e.buttons === 1) getCurrentWindow().startDragging()
          }}
        >
          <Eyebrow dir={dir} lang={lang}>
            {t('eyebrow')}
          </Eyebrow>
          <PageTitle dir={dir} lang={lang}>
            {t('title')}
          </PageTitle>
        </TitleGroup>
        <RightGroup>
          {/* FIXME: data-tour-step on ModeToggle  */}
          <span data-tour-step="3">
            <ModeToggle
              activeMode={route[0] === 'test' ? 1 : 0}
              labels={[t('mode.conjugate'), t('mode.exercise')]}
              icons={[<ConjugateIcon />, <ExerciseIcon />]}
              ariaLabel={t('mode.label')}
              onClick={(index) => {
                if (index === 0) navigateTo(['verbs'])
                else navigateTo(['test'])
              }}
            />
          </span>
          <IconButton data-tour-step="4" onClick={onHelp} aria-label={t('tour.open')} title={t('tour.open')}>
            <HelpIcon />
          </IconButton>
          <IconButton
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            aria-label={t('settings.title')}
            aria-expanded={isSettingsOpen}
            title={t('settings.title')}
            active={isSettingsOpen}
          >
            <SettingsIcon />
          </IconButton>
        </RightGroup>
      </TopBarHeader>
      <Modal isOpen={isSettingsOpen} title={t('settings.title')} onClose={() => setIsSettingsOpen(false)}>
        <SettingsModalBody>
          <ControlGroup>
            <Subheading>{t('languagePicker.label')}</Subheading>
            <LanguagePicker />
          </ControlGroup>
          <ControlGroup>
            <Subheading>{t('diacritics.title')}</Subheading>
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
          {voices.length > 1 && (
            <ControlGroup>
              <Subheading>{t('settings.voice.title')}</Subheading>
              <Select
                value={voiceName ?? ''}
                onChange={(event) => setVoiceName(event.currentTarget.value)}
                aria-label={t('settings.voice.title')}
                title={t('settings.voice.title')}
                dir={dir}
              >
                {voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name}
                  </option>
                ))}
              </Select>
            </ControlGroup>
          )}
          <ControlGroup>
            <Subheading>{t('theme.title')}</Subheading>
            <SegmentedControl
              fill
              options={THEME_OPTIONS.map((option) => ({
                value: option,
                label: t(`theme.${option}`),
                title: `${t('theme.title')}: ${t(`theme.${option}`)}`,
              }))}
              value={themePreference}
              onChange={(option) => setThemePreference(option as ThemePreference)}
              aria-label={t('theme.title')}
            />
          </ControlGroup>
          <ControlGroup>
            <Subheading>{t('settings.data.title')}</Subheading>
            <ActionRow>
              <Button onClick={exportUserData}>{t('settings.data.export')}</Button>
              <Button onClick={() => importInputRef.current?.click()}>{t('settings.data.import')}</Button>
            </ActionRow>
            <input
              ref={importInputRef}
              type="file"
              accept={['application/json', USER_DATA_MIME_TYPE, '.json', '.musarrif'].join(',')}
              onChange={importData}
              hidden
            />
          </ControlGroup>
        </SettingsModalBody>
      </Modal>
      <Modal
        isOpen={pendingImportContent != null}
        title={t('settings.importWarning.title')}
        onClose={() => setPendingImportContent(null)}
      >
        <SettingsModalBody>
          <p>{t('settings.importWarning.message')}</p>
          <ActionRow>
            <Button onClick={() => setPendingImportContent(null)}>{t('settings.importWarning.cancel')}</Button>
            <Button
              onClick={() => {
                const content = pendingImportContent
                setPendingImportContent(null)
                if (content != null && importUserData(content)) window.location.reload()
              }}
            >
              {t('settings.importWarning.confirm')}
            </Button>
          </ActionRow>
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
  background: radial-gradient(circle at top, var(--color-bg-gradient-start) 0%, var(--color-bg-gradient-mid) 60%, var(--color-bg-gradient-end) 100%);
  padding: 1rem 0.75rem;
  box-shadow: var(--shadow-interactive);
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
  cursor: default;
  user-select: none;
`

const Eyebrow = styled('p')`
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.78rem;
  color: var(--color-text-emphasis);
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
  color: var(--color-text-tertiary);
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

const RightGroup = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
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

const ActionRow = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`
