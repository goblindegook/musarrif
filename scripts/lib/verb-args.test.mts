import { describe, expect, test } from 'vitest'
import { parseVerbArgs } from './verb-args.mts'

const argv = (...args: string[]) => ['node', 'script.mts', ...args]

describe('parseVerbArgs', () => {
  test('rejects a source no fetcher implements', () => {
    expect(() => parseVerbArgs(argv('lisan', 'ktb-1'), 'add:verb')).toThrow(/Unknown source "lisan"/)
  })

  test('rejects a missing slug', () => {
    expect(() => parseVerbArgs(argv('wiktionary'), 'add:verb')).toThrow(/verb slug is required/)
  })

  test('rejects a slug without a form', () => {
    expect(() => parseVerbArgs(argv('wiktionary', 'ktb'), 'add:verb')).toThrow(/Malformed slug "ktb"/)
  })

  test('rejects a root with fewer than three radicals', () => {
    expect(() => parseVerbArgs(argv('wiktionary', 'ab-1'), 'add:verb')).toThrow(/Root "ab" has 2 radical/)
  })

  test('rejects a form the root does not have', () => {
    expect(() => parseVerbArgs(argv('wiktionary', 'ktb-16'), 'add:verb')).toThrow(/Form "16" is not available/)
    expect(() => parseVerbArgs(argv('wiktionary', 'ktb-0'), 'add:verb')).toThrow(/Form "0" is not available/)
  })

  test('rejects a form beyond the four a quadriliteral root allows', () => {
    expect(() => parseVerbArgs(argv('wiktionary', 'dHrj-5'), 'add:verb')).toThrow(/Form "5" is not available/)
  })

  test('rejects a vowel pattern on a slug that is not Form I', () => {
    expect(() => parseVerbArgs(argv('wiktionary', 'ktb-2', 'a-u'), 'add:verb')).toThrow(
      /vowel pattern only applies to a triliteral Form I verb/,
    )
  })

  test('rejects a vowel pattern outside the known set', () => {
    expect(() => parseVerbArgs(argv('wiktionary', 'ktb-1', 'a-e'), 'add:verb')).toThrow(/Unknown vowel pattern "a-e"/)
  })

  test('names the script it was called from in the usage line', () => {
    expect(() => parseVerbArgs(argv('wiktionary', 'ab-1'), 'add:tests')).toThrow(/npm run add:tests/)
  })
})
