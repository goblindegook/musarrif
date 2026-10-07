import '../polyfills'
import { Stack } from 'expo-router'
import { useSystemSettingsSync } from '../storage/system-settings-sync'
import { UserDataProvider } from '../storage/UserDataProvider'
import { CloudSyncLifecycleProvider } from '../sync/CloudSyncLifecycle'
import { useStackScreenOptions } from '../theme/stack-options'

function ThemedStack() {
  useSystemSettingsSync()
  return (
    <Stack screenOptions={useStackScreenOptions()}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <UserDataProvider>
      <CloudSyncLifecycleProvider>
        <ThemedStack />
      </CloudSyncLifecycleProvider>
    </UserDataProvider>
  )
}
