import { describe, expect, test } from 'vitest'
import { getVerb, type VerbForm } from '../verbs'
import { derivePassiveParticiple } from './participle-passive'

test.each<[string, VerbForm, string]>([
  ['أتي', 1, 'مَأْتِيّ'],
  ['أمن', 4, 'مُؤْمَن'],
  ['أذن', 1, 'مَأْذُون'],
  ['أسر', 1, 'مَأْسُور'],
  ['أنشأ', 4, 'مُنْشَأ'],
  ['أوي', 1, 'مَأْوِيّ'],
  ['أوي', 4, 'مُؤْوًى'],
  ['أمم', 1, 'مَأْمُوم'],
  ['باع', 1, 'مَبِيع'],
  ['زور', 1, 'مَزُور'],
  ['دعا', 1, 'مَدْعُوّ'],
  ['بدأ', 1, 'مَبْدُوء'],
  ['أثر', 2, 'مُؤَثَّر'],
  ['أكد', 2, 'مُؤَكَّد'],
  ['ترجم', 1, 'مُتَرْجَم'],
  ['جعل', 1, 'مَجْعُول'],
  ['جمع', 1, 'مَجْمُوع'],
  ['جمع', 2, 'مُجَمَّع'],
  ['أخذ', 8, 'مُتَّخَذ'],
  ['بكي', 1, 'مَبْكِيّ'],
  ['حبب', 2, 'مُحَبَّب'],
  ['حبب', 4, 'مُحَبّ'],
  ['حبب', 1, 'مَحْبُوب'],
  ['حبب', 5, 'مُتَحَبَّب'],
  ['حبب', 6, 'مُتَحَابّ'],
  ['حبب', 10, 'مُسْتَحَبّ'],
  ['تمم', 1, 'مَتْمُوم'],
  ['ظلل', 1, 'مَظْلُول'],
  ['ودد', 1, 'مَوْدُود'],
  ['يمن', 1, 'مَيْمُون'],
  ['يسر', 1, 'مَيْسُور'],
  ['قرح', 8, 'مُقْتَرَح'],
  ['جري', 1, 'مَجْرِيّ'],
  ['ذكر', 1, 'مَذْكُور'],
  ['ذكر', 2, 'مُذَكَّر'],
  ['حضر', 1, 'مَحْضُور'],
  ['حدث', 1, 'مَحْدُوث'],
  ['جبب', 1, 'مَجْبُوب'],
  ['جيد', 1, 'مَجْيُود'],
  ['حول', 1, 'مَحُول'],
  ['قرر', 1, 'مَقْرُور'],
  ['عوم', 1, 'مَعُوم'],
  ['عوز', 1, 'مَعْوُوز'],
  ['ميل', 1, 'مَمْيُول'],
  ['عمل', 1, 'مَعْمُول'],
  ['عمل', 2, 'مُعَمَّل'],
  ['هلل', 1, 'مَهْلُول'],
  ['عنن', 1, 'مَعْنُون'],
  ['ضمن', 1, 'مَضْمُون'],
  ['ضمن', 2, 'مُضَمَّن'],
  ['ضمن', 5, 'مُتَضَمَّن'],
  ['جمع', 5, 'مُتَجَمَّع'],
  ['صبح', 2, 'مُصَبَّح'],
  ['حمم', 10, 'مُسْتَحَمّ'],
  ['دحرج', 1, 'مُدَحْرَج'],
  ['مثل', 1, 'مَمْثُول'],
  ['رأى', 1, 'مَرْئِيّ'],
  ['صغر', 1, 'مَصْغُور'],
  ['ضيف', 10, 'مُسْتَضَاف'],
  ['ضيف', 4, 'مُضَاف'],
  ['طلب', 5, 'مُتَطَلَّب'],
  ['عدد', 4, 'مُعَدّ'],
  ['عطى', 4, 'مُعْطًى'],
  ['عون', 10, 'مُسْتَعَان'],
  ['عون', 3, 'مُعَاوَن'],
  ['عون', 4, 'مُعَان'],
  ['عون', 6, 'مُتَعَاوَن'],
  ['عمل', 10, 'مُسْتَعْمَل'],
  ['غدو', 1, 'مَغْدُوّ'],
  ['غشي', 1, 'مَغْشِيّ'],
  ['نظر', 1, 'مَنْظُور'],
  ['فلت', 4, 'مُفْلَت'],
  ['مكن', 4, 'مُمْكَن'],
  ['قود', 7, 'مُنْقَاد'],
  ['قود', 8, 'مُقْتَاد'],
  ['لمم', 1, 'مَلْمُوم'],
  ['نبأ', 4, 'مُنْبَأ'],
  ['نهي', 4, 'مُنْهًى'],
  ['نهي', 8, 'مُنْتَهَى'],
  ['صبح', 4, 'مُصْبَح'],
  ['يئس', 1, 'مَيْؤُوس'],
  ['يبس', 1, 'مَيْبُوس'],
  ['سعى', 1, 'مَسْعِيّ'],
  ['وصل', 1, 'مَوْصُول'],
  ['وصل', 8, 'مُتَّصَل'],
  ['وعد', 1, 'مَوْعُود'],
  ['وضع', 1, 'مَوْضُوع'],
  ['وثق', 1, 'مَوْثُوق'],
  ['وجز', 1, 'مَوْجُوز'],
  ['وطن', 1, 'مَوْطُون'],
  ['وجب', 1, 'مَوْجُوب'],
  ['وصف', 1, 'مَوْصُوف'],
  ['وفد', 1, 'مَوْفُود'],
  ['ولي', 1, 'مَوْلِيّ'],
  ['وطئ', 1, 'مَوْطُوء'],
  ['وعي', 1, 'مَوْعِيّ'],
  ['وهن', 1, 'مَوْهُون'],
  ['وفي', 10, 'مُسْتَوْفًى'],
  ['وفي', 2, 'مُوَفًّى'],
  ['وفي', 4, 'مُوفًى'],
  ['وفي', 5, 'مُتَوَفًّى'],
  ['مسي', 4, 'مُمْسًى'],
  ['ضحي', 4, 'مُضْحًى'],
  ['حول', 5, 'مُتَحَوَّل'],
  ['وقي', 1, 'مَوْقِيّ'],
  ['ونى', 1, 'مَوْنِيّ'],
  ['وأى', 1, 'مَوْئِيّ'],
  ['ولى', 1, 'مَوْلِيّ'],
  ['بيت', 1, 'مَبِيت'],
  ['صبح', 1, 'مَصْبُوح'],
  ['صير', 1, 'مَصِير'],
])('%s (Form %d) passive participle is %s', (root, form, expected) => {
  expect(derivePassiveParticiple(getVerb(root, form))).toBe(expected)
})

