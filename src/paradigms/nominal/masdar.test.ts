/** biome-ignore-all lint/style/noNonNullAssertion: tests can tolerate it */
import { describe, expect, test } from 'vitest'
import { getVerb, type VerbForm, verbs } from '../verbs'
import { deriveMasdar } from './masdar'

test.each([
  ['أتي', 1, 'إِتْيَان'],
  ['أجر', 10, 'اِسْتِئْجَار'],
  ['أمر', 1, 'أَمْر'],
  ['أمن', 1, 'أَمْن'],
  ['أمن', 4, 'إِيمَان'],
  ['أود', 2, 'تَأْوِيد'],
  ['أيد', 2, 'تَأْيِيد'],
  ['أنشأ', 4, 'إِنْشَاء'],
  ['أوي', 1, 'إِوِيّ'],
  ['أوي', 10, 'اِسْتِئْواء'],
  ['أوي', 4, 'إِيوَاء'],
  ['أوي', 5, 'تَأَوِّي'],
  ['عمل', 1, 'عَمَل'],
  ['عمل', 2, 'تَعْمِيل'],
  ['عمل', 10, 'اِسْتِعْمَال'],
  ['بدأ', 1, 'بَدْء'],
  ['بدل', 1, 'بَدْل'],
  ['بدل', 2, 'تَبْدِيل'],
  ['بقي', 1, 'بَقَاء'],
  ['ترجم', 1, 'تَرْجَمَة'],
  ['جلس', 1, 'جُلُوس'],
  ['جمع', 1, 'جَمْع'],
  ['جيء', 1, 'مَجِيء'],
  ['جيء', 6, 'تَجَاءٍ'],
  ['حبط', 1, 'حُبُوط'],
  ['قرح', 8, 'اِقْتِرَاح'],
  ['ذكر', 1, 'ذِكْر'],
  ['ذكر', 2, 'تَذْكِير'],
  ['ضمن', 1, 'ضَمَان'],
  ['ضمن', 2, 'تَضْمِين'],
  ['ضمن', 5, 'تَضَمُّن'],
  ['حسب', 1, 'حَسَب'],
  ['حضر', 1, 'حُضُور'],
  ['حلق', 1, 'حَلْق'],
  ['حلم', 1, 'حُلْم'],
  ['حمر', 9, 'اِحْمِرَار'],
  ['حمم', 10, 'اِسْتِحْمَام'],
  ['خرج', 1, 'خُرُوج'],
  ['خسر', 1, 'خُسْر'],
  ['درس', 1, 'دَرْس'],
  ['درس', 10, 'اِسْتِدْرَاس'],
  ['دعى', 10, 'اِسْتِدْعَاء'],
  ['رأى', 1, 'رُؤْيَة'],
  ['ركز', 1, 'رَكْز'],
  ['سعد', 1, 'سَعَادَة'],
  ['سفر', 1, 'سَفْر'],
  ['شرب', 1, ['شُرْب', 'مَشْرَب']],
  ['صبح', 1, 'صَبْح'],
  ['صبر', 1, 'صَبْر'],
  ['صدق', 1, 'صِدْق'],
  ['صرح', 1, 'صَرْح'],
  ['صرخ', 1, 'صُرَاخ'],
  ['صرف', 1, 'صَرْف'],
  ['صعد', 1, 'صُعُود'],
  ['صفر', 9, 'اِصْفِرَار'],
  ['ضيف', 10, 'اِسْتِضَافَة'],
  ['ضيف', 4, 'إِضَافَة'],
  ['طير', 2, 'تَطْيِير'],
  ['عاد', 10, 'اِسْتِعَادَة'],
  ['عدد', 4, 'إِعْدَاد'],
  ['عطى', 4, 'إِعْطَاء'],
  ['عون', 10, 'اِسْتِعَانَة'],
  ['عون', 3, 'مُعَاوَنَة'],
  ['عون', 4, 'إِعَانَة'],
  ['عون', 6, 'تَعَاوُن'],
  ['غدو', 1, 'غُدُوّ'],
  ['غنى', 10, 'اِسْتِغْنَاء'],
  ['غنى', 2, 'تَغْنِيَة'],
  ['غنى', 5, 'تَغَنٍّ'],
  ['فجر', 7, 'اِنْفِجَار'],
  ['فعل', 1, 'فِعْل'],
  ['فعل', 2, 'تَفْعِيل'],
  ['فعل', 4, 'إِفْعَال'],
  ['فلت', 4, 'إِفْلَات'],
  ['قتل', 1, 'قَتْل'],
  ['قرأ', 1, 'قِرَاءَة'],
  ['قرر', 4, 'إِقْرَار'],
  ['قرر', 1, 'قَرَار'],
  ['أخذ', 8, 'اِتِّخَاذ'],
  ['قسم', 1, 'قِسْمَة'],
  ['قفز', 1, 'قَفْز'],
  ['قود', 3, 'مُقَاوَدَة'],
  ['قود', 4, 'إِقَادَة'],
  ['قود', 7, 'اِنْقِيَاد'],
  ['قود', 8, 'اِقْتِيَاد'],
  ['قوم', 1, 'قِيَام'],
  ['لمم', 1, []],
  ['كان', 1, 'كَوْن'],
  ['كتب', 1, 'كِتَابَة'],
  ['كسر', 1, 'كَسْر'],
  ['مرض', 1, 'مَرَض'],
  ['نبأ', 4, 'إِنْبَاء'],
  ['نهي', 4, 'إِنْهَاء'],
  ['نهي', 8, 'اِنْتِهَاء'],
  ['هجر', 1, 'هَجْر'],
  ['وصل', 1, 'وَصْل'],
  ['وصل', 8, 'اِتِّصَال'],
  ['وعد', 1, ['وَعْد', 'مَوْعِد']],
  ['وفي', 1, 'وَفَاء'],
  ['وفي', 10, 'اِسْتِفَاء'],
  ['وفي', 4, 'إِيفَاء'],
  ['وقي', 1, 'وِقَايَة'],
  ['ولى', 1, 'وِلَايَة'],
  ['دخل', 1, 'دُخُول'],
  ['ولد', 1, 'وِلادَة'],
  ['ذهب', 1, 'ذَهَاب'],
  ['بيت', 1, 'مَبِيت'],
  ['راح', 1, 'رَوَاح'],
  ['طلب', 1, 'طَلَب'],
  ['لعب', 1, 'لُعْب'],
])('%s (Form %d) masdar is %s', (root, form, expected) => {
  const verb = verbs.find((entry) => entry.root === root && entry.form === form)!
  expect(deriveMasdar(verb)).toEqual([expected].flat())
})

