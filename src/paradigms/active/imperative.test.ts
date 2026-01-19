import fc from 'fast-check'
import { describe, expect, it, test } from 'vitest'
import { ALIF_HAMZA, ALIF_MADDA, isWeakLetter } from '../letters'
import { PRONOUN_IDS } from '../pronouns'
import { getVerb, type VerbForm, verbs } from '../verbs'
import { conjugateImperative } from './imperative'
import { conjugatePresentMood } from './present'

const arbitraryVerb = fc.constantFrom(...verbs)

const arbitraryPronoun = fc.constantFrom(...PRONOUN_IDS).filter((pronounId) => pronounId.startsWith('2'))

describe('imperative', () => {
  it.each<[string, VerbForm, string]>([
    ['عطى', 4, 'أَعْطِ'],
    ['ضحي', 4, 'أَضْحِ'],
    ['مسي', 4, 'أَمْسِ'],
  ])('drops the final glide for form IV verb with root %s', (root, form, expected2ms) => {
    expect(conjugateImperative(getVerb(root, form))['2ms']).toBe(expected2ms)
  })

  describe('regular verbs', () => {
    describe('ك-ت-ب', () => {
      test('كَتَبَ (Form I)', () => {
        expect(conjugateImperative(getVerb('كتب', 1))).toMatchObject({
          '2ms': 'اُكْتُبْ',
          '2fs': 'اُكْتُبِي',
          '2d': 'اُكْتُبَا',
          '2mp': 'اُكْتُبُوْا',
          '2fp': 'اُكْتُبْنَ',
        })
      })

      test('كَتَّبَ (Form II)', () => {
        expect(conjugateImperative(getVerb('كتب', 2))).toMatchObject({
          '2ms': 'كَتِّبْ',
          '2fs': 'كَتِّبِي',
          '2d': 'كَتِّبَا',
          '2mp': 'كَتِّبُوْا',
          '2fp': 'كَتِّبْنَ',
        })
      })

      test('كَاتَبَ (Form III)', () => {
        expect(conjugateImperative(getVerb('كتب', 3))).toMatchObject({
          '2ms': 'كَاتِبْ',
          '2fs': 'كَاتِبِي',
          '2d': 'كَاتِبَا',
          '2mp': 'كَاتِبُوْا',
          '2fp': 'كَاتِبْنَ',
        })
      })

      test('أَكْتَبَ (Form IV)', () => {
        expect(conjugateImperative(getVerb('كتب', 4))).toMatchObject({
          '2ms': 'أَكْتِبْ',
          '2fs': 'أَكْتِبِي',
          '2d': 'أَكْتِبَا',
          '2mp': 'أَكْتِبُوْا',
          '2fp': 'أَكْتِبْنَ',
        })
      })

      test('تَكَتَّبَ (Form V)', () => {
        expect(conjugateImperative(getVerb('كتب', 5))).toMatchObject({
          '2ms': 'تَكَتَّبْ',
          '2fs': 'تَكَتَّبِي',
          '2d': 'تَكَتَّبَا',
          '2mp': 'تَكَتَّبُوْا',
          '2fp': 'تَكَتَّبْنَ',
        })
      })

      test('تَكَاتَبَ (Form VI)', () => {
        expect(conjugateImperative(getVerb('كتب', 6))).toMatchObject({
          '2ms': 'تَكَاتَبْ',
          '2fs': 'تَكَاتَبِي',
          '2d': 'تَكَاتَبَا',
          '2mp': 'تَكَاتَبُوْا',
          '2fp': 'تَكَاتَبْنَ',
        })
      })

      test('اِنْكَتَبَ (Form VII)', () => {
        expect(conjugateImperative(getVerb('كتب', 7))).toMatchObject({
          '2ms': 'اِنْكَتِبْ',
          '2fs': 'اِنْكَتِبِي',
          '2d': 'اِنْكَتِبَا',
          '2mp': 'اِنْكَتِبُوْا',
          '2fp': 'اِنْكَتِبْنَ',
        })
      })
    })
  })

  describe('assimilated verbs', () => {
    describe('و-ع-د', () => {
      test('وَعَدَ (Form I)', () => {
        expect(conjugateImperative(getVerb('وعد', 1))).toMatchObject({
          '2ms': 'عِدْ',
          '2fs': 'عِدِي',
          '2d': 'عِدَا',
          '2mp': 'عِدُوْا',
          '2fp': 'عِدْنَ',
        })
      })

      test('تَوَعَّدَ (Form V)', () => {
        expect(conjugateImperative(getVerb('وعد', 5))).toMatchObject({
          '2ms': 'تَوَعَّدْ',
          '2fs': 'تَوَعَّدِي',
          '2d': 'تَوَعَّدَا',
          '2mp': 'تَوَعَّدُوْا',
          '2fp': 'تَوَعَّدْنَ',
        })
      })
    })

    describe('و-ض-ع', () => {
      test('وَضَعَ (Form I)', () => {
        expect(conjugateImperative(getVerb('وضع', 1))).toMatchObject({
          '2ms': 'ضَعْ',
          '2fs': 'ضَعِي',
          '2d': 'ضَعَا',
          '2mp': 'ضَعُوا',
          '2fp': 'ضَعْنَ',
        })
      })
    })

    describe('و-ث-ق', () => {
      test('وَثُقَ (Form I)', () => {
        expect(conjugateImperative(getVerb('وثق', 1))).toMatchObject({
          '2ms': 'ثُقْ',
          '2fs': 'ثُقِي',
          '2d': 'ثُقَا',
          '2mp': 'ثُقُوا',
          '2fp': 'ثُقْنَ',
        })
      })
    })

    describe('ي-ب-س', () => {
      test('يَبِسَ (Form I)', () => {
        expect(conjugateImperative(getVerb('يبس', 1))).toMatchObject({
          '2ms': 'اِيبَسْ',
          '2fs': 'اِيبَسِي',
          '2d': 'اِيبَسَا',
          '2mp': 'اِيبَسُوا',
          '2fp': 'اِيبَسْنَ',
        })
      })
    })
  })

  describe('hollow verbs', () => {
    describe('ك-ا-ن', () => {
      test('كَانَ (Form I)', () => {
        expect(conjugateImperative(getVerb('كان', 1))).toMatchObject({
          '2ms': 'كُنْ',
          '2fs': 'كُونِي',
          '2d': 'كُونَا',
          '2mp': 'كُونُوا',
          '2fp': 'كُنَّ',
        })
      })
    })

    describe('ز-و-ر', () => {
      test('زَارَ (Form I)', () => {
        expect(conjugateImperative(getVerb('زور', 1))).toMatchObject({
          '2ms': 'زُرْ',
          '2fs': 'زُورِي',
          '2d': 'زُورَا',
          '2mp': 'زُورُوْا',
          '2fp': 'زُرْنَ',
        })
      })
    })

    describe('د-ع-ا', () => {
      test('دَعَا (Form I)', () => {
        expect(conjugateImperative(getVerb('دعا', 1))).toMatchObject({
          '2ms': 'اُدْعُ',
          '2fs': 'اُدْعِي',
          '2d': 'اُدْعُوَا',
          '2mp': 'اُدْعُوا',
          '2fp': 'اُدْعُونَ',
        })
      })
    })

    describe('ب-ي-ع', () => {
      test('بَاعَ (Form I)', () => {
        expect(conjugateImperative(getVerb('باع', 1))).toMatchObject({
          '2ms': 'بِعْ',
          '2fs': 'بِيعِي',
          '2d': 'بِيعَا',
          '2mp': 'بِيعُوا',
          '2fp': 'بِعْنَ',
        })
      })
    })

    describe('ش-ي-د', () => {
      test('شَادَ (Form I)', () => {
        expect(conjugateImperative(getVerb('شيد', 1))).toMatchObject({
          '2ms': 'شِدْ',
          '2fs': 'شِيدِي',
          '2d': 'شِيدَا',
          '2mp': 'شِيدُوْا',
          '2fp': 'شِدْنَ',
        })
      })
    })

    describe('ق-و-ل', () => {
      test('قَالَ (Form I)', () => {
        expect(conjugateImperative(getVerb('قول', 1))).toMatchObject({
          '2ms': 'قُلْ',
          '2fs': 'قُولِي',
          '2d': 'قُولَا',
          '2mp': 'قُولُوْا',
          '2fp': 'قُلْنَ',
        })
      })

      test('قَوَّلَ (Form II)', () => {
        expect(conjugateImperative(getVerb('قول', 2))).toMatchObject({
          '2ms': 'قَوِّلْ',
          '2fs': 'قَوِّلِي',
          '2d': 'قَوِّلَا',
          '2mp': 'قَوِّلُوْا',
          '2fp': 'قَوِّلْنَ',
        })
      })

      test('قَاوَلَ (Form III)', () => {
        expect(conjugateImperative(getVerb('قول', 3))).toMatchObject({
          '2ms': 'قَاوِلْ',
          '2fs': 'قَاوِلِي',
          '2d': 'قَاوِلَا',
          '2mp': 'قَاوِلُوْا',
          '2fp': 'قَاوِلْنَ',
        })
      })

      test('تَقَوَّلَ (Form V)', () => {
        expect(conjugateImperative(getVerb('قول', 5))).toMatchObject({
          '2ms': 'تَقَوَّلْ',
          '2fs': 'تَقَوَّلِي',
          '2d': 'تَقَوَّلَا',
          '2mp': 'تَقَوَّلُوْا',
          '2fp': 'تَقَوَّلْنَ',
        })
      })
    })

    describe('ي-م-ن', () => {
      test('يَمَنَ (Form I)', () => {
        expect(conjugateImperative(getVerb('يمن', 1))).toMatchObject({
          '2ms': 'اِيمَنْ',
          '2fs': 'اِيمَنِي',
          '2d': 'اِيمَنَا',
          '2mp': 'اِيمَنُوا',
          '2fp': 'اِيمَنَّ',
        })
      })
    })
  })

  describe('defective verbs', () => {
    // Verified against Wiktionary's conjugation table for بَقِيَ (Form I, final-weak i~a).
    describe('ب-ق-ي', () => {
      test('بَقِيَ (Form I)', () => {
        expect(conjugateImperative(getVerb('بقي', 1))).toMatchObject({
          '2ms': 'اِبْقَ',
          '2fs': 'اِبْقَيْ',
          '2d': 'اِبْقَيَا',
          '2mp': 'اِبْقَوْا',
          '2fp': 'اِبْقَيْنَ',
        })
      })
    })

    describe('ر-م-ي', () => {
      test.todo('رَمَى (Form I)')
      test.todo('رَمَّى (Form II)')
      test.todo('اِنْرَمَى (Form VIII)')
    })
  })

  describe('hamzated initial verbs', () => {
    describe('أ-خ-ذ', () => {
      test('أَخَذَ (Form I)', () => {
        expect(conjugateImperative(getVerb('أخذ', 1))).toMatchObject({
          '2ms': 'خُذْ',
          '2fs': 'خُذِي',
          '2d': 'خُذَا',
          '2mp': 'خُذُوْا',
          '2fp': 'خُذْنَ',
        })
      })

      test('اِتَّخَذَ (Form VIII)', () => {
        expect(conjugateImperative(getVerb('أخذ', 8))).toMatchObject({
          '2ms': 'اِتَّخِذْ',
          '2fs': 'اِتَّخِذِي',
          '2d': 'اِتَّخِذَا',
          '2mp': 'اِتَّخِذُوْا',
          '2fp': 'اِتَّخِذْنَ',
        })
      })
    })

    describe('أ-ث-ر', () => {
      test('أَثَّرَ (Form II)', () => {
        expect(conjugateImperative(getVerb('أثر', 2))).toMatchObject({
          '2ms': 'أَثِّرْ',
          '2fs': 'أَثِّرِي',
          '2d': 'أَثِّرَا',
          '2mp': 'أَثِّرُوْا',
          '2fp': 'أَثِّرْنَ',
        })
      })
    })

    describe('أ-س-ر', () => {
      test('أَسَرَ (Form I)', () => {
        expect(conjugateImperative(getVerb('أسر', 1))).toMatchObject({
          '2ms': 'اِيسِرْ',
          '2fs': 'اِيسِرِي',
          '2d': 'اِيسِرَا',
          '2mp': 'اِيسِرُوا',
          '2fp': 'اِيسِرْنَ',
        })
      })
    })

    describe('أ-ذ-ن', () => {
      test('أَذِنَ (Form I)', () => {
        expect(conjugateImperative(getVerb('أذن', 1))).toMatchObject({
          '2ms': 'اِيذَنْ',
          '2fs': 'اِيذَنِي',
          '2d': 'اِيذَنَا',
          '2mp': 'اِيذَنُوا',
          '2fp': 'اِيذَنَّ',
        })
      })
    })
  })

  describe('hamzated initial defective verbs', () => {
    describe('أ-ت-ي', () => {
      test('أَتَى (Form I)', () => {
        expect(conjugateImperative(getVerb('أتي', 1))).toMatchObject({
          '2ms': 'ائْتِ',
          '2fs': 'ائْتِي',
          '2d': 'ائْتِيَا',
          '2mp': 'ائْتُوْا',
          '2fp': 'ائْتِينَ',
        })
      })
    })
  })

  describe('hamzated initial hollow verbs', () => {
    describe('أ-ي-د', () => {
      test('أَيَّدَ (Form II)', () => {
        expect(conjugateImperative(getVerb('أيد', 2))).toMatchObject({
          '2ms': 'أَيِّدْ',
          '2fs': 'أَيِّدِي',
          '2d': 'أَيِّدَا',
          '2mp': 'أَيِّدُوا',
          '2fp': 'أَيِّدْنَ',
        })
      })
    })

    describe('أ-و-د', () => {
      test('أَوَّدَ (Form II)', () => {
        expect(conjugateImperative(getVerb('أود', 2))).toMatchObject({
          '2ms': 'أَوِّدْ',
          '2fs': 'أَوِّدِي',
          '2d': 'أَوِّدَا',
          '2mp': 'أَوِّدُوا',
          '2fp': 'أَوِّدْنَ',
        })
      })
    })
  })

  describe('hamzated middle verbs', () => {
    describe('ي-ئ-س', () => {
      test('يَئِسَ (Form I)', () => {
        expect(conjugateImperative(getVerb('يئس', 1))).toMatchObject({
          '2ms': 'اِيئَسْ',
          '2fs': 'اِيئَسِي',
          '2d': 'اِيئَسَا',
          '2mp': 'اِيئَسُوا',
          '2fp': 'اِيئَسْنَ',
        })
      })
    })

    describe('س-أ-ل', () => {
      test('سَأَلَ (Form I)', () => {
        expect(conjugateImperative(getVerb('سأل', 1))).toMatchObject({
          '2ms': 'اِسْأَلْ',
          '2fs': 'اِسْأَلِي',
          '2d': 'اِسْأَلَا',
          '2mp': 'اِسْأَلُوْا',
          '2fp': 'اِسْأَلْنَ',
        })
      })

      test('سَاءَلَ (Form III)', () => {
        expect(conjugateImperative(getVerb('سأل', 3))).toMatchObject({
          '2ms': 'سَائِلْ',
          '2fs': 'سَائِلِي',
          '2d': 'سَائِلَا',
          '2mp': 'سَائِلُوْا',
          '2fp': 'سَائِلْنَ',
        })
      })

      test('تَسَاءَلَ (Form VI)', () => {
        expect(conjugateImperative(getVerb('سأل', 6))).toMatchObject({
          '2ms': 'تَسَاءَلْ',
          '2fs': 'تَسَاءَلِي',
          '2d': 'تَسَاءَلَا',
          '2mp': 'تَسَاءَلُوْا',
          '2fp': 'تَسَاءَلْنَ',
        })
      })
    })
  })

  describe('hamzated final verbs', () => {
    describe('ب-د-أ', () => {
      test('بَدَأَ (Form I)', () => {
        expect(conjugateImperative(getVerb('بدأ', 1))).toMatchObject({
          '2ms': 'اِبْدَأْ',
          '2fs': 'اِبْدَئِي',
          '2d': 'اِبْدَآ',
          '2mp': 'اِبْدَأُوا',
          '2fp': 'اِبْدَأْنَ',
        })
      })
    })

    describe('ق-ر-أ', () => {
      test('قَرَأَ (Form I)', () => {
        expect(conjugateImperative(getVerb('قرأ', 1))).toMatchObject({
          '2ms': 'اِقْرَأْ',
          '2fs': 'اِقْرَئِي',
          '2d': 'اِقْرَآ',
          '2mp': 'اِقْرَأُوا',
          '2fp': 'اِقْرَأْنَ',
        })
      })

      test('اِسْتَقْرَأَ (Form X)', () => {
        expect(conjugateImperative(getVerb('قرأ', 10))).toMatchObject({
          '2ms': 'اِسْتَقْرِئْ',
          '2fs': 'اِسْتَقْرِئِي',
          '2d': 'اِسْتَقْرِئَا',
          '2mp': 'اِسْتَقْرِئُوا',
          '2fp': 'اِسْتَقْرِئْنَ',
        })
      })
    })
  })

  describe('doubly weak verbs', () => {
    describe('و-ف-ي', () => {
      test('وَفَى (Form I)', () => {
        expect(conjugateImperative(getVerb('وفي', 1))).toMatchObject({
          '2ms': 'فِ',
          '2fs': 'فِي',
          '2d': 'فِيَا',
          '2mp': 'فُوْا',
          '2fp': 'فِينَ',
        })
      })

      test('وَفَّى (Form II)', () => {
        expect(conjugateImperative(getVerb('وفي', 2))).toMatchObject({
          '2ms': 'وَفِّ',
          '2fs': 'وَفِّي',
          '2d': 'وَفِّيَا',
          '2mp': 'وَفُّوْا',
          '2fp': 'وَفِّينَ',
        })
      })

      test('وَافَى (Form III)', () => {
        expect(conjugateImperative(getVerb('وفي', 3))).toMatchObject({
          '2ms': 'وَافِ',
          '2fs': 'وَافِي',
          '2d': 'وَافِيَا',
          '2mp': 'وَافُوْا',
          '2fp': 'وَافِينَ',
        })
      })

      test('أَوْفَى (Form IV)', () => {
        expect(conjugateImperative(getVerb('وفي', 4))).toMatchObject({
          '2ms': 'أَوْفِ',
          '2fs': 'أَوْفِي',
          '2d': 'أَوْفِيَا',
          '2mp': 'أَوْفُوْا',
          '2fp': 'أَوْفِينَ',
        })
      })

      test('تَوَفَّى (Form V)', () => {
        expect(conjugateImperative(getVerb('وفي', 5))).toMatchObject({
          '2ms': 'تَوَفَّ',
          '2fs': 'تَوَفَّيْ',
          '2d': 'تَوَفَّيَا',
          '2mp': 'تَوَفَّوْا',
          '2fp': 'تَوَفَّيْنَ',
        })
      })

      test('اِسْتَوْفَى (Form X)', () => {
        expect(conjugateImperative(getVerb('وفي', 10))).toMatchObject({
          '2ms': 'اِسْتَوْفِ',
          '2fs': 'اِسْتَوْفِي',
          '2d': 'اِسْتَوْفِيَا',
          '2mp': 'اِسْتَوْفُوْا',
          '2fp': 'اِسْتَوْفِينَ',
        })
      })
    })

    describe('ر-و-ي', () => {
      test('رَوِيَ (Form I)', () => {
        expect(conjugateImperative(getVerb('روي', 1))).toMatchObject({
          '2ms': 'اِرْوِ',
          '2fs': 'اِرْوِي',
          '2d': 'اِرْوِيَا',
          '2mp': 'اِرْوُوا',
          '2fp': 'اِرْوِينَ',
        })
      })
    })
  })

  describe('geminate verbs', () => {
    describe('أ-م-م', () => {
      test('أَمَّ (Form I)', () => {
        expect(conjugateImperative(getVerb('أمم', 1))).toMatchObject({
          '2ms': 'أُمَّ',
          '2fs': 'أُمِّي',
          '2d': 'أُمَّا',
          '2mp': 'أُمُّوا',
          '2fp': 'أُمُمْنَ',
        })
      })
    })

    describe('ح-م-م', () => {
      test('اِسْتَحَمَّ (Form X)', () => {
        expect(conjugateImperative(getVerb('حمم', 10))).toMatchObject({
          '2ms': 'اِسْتَحِمَّ',
          '2fs': 'اِسْتَحِمِّي',
          '2d': 'اِسْتَحِمَّا',
          '2mp': 'اِسْتَحِمُّوْا',
          '2fp': 'اِسْتَحْمِمْنَ',
        })
      })
    })

    describe('ح-ب-ب', () => {
      test('حَبَّ (Form I)', () => {
        expect(conjugateImperative(getVerb('حبب', 1))).toMatchObject({
          '2ms': 'حِبَّ',
          '2fs': 'حِبِّي',
          '2d': 'حِبَّا',
          '2mp': 'حِبُّوْا',
          '2fp': 'اِحْبِبْنَ',
        })
      })

      test('حَبَّبَ (Form II)', () => {
        expect(conjugateImperative(getVerb('حبب', 2))).toMatchObject({
          '2ms': 'حَبِّبْ',
          '2fs': 'حَبِّبِي',
          '2d': 'حَبِّبَا',
          '2mp': 'حَبِّبُوْا',
          '2fp': 'حَبِّبْنَ',
        })
      })

      test('أَحَبَّ (Form IV)', () => {
        expect(conjugateImperative(getVerb('حبب', 4))).toMatchObject({
          '2ms': 'أَحِبَّ',
          '2fs': 'أَحِبِّي',
          '2d': 'أَحِبَّا',
          '2mp': 'أَحِبُّوْا',
          '2fp': 'أَحْبِبْنَ',
        })
      })

      test('اِسْتَحَبَّ (Form X)', () => {
        expect(conjugateImperative(getVerb('حبب', 10))).toMatchObject({
          '2ms': 'اِسْتَحِبَّ',
          '2fs': 'اِسْتَحِبِّي',
          '2d': 'اِسْتَحِبَّا',
          '2mp': 'اِسْتَحِبُّوْا',
          '2fp': 'اِسْتَحْبِبْنَ',
        })
      })
    })

    describe('ظ-ل-ل', () => {
      test('ظَلَّ (Form I)', () => {
        expect(conjugateImperative(getVerb('ظلل', 1))).toMatchObject({
          '2ms': 'ظَلَّ',
          '2fs': 'ظَلِّي',
          '2d': 'ظَلَّا',
          '2mp': 'ظَلُّوْا',
          '2fp': 'اِظْلَلْنَ',
        })
      })
    })

    describe('و-د-د', () => {
      test('وَدَّ (Form I)', () => {
        expect(conjugateImperative(getVerb('ودد', 1))).toMatchObject({
          '2ms': 'وَدَّ',
          '2fs': 'وَدِّي',
          '2d': 'وَدَّا',
          '2mp': 'وَدُّوْا',
          '2fp': 'اِيدَدْنَ',
        })
      })
    })
  })

  describe('hamzated initial defective verbs', () => {
    describe.todo('أ-ت-ي')
  })

  describe('hamzated middle assimilated verbs', () => {
    describe.todo('و-ئ-د')
  })

  describe('hamzated middle defective verbs', () => {
    describe('ر-أ-ى', () => {
      test('رَأَى (Form I)', () => {
        expect(conjugateImperative(getVerb('رأى', 1))).toMatchObject({
          '2ms': 'رَ',
          '2fs': 'رَيْ',
          '2d': 'رَيَا',
          '2mp': 'رَوْا',
          '2fp': 'رَيْنَ',
        })
      })
    })
  })

  describe('hamzated final assimilated verbs', () => {
    describe('و-أ-ى', () => {
      test('وَأَى (Form I)', () => {
        expect(conjugateImperative(getVerb('وأى', 1))).toMatchObject({
          '2ms': 'ئِ',
          '2fs': 'ئِي',
          '2d': 'ئِيَا',
          '2mp': 'أُوْا',
          '2fp': 'ئِينَ',
        })
      })
    })
  })

  describe('hamzated final hollow verbs', () => {
    describe.todo('ج-ي-ء')
  })

  test('imperative only exists for second person pronouns', () => {
    fc.assert(
      fc.property(arbitraryVerb, (verb) => {
        expect(conjugateImperative(verb)).toMatchObject({
          '1s': '',
          '1p': '',
          '3ms': '',
          '3fs': '',
          '3md': '',
          '3fd': '',
          '3mp': '',
          '3fp': '',
        })
      }),
    )
  })

  it('it assimilates the initial wāw for ٱتَّصِلْ (Form VIII)', () => {
    const imperative = conjugateImperative(getVerb('وصل', 8))

    expect(imperative['2ms']).toBe('اِتَّصِلْ')
  })

  it('geminate Form II imperative has kasra after shadda (e.g., حَبِّبْ)', () => {
    const imperative = conjugateImperative(getVerb('حبب', 2))

    expect(imperative['2ms']).toBe('حَبِّبْ')
  })

  it('shortens hollow Form VII imperative like اِنْقَادَ → اِنْقَدْ', () => {
    const imperative = conjugateImperative(getVerb('قود', 7))

    expect(imperative['2ms']).toBe('اِنْقَدْ')
  })

  it('shortens hollow Form VIII imperative like اِقْتَادَ → اِقْتَدْ', () => {
    const imperative = conjugateImperative(getVerb('قود', 8))

    expect(imperative['2ms']).toBe('اِقْتَدْ')
  })

  it.each<[string, VerbForm, string]>([
    ['عمل', 1, 'اِعْمَلْ'],
    ['عمل', 2, 'عَمِّلْ'],
    ['عمل', 10, 'اِسْتَعْمِلْ'],
    ['حبب', 2, 'حَبِّبْ'],
    ['حبب', 4, 'أَحِبَّ'],
    ['حبب', 5, 'تَحَبَّبْ'],
    ['جمع', 5, 'تَجَمَّعْ'],
    ['ضمن', 5, 'تَضَمَّنْ'],
    ['ضمن', 2, 'ضَمِّنْ'],
    ['ضمن', 1, 'اِضْمَنْ'],
    ['صبح', 2, 'صَبِّحْ'],
    ['ذكر', 2, 'ذَكِّرْ'],
    ['ذكر', 1, 'اُذْكُرْ'],
    ['قرح', 8, 'اِقْتَرِحْ'],
    ['تمم', 1, 'تِمَّ'],
    ['حدث', 1, 'اُحْدُثْ'],
    ['حضر', 1, 'اُحْضُرْ'],
    ['وقي', 1, 'قِ'],
    ['ولى', 1, 'لِ'],
    ['أنشأ', 4, 'أَنْشِئْ'],
    ['أتي', 1, 'ائْتِ'],
    ['أسر', 1, 'اِيسِرْ'],
    ['رأى', 1, 'رَ'],
    ['أخذ', 1, 'خُذْ'],
    ['أذن', 1, 'اِيذَنْ'],
    ['جعل', 1, 'اِجْعَلْ'],
    ['جمع', 1, 'اِجْمَعْ'],
    ['جمع', 2, 'جَمِّعْ'],
    ['أوي', 1, 'اِئْوِ'],
    ['أوي', 4, 'آوِ'],
    ['بكي', 1, 'اِبْكِ'],
    ['أوي', 5, 'تَأَوَّ'],
    ['أوي', 10, 'اِسْتَأْوِ'],
    ['غدو', 1, 'غْدا'],
    ['لوم', 1, 'لُمْ'],
    ['أمم', 1, 'أُمَّ'],
    ['أكد', 2, 'أَكِّدْ'],
    ['مكن', 4, 'أَمْكِنْ'],
    ['طلب', 5, 'تَطَلَّبْ'],
    ['وعد', 1, 'عِدْ'],
    ['وفي', 1, 'فِ'],
    ['ونى', 1, 'نِ'],
    ['وثق', 1, 'ثُقْ'],
    ['حمر', 9, 'اِحْمَرَّ'],
    ['ظلل', 1, 'ظَلَّ'],
    ['جيء', 1, 'جِئْ'],
    ['مرض', 1, 'اِمْرَضْ'],
    ['بيت', 1, 'بِتْ'],
    ['صبح', 1, 'اِصْبَحْ'],
    ['صير', 1, 'صِرْ'],
    ['حول', 5, 'تَحَوَّلْ'],
    ['صبح', 4, 'أَصْبِحْ'],
    ['جري', 1, 'اِجْرِ'],
    ['يئس', 1, 'اِيئَسْ'],
    ['يمن', 1, 'اِيمَنْ'],
    ['يبس', 1, 'اِيبَسْ'],
    ['مثل', 1, 'اُمْثُلْ'],
    ['دخل', 1, 'اُدْخُلْ'],
    ['ولد', 1, 'لِدْ'],
    ['ذهب', 1, 'اِذْهَبْ'],
  ])('%s (%d) imperative 2ms is %s', (root, form, expected) => {
    expect(conjugateImperative(getVerb(root, form))['2ms']).toBe(expected)
  })

  describe('imperative stems from jussive', () => {
    test('for forms III-X without an initial hamza', () => {
      fc.assert(
        fc.property(
          arbitraryVerb.filter(({ root, form }) => form >= 3 && root[0] !== ALIF_HAMZA),
          arbitraryPronoun,
          (verb, pronounId) => {
            const jussive = conjugatePresentMood(verb, 'jussive')
            const imperative = conjugateImperative(verb)

            expect(imperative[pronounId]).toContain(jussive[pronounId].slice(-1))
          },
        ),
      )
    })

    test('for non-assimilated, non-defective form I', () => {
      fc.assert(
        fc.property(
          arbitraryVerb.filter(({ root, form }) => {
            const [c1, , c3] = Array.from(root)
            return form === 1 && !isWeakLetter(c1) && c1 !== ALIF_HAMZA && !isWeakLetter(c3)
          }),
          arbitraryPronoun,
          (verb, pronounId) => {
            const jussive = conjugatePresentMood(verb, 'jussive')
            const imperative = conjugateImperative(verb)

            expect(imperative[pronounId]).toContain(jussive[pronounId].slice(-1))
          },
        ),
      )
    })

    test('for non-geminated form II', () => {
      fc.assert(
        fc.property(
          arbitraryVerb.filter(({ root, form }) => {
            const [, c2, c3] = Array.from(root)
            return form === 2 && c2 !== c3
          }),
          arbitraryPronoun,
          (verb, pronounId) => {
            const jussive = conjugatePresentMood(verb, 'jussive')
            const imperative = conjugateImperative(verb)

            expect(imperative[pronounId]).toContain(jussive[pronounId].slice(-1))
          },
        ),
      )
    })
  })

  test('all imperative conjugations of form IV verbs begin with alif hamza or alif madda', () => {
    fc.assert(
      fc.property(
        arbitraryVerb.filter(({ form }) => form === 4),
        arbitraryPronoun,
        (verb, pronounId) => {
          const imperative = conjugateImperative(verb)
          const firstChar = imperative[pronounId][0]

          expect([ALIF_HAMZA, ALIF_MADDA].includes(firstChar)).toBe(true)
        },
      ),
    )
  })
})
