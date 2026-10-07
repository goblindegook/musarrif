import { Stack } from 'expo-router'
import { useStackScreenOptions } from '../../../theme/stack-options'

export const unstable_settings = { initialRouteName: 'index' }

export default function SearchStack() {
  const screenOptions = useStackScreenOptions()

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen
        name="index"
        options={{
          title: '',
          headerShown: false,
        }}
      />
    </Stack>
  )
}