describe('masdar patterns', () => {
  // Source: https://ar.wikipedia.org/wiki/مصدر_ميمي
  test.each([
    ['شرب', ['شُرْب', 'مَشْرَب']],
    ['وعد', ['وَعْد', 'مَوْعِد']],
  ])('%s supports multiple masdar patterns', (root, expected) => {
    expect(deriveMasdar(getVerb(root, 1))).toEqual(expected)
  })

  test.each([
    ['بيت', ['مَبِيت']],
    ['سعى', ['مَسْعَى']],
  ])('%s uses the expected masdar mimi form', (root, expected) => {
    expect(deriveMasdar(getVerb(root, 1))).toEqual(expected)
  })
})

describe('regular roots', () => {
  describe('ك-ت-ب', () => {
    test.each<[VerbForm, string]>([
      [1, 'كِتَابَة'],
      [2, 'تَكْتِيب'],
      [3, 'مُكَاتَبَة'],
      [4, 'إِكْتَاب'],
      [5, 'تَكَتُّب'],
      [6, 'تَكَاتُب'],
      [7, 'اِنْكِتَاب'],
    ])('Form %d masdar is %s', (form, expected) => {
      expect(deriveMasdar(getVerb('كتب', form))).toEqual([expected])
    })
  })
})

describe('assimilated roots', () => {
  describe('و-ع-د', () => {
    test.each<[VerbForm, string | readonly string[]]>([
      [1, ['وَعْد', 'مَوْعِد']],
      [5, ['تَوَعُّد']],
    ])('Form %d masdar is %s', (form, expected) => {
      expect(deriveMasdar(getVerb('وعد', form))).toEqual(expected)
    })
  })
})

describe('hollow roots', () => {
  describe('ق-و-ل', () => {
    test.each<[VerbForm, string]>([
      [1, 'قَوْل'],
      [2, 'تَقْوِيل'],
      [3, 'مُقَاوَلَة'],
      [5, 'تَقَوُّل'],
    ])('Form %d masdar is %s', (form, expected) => {
      expect(deriveMasdar(getVerb('قول', form))).toEqual([expected])
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
    test.each<[VerbForm, string]>([[1, 'أَكْل']])('Form %d active participle is %s', (form, expected) => {
      expect(deriveMasdar(getVerb('أكل', form))).toEqual([expected])
    })
  })

  describe.todo('أ-خ-ذ')
})

describe('hamzated middle roots', () => {
  describe('س-أ-ل', () => {
    test.each<[VerbForm, readonly string[]]>([
      [1, ['سُؤَال']],
      [3, ['مُسَاءَلَة']],
      [6, ['تَسَاؤُل']],
    ])('Form %d masdar is %s', (form, expected) => {
      expect(deriveMasdar(getVerb('سأل', form))).toEqual(expected)
    })
  })
})

describe('hamzated final roots', () => {
  describe('ق-ر-أ', () => {
    test.each<[VerbForm, readonly string[]]>([
      [1, ['قِرَاءَة']],
      [10, ['اِسْتِقْرَاء']],
    ])('Form %d masdar is %s', (form, expected) => {
      expect(deriveMasdar(getVerb('قرأ', form))).toEqual(expected)
    })
  })
})

describe('doubly weak roots', () => {
  describe('و-ف-ي', () => {
    test.each<[VerbForm, string]>([
      [1, 'وَفَاء'],
      [2, 'تَوْفِيَة'],
      [3, 'مُوَافَاءة'],
      [4, 'إِيفَاء'],
      [5, 'تَوَفٍّ'],
      [10, 'اِسْتِفَاء'],
    ])('Form %d masdar is %s', (form, expected) => {
      expect(deriveMasdar(getVerb('وفي', form))).toEqual([expected])
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
