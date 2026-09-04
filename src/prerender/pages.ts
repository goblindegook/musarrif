import { type DisplayVerb, formatFormLabel, verbs } from '../paradigms/verbs'
import enVerbs from '../ui/locales/en.verbs.json'

interface PrerenderPage {
  path: string
  file: string
  route: readonly string[]
  canonical: string
  description: string
  staticMarkup?: string
}

interface RenderedPage {
  title: string
  stylesheetHref: string
  assetTags: string
  markup: string
}

function escapeHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
}

function renderVerbIndex(entries: readonly { id: string; lemma: string }[]): string {
  const items = entries
    .map(
      ({ id, lemma }) =>
        `<li><a href="/verbs/${encodeURIComponent(id)}/" lang="ar" dir="rtl">${escapeHtml(lemma)}</a></li>`,
    )
    .join('')
  return `<nav aria-label="All verbs"><ul>${items}</ul></nav>`
}

export function renderDocument(
  page: PrerenderPage,
  { title, stylesheetHref, assetTags, markup }: RenderedPage,
  origin: string,
): string {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Muṣarrif', item: `${origin}/` },
      { '@type': 'ListItem', position: 2, name: 'Verbs', item: `${origin}/verbs/` },
      ...(page.path === '/verbs/' ? [] : [{ '@type': 'ListItem', position: 3, name: title, item: page.canonical }]),
    ],
  }

  return `<!doctype html>
<html lang="en" dir="ltr" data-app-route>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="#f6f3ec" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <link rel="canonical" href="${escapeHtml(page.canonical)}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Muṣarrif" />
    <meta property="og:url" content="${escapeHtml(page.canonical)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:image" content="${origin}/icon.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <link rel="stylesheet" href="${escapeHtml(stylesheetHref)}" />
    <script type="application/ld+json">${JSON.stringify(structuredData)}</script>
  </head>
  <body>
    <div id="app">${markup}</div>
    ${assetTags}
  </body>
</html>
`
}

function verbPagePath(verbId: string): string {
  return `/verbs/${encodeURIComponent(verbId)}/`
}

function verbPageFile(verbId: string): string {
  return `verbs/${verbId}/index.html`
}

function canonicalUrl(path: string, origin: string): string {
  return `${origin}${path}`
}

function pageDescription(verb: DisplayVerb, gloss: string | undefined): string {
  const subject = gloss ? `${verb.lemma} (${gloss})` : verb.lemma
  const form = formatFormLabel(verb.form, verb.root)
  const root = Array.from(verb.root).join('-')
  return `Conjugate ${subject}, an Arabic Form ${form} verb from the root ${root}. Full active and passive tables for every tense and mood, plus verbal noun and participles.`
}

export function prerenderPages(origin: string): PrerenderPage[] {
  const glosses: Record<string, string> = enVerbs.verbs
  return [
    {
      path: '/verbs/',
      file: 'verbs/index.html',
      route: ['verbs'],
      canonical: canonicalUrl('/verbs/', origin),
      description:
        'Browse every Arabic verb in Muṣarrif: triliteral Forms I-X and quadriliteral Forms Iq-IVq, with full conjugation tables for each.',
      staticMarkup: renderVerbIndex(verbs.map(({ id, lemma }) => ({ id, lemma: String(lemma) }))),
    },
    ...verbs.map((verb) => {
      const path = verbPagePath(verb.id)
      return {
        path,
        file: verbPageFile(verb.id),
        route: ['verbs', verb.id],
        canonical: canonicalUrl(path, origin),
        description: pageDescription(verb, glosses[verb.id]),
      }
    }),
  ]
}
