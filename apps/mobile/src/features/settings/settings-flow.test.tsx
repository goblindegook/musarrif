import { act, fireEvent, render, screen } from '@testing-library/react-native'
import { createInMemoryRepository } from '../../storage/in-memory-repository'
import type { UserDataKey, UserDataValue } from '../../storage/schema'
import { UserDataProvider } from '../../storage/UserDataProvider'
import { SettingsScreen } from './SettingsScreen'

const mockFileWrite = jest.fn()
const mockFileCreate = jest.fn()
const mockShareAsync = jest.fn(async (..._args: unknown[]) => undefined)
const mockSharingAvailable = jest.fn(async () => true)
const mockGetDocumentAsync = jest.fn()
const mockUseLocales = jest.fn(() => [{ languageCode: 'en' }])

jest.mock('expo-localization', () => ({ useLocales: () => mockUseLocales() }))
jest.mock('expo-document-picker', () => ({ getDocumentAsync: () => mockGetDocumentAsync() }))
jest.mock('expo-file-system', () => ({
  File: class {
    uri: string

    constructor(parent: string | { uri: string }, name?: string) {
      this.uri = typeof parent === 'string' ? parent : `${parent.uri}/${name}`
    }

    create(options: unknown) {
      mockFileCreate(options)
    }

    write(contents: string) {
      mockFileWrite(contents)
    }
  },
  Paths: { cache: { uri: 'file:///cache' } },
}))
jest.mock('expo-sharing', () => ({
  isAvailableAsync: () => mockSharingAvailable(),
  shareAsync: (...args: unknown[]) => mockShareAsync(...args),
}))

describe('settings', () => {
  test('persists the diacritics preference and exports data as a shareable backup file', async () => {
    const values: Partial<Record<UserDataKey, UserDataValue>> = {
      'setting:language': 'it',
      'setting:theme': 'dark',
      'setting:diacriticsPreference': 'none',
    }
    const repository = createInMemoryRepository(values)
    await render(
      <UserDataProvider repositoryFactory={async () => repository}>
        <SettingsScreen />
      </UserDataProvider>,
    )
    await act(async () => {})
    expect(screen.getByRole('radio', { name: 'None' })).toBeSelected()
    await fireEvent.press(screen.getByRole('radio', { name: 'All' }))
    expect(values['setting:diacriticsPreference']).toBe('all')
    await fireEvent.press(screen.getByRole('button', { name: 'Export data' }))
    expect(mockFileCreate).toHaveBeenCalledWith({ overwrite: true })
    expect(mockFileWrite).toHaveBeenCalledWith(expect.stringContaining('"version": 1'))
    expect(mockShareAsync).toHaveBeenCalledWith(
      expect.stringMatching(/^file:\/\/\/cache\/user-data-.*\.musarrif$/),
      expect.objectContaining({ mimeType: 'application/vnd.musarrif+json', UTI: 'public.json' }),
    )
  })
})
