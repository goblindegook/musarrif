import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest'
import { fetchParadigms } from './reverso.mts'

const REVERSO_HTML = `
<div class="blue-box-wrap" mobile-title="Active Past">
  <ul class="wrap-verbs-listing">
    <li><div><i class="graytxt">أَنَا</i><i h="1"><i class="verbtxt-term">كَتَبْتُ</i></i></div></li>
    <li><div><i class="graytxt">أَنْتَ</i><i h="1"><i class="verbtxt-term">كَتَبْتَ</i></i></div></li>
    <li><div><i class="graytxt">أَنْتِ</i><i h="1"><i class="verbtxt-term">كَتَبْتِ</i></i></div></li>
    <li><div><i class="graytxt">هُوَ</i><i h="1"><i class="verbtxt-term">كَتَبَ</i></i></div></li>
    <li><div><i class="graytxt">هِيَ</i><i h="1"><i class="verbtxt-term">كَتَبَتْ</i></i></div></li>
    <li><div><i class="graytxt">أَنْتُمَا</i><i h="1"><i class="verbtxt-term">كَتَبْتُمَا</i></i></div></li>
    <li><div><i class="graytxt">هُمَا</i><i h="1"><i class="verbtxt-term">كَتَبَا</i></i></div></li>
    <li><div><i class="graytxt">هُمَا</i><i h="1"><i class="verbtxt-term">كَتَبَتَا</i></i></div></li>
    <li><div><i class="graytxt">نَحْنُ</i><i h="1"><i class="verbtxt-term">كَتَبْنَا</i></i></div></li>
    <li><div><i class="graytxt">أَنْتُمْ</i><i h="1"><i class="verbtxt-term">كَتَبْتُمْ</i></i></div></li>
    <li><div><i class="graytxt">أَنْتُنَّ</i><i h="1"><i class="verbtxt-term">كَتَبْتُنَّ</i></i></div></li>
    <li><div><i class="graytxt">هُمْ</i><i h="1"><i class="verbtxt-term">كَتَبُوا</i></i></div></li>
    <li><div><i class="graytxt">هُنَّ</i><i h="1"><i class="verbtxt-term">كَتَبْنَ</i></i></div></li>
  </ul>
</div>
<div class="blue-box-wrap" mobile-title="Imperative ">
  <ul class="wrap-verbs-listing">
    <li><div><i class="graytxt">أَنْتَ</i><i h="1"><i class="verbtxt-term">اُكْتُبْ</i></i></div></li>
    <li><div><i class="graytxt">أَنْتِ</i><i h="1"><i class="verbtxt-term">اُكْتُبِي</i></i></div></li>
    <li><div><i class="graytxt">أَنْتُمَا</i><i h="1"><i class="verbtxt-term">اُكْتُبَا</i></i></div></li>
    <li><div><i class="graytxt">أَنْتُمْ</i><i h="1"><i class="verbtxt-term">اُكْتُبُوا</i></i></div></li>
    <li><div><i class="graytxt">أَنْتُنَّ</i><i h="1"><i class="verbtxt-term">اُكْتُبْنَ</i></i></div></li>
  </ul>
</div>
<div class="blue-box-wrap alt-tense" mobile-title="Participles Active">
  <ul class="wrap-verbs-listing">
    <li><div><i h="1"><i class="verbtxt-term">كَاتِب</i></i></div></li>
  </ul>
</div>
<div class="blue-box-wrap alt-tense" mobile-title="Participles Passive">
  <ul class="wrap-verbs-listing">
    <li><div><i h="1"><i class="verbtxt-term">مَكْتُوب</i></i></div></li>
  </ul>
</div>
<div class="blue-box-wrap" mobile-title="Verbal noun ">
  <ul class="wrap-verbs-listing">
    <li><div><i h="1"><i class="verbtxt-term">كِتَابَة<span class="variants">/كَتْب/كِتَاب</span></i></i></div></li>
  </ul>
</div>
`

