import { useEffect } from 'preact/hooks'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useRouting } from '../routes'
import { AppHeader } from './AppHeader'

interface LandingHeaderProps {
  onLeave: () => void
}

export const LandingHeader = ({ onLeave }: LandingHeaderProps) => {
  const { route, navigateTo } = useRouting()
  const [, setTourSeen] = useLocalStorage<boolean>('tourSeen', false)

  useEffect(() => {
    if (route.length > 0) onLeave()
  }, [route, onLeave])

  // The tour lives inside the app shell, which opens it on mount when it has not been seen.
  const openTour = () => {
    setTourSeen(false)
    navigateTo(['verbs'])
  }

  return <AppHeader onHelp={openTour} />
}
