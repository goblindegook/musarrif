import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { conjugatePresentMood } from './present'

describe('active present subjunctive', () => {
  describe('Form I', () => {
    describe('regular roots', () => {
      test.each([
        ['نظر', 'يَنْظُرَ'],
        ['بعد', 'يَبْعَدَ'],
        ['مثل', 'يَمْثُلَ'],
        ['دعم', 'يَدْعَمَ'],
        ['قدم', 'يَقْدُمَ'],
        ['نفس', 'يَنْفُسَ'],
        ['مكن', 'يَمْكُنَ'],
        ['بلغ', 'يَبْلُغَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('صَغُرَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('صغر', 1), 'subjunctive')).toEqualT({
          '1s': 'أَصْغُرَ',
          '2ms': 'تَصْغُرَ',
          '2fs': 'تَصْغُرِي',
          '3ms': 'يَصْغُرَ',
          '3fs': 'تَصْغُرَ',
          '2d': 'تَصْغُرَا',
          '3md': 'يَصْغُرَا',
          '3fd': 'تَصْغُرَا',
          '1p': 'نَصْغُرَ',
          '2mp': 'تَصْغُرُوْا',
          '2fp': 'تَصْغُرْنَ',
          '3mp': 'يَصْغُرُوْا',
          '3fp': 'يَصْغُرْنَ',
        })
      })

      test('نَظَرَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('نظر', 1), 'subjunctive')).toEqualT({
          '1s': 'أَنْظُرَ',
          '2ms': 'تَنْظُرَ',
          '2fs': 'تَنْظُرِي',
          '3ms': 'يَنْظُرَ',
          '3fs': 'تَنْظُرَ',
          '2d': 'تَنْظُرَا',
          '3md': 'يَنْظُرَا',
          '3fd': 'تَنْظُرَا',
          '1p': 'نَنْظُرَ',
          '2mp': 'تَنْظُرُوْا',
          '2fp': 'تَنْظُرْنَ',
          '3mp': 'يَنْظُرُوْا',
          '3fp': 'يَنْظُرْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['قرر', 'يَقَرَّ'],
        ['أدد', 'يَئِدَّ'],
        ['أجج', 'يَؤُجَّ'],
        ['أزز', 'يَؤُزَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('قَرَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قرر', 1), 'subjunctive')).toEqualT({
          '1s': 'أَقَرَّ',
          '2ms': 'تَقَرَّ',
          '2fs': 'تَقَرِّي',
          '3ms': 'يَقَرَّ',
          '3fs': 'تَقَرَّ',
          '2d': 'تَقَرَّا',
          '3md': 'يَقَرَّا',
          '3fd': 'تَقَرَّا',
          '1p': 'نَقَرَّ',
          '2mp': 'تَقَرُّوْا',
          '2fp': 'تَقْرَرْنَ',
          '3mp': 'يَقَرُّوْا',
          '3fp': 'يَقْرَرْنَ',
        })
      })

      test('أَمَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('أمم', 1), 'subjunctive')).toEqualT({
          '1s': 'أَؤُمَّ',
          '2ms': 'تَؤُمَّ',
          '2fs': 'تَؤُمِّي',
          '3ms': 'يَؤُمَّ',
          '3fs': 'تَؤُمَّ',
          '2d': 'تَؤُمَّا',
          '3md': 'يَؤُمَّا',
          '3fd': 'تَؤُمَّا',
          '1p': 'نَؤُمَّ',
          '2mp': 'تَؤُمُّوْا',
          '2fp': 'تَأْمُمْنَ',
          '3mp': 'يَؤُمُّوْا',
          '3fp': 'يَأْمُمْنَ',
        })
      })

      test('حَبَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('حبب', 1), 'subjunctive')).toEqualT({
          '1s': 'أَحِبَّ',
          '2ms': 'تَحِبَّ',
          '2fs': 'تَحِبِّي',
          '3ms': 'يَحِبَّ',
          '3fs': 'تَحِبَّ',
          '2d': 'تَحِبَّا',
          '3md': 'يَحِبَّا',
          '3fd': 'تَحِبَّا',
          '1p': 'نَحِبَّ',
          '2mp': 'تَحِبُّوْا',
          '2fp': 'تَحْبِبْنَ',
          '3mp': 'يَحِبُّوْا',
          '3fp': 'يَحْبِبْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([['وقف', 'يَقِفَ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('وَقَفَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وقف', 1), 'subjunctive')).toEqualT({
          '1s': 'أَقِفَ',
          '2ms': 'تَقِفَ',
          '2fs': 'تَقِفِي',
          '3ms': 'يَقِفَ',
          '3fs': 'تَقِفَ',
          '2d': 'تَقِفَا',
          '3md': 'يَقِفَا',
          '3fd': 'تَقِفَا',
          '1p': 'نَقِفَ',
          '2mp': 'تَقِفُوْا',
          '2fp': 'تَقِفْنَ',
          '3mp': 'يَقِفُوْا',
          '3fp': 'يَقِفْنَ',
        })
      })

      test('وَضَعَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وضع', 1), 'subjunctive')).toEqualT({
          '1s': 'أَضَعَ',
          '2ms': 'تَضَعَ',
          '2fs': 'تَضَعِي',
          '3ms': 'يَضَعَ',
          '3fs': 'تَضَعَ',
          '2d': 'تَضَعَا',
          '3md': 'يَضَعَا',
          '3fd': 'تَضَعَا',
          '1p': 'نَضَعَ',
          '2mp': 'تَضَعُوْا',
          '2fp': 'تَضَعْنَ',
          '3mp': 'يَضَعُوْا',
          '3fp': 'يَضَعْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عوز', 'يَعْوَزَ'],
        ['عوم', 'يَعُومَ'],
        ['حول', 'يَحُولَ'],
        ['خور', 'يَخْوَرَ'],
        ['قول', 'يَقُولَ'],
        ['خوف', 'يَخَافَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('شَادَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('شيد', 1), 'subjunctive')).toEqualT({
          '1s': 'أَشِيدَ',
          '2ms': 'تَشِيدَ',
          '2fs': 'تَشِيدِي',
          '3ms': 'يَشِيدَ',
          '3fs': 'تَشِيدَ',
          '2d': 'تَشِيدَا',
          '3md': 'يَشِيدَا',
          '3fd': 'تَشِيدَا',
          '1p': 'نَشِيدَ',
          '2mp': 'تَشِيدُوْا',
          '2fp': 'تَشِدْنَ',
          '3mp': 'يَشِيدُوْا',
          '3fp': 'يَشِدْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['غشي', 'يَغْشِيَ'],
        ['بدو', 'يَبْدُوَ'],
        ['علي', 'يَعْلِيَ'],
        ['جدو', 'يَجْدُوَ'],
        ['لهو', 'يَلْهُوَ'],
        ['شفي', 'يَشْفِيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('بَقِيَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('بقي', 1), 'subjunctive')).toEqualT({
          '1s': 'أَبْقَى',
          '2ms': 'تَبْقَى',
          '2fs': 'تَبْقَيْ',
          '3ms': 'يَبْقَى',
          '3fs': 'تَبْقَى',
          '2d': 'تَبْقَيَا',
          '3md': 'يَبْقَيَا',
          '3fd': 'تَبْقَيَا',
          '1p': 'نَبْقَى',
          '2mp': 'تَبْقَوْا',
          '2fp': 'تَبْقَيْنَ',
          '3mp': 'يَبْقَوْا',
          '3fp': 'يَبْقَيْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['قوي', 'يَقْوَى'],
        ['جوي', 'يَجْوَى'],
        ['روى', 'يَرْوِيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('جَوِيَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('جوي', 1), 'subjunctive')).toEqualT({
          '1s': 'أَجْوَى',
          '2ms': 'تَجْوَى',
          '2fs': 'تَجْوَيْ',
          '3ms': 'يَجْوَى',
          '3fs': 'تَجْوَى',
          '2d': 'تَجْوَيَا',
          '3md': 'يَجْوَيَا',
          '3fd': 'تَجْوَيَا',
          '1p': 'نَجْوَى',
          '2mp': 'تَجْوَوْا',
          '2fp': 'تَجْوَيْنَ',
          '3mp': 'يَجْوَوْا',
          '3fp': 'يَجْوَيْنَ',
        })
      })

      test('رَوِيَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('روي', 1), 'subjunctive')).toEqualT({
          '1s': 'أَرْوِيَ',
          '2ms': 'تَرْوِيَ',
          '2fs': 'تَرْوِي',
          '3ms': 'يَرْوِيَ',
          '3fs': 'تَرْوِيَ',
          '2d': 'تَرْوِيَا',
          '3md': 'يَرْوِيَا',
          '3fd': 'تَرْوِيَا',
          '1p': 'نَرْوِيَ',
          '2mp': 'تَرْوُوْا',
          '2fp': 'تَرْوِينَ',
          '3mp': 'يَرْوُوْا',
          '3fp': 'يَرْوِينَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['جرء', 'يَجْرُؤَ'],
        ['كلأ', 'يَكْلُؤَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('قَرَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قرأ', 1), 'subjunctive')).toEqualT({
          '1s': 'أَقْرَأَ',
          '2ms': 'تَقْرَأَ',
          '2fs': 'تَقْرَئِي',
          '3ms': 'يَقْرَأَ',
          '3fs': 'تَقْرَأَ',
          '2d': 'تَقْرَآ',
          '3md': 'يَقْرَآ',
          '3fd': 'تَقْرَآ',
          '1p': 'نَقْرَأَ',
          '2mp': 'تَقْرَأُوْا',
          '2fp': 'تَقْرَأْنَ',
          '3mp': 'يَقْرَأُوْا',
          '3fp': 'يَقْرَأْنَ',
        })
      })

      test('كَلَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('كلأ', 1), 'subjunctive')).toEqualT({
          '1s': 'أَكْلُؤَ',
          '2ms': 'تَكْلُؤَ',
          '2fs': 'تَكْلُئِي',
          '3ms': 'يَكْلُؤَ',
          '3fs': 'تَكْلُؤَ',
          '2d': 'تَكْلُؤَا',
          '3md': 'يَكْلُؤَا',
          '3fd': 'تَكْلُؤَا',
          '1p': 'نَكْلُؤَ',
          '2mp': 'تَكْلُؤُوْا',
          '2fp': 'تَكْلُؤْنَ',
          '3mp': 'يَكْلُؤُوْا',
          '3fp': 'يَكْلُؤْنَ',
        })
      })

      test('بَدَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('بدأ', 1), 'subjunctive')).toEqualT({
          '1s': 'أَبْدَأَ',
          '2ms': 'تَبْدَأَ',
          '2fs': 'تَبْدَئِي',
          '3ms': 'يَبْدَأَ',
          '3fs': 'تَبْدَأَ',
          '2d': 'تَبْدَآ',
          '3md': 'يَبْدَآ',
          '3fd': 'تَبْدَآ',
          '1p': 'نَبْدَأَ',
          '2mp': 'تَبْدَأُوْا',
          '2fp': 'تَبْدَأْنَ',
          '3mp': 'يَبْدَأُوْا',
          '3fp': 'يَبْدَأْنَ',
        })
      })
    })

    describe('hamzated middle roots', () => {
      test.each([['بءس', 'يَبْؤُسَ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([['أني', 'يَأْنِيَ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('أَبَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('أبي', 1), 'subjunctive')).toEqualT({
          '1s': 'آبَى',
          '2ms': 'تَأْبَى',
          '2fs': 'تَأْبَيْ',
          '3ms': 'يَأْبَى',
          '3fs': 'تَأْبَى',
          '2d': 'تَأْبَيَا',
          '3md': 'يَأْبَيَا',
          '3fd': 'تَأْبَيَا',
          '1p': 'نَأْبَى',
          '2mp': 'تَأْبَوْا',
          '2fp': 'تَأْبَيْنَ',
          '3mp': 'يَأْبَوْا',
          '3fp': 'يَأْبَيْنَ',
        })
      })

      test('أَتَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('أتي', 1), 'subjunctive')).toEqualT({
          '1s': 'آتِيَ',
          '2ms': 'تَأْتِيَ',
          '2fs': 'تَأْتِي',
          '3ms': 'يَأْتِيَ',
          '3fs': 'تَأْتِيَ',
          '2d': 'تَأْتِيَا',
          '3md': 'يَأْتِيَا',
          '3fd': 'تَأْتِيَا',
          '1p': 'نَأْتِيَ',
          '2mp': 'تَأْتُوْا',
          '2fp': 'تَأْتِينَ',
          '3mp': 'يَأْتُوْا',
          '3fp': 'يَأْتِينَ',
        })
      })
    })

    describe('hamzated middle defective roots', () => {
      test.each([['رأى', 'يَرَى']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('رَأَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('رأى', 1), 'subjunctive')).toEqualT({
          '1s': 'أَرَى',
          '2ms': 'تَرَى',
          '2fs': 'تَرَيْ',
          '3ms': 'يَرَى',
          '3fs': 'تَرَى',
          '2d': 'تَرَيَا',
          '3md': 'يَرَيَا',
          '3fd': 'تَرَيَا',
          '1p': 'نَرَى',
          '2mp': 'تَرَوْا',
          '2fp': 'تَرَيْنَ',
          '3mp': 'يَرَوْا',
          '3fp': 'يَرَيْنَ',
        })
      })
    })

    describe('hamzated final assimilated roots', () => {
      test('وَأَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('وأى', 1), 'subjunctive')).toEqualT({
          '1s': 'أَئِيَ',
          '2ms': 'تَئِيَ',
          '2fs': 'تَئِي',
          '3ms': 'يَئِيَ',
          '3fs': 'تَئِيَ',
          '2d': 'تَئِيَا',
          '3md': 'يَئِيَا',
          '3fd': 'تَئِيَا',
          '1p': 'نَئِيَ',
          '2mp': 'تَأُوْا',
          '2fp': 'تَئِينَ',
          '3mp': 'يَأُوْا',
          '3fp': 'يَئِينَ',
        })
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([
        ['بوء', 'يَبُوءَ'],
        ['نوء', 'يَنُوءَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('changes final damma to fatḥa for جَاءَ', () => {
        expect(conjugatePresentMood(getVerb('جيء', 1), 'subjunctive')).toMatchObjectT({
          '3ms': 'يَجِيءَ',
          '2ms': 'تَجِيءَ',
          '1s': 'أَجِيءَ',
          '1p': 'نَجِيءَ',
          '3fs': 'تَجِيءَ',
        })
      })
    })

    describe('hamzated initial hollow roots', () => {
      test.each([['أول', 'يَؤُولَ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('يَؤُولَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('أول', 1), 'subjunctive')).toEqualT({
          '1s': 'أَؤُولَ',
          '2ms': 'تَؤُولَ',
          '2fs': 'تَؤُولِي',
          '3ms': 'يَؤُولَ',
          '3fs': 'تَؤُولَ',
          '2d': 'تَؤُولَا',
          '3md': 'يَؤُولَا',
          '3fd': 'تَؤُولَا',
          '1p': 'نَؤُولَ',
          '2mp': 'تَؤُولُوْا',
          '2fp': 'تَؤُلْنَ',
          '3mp': 'يَؤُولُوْا',
          '3fp': 'يَؤُلْنَ',
        })
      })
    })

    describe('hamzated hollow-defective roots', () => {
      test.each([['أوي', 'يَأْوِيَ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('أَوَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('أوي', 1), 'subjunctive')).toEqualT({
          '1s': 'آوِيَ',
          '2ms': 'تَأْوِيَ',
          '2fs': 'تَأْوِي',
          '3ms': 'يَأْوِيَ',
          '3fs': 'تَأْوِيَ',
          '2d': 'تَأْوِيَا',
          '3md': 'يَأْوِيَا',
          '3fd': 'تَأْوِيَا',
          '1p': 'نَأْوِيَ',
          '2mp': 'تَأْوُوْا',
          '2fp': 'تَأْوِينَ',
          '3mp': 'يَأْوُوْا',
          '3fp': 'يَأْوِينَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['أمر', 'يَأْمُرَ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form II', () => {
    describe('regular roots', () => {
      test.each([
        ['مكن', 'يُمَكِّنَ'],
        ['مثل', 'يُمَثِّلَ'],
        ['سبب', 'يُسَبِّبَ'],
        ['خطط', 'يُخَطِّطَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حدد', 'يُحَدِّدَ'],
        ['قرر', 'يُقَرِّرَ'],
        ['شدد', 'يُشَدِّدَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وطن', 'يُوَطِّنَ'],
        ['وجه', 'يُوَجِّهَ'],
        ['وقف', 'يُوَقِّفَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('يُوَسِّطَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وسط', 2), 'subjunctive')).toEqualT({
          '1s': 'أُوَسِّطَ',
          '2ms': 'تُوَسِّطَ',
          '2fs': 'تُوَسِّطِي',
          '3ms': 'يُوَسِّطَ',
          '3fs': 'تُوَسِّطَ',
          '2d': 'تُوَسِّطَا',
          '3md': 'يُوَسِّطَا',
          '3fd': 'تُوَسِّطَا',
          '1p': 'نُوَسِّطَ',
          '2mp': 'تُوَسِّطُوْا',
          '2fp': 'تُوَسِّطْنَ',
          '3mp': 'يُوَسِّطُوْا',
          '3fp': 'يُوَسِّطْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['أذي', 'يُؤَذِّيَ'],
        ['أسي', 'يُؤَسِّيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أجج', 'يُؤَجِّجَ'],
        ['أسس', 'يُؤَسِّسَ'],
        ['أخر', 'يُؤَخِّرَ'],
        ['أمر', 'يُؤَمِّرَ'],
        ['أثر', 'يُؤَثِّرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['هنأ', 'يُهَنِّئَ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final assimilated roots', () => {
      test('يُوَطِّئَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وطء', 2), 'subjunctive')).toEqualT({
          '1s': 'أُوَطِّئَ',
          '2ms': 'تُوَطِّئَ',
          '2fs': 'تُوَطِّئِي',
          '3ms': 'يُوَطِّئَ',
          '3fs': 'تُوَطِّئَ',
          '2d': 'تُوَطِّئَا',
          '3md': 'يُوَطِّئَا',
          '3fd': 'تُوَطِّئَا',
          '1p': 'نُوَطِّئَ',
          '2mp': 'تُوَطِّئُوْا',
          '2fp': 'تُوَطِّئْنَ',
          '3mp': 'يُوَطِّئُوْا',
          '3fp': 'يُوَطِّئْنَ',
        })
      })
    })

    describe('hamzated initial hollow roots', () => {
      test('أَيَّدَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('أيد', 2), 'subjunctive')).toEqualT({
          '1s': 'أُؤَيِّدَ',
          '2ms': 'تُؤَيِّدَ',
          '2fs': 'تُؤَيِّدِي',
          '3ms': 'يُؤَيِّدَ',
          '3fs': 'تُؤَيِّدَ',
          '2d': 'تُؤَيِّدَا',
          '3md': 'يُؤَيِّدَا',
          '3fd': 'تُؤَيِّدَا',
          '1p': 'نُؤَيِّدَ',
          '2mp': 'تُؤَيِّدُوْا',
          '2fp': 'تُؤَيِّدْنَ',
          '3mp': 'يُؤَيِّدُوْا',
          '3fp': 'يُؤَيِّدْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قوس', 'يُقَوِّسَ'],
        ['كون', 'يُكَوِّنَ'],
        ['دون', 'يُدَوِّنَ'],
        ['سوف', 'يُسَوِّفَ'],
        ['كيف', 'يُكَيِّفَ'],
        ['أول', 'يُؤَوِّلَ'],
        ['أوب', 'يُؤَوِّبَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['يود', 'يُيَوِّدَ'],
        ['وفي', 'يُوَفِّيَ'],
        ['وصي', 'يُوَصِّيَ'],
        ['ولي', 'يُوَلِّيَ'],
        ['وري', 'يُوَرِّيَ'],
        ['مني', 'يُمَنِّيَ'],
        ['حيي', 'يُحَيِّيَ'],
        ['سمي', 'يُسَمِّيَ'],
        ['غطي', 'يُغَطِّيَ'],
        ['غني', 'يُغَنِّيَ'],
        ['قوي', 'يُقَوِّيَ'],
        ['زوي', 'يُزَوِّيَ'],
        ['هوي', 'يُهَوِّيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form III', () => {
    describe('regular roots', () => {
      test.each([
        ['عمل', 'يُعَامِلَ'],
        ['تبع', 'يُتَابِعَ'],
        ['بلغ', 'يُبَالِغَ'],
        ['سعد', 'يُسَاعِدَ'],
        ['صحب', 'يُصَاحِبَ'],
        ['وجه', 'يُوَاجِهَ'],
        ['وثق', 'يُوَاثِقَ'],
        ['وعد', 'يُوَاعِدَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وزي', 'يُوَازِيَ'],
        ['وفي', 'يُوَافِيَ'],
        ['وسي', 'يُوَاسِيَ'],
        ['نوي', 'يُنَاوِيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([['ندي', 'يُنَادِيَ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated middle roots', () => {
      test.each([['وأم', 'يُوَائِمَ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form IV', () => {
    describe('hamzated initial defective roots', () => {
      test.each([['أتي', 'يُؤْتِيَ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form IX', () => {
    describe('regular roots', () => {
      test('shadda is preserved', () => {
        expect(conjugatePresentMood(getVerb('حمر', 9), 'subjunctive')).toMatchObjectT({
          '3ms': 'يَحْمَرَّ',
          '2ms': 'تَحْمَرَّ',
          '1s': 'أَحْمَرَّ',
        })
      })

      test('shadda is expanded for feminine plural', () => {
        expect(conjugatePresentMood(getVerb('حمر', 9), 'subjunctive')).toMatchObjectT({
          '2fp': 'تَحْمَرَرْنَ',
          '3fp': 'يَحْمَرَرْنَ',
        })
      })
    })
  })

  describe('Form X', () => {
    describe('hamzated final roots', () => {
      test('اِسْتَقْرَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قرأ', 10), 'subjunctive')).toEqualT({
          '1s': 'أَسْتَقْرِئَ',
          '2ms': 'تَسْتَقْرِئَ',
          '2fs': 'تَسْتَقْرِئِي',
          '3ms': 'يَسْتَقْرِئَ',
          '3fs': 'تَسْتَقْرِئَ',
          '2d': 'تَسْتَقْرِئَا',
          '3md': 'يَسْتَقْرِئَا',
          '3fd': 'تَسْتَقْرِئَا',
          '1p': 'نَسْتَقْرِئَ',
          '2mp': 'تَسْتَقْرِئُوْا',
          '2fp': 'تَسْتَقْرِئْنَ',
          '3mp': 'يَسْتَقْرِئُوْا',
          '3fp': 'يَسْتَقْرِئْنَ',
        })
      })
    })
  })
})
