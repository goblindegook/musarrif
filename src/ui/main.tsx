import { setup } from 'goober'
import { h, render } from 'preact'
import { hasAppRoute } from './app-route'
import './index.css'
import { ErrorBoundary } from './organisms/ErrorBoundary'

setup(h)

const appRoot = document.getElementById('app')
let mounted = false
let mounting: Promise<void> | null = null

const mountApp = () => {
  if (mounted || mounting != null || appRoot == null) return

  mounting = (async () => {
    const [{ App }, { I18nProvider }, { RoutingProvider }] = await Promise.all([
      import('./app'),
      import('./hooks/useI18n'),
      import('./routes'),
    ])

    appRoot.replaceChildren()
    render(
      <RoutingProvider>
        <I18nProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </I18nProvider>
      </RoutingProvider>,
      appRoot,
    )

    mounted = true
    mounting = null
  })()
}

if (hasAppRoute(window.location)) mountApp()
window.addEventListener('hashchange', () => {
  if (hasAppRoute(window.location)) mountApp()
})
