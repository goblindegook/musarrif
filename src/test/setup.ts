import '@testing-library/jest-dom'
import { setup } from 'goober'
import { h } from 'preact'
import { expect, vi } from 'vitest'

import { installMatchers } from './matchers'

// Ensure goober uses Preact's h during tests
setup(h)
installMatchers(expect)

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
