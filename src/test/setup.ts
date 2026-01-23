import '@testing-library/jest-dom'
import { setup } from 'goober'
import { h } from 'preact'
import { expect } from 'vitest'

import { matchers } from './matchers'

// Ensure goober uses Preact's h during tests
setup(h)
expect.extend(matchers)
