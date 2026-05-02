import { cleanup, render } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import type { ComponentChildren } from 'preact'
import { act } from 'preact/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { I18nProvider } from '../../hooks/useI18n'
import { RoutingProvider } from '../../routes'
import { Search } from './SearchBox'

function Wrapper({ children }: { children: ComponentChildren }) {
  return (
    <RoutingProvider>
      <I18nProvider>{children}</I18nProvider>
    </RoutingProvider>
  )
}

const noop = () => {}

describe('Search mobile behavior', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 500,
    })
    window.scrollTo = vi.fn()
  })

  afterEach(() => {
    cleanup()
  })

  test('does not keep mobile behavior after resizing to desktop', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    const { container } = render(<Search onSelect={noop} />, { wrapper: Wrapper })
    const input = container.querySelector('input[type="search"]')

    expect(input).not.toBeNull()
    await Promise.resolve()

    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 1200,
    })
    act(() => {
      window.dispatchEvent(new Event('resize'))
    })

    await user.click(input as HTMLInputElement)

    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  test('applies mobile behavior after resizing from desktop', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 1200,
    })

    const { container } = render(<Search onSelect={noop} />, { wrapper: Wrapper })
    const input = container.querySelector('input[type="search"]')

    expect(input).not.toBeNull()
    await Promise.resolve()

    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 500,
    })
    act(() => {
      window.dispatchEvent(new Event('resize'))
    })

    await user.click(input as HTMLInputElement)

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0 })
  })
})
