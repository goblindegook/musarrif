import { setup } from 'goober'
import { h, render } from 'preact'
import { App } from './app'
import { I18nProvider } from './hooks/i18n'
import { RoutingProvider } from './hooks/routing'
import './index.css'

// Setup goober with Preact's h function
setup(h)

render(
  <RoutingProvider>
    <I18nProvider>
      <App />
    </I18nProvider>
  </RoutingProvider>,
  // biome-ignore lint/style/noNonNullAssertion: element exists
  document.getElementById('app')!,
)
