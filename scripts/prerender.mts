import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { Window } from 'happy-dom'
import { prerenderPages, renderDocument } from '../src/prerender/pages'
import { renderSitemap } from '../src/prerender/sitemap'

const DIST = 'dist'
const ORIGIN = 'https://musarrif.com'

const window = new Window({ url: `${ORIGIN}/` })

const DOM_GLOBALS = ['document', 'window', 'DOMParser', 'HTMLElement', 'StorageEvent', 'PopStateEvent']

for (const key of DOM_GLOBALS) {
  const value = (window as never as Record<string, unknown>)[key]
  if (value === undefined) continue
  Object.defineProperty(globalThis, key, { value, configurable: true, writable: true })
}

const indexHtml = readFileSync(join(DIST, 'index.html'), 'utf8')
const assetTags = Array.from(
  indexHtml.matchAll(/<script[^>]*type="module"[^>]*><\/script>|<link[^>]*rel="stylesheet"[^>]*>/g),
)
  .map((match) => match[0])
  .join('\n    ')

if (assetTags === '') throw new Error('No built asset tags found in dist/index.html')

const { extractCss, renderInto } = await import('../src/prerender/render')

const container = window.document.createElement('div')
const renderTarget = container as unknown as Element
window.document.body.appendChild(container)
const pages = prerenderPages(ORIGIN)

const renderPage = (page: (typeof pages)[number]) => {
  window.happyDOM.setURL(page.canonical)
  renderInto(renderTarget)
  const snapshot = container.cloneNode(true) as typeof container
  for (const omitted of snapshot.querySelectorAll('[data-prerender="omit"]')) omitted.remove()

  return {
    page,
    title: window.document.title || '',
    markup: `${snapshot.innerHTML}${page.staticMarkup ?? ''}`,
  }
}

const warnAboutCaseCollisions = (files: readonly string[]) => {
  if (!existsSync(join(DIST, 'INDEX.HTML'))) return

  const byLower = new Map<string, string[]>()
  for (const file of files) {
    const key = file.toLowerCase()
    byLower.set(key, [...(byLower.get(key) ?? []), file])
  }
  const collisions = Array.from(byLower.values()).filter((group) => group.length > 1)
  if (collisions.length === 0) return

  const lost = collisions.reduce((total, group) => total + group.length - 1, 0)
  console.warn(
    `WARNING: Buckwalter ids differ by case but this filesystem is case-insensitive, so ${lost} page(s) will overwrite another and this dist is not deploy-accurate:\n  ${collisions.map((group) => group.join(' vs ')).join('\n  ')}`,
  )
}

warnAboutCaseCollisions(pages.map((page) => page.file))

window.happyDOM.setURL(pages[1].canonical)
renderInto(renderTarget)
await new Promise((resolve) => setTimeout(resolve, 200))

const started = Date.now()
const renderedPages = pages.map(renderPage)
const css: string = extractCss()
const cssName = `prerender-${createHash('sha256').update(css).digest('hex').slice(0, 8)}.css`
mkdirSync(join(DIST, 'assets'), { recursive: true })
writeFileSync(join(DIST, 'assets', cssName), css)

for (const { page, title, markup } of renderedPages) {
  const target = join(DIST, page.file)
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(
    target,
    renderDocument(page, { title, markup, assetTags, stylesheetHref: `/assets/${cssName}` }, ORIGIN),
  )
}

writeFileSync(
  join(DIST, 'sitemap.xml'),
  renderSitemap(
    pages.map((page) => page.path),
    ORIGIN,
  ),
)
writeFileSync(join(DIST, '404.html'), indexHtml)

console.log(
  `prerendered ${pages.length} pages in ${((Date.now() - started) / 1000).toFixed(1)}s, css ${css.length} bytes (${cssName})`,
)
