import { requireNativeModule } from 'expo'

interface KeyClickModule {
  play(): void
}

export function playKeyClick(): void {
  requireNativeModule<KeyClickModule>('MusarrifKeyClick').play()
}
