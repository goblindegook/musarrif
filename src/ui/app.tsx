import { styled } from 'goober'
import type { ComponentType } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { LinkButton } from './atoms/LinkButton'
import { ScreenReaderOnly } from './atoms/ScreenReaderOnly'
import { useI18n } from './hooks/useI18n'
import { useTour } from './hooks/useTour'
import { AppHeader } from './organisms/AppHeader'
import { TourLayer } from './organisms/TourLayer'
import { ConjugationMode } from './pages/ConjugationMode'
import { ExerciseMode } from './pages/ExerciseMode'
import { Home } from './pages/Home'
import { Route, Router, useRouting } from './routes'
import {
  registerFileDragDropHandler,
  registerTauriFileOpenHandler,
  registerUserDataFileLaunchHandler,
} from './user-data'

export function App() {
  const { lang, dir, t } = useI18n()
  const { route } = useRouting()
  const { isOpen, step, totalSteps, openTour, closeTour, nextStep } = useTour()

  useEffect(registerUserDataFileLaunchHandler, [])
  useEffect(registerFileDragDropHandler, [])
  useEffect(registerTauriFileOpenHandler, [])

  return (
    <Page dir={dir} lang={lang}>
      <ScreenReaderOnly focusable>
        <LinkButton
          href="#main-content"
          onClick={(event: MouseEvent) => {
            event.preventDefault()
            document.getElementById('main-content')?.focus()
          }}
        >
          {t('aria.skipToContent')}
        </LinkButton>
      </ScreenReaderOnly>
      <AppHeader onHelp={openTour} />
      <TourLayer isOpen={isOpen} step={step} totalSteps={totalSteps} onNext={nextStep} onSkip={closeTour} />
      <PWAUpdateGate />
      <Router route={route}>
        <Route path="/test">
          <ExerciseMode />
        </Route>
        <Route path="/verbs/:verbId/:voice/:tense/:mood">
          {({ mood, tense, verbId, voice }) => (
            <ConjugationMode verbId={verbId} voice={voice} tense={tense} mood={mood} />
          )}
        </Route>
        <Route path="/verbs/:verbId/:voice/:tense">
          {({ tense, verbId, voice }) => <ConjugationMode verbId={verbId} voice={voice} tense={tense} />}
        </Route>
        <Route path="/verbs/:verbId">{({ verbId }) => <ConjugationMode verbId={verbId} />}</Route>
        <Route path="/verbs">
          <Home />
        </Route>
        <Route>
          <Home />
        </Route>
      </Router>
    </Page>
  )
}

function PWAUpdateGate() {
  const [Prompt, setPrompt] = useState<ComponentType | null>(null)

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return
    let cancelled = false
    import('./organisms/PWAUpdatePrompt').then((mod) => {
      if (!cancelled) setPrompt(() => mod.PWAUpdatePrompt)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return Prompt ? <Prompt /> : null
}

const Page = styled('div')`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 6rem 0.75rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 480px) {
    padding: 6rem 1rem 2rem;
  }

  @media (min-width: 960px) {
    padding: 2rem 1rem;
  }

  @media print {
    max-width: 100%;
    padding: 0;
    gap: 0;
  }
`
