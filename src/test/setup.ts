import '@testing-library/jest-dom'
import { setup } from 'goober'
import { h } from 'preact'

// Ensure goober uses Preact's h during tests
setup(h)
