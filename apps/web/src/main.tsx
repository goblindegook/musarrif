import { setup } from 'goober'
import { h, render } from 'preact'
import { hasAppRoute } from './app-route'
import './index.css'
import { ErrorBoundary } from './organisms/ErrorBoundary'

setup(h)

const appRoot = document.getElementById('app')
const landingHeader = document.getElementById('landing-header')
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

    if (landingHeader != null) render(null, landingHeader)
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

// The static landing header is only the first paint; the real header replaces it so the two never drift apart.
const mountLandingHeader = async () => {
  if (landingHeader == null) return
  const [{ LandingHeader }, { I18nProvider }, { RoutingProvider }] = await Promise.all([
    import('./organisms/LandingHeader'),
    import('./hooks/useI18n'),
    import('./routes'),
  ])

  landingHeader.replaceChildren()
  render(
    <RoutingProvider>
      <I18nProvider>
        <LandingHeader onLeave={mountApp} />
      </I18nProvider>
    </RoutingProvider>,
    landingHeader,
  )
}

if (hasAppRoute(window.location)) mountApp()
else mountLandingHeader()

window.addEventListener('hashchange', () => {
  if (hasAppRoute(window.location)) mountApp()
})
