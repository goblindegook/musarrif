import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest'
import { buildVerbFromId } from '../../src/paradigms/verbs'
import { fetchParadigms } from './elixirfm.mts'

const ELIXIR_URL = 'https://quest.ms.mff.cuni.cz/cgi-bin/elixir/index.fcgi'

const RESOLVE_HTML = `
<table cellspacing="0" class="lexeme">
  <tr>
    <td class="xtag" title="verb">V</td>
    <td class="phon" title="citation form">katab</td>
    <td class="orth" title="citation form">كَتَبَ</td>
    <td class="morphs" title="morphs of citation form">FaCaL</td>
    <td class="class" title="derivational class">I</td>
    <td class="reflex" title="lexical reference">"write"</td>
    <td class="button"><a href="index.fcgi?mode=inflect&amp;clip=(111,2)" title="inflect this lexeme">Inflect</a></td>
  </tr>
</table>
<table cellspacing="0" class="lexeme">
  <tr>
    <td class="xtag" title="verb">V</td>
    <td class="phon" title="citation form">tadahraj</td>
    <td class="orth" title="citation form">تَدَحْرَجَ</td>
    <td class="morphs" title="morphs of citation form">TaKaRDaS</td>
    <td class="class" title="derivational class">IVq</td>
    <td class="reflex" title="lexical reference">"roll"</td>
    <td class="button"><a href="index.fcgi?mode=inflect&amp;clip=(333,4)" title="inflect this lexeme">Inflect</a></td>
  </tr>
</table>
`

const INFLECT_HTML = `
<table cellspacing="0">
  <tr><td class="xtag" title="perfective verb, active voice, first person, masculine gender, singular number">VP-A-1MS--</td><td class="orth" title="inflected form">كَتَبْتُ</td></tr>
  <tr><td class="xtag" title="perfective verb, active voice, second person, masculine gender, singular number">VP-A-2MS--</td><td class="orth" title="inflected form">كَتَبْتَ</td></tr>
  <tr><td class="xtag" title="perfective verb, active voice, third person, masculine gender, singular number">VP-A-3MS--</td><td class="orth" title="inflected form">كَتَبَ</td></tr>
  <tr><td class="xtag" title="imperfective verb, active voice, first person, masculine gender, singular number">VIIA-1MS--</td><td class="orth" title="inflected form">أَكْتُبُ</td></tr>
  <tr><td class="xtag" title="imperfective verb, active voice, second person, masculine gender, singular number">VIIA-2MS--</td><td class="orth" title="inflected form">تَكْتُبُ</td></tr>
  <tr><td class="xtag" title="imperfective verb, active voice, third person, masculine gender, singular number">VIIA-3MS--</td><td class="orth" title="inflected form">يَكْتُبُ</td></tr>
  <tr><td class="xtag" title="imperative verb, jussive mood, masculine gender, singular number">VCJ---MS--</td><td class="orth" title="inflected form">اُكْتُبْ</td></tr>
  <tr><td class="xtag" title="imperative verb, jussive mood, feminine gender, singular number">VCJ---FS--</td><td class="orth" title="inflected form">اُكْتُبِي</td></tr>
  <tr><td class="xtag" title="imperative verb, jussive mood, masculine gender, dual number">VCJ---MD--</td><td class="orth" title="inflected form">اُكْتُبَا</td></tr>
  <tr><td class="xtag" title="perfective verb, passive voice, third person, masculine gender, singular number">VP-P-3MS--</td><td class="orth" title="inflected form">كُتِبَ</td></tr>
</table>
`

const DERIVE_HTML = `
<table cellspacing="0">
  <tr><td class="xtag" title="noun">N---------</td><td class="orth" title="derived form">كِتَابَة</td></tr>
  <tr><td class="xtag" title="adjective, active voice">A--A------</td><td class="orth" title="derived form">كَاتِب</td></tr>
  <tr><td class="xtag" title="adjective, passive voice">A--P------</td><td class="orth" title="derived form">مَكْتُوب</td></tr>
</table>
`

const requests: Array<Record<string, string>> = []

const server = setupServer(
  http.post(ELIXIR_URL, async ({ request }) => {
    const params = new URLSearchParams(await request.text())
    const data = Object.fromEntries(params.entries())
    requests.push(data)

    if (data.mode === 'resolve') return new HttpResponse(RESOLVE_HTML, { status: 200 })
    if (data.mode === 'inflect') return new HttpResponse(INFLECT_HTML, { status: 200 })
    if (data.mode === 'derive') return new HttpResponse(DERIVE_HTML, { status: 200 })

    return new HttpResponse('unexpected request', { status: 500 })
  }),
)

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  requests.length = 0
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

describe('fetchElixirFmParadigms', () => {
  test('parses resolved, inflected, and derived forms through the public loader', async () => {
    const paradigms = await fetchParadigms(buildVerbFromId('ktb-1'))

    expect(paradigms).toEqual({
      paradigms: {
        'active past': {
          '1s': ['كَتَبْتُ'],
          '2ms': ['كَتَبْتَ'],
          '3ms': ['كَتَبَ'],
        },
        'active present indicative': {
          '1s': ['أَكْتُبُ'],
          '2ms': ['تَكْتُبُ'],
          '3ms': ['يَكْتُبُ'],
        },
        'active imperative': {
          '2ms': ['اُكْتُبْ'],
          '2fs': ['اُكْتُبِي'],
          '2d': ['اُكْتُبَا'],
        },
        'passive past': {
          '3ms': ['كُتِبَ'],
        },
      },
      nominals: {
        activeParticiple: 'كَاتِب',
        masdar: ['كِتَابَة'],
        passiveParticiple: 'مَكْتُوب',
      },
    })

    expect(requests).toEqual([
      {
        code: 'Unicode',
        mode: 'resolve',
        submit: 'Resolve',
        text: 'كَتَبَ',
      },
      {
        clip: '(111,2)',
        mode: 'inflect',
        submit: 'Inflect',
        text: 'perfect imperfect active passive imperative',
      },
      {
        clip: '(111,2)',
        mode: 'derive',
        submit: 'Derive',
        text: 'verb noun adjective',
      },
    ])
  })

  test('selects the entry matching the verb form', async () => {
    const paradigms = await fetchParadigms(buildVerbFromId('dHrj-4'))

    expect(paradigms).toMatchObject({
      nominals: { masdar: ['كِتَابَة'] },
      paradigms: {
        'active past': {
          '1s': ['كَتَبْتُ'],
          '3ms': ['كَتَبَ'],
        },
      },
    })

    expect(requests).toEqual([
      {
        code: 'Unicode',
        mode: 'resolve',
        submit: 'Resolve',
        text: 'اِدْحَرَجَّ',
      },
      {
        clip: '(333,4)',
        mode: 'inflect',
        submit: 'Inflect',
        text: 'perfect imperfect active passive imperative',
      },
      {
        clip: '(333,4)',
        mode: 'derive',
        submit: 'Derive',
        text: 'verb noun adjective',
      },
    ])
  })
})
