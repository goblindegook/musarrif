import { styled } from 'goober'
import { AppHeader } from './components/organisms/AppHeader'
import { ConjugationMode } from './components/pages/ConjugationMode'
import { ExerciseMode } from './components/pages/ExerciseMode'
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
`
