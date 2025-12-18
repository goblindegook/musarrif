/** biome-ignore-all lint/style/noNonNullAssertion: tests can tolerate it */
import { describe, expect, test } from 'vitest'
import { getVerb, type VerbForm, verbs } from '../verbs'
import { deriveActiveParticiple } from './participle-active'

test.each([
  ['أتي', 1, 'آتٍ'],
  ['أمن', 4, 'مُؤْمِن'],
  ['أنشأ', 4, 'مُنْشِئ'],
  ['أوي', 1, 'آوٍ'],
  ['أوي', 10, 'مُسْتَأْوٍ'],
  ['أوي', 4, 'مُؤْوٍ'],
  ['أوي', 5, 'مُتَأَوٍّ'],
  ['بدأ', 1, 'بَادِئ'],
  ['ترجم', 1, 'مُتَرْجِم'],
  ['جيء', 1, 'جَاءٍ'],
  ['جيء', 6, 'مُتَجَاءٍ'],
  ['حبب', 2, 'مُحَبِّب'],
  ['حبط', 1, 'حَابِط'],
  ['حسب', 1, 'حَاسِب'],
  ['حمر', 9, 'مُحْمَرّ'],
  ['دحرج', 1, 'مُدَحْرِج'],
  ['رأى', 1, 'رَاءٍ'],
  ['سعد', 1, 'سَعِيد'],
  ['صعد', 1, 'صَاعِد'],
  ['صفر', 9, 'مُصْفَرّ'],
  ['ضيف', 10, 'مُسْتَضِيف'],
  ['ضيف', 4, 'مُضِيف'],
  ['عدد', 4, 'مُعِدّ'],
  ['عطى', 4, 'مُعْطٍ'],
  ['عون', 10, 'مُسْتَعِين'],
  ['عون', 3, 'مُعَاوِن'],
  ['عون', 4, 'مُعِين'],
  ['عون', 6, 'مُتَعَاوِن'],
  ['غدو', 1, 'غَاد'],
  ['فلت', 4, 'مُفْلِت'],
  ['قود', 4, 'مُقِيد'],
  ['قود', 7, 'مُنْقَاد'],
  ['قود', 8, 'مُقْتَاد'],
  ['نبأ', 4, 'مُنْبِئ'],
  ['نهي', 4, 'مُنْهِي'],
  ['وصل', 1, 'وَاصِل'],
  ['وصل', 8, 'مُتَّصِل'],
  ['وعد', 1, 'وَاعِد'],
  ['وفي', 10, 'مُسْتَفٍ'],
  ['وفي', 2, 'مُوَفٍّ'],
  ['وفي', 4, 'مُوفٍ'],
  ['وفي', 5, 'مُتَوَفٍّ'],
  ['وقي', 1, 'وَاقٍ'],
  ['ولى', 1, 'وَالٍ'],
])('%s (Form %d) active participle is %s', (root, form, expected) => {
  const verb = verbs.find((entry) => entry.root === root && entry.form === form)!
  expect(deriveActiveParticiple(verb)).toBe(expected)
})

describe('regular roots', () => {
  describe('ك-ت-ب', () => {
    test.each<[VerbForm, string]>([
      [1, 'كَاتِب'],
      [2, 'مُكَتِّب'],
      [3, 'مُكَاتِب'],
      [4, 'مُكْتِب'],
      [5, 'مُتَكَتِّب'],
      [6, 'مُتَكَاتِب'],
      [7, 'مُنْكَتِب'],
    ])('Form %d active participle is %s', (form, expected) => {
      expect(deriveActiveParticiple(getVerb('كتب', form))).toBe(expected)
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
