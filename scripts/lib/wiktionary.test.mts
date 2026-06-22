import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest'
import { fetchParadigms } from './wiktionary.mts'

const WIKTIONARY_HTML = `
<div class="mw-heading mw-heading2"><h2 id="Arabic">Arabic</h2></div>
<div class="mw-heading mw-heading5"><h5 id="Conjugation">Conjugation</h5></div>
<div class="inflection-table-wrapper" data-toggle-category="conjugation">
<table class="inflection-table">
<caption class="inflection-table-title">Conjugation of <i class="Arab mention" lang="ar"><strong>كَتَبَ</strong></i> (I, sound)</caption>
<tbody>
<tr>
<th colspan="6">verbal noun</th>
<td colspan="7"><span class="Arab">كِتَابَة</span>, <span class="Arab">كَتْب</span>, <span class="Arab">كِتَاب</span></td>
</tr>
<tr>
<th colspan="6">active participle</th>
<td colspan="7"><span class="Arab">كَاتِب</span></td>
</tr>
<tr>
<th colspan="6">passive participle</th>
<td colspan="7"><span class="Arab">مَكْتُوب</span></td>
</tr>
<tr><th colspan="12" class="outer">active voice</th></tr>
<tr><th colspan="2"></th><th colspan="3">singular</th><th rowspan="12" class="separator"></th><th colspan="2">dual</th><th rowspan="12" class="separator"></th><th colspan="3">plural</th></tr>
<tr><th colspan="2"></th><th>1st</th><th>2nd</th><th>3rd</th><th>2nd</th><th>3rd</th><th>1st</th><th>2nd</th><th>3rd</th></tr>
<tr>
<th rowspan="2">past (perfect) indicative</th>
<th class="secondary">m</th>
<td rowspan="2"><span class="Arab">كَتَبْتُ</span></td>
<td><span class="Arab">كَتَبْتَ</span></td>
<td><span class="Arab">كَتَبَ</span></td>
<td rowspan="2"><span class="Arab">كَتَبْتُمَا</span></td>
<td><span class="Arab">كَتَبَا</span></td>
<td rowspan="2"><span class="Arab">كَتَبْنَا</span></td>
<td><span class="Arab">كَتَبْتُمْ</span></td>
<td><span class="Arab">كَتَبُوا</span></td>
</tr>
<tr>
<th class="secondary">f</th>
<td><span class="Arab">كَتَبْتِ</span></td>
<td><span class="Arab">كَتَبَتْ</span></td>
<td><span class="Arab">كَتَبَتَا</span></td>
<td><span class="Arab">كَتَبْتُنَّ</span></td>
<td><span class="Arab">كَتَبْنَ</span></td>
</tr>
<tr>
<th rowspan="2">imperative</th>
<th class="secondary">m</th>
<td rowspan="2"></td>
<td><span class="Arab">اُكْتُبْ</span></td>
<td rowspan="2"></td>
<td rowspan="2"><span class="Arab">اُكْتُبَا</span></td>
<td rowspan="2"></td>
<td rowspan="2"></td>
<td><span class="Arab">اُكْتُبُوا</span></td>
<td rowspan="2"></td>
</tr>
<tr>
<th class="secondary">f</th>
<td><span class="Arab">اُكْتُبِي</span></td>
<td><span class="Arab">اُكْتُبْنَ</span></td>
</tr>
<tr><th colspan="12" class="outer">passive voice</th></tr>
<tr><th colspan="2"></th><th colspan="3">singular</th><th rowspan="10" class="separator"></th><th colspan="2">dual</th><th rowspan="10" class="separator"></th><th colspan="3">plural</th></tr>
<tr><th colspan="2"></th><th>1st</th><th>2nd</th><th>3rd</th><th>2nd</th><th>3rd</th><th>1st</th><th>2nd</th><th>3rd</th></tr>
<tr>
<th rowspan="2">past (perfect) indicative</th>
<th class="secondary">m</th>
<td rowspan="2"><span class="Arab">كُتِبْتُ</span></td>
<td><span class="Arab">كُتِبْتَ</span></td>
<td><span class="Arab">كُتِبَ</span></td>
<td rowspan="2"><span class="Arab">كُتِبْتُمَا</span></td>
<td><span class="Arab">كُتِبَا</span></td>
<td rowspan="2"><span class="Arab">كُتِبْنَا</span></td>
<td><span class="Arab">كُتِبْتُمْ</span></td>
<td><span class="Arab">كُتِبُوا</span></td>
</tr>
<tr>
<th class="secondary">f</th>
<td><span class="Arab">كُتِبْتِ</span></td>
<td><span class="Arab">كُتِبَتْ</span></td>
<td><span class="Arab">كُتِبَتَا</span></td>
<td><span class="Arab">كُتِبْتُنَّ</span></td>
<td><span class="Arab">كُتِبْنَ</span></td>
</tr>
</tbody>
</table>
</div>
<div class="mw-heading mw-heading2"><h2 id="Chadian_Arabic">Chadian Arabic</h2></div>
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
  http.get('https://en.wiktionary.org/wiki/:title', ({ request }) => {
    requestUrl = request.url
    requestHeaders = {
      accept: request.headers.get('accept'),
      acceptLanguage: request.headers.get('accept-language'),
      userAgent: request.headers.get('user-agent'),
    }

    return new HttpResponse(WIKTIONARY_HTML, {
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
    const parsed = await fetchParadigms('كتب')

    expect(parsed.nominals).toEqual({
      activeParticiple: 'كَاتِب',
      masdar: ['كِتَابَة', 'كَتْب', 'كِتَاب'],
      passiveParticiple: 'مَكْتُوب',
    })

    expect(parsed.paradigms['active past']).toEqual({
      '1s': 'كَتَبْتُ',
      '1p': 'كَتَبْنَا',
      '2ms': 'كَتَبْتَ',
      '2fs': 'كَتَبْتِ',
      '2d': 'كَتَبْتُمَا',
      '2mp': 'كَتَبْتُمْ',
      '2fp': 'كَتَبْتُنَّ',
      '3ms': 'كَتَبَ',
      '3fs': 'كَتَبَتْ',
      '3md': 'كَتَبَا',
      '3fd': 'كَتَبَتَا',
      '3mp': 'كَتَبُوا',
      '3fp': 'كَتَبْنَ',
    })

    expect(parsed.paradigms['active imperative']).toEqual({
      '2ms': 'اُكْتُبْ',
      '2fs': 'اُكْتُبِي',
      '2d': 'اُكْتُبَا',
      '2mp': 'اُكْتُبُوا',
      '2fp': 'اُكْتُبْنَ',
    })

    expect(parsed.paradigms['passive past']).toEqual({
      '1s': 'كُتِبْتُ',
      '1p': 'كُتِبْنَا',
      '2ms': 'كُتِبْتَ',
      '2fs': 'كُتِبْتِ',
      '2d': 'كُتِبْتُمَا',
      '2mp': 'كُتِبْتُمْ',
      '2fp': 'كُتِبْتُنَّ',
      '3ms': 'كُتِبَ',
      '3fs': 'كُتِبَتْ',
      '3md': 'كُتِبَا',
      '3fd': 'كُتِبَتَا',
      '3mp': 'كُتِبُوا',
      '3fp': 'كُتِبْنَ',
    })

    expect(requestUrl).toBe('https://en.wiktionary.org/wiki/%D9%83%D8%AA%D8%A8')
    expect(requestHeaders).toEqual({
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      acceptLanguage: 'en',
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36',
    })
  })

  test('finds conjugation tables when heading level is h4', async () => {
    const htmlWithH4 = WIKTIONARY_HTML.replace(
      '<div class="mw-heading mw-heading5"><h5 id="Conjugation">Conjugation</h5></div>',
      '<div class="mw-heading mw-heading4"><h4 id="Conjugation">Conjugation</h4></div>',
    )

    server.use(
      http.get('https://en.wiktionary.org/wiki/:title', () => {
        return new HttpResponse(htmlWithH4, {
          headers: { 'content-type': 'text/html; charset=utf-8' },
          status: 200,
        })
      }),
    )

    const parsed = await fetchParadigms('كتب')
    expect(parsed.paradigms['active past']?.['3ms']).toBe('كَتَبَ')
  })

  test('throws the HTTP status when Wiktionary rejects the request', async () => {
    server.use(
      http.get('https://en.wiktionary.org/wiki/:title', () => {
        return new HttpResponse('too many requests', { status: 429 })
      }),
    )

    await expect(fetchParadigms('كتب')).rejects.toThrow(
      'Failed to fetch Wiktionary page (429): https://en.wiktionary.org/wiki/%D9%83%D8%AA%D8%A8',
    )
  })
})
