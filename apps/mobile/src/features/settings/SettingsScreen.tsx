import { FieldGroup } from '@expo/ui'
import { Button, Host, Picker, Text as SwiftText } from '@expo/ui/swift-ui'
import {
  background,
  disabled,
  foregroundStyle,
  listRowBackground,
  pickerStyle,
  scrollContentBackground,
  tag,
  tint,
} from '@expo/ui/swift-ui/modifiers'
import * as DocumentPicker from 'expo-document-picker'
import { File, Paths } from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { useState } from 'react'
import { Alert, View } from 'react-native'
import { FormSectionHeading } from '../../components/Heading'
import { decodeUserDataExport, encodeUserDataExport } from '../../data/UserDataCodec'
import { getCopy, useSystemLanguage } from '../../i18n/copy'
import { getLocaleDirection } from '../../i18n/direction'
import { useUserData } from '../../storage/UserDataProvider'
import { useDiacriticsPreference } from '../../storage/user-data-hooks'
import { useCloudSyncLifecycle } from '../../sync/CloudSyncLifecycle'
import { useThemeTokens } from '../../theme/tokens'
import { CloudSyncSettings } from './CloudSyncSettings'
import { VoiceSettings } from './VoiceSettings'

function SettingsContent() {
  const { ready, store, put, replaceExportedData } = useUserData()
  const cloudSync = useCloudSyncLifecycle()
  const [fileBusy, setFileBusy] = useState(false)
  const language = useSystemLanguage()
  const theme = useThemeTokens()
  const { t } = getCopy(language)
  const diacriticsPreference = useDiacriticsPreference()

  async function exportData() {
    setFileBusy(true)
    try {
      if (!(await Sharing.isAvailableAsync())) throw new Error('File sharing is unavailable.')
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const backup = new File(Paths.cache, `user-data-${timestamp}.musarrif`)
      backup.create({ overwrite: true })
      backup.write(encodeUserDataExport(store.getValues()))
      await Sharing.shareAsync(backup.uri, {
        dialogTitle: t('settings.data.export'),
        mimeType: 'application/vnd.musarrif+json',
        UTI: 'public.json',
      })
    } catch {
      Alert.alert(t('settings.data.export'), t('settings.data.exportError'))
    } finally {
      setFileBusy(false)
    }
  }

  async function importData() {
    setFileBusy(true)
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*', copyToCacheDirectory: true })
      if (result.canceled) return
      const backup = result.assets[0]
      if (!backup || (!backup.name.endsWith('.musarrif') && !backup.name.endsWith('.json'))) {
        Alert.alert(t('settings.data.import'), t('settings.data.importInvalid'))
        return
      }
      const snapshot = decodeUserDataExport(await new File(backup.uri).text())
      if (!snapshot) {
        Alert.alert(t('settings.data.import'), t('settings.data.importInvalid'))
        return
      }
      Alert.alert(t('settings.importWarning.title'), t('settings.importWarning.message'), [
        { text: t('settings.importWarning.cancel'), style: 'cancel' },
        {
          text: t('settings.importWarning.confirm'),
          style: 'destructive',
          onPress: () => {
            void replaceExportedData(snapshot)
              .then(() => Alert.alert(t('settings.data.import'), t('settings.data.imported')))
              .catch(() => Alert.alert(t('settings.data.import'), t('settings.data.importError')))
          },
        },
      ])
    } catch {
      Alert.alert(t('settings.data.import'), t('settings.data.importError'))
    } finally {
      setFileBusy(false)
    }
  }

  if (!ready) return <View style={{ flex: 1 }} />

  return (
    <View
      style={{ backgroundColor: theme.background, direction: getLocaleDirection(language), flex: 1 }}
      testID="settings-content"
    >
      <Host seedColor={theme.accent} style={{ flex: 1 }}>
        <FieldGroup modifiers={[tint(theme.accent), scrollContentBackground('hidden'), background(theme.background)]}>
          <FieldGroup.Section modifiers={[listRowBackground(theme.surface)]}>
            <Picker
              label={t('diacritics.title')}
              modifiers={[pickerStyle('menu')]}
              onSelectionChange={(selection) => {
                if (selection === 'all' || selection === 'some' || selection === 'none') {
                  void put('setting:diacriticsPreference', selection)
                }
              }}
              selection={diacriticsPreference}
            >
              <SwiftText modifiers={[tag('all')]}>{t('diacritics.all')}</SwiftText>
              <SwiftText modifiers={[tag('some')]}>{t('diacritics.some')}</SwiftText>
              <SwiftText modifiers={[tag('none')]}>{t('diacritics.none')}</SwiftText>
            </Picker>
          </FieldGroup.Section>
          <VoiceSettings language={language} />
          <FieldGroup.Section modifiers={[listRowBackground(theme.surface)]}>
            <FieldGroup.SectionHeader>
              <FormSectionHeading>{t('settings.data.title')}</FormSectionHeading>
            </FieldGroup.SectionHeader>
            <Button
              label={t('settings.data.export')}
              modifiers={[foregroundStyle(theme.ink), disabled(fileBusy)]}
              onPress={() => void exportData()}
              systemImage="square.and.arrow.up"
            />
            <Button
              label={t('settings.data.import')}
              modifiers={[foregroundStyle(theme.ink), disabled(fileBusy)]}
              onPress={() => void importData()}
              systemImage="square.and.arrow.down"
            />
          </FieldGroup.Section>
          {cloudSync ? (
            <CloudSyncSettings
              language={language}
              status={cloudSync.status}
              onConfirm={cloudSync.confirmAccountSwitch}
            />
          ) : null}
        </FieldGroup>
      </Host>
    </View>
  )
}

export function SettingsScreen() {
  return <SettingsContent />
}
