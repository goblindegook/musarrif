import { describe, expect, test } from 'vitest'
import { getVerb, verbs } from '../verbs'
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
        ['جمع', ['جَمْع', 'جَمْعًا', 'مَجْمَع']],
        ['حدث', 'حُدُوث'],
        ['حبط', 'حُبُوط'],
        ['ذكر', 'ذِكْر'],
        ['ضمن', 'ضَمَان'],
        ['حسب', 'حَسَب'],
        ['حضر', 'حُضُور'],
        ['حلق', 'حَلْق'],
        ['حلم', 'حُلْم'],
        ['دعم', 'دَعْم'],
        ['كلم', 'كَلْم'],
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
        ['موت', 'مَوْت'],
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
        ['سعي', ['مَسْعَى']],
        ['غشي', []],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'وَفَاء'],
        ['وقي', 'وِقَايَة'],
        ['ولي', 'وَلْي'],
        ['وعي', 'وَعْي'],
        ['وري', 'وَرْي'],
        ['قوي', 'قُوَّة'],
        ['روي', []],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })

      test('روي (a/i)', () => {
        // biome-ignore lint/style/noNonNullAssertion: must exist
        const verb = verbs.find(
          (entry) => entry.form === 1 && entry.root === 'روي' && entry.formPattern === 'fa3ala-yaf3ilu',
        )!
        expect(deriveMasdar(verb)).toEqualT(['رِوَايَة'])
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
        ['رءي', 'رُؤْيَة'],
        ['وءي', 'وَأْي'],
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
        ['كلم', 'مُكَالَمَة'],
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

    describe('geminate roots', () => {
      test.each([
        ['سرر', 'مُسَارَّة'],
        ['ردد', 'مُرَادَّة'],
        ['مدد', 'مُمَادَّة'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 3))).toEqualT([expected].flat())
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عون', 'مُعَاوَنَة'],
        ['قود', 'مُقَاوَدَة'],
        ['قول', 'مُقَاوَلَة'],
        ['قوم', 'مُقَاوَمَة'],
        ['عود', 'مُعَاوَدَة'],
        ['جوز', 'مُجَاوَزَة'],
        ['نول', 'مُنَاوَلَة'],
        ['ضيق', 'مُضَايَقَة'],
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

    describe('defective roots', () => {
      test.each([
        ['ندي', 'مُنَادَاة'],
        ['رعي', 'مُرَاعَاة'],
        ['بلي', 'مُبَالَاة'],
        ['قضي', 'مُقَاضَاة'],
        ['بري', 'مُبَارَاة'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 3))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخذ', 'مُؤَاخَذَة'],
        ['أجر', 'مُؤَاجَرَة'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 3))).toEqualT([expected].flat())
      })
    })

    describe('hamzated middle roots', () => {
      test.each([
        ['سأل', ['مُسَاءَلَة']],
        ['وأم', ['مُوَاءَمَة']],
        ['لأم', ['مُلَاءَمَة']],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 3))).toEqualT([expected].flat())
      })
    })

    describe('hamzated final roots', () => {
      test.each([['فجأ', 'مُفَاجَأَة']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 3))).toEqualT([expected].flat())
      })
    })
  })

  describe('Form IV', () => {
    describe('regular roots', () => {
      test.each([
        ['كثر', 'إِكْثَار'],
        ['علم', 'إِعْلَام'],
        ['لحق', 'إِلْحَاق'],
        ['مكن', 'إِمْكَان'],
        ['صبح', 'إِصْبَاح'],
        ['وقف', 'إِيْقَاف'],
        ['وقع', 'إِيْقَاع'],
        ['ولد', 'إِيْلَاد'],
        ['وصل', 'إِيْصَال'],
        ['وضح', 'إِيْضَاح'],
        ['فعل', 'إِفْعَال'],
        ['فلت', 'إِفْلَات'],
        ['كتب', 'إِكْتَاب'],
        ['عرب', 'إِعْرَاب'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 4))).toEqualT([expected].flat())
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['تمم', 'إِتْمَام'],
        ['سفف', 'إِسْفَاف'],
        ['حبب', 'إِحْبَاب'],
        ['عدد', 'إِعْدَاد'],
        ['همم', 'إِهْمَام'],
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
        ['شور', 'إِشَارَة'],
        ['رود', 'إِرَادَة'],
        ['تيح', 'إِتَاحَة'],
        ['فيد', 'إِفَادَة'],
        ['عود', 'إِعَادَة'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 4))).toEqualT([expected].flat())
      })
    })

    describe('defective roots', () => {
      test.each([
        ['علي', 'إِعْلَاء'],
        ['بقي', 'إِبْقَاء'],
        ['سمي', 'إِسْمَاء'],
        ['عطي', 'إِعْطَاء'],
        ['لقي', 'إِلْقَاء'],
        ['نهي', 'إِنْهَاء'],
        ['مسي', 'إِمْسَاء'],
        ['ضحي', 'إِضْحَاء'],
        ['حيي', 'إِحْيَاء'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 4))).toEqualT([expected].flat())
      })
    })

    describe('hamzated final roots', () => {
      test.each([['ومأ', 'إِيْمَاء']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 4))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([['أتي', 'إِيْتَاء']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 4))).toEqualT([expected].flat())
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وصي', 'إِيْصَاء'],
        ['وحي', 'إِيْحَاء'],
        ['وفي', 'إِيْفَاء'],
        ['وري', 'إِيْرَاء'],
        ['ودي', 'إِيْدَاء'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 4))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أذن', 'إِيْذَان'],
        ['أمن', 'إِيْمَان'],
        ['ألم', 'إِيْلَام'],
        ['أجر', 'إِيْجَار'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 4))).toEqualT([expected].flat())
      })
    })

    describe('hamzated hollow-defective roots', () => {
      test.each([['أوي', 'إِيْوَاء']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 4))).toEqualT([expected].flat())
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['نشأ', 'إِنْشَاء'],
        ['نبأ', 'إِنْبَاء'],
        ['ضوء', 'إِضَاءَة'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 4))).toEqualT([expected].flat())
      })
    })
  })

  describe('Form V', () => {
    describe('regular roots', () => {
      test.each([
        ['ضمن', 'تَضَمُّن'],
        ['جمع', 'تَجَمُّع'],
        ['حدث', 'تَحَدُّث'],
        ['مثل', 'تَمَثُّل'],
        ['عرف', 'تَعَرُّف'],
        ['طلب', 'تَطَلُّب'],
        ['كتب', 'تَكَتُّب'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 5))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخر', 'تَأَخُّر'],
        ['ألف', 'تَأَلُّف'],
        ['أكد', 'تَأَكُّد'],
        ['أكل', 'تَأَكُّل'],
        ['أثر', 'تَأَثُّر'],
        ['أوه', 'تَأَوُّه'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 5))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([['أمم', 'تَأَمُّم']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 5))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([['أذي', 'تَأَذٍّ']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 5))).toEqualT([expected].flat())
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'تَحَبُّب'],
        ['هدد', 'تَهَدُّد'],
        ['حدد', 'تَحَدُّد'],
        ['عزز', 'تَعَزُّز'],
        ['سبب', 'تَسَبُّب'],
        ['قرر', 'تَقَرُّر'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 5))).toEqualT([expected].flat())
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وعد', 'تَوَعُّد'],
        ['وصل', 'تَوَصُّل'],
        ['وفر', 'تَوَفُّر'],
        ['وقف', 'تَوَقُّف'],
        ['وكأ', 'تَوَكُّؤ'],
        ['وقع', 'تَوَقُّع'],
        ['وسع', 'تَوَسُّع'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 5))).toEqualT([expected].flat())
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['حول', 'تَحَوُّل'],
        ['قول', 'تَقَوُّل'],
        ['عين', 'تَعَيُّن'],
        ['غير', 'تَغَيُّر'],
        ['طور', 'تَطَوُّر'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 5))).toEqualT([expected].flat())
      })
    })

    describe('defective roots', () => {
      test.each([
        ['غني', 'تَغَنٍّ'],
        ['بقي', 'تَبَقٍّ'],
        ['سني', 'تَسَنٍّ'],
        ['بني', 'تَبَنٍّ'],
        ['حدي', 'تَحَدٍّ'],
        ['سمي', 'تَسَمٍّ'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 5))).toEqualT([expected].flat())
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'تَوَفٍّ'],
        ['وقي', 'تَوَقٍّ'],
        ['وخي', 'تَوَخٍّ'],
        ['زوي', 'تَزَوٍّ'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 5))).toEqualT([expected].flat())
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([
        ['هيء', 'تَهَيُّؤ'],
        ['ضوء', 'تَضَوُّؤ'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 5))).toEqualT([expected].flat())
      })
    })
  })

  describe('Form VI', () => {
    describe('regular roots', () => {
      test.each([
        ['كتب', 'تَكَاتُب'],
        ['عمل', 'تَعَامُل'],
        ['كمل', 'تَكَامُل'],
        ['شرك', 'تَشَارُك'],
        ['علج', 'تَعَالُج'],
        ['قسم', 'تَقَاسُم'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 6))).toEqualT([expected].flat())
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'تَحَابُب'],
        ['مسس', 'تَمَاسُس'],
        ['ضدد', 'تَضَادُد'],
        ['ردد', 'تَرَادُد'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 6))).toEqualT([expected].flat())
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عون', 'تَعَاوُن'],
        ['نول', 'تَنَاوُل'],
        ['فوض', 'تَفَاوُض'],
        ['جوز', 'تَجَاوُز'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 6))).toEqualT([expected].flat())
      })
    })

    describe('defective roots', () => {
      test.each([
        ['نمو', 'تَنَامٍ'],
        ['مشي', 'تَمَاشٍ'],
        ['عفو', 'تَعَافٍ'],
        ['هوي', 'تَهَاوٍ'],
        ['ولي', 'تَوَالٍ'],
        ['وصي', 'تَوَاصٍ'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 6))).toEqualT([expected].flat())
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وفق', 'تَوَافُق'],
        ['وجه', 'تَوَاجُه'],
        ['وفر', 'تَوَافُر'],
        ['وجد', 'تَوَاجُد'],
        ['وزن', 'تَوَازُن'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 6))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ألف', 'تَآلُف'],
        ['أكل', 'تَآكُل'],
        ['أمر', 'تَآمُر'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 6))).toEqualT([expected].flat())
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['بطأ', 'تَبَاطُؤ'],
        ['وطء', 'تَوَاطُؤ'],
      ])('%s', (root, expected) => {
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
        ['خفض', 'اِنْخِفَاض'],
        ['عكس', 'اِنْعِكَاس'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 7))).toEqualT([expected].flat())
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['قصص', 'اِنْقِصَاص'],
        ['بثث', 'اِنْبِثَاث'],
        ['كفف', 'اِنْكِفَاف'],
        ['دسس', 'اِنْدِسَاس'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 7))).toEqualT([expected].flat())
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قود', 'اِنْقِيَاد'],
        ['هيل', 'اِنْهِيَال'],
        ['حوز', 'اِنْحِيَاز'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 7))).toEqualT([expected].flat())
      })
    })

    describe('defective roots', () => {
      test.each([
        ['قضي', 'اِنْقِضَاء'],
        ['حني', 'اِنْحِنَاء'],
        ['ثني', 'اِنْثِنَاء'],
      ])('%s', (root, expected) => {
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
        ['دعو', 'اِسْتِدْعَاء'],
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
