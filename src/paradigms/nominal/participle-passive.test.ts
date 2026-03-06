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
        ['كلم', 'مَكْلُوم'],
        ['ضمن', 'مَضْمُون'],
        ['دحرج', 'مُدَحْرَج'],
        ['مثل', 'مَمْثُول'],
        ['صغر', 'مَصْغُور'],
        ['نظر', 'مَنْظُور'],
        ['صبح', 'مَصْبُوح'],
        ['نفس', 'مَنْفُوس'],
        ['مكن', 'مَمْكُون'],
        ['بلغ', 'مَبْلُوغ'],
        ['كتب', 'مَكْتُوب'],
        ['جلس', ''],
        ['حبط', ''],
        ['سعد', ''],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toEqualT(expected)
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
        expect(derivePassiveParticiple(getVerb(root, 1))).toEqualT(expected)
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
        ['وقف', 'مَوْقُوف'],
        ['سلم', 'مَسْلُوم'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['زيد', 'مَزِيد'],
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
        ['خور', 'مَخْوُور'],
        ['خوف', 'مَخُوف'],
        ['شوق', 'مَشُوق'],
        ['موت', ''],
        ['كان', ''],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['دعا', 'مَدْعُوّ'],
        ['بكي', 'مَبْكِيّ'],
        ['جري', 'مَجْرِيّ'],
        ['بدو', 'مَبْدُوّ'],
        ['جدو', 'مَجْدُوّ'],
        ['لهو', 'مَلْهُوّ'],
        ['علي', 'مَعْلِيّ'],
        ['شفي', 'مَشْفِيّ'],
        ['غدو', 'مَغْدُوّ'],
        ['غشي', 'مَغْشِيّ'],
        ['سعي', 'مَسْعِيّ'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['ولي', 'مَوْلِيّ'],
        ['وعي', 'مَوْعِيّ'],
        ['وقي', 'مَوْقِيّ'],
        ['وري', ''],
        ['وني', 'مَوْنِيّ'],
        ['وفي', 'مَوْفِيّ'],
        ['قوي', 'مَقْوِيّ'],
        ['جوي', 'مَجْوِيّ'],
        ['روي', 'مَرْوِيّ'],
        ['روي', 'مَرْوِيّ'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءذن', 'مَأْذُون'],
        ['ءجر', 'مَأْجُور'],
        ['ءصل', ''],
        ['ءسر', 'مَأْسُور'],
        ['ءكل', 'مَأْكُول'],
        ['ءخذ', 'مَأْخُوذ'],
        ['ءمن', ''],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toEqualT(expected)
      })
    })

    describe('hamzated initial hollow roots', () => {
      test.each([['ءول', 'مَأُول']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toEqualT(expected)
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([
        ['ءمم', 'مَأْمُوم'],
        ['ءدد', 'مَأْدُود'],
        ['ءجج', 'مَأْجُوج'],
        ['ءزز', 'مَأْزُوز'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toEqualT(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([
        ['ءتي', 'مَأْتِيّ'],
        ['ءبي', 'مَأْبِيّ'],
        ['ءني', 'مَأْنِيّ'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toEqualT(expected)
      })
    })

    describe('hamzated hollow-defective roots', () => {
      test.each([['ءوي', 'مَأْوِيّ']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toEqualT(expected)
      })
    })

    describe('hamzated middle roots', () => {
      test.each([
        ['يئس', 'مَيْؤُوس'],
        ['سءل', 'مَسْؤُول'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toEqualT(expected)
      })
    })

    describe('hamzated middle defective roots', () => {
      test.each([
        ['رءي', 'مَرْئِيّ'],
        ['وءي', 'مَوْئِيّ'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['بدء', 'مَبْدُوء'],
        ['قرء', 'مَقْرُوء'],
        ['جرء', 'مَجْرُوء'],
        ['بوء', 'مَبُوء'],
        ['نوء', 'مَنُوء'],
        ['كلء', 'مَكْلُوء'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toEqualT(expected)
      })
    })

    describe('hamzated final assimilated roots', () => {
      test.each([['وطء', 'مَوْطُوء']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toEqualT(expected)
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
        ['مكن', 'مُمَكَّن'],
        ['مثل', 'مُمَثَّل'],
        ['سبب', 'مُسَبَّب'],
        ['خطط', 'مُخَطَّط'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 2))).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وطن', 'مُوَطَّن'],
        ['وجه', 'مُوَجَّه'],
        ['وسط', 'مُوَسَّط'],
        ['وقف', 'مُوَقَّف'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 2))).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'مُحَبَّب'],
        ['حدد', 'مُحَدَّد'],
        ['قرر', 'مُقَرَّر'],
        ['شدد', 'مُشَدَّد'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 2))).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قول', 'مُقَوَّل'],
        ['قوس', 'مُقَوَّس'],
        ['كون', 'مُكَوَّن'],
        ['دون', 'مُدَوَّن'],
        ['سوف', 'مُسَوَّف'],
        ['كيف', 'مُكَيَّف'],
        ['ءول', 'مُؤَوَّل'],
        ['ءوب', 'مُؤَوَّب'],
        ['شوق', 'مُشَوَّق'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 2))).toEqualT(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([
        ['ءذي', 'مُؤَذًّى'],
        ['ءسي', 'مُؤَسًّى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 2))).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['هنء', 'مُهَنَّأ']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 2))).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'مُوَفًّى'],
        ['يود', 'مُيَوَّد'],
        ['وصي', 'مُوَصًّى'],
        ['ولي', 'مُوَلًّى'],
        ['وري', 'مُوَرًّى'],
        ['مني', 'مُمَنًّى'],
        ['سمي', 'مُسَمًّى'],
        ['حيي', 'مُحَيًّى'],
        ['غطي', 'مُغَطًّى'],
        ['غني', 'مُغَنًّى'],
        ['قوي', 'مُقَوًّى'],
        ['زوي', 'مُزَوًّى'],
        ['هوي', 'مُهَوًّى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 2))).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءثر', 'مُؤَثَّر'],
        ['ءجج', 'مُؤَجَّج'],
        ['ءجر', 'مُؤَجَّر'],
        ['ءكد', 'مُؤَكَّد'],
        ['ءيد', 'مُؤَيَّد'],
        ['ءسس', 'مُؤَسَّس'],
        ['ءخر', 'مُؤَخَّر'],
        ['ءمر', 'مُؤَمَّر'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 2))).toEqualT(expected)
      })
    })

    describe('hamzated final assimilated roots', () => {
      test.each([['وطء', 'مُوَطَّأ']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 2))).toEqualT(expected)
      })
    })
  })

  describe('Form III', () => {
    describe('regular roots', () => {
      test.each([
        ['كتب', 'مُكَاتَب'],
        ['عمل', 'مُعَامَل'],
        ['كلم', 'مُكَالَم'],
        ['تبع', 'مُتَابَع'],
        ['بلغ', 'مُبَالَغ'],
        ['سعد', 'مُسَاعَد'],
        ['صحب', 'مُصَاحَب'],
        ['وجه', 'مُوَاجَه'],
        ['وثق', 'مُوَاثَق'],
        ['وعد', 'مُوَاعَد'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 3))).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['سرر', 'مُسَارّ'],
        ['ردد', 'مُرَادّ'],
        ['مدد', 'مُمَادّ'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 3))).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عون', 'مُعَاوَن'],
        ['قول', 'مُقَاوَل'],
        ['قوم', 'مُقَاوَم'],
        ['عود', 'مُعَاوَد'],
        ['جوز', 'مُجَاوَز'],
        ['نول', 'مُنَاوَل'],
        ['ضيق', 'مُضَايَق'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 3))).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'مُوَافًى'],
        ['وزي', 'مُوَازًى'],
        ['وسي', 'مُوَاسًى'],
        ['نوي', 'مُنَاوًى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 3))).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['ندي', 'مُنَادًى'],
        ['رعي', 'مُرَاعًى'],
        ['بلي', 'مُبَالًى'],
        ['قضي', 'مُقَاضًى'],
        ['بري', 'مُبَارًى'],
        ['رءي', 'مُرَاءًى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 3))).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءخذ', 'مُؤَاخَذ'],
        ['ءجر', 'مُؤَاجَر'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 3))).toEqualT(expected)
      })
    })

    describe('hamzated middle roots', () => {
      test.each([
        ['سءل', 'مُسَاءَل'],
        ['وءم', 'مُوَاءَم'],
        ['لءم', 'مُلَاءَم'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 3))).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['فجء', 'مُفَاجَأ']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 3))).toEqualT(expected)
      })
    })
  })

  describe('Form IV', () => {
    describe('regular roots', () => {
      test.each([
        ['كثر', 'مُكْثَر'],
        ['علم', 'مُعْلَم'],
        ['لحق', 'مُلْحَق'],
        ['فلت', 'مُفْلَت'],
        ['مكن', 'مُمْكَن'],
        ['صبح', 'مُصْبَح'],
        ['وقف', 'مُوقَف'],
        ['وقع', 'مُوقَع'],
        ['ولد', 'مُولَد'],
        ['وصل', 'مُوصَل'],
        ['وضح', 'مُوضَح'],
        ['كتب', 'مُكْتَب'],
        ['عرب', 'مُعْرَب'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['تمم', 'مُتَمّ'],
        ['سفف', 'مُسَفّ'],
        ['حبب', 'مُحَبّ'],
        ['عدد', 'مُعَدّ'],
        ['همم', 'مُهَمّ'],
        ['مدد', 'مُمَدّ'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['ضيف', 'مُضَاف'],
        ['عون', 'مُعَان'],
        ['شور', 'مُشَار'],
        ['رود', 'مُرَاد'],
        ['تيح', 'مُتَاح'],
        ['فيد', 'مُفَاد'],
        ['عود', 'مُعَاد'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['علي', 'مُعْلًى'],
        ['بقي', 'مُبْقًى'],
        ['سمي', 'مُسْمًى'],
        ['عطي', 'مُعْطًى'],
        ['لقي', 'مُلْقًى'],
        ['نهي', 'مُنْهًى'],
        ['مسي', 'مُمْسًى'],
        ['ضحي', 'مُضْحًى'],
        ['حيي', 'مُحْيًى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['ومء', 'مُومَأ']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وصي', 'مُوْصًى'],
        ['وحي', 'مُوْحًى'],
        ['وفي', 'مُوْفًى'],
        ['رءي', 'مُرًى'],
        ['ودي', 'مُوْدًى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءذن', 'مُؤْذَن'],
        ['ءمن', 'مُؤْمَن'],
        ['ءلم', 'مُؤْلَم'],
        ['ءجر', 'مُؤْجَر'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toEqualT(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([['ءتي', 'مُؤْتًى']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toEqualT(expected)
      })
    })

    describe('hamzated hollow-defective roots', () => {
      test.each([['ءوي', 'مُؤْوًى']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['نشء', 'مُنْشَأ'],
        ['نبء', 'مُنْبَأ'],
        ['ضوء', 'مُضَاء'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toEqualT(expected)
      })
    })
  })

  describe('Form V', () => {
    describe('regular roots', () => {
      test.each([
        ['ضمن', 'مُتَضَمَّن'],
        ['جمع', 'مُتَجَمَّع'],
        ['حدث', 'مُتَحَدَّث'],
        ['مثل', 'مُتَمَثَّل'],
        ['عرف', 'مُتَعَرَّف'],
        ['طلب', 'مُتَطَلَّب'],
        ['كتب', 'مُتَكَتَّب'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءخر', 'مُتَأَخَّر'],
        ['ءلف', 'مُتَأَلَّف'],
        ['ءول', 'مُتَأَوَّل'],
        ['ءكد', 'مُتَأَكَّد'],
        ['ءكل', 'مُتَأَكَّل'],
        ['ءثر', 'مُتَأَثَّر'],
        ['ءوه', 'مُتَأَوَّه'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toEqualT(expected)
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([['ءمم', 'مُتَأَمَّم']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toEqualT(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([['ءذي', 'مُتَأَذًّى']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'مُتَحَبَّب'],
        ['هدد', 'مُتَهَدَّد'],
        ['حدد', 'مُتَحَدَّد'],
        ['عزز', 'مُتَعَزَّز'],
        ['سبب', 'مُتَسَبَّب'],
        ['قرر', 'مُتَقَرَّر'],
        ['مدد', ''],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وعد', 'مُتَوَعَّد'],
        ['وصل', 'مُتَوَصَّل'],
        ['وفر', 'مُتَوَفَّر'],
        ['وقف', 'مُتَوَقَّف'],
        ['وكء', 'مُتَوَكَّأ'],
        ['وقع', 'مُتَوَقَّع'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['حول', 'مُتَحَوَّل'],
        ['قول', 'مُتَقَوَّل'],
        ['عين', 'مُتَعَيَّن'],
        ['غير', 'مُتَغَيَّر'],
        ['طور', 'مُتَطَوَّر'],
        ['شوق', 'مُتَشَوَّق'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['بقي', 'مُتَبَقًّى'],
        ['سني', 'مُتَسَنًّى'],
        ['بني', 'مُتَبَنًّى'],
        ['حدي', 'مُتَحَدًّى'],
        ['سمي', 'مُتَسَمًّى'],
        ['رءي', 'مُتَرَأًّى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'مُتَوَفًّى'],
        ['وقي', 'مُتَوَقًّى'],
        ['وخي', 'مُتَوَخًّى'],
        ['زوي', 'مُتَزَوًّى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toEqualT(expected)
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([
        ['هيء', 'مُتَهَيَّأ'],
        ['ضوء', 'مُتَضَوَّأ'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toEqualT(expected)
      })
    })
  })

  describe('Form VI', () => {
    describe('regular roots', () => {
      test.each([
        ['كتب', 'مُتَكَاتَب'],
        ['عمل', 'مُتَعَامَل'],
        ['كمل', 'مُتَكَامَل'],
        ['شرك', 'مُتَشَارَك'],
        ['علج', 'مُتَعَالَج'],
        ['قسم', 'مُتَقَاسَم'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 6))).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'مُتَحَابّ'],
        ['مسس', 'مُتَمَاسّ'],
        ['ضدد', 'مُتَضَادّ'],
        ['ردد', 'مُتَرَادّ'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 6))).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عون', 'مُتَعَاوَن'],
        ['نول', 'مُتَنَاوَل'],
        ['فوض', 'مُتَفَاوَض'],
        ['جوز', 'مُتَجَاوَز'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 6))).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['عفو', 'مُتَعَافًى'],
        ['هوي', 'مُتَهَاوًى'],
        ['ولي', 'مُتَوَالًى'],
        ['وصي', 'مُتَوَاصًى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 6))).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وفق', 'مُتَوَافَق'],
        ['وجه', 'مُتَوَاجَه'],
        ['وفر', 'مُتَوَافَر'],
        ['وجد', 'مُتَوَاجَد'],
        ['وزن', 'مُتَوَازَن'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 6))).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءلف', 'مُتَآلَف'],
        ['ءمر', 'مُتَآمَر'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 6))).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['وطء', 'مُتَوَاطَأ']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 6))).toEqualT(expected)
      })
    })

    describe('hamzated middle roots', () => {
      test.each([['سءل', 'مُتَسَاءَل']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 6))).toEqualT(expected)
      })
    })
  })

  describe('Form VII', () => {
    describe('regular roots', () => {
      test.each([
        ['كتب', 'مُنْكَتَب'],
        ['طلق', ''],
        ['فجر', ''],
        ['خفض', 'مُنْخَفَض'],
        ['عكس', 'مُنْعَكَس'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 7))).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['قرء', '']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 7))).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['قصص', 'مُنْقَصّ'],
        ['بثث', 'مُنْبَثّ'],
        ['كفف', 'مُنْكَفّ'],
        ['دسس', 'مُنْدَسّ'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 7))).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قود', 'مُنْقَاد'],
        ['هيل', 'مُنْهَال'],
        ['حوز', 'مُنْحَاز'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 7))).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['قضي', 'مُنْقَضَى'],
        ['حني', 'مُنْحَنَى'],
        ['ثني', 'مُنْثَنَى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 7))).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([['زوي', '']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 7))).toEqualT(expected)
      })
    })
  })

  describe('Form VIII', () => {
    describe('regular roots', () => {
      test.each([
        ['قرح', 'مُقْتَرَح'],
        ['عبر', 'مُعْتَبَر'],
        ['عمد', 'مُعْتَمَد'],
        ['نظر', 'مُنْتَظَر'],
        ['ضلع', 'مُضْطَلَع'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 8))).toEqualT(expected)
      })
    })

    describe('hamzated middle roots', () => {
      test.each([
        ['كءب', 'مُكْتَأَب'],
        ['بءس', 'مُبْتَأَس'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 8))).toEqualT(expected)
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
        expect(derivePassiveParticiple(getVerb(root, 8))).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وصل', 'مُتَّصَل'],
        ['وعد', 'مُتَّعَد'],
        ['وسخ', 'مُتَّسَخ'],
        ['وكء', 'مُتَّكَأ'],
        ['وحد', 'مُتَّحَد'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 8))).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قود', 'مُقْتَاد'],
        ['زوج', 'مُزْدَوَج'],
        ['زيد', 'مُزْدَاد'],
        ['سوء', 'مُسْتَاء'],
        ['خير', 'مُخْتَار'],
        ['عود', 'مُعْتَاد'],
        ['روح', 'مُرْتَاح'],
        ['شوق', 'مُشْتَاق'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 8))).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['نهي', 'مُنْتَهًى'],
        ['دعو', 'مُدَّعًى'],
        ['قضي', 'مُقْتَضًى'],
        ['ردي', 'مُرْتَدًى'],
        ['رءي', 'مُرْتَأًى'],
        ['شري', 'مُشْتَرًى'],
        ['خفي', 'مُخْتَفًى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 8))).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وقي', 'مُتَّقًى'],
        ['نوي', 'مُنْتَوًى'],
        ['سوي', 'مُسْتَوًى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 8))).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['ءخذ', 'مُتَّخَذ']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 8))).toEqualT(expected)
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([['ءمم', 'مُؤْتَمّ']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 8))).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['بدء', 'مُبْتَدَأ'],
        ['خبء', 'مُخْتَبَأ'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 8))).toEqualT(expected)
      })
    })
  })

  describe('Form IX', () => {
    describe('regular roots', () => {
      test.each([['حمر'], ['بيض'], ['خضر'], ['زرق'], ['صفر'], ['خضل']])('%s', (root) => {
        expect(derivePassiveParticiple(getVerb(root, 9))).toEqualT('')
      })
    })
  })

  describe('Form X', () => {
    describe('regular roots', () => {
      test.each([
        ['عرض', 'مُسْتَعْرَض'],
        ['عمل', 'مُسْتَعْمَل'],
        ['غرق', 'مُسْتَغْرَق'],
        ['هدف', 'مُسْتَهْدَف'],
        ['طرد', 'مُسْتَطْرَد'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 10))).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وجب', 'مُسْتَوْجَب'],
        ['وعب', 'مُسْتَوْعَب'],
        ['ورد', 'مُسْتَوْرَد'],
        ['وضح', 'مُسْتَوْضَح'],
        ['وطن', 'مُسْتَوْطَن'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 10))).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['شفف', 'مُسْتَشَفّ'],
        ['مرر', 'مُسْتَمَرّ'],
        ['حقق', 'مُسْتَحَقّ'],
        ['غلل', 'مُسْتَغَلّ'],
        ['حبب', 'مُسْتَحَبّ'],
        ['حمم', 'مُسْتَحَمّ'],
        ['مدد', 'مُسْتَمَدّ'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 10))).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['فيد', 'مُسْتَفَاد'],
        ['ضيف', 'مُسْتَضَاف'],
        ['عون', 'مُسْتَعَان'],
        ['جوب', 'مُسْتَجَاب'],
        ['لوم', 'مُسْتَلَام'],
        ['شور', 'مُسْتَشَار'],
        ['حول', 'مُسْتَحَال'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 10))).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['دعو', 'مُسْتَدْعًى'],
        ['ءني', 'مُسْتَأْنًى'],
        ['رعي', 'مُسْتَرْعًى'],
        ['ثني', 'مُسْتَثْنًى'],
        ['لقي', 'مُسْتَلْقًى'],
        ['عصي', 'مُسْتَعْصًى'],
        ['رخو', 'مُسْتَرْخًى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 10))).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'مُسْتَوْفًى'],
        ['ولي', 'مُسْتَوْلًى'],
        ['حيي', 'مُسْتَحْيًى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 10))).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['ءجر', 'مُسْتَأْجَر']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 10))).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['قرء', 'مُسْتَقْرَأ']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 10))).toEqualT(expected)
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([['ضوء', 'مُسْتَضَاء']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 10))).toEqualT(expected)
      })
    })
  })
  describe('Form Iq', () => {
    describe('hollow roots', () => {
      test.each([['سيطر', 'مُسَيْطَر']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toEqualT(expected)
      })
    })
  })
})
