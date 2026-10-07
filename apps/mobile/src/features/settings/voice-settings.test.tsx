import { FieldGroup } from '@expo/ui'
import { act, fireEvent, render, screen } from '@testing-library/react-native'
import type { ArabicSpeechOutput } from '../../speech-synthesis/arabic-speech'
import { createInMemoryRepository } from '../../storage/in-memory-repository'
import type { UserDataKey, UserDataValue } from '../../storage/schema'
import { UserDataProvider } from '../../storage/UserDataProvider'
import { VoiceSettings } from './VoiceSettings'

describe('voice settings', () => {
  test('persists the selected Arabic voice', async () => {
    const values: Partial<Record<UserDataKey, UserDataValue>> = {}
    const speechOutput: ArabicSpeechOutput = {
      getArabicVoices: async () => [
        { identifier: 'ar-sa', name: 'Arabic Saudi', language: 'ar-SA' },
        { identifier: 'ar-eg', name: 'Arabic Egypt', language: 'ar-EG' },
      ],
      speakArabic: async () => undefined,
      stop: async () => undefined,
    }
    await render(
      <UserDataProvider repositoryFactory={async () => createInMemoryRepository(values)}>
        <FieldGroup>
          <VoiceSettings language="en" speechOutput={speechOutput} />
        </FieldGroup>
      </UserDataProvider>,
    )
    await act(async () => {})

    await fireEvent.press(screen.getByRole('radio', { name: 'Arabic Egypt' }))

    expect(values['local:arabicTtsVoice']).toBe('ar-eg')
  })

  test('plays the Arabic sample immediately with the tapped voice', async () => {
    const values: Partial<Record<UserDataKey, UserDataValue>> = {}
    const speechOutput: ArabicSpeechOutput = {
      getArabicVoices: async () => [
        { identifier: 'ar-sa', name: 'Arabic Saudi', language: 'ar-SA' },
        { identifier: 'ar-eg', name: 'Arabic Egypt', language: 'ar-EG' },
      ],
      speakArabic: jest.fn(async () => undefined),
      stop: jest.fn(async () => undefined),
    }
    await render(
      <UserDataProvider repositoryFactory={async () => createInMemoryRepository(values)}>
        <FieldGroup>
          <VoiceSettings language="en" speechOutput={speechOutput} />
        </FieldGroup>
      </UserDataProvider>,
    )
    await act(async () => {})

    await fireEvent.press(screen.getByRole('radio', { name: 'Arabic Egypt' }))

    expect(speechOutput.speakArabic).toHaveBeenCalledWith('مَرْحَبًا بِكَ', { voiceIdentifier: 'ar-eg', rate: 0.7 })
    expect(values['local:arabicTtsVoice']).toBe('ar-eg')
  })

  test.each([
    ['no voices', []],
    ['a single voice', [{ identifier: 'ar-sa', name: 'Arabic Saudi', language: 'ar-SA' }]],
  ])('renders nothing with %s', async (_name, voices) => {
    const speechOutput: ArabicSpeechOutput = {
      getArabicVoices: async () => voices,
      speakArabic: async () => undefined,
      stop: async () => undefined,
    }
    await render(
      <UserDataProvider repositoryFactory={async () => createInMemoryRepository({})}>
        <FieldGroup>
          <VoiceSettings language="en" speechOutput={speechOutput} />
        </FieldGroup>
      </UserDataProvider>,
    )
    await act(async () => {})

    expect(screen.queryByRole('radio')).toBeNull()
  })
})
