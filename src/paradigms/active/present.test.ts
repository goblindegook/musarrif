import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { conjugatePresentMood } from './present'

describe('active present indicative', () => {
  describe('Form I', () => {
    describe('regular roots', () => {
      test.each([
        ['بدل', 'يَبْدِلُ'],
        ['جلس', 'يَجْلِسُ'],
        ['جعل', 'يَجْعَلُ'],
        ['ذكر', 'يَذْكُرُ'],
        ['ضمن', 'يَضْمَنُ'],
        ['عمل', 'يَعْمَلُ'],
        ['كلم', 'يَكْلِمُ'],
        ['جمع', 'يَجْمَعُ'],
        ['صبح', 'يَصْبَحُ'],
        ['دعم', 'يَدْعَمُ'],
        ['بعد', 'يَبْعَدُ'],
        ['حبط', 'يَحْبَطُ'],
        ['مثل', 'يَمْثُلُ'],
        ['حسب', 'يَحْسُبُ'],
        ['حضر', 'يَحْضُرُ'],
        ['حلق', 'يَحْلِقُ'],
        ['حلم', 'يَحْلُمُ'],
        ['قدم', 'يَقْدُمُ'],
        ['نفس', 'يَنْفُسُ'],
        ['مكن', 'يَمْكُنُ'],
        ['بلغ', 'يَبْلُغُ'],
        ['برح', 'يَبْرَحُ'],
        ['حدث', 'يَحْدُثُ'],
        ['دحرج', 'يُدَحْرِجُ'],
        ['درس', 'يَدْرُسُ'],
        ['نظر', 'يَنْظُرُ'],
        ['قتل', 'يَقْتُلُ'],
        ['قفز', 'يَقْفِزُ'],
        ['كسر', 'يَكْسِرُ'],
        ['هجر', 'يَهْجُرُ'],
        ['سلم', 'يَسْلَمُ'],
        ['زرق', 'يَزْرَقُ'],
        ['سكن', 'يَسْكُنُ'],
        ['صغر', 'يَصْغُرُ'],
        ['دخل', 'يَدْخُلُ'],
        ['زعم', 'يَزْعُمُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('كَتَبَ', () => {
        expect(conjugatePresentMood(getVerb('كتب', 1), 'indicative')).toEqualT({
          '1s': 'أَكْتُبُ',
          '2ms': 'تَكْتُبُ',
          '2fs': 'تَكْتُبِينَ',
          '3ms': 'يَكْتُبُ',
          '3fs': 'تَكْتُبُ',
          '2d': 'تَكْتُبَانِ',
          '3md': 'يَكْتُبَانِ',
          '3fd': 'تَكْتُبَانِ',
          '1p': 'نَكْتُبُ',
          '2mp': 'تَكْتُبُونَ',
          '2fp': 'تَكْتُبْنَ',
          '3mp': 'يَكْتُبُونَ',
          '3fp': 'يَكْتُبْنَ',
        })
      })

      test('نَظَرَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('نظر', 1), 'indicative')).toEqualT({
          '1s': 'أَنْظُرُ',
          '2ms': 'تَنْظُرُ',
          '2fs': 'تَنْظُرِينَ',
          '3ms': 'يَنْظُرُ',
          '3fs': 'تَنْظُرُ',
          '2d': 'تَنْظُرَانِ',
          '3md': 'يَنْظُرَانِ',
          '3fd': 'تَنْظُرَانِ',
          '1p': 'نَنْظُرُ',
          '2mp': 'تَنْظُرُونَ',
          '2fp': 'تَنْظُرْنَ',
          '3mp': 'يَنْظُرُونَ',
          '3fp': 'يَنْظُرْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['تمم', 'يَتِمُّ'],
        ['هلل', 'يَهُلُّ'],
        ['عنن', 'يَعِنُّ'],
        ['جبب', 'يَجُبُّ'],
        ['لمم', 'يَلُمُّ'],
        ['ودد', 'يَوَدُّ'],
        ['عدد', 'يَعُدُّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وعد', 'يَعِدُ'],
        ['وضع', 'يَضَعُ'],
        ['وطن', 'يَطِنُ'],
        ['وجب', 'يَجِبُ'],
        ['وصف', 'يَصِفُ'],
        ['وفد', 'يَفِدُ'],
        ['يسر', 'يَيْسُرُ'],
        ['يبس', 'يَيْبَسُ'],
        ['يمن', 'يَيْمَنُ'],
        ['ولد', 'يَلِدُ'],
        ['وقف', 'يَقِفُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('وَقَفَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وقف', 1), 'indicative')).toEqualT({
          '1s': 'أَقِفُ',
          '2ms': 'تَقِفُ',
          '2fs': 'تَقِفِينَ',
          '3ms': 'يَقِفُ',
          '3fs': 'تَقِفُ',
          '2d': 'تَقِفَانِ',
          '3md': 'يَقِفَانِ',
          '3fd': 'تَقِفَانِ',
          '1p': 'نَقِفُ',
          '2mp': 'تَقِفُونَ',
          '2fp': 'تَقِفْنَ',
          '3mp': 'يَقِفُونَ',
          '3fp': 'يَقِفْنَ',
        })
      })

      test('وَعَدَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وعد', 1), 'indicative')).toEqualT({
          '1s': 'أَعِدُ',
          '2ms': 'تَعِدُ',
          '2fs': 'تَعِدِينَ',
          '3ms': 'يَعِدُ',
          '3fs': 'تَعِدُ',
          '2d': 'تَعِدَانِ',
          '3md': 'يَعِدَانِ',
          '3fd': 'تَعِدَانِ',
          '1p': 'نَعِدُ',
          '2mp': 'تَعِدُونَ',
          '2fp': 'تَعِدْنَ',
          '3mp': 'يَعِدُونَ',
          '3fp': 'يَعِدْنَ',
        })
      })

      test('وَضَعَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وضع', 1), 'indicative')).toEqualT({
          '1s': 'أَضَعُ',
          '2ms': 'تَضَعُ',
          '2fs': 'تَضَعِينَ',
          '3ms': 'يَضَعُ',
          '3fs': 'تَضَعُ',
          '2d': 'تَضَعَانِ',
          '3md': 'يَضَعَانِ',
          '3fd': 'تَضَعَانِ',
          '1p': 'نَضَعُ',
          '2mp': 'تَضَعُونَ',
          '2fp': 'تَضَعْنَ',
          '3mp': 'يَضَعُونَ',
          '3fp': 'يَضَعْنَ',
        })
      })

      test('يَمَنَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('يمن', 1), 'indicative')).toEqualT({
          '1s': 'أَيْمَنُ',
          '2ms': 'تَيْمَنُ',
          '2fs': 'تَيْمَنِينَ',
          '3ms': 'يَيْمَنُ',
          '3fs': 'تَيْمَنُ',
          '2d': 'تَيْمَنَانِ',
          '3md': 'يَيْمَنَانِ',
          '3fd': 'تَيْمَنَانِ',
          '1p': 'نَيْمَنُ',
          '2mp': 'تَيْمَنُونَ',
          '2fp': 'تَيْمَنَّ',
          '3mp': 'يَيْمَنُونَ',
          '3fp': 'يَيْمَنَّ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['بيع', 'يَبِيعُ'],
        ['زور', 'يَزُورُ'],
        ['لوم', 'يَلُومُ'],
        ['دوم', 'يَدُومُ'],
        ['موت', 'يَمُوتُ'],
        ['خور', 'يَخْوَرُ'],
        ['حول', 'يَحُولُ'],
        ['عوم', 'يَعُومُ'],
        ['قول', 'يَقُولُ'],
        ['عوز', 'يَعْوَزُ'],
        ['نوم', 'يَنَامُ'],
        ['صير', 'يَصِيرُ'],
        ['خوف', 'يَخَافُ'],
        ['شوق', 'يَشُوقُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('خَالَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('خيل', 1), 'indicative')).toEqualT({
          '1s': 'أَخَالُ',
          '2ms': 'تَخَالُ',
          '2fs': 'تَخَالِينَ',
          '3ms': 'يَخَالُ',
          '3fs': 'تَخَالُ',
          '2d': 'تَخَالَانِ',
          '3md': 'يَخَالَانِ',
          '3fd': 'تَخَالَانِ',
          '1p': 'نَخَالُ',
          '2mp': 'تَخَالُونَ',
          '2fp': 'تَخَلْنَ',
          '3mp': 'يَخَالُونَ',
          '3fp': 'يَخَلْنَ',
        })
      })

      test('كَانَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('كون', 1), 'indicative')).toEqualT({
          '1s': 'أَكُونُ',
          '2ms': 'تَكُونُ',
          '2fs': 'تَكُونِينَ',
          '3ms': 'يَكُونُ',
          '3fs': 'تَكُونُ',
          '2d': 'تَكُونَانِ',
          '3md': 'يَكُونَانِ',
          '3fd': 'تَكُونَانِ',
          '1p': 'نَكُونُ',
          '2mp': 'تَكُونُونَ',
          '2fp': 'تَكُنَّ',
          '3mp': 'يَكُونُونَ',
          '3fp': 'يَكُنَّ',
        })
      })

      test('شَادَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('شيد', 1), 'indicative')).toEqualT({
          '1s': 'أَشِيدُ',
          '2ms': 'تَشِيدُ',
          '2fs': 'تَشِيدِينَ',
          '3ms': 'يَشِيدُ',
          '3fs': 'تَشِيدُ',
          '2d': 'تَشِيدَانِ',
          '3md': 'يَشِيدَانِ',
          '3fd': 'تَشِيدَانِ',
          '1p': 'نَشِيدُ',
          '2mp': 'تَشِيدُونَ',
          '2fp': 'تَشِدْنَ',
          '3mp': 'يَشِيدُونَ',
          '3fp': 'يَشِدْنَ',
        })
      })

      test('قَالَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قول', 1), 'indicative')).toEqualT({
          '1s': 'أَقُولُ',
          '2ms': 'تَقُولُ',
          '2fs': 'تَقُولِينَ',
          '3ms': 'يَقُولُ',
          '3fs': 'تَقُولُ',
          '2d': 'تَقُولَانِ',
          '3md': 'يَقُولَانِ',
          '3fd': 'تَقُولَانِ',
          '1p': 'نَقُولُ',
          '2mp': 'تَقُولُونَ',
          '2fp': 'تَقُلْنَ',
          '3mp': 'يَقُولُونَ',
          '3fp': 'يَقُلْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test('اِنْقَادَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قود', 7), 'indicative')).toEqualT({
          '1s': 'أَنْقَادُ',
          '2ms': 'تَنْقَادُ',
          '2fs': 'تَنْقَادِينَ',
          '3ms': 'يَنْقَادُ',
          '3fs': 'تَنْقَادُ',
          '2d': 'تَنْقَادَانِ',
          '3md': 'يَنْقَادَانِ',
          '3fd': 'تَنْقَادَانِ',
          '1p': 'نَنْقَادُ',
          '2mp': 'تَنْقَادُونَ',
          '2fp': 'تَنْقَدْنَ',
          '3mp': 'يَنْقَادُونَ',
          '3fp': 'يَنْقَدْنَ',
        })
      })

      test('اِنْهَالَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('هيل', 7), 'indicative')).toEqualT({
          '1s': 'أَنْهَالُ',
          '2ms': 'تَنْهَالُ',
          '2fs': 'تَنْهَالِينَ',
          '3ms': 'يَنْهَالُ',
          '3fs': 'تَنْهَالُ',
          '2d': 'تَنْهَالَانِ',
          '3md': 'يَنْهَالَانِ',
          '3fd': 'تَنْهَالَانِ',
          '1p': 'نَنْهَالُ',
          '2mp': 'تَنْهَالُونَ',
          '2fp': 'تَنْهَلْنَ',
          '3mp': 'يَنْهَالُونَ',
          '3fp': 'يَنْهَلْنَ',
        })
      })

      test('اِنْحَازَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('حوز', 7), 'indicative')).toEqualT({
          '1s': 'أَنْحَازُ',
          '2ms': 'تَنْحَازُ',
          '2fs': 'تَنْحَازِينَ',
          '3ms': 'يَنْحَازُ',
          '3fs': 'تَنْحَازُ',
          '2d': 'تَنْحَازَانِ',
          '3md': 'يَنْحَازَانِ',
          '3fd': 'تَنْحَازَانِ',
          '1p': 'نَنْحَازُ',
          '2mp': 'تَنْحَازُونَ',
          '2fp': 'تَنْحَزْنَ',
          '3mp': 'يَنْحَازُونَ',
          '3fp': 'يَنْحَزْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['بكي', 'يَبْكِي'],
        ['بدو', 'يَبْدُو'],
        ['علي', 'يَعْلِي'],
        ['جدو', 'يَجْدُو'],
        ['لهو', 'يَلْهُو'],
        ['شفي', 'يَشْفِي'],
        ['غشي', 'يَغْشِي'],
        ['دري', 'يَدْرِي'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('رَمَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('رمي', 1), 'indicative')).toEqualT({
          '1s': 'أَرْمِي',
          '2ms': 'تَرْمِي',
          '2fs': 'تَرْمِينَ',
          '3ms': 'يَرْمِي',
          '3fs': 'تَرْمِي',
          '2d': 'تَرْمِيَانِ',
          '3md': 'يَرْمِيَانِ',
          '3fd': 'تَرْمِيَانِ',
          '1p': 'نَرْمِي',
          '2mp': 'تَرْمُونَ',
          '2fp': 'تَرْمِينَ',
          '3mp': 'يَرْمُونَ',
          '3fp': 'يَرْمِينَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وقي', 'يَقِي'],
        ['وني', 'يَنِي'],
        ['ولي', 'يَلِي'],
        ['وعي', 'يَعِي'],
        ['وري', 'يَرِي'],
        ['قوي', 'يَقْوَى'],
        ['جوي', 'يَجْوَى'],
        ['روي', 'يَرْوِي'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('جَوِيَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('جوي', 1), 'indicative')).toEqualT({
          '1s': 'أَجْوَى',
          '2ms': 'تَجْوَى',
          '2fs': 'تَجْوَيْنَ',
          '3ms': 'يَجْوَى',
          '3fs': 'تَجْوَى',
          '2d': 'تَجْوَيَانِ',
          '3md': 'يَجْوَيَانِ',
          '3fd': 'تَجْوَيَانِ',
          '1p': 'نَجْوَى',
          '2mp': 'تَجْوَوْنَ',
          '2fp': 'تَجْوَيْنَ',
          '3mp': 'يَجْوَوْنَ',
          '3fp': 'يَجْوَيْنَ',
        })
      })

      test('رَوِيَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('روي', 1), 'indicative')).toEqualT({
          '1s': 'أَرْوِي',
          '2ms': 'تَرْوِي',
          '2fs': 'تَرْوِينَ',
          '3ms': 'يَرْوِي',
          '3fs': 'تَرْوِي',
          '2d': 'تَرْوِيَانِ',
          '3md': 'يَرْوِيَانِ',
          '3fd': 'تَرْوِيَانِ',
          '1p': 'نَرْوِي',
          '2mp': 'تَرْوُونَ',
          '2fp': 'تَرْوِينَ',
          '3mp': 'يَرْوُونَ',
          '3fp': 'يَرْوِينَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءذن', 'يَأْذَنُ'],
        ['ءجر', 'يَأْجُرُ'],
        ['ءصل', 'يَأْصُلُ'],
        ['ءخذ', 'يَأْخُذُ'],
        ['ءمر', 'يَأْمُرُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([
        ['ءدد', 'يَئِدُّ'],
        ['ءجج', 'يَؤُجُّ'],
        ['ءزز', 'يَؤُزُّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('أَمَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ءمم', 1), 'indicative')).toEqualT({
          '1s': 'أَؤُمُّ',
          '2ms': 'تَؤُمُّ',
          '2fs': 'تَؤُمِّينَ',
          '3ms': 'يَؤُمُّ',
          '3fs': 'تَؤُمُّ',
          '2d': 'تَؤُمَّانِ',
          '3md': 'يَؤُمَّانِ',
          '3fd': 'تَؤُمَّانِ',
          '1p': 'نَؤُمُّ',
          '2mp': 'تَؤُمُّونَ',
          '2fp': 'تَأْمُمْنَ',
          '3mp': 'يَؤُمُّونَ',
          '3fp': 'يَأْمُمْنَ',
        })
      })
    })

    describe('hamzated middle roots', () => {
      test.each([['بءس', 'يَبْؤُسُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['فتء', 'يَفْتَأُ'],
        ['بدء', 'يَبْدَأُ'],
        ['وطء', 'يَطَأُ'],
        ['جرء', 'يَجْرُؤُ'],
        ['كلء', 'يَكْلُؤُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('بَدَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('بدء', 1), 'indicative')).toEqualT({
          '1s': 'أَبْدَأُ',
          '2ms': 'تَبْدَأُ',
          '2fs': 'تَبْدَئِينَ',
          '3ms': 'يَبْدَأُ',
          '3fs': 'تَبْدَأُ',
          '2d': 'تَبْدَآنِ',
          '3md': 'يَبْدَآنِ',
          '3fd': 'تَبْدَآنِ',
          '1p': 'نَبْدَأُ',
          '2mp': 'تَبْدَؤُونَ',
          '2fp': 'تَبْدَأْنَ',
          '3mp': 'يَبْدَؤُونَ',
          '3fp': 'يَبْدَأْنَ',
        })
      })

      test('قَرَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قرء', 1), 'indicative')).toEqualT({
          '1s': 'أَقْرَأُ',
          '2ms': 'تَقْرَأُ',
          '2fs': 'تَقْرَئِينَ',
          '3ms': 'يَقْرَأُ',
          '3fs': 'تَقْرَأُ',
          '2d': 'تَقْرَآنِ',
          '3md': 'يَقْرَآنِ',
          '3fd': 'تَقْرَآنِ',
          '1p': 'نَقْرَأُ',
          '2mp': 'تَقْرَؤُونَ',
          '2fp': 'تَقْرَأْنَ',
          '3mp': 'يَقْرَؤُونَ',
          '3fp': 'يَقْرَأْنَ',
        })
      })

      test('وَطِئَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وطء', 1), 'indicative')).toEqualT({
          '1s': 'أَطَأُ',
          '2ms': 'تَطَأُ',
          '2fs': 'تَطَئِينَ',
          '3ms': 'يَطَأُ',
          '3fs': 'تَطَأُ',
          '2d': 'تَطَآنِ',
          '3md': 'يَطَآنِ',
          '3fd': 'تَطَآنِ',
          '1p': 'نَطَأُ',
          '2mp': 'تَطَؤُونَ',
          '2fp': 'تَطَأْنَ',
          '3mp': 'يَطَؤُونَ',
          '3fp': 'يَطَأْنَ',
        })
      })

      test('كَلَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('كلء', 1), 'indicative')).toEqualT({
          '1s': 'أَكْلُؤُ',
          '2ms': 'تَكْلُؤُ',
          '2fs': 'تَكْلُئِينَ',
          '3ms': 'يَكْلُؤُ',
          '3fs': 'تَكْلُؤُ',
          '2d': 'تَكْلُؤَانِ',
          '3md': 'يَكْلُؤَانِ',
          '3fd': 'تَكْلُؤَانِ',
          '1p': 'نَكْلُؤُ',
          '2mp': 'تَكْلُؤُونَ',
          '2fp': 'تَكْلُؤْنَ',
          '3mp': 'يَكْلُؤُونَ',
          '3fp': 'يَكْلُؤْنَ',
        })
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([['نوء', 'يَنُوءُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('جَاءَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('جيء', 1), 'indicative')).toEqualT({
          '1s': 'أَجِيءُ',
          '2ms': 'تَجِيءُ',
          '2fs': 'تَجِيئِينَ',
          '3ms': 'يَجِيءُ',
          '3fs': 'تَجِيءُ',
          '2d': 'تَجِيئَانِ',
          '3md': 'يَجِيئَانِ',
          '3fd': 'تَجِيئَانِ',
          '1p': 'نَجِيءُ',
          '2mp': 'تَجِيئُونَ',
          '2fp': 'تَجِئْنَ',
          '3mp': 'يَجِيئُونَ',
          '3fp': 'يَجِئْنَ',
        })
      })
    })

    describe('hamzated initial hollow roots', () => {
      test.each([['ءول', 'يَؤُولُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('يَؤُولُ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ءول', 1), 'indicative')).toEqualT({
          '1s': 'أَؤُولُ',
          '2ms': 'تَؤُولُ',
          '2fs': 'تَؤُولِينَ',
          '3ms': 'يَؤُولُ',
          '3fs': 'تَؤُولُ',
          '2d': 'تَؤُولَانِ',
          '3md': 'يَؤُولَانِ',
          '3fd': 'تَؤُولَانِ',
          '1p': 'نَؤُولُ',
          '2mp': 'تَؤُولُونَ',
          '2fp': 'تَؤُلْنَ',
          '3mp': 'يَؤُولُونَ',
          '3fp': 'يَؤُلْنَ',
        })
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([
        ['ءتي', 'يَأْتِي'],
        ['ءني', 'يَأْنِي'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('أَبَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('ءبي', 1), 'indicative')).toEqualT({
          '1s': 'آبَى',
          '2ms': 'تَأْبَى',
          '2fs': 'تَأْبَيْنَ',
          '3ms': 'يَأْبَى',
          '3fs': 'تَأْبَى',
          '2d': 'تَأْبَيَانِ',
          '3md': 'يَأْبَيَانِ',
          '3fd': 'تَأْبَيَانِ',
          '1p': 'نَأْبَى',
          '2mp': 'تَأْبَوْنَ',
          '2fp': 'تَأْبَيْنَ',
          '3mp': 'يَأْبَوْنَ',
          '3fp': 'يَأْبَيْنَ',
        })
      })

      test('أَتَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('ءتي', 1), 'indicative')).toEqualT({
          '1s': 'آتِي',
          '2ms': 'تَأْتِي',
          '2fs': 'تَأْتِينَ',
          '3ms': 'يَأْتِي',
          '3fs': 'تَأْتِي',
          '2d': 'تَأْتِيَانِ',
          '3md': 'يَأْتِيَانِ',
          '3fd': 'تَأْتِيَانِ',
          '1p': 'نَأْتِي',
          '2mp': 'تَأْتُونَ',
          '2fp': 'تَأْتِينَ',
          '3mp': 'يَأْتُونَ',
          '3fp': 'يَأْتِينَ',
        })
      })
    })

    describe('hamzated middle defective roots', () => {
      test.each([['رءي', 'يَرَى']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('رَأَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('رءي', 1), 'indicative')).toEqualT({
          '1s': 'أَرَى',
          '2ms': 'تَرَى',
          '2fs': 'تَرَيْنَ',
          '3ms': 'يَرَى',
          '3fs': 'تَرَى',
          '2d': 'تَرَيَانِ',
          '3md': 'يَرَيَانِ',
          '3fd': 'تَرَيَانِ',
          '1p': 'نَرَى',
          '2mp': 'تَرَوْنَ',
          '2fp': 'تَرَيْنَ',
          '3mp': 'يَرَوْنَ',
          '3fp': 'يَرَيْنَ',
        })
      })
    })

    describe('hamzated hollow-defective roots', () => {
      test.each([['ءوي', 'يَأْوِي']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('أَوَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('ءوي', 1), 'indicative')).toEqualT({
          '1s': 'آوِي',
          '2ms': 'تَأْوِي',
          '2fs': 'تَأْوِينَ',
          '3ms': 'يَأْوِي',
          '3fs': 'تَأْوِي',
          '2d': 'تَأْوِيَانِ',
          '3md': 'يَأْوِيَانِ',
          '3fd': 'تَأْوِيَانِ',
          '1p': 'نَأْوِي',
          '2mp': 'تَأْوُونَ',
          '2fp': 'تَأْوِينَ',
          '3mp': 'يَأْوُونَ',
          '3fp': 'يَأْوِينَ',
        })
      })
    })
  })

  describe('Form II', () => {
    describe('regular roots', () => {
      test.each([
        ['ذكر', 'يُذَكِّرُ'],
        ['ضمن', 'يُضَمِّنُ'],
        ['عمل', 'يُعَمِّلُ'],
        ['جمع', 'يُجَمِّعُ'],
        ['مكن', 'يُمَكِّنُ'],
        ['مثل', 'يُمَثِّلُ'],
        ['سبب', 'يُسَبِّبُ'],
        ['زرق', 'يُزَرِّقُ'],
        ['خطط', 'يُخَطِّطُ'],
        ['صبح', 'يُصَبِّحُ'],
        ['فسر', 'يُفَسِّرُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
      })

      test('كَتَّبَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('كتب', 2), 'indicative')).toEqualT({
          '1s': 'أُكَتِّبُ',
          '2ms': 'تُكَتِّبُ',
          '2fs': 'تُكَتِّبِينَ',
          '3ms': 'يُكَتِّبُ',
          '3fs': 'تُكَتِّبُ',
          '2d': 'تُكَتِّبَانِ',
          '3md': 'يُكَتِّبَانِ',
          '3fd': 'تُكَتِّبَانِ',
          '1p': 'نُكَتِّبُ',
          '2mp': 'تُكَتِّبُونَ',
          '2fp': 'تُكَتِّبْنَ',
          '3mp': 'يُكَتِّبُونَ',
          '3fp': 'يُكَتِّبْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وطن', 'يُوَطِّنُ'],
        ['وجه', 'يُوَجِّهُ'],
        ['وقف', 'يُوَقِّفُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
      })

      test('يُوَسِّطُ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وسط', 2), 'indicative')).toEqualT({
          '1s': 'أُوَسِّطُ',
          '2ms': 'تُوَسِّطُ',
          '2fs': 'تُوَسِّطِينَ',
          '3ms': 'يُوَسِّطُ',
          '3fs': 'تُوَسِّطُ',
          '2d': 'تُوَسِّطَانِ',
          '3md': 'يُوَسِّطَانِ',
          '3fd': 'تُوَسِّطَانِ',
          '1p': 'نُوَسِّطُ',
          '2mp': 'تُوَسِّطُونَ',
          '2fp': 'تُوَسِّطْنَ',
          '3mp': 'يُوَسِّطُونَ',
          '3fp': 'يُوَسِّطْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'يُحَبِّبُ'],
        ['حدد', 'يُحَدِّدُ'],
        ['قرر', 'يُقَرِّرُ'],
        ['شدد', 'يُشَدِّدُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قوس', 'يُقَوِّسُ'],
        ['كون', 'يُكَوِّنُ'],
        ['دون', 'يُدَوِّنُ'],
        ['سوف', 'يُسَوِّفُ'],
        ['نوم', 'يُنَوِّمُ'],
        ['كيف', 'يُكَيِّفُ'],
        ['ءول', 'يُؤَوِّلُ'],
        ['ءوب', 'يُؤَوِّبُ'],
        ['شوق', 'يُشَوِّقُ'],
        ['زور', 'يُزَوِّرُ'],
        ['صير', 'يُصَيِّرُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
      })

      test('قَوَّلَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قول', 2), 'indicative')).toEqualT({
          '1s': 'أُقَوِّلُ',
          '2ms': 'تُقَوِّلُ',
          '2fs': 'تُقَوِّلِينَ',
          '3ms': 'يُقَوِّلُ',
          '3fs': 'تُقَوِّلُ',
          '2d': 'تُقَوِّلَانِ',
          '3md': 'يُقَوِّلَانِ',
          '3fd': 'تُقَوِّلَانِ',
          '1p': 'نُقَوِّلُ',
          '2mp': 'تُقَوِّلُونَ',
          '2fp': 'تُقَوِّلْنَ',
          '3mp': 'يُقَوِّلُونَ',
          '3fp': 'يُقَوِّلْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['ءذي', 'يُؤَذِّي'],
        ['ءسي', 'يُؤَسِّي'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
      })

      test('رَمَّى conjugation', () => {
        expect(conjugatePresentMood(getVerb('رمي', 2), 'indicative')).toEqualT({
          '1s': 'أُرَمِّي',
          '2ms': 'تُرَمِّي',
          '2fs': 'تُرَمِّينَ',
          '3ms': 'يُرَمِّي',
          '3fs': 'تُرَمِّي',
          '2d': 'تُرَمِّيَانِ',
          '3md': 'يُرَمِّيَانِ',
          '3fd': 'تُرَمِّيَانِ',
          '1p': 'نُرَمِّي',
          '2mp': 'تُرَمُّونَ',
          '2fp': 'تُرَمِّينَ',
          '3mp': 'يُرَمُّونَ',
          '3fp': 'يُرَمِّينَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['يود', 'يُيَوِّدُ'],
        ['ولي', 'يُوَلِّي'],
        ['وري', 'يُوَرِّي'],
        ['مني', 'يُمَنِّي'],
        ['حيي', 'يُحَيِّي'],
        ['سمي', 'يُسَمِّي'],
        ['غطي', 'يُغَطِّي'],
        ['غني', 'يُغَنِّي'],
        ['قوي', 'يُقَوِّي'],
        ['زوي', 'يُزَوِّي'],
        ['هوي', 'يُهَوِّي'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءكد', 'يُؤَكِّدُ'],
        ['ءكل', 'يُؤَكِّلُ'],
        ['ءجر', 'يُؤَجِّرُ'],
        ['ءثر', 'يُؤَثِّرُ'],
        ['ءجج', 'يُؤَجِّجُ'],
        ['ءسس', 'يُؤَسِّسُ'],
        ['ءخر', 'يُؤَخِّرُ'],
        ['ءمر', 'يُؤَمِّرُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial hollow roots', () => {
      test.each([['ءود', 'يُؤَوِّدُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
      })

      test('أَيَّدَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ءيد', 2), 'indicative')).toEqualT({
          '1s': 'أُؤَيِّدُ',
          '2ms': 'تُؤَيِّدُ',
          '2fs': 'تُؤَيِّدِينَ',
          '3ms': 'يُؤَيِّدُ',
          '3fs': 'تُؤَيِّدُ',
          '2d': 'تُؤَيِّدَانِ',
          '3md': 'يُؤَيِّدَانِ',
          '3fd': 'تُؤَيِّدَانِ',
          '1p': 'نُؤَيِّدُ',
          '2mp': 'تُؤَيِّدُونَ',
          '2fp': 'تُؤَيِّدْنَ',
          '3mp': 'يُؤَيِّدُونَ',
          '3fp': 'يُؤَيِّدْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([['هنء', 'يُهَنِّئُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final assimilated roots', () => {
      test('يُوَطِّئُ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وطء', 2), 'indicative')).toEqualT({
          '1s': 'أُوَطِّئُ',
          '2ms': 'تُوَطِّئُ',
          '2fs': 'تُوَطِّئِينَ',
          '3ms': 'يُوَطِّئُ',
          '3fs': 'تُوَطِّئُ',
          '2d': 'تُوَطِّئَانِ',
          '3md': 'يُوَطِّئَانِ',
          '3fd': 'تُوَطِّئَانِ',
          '1p': 'نُوَطِّئُ',
          '2mp': 'تُوَطِّئُونَ',
          '2fp': 'تُوَطِّئْنَ',
          '3mp': 'يُوَطِّئُونَ',
          '3fp': 'يُوَطِّئْنَ',
        })
      })
    })
  })

  describe('Form III', () => {
    describe('regular roots', () => {
      test.each([
        ['عمل', 'يُعَامِلُ'],
        ['كلم', 'يُكَالِمُ'],
        ['تبع', 'يُتَابِعُ'],
        ['بلغ', 'يُبَالِغُ'],
        ['سعد', 'يُسَاعِدُ'],
        ['سلم', 'يُسَالِمُ'],
        ['صحب', 'يُصَاحِبُ'],
        ['وجه', 'يُوَاجِهُ'],
        ['وثق', 'يُوَاثِقُ'],
        ['وعد', 'يُوَاعِدُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })

      test('كَاتَبَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('كتب', 3), 'indicative')).toEqualT({
          '1s': 'أُكَاتِبُ',
          '2ms': 'تُكَاتِبُ',
          '2fs': 'تُكَاتِبِينَ',
          '3ms': 'يُكَاتِبُ',
          '3fs': 'تُكَاتِبُ',
          '2d': 'تُكَاتِبَانِ',
          '3md': 'يُكَاتِبَانِ',
          '3fd': 'تُكَاتِبَانِ',
          '1p': 'نُكَاتِبُ',
          '2mp': 'تُكَاتِبُونَ',
          '2fp': 'تُكَاتِبْنَ',
          '3fp': 'يُكَاتِبْنَ',
          '3mp': 'يُكَاتِبُونَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['سرر', 'يُسَارُّ'],
        ['ردد', 'يُرَادُّ'],
        ['مدد', 'يُمَادُّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })

      test('سَارَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('سرر', 3), 'indicative')).toEqualT({
          '1s': 'أُسَارُّ',
          '2ms': 'تُسَارُّ',
          '2fs': 'تُسَارِّينَ',
          '3ms': 'يُسَارُّ',
          '3fs': 'تُسَارُّ',
          '2d': 'تُسَارَّانِ',
          '3md': 'يُسَارَّانِ',
          '3fd': 'تُسَارَّانِ',
          '1p': 'نُسَارُّ',
          '2mp': 'تُسَارُّونَ',
          '2fp': 'تُسَارِرْنَ',
          '3mp': 'يُسَارُّونَ',
          '3fp': 'يُسَارِرْنَ',
        })
      })

      test('رَادَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ردد', 3), 'indicative')).toEqualT({
          '1s': 'أُرَادُّ',
          '2ms': 'تُرَادُّ',
          '2fs': 'تُرَادِّينَ',
          '3ms': 'يُرَادُّ',
          '3fs': 'تُرَادُّ',
          '2d': 'تُرَادَّانِ',
          '3md': 'يُرَادَّانِ',
          '3fd': 'تُرَادَّانِ',
          '1p': 'نُرَادُّ',
          '2mp': 'تُرَادُّونَ',
          '2fp': 'تُرَادِدْنَ',
          '3mp': 'يُرَادُّونَ',
          '3fp': 'يُرَادِدْنَ',
        })
      })

      test('مَادَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('مدد', 3), 'indicative')).toEqualT({
          '1s': 'أُمَادُّ',
          '2ms': 'تُمَادُّ',
          '2fs': 'تُمَادِّينَ',
          '3ms': 'يُمَادُّ',
          '3fs': 'تُمَادُّ',
          '2d': 'تُمَادَّانِ',
          '3md': 'يُمَادَّانِ',
          '3fd': 'تُمَادَّانِ',
          '1p': 'نُمَادُّ',
          '2mp': 'تُمَادُّونَ',
          '2fp': 'تُمَادِدْنَ',
          '3mp': 'يُمَادُّونَ',
          '3fp': 'يُمَادِدْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عون', 'يُعَاوِنُ'],
        ['قوم', 'يُقَاوِمُ'],
        ['عود', 'يُعَاوِدُ'],
        ['جوز', 'يُجَاوِزُ'],
        ['نول', 'يُنَاوِلُ'],
        ['ضيق', 'يُضَايِقُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })

      test('قَاوَلَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قول', 3), 'indicative')).toEqualT({
          '1s': 'أُقَاوِلُ',
          '2ms': 'تُقَاوِلُ',
          '2fs': 'تُقَاوِلِينَ',
          '3ms': 'يُقَاوِلُ',
          '3fs': 'تُقَاوِلُ',
          '2d': 'تُقَاوِلَانِ',
          '3md': 'يُقَاوِلَانِ',
          '3fd': 'تُقَاوِلَانِ',
          '1p': 'نُقَاوِلُ',
          '2mp': 'تُقَاوِلُونَ',
          '2fp': 'تُقَاوِلْنَ',
          '3mp': 'يُقَاوِلُونَ',
          '3fp': 'يُقَاوِلْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([['وسي', 'يُوَاسِي']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })

      test.each([['نوي', 'يُنَاوِي']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['ندي', 'يُنَادِي'],
        ['رعي', 'يُرَاعِي'],
        ['بلي', 'يُبَالِي'],
        ['قضي', 'يُقَاضِي'],
        ['بري', 'يُبَارِي'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءخذ', 'يُؤَاخِذُ'],
        ['ءجر', 'يُؤَاجِرُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })

      test('آخَذَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ءخذ', 3), 'indicative')).toEqualT({
          '1s': 'أُؤَاخِذُ',
          '2ms': 'تُؤَاخِذُ',
          '2fs': 'تُؤَاخِذِينَ',
          '3ms': 'يُؤَاخِذُ',
          '3fs': 'تُؤَاخِذُ',
          '2d': 'تُؤَاخِذَانِ',
          '3md': 'يُؤَاخِذَانِ',
          '3fd': 'تُؤَاخِذَانِ',
          '1p': 'نُؤَاخِذُ',
          '2mp': 'تُؤَاخِذُونَ',
          '2fp': 'تُؤَاخِذْنَ',
          '3mp': 'يُؤَاخِذُونَ',
          '3fp': 'يُؤَاخِذْنَ',
        })
      })

      test('آجَرَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ءجر', 3), 'indicative')).toEqualT({
          '1s': 'أُؤَاجِرُ',
          '2ms': 'تُؤَاجِرُ',
          '2fs': 'تُؤَاجِرِينَ',
          '3ms': 'يُؤَاجِرُ',
          '3fs': 'تُؤَاجِرُ',
          '2d': 'تُؤَاجِرَانِ',
          '3md': 'يُؤَاجِرَانِ',
          '3fd': 'تُؤَاجِرَانِ',
          '1p': 'نُؤَاجِرُ',
          '2mp': 'تُؤَاجِرُونَ',
          '2fp': 'تُؤَاجِرْنَ',
          '3mp': 'يُؤَاجِرُونَ',
          '3fp': 'يُؤَاجِرْنَ',
        })
      })
    })

    describe('hamzated middle roots', () => {
      test.each([['وءم', 'يُوَائِمُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })

      test('سَاءَلَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('سءل', 3), 'indicative')).toEqualT({
          '1s': 'أُسَائِلُ',
          '2ms': 'تُسَائِلُ',
          '2fs': 'تُسَائِلِينَ',
          '3ms': 'يُسَائِلُ',
          '3fs': 'تُسَائِلُ',
          '2d': 'تُسَائِلَانِ',
          '3md': 'يُسَائِلَانِ',
          '3fd': 'تُسَائِلَانِ',
          '1p': 'نُسَائِلُ',
          '2mp': 'تُسَائِلُونَ',
          '2fp': 'تُسَائِلْنَ',
          '3mp': 'يُسَائِلُونَ',
          '3fp': 'يُسَائِلْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([['فجء', 'يُفَاجِئُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })

      test('فَاجَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('فجء', 3), 'indicative')).toEqualT({
          '1s': 'أُفَاجِئُ',
          '2ms': 'تُفَاجِئُ',
          '2fs': 'تُفَاجِئِينَ',
          '3ms': 'يُفَاجِئُ',
          '3fs': 'تُفَاجِئُ',
          '2d': 'تُفَاجِئَانِ',
          '3md': 'يُفَاجِئَانِ',
          '3fd': 'تُفَاجِئَانِ',
          '1p': 'نُفَاجِئُ',
          '2mp': 'تُفَاجِئُونَ',
          '2fp': 'تُفَاجِئْنَ',
          '3mp': 'يُفَاجِئُونَ',
          '3fp': 'يُفَاجِئْنَ',
        })
      })
    })
  })

  describe('Form IV', () => {
    describe('regular roots', () => {
      test.each([
        ['كثر', 'يُكْثِرُ'],
        ['علم', 'يُعْلِمُ'],
        ['لحق', 'يُلْحِقُ'],
        ['صبح', 'يُصْبِحُ'],
        ['مكن', 'يُمْكِنُ'],
        ['فلت', 'يُفْلِتُ'],
        ['سلم', 'يُسْلِمُ'],
        ['عرب', 'يُعْرِبُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
      })

      test('أَكْتَبَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('كتب', 4), 'indicative')).toEqualT({
          '1s': 'أُكْتِبُ',
          '2ms': 'تُكْتِبُ',
          '2fs': 'تُكْتِبِينَ',
          '3ms': 'يُكْتِبُ',
          '3fs': 'تُكْتِبُ',
          '2d': 'تُكْتِبَانِ',
          '3md': 'يُكْتِبَانِ',
          '3fd': 'تُكْتِبَانِ',
          '1p': 'نُكْتِبُ',
          '2mp': 'تُكْتِبُونَ',
          '2fp': 'تُكْتِبْنَ',
          '3mp': 'يُكْتِبُونَ',
          '3fp': 'يُكْتِبْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['تمم', 'يُتِمُّ'],
        ['سفف', 'يُسِفُّ'],
        ['همم', 'يُهِمُّ'],
        ['قرر', 'يُقِرُّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['ضيف', 'يُضِيفُ'],
        ['عون', 'يُعِينُ'],
        ['شور', 'يُشِيرُ'],
        ['رود', 'يُرِيدُ'],
        ['نوم', 'يُنِيمُ'],
        ['تيح', 'يُتِيحُ'],
        ['فيد', 'يُفِيدُ'],
        ['عود', 'يُعِيدُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وصي', 'يُوصِي'],
        ['وحي', 'يُوحِي'],
        ['ودي', 'يُودِي'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
      })

      test('أَرَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('رءي', 4), 'indicative')).toEqualT({
          '1s': 'أُرِي',
          '2ms': 'تُرِي',
          '2fs': 'تُرِينَ',
          '3ms': 'يُرِي',
          '3fs': 'تُرِي',
          '2d': 'تُرِيَانِ',
          '3md': 'يُرِيَانِ',
          '3fd': 'تُرِيَانِ',
          '1p': 'نُرِي',
          '2mp': 'تُرُونَ',
          '2fp': 'تُرِينَ',
          '3mp': 'يُرُونَ',
          '3fp': 'يُرِينَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['نشء', 'يُنْشِئُ'],
        ['نبء', 'يُنْبِئُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form V', () => {
    describe('regular roots', () => {
      test.each([
        ['جمع', 'يَتَجَمَّعُ'],
        ['ضمن', 'يَتَضَمَّنُ'],
        ['حدث', 'يَتَحَدَّثُ'],
        ['مثل', 'يَتَمَثَّلُ'],
        ['عرف', 'يَتَعَرَّفُ'],
        ['سلم', 'يَتَسَلَّمُ'],
        ['طلب', 'يَتَطَلَّبُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'indicative')['3ms']).toEqualT(expected)
      })

      test('تَكَتَّبَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('كتب', 5), 'indicative')).toEqualT({
          '1s': 'أَتَكَتَّبُ',
          '2ms': 'تَتَكَتَّبُ',
          '2fs': 'تَتَكَتَّبِينَ',
          '3ms': 'يَتَكَتَّبُ',
          '3fs': 'تَتَكَتَّبُ',
          '2d': 'تَتَكَتَّبَانِ',
          '3md': 'يَتَكَتَّبَانِ',
          '3fd': 'تَتَكَتَّبَانِ',
          '1p': 'نَتَكَتَّبُ',
          '2mp': 'تَتَكَتَّبُونَ',
          '2fp': 'تَتَكَتَّبْنَ',
          '3mp': 'يَتَكَتَّبُونَ',
          '3fp': 'يَتَكَتَّبْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءخر', 'يَتَأَخَّرُ'],
        ['ءلف', 'يَتَأَلَّفُ'],
        ['ءول', 'يَتَأَوَّلُ'],
        ['ءكد', 'يَتَأَكَّدُ'],
        ['ءكل', 'يَتَأَكَّلُ'],
        ['ءثر', 'يَتَأَثَّرُ'],
        ['ءوه', 'يَتَأَوَّهُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([['ءمم', 'يَتَأَمَّمُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([
        ['ءذي', 'يَتَأَذَّى'],
        ['ءتي', 'يَتَأَتَّى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'يَتَحَبَّبُ'],
        ['هدد', 'يَتَهَدَّدُ'],
        ['حدد', 'يَتَحَدَّدُ'],
        ['عزز', 'يَتَعَزَّزُ'],
        ['سبب', 'يَتَسَبَّبُ'],
        ['قرر', 'يَتَقَرَّرُ'],
        ['مدد', 'يَتَمَدَّدُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وصل', 'يَتَوَصَّلُ'],
        ['وفر', 'يَتَوَفَّرُ'],
        ['وقف', 'يَتَوَقَّفُ'],
        ['وكء', 'يَتَوَكَّأُ'],
        ['وقع', 'يَتَوَقَّعُ'],
        ['وسع', 'يَتَوَسَّعُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'indicative')['3ms']).toEqualT(expected)
      })

      test('تَوَعَّدَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وعد', 5), 'indicative')).toEqualT({
          '1s': 'أَتَوَعَّدُ',
          '2ms': 'تَتَوَعَّدُ',
          '2fs': 'تَتَوَعَّدِينَ',
          '3ms': 'يَتَوَعَّدُ',
          '3fs': 'تَتَوَعَّدُ',
          '2d': 'تَتَوَعَّدَانِ',
          '3md': 'يَتَوَعَّدَانِ',
          '3fd': 'تَتَوَعَّدَانِ',
          '1p': 'نَتَوَعَّدُ',
          '2mp': 'تَتَوَعَّدُونَ',
          '2fp': 'تَتَوَعَّدْنَ',
          '3mp': 'يَتَوَعَّدُونَ',
          '3fp': 'يَتَوَعَّدْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['حول', 'يَتَحَوَّلُ'],
        ['عين', 'يَتَعَيَّنُ'],
        ['غير', 'يَتَغَيَّرُ'],
        ['طور', 'يَتَطَوَّرُ'],
        ['شوق', 'يَتَشَوَّقُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'indicative')['3ms']).toEqualT(expected)
      })

      test('تَقَوَّلَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قول', 5), 'indicative')).toEqualT({
          '1s': 'أَتَقَوَّلُ',
          '2ms': 'تَتَقَوَّلُ',
          '2fs': 'تَتَقَوَّلِينَ',
          '3ms': 'يَتَقَوَّلُ',
          '3fs': 'تَتَقَوَّلُ',
          '2d': 'تَتَقَوَّلَانِ',
          '3md': 'يَتَقَوَّلَانِ',
          '3fd': 'تَتَقَوَّلَانِ',
          '1p': 'نَتَقَوَّلُ',
          '2mp': 'تَتَقَوَّلُونَ',
          '2fp': 'تَتَقَوَّلْنَ',
          '3mp': 'يَتَقَوَّلُونَ',
          '3fp': 'يَتَقَوَّلْنَ',
        })
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
        expect(conjugatePresentMood(getVerb(root, 5), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وفي', 'يَتَوَفَّى'],
        ['وقي', 'يَتَوَقَّى'],
        ['وخي', 'يَتَوَخَّى'],
        ['زوي', 'يَتَزَوَّى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final hollow roots', () => {
      test('تَهَيَّأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('هيء', 5), 'indicative')).toEqualT({
          '1s': 'أَتَهَيَّأُ',
          '2ms': 'تَتَهَيَّأُ',
          '2fs': 'تَتَهَيَّئِينَ',
          '3ms': 'يَتَهَيَّأُ',
          '3fs': 'تَتَهَيَّأُ',
          '2d': 'تَتَهَيَّآنِ',
          '3md': 'يَتَهَيَّآنِ',
          '3fd': 'تَتَهَيَّآنِ',
          '1p': 'نَتَهَيَّأُ',
          '2mp': 'تَتَهَيَّؤُونَ',
          '2fp': 'تَتَهَيَّأْنَ',
          '3mp': 'يَتَهَيَّؤُونَ',
          '3fp': 'يَتَهَيَّأْنَ',
        })
      })

      test('تَضَوَّأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ضوء', 5), 'indicative')).toEqualT({
          '1s': 'أَتَضَوَّأُ',
          '2ms': 'تَتَضَوَّأُ',
          '2fs': 'تَتَضَوَّئِينَ',
          '3ms': 'يَتَضَوَّأُ',
          '3fs': 'تَتَضَوَّأُ',
          '2d': 'تَتَضَوَّآنِ',
          '3md': 'يَتَضَوَّآنِ',
          '3fd': 'تَتَضَوَّآنِ',
          '1p': 'نَتَضَوَّأُ',
          '2mp': 'تَتَضَوَّؤُونَ',
          '2fp': 'تَتَضَوَّأْنَ',
          '3mp': 'يَتَضَوَّؤُونَ',
          '3fp': 'يَتَضَوَّأْنَ',
        })
      })
    })
  })

  describe('Form VI', () => {
    describe('regular roots', () => {
      test.each([
        ['عمل', 'يَتَعَامَلُ'],
        ['كمل', 'يَتَكَامَلُ'],
        ['شرك', 'يَتَشَارَكُ'],
        ['علج', 'يَتَعَالَجُ'],
        ['قسم', 'يَتَقَاسَمُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 6), 'indicative')['3ms']).toEqualT(expected)
      })

      test('تَكَاتَبَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('كتب', 6), 'indicative')).toEqualT({
          '1s': 'أَتَكَاتَبُ',
          '2ms': 'تَتَكَاتَبُ',
          '2fs': 'تَتَكَاتَبِينَ',
          '3ms': 'يَتَكَاتَبُ',
          '3fs': 'تَتَكَاتَبُ',
          '2d': 'تَتَكَاتَبَانِ',
          '3md': 'يَتَكَاتَبَانِ',
          '3fd': 'تَتَكَاتَبَانِ',
          '1p': 'نَتَكَاتَبُ',
          '2mp': 'تَتَكَاتَبُونَ',
          '2fp': 'تَتَكَاتَبْنَ',
          '3fp': 'يَتَكَاتَبْنَ',
          '3mp': 'يَتَكَاتَبُونَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حبب', 'يَتَحَابُّ'],
        ['مسس', 'يَتَمَاسُّ'],
        ['ضدد', 'يَتَضَادُّ'],
        ['ردد', 'يَتَرَادُّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 6), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['عون', 'يَتَعَاوَنُ'],
        ['نول', 'يَتَنَاوَلُ'],
        ['فوض', 'يَتَفَاوَضُ'],
        ['جوز', 'يَتَجَاوَزُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 6), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['مشي', 'يَتَمَاشَى'],
        ['هوي', 'يَتَهَاوَى'],
        ['ولي', 'يَتَوَالَى'],
        ['وصي', 'يَتَوَاصَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 6), 'indicative')['3ms']).toEqualT(expected)
      })

      test('تَمَاشَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('مشي', 6), 'indicative')).toEqualT({
          '1s': 'أَتَمَاشَى',
          '2ms': 'تَتَمَاشَى',
          '2fs': 'تَتَمَاشَيْنَ',
          '3ms': 'يَتَمَاشَى',
          '3fs': 'تَتَمَاشَى',
          '2d': 'تَتَمَاشَيَانِ',
          '3md': 'يَتَمَاشَيَانِ',
          '3fd': 'تَتَمَاشَيَانِ',
          '1p': 'نَتَمَاشَى',
          '2mp': 'تَتَمَاشَوْنَ',
          '2fp': 'تَتَمَاشَيْنَ',
          '3mp': 'يَتَمَاشَوْنَ',
          '3fp': 'يَتَمَاشَيْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وفق', 'يَتَوَافَقُ'],
        ['وجه', 'يَتَوَاجَهُ'],
        ['وفر', 'يَتَوَافَرُ'],
        ['وجد', 'يَتَوَاجَدُ'],
        ['وزن', 'يَتَوَازَنُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 6), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['ءلف', 'يَتَآلَفُ'],
        ['ءكل', 'يَتَآكَلُ'],
        ['ءمر', 'يَتَآمَرُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 6), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['بطء', 'يَتَبَاطَأُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 6), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated middle roots', () => {
      test('تَسَاءَلَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('سءل', 6), 'indicative')).toEqualT({
          '1s': 'أَتَسَاءَلُ',
          '2ms': 'تَتَسَاءَلُ',
          '2fs': 'تَتَسَاءَلِينَ',
          '3ms': 'يَتَسَاءَلُ',
          '3fs': 'تَتَسَاءَلُ',
          '2d': 'تَتَسَاءَلَانِ',
          '3md': 'يَتَسَاءَلَانِ',
          '3fd': 'تَتَسَاءَلَانِ',
          '1p': 'نَتَسَاءَلُ',
          '2mp': 'تَتَسَاءَلُونَ',
          '2fp': 'تَتَسَاءَلْنَ',
          '3mp': 'يَتَسَاءَلُونَ',
          '3fp': 'يَتَسَاءَلْنَ',
        })
      })
    })
  })

  describe('Form VII', () => {
    describe('regular roots', () => {
      test.each([
        ['خفض', 'يَنْخَفِضُ'],
        ['عكس', 'يَنْعَكِسُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 7), 'indicative')['3ms']).toEqualT(expected)
      })

      test('اِنْكَتَبَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('كتب', 7), 'indicative')).toEqualT({
          '1s': 'أَنْكَتِبُ',
          '2ms': 'تَنْكَتِبُ',
          '2fs': 'تَنْكَتِبِينَ',
          '3ms': 'يَنْكَتِبُ',
          '3fs': 'تَنْكَتِبُ',
          '2d': 'تَنْكَتِبَانِ',
          '3md': 'يَنْكَتِبَانِ',
          '3fd': 'تَنْكَتِبَانِ',
          '1p': 'نَنْكَتِبُ',
          '2mp': 'تَنْكَتِبُونَ',
          '2fp': 'تَنْكَتِبْنَ',
          '3mp': 'يَنْكَتِبُونَ',
          '3fp': 'يَنْكَتِبْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test('اِنْقَرَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قرء', 7), 'indicative')).toEqualT({
          '1s': 'أَنْقَرِئُ',
          '2ms': 'تَنْقَرِئُ',
          '2fs': 'تَنْقَرِئِينَ',
          '3ms': 'يَنْقَرِئُ',
          '3fs': 'تَنْقَرِئُ',
          '2d': 'تَنْقَرِئَانِ',
          '3md': 'يَنْقَرِئَانِ',
          '3fd': 'تَنْقَرِئَانِ',
          '1p': 'نَنْقَرِئُ',
          '2mp': 'تَنْقَرِئُونَ',
          '2fp': 'تَنْقَرِئْنَ',
          '3mp': 'يَنْقَرِئُونَ',
          '3fp': 'يَنْقَرِئْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['بثث', 'يَنْبَثُّ'],
        ['كفف', 'يَنْكَفُّ'],
        ['دسس', 'يَنْدَسُّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 7), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['قضي', 'يَنْقَضِي'],
        ['حني', 'يَنْحَنِي'],
        ['ثني', 'يَنْثَنِي'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 7), 'indicative')['3ms']).toEqualT(expected)
      })

      test('اِنْرَمَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('رمي', 7), 'indicative')).toEqualT({
          '1s': 'أَنْرَمِي',
          '2ms': 'تَنْرَمِي',
          '2fs': 'تَنْرَمِينَ',
          '3ms': 'يَنْرَمِي',
          '3fs': 'تَنْرَمِي',
          '2d': 'تَنْرَمِيَانِ',
          '3md': 'يَنْرَمِيَانِ',
          '3fd': 'تَنْرَمِيَانِ',
          '1p': 'نَنْرَمِي',
          '2mp': 'تَنْرَمِيونَ',
          '2fp': 'تَنْرَمِينَ',
          '3mp': 'يَنْرَمِيونَ',
          '3fp': 'يَنْرَمِينَ',
        })
      })
    })
  })

  describe('Form VIII', () => {
    describe('regular roots', () => {
      test.each([
        ['قرح', 'يَقْتَرِحُ'],
        ['عبر', 'يَعْتَبِرُ'],
        ['عمد', 'يَعْتَمِدُ'],
        ['زحم', 'يَزْدَحِمُ'],
        ['ظلم', 'يَظَّلِمُ'],
        ['ذكر', 'يَذَّكِرُ'],
        ['ضرب', 'يَضْطَرِبُ'],
        ['حلم', 'يَحْتَلِمُ'],
        ['سلم', 'يَسْتَلِمُ'],
        ['نظر', 'يَنْتَظِرُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 8), 'indicative')['3ms']).toEqualT(expected)
      })

      test('اِضْطَلَعَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ضلع', 8), 'indicative')).toEqualT({
          '1s': 'أَضْطَلِعُ',
          '2ms': 'تَضْطَلِعُ',
          '2fs': 'تَضْطَلِعِينَ',
          '3ms': 'يَضْطَلِعُ',
          '3fs': 'تَضْطَلِعُ',
          '2d': 'تَضْطَلِعَانِ',
          '3md': 'يَضْطَلِعَانِ',
          '3fd': 'تَضْطَلِعَانِ',
          '1p': 'نَضْطَلِعُ',
          '2mp': 'تَضْطَلِعُونَ',
          '2fp': 'تَضْطَلِعْنَ',
          '3mp': 'يَضْطَلِعُونَ',
          '3fp': 'يَضْطَلِعْنَ',
        })
      })
    })

    describe('hamzated middle roots', () => {
      test.each([
        ['كءب', 'يَكْتَئِبُ'],
        ['بءس', 'يَبْتَئِسُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 8), 'indicative')['3ms']).toEqualT(expected)
      })

      test('اِكْتَأَبَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('كءب', 8), 'indicative')).toEqualT({
          '1s': 'أَكْتَئِبُ',
          '2ms': 'تَكْتَئِبُ',
          '2fs': 'تَكْتَئِبِينَ',
          '3ms': 'يَكْتَئِبُ',
          '3fs': 'تَكْتَئِبُ',
          '2d': 'تَكْتَئِبَانِ',
          '3md': 'يَكْتَئِبَانِ',
          '3fd': 'تَكْتَئِبَانِ',
          '1p': 'نَكْتَئِبُ',
          '2mp': 'تَكْتَئِبُونَ',
          '2fp': 'تَكْتَئِبْنَ',
          '3mp': 'يَكْتَئِبُونَ',
          '3fp': 'يَكْتَئِبْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['حلل', 'يَحْتَلُّ'],
        ['مدد', 'يَمْتَدُّ'],
        ['حجج', 'يَحْتَجُّ'],
        ['ردد', 'يَرْتَدُّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 8), 'indicative')['3ms']).toEqualT(expected)
      })

      test('اِضْطَرَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ضرر', 8), 'indicative')).toEqualT({
          '1s': 'أَضْطَرُّ',
          '2ms': 'تَضْطَرُّ',
          '2fs': 'تَضْطَرِّينَ',
          '3ms': 'يَضْطَرُّ',
          '3fs': 'تَضْطَرُّ',
          '2d': 'تَضْطَرَّانِ',
          '3md': 'يَضْطَرَّانِ',
          '3fd': 'تَضْطَرَّانِ',
          '1p': 'نَضْطَرُّ',
          '2mp': 'تَضْطَرُّونَ',
          '2fp': 'تَضْطَرِرْنَ',
          '3mp': 'يَضْطَرُّونَ',
          '3fp': 'يَضْطَرِرْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وصل', 'يَتَّصِلُ'],
        ['وعد', 'يَتَّعِدُ'],
        ['وسخ', 'يَتَّسِخُ'],
        ['وحد', 'يَتَّحِدُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 8), 'indicative')['3ms']).toEqualT(expected)
      })

      test('اِتَّكَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وكء', 8), 'indicative')).toEqualT({
          '1s': 'أَتَّكِئُ',
          '2ms': 'تَتَّكِئُ',
          '2fs': 'تَتَّكِئِينَ',
          '3ms': 'يَتَّكِئُ',
          '3fs': 'تَتَّكِئُ',
          '2d': 'تَتَّكِئَانِ',
          '3md': 'يَتَّكِئَانِ',
          '3fd': 'تَتَّكِئَانِ',
          '1p': 'نَتَّكِئُ',
          '2mp': 'تَتَّكِئُونَ',
          '2fp': 'تَتَّكِئْنَ',
          '3mp': 'يَتَّكِئُونَ',
          '3fp': 'يَتَّكِئْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قود', 'يَقْتَادُ'],
        ['سوء', 'يَسْتَاءُ'],
        ['روح', 'يَرْتَاحُ'],
        ['شوق', 'يَشْتَاقُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 8), 'indicative')['3ms']).toEqualT(expected)
      })

      test('اِزْدَادَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('زيد', 8), 'indicative')).toEqualT({
          '1s': 'أَزْدَادُ',
          '2ms': 'تَزْدَادُ',
          '2fs': 'تَزْدَادِينَ',
          '3ms': 'يَزْدَادُ',
          '3fs': 'تَزْدَادُ',
          '2d': 'تَزْدَادَانِ',
          '3md': 'يَزْدَادَانِ',
          '3fd': 'تَزْدَادَانِ',
          '1p': 'نَزْدَادُ',
          '2mp': 'تَزْدَادُونَ',
          '2fp': 'تَزْدَدْنَ',
          '3mp': 'يَزْدَادُونَ',
          '3fp': 'يَزْدَدْنَ',
        })
      })

      test('اِزْدَوَجَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('زوج', 8), 'indicative')).toEqualT({
          '1s': 'أَزْدَوِجُ',
          '2ms': 'تَزْدَوِجُ',
          '2fs': 'تَزْدَوِجِينَ',
          '3ms': 'يَزْدَوِجُ',
          '3fs': 'تَزْدَوِجُ',
          '2d': 'تَزْدَوِجَانِ',
          '3md': 'يَزْدَوِجَانِ',
          '3fd': 'تَزْدَوِجَانِ',
          '1p': 'نَزْدَوِجُ',
          '2mp': 'تَزْدَوِجُونَ',
          '2fp': 'تَزْدَوِجْنَ',
          '3mp': 'يَزْدَوِجُونَ',
          '3fp': 'يَزْدَوِجْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['نوي', 'يَنْتَوِي'],
        ['سوي', 'يَسْتَوِي'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 8), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([['صفو', 'يَصْطَفِي']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 8), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['ءخذ', 'يَتَّخِذُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 8), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial geminate roots', () => {
      test('يَأْتَمُّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ءمم', 8), 'indicative')).toEqualT({
          '1s': 'آتَمُّ',
          '2ms': 'تَأْتَمُّ',
          '2fs': 'تَأْتَمِّينَ',
          '3ms': 'يَأْتَمُّ',
          '3fs': 'تَأْتَمُّ',
          '2d': 'تَأْتَمَّانِ',
          '3md': 'يَأْتَمَّانِ',
          '3fd': 'تَأْتَمَّانِ',
          '1p': 'نَأْتَمُّ',
          '2mp': 'تَأْتَمُّونَ',
          '2fp': 'تَأْتَمِمْنَ',
          '3mp': 'يَأْتَمُّونَ',
          '3fp': 'يَأْتَمِمْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([['خبء', 'يَخْتَبِئُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 8), 'indicative')['3ms']).toEqualT(expected)
      })

      test('اِبْتَدَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('بدء', 8), 'indicative')).toEqualT({
          '1s': 'أَبْتَدِئُ',
          '2ms': 'تَبْتَدِئُ',
          '2fs': 'تَبْتَدِئِينَ',
          '3ms': 'يَبْتَدِئُ',
          '3fs': 'تَبْتَدِئُ',
          '2d': 'تَبْتَدِئَانِ',
          '3md': 'يَبْتَدِئَانِ',
          '3fd': 'تَبْتَدِئَانِ',
          '1p': 'نَبْتَدِئُ',
          '2mp': 'تَبْتَدِئُونَ',
          '2fp': 'تَبْتَدِئْنَ',
          '3mp': 'يَبْتَدِئُونَ',
          '3fp': 'يَبْتَدِئْنَ',
        })
      })
    })
  })

  describe('Form IX', () => {
    describe('regular roots', () => {
      test('اِخْضَرَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('خضر', 9), 'indicative')).toEqualT({
          '1s': 'أَخْضَرُّ',
          '2ms': 'تَخْضَرُّ',
          '2fs': 'تَخْضَرِّينَ',
          '3ms': 'يَخْضَرُّ',
          '3fs': 'تَخْضَرُّ',
          '2d': 'تَخْضَرَّانِ',
          '3md': 'يَخْضَرَّانِ',
          '3fd': 'تَخْضَرَّانِ',
          '1p': 'نَخْضَرُّ',
          '2mp': 'تَخْضَرُّونَ',
          '2fp': 'تَخْضَرِرْنَ',
          '3mp': 'يَخْضَرُّونَ',
          '3fp': 'يَخْضَرِرْنَ',
        })
      })

      test.each([
        ['حمر', 'يَحْمَرُّ'],
        ['بيض', 'يَبْيَضُّ'],
        ['خضر', 'يَخْضَرُّ'],
        ['زرق', 'يَزْرَقُّ'],
        ['صفر', 'يَصْفَرُّ'],
        ['خضل', 'يَخْضَلُّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 9), 'indicative')['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form X', () => {
    describe('regular roots', () => {
      test.each([
        ['عرض', 'يَسْتَعْرِضُ'],
        ['غرق', 'يَسْتَغْرِقُ'],
        ['طرد', 'يَسْتَطْرِدُ'],
        ['عمل', 'يَسْتَعْمِلُ'],
        ['هدف', 'يَسْتَهْدِفُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 10), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وجب', 'يَسْتَوْجِبُ'],
        ['وعب', 'يَسْتَوْعِبُ'],
        ['ورد', 'يَسْتَوْرِدُ'],
        ['وضح', 'يَسْتَوْضِحُ'],
        ['وطن', 'يَسْتَوْطِنُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 10), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['شفف', 'يَسْتَشِفُّ'],
        ['مرر', 'يَسْتَمِرُّ'],
        ['حقق', 'يَسْتَحِقُّ'],
        ['غلل', 'يَسْتَغِلُّ'],
        ['حبب', 'يَسْتَحِبُّ'],
        ['مدد', 'يَسْتَمِدُّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 10), 'indicative')['3ms']).toEqualT(expected)
      })

      test('اِسْتَحَمَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('حمم', 10), 'indicative')).toEqualT({
          '1s': 'أَسْتَحِمُّ',
          '2ms': 'تَسْتَحِمُّ',
          '2fs': 'تَسْتَحِمِّينَ',
          '3ms': 'يَسْتَحِمُّ',
          '3fs': 'تَسْتَحِمُّ',
          '2d': 'تَسْتَحِمَّانِ',
          '3md': 'يَسْتَحِمَّانِ',
          '3fd': 'تَسْتَحِمَّانِ',
          '1p': 'نَسْتَحِمُّ',
          '2mp': 'تَسْتَحِمُّونَ',
          '2fp': 'تَسْتَحْمِمْنَ',
          '3mp': 'يَسْتَحِمُّونَ',
          '3fp': 'يَسْتَحْمِمْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['فيد', 'يَسْتَفِيدُ'],
        ['ضيف', 'يَسْتَضِيفُ'],
        ['عون', 'يَسْتَعِينُ'],
        ['قود', 'يَسْتَقِيدُ'],
        ['جوب', 'يَسْتَجِيبُ'],
        ['نوم', 'يَسْتَنِيمُ'],
        ['لوم', 'يَسْتَلِيمُ'],
        ['شور', 'يَسْتَشِيرُ'],
        ['حول', 'يَسْتَحِيلُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 10), 'indicative')['3ms']).toEqualT(expected)
      })

      test('اِسْتَجَابَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('جوب', 10), 'indicative')).toEqualT({
          '1s': 'أَسْتَجِيبُ',
          '2ms': 'تَسْتَجِيبُ',
          '2fs': 'تَسْتَجِيبِينَ',
          '3ms': 'يَسْتَجِيبُ',
          '3fs': 'تَسْتَجِيبُ',
          '2d': 'تَسْتَجِيبَانِ',
          '3md': 'يَسْتَجِيبَانِ',
          '3fd': 'تَسْتَجِيبَانِ',
          '1p': 'نَسْتَجِيبُ',
          '2mp': 'تَسْتَجِيبُونَ',
          '2fp': 'تَسْتَجِبْنَ',
          '3mp': 'يَسْتَجِيبُونَ',
          '3fp': 'يَسْتَجِبْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['ءني', 'يَسْتَأْنِي'],
        ['رعي', 'يَسْتَرْعِي'],
        ['ثني', 'يَسْتَثْنِي'],
        ['لقي', 'يَسْتَلْقِي'],
        ['عصي', 'يَسْتَعْصِي'],
        ['رخو', 'يَسْتَرْخِي'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 10), 'indicative')['3ms']).toEqualT(expected)
      })

      test('اِسْتَدْعَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('دعو', 10), 'indicative')).toEqualT({
          '1s': 'أَسْتَدْعِي',
          '2ms': 'تَسْتَدْعِي',
          '2fs': 'تَسْتَدْعِينَ',
          '3ms': 'يَسْتَدْعِي',
          '3fs': 'تَسْتَدْعِي',
          '2d': 'تَسْتَدْعِيَانِ',
          '3md': 'يَسْتَدْعِيَانِ',
          '3fd': 'تَسْتَدْعِيَانِ',
          '1p': 'نَسْتَدْعِي',
          '2mp': 'تَسْتَدْعُونَ',
          '2fp': 'تَسْتَدْعِينَ',
          '3mp': 'يَسْتَدْعُونَ',
          '3fp': 'يَسْتَدْعِينَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test('اِسْتَحْيَا conjugation', () => {
        expect(conjugatePresentMood(getVerb('حيي', 10), 'indicative')).toEqualT({
          '1s': 'أَسْتَحْيِي',
          '2ms': 'تَسْتَحْيِي',
          '2fs': 'تَسْتَحْيِينَ',
          '3ms': 'يَسْتَحْيِي',
          '3fs': 'تَسْتَحْيِي',
          '2d': 'تَسْتَحْيِيَانِ',
          '3md': 'يَسْتَحْيِيَانِ',
          '3fd': 'تَسْتَحْيِيَانِ',
          '1p': 'نَسْتَحْيِي',
          '2mp': 'تَسْتَحْيُونَ',
          '2fp': 'تَسْتَحْيِينَ',
          '3mp': 'يَسْتَحْيُونَ',
          '3fp': 'يَسْتَحْيِينَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['ءجر', 'يَسْتَأْجِرُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 10), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test('اِسْتَقْرَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قرء', 10), 'indicative')).toEqualT({
          '1s': 'أَسْتَقْرِئُ',
          '2ms': 'تَسْتَقْرِئُ',
          '2fs': 'تَسْتَقْرِئِينَ',
          '3ms': 'يَسْتَقْرِئُ',
          '3fs': 'تَسْتَقْرِئُ',
          '2d': 'تَسْتَقْرِئَانِ',
          '3md': 'يَسْتَقْرِئَانِ',
          '3fd': 'تَسْتَقْرِئَانِ',
          '1p': 'نَسْتَقْرِئُ',
          '2mp': 'تَسْتَقْرِئُونَ',
          '2fp': 'تَسْتَقْرِئْنَ',
          '3mp': 'يَسْتَقْرِئُونَ',
          '3fp': 'يَسْتَقْرِئْنَ',
        })
      })
    })

    describe('hamzated final hollow roots', () => {
      test('اِسْتَضَاءَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ضوء', 10), 'indicative')).toEqualT({
          '1s': 'أَسْتَضِيءُ',
          '2ms': 'تَسْتَضِيءُ',
          '2fs': 'تَسْتَضِيئِينَ',
          '3ms': 'يَسْتَضِيءُ',
          '3fs': 'تَسْتَضِيءُ',
          '2d': 'تَسْتَضِيئَانِ',
          '3md': 'يَسْتَضِيئَانِ',
          '3fd': 'تَسْتَضِيئَانِ',
          '1p': 'نَسْتَضِيءُ',
          '2mp': 'تَسْتَضِيئُونَ',
          '2fp': 'تَسْتَضِئْنَ',
          '3mp': 'يَسْتَضِيئُونَ',
          '3fp': 'يَسْتَضِئْنَ',
        })
      })
    })
  })
  describe('Form Iq', () => {
    describe('hollow roots', () => {
      test.each([
        ['سيطر', 'يُسَيْطِرُ'],
        ['كلور', 'يُكَلْوِرُ'],
        ['وسوس', 'يُوَسْوِسُ'],
        ['ترجم', 'يُتَرْجِمُ'],
        ['برهن', 'يُبَرْهِنُ'],
        ['عرقل', 'يُعَرْقِلُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('لَأْلَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('لءلء', 1), 'indicative')).toEqualT({
          '1s': 'أُلَأْلِئُ',
          '2ms': 'تُلَأْلِئُ',
          '2fs': 'تُلَأْلِئِينَ',
          '3ms': 'يُلَأْلِئُ',
          '3fs': 'تُلَأْلِئُ',
          '2d': 'تُلَأْلِئَانِ',
          '3md': 'يُلَأْلِئَانِ',
          '3fd': 'تُلَأْلِئَانِ',
          '1p': 'نُلَأْلِئُ',
          '2mp': 'تُلَأْلِئُونَ',
          '2fp': 'تُلَأْلِئْنَ',
          '3mp': 'يُلَأْلِئُونَ',
          '3fp': 'يُلَأْلِئْنَ',
        })
      })
    })
  })

  describe('Form IIq', () => {
    describe('regular roots', () => {
      test.each([
        ['مركز', 'يَتَمَرْكَزُ'],
        ['بلور', 'يَتَبَلْوَرُ'],
        ['ذبذب', 'يَتَذَبْذَبُ'],
        ['غلغل', 'يَتَغَلْغَلُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
      })

      test('تَعَرْقَلَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('عرقل', 2), 'indicative')).toEqualT({
          '1s': 'أَتَعَرْقَلُ',
          '2ms': 'تَتَعَرْقَلُ',
          '2fs': 'تَتَعَرْقَلِينَ',
          '3ms': 'يَتَعَرْقَلُ',
          '3fs': 'تَتَعَرْقَلُ',
          '2d': 'تَتَعَرْقَلَانِ',
          '3md': 'يَتَعَرْقَلَانِ',
          '3fd': 'تَتَعَرْقَلَانِ',
          '1p': 'نَتَعَرْقَلُ',
          '2mp': 'تَتَعَرْقَلُونَ',
          '2fp': 'تَتَعَرْقَلْنَ',
          '3mp': 'يَتَعَرْقَلُونَ',
          '3fp': 'يَتَعَرْقَلْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['ءلمن', 'يَتَأَلْمَنُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
      })

      test('تَأَمْرَكَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ءمرك', 2), 'indicative')).toEqualT({
          '1s': 'أَتَأَمْرَكُ',
          '2ms': 'تَتَأَمْرَكُ',
          '2fs': 'تَتَأَمْرَكِينَ',
          '3ms': 'يَتَأَمْرَكُ',
          '3fs': 'تَتَأَمْرَكُ',
          '2d': 'تَتَأَمْرَكَانِ',
          '3md': 'يَتَأَمْرَكَانِ',
          '3fd': 'تَتَأَمْرَكَانِ',
          '1p': 'نَتَأَمْرَكُ',
          '2mp': 'تَتَأَمْرَكُونَ',
          '2fp': 'تَتَأَمْرَكْنَ',
          '3mp': 'يَتَأَمْرَكُونَ',
          '3fp': 'يَتَأَمْرَكْنَ',
        })
      })
    })
  })

  describe('Form IIIq', () => {
    describe('regular roots', () => {
      test.each([
        ['حرجم', 'يَحْرَنْجِمُ'],
        ['حرشف', 'يَحْرَنْشِفُ'],
        ['حرفز', 'يَحْرَنْفِزُ'],
        ['خرطم', 'يَخْرَنْطِمُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })

      test('اِجْلَنْفَعَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('جلفع', 3), 'indicative')).toEqualT({
          '1s': 'أَجْلَنْفِعُ',
          '2ms': 'تَجْلَنْفِعُ',
          '2fs': 'تَجْلَنْفِعِينَ',
          '3ms': 'يَجْلَنْفِعُ',
          '3fs': 'تَجْلَنْفِعُ',
          '2d': 'تَجْلَنْفِعَانِ',
          '3md': 'يَجْلَنْفِعَانِ',
          '3fd': 'تَجْلَنْفِعَانِ',
          '1p': 'نَجْلَنْفِعُ',
          '2mp': 'تَجْلَنْفِعُونَ',
          '2fp': 'تَجْلَنْفِعْنَ',
          '3mp': 'يَجْلَنْفِعُونَ',
          '3fp': 'يَجْلَنْفِعْنَ',
        })
      })
    })
  })

  describe('Form IVq', () => {
    describe('regular roots', () => {
      test('اِقْشَعَرَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قشعر', 4), 'indicative')).toEqualT({
          '1s': 'أَقْشَعِرُّ',
          '2ms': 'تَقْشَعِرُّ',
          '2fs': 'تَقْشَعِرِّينَ',
          '3ms': 'يَقْشَعِرُّ',
          '3fs': 'تَقْشَعِرُّ',
          '2d': 'تَقْشَعِرَّانِ',
          '3md': 'يَقْشَعِرَّانِ',
          '3fd': 'تَقْشَعِرَّانِ',
          '1p': 'نَقْشَعِرُّ',
          '2mp': 'تَقْشَعِرُّونَ',
          '2fp': 'تَقْشَعْرِرْنَ',
          '3mp': 'يَقْشَعِرُّونَ',
          '3fp': 'يَقْشَعْرِرْنَ',
        })
      })

      test('يَشْمَئِزُّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('شمءز', 4), 'indicative')).toEqualT({
          '1s': 'أَشْمَئِزُّ',
          '2ms': 'تَشْمَئِزُّ',
          '2fs': 'تَشْمَئِزِّينَ',
          '3ms': 'يَشْمَئِزُّ',
          '3fs': 'تَشْمَئِزُّ',
          '2d': 'تَشْمَئِزَّانِ',
          '3md': 'يَشْمَئِزَّانِ',
          '3fd': 'تَشْمَئِزَّانِ',
          '1p': 'نَشْمَئِزُّ',
          '2mp': 'تَشْمَئِزُّونَ',
          '2fp': 'تَشْمَأْزِزْنَ',
          '3mp': 'يَشْمَئِزُّونَ',
          '3fp': 'يَشْمَأْزِزْنَ',
        })
      })

      test.each([['برغش', 'يَبْرَغِشُّ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
      })

      test.each([['جرمز', 'يَجْرَمِزُّ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
      })

      test.each([['جلعب', 'يَجْلَعِبُّ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
      })

      test.each([['جلعد', 'يَجْلَعِدُّ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
      })
    })
  })
})
