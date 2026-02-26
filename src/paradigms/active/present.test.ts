import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { conjugatePresentMood } from './present'

describe('active present indicative', () => {
  describe('Form I', () => {
    describe('regular roots', () => {
      test.each([
        ['بدل', 'يَبْدِلُ'],
        ['ترجم', 'يُتَرْجِمُ'],
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
        ['حدث', 'يَحْدُثُ'],
        ['خسر', 'يَخْسَرُ'],
        ['دحرج', 'يُدَحْرِجُ'],
        ['درس', 'يَدْرُسُ'],
        ['نظر', 'يَنْظُرُ'],
        ['قتل', 'يَقْتُلُ'],
        ['قفز', 'يَقْفِزُ'],
        ['كسر', 'يَكْسِرُ'],
        ['هجر', 'يَهْجُرُ'],
        ['صغر', 'يَصْغُرُ'],
        ['دخل', 'يَدْخُلُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('كَتَبَ', () => {
        expect(conjugatePresentMood(getVerb('كتب', 1), 'indicative')).toEqualT({
          '1s': 'أَكْتُبُ',
          '2ms': 'تَكْتُبُ',
          '2fs': 'تَكْتُبِيْنَ',
          '3ms': 'يَكْتُبُ',
          '3fs': 'تَكْتُبُ',
          '2d': 'تَكْتُبَانِ',
          '3md': 'يَكْتُبَانِ',
          '3fd': 'تَكْتُبَانِ',
          '1p': 'نَكْتُبُ',
          '2mp': 'تَكْتُبُوْنَ',
          '2fp': 'تَكْتُبْنَ',
          '3mp': 'يَكْتُبُوْنَ',
          '3fp': 'يَكْتُبْنَ',
        })
      })

      test('نَظَرَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('نظر', 1), 'indicative')).toEqualT({
          '1s': 'أَنْظُرُ',
          '2ms': 'تَنْظُرُ',
          '2fs': 'تَنْظُرِيْنَ',
          '3ms': 'يَنْظُرُ',
          '3fs': 'تَنْظُرُ',
          '2d': 'تَنْظُرَانِ',
          '3md': 'يَنْظُرَانِ',
          '3fd': 'تَنْظُرَانِ',
          '1p': 'نَنْظُرُ',
          '2mp': 'تَنْظُرُوْنَ',
          '2fp': 'تَنْظُرْنَ',
          '3mp': 'يَنْظُرُوْنَ',
          '3fp': 'يَنْظُرْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['تمم', 'يَتِمُّ'],
        ['حبب', 'يَحِبُّ'],
        ['ظلل', 'يَظَلُّ'],
        ['هلل', 'يَهُلُّ'],
        ['عنن', 'يَعِنُّ'],
        ['جبب', 'يَجُبُّ'],
        ['قرر', 'يَقَرُّ'],
        ['لمم', 'يَلُمُّ'],
        ['ودد', 'يَوَدُّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('حَبَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('حبب', 1), 'indicative')).toEqualT({
          '1s': 'أَحِبُّ',
          '2ms': 'تَحِبُّ',
          '2fs': 'تَحِبِّيْنَ',
          '3ms': 'يَحِبُّ',
          '3fs': 'تَحِبُّ',
          '2d': 'تَحِبَّانِ',
          '3md': 'يَحِبَّانِ',
          '3fd': 'تَحِبَّانِ',
          '1p': 'نَحِبُّ',
          '2mp': 'تَحِبُّوْنَ',
          '2fp': 'تَحْبِبْنَ',
          '3mp': 'يَحِبُّوْنَ',
          '3fp': 'يَحْبِبْنَ',
        })
      })

      test('قَرَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قرر', 1), 'indicative')).toEqualT({
          '1s': 'أَقَرُّ',
          '2ms': 'تَقَرُّ',
          '2fs': 'تَقَرِّيْنَ',
          '3ms': 'يَقَرُّ',
          '3fs': 'تَقَرُّ',
          '2d': 'تَقَرَّانِ',
          '3md': 'يَقَرَّانِ',
          '3fd': 'تَقَرَّانِ',
          '1p': 'نَقَرُّ',
          '2mp': 'تَقَرُّوْنَ',
          '2fp': 'تَقْرَرْنَ',
          '3mp': 'يَقَرُّوْنَ',
          '3fp': 'يَقْرَرْنَ',
        })
      })

      test('ظَلَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ظلل', 1), 'indicative')).toEqualT({
          '1s': 'أَظَلُّ',
          '2ms': 'تَظَلُّ',
          '2fs': 'تَظَلِّيْنَ',
          '3ms': 'يَظَلُّ',
          '3fs': 'تَظَلُّ',
          '2d': 'تَظَلَّانِ',
          '3md': 'يَظَلَّانِ',
          '3fd': 'تَظَلَّانِ',
          '1p': 'نَظَلُّ',
          '2mp': 'تَظَلُّوْنَ',
          '2fp': 'تَظْلَلْنَ',
          '3mp': 'يَظَلُّوْنَ',
          '3fp': 'يَظْلَلْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وعد', 'يَعِدُ'],
        ['وضع', 'يَضَعُ'],
        ['وثق', 'يَثُقُ'],
        ['وجز', 'يَجُزُ'],
        ['وطن', 'يَطِنُ'],
        ['وجب', 'يَجِبُ'],
        ['وصف', 'يَصِفُ'],
        ['وفد', 'يَفِدُ'],
        ['وهن', 'يَهُنُ'],
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
          '2fs': 'تَقِفِيْنَ',
          '3ms': 'يَقِفُ',
          '3fs': 'تَقِفُ',
          '2d': 'تَقِفَانِ',
          '3md': 'يَقِفَانِ',
          '3fd': 'تَقِفَانِ',
          '1p': 'نَقِفُ',
          '2mp': 'تَقِفُوْنَ',
          '2fp': 'تَقِفْنَ',
          '3mp': 'يَقِفُوْنَ',
          '3fp': 'يَقِفْنَ',
        })
      })

      test('وَعَدَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وعد', 1), 'indicative')).toEqualT({
          '1s': 'أَعِدُ',
          '2ms': 'تَعِدُ',
          '2fs': 'تَعِدِيْنَ',
          '3ms': 'يَعِدُ',
          '3fs': 'تَعِدُ',
          '2d': 'تَعِدَانِ',
          '3md': 'يَعِدَانِ',
          '3fd': 'تَعِدَانِ',
          '1p': 'نَعِدُ',
          '2mp': 'تَعِدُوْنَ',
          '2fp': 'تَعِدْنَ',
          '3mp': 'يَعِدُوْنَ',
          '3fp': 'يَعِدْنَ',
        })
      })

      test('وَهُنَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وهن', 1), 'indicative')).toEqualT({
          '1s': 'أَهُنُ',
          '2ms': 'تَهُنُ',
          '2fs': 'تَهُنِيْنَ',
          '3ms': 'يَهُنُ',
          '3fs': 'تَهُنُ',
          '2d': 'تَهُنَانِ',
          '3md': 'يَهُنَانِ',
          '3fd': 'تَهُنَانِ',
          '1p': 'نَهُنُ',
          '2mp': 'تَهُنُوْنَ',
          '2fp': 'تَهُنَّ',
          '3mp': 'يَهُنُوْنَ',
          '3fp': 'يَهُنَّ',
        })
      })

      test('وَضَعَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وضع', 1), 'indicative')).toEqualT({
          '1s': 'أَضَعُ',
          '2ms': 'تَضَعُ',
          '2fs': 'تَضَعِيْنَ',
          '3ms': 'يَضَعُ',
          '3fs': 'تَضَعُ',
          '2d': 'تَضَعَانِ',
          '3md': 'يَضَعَانِ',
          '3fd': 'تَضَعَانِ',
          '1p': 'نَضَعُ',
          '2mp': 'تَضَعُوْنَ',
          '2fp': 'تَضَعْنَ',
          '3mp': 'يَضَعُوْنَ',
          '3fp': 'يَضَعْنَ',
        })
      })

      test('يَمَنَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('يمن', 1), 'indicative')).toEqualT({
          '1s': 'أَيْمَنُ',
          '2ms': 'تَيْمَنُ',
          '2fs': 'تَيْمَنِيْنَ',
          '3ms': 'يَيْمَنُ',
          '3fs': 'تَيْمَنُ',
          '2d': 'تَيْمَنَانِ',
          '3md': 'يَيْمَنَانِ',
          '3fd': 'تَيْمَنَانِ',
          '1p': 'نَيْمَنُ',
          '2mp': 'تَيْمَنُوْنَ',
          '2fp': 'تَيْمَنَّ',
          '3mp': 'يَيْمَنُوْنَ',
          '3fp': 'يَيْمَنَّ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['باع', 'يَبِيعُ'],
        ['زور', 'يَزُورُ'],
        ['لوم', 'يَلُومُ'],
        ['موت', 'يَمُوتُ'],
        ['بيت', 'يَبِيتُ'],
        ['خور', 'يَخْوَرُ'],
        ['حول', 'يَحُولُ'],
        ['عوم', 'يَعُومُ'],
        ['قول', 'يَقُولُ'],
        ['عوز', 'يَعْوَزُ'],
        ['ميل', 'يَمْيَلُ'],
        ['صير', 'يَصِيرُ'],
        ['جيد', 'يَجْيَدُ'],
        ['خوف', 'يَخَافُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('كَانَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('كان', 1), 'indicative')).toEqualT({
          '1s': 'أَكُونُ',
          '2ms': 'تَكُونُ',
          '2fs': 'تَكُونِيْنَ',
          '3ms': 'يَكُونُ',
          '3fs': 'تَكُونُ',
          '2d': 'تَكُونَانِ',
          '3md': 'يَكُونَانِ',
          '3fd': 'تَكُونَانِ',
          '1p': 'نَكُونُ',
          '2mp': 'تَكُونُوْنَ',
          '2fp': 'تَكُنَّ',
          '3mp': 'يَكُونُوْنَ',
          '3fp': 'يَكُنَّ',
        })
      })

      test('شَادَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('شيد', 1), 'indicative')).toEqualT({
          '1s': 'أَشِيدُ',
          '2ms': 'تَشِيدُ',
          '2fs': 'تَشِيدِيْنَ',
          '3ms': 'يَشِيدُ',
          '3fs': 'تَشِيدُ',
          '2d': 'تَشِيدَانِ',
          '3md': 'يَشِيدَانِ',
          '3fd': 'تَشِيدَانِ',
          '1p': 'نَشِيدُ',
          '2mp': 'تَشِيدُوْنَ',
          '2fp': 'تَشِدْنَ',
          '3mp': 'يَشِيدُوْنَ',
          '3fp': 'يَشِدْنَ',
        })
      })

      test('جَيِدَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('جيد', 1), 'indicative')).toEqualT({
          '1s': 'أَجْيَدُ',
          '2ms': 'تَجْيَدُ',
          '2fs': 'تَجْيَدِيْنَ',
          '3ms': 'يَجْيَدُ',
          '3fs': 'تَجْيَدُ',
          '2d': 'تَجْيَدَانِ',
          '3md': 'يَجْيَدَانِ',
          '3fd': 'تَجْيَدَانِ',
          '1p': 'نَجْيَدُ',
          '2mp': 'تَجْيَدُوْنَ',
          '2fp': 'تَجْيَدْنَ',
          '3mp': 'يَجْيَدُوْنَ',
          '3fp': 'يَجْيَدْنَ',
        })
      })

      test('قَالَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قول', 1), 'indicative')).toEqualT({
          '1s': 'أَقُولُ',
          '2ms': 'تَقُولُ',
          '2fs': 'تَقُولِيْنَ',
          '3ms': 'يَقُولُ',
          '3fs': 'تَقُولُ',
          '2d': 'تَقُولَانِ',
          '3md': 'يَقُولَانِ',
          '3fd': 'تَقُولَانِ',
          '1p': 'نَقُولُ',
          '2mp': 'تَقُولُوْنَ',
          '2fp': 'تَقُلْنَ',
          '3mp': 'يَقُولُوْنَ',
          '3fp': 'يَقُلْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test('اِنْقَادَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قود', 7), 'indicative')).toEqualT({
          '1s': 'أَنْقَادُ',
          '2ms': 'تَنْقَادُ',
          '2fs': 'تَنْقَادِيْنَ',
          '3ms': 'يَنْقَادُ',
          '3fs': 'تَنْقَادُ',
          '2d': 'تَنْقَادَانِ',
          '3md': 'يَنْقَادَانِ',
          '3fd': 'تَنْقَادَانِ',
          '1p': 'نَنْقَادُ',
          '2mp': 'تَنْقَادُوْنَ',
          '2fp': 'تَنْقَدْنَ',
          '3mp': 'يَنْقَادُوْنَ',
          '3fp': 'يَنْقَدْنَ',
        })
      })

      test('اِنْهَالَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('هيل', 7), 'indicative')).toEqualT({
          '1s': 'أَنْهَالُ',
          '2ms': 'تَنْهَالُ',
          '2fs': 'تَنْهَالِيْنَ',
          '3ms': 'يَنْهَالُ',
          '3fs': 'تَنْهَالُ',
          '2d': 'تَنْهَالَانِ',
          '3md': 'يَنْهَالَانِ',
          '3fd': 'تَنْهَالَانِ',
          '1p': 'نَنْهَالُ',
          '2mp': 'تَنْهَالُوْنَ',
          '2fp': 'تَنْهَلْنَ',
          '3mp': 'يَنْهَالُوْنَ',
          '3fp': 'يَنْهَلْنَ',
        })
      })

      test('اِنْحَازَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('حوز', 7), 'indicative')).toEqualT({
          '1s': 'أَنْحَازُ',
          '2ms': 'تَنْحَازُ',
          '2fs': 'تَنْحَازِيْنَ',
          '3ms': 'يَنْحَازُ',
          '3fs': 'تَنْحَازُ',
          '2d': 'تَنْحَازَانِ',
          '3md': 'يَنْحَازَانِ',
          '3fd': 'تَنْحَازَانِ',
          '1p': 'نَنْحَازُ',
          '2mp': 'تَنْحَازُوْنَ',
          '2fp': 'تَنْحَزْنَ',
          '3mp': 'يَنْحَازُوْنَ',
          '3fp': 'يَنْحَزْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['دعا', 'يَدْعُو'],
        ['بكي', 'يَبْكِي'],
        ['بدو', 'يَبْدُو'],
        ['علي', 'يَعْلِي'],
        ['جدو', 'يَجْدُو'],
        ['لهو', 'يَلْهُو'],
        ['شفي', 'يَشْفِي'],
        ['غدو', 'يَغْدُو'],
        ['غشي', 'يَغْشِي'],
        ['جري', 'يَجْرِي'],
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
          '2mp': 'تَرْمُوْنَ',
          '2fp': 'تَرْمِيْنَ',
          '3mp': 'يَرْمُوْنَ',
          '3fp': 'يَرْمِيْنَ',
        })
      })

      // Verified against Wiktionary's conjugation table for بَقِيَ (Form I, final-weak i~a).
      test('بَقِيَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('بقي', 1), 'indicative')).toEqualT({
          '1s': 'أَبْقَى',
          '2ms': 'تَبْقَى',
          '2fs': 'تَبْقَيْنَ',
          '3ms': 'يَبْقَى',
          '3fs': 'تَبْقَى',
          '2d': 'تَبْقَيَانِ',
          '3md': 'يَبْقَيَانِ',
          '3fd': 'تَبْقَيَانِ',
          '1p': 'نَبْقَى',
          '2mp': 'تَبْقَوْنَ',
          '2fp': 'تَبْقَيْنَ',
          '3mp': 'يَبْقَوْنَ',
          '3fp': 'يَبْقَيْنَ',
        })
      })

      test('دَعَا conjugation', () => {
        expect(conjugatePresentMood(getVerb('دعا', 1), 'indicative')).toEqualT({
          '1s': 'أَدْعُو',
          '2ms': 'تَدْعُو',
          '2fs': 'تَدْعِيْنَ',
          '3ms': 'يَدْعُو',
          '3fs': 'تَدْعُو',
          '2d': 'تَدْعُوَانِ',
          '3md': 'يَدْعُوَانِ',
          '3fd': 'تَدْعُوَانِ',
          '1p': 'نَدْعُو',
          '2mp': 'تَدْعُوْنَ',
          '2fp': 'تَدْعُوْنَ',
          '3mp': 'يَدْعُوْنَ',
          '3fp': 'يَدْعُوْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وقي', 'يَقِي'],
        ['وني', 'يَنِي'],
        ['ولي', 'يَلِي'],
        ['وعي', 'يَعِي'],
        ['وفي', 'يَفِي'],
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

      test('وَفَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('وفي', 1), 'indicative')).toEqualT({
          '1s': 'أَفِي',
          '2ms': 'تَفِي',
          '2fs': 'تَفِيْنَ',
          '3ms': 'يَفِي',
          '3fs': 'تَفِي',
          '2d': 'تَفَانِ',
          '3md': 'يَفَانِ',
          '3fd': 'تَفَانِ',
          '1p': 'نَفِي',
          '2mp': 'تَفوْنَ',
          '2fp': 'تَفِيْنَ',
          '3mp': 'يَفوْنَ',
          '3fp': 'يَفِيْنَ',
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
          '2mp': 'تَرْوُوْنَ',
          '2fp': 'تَرْوِيْنَ',
          '3mp': 'يَرْوُوْنَ',
          '3fp': 'يَرْوِيْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أذن', 'يَأْذَنُ'],
        ['أسر', 'يَأْسِرُ'],
        ['أخذ', 'يَأْخُذُ'],
        ['أمر', 'يَأْمُرُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([
        ['أدد', 'يَئِدُّ'],
        ['أجج', 'يَؤُجُّ'],
        ['أزز', 'يَؤُزُّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('أَمَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('أمم', 1), 'indicative')).toEqualT({
          '1s': 'أَؤُمُّ',
          '2ms': 'تَؤُمُّ',
          '2fs': 'تَؤُمِّيْنَ',
          '3ms': 'يَؤُمُّ',
          '3fs': 'تَؤُمُّ',
          '2d': 'تَؤُمَّانِ',
          '3md': 'يَؤُمَّانِ',
          '3fd': 'تَؤُمَّانِ',
          '1p': 'نَؤُمُّ',
          '2mp': 'تَؤُمُّوْنَ',
          '2fp': 'تَأْمُمْنَ',
          '3mp': 'يَؤُمُّوْنَ',
          '3fp': 'يَأْمُمْنَ',
        })
      })
    })

    describe('hamzated middle roots', () => {
      test.each([
        ['يئس', 'يَيْئَسُ'],
        ['بءس', 'يَبْؤُسُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('سَأَلَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('سأل', 1), 'indicative')).toEqualT({
          '1s': 'أَسْأَلُ',
          '2ms': 'تَسْأَلُ',
          '2fs': 'تَسْأَلِيْنَ',
          '3ms': 'يَسْأَلُ',
          '3fs': 'تَسْأَلُ',
          '2d': 'تَسْأَلَانِ',
          '3md': 'يَسْأَلَانِ',
          '3fd': 'تَسْأَلَانِ',
          '1p': 'نَسْأَلُ',
          '2mp': 'تَسْأَلُوْنَ',
          '2fp': 'تَسْأَلْنَ',
          '3mp': 'يَسْأَلُوْنَ',
          '3fp': 'يَسْأَلْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['بدأ', 'يَبْدَأُ'],
        ['وطء', 'يَطَأُ'],
        ['جرء', 'يَجْرُؤُ'],
        ['كلأ', 'يَكْلُؤُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('بَدَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('بدأ', 1), 'indicative')).toEqualT({
          '1s': 'أَبْدَأُ',
          '2ms': 'تَبْدَأُ',
          '2fs': 'تَبْدَئِيْنَ',
          '3ms': 'يَبْدَأُ',
          '3fs': 'تَبْدَأُ',
          '2d': 'تَبْدَآنِ',
          '3md': 'يَبْدَآنِ',
          '3fd': 'تَبْدَآنِ',
          '1p': 'نَبْدَأُ',
          '2mp': 'تَبْدَأُوْنَ',
          '2fp': 'تَبْدَأْنَ',
          '3mp': 'يَبْدَأُوْنَ',
          '3fp': 'يَبْدَأْنَ',
        })
      })

      test('قَرَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قرأ', 1), 'indicative')).toEqualT({
          '1s': 'أَقْرَأُ',
          '2ms': 'تَقْرَأُ',
          '2fs': 'تَقْرَئِيْنَ',
          '3ms': 'يَقْرَأُ',
          '3fs': 'تَقْرَأُ',
          '2d': 'تَقْرَآنِ',
          '3md': 'يَقْرَآنِ',
          '3fd': 'تَقْرَآنِ',
          '1p': 'نَقْرَأُ',
          '2mp': 'تَقْرَأُوْنَ',
          '2fp': 'تَقْرَأْنَ',
          '3mp': 'يَقْرَأُوْنَ',
          '3fp': 'يَقْرَأْنَ',
        })
      })

      test('وَطِئَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وطء', 1), 'indicative')).toEqualT({
          '1s': 'أَطَأُ',
          '2ms': 'تَطَأُ',
          '2fs': 'تَطَئِيْنَ',
          '3ms': 'يَطَأُ',
          '3fs': 'تَطَأُ',
          '2d': 'تَطَآنِ',
          '3md': 'يَطَآنِ',
          '3fd': 'تَطَآنِ',
          '1p': 'نَطَأُ',
          '2mp': 'تَطَأُوْنَ',
          '2fp': 'تَطَأْنَ',
          '3mp': 'يَطَأُوْنَ',
          '3fp': 'يَطَأْنَ',
        })
      })

      test('كَلَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('كلأ', 1), 'indicative')).toEqualT({
          '1s': 'أَكْلُؤُ',
          '2ms': 'تَكْلُؤُ',
          '2fs': 'تَكْلُئِيْنَ',
          '3ms': 'يَكْلُؤُ',
          '3fs': 'تَكْلُؤُ',
          '2d': 'تَكْلُؤَانِ',
          '3md': 'يَكْلُؤَانِ',
          '3fd': 'تَكْلُؤَانِ',
          '1p': 'نَكْلُؤُ',
          '2mp': 'تَكْلُؤُوْنَ',
          '2fp': 'تَكْلُؤْنَ',
          '3mp': 'يَكْلُؤُوْنَ',
          '3fp': 'يَكْلُؤْنَ',
        })
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([
        ['بوء', 'يَبُوءُ'],
        ['نوء', 'يَنُوءُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('جَاءَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('جيء', 1), 'indicative')).toEqualT({
          '1s': 'أَجِيءُ',
          '2ms': 'تَجِيءُ',
          '2fs': 'تَجِيئِيْنَ',
          '3ms': 'يَجِيءُ',
          '3fs': 'تَجِيءُ',
          '2d': 'تَجِيئَانِ',
          '3md': 'يَجِيئَانِ',
          '3fd': 'تَجِيئَانِ',
          '1p': 'نَجِيءُ',
          '2mp': 'تَجِيئُوْنَ',
          '2fp': 'تَجِئْنَ',
          '3mp': 'يَجِيئُوْنَ',
          '3fp': 'يَجِئْنَ',
        })
      })
    })

    describe('hamzated initial hollow roots', () => {
      test.each([['أول', 'يَؤُولُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('يَؤُولُ conjugation', () => {
        expect(conjugatePresentMood(getVerb('أول', 1), 'indicative')).toEqualT({
          '1s': 'أَؤُولُ',
          '2ms': 'تَؤُولُ',
          '2fs': 'تَؤُولِيْنَ',
          '3ms': 'يَؤُولُ',
          '3fs': 'تَؤُولُ',
          '2d': 'تَؤُولَانِ',
          '3md': 'يَؤُولَانِ',
          '3fd': 'تَؤُولَانِ',
          '1p': 'نَؤُولُ',
          '2mp': 'تَؤُولُوْنَ',
          '2fp': 'تَؤُلْنَ',
          '3mp': 'يَؤُولُوْنَ',
          '3fp': 'يَؤُلْنَ',
        })
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([
        ['أتي', 'يَأْتِي'],
        ['أني', 'يَأْنِي'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('أَبَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('أبي', 1), 'indicative')).toEqualT({
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
        expect(conjugatePresentMood(getVerb('أتي', 1), 'indicative')).toEqualT({
          '1s': 'آتِي',
          '2ms': 'تَأْتِي',
          '2fs': 'تَأْتِينَ',
          '3ms': 'يَأْتِي',
          '3fs': 'تَأْتِي',
          '2d': 'تَأْتِيَانِ',
          '3md': 'يَأْتِيَانِ',
          '3fd': 'تَأْتِيَانِ',
          '1p': 'نَأْتِي',
          '2mp': 'تَأْتُوْنَ',
          '2fp': 'تَأْتِيْنَ',
          '3mp': 'يَأْتُوْنَ',
          '3fp': 'يَأْتِيْنَ',
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

    describe('hamzated final assimilated roots', () => {
      test('وَأَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('وءي', 1), 'indicative')).toEqualT({
          '1s': 'أَئِي',
          '2ms': 'تَئِي',
          '2fs': 'تَئِينَ',
          '3ms': 'يَئِي',
          '3fs': 'تَئِي',
          '2d': 'تَئِيَانِ',
          '3md': 'يَئِيَانِ',
          '3fd': 'تَئِيَانِ',
          '1p': 'نَئِي',
          '2mp': 'تَأُوْنَ',
          '2fp': 'تَئِيْنَ',
          '3mp': 'يَأُوْنَ',
          '3fp': 'يَئِيْنَ',
        })
      })
    })

    describe('hamzated hollow-defective roots', () => {
      test.each([['أوي', 'يَأْوِي']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 1), 'indicative')['3ms']).toEqualT(expected)
      })

      test('أَوَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('أوي', 1), 'indicative')).toEqualT({
          '1s': 'آوِي',
          '2ms': 'تَأْوِي',
          '2fs': 'تَأْوِينَ',
          '3ms': 'يَأْوِي',
          '3fs': 'تَأْوِي',
          '2d': 'تَأْوِيَانِ',
          '3md': 'يَأْوِيَانِ',
          '3fd': 'تَأْوِيَانِ',
          '1p': 'نَأْوِي',
          '2mp': 'تَأْوُوْنَ',
          '2fp': 'تَأْوِيْنَ',
          '3mp': 'يَأْوُوْنَ',
          '3fp': 'يَأْوِيْنَ',
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
          '2fs': 'تُكَتِّبِيْنَ',
          '3ms': 'يُكَتِّبُ',
          '3fs': 'تُكَتِّبُ',
          '2d': 'تُكَتِّبَانِ',
          '3md': 'يُكَتِّبَانِ',
          '3fd': 'تُكَتِّبَانِ',
          '1p': 'نُكَتِّبُ',
          '2mp': 'تُكَتِّبُوْنَ',
          '2fp': 'تُكَتِّبْنَ',
          '3mp': 'يُكَتِّبُوْنَ',
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
          '2fs': 'تُوَسِّطِيْنَ',
          '3ms': 'يُوَسِّطُ',
          '3fs': 'تُوَسِّطُ',
          '2d': 'تُوَسِّطَانِ',
          '3md': 'يُوَسِّطَانِ',
          '3fd': 'تُوَسِّطَانِ',
          '1p': 'نُوَسِّطُ',
          '2mp': 'تُوَسِّطُوْنَ',
          '2fp': 'تُوَسِّطْنَ',
          '3mp': 'يُوَسِّطُوْنَ',
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
        ['كيف', 'يُكَيِّفُ'],
        ['أول', 'يُؤَوِّلُ'],
        ['أوب', 'يُؤَوِّبُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
      })

      test('قَوَّلَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قول', 2), 'indicative')).toEqualT({
          '1s': 'أُقَوِّلُ',
          '2ms': 'تُقَوِّلُ',
          '2fs': 'تُقَوِّلِيْنَ',
          '3ms': 'يُقَوِّلُ',
          '3fs': 'تُقَوِّلُ',
          '2d': 'تُقَوِّلَانِ',
          '3md': 'يُقَوِّلَانِ',
          '3fd': 'تُقَوِّلَانِ',
          '1p': 'نُقَوِّلُ',
          '2mp': 'تُقَوِّلُوْنَ',
          '2fp': 'تُقَوِّلْنَ',
          '3mp': 'يُقَوِّلُوْنَ',
          '3fp': 'يُقَوِّلْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['أذي', 'يُؤَذِّي'],
        ['أسي', 'يُؤَسِّي'],
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
          '2mp': 'تُرَمُّوْنَ',
          '2fp': 'تُرَمِّيْنَ',
          '3mp': 'يُرَمُّوْنَ',
          '3fp': 'يُرَمِّيْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['يود', 'يُيَوِّدُ'],
        ['وفي', 'يُوَفِّي'],
        ['وصي', 'يُوَصِّي'],
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

      test('وَفَّى conjugation', () => {
        expect(conjugatePresentMood(getVerb('وفي', 2), 'indicative')).toEqualT({
          '1s': 'أُوَفِّي',
          '2ms': 'تُوَفِّي',
          '2fs': 'تُوَفِّينَ',
          '3ms': 'يُوَفِّي',
          '3fs': 'تُوَفِّي',
          '2d': 'تُوَفِّيَانِ',
          '3md': 'يُوَفِّيَانِ',
          '3fd': 'تُوَفِّيَانِ',
          '1p': 'نُوَفِّي',
          '2mp': 'تُوَفُّوْنَ',
          '2fp': 'تُوَفِّيْنَ',
          '3mp': 'يُوَفُّوْنَ',
          '3fp': 'يُوَفِّيْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أكد', 'يُؤَكِّدُ'],
        ['أثر', 'يُؤَثِّرُ'],
        ['أجج', 'يُؤَجِّجُ'],
        ['أسس', 'يُؤَسِّسُ'],
        ['أخر', 'يُؤَخِّرُ'],
        ['أمر', 'يُؤَمِّرُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial hollow roots', () => {
      test.each([['أود', 'يُؤَوِّدُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
      })

      test('أَيَّدَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('أيد', 2), 'indicative')).toEqualT({
          '1s': 'أُؤَيِّدُ',
          '2ms': 'تُؤَيِّدُ',
          '2fs': 'تُؤَيِّدِيْنَ',
          '3ms': 'يُؤَيِّدُ',
          '3fs': 'تُؤَيِّدُ',
          '2d': 'تُؤَيِّدَانِ',
          '3md': 'يُؤَيِّدَانِ',
          '3fd': 'تُؤَيِّدَانِ',
          '1p': 'نُؤَيِّدُ',
          '2mp': 'تُؤَيِّدُوْنَ',
          '2fp': 'تُؤَيِّدْنَ',
          '3mp': 'يُؤَيِّدُوْنَ',
          '3fp': 'يُؤَيِّدْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([['هنأ', 'يُهَنِّئُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 2), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final assimilated roots', () => {
      test('يُوَطِّئُ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وطء', 2), 'indicative')).toEqualT({
          '1s': 'أُوَطِّئُ',
          '2ms': 'تُوَطِّئُ',
          '2fs': 'تُوَطِّئِيْنَ',
          '3ms': 'يُوَطِّئُ',
          '3fs': 'تُوَطِّئُ',
          '2d': 'تُوَطِّئَانِ',
          '3md': 'يُوَطِّئَانِ',
          '3fd': 'تُوَطِّئَانِ',
          '1p': 'نُوَطِّئُ',
          '2mp': 'تُوَطِّئُوْنَ',
          '2fp': 'تُوَطِّئْنَ',
          '3mp': 'يُوَطِّئُوْنَ',
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
          '2fs': 'تُكَاتِبِيْنَ',
          '3ms': 'يُكَاتِبُ',
          '3fs': 'تُكَاتِبُ',
          '2d': 'تُكَاتِبَانِ',
          '3md': 'يُكَاتِبَانِ',
          '3fd': 'تُكَاتِبَانِ',
          '1p': 'نُكَاتِبُ',
          '2mp': 'تُكَاتِبُوْنَ',
          '2fp': 'تُكَاتِبْنَ',
          '3fp': 'يُكَاتِبْنَ',
          '3mp': 'يُكَاتِبُوْنَ',
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
          '2mp': 'تُسَارُّوْنَ',
          '2fp': 'تُسَارِرْنَ',
          '3mp': 'يُسَارُّوْنَ',
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
          '2mp': 'تُرَادُّوْنَ',
          '2fp': 'تُرَادِدْنَ',
          '3mp': 'يُرَادُّوْنَ',
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
          '2mp': 'تُمَادُّوْنَ',
          '2fp': 'تُمَادِدْنَ',
          '3mp': 'يُمَادُّوْنَ',
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
          '2fs': 'تُقَاوِلِيْنَ',
          '3ms': 'يُقَاوِلُ',
          '3fs': 'تُقَاوِلُ',
          '2d': 'تُقَاوِلَانِ',
          '3md': 'يُقَاوِلَانِ',
          '3fd': 'تُقَاوِلَانِ',
          '1p': 'نُقَاوِلُ',
          '2mp': 'تُقَاوِلُوْنَ',
          '2fp': 'تُقَاوِلْنَ',
          '3mp': 'يُقَاوِلُوْنَ',
          '3fp': 'يُقَاوِلْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test('وَازَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('وزي', 3), 'indicative')).toEqualT({
          '1s': 'أُوَازِي',
          '2ms': 'تُوَازِي',
          '2fs': 'تُوَازِينَ',
          '3ms': 'يُوَازِي',
          '3fs': 'تُوَازِي',
          '2d': 'تُوَازِيَانِ',
          '3md': 'يُوَازِيَانِ',
          '3fd': 'تُوَازِيَانِ',
          '1p': 'نُوَازِي',
          '2mp': 'تُوَازُوْنَ',
          '2fp': 'تُوَازِيْنَ',
          '3mp': 'يُوَازُوْنَ',
          '3fp': 'يُوَازِيْنَ',
        })
      })

      test.each([['وسي', 'يُوَاسِي']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })

      test.each([['نوي', 'يُنَاوِي']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })

      test('وَافَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('وفي', 3), 'indicative')).toEqualT({
          '1s': 'أُوَافِي',
          '2ms': 'تُوَافِي',
          '2fs': 'تُوَافِينَ',
          '3ms': 'يُوَافِي',
          '3fs': 'تُوَافِي',
          '2d': 'تُوَافِيَانِ',
          '3md': 'يُوَافِيَانِ',
          '3fd': 'تُوَافِيَانِ',
          '1p': 'نُوَافِي',
          '2mp': 'تُوَافُوْنَ',
          '2fp': 'تُوَافِيْنَ',
          '3mp': 'يُوَافُوْنَ',
          '3fp': 'يُوَافِيْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test.each([
        ['ندي', 'يُنَادِي'],
        ['رعي', 'يُرَاعِي'],
        ['بلي', 'يُبَالِي'],
        ['قضي', 'يُقَاضِي'],
        ['بري', 'يُبَارِي'],
        ['رءي', 'يُرَائِي'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخذ', 'يُؤَاخِذُ'],
        ['أجر', 'يُؤَاجِرُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })

      test('آخَذَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('أخذ', 3), 'indicative')).toEqualT({
          '1s': 'أُؤَاخِذُ',
          '2ms': 'تُؤَاخِذُ',
          '2fs': 'تُؤَاخِذِيْنَ',
          '3ms': 'يُؤَاخِذُ',
          '3fs': 'تُؤَاخِذُ',
          '2d': 'تُؤَاخِذَانِ',
          '3md': 'يُؤَاخِذَانِ',
          '3fd': 'تُؤَاخِذَانِ',
          '1p': 'نُؤَاخِذُ',
          '2mp': 'تُؤَاخِذُوْنَ',
          '2fp': 'تُؤَاخِذْنَ',
          '3mp': 'يُؤَاخِذُوْنَ',
          '3fp': 'يُؤَاخِذْنَ',
        })
      })

      test('آجَرَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('أجر', 3), 'indicative')).toEqualT({
          '1s': 'أُؤَاجِرُ',
          '2ms': 'تُؤَاجِرُ',
          '2fs': 'تُؤَاجِرِيْنَ',
          '3ms': 'يُؤَاجِرُ',
          '3fs': 'تُؤَاجِرُ',
          '2d': 'تُؤَاجِرَانِ',
          '3md': 'يُؤَاجِرَانِ',
          '3fd': 'تُؤَاجِرَانِ',
          '1p': 'نُؤَاجِرُ',
          '2mp': 'تُؤَاجِرُوْنَ',
          '2fp': 'تُؤَاجِرْنَ',
          '3mp': 'يُؤَاجِرُوْنَ',
          '3fp': 'يُؤَاجِرْنَ',
        })
      })
    })

    describe('hamzated middle roots', () => {
      test.each([
        ['وأم', 'يُوَائِمُ'],
        ['لأم', 'يُلَائِمُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })

      test('سَاءَلَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('سأل', 3), 'indicative')).toEqualT({
          '1s': 'أُسَائِلُ',
          '2ms': 'تُسَائِلُ',
          '2fs': 'تُسَائِلِيْنَ',
          '3ms': 'يُسَائِلُ',
          '3fs': 'تُسَائِلُ',
          '2d': 'تُسَائِلَانِ',
          '3md': 'يُسَائِلَانِ',
          '3fd': 'تُسَائِلَانِ',
          '1p': 'نُسَائِلُ',
          '2mp': 'تُسَائِلُوْنَ',
          '2fp': 'تُسَائِلْنَ',
          '3mp': 'يُسَائِلُوْنَ',
          '3fp': 'يُسَائِلْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([['فجأ', 'يُفَاجِئُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 3), 'indicative')['3ms']).toEqualT(expected)
      })

      test('فَاجَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('فجأ', 3), 'indicative')).toEqualT({
          '1s': 'أُفَاجِئُ',
          '2ms': 'تُفَاجِئُ',
          '2fs': 'تُفَاجِئِيْنَ',
          '3ms': 'يُفَاجِئُ',
          '3fs': 'تُفَاجِئُ',
          '2d': 'تُفَاجِئَانِ',
          '3md': 'يُفَاجِئَانِ',
          '3fd': 'تُفَاجِئَانِ',
          '1p': 'نُفَاجِئُ',
          '2mp': 'تُفَاجِئُوْنَ',
          '2fp': 'تُفَاجِئْنَ',
          '3mp': 'يُفَاجِئُوْنَ',
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
        ['وقف', 'يُوْقِفُ'],
        ['وقع', 'يُوْقِعُ'],
        ['ولد', 'يُوْلِدُ'],
        ['وصل', 'يُوْصِلُ'],
        ['عرب', 'يُعْرِبُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
      })

      test('أَوْضَحَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وضح', 4), 'indicative')).toEqualT({
          '1s': 'أُوْضِحُ',
          '2ms': 'تُوْضِحُ',
          '2fs': 'تُوْضِحِيْنَ',
          '3ms': 'يُوْضِحُ',
          '3fs': 'تُوْضِحُ',
          '2d': 'تُوْضِحَانِ',
          '3md': 'يُوْضِحَانِ',
          '3fd': 'تُوْضِحَانِ',
          '1p': 'نُوْضِحُ',
          '2mp': 'تُوْضِحُوْنَ',
          '2fp': 'تُوْضِحْنَ',
          '3mp': 'يُوْضِحُوْنَ',
          '3fp': 'يُوْضِحْنَ',
        })
      })

      test('أَكْتَبَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('كتب', 4), 'indicative')).toEqualT({
          '1s': 'أُكْتِبُ',
          '2ms': 'تُكْتِبُ',
          '2fs': 'تُكْتِبِيْنَ',
          '3ms': 'يُكْتِبُ',
          '3fs': 'تُكْتِبُ',
          '2d': 'تُكْتِبَانِ',
          '3md': 'يُكْتِبَانِ',
          '3fd': 'تُكْتِبَانِ',
          '1p': 'نُكْتِبُ',
          '2mp': 'تُكْتِبُوْنَ',
          '2fp': 'تُكْتِبْنَ',
          '3mp': 'يُكْتِبُوْنَ',
          '3fp': 'يُكْتِبْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['تمم', 'يُتِمُّ'],
        ['سفف', 'يُسِفُّ'],
        ['حبب', 'يُحِبُّ'],
        ['عدد', 'يُعِدُّ'],
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
        ['تيح', 'يُتِيحُ'],
        ['فيد', 'يُفِيدُ'],
        ['عود', 'يُعِيدُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('defective roots', () => {
      test.each([
        ['علي', 'يُعْلِي'],
        ['بقي', 'يُبْقِي'],
        ['سمي', 'يُسْمِي'],
        ['عطي', 'يُعْطِي'],
        ['لقي', 'يُلْقِي'],
        ['مسي', 'يُمْسِي'],
        ['ضحي', 'يُضْحِي'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
      })

      test('أَحْيَا conjugation', () => {
        expect(conjugatePresentMood(getVerb('حيي', 4), 'indicative')).toEqualT({
          '1s': 'أُحْيِي',
          '2ms': 'تُحْيِي',
          '2fs': 'تُحْيِينَ',
          '3ms': 'يُحْيِي',
          '3fs': 'تُحْيِي',
          '2d': 'تُحْيِيَانِ',
          '3md': 'يُحْيِيَانِ',
          '3fd': 'تُحْيِيَانِ',
          '1p': 'نُحْيِي',
          '2mp': 'تُحْيُوْنَ',
          '2fp': 'تُحْيِيْنَ',
          '3mp': 'يُحْيُوْنَ',
          '3fp': 'يُحْيِيْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test.each([['ومأ', 'يُوْمِئُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final hollow roots', () => {
      test.each([['ضوء', 'يُضِيءُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
      })

      test('أَضَاءَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ضوء', 4), 'indicative')).toEqualT({
          '1s': 'أُضِيءُ',
          '2ms': 'تُضِيءُ',
          '2fs': 'تُضِيئِيْنَ',
          '3ms': 'يُضِيءُ',
          '3fs': 'تُضِيءُ',
          '2d': 'تُضِيئَانِ',
          '3md': 'يُضِيئَانِ',
          '3fd': 'تُضِيئَانِ',
          '1p': 'نُضِيءُ',
          '2mp': 'تُضِيئُوْنَ',
          '2fp': 'تُضِئْنَ',
          '3mp': 'يُضِيئُوْنَ',
          '3fp': 'يُضِئْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test.each([
        ['وصي', 'يُوْصِي'],
        ['وحي', 'يُوْحِي'],
        ['وفي', 'يُوْفِي'],
        ['ودي', 'يُوْدِي'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
      })

      test('أَوْفَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('وفي', 4), 'indicative')).toEqualT({
          '1s': 'أُوْفِي',
          '2ms': 'تُوْفِي',
          '2fs': 'تُوْفِيْنَ',
          '3ms': 'يُوْفِي',
          '3fs': 'تُوْفِي',
          '2d': 'تُوْفَانِ',
          '3md': 'يُوْفَانِ',
          '3fd': 'تُوْفَانِ',
          '1p': 'نُوْفِي',
          '2mp': 'تُوْفوْنَ',
          '2fp': 'تُوْفِيْنَ',
          '3mp': 'يُوْفوْنَ',
          '3fp': 'يُوْفِيْنَ',
        })
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
          '2mp': 'تُرُوْنَ',
          '2fp': 'تُرِينَ',
          '3mp': 'يُرُوْنَ',
          '3fp': 'يُرِينَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أذن', 'يُؤْذِنُ'],
        ['أمن', 'يُؤْمِنُ'],
        ['ألم', 'يُؤْلِمُ'],
        ['أجر', 'يُؤْجِرُ'],
        ['أتي', 'يُؤْتِي'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([
        ['نشأ', 'يُنْشِئُ'],
        ['نبأ', 'يُنْبِئُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 4), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated hollow-defective roots', () => {
      test.each([['أوي', 'يُؤْوِي']])('%s pattern', (root, expected) => {
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
        ['طلب', 'يَتَطَلَّبُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'indicative')['3ms']).toEqualT(expected)
      })

      test('تَكَتَّبَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('كتب', 5), 'indicative')).toEqualT({
          '1s': 'أَتَكَتَّبُ',
          '2ms': 'تَتَكَتَّبُ',
          '2fs': 'تَتَكَتَّبِيْنَ',
          '3ms': 'يَتَكَتَّبُ',
          '3fs': 'تَتَكَتَّبُ',
          '2d': 'تَتَكَتَّبَانِ',
          '3md': 'يَتَكَتَّبَانِ',
          '3fd': 'تَتَكَتَّبَانِ',
          '1p': 'نَتَكَتَّبُ',
          '2mp': 'تَتَكَتَّبُوْنَ',
          '2fp': 'تَتَكَتَّبْنَ',
          '3mp': 'يَتَكَتَّبُوْنَ',
          '3fp': 'يَتَكَتَّبْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([
        ['أخر', 'يَتَأَخَّرُ'],
        ['ألف', 'يَتَأَلَّفُ'],
        ['أكد', 'يَتَأَكَّدُ'],
        ['أكل', 'يَتَأَكَّلُ'],
        ['أثر', 'يَتَأَثَّرُ'],
        ['أوه', 'يَتَأَوَّهُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial geminate roots', () => {
      test.each([['أمم', 'يَتَأَمَّمُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial defective roots', () => {
      test.each([['أذي', 'يَتَأَذَّى']])('%s pattern', (root, expected) => {
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
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('assimilated roots', () => {
      test.each([
        ['وصل', 'يَتَوَصَّلُ'],
        ['وفر', 'يَتَوَفَّرُ'],
        ['وقف', 'يَتَوَقَّفُ'],
        ['وكأ', 'يَتَوَكَّأُ'],
        ['وقع', 'يَتَوَقَّعُ'],
        ['وسع', 'يَتَوَسَّعُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'indicative')['3ms']).toEqualT(expected)
      })

      test('تَوَعَّدَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وعد', 5), 'indicative')).toEqualT({
          '1s': 'أَتَوَعَّدُ',
          '2ms': 'تَتَوَعَّدُ',
          '2fs': 'تَتَوَعَّدِيْنَ',
          '3ms': 'يَتَوَعَّدُ',
          '3fs': 'تَتَوَعَّدُ',
          '2d': 'تَتَوَعَّدَانِ',
          '3md': 'يَتَوَعَّدَانِ',
          '3fd': 'تَتَوَعَّدَانِ',
          '1p': 'نَتَوَعَّدُ',
          '2mp': 'تَتَوَعَّدُوْنَ',
          '2fp': 'تَتَوَعَّدْنَ',
          '3mp': 'يَتَوَعَّدُوْنَ',
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
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 5), 'indicative')['3ms']).toEqualT(expected)
      })

      test('تَقَوَّلَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قول', 5), 'indicative')).toEqualT({
          '1s': 'أَتَقَوَّلُ',
          '2ms': 'تَتَقَوَّلُ',
          '2fs': 'تَتَقَوَّلِيْنَ',
          '3ms': 'يَتَقَوَّلُ',
          '3fs': 'تَتَقَوَّلُ',
          '2d': 'تَتَقَوَّلَانِ',
          '3md': 'يَتَقَوَّلَانِ',
          '3fd': 'تَتَقَوَّلَانِ',
          '1p': 'نَتَقَوَّلُ',
          '2mp': 'تَتَقَوَّلُوْنَ',
          '2fp': 'تَتَقَوَّلْنَ',
          '3mp': 'يَتَقَوَّلُوْنَ',
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

      test('تَرَأَّى conjugation', () => {
        expect(conjugatePresentMood(getVerb('رءي', 5), 'indicative')).toEqualT({
          '1s': 'أَتَرَأَّى',
          '2ms': 'تَتَرَأَّى',
          '2fs': 'تَتَرَأَّيْنَ',
          '3ms': 'يَتَرَأَّى',
          '3fs': 'تَتَرَأَّى',
          '2d': 'تَتَرَأَّيَانِ',
          '3md': 'يَتَرَأَّيَانِ',
          '3fd': 'تَتَرَأَّيَانِ',
          '1p': 'نَتَرَأَّى',
          '2mp': 'تَتَرَأَّوْنَ',
          '2fp': 'تَتَرَأَّيْنَ',
          '3mp': 'يَتَرَأَّوْنَ',
          '3fp': 'يَتَرَأَّيْنَ',
        })
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

      test('تَوَفَّى conjugation', () => {
        expect(conjugatePresentMood(getVerb('وفي', 5), 'indicative')).toEqualT({
          '1s': 'أَتَوَفَّى',
          '2ms': 'تَتَوَفَّى',
          '2fs': 'تَتَوَفَّيْنَ',
          '3ms': 'يَتَوَفَّى',
          '3fs': 'تَتَوَفَّى',
          '2d': 'تَتَوَفَّيَانِ',
          '3md': 'يَتَوَفَّيَانِ',
          '3fd': 'تَتَوَفَّيَانِ',
          '1p': 'نَتَوَفَّى',
          '2mp': 'تَتَوَفَّوْنَ',
          '2fp': 'تَتَوَفَّيْنَ',
          '3mp': 'يَتَوَفَّوْنَ',
          '3fp': 'يَتَوَفَّيْنَ',
        })
      })
    })

    describe('hamzated final hollow roots', () => {
      test('تَهَيَّأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('هيء', 5), 'indicative')).toEqualT({
          '1s': 'أَتَهَيَّأُ',
          '2ms': 'تَتَهَيَّأُ',
          '2fs': 'تَتَهَيَّئِيْنَ',
          '3ms': 'يَتَهَيَّأُ',
          '3fs': 'تَتَهَيَّأُ',
          '2d': 'تَتَهَيَّآنِ',
          '3md': 'يَتَهَيَّآنِ',
          '3fd': 'تَتَهَيَّآنِ',
          '1p': 'نَتَهَيَّأُ',
          '2mp': 'تَتَهَيَّؤُوْنَ',
          '2fp': 'تَتَهَيَّأْنَ',
          '3mp': 'يَتَهَيَّؤُوْنَ',
          '3fp': 'يَتَهَيَّأْنَ',
        })
      })

      test('تَضَوَّأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ضوء', 5), 'indicative')).toEqualT({
          '1s': 'أَتَضَوَّأُ',
          '2ms': 'تَتَضَوَّأُ',
          '2fs': 'تَتَضَوَّئِيْنَ',
          '3ms': 'يَتَضَوَّأُ',
          '3fs': 'تَتَضَوَّأُ',
          '2d': 'تَتَضَوَّآنِ',
          '3md': 'يَتَضَوَّآنِ',
          '3fd': 'تَتَضَوَّآنِ',
          '1p': 'نَتَضَوَّأُ',
          '2mp': 'تَتَضَوَّؤُوْنَ',
          '2fp': 'تَتَضَوَّأْنَ',
          '3mp': 'يَتَضَوَّؤُوْنَ',
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
          '2fs': 'تَتَكَاتَبِيْنَ',
          '3ms': 'يَتَكَاتَبُ',
          '3fs': 'تَتَكَاتَبُ',
          '2d': 'تَتَكَاتَبَانِ',
          '3md': 'يَتَكَاتَبَانِ',
          '3fd': 'تَتَكَاتَبَانِ',
          '1p': 'نَتَكَاتَبُ',
          '2mp': 'تَتَكَاتَبُوْنَ',
          '2fp': 'تَتَكَاتَبْنَ',
          '3fp': 'يَتَكَاتَبْنَ',
          '3mp': 'يَتَكَاتَبُوْنَ',
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

      test('تَحَابَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('حبب', 6), 'indicative')).toEqualT({
          '1s': 'أَتَحَابُّ',
          '2ms': 'تَتَحَابُّ',
          '2fs': 'تَتَحَابِّيْنَ',
          '3ms': 'يَتَحَابُّ',
          '3fs': 'تَتَحَابُّ',
          '2d': 'تَتَحَابَّانِ',
          '3md': 'يَتَحَابَّانِ',
          '3fd': 'تَتَحَابَّانِ',
          '1p': 'نَتَحَابُّ',
          '2mp': 'تَتَحَابُّوْنَ',
          '2fp': 'تَتَحَابَبْنَ',
          '3mp': 'يَتَحَابُّوْنَ',
          '3fp': 'يَتَحَابَبْنَ',
        })
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
        ['نمو', 'يَتَنَامَى'],
        ['مشي', 'يَتَمَاشَى'],
        ['عفو', 'يَتَعَافَى'],
        ['هوي', 'يَتَهَاوَى'],
        ['ولي', 'يَتَوَالَى'],
        ['وصي', 'يَتَوَاصَى'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 6), 'indicative')['3ms']).toEqualT(expected)
      })

      test('تَنَامَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('نمو', 6), 'indicative')).toEqualT({
          '1s': 'أَتَنَامَى',
          '2ms': 'تَتَنَامَى',
          '2fs': 'تَتَنَامَيْنَ',
          '3ms': 'يَتَنَامَى',
          '3fs': 'تَتَنَامَى',
          '2d': 'تَتَنَامَيَانِ',
          '3md': 'يَتَنَامَيَانِ',
          '3fd': 'تَتَنَامَيَانِ',
          '1p': 'نَتَنَامَى',
          '2mp': 'تَتَنَامَوْنَ',
          '2fp': 'تَتَنَامَيْنَ',
          '3mp': 'يَتَنَامَوْنَ',
          '3fp': 'يَتَنَامَيْنَ',
        })
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

      test('تَعَافَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('عفو', 6), 'indicative')).toEqualT({
          '1s': 'أَتَعَافَى',
          '2ms': 'تَتَعَافَى',
          '2fs': 'تَتَعَافَيْنَ',
          '3ms': 'يَتَعَافَى',
          '3fs': 'تَتَعَافَى',
          '2d': 'تَتَعَافَيَانِ',
          '3md': 'يَتَعَافَيَانِ',
          '3fd': 'تَتَعَافَيَانِ',
          '1p': 'نَتَعَافَى',
          '2mp': 'تَتَعَافَوْنَ',
          '2fp': 'تَتَعَافَيْنَ',
          '3mp': 'يَتَعَافَوْنَ',
          '3fp': 'يَتَعَافَيْنَ',
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
        ['ألف', 'يَتَآلَفُ'],
        ['أكل', 'يَتَآكَلُ'],
        ['أمر', 'يَتَآمَرُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 6), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated final roots', () => {
      test.each([['بطأ', 'يَتَبَاطَأُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 6), 'indicative')['3ms']).toEqualT(expected)
      })

      test('تَوَاطَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('وطء', 6), 'indicative')).toEqualT({
          '1s': 'أَتَوَاطَأُ',
          '2ms': 'تَتَوَاطَأُ',
          '2fs': 'تَتَوَاطَئِيْنَ',
          '3ms': 'يَتَوَاطَأُ',
          '3fs': 'تَتَوَاطَأُ',
          '2d': 'تَتَوَاطَآنِ',
          '3md': 'يَتَوَاطَآنِ',
          '3fd': 'تَتَوَاطَآنِ',
          '1p': 'نَتَوَاطَأُ',
          '2mp': 'تَتَوَاطَأُوْنَ',
          '2fp': 'تَتَوَاطَأْنَ',
          '3mp': 'يَتَوَاطَأُوْنَ',
          '3fp': 'يَتَوَاطَأْنَ',
        })
      })
    })

    describe('hamzated middle roots', () => {
      test('تَسَاءَلَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('سأل', 6), 'indicative')).toEqualT({
          '1s': 'أَتَسَاءَلُ',
          '2ms': 'تَتَسَاءَلُ',
          '2fs': 'تَتَسَاءَلِيْنَ',
          '3ms': 'يَتَسَاءَلُ',
          '3fs': 'تَتَسَاءَلُ',
          '2d': 'تَتَسَاءَلَانِ',
          '3md': 'يَتَسَاءَلَانِ',
          '3fd': 'تَتَسَاءَلَانِ',
          '1p': 'نَتَسَاءَلُ',
          '2mp': 'تَتَسَاءَلُوْنَ',
          '2fp': 'تَتَسَاءَلْنَ',
          '3mp': 'يَتَسَاءَلُوْنَ',
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
          '2fs': 'تَنْكَتِبِيْنَ',
          '3ms': 'يَنْكَتِبُ',
          '3fs': 'تَنْكَتِبُ',
          '2d': 'تَنْكَتِبَانِ',
          '3md': 'يَنْكَتِبَانِ',
          '3fd': 'تَنْكَتِبَانِ',
          '1p': 'نَنْكَتِبُ',
          '2mp': 'تَنْكَتِبُوْنَ',
          '2fp': 'تَنْكَتِبْنَ',
          '3mp': 'يَنْكَتِبُوْنَ',
          '3fp': 'يَنْكَتِبْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test('اِنْقَرَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قرأ', 7), 'indicative')).toEqualT({
          '1s': 'أَنْقَرِئُ',
          '2ms': 'تَنْقَرِئُ',
          '2fs': 'تَنْقَرِئِيْنَ',
          '3ms': 'يَنْقَرِئُ',
          '3fs': 'تَنْقَرِئُ',
          '2d': 'تَنْقَرِئَانِ',
          '3md': 'يَنْقَرِئَانِ',
          '3fd': 'تَنْقَرِئَانِ',
          '1p': 'نَنْقَرِئُ',
          '2mp': 'تَنْقَرِئُوْنَ',
          '2fp': 'تَنْقَرِئْنَ',
          '3mp': 'يَنْقَرِئُوْنَ',
          '3fp': 'يَنْقَرِئْنَ',
        })
      })
    })

    describe('geminate roots', () => {
      test.each([
        ['قصص', 'يَنْقَصُّ'],
        ['بثث', 'يَنْبَثُّ'],
        ['كفف', 'يَنْكَفُّ'],
        ['دسس', 'يَنْدَسُّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 7), 'indicative')['3ms']).toEqualT(expected)
      })

      test('اِنْقَصَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قصص', 7), 'indicative')).toEqualT({
          '1s': 'أَنْقَصُّ',
          '2ms': 'تَنْقَصُّ',
          '2fs': 'تَنْقَصِّينَ',
          '3ms': 'يَنْقَصُّ',
          '3fs': 'تَنْقَصُّ',
          '2d': 'تَنْقَصَّانِ',
          '3md': 'يَنْقَصَّانِ',
          '3fd': 'تَنْقَصَّانِ',
          '1p': 'نَنْقَصُّ',
          '2mp': 'تَنْقَصُّوْنَ',
          '2fp': 'تَنْقَصْنَ',
          '3mp': 'يَنْقَصُّوْنَ',
          '3fp': 'يَنْقَصْنَ',
        })
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
          '2fs': 'تَنْرَمِيْنَ',
          '3ms': 'يَنْرَمِي',
          '3fs': 'تَنْرَمِي',
          '2d': 'تَنْرَمِيَانِ',
          '3md': 'يَنْرَمِيَانِ',
          '3fd': 'تَنْرَمِيَانِ',
          '1p': 'نَنْرَمِي',
          '2mp': 'تَنْرَمِيوْنَ',
          '2fp': 'تَنْرَمِيْنَ',
          '3mp': 'يَنْرَمِيوْنَ',
          '3fp': 'يَنْرَمِيْنَ',
        })
      })
    })

    describe('doubly weak roots', () => {
      test('اِنْزَوَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('زوي', 7), 'indicative')).toEqualT({
          '1s': 'أَنْزَوِي',
          '2ms': 'تَنْزَوِي',
          '2fs': 'تَنْزَوَيْنَ',
          '3ms': 'يَنْزَوِي',
          '3fs': 'تَنْزَوِي',
          '2d': 'تَنْزَوِيَانِ',
          '3md': 'يَنْزَوِيَانِ',
          '3fd': 'تَنْزَوِيَانِ',
          '1p': 'نَنْزَوِي',
          '2mp': 'تَنْزَوُوْنَ',
          '2fp': 'تَنْزَوِينَ',
          '3mp': 'يَنْزَوُوْنَ',
          '3fp': 'يَنْزَوِينَ',
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
        ['نظر', 'يَنْتَظِرُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 8), 'indicative')['3ms']).toEqualT(expected)
      })

      test('اِضْطَلَعَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('ضلع', 8), 'indicative')).toEqualT({
          '1s': 'أَضْطَلِعُ',
          '2ms': 'تَضْطَلِعُ',
          '2fs': 'تَضْطَلِعِيْنَ',
          '3ms': 'يَضْطَلِعُ',
          '3fs': 'تَضْطَلِعُ',
          '2d': 'تَضْطَلِعَانِ',
          '3md': 'يَضْطَلِعَانِ',
          '3fd': 'تَضْطَلِعَانِ',
          '1p': 'نَضْطَلِعُ',
          '2mp': 'تَضْطَلِعُوْنَ',
          '2fp': 'تَضْطَلِعْنَ',
          '3mp': 'يَضْطَلِعُوْنَ',
          '3fp': 'يَضْطَلِعْنَ',
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
          '2fs': 'تَضْطَرِّيْنَ',
          '3ms': 'يَضْطَرُّ',
          '3fs': 'تَضْطَرُّ',
          '2d': 'تَضْطَرَّانِ',
          '3md': 'يَضْطَرَّانِ',
          '3fd': 'تَضْطَرَّانِ',
          '1p': 'نَضْطَرُّ',
          '2mp': 'تَضْطَرُّوْنَ',
          '2fp': 'تَضْطَرِرْنَ',
          '3mp': 'يَضْطَرُّوْنَ',
          '3fp': 'يَضْطَرِرْنَ',
        })
      })
    })

    describe('assimilated roots', () => {
      test.each([['وصل', 'يَتَّصِلُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 8), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['قود', 'يَقْتَادُ'],
        ['سوء', 'يَسْتَاءُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 8), 'indicative')['3ms']).toEqualT(expected)
      })

      test('اِزْدَوَجَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('زوج', 8), 'indicative')).toEqualT({
          '1s': 'أَزْدَوِجُ',
          '2ms': 'تَزْدَوِجُ',
          '2fs': 'تَزْدَوِجِيْنَ',
          '3ms': 'يَزْدَوِجُ',
          '3fs': 'تَزْدَوِجُ',
          '2d': 'تَزْدَوِجَانِ',
          '3md': 'يَزْدَوِجَانِ',
          '3fd': 'تَزْدَوِجَانِ',
          '1p': 'نَزْدَوِجُ',
          '2mp': 'تَزْدَوِجُوْنَ',
          '2fp': 'تَزْدَوِجْنَ',
          '3mp': 'يَزْدَوِجُوْنَ',
          '3fp': 'يَزْدَوِجْنَ',
        })
      })
    })

    describe('defective roots', () => {
      test('اِقْتَضَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('قضي', 8), 'indicative')).toEqualT({
          '1s': 'أَقْتَضِي',
          '2ms': 'تَقْتَضِي',
          '2fs': 'تَقْتَضِيْنَ',
          '3ms': 'يَقْتَضِي',
          '3fs': 'تَقْتَضِي',
          '2d': 'تَقْتَضِيَانِ',
          '3md': 'يَقْتَضِيَانِ',
          '3fd': 'تَقْتَضِيَانِ',
          '1p': 'نَقْتَضِي',
          '2mp': 'تَقْتَضُوْنَ',
          '2fp': 'تَقْتَضِيْنَ',
          '3mp': 'يَقْتَضُوْنَ',
          '3fp': 'يَقْتَضِيْنَ',
        })
      })

      test('اِرْتَدَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('ردي', 8), 'indicative')).toEqualT({
          '1s': 'أَرْتَدِي',
          '2ms': 'تَرْتَدِي',
          '2fs': 'تَرْتَدِيْنَ',
          '3ms': 'يَرْتَدِي',
          '3fs': 'تَرْتَدِي',
          '2d': 'تَرْتَدِيَانِ',
          '3md': 'يَرْتَدِيَانِ',
          '3fd': 'تَرْتَدِيَانِ',
          '1p': 'نَرْتَدِي',
          '2mp': 'تَرْتَدُوْنَ',
          '2fp': 'تَرْتَدِيْنَ',
          '3mp': 'يَرْتَدُوْنَ',
          '3fp': 'يَرْتَدِيْنَ',
        })
      })

      test('اِرْتَأَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('رءي', 8), 'indicative')).toEqualT({
          '1s': 'أَرْتَئِي',
          '2ms': 'تَرْتَئِي',
          '2fs': 'تَرْتَئِيْنَ',
          '3ms': 'يَرْتَئِي',
          '3fs': 'تَرْتَئِي',
          '2d': 'تَرْتَئِيَانِ',
          '3md': 'يَرْتَئِيَانِ',
          '3fd': 'تَرْتَئِيَانِ',
          '1p': 'نَرْتَئِي',
          '2mp': 'تَرْتَئُوْنَ',
          '2fp': 'تَرْتَئِيْنَ',
          '3mp': 'يَرْتَئُوْنَ',
          '3fp': 'يَرْتَئِيْنَ',
        })
      })

      test('اِشْتَرَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('شري', 8), 'indicative')).toEqualT({
          '1s': 'أَشْتَرِي',
          '2ms': 'تَشْتَرِي',
          '2fs': 'تَشْتَرِيْنَ',
          '3ms': 'يَشْتَرِي',
          '3fs': 'تَشْتَرِي',
          '2d': 'تَشْتَرِيَانِ',
          '3md': 'يَشْتَرِيَانِ',
          '3fd': 'تَشْتَرِيَانِ',
          '1p': 'نَشْتَرِي',
          '2mp': 'تَشْتَرُوْنَ',
          '2fp': 'تَشْتَرِيْنَ',
          '3mp': 'يَشْتَرُوْنَ',
          '3fp': 'يَشْتَرِيْنَ',
        })
      })

      test('اِخْتَفَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('خفي', 8), 'indicative')).toEqualT({
          '1s': 'أَخْتَفِي',
          '2ms': 'تَخْتَفِي',
          '2fs': 'تَخْتَفِيْنَ',
          '3ms': 'يَخْتَفِي',
          '3fs': 'تَخْتَفِي',
          '2d': 'تَخْتَفِيَانِ',
          '3md': 'يَخْتَفِيَانِ',
          '3fd': 'تَخْتَفِيَانِ',
          '1p': 'نَخْتَفِي',
          '2mp': 'تَخْتَفُوْنَ',
          '2fp': 'تَخْتَفِيْنَ',
          '3mp': 'يَخْتَفُوْنَ',
          '3fp': 'يَخْتَفِيْنَ',
        })
      })

      test('اِدَّعَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('دعو', 8), 'indicative')).toEqualT({
          '1s': 'أَدَّعِي',
          '2ms': 'تَدَّعِي',
          '2fs': 'تَدَّعِيْنَ',
          '3ms': 'يَدَّعِي',
          '3fs': 'تَدَّعِي',
          '2d': 'تَدَّعِيَانِ',
          '3md': 'يَدَّعِيَانِ',
          '3fd': 'تَدَّعِيَانِ',
          '1p': 'نَدَّعِي',
          '2mp': 'تَدَّعُوْنَ',
          '2fp': 'تَدَّعِيْنَ',
          '3mp': 'يَدَّعُوْنَ',
          '3fp': 'يَدَّعِيْنَ',
        })
      })
    })

    describe('hamzated initial roots', () => {
      test.each([['أخذ', 'يَتَّخِذُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 8), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('hamzated initial geminate roots', () => {
      test('يَأْتَمُّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('أمم', 8), 'indicative')).toEqualT({
          '1s': 'آتَمُّ',
          '2ms': 'تَأْتَمُّ',
          '2fs': 'تَأْتَمِّيْنَ',
          '3ms': 'يَأْتَمُّ',
          '3fs': 'تَأْتَمُّ',
          '2d': 'تَأْتَمَّانِ',
          '3md': 'يَأْتَمَّانِ',
          '3fd': 'تَأْتَمَّانِ',
          '1p': 'نَأْتَمُّ',
          '2mp': 'تَأْتَمُّوْنَ',
          '2fp': 'تَأْتَمِمْنَ',
          '3mp': 'يَأْتَمُّوْنَ',
          '3fp': 'يَأْتَمِمْنَ',
        })
      })
    })
  })

  describe('Form IX', () => {
    describe('regular roots', () => {
      test.each([
        ['حمر', 'يَحْمَرُّ'],
        ['صفر', 'يَصْفَرُّ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 9), 'indicative')['3ms']).toEqualT(expected)
      })
    })
  })

  describe('Form X', () => {
    describe('regular roots', () => {
      test.each([['عمل', 'يَسْتَعْمِلُ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 10), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('geminate roots', () => {
      test.each([['حبب', 'يَسْتَحِبُّ']])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 10), 'indicative')['3ms']).toEqualT(expected)
      })

      test('اِسْتَحَمَّ conjugation', () => {
        expect(conjugatePresentMood(getVerb('حمم', 10), 'indicative')).toEqualT({
          '1s': 'أَسْتَحِمُّ',
          '2ms': 'تَسْتَحِمُّ',
          '2fs': 'تَسْتَحِمِّيْنَ',
          '3ms': 'يَسْتَحِمُّ',
          '3fs': 'تَسْتَحِمُّ',
          '2d': 'تَسْتَحِمَّانِ',
          '3md': 'يَسْتَحِمَّانِ',
          '3fd': 'تَسْتَحِمَّانِ',
          '1p': 'نَسْتَحِمُّ',
          '2mp': 'تَسْتَحِمُّوْنَ',
          '2fp': 'تَسْتَحْمِمْنَ',
          '3mp': 'يَسْتَحِمُّوْنَ',
          '3fp': 'يَسْتَحْمِمْنَ',
        })
      })
    })

    describe('hollow roots', () => {
      test.each([
        ['ضيف', 'يَسْتَضِيفُ'],
        ['عون', 'يَسْتَعِينُ'],
        ['قود', 'يَسْتَقِيدُ'],
      ])('%s pattern', (root, expected) => {
        expect(conjugatePresentMood(getVerb(root, 10), 'indicative')['3ms']).toEqualT(expected)
      })
    })

    describe('doubly weak roots', () => {
      test('اِسْتَوْفَى conjugation', () => {
        expect(conjugatePresentMood(getVerb('وفي', 10), 'indicative')).toEqualT({
          '1s': 'أَسْتَوْفِيُ',
          '2ms': 'تَسْتَوْفِيُ',
          '2fs': 'تَسْتَوْفِيْنَ',
          '3ms': 'يَسْتَوْفِيُ',
          '3fs': 'تَسْتَوْفِيُ',
          '2d': 'تَسْتَوْفَانِ',
          '3md': 'يَسْتَوْفَانِ',
          '3fd': 'تَسْتَوْفَانِ',
          '1p': 'نَسْتَوْفِيُ',
          '2mp': 'تَسْتَوْفوْنَ',
          '2fp': 'تَسْتَوْفِيْنَ',
          '3mp': 'يَسْتَوْفوْنَ',
          '3fp': 'يَسْتَوْفِيْنَ',
        })
      })
    })

    describe('hamzated final roots', () => {
      test('اِسْتَقْرَأَ conjugation', () => {
        expect(conjugatePresentMood(getVerb('قرأ', 10), 'indicative')).toEqualT({
          '1s': 'أَسْتَقْرِئُ',
          '2ms': 'تَسْتَقْرِئُ',
          '2fs': 'تَسْتَقْرِئِيْنَ',
          '3ms': 'يَسْتَقْرِئُ',
          '3fs': 'تَسْتَقْرِئُ',
          '2d': 'تَسْتَقْرِئَانِ',
          '3md': 'يَسْتَقْرِئَانِ',
          '3fd': 'تَسْتَقْرِئَانِ',
          '1p': 'نَسْتَقْرِئُ',
          '2mp': 'تَسْتَقْرِئُوْنَ',
          '2fp': 'تَسْتَقْرِئْنَ',
          '3mp': 'يَسْتَقْرِئُوْنَ',
          '3fp': 'يَسْتَقْرِئْنَ',
        })
      })
    })
  })
})
