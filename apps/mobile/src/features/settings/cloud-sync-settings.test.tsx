import { FieldGroup } from '@expo/ui'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { CloudSyncSettings } from './CloudSyncSettings'

describe('CloudSyncSettings', () => {
  test('shows an account confirmation only when the iCloud account changed', async () => {
    const onConfirm = jest.fn(async () => undefined)
    await render(
      <FieldGroup>
        <CloudSyncSettings language="en" status="needsAttention" onConfirm={onConfirm} />
      </FieldGroup>,
    )

    expect(
      screen.getByText('Your iCloud account changed. Confirm before syncing this device’s data with the new account.'),
    ).toBeTruthy()
    await fireEvent.press(screen.getByRole('button', { name: 'Use this iCloud account' }))
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  test('shows the current sync state and does not offer account confirmation otherwise', async () => {
    await render(
      <FieldGroup>
        <CloudSyncSettings language="en" status="synced" onConfirm={jest.fn()} />
      </FieldGroup>,
    )

    expect(screen.getByText('Synced with iCloud')).toBeTruthy()
    expect(screen.getByText('iCloud Sync')).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Use this iCloud account' })).toBeNull()
  })
})
