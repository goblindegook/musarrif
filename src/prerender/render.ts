import { extractCss, setup } from 'goober'
import { h, render } from 'preact'
import { act } from 'preact/test-utils'
import { App } from '../ui/app'
import { I18nProvider } from '../ui/hooks/useI18n'
import { RoutingProvider } from '../ui/routes'

setup(h)

const mountedContainers = new WeakSet<Element>()

export function renderInto(container: Element): void {
  act(() => {
    if (mountedContainers.has(container)) {
      window.dispatchEvent(new PopStateEvent('popstate'))
      return
    }

    render(
      h(RoutingProvider as never, { children: h(I18nProvider as never, { children: h(App as never, {}) }) } as never),
      container as never,
    )
    mountedContainers.add(container)
  })
}

export { extractCss }
