import { act, fireEvent, render, screen, within } from '@testing-library/react-native'
import ExerciseTab from '../../app/(tabs)/exercise'
import { createInMemoryRepository } from '../../storage/in-memory-repository'
import { UserDataProvider } from '../../storage/UserDataProvider'
import { ExerciseProgressScreen } from './ExerciseProgressScreen'

const mockPush = jest.fn()
const today = new Date()
const older = new Date(today)
older.setDate(today.getDate() - 30)
const dayKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
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
  return { useRouter: () => ({ push: mockPush }), Stack: { Toolbar } }
})
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 59, bottom: 34, left: 0, right: 0 }),
}))
jest.mock('./ExerciseRoute', () => ({ ExerciseRoute: () => null }))
jest.mock('@expo/ui', () => {
  const React = require('react')
  const { Text, View } = require('react-native')
  const FieldGroup = ({ children }: { children: React.ReactNode }) => React.createElement(View, null, children)
  FieldGroup.Section = ({ children, title }: { children: React.ReactNode; title: string }) =>
    React.createElement(View, null, React.createElement(Text, null, title), children)
  return {
    FieldGroup,
  }
})
jest.mock('@expo/ui/swift-ui', () => {
  const React = require('react')
  const { Pressable, Text, View } = require('react-native')
  const Toolbar = ({ children }: { children: React.ReactNode }) => React.createElement(View, null, children)
  Toolbar.Content = Toolbar
  return {
    Host: ({ children }: { children: React.ReactNode }) => React.createElement(View, null, children),
    BottomSheet: ({
      children,
      isPresented,
      testID,
    }: {
      children: React.ReactNode
      isPresented: boolean
      testID: string
    }) => (isPresented ? React.createElement(View, { testID }, children) : null),
    GlassEffectContainer: ({ children }: { children: React.ReactNode }) => children,
    Group: ({ children }: { children: React.ReactNode }) => children,
    HStack: ({ children }: { children: React.ReactNode }) => children,
    RNHostView: ({ children }: { children: React.ReactNode }) => children,
    Button: ({
      children,
      label,
      onPress,
      testID,
    }: {
      children: React.ReactNode
      label?: string
      onPress: () => void
      testID?: string
    }) =>
      React.createElement(
        Pressable,
        { accessibilityRole: 'button', accessibilityLabel: label ?? 'Progress', onPress, testID },
        children,
      ),
    Image: (props: { systemName: string }) => React.createElement(View, props),
    ProgressView: ({ value }: { value: number }) =>
      React.createElement(View, {
        accessible: true,
        accessibilityRole: 'progressbar',
        accessibilityValue: { min: 0, max: 1, now: value },
      }),
    NavigationStack: ({ children }: { children: React.ReactNode }) => React.createElement(View, null, children),
    Toolbar,
    ToolbarItem: ({ children }: { children: React.ReactNode }) => React.createElement(View, null, children),
    Text: ({ children }: { children: React.ReactNode }) => React.createElement(Text, null, children),
  }
})

const repository = createInMemoryRepository({
  [`exercise:daily:${dayKey(today)}`]: { date: dayKey(today), correct: 8, incorrect: 2, passed: 1 },
  [`exercise:daily:${dayKey(older)}`]: { date: dayKey(older), correct: 0, incorrect: 10, passed: 0 },
})

test('the exercise title bar opens a dedicated Progress screen', async () => {
  await render(<ExerciseTab />)

  await fireEvent.press(screen.getByRole('button', { name: 'Progress' }))
  expect(mockPush).toHaveBeenCalledWith('/exercise/progress')
})

test('Progress shows accuracy, the streak goal, and expandable mastery items', async () => {
  await render(
    <UserDataProvider repositoryFactory={async () => repository}>
      <ExerciseProgressScreen />
    </UserDataProvider>,
  )
  await act(async () => {})

  expect(screen.getByText('Accuracy')).toBeTruthy()
  expect(screen.getByText('80%')).toBeTruthy()
  expect(screen.getByText('All time: 40%')).toBeTruthy()
  expect(screen.getByText('Streak')).toBeTruthy()
  expect(screen.getByText('Answer 2 correctly to extend your streak.')).toBeTruthy()
  expect(screen.getByText('Mastery')).toBeTruthy()
  await fireEvent.press(screen.getByRole('button', { name: 'Root types' }))
  expect(screen.getByText('Sound')).toBeTruthy()
  expect(screen.getAllByText('Locked').length).toBeGreaterThan(0)
  expect(
    within(screen.getByTestId('mastery-rootTypes-sound-progress')).getByRole('progressbar'),
  ).toHaveAccessibilityValue({ now: 0 })
})

test('Progress keeps only one mastery category open at a time', async () => {
  await render(
    <UserDataProvider repositoryFactory={async () => repository}>
      <ExerciseProgressScreen />
    </UserDataProvider>,
  )
  await act(async () => {})

  await fireEvent.press(screen.getByRole('button', { name: 'Root types' }))
  expect(screen.getByText('Sound')).toBeTruthy()
  await fireEvent.press(screen.getByRole('button', { name: 'Forms' }))
  expect(screen.queryByText('Sound')).toBeNull()
  expect(screen.getByText('Form I')).toBeTruthy()
  await fireEvent.press(screen.getByRole('button', { name: 'Forms' }))
  expect(screen.queryByText('Form I')).toBeNull()
})

test('Progress opens learning insights in a bottom sheet', async () => {
  await render(
    <UserDataProvider repositoryFactory={async () => repository}>
      <ExerciseProgressScreen />
    </UserDataProvider>,
  )
  await act(async () => {})

  await fireEvent.press(screen.getByTestId('see-insights'))
  expect(screen.getByTestId('exercise-learning-insights-sheet')).toBeTruthy()
})
