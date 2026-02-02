import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { deriveActiveParticiple } from './participle-active'

describe('active participle', () => {
  describe('Form I', () => {
    describe('regular roots', () => {
      test.each([
        ['ترجم', 'مُتَرْجِم'],
        ['جعل', 'جَاعِل'],
        ['جمع', 'جَامِع'],
        ['دعم', 'دَاعِم'],
        ['بعد', 'بَعِيد'],
        ['ذكر', 'ذَاكِر'],
        ['حضر', 'حَاضِر'],
        ['حدث', 'حَادِث'],
        ['عمل', 'عَامِل'],
        ['ضمن', 'ضَامِن'],
        ['حبط', 'حَابِط'],
        ['حسب', 'حَاسِب'],
        ['دحرج', 'مُدَحْرِج'],
        ['مثل', 'مَاثِل'],
        ['سعد', 'سَعِيد'],
        ['صعد', 'صَاعِد'],
        ['صغر', 'صَاغِر'],
        ['نظر', 'نَاظِر'],
        ['صبح', 'صَابِح'],
        ['نفس', 'نَافِس'],
        ['مكن', 'مَاكِن'],
        ['كتب', 'كَاتِب'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'حَابّ'],
        ['تمم', 'تَامّ'],
        ['ظلل', 'ظَالّ'],
        ['ودد', 'وَادّ'],
        ['جبب', 'جَابّ'],
        ['قرر', 'قَارّ'],
        ['هلل', 'هَالّ'],
        ['عنن', 'عَانّ'],
        ['لمم', 'لَامّ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['يمن', 'يَامِن'],
        ['يسر', 'يَاسِر'],
        ['يبس', 'يَابِس'],
        ['وصل', 'وَاصِل'],
        ['وعد', 'وَاعِد'],
        ['وضع', 'وَاضِع'],
        ['وثق', 'وَاثِق'],
        ['وجز', 'وَاجِز'],
        ['وطن', 'وَاطِن'],
        ['وجب', 'وَاجِب'],
        ['وصف', 'وَاصِف'],
        ['وفد', 'وَافِد'],
        ['وهن', 'وَاهِن'],
        ['وقف', 'وَاقِف'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['باع', 'بَائِع'],
        ['زور', 'زَائِر'],
        ['جيد', 'جَايِد'],
        ['حول', 'حَائِل'],
        ['عوم', 'عَائِم'],
        ['عوز', 'عَاوِز'],
        ['ميل', 'مَايِل'],
        ['كان', 'كَائِن'],
        ['بيت', 'بَائِت'],
        ['صير', 'صَائِر'],
        ['لوم', 'لَائِم'],
        ['شيد', 'شَائِد'],
        ['قول', 'قَائِل'],
        ['خور', 'خَاوِر'],
        ['خوف', 'خَائِف'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['دعا', 'دَاعٍ'],
        ['جري', 'جَارٍ'],
        ['بدو', 'بَادٍ'],
        ['جدو', 'جَادٍ'],
        ['لهو', 'لَاهٍ'],
        ['علي', 'عَالٍ'],
        ['شفي', 'شَافٍ'],
        ['بكي', 'بَاكٍ'],
        ['غدو', 'غَادٍ'],
        ['غشي', 'غَاشٍ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['ولي', 'وَالٍ'],
        ['وعي', 'وَاعٍ'],
        ['وقي', 'وَاقٍ'],
        ['ونى', 'وَانٍ'],
        ['ولى', 'وَالٍ'],
        ['وفي', 'وَافٍ'],
        ['قوي', 'قَاوٍ'],
        ['جوي', 'جَاوٍ'],
        ['روي', 'رَاوٍ'],
        ['روى', 'رَاوٍ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أذن', 'آذِن'],
        ['أسر', 'آسِر'],
        ['أكل', 'آكِل'],
        ['أخذ', 'آخِذ'],
        ['أمر', 'آمِر'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hamzated initial hollow roots', () => {
      test.each([['أول', 'آئِل']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([
        ['أمم', 'آمّ'],
        ['أدد', 'آدّ'],
        ['أجج', 'آجّ'],
        ['أزز', 'آزّ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([
        ['أتي', 'آتٍ'],
        ['أبي', 'آبٍ'],
        ['أني', 'آنٍ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hamzated hollow-defective roots', () => {
      test.each([['أوي', 'آوٍ']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hamzated middle roots', () => {
      test.each([
        ['يئس', 'يَائِس'],
        ['بءس', 'بَائِس'],
        ['سأل', 'سَائِل'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hamzated middle defective roots', () => {
      test.each([
        ['رأى', 'رَاءٍ'],
        ['وأى', 'وَاءٍ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['بدأ', 'بَادِئ'],
        ['قرأ', 'قَارِئ'],
        ['جرء', 'جَرِيء'],
        ['كلأ', 'كَالِئ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([
        ['جيء', 'جَاءٍ'],
        ['بوء', 'بَاءٍ'],
        ['نوء', 'نَاءٍ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hamzated final assimilated roots', () => {
      test.each([['وطء', 'وَاطِئ']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('rules', () => {
      test('use faa3il when the masdar is fu3ool', () => {
        expect(deriveActiveParticiple(getVerb('حبط', 1))).toBe('حَابِط')
      })

      test('use fa3eel when the masdar is not fu3ool', () => {
        expect(deriveActiveParticiple(getVerb('سعد', 1))).toBe('سَعِيد')
      })
    })
  })

  describe('Form II', () => {
    describe('regular roots', () => {
      test.each([
        ['جمع', 'مُجَمِّع'],
        ['ذكر', 'مُذَكِّر'],
        ['عمل', 'مُعَمِّل'],
        ['ضمن', 'مُضَمِّن'],
        ['صبح', 'مُصَبِّح'],
        ['كتب', 'مُكَتِّب'],
        ['مكن', 'مُمَكِّن'],
        ['مثل', 'مُمَثِّل'],
        ['سبب', 'مُسَبِّب'],
        ['خطط', 'مُخَطِّط'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 2))).toBe(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وطن', 'مُوَطِّن'],
        ['وجه', 'مُوَجِّه'],
        ['وسط', 'مُوَسِّط'],
        ['وقف', 'مُوَقِّف'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 2))).toBe(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'مُحَبِّب'],
        ['حدد', 'مُحَدِّد'],
        ['قرر', 'مُقَرِّر'],
        ['شدد', 'مُشَدِّد'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 2))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قول', 'مُقَوِّل'],
        ['قوس', 'مُقَوِّس'],
        ['كون', 'مُكَوِّن'],
        ['دون', 'مُدَوِّن'],
        ['سوف', 'مُسَوِّف'],
        ['كيف', 'مُكَيِّف'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 2))).toBe(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['يود', 'مُيَوِّد'],
        ['وفي', 'مُوَفٍّ'],
        ['وصي', 'مُوَصٍّ'],
        ['ولي', 'مُوَلٍّ'],
        ['وري', 'مُوَرٍّ'],
        ['مني', 'مُمَنٍّ'],
        ['سمي', 'مُسَمٍّ'],
        ['غطي', 'مُغَطٍّ'],
        ['غني', 'مُغَنٍّ'],
        ['قوي', 'مُقَوٍّ'],
        ['زوي', 'مُزَوٍّ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 2))).toBe(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أثر', 'مُؤَثِّر'],
        ['أكد', 'مُؤَكِّد'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 2))).toBe(expected)
      })
    })

    describe('hamzated final assimilated roots', () => {
      test.each([['وطء', 'مُوَطِّئ']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 2))).toBe(expected)
      })
    })
  })

  describe('Form III', () => {
    describe('regular roots', () => {
      test.each([['كتب', 'مُكَاتِب']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 3))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عون', 'مُعَاوِن'],
        ['قول', 'مُقَاوِل'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 3))).toBe(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([['وفي', 'مُوَافٍ']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 3))).toBe(expected)
      })
    })

    describe('hamzated middle roots', () => {
      test.each([['سأل', 'مُسَائِل']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 3))).toBe(expected)
      })
    })
  })

  describe('Form IV', () => {
    describe('regular roots', () => {
      test.each([
        ['فلت', 'مُفْلِت'],
        ['مكن', 'مُمْكِن'],
        ['صبح', 'مُصْبِح'],
        ['كتب', 'مُكْتِب'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'مُحِبّ'],
        ['عدد', 'مُعِدّ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['ضيف', 'مُضِيف'],
        ['عون', 'مُعِين'],
        ['قود', 'مُقِيد'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['عطى', 'مُعْطٍ'],
        ['مسي', 'مُمْسٍ'],
        ['ضحي', 'مُضْحٍ'],
        ['نهي', 'مُنْهٍ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'مُوفٍ'],
        ['وفي', 'مُوفٍ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أمن', 'مُؤْمِن'],
        ['أنشأ', 'مُنْشِئ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('hamzated hollow-defective roots', () => {
      test.each([['أوي', 'مُؤْوٍ']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['نبأ', 'مُنْبِئ']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })
  })

  describe('Form V', () => {
    describe('regular roots', () => {
      test.each([
        ['ضمن', 'مُتَضَمِّن'],
        ['جمع', 'مُتَجَمِّع'],
        ['طلب', 'مُتَطَلِّب'],
        ['كتب', 'مُتَكَتِّب'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([['حبب', 'مُتَحَبِّب']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([['وعد', 'مُتَوَعِّد']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['حول', 'مُتَحَوِّل'],
        ['قول', 'مُتَقَوِّل'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'مُتَوَفٍّ'],
        ['وفي', 'مُتَوَفٍّ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })
  })

  describe('Form VI', () => {
    describe('regular roots', () => {
      test.each([['كتب', 'مُتَكَاتِب']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 6))).toBe(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([['حبب', 'مُتَحَابّ']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 6))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([['عون', 'مُتَعَاوِن']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 6))).toBe(expected)
      })
    })

    describe('hamzated middle roots', () => {
      test.each([['سأل', 'مُتَسَائِل']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 6))).toBe(expected)
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([['جيء', 'مُتَجَاءٍ']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 6))).toBe(expected)
      })
    })
  })

  describe('Form VII', () => {
    describe('regular roots', () => {
      test.each([['كتب', 'مُنْكَتِب']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 7))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([['قود', 'مُنْقَاد']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 7))).toBe(expected)
      })
    })
  })

  describe('Form VIII', () => {
    describe('regular roots', () => {
      test.each([['قرح', 'مُقْتَرِح']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 8))).toBe(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([['وصل', 'مُتَّصِل']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 8))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([['قود', 'مُقْتَاد']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 8))).toBe(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['أخذ', 'مُتَّخِذ']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 8))).toBe(expected)
      })
    })
  })

  describe('Form IX', () => {
    describe('regular roots', () => {
      test.each([
        ['حمر', 'مُحْمَرّ'],
        ['صفر', 'مُصْفَرّ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 9))).toBe(expected)
      })
    })
  })

  describe('Form X', () => {
    describe('regular roots', () => {
      test.each([['عمل', 'مُسْتَعْمِل']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 10))).toBe(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'مُسْتَحِبّ'],
        ['حمم', 'مُسْتَحِمّ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 10))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['ضيف', 'مُسْتَضِيف'],
        ['عون', 'مُسْتَعِين'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 10))).toBe(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'مُسْتَوْفٍ'],
        ['وفي', 'مُسْتَوْفٍ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 10))).toBe(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['قرأ', 'مُسْتَقْرِئ']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 10))).toBe(expected)
      })
    })
  })
})
