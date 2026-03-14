import { setup } from 'goober'
import { h, render } from 'preact'
import { App } from './app'
import { I18nProvider } from './hooks/i18n'
import { RoutingProvider, useRouting } from './hooks/routing'
import './index.css'

setup(h)

function RoutedApp() {
  const { lang } = useRouting()
  return (
    <I18nProvider lang={lang}>
      <App />
    </I18nProvider>
  )
}

render(
  <RoutingProvider>
    <RoutedApp />
  </RoutingProvider>,
  // biome-ignore lint/style/noNonNullAssertion: element exists
  document.getElementById('app')!,
)
