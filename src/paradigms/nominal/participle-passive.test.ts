import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { derivePassiveParticiple } from './participle-passive'

describe('passive participle', () => {
  describe('Form I', () => {
    describe('regular roots', () => {
      test.each([
        ['ترجم', 'مُتَرْجَم'],
        ['جعل', 'مَجْعُول'],
        ['دعم', 'مَدْعُوم'],
        ['بعد', 'مَبْعُود'],
        ['جمع', 'مَجْمُوع'],
        ['ذكر', 'مَذْكُور'],
        ['حضر', 'مَحْضُور'],
        ['حدث', 'مَحْدُوث'],
        ['عمل', 'مَعْمُول'],
        ['ضمن', 'مَضْمُون'],
        ['دحرج', 'مُدَحْرَج'],
        ['مثل', 'مَمْثُول'],
        ['صغر', 'مَصْغُور'],
        ['نظر', 'مَنْظُور'],
        ['صبح', 'مَصْبُوح'],
        ['كتب', 'مَكْتُوب'],
        ['جلس', ''],
        ['حبط', ''],
        ['سعد', ''],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'مَحْبُوب'],
        ['تمم', 'مَتْمُوم'],
        ['ظلل', 'مَظْلُول'],
        ['ودد', 'مَوْدُود'],
        ['جبب', 'مَجْبُوب'],
        ['قرر', 'مَقْرُور'],
        ['هلل', 'مَهْلُول'],
        ['عنن', 'مَعْنُون'],
        ['لمم', 'مَلْمُوم'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['يمن', 'مَيْمُون'],
        ['يسر', 'مَيْسُور'],
        ['يبس', 'مَيْبُوس'],
        ['وصل', 'مَوْصُول'],
        ['وعد', 'مَوْعُود'],
        ['وضع', 'مَوْضُوع'],
        ['وثق', 'مَوْثُوق'],
        ['وجز', 'مَوْجُوز'],
        ['وطن', 'مَوْطُون'],
        ['وجب', 'مَوْجُوب'],
        ['وصف', 'مَوْصُوف'],
        ['وفد', 'مَوْفُود'],
        ['وهن', 'مَوْهُون'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['باع', 'مَبِيع'],
        ['زور', 'مَزُور'],
        ['جيد', 'مَجْيُود'],
        ['حول', 'مَحُول'],
        ['عوم', 'مَعُوم'],
        ['عوز', 'مَعْوُوز'],
        ['ميل', 'مَمْيُول'],
        ['بيت', 'مَبِيت'],
        ['صير', 'مَصِير'],
        ['لوم', 'مَلُوم'],
        ['شيد', 'مَشِيد'],
        ['قول', 'مَقُول'],
        ['كان', ''],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['دعا', 'مَدْعُوّ'],
        ['بكي', 'مَبْكِيّ'],
        ['جري', 'مَجْرِيّ'],
        ['غدو', 'مَغْدُوّ'],
        ['غشي', 'مَغْشِيّ'],
        ['سعى', 'مَسْعِيّ'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['ولي', 'مَوْلِيّ'],
        ['وعي', 'مَوْعِيّ'],
        ['وقي', 'مَوْقِيّ'],
        ['ونى', 'مَوْنِيّ'],
        ['ولى', 'مَوْلِيّ'],
        ['وفي', 'مَوْفِيّ'],
        ['روي', 'مَرْوِيّ'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أذن', 'مَأْذُون'],
        ['أسر', 'مَأْسُور'],
        ['أكل', 'مَأْكُول'],
        ['أخذ', 'مَأْخُوذ'],
        ['أمن', ''],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([['أمم', 'مَأْمُوم']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([['أتي', 'مَأْتِيّ']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hamzated hollow-defective roots', () => {
      test.each([['أوي', 'مَأْوِيّ']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hamzated middle roots', () => {
      test.each([
        ['يئس', 'مَيْؤُوس'],
        ['سأل', 'مَسْؤُول'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hamzated middle defective roots', () => {
      test.each([
        ['رأى', 'مَرْئِيّ'],
        ['وأى', 'مَوْئِيّ'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['بدأ', 'مَبْدُوء'],
        ['قرأ', 'مَقْرُوء'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hamzated final assimilated roots', () => {
      test.each([['وطئ', 'مَوْطُوء']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })
  })

  describe('Form II', () => {
    describe('regular roots', () => {
      test.each([
        ['جمع', 'مُجَمَّع'],
        ['ذكر', 'مُذَكَّر'],
        ['عمل', 'مُعَمَّل'],
        ['ضمن', 'مُضَمَّن'],
        ['صبح', 'مُصَبَّح'],
        ['كتب', 'مُكَتَّب'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 2))).toBe(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([['حبب', 'مُحَبَّب']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 2))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([['قول', 'مُقَوَّل']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 2))).toBe(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'مُوَفًّى'],
        ['وفي', 'مُوَفًّى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 2))).toBe(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أثر', 'مُؤَثَّر'],
        ['أكد', 'مُؤَكَّد'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 2))).toBe(expected)
      })
    })
  })

  describe('Form III', () => {
    describe('regular roots', () => {
      test.each([['كتب', 'مُكَاتَب']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 3))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عون', 'مُعَاوَن'],
        ['قول', 'مُقَاوَل'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 3))).toBe(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([['وفي', 'مُوَافًى']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 3))).toBe(expected)
      })
    })

    describe('hamzated middle roots', () => {
      test.each([['سأل', 'مُسَاءَل']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 3))).toBe(expected)
      })
    })
  })

  describe('Form IV', () => {
    describe('regular roots', () => {
      test.each([
        ['فلت', 'مُفْلَت'],
        ['مكن', 'مُمْكَن'],
        ['صبح', 'مُصْبَح'],
        ['كتب', 'مُكْتَب'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'مُحَبّ'],
        ['عدد', 'مُعَدّ'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['ضيف', 'مُضَاف'],
        ['عون', 'مُعَان'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['عطى', 'مُعْطًى'],
        ['نهي', 'مُنْهًى'],
        ['مسي', 'مُمْسًى'],
        ['ضحي', 'مُضْحًى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'مُوفًى'],
        ['وفي', 'مُوفًى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أمن', 'مُؤْمَن'],
        ['أنشأ', 'مُنْشَأ'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('hamzated hollow-defective roots', () => {
      test.each([['أوي', 'مُؤْوًى']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['نبأ', 'مُنْبَأ']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })
  })

  describe('Form V', () => {
    describe('regular roots', () => {
      test.each([
        ['ضمن', 'مُتَضَمَّن'],
        ['جمع', 'مُتَجَمَّع'],
        ['طلب', 'مُتَطَلَّب'],
        ['كتب', 'مُتَكَتَّب'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([['حبب', 'مُتَحَبَّب']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([['وعد', 'مُتَوَعَّد']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['حول', 'مُتَحَوَّل'],
        ['قول', 'مُتَقَوَّل'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'مُتَوَفًّى'],
        ['وفي', 'مُتَوَفًّى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })
  })

  describe('Form VI', () => {
    describe('regular roots', () => {
      test.each([['كتب', 'مُتَكَاتَب']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 6))).toBe(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([['حبب', 'مُتَحَابّ']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 6))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([['عون', 'مُتَعَاوَن']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 6))).toBe(expected)
      })
    })

    describe('hamzated middle roots', () => {
      test.each([['سأل', 'مُتَسَاءَل']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 6))).toBe(expected)
      })
    })
  })

  describe('Form VII', () => {
    describe('regular roots', () => {
      test.each([
        ['كتب', 'مُنْكَتَب'],
        ['طلق', ''],
        ['فجر', ''],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 7))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([['قود', 'مُنْقَاد']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 7))).toBe(expected)
      })
    })
  })

  describe('Form VIII', () => {
    describe('regular roots', () => {
      test.each([['قرح', 'مُقْتَرَح']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 8))).toBe(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([['وصل', 'مُتَّصَل']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 8))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([['قود', 'مُقْتَاد']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 8))).toBe(expected)
      })
    })

    describe('defective roots', () => {
      test.each([['نهي', 'مُنْتَهَى']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 8))).toBe(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['أخذ', 'مُتَّخَذ']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 8))).toBe(expected)
      })
    })
  })

  describe('Form IX', () => {
    describe('regular roots', () => {
      test.each([
        ['حمر', ''],
        ['صفر', ''],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 9))).toBe(expected)
      })
    })
  })

  describe('Form X', () => {
    describe('regular roots', () => {
      test.each([['عمل', 'مُسْتَعْمَل']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 10))).toBe(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'مُسْتَحَبّ'],
        ['حمم', 'مُسْتَحَمّ'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 10))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['ضيف', 'مُسْتَضَاف'],
        ['عون', 'مُسْتَعَان'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 10))).toBe(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'مُسْتَوْفًى'],
        ['وفي', 'مُسْتَوْفًى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 10))).toBe(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['قرأ', 'مُسْتَقْرَأ']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 10))).toBe(expected)
      })
    })
  })
})
