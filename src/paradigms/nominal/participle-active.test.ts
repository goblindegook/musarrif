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
        ['كلم', 'كَالِم'],
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
        ['بلغ', 'بَالِغ'],
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
        ['موت', 'مَائِت'],
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
        ['وري', 'وَارٍ'],
        ['وني', 'وَانٍ'],
        ['وفي', 'وَافٍ'],
        ['قوي', 'قَاوٍ'],
        ['جوي', 'جَاوٍ'],
        ['روي', 'رَاوٍ'],
        ['روي', 'رَاوٍ'],
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
        ['رءي', 'رَاءٍ'],
        ['وءي', 'وَاءٍ'],
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
        ['أول', 'مُؤَوِّل'],
        ['أوب', 'مُؤَوِّب'],
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
        ['حيي', 'مُحَيٍّ'],
        ['غطي', 'مُغَطٍّ'],
        ['غني', 'مُغَنٍّ'],
        ['قوي', 'مُقَوٍّ'],
        ['زوي', 'مُزَوٍّ'],
        ['هوي', 'مُهَوٍّ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 2))).toBe(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أثر', 'مُؤَثِّر'],
        ['أجج', 'مُؤَجِّج'],
        ['أكد', 'مُؤَكِّد'],
        ['أيد', 'مُؤَيِّد'],
        ['أسس', 'مُؤَسِّس'],
        ['أخر', 'مُؤَخِّر'],
        ['أمر', 'مُؤَمِّر'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 2))).toBe(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([
        ['أذي', 'مُؤَذٍّ'],
        ['أسي', 'مُؤَسٍّ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 2))).toBe(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['هنأ', 'مُهَنِّئ']])('%s', (root, expected) => {
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
      test.each([
        ['كتب', 'مُكَاتِب'],
        ['عمل', 'مُعَامِل'],
        ['كلم', 'مُكَالِم'],
        ['تبع', 'مُتَابِع'],
        ['بلغ', 'مُبَالِغ'],
        ['سعد', 'مُسَاعِد'],
        ['صحب', 'مُصَاحِب'],
        ['وجه', 'مُوَاجِه'],
        ['وثق', 'مُوَاثِق'],
        ['وعد', 'مُوَاعِد'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 3))).toBe(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['سرر', 'مُسَارّ'],
        ['ردد', 'مُرَادّ'],
        ['مدد', 'مُمَادّ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 3))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عون', 'مُعَاوِن'],
        ['قول', 'مُقَاوِل'],
        ['قوم', 'مُقَاوِم'],
        ['عود', 'مُعَاوِد'],
        ['جوز', 'مُجَاوِز'],
        ['نول', 'مُنَاوِل'],
        ['ضيق', 'مُضَايِق'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 3))).toBe(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'مُوَافٍ'],
        ['وزي', 'مُوَازٍ'],
        ['وسي', 'مُوَاسٍ'],
        ['نوي', 'مُنَاوٍ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 3))).toBe(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['ندي', 'مُنَادٍ'],
        ['رعي', 'مُرَاعٍ'],
        ['بلي', 'مُبَالٍ'],
        ['قضي', 'مُقَاضٍ'],
        ['بري', 'مُبَارٍ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 3))).toBe(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخذ', 'مُؤَاخِذ'],
        ['أجر', 'مُؤَاجِر'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 3))).toBe(expected)
      })
    })

    describe('hamzated middle roots', () => {
      test.each([
        ['سأل', 'مُسَائِل'],
        ['وأم', 'مُوَائِم'],
        ['لأم', 'مُلَائِم'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 3))).toBe(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['فجأ', 'مُفَاجِئ']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 3))).toBe(expected)
      })
    })
  })

  describe('Form IV', () => {
    describe('regular roots', () => {
      test.each([
        ['كثر', 'مُكْثِر'],
        ['علم', 'مُعْلِم'],
        ['لحق', 'مُلْحِق'],
        ['فلت', 'مُفْلِت'],
        ['مكن', 'مُمْكِن'],
        ['صبح', 'مُصْبِح'],
        ['وقف', 'مُوْقِف'],
        ['وقع', 'مُوْقِع'],
        ['ولد', 'مُوْلِد'],
        ['وصل', 'مُوْصِل'],
        ['وضح', 'مُوْضِح'],
        ['كتب', 'مُكْتِب'],
        ['عرب', 'مُعْرِب'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['تمم', 'مُتِمّ'],
        ['سفف', 'مُسِفّ'],
        ['حبب', 'مُحِبّ'],
        ['عدد', 'مُعِدّ'],
        ['همم', 'مُهِمّ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['ضيف', 'مُضِيْف'],
        ['عون', 'مُعِيْن'],
        ['قود', 'مُقِيْد'],
        ['شور', 'مُشِيْر'],
        ['رود', 'مُرِيْد'],
        ['تيح', 'مُتِيْح'],
        ['فيد', 'مُفِيْد'],
        ['عود', 'مُعِيْد'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['علي', 'مُعْلٍ'],
        ['بقي', 'مُبْقٍ'],
        ['سمي', 'مُسْمٍ'],
        ['عطي', 'مُعْطٍ'],
        ['لقي', 'مُلْقٍ'],
        ['مسي', 'مُمْسٍ'],
        ['ضحي', 'مُضْحٍ'],
        ['نهي', 'مُنْهٍ'],
        ['حيي', 'مُحْيٍ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['ومأ', 'مُوْمِئ']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وصي', 'مُوْصٍ'],
        ['وحي', 'مُوْحٍ'],
        ['وفي', 'مُوْفٍ'],
        ['وري', 'مُوْرٍ'],
        ['ودي', 'مُوْدٍ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أذن', 'مُؤْذِن'],
        ['أمن', 'مُؤْمِن'],
        ['ألم', 'مُؤْلِم'],
        ['أجر', 'مُؤْجِر'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([['أتي', 'مُؤْتٍ']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('hamzated hollow-defective roots', () => {
      test.each([['أوي', 'مُؤْوٍ']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['نشأ', 'مُنْشِئ'],
        ['نبأ', 'مُنْبِئ'],
        ['ضوء', 'مُضِيْء'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })
  })

  describe('Form V', () => {
    describe('regular roots', () => {
      test.each([
        ['ضمن', 'مُتَضَمِّن'],
        ['جمع', 'مُتَجَمِّع'],
        ['حدث', 'مُتَحَدِّث'],
        ['مثل', 'مُتَمَثِّل'],
        ['عرف', 'مُتَعَرِّف'],
        ['طلب', 'مُتَطَلِّب'],
        ['كتب', 'مُتَكَتِّب'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخر', 'مُتَأَخِّر'],
        ['ألف', 'مُتَأَلِّف'],
        ['أكد', 'مُتَأَكِّد'],
        ['أكل', 'مُتَأَكِّل'],
        ['أثر', 'مُتَأَثِّر'],
        ['أوه', 'مُتَأَوِّه'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([['أمم', 'مُتَأَمِّم']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([['أذي', 'مُتَأَذٍّ']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'مُتَحَبِّب'],
        ['هدد', 'مُتَهَدِّد'],
        ['حدد', 'مُتَحَدِّد'],
        ['عزز', 'مُتَعَزِّز'],
        ['سبب', 'مُتَسَبِّب'],
        ['قرر', 'مُتَقَرِّر'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وعد', 'مُتَوَعِّد'],
        ['وصل', 'مُتَوَصِّل'],
        ['وفر', 'مُتَوَفِّر'],
        ['وقف', 'مُتَوَقِّف'],
        ['وكأ', 'مُتَوَكِّئ'],
        ['وقع', 'مُتَوَقِّع'],
        ['وسع', 'مُتَوَسِّع'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['حول', 'مُتَحَوِّل'],
        ['قول', 'مُتَقَوِّل'],
        ['عين', 'مُتَعَيِّن'],
        ['غير', 'مُتَغَيِّر'],
        ['طور', 'مُتَطَوِّر'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['بقي', 'مُتَبَقٍّ'],
        ['سني', 'مُتَسَنٍّ'],
        ['بني', 'مُتَبَنٍّ'],
        ['حدي', 'مُتَحَدٍّ'],
        ['سمي', 'مُتَسَمٍّ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'مُتَوَفٍ'],
        ['وقي', 'مُتَوَقٍ'],
        ['وخي', 'مُتَوَخٍ'],
        ['زوي', 'مُتَزَوٍّ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([
        ['هيء', 'مُتَهَيِّئ'],
        ['ضوء', 'مُتَضَوِّئ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })
  })

  describe('Form VI', () => {
    describe('regular roots', () => {
      test.each([
        ['كتب', 'مُتَكَاتِب'],
        ['عمل', 'مُتَعَامِل'],
        ['كمل', 'مُتَكَامِل'],
        ['شرك', 'مُتَشَارِك'],
        ['علج', 'مُتَعَالِج'],
        ['قسم', 'مُتَقَاسِم'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 6))).toBe(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'مُتَحَابّ'],
        ['مسس', 'مُتَمَاسّ'],
        ['ضدد', 'مُتَضَادّ'],
        ['ردد', 'مُتَرَادّ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 6))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عون', 'مُتَعَاوِن'],
        ['نول', 'مُتَنَاوِل'],
        ['فوض', 'مُتَفَاوِض'],
        ['جوز', 'مُتَجَاوِز'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 6))).toBe(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['نمو', 'مُتَنَامٍ'],
        ['مشي', 'مُتَمَاشٍ'],
        ['عفو', 'مُتَعَافٍ'],
        ['هوي', 'مُتَهَاوٍ'],
        ['ولي', 'مُتَوَالٍ'],
        ['وصي', 'مُتَوَاصٍ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 6))).toBe(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وفق', 'مُتَوَافِق'],
        ['وجه', 'مُتَوَاجِه'],
        ['وفر', 'مُتَوَافِر'],
        ['وجد', 'مُتَوَاجِد'],
        ['وزن', 'مُتَوَازِن'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 6))).toBe(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ألف', 'مُتَآلِف'],
        ['أكل', 'مُتَآكِل'],
        ['أمر', 'مُتَآمِر'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 6))).toBe(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['بطأ', 'مُتَبَاطِئ'],
        ['وطء', 'مُتَوَاطِئ'],
      ])('%s', (root, expected) => {
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
      test.each([
        ['كتب', 'مُنْكَتِب'],
        ['خفض', 'مُنْخَفِض'],
        ['عكس', 'مُنْعَكِس'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 7))).toBe(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['قرأ', 'مُنْقَرِئ']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 7))).toBe(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['قصص', 'مُنْقَصّ'],
        ['بثث', 'مُنْبَثّ'],
        ['كفف', 'مُنْكَفّ'],
        ['دسس', 'مُنْدَسّ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 7))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قود', 'مُنْقَاد'],
        ['هيل', 'مُنْهَال'],
        ['حوز', 'مُنْحَاز'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 7))).toBe(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['قضي', 'مُنْقَضٍ'],
        ['حني', 'مُنْحَنٍ'],
        ['ثني', 'مُنْثَنٍ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 7))).toBe(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([['زوي', 'مُنْزَوٍ']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 7))).toBe(expected)
      })
    })
  })

  describe('Form VIII', () => {
    describe('regular roots', () => {
      test.each([
        ['قرح', 'مُقْتَرِح'],
        ['عبر', 'مُعْتَبِر'],
        ['عمد', 'مُعْتَمِد'],
        ['نظر', 'مُنْتَظِر'],
        ['ضلع', 'مُضْطَلِع'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 8))).toBe(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['ضرر', 'مُضْطَرّ'],
        ['حلل', 'مُحْتَلّ'],
        ['مدد', 'مُمْتَدّ'],
        ['حجج', 'مُحْتَجّ'],
        ['ردد', 'مُرْتَدّ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 8))).toBe(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([['وصل', 'مُتَّصِل']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 8))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قود', 'مُقْتَاد'],
        ['زوج', 'مُزْدَوِج'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 8))).toBe(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['دعو', 'مُدَّعٍ'],
        ['قضي', 'مُقْتَضٍ'],
        ['ردي', 'مُرْتَدٍ'],
        ['شري', 'مُشْتَرٍ'],
        ['خفي', 'مُخْتَفٍ'],
      ])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 8))).toBe(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['أخذ', 'مُتَّخِذ']])('%s', (root, expected) => {
        expect(deriveActiveParticiple(getVerb(root, 8))).toBe(expected)
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([['أمم', 'مُؤْتَمّ']])('%s', (root, expected) => {
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
