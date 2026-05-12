import { setup } from 'goober'
import { h, render } from 'preact'
import './index.css'

setup(h)

const appRoot = document.getElementById('app')
let mounted = false
let mounting: Promise<void> | null = null

const hasAppRoute = () => window.location.hash.startsWith('#/')

const mountApp = () => {
  if (mounted || mounting != null || appRoot == null) return

  mounting = (async () => {
    const [{ App }, { I18nProvider }, { RoutingProvider }] = await Promise.all([
      import('./app'),
      import('./hooks/useI18n'),
      import('./routes'),
    ])

    render(
      <RoutingProvider>
        <I18nProvider>
          <App />
        </I18nProvider>
      </RoutingProvider>,
      appRoot,
    )

    mounted = true
    mounting = null
  })()
}

if (hasAppRoute()) mountApp()
window.addEventListener('hashchange', () => {
  if (hasAppRoute()) mountApp()
})
