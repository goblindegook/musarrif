import { render, screen } from '@testing-library/react-native'
import PublicVerbRoute from '../app/verbs/[verbId]'

jest.mock('expo-router', () => ({
  Redirect: ({ href }: { href: unknown }) => {
    const React = require('react')
    const { Text } = require('react-native')
    return React.createElement(Text, { accessibilityLabel: 'Redirect destination' }, JSON.stringify(href))
  },
  useLocalSearchParams: () => ({ verbId: 'ktb-1' }),
  useRouter: () => ({ push: jest.fn() }),
}))
jest.mock('../storage/UserDataProvider', () => ({
  useUserData: () => ({ ready: false, values: {} }),
}))

test('public musarrif.com/verbs links open inside the Search tab', () => {
  render(<PublicVerbRoute />)

  expect(screen.getByLabelText('Redirect destination').props.children).toContain('/search/verb/[verbId]')
})
