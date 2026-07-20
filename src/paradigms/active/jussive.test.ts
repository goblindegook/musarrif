import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { conjugatePresentMood } from './present'

describe('active present jussive', () => {
  describe('Form I', () => {
    describe('regular roots', () => {
      test.each([
        ['نظر', 'يَنْظُرْ'],
        ['سلم', 'يَسْلَمْ'],
        ['سكن', 'يَسْكُنْ'],
        ['بعد', 'يَبْعَدْ'],
        ['مثل', 'يَمْثُلْ'],
        ['دعم', 'يَدْعَمْ'],
        ['كلم', 'يَكْلِمْ'],
        ['زرق', 'يَزْرَقْ'],
        ['قدم', 'يَقْدُمْ'],
        ['نفس', 'يَنْفُسْ'],
        ['مكن', 'يَمْكُنْ'],
        ['بلغ', 'يَبْلُغْ'],
        ['برح', 'يَبْرَحْ'],
        ['زعم', 'يَزْعُمْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('drops nūn endings for صَرَفَ', () => {
        expect(conjugatePresentMood(getVerb('صرف', 1), 'jussive')).toMatchObjectT({
          '2ms': 'تَصْرِفْ',
          '2fs': 'تَصْرِفِي',
          '2d': 'تَصْرِفَا',
          '2mp': 'تَصْرِفُوا',
          '2fp': 'تَصْرِفْنَ',
          '3md': 'يَصْرِفَا',
          '3fd': 'تَصْرِفَا',
          '3fp': 'يَصْرِفْنَ',
          '3mp': 'يَصْرِفُوا',
        })
      })

      test('صَغُرَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('صغر', 1), 'jussive')).toEqualT({
          '1s': 'أَصْغُرْ',
          '2ms': 'تَصْغُرْ',
          '2fs': 'تَصْغُرِي',
          '3ms': 'يَصْغُرْ',
          '3fs': 'تَصْغُرْ',
          '2d': 'تَصْغُرَا',
          '3md': 'يَصْغُرَا',
          '3fd': 'تَصْغُرَا',
          '1p': 'نَصْغُرْ',
          '2mp': 'تَصْغُرُوا',
          '2fp': 'تَصْغُرْنَ',
          '3mp': 'يَصْغُرُوا',
          '3fp': 'يَصْغُرْنَ',
        })
      })

      test('نَظَرَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('نظر', 1), 'jussive')).toEqualT({
          '1s': 'أَنْظُرْ',
          '2ms': 'تَنْظُرْ',
          '2fs': 'تَنْظُرِي',
          '3ms': 'يَنْظُرْ',
          '3fs': 'تَنْظُرْ',
          '2d': 'تَنْظُرَا',
          '3md': 'يَنْظُرَا',
          '3fd': 'تَنْظُرَا',
          '1p': 'نَنْظُرْ',
          '2mp': 'تَنْظُرُوا',
          '2fp': 'تَنْظُرْنَ',
          '3mp': 'يَنْظُرُوا',
          '3fp': 'يَنْظُرْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['ءدد', 'يَئِدَّ'],
        ['ءجج', 'يَؤُجَّ'],
        ['ءزز', 'يَؤُزَّ'],
        ['عدد', 'يَعُدَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([['وقف', 'يَقِفْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('وَقَفَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وقف', 1), 'jussive')).toEqualT({
          '1s': 'أَقِفْ',
          '2ms': 'تَقِفْ',
          '2fs': 'تَقِفِي',
          '3ms': 'يَقِفْ',
          '3fs': 'تَقِفْ',
          '2d': 'تَقِفَا',
          '3md': 'يَقِفَا',
          '3fd': 'تَقِفَا',
          '1p': 'نَقِفْ',
          '2mp': 'تَقِفُوا',
          '2fp': 'تَقِفْنَ',
          '3mp': 'يَقِفُوا',
          '3fp': 'يَقِفْنَ',
        })
      })

      test('وَضَعَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وضع', 1), 'jussive')).toEqualT({
          '1s': 'أَضَعْ',
          '2ms': 'تَضَعْ',
          '2fs': 'تَضَعِي',
          '3ms': 'يَضَعْ',
          '3fs': 'تَضَعْ',
          '2d': 'تَضَعَا',
          '3md': 'يَضَعَا',
          '3fd': 'تَضَعَا',
          '1p': 'نَضَعْ',
          '2mp': 'تَضَعُوا',
          '2fp': 'تَضَعْنَ',
          '3mp': 'يَضَعُوا',
          '3fp': 'يَضَعْنَ',
        })
      })

      test('وَثُقَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وثق', 1), 'jussive')).toEqualT({
          '1s': 'أَوْثُقْ',
          '2ms': 'تَوْثُقْ',
          '2fs': 'تَوْثُقِي',
          '3ms': 'يَوْثُقْ',
          '3fs': 'تَوْثُقْ',
          '2d': 'تَوْثُقَا',
          '3md': 'يَوْثُقَا',
          '3fd': 'تَوْثُقَا',
          '1p': 'نَوْثُقْ',
          '2mp': 'تَوْثُقُوا',
          '2fp': 'تَوْثُقْنَ',
          '3mp': 'يَوْثُقُوا',
          '3fp': 'يَوْثُقْنَ',
        })
      })

      test('يَسُرَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('يسر', 1), 'jussive')).toEqualT({
          '1s': 'أَيْسُرْ',
          '2ms': 'تَيْسُرْ',
          '2fs': 'تَيْسُرِي',
          '3ms': 'يَيْسُرْ',
          '3fs': 'تَيْسُرْ',
          '2d': 'تَيْسُرَا',
          '3md': 'يَيْسُرَا',
          '3fd': 'تَيْسُرَا',
          '1p': 'نَيْسُرْ',
          '2mp': 'تَيْسُرُوا',
          '2fp': 'تَيْسُرْنَ',
          '3mp': 'يَيْسُرُوا',
          '3fp': 'يَيْسُرْنَ',
        })
      })

      test('يَبِسَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('يبس', 1), 'jussive')).toEqualT({
          '1s': 'أَيْبَسْ',
          '2ms': 'تَيْبَسْ',
          '2fs': 'تَيْبَسِي',
          '3ms': 'يَيْبَسْ',
          '3fs': 'تَيْبَسْ',
          '2d': 'تَيْبَسَا',
          '3md': 'يَيْبَسَا',
          '3fd': 'تَيْبَسَا',
          '1p': 'نَيْبَسْ',
          '2mp': 'تَيْبَسُوا',
          '2fp': 'تَيْبَسْنَ',
          '3mp': 'يَيْبَسُوا',
          '3fp': 'يَيْبَسْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عوز', 'يَعْوَزْ'],
        ['عوم', 'يَعُمْ'],
        ['حول', 'يَحُلْ'],
        ['دوم', 'يَدُمْ'],
        ['موت', 'يَمُتْ'],
        ['خور', 'يَخْوَرْ'],
        ['نوم', 'يَنَمْ'],
        ['خوف', 'يَخَفْ'],
        ['شوق', 'يَشُقْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('خَالَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('خيل', 1), 'jussive')).toEqualT({
          '1s': 'أَخَلْ',
          '2ms': 'تَخَلْ',
          '2fs': 'تَخَالِي',
          '3ms': 'يَخَلْ',
          '3fs': 'تَخَلْ',
          '2d': 'تَخَالَا',
          '3md': 'يَخَالَا',
          '3fd': 'تَخَالَا',
          '1p': 'نَخَلْ',
          '2mp': 'تَخَالُوا',
          '2fp': 'تَخَلْنَ',
          '3mp': 'يَخَالُوا',
          '3fp': 'يَخَلْنَ',
        })
      })

      test('عَوِزَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('عوز', 1), 'jussive')).toEqualT({
          '1s': 'أَعْوَزْ',
          '2ms': 'تَعْوَزْ',
          '2fs': 'تَعْوَزِي',
          '3ms': 'يَعْوَزْ',
          '3fs': 'تَعْوَزْ',
          '2d': 'تَعْوَزَا',
          '3md': 'يَعْوَزَا',
          '3fd': 'تَعْوَزَا',
          '1p': 'نَعْوَزْ',
          '2mp': 'تَعْوَزُوا',
          '2fp': 'تَعْوَزْنَ',
          '3mp': 'يَعْوَزُوا',
          '3fp': 'يَعْوَزْنَ',
        })
      })

      test('شَادَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('شيد', 1), 'jussive')).toEqualT({
          '1s': 'أَشِدْ',
          '2ms': 'تَشِدْ',
          '2fs': 'تَشِيدِي',
          '3ms': 'يَشِدْ',
          '3fs': 'تَشِدْ',
          '2d': 'تَشِيدَا',
          '3md': 'يَشِيدَا',
          '3fd': 'تَشِيدَا',
          '1p': 'نَشِدْ',
          '2mp': 'تَشِيدُوا',
          '2fp': 'تَشِدْنَ',
          '3mp': 'يَشِيدُوا',
          '3fp': 'يَشِدْنَ',
        })
      })

      test('shortens hollow stems without suffixes for قَالَ', () => {
        expect(conjugatePresentMood(getVerb('قول', 1), 'jussive')).toMatchObjectT({
          '3ms': 'يَقُلْ',
          '2ms': 'تَقُلْ',
          '3fs': 'تَقُلْ',
          '1s': 'أَقُلْ',
          '1p': 'نَقُلْ',
          '2fp': 'تَقُلْنَ',
          '3fp': 'يَقُلْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['غشي', 'يَغْشِ'],
        ['بدو', 'يَبْدُ'],
        ['علي', 'يَعْلِ'],
        ['جدو', 'يَجْدُ'],
        ['لهو', 'يَلْهُ'],
        ['شفي', 'يَشْفِ'],
        ['دري', 'يَدْرِ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عون', 'يُعَاوِنْ'],
        ['قوم', 'يُقَاوِمْ'],
        ['عود', 'يُعَاوِدْ'],
        ['جوز', 'يُجَاوِزْ'],
        ['نول', 'يُنَاوِلْ'],
        ['ضيق', 'يُضَايِقْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وري', 'يَرِ'],
        ['قوي', 'يَقْوَ'],
        ['جوي', 'يَجْوَ'],
        ['روي', 'يَرْوِ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('رَوِيَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('روي', 1), 'jussive')).toEqualT({
          '1s': 'أَرْوِ',
          '2ms': 'تَرْوِ',
          '2fs': 'تَرْوِي',
          '3ms': 'يَرْوِ',
          '3fs': 'تَرْوِ',
          '2d': 'تَرْوِيَا',
          '3md': 'يَرْوِيَا',
          '3fd': 'تَرْوِيَا',
          '1p': 'نَرْوِ',
          '2mp': 'تَرْوُوا',
          '2fp': 'تَرْوِينَ',
          '3mp': 'يَرْوُوا',
          '3fp': 'يَرْوِينَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءمر', 'يَأْمُرْ'],
        ['ءصل', 'يَأْصُلْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('أَجَرَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ءجر', 1), 'jussive')).toEqualT({
          '1s': 'آجُرْ',
          '2ms': 'تَأْجُرْ',
          '2fs': 'تَأْجُرِي',
          '3ms': 'يَأْجُرْ',
          '3fs': 'تَأْجُرْ',
          '2d': 'تَأْجُرَا',
          '3md': 'يَأْجُرَا',
          '3fd': 'تَأْجُرَا',
          '1p': 'نَأْجُرْ',
          '2mp': 'تَأْجُرُوا',
          '2fp': 'تَأْجُرْنَ',
          '3mp': 'يَأْجُرُوا',
          '3fp': 'يَأْجُرْنَ',
        })
      })

      test('أَذِنَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ءذن', 1), 'jussive')).toEqualT({
          '1s': 'آذَنْ',
          '2ms': 'تَأْذَنْ',
          '2fs': 'تَأْذَنِي',
          '3ms': 'يَأْذَنْ',
          '3fs': 'تَأْذَنْ',
          '2d': 'تَأْذَنَا',
          '3md': 'يَأْذَنَا',
          '3fd': 'تَأْذَنَا',
          '1p': 'نَأْذَنْ',
          '2mp': 'تَأْذَنُوا',
          '2fp': 'تَأْذَنَّ',
          '3mp': 'يَأْذَنُوا',
          '3fp': 'يَأْذَنَّ',
        })
      })

      test('أَمَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ءمم', 1), 'jussive')).toEqualT({
          '1s': 'أَؤُمَّ',
          '2ms': 'تَؤُمَّ',
          '2fs': 'تَؤُمِّي',
          '3ms': 'يَؤُمَّ',
          '3fs': 'تَؤُمَّ',
          '2d': 'تَؤُمَّا',
          '3md': 'يَؤُمَّا',
          '3fd': 'تَؤُمَّا',
          '1p': 'نَؤُمَّ',
          '2mp': 'تَؤُمُّوا',
          '2fp': 'تَأْمُمْنَ',
          '3mp': 'يَؤُمُّوا',
          '3fp': 'يَأْمُمْنَ',
        })
      })
    })

    describe('hamzated initial hollow roots', () => {
      test.each([['ءول', 'يَؤُلْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('يَؤُلْ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ءول', 1), 'jussive')).toEqualT({
          '1s': 'أَؤُلْ',
          '2ms': 'تَؤُلْ',
          '2fs': 'تَؤُولِي',
          '3ms': 'يَؤُلْ',
          '3fs': 'تَؤُلْ',
          '2d': 'تَؤُولَا',
          '3md': 'يَؤُولَا',
          '3fd': 'تَؤُولَا',
          '1p': 'نَؤُلْ',
          '2mp': 'تَؤُولُوا',
          '2fp': 'تَؤُلْنَ',
          '3mp': 'يَؤُولُوا',
          '3fp': 'يَؤُلْنَ',
        })
      })
    })

    describe('hamzated middle roots', () => {
      test.each([['بءس', 'يَبْؤُسْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['فتء', 'يَفْتَأْ'],
        ['جرء', 'يَجْرُؤْ'],
        ['كلء', 'يَكْلُؤْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('قَرَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قرء', 1), 'jussive')).toEqualT({
          '1s': 'أَقْرَأْ',
          '2ms': 'تَقْرَأْ',
          '2fs': 'تَقْرَئِي',
          '3ms': 'يَقْرَأْ',
          '3fs': 'تَقْرَأْ',
          '2d': 'تَقْرَآ',
          '3md': 'يَقْرَآ',
          '3fd': 'تَقْرَآ',
          '1p': 'نَقْرَأْ',
          '2mp': 'تَقْرَؤُوا',
          '2fp': 'تَقْرَأْنَ',
          '3mp': 'يَقْرَؤُوا',
          '3fp': 'يَقْرَأْنَ',
        })
      })

      test('كَلَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('كلء', 1), 'jussive')).toEqualT({
          '1s': 'أَكْلُؤْ',
          '2ms': 'تَكْلُؤْ',
          '2fs': 'تَكْلُئِي',
          '3ms': 'يَكْلُؤْ',
          '3fs': 'تَكْلُؤْ',
          '2d': 'تَكْلُؤَا',
          '3md': 'يَكْلُؤَا',
          '3fd': 'تَكْلُؤَا',
          '1p': 'نَكْلُؤْ',
          '2mp': 'تَكْلُؤُوا',
          '2fp': 'تَكْلُؤْنَ',
          '3mp': 'يَكْلُؤُوا',
          '3fp': 'يَكْلُؤْنَ',
        })
      })

      test('وَطِئَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وطء', 1), 'jussive')).toEqualT({
          '1s': 'أَطَأْ',
          '2ms': 'تَطَأْ',
          '2fs': 'تَطَئِي',
          '3ms': 'يَطَأْ',
          '3fs': 'تَطَأْ',
          '2d': 'تَطَآ',
          '3md': 'يَطَآ',
          '3fd': 'تَطَآ',
          '1p': 'نَطَأْ',
          '2mp': 'تَطَؤُوا',
          '2fp': 'تَطَأْنَ',
          '3mp': 'يَطَؤُوا',
          '3fp': 'يَطَأْنَ',
        })
      })

      test('بَدَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('بدء', 1), 'jussive')).toEqualT({
          '1s': 'أَبْدَأْ',
          '2ms': 'تَبْدَأْ',
          '2fs': 'تَبْدَئِي',
          '3ms': 'يَبْدَأْ',
          '3fs': 'تَبْدَأْ',
          '2d': 'تَبْدَآ',
          '3md': 'يَبْدَآ',
          '3fd': 'تَبْدَآ',
          '1p': 'نَبْدَأْ',
          '2mp': 'تَبْدَؤُوا',
          '2fp': 'تَبْدَأْنَ',
          '3mp': 'يَبْدَؤُوا',
          '3fp': 'يَبْدَأْنَ',
        })
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([['نوء', 'يَنُؤْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('جَاءَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('جيء', 1), 'jussive')).toEqualT({
          '1s': 'أَجِئْ',
          '2ms': 'تَجِئْ',
          '2fs': 'تَجِيئِي',
          '3ms': 'يَجِئْ',
          '3fs': 'تَجِئْ',
          '2d': 'تَجِيئَا',
          '3md': 'يَجِيئَا',
          '3fd': 'تَجِيئَا',
          '1p': 'نَجِئْ',
          '2mp': 'تَجِيئُوا',
          '2fp': 'تَجِئْنَ',
          '3mp': 'يَجِيئُوا',
          '3fp': 'يَجِئْنَ',
        })
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([
        ['ءبي', 'يَأْبَ'],
        ['ءني', 'يَأْنِ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('أَتَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('ءتي', 1), 'jussive')).toEqualT({
          '1s': 'آتِ',
          '2ms': 'تَأْتِ',
          '2fs': 'تَأْتِي',
          '3ms': 'يَأْتِ',
          '3fs': 'تَأْتِ',
          '2d': 'تَأْتِيَا',
          '3md': 'يَأْتِيَا',
          '3fd': 'تَأْتِيَا',
          '1p': 'نَأْتِ',
          '2mp': 'تَأْتُوا',
          '2fp': 'تَأْتِينَ',
          '3mp': 'يَأْتُوا',
          '3fp': 'يَأْتِينَ',
        })
      })
    })

    describe('hamzated middle defective roots', () => {
      test.each([['رءي', 'يَرَ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('رَأَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('رءي', 1), 'jussive')).toEqualT({
          '1s': 'أَرَ',
          '2ms': 'تَرَ',
          '2fs': 'تَرَيْ',
          '3ms': 'يَرَ',
          '3fs': 'تَرَ',
          '2d': 'تَرَيَا',
          '3md': 'يَرَيَا',
          '3fd': 'تَرَيَا',
          '1p': 'نَرَ',
          '2mp': 'تَرَوْا',
          '2fp': 'تَرَيْنَ',
          '3mp': 'يَرَوْا',
          '3fp': 'يَرَيْنَ',
        })
      })
    })

    describe('hamzated hollow-defective roots', () => {
      test.each([['ءوي', 'يَأْوِ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('أَوَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('ءوي', 1), 'jussive')).toEqualT({
          '1s': 'آوِ',
          '1p': 'نَأْوِ',
          '2ms': 'تَأْوِ',
          '2fs': 'تَأْوِي',
          '3ms': 'يَأْوِ',
          '3fs': 'تَأْوِ',
          '2d': 'تَأْوِيَا',
          '3md': 'يَأْوِيَا',
          '3fd': 'تَأْوِيَا',
          '2mp': 'تَأْوُوا',
          '2fp': 'تَأْوِينَ',
          '3mp': 'يَأْوُوا',
          '3fp': 'يَأْوِينَ',
        })
      })
    })
  })

  describe('Form II', () => {
    describe('regular roots', () => {
      test.each([
        ['مكن', 'يُمَكِّنْ'],
        ['مثل', 'يُمَثِّلْ'],
        ['سبب', 'يُسَبِّبْ'],
        ['زرق', 'يُزَرِّقْ'],
        ['خطط', 'يُخَطِّطْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حدد', 'يُحَدِّدْ'],
        ['قرر', 'يُقَرِّرْ'],
        ['شدد', 'يُشَدِّدْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })

      test('حَبَّبَ pattern', () => {
        expect(conjugatePresentMood(getVerb('حبب', 2), 'jussive')).toEqualT({
          '1s': 'أُحَبِّبْ',
          '2ms': 'تُحَبِّبْ',
          '2fs': 'تُحَبِّبِي',
          '3ms': 'يُحَبِّبْ',
          '3fs': 'تُحَبِّبْ',
          '2d': 'تُحَبِّبَا',
          '3md': 'يُحَبِّبَا',
          '3fd': 'تُحَبِّبَا',
          '1p': 'نُحَبِّبْ',
          '2mp': 'تُحَبِّبُوا',
          '2fp': 'تُحَبِّبْنَ',
          '3mp': 'يُحَبِّبُوا',
          '3fp': 'يُحَبِّبْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قوس', 'يُقَوِّسْ'],
        ['كون', 'يُكَوِّنْ'],
        ['دون', 'يُدَوِّنْ'],
        ['سوف', 'يُسَوِّفْ'],
        ['نوم', 'يُنَوِّمْ'],
        ['كيف', 'يُكَيِّفْ'],
        ['ءول', 'يُؤَوِّلْ'],
        ['ءوب', 'يُؤَوِّبْ'],
        ['شوق', 'يُشَوِّقْ'],
        ['زور', 'يُزَوِّرْ'],
        ['صير', 'يُصَيِّرْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءخر', 'يُؤَخِّرْ'],
        ['ءجر', 'يُؤَجِّرْ'],
        ['ءكل', 'يُؤَكِّلْ'],
        ['ءمر', 'يُؤَمِّرْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['ءذي', 'يُؤَذِّ'],
        ['ءسي', 'يُؤَسِّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['هنء', 'يُهَنِّئْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['يود', 'يُيَوِّدْ'],
        ['ولي', 'يُوَلِّ'],
        ['وري', 'يُوَرِّ'],
        ['مني', 'يُمَنِّ'],
        ['سمي', 'يُسَمِّ'],
        ['غطي', 'يُغَطِّ'],
        ['غني', 'يُغَنِّ'],
        ['قوي', 'يُقَوِّ'],
        ['زوي', 'يُزَوِّ'],
        ['هوي', 'يُهَوِّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })

      test('حَيَّى conjugation', () => {
        expect(conjugatePresentMood(getVerb('حيي', 2), 'jussive')).toEqualT({
          '1s': 'أُحَيِّ',
          '2ms': 'تُحَيِّ',
          '2fs': 'تُحَيِّي',
          '3ms': 'يُحَيِّ',
          '3fs': 'تُحَيِّ',
          '2d': 'تُحَيِّيَا',
          '3md': 'يُحَيِّيَا',
          '3fd': 'تُحَيِّيَا',
          '1p': 'نُحَيِّ',
          '2mp': 'تُحَيُّوا',
          '2fp': 'تُحَيِّينَ',
          '3mp': 'يُحَيُّوا',
          '3fp': 'يُحَيِّينَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءجج', 'يُؤَجِّجْ'],
        ['ءسس', 'يُؤَسِّسْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })

      test('أَثَّرَ pattern', () => {
        expect(conjugatePresentMood(getVerb('ءثر', 2), 'jussive')).toEqualT({
          '1s': 'أُؤَثِّرْ',
          '2ms': 'تُؤَثِّرْ',
          '2fs': 'تُؤَثِّرِي',
          '3ms': 'يُؤَثِّرْ',
          '3fs': 'تُؤَثِّرْ',
          '2d': 'تُؤَثِّرَا',
          '3md': 'يُؤَثِّرَا',
          '3fd': 'تُؤَثِّرَا',
          '1p': 'نُؤَثِّرْ',
          '2mp': 'تُؤَثِّرُوا',
          '2fp': 'تُؤَثِّرْنَ',
          '3mp': 'يُؤَثِّرُوا',
          '3fp': 'يُؤَثِّرْنَ',
        })
      })
    })

    describe('hamzated final assimilated roots', () => {
      test('يُوَطِّئْ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وطء', 2), 'jussive')).toEqualT({
          '1s': 'أُوَطِّئْ',
          '2ms': 'تُوَطِّئْ',
          '2fs': 'تُوَطِّئِي',
          '3ms': 'يُوَطِّئْ',
          '3fs': 'تُوَطِّئْ',
          '2d': 'تُوَطِّئَا',
          '3md': 'يُوَطِّئَا',
          '3fd': 'تُوَطِّئَا',
          '1p': 'نُوَطِّئْ',
          '2mp': 'تُوَطِّئُوا',
          '2fp': 'تُوَطِّئْنَ',
          '3mp': 'يُوَطِّئُوا',
          '3fp': 'يُوَطِّئْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['يود', 'يُيَوِّدْ'],
        ['وطن', 'يُوَطِّنْ'],
        ['وجه', 'يُوَجِّهْ'],
        ['وقف', 'يُوَقِّفْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })

      test('يُوَسِّطْ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وسط', 2), 'jussive')).toEqualT({
          '1s': 'أُوَسِّطْ',
          '2ms': 'تُوَسِّطْ',
          '2fs': 'تُوَسِّطِي',
          '3ms': 'يُوَسِّطْ',
          '3fs': 'تُوَسِّطْ',
          '2d': 'تُوَسِّطَا',
          '3md': 'يُوَسِّطَا',
          '3fd': 'تُوَسِّطَا',
          '1p': 'نُوَسِّطْ',
          '2mp': 'تُوَسِّطُوا',
          '2fp': 'تُوَسِّطْنَ',
          '3mp': 'يُوَسِّطُوا',
          '3fp': 'يُوَسِّطْنَ',
        })
      })
    })

    describe('hamzated initial hollow roots', () => {
      test('أَيَّدَ pattern', () => {
        expect(conjugatePresentMood(getVerb('ءيد', 2), 'jussive')).toEqualT({
          '1s': 'أُؤَيِّدْ',
          '2ms': 'تُؤَيِّدْ',
          '2fs': 'تُؤَيِّدِي',
          '3ms': 'يُؤَيِّدْ',
          '3fs': 'تُؤَيِّدْ',
          '2d': 'تُؤَيِّدَا',
          '3md': 'يُؤَيِّدَا',
          '3fd': 'تُؤَيِّدَا',
          '1p': 'نُؤَيِّدْ',
          '2mp': 'تُؤَيِّدُوا',
          '2fp': 'تُؤَيِّدْنَ',
          '3mp': 'يُؤَيِّدُوا',
          '3fp': 'يُؤَيِّدْنَ',
        })
      })
    })
  })

  describe('Form IV', () => {
    describe('regular roots', () => {
      test.each([
        ['كثر', 'يُكْثِرْ'],
        ['علم', 'يُعْلِمْ'],
        ['لحق', 'يُلْحِقْ'],
        ['صبح', 'يُصْبِحْ'],
        ['سلم', 'يُسْلِمْ'],
        ['عرب', 'يُعْرِبْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['نشء', 'يُنْشِئْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['شور', 'يُشِرْ'],
        ['نوم', 'يُنِمْ'],
        ['رود', 'يُرِدْ'],
        ['تيح', 'يُتِحْ'],
        ['فيد', 'يُفِدْ'],
        ['عود', 'يُعِدْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['تمم', 'يُتِمَّ'],
        ['سفف', 'يُسِفَّ'],
        ['همم', 'يُهِمَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['وصي', 'يُوصِ'],
        ['وحي', 'يُوحِ'],
        ['ودي', 'يُودِ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'jussive')['3ms']).toEqualT(expected)
      })

      test('أَرَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('رءي', 4), 'jussive')).toEqualT({
          '1s': 'أُرِ',
          '2ms': 'تُرِ',
          '2fs': 'تُرِي',
          '3ms': 'يُرِ',
          '3fs': 'تُرِ',
          '2d': 'تُرِيَا',
          '3md': 'يُرِيَا',
          '3fd': 'تُرِيَا',
          '1p': 'نُرِ',
          '2mp': 'تُرُوا',
          '2fp': 'تُرِينَ',
          '3mp': 'يُرُوا',
          '3fp': 'يُرِينَ',
        })
      })
    })
  })

  describe('Form V', () => {
    describe('geminate roots', () => {
      test.each([['مدد', 'يَتَمَدَّدْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('regular roots', () => {
      test.each([
        ['حدث', 'يَتَحَدَّثْ'],
        ['مثل', 'يَتَمَثَّلْ'],
        ['عرف', 'يَتَعَرَّفْ'],
        ['سلم', 'يَتَسَلَّمْ'],
        ['هدد', 'يَتَهَدَّدْ'],
        ['حدد', 'يَتَحَدَّدْ'],
        ['عزز', 'يَتَعَزَّزْ'],
        ['سبب', 'يَتَسَبَّبْ'],
        ['قرر', 'يَتَقَرَّرْ'],
        ['وفي', 'يَتَوَفَّ'],
        ['وقي', 'يَتَوَقَّ'],
        ['وخي', 'يَتَوَخَّ'],
        ['زوي', 'يَتَزَوَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءخر', 'يَتَأَخَّرْ'],
        ['ءلف', 'يَتَأَلَّفْ'],
        ['ءول', 'يَتَأَوَّلْ'],
        ['ءكد', 'يَتَأَكَّدْ'],
        ['ءكل', 'يَتَأَكَّلْ'],
        ['ءثر', 'يَتَأَثَّرْ'],
        ['ءوه', 'يَتَأَوَّهْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([['ءمم', 'يَتَأَمَّمْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([
        ['ءذي', 'يَتَأَذَّ'],
        ['ءتي', 'يَتَأَتَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وصل', 'يَتَوَصَّلْ'],
        ['وفر', 'يَتَوَفَّرْ'],
        ['وقف', 'يَتَوَقَّفْ'],
        ['وكء', 'يَتَوَكَّأْ'],
        ['وقع', 'يَتَوَقَّعْ'],
        ['وسع', 'يَتَوَسَّعْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['حول', 'يَتَحَوَّلْ'],
        ['قول', 'يَتَقَوَّلْ'],
        ['عين', 'يَتَعَيَّنْ'],
        ['غير', 'يَتَغَيَّرْ'],
        ['طور', 'يَتَطَوَّرْ'],
        ['شوق', 'يَتَشَوَّقْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['بقي', 'يَتَبَقَّ'],
        ['سني', 'يَتَسَنَّ'],
        ['بني', 'يَتَبَنَّ'],
        ['حدي', 'يَتَحَدَّ'],
        ['سمي', 'يَتَسَمَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final hollow roots', () => {
      test('تَهَيَّأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('هيء', 5), 'jussive')).toEqualT({
          '1s': 'أَتَهَيَّأْ',
          '2ms': 'تَتَهَيَّأْ',
          '2fs': 'تَتَهَيَّئِي',
          '3ms': 'يَتَهَيَّأْ',
          '3fs': 'تَتَهَيَّأْ',
          '2d': 'تَتَهَيَّآ',
          '3md': 'يَتَهَيَّآ',
          '3fd': 'تَتَهَيَّآ',
          '1p': 'نَتَهَيَّأْ',
          '2mp': 'تَتَهَيَّؤُوا',
          '2fp': 'تَتَهَيَّأْنَ',
          '3mp': 'يَتَهَيَّؤُوا',
          '3fp': 'يَتَهَيَّأْنَ',
        })
      })

      test('تَضَوَّأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ضوء', 5), 'jussive')).toEqualT({
          '1s': 'أَتَضَوَّأْ',
          '2ms': 'تَتَضَوَّأْ',
          '2fs': 'تَتَضَوَّئِي',
          '3ms': 'يَتَضَوَّأْ',
          '3fs': 'تَتَضَوَّأْ',
          '2d': 'تَتَضَوَّآ',
          '3md': 'يَتَضَوَّآ',
          '3fd': 'تَتَضَوَّآ',
          '1p': 'نَتَضَوَّأْ',
          '2mp': 'تَتَضَوَّؤُوا',
          '2fp': 'تَتَضَوَّأْنَ',
          '3mp': 'يَتَضَوَّؤُوا',
          '3fp': 'يَتَضَوَّأْنَ',
        })
      })
    })
  })

  describe('Form VI', () => {
    describe('hollow roots', () => {
      test.each([
        ['نول', 'يَتَنَاوَلْ'],
        ['فوض', 'يَتَفَاوَضْ'],
        ['جوز', 'يَتَجَاوَزْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 6), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءلف', 'يَتَآلَفْ'],
        ['ءكل', 'يَتَآكَلْ'],
        ['ءمر', 'يَتَآمَرْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 6), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['بطء', 'يَتَبَاطَأْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 6), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['مشي', 'يَتَمَاشَ'],
        ['هوي', 'يَتَهَاوَ'],
        ['ولي', 'يَتَوَالَ'],
        ['وصي', 'يَتَوَاصَ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 6), 'jussive')['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form VII', () => {
    describe('regular roots', () => {
      test.each<[string, string]>([
        ['خفض', 'يَنْخَفِضْ'],
        ['عكس', 'يَنْعَكِسْ'],
      ])('%s pattern', (root, expected3ms) => {
        const jussive = conjugatePresentMood(getVerb(root, 7), 'jussive')
        expect(jussive['3ms']).toEqualT(expected3ms)
      })
    })

    describe('hamzated final roots', () => {
      test('اِنْقَرَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قرء', 7), 'jussive')).toEqualT({
          '1s': 'أَنْقَرِئْ',
          '2ms': 'تَنْقَرِئْ',
          '2fs': 'تَنْقَرِئِي',
          '3ms': 'يَنْقَرِئْ',
          '3fs': 'تَنْقَرِئْ',
          '2d': 'تَنْقَرِئَا',
          '3md': 'يَنْقَرِئَا',
          '3fd': 'تَنْقَرِئَا',
          '1p': 'نَنْقَرِئْ',
          '2mp': 'تَنْقَرِئُوا',
          '2fp': 'تَنْقَرِئْنَ',
          '3mp': 'يَنْقَرِئُوا',
          '3fp': 'يَنْقَرِئْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each<[string, string]>([
        ['بثث', 'يَنْبَثَّ'],
        ['كفف', 'يَنْكَفَّ'],
        ['دسس', 'يَنْدَسَّ'],
      ])('%s pattern', (root, expected3ms) => {
        const jussive = conjugatePresentMood(getVerb(root, 7), 'jussive')
        expect(jussive['3ms']).toEqualT(expected3ms)
      })
    })

    describe('hollow roots', () => {
      test.each<[string, string]>([
        ['قود', 'يَنْقَدْ'],
        ['هيل', 'يَنْهَلْ'],
        ['حوز', 'يَنْحَزْ'],
      ])('%s pattern', (root, expected3ms) => {
        const jussive = conjugatePresentMood(getVerb(root, 7), 'jussive')
        expect(jussive['3ms']).toEqualT(expected3ms)
      })
    })

    describe('defective roots', () => {
      test.each<[string, string]>([
        ['قضي', 'يَنْقَضِ'],
        ['حني', 'يَنْحَنِ'],
        ['ثني', 'يَنْثَنِ'],
      ])('%s pattern', (root, expected3ms) => {
        const jussive = conjugatePresentMood(getVerb(root, 7), 'jussive')
        expect(jussive['3ms']).toEqualT(expected3ms)
      })
    })

    describe('doubly weak roots', () => {
      test('اِنْزَوَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('زوي', 7), 'jussive')).toEqualT({
          '1s': 'أَنْزَوِ',
          '2ms': 'تَنْزَوِ',
          '2fs': 'تَنْزَوِي',
          '3ms': 'يَنْزَوِ',
          '3fs': 'تَنْزَوِ',
          '2d': 'تَنْزَوِيَا',
          '3md': 'يَنْزَوِيَا',
          '3fd': 'تَنْزَوِيَا',
          '1p': 'نَنْزَوِ',
          '2mp': 'تَنْزَوُوا',
          '2fp': 'تَنْزَوِينَ',
          '3mp': 'يَنْزَوُوا',
          '3fp': 'يَنْزَوِينَ',
        })
      })
    })
  })

  describe('Form VIII', () => {
    describe('regular roots', () => {
      test.each<[string, string]>([
        ['قرح', 'يَقْتَرِحْ'],
        ['عبر', 'يَعْتَبِرْ'],
        ['عمد', 'يَعْتَمِدْ'],
        ['زحم', 'يَزْدَحِمْ'],
        ['ظلم', 'يَظَّلِمْ'],
        ['ذكر', 'يَذَّكِرْ'],
        ['ضرب', 'يَضْطَرِبْ'],
        ['حلم', 'يَحْتَلِمْ'],
        ['سلم', 'يَسْتَلِمْ'],
        ['نظر', 'يَنْتَظِرْ'],
      ])('%s pattern', (root, expected3ms) => {
        const jussive = conjugatePresentMood(getVerb(root, 8), 'jussive')
        expect(jussive['3ms']).toEqualT(expected3ms)
      })

      test('اِضْطَلَعَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ضلع', 8), 'jussive')).toEqualT({
          '1s': 'أَضْطَلِعْ',
          '2ms': 'تَضْطَلِعْ',
          '2fs': 'تَضْطَلِعِي',
          '3ms': 'يَضْطَلِعْ',
          '3fs': 'تَضْطَلِعْ',
          '2d': 'تَضْطَلِعَا',
          '3md': 'يَضْطَلِعَا',
          '3fd': 'تَضْطَلِعَا',
          '1p': 'نَضْطَلِعْ',
          '2mp': 'تَضْطَلِعُوا',
          '2fp': 'تَضْطَلِعْنَ',
          '3mp': 'يَضْطَلِعُوا',
          '3fp': 'يَضْطَلِعْنَ',
        })
      })
    })

    describe('hamzated middle roots', () => {
      test.each<[string, string]>([
        ['كءب', 'يَكْتَئِبْ'],
        ['بءس', 'يَبْتَئِسْ'],
      ])('%s pattern', (root, expected3ms) => {
        const jussive = conjugatePresentMood(getVerb(root, 8), 'jussive')
        expect(jussive['3ms']).toEqualT(expected3ms)
      })

      test('اِكْتَأَبَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('كءب', 8), 'jussive')).toEqualT({
          '1s': 'أَكْتَئِبْ',
          '2ms': 'تَكْتَئِبْ',
          '2fs': 'تَكْتَئِبِي',
          '3ms': 'يَكْتَئِبْ',
          '3fs': 'تَكْتَئِبْ',
          '2d': 'تَكْتَئِبَا',
          '3md': 'يَكْتَئِبَا',
          '3fd': 'تَكْتَئِبَا',
          '1p': 'نَكْتَئِبْ',
          '2mp': 'تَكْتَئِبُوا',
          '2fp': 'تَكْتَئِبْنَ',
          '3mp': 'يَكْتَئِبُوا',
          '3fp': 'يَكْتَئِبْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each<[string, string]>([
        ['حلل', 'يَحْتَلَّ'],
        ['مدد', 'يَمْتَدَّ'],
        ['حجج', 'يَحْتَجَّ'],
        ['ردد', 'يَرْتَدَّ'],
      ])('%s pattern', (root, expected3ms) => {
        const jussive = conjugatePresentMood(getVerb(root, 8), 'jussive')
        expect(jussive['3ms']).toEqualT(expected3ms)
      })

      test('اِضْطَرَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ضرر', 8), 'jussive')).toEqualT({
          '1s': 'أَضْطَرَّ',
          '2ms': 'تَضْطَرَّ',
          '2fs': 'تَضْطَرِّي',
          '3ms': 'يَضْطَرَّ',
          '3fs': 'تَضْطَرَّ',
          '2d': 'تَضْطَرَّا',
          '3md': 'يَضْطَرَّا',
          '3fd': 'تَضْطَرَّا',
          '1p': 'نَضْطَرَّ',
          '2mp': 'تَضْطَرُّوا',
          '2fp': 'تَضْطَرِرْنَ',
          '3mp': 'يَضْطَرُّوا',
          '3fp': 'يَضْطَرِرْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each<[string, string]>([
        ['قود', 'يَقْتَدْ'],
        ['سوء', 'يَسْتَأْ'],
        ['روح', 'يَرْتَحْ'],
        ['شوق', 'يَشْتَقْ'],
      ])('%s pattern', (root, expected3ms) => {
        const jussive = conjugatePresentMood(getVerb(root, 8), 'jussive')
        expect(jussive['3ms']).toEqualT(expected3ms)
      })

      test('اِزْدَادَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('زيد', 8), 'jussive')).toEqualT({
          '1s': 'أَزْدَدْ',
          '2ms': 'تَزْدَدْ',
          '2fs': 'تَزْدَادِي',
          '3ms': 'يَزْدَدْ',
          '3fs': 'تَزْدَدْ',
          '2d': 'تَزْدَادَا',
          '3md': 'يَزْدَادَا',
          '3fd': 'تَزْدَادَا',
          '1p': 'نَزْدَدْ',
          '2mp': 'تَزْدَادُوا',
          '2fp': 'تَزْدَدْنَ',
          '3mp': 'يَزْدَادُوا',
          '3fp': 'يَزْدَدْنَ',
        })
      })

      test('اِزْدَوَجَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('زوج', 8), 'jussive')).toEqualT({
          '1s': 'أَزْدَوِجْ',
          '2ms': 'تَزْدَوِجْ',
          '2fs': 'تَزْدَوِجِي',
          '3ms': 'يَزْدَوِجْ',
          '3fs': 'تَزْدَوِجْ',
          '2d': 'تَزْدَوِجَا',
          '3md': 'يَزْدَوِجَا',
          '3fd': 'تَزْدَوِجَا',
          '1p': 'نَزْدَوِجْ',
          '2mp': 'تَزْدَوِجُوا',
          '2fp': 'تَزْدَوِجْنَ',
          '3mp': 'يَزْدَوِجُوا',
          '3fp': 'يَزْدَوِجْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each<[string, string]>([['صفو', 'يَصْطَفِ']])('%s pattern', (root, expected3ms) => {
        const jussive = conjugatePresentMood(getVerb(root, 8), 'jussive')
        expect(jussive['3ms']).toEqualT(expected3ms)
      })
    })

    describe('doubly weak roots', () => {
      test.each<[string, string]>([
        ['نوي', 'يَنْتَوِ'],
        ['سوي', 'يَسْتَوِ'],
      ])('%s pattern', (root, expected3ms) => {
        const jussive = conjugatePresentMood(getVerb(root, 8), 'jussive')
        expect(jussive['3ms']).toEqualT(expected3ms)
      })
    })

    describe('assimilated roots', () => {
      test.each<[string, string]>([
        ['وصل', 'يَتَّصِلْ'],
        ['وعد', 'يَتَّعِدْ'],
        ['وسخ', 'يَتَّسِخْ'],
        ['وحد', 'يَتَّحِدْ'],
      ])('%s pattern', (root, expected3ms) => {
        const jussive = conjugatePresentMood(getVerb(root, 8), 'jussive')
        expect(jussive['3ms']).toEqualT(expected3ms)
      })

      test('اِتَّكَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وكء', 8), 'jussive')).toEqualT({
          '1s': 'أَتَّكِئْ',
          '2ms': 'تَتَّكِئْ',
          '2fs': 'تَتَّكِئِي',
          '3ms': 'يَتَّكِئْ',
          '3fs': 'تَتَّكِئْ',
          '2d': 'تَتَّكِئَا',
          '3md': 'يَتَّكِئَا',
          '3fd': 'تَتَّكِئَا',
          '1p': 'نَتَّكِئْ',
          '2mp': 'تَتَّكِئُوا',
          '2fp': 'تَتَّكِئْنَ',
          '3mp': 'يَتَّكِئُوا',
          '3fp': 'يَتَّكِئْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test('drops the hamza', () => {
        expect(conjugatePresentMood(getVerb('ءخذ', 8), 'jussive')).toMatchObjectT({
          '3ms': 'يَتَّخِذْ',
          '2ms': 'تَتَّخِذْ',
          '1s': 'أَتَّخِذْ',
        })
      })
    })

    describe('hamzated initial geminate roots', () => {
      test('يَأْتَمَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ءمم', 8), 'jussive')).toEqualT({
          '1s': 'آتَمَّ',
          '2ms': 'تَأْتَمَّ',
          '2fs': 'تَأْتَمِّي',
          '3ms': 'يَأْتَمَّ',
          '3fs': 'تَأْتَمَّ',
          '2d': 'تَأْتَمَّا',
          '3md': 'يَأْتَمَّا',
          '3fd': 'تَأْتَمَّا',
          '1p': 'نَأْتَمَّ',
          '2mp': 'تَأْتَمُّوا',
          '2fp': 'تَأْتَمِمْنَ',
          '3mp': 'يَأْتَمُّوا',
          '3fp': 'يَأْتَمِمْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([['خبء', 'يَخْتَبِئْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 8), 'jussive')['3ms']).toEqualT(expected)
      })

      test('اِبْتَدَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('بدء', 8), 'jussive')).toEqualT({
          '1s': 'أَبْتَدِئْ',
          '2ms': 'تَبْتَدِئْ',
          '2fs': 'تَبْتَدِئِي',
          '3ms': 'يَبْتَدِئْ',
          '3fs': 'تَبْتَدِئْ',
          '2d': 'تَبْتَدِئَا',
          '3md': 'يَبْتَدِئَا',
          '3fd': 'تَبْتَدِئَا',
          '1p': 'نَبْتَدِئْ',
          '2mp': 'تَبْتَدِئُوا',
          '2fp': 'تَبْتَدِئْنَ',
          '3mp': 'يَبْتَدِئُوا',
          '3fp': 'يَبْتَدِئْنَ',
        })
      })
    })
  })

  describe('Form III', () => {
    describe('regular roots', () => {
      test.each([
        ['عمل', 'يُعَامِلْ'],
        ['كلم', 'يُكَالِمْ'],
        ['تبع', 'يُتَابِعْ'],
        ['بلغ', 'يُبَالِغْ'],
        ['سعد', 'يُسَاعِدْ'],
        ['سلم', 'يُسَالِمْ'],
        ['صحب', 'يُصَاحِبْ'],
        ['وجه', 'يُوَاجِهْ'],
        ['وثق', 'يُوَاثِقْ'],
        ['وعد', 'يُوَاعِدْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['سرر', 'يُسَارَّ'],
        ['ردد', 'يُرَادَّ'],
        ['مدد', 'يُمَادَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })

      test('سَارَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('سرر', 3), 'jussive')).toEqualT({
          '1s': 'أُسَارَّ',
          '2ms': 'تُسَارَّ',
          '2fs': 'تُسَارِّي',
          '3ms': 'يُسَارَّ',
          '3fs': 'تُسَارَّ',
          '2d': 'تُسَارَّا',
          '3md': 'يُسَارَّا',
          '3fd': 'تُسَارَّا',
          '1p': 'نُسَارَّ',
          '2mp': 'تُسَارُّوا',
          '2fp': 'تُسَارِرْنَ',
          '3mp': 'يُسَارُّوا',
          '3fp': 'يُسَارِرْنَ',
        })
      })

      test('رَادَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ردد', 3), 'jussive')).toEqualT({
          '1s': 'أُرَادَّ',
          '2ms': 'تُرَادَّ',
          '2fs': 'تُرَادِّي',
          '3ms': 'يُرَادَّ',
          '3fs': 'تُرَادَّ',
          '2d': 'تُرَادَّا',
          '3md': 'يُرَادَّا',
          '3fd': 'تُرَادَّا',
          '1p': 'نُرَادَّ',
          '2mp': 'تُرَادُّوا',
          '2fp': 'تُرَادِدْنَ',
          '3mp': 'يُرَادُّوا',
          '3fp': 'يُرَادِدْنَ',
        })
      })

      test('مَادَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('مدد', 3), 'jussive')).toEqualT({
          '1s': 'أُمَادَّ',
          '2ms': 'تُمَادَّ',
          '2fs': 'تُمَادِّي',
          '3ms': 'يُمَادَّ',
          '3fs': 'تُمَادَّ',
          '2d': 'تُمَادَّا',
          '3md': 'يُمَادَّا',
          '3fd': 'تُمَادَّا',
          '1p': 'نُمَادَّ',
          '2mp': 'تُمَادُّوا',
          '2fp': 'تُمَادِدْنَ',
          '3mp': 'يُمَادُّوا',
          '3fp': 'يُمَادِدْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وسي', 'يُوَاسِ'],
        ['نوي', 'يُنَاوِ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['ندي', 'يُنَادِ'],
        ['رعي', 'يُرَاعِ'],
        ['بلي', 'يُبَالِ'],
        ['قضي', 'يُقَاضِ'],
        ['بري', 'يُبَارِ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءخذ', 'يُؤَاخِذْ'],
        ['ءجر', 'يُؤَاجِرْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })

      test('آخَذَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ءخذ', 3), 'jussive')).toEqualT({
          '1s': 'أُؤَاخِذْ',
          '2ms': 'تُؤَاخِذْ',
          '2fs': 'تُؤَاخِذِي',
          '3ms': 'يُؤَاخِذْ',
          '3fs': 'تُؤَاخِذْ',
          '2d': 'تُؤَاخِذَا',
          '3md': 'يُؤَاخِذَا',
          '3fd': 'تُؤَاخِذَا',
          '1p': 'نُؤَاخِذْ',
          '2mp': 'تُؤَاخِذُوا',
          '2fp': 'تُؤَاخِذْنَ',
          '3mp': 'يُؤَاخِذُوا',
          '3fp': 'يُؤَاخِذْنَ',
        })
      })

      test('آجَرَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ءجر', 3), 'jussive')).toEqualT({
          '1s': 'أُؤَاجِرْ',
          '2ms': 'تُؤَاجِرْ',
          '2fs': 'تُؤَاجِرِي',
          '3ms': 'يُؤَاجِرْ',
          '3fs': 'تُؤَاجِرْ',
          '2d': 'تُؤَاجِرَا',
          '3md': 'يُؤَاجِرَا',
          '3fd': 'تُؤَاجِرَا',
          '1p': 'نُؤَاجِرْ',
          '2mp': 'تُؤَاجِرُوا',
          '2fp': 'تُؤَاجِرْنَ',
          '3mp': 'يُؤَاجِرُوا',
          '3fp': 'يُؤَاجِرْنَ',
        })
      })
    })

    describe('hamzated middle roots', () => {
      test.each([['وءم', 'يُوَائِمْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['فجء', 'يُفَاجِئْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })

      test('فَاجَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('فجء', 3), 'jussive')).toEqualT({
          '1s': 'أُفَاجِئْ',
          '2ms': 'تُفَاجِئْ',
          '2fs': 'تُفَاجِئِي',
          '3ms': 'يُفَاجِئْ',
          '3fs': 'تُفَاجِئْ',
          '2d': 'تُفَاجِئَا',
          '3md': 'يُفَاجِئَا',
          '3fd': 'تُفَاجِئَا',
          '1p': 'نُفَاجِئْ',
          '2mp': 'تُفَاجِئُوا',
          '2fp': 'تُفَاجِئْنَ',
          '3mp': 'يُفَاجِئُوا',
          '3fp': 'يُفَاجِئْنَ',
        })
      })
    })
  })

  describe('Form IX', () => {
    describe('regular roots', () => {
      test('اِخْضَرَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('خضر', 9), 'jussive')).toEqualT({
          '1s': 'أَخْضَرَّ',
          '2ms': 'تَخْضَرَّ',
          '2fs': 'تَخْضَرِّي',
          '3ms': 'يَخْضَرَّ',
          '3fs': 'تَخْضَرَّ',
          '2d': 'تَخْضَرَّا',
          '3md': 'يَخْضَرَّا',
          '3fd': 'تَخْضَرَّا',
          '1p': 'نَخْضَرَّ',
          '2mp': 'تَخْضَرُّوا',
          '2fp': 'تَخْضَرِرْنَ',
          '3mp': 'يَخْضَرُّوا',
          '3fp': 'يَخْضَرِرْنَ',
        })
      })

      test.each([
        ['حمر', 'يَحْمَرَّ'],
        ['بيض', 'يَبْيَضَّ'],
        ['زرق', 'يَزْرَقَّ'],
        ['صفر', 'يَصْفَرَّ'],
        ['خضل', 'يَخْضَلَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 9), 'jussive')['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form X', () => {
    describe('regular roots', () => {
      test.each([
        ['عرض', 'يَسْتَعْرِضْ'],
        ['غرق', 'يَسْتَغْرِقْ'],
        ['طرد', 'يَسْتَطْرِدْ'],
        ['عمل', 'يَسْتَعْمِلْ'],
        ['هدف', 'يَسْتَهْدِفْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 10), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وجب', 'يَسْتَوْجِبْ'],
        ['وعب', 'يَسْتَوْعِبْ'],
        ['ورد', 'يَسْتَوْرِدْ'],
        ['وضح', 'يَسْتَوْضِحْ'],
        ['وطن', 'يَسْتَوْطِنْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 10), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['شفف', 'يَسْتَشِفَّ'],
        ['مرر', 'يَسْتَمِرَّ'],
        ['حقق', 'يَسْتَحِقَّ'],
        ['غلل', 'يَسْتَغِلَّ'],
        ['مدد', 'يَسْتَمِدَّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 10), 'jussive')['3ms']).toEqualT(expected)
      })

      test('اِسْتَحَمَّ conjugation', () => {
        // Wiktionary lists multiple jussive variants; this uses the contracted form with shadda.
        expect(conjugatePresentMood(getVerb('حمم', 10), 'jussive')).toEqualT({
          '1s': 'أَسْتَحِمَّ',
          '2ms': 'تَسْتَحِمَّ',
          '2fs': 'تَسْتَحِمِّي',
          '3ms': 'يَسْتَحِمَّ',
          '3fs': 'تَسْتَحِمَّ',
          '2d': 'تَسْتَحِمَّا',
          '3md': 'يَسْتَحِمَّا',
          '3fd': 'تَسْتَحِمَّا',
          '1p': 'نَسْتَحِمَّ',
          '2mp': 'تَسْتَحِمُّوا',
          '2fp': 'تَسْتَحْمِمْنَ',
          '3mp': 'يَسْتَحِمُّوا',
          '3fp': 'يَسْتَحْمِمْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each<[string, string]>([
        ['فيد', 'يَسْتَفِدْ'],
        ['قود', 'يَسْتَقِدْ'],
        ['جوب', 'يَسْتَجِبْ'],
        ['نوم', 'يَسْتَنِمْ'],
        ['لوم', 'يَسْتَلِمْ'],
        ['شور', 'يَسْتَشِرْ'],
        ['حول', 'يَسْتَحِلْ'],
      ])('%s pattern', (root, expected3ms) => {
        const jussive = conjugatePresentMood(getVerb(root, 10), 'jussive')
        expect(jussive['3ms']).toEqualT(expected3ms)
      })

      test('اِسْتَجَابَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('جوب', 10), 'jussive')).toEqualT({
          '1s': 'أَسْتَجِبْ',
          '2ms': 'تَسْتَجِبْ',
          '2fs': 'تَسْتَجِيبِي',
          '3ms': 'يَسْتَجِبْ',
          '3fs': 'تَسْتَجِبْ',
          '2d': 'تَسْتَجِيبَا',
          '3md': 'يَسْتَجِيبَا',
          '3fd': 'تَسْتَجِيبَا',
          '1p': 'نَسْتَجِبْ',
          '2mp': 'تَسْتَجِيبُوا',
          '2fp': 'تَسْتَجِبْنَ',
          '3mp': 'يَسْتَجِيبُوا',
          '3fp': 'يَسْتَجِبْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['دعو', 'يَسْتَدْعِ'],
        ['ءني', 'يَسْتَأْنِ'],
        ['رعي', 'يَسْتَرْعِ'],
        ['ثني', 'يَسْتَثْنِ'],
        ['لقي', 'يَسْتَلْقِ'],
        ['عصي', 'يَسْتَعْصِ'],
        ['رخو', 'يَسْتَرْخِ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 10), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test('اِسْتَحْيَا conjugation', () => {
        expect(conjugatePresentMood(getVerb('حيي', 10), 'jussive')).toEqualT({
          '1s': 'أَسْتَحْيِ',
          '2ms': 'تَسْتَحْيِ',
          '2fs': 'تَسْتَحْيِي',
          '3ms': 'يَسْتَحْيِ',
          '3fs': 'تَسْتَحْيِ',
          '2d': 'تَسْتَحْيِيَا',
          '3md': 'يَسْتَحْيِيَا',
          '3fd': 'تَسْتَحْيِيَا',
          '1p': 'نَسْتَحْيِ',
          '2mp': 'تَسْتَحْيُوا',
          '2fp': 'تَسْتَحْيِينَ',
          '3mp': 'يَسْتَحْيُوا',
          '3fp': 'يَسْتَحْيِينَ',
        })
      })

      test('preserves initial weak and drops final weak for اِسْتَوْفَى jussive', () => {
        expect(conjugatePresentMood(getVerb('وفي', 10), 'jussive')).toEqualT({
          '1s': 'أَسْتَوْفِ',
          '2ms': 'تَسْتَوْفِ',
          '2fs': 'تَسْتَوْفِي',
          '3ms': 'يَسْتَوْفِ',
          '3fs': 'تَسْتَوْفِ',
          '2d': 'تَسْتَوْفِيَا',
          '3md': 'يَسْتَوْفِيَا',
          '3fd': 'تَسْتَوْفِيَا',
          '1p': 'نَسْتَوْفِ',
          '2mp': 'تَسْتَوْفُوا',
          '2fp': 'تَسْتَوْفِينَ',
          '3mp': 'يَسْتَوْفُوا',
          '3fp': 'يَسْتَوْفِينَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['ءجر', 'يَسْتَأْجِرْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 10), 'jussive')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test('اِسْتَقْرَأَ (Form X) conjugation', () => {
        expect(conjugatePresentMood(getVerb('قرء', 10), 'jussive')).toEqualT({
          '1s': 'أَسْتَقْرِئْ',
          '2ms': 'تَسْتَقْرِئْ',
          '2fs': 'تَسْتَقْرِئِي',
          '3ms': 'يَسْتَقْرِئْ',
          '3fs': 'تَسْتَقْرِئْ',
          '2d': 'تَسْتَقْرِئَا',
          '3md': 'يَسْتَقْرِئَا',
          '3fd': 'تَسْتَقْرِئَا',
          '1p': 'نَسْتَقْرِئْ',
          '2mp': 'تَسْتَقْرِئُوا',
          '2fp': 'تَسْتَقْرِئْنَ',
          '3mp': 'يَسْتَقْرِئُوا',
          '3fp': 'يَسْتَقْرِئْنَ',
        })
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([['ضوء', 'يَسْتَضِئْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 10), 'jussive')['3ms']).toEqualT(expected)
      })
    })
  })
  describe('Form Iq', () => {
    describe('hollow roots', () => {
      test.each([
        ['كلور', 'يُكَلْوِرْ'],
        ['ترجم', 'يُتَرْجِمْ'],
        ['برهن', 'يُبَرْهِنْ'],
        ['عرقل', 'يُعَرْقِلْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'jussive')['3ms']).toEqualT(expected)
      })

      test('سَيْطَرَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('سيطر', 1), 'jussive')).toEqualT({
          '1s': 'أُسَيْطِرْ',
          '2ms': 'تُسَيْطِرْ',
          '2fs': 'تُسَيْطِرِي',
          '3ms': 'يُسَيْطِرْ',
          '3fs': 'تُسَيْطِرْ',
          '2d': 'تُسَيْطِرَا',
          '3md': 'يُسَيْطِرَا',
          '3fd': 'تُسَيْطِرَا',
          '1p': 'نُسَيْطِرْ',
          '2mp': 'تُسَيْطِرُوا',
          '2fp': 'تُسَيْطِرْنَ',
          '3mp': 'يُسَيْطِرُوا',
          '3fp': 'يُسَيْطِرْنَ',
        })
      })

      test('وَسْوَسَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وسوس', 1), 'jussive')).toEqualT({
          '1s': 'أُوَسْوِسْ',
          '2ms': 'تُوَسْوِسْ',
          '2fs': 'تُوَسْوِسِي',
          '3ms': 'يُوَسْوِسْ',
          '3fs': 'تُوَسْوِسْ',
          '2d': 'تُوَسْوِسَا',
          '3md': 'يُوَسْوِسَا',
          '3fd': 'تُوَسْوِسَا',
          '1p': 'نُوَسْوِسْ',
          '2mp': 'تُوَسْوِسُوا',
          '2fp': 'تُوَسْوِسْنَ',
          '3mp': 'يُوَسْوِسُوا',
          '3fp': 'يُوَسْوِسْنَ',
        })
      })

      test('لَأْلَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('لءلء', 1), 'jussive')).toEqualT({
          '1s': 'أُلَأْلِئْ',
          '2ms': 'تُلَأْلِئْ',
          '2fs': 'تُلَأْلِئِي',
          '3ms': 'يُلَأْلِئْ',
          '3fs': 'تُلَأْلِئْ',
          '2d': 'تُلَأْلِئَا',
          '3md': 'يُلَأْلِئَا',
          '3fd': 'تُلَأْلِئَا',
          '1p': 'نُلَأْلِئْ',
          '2mp': 'تُلَأْلِئُوا',
          '2fp': 'تُلَأْلِئْنَ',
          '3mp': 'يُلَأْلِئُوا',
          '3fp': 'يُلَأْلِئْنَ',
        })
      })
    })
  })

  describe('Form IIq', () => {
    describe('regular roots', () => {
      test.each([
        ['مركز', 'يَتَمَرْكَزْ'],
        ['بلور', 'يَتَبَلْوَرْ'],
        ['ذبذب', 'يَتَذَبْذَبْ'],
        ['غلغل', 'يَتَغَلْغَلْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })

      test('تَعَرْقَلَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('عرقل', 2), 'jussive')).toEqualT({
          '1s': 'أَتَعَرْقَلْ',
          '2ms': 'تَتَعَرْقَلْ',
          '2fs': 'تَتَعَرْقَلِي',
          '3ms': 'يَتَعَرْقَلْ',
          '3fs': 'تَتَعَرْقَلْ',
          '2d': 'تَتَعَرْقَلَا',
          '3md': 'يَتَعَرْقَلَا',
          '3fd': 'تَتَعَرْقَلَا',
          '1p': 'نَتَعَرْقَلْ',
          '2mp': 'تَتَعَرْقَلُوا',
          '2fp': 'تَتَعَرْقَلْنَ',
          '3mp': 'يَتَعَرْقَلُوا',
          '3fp': 'يَتَعَرْقَلْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['ءلمن', 'يَتَأَلْمَنْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'jussive')['3ms']).toEqualT(expected)
      })

      test('تَأَمْرَكَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ءمرك', 2), 'jussive')).toEqualT({
          '1s': 'أَتَأَمْرَكْ',
          '2ms': 'تَتَأَمْرَكْ',
          '2fs': 'تَتَأَمْرَكِي',
          '3ms': 'يَتَأَمْرَكْ',
          '3fs': 'تَتَأَمْرَكْ',
          '2d': 'تَتَأَمْرَكَا',
          '3md': 'يَتَأَمْرَكَا',
          '3fd': 'تَتَأَمْرَكَا',
          '1p': 'نَتَأَمْرَكْ',
          '2mp': 'تَتَأَمْرَكُوا',
          '2fp': 'تَتَأَمْرَكْنَ',
          '3mp': 'يَتَأَمْرَكُوا',
          '3fp': 'يَتَأَمْرَكْنَ',
        })
      })
    })
  })

  describe('Form IIIq', () => {
    describe('regular roots', () => {
      test.each([
        ['حرجم', 'يَحْرَنْجِمْ'],
        ['حرشف', 'يَحْرَنْشِفْ'],
        ['حرفز', 'يَحْرَنْفِزْ'],
        ['خرطم', 'يَخْرَنْطِمْ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'jussive')['3ms']).toEqualT(expected)
      })

      test('اِجْلَنْفَعَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('جلفع', 3), 'jussive')).toEqualT({
          '1s': 'أَجْلَنْفِعْ',
          '2ms': 'تَجْلَنْفِعْ',
          '2fs': 'تَجْلَنْفِعِي',
          '3ms': 'يَجْلَنْفِعْ',
          '3fs': 'تَجْلَنْفِعْ',
          '2d': 'تَجْلَنْفِعَا',
          '3md': 'يَجْلَنْفِعَا',
          '3fd': 'تَجْلَنْفِعَا',
          '1p': 'نَجْلَنْفِعْ',
          '2mp': 'تَجْلَنْفِعُوا',
          '2fp': 'تَجْلَنْفِعْنَ',
          '3mp': 'يَجْلَنْفِعُوا',
          '3fp': 'يَجْلَنْفِعْنَ',
        })
      })
    })
  })

  describe('Form IVq', () => {
    describe('regular roots', () => {
      test('اِقْشَعَرَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قشعر', 4), 'jussive')).toEqualT({
          '1s': 'أَقْشَعْرِرْ',
          '2ms': 'تَقْشَعْرِرْ',
          '2fs': 'تَقْشَعِرِّي',
          '3ms': 'يَقْشَعْرِرْ',
          '3fs': 'تَقْشَعْرِرْ',
          '2d': 'تَقْشَعِرَّا',
          '3md': 'يَقْشَعِرَّا',
          '3fd': 'تَقْشَعِرَّا',
          '1p': 'نَقْشَعْرِرْ',
          '2mp': 'تَقْشَعِرُّوا',
          '2fp': 'تَقْشَعْرِرْنَ',
          '3mp': 'يَقْشَعِرُّوا',
          '3fp': 'يَقْشَعْرِرْنَ',
        })
      })

      test('يَشْمَأْزِزْ conjugation', () => {
        expect(conjugatePresentMood(getVerb('شمءز', 4), 'jussive')).toEqualT({
          '1s': 'أَشْمَأْزِزْ',
          '2ms': 'تَشْمَأْزِزْ',
          '2fs': 'تَشْمَئِزِّي',
          '3ms': 'يَشْمَأْزِزْ',
          '3fs': 'تَشْمَأْزِزْ',
          '2d': 'تَشْمَئِزَّا',
          '3md': 'يَشْمَئِزَّا',
          '3fd': 'تَشْمَئِزَّا',
          '1p': 'نَشْمَأْزِزْ',
          '2mp': 'تَشْمَئِزُّوا',
          '2fp': 'تَشْمَأْزِزْنَ',
          '3mp': 'يَشْمَئِزُّوا',
          '3fp': 'يَشْمَأْزِزْنَ',
        })
      })

      test.each([['برغش', 'يَبْرَغْشِشْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'jussive')['3ms']).toEqualT(expected)
      })

      test.each([['جرمز', 'يَجْرَمْزِزْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'jussive')['3ms']).toEqualT(expected)
      })

      test.each([['جلعب', 'يَجْلَعْبِبْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'jussive')['3ms']).toEqualT(expected)
      })

      test.each([['جلعد', 'يَجْلَعْدِدْ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'jussive')['3ms']).toEqualT(expected)
      })
    })
  })
})
