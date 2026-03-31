import { describe, expect, test } from 'vitest'

describe('toMatchObjectT', () => {
  test('passes for matching objects', () => {
    expect({ value: 'كَتَبَ' }).toMatchObjectT({ value: 'كَتَبَ' })
  })

  test('includes transliterated diff for mismatches', () => {
    const run = () => expect({ value: 'كَتَبَ' }).toMatchObjectT({ value: 'كُتِبَ' })

    expect(run).toThrow(/Transliterated diff/)
    expect(run).toThrow(/kataba/)
    expect(run).toThrow(/kutiba/)
  })
})

describe('toEqualT', () => {
  test('passes for matching values', () => {
    expect('كَتَبَ').toEqualT('كَتَبَ')
  })

  test('includes transliterated diff for string mismatches', () => {
    const run = () => expect('كَتَبَ').toEqualT('كُتِبَ')

    expect(run).toThrow(/Transliterated diff/)
    expect(run).toThrow(/kataba/)
    expect(run).toThrow(/kutiba/)
  })

  test('includes transliterated diff for array mismatches', () => {
    const run = () => expect(['كَتَبَ']).toEqualT(['كُتِبَ'])

    expect(run).toThrow(/Transliterated diff/)
    expect(run).toThrow(/kataba/)
    expect(run).toThrow(/kutiba/)
  })
})
