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
  ['أوي', 5, 'مُتَأَوٍّ'],
  ['بدأ', 1, 'بَادِئ'],
  ['ترجم', 1, 'مُتَرْجِم'],
  ['جيء', 1, 'جَاءٍ'],
  ['جيء', 6, 'مُتَجَاءٍ'],
  ['أخذ', 8, 'مُتَّخِذ'],
  ['حبب', 1, 'حَابّ'],
  ['حبب', 2, 'مُحَبِّب'],
  ['حبب', 4, 'مُحِبّ'],
  ['حبب', 5, 'مُتَحَبِّب'],
  ['حبب', 6, 'مُتَحَابّ'],
  ['تمم', 1, 'تَامّ'],
  ['قرح', 8, 'مُقْتَرِح'],
  ['ذكر', 1, 'ذَاكِر'],
  ['ذكر', 2, 'مُذَكِّر'],
  ['عمل', 1, 'عَامِل'],
  ['عمل', 2, 'مُعَمِّل'],
  ['ضمن', 1, 'ضَامِن'],
  ['ضمن', 2, 'مُضَمِّن'],
  ['ضمن', 5, 'مُتَضَمِّن'],
  ['حبط', 1, 'حَابِط'],
  ['حسب', 1, 'حَاسِب'],
  ['حمر', 9, 'مُحْمَرّ'],
  ['حمم', 10, 'مُسْتَحِمّ'],
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
  ['عمل', 10, 'مُسْتَعْمِل'],
  ['غدو', 1, 'غَادٍ'],
  ['فلت', 4, 'مُفْلِت'],
  ['قود', 4, 'مُقِيد'],
  ['قود', 7, 'مُنْقَاد'],
  ['قود', 8, 'مُقْتَاد'],
  ['لمم', 1, 'لَامّ'],
  ['كان', 1, 'كَائِن'],
  ['نبأ', 4, 'مُنْبِئ'],
  ['نهي', 4, 'مُنْهِي'],
  ['وصل', 1, 'وَاصِل'],
  ['وصل', 8, 'مُتَّصِل'],
  ['وعد', 1, 'وَاعِد'],
  ['وفي', 10, 'مُسْتَوْفٍ'],
  ['وفي', 2, 'مُوَفٍّ'],
  ['وفي', 4, 'مُوفٍ'],
  ['وفي', 5, 'مُتَوَفٍّ'],
  ['وقي', 1, 'وَاقٍ'],
  ['ولى', 1, 'وَالٍ'],
  ['بيت', 1, 'بَائِت'],
])('%s (Form %d) active participle is %s', (root, form, expected) => {
  const verb = verbs.find((entry) => entry.root === root && entry.form === form)!
  expect(deriveActiveParticiple(verb)).toBe(expected)
})

describe('Form I fa3ila active participles', () => {
  test('use faa3il when the masdar is fu3ool', () => {
    expect(deriveActiveParticiple(getVerb('حبط', 1))).toBe('حَابِط')
  })

  test('use fa3eel when the masdar is not fu3ool', () => {
    expect(deriveActiveParticiple(getVerb('سعد', 1))).toBe('سَعِيد')
  })
})

describe('regular roots', () => {
  describe('ك-ت-ب', () => {
    test.each<[VerbForm, string]>([
      [1, 'كَاتِب'],
      [2, 'مُكَتِّب'],
      [3, 'مُكَاتِب'],
      [4, 'مُكْتِب'],
      [5, 'مُتَكَتِّب'],
      [6, 'مُتَكَاتِب'],
      [7, 'مُنْكَتِب'],
    ])('Form %d active participle is %s', (form, expected) => {
      expect(deriveActiveParticiple(getVerb('كتب', form))).toBe(expected)
    })
  })
})

describe('assimilated roots', () => {
  describe('و-ع-د', () => {
    test.each<[VerbForm, string]>([
      [1, 'وَاعِد'],
      [5, 'مُتَوَعِّد'],
    ])('Form %d active participle is %s', (form, expected) => {
      expect(deriveActiveParticiple(getVerb('وعد', form))).toBe(expected)
    })
  })
})

describe('hollow roots', () => {
  describe('ق-و-ل', () => {
    test.each<[VerbForm, string]>([
      [1, 'قَائِل'],
      [2, 'مُقَوِّل'],
      [3, 'مُقَاوِل'],
      [5, 'مُتَقَوِّل'],
    ])('Form %d active participle is %s', (form, expected) => {
      expect(deriveActiveParticiple(getVerb('قول', form))).toBe(expected)
    })
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
  describe('أ-ك-ل', () => {
    test.each<[VerbForm, string]>([[1, 'آكِل']])('Form %d active participle is %s', (form, expected) => {
      expect(deriveActiveParticiple(getVerb('أكل', form))).toBe(expected)
    })
  })

  describe.todo('أ-خ-ذ')
})

describe('hamzated middle roots', () => {
  describe('س-أ-ل', () => {
    test.each<[VerbForm, string]>([
      [1, 'سَائِل'],
      [3, 'مُسَائِل'],
      [6, 'مُتَسَائِل'],
    ])('Form %d active participle is %s', (form, expected) => {
      expect(deriveActiveParticiple(getVerb('سأل', form))).toBe(expected)
    })
  })
})

describe('hamzated final roots', () => {
  describe('ق-ر-أ', () => {
    test.each<[VerbForm, string]>([
      [1, 'قَارِئ'],
      [10, 'مُسْتَقْرِئ'],
    ])('Form %d active participle is %s', (form, expected) => {
      expect(deriveActiveParticiple(getVerb('قرأ', form))).toBe(expected)
    })
  })
})

describe('doubly weak roots', () => {
  describe('و-ف-ي', () => {
    test.each<[VerbForm, string]>([
      [1, 'وَافٍ'],
      [2, 'مُوَفٍّ'],
      [3, 'مُوَافٍ'],
      [4, 'مُوفٍ'],
      [5, 'مُتَوَفٍّ'],
      [10, 'مُسْتَوْفٍ'],
    ])('Form %d active participle is %s', (form, expected) => {
      expect(deriveActiveParticiple(getVerb('وفي', form))).toBe(expected)
    })
  })

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
