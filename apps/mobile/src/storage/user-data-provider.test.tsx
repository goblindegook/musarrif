import { act, fireEvent, render, screen } from '@testing-library/react-native'
import { useState } from 'react'
import { createInMemoryRepository } from './in-memory-repository'
import type { UserDataKey, UserDataValue, ValidatedUserDataSnapshot } from './schema'
import { UserDataProvider, useUserData, useUserDataValue } from './UserDataProvider'

function Harness() {
  const { ready, put, refresh, replaceExportedData } = useUserData()
  const theme = useUserDataValue('setting:theme')
  return (
    <>
      <Text testID="ready">{String(ready)}</Text>
      <Text testID="theme">{String(theme ?? '')}</Text>
      <Button title="Set dark" onPress={() => void put('setting:theme', 'dark')} />
      <Button title="Reload" onPress={() => void refresh()} />
      <Button
        title="Import export"
        onPress={() =>
          void replaceExportedData({
            values: { 'setting:theme': 'dark', 'favorite:ktb-1': true },
          } satisfies ValidatedUserDataSnapshot)
        }
      />
    </>
  )
}

import { Button, Text } from 'react-native'

function ConcurrentWritesHarness() {
  const { put } = useUserData()
  const [status, setStatus] = useState('idle')
  return (
    <>
      <Text testID="write-status">{status}</Text>
      <Button
        title="Save answer"
        onPress={() => {
          void Promise.all([
            put('srs:card', { result: 'correct' }),
            put('dimension:store', { level: 1 }),
            put('exercise:daily:2026-10-01', { correct: 1 }),
          ]).then(
            () => setStatus('saved'),
            () => setStatus('failed'),
          )
        }}
      />
    </>
  )
}

function ThemeProbe({ onRender }: { onRender: () => void }) {
  const theme = useUserDataValue('setting:theme')
  const { put } = useUserData()
  onRender()
  return (
    <>
      <Text testID="probe-theme">{String(theme ?? '')}</Text>
      <Button title="Favourite" onPress={() => void put('favorite:ktb-1', true)} />
      <Button title="Theme" onPress={() => void put('setting:theme', 'dark')} />
    </>
  )
}

describe('UserDataProvider', () => {
  test('a consumer re-renders only when the key it reads changes', async () => {
    const onRender = jest.fn()
    await render(
      <UserDataProvider repositoryFactory={async () => createInMemoryRepository()}>
        <ThemeProbe onRender={onRender} />
      </UserDataProvider>,
    )
    await act(async () => {})
    const rendersAfterHydration = onRender.mock.calls.length

    await act(async () => await fireEvent.press(screen.getByRole('button', { name: 'Favourite' })))
    expect(onRender).toHaveBeenCalledTimes(rendersAfterHydration)

    await act(async () => await fireEvent.press(screen.getByRole('button', { name: 'Theme' })))
    expect(screen.getByTestId('probe-theme').props.children).toBe('dark')
  })

  test('serializes answer writes for repositories with exclusive transactions', async () => {
    let activeWrite = false
    const saved: UserDataKey[] = []
    const repository = createInMemoryRepository(
      {},
      {
        put: async (key) => {
          if (activeWrite) throw new Error('database is locked')
          activeWrite = true
          await Promise.resolve()
          saved.push(key)
          activeWrite = false
        },
      },
    )
    await render(
      <UserDataProvider repositoryFactory={async () => repository}>
        <ConcurrentWritesHarness />
      </UserDataProvider>,
    )
    await act(async () => {})
    await act(async () => await fireEvent.press(screen.getByRole('button', { name: 'Save answer' })))

    expect(screen.getByTestId('write-status').props.children).toBe('saved')
    expect(saved).toEqual(['srs:card', 'dimension:store', 'exercise:daily:2026-10-01'])
  })

  test('hydrates once and publishes durable writes to subscribed screens', async () => {
    const values: Partial<Record<UserDataKey, UserDataValue>> = { 'setting:theme': 'light' }
    const repository = createInMemoryRepository(values)
    await render(
      <UserDataProvider repositoryFactory={async () => repository}>
        <Harness />
      </UserDataProvider>,
    )

    await act(async () => {})
    expect(screen.getByTestId('ready').props.children).toBe('true')
    expect(screen.getByTestId('theme').props.children).toBe('light')
    await act(async () => await fireEvent.press(screen.getByRole('button', { name: 'Set dark' })))
    expect(values['setting:theme']).toBe('dark')
    expect(screen.getByTestId('theme').props.children).toBe('dark')
  })

  test('reloads values that changed in the repository outside the provider, such as remote sync', async () => {
    const values: Partial<Record<UserDataKey, UserDataValue>> = { 'setting:theme': 'light' }
    const repository = createInMemoryRepository(values)
    await render(
      <UserDataProvider repositoryFactory={async () => repository}>
        <Harness />
      </UserDataProvider>,
    )
    await act(async () => {})
    values['setting:theme'] = 'dark'
    await act(async () => await fireEvent.press(screen.getByRole('button', { name: 'Reload' })))

    expect(screen.getByTestId('theme').props.children).toBe('dark')
  })

  test('publishes validated imports after the repository replaces exported data atomically', async () => {
    const values: Partial<Record<UserDataKey, UserDataValue>> = {
      'setting:theme': 'light',
      'local:install': 'installation',
    }
    const repository = createInMemoryRepository(values, {
      replaceExportedData: async (imported) => {
        Object.assign(values, imported.values)
      },
    })
    await render(
      <UserDataProvider repositoryFactory={async () => repository}>
        <Harness />
      </UserDataProvider>,
    )
    await act(async () => {})
    await act(async () => await fireEvent.press(screen.getByRole('button', { name: 'Import export' })))

    expect(screen.getByTestId('theme').props.children).toBe('dark')
    expect(values['favorite:ktb-1']).toBe(true)
    expect(values['local:install']).toBe('installation')
  })
})
