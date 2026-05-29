import { render } from '@testing-library/preact'
import type { ComponentChild, ComponentChildren } from 'preact'
import { I18nProvider } from '../ui/hooks/useI18n'
import { RoutingProvider } from '../ui/routes'

export const INITIAL_DIMENSION_PROFILE = {
  tenses: 0,
  pronouns: 0,
  diacritics: 0,
  forms: 0,
  rootTypes: 0,
  nominals: 0,
} as const

function Wrapper({ children }: { children: ComponentChildren }) {
  return (
    <RoutingProvider>
      <I18nProvider>{children}</I18nProvider>
    </RoutingProvider>
  )
}

export function renderWithProviders(ui: ComponentChild) {
  return render(ui, { wrapper: Wrapper })
}