let requestUrl = ''
let requestHeaders:
  | {
      accept: string | null
      acceptLanguage: string | null
      userAgent: string | null
    }
  | undefined

const server = setupServer(
  http.get('https://conjugator.reverso.net/conjugation-arabic-verb-:lemma.html', ({ request }) => {
    requestUrl = request.url
    requestHeaders = {
      accept: request.headers.get('accept'),
      acceptLanguage: request.headers.get('accept-language'),
      userAgent: request.headers.get('user-agent'),
    }
    return new HttpResponse(REVERSO_HTML, {
      headers: { 'content-type': 'text/html; charset=utf-8' },
      status: 200,
    })
  }),
)

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  requestUrl = ''
  requestHeaders = undefined
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

describe('fetchParadigms', () => {
  test('fetches and parses nominals and paradigms for the requested lemma', async () => {
    const parsed = await fetchParadigms('كَتَبَ')

    expect(parsed.nominals).toEqual({
      activeParticiple: 'كَاتِب',
      passiveParticiple: 'مَكْتُوب',
      masdar: ['كِتَابَة', 'كَتْب', 'كِتَاب'],
    })

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

    expect(parsed.paradigms['active imperative']).toEqual({
      '2ms': ['اُكْتُبْ'],
      '2fs': ['اُكْتُبِي'],
      '2d': ['اُكْتُبَا'],
      '2mp': ['اُكْتُبُوا'],
      '2fp': ['اُكْتُبْنَ'],
    })

    expect(requestUrl).toBe(
      'https://conjugator.reverso.net/conjugation-arabic-verb-%D9%83%D9%8E%D8%AA%D9%8E%D8%A8%D9%8E.html',
    )
    expect(requestHeaders).toEqual({
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      acceptLanguage: 'en-US,en;q=0.9',
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36',
    })
  })

  test('ignores variants span in conjugation cells', async () => {
    const htmlWithAlternatives = REVERSO_HTML.replace(
      '<i class="verbtxt-term">كَتَبْتُ</i>',
      '<i class="verbtxt-term">كَتَبْتُ<span class="variants">/alt1/alt2</span></i>',
    )

    server.use(
      http.get('https://conjugator.reverso.net/conjugation-arabic-verb-:lemma.html', () => {
        return new HttpResponse(htmlWithAlternatives, {
          headers: { 'content-type': 'text/html; charset=utf-8' },
          status: 200,
        })
      }),
    )

    const parsed = await fetchParadigms('كَتَبَ')
    expect(parsed.paradigms['active past']?.['1s']).toEqual(['كَتَبْتُ'])
  })

  test('normalizes diacritics ordering in extracted forms', async () => {
    // shadda (U+0651) before fatha (U+064E) — non-NFC order
    const unnormalized = 'كَتَبَّتُ'
    const htmlWithUnnormalized = REVERSO_HTML.replace('كَتَبْتُ', unnormalized)

    server.use(
      http.get('https://conjugator.reverso.net/conjugation-arabic-verb-:lemma.html', () => {
        return new HttpResponse(htmlWithUnnormalized, {
          headers: { 'content-type': 'text/html; charset=utf-8' },
          status: 200,
        })
      }),
    )

    const parsed = await fetchParadigms('كَتَبَ')
    expect(parsed.paradigms['active past']?.['1s']).toEqual([unnormalized.trim().normalize('NFC')])
  })

  test('throws the HTTP status when Reverso rejects the request', async () => {
    server.use(
      http.get('https://conjugator.reverso.net/conjugation-arabic-verb-:lemma.html', () => {
        return new HttpResponse('too many requests', { status: 429 })
      }),
    )

    await expect(fetchParadigms('كَتَبَ')).rejects.toThrow(
      'Failed to fetch Reverso page (429): https://conjugator.reverso.net/conjugation-arabic-verb-%D9%83%D9%8E%D8%AA%D9%8E%D8%A8%D9%8E.html',
    )
  })
})
