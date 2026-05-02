import { styled } from 'goober'
import { AppHeader } from './components/organisms/AppHeader'
import { ConjugationMode } from './components/pages/ConjugationMode'
import { ExerciseMode } from './components/pages/ExerciseMode'
import { Home } from './components/pages/Home'
import { useI18n } from './hooks/useI18n'
import { Route, Router, useRouting } from './routes'

export function App() {
  const { lang, dir } = useI18n()
  const { route } = useRouting()

  return (
    <Page dir={dir} lang={lang}>
      <AppHeader />
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
