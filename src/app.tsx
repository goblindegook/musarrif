import { styled } from 'goober'
import { AppHeader } from './components/AppHeader'
import { ConjugationMode } from './components/ConjugationMode'
import { ExerciseMode } from './components/ExerciseMode'
import { useI18n } from './hooks/i18n'
import { useRouting } from './hooks/routing'

export function App() {
  const { lang, dir } = useI18n()
  const { page } = useRouting()

  return (
    <Page dir={dir} lang={lang}>
      <AppHeader />
      {page === 'test' ? <ExerciseMode /> : <ConjugationMode />}
    </Page>
  )
}

const Page = styled('div')`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 6rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 960px) {
    padding-top: 2rem;
  }
`
