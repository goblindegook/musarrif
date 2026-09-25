import { cleanup, screen } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { currentUrl, renderApp } from '../test/fixtures'

beforeEach(() => {
  cleanup()
  localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Search', () => {
  it('navigates when selecting a verb from search', async () => {
    renderApp('/#/verbs')
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    const input = screen.getByLabelText('Verb')

    await user.type(input, 'كتب')
    expect(await screen.findByText('to write', { selector: '[role="option"] *' })).toBeInTheDocument()
    await user.keyboard('{Enter}')

    expect(currentUrl()).toBe('/verbs/ktb-1/')
  })
})
