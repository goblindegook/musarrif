import { NativeTabs } from 'expo-router/unstable-native-tabs'
import { getCopy, useSystemLanguage } from '../../i18n/copy'
import { useThemeTokens } from '../../theme/tokens'

export default function TabLayout() {
  const theme = useThemeTokens()
  const { t } = getCopy(useSystemLanguage())

  return (
    <NativeTabs tintColor={theme.accent}>
      <NativeTabs.Trigger name="search">
        <NativeTabs.Trigger.Icon sf="magnifyingglass" />
        <NativeTabs.Trigger.Label>{t('tabs.search')}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="build">
        <NativeTabs.Trigger.Icon sf="hammer" />
        <NativeTabs.Trigger.Label>{t('tabs.build')}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="exercise">
        <NativeTabs.Trigger.Icon sf="checkmark.circle" />
        <NativeTabs.Trigger.Label>{t('tabs.exercises')}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Icon sf="gearshape" />
        <NativeTabs.Trigger.Label>{t('settings.title')}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
