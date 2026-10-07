import { act, fireEvent, render, screen } from '@testing-library/react-native'
import { Share } from 'react-native'
import { createInMemoryRepository } from '../../storage/in-memory-repository'
import type { UserDataKey, UserDataValue } from '../../storage/schema'
import { UserDataProvider } from '../../storage/UserDataProvider'
import { VerbScreen } from './VerbScreen'

const mockPush = jest.fn()
const mockReplace = jest.fn()
let mockParams: { verbId: string } = { verbId: 'ktb-1' }
let mockStackDepth = 2
let mockHeaderOptions: {
  title?: string
  headerBackTitle?: string
  headerTitle?: () => React.ReactNode
  headerTitleStyle?: { color?: string; fontSize?: number }
}
jest.mock('@expo/ui/swift-ui', () => {
  const React = require('react')
  const { View } = require('react-native')
  return {
    ...jest.requireActual('@expo/ui/swift-ui'),
    Host: ({ children }: { children: React.ReactNode }) => React.createElement(View, null, children),
  }
})
jest.mock('expo-router', () => {
  const React = require('react')
  const { Pressable, View } = require('react-native')
  const Toolbar = ({ children }: { children: React.ReactNode }) => React.createElement(View, null, children)
  Toolbar.Button = ({
    accessibilityLabel,
    icon,
    onPress,
  }: {
    accessibilityLabel: string
    icon: string
    onPress: () => void
  }) => React.createElement(Pressable, { accessibilityLabel, accessibilityRole: 'button', icon, onPress })
  return {
    Stack: {
      Toolbar,
      Screen: ({
        options,
      }: {
        options: {
          headerTitle?: () => React.ReactNode
          title?: string
          headerBackTitle?: string
        }
      }) => {
        const React = require('react')
        const { View, Text } = require('react-native')
        mockHeaderOptions = options
        return React.createElement(
          View,
          null,
          React.createElement(Text, null, options.title),
          React.createElement(Text, null, options.headerBackTitle),
          options.headerTitle?.(),
        )
      },
    },
    useLocalSearchParams: () => mockParams,
    useRouter: () => ({ push: mockPush, replace: mockReplace, canGoBack: () => mockStackDepth > 1 }),
  }
})

describe('verb detail route', () => {
  beforeEach(() => {
    mockStackDepth = 2
    mockReplace.mockClear()
    mockParams = { verbId: 'ktb-1' }
  })

  test('offers a way to Search only when the verb was opened without history', async () => {
    const repository = createInMemoryRepository()
    const { unmount } = render(
      <UserDataProvider repositoryFactory={async () => repository}>
        <VerbScreen source="search" />
      </UserDataProvider>,
    )
    await act(async () => {})
    expect(screen.queryByRole('button', { name: 'Search' })).toBeNull()
    unmount()

    mockStackDepth = 1
    render(
      <UserDataProvider repositoryFactory={async () => repository}>
        <VerbScreen source="search" />
      </UserDataProvider>,
    )
    await act(async () => {})
    fireEvent.press(screen.getByRole('button', { name: 'Search' }))
    expect(mockReplace).toHaveBeenCalledWith('/search')
  })

  test('shows generated as a subtitle of the title for generated verbs only', async () => {
    const repository = createInMemoryRepository()
    const { unmount } = render(
      <UserDataProvider repositoryFactory={async () => repository}>
        <VerbScreen source="search" />
      </UserDataProvider>,
    )
    await act(async () => {})
    expect(screen.queryByText('generated')).toBeNull()
    unmount()

    mockParams = { verbId: 'Dfz-2' }
    render(
      <UserDataProvider repositoryFactory={async () => repository}>
        <VerbScreen source="search" />
      </UserDataProvider>,
    )
    await act(async () => {})
    expect(screen.getByText('generated')).toBeTruthy()
  })

  test('sends a verb opened from Build back to Build when opened without history', async () => {
    mockStackDepth = 1
    mockParams = { verbId: 'Dfz-2' }
    const repository = createInMemoryRepository()
    render(
      <UserDataProvider repositoryFactory={async () => repository}>
        <VerbScreen source="build" />
      </UserDataProvider>,
    )
    await act(async () => {})
    fireEvent.press(screen.getByRole('button', { name: 'Build' }))
    expect(mockReplace).toHaveBeenCalledWith('/build')
  })

  test('shares the canonical public verb URL', async () => {
    const share = jest.spyOn(Share, 'share').mockResolvedValue({ action: Share.sharedAction })
    const repository = createInMemoryRepository()
    render(
      <UserDataProvider repositoryFactory={async () => repository}>
        <VerbScreen source="search" />
      </UserDataProvider>,
    )
    await act(async () => {})
    await act(async () => fireEvent.press(screen.getByRole('button', { name: 'Share' })))

    expect(share).toHaveBeenCalledWith({ url: 'https://musarrif.com/verbs/ktb-1' })
    share.mockRestore()
  })

  test('persists favorite changes through the local repository', async () => {
    const values: Partial<Record<UserDataKey, UserDataValue>> = {}
    const repository = createInMemoryRepository(values)
    render(
      <UserDataProvider repositoryFactory={async () => repository}>
        <VerbScreen source="search" />
      </UserDataProvider>,
    )
    await act(async () => {})
    await act(async () => {})

    expect(screen.getAllByText('كَتَبَ').length).toBeGreaterThan(0)
    expect(mockHeaderOptions.title).toBe('كَتَبَ')
    fireEvent.press(screen.getByRole('button', { name: 'Add to favorites' }))
    await act(async () => {})
    expect(values['favorite:ktb-1']).toBe(true)
  })

  test('applies the saved diacritics setting to the verb title', async () => {
    const repository = createInMemoryRepository({ 'setting:diacriticsPreference': 'none' })
    render(
      <UserDataProvider repositoryFactory={async () => repository}>
        <VerbScreen source="search" />
      </UserDataProvider>,
    )
    await act(async () => {})

    expect(mockHeaderOptions.title).toBe('كتب')
  })
})
