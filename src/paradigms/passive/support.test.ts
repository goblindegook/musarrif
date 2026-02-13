import { describe, expect, test } from 'vitest'
import { getVerb, type VerbForm } from '../verbs'
import { canConjugatePassive } from './support'

describe('canConjugatePassive', () => {
  describe('has passive voice', () => {
    test.each<[string, VerbForm]>([
      ['يود', 2],
      ['عمل', 3],
      ['أتي', 4],
      ['عرف', 5],
      ['هدد', 5],
      ['عزز', 5],
      ['قرر', 5],
      ['وصل', 5],
      ['وفر', 5],
      ['وقف', 5],
      ['وقع', 5],
      ['أثر', 5],
      ['بقي', 5],
      ['بني', 5],
      ['وفي', 5],
      ['وقي', 5],
      ['وخي', 5],
    ])('%s (Form %d)', (root, form) => {
      expect(canConjugatePassive(getVerb(root, form))).toBe(true)
    })
  })

  describe('has no passive voice', () => {
    test.each<[string, VerbForm]>([
      ['وفي', 1],
      ['وهن', 1],
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
      ['حدث', 5],
      ['طلب', 5],
      ['مثل', 5],
      ['حدد', 5],
      ['سبب', 5],
      ['وسع', 5],
      ['سني', 5],
      ['حدي', 5],
      ['سمي', 5],
      ['أخر', 5],
      ['ألف', 5],
      ['أكد', 5],
      ['أكل', 5],
    ])('%s (Form %d)', (root, form) => {
      expect(canConjugatePassive(getVerb(root, form))).toBe(false)
    })
  })
})
