import { requireNativeModule } from 'expo-modules-core'

type BannerKind = 'success' | 'warning' | 'streak'

interface NotificationBannerModule {
  show(kind: BannerKind, message: string, color: string): Promise<void>
}

export function showBanner({ kind, message, color }: { kind: BannerKind; message: string; color: string }): void {
  void requireNativeModule<NotificationBannerModule>('MusarrifNotificationBanner')
    .show(kind, message, color)
    .catch(() => {})
}
