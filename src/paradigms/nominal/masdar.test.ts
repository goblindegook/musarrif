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
  ['أنشأ', 4, 'إِنْشَاء'],
  ['أوي', 1, 'إِوِيّ'],
  ['أوي', 10, 'اِسْتِئْواء'],
  ['أوي', 4, 'إِيوَاء'],
  ['أوي', 5, 'تَأَوِّي'],
  ['بدأ', 1, 'بَدْء'],
  ['بدل', 1, 'بَدْل'],
  ['بدل', 2, 'تَبْدِيل'],
  ['ترجم', 1, 'تَرْجَمَة'],
  ['جلس', 1, 'جُلُوس'],
  ['جمع', 1, 'جَمْع'],
  ['جيء', 1, 'مَجِيء'],
  ['جيء', 6, 'تَجَاءٍ'],
  ['حبط', 1, 'حُبُوط'],
  ['حسب', 1, 'حَسَب'],
  ['حضر', 1, 'حُضُور'],
  ['حلق', 1, 'حَلْق'],
  ['حمر', 9, 'اِحْمِرَار'],
  ['خرج', 1, 'خُرُوج'],
  ['خسر', 1, 'خُسْر'],
  ['درس', 1, 'دَرْس'],
  ['درس', 10, 'اِسْتِدْرَاس'],
  ['دعى', 10, 'اِسْتِدْعَاء'],
  ['رأى', 1, 'رُؤْيَة'],
  ['ركز', 1, 'رَكْز'],
  ['سعد', 1, 'سَعَادَة'],
  ['شرب', 1, 'شُرْب'],
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
  ['غدو', 1, 'غِادَوةو'],
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
  ['قسم', 1, 'قِسْمَة'],
  ['قفز', 1, 'قَفْز'],
  ['قود', 3, 'مُقَاوَدَة'],
  ['قود', 4, 'إِقَادَة'],
  ['قود', 7, 'اِنْقِيَاد'],
  ['قود', 8, 'اِقْتِيَاد'],
  ['قوم', 1, 'قِيَام'],
  ['كتب', 1, 'كِتَابَة'],
  ['كسر', 1, 'كَسْر'],
  ['مرض', 1, 'مَرَض'],
  ['نبأ', 4, 'إِنْبَاء'],
  ['نهي', 4, 'إِنْهَاء'],
  ['نهي', 8, 'اِنْتِهَاء'],
  ['هجر', 1, 'هَجْر'],
  ['وصل', 1, 'وَصْل'],
  ['وصل', 8, 'اِتِّصَال'],
  ['وعد', 1, 'وَعْد'],
  ['وفي', 1, 'وَفَاء'],
  ['وفي', 10, 'اِسْتِفَاء'],
  ['وفي', 4, 'إِيفَاء'],
  ['وقي', 1, 'وِقَايَة'],
  ['ولى', 1, 'وِلَايَة'],
  ['دخل', 1, 'دُخُول'],
  ['ولد', 1, 'وِلادَة'],
  ['ذهب', 1, 'ذَهَاب'],
])('%s (Form %d) masdar is %s', (root, form, expected) => {
  const verb = verbs.find((entry) => entry.root === root && entry.form === form)!
  expect(deriveMasdar(verb)).toBe(expected)
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
      expect(deriveMasdar(getVerb('كتب', form))).toBe(expected)
    })
  })
})

describe('assimilated roots', () => {
  describe('و-ع-د', () => {
    test.each<[VerbForm, string]>([
      [1, 'وَعْد'],
      [5, 'تَوَعُّد'],
    ])('Form %d masdar is %s', (form, expected) => {
      expect(deriveMasdar(getVerb('وعد', form))).toBe(expected)
    })
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
