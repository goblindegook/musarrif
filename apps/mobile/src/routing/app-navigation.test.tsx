import { act, fireEvent, render, screen } from '@testing-library/react-native'
import SearchRoute from '../app/(tabs)/search'
import { createInMemoryRepository } from '../storage/in-memory-repository'
import { UserDataProvider } from '../storage/UserDataProvider'

const mockRouterPush = jest.fn()
jest.mock('expo-router', () => ({ useRouter: () => ({ push: mockRouterPush }) }))
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 59, bottom: 34, left: 0, right: 0 }),
}))
jest.mock('../features/browse/SearchHeader', () => {
  const React = require('react')
  const { Pressable, TextInput, View } = require('react-native')
  return {
    SearchHeader: ({
      clearLabel,
      filterLabel,
      filtersActive,
      onChangeText,
      onFilter,
      placeholder,
      query,
    }: {
      clearLabel: string
      filterLabel: string
      filtersActive: boolean
      onChangeText: (text: string) => void
      onFilter: () => void
      placeholder: string
      query: string
    }) =>
      React.createElement(
        View,
        null,
        React.createElement(TextInput, { accessibilityLabel: placeholder, onChangeText, value: query }),
        React.createElement(Pressable, {
          accessibilityLabel: filterLabel,
          accessibilityRole: 'button',
          onPress: onFilter,
          selected: filtersActive,
        }),
        query
          ? React.createElement(Pressable, {
              accessibilityLabel: clearLabel,
              accessibilityRole: 'button',
              onPress: () => onChangeText(''),
            })
          : null,
      ),
  }
})

const repository = createInMemoryRepository()

describe('Search route', () => {
  beforeEach(() => mockRouterPush.mockClear())

  async function renderRoute() {
    await render(
      <UserDataProvider repositoryFactory={async () => repository}>
        <SearchRoute />
      </UserDataProvider>,
    )
    await act(async () => {})
  }

  test('opens the selected canonical verb route from search', async () => {
    await renderRoute()

    await fireEvent.changeText(screen.getByLabelText('Search'), 'kataba')
    await fireEvent.press(screen.getByRole('button', { name: /كَتَبَ.*to write/u }))

    expect(mockRouterPush).toHaveBeenCalledWith({
      pathname: '/search/verb/[verbId]',
      params: { verbId: 'ktb-1' },
    })
  })

  test('clears filtered results through the filled search control', async () => {
    await renderRoute()

    await fireEvent.changeText(screen.getByLabelText('Search'), 'zzzz-no-verb')
    expect(screen.getByText('No verbs found')).toBeTruthy()
    await fireEvent.press(screen.getByRole('button', { name: 'Clear search' }))
    expect(screen.queryByText('No verbs found')).toBeNull()
  })

  test('applies draft filters only on Apply and clears them', async () => {
    await renderRoute()

    await fireEvent.press(screen.getByRole('button', { name: 'Filters' }))
    expect(screen.getByRole('switch', { name: 'Sound' })).toBeTruthy()
    await fireEvent.press(screen.getByRole('radio', { name: 'Favorites' }))
    expect(screen.queryByText('No verbs found')).toBeNull()
    await fireEvent.press(screen.getByRole('button', { name: 'Apply' }))
    expect(screen.getByText('No verbs found')).toBeTruthy()
    await fireEvent.press(screen.getByRole('button', { name: 'Filters' }))
    await fireEvent.press(screen.getByRole('button', { name: 'Clear All' }))
    expect(screen.queryByText('No verbs found')).toBeNull()
  })
})
