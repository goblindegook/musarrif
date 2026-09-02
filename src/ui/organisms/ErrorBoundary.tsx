import { styled } from 'goober'
import { Component, type ComponentChildren } from 'preact'
import { Button } from '../atoms/Button'
import { I18nContext, type I18nContextValue } from '../hooks/useI18n'

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<{ children: ComponentChildren }, ErrorBoundaryState> {
  static contextType = I18nContext
  declare context: I18nContextValue

  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('Unhandled error in app tree', error)
  }

  render() {
    if (!this.state.hasError) return this.props.children
    const { t } = this.context

    return (
      <Wrapper role="alert">
        <Title>{t('error.boundary.title')}</Title>
        <Message>{t('error.boundary.message')}</Message>
        <Button onClick={() => window.location.reload()}>{t('pwa.reload')}</Button>
      </Wrapper>
    )
  }
}

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  max-width: 420px;
  margin: 4rem auto;
  padding: 1.5rem;
  border-radius: var(--radius);
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-elevated);
`

const Title = styled('h2')`
  margin: 0;
  font-size: 1.2rem;
  color: var(--color-text-primary);
`

const Message = styled('p')`
  margin: 0;
  color: var(--color-text-secondary);
`
