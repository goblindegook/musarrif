import { FieldGroup } from '@expo/ui'
import { Text } from '@expo/ui/swift-ui'
import { act, render, screen } from '@testing-library/react-native'
import { CloudSyncSettings } from './CloudSyncSettings'

const shownText = () => screen.UNSAFE_getAllByType(Text).map((text) => text.props.children)

describe('CloudSyncSettings', () => {
  test('shows an account confirmation only when the iCloud account changed', async () => {
    const onConfirm = jest.fn(async () => undefined)
    await render(
      <FieldGroup>
        <CloudSyncSettings language="en" status="needsAttention" onConfirm={onConfirm} />
      </FieldGroup>,
    )

    expect(
      screen.UNSAFE_getByProps({
        title: 'Your iCloud account changed. Confirm before syncing this device’s data with the new account.',
      }),
    ).toBeTruthy()
    await act(async () => {
      screen.UNSAFE_getByProps({ label: 'Use this iCloud account' }).props.onPress()
    })
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  test('shows the current sync state and does not offer account confirmation otherwise', async () => {
    await render(
      <FieldGroup>
        <CloudSyncSettings language="en" status="synced" onConfirm={jest.fn()} />
      </FieldGroup>,
    )

    expect(screen.UNSAFE_getByProps({ title: 'Synced with iCloud' })).toBeTruthy()
    expect(shownText()).toContain('iCloud Sync')
    expect(screen.UNSAFE_queryByProps({ label: 'Use this iCloud account' })).toBeNull()
  })
})
