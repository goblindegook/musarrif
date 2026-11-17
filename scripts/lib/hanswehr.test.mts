import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'
import { HttpResponse, http } from 'msw/http'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { lookupRoot } from './hanswehr.mts'

const BASE_URL = 'https://hanswehr.app/dict/'

const DATASET = [
  {
    root: 'روح / ريح',
    searchableRoots: ['روح'],
    forms: [
      {
        text: 'رَوَّحَ',
        form: 'II',
        transliteration: 'rawwaḥa',
        translation: { text: 'to fan (air); <i>rayyaḥa </i>to give (ه‎ s. o.) rest' },
      },
      {
        text: 'أَرْوَح',
        form: 'IV',
        transliteration: 'arwaḥa',
        translation: { text: 'to stink, smell bad' },
      },
    ],
  },
  {
    root: 'أدم',
    searchableRoots: ['ادم'],
    forms: [{ text: 'أدمة', form: 'I', transliteration: 'adama', translation: { text: 'skin' } }],
  },
]

const requests: string[] = []
const originalCwd = process.cwd()
let cacheCwd: string | undefined

const server = setupServer(
  http.get(`${BASE_URL}manifest.json`, () => {
    requests.push('manifest')
    return HttpResponse.json({ url_gz: 'hans_wehr.v1.abc.json.gz' })
  }),
  http.get(`${BASE_URL}hans_wehr.v1.abc.json.gz`, () => {
    requests.push('dataset')
    return new HttpResponse(gzipSync(JSON.stringify(DATASET)), { status: 200 })
  }),
)

beforeAll(() => {
  server.listen({ onUnhandledFrame: 'error' })
})

beforeEach(() => {
  cacheCwd = mkdtempSync(join(tmpdir(), 'musarrif-hanswehr-cache-'))
  process.chdir(cacheCwd)
})

afterEach(() => {
  requests.length = 0
  server.resetHandlers()
  if (cacheCwd) {
    process.chdir(originalCwd)
    rmSync(cacheCwd, { recursive: true, force: true })
  }
  cacheCwd = undefined
})

afterAll(() => {
  server.close()
})

describe('lookupRoot', () => {
  test('returns each form of the root with its markup and direction marks stripped', async () => {
    expect(await lookupRoot('روح')).toEqual([
      { roman: 'II', lemma: 'رَوَّحَ', translit: 'rawwaḥa', gloss: 'to fan (air); rayyaḥa to give (ه s. o.) rest' },
      { roman: 'IV', lemma: 'أَرْوَح', translit: 'arwaḥa', gloss: 'to stink, smell bad' },
    ])
  })

  test('matches a hamzated root against the alif Hans Wehr files it under', async () => {
    expect(await lookupRoot('أدم')).toMatchObject([{ roman: 'I', gloss: 'skin' }])
  })

  test('returns nothing for a root the dictionary does not hold', async () => {
    expect(await lookupRoot('كتب')).toEqual([])
  })

  test('downloads the dataset once and reuses the cached copy', async () => {
    await lookupRoot('روح')
    await lookupRoot('أدم')

    expect(requests.filter((request) => request === 'dataset')).toHaveLength(1)
  })
})
