import { act, fireEvent, render, screen } from '@testing-library/react-native'
import BuildRoute from '../app/(tabs)/build'
import { createInMemoryRepository } from '../storage/in-memory-repository'
import { UserDataProvider } from '../storage/UserDataProvider'

const mockPush = jest.fn()
jest.mock('expo-router', () => ({ useRouter: () => ({ push: mockPush }) }))
jest.mock('../features/browse/VerbBuilder', () => ({
  VerbBuilder: ({ onSelect }: { onSelect: (verb: { id: string }) => void }) => {
    const React = require('react')
    const { Pressable, Text } = require('react-native')
    return React.createElement(
      Pressable,
      { accessibilityRole: 'button', accessibilityLabel: 'Open built verb', onPress: () => onSelect({ id: 'ktb-1' }) },
      React.createElement(Text, null, 'Open built verb'),
    )
  },
}))

test('opens a built verb inside the Build tab stack', async () => {
  const repository = createInMemoryRepository()
  render(
    <UserDataProvider repositoryFactory={async () => repository}>
      <BuildRoute />
    </UserDataProvider>,
  )
  await act(async () => {})
  fireEvent.press(screen.getByRole('button', { name: 'Open built verb' }))

  expect(mockPush).toHaveBeenCalledWith({
    pathname: '/build/verb/[verbId]',
    params: { verbId: 'ktb-1' },
  })
})