test.each<[string, VerbForm]>([
  ['كان', 1],
  ['أمن', 1],
  ['جلس', 1],
  ['حبط', 1],
  ['حمر', 9],
  ['سعد', 1],
  ['صفر', 9],
  ['طلق', 7],
  ['فجر', 7],
])('%s (Form %d) has no passive participle', (root, form) => {
  const verb = getVerb(root, form)
  expect(derivePassiveParticiple(verb)).toBe('')
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
    test.each<[VerbForm, string]>([
      [1, 'مَوْعُود'],
      [5, 'مُتَوَعَّد'],
    ])('Form %d passive participle is %s', (form, expected) => {
      expect(derivePassiveParticiple(getVerb('وعد', form))).toBe(expected)
    })
  })
})

describe('hollow roots', () => {
  describe('ل-و-م', () => {
    test.each<[VerbForm, string]>([[1, 'مَلُوم']])('Form %d passive participle is %s', (form, expected) => {
      expect(derivePassiveParticiple(getVerb('لوم', form))).toBe(expected)
    })
  })

  describe('ش-ي-د', () => {
    test.each<[VerbForm, string]>([[1, 'مَشِيد']])('Form %d passive participle is %s', (form, expected) => {
      expect(derivePassiveParticiple(getVerb('شيد', form))).toBe(expected)
    })
  })

  describe('ق-و-ل', () => {
    test.each<[VerbForm, string]>([
      [1, 'مَقُول'],
      [2, 'مُقَوَّل'],
      [3, 'مُقَاوَل'],
      [5, 'مُتَقَوَّل'],
    ])('Form %d passive participle is %s', (form, expected) => {
      expect(derivePassiveParticiple(getVerb('قول', form))).toBe(expected)
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
    test.each<[VerbForm, string]>([[1, 'مَأْكُول']])('Form %d active participle is %s', (form, expected) => {
      expect(derivePassiveParticiple(getVerb('أكل', form))).toBe(expected)
    })
  })

  describe('أ-خ-ذ', () => {
    test.each<[VerbForm, string]>([[1, 'مَأْخُوذ']])('Form %d passive participle is %s', (form, expected) => {
      expect(derivePassiveParticiple(getVerb('أخذ', form))).toBe(expected)
    })
  })
})

describe('hamzated middle roots', () => {
  describe('س-أ-ل', () => {
    test('سَأَلَ (Form I)', () => {
      expect(derivePassiveParticiple(getVerb('سأل', 1))).toBe('مَسْؤُول')
    })

    test('سَاءَلَ (Form III)', () => {
      expect(derivePassiveParticiple(getVerb('سأل', 3))).toBe('مُسَاءَل')
    })

    test('تَسَاءَلَ (Form VI)', () => {
      expect(derivePassiveParticiple(getVerb('سأل', 6))).toBe('مُتَسَاءَل')
    })
  })
})

describe('hamzated final roots', () => {
  describe('ق-ر-أ', () => {
    test.each<[VerbForm, string]>([
      [1, 'مَقْرُوء'],
      [10, 'مُسْتَقْرَأ'],
    ])('Form %d passive participle is %s', (form, expected) => {
      expect(derivePassiveParticiple(getVerb('قرأ', form))).toBe(expected)
    })
  })
})

describe('doubly weak roots', () => {
  describe('و-ف-ي', () => {
    test.each<[VerbForm, string]>([
      [1, 'مَوْفِيّ'],
      [2, 'مُوَفًّى'],
      [3, 'مُوَافًى'],
      [4, 'مُوفًى'],
      [5, 'مُتَوَفًّى'],
      [10, 'مُسْتَوْفًى'],
    ])('Form %d passive participle is %s', (form, expected) => {
      expect(derivePassiveParticiple(getVerb('وفي', form))).toBe(expected)
    })
  })

  describe('ر-و-ي', () => {
    test('رَوِيَ (Form I)', () => {
      expect(derivePassiveParticiple(getVerb('روي', 1))).toBe('مَرْوِيّ')
    })
  })
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
