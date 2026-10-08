import { FieldGroup } from '@expo/ui'
import { Picker, Text } from '@expo/ui/swift-ui'
import { labelsHidden, listRowBackground, pickerStyle, tag } from '@expo/ui/swift-ui/modifiers'
import { useEffect, useState } from 'react'
import { FormSectionHeading } from '../../components/Heading'
import type { Language } from '../../i18n/copy'
import { getCopy } from '../../i18n/copy'
import {
  type ArabicSpeechOutput,
  type ArabicSystemVoice,
  arabicSpeechOutput,
} from '../../speech-synthesis/arabic-speech'
import { useUserData } from '../../storage/UserDataProvider'
import { useSpeechVoice } from '../../storage/user-data-hooks'
import { useThemeTokens } from '../../theme/tokens'

const VOICE_KEY = 'local:arabicTtsVoice'
const SAMPLE_TEXT = 'مَرْحَبًا بِكَ'

export function VoiceSettings({
  language,
  speechOutput = arabicSpeechOutput,
}: {
  language: Language
  speechOutput?: ArabicSpeechOutput
}) {
  const { put } = useUserData()
  const savedVoice = useSpeechVoice()
  const theme = useThemeTokens()
  const { t } = getCopy(language)
  const [voices, setVoices] = useState<ArabicSystemVoice[]>([])
  const [failed, setFailed] = useState(false)
  const selectedVoice = voices.some((voice) => voice.identifier === savedVoice) ? savedVoice : voices[0]?.identifier

  useEffect(() => {
    let active = true
    void speechOutput
      .getArabicVoices()
      .then((available) => {
        if (active) setVoices(available)
      })
      .catch(() => {
        if (active) setFailed(true)
      })
    return () => {
      active = false
      void speechOutput.stop()
    }
  }, [speechOutput])

  const selectVoice = (identifier: string) => {
    void put(VOICE_KEY, identifier)
    setFailed(false)
    void speechOutput
      .stop()
      .then(() => speechOutput.speakArabic(SAMPLE_TEXT, { voiceIdentifier: identifier, rate: 0.7 }))
      .catch(() => setFailed(true))
  }

  if (voices.length < 2) return null

  return (
    <FieldGroup.Section modifiers={[listRowBackground(theme.surface)]}>
      <FieldGroup.SectionHeader>
        <FormSectionHeading>{t('settings.voice.title')}</FormSectionHeading>
      </FieldGroup.SectionHeader>
      <Picker
        label={t('settings.voice.arabic')}
        modifiers={[pickerStyle('inline'), labelsHidden()]}
        onSelectionChange={selectVoice}
        selection={selectedVoice}
      >
        {voices.map((voice) => (
          <Text key={voice.identifier} modifiers={[tag(voice.identifier)]}>
            {voice.name}
          </Text>
        ))}
      </Picker>
      {failed ? <Text>{t('settings.voice.error')}</Text> : null}
    </FieldGroup.Section>
  )
}
