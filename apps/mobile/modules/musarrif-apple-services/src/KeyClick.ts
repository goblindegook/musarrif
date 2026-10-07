import { requireNativeModule } from 'expo-modules-core'

interface KeyClickModule {
  play(): void
}

export function playKeyClick(): void {
  requireNativeModule<KeyClickModule>('MusarrifKeyClick').play()
}
