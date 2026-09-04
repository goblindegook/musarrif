const priorityFor = (path: string) => (path === '/' ? '1.0' : path === '/verbs/' ? '0.8' : '0.6')

export function renderSitemap(paths: readonly string[], origin: string): string {
  const entries = ['/', ...paths].map((path) => {
    const loc = `${origin}${path}`.replaceAll('&', '&amp;')
    return `  <url><loc>${loc}</loc><priority>${priorityFor(path)}</priority></url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`
}
