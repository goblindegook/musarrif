import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/preact'
import { h } from 'preact'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { useDimensionStore } from './dimension-store'

const INITIAL_DIMENSION_PROFILE = {
  tenses: 0,
  pronouns: 0,
  diacritics: 0,
  forms: 0,
  rootTypes: 0,
  nominals: 0,
} as const

const INITIAL_DIMENSION_STORE = {
  profile: INITIAL_DIMENSION_PROFILE,
  windows: {
    tenses: [] as boolean[],
    pronouns: [] as boolean[],
    diacritics: [] as boolean[],
    forms: [] as boolean[],
    rootTypes: [] as boolean[],
    nominals: [] as boolean[],
  },
}

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  cleanup()
  localStorage.clear()
})

describe('useDimensionStore', () => {
  test('enforces prerequisites on stored profile and persists the enforced profile', async () => {
    localStorage.setItem(
      'conjugator:dimensions',
      JSON.stringify({
        profile: {
          ...INITIAL_DIMENSION_STORE.profile,
          tenses: 1,
          nominals: 1,
        },
        windows: INITIAL_DIMENSION_STORE.windows,
      }),
    )

    function Probe() {
      const [profile] = useDimensionStore()
      return h('div', {}, `${profile.tenses}-${profile.nominals}`)
    }

    render(h(Probe, {}))

    expect(screen.getByText('1-0')).toBeInTheDocument()

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem('conjugator:dimensions') ?? '{}')
      expect(stored.profile.tenses).toBe(1)
      expect(stored.profile.nominals).toBe(0)
    })
  })

  test('records correct answers, promotes dimensions, and exposes unlocks', async () => {
    localStorage.setItem(
      'conjugator:dimensions',
      JSON.stringify({
        profile: {
          ...INITIAL_DIMENSION_STORE.profile,
          pronouns: 1,
          forms: 0,
        },
        windows: {
          ...INITIAL_DIMENSION_STORE.windows,
          forms: Array(19).fill(true),
        },
      }),
    )

    function Probe() {
      const [profile, unlocks, recordAnswer] = useDimensionStore()
      return (
        <div>
          <button type="button" onClick={() => recordAnswer(['forms', 'rootTypes', 'diacritics'], true)}>
            record
          </button>
          <span>{profile.forms}</span>
          <span>{unlocks.map((unlock) => unlock.items.join('|')).join(',')}</span>
        </div>
      )
    }

    render(<Probe />)

    fireEvent.click(screen.getByText('record'))

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('exercise.unlock.form.2|exercise.unlock.form.3')).toBeInTheDocument()
    })
  })

  test('records incorrect answers without unlocks and keeps profile unchanged', async () => {
    function Probe() {
      const [profile, unlocks, recordAnswer] = useDimensionStore()
      return (
        <div>
          <button type="button" onClick={() => recordAnswer(['forms'], false)}>
            record wrong
          </button>
          <span>{`forms:${profile.forms}`}</span>
          <span>{`unlocks:${unlocks.length}`}</span>
        </div>
      )
    }

    render(<Probe />)

    fireEvent.click(screen.getByText('record wrong'))

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem('conjugator:dimensions') ?? '{}')
      expect(stored.profile.forms).toBe(0)
      expect(stored.windows.forms).toEqual([false])
      expect(screen.getByText('forms:0')).toBeInTheDocument()
      expect(screen.getByText('unlocks:0')).toBeInTheDocument()
    })
  })
})
