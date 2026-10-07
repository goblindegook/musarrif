import { useRouter } from 'expo-router'
import { VerbBuilder } from '../../../features/browse/VerbBuilder'
import { useSystemLanguage } from '../../../i18n/copy'
import { useDiacriticsPreference } from '../../../storage/user-data-hooks'

export default function BuildRoute() {
  const router = useRouter()
  const language = useSystemLanguage()
  const diacriticsPreference = useDiacriticsPreference()

  return (
    <VerbBuilder
      diacriticsPreference={diacriticsPreference}
      language={language}
      onSelect={(verb) => router.push({ pathname: '/build/verb/[verbId]', params: { verbId: verb.id } })}
    />
  )
}
