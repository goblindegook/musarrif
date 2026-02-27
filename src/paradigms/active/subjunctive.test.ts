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
        ['كلم', 'يَكْلِمَ'],
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

      test('وَهُنَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وهن', 1), 'subjunctive')).toEqualT({
          '1s': 'أَهُنَ',
          '2ms': 'تَهُنَ',
          '2fs': 'تَهُنِي',
          '3ms': 'يَهُنَ',
          '3fs': 'تَهُنَ',
          '2d': 'تَهُنَا',
          '3md': 'يَهُنَا',
          '3fd': 'تَهُنَا',
          '1p': 'نَهُنَ',
          '2mp': 'تَهُنُوْا',
          '2fp': 'تَهُنَّ',
          '3mp': 'يَهُنُوْا',
          '3fp': 'يَهُنَّ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['زيد', 'يَزِيدَ'],
        ['عوز', 'يَعْوَزَ'],
        ['عوم', 'يَعُومَ'],
        ['حول', 'يَحُولَ'],
        ['موت', 'يَمُوتَ'],
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

    describe('hollow roots', () => {
      test('اِنْقَادَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قود', 7), 'subjunctive')).toEqualT({
          '1s': 'أَنْقَادَ',
          '2ms': 'تَنْقَادَ',
          '2fs': 'تَنْقَادِي',
          '3ms': 'يَنْقَادَ',
          '3fs': 'تَنْقَادَ',
          '2d': 'تَنْقَادَا',
          '3md': 'يَنْقَادَا',
          '3fd': 'تَنْقَادَا',
          '1p': 'نَنْقَادَ',
          '2mp': 'تَنْقَادُوْا',
          '2fp': 'تَنْقَدْنَ',
          '3mp': 'يَنْقَادُوْا',
          '3fp': 'يَنْقَدْنَ',
        })
      })

      test('اِنْهَالَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('هيل', 7), 'subjunctive')).toEqualT({
          '1s': 'أَنْهَالَ',
          '2ms': 'تَنْهَالَ',
          '2fs': 'تَنْهَالِي',
          '3ms': 'يَنْهَالَ',
          '3fs': 'تَنْهَالَ',
          '2d': 'تَنْهَالَا',
          '3md': 'يَنْهَالَا',
          '3fd': 'تَنْهَالَا',
          '1p': 'نَنْهَالَ',
          '2mp': 'تَنْهَالُوْا',
          '2fp': 'تَنْهَلْنَ',
          '3mp': 'يَنْهَالُوْا',
          '3fp': 'يَنْهَلْنَ',
        })
      })

      test('اِنْحَازَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('حوز', 7), 'subjunctive')).toEqualT({
          '1s': 'أَنْحَازَ',
          '2ms': 'تَنْحَازَ',
          '2fs': 'تَنْحَازِي',
          '3ms': 'يَنْحَازَ',
          '3fs': 'تَنْحَازَ',
          '2d': 'تَنْحَازَا',
          '3md': 'يَنْحَازَا',
          '3fd': 'تَنْحَازَا',
          '1p': 'نَنْحَازَ',
          '2mp': 'تَنْحَازُوْا',
          '2fp': 'تَنْحَزْنَ',
          '3mp': 'يَنْحَازُوْا',
          '3fp': 'يَنْحَزْنَ',
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
        ['وري', 'يَرِيَ'],
        ['قوي', 'يَقْوَى'],
        ['جوي', 'يَجْوَى'],
        ['روي', 'يَرْوِيَ'],
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
          '2fp': 'تَرْوِيْنَ',
          '3mp': 'يَرْوُوْا',
          '3fp': 'يَرْوِيْنَ',
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
          '2fp': 'تَأْتِيْنَ',
          '3mp': 'يَأْتُوْا',
          '3fp': 'يَأْتِيْنَ',
        })
      })
    })

    describe('hamzated middle defective roots', () => {
      test.each([['رءي', 'يَرَى']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('رَأَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('رءي', 1), 'subjunctive')).toEqualT({
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
        expect(conjugatePresentMood(getVerb('وءي', 1), 'subjunctive')).toEqualT({
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
          '2fp': 'تَئِيْنَ',
          '3mp': 'يَأُوْا',
          '3fp': 'يَئِيْنَ',
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
          '2fp': 'تَأْوِيْنَ',
          '3mp': 'يَأْوُوْا',
          '3fp': 'يَأْوِيْنَ',
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
        ['كلم', 'يُكَالِمَ'],
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

    describe('geminate roots', () => {
      test.each([
        ['سرر', 'يُسَارَّ'],
        ['ردد', 'يُرَادَّ'],
        ['مدد', 'يُمَادَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('سَارَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('سرر', 3), 'subjunctive')).toEqualT({
          '1s': 'أُسَارَّ',
          '2ms': 'تُسَارَّ',
          '2fs': 'تُسَارِّي',
          '3ms': 'يُسَارَّ',
          '3fs': 'تُسَارَّ',
          '2d': 'تُسَارَّا',
          '3md': 'يُسَارَّا',
          '3fd': 'تُسَارَّا',
          '1p': 'نُسَارَّ',
          '2mp': 'تُسَارُّوْا',
          '2fp': 'تُسَارِرْنَ',
          '3mp': 'يُسَارُّوْا',
          '3fp': 'يُسَارِرْنَ',
        })
      })

      test('رَادَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ردد', 3), 'subjunctive')).toEqualT({
          '1s': 'أُرَادَّ',
          '2ms': 'تُرَادَّ',
          '2fs': 'تُرَادِّي',
          '3ms': 'يُرَادَّ',
          '3fs': 'تُرَادَّ',
          '2d': 'تُرَادَّا',
          '3md': 'يُرَادَّا',
          '3fd': 'تُرَادَّا',
          '1p': 'نُرَادَّ',
          '2mp': 'تُرَادُّوْا',
          '2fp': 'تُرَادِدْنَ',
          '3mp': 'يُرَادُّوْا',
          '3fp': 'يُرَادِدْنَ',
        })
      })

      test('مَادَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('مدد', 3), 'subjunctive')).toEqualT({
          '1s': 'أُمَادَّ',
          '2ms': 'تُمَادَّ',
          '2fs': 'تُمَادِّي',
          '3ms': 'يُمَادَّ',
          '3fs': 'تُمَادَّ',
          '2d': 'تُمَادَّا',
          '3md': 'يُمَادَّا',
          '3fd': 'تُمَادَّا',
          '1p': 'نُمَادَّ',
          '2mp': 'تُمَادُّوْا',
          '2fp': 'تُمَادِدْنَ',
          '3mp': 'يُمَادُّوْا',
          '3fp': 'يُمَادِدْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عون', 'يُعَاوِنَ'],
        ['قوم', 'يُقَاوِمَ'],
        ['عود', 'يُعَاوِدَ'],
        ['جوز', 'يُجَاوِزَ'],
        ['نول', 'يُنَاوِلَ'],
        ['ضيق', 'يُضَايِقَ'],
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
      test.each([
        ['ندي', 'يُنَادِيَ'],
        ['رعي', 'يُرَاعِيَ'],
        ['بلي', 'يُبَالِيَ'],
        ['قضي', 'يُقَاضِيَ'],
        ['بري', 'يُبَارِيَ'],
        ['رءي', 'يُرَائِيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخذ', 'يُؤَاخِذَ'],
        ['أجر', 'يُؤَاجِرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('آخَذَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('أخذ', 3), 'subjunctive')).toEqualT({
          '1s': 'أُؤَاخِذَ',
          '2ms': 'تُؤَاخِذَ',
          '2fs': 'تُؤَاخِذِي',
          '3ms': 'يُؤَاخِذَ',
          '3fs': 'تُؤَاخِذَ',
          '2d': 'تُؤَاخِذَا',
          '3md': 'يُؤَاخِذَا',
          '3fd': 'تُؤَاخِذَا',
          '1p': 'نُؤَاخِذَ',
          '2mp': 'تُؤَاخِذُوْا',
          '2fp': 'تُؤَاخِذْنَ',
          '3mp': 'يُؤَاخِذُوْا',
          '3fp': 'يُؤَاخِذْنَ',
        })
      })

      test('آجَرَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('أجر', 3), 'subjunctive')).toEqualT({
          '1s': 'أُؤَاجِرَ',
          '2ms': 'تُؤَاجِرَ',
          '2fs': 'تُؤَاجِرِي',
          '3ms': 'يُؤَاجِرَ',
          '3fs': 'تُؤَاجِرَ',
          '2d': 'تُؤَاجِرَا',
          '3md': 'يُؤَاجِرَا',
          '3fd': 'تُؤَاجِرَا',
          '1p': 'نُؤَاجِرَ',
          '2mp': 'تُؤَاجِرُوْا',
          '2fp': 'تُؤَاجِرْنَ',
          '3mp': 'يُؤَاجِرُوْا',
          '3fp': 'يُؤَاجِرْنَ',
        })
      })
    })

    describe('hamzated middle roots', () => {
      test.each([
        ['وأم', 'يُوَائِمَ'],
        ['لأم', 'يُلَائِمَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['فجأ', 'يُفَاجِئَ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('فَاجَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('فجأ', 3), 'subjunctive')).toEqualT({
          '1s': 'أُفَاجِئَ',
          '2ms': 'تُفَاجِئَ',
          '2fs': 'تُفَاجِئِي',
          '3ms': 'يُفَاجِئَ',
          '3fs': 'تُفَاجِئَ',
          '2d': 'تُفَاجِئَا',
          '3md': 'يُفَاجِئَا',
          '3fd': 'تُفَاجِئَا',
          '1p': 'نُفَاجِئَ',
          '2mp': 'تُفَاجِئُوْا',
          '2fp': 'تُفَاجِئْنَ',
          '3mp': 'يُفَاجِئُوْا',
          '3fp': 'يُفَاجِئْنَ',
        })
      })
    })
  })

  describe('Form IV', () => {
    describe('regular roots', () => {
      test.each([
        ['كثر', 'يُكْثِرَ'],
        ['علم', 'يُعْلِمَ'],
        ['لحق', 'يُلْحِقَ'],
        ['صبح', 'يُصْبِحَ'],
        ['وقف', 'يُوْقِفَ'],
        ['وقع', 'يُوْقِعَ'],
        ['ولد', 'يُوْلِدَ'],
        ['وصل', 'يُوْصِلَ'],
        ['عرب', 'يُعْرِبَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('أَوْضَحَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وضح', 4), 'subjunctive')).toEqualT({
          '1s': 'أُوْضِحَ',
          '2ms': 'تُوْضِحَ',
          '2fs': 'تُوْضِحِي',
          '3ms': 'يُوْضِحَ',
          '3fs': 'تُوْضِحَ',
          '2d': 'تُوْضِحَا',
          '3md': 'يُوْضِحَا',
          '3fd': 'تُوْضِحَا',
          '1p': 'نُوْضِحَ',
          '2mp': 'تُوْضِحُوْا',
          '2fp': 'تُوْضِحْنَ',
          '3mp': 'يُوْضِحُوْا',
          '3fp': 'يُوْضِحْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['تمم', 'يُتِمَّ'],
        ['سفف', 'يُسِفَّ'],
        ['حبب', 'يُحِبَّ'],
        ['عدد', 'يُعِدَّ'],
        ['همم', 'يُهِمَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['شور', 'يُشِيرَ'],
        ['رود', 'يُرِيدَ'],
        ['تيح', 'يُتِيحَ'],
        ['فيد', 'يُفِيدَ'],
        ['عود', 'يُعِيدَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['علي', 'يُعْلِيَ'],
        ['بقي', 'يُبْقِيَ'],
        ['سمي', 'يُسْمِيَ'],
        ['عطي', 'يُعْطِيَ'],
        ['لقي', 'يُلْقِيَ'],
        ['وصي', 'يُوْصِيَ'],
        ['وحي', 'يُوْحِيَ'],
        ['وفي', 'يُوْفِيَ'],
        ['ودي', 'يُوْدِيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('أَحْيَا conjugation', () => {
        expect(conjugatePresentMood(getVerb('حيي', 4), 'subjunctive')).toEqualT({
          '1s': 'أُحْيِيَ',
          '2ms': 'تُحْيِيَ',
          '2fs': 'تُحْيِي',
          '3ms': 'يُحْيِيَ',
          '3fs': 'تُحْيِيَ',
          '2d': 'تُحْيِيَا',
          '3md': 'يُحْيِيَا',
          '3fd': 'تُحْيِيَا',
          '1p': 'نُحْيِيَ',
          '2mp': 'تُحْيُوْا',
          '2fp': 'تُحْيِيْنَ',
          '3mp': 'يُحْيُوْا',
          '3fp': 'يُحْيِيْنَ',
        })
      })

      test('أَرَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('رءي', 4), 'subjunctive')).toEqualT({
          '1s': 'أُرِيَ',
          '2ms': 'تُرِيَ',
          '2fs': 'تُرِي',
          '3ms': 'يُرِيَ',
          '3fs': 'تُرِيَ',
          '2d': 'تُرِيَا',
          '3md': 'يُرِيَا',
          '3fd': 'تُرِيَا',
          '1p': 'نُرِيَ',
          '2mp': 'تُرُوْا',
          '2fp': 'تُرِينَ',
          '3mp': 'يُرُوْا',
          '3fp': 'يُرِينَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['ومأ', 'يُوْمِئَ'],
        ['نشأ', 'يُنْشِئَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أذن', 'يُؤْذِنَ'],
        ['أمن', 'يُؤْمِنَ'],
        ['ألم', 'يُؤْلِمَ'],
        ['أجر', 'يُؤْجِرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([['ضوء', 'يُضِيءَ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('أَضَاءَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ضوء', 4), 'subjunctive')).toEqualT({
          '1s': 'أُضِيءَ',
          '2ms': 'تُضِيءَ',
          '2fs': 'تُضِيئِي',
          '3ms': 'يُضِيءَ',
          '3fs': 'تُضِيءَ',
          '2d': 'تُضِيئَا',
          '3md': 'يُضِيئَا',
          '3fd': 'تُضِيئَا',
          '1p': 'نُضِيءَ',
          '2mp': 'تُضِيئُوْا',
          '2fp': 'تُضِئْنَ',
          '3mp': 'يُضِيئُوْا',
          '3fp': 'يُضِئْنَ',
        })
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([['أتي', 'يُؤْتِيَ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form V', () => {
    describe('regular roots', () => {
      test.each([
        ['حدث', 'يَتَحَدَّثَ'],
        ['مثل', 'يَتَمَثَّلَ'],
        ['عرف', 'يَتَعَرَّفَ'],
        ['هدد', 'يَتَهَدَّدَ'],
        ['حدد', 'يَتَحَدَّدَ'],
        ['عزز', 'يَتَعَزَّزَ'],
        ['سبب', 'يَتَسَبَّبَ'],
        ['قرر', 'يَتَقَرَّرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخر', 'يَتَأَخَّرَ'],
        ['ألف', 'يَتَأَلَّفَ'],
        ['أول', 'يَتَأَوَّلَ'],
        ['أكد', 'يَتَأَكَّدَ'],
        ['أكل', 'يَتَأَكَّلَ'],
        ['أثر', 'يَتَأَثَّرَ'],
        ['أوه', 'يَتَأَوَّهَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([['أمم', 'يَتَأَمَّمَ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([['أذي', 'يَتَأَذَّى']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وصل', 'يَتَوَصَّلَ'],
        ['وفر', 'يَتَوَفَّرَ'],
        ['وقف', 'يَتَوَقَّفَ'],
        ['وكأ', 'يَتَوَكَّأَ'],
        ['وقع', 'يَتَوَقَّعَ'],
        ['وسع', 'يَتَوَسَّعَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['حول', 'يَتَحَوَّلَ'],
        ['قول', 'يَتَقَوَّلَ'],
        ['عين', 'يَتَعَيَّنَ'],
        ['غير', 'يَتَغَيَّرَ'],
        ['طور', 'يَتَطَوَّرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['بقي', 'يَتَبَقَّى'],
        ['سني', 'يَتَسَنَّى'],
        ['بني', 'يَتَبَنَّى'],
        ['حدي', 'يَتَحَدَّى'],
        ['سمي', 'يَتَسَمَّى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('تَرَأَّى conjugation', () => {
        expect(conjugatePresentMood(getVerb('رءي', 5), 'subjunctive')).toEqualT({
          '1s': 'أَتَرَأَّى',
          '2ms': 'تَتَرَأَّى',
          '2fs': 'تَتَرَأَّي',
          '3ms': 'يَتَرَأَّى',
          '3fs': 'تَتَرَأَّى',
          '2d': 'تَتَرَأَّيَا',
          '3md': 'يَتَرَأَّيَا',
          '3fd': 'تَتَرَأَّيَا',
          '1p': 'نَتَرَأَّى',
          '2mp': 'تَتَرَأَّوْا',
          '2fp': 'تَتَرَأَّيْنَ',
          '3mp': 'يَتَرَأَّوْا',
          '3fp': 'يَتَرَأَّيْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test('تَوَفَّى conjugation', () => {
        expect(conjugatePresentMood(getVerb('وفي', 5), 'subjunctive')).toEqualT({
          '1s': 'أَتَوَفَّى',
          '2ms': 'تَتَوَفَّى',
          '2fs': 'تَتَوَفَّي',
          '3ms': 'يَتَوَفَّى',
          '3fs': 'تَتَوَفَّى',
          '2d': 'تَتَوَفَّيَا',
          '3md': 'يَتَوَفَّيَا',
          '3fd': 'تَتَوَفَّيَا',
          '1p': 'نَتَوَفَّى',
          '2mp': 'تَتَوَفَّوْا',
          '2fp': 'تَتَوَفَّيْنَ',
          '3mp': 'يَتَوَفَّوْا',
          '3fp': 'يَتَوَفَّيْنَ',
        })
      })

      test('تَوَقَّى conjugation', () => {
        expect(conjugatePresentMood(getVerb('وقي', 5), 'subjunctive')).toEqualT({
          '1s': 'أَتَوَقَّى',
          '2ms': 'تَتَوَقَّى',
          '2fs': 'تَتَوَقَّي',
          '3ms': 'يَتَوَقَّى',
          '3fs': 'تَتَوَقَّى',
          '2d': 'تَتَوَقَّيَا',
          '3md': 'يَتَوَقَّيَا',
          '3fd': 'تَتَوَقَّيَا',
          '1p': 'نَتَوَقَّى',
          '2mp': 'تَتَوَقَّوْا',
          '2fp': 'تَتَوَقَّيْنَ',
          '3mp': 'يَتَوَقَّوْا',
          '3fp': 'يَتَوَقَّيْنَ',
        })
      })

      test('تَوَخَّى conjugation', () => {
        expect(conjugatePresentMood(getVerb('وخي', 5), 'subjunctive')).toEqualT({
          '1s': 'أَتَوَخَّى',
          '2ms': 'تَتَوَخَّى',
          '2fs': 'تَتَوَخَّي',
          '3ms': 'يَتَوَخَّى',
          '3fs': 'تَتَوَخَّى',
          '2d': 'تَتَوَخَّيَا',
          '3md': 'يَتَوَخَّيَا',
          '3fd': 'تَتَوَخَّيَا',
          '1p': 'نَتَوَخَّى',
          '2mp': 'تَتَوَخَّوْا',
          '2fp': 'تَتَوَخَّيْنَ',
          '3mp': 'يَتَوَخَّوْا',
          '3fp': 'يَتَوَخَّيْنَ',
        })
      })

      test.each([['زوي', 'يَتَزَوَّى']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final hollow roots', () => {
      test('تَهَيَّأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('هيء', 5), 'subjunctive')).toEqualT({
          '1s': 'أَتَهَيَّأَ',
          '2ms': 'تَتَهَيَّأَ',
          '2fs': 'تَتَهَيَّئِي',
          '3ms': 'يَتَهَيَّأَ',
          '3fs': 'تَتَهَيَّأَ',
          '2d': 'تَتَهَيَّآ',
          '3md': 'يَتَهَيَّآ',
          '3fd': 'تَتَهَيَّآ',
          '1p': 'نَتَهَيَّأَ',
          '2mp': 'تَتَهَيَّؤُوْا',
          '2fp': 'تَتَهَيَّأْنَ',
          '3mp': 'يَتَهَيَّؤُوْا',
          '3fp': 'يَتَهَيَّأْنَ',
        })
      })

      test('تَضَوَّأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ضوء', 5), 'subjunctive')).toEqualT({
          '1s': 'أَتَضَوَّأَ',
          '2ms': 'تَتَضَوَّأَ',
          '2fs': 'تَتَضَوَّئِي',
          '3ms': 'يَتَضَوَّأَ',
          '3fs': 'تَتَضَوَّأَ',
          '2d': 'تَتَضَوَّآ',
          '3md': 'يَتَضَوَّآ',
          '3fd': 'تَتَضَوَّآ',
          '1p': 'نَتَضَوَّأَ',
          '2mp': 'تَتَضَوَّؤُوْا',
          '2fp': 'تَتَضَوَّأْنَ',
          '3mp': 'يَتَضَوَّؤُوْا',
          '3fp': 'يَتَضَوَّأْنَ',
        })
      })
    })
  })

  describe('Form VIII', () => {
    describe('regular roots', () => {
      test.each([
        ['قرح', 'يَقْتَرِحَ'],
        ['عبر', 'يَعْتَبِرَ'],
        ['عمد', 'يَعْتَمِدَ'],
        ['نظر', 'يَنْتَظِرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 8), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('اِضْطَلَعَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ضلع', 8), 'subjunctive')).toEqualT({
          '1s': 'أَضْطَلِعَ',
          '2ms': 'تَضْطَلِعَ',
          '2fs': 'تَضْطَلِعِي',
          '3ms': 'يَضْطَلِعَ',
          '3fs': 'تَضْطَلِعَ',
          '2d': 'تَضْطَلِعَا',
          '3md': 'يَضْطَلِعَا',
          '3fd': 'تَضْطَلِعَا',
          '1p': 'نَضْطَلِعَ',
          '2mp': 'تَضْطَلِعُوْا',
          '2fp': 'تَضْطَلِعْنَ',
          '3mp': 'يَضْطَلِعُوْا',
          '3fp': 'يَضْطَلِعْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حلل', 'يَحْتَلَّ'],
        ['مدد', 'يَمْتَدَّ'],
        ['حجج', 'يَحْتَجَّ'],
        ['ردد', 'يَرْتَدَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 8), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('اِضْطَرَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ضرر', 8), 'subjunctive')).toEqualT({
          '1s': 'أَضْطَرَّ',
          '2ms': 'تَضْطَرَّ',
          '2fs': 'تَضْطَرِّي',
          '3ms': 'يَضْطَرَّ',
          '3fs': 'تَضْطَرَّ',
          '2d': 'تَضْطَرَّا',
          '3md': 'يَضْطَرَّا',
          '3fd': 'تَضْطَرَّا',
          '1p': 'نَضْطَرَّ',
          '2mp': 'تَضْطَرُّوْا',
          '2fp': 'تَضْطَرِرْنَ',
          '3mp': 'يَضْطَرُّوْا',
          '3fp': 'يَضْطَرِرْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['قضي', 'يَقْتَضِيَ'],
        ['ردي', 'يَرْتَدِيَ'],
        ['شري', 'يَشْتَرِيَ'],
        ['خفي', 'يَخْتَفِيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 8), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('اِرْتَأَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('رءي', 8), 'subjunctive')).toEqualT({
          '1s': 'أَرْتَئِيَ',
          '2ms': 'تَرْتَئِيَ',
          '2fs': 'تَرْتَئِي',
          '3ms': 'يَرْتَئِيَ',
          '3fs': 'تَرْتَئِيَ',
          '2d': 'تَرْتَئِيَا',
          '3md': 'يَرْتَئِيَا',
          '3fd': 'تَرْتَئِيَا',
          '1p': 'نَرْتَئِيَ',
          '2mp': 'تَرْتَئُوْا',
          '2fp': 'تَرْتَئِيْنَ',
          '3mp': 'يَرْتَئُوْا',
          '3fp': 'يَرْتَئِيْنَ',
        })
      })

      test('اِدَّعَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('دعو', 8), 'subjunctive')).toEqualT({
          '1s': 'أَدَّعِيَ',
          '2ms': 'تَدَّعِيَ',
          '2fs': 'تَدَّعِي',
          '3ms': 'يَدَّعِيَ',
          '3fs': 'تَدَّعِيَ',
          '2d': 'تَدَّعِيَا',
          '3md': 'يَدَّعِيَا',
          '3fd': 'تَدَّعِيَا',
          '1p': 'نَدَّعِيَ',
          '2mp': 'تَدَّعُوْا',
          '2fp': 'تَدَّعِيْنَ',
          '3mp': 'يَدَّعُوْا',
          '3fp': 'يَدَّعِيْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وقي', 'يَتَّقِيَ'],
        ['نوي', 'يَنْتَوِيَ'],
        ['سوي', 'يَسْتَوِيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 8), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([['سوء', 'يَسْتَاءَ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 8), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('اِزْدَادَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('زيد', 8), 'subjunctive')).toEqualT({
          '1s': 'أَزْدَادَ',
          '2ms': 'تَزْدَادَ',
          '2fs': 'تَزْدَادِي',
          '3ms': 'يَزْدَادَ',
          '3fs': 'تَزْدَادَ',
          '2d': 'تَزْدَادَا',
          '3md': 'يَزْدَادَا',
          '3fd': 'تَزْدَادَا',
          '1p': 'نَزْدَادَ',
          '2mp': 'تَزْدَادُوْا',
          '2fp': 'تَزْدَدْنَ',
          '3mp': 'يَزْدَادُوْا',
          '3fp': 'يَزْدَدْنَ',
        })
      })

      test('اِزْدَوَجَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('زوج', 8), 'subjunctive')).toEqualT({
          '1s': 'أَزْدَوِجَ',
          '2ms': 'تَزْدَوِجَ',
          '2fs': 'تَزْدَوِجِي',
          '3ms': 'يَزْدَوِجَ',
          '3fs': 'تَزْدَوِجَ',
          '2d': 'تَزْدَوِجَا',
          '3md': 'يَزْدَوِجَا',
          '3fd': 'تَزْدَوِجَا',
          '1p': 'نَزْدَوِجَ',
          '2mp': 'تَزْدَوِجُوْا',
          '2fp': 'تَزْدَوِجْنَ',
          '3mp': 'يَزْدَوِجُوْا',
          '3fp': 'يَزْدَوِجْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([['وصل', 'يَتَّصِلَ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 8), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('اِتَّكَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وكأ', 8), 'subjunctive')).toEqualT({
          '1s': 'أَتَّكِئَ',
          '2ms': 'تَتَّكِئَ',
          '2fs': 'تَتَّكِئِي',
          '3ms': 'يَتَّكِئَ',
          '3fs': 'تَتَّكِئَ',
          '2d': 'تَتَّكِئَا',
          '3md': 'يَتَّكِئَا',
          '3fd': 'تَتَّكِئَا',
          '1p': 'نَتَّكِئَ',
          '2mp': 'تَتَّكِئُوْا',
          '2fp': 'تَتَّكِئْنَ',
          '3mp': 'يَتَّكِئُوْا',
          '3fp': 'يَتَّكِئْنَ',
        })
      })
    })

    describe('hamzated initial geminate roots', () => {
      test('يَأْتَمَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('أمم', 8), 'subjunctive')).toEqualT({
          '1s': 'آتَمَّ',
          '2ms': 'تَأْتَمَّ',
          '2fs': 'تَأْتَمِّي',
          '3ms': 'يَأْتَمَّ',
          '3fs': 'تَأْتَمَّ',
          '2d': 'تَأْتَمَّا',
          '3md': 'يَأْتَمَّا',
          '3fd': 'تَأْتَمَّا',
          '1p': 'نَأْتَمَّ',
          '2mp': 'تَأْتَمُّوْا',
          '2fp': 'تَأْتَمِمْنَ',
          '3mp': 'يَأْتَمُّوْا',
          '3fp': 'يَأْتَمِمْنَ',
        })
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

  describe('Form VI', () => {
    describe('geminate roots', () => {
      test.each([
        ['حبب', 'يَتَحَابَّ'],
        ['مسس', 'يَتَمَاسَّ'],
        ['ضدد', 'يَتَضَادَّ'],
        ['ردد', 'يَتَرَادَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 6), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['نول', 'يَتَنَاوَلَ'],
        ['فوض', 'يَتَفَاوَضَ'],
        ['جوز', 'يَتَجَاوَزَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 6), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ألف', 'يَتَآلَفَ'],
        ['أكل', 'يَتَآكَلَ'],
        ['أمر', 'يَتَآمَرَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 6), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['بطأ', 'يَتَبَاطَأَ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 6), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('تَوَاطَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وطء', 6), 'subjunctive')).toEqualT({
          '1s': 'أَتَوَاطَأَ',
          '2ms': 'تَتَوَاطَأَ',
          '2fs': 'تَتَوَاطَئِي',
          '3ms': 'يَتَوَاطَأَ',
          '3fs': 'تَتَوَاطَأَ',
          '2d': 'تَتَوَاطَآ',
          '3md': 'يَتَوَاطَآ',
          '3fd': 'تَتَوَاطَآ',
          '1p': 'نَتَوَاطَأَ',
          '2mp': 'تَتَوَاطَأُوْا',
          '2fp': 'تَتَوَاطَأْنَ',
          '3mp': 'يَتَوَاطَأُوْا',
          '3fp': 'يَتَوَاطَأْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['نمو', 'يَتَنَامَى'],
        ['مشي', 'يَتَمَاشَى'],
        ['عفو', 'يَتَعَافَى'],
        ['هوي', 'يَتَهَاوَى'],
        ['ولي', 'يَتَوَالَى'],
        ['وصي', 'يَتَوَاصَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 6), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('تَنَامَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('نمو', 6), 'subjunctive')).toEqualT({
          '1s': 'أَتَنَامَى',
          '2ms': 'تَتَنَامَى',
          '2fs': 'تَتَنَامَيْ',
          '3ms': 'يَتَنَامَى',
          '3fs': 'تَتَنَامَى',
          '2d': 'تَتَنَامَيَا',
          '3md': 'يَتَنَامَيَا',
          '3fd': 'تَتَنَامَيَا',
          '1p': 'نَتَنَامَى',
          '2mp': 'تَتَنَامَوْا',
          '2fp': 'تَتَنَامَيْنَ',
          '3mp': 'يَتَنَامَوْا',
          '3fp': 'يَتَنَامَيْنَ',
        })
      })

      test('تَمَاشَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('مشي', 6), 'subjunctive')).toEqualT({
          '1s': 'أَتَمَاشَى',
          '2ms': 'تَتَمَاشَى',
          '2fs': 'تَتَمَاشَيْ',
          '3ms': 'يَتَمَاشَى',
          '3fs': 'تَتَمَاشَى',
          '2d': 'تَتَمَاشَيَا',
          '3md': 'يَتَمَاشَيَا',
          '3fd': 'تَتَمَاشَيَا',
          '1p': 'نَتَمَاشَى',
          '2mp': 'تَتَمَاشَوْا',
          '2fp': 'تَتَمَاشَيْنَ',
          '3mp': 'يَتَمَاشَوْا',
          '3fp': 'يَتَمَاشَيْنَ',
        })
      })

      test('تَعَافَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('عفو', 6), 'subjunctive')).toEqualT({
          '1s': 'أَتَعَافَى',
          '2ms': 'تَتَعَافَى',
          '2fs': 'تَتَعَافَيْ',
          '3ms': 'يَتَعَافَى',
          '3fs': 'تَتَعَافَى',
          '2d': 'تَتَعَافَيَا',
          '3md': 'يَتَعَافَيَا',
          '3fd': 'تَتَعَافَيَا',
          '1p': 'نَتَعَافَى',
          '2mp': 'تَتَعَافَوْا',
          '2fp': 'تَتَعَافَيْنَ',
          '3mp': 'يَتَعَافَوْا',
          '3fp': 'يَتَعَافَيْنَ',
        })
      })
    })
  })

  describe('Form VII', () => {
    describe('regular roots', () => {
      test.each([
        ['خفض', 'يَنْخَفِضَ'],
        ['عكس', 'يَنْعَكِسَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 7), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test('اِنْقَرَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قرأ', 7), 'subjunctive')).toEqualT({
          '1s': 'أَنْقَرِئَ',
          '2ms': 'تَنْقَرِئَ',
          '2fs': 'تَنْقَرِئِي',
          '3ms': 'يَنْقَرِئَ',
          '3fs': 'تَنْقَرِئَ',
          '2d': 'تَنْقَرِئَا',
          '3md': 'يَنْقَرِئَا',
          '3fd': 'تَنْقَرِئَا',
          '1p': 'نَنْقَرِئَ',
          '2mp': 'تَنْقَرِئُوْا',
          '2fp': 'تَنْقَرِئْنَ',
          '3mp': 'يَنْقَرِئُوْا',
          '3fp': 'يَنْقَرِئْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['قصص', 'يَنْقَصَّ'],
        ['بثث', 'يَنْبَثَّ'],
        ['كفف', 'يَنْكَفَّ'],
        ['دسس', 'يَنْدَسَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 7), 'subjunctive')['3ms']).toEqualT(expected)
      })

      test('اِنْقَصَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قصص', 7), 'subjunctive')).toEqualT({
          '1s': 'أَنْقَصَّ',
          '2ms': 'تَنْقَصَّ',
          '2fs': 'تَنْقَصِي',
          '3ms': 'يَنْقَصَّ',
          '3fs': 'تَنْقَصَّ',
          '2d': 'تَنْقَصَّا',
          '3md': 'يَنْقَصَّا',
          '3fd': 'تَنْقَصَّا',
          '1p': 'نَنْقَصَّ',
          '2mp': 'تَنْقَصُّوْا',
          '2fp': 'تَنْقَصْنَ',
          '3mp': 'يَنْقَصُّوْا',
          '3fp': 'يَنْقَصْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['قضي', 'يَنْقَضِيَ'],
        ['حني', 'يَنْحَنِيَ'],
        ['ثني', 'يَنْثَنِيَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 7), 'subjunctive')['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test('اِنْزَوَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('زوي', 7), 'subjunctive')).toEqualT({
          '1s': 'أَنْزَوِيَ',
          '2ms': 'تَنْزَوِيَ',
          '2fs': 'تَنْزَوِي',
          '3ms': 'يَنْزَوِيَ',
          '3fs': 'تَنْزَوِيَ',
          '2d': 'تَنْزَوِيَا',
          '3md': 'يَنْزَوِيَا',
          '3fd': 'تَنْزَوِيَا',
          '1p': 'نَنْزَوِيَ',
          '2mp': 'تَنْزَوُوْا',
          '2fp': 'تَنْزَوِينَ',
          '3mp': 'يَنْزَوُوْا',
          '3fp': 'يَنْزَوِينَ',
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
