import { describe, expect, test } from 'vitest'
import { verbs } from '../paradigms/verbs'
import { prerenderPages, renderDocument } from './pages'
import { renderSitemap } from './sitemap'

const verbPage = prerenderPages('http://localhost').find((page) => page.path === '/verbs/ktb-1/')!
const renderedPage = {
  title: 'كَتَبَ · Muṣarrif',
  stylesheetHref: '/assets/prerender-abc123.css',
  assetTags: '<script type="module" crossorigin src="/assets/index-x.js"></script>',
  markup: '<main><h1>كَتَبَ</h1></main>',
}

describe('renderDocument', () => {
  test('opens with a doctype and an English document', () => {
    expect(renderDocument(verbPage, renderedPage, 'http://localhost')).toMatch(
      /^<!doctype html>\n<html lang="en" dir="ltr" data-app-route>/,
    )
  })

  test('carries the title, description and canonical', () => {
    const html = renderDocument(verbPage, renderedPage, 'http://localhost')

    expect(html).toContain('<title>كَتَبَ · Muṣarrif</title>')
    expect(html).toContain(
      '<meta name="description" content="Conjugate كَتَبَ (to write), an Arabic Form I verb from the root ك-ت-ب. Full active and passive tables for every tense and mood, plus verbal noun and participles." />',
    )
    expect(html).toContain('<link rel="canonical" href="http://localhost/verbs/ktb-1/" />')
  })

  test('escapes markup-significant characters in the rendered title', () => {
    const html = renderDocument(
      verbPage,
      { ...renderedPage, title: 'Quotes " and <angles> & ampersands' },
      'http://localhost',
    )

    expect(html).toContain('<title>Quotes &quot; and &lt;angles&gt; &amp; ampersands</title>')
  })

  test('links the shared stylesheet and the built app assets', () => {
    const html = renderDocument(verbPage, renderedPage, 'http://localhost')

    expect(html).toContain('<link rel="stylesheet" href="/assets/prerender-abc123.css" />')
    expect(html).toContain(renderedPage.assetTags)
  })

  test('places the markup inside the app root', () => {
    expect(renderDocument(verbPage, renderedPage, 'http://localhost')).toContain(
      '<div id="app"><main><h1>كَتَبَ</h1></main></div>',
    )
  })

  test('embeds the page breadcrumbs as JSON-LD', () => {
    expect(renderDocument(verbPage, renderedPage, 'http://localhost')).toContain(
      '<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Muṣarrif","item":"http://localhost/"},{"@type":"ListItem","position":2,"name":"Verbs","item":"http://localhost/verbs/"},{"@type":"ListItem","position":3,"name":"كَتَبَ · Muṣarrif","item":"http://localhost/verbs/ktb-1/"}]}</script>',
    )
  })

  test('closes the document', () => {
    expect(renderDocument(verbPage, renderedPage, 'http://localhost').trimEnd().endsWith('</html>')).toBe(true)
  })
})

describe('renderSitemap', () => {
  test('lists every path as an absolute canonical URL', () => {
    expect(renderSitemap(['/verbs/', '/verbs/ktb-1/'], 'http://localhost')).toBe(
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        '  <url><loc>http://localhost/</loc><priority>1.0</priority></url>\n' +
        '  <url><loc>http://localhost/verbs/</loc><priority>0.8</priority></url>\n' +
        '  <url><loc>http://localhost/verbs/ktb-1/</loc><priority>0.6</priority></url>\n' +
        '</urlset>\n',
    )
  })

  test('escapes ampersands so the XML stays well formed', () => {
    expect(renderSitemap(['/verbs/a&b-1/'], 'http://localhost')).toContain(
      '<loc>http://localhost/verbs/a&amp;b-1/</loc>',
    )
  })
})

describe('prerenderPages', () => {
  const pages = prerenderPages('http://localhost')

  test('emits the verb index plus one page per verb', () => {
    expect(pages).toHaveLength(verbs.length + 1)
  })

  test('starts with the verb index', () => {
    expect(pages[0]).toEqual({
      path: '/verbs/',
      file: 'verbs/index.html',
      route: ['verbs'],
      canonical: 'http://localhost/verbs/',
      description:
        'Browse every Arabic verb in Muṣarrif: triliteral Forms I-X and quadriliteral Forms Iq-IVq, with full conjugation tables for each.',
      staticMarkup: expect.any(String),
    })
  })

  test('adds a crawlable link for every verb to the index', () => {
    const markup = pages[0]!.staticMarkup!

    expect(markup.match(/<li>/g)).toHaveLength(verbs.length)
    expect(markup).toContain('<li><a href="/verbs/%24dd-1/" lang="ar" dir="rtl">شَدَّ</a></li>')
  })

  test('emits a page for every verb exactly once', () => {
    const verbPaths = pages.slice(1).map((page) => page.path)

    expect(new Set(verbPaths).size).toBe(verbs.length)
  })

  test('describes where and how to render each verb page', () => {
    const page = pages.find((candidate) => candidate.path === '/verbs/ktb-1/')!

    expect(page).toEqual({
      path: '/verbs/ktb-1/',
      file: 'verbs/ktb-1/index.html',
      route: ['verbs', 'ktb-1'],
      canonical: 'http://localhost/verbs/ktb-1/',
      description:
        'Conjugate كَتَبَ (to write), an Arabic Form I verb from the root ك-ت-ب. Full active and passive tables for every tense and mood, plus verbal noun and participles.',
    })
  })

  test('encodes route paths while preserving host filenames', () => {
    expect(pages.find((candidate) => candidate.file === 'verbs/$dd-1/index.html')).toMatchObject({
      path: '/verbs/%24dd-1/',
      canonical: 'http://localhost/verbs/%24dd-1/',
    })
  })

  test('uses quadriliteral form labels in page descriptions', () => {
    expect(pages.find((candidate) => candidate.path === '/verbs/zlzl-1/')?.description).toBe(
      'Conjugate زَلْزَلَ (to shake), an Arabic Form Iq verb from the root ز-ل-ز-ل. Full active and passive tables for every tense and mood, plus verbal noun and participles.',
    )
  })

  test('gives every page a non-empty description', () => {
    expect(pages.filter((page) => page.description.length > 0)).toHaveLength(pages.length)
  })

  test('gives no two pages the same description', () => {
    expect(new Set(pages.map((page) => page.description)).size).toBe(pages.length)
  })
})
