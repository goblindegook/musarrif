import { act, render } from '@testing-library/react-native'
import { DeviceEventEmitter, Settings } from 'react-native'
import { createInMemoryRepository } from './in-memory-repository'
import type { UserDataKey, UserDataValue } from './schema'
import { useSystemSettingsSync } from './system-settings-sync'
import { UserDataProvider } from './UserDataProvider'

jest.mock('react-native/Libraries/Settings/NativeSettingsManager', () => ({
  __esModule: true,
  default: { getConstants: () => ({ settings: {} }), setValues: () => {} },
}))

function Sync() {
  useSystemSettingsSync()
  return null
}

async function renderWith(values: Partial<Record<UserDataKey, UserDataValue>>) {
  await render(
    <UserDataProvider repositoryFactory={async () => createInMemoryRepository(values)}>
      <Sync />
    </UserDataProvider>,
  )
  await act(async () => {})
}

describe('system settings sync', () => {
  test('publishes the saved diacritics preference to the system settings', async () => {
    Settings.set({ diacriticsPreference: undefined })
    const values: Partial<Record<UserDataKey, UserDataValue>> = { 'setting:diacriticsPreference': 'none' }
    await renderWith(values)
    expect(Settings.get('diacriticsPreference')).toBe('none')
  })

  test('adopts a different preference chosen in the system settings', async () => {
    Settings.set({ diacriticsPreference: 'all' })
    const values: Partial<Record<UserDataKey, UserDataValue>> = { 'setting:diacriticsPreference': 'none' }
    await renderWith(values)
    expect(values['setting:diacriticsPreference']).toBe('all')
  })

  test('adopts a preference changed in the system settings while running', async () => {
    Settings.set({ diacriticsPreference: 'some' })
    const values: Partial<Record<UserDataKey, UserDataValue>> = { 'setting:diacriticsPreference': 'some' }
    await renderWith(values)
    await act(async () => {
      DeviceEventEmitter.emit('settingsUpdated', { diacriticsPreference: 'none' })
    })
    expect(values['setting:diacriticsPreference']).toBe('none')
  })

  test('ignores a system value that is not a diacritics preference', async () => {
    Settings.set({ diacriticsPreference: 'bogus' })
    const values: Partial<Record<UserDataKey, UserDataValue>> = { 'setting:diacriticsPreference': 'none' }
    await renderWith(values)
    expect(values['setting:diacriticsPreference']).toBe('none')
    expect(Settings.get('diacriticsPreference')).toBe('none')
  })
})
