import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest'
import { buildVerbFromId } from '../../src/paradigms/verbs'
import { fetchParadigms, presentVowelOf } from './qutrub.mts'

const QUTRUB_RESULT = {
  '0': {
    '0': 'الضمائر',
    '1': 'الماضي المعلوم',
    '2': 'المضارع المعلوم',
    '3': 'المضارع المجزوم',
    '4': 'المضارع المنصوب',
    '5': 'المضارع المؤكد الثقيل',
    '6': 'الأمر',
    '7': 'الأمر المؤكد',
    '8': 'الماضي المجهول',
    '9': 'المضارع المجهول',
    '10': 'المضارع المجهول المجزوم',
    '11': 'المضارع المجهول المنصوب',
    '12': 'المضارع المؤكد الثقيل المجهول ',
  },
  '1': {
    '0': 'أنا',
    '1': 'كَتَبْتُ',
    '2': 'أَكْتُبُ',
    '3': 'أَكْتُبْ',
    '4': 'أَكْتُبَ',
    '5': 'أَكْتُبَنَّ',
    '6': '',
    '7': '',
    '8': 'كُتِبْتُ',
    '9': 'أُكْتَبُ',
    '10': 'أُكْتَبْ',
    '11': 'أُكْتَبَ',
    '12': 'أُكْتَبَنَّ',
  },
  '2': {
    '0': 'نحن',
    '1': 'كَتَبْنَا',
    '2': 'نَكْتُبُ',
    '3': 'نَكْتُبْ',
    '4': 'نَكْتُبَ',
    '5': 'نَكْتُبَنَّ',
    '6': '',
    '7': '',
    '8': 'كُتِبْنَا',
    '9': 'نُكْتَبُ',
    '10': 'نُكْتَبْ',
    '11': 'نُكْتَبَ',
    '12': 'نُكْتَبَنَّ',
  },
  '3': {
    '0': 'أنت',
    '1': 'كَتَبْتَ',
    '2': 'تَكْتُبُ',
    '3': 'تَكْتُبْ',
    '4': 'تَكْتُبَ',
    '5': 'تَكْتُبَنَّ',
    '6': 'اُكْتُبْ',
    '7': 'اُكْتُبَنَّ',
    '8': 'كُتِبْتَ',
    '9': 'تُكْتَبُ',
    '10': 'تُكْتَبْ',
    '11': 'تُكْتَبَ',
    '12': 'تُكْتَبَنَّ',
  },
  '4': {
    '0': 'أنتِ',
    '1': 'كَتَبْتِ',
    '2': 'تَكْتُبِينَ',
    '3': 'تَكْتُبِي',
    '4': 'تَكْتُبِي',
    '5': 'تَكْتُبِنَّ',
    '6': 'اُكْتُبِي',
    '7': 'اُكْتُبِنَّ',
    '8': 'كُتِبْتِ',
    '9': 'تُكْتَبِينَ',
    '10': 'تُكْتَبِي',
    '11': 'تُكْتَبِي',
    '12': 'تُكْتَبِنَّ',
  },
  '5': {
    '0': 'أنتما',
    '1': 'كَتَبْتُمَا',
    '2': 'تَكْتُبَانِ',
    '3': 'تَكْتُبَا',
    '4': 'تَكْتُبَا',
    '5': 'تَكْتُبَانِّ',
    '6': 'اُكْتُبَا',
    '7': 'اُكْتُبَانِّ',
    '8': 'كُتِبْتُمَا',
    '9': 'تُكْتَبَانِ',
    '10': 'تُكْتَبَا',
    '11': 'تُكْتَبَا',
    '12': 'تُكْتَبَانِّ',
  },
  '6': {
    '0': 'أنتما مؤ',
    '1': 'كَتَبْتُمَا',
    '2': 'تَكْتُبَانِ',
    '3': 'تَكْتُبَا',
    '4': 'تَكْتُبَا',
    '5': 'تَكْتُبَانِّ',
    '6': 'اُكْتُبَا',
    '7': 'اُكْتُبَانِّ',
    '8': 'كُتِبْتُمَا',
    '9': 'تُكْتَبَانِ',
    '10': 'تُكْتَبَا',
    '11': 'تُكْتَبَا',
    '12': 'تُكْتَبَانِّ',
  },
  '7': {
    '0': 'أنتم',
    '1': 'كَتَبْتُم',
    '2': 'تَكْتُبُونَ',
    '3': 'تَكْتُبُوا',
    '4': 'تَكْتُبُوا',
    '5': 'تَكْتُبُنَّ',
    '6': 'اُكْتُبُوا',
    '7': 'اُكْتُبُنَّ',
    '8': 'كُتِبْتُم',
    '9': 'تُكْتَبُونَ',
    '10': 'تُكْتَبُوا',
    '11': 'تُكْتَبُوا',
    '12': 'تُكْتَبُنَّ',
  },
  '8': {
    '0': 'أنتن',
    '1': 'كَتَبْتُنَّ',
    '2': 'تَكْتُبْنَ',
    '3': 'تَكْتُبْنَ',
    '4': 'تَكْتُبْنَ',
    '5': 'تَكْتُبْنَانِّ',
    '6': 'اُكْتُبْنَ',
    '7': 'اُكْتُبْنَانِّ',
    '8': 'كُتِبْتُنَّ',
    '9': 'تُكْتَبْنَ',
    '10': 'تُكْتَبْنَ',
    '11': 'تُكْتَبْنَ',
    '12': 'تُكْتَبْنَانِّ',
  },
  '9': {
    '0': 'هو',
    '1': 'كَتَبَ',
    '2': 'يَكْتُبُ',
    '3': 'يَكْتُبْ',
    '4': 'يَكْتُبَ',
    '5': 'يَكْتُبَنَّ',
    '6': '',
    '7': '',
    '8': 'كُتِبَ',
    '9': 'يُكْتَبُ',
    '10': 'يُكْتَبْ',
    '11': 'يُكْتَبَ',
    '12': 'يُكْتَبَنَّ',
  },
  '10': {
    '0': 'هي',
    '1': 'كَتَبَتْ',
    '2': 'تَكْتُبُ',
    '3': 'تَكْتُبْ',
    '4': 'تَكْتُبَ',
    '5': 'تَكْتُبَنَّ',
    '6': '',
    '7': '',
    '8': 'كُتِبَتْ',
    '9': 'تُكْتَبُ',
    '10': 'تُكْتَبْ',
    '11': 'تُكْتَبَ',
    '12': 'تُكْتَبَنَّ',
  },
  '11': {
    '0': 'هما',
    '1': 'كَتَبَا',
    '2': 'يَكْتُبَانِ',
    '3': 'يَكْتُبَا',
    '4': 'يَكْتُبَا',
    '5': 'يَكْتُبَانِّ',
    '6': '',
    '7': '',
    '8': 'كُتِبَا',
    '9': 'يُكْتَبَانِ',
    '10': 'يُكْتَبَا',
    '11': 'يُكْتَبَا',
    '12': 'يُكْتَبَانِّ',
  },
  '12': {
    '0': 'هما مؤ',
    '1': 'كَتَبَتَا',
    '2': 'تَكْتُبَانِ',
    '3': 'تَكْتُبَا',
    '4': 'تَكْتُبَا',
    '5': 'تَكْتُبَانِّ',
    '6': '',
    '7': '',
    '8': 'كُتِبَتَا',
    '9': 'تُكْتَبَانِ',
    '10': 'تُكْتَبَا',
    '11': 'تُكْتَبَا',
    '12': 'تُكْتَبَانِّ',
  },
  '13': {
    '0': 'هم',
    '1': 'كَتَبُوا',
    '2': 'يَكْتُبُونَ',
    '3': 'يَكْتُبُوا',
    '4': 'يَكْتُبُوا',
    '5': 'يَكْتُبُنَّ',
    '6': '',
    '7': '',
    '8': 'كُتِبُوا',
    '9': 'يُكْتَبُونَ',
    '10': 'يُكْتَبُوا',
    '11': 'يُكْتَبُوا',
    '12': 'يُكْتَبُنَّ',
  },
  '14': {
    '0': 'هن',
    '1': 'كَتَبْنَ',
    '2': 'يَكْتُبْنَ',
    '3': 'يَكْتُبْنَ',
    '4': 'يَكْتُبْنَ',
    '5': 'يَكْتُبْنَانِّ',
    '6': '',
    '7': '',
    '8': 'كُتِبْنَ',
    '9': 'يُكْتَبْنَ',
    '10': 'يُكْتَبْنَ',
    '11': 'يُكْتَبْنَ',
    '12': 'يُكْتَبْنَانِّ',
  },
}

