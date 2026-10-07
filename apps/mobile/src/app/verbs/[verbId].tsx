import { Redirect, useLocalSearchParams } from 'expo-router'

export default function PublicVerbRoute() {
  const params = useLocalSearchParams<{ verbId: string }>()
  const verbId = Array.isArray(params.verbId) ? params.verbId[0] : params.verbId

  if (!verbId) return <Redirect href="/search" />
  return <Redirect href={{ pathname: '/search/verb/[verbId]', params: { verbId } }} />
}
