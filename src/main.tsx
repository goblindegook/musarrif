import { setup } from 'goober'
import type { ComponentChildren } from 'preact'
import { h, render } from 'preact'
import { App } from './app'
import { I18nProvider } from './hooks/i18n'
import { RoutingProvider, useRouting } from './hooks/routing'
import './index.css'

setup(h)

function I18nBridge({ children }: { children: ComponentChildren }) {
  const { lang } = useRouting()
  return <I18nProvider lang={lang}>{children}</I18nProvider>
}

render(
  <RoutingProvider>
    <I18nBridge>
      <App />
    </I18nBridge>
  </RoutingProvider>,
  // biome-ignore lint/style/noNonNullAssertion: element exists
  document.getElementById('app')!,
)
