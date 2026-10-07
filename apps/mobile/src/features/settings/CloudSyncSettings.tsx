import { FieldGroup } from '@expo/ui'
import { Button, Label, Text } from '@expo/ui/swift-ui'
import { foregroundStyle, listRowBackground, tint } from '@expo/ui/swift-ui/modifiers'
import { useState } from 'react'
import { NativeHeading } from '../../components/Heading'
import type { Language } from '../../i18n/copy'
import { getCopy } from '../../i18n/copy'
import type { CloudSyncStatus } from '../../sync/CloudSyncCoordinator'
import { useThemeTokens } from '../../theme/tokens'

export function CloudSyncSettings({
  language,
  status,
  onConfirm,
}: {
  language: Language
  status: CloudSyncStatus
  onConfirm: () => Promise<unknown>
}) {
  const theme = useThemeTokens()
  const { t } = getCopy(language)
  const [confirmFailed, setConfirmFailed] = useState(false)
  const statusCopy =
    status === 'needsAttention'
      ? t('settings.cloud.needsAttention')
      : status === 'syncing'
        ? t('settings.cloud.syncing')
        : status === 'synced'
          ? t('settings.cloud.synced')
          : t('settings.cloud.local')

  return (
    <FieldGroup.Section modifiers={[listRowBackground(theme.surface)]}>
      <FieldGroup.SectionHeader>
        <NativeHeading>{t('settings.cloud.title')}</NativeHeading>
      </FieldGroup.SectionHeader>
      <Label
        modifiers={[foregroundStyle(theme.inkSecondary)]}
        systemImage={status === 'needsAttention' ? 'exclamationmark.icloud' : 'icloud'}
        title={statusCopy}
      />
      {status === 'needsAttention' ? (
        <Button
          label={t('settings.cloud.confirm')}
          modifiers={[tint(theme.accent)]}
          onPress={() => {
            setConfirmFailed(false)
            void onConfirm().catch(() => setConfirmFailed(true))
          }}
          testID="cloud-confirm"
        />
      ) : null}
      {confirmFailed ? <Text>{t('settings.cloud.confirmFailure')}</Text> : null}
    </FieldGroup.Section>
  )
}
