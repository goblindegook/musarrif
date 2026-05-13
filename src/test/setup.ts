import '@testing-library/jest-dom'

vi.mock('piper-wasm', () => ({
  piperGenerate: vi.fn(),
}))

import { setup } from 'goober'
import { h } from 'preact'
import { expect, vi } from 'vitest'

import { matchers } from './matchers'

// Ensure goober uses Preact's h during tests
setup(h)
expect.extend(matchers)

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => {
      store[k] = v
    },
    removeItem: (k: string) => {
      delete store[k]
    },
    clear: () => {
      store = {}
    },
    get length() {
      return Object.keys(store).length
    },
    key: (i: number) => Object.keys(store)[i] ?? null,
  }
})()

vi.stubGlobal('localStorage', localStorageMock)