let requestBody: unknown

const server = setupServer(
  http.post('https://qutrub.arabeyes.org/ajaxGet', async ({ request }) => {
    requestBody = await request.json()
    return HttpResponse.json({ result: QUTRUB_RESULT, suggest: [], verb_info: '' })
  }),
)

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  requestBody = undefined
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

describe('presentVowelOf', () => {
  test.each([
    ['a-u', 'u'],
    ['a-i', 'i'],
    ['i-a', 'a'],
  ])('reads the present vowel of the %s pattern', (pattern, expected) => {
    expect(presentVowelOf(pattern)).toBe(expected)
  })

  test('falls back to fatḥa for verbs whose form fixes the vowel', () => {
    expect(presentVowelOf('')).toBe('a')
  })
})

describe('fetchParadigms', () => {
  test('asks Qutrub to conjugate the lemma with the present vowel derived from the verb', async () => {
    await fetchParadigms(buildVerbFromId('ktb-1'))

    expect(requestBody).toEqual({
      data: { text: 'كَتَبَ', action: 'Conjugate', all: 1, transitive: 1, future_type: 'u' },
    })
  })

  test('maps every column Muṣarrif models, and leaves the energetic moods out', async () => {
    const parsed = await fetchParadigms(buildVerbFromId('ktb-1'))

    expect(Object.keys(parsed.paradigms)).toEqual([
      'active past',
      'active present indicative',
      'active present jussive',
      'active present subjunctive',
      'active imperative',
      'passive past',
      'passive present indicative',
      'passive present jussive',
      'passive present subjunctive',
    ])
    expect(parsed.nominals).toEqual({})
  })

  test('parses a full conjugation column, restoring the sukūn Qutrub drops on أنتم', async () => {
    const parsed = await fetchParadigms(buildVerbFromId('ktb-1'))

    expect(parsed.paradigms['active past']).toEqual({
      '1s': ['كَتَبْتُ'],
      '2ms': ['كَتَبْتَ'],
      '2fs': ['كَتَبْتِ'],
      '3ms': ['كَتَبَ'],
      '3fs': ['كَتَبَتْ'],
      '2d': ['كَتَبْتُمَا'],
      '3md': ['كَتَبَا'],
      '3fd': ['كَتَبَتَا'],
      '1p': ['كَتَبْنَا'],
      '2mp': ['كَتَبْتُمْ'],
      '2fp': ['كَتَبْتُنَّ'],
      '3mp': ['كَتَبُوا'],
      '3fp': ['كَتَبْنَ'],
    })
    expect(parsed.paradigms['passive past']?.['2mp']).toEqual(['كُتِبْتُمْ'])
  })

  test('keeps only the second-person cells of the imperative column', async () => {
    const parsed = await fetchParadigms(buildVerbFromId('ktb-1'))

    expect(parsed.paradigms['active imperative']).toEqual({
      '2ms': ['اُكْتُبْ'],
      '2fs': ['اُكْتُبِي'],
      '2d': ['اُكْتُبَا'],
      '2mp': ['اُكْتُبُوا'],
      '2fp': ['اُكْتُبْنَ'],
    })
  })

  test('reorders a shadda Qutrub writes before its vowel', async () => {
    // كَتَبْتُنَّ as Qutrub sends it — shadda ahead of the fatḥa, which NFC swaps
    const shaddaFirst = 'كَتَبْتُنَّ'
    server.use(
      http.post('https://qutrub.arabeyes.org/ajaxGet', () =>
        HttpResponse.json({
          result: { '0': { '0': 'الضمائر', '1': 'الماضي المعلوم' }, '1': { '0': 'أنتن', '1': shaddaFirst } },
        }),
      ),
    )

    const parsed = await fetchParadigms(buildVerbFromId('ktb-1'))

    expect(parsed.paradigms['active past']?.['2fp']).toEqual([shaddaFirst.normalize('NFC')])
  })

  test('reports an unusable response instead of writing an empty paradigm', async () => {
    server.use(http.post('https://qutrub.arabeyes.org/ajaxGet', () => HttpResponse.json({ result: {} })))

    await expect(fetchParadigms(buildVerbFromId('ktb-1'))).rejects.toThrow('Qutrub returned no conjugation for كَتَبَ')
  })
})
