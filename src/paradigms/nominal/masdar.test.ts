import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { deriveMasdar } from './masdar'

describe('masdar', () => {
  describe('Form I', () => {
    describe('regular roots', () => {
      test.each([
        ['عمل', ['عَمَل', 'مَعْمَل']],
        ['بدل', 'بَدْل'],
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
        ['سلم', ['سَلَامَة', 'سَلَم']],
        ['سكن', ['سُكُون', 'سَكَن']],
        ['لزم', 'لُزُوم'],
        ['بعد', 'بُعْد'],
        ['هدم', 'هَدْم'],
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
        ['لمم', 'لَمّ'],
        ['هلل', 'هَلّ'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وصل', 'وَصْل'],
        ['وضع', 'وَضْع'],
        ['يسر', 'يَسْر'],
        ['ولد', 'وِلَادَة'],
        ['وطن', 'وَطْن'],
        ['وجب', 'وُجُوب'],
        ['وصف', 'وَصْف'],
        ['وفد', 'وُفُود'],
        ['وهن', 'وَهْن'],
        ['وقف', 'وُقُوف'],
        ['وعد', ['وَعْد', 'مَوْعِد']],
        ['وني', 'وَنْي'],
        ['يمن', 'يُمْن'],
        ['يبس', 'يُبْس'],
        ['وثق', 'وَثَاقَة'],
        ['وجز', 'وَجْز'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['زيد', ['زِيَادَة', 'زَيْد']],
        ['لوم', 'لَوْم'],
        ['موت', 'مَوْت'],
        ['ميل', 'مَيَل'],
        ['نوم', ['نَوْم', 'مَنَام']],
        ['قوم', 'قِيَام'],
        ['كون', 'كَوْن'],
        ['بيع', 'بَيْع'],
        ['زور', ['زَوْر', 'زِيَارَة', 'مَزَار', 'زُوَارَة', 'زُوَار']],
        ['خور', 'خَوَر'],
        ['خوف', 'خَوْف'],
        ['بيت', 'مَبِيت'],
        ['صير', 'صَيْر'],
        ['روح', 'رَوَاح'],
        ['حول', 'حَوْل'],
        ['قول', 'قَوْل'],
        ['شوق', 'شَوْق'],
        ['شيد', 'شَيْد'],
        ['عوز', 'عَوَز'],
        ['عوم', 'عَوْم'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('defective roots', () => {
      test.each([
        ['بقي', 'بَقَاء'],
        ['بكي', 'بُكَاء'],
        ['بدو', 'بَدْو'],
        ['جدو', 'جَدْو'],
        ['لهو', 'لَهْو'],
        ['علي', 'عَلْي'],
        ['شفي', 'شِفَاء'],
        ['جري', 'جَرْي'],
        ['غدو', 'غُدُوّ'],
        ['دعو', 'دُعَاء'],
        ['سعي', ['مَسْعَى']],
        ['غشي', 'غَشْي'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'وَفَاء'],
        ['وقي', 'وَقْي'],
        ['ولي', 'وَلْي'],
        ['وعي', 'وَعْي'],
        ['وري', 'وَرْي'],
        ['قوي', 'قِوًى'],
        ['روي', 'رِوَايَة'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءمر', 'أَمْر'],
        ['ءجر', ['أَجْر', 'أُجْرَة']],
        ['ءمن', 'أَمْن'],
        ['ءذن', 'أَذَن'],
        ['ءصل', 'أَصَالَة'],
        ['ءسر', 'أَسْر'],
        ['ءخذ', 'أَخْذ'],
        ['ءكل', 'أَكْل'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([
        ['ءمم', 'أَمّ'],
        ['ءدد', 'أَدّ'],
        ['ءجج', 'أَجّ'],
        ['ءزز', 'أَزّ'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([
        ['ءتي', 'أَتْي'],
        ['ءبي', 'إِبَاء'],
        ['ءني', 'إِنًى'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial hollow roots', () => {
      test.each([['ءول', 'أَوْل']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('hamzated hollow-defective roots', () => {
      test.each([['ءوي', ['إِوِيّ', 'أُوِيّ', 'إِوَاء']]])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('hamzated middle roots', () => {
      test.each([
        ['يءس', 'يَأْس'],
        ['بءس', 'بَأْس'],
        ['سءل', ['سُؤَال']],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('hamzated middle defective roots', () => {
      test.each([
        ['رءي', 'رَأْي'],
        ['وءي', 'وَأْي'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['بدء', 'بَدْء'],
        ['قرء', 'قِرَاءَة'],
        ['جرء', 'جُرْأَة'],
        ['كلء', 'كَلْء'],
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
        ['ءخر', 'تَأْخِير'],
        ['ءجر', 'تَأْجِير'],
        ['ءكل', 'تَأْكِيل'],
        ['ءمر', 'تَأْمِير'],
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
        ['نوم', 'تَنْوِيم'],
        ['سوف', 'تَسْوِيف'],
        ['كيف', 'تَكْيِيف'],
        ['ءول', 'تَأْوِيل'],
        ['ءوب', 'تَأْوِيب'],
        ['شوق', 'تَشْوِيق'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 2))).toEqualT([expected].flat())
      })
    })

    describe('hamzated final roots', () => {
      test.each([['هنء', 'تَهْنِئَة']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 2))).toEqualT([expected].flat())
      })
    })

    describe('defective roots', () => {
      test.each([
        ['غطي', 'تَغْطِيَة'],
        ['غني', 'تَغْنِيَة'],
        ['ءذي', 'تَأْذِيَة'],
        ['ءسي', 'تَأْسِيَة'],
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
        ['ءكد', 'تَأْكِيد'],
        ['ءجج', 'تَأْجِيج'],
        ['ءثر', 'تَأْثِير'],
        ['ءسس', 'تَأْسِيس'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 2))).toEqualT([expected].flat())
      })
    })

    describe('hamzated hollow roots', () => {
      test.each([
        ['ءود', 'تَأْوِيد'],
        ['ءيد', 'تَأْيِيد'],
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
        ['رءي', 'مُرَاءَاة'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 3))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءخذ', 'مُؤَاخَذَة'],
        ['ءجر', 'مُؤَاجَرَة'],
        ['ءتي', 'مُؤَاتَاة'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 3))).toEqualT([expected].flat())
      })
    })

    describe('hamzated middle roots', () => {
      test.each([
        ['سءل', ['مُسَاءَلَة']],
        ['وءم', ['مُوَاءَمَة']],
        ['لءم', ['مُلَاءَمَة']],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 3))).toEqualT([expected].flat())
      })
    })

    describe('hamzated final roots', () => {
      test.each([['فجء', 'مُفَاجَأَة']])('%s', (root, expected) => {
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
        ['مدد', 'إِمْدَاد'],
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
        ['نوم', 'إِنَامَة'],
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
      test.each([['ومء', 'إِيْمَاء']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 4))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([['ءتي', 'إِيْتَاء']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 4))).toEqualT([expected].flat())
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وصي', 'إِيْصَاء'],
        ['وحي', 'إِيْحَاء'],
        ['وفي', 'إِيْفَاء'],
        ['رءي', 'إِرَاءَة'],
        ['ودي', 'إِيْدَاء'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 4))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءذن', 'إِيْذَان'],
        ['ءمن', 'إِيْمَان'],
        ['ءلم', 'إِيْلَام'],
        ['ءجر', 'إِيْجَار'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 4))).toEqualT([expected].flat())
      })
    })

    describe('hamzated hollow-defective roots', () => {
      test.each([['ءوي', 'إِيْوَاء']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 4))).toEqualT([expected].flat())
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['نشء', 'إِنْشَاء'],
        ['نبء', 'إِنْبَاء'],
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
        ['ءخر', 'تَأَخُّر'],
        ['ءلف', 'تَأَلُّف'],
        ['ءول', 'تَأَوُّل'],
        ['ءكد', 'تَأَكُّد'],
        ['ءكل', 'تَأَكُّل'],
        ['ءثر', 'تَأَثُّر'],
        ['ءوه', 'تَأَوُّه'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 5))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([['ءمم', 'تَأَمُّم']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 5))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([
        ['ءذي', 'تَأَذٍّ'],
        ['ءتي', 'تَأَتٍّ'],
      ])('%s', (root, expected) => {
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
        ['مدد', 'تَمَدُّد'],
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
        ['وكء', 'تَوَكُّؤ'],
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
        ['شوق', 'تَشَوُّق'],
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
        ['رءي', 'تَرَأٍّ'],
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
        ['ءلف', 'تَآلُف'],
        ['ءكل', 'تَآكُل'],
        ['ءمر', 'تَآمُر'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 6))).toEqualT([expected].flat())
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['بطء', 'تَبَاطُؤ'],
        ['وطء', 'تَوَاطُؤ'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 6))).toEqualT([expected].flat())
      })
    })

    describe('hamzated middle roots', () => {
      test.each([['سءل', ['تَسَاؤُل']]])('%s', (root, expected) => {
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

    describe('hamzated final roots', () => {
      test.each([['قرء', 'اِنْقِرَاء']])('%s', (root, expected) => {
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

    describe('doubly weak roots', () => {
      test.each([['زوي', 'اِنْزِوَاء']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 7))).toEqualT([expected].flat())
      })
    })
  })

  describe('Form VIII', () => {
    describe('regular roots', () => {
      test.each([
        ['قرح', 'اِقْتِرَاح'],
        ['عبر', 'اِعْتِبَار'],
        ['عمد', 'اِعْتِمَاد'],
        ['حلم', 'اِحْتِلَام'],
        ['نظر', 'اِنْتِظَار'],
        ['ضلع', 'اِضْطِلَاع'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 8))).toEqualT([expected].flat())
      })
    })

    describe('hamzated middle roots', () => {
      test.each([
        ['كءب', 'اِكْتِئَاب'],
        ['بءس', 'اِبْتِئَاس'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 8))).toEqualT([expected].flat())
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['ضرر', 'اِضْطِرَار'],
        ['حلل', 'اِحْتِلَال'],
        ['مدد', 'اِمْتِدَاد'],
        ['حجج', 'اِحْتِجَاج'],
        ['ردد', 'اِرْتِدَاد'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 8))).toEqualT([expected].flat())
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وصل', 'اِتِّصَال'],
        ['وعد', 'اِتِّعَاد'],
        ['وسخ', 'اِتِّسَاخ'],
        ['وكء', 'اِتِّكَاء'],
        ['وحد', 'اِتِّحَاد'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 8))).toEqualT([expected].flat())
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قود', 'اِقْتِيَاد'],
        ['زوج', 'اِزْدِوَاج'],
        ['زيد', 'اِزْدِيَاد'],
        ['سوء', 'اِسْتِيَاء'],
        ['خير', 'اِخْتِيَار'],
        ['عود', 'اِعْتِيَاد'],
        ['روح', 'اِرْتِيَاح'],
        ['شوق', 'اِشْتِيَاق'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 8))).toEqualT([expected].flat())
      })
    })

    describe('defective roots', () => {
      test.each([
        ['نهي', 'اِنْتِهَاء'],
        ['دعو', 'اِدِّعَاء'],
        ['قضي', 'اِقْتِضَاء'],
        ['ردي', 'اِرْتِدَاء'],
        ['رءي', 'اِرْتِئَاء'],
        ['شري', 'اِشْتِرَاء'],
        ['خفي', 'اِخْتِفَاء'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 8))).toEqualT([expected].flat())
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وقي', 'اِتِّقَاء'],
        ['نوي', 'اِنْتِوَاء'],
        ['سوي', 'اِسْتِوَاء'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 8))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['ءخذ', 'اِتِّخَاذ']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 8))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([['ءمم', 'اِئْتِمَام']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 8))).toEqualT([expected].flat())
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['بدء', 'اِبْتِدَاء'],
        ['خبء', 'اِخْتِبَاء'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 8))).toEqualT([expected].flat())
      })
    })
  })

  describe('Form IX', () => {
    describe('regular roots', () => {
      test.each([
        ['حمر', 'اِحْمِرَار'],
        ['بيض', 'اِبْيِضَاض'],
        ['خضر', 'اِخْضِرَار'],
        ['زرق', 'اِزْرِقَاق'],
        ['صفر', 'اِصْفِرَار'],
        ['خضل', 'اِخْضِلَال'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 9))).toEqualT([expected].flat())
      })
    })
  })

  describe('Form X', () => {
    describe('regular roots', () => {
      test.each([
        ['عرض', 'اِسْتِعْرَاض'],
        ['عمل', 'اِسْتِعْمَال'],
        ['درس', 'اِسْتِدْرَاس'],
        ['غرق', 'اِسْتِغْرَاق'],
        ['هدف', 'اِسْتِهْدَاف'],
        ['طرد', 'اِسْتِطْرَاد'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 10))).toEqualT([expected].flat())
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وجب', 'اِسْتِيجَاب'],
        ['وعب', 'اِسْتِيعَاب'],
        ['ورد', 'اِسْتِيرَاد'],
        ['وضح', 'اِسْتِيضَاح'],
        ['وطن', 'اِسْتِيطَان'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 10))).toEqualT([expected].flat())
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['شفف', 'اِسْتِشْفَاف'],
        ['مرر', 'اِسْتِمْرَار'],
        ['حقق', 'اِسْتِحْقَاق'],
        ['غلل', 'اِسْتِغْلَال'],
        ['حمم', 'اِسْتِحْمَام'],
        ['حبب', 'اِسْتِحْبَاب'],
        ['مدد', 'اِسْتِمْدَاد'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 10))).toEqualT([expected].flat())
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['فيد', 'اِسْتِفَادَة'],
        ['ضيف', 'اِسْتِضَافَة'],
        ['عون', 'اِسْتِعَانَة'],
        ['جوب', 'اِسْتِجَابَة'],
        ['نوم', 'اِسْتِنَامَة'],
        ['لوم', 'اِسْتِلَامَة'],
        ['شور', 'اِسْتِشَارَة'],
        ['حول', 'اِسْتِحَالَة'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 10))).toEqualT([expected].flat())
      })
    })

    describe('defective roots', () => {
      test.each([
        ['دعو', 'اِسْتِدْعَاء'],
        ['غني', 'اِسْتِغْنَاء'],
        ['ءني', 'اِسْتِئْنَاء'],
        ['رعي', 'اِسْتِرْعَاء'],
        ['ثني', 'اِسْتِثْنَاء'],
        ['لقي', 'اِسْتِلْقَاء'],
        ['عصي', 'اِسْتِعْصَاء'],
        ['رخو', 'اِسْتِرْخَاء'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 10))).toEqualT([expected].flat())
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'اِسْتِيفَاء'],
        ['ولي', 'اِسْتِيلَاء'],
        ['حيي', 'اِسْتِحْيَاء'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 10))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['ءجر', 'اِسْتِئْجَار']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 10))).toEqualT([expected].flat())
      })
    })

    describe('hamzated final roots', () => {
      test.each([['قرء', ['اِسْتِقْرَاء']]])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 10))).toEqualT([expected].flat())
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([['ضوء', 'اِسْتِضَاءَة']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 10))).toEqualT([expected].flat())
      })
    })
  })
  describe('Form Iq', () => {
    describe('hollow roots', () => {
      test.each([
        ['سيطر', 'سَيْطَرَة'],
        ['كلور', 'كَلْوَرَة'],
        ['وسوس', ['وَسْوَسَة', 'وَسْوَاس', 'وِسْوَاس']],
        ['لءلء', 'لَأْلَأَة'],
        ['ترجم', 'تَرْجَمَة'],
        ['برهن', 'بَرْهَنَة'],
        ['عرقل', 'عَرْقَلَة'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 1))).toEqualT([expected].flat())
      })
    })
  })

  describe('Form IIq', () => {
    describe('regular roots', () => {
      test.each([
        ['عرقل', 'تَعَرْقُل'],
        ['مركز', 'تَمَرْكُز'],
        ['بلور', 'تَبَلْوُر'],
        ['ذبذب', 'تَذَبْذُب'],
        ['غلغل', 'تَغَلْغُل'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 2))).toEqualT([expected].flat())
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءمرك', 'تَأَمْرُك'],
        ['ءلمن', 'تَأَلْمُن'],
      ])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 2))).toEqualT([expected].flat())
      })
    })
  })

  describe('Form IIIq', () => {
    describe('regular roots', () => {
      test.each([['جلفع', 'اِجْلِنْفَاع']])('%s', (root, expected) => {
        expect(deriveMasdar(getVerb(root, 3))).toEqualT([expected].flat())
      })
    })
  })
})
