/** biome-ignore-all lint/style/noNonNullAssertion: tests can tolerate it */
import { describe, expect, test } from 'vitest'
import { getVerb, type VerbForm, verbs } from '../verbs'
import { derivePassiveParticiple } from './participle-passive'

test.each([
  ['أتي', 1, 'مَأْتِيّ'],
  ['أمن', 4, 'مُؤْمَن'],
  ['أنشأ', 4, 'مُنْشَأ'],
  ['أوي', 1, 'مَأْوِيّ'],
  ['أوي', 10, 'مُسْتَأْوًى'],
  ['أوي', 4, 'مُؤْوًى'],
  ['بدأ', 1, 'مَبْدُوء'],
  ['ترجم', 1, 'مُتَرْجَم'],
  ['حبب', 2, 'مُحَبَّب'],
  ['دحرج', 1, 'مُدَحْرَج'],
  ['رأى', 1, 'مَرْئِيّ'],
  ['ضيف', 10, 'مُسْتَضَاف'],
  ['ضيف', 4, 'مُضَاف'],
  ['عدد', 4, 'مُعَدّ'],
  ['عطى', 4, 'مُعْطَى'],
  ['عون', 10, 'مُسْتَعَان'],
  ['عون', 3, 'مُعَاوَن'],
  ['عون', 4, 'مُعَان'],
  ['عون', 6, 'مُتَعَاوَن'],
  ['غدو', 1, 'مَغْدُوو'],
  ['فلت', 4, 'مُفْلَت'],
  ['قود', 7, 'مُنْقَاد'],
  ['قود', 8, 'مُقْتَاد'],
  ['نبأ', 4, 'مُنْبَأ'],
  ['نهي', 4, 'مُنْهَى'],
  ['نهي', 8, 'مُنْتَهَى'],
  ['وصل', 1, 'مَوْصُول'],
  ['وصل', 8, 'مُتَّصَل'],
  ['وعد', 1, 'مَوْعُود'],
  ['وفي', 10, 'مُسْتَفًى'],
  ['وفي', 2, 'مُوَفًّى'],
  ['وفي', 4, 'مُوفًى'],
  ['وفي', 5, 'مُتَوَفًّى'],
  ['وقي', 1, 'مَوْقِيّ'],
  ['ولى', 1, 'مَوْلِيّ'],
])('%s (Form %d) passive participle is %s', (root, form, expected) => {
  const verb = verbs.find((entry) => entry.root === root && entry.form === form)!
  expect(derivePassiveParticiple(verb)).toBe(expected)
})

test.each([
  ['أمن', 1],
  ['جلس', 1],
  ['حبط', 1],
  ['حضر', 1],
  ['حمر', 9],
  ['سعد', 1],
  ['صفر', 9],
  ['طلق', 7],
  ['فجر', 7],
])('%s (Form %d) has no passive participle', (root, form) => {
  const verb = verbs.find((entry) => entry.root === root && entry.form === form)
  expect(derivePassiveParticiple(verb!)).toBe('')
})

describe('regular roots', () => {
  describe('ك-ت-ب', () => {
    test.each<[VerbForm, string]>([
      [1, 'مَكْتُوب'],
      [2, 'مُكَتَّب'],
      [3, 'مُكَاتَب'],
      [4, 'مُكْتَب'],
      [5, 'مُتَكَتَّب'],
      [6, 'مُتَكَاتَب'],
      [7, 'مُنْكَتَب'],
    ])('Form %d passive participle is %s', (form, expected) => {
      expect(derivePassiveParticiple(getVerb('كتب', form))).toBe(expected)
    })
  })
})

describe('assimilated roots', () => {
  describe('و-ع-د', () => {
    test.todo('وَعَدَ (Form I)')
    test.todo('تَوَعَّدَ (Form V)')
  })
})

describe('hollow roots', () => {
  describe('ق-و-ل', () => {
    test.todo('قَالَ (Form I)')
    test.todo('قَوَّلَ (Form II)')
    test.todo('قَاوَلَ (Form III)')
    test.todo('أَقَالَ (Form IV)')
  })
})

describe('defective roots', () => {
  describe('ر-م-ي', () => {
    test.todo('رَمَى (Form I)')
    test.todo('رَمَّى (Form II)')
    test.todo('اِنْرَمَى (Form VIII)')
  })
})

describe('hamzated initial roots', () => {
  describe.todo('أ-خ-ذ')
})

describe('hamzated middle roots', () => {
  describe.todo('س-أ-ل')
})

describe('hamzated final roots', () => {
  describe.todo('ق-ر-أ')
})

describe('doubly weak roots', () => {
  describe.todo('و-ق-ي')
  describe.todo('و-ف-ي')
  describe.todo('ر-و-ي')
})

describe('hamzated initial defective roots', () => {
  describe.todo('أ-ت-ي')
})

describe('hamzated middle assimilated roots', () => {
  describe.todo('و-ئ-د')
})

describe('hamzated middle defective roots', () => {
  describe.todo('ب-د-أ')
})

describe('hamzated final assimilated roots', () => {
  describe.todo('و-أ-ى')
})

describe('hamzated final hollow roots', () => {
  describe.todo('ج-ي-ء')
})
