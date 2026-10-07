import { fireEvent, render, screen } from '@testing-library/react-native'
import { NativeSearchHeader } from './NativeSearchHeader'

jest.mock('@expo/ui/swift-ui', () => {
  const React = require('react')
  const { Pressable, View } = require('react-native')
  return {
    Host: ({ children, ...props }: { children: React.ReactNode }) => React.createElement(View, props, children),
    HStack: ({ children }: { children: React.ReactNode }) => React.createElement(View, null, children),
    Image: (props: { testID?: string }) => React.createElement(View, props),
    TextField: React.forwardRef(
      (props: { testID: string; onTextChange: (value: string) => void }, ref: React.Ref<unknown>) => {
        React.useImperativeHandle(ref, () => ({ clear: jest.fn().mockResolvedValue(undefined) }))
        return React.createElement(View, props)
      },
    ),
    Button: ({ children, onPress, testID }: { children: React.ReactNode; onPress: () => void; testID?: string }) =>
      React.createElement(
        Pressable,
        {
          accessibilityRole: 'button',
          accessibilityLabel: testID === 'clear-search-action' ? 'Clear search' : 'Filters',
          onPress,
        },
        children,
      ),
  }
})

test('native search control forwards search and filter actions', async () => {
  const onChangeText = jest.fn()
  const onFilter = jest.fn()
  await render(
    <NativeSearchHeader
      width={400}
      onChangeText={onChangeText}
      onFilter={onFilter}
      placeholder="Search"
      filterLabel="Filters"
    />,
  )

  await fireEvent(screen.getByTestId('verb-search-field'), 'onTextChange', 'ktb')
  expect(onChangeText).toHaveBeenCalledWith('ktb')
  await fireEvent.press(screen.getByRole('button', { name: 'Filters' }))
  expect(onFilter).toHaveBeenCalledTimes(1)
})

test('shows a clear action for a non-empty query that empties it', async () => {
  const onChangeText = jest.fn()
  await render(
    <NativeSearchHeader
      width={400}
      clearLabel="Clear search"
      onChangeText={onChangeText}
      onFilter={jest.fn()}
      placeholder="Search"
      filterLabel="Filters"
      query="ktb"
    />,
  )

  await fireEvent.press(screen.getByRole('button', { name: 'Clear search' }))
  expect(onChangeText).toHaveBeenCalledWith('')
})
