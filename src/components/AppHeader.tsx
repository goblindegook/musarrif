import { styled } from 'goober'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'
import { useI18n } from '../hooks/i18n'
import { getUserData, importUserData, useLocalStorage } from '../hooks/local-storage'
import { useRouting } from '../hooks/routing'
import { IconButton } from './atoms/IconButton'
import { SegmentedControl } from './atoms/SegmentedControl'
import { ConjugateIcon } from './icons/ConjugateIcon'
import { ExerciseIcon } from './icons/ExerciseIcon'
import { SettingsIcon } from './icons/SettingsIcon'
import { LanguagePicker } from './LanguagePicker'
import { ModeToggle } from './ModeToggle'

const MODES = ['conjugation', 'test'] as const
const DIACRITICS_OPTIONS = ['all', 'some', 'none'] as const
const DIFFICULTY_OPTIONS = ['easy', 'medium', 'hard'] as const

export const AppHeader = () => {
  const { t, lang, dir, diacriticsPreference, setDiacriticsPreference } = useI18n()
  const { page, navigateTo } = useRouting()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [storedDifficulty, setDifficulty] = useLocalStorage<string>('exerciseDifficulty', 'easy')
  const importInputRef = useRef<HTMLInputElement>(null)
  const exerciseDifficulty = storedDifficulty === 'medium' || storedDifficulty === 'hard' ? storedDifficulty : 'easy'

  useEffect(() => {
    if (!isSettingsOpen) return

    const abortController = new AbortController()

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target =
        event.target instanceof Element
          ? event.target
          : event.target instanceof Node
            ? event.target.parentElement
            : null
      if (target == null) return
      if (target.closest('[data-settings-panel]') != null) return
      if (target.closest('[data-settings-toggle]') != null) return
      setIsSettingsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside, { signal: abortController.signal })
    document.addEventListener('touchstart', handleClickOutside, { signal: abortController.signal })

    return () => abortController.abort()
  }, [isSettingsOpen])

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
          <SettingsButtonWrapper data-settings-toggle>
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
          <Controls data-settings-panel visible={isSettingsOpen}>
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
              <ControlLabel>{t('exercise.difficulty.title')}</ControlLabel>
              <SegmentedControl
                fill
                options={DIFFICULTY_OPTIONS.map((option) => ({
                  value: option,
                  label: t(`exercise.difficulty.${option}`),
                  title: `${t('exercise.difficulty.title')}: ${t(`exercise.difficulty.${option}`)}`,
                }))}
                value={exerciseDifficulty}
                onChange={(option) => {
                  if (option === exerciseDifficulty) return
                  setDifficulty(option)
                  if (page === 'test') window.location.reload()
                }}
                aria-label={t('exercise.difficulty.title')}
              />
            </ControlGroup>
            <ControlGroup>
              <ControlLabel>{t('settings.data.title')}</ControlLabel>
              <ActionRow>
                <ActionButton type="button" onClick={exportUserData}>
                  {t('settings.data.export')}
                </ActionButton>
                <ActionButton type="button" onClick={() => importInputRef.current?.click()}>
                  {t('settings.data.import')}
                </ActionButton>
              </ActionRow>
              <input ref={importInputRef} type="file" accept="application/json" onChange={importData} hidden />
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

const ActionRow = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`

const ActionButton = styled('button')`
  border: 1px solid #cbd5e1;
  border-radius: 0.6rem;
  background: #f8fafc;
  color: #334155;
  padding: 0.45rem 0.6rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 120ms ease, border-color 120ms ease, color 120ms ease;

  &:hover,
  &:focus-visible {
    background: #fff8e1;
    border-color: #facc15;
    color: #0f172a;
    outline: none;
  }
`
