import { fireEvent, render, screen } from '@testing-library/react-native'
import { SearchHeader } from './SearchHeader'

const mockBlur = jest.fn()

jest.mock('@expo/ui/swift-ui', () => {
  const React = require('react')
  const { Pressable, View } = require('react-native')
  return {
    Host: ({ children, ...props }: { children: React.ReactNode }) => React.createElement(View, props, children),
    HStack: ({ children }: { children: React.ReactNode }) => React.createElement(View, null, children),
    Namespace: ({ children }: { children: React.ReactNode }) => React.createElement(View, null, children),
    GlassEffectContainer: ({ children }: { children: React.ReactNode }) => React.createElement(View, null, children),
    Image: (props: { testID?: string }) => React.createElement(View, props),
    TextField: React.forwardRef(
      (props: { testID: string; onTextChange: (value: string) => void }, ref: React.Ref<unknown>) => {
        React.useImperativeHandle(ref, () => ({ clear: jest.fn().mockResolvedValue(undefined), blur: mockBlur }))
        return React.createElement(View, props)
      },
    ),
    Button: ({ children, onPress, testID }: { children: React.ReactNode; onPress: () => void; testID?: string }) =>
      React.createElement(
        Pressable,
        {
          accessibilityRole: 'button',
          accessibilityLabel:
            { 'clear-search-action': 'Clear search', 'close-search-action': 'Close search' }[testID ?? ''] ?? 'Filters',
          onPress,
        },
        children,
      ),
  }
})

test('search control forwards search and filter actions', async () => {
  const onChangeText = jest.fn()
  const onFilter = jest.fn()
  await render(
    <SearchHeader
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

test('hides the filter action while the search field is focused', async () => {
  await render(
    <SearchHeader
      width={400}
      onChangeText={jest.fn()}
      onFilter={jest.fn()}
      placeholder="Search"
      filterLabel="Filters"
    />,
  )

  await fireEvent(screen.getByTestId('verb-search-field'), 'onFocusChange', true)
  expect(screen.queryByRole('button', { name: 'Filters' })).toBeNull()
  await fireEvent(screen.getByTestId('verb-search-field'), 'onFocusChange', false)
  expect(screen.getByRole('button', { name: 'Filters' })).toBeTruthy()
})

test('closes the search by blurring the field, keeping the query', async () => {
  await render(
    <SearchHeader
      width={400}
      closeLabel="Close search"
      onChangeText={jest.fn()}
      onFilter={jest.fn()}
      placeholder="Search"
      filterLabel="Filters"
      query="ktb"
    />,
  )

  await fireEvent(screen.getByTestId('verb-search-field'), 'onFocusChange', true)
  await fireEvent.press(screen.getByRole('button', { name: 'Close search' }))
  expect(mockBlur).toHaveBeenCalledTimes(1)
})

test('shows a clear action for a non-empty query that empties it', async () => {
  const onChangeText = jest.fn()
  await render(
    <SearchHeader
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
