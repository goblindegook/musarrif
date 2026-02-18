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
        ['وقف', 'مَوْقُوف'],
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
        ['خور', 'مَخْوُور'],
        ['خوف', 'مَخُوف'],
        ['موت', ''],
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
        ['بدو', 'مَبْدُوّ'],
        ['جدو', 'مَجْدُوّ'],
        ['لهو', 'مَلْهُوّ'],
        ['علي', 'مَعْلِيّ'],
        ['شفي', 'مَشْفِيّ'],
        ['غدو', 'مَغْدُوّ'],
        ['غشي', 'مَغْشِيّ'],
        ['سعي', 'مَسْعِيّ'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toBe(expected)
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

    describe('hamzated initial hollow roots', () => {
      test.each([['أول', 'مَأُول']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([
        ['أمم', 'مَأْمُوم'],
        ['أدد', 'مَأْدُود'],
        ['أجج', 'مَأْجُوج'],
        ['أزز', 'مَأْزُوز'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([
        ['أتي', 'مَأْتِيّ'],
        ['أبي', 'مَأْبِيّ'],
        ['أني', 'مَأْنِيّ'],
      ])('%s', (root, expected) => {
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
        ['رءي', 'مَرْئِيّ'],
        ['وءي', 'مَوْئِيّ'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['بدأ', 'مَبْدُوء'],
        ['قرأ', 'مَقْرُوء'],
        ['جرء', 'مَجْرُوء'],
        ['بوء', 'مَبُوء'],
        ['نوء', 'مَنُوء'],
        ['كلأ', 'مَكْلُوء'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 1))).toBe(expected)
      })
    })

    describe('hamzated final assimilated roots', () => {
      test.each([['وطء', 'مَوْطُوء']])('%s', (root, expected) => {
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
        ['مكن', 'مُمَكَّن'],
        ['مثل', 'مُمَثَّل'],
        ['سبب', 'مُسَبَّب'],
        ['خطط', 'مُخَطَّط'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 2))).toBe(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وطن', 'مُوَطَّن'],
        ['وجه', 'مُوَجَّه'],
        ['وسط', 'مُوَسَّط'],
        ['وقف', 'مُوَقَّف'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 2))).toBe(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'مُحَبَّب'],
        ['حدد', 'مُحَدَّد'],
        ['قرر', 'مُقَرَّر'],
        ['شدد', 'مُشَدَّد'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 2))).toBe(expected)
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
        ['أول', 'مُؤَوَّل'],
        ['أوب', 'مُؤَوَّب'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 2))).toBe(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([
        ['أذي', 'مُؤَذًّى'],
        ['أسي', 'مُؤَسًّى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 2))).toBe(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['هنأ', 'مُهَنَّأ']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 2))).toBe(expected)
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
        expect(derivePassiveParticiple(getVerb(root, 2))).toBe(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أثر', 'مُؤَثَّر'],
        ['أجج', 'مُؤَجَّج'],
        ['أكد', 'مُؤَكَّد'],
        ['أيد', 'مُؤَيَّد'],
        ['أسس', 'مُؤَسَّس'],
        ['أخر', 'مُؤَخَّر'],
        ['أمر', 'مُؤَمَّر'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 2))).toBe(expected)
      })
    })

    describe('hamzated final assimilated roots', () => {
      test.each([['وطء', 'مُوَطَّأ']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 2))).toBe(expected)
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
        expect(derivePassiveParticiple(getVerb(root, 3))).toBe(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['سرر', 'مُسَارّ'],
        ['ردد', 'مُرَادّ'],
        ['مدد', 'مُمَادّ'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 3))).toBe(expected)
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
        expect(derivePassiveParticiple(getVerb(root, 3))).toBe(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'مُوَافًى'],
        ['وزي', 'مُوَازًى'],
        ['وسي', 'مُوَاسًى'],
        ['نوي', 'مُنَاوًى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 3))).toBe(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['ندي', 'مُنَادًى'],
        ['رعي', 'مُرَاعًى'],
        ['بلي', 'مُبَالًى'],
        ['قضي', 'مُقَاضًى'],
        ['بري', 'مُبَارًى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 3))).toBe(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخذ', 'مُؤَاخَذ'],
        ['أجر', 'مُؤَاجَر'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 3))).toBe(expected)
      })
    })

    describe('hamzated middle roots', () => {
      test.each([
        ['سأل', 'مُسَاءَل'],
        ['وأم', 'مُوَاءَم'],
        ['لأم', 'مُلَاءَم'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 3))).toBe(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['فجأ', 'مُفَاجَأ']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 3))).toBe(expected)
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
        expect(derivePassiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['تمم', 'مُتَمّ'],
        ['سفف', 'مُسَفّ'],
        ['حبب', 'مُحَبّ'],
        ['عدد', 'مُعَدّ'],
        ['همم', 'مُهَمّ'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toBe(expected)
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
        expect(derivePassiveParticiple(getVerb(root, 4))).toBe(expected)
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
        expect(derivePassiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['ومأ', 'مُومَأ']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وصي', 'مُوْصًى'],
        ['وحي', 'مُوْحًى'],
        ['وفي', 'مُوْفًى'],
        ['وري', 'مُوْرًى'],
        ['ودي', 'مُوْدًى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أذن', 'مُؤْذَن'],
        ['أمن', 'مُؤْمَن'],
        ['ألم', 'مُؤْلَم'],
        ['أجر', 'مُؤْجَر'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([['أتي', 'مُؤْتًى']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('hamzated hollow-defective roots', () => {
      test.each([['أوي', 'مُؤْوًى']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toBe(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['نشأ', 'مُنْشَأ'],
        ['نبأ', 'مُنْبَأ'],
        ['ضوء', 'مُضَاء'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 4))).toBe(expected)
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
        expect(derivePassiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخر', 'مُتَأَخَّر'],
        ['ألف', 'مُتَأَلَّف'],
        ['أكد', 'مُتَأَكَّد'],
        ['أكل', 'مُتَأَكَّل'],
        ['أثر', 'مُتَأَثَّر'],
        ['أوه', 'مُتَأَوَّه'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([['أمم', 'مُتَأَمَّم']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([['أذي', 'مُتَأَذًّى']])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toBe(expected)
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
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وعد', 'مُتَوَعَّد'],
        ['وصل', 'مُتَوَصَّل'],
        ['وفر', 'مُتَوَفَّر'],
        ['وقف', 'مُتَوَقَّف'],
        ['وكأ', 'مُتَوَكَّأ'],
        ['وقع', 'مُتَوَقَّع'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['حول', 'مُتَحَوَّل'],
        ['قول', 'مُتَقَوَّل'],
        ['عين', 'مُتَعَيَّن'],
        ['غير', 'مُتَغَيَّر'],
        ['طور', 'مُتَطَوَّر'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['بقي', 'مُتَبَقًّى'],
        ['سني', 'مُتَسَنًّى'],
        ['بني', 'مُتَبَنًّى'],
        ['حدي', 'مُتَحَدًّى'],
        ['سمي', 'مُتَسَمًّى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'مُتَوَفًّى'],
        ['وقي', 'مُتَوَقًّى'],
        ['وخي', 'مُتَوَخًّى'],
        ['زوي', 'مُتَزَوًّى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toBe(expected)
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([
        ['هيء', 'مُتَهَيَّأ'],
        ['ضوء', 'مُتَضَوَّأ'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 5))).toBe(expected)
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
        expect(derivePassiveParticiple(getVerb(root, 6))).toBe(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'مُتَحَابّ'],
        ['مسس', 'مُتَمَاسّ'],
        ['ضدد', 'مُتَضَادّ'],
        ['ردد', 'مُتَرَادّ'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 6))).toBe(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عون', 'مُتَعَاوَن'],
        ['نول', 'مُتَنَاوَل'],
        ['فوض', 'مُتَفَاوَض'],
        ['جوز', 'مُتَجَاوَز'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 6))).toBe(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['عفو', 'مُتَعَافًى'],
        ['هوي', 'مُتَهَاوًى'],
        ['ولي', 'مُتَوَالًى'],
        ['وصي', 'مُتَوَاصًى'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 6))).toBe(expected)
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
        expect(derivePassiveParticiple(getVerb(root, 6))).toBe(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ألف', 'مُتَآلَف'],
        ['أمر', 'مُتَآمَر'],
      ])('%s', (root, expected) => {
        expect(derivePassiveParticiple(getVerb(root, 6))).toBe(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['وطء', 'مُتَوَاطَأ']])('%s', (root, expected) => {
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
        ['خفض', 'مُنْخَفَض'],
        ['عكس', 'مُنْعَكَس'],
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
