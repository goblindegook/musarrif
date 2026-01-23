import { describe, expect, test } from 'vitest'

describe('toMatchObjectT', () => {
  test('passes for matching objects', () => {
    expect({ value: 'كَتَبَ' }).toMatchObjectT({ value: 'كَتَبَ' })
  })

  test('includes transliterated diff for mismatches', () => {
    const run = () => expect({ value: 'كَتَبَ' }).toMatchObjectT({ value: 'كُتِبَ' })

    expect(run).toThrowError(/Transliterated diff/)
    expect(run).toThrowError(/kataba/)
    expect(run).toThrowError(/kutiba/)
  })
})

describe('toEqualT', () => {
  test('passes for matching values', () => {
    expect('كَتَبَ').toEqualT('كَتَبَ')
  })

  test('includes transliterated diff for mismatches', () => {
    const run = () => expect('كَتَبَ').toEqualT('كُتِبَ')

    expect(run).toThrowError(/Transliterated diff/)
    expect(run).toThrowError(/kataba/)
    expect(run).toThrowError(/kutiba/)
  })
})
