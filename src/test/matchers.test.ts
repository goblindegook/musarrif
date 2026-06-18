import { describe, expect, test } from 'vitest'
import { FATHA } from '../paradigms/tokens'
import { measureMorpheme, Word } from '../paradigms/word'

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

describe('strings', () => {
  test('stringifies a Word before toEqualT', () => {
    expect(new Word([measureMorpheme([FATHA])])).strings.toEqualT('َ')
  })

  test('stringifies nested public values before toMatchObjectT', () => {
    const received = {
      value: new Word([measureMorpheme([FATHA])]),
      values: [new Word([measureMorpheme([FATHA])])],
    }

    expect(received).strings.toMatchObjectT({
      value: 'َ',
      values: ['َ'],
    })
  })
})
