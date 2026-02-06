import { describe, expect, test } from 'vitest'
import { getVerb, type VerbForm } from '../verbs'
import { canConjugatePassive } from './support'

describe('canConjugatePassive', () => {
  describe('has passive voice', () => {
    test.each<[string, VerbForm]>([
      ['يود', 2],
      ['عمل', 3],
      ['أتي', 4],
    ])('%s (Form %d)', (root, form) => {
      expect(canConjugatePassive(getVerb(root, form))).toBe(true)
    })
  })

  describe('has no passive voice', () => {
    test.each<[string, VerbForm]>([
      ['وفي', 1],
      ['يئس', 1],
      ['وجب', 1],
      ['ظلل', 1],
      ['ميل', 1],
      ['قرر', 1],
      ['بعد', 1],
      ['بدو', 1],
      ['جرء', 1],
      ['أذن', 1],
      ['أمر', 1],
    ])('%s (Form %d)', (root, form) => {
      expect(canConjugatePassive(getVerb(root, form))).toBe(false)
    })
  })
})
