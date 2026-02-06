import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { deriveMasdar } from './masdar'

describe('masdar', () => {
  describe('Form I', () => {
    describe('regular roots', () => {
      test.each([
        ['عمل', ['عَمَل', 'مَعْمَل']],
        ['بدل', 'بَدْل'],
        ['ترجم', 'تَرْجَمَة'],
        ['جعل', 'جَعْل'],
        ['جلس', 'جُلُوس'],
        ['جمع', 'جَمْع'],
        ['حدث', 'حُدُوث'],
        ['حبط', 'حُبُوط'],
        ['ذكر', 'ذِكْر'],
        ['ضمن', 'ضَمَان'],
        ['حسب', 'حَسَب'],
        ['حضر', 'حُضُور'],
        ['حلق', 'حَلْق'],
        ['حلم', 'حُلْم'],
        ['دعم', 'دَعْم'],
        ['خرج', 'خُرُوج'],
        ['خسر', 'خُسْر'],
        ['درس', 'دَرْس'],
        ['ركز', 'رَكْز'],
        ['سعد', 'سَعَادَة'],
        ['سفر', 'سَفْر'],
        ['صبح', 'صَبْح'],
        ['صبر', 'صَبْر'],
        ['صدق', 'صِدْق'],
        ['صرح', 'صَرْح'],
        ['صرخ', 'صُرَاخ'],
        ['صرف', 'صَرْف'],
        ['صعد', 'صُعُود'],
        ['نظر', 'نَظَر'],
        ['فعل', 'فِعْل'],
        ['قتل', 'قَتْل'],
        ['قسم', 'قِسْمَة'],
        ['قفز', 'قَفْز'],
        ['قدم', 'قِدَم'],
        ['نفس', 'نَفَس'],
        ['مكن', 'مَكَانَة'],
        ['بلغ', ['بُلُوغ', 'بَلَاغ']],
        ['تبع', ['تَبَع', 'تَبَاعَة', 'مَتْبَع']],
        ['كتب', 'كِتَابَة'],
        ['كسر', 'كَسْر'],
        ['مرض', 'مَرَض'],
        ['مثل', 'مُثُول'],
        ['هجر', 'هَجْر'],
        ['دخل', 'دُخُول'],
        ['ذهب', 'ذَهَاب'],
        ['طلب', 'طَلَب'],
        ['لعب', 'لُعْب'],
        ['شكر', 'شُكْر'],
        ['شرب', ['شُرْب', 'مَشْرَب']],
        ['لزم', []],
        ['بعد', []],
        ['هدم', []],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['تمم', 'تَمّ'],
        ['حبب', 'حُبّ'],
        ['جبب', 'جَبّ'],
        ['عنن', 'عَنّ'],
        ['قرر', 'قَرّ'],
        ['ودد', 'وُدّ'],
        ['خطط', 'خَطّ'],
        ['ظلل', 'ظَلّ'],
        ['لمم', []],
        ['هلل', []],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وصل', 'وَصْل'],
        ['وضع', 'وَضْع'],
        ['يسر', 'يَسْر'],
        ['ولد', 'وِلادَة'],
        ['وطن', 'وَطْن'],
        ['وجب', 'وُجُوب'],
        ['وصف', 'وَصْف'],
        ['وفد', 'وُفُود'],
        ['وهن', 'وَهْن'],
        ['وقف', 'وُقُوف'],
        ['وعد', ['وَعْد', 'مَوْعِد']],
        ['يمن', []],
        ['يبس', []],
        ['وثق', 'وَثَاقَة'],
        ['وجز', []],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['لوم', 'لَوْم'],
        ['ميل', 'مَيَل'],
        ['قوم', 'قِيَام'],
        ['كان', 'كَوْن'],
        ['باع', 'بَيْع'],
        ['زور', 'زَوْر'],
        ['خور', 'خَوَر'],
        ['خوف', 'خَوْف'],
        ['بيت', 'مَبِيت'],
        ['صير', 'صَيْر'],
        ['راح', 'رَوَاح'],
        ['حول', 'حَوْل'],
        ['قول', 'قَوْل'],
        ['شيد', []],
        ['عوز', []],
        ['عوم', []],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('defective roots', () => {
      test.each([
        ['بقي', 'بَقَاء'],
        ['بكي', 'بُكَاء'],
        ['بدو', 'بَدْو'],
        ['جدو', []],
        ['لهو', 'لَهْو'],
        ['علي', 'عَلْي'],
        ['شفي', 'شِفَاء'],
        ['جري', 'جَرْي'],
        ['غدو', 'غُدُوّ'],
        ['دعا', 'دُعَاء'],
        ['سعى', ['مَسْعَى']],
        ['غشي', []],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'وَفَاء'],
        ['وقي', 'وِقَايَة'],
        ['ولى', 'وِلَايَة'],
        ['ولي', 'وَلْي'],
        ['وعي', 'وَعْي'],
        ['قوي', 'قُوَّة'],
        ['روي', []],
        ['روى', 'رِوَايَة'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أمر', 'أَمْر'],
        ['أمن', 'أَمْن'],
        ['أذن', 'أَذَن'],
        ['أسر', 'أَسْر'],
        ['أخذ', 'أَخْذ'],
        ['أكل', 'أَكْل'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([
        ['أمم', 'أَمّ'],
        ['أدد', []],
        ['أجج', []],
        ['أزز', []],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([
        ['أتي', 'إِتْيَان'],
        ['أبي', 'إِبَاء'],
        ['أني', 'إِنًى'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('hamzated hollow-defective roots', () => {
      test.each([['أوي', 'إِوِيّ']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('hamzated middle roots', () => {
      test.each([
        ['يئس', 'يَأْس'],
        ['بءس', 'بَأْس'],
        ['سأل', ['سُؤَال']],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('hamzated middle defective roots', () => {
      test.each([
        ['رأى', 'رُؤْيَة'],
        ['وأى', 'وَأْي'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['بدأ', 'بَدْء'],
        ['قرأ', 'قِرَاءَة'],
        ['جرء', 'جُرْأَة'],
        ['كلأ', []],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([
        ['جيء', 'مَجِيء'],
        ['بوء', 'بَوْء'],
        ['نوء', 'نَوْء'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('hamzated final assimilated roots', () => {
      test.each([['وطء', 'وَطْء']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })
  })

  describe('Form II', () => {
    describe('regular roots', () => {
      test.each([
        ['عمل', 'تَعْمِيل'],
        ['بدل', 'تَبْدِيل'],
        ['جمع', 'تَجْمِيع'],
        ['ذكر', 'تَذْكِير'],
        ['ضمن', 'تَضْمِين'],
        ['صبح', 'تَصْبِيح'],
        ['فعل', 'تَفْعِيل'],
        ['كتب', 'تَكْتِيب'],
        ['مكن', 'تَمْكِين'],
        ['مثل', 'تَمْثِيل'],
        ['سبب', 'تَسْبِيب'],
        ['خطط', 'تَخْطِيط'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 2))).toEqualT([expected].flat())
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وطن', 'تَوْطِين'],
        ['وجه', 'تَوْجِيه'],
        ['وسط', 'تَوْسِيط'],
        ['وقف', 'تَوْقِيف'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 2))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخر', 'تَأْخِير'],
        ['أمر', 'تَأْمِير'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 2))).toEqualT([expected].flat())
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'تَحْبِيب'],
        ['حدد', 'تَحْدِيد'],
        ['قرر', 'تَقْرِير'],
        ['شدد', 'تَشْدِيد'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 2))).toEqualT([expected].flat())
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['طير', 'تَطْيِير'],
        ['قول', 'تَقْوِيل'],
        ['قوس', 'تَقْوِيس'],
        ['كون', 'تَكْوِين'],
        ['دون', 'تَدْوِين'],
        ['سوف', 'تَسْوِيف'],
        ['كيف', 'تَكْيِيف'],
        ['أول', 'تَأْوِيل'],
        ['أوب', 'تَأْوِيب'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 2))).toEqualT([expected].flat())
      })
    })

    describe('hamzated final roots', () => {
      test.each([['هنأ', 'تَهْنِئَة']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 2))).toEqualT([expected].flat())
      })
    })

    describe('defective roots', () => {
      test.each([
        ['غطي', 'تَغْطِيَة'],
        ['غني', 'تَغْنِيَة'],
        ['أذي', 'تَأْذِيَة'],
        ['أسي', 'تَأْسِيَة'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 2))).toEqualT([expected].flat())
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'تَوْفِيَة'],
        ['يود', 'تَيْوِيد'],
        ['وصي', 'تَوْصِيَة'],
        ['ولي', 'تَوْلِيَة'],
        ['وري', 'تَوْرِيَة'],
        ['مني', 'تَمْنِيَة'],
        ['سمي', 'تَسْمِيَة'],
        ['حيي', 'تَحِيَّة'],
        ['قوي', 'تَقْوِيَة'],
        ['زوي', 'تَزْوِيَة'],
        ['هوي', 'تَهْوِيَة'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 2))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أكد', 'تَأْكِيد'],
        ['أجج', 'تَأْجِيج'],
        ['أثر', 'تَأْثِير'],
        ['أسس', 'تَأْسِيس'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 2))).toEqualT([expected].flat())
      })
    })

    describe('hamzated hollow roots', () => {
      test.each([
        ['أود', 'تَأْوِيد'],
        ['أيد', 'تَأْيِيد'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 2))).toEqualT([expected].flat())
      })
    })

    describe('hamzated final assimilated roots', () => {
      test.each([['وطء', 'تَوْطِئَة']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 2))).toEqualT([expected].flat())
      })
    })
  })

  describe('Form III', () => {
    describe('regular roots', () => {
      test.each([
        ['كتب', 'مُكَاتَبَة'],
        ['عمل', 'مُعَامَلَة'],
        ['تبع', 'مُتَابَعَة'],
        ['بلغ', 'مُبَالَغَة'],
        ['سعد', 'مُسَاعَدَة'],
        ['صحب', 'مُصَاحَبَة'],
        ['وجه', 'مُوَاجَهَة'],
        ['وثق', 'مُوَاثَقَة'],
        ['وعد', 'مُوَاعَدَة'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 3))).toEqualT([expected].flat())
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عون', 'مُعَاوَنَة'],
        ['قود', 'مُقَاوَدَة'],
        ['قول', 'مُقَاوَلَة'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 3))).toEqualT([expected].flat())
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'مُوَافَاة'],
        ['وزي', 'مُوَازَاة'],
        ['وسي', 'مُوَاسَاة'],
        ['نوي', 'مُنَاوَاة'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 3))).toEqualT([expected].flat())
      })
    })

    describe('hamzated middle roots', () => {
      test.each([
        ['سأل', ['مُسَاءَلَة']],
        ['وأم', ['مُوَاءَمَة']],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 3))).toEqualT([expected].flat())
      })
    })
  })

  describe('Form IV', () => {
    describe('regular roots', () => {
      test.each([
        ['مكن', 'إِمْكَان'],
        ['صبح', 'إِصْبَاح'],
        ['فعل', 'إِفْعَال'],
        ['فلت', 'إِفْلَات'],
        ['كتب', 'إِكْتَاب'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 4))).toEqualT([expected].flat())
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'إِحْبَاب'],
        ['عدد', 'إِعْدَاد'],
        ['قرر', 'إِقْرَار'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 4))).toEqualT([expected].flat())
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['ضيف', 'إِضَافَة'],
        ['عون', 'إِعَانَة'],
        ['قود', 'إِقَادَة'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 4))).toEqualT([expected].flat())
      })
    })

    describe('defective roots', () => {
      test.each([
        ['عطى', 'إِعْطَاء'],
        ['نهي', 'إِنْهَاء'],
        ['مسي', 'إِمْسَاء'],
        ['ضحي', 'إِضْحَاء'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 4))).toEqualT([expected].flat())
      })
    })

    describe('doubly weak roots', () => {
      test.each([['وفي', 'إِيفَاء']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 4))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أمن', 'إِيمَان'],
        ['أنشأ', 'إِنْشَاء'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 4))).toEqualT([expected].flat())
      })
    })

    describe('hamzated hollow-defective roots', () => {
      test.each([['أوي', 'إِيوَاء']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 4))).toEqualT([expected].flat())
      })
    })

    describe('hamzated final roots', () => {
      test.each([['نبأ', 'إِنْبَاء']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 4))).toEqualT([expected].flat())
      })
    })
  })

  describe('Form V', () => {
    describe('regular roots', () => {
      test.each([
        ['ضمن', 'تَضَمُّن'],
        ['جمع', 'تَجَمُّع'],
        ['طلب', 'تَطَلُّب'],
        ['كتب', 'تَكَتُّب'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 5))).toEqualT([expected].flat())
      })
    })

    describe('geminate roots', () => {
      test.each([['حبب', 'تَحَبُّب']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 5))).toEqualT([expected].flat())
      })
    })

    describe('assimilated roots', () => {
      test.each([['وعد', 'تَوَعُّد']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 5))).toEqualT([expected].flat())
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['حول', 'تَحَوُّل'],
        ['قول', 'تَقَوُّل'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 5))).toEqualT([expected].flat())
      })
    })

    describe('defective roots', () => {
      test.each([['غني', 'تَغَنٍّ']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 5))).toEqualT([expected].flat())
      })
    })

    describe('doubly weak roots', () => {
      test.each([['وفي', 'تَوَفٍّ']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 5))).toEqualT([expected].flat())
      })
    })
  })

  describe('Form VI', () => {
    describe('regular roots', () => {
      test.each([['كتب', 'تَكَاتُب']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 6))).toEqualT([expected].flat())
      })
    })

    describe('geminate roots', () => {
      test.each([['حبب', 'تَحَابُب']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 6))).toEqualT([expected].flat())
      })
    })

    describe('hollow roots', () => {
      test.each([['عون', 'تَعَاوُن']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 6))).toEqualT([expected].flat())
      })
    })

    describe('hamzated middle roots', () => {
      test.each([['سأل', ['تَسَاؤُل']]])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 6))).toEqualT([expected].flat())
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([['جيء', 'تَجَاءٍ']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 6))).toEqualT([expected].flat())
      })
    })
  })

  describe('Form VII', () => {
    describe('regular roots', () => {
      test.each([
        ['فجر', 'اِنْفِجَار'],
        ['كتب', 'اِنْكِتَاب'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 7))).toEqualT([expected].flat())
      })
    })

    describe('hollow roots', () => {
      test.each([['قود', 'اِنْقِيَاد']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 7))).toEqualT([expected].flat())
      })
    })
  })

  describe('Form VIII', () => {
    describe('regular roots', () => {
      test.each([['قرح', 'اِقْتِرَاح']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 8))).toEqualT([expected].flat())
      })
    })

    describe('assimilated roots', () => {
      test.each([['وصل', 'اِتِّصَال']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 8))).toEqualT([expected].flat())
      })
    })

    describe('hollow roots', () => {
      test.each([['قود', 'اِقْتِيَاد']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 8))).toEqualT([expected].flat())
      })
    })

    describe('defective roots', () => {
      test.each([['نهي', 'اِنْتِهَاء']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 8))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['أخذ', 'اِتِّخَاذ']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 8))).toEqualT([expected].flat())
      })
    })
  })

  describe('Form IX', () => {
    describe('regular roots', () => {
      test.each([
        ['حمر', 'اِحْمِرَار'],
        ['صفر', 'اِصْفِرَار'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 9))).toEqualT([expected].flat())
      })
    })
  })

  describe('Form X', () => {
    describe('regular roots', () => {
      test.each([
        ['عمل', 'اِسْتِعْمَال'],
        ['درس', 'اِسْتِدْرَاس'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 10))).toEqualT([expected].flat())
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حمم', 'اِسْتِحْمَام'],
        ['حبب', 'اِسْتِحْبَاب'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 10))).toEqualT([expected].flat())
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['ضيف', 'اِسْتِضَافَة'],
        ['عاد', 'اِسْتِعَادَة'],
        ['عون', 'اِسْتِعَانَة'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 10))).toEqualT([expected].flat())
      })
    })

    describe('defective roots', () => {
      test.each([
        ['دعى', 'اِسْتِدْعَاء'],
        ['غني', 'اِسْتِغْنَاء'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 10))).toEqualT([expected].flat())
      })
    })

    describe('doubly weak roots', () => {
      test.each([['وفي', 'اِسْتِفَاء']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 10))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['أجر', 'اِسْتِئْجَار']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 10))).toEqualT([expected].flat())
      })
    })

    describe('hamzated final roots', () => {
      test.each([['قرأ', ['اِسْتِقْرَاء']]])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 10))).toEqualT([expected].flat())
      })
    })
  })
})
