import { describe, expect, test, vi } from 'vitest'
import { generateVerbTests } from './generate-verb-tests.mts'

const FIXED_NOW = new Date('2026-07-18T12:34:56.000Z')

describe('generateVerbTests', () => {
  test('marks existing test files and skips all generators', async () => {
    const wiktionary = vi.fn<(_: string) => Promise<boolean>>()
    const reverso = vi.fn<(_: string) => Promise<boolean>>()
    const elixirfm = vi.fn<(_: string) => Promise<boolean>>()
    const writeReport = vi.fn<(path: string, content: string) => void>()

    const result = await generateVerbTests({
      slugs: ['ktb-1'],
      reportDir: '/repo/reports',
      hasExistingTest: async () => true,
      generators: [
        { source: 'wiktionary', generate: wiktionary },
        { source: 'reverso', generate: reverso },
        { source: 'elixirfm', generate: elixirfm },
      ],
      now: () => FIXED_NOW,
      writeReport,
    })

    expect(result).toEqual({
      reportPath: '/repo/reports/verb-test-generation-2026-07-18T12-34-56.000Z.csv',
      results: [{ slug: 'ktb-1', source: 'existing' }],
    })
    expect(wiktionary).not.toHaveBeenCalled()
    expect(reverso).not.toHaveBeenCalled()
    expect(elixirfm).not.toHaveBeenCalled()
    expect(writeReport).toHaveBeenCalledWith(
      '/repo/reports/verb-test-generation-2026-07-18T12-34-56.000Z.csv',
      'slug,source\nktb-1,existing\n',
    )
  })

  test('uses Wiktionary first when it succeeds', async () => {
    const wiktionary = vi.fn(async () => true)
    const reverso = vi.fn(async () => true)
    const elixirfm = vi.fn(async () => true)
    const writeReport = vi.fn<(path: string, content: string) => void>()

    const result = await generateVerbTests({
      slugs: ['ktb-1'],
      reportDir: '/repo/reports',
      hasExistingTest: async () => false,
      generators: [
        { source: 'wiktionary', generate: wiktionary },
        { source: 'reverso', generate: reverso },
        { source: 'elixirfm', generate: elixirfm },
      ],
      now: () => FIXED_NOW,
      writeReport,
    })

    expect(result.results).toEqual([{ slug: 'ktb-1', source: 'wiktionary' }])
    expect(wiktionary).toHaveBeenCalledWith('ktb-1')
    expect(reverso).not.toHaveBeenCalled()
    expect(elixirfm).not.toHaveBeenCalled()
    expect(writeReport).toHaveBeenCalledWith(expect.any(String), 'slug,source\nktb-1,wiktionary\n')
  })

  test('falls back to Reverso when Wiktionary does not find the verb', async () => {
    const wiktionary = vi.fn(async () => false)
    const reverso = vi.fn(async () => true)
    const elixirfm = vi.fn(async () => true)
    const writeReport = vi.fn<(path: string, content: string) => void>()

    const result = await generateVerbTests({
      slugs: ['ktb-1'],
      reportDir: '/repo/reports',
      hasExistingTest: async () => false,
      generators: [
        { source: 'wiktionary', generate: wiktionary },
        { source: 'reverso', generate: reverso },
        { source: 'elixirfm', generate: elixirfm },
      ],
      now: () => FIXED_NOW,
      writeReport,
    })

    expect(result.results).toEqual([{ slug: 'ktb-1', source: 'reverso' }])
    expect(wiktionary).toHaveBeenCalledWith('ktb-1')
    expect(reverso).toHaveBeenCalledWith('ktb-1')
    expect(elixirfm).not.toHaveBeenCalled()
    expect(writeReport).toHaveBeenCalledWith(expect.any(String), 'slug,source\nktb-1,reverso\n')
  })

  test('falls back to ElixirFM when Wiktionary and Reverso do not find the verb', async () => {
    const wiktionary = vi.fn(async () => false)
    const reverso = vi.fn(async () => false)
    const elixirfm = vi.fn(async () => true)
    const writeReport = vi.fn<(path: string, content: string) => void>()

    const result = await generateVerbTests({
      slugs: ['ktb-1'],
      reportDir: '/repo/reports',
      hasExistingTest: async () => false,
      generators: [
        { source: 'wiktionary', generate: wiktionary },
        { source: 'reverso', generate: reverso },
        { source: 'elixirfm', generate: elixirfm },
      ],
      now: () => FIXED_NOW,
      writeReport,
    })

    expect(result.results).toEqual([{ slug: 'ktb-1', source: 'elixirfm' }])
    expect(wiktionary).toHaveBeenCalledWith('ktb-1')
    expect(reverso).toHaveBeenCalledWith('ktb-1')
    expect(elixirfm).toHaveBeenCalledWith('ktb-1')
    expect(writeReport).toHaveBeenCalledWith(expect.any(String), 'slug,source\nktb-1,elixirfm\n')
  })

  test('marks verbs as missing when no source can generate a test', async () => {
    const wiktionary = vi.fn(async () => false)
    const reverso = vi.fn(async () => false)
    const elixirfm = vi.fn(async () => false)
    const writeReport = vi.fn<(path: string, content: string) => void>()

    const result = await generateVerbTests({
      slugs: ['ktb-1'],
      reportDir: '/repo/reports',
      hasExistingTest: async () => false,
      generators: [
        { source: 'wiktionary', generate: wiktionary },
        { source: 'reverso', generate: reverso },
        { source: 'elixirfm', generate: elixirfm },
      ],
      now: () => FIXED_NOW,
      writeReport,
    })

    expect(result.results).toEqual([{ slug: 'ktb-1', source: 'missing' }])
    expect(writeReport).toHaveBeenCalledWith(expect.any(String), 'slug,source\nktb-1,missing\n')
  })

  test('stops and surfaces unexpected generator errors', async () => {
    const writeReport = vi.fn<(path: string, content: string) => void>()

    await expect(
      generateVerbTests({
        slugs: ['ktb-1'],
        reportDir: '/repo/reports',
        hasExistingTest: async () => false,
        generators: [
          {
            source: 'wiktionary',
            generate: async () => {
              throw new Error('429')
            },
          },
          { source: 'reverso', generate: async () => true },
          { source: 'elixirfm', generate: async () => true },
        ],
        now: () => FIXED_NOW,
        writeReport,
      }),
    ).rejects.toThrow('429')

    expect(writeReport).not.toHaveBeenCalled()
  })
})
