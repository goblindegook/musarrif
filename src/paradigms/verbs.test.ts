import { describe, expect, test } from 'vitest'
import { synthesizeVerb } from './verbs'

describe('buildSyntheticVerb', () => {
  test('Form I', () => {
    const verb = synthesizeVerb('كتب', 1, 'fa3ala-yaf3ulu')
    expect(verb).toEqual({
      id: 'ktb-1',
      form: 1,
      formPattern: 'fa3ala-yaf3ulu',
      masdarPatterns: ['fi3aal'],
      label: 'كَتَبَ',
      root: 'كتب',
      rootId: 'ktb',
    })
  })

  test('Forms II-X', () => {
    const verb = synthesizeVerb('كتب', 2)
    expect(verb).toEqual({
      form: 2,
      id: 'ktb-2',
      label: 'كَتَّبَ',
      root: 'كتب',
      rootId: 'ktb',
    })
  })
})
